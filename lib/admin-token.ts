/**
 * The admin session cookie value, computed in one place.
 *
 * This is the exact derivation app/admin/actions/auth.ts (login) and
 * middleware.ts (page gate) each still compute inline: hex(SHA-256(password +
 * salt)). It must stay byte-for-byte identical to theirs, or every signed-in
 * admin is logged out. It is deliberately free of Node and Next imports (Web
 * Crypto only) so the Edge middleware can import it too; once auth.ts and
 * middleware.ts import from here, the salt lives in exactly one place.
 *
 * Known weakness, unchanged on purpose: the token is deterministic. It never
 * rotates, cannot be revoked short of changing ADMIN_PASSWORD, and a leaked
 * cookie stays valid indefinitely (maxAge only limits the browser copy).
 */
export const ADMIN_COOKIE_NAME = "vibestack_admin";
export const ADMIN_TOKEN_SALT = "vibestack_admin_salt_7391";

/** Returns null when ADMIN_PASSWORD is unset, so no cookie can ever match. */
export async function computeAdminToken(
  password: string | undefined = process.env.ADMIN_PASSWORD
): Promise<string | null> {
  if (!password) return null;
  const data = new TextEncoder().encode(password + ADMIN_TOKEN_SALT);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time for equal lengths; the token is always 64 hex chars. */
export function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function isValidAdminToken(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const expected = await computeAdminToken();
  if (!expected) return false;
  return constantTimeEqual(value, expected);
}
