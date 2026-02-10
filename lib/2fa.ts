import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { prisma } from '@/lib/prisma';

const TOTP_ISSUER = 'VibeStack Admin';

/**
 * Generate a new TOTP secret for a user
 */
export async function generateTOTPSecret(userId: string) {
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
export function verifyTOTP(token: string, secret: string): boolean {
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
  const isValid = verifyTOTP(token, secret);
  
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
 * Generate backup codes
 */
export function generateBackupCodes(): string[] {
  const codes: string[] = [];
  for (let i = 0; i < 10; i++) {
    // Generate 8-character alphanumeric code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    codes.push(code);
  }
  return codes;
}

/**
 * Verify backup code
 */
export async function verifyBackupCode(userId: string, code: string): Promise<boolean> {
  // In production, you would hash and store backup codes
  // For now, this is a placeholder
  return false;
}

/**
 * Store backup codes (hashed)
 */
export async function storeBackupCodes(userId: string, codes: string[]) {
  // In production, hash each code before storing
  // This is a placeholder implementation
  const hashedCodes = codes.map(code => 
    Buffer.from(code).toString('base64')
  );

  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFABackupCodes: hashedCodes,
    },
  });
}
