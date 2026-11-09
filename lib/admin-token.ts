/**
 * The admin session cookie: a signed, expiring token.
 *
 * Format: `v1.<expiresAtMs>.<base64url HMAC-SHA256(v1.<expiresAtMs>)>`.
 *
 * Signing secret, in order:
 *   1. ADMIN_SESSION_SECRET, when set (rotate it to revoke every session).
 *   2. Otherwise derived from ADMIN_PASSWORD + (AUTH_SECRET || NEXTAUTH_SECRET)
 *      under a fixed domain-separation string, so no new env var is needed and
 *      changing the admin password signs every admin out.
 * Admin is disabled (nothing signs, nothing verifies) while ADMIN_PASSWORD is
 * unset, matching the login action, which refuses to run without it.
 *
 * Web Crypto only, no Node or Next imports: the Edge middleware imports this.
 * The signature check uses crypto.subtle.verify, which compares in constant
 * time. Tokens from the old deterministic SHA-256 format simply fail to parse.
 */
export const ADMIN_COOKIE_NAME = "vibestack_admin";

/** Session lifetime. The cookie maxAge (seconds) is derived from this. */
export const ADMIN_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const ADMIN_SESSION_MAX_AGE_SECONDS = ADMIN_SESSION_TTL_MS / 1000;

/** Tolerated clock skew when rejecting an expiry too far in the future. */
const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;

const TOKEN_VERSION = "v1";
const KEY_DOMAIN = "vibestack:admin-session:v1";
// v1.<1-16 digit ms timestamp>.<43 base64url chars = 32-byte HMAC-SHA256>
const TOKEN_PATTERN = /^v1\.(\d{1,16})\.([A-Za-z0-9_-]{43})$/;

/** Key material, or null when admin auth is not configured (fail closed). */
function signingSecret(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit) return explicit;
  const serverSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "";
  return `${KEY_DOMAIN}\u0000${password}\u0000${serverSecret}`;
}

async function hmacKey(usage: "sign" | "verify"): Promise<CryptoKey | null> {
  const secret = signingSecret();
  if (!secret) return null;
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage]
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> | null {
  try {
    const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

/** A fresh session token, or null when admin auth is not configured. */
export async function createAdminToken(now: number = Date.now()): Promise<string | null> {
  const key = await hmacKey("sign");
  if (!key) return null;
  const payload = `${TOKEN_VERSION}.${now + ADMIN_SESSION_TTL_MS}`;
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${toBase64Url(new Uint8Array(sig))}`;
}

export async function isValidAdminToken(
  value: string | undefined | null,
  now: number = Date.now()
): Promise<boolean> {
  if (!value) return false;
  const match = TOKEN_PATTERN.exec(value);
  if (!match) return false;

  const expiresAt = Number(match[1]);
  if (!Number.isSafeInteger(expiresAt)) return false;
  if (expiresAt <= now) return false;
  if (expiresAt > now + ADMIN_SESSION_TTL_MS + MAX_CLOCK_SKEW_MS) return false;

  const sig = fromBase64Url(match[2]);
  if (!sig || sig.length !== 32) return false;

  const key = await hmacKey("verify");
  if (!key) return false;
  try {
    return await crypto.subtle.verify(
      "HMAC",
      key,
      sig,
      new TextEncoder().encode(`${TOKEN_VERSION}.${match[1]}`)
    );
  } catch {
    return false;
  }
}
