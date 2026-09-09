import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/go/[slug]/route";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/redis";

// `after()` callbacks are never drained outside a real Next.js request scope,
// so capture them and run them by hand. NextRequest/NextResponse must stay
// real, hence the importActual spread.
const { afterCallbacks } = vi.hoisted(() => ({
  afterCallbacks: [] as Array<() => Promise<void> | void>,
}));

vi.mock("next/server", async () => {
  const actual = await vi.importActual<typeof import("next/server")>("next/server");
  return {
    ...actual,
    after: (cb: () => Promise<void> | void) => {
      afterCallbacks.push(cb);
    },
  };
});

vi.mock("@/lib/prisma", () => ({
  prisma: {
    tool: {
      findUnique: vi.fn(),
    },
    affiliateClick: {
      create: vi.fn(),
    },
  },
}));

vi.mock("@/lib/redis", () => ({
  checkRateLimit: vi.fn(),
  rateLimitConfigs: {
    strict: { windowSize: 60_000, maxRequests: 5 },
    standard: { windowSize: 60_000, maxRequests: 30 },
    generous: { windowSize: 60_000, maxRequests: 100 },
    newsletter: { windowSize: 3_600_000, maxRequests: 3 },
  },
}));

const REF_QUERY = "ref=vibestack&utm_source=vibestack";

function makeTool(overrides: Record<string, unknown> = {}) {
  return {
    id: "tool-1",
    slug: "cursor",
    title: "Cursor",
    websiteUrl: "https://cursor.com/download",
    affiliateUrl: null,
    ...overrides,
  };
}

function makeRequest(
  url: string,
  headers: Record<string, string> = {}
): NextRequest {
  return new NextRequest(new Request(url, { headers }));
}

async function runAfterCallbacks() {
  for (const cb of afterCallbacks) {
    await cb();
  }
}

