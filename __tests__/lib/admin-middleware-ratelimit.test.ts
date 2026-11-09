import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

describe("admin middleware", () => {
  let middleware: typeof import("@/middleware").middleware;
  let createAdminToken: typeof import("@/lib/admin-token").createAdminToken;

  beforeEach(async () => {
    vi.resetModules();
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.stubEnv("ADMIN_PASSWORD", "correct-horse");
    vi.stubEnv("ADMIN_SESSION_SECRET", "test-secret");
    vi.spyOn(console, "warn").mockImplementation(() => {});
    ({ middleware } = await import("@/middleware"));
    ({ createAdminToken } = await import("@/lib/admin-token"));
  });

  const req = (path: string, cookie?: string) =>
    new NextRequest(`http://localhost:3000${path}`, {
      headers: {
        "x-forwarded-for": "203.0.113.9",
        ...(cookie ? { cookie } : {}),
      },
    });

  it("never returns the old 429 for repeated /admin/login views", async () => {
    for (let i = 0; i < 10; i++) {
      const res = await middleware(req("/admin/login"));
      expect(res.status).not.toBe(429);
    }
  });

  it("lets a valid admin token through regardless of prior traffic", async () => {
    for (let i = 0; i < 10; i++) await middleware(req("/admin/login"));
    const token = await createAdminToken();
    for (let i = 0; i < 10; i++) {
      const res = await middleware(req("/admin", `vibestack_admin=${token}`));
      expect(res.status).toBe(200);
    }
  });

  it("redirects unauthenticated /admin to the login page", async () => {
    const res = await middleware(req("/admin"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/admin/login");
  });
});
