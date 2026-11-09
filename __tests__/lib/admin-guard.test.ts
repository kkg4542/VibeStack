import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";
import {
  isAdminRequest,
  requireAdmin,
  requireAdminMutation,
  requireSameOrigin,
} from "@/lib/admin-guard";
import { ADMIN_COOKIE_NAME, ADMIN_SESSION_TTL_MS, createAdminToken } from "@/lib/admin-token";

const DUMMY_PASSWORD = "dummy-test-password";
const URL_BASE = "http://localhost:3000/api/admin/thing";

let validToken: string;

function makeRequest({
  cookie,
  headers = {},
}: { cookie?: string; headers?: Record<string, string> } = {}): NextRequest {
  const h = new Headers({ host: "localhost:3000", ...headers });
  if (cookie !== undefined) h.set("cookie", `${ADMIN_COOKIE_NAME}=${cookie}`);
  return new NextRequest(new Request(URL_BASE, { method: "POST", headers: h }));
}

describe("lib/admin-guard", () => {
  beforeEach(async () => {
    vi.stubEnv("ADMIN_PASSWORD", DUMMY_PASSWORD);
    validToken = (await createAdminToken())!;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("requireAdmin", () => {
    it("passes a request with a valid admin cookie", async () => {
      const req = makeRequest({ cookie: validToken });
      expect(await isAdminRequest(req)).toBe(true);
      expect(await requireAdmin(req)).toBeNull();
    });

    it("401s a wrong cookie", async () => {
      const res = await requireAdmin(makeRequest({ cookie: "0".repeat(64) }));
      expect(res?.status).toBe(401);
      expect(await res?.json()).toMatchObject({ code: "ADMIN_REQUIRED" });
    });

    it("401s the old deterministic SHA-256 cookie", async () => {
      const data = new TextEncoder().encode(DUMMY_PASSWORD + "vibestack_admin_salt_7391");
      const hash = await crypto.subtle.digest("SHA-256", data);
      const legacy = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      expect((await requireAdmin(makeRequest({ cookie: legacy })))?.status).toBe(401);
    });

    it("401s an expired cookie", async () => {
      const expired = (await createAdminToken(Date.now() - ADMIN_SESSION_TTL_MS - 1000))!;
      expect((await requireAdmin(makeRequest({ cookie: expired })))?.status).toBe(401);
    });

    it("401s a tampered cookie", async () => {
      const [v, exp, sig] = validToken.split(".");
      const tampered = `${v}.${Number(exp) + 1}.${sig}`;
      expect((await requireAdmin(makeRequest({ cookie: tampered })))?.status).toBe(401);
    });

    it("401s a missing cookie", async () => {
      const res = await requireAdmin(makeRequest());
      expect(res?.status).toBe(401);
    });

    it("401s every request when ADMIN_PASSWORD is unset", async () => {
      vi.stubEnv("ADMIN_PASSWORD", "");
      const res = await requireAdmin(makeRequest({ cookie: validToken }));
      expect(res?.status).toBe(401);
    });
  });

  describe("requireSameOrigin", () => {
    it("passes a same-origin Origin", () => {
      expect(requireSameOrigin(makeRequest({ headers: { origin: "http://localhost:3000" } }))).toBeNull();
    });

    it("passes a same-origin Referer when Origin is absent", () => {
      expect(
        requireSameOrigin(makeRequest({ headers: { referer: "http://localhost:3000/admin/tools" } }))
      ).toBeNull();
    });

    it("403s a foreign Origin", () => {
      const res = requireSameOrigin(makeRequest({ headers: { origin: "https://evil.example" } }));
      expect(res?.status).toBe(403);
    });

    it('403s the opaque "null" Origin', () => {
      const res = requireSameOrigin(makeRequest({ headers: { origin: "null" } }));
      expect(res?.status).toBe(403);
    });

    it("403s a foreign Referer when Origin is absent", () => {
      const res = requireSameOrigin(
        makeRequest({ headers: { referer: "https://evil.example/page" } })
      );
      expect(res?.status).toBe(403);
    });

    it("403s a foreign Origin even when the Referer is same-origin", () => {
      const res = requireSameOrigin(
        makeRequest({
          headers: { origin: "https://evil.example", referer: "http://localhost:3000/admin" },
        })
      );
      expect(res?.status).toBe(403);
    });
  });

  describe("requireAdminMutation", () => {
    it("passes a valid cookie from the same origin", async () => {
      const req = makeRequest({ cookie: validToken, headers: { origin: "http://localhost:3000" } });
      expect(await requireAdminMutation(req)).toBeNull();
    });

    it("passes a valid cookie with neither Origin nor Referer", async () => {
      expect(await requireAdminMutation(makeRequest({ cookie: validToken }))).toBeNull();
    });

    it("401s before checking origin when the cookie is bad", async () => {
      const req = makeRequest({ cookie: "bad", headers: { origin: "https://evil.example" } });
      expect((await requireAdminMutation(req))?.status).toBe(401);
    });

    it("403s a valid cookie from a foreign origin", async () => {
      const req = makeRequest({ cookie: validToken, headers: { origin: "https://evil.example" } });
      expect((await requireAdminMutation(req))?.status).toBe(403);
    });
  });
});