describe("GET /go/[slug]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    afterCallbacks.length = 0;
    vi.mocked(checkRateLimit).mockResolvedValue({
      allowed: true,
      remaining: 99,
      resetTime: 0,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 404 and records nothing for an unknown slug", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(null);

    const response = await GET(makeRequest("http://localhost/go/nope"), {
      params: Promise.resolve({ slug: "nope" }),
    });

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: "Tool not found" });

    await runAfterCallbacks();
    expect(prisma.affiliateClick.create).not.toHaveBeenCalled();
  });

  it("prefers affiliateUrl over websiteUrl", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(
      makeTool({
        affiliateUrl: "https://partner.example.com/cursor",
        websiteUrl: "https://cursor.com/download",
      }) as never
    );

    const response = await GET(makeRequest("http://localhost/go/cursor"), {
      params: Promise.resolve({ slug: "cursor" }),
    });

    expect(response.headers.get("location")).toBe(
      `https://partner.example.com/cursor?${REF_QUERY}`
    );
  });

  it("falls back to websiteUrl when affiliateUrl is null", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(
      makeTool({ affiliateUrl: null }) as never
    );

    const response = await GET(makeRequest("http://localhost/go/cursor"), {
      params: Promise.resolve({ slug: "cursor" }),
    });

    expect(response.headers.get("location")).toBe(
      `https://cursor.com/download?${REF_QUERY}`
    );
  });

  it("falls back to websiteUrl when affiliateUrl is an empty string", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(
      makeTool({ affiliateUrl: "" }) as never
    );

    const response = await GET(makeRequest("http://localhost/go/cursor"), {
      params: Promise.resolve({ slug: "cursor" }),
    });

    expect(response.headers.get("location")).toBe(
      `https://cursor.com/download?${REF_QUERY}`
    );
  });

  it("joins tracking params with ? when the target has no querystring", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(
      makeTool({ websiteUrl: "https://cursor.com/download" }) as never
    );

    const response = await GET(makeRequest("http://localhost/go/cursor"), {
      params: Promise.resolve({ slug: "cursor" }),
    });

    expect(response.headers.get("location")).toBe(
      `https://cursor.com/download?${REF_QUERY}`
    );
  });

  it("joins tracking params with & when the target already has a querystring", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(
      makeTool({ websiteUrl: "https://cursor.com/pricing?plan=pro" }) as never
    );

    const response = await GET(makeRequest("http://localhost/go/cursor"), {
      params: Promise.resolve({ slug: "cursor" }),
    });

    expect(response.headers.get("location")).toBe(
      `https://cursor.com/pricing?plan=pro&${REF_QUERY}`
    );
  });

  it("responds 307 with the destination in the Location header", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(
      makeTool({ affiliateUrl: "https://partner.example.com/go/cursor" }) as never
    );

    const response = await GET(makeRequest("http://localhost/go/cursor"), {
      params: Promise.resolve({ slug: "cursor" }),
    });

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      `https://partner.example.com/go/cursor?${REF_QUERY}`
    );
  });

  it("records the click with the full payload once the after callback runs", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(
      makeTool({
        id: "tool-42",
        slug: "cursor",
        title: "Cursor",
        affiliateUrl: "https://partner.example.com/cursor",
      }) as never
    );

    await GET(
      makeRequest("http://localhost/go/cursor", {
        "user-agent": "Mozilla/5.0 (Test Runner)",
        referer: "https://vibestack.dev/tools/cursor",
        "x-forwarded-for": "1.2.3.4, 5.6.7.8",
      }),
      { params: Promise.resolve({ slug: "cursor" }) }
    );

    expect(prisma.affiliateClick.create).not.toHaveBeenCalled();

    await runAfterCallbacks();

    expect(prisma.affiliateClick.create).toHaveBeenCalledTimes(1);
    expect(prisma.affiliateClick.create).toHaveBeenCalledWith({
      data: {
        toolId: "tool-42",
        toolSlug: "cursor",
        toolName: "Cursor",
        url: `https://partner.example.com/cursor?${REF_QUERY}`,
        userAgent: "Mozilla/5.0 (Test Runner)",
        referrer: "https://vibestack.dev/tools/cursor",
        ipAddress: "1.2.3.4",
        abVariant: null,
      },
    });
  });

  it("uses only the first IP from a comma-separated x-forwarded-for", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(makeTool() as never);

    await GET(
      makeRequest("http://localhost/go/cursor", {
        "x-forwarded-for": "1.2.3.4, 5.6.7.8",
      }),
      { params: Promise.resolve({ slug: "cursor" }) }
    );
    await runAfterCallbacks();

    expect(prisma.affiliateClick.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ ipAddress: "1.2.3.4" }),
      })
    );
    expect(checkRateLimit).toHaveBeenCalledWith(
      "go-click:1.2.3.4",
      expect.objectContaining({ maxRequests: 100 })
    );
  });

  it("records abVariant B for ?v=B", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(makeTool() as never);

    await GET(makeRequest("http://localhost/go/cursor?v=B"), {
      params: Promise.resolve({ slug: "cursor" }),
    });
    await runAfterCallbacks();

    expect(prisma.affiliateClick.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ abVariant: "B" }),
      })
    );
  });

  it("records abVariant null for an out-of-range ?v=Z", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(makeTool() as never);

    await GET(makeRequest("http://localhost/go/cursor?v=Z"), {
      params: Promise.resolve({ slug: "cursor" }),
    });
    await runAfterCallbacks();

    expect(prisma.affiliateClick.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ abVariant: null }),
      })
    );
  });

  it("records abVariant null when ?v is absent", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(makeTool() as never);

    await GET(makeRequest("http://localhost/go/cursor"), {
      params: Promise.resolve({ slug: "cursor" }),
    });
    await runAfterCallbacks();

    expect(prisma.affiliateClick.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ abVariant: null }),
      })
    );
  });

  it("still redirects with 307 when the click is rate limited, but skips the write", async () => {
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(makeTool() as never);
    vi.mocked(checkRateLimit).mockResolvedValue({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 60_000,
    });

    const response = await GET(
      makeRequest("http://localhost/go/cursor", {
        "x-forwarded-for": "9.9.9.9",
      }),
      { params: Promise.resolve({ slug: "cursor" }) }
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      `https://cursor.com/download?${REF_QUERY}`
    );

    await runAfterCallbacks();
    expect(prisma.affiliateClick.create).not.toHaveBeenCalled();
  });

  it("swallows a failing click write instead of throwing out of after()", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(prisma.tool.findUnique).mockResolvedValue(makeTool() as never);
    vi.mocked(prisma.affiliateClick.create).mockRejectedValue(
      new Error("db is down")
    );

    const response = await GET(makeRequest("http://localhost/go/cursor"), {
      params: Promise.resolve({ slug: "cursor" }),
    });
    expect(response.status).toBe(307);

    expect(afterCallbacks).toHaveLength(1);
    await expect(afterCallbacks[0]()).resolves.toBeUndefined();
    expect(consoleError).toHaveBeenCalledWith(
      "[go] Failed to record affiliate click:",
      expect.any(Error)
    );
  });
});
