import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  ADMIN_SESSION_TTL_MS,
  createAdminToken,
  isValidAdminToken,
} from "@/lib/admin-token";

const DUMMY_PASSWORD = "dummy-test-password";
const NOW = 1_800_000_000_000;

// The old cookie value: hex(SHA-256(password + fixed salt)). It must no longer
// validate under any configuration.
async function legacyToken(secret: string): Promise<string> {
  const data = new TextEncoder().encode(secret + "vibestack_admin_salt_7391");
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function flipLastSigChar(token: string): string {
  const last = token.at(-1)!;
  return token.slice(0, -1) + (last === "A" ? "B" : "A");
}

describe("lib/admin-token", () => {
  beforeEach(() => {
    vi.stubEnv("ADMIN_PASSWORD", DUMMY_PASSWORD);
    vi.stubEnv("ADMIN_SESSION_SECRET", "");
    vi.stubEnv("AUTH_SECRET", "");
    vi.stubEnv("NEXTAUTH_SECRET", "n".repeat(32));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("keeps the cookie name and a 7-day lifetime that the cookie maxAge matches", () => {
    expect(ADMIN_COOKIE_NAME).toBe("vibestack_admin");
    expect(ADMIN_SESSION_TTL_MS).toBe(7 * 24 * 60 * 60 * 1000);
    expect(ADMIN_SESSION_MAX_AGE_SECONDS * 1000).toBe(ADMIN_SESSION_TTL_MS);
  });

  it("creates a v1.<exp>.<sig> token expiring one lifetime from now", async () => {
    const token = (await createAdminToken(NOW))!;
    const [version, exp, sig] = token.split(".");
    expect(version).toBe("v1");
    expect(Number(exp)).toBe(NOW + ADMIN_SESSION_TTL_MS);
    expect(sig).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it("accepts a fresh token at the real clock", async () => {
    expect(await isValidAdminToken(await createAdminToken())).toBe(true);
  });

  it("accepts a valid token until it expires", async () => {
    const token = (await createAdminToken(NOW))!;
    expect(await isValidAdminToken(token, NOW)).toBe(true);
    expect(await isValidAdminToken(token, NOW + ADMIN_SESSION_TTL_MS - 1)).toBe(true);
  });

  it("rejects an expired token", async () => {
    const token = (await createAdminToken(NOW))!;
    expect(await isValidAdminToken(token, NOW + ADMIN_SESSION_TTL_MS)).toBe(false);
    expect(await isValidAdminToken(token, NOW + ADMIN_SESSION_TTL_MS + 1)).toBe(false);
  });

  it("rejects a token whose expiry is too far in the future", async () => {
    // Signed legitimately, but by a clock a year ahead.
    const token = (await createAdminToken(NOW + 365 * 24 * 60 * 60 * 1000))!;
    expect(await isValidAdminToken(token, NOW)).toBe(false);
  });

  it("rejects a tampered signature", async () => {
    const token = (await createAdminToken(NOW))!;
    expect(await isValidAdminToken(flipLastSigChar(token), NOW)).toBe(false);
  });

  it("rejects a tampered expiry", async () => {
    const token = (await createAdminToken(NOW))!;
    const [v, exp, sig] = token.split(".");
    const extended = `${v}.${Number(exp) + 1000}.${sig}`;
    expect(await isValidAdminToken(extended, NOW)).toBe(false);
    const padded = `${v}.0${exp}.${sig}`;
    expect(await isValidAdminToken(padded, NOW)).toBe(false);
  });

  it("rejects malformed tokens", async () => {
    const token = (await createAdminToken(NOW))!;
    const [, exp, sig] = token.split(".");
    for (const bad of [
      undefined,
      null,
      "",
      "configuration_error",
      `v2.${exp}.${sig}`,
      `v1.${exp}`,
      `v1..${sig}`,
      `v1.${exp}.${sig}.extra`,
      `v1.${exp}.${sig}=`,
      `v1.-${exp}.${sig}`,
      `v1.${exp}.${sig.slice(0, -1)}`,
      `v1.${"9".repeat(17)}.${sig}`,
      ` ${token}`,
    ]) {
      expect(await isValidAdminToken(bad, NOW)).toBe(false);
    }
  });

  it("rejects the old deterministic SHA-256 cookie", async () => {
    expect(await isValidAdminToken(await legacyToken(DUMMY_PASSWORD), NOW)).toBe(false);
    expect(await isValidAdminToken(await legacyToken(DUMMY_PASSWORD))).toBe(false);
  });

  it("fails closed when ADMIN_PASSWORD is unset", async () => {
    const token = (await createAdminToken(NOW))!;
    vi.stubEnv("ADMIN_PASSWORD", "");
    expect(await createAdminToken(NOW)).toBeNull();
    expect(await isValidAdminToken(token, NOW)).toBe(false);
  });

  it("fails closed when neither a secret nor ADMIN_PASSWORD is configured", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "");
    vi.stubEnv("NEXTAUTH_SECRET", "");
    expect(await createAdminToken(NOW)).toBeNull();
    expect(await isValidAdminToken("v1.1.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", 0)).toBe(false);
  });

  it("invalidates every session when the admin password changes", async () => {
    const token = (await createAdminToken(NOW))!;
    vi.stubEnv("ADMIN_PASSWORD", "a-new-password");
    expect(await isValidAdminToken(token, NOW)).toBe(false);
  });

  it("invalidates every session when the server secret changes", async () => {
    const token = (await createAdminToken(NOW))!;
    vi.stubEnv("NEXTAUTH_SECRET", "m".repeat(32));
    expect(await isValidAdminToken(token, NOW)).toBe(false);
  });

  it("prefers ADMIN_SESSION_SECRET and revokes on rotating it", async () => {
    vi.stubEnv("ADMIN_SESSION_SECRET", "explicit-session-secret-1");
    const token = (await createAdminToken(NOW))!;
    expect(await isValidAdminToken(token, NOW)).toBe(true);
    // Derived-secret tokens do not validate under the explicit secret.
    vi.stubEnv("ADMIN_SESSION_SECRET", "");
    expect(await isValidAdminToken(token, NOW)).toBe(false);
    vi.stubEnv("ADMIN_SESSION_SECRET", "explicit-session-secret-2");
    expect(await isValidAdminToken(token, NOW)).toBe(false);
  });
});
