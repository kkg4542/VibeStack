import { describe, it, expect, vi, beforeEach } from "vitest";

const cookieSet = vi.fn();
let ipHeader = "203.0.113.1";

vi.mock("next/headers", () => ({
  cookies: async () => ({ set: cookieSet, delete: vi.fn() }),
  headers: async () => ({
    get: (name: string) => (name === "x-forwarded-for" ? ipHeader : null),
  }),
}));
vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  },
}));

function form(password: string) {
  const fd = new FormData();
  fd.set("username", "admin");
  fd.set("password", password);
  return fd;
}

describe("adminLogin lockout", () => {
  let adminLogin: typeof import("@/app/admin/actions/auth").adminLogin;
  const prev = { error: null as string | null };

  beforeEach(async () => {
    vi.resetModules();
    cookieSet.mockClear();
    vi.stubEnv("ADMIN_USER", "admin");
    vi.stubEnv("ADMIN_PASSWORD", "correct-horse");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    ipHeader = `198.51.100.${Math.floor(Math.random() * 250)}`;
    ({ adminLogin } = await import("@/app/admin/actions/auth"));
  });

  it("4 failures then the correct password still succeeds", async () => {
    for (let i = 0; i < 4; i++) {
      expect(await adminLogin(prev, form("wrong"))).toEqual({ error: "Invalid credentials" });
    }
    await expect(adminLogin(prev, form("correct-horse"))).rejects.toThrow("NEXT_REDIRECT:/admin");
    expect(cookieSet).toHaveBeenCalledTimes(1);
  });

  it("5 failures lock out even the correct password, with no cookie", async () => {
    for (let i = 0; i < 5; i++) await adminLogin(prev, form("wrong"));
    const res = await adminLogin(prev, form("correct-horse"));
    expect(res).toEqual({ error: "Too many failed attempts. Try again in 15 minutes." });
    expect(cookieSet).not.toHaveBeenCalled();
  });

  it("successful logins never count toward the limit", async () => {
    for (let i = 0; i < 10; i++) {
      await expect(adminLogin(prev, form("correct-horse"))).rejects.toThrow("NEXT_REDIRECT");
    }
    expect(await adminLogin(prev, form("wrong"))).toEqual({ error: "Invalid credentials" });
  });
});
