import { prisma } from '@/lib/prisma';

const TOTP_ISSUER = 'VibeStack Admin';

/**
 * Generate a new TOTP secret for a user
 * Uses dynamic imports for speakeasy and qrcode
 */
export async function generateTOTPSecret(userId: string) {
  const speakeasy = (await import('speakeasy')).default;
  const QRCode = (await import('qrcode')).default;

  // Generate secret
  const secret = speakeasy.generateSecret({
    name: `VibeStack (${userId})`,
    issuer: TOTP_ISSUER,
    length: 32,
  });

  // Generate QR code
  const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

  return {
    secret: secret.base32,
    qrCode: qrCodeUrl,
    otpauthUrl: secret.otpauth_url,
  };
}

/**
 * Verify a TOTP token
 */
export async function verifyTOTP(token: string, secret: string): Promise<boolean> {
  const speakeasy = (await import('speakeasy')).default;

  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2, // Allow 2 steps (±1 minute) for time drift
  });
}

/**
 * Enable 2FA for a user
 */
export async function enable2FA(userId: string, token: string, secret: string) {
  // Verify the token first
  const isValid = await verifyTOTP(token, secret);
  
  if (!isValid) {
    throw new Error('Invalid verification code');
  }

  // Store the secret (in production, encrypt this)
  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFASecret: secret,
      twoFAEnabled: true,
    },
  });

  return { success: true };
}

/**
 * Disable 2FA for a user
 */
export async function disable2FA(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFASecret: null,
      twoFAEnabled: false,
    },
  });

  return { success: true };
}

/**
 * Check if user has 2FA enabled
 */
export async function is2FAEnabled(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { twoFAEnabled: true },
  });

  return user?.twoFAEnabled ?? false;
}

/**
 * Generate cryptographically secure backup codes
 * Uses crypto.getRandomValues() instead of Math.random()
 */
export function generateBackupCodes(): string[] {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar chars (0/O, 1/I)
  
  return Array.from({ length: 10 }, () => {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map(b => charset[b % charset.length]).join('');
  });
}

/**
 * Hash a backup code using SHA-256 for secure storage
 */
async function hashBackupCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code.toUpperCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = new Uint8Array(hashBuffer);
  return Array.from(hashArray, (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify backup code against stored hashes
 */
export async function verifyBackupCode(userId: string, code: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { twoFABackupCodes: true },
  });

  if (!user?.twoFABackupCodes || user.twoFABackupCodes.length === 0) {
    return false;
  }

  const hashedInput = await hashBackupCode(code);

  // Find and consume the matching backup code
  const matchIndex = user.twoFABackupCodes.indexOf(hashedInput);
  if (matchIndex === -1) {
    return false;
  }

  // Remove the used backup code (one-time use)
  const remainingCodes = [...user.twoFABackupCodes];
  remainingCodes.splice(matchIndex, 1);

  await prisma.user.update({
    where: { id: userId },
    data: { twoFABackupCodes: remainingCodes },
  });

  return true;
}

/**
 * Store backup codes (hashed with SHA-256)
 */
export async function storeBackupCodes(userId: string, codes: string[]) {
  // Hash each code before storing
  const hashedCodes = await Promise.all(
    codes.map(code => hashBackupCode(code))
  );

  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFABackupCodes: hashedCodes,
    },
  });
}
