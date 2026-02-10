import { describe, it, expect, vi, beforeEach } from "vitest";
import { 
  generateCsrfToken, 
  validateCsrfToken, 
  isCsrfProtectedMethod,
  isCsrfExcludedPath,
  CSRF_COOKIE_NAME,
  CSRF_HEADER_NAME 
} from "@/lib/csrf";
import { NextRequest } from "next/server";

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(),
    set: vi.fn(),
  })),
}));

describe("CSRF Protection", () => {
  describe("Token Generation", () => {
    it("should generate a valid CSRF token", async () => {
      const token = await generateCsrfToken();
      expect(token).toBeDefined();
      expect(token).toHaveLength(64); // 32 bytes = 64 hex chars
      expect(token).toMatch(/^[a-f0-9]+$/); // Hexadecimal
    });

    it("should generate unique tokens each time", async () => {
      const token1 = await generateCsrfToken();
      const token2 = await generateCsrfToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe("CSRF Method Detection", () => {
    it("should identify protected HTTP methods", () => {
      expect(isCsrfProtectedMethod("POST")).toBe(true);
      expect(isCsrfProtectedMethod("PUT")).toBe(true);
      expect(isCsrfProtectedMethod("PATCH")).toBe(true);
      expect(isCsrfProtectedMethod("DELETE")).toBe(true);
    });

    it("should not identify safe HTTP methods", () => {
      expect(isCsrfProtectedMethod("GET")).toBe(false);
      expect(isCsrfProtectedMethod("HEAD")).toBe(false);
      expect(isCsrfProtectedMethod("OPTIONS")).toBe(false);
    });

    it("should be case insensitive", () => {
      expect(isCsrfProtectedMethod("post")).toBe(true);
      expect(isCsrfProtectedMethod("POST")).toBe(true);
      expect(isCsrfProtectedMethod("get")).toBe(false);
    });
  });

  describe("Excluded Paths", () => {
    it("should exclude auth routes", () => {
      expect(isCsrfExcludedPath("/api/auth/signin")).toBe(true);
      expect(isCsrfExcludedPath("/api/auth/callback")).toBe(true);
    });

    it("should exclude webhook routes", () => {
      expect(isCsrfExcludedPath("/api/webhooks/stripe")).toBe(true);
      expect(isCsrfExcludedPath("/api/stripe/webhook")).toBe(true);
    });

    it("should not exclude regular API routes", () => {
      expect(isCsrfExcludedPath("/api/submissions")).toBe(false);
      expect(isCsrfExcludedPath("/api/reviews")).toBe(false);
    });
  });

  describe("Token Validation", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should reject requests without cookie token", async () => {
      const { cookies } = await import("next/headers");
      vi.mocked(cookies).mockReturnValue({
        get: vi.fn().mockReturnValue(undefined),
        set: vi.fn(),
      } as any);

      const request = new NextRequest("http://localhost/api/test", {
        method: "POST",
      });

      const { valid } = await validateCsrfToken(request);
      expect(valid).toBe(false);
    });

    it("should validate matching tokens from header", async () => {
      const testToken = await generateCsrfToken();
      
      const { cookies } = await import("next/headers");
      vi.mocked(cookies).mockReturnValue({
        get: vi.fn().mockReturnValue({ value: testToken }),
        set: vi.fn(),
      } as any);

      const request = new NextRequest("http://localhost/api/test", {
        method: "POST",
        headers: {
          [CSRF_HEADER_NAME]: testToken,
        },
      });

      const { valid } = await validateCsrfToken(request);
      expect(valid).toBe(true);
    });

    it("should reject mismatched tokens", async () => {
      const cookieToken = await generateCsrfToken();
      const requestToken = await generateCsrfToken();
      
      const { cookies } = await import("next/headers");
      vi.mocked(cookies).mockReturnValue({
        get: vi.fn().mockReturnValue({ value: cookieToken }),
        set: vi.fn(),
      } as any);

      const request = new NextRequest("http://localhost/api/test", {
        method: "POST",
        headers: {
          [CSRF_HEADER_NAME]: requestToken,
        },
      });

      const { valid } = await validateCsrfToken(request);
      expect(valid).toBe(false);
    });
  });

  describe("Constants", () => {
    it("should have correct cookie name", () => {
      expect(CSRF_COOKIE_NAME).toBe("csrf_token");
    });

    it("should have correct header name", () => {
      expect(CSRF_HEADER_NAME).toBe("x-csrf-token");
    });
  });
});
