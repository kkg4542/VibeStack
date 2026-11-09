import { describe, it, expect, afterEach, vi } from "vitest";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_TOKEN_SALT,
  computeAdminToken,
  constantTimeEqual,
  isValidAdminToken,
} from "@/lib/admin-token";

const DUMMY_PASSWORD = "dummy-test-password";

// The derivation auth.ts and middleware.ts used inline before they imported
// lib/admin-token.ts. Any drift from it signs every admin out.
async function legacyToken(secret: string): Promise<string> {
  const data = new TextEncoder().encode(secret + "vibestack_admin_salt_7391");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

describe("lib/admin-token", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("keeps the cookie name and salt the live sessions were issued with", () => {
    expect(ADMIN_COOKIE_NAME).toBe("vibestack_admin");
    expect(ADMIN_TOKEN_SALT).toBe("vibestack_admin_salt_7391");
  });

  it("is byte-identical to the legacy inline derivation", async () => {
    for (const pwd of [DUMMY_PASSWORD, "x", "unicode-üñï-\u{1F511}"]) {
      expect(await computeAdminToken(pwd)).toBe(await legacyToken(pwd));
    }
  });

  it("returns a 64-char lowercase hex token", async () => {
    expect(await computeAdminToken(DUMMY_PASSWORD)).toMatch(/^[0-9a-f]{64}$/);
  });

  it("returns null when ADMIN_PASSWORD is unset", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "");
    expect(await computeAdminToken()).toBeNull();
  });

  it("constantTimeEqual compares exactly", () => {
    expect(constantTimeEqual("abc", "abc")).toBe(true);
    expect(constantTimeEqual("abc", "abd")).toBe(false);
    expect(constantTimeEqual("abc", "abcd")).toBe(false);
    expect(constantTimeEqual("", "")).toBe(true);
  });

  describe("isValidAdminToken", () => {
    it("accepts the token derived from ADMIN_PASSWORD", async () => {
      vi.stubEnv("ADMIN_PASSWORD", DUMMY_PASSWORD);
      expect(await isValidAdminToken(await legacyToken(DUMMY_PASSWORD))).toBe(true);
    });

    it("rejects a wrong, missing or empty cookie", async () => {
      vi.stubEnv("ADMIN_PASSWORD", DUMMY_PASSWORD);
      expect(await isValidAdminToken(await legacyToken("other-password"))).toBe(false);
      expect(await isValidAdminToken(undefined)).toBe(false);
      expect(await isValidAdminToken(null)).toBe(false);
      expect(await isValidAdminToken("")).toBe(false);
    });

    it("rejects everything when ADMIN_PASSWORD is unset", async () => {
      vi.stubEnv("ADMIN_PASSWORD", "");
      expect(await isValidAdminToken(await legacyToken(""))).toBe(false);
      // The old sentinel value must not work as a cookie either.
      expect(await isValidAdminToken("configuration_error")).toBe(false);
    });
  });
});
