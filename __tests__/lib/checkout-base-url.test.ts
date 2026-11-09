import { describe, it, expect, afterEach, vi } from "vitest";
import { NextRequest } from "next/server";
import { getCheckoutBaseUrl } from "@/lib/checkout-base-url";

function req(origin?: string): NextRequest {
  const headers = new Headers();
  if (origin) headers.set("origin", origin);
  return new NextRequest(new Request("http://localhost:3000/api/x", { method: "POST", headers }));
}

describe("getCheckoutBaseUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("prefers NEXT_PUBLIC_APP_URL over a forged Origin", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://vibestack.example/");
    expect(getCheckoutBaseUrl(req("https://evil.example"))).toBe("https://vibestack.example");
  });

  it("returns null in production when NEXT_PUBLIC_APP_URL is unset", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    vi.stubEnv("NODE_ENV", "production");
    expect(getCheckoutBaseUrl(req("https://evil.example"))).toBeNull();
  });

  it("returns null for a non-http(s) NEXT_PUBLIC_APP_URL", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "javascript:alert(1)");
    expect(getCheckoutBaseUrl(req())).toBeNull();
  });

  it("falls back to the request Origin outside production", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    vi.stubEnv("NODE_ENV", "development");
    expect(getCheckoutBaseUrl(req("http://localhost:3001"))).toBe("http://localhost:3001");
    expect(getCheckoutBaseUrl(req())).toBe("http://localhost:3000");
  });
});
