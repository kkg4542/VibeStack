import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/api-utils";
import { checkRateLimit, type RateLimitConfig } from "@/lib/redis";

const HOUR = 60 * 60 * 1000;

/** Per-route limits for the handlers that call limitOrRespond below. */
export const routeRateLimits = {
  submission: { windowSize: HOUR, maxRequests: 5 },
  submissionCheckout: { windowSize: HOUR, maxRequests: 10 },
  sponsorshipCheckout: { windowSize: HOUR, maxRequests: 10 },
  emailCapture: { windowSize: HOUR, maxRequests: 10 },
  affiliateClick: { windowSize: 60 * 1000, maxRequests: 100 },
  communityStackCreate: { windowSize: HOUR, maxRequests: 10 },
  reviewCreate: { windowSize: HOUR, maxRequests: 10 },
} satisfies Record<string, RateLimitConfig>;

/** First hop of x-forwarded-for, then x-real-ip — same order as middleware.ts. */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") || "unknown";
}

/**
 * null when allowed; otherwise the same 429 body app/api/newsletter/route.ts
 * returns ({ error, details: { retryAfter }, timestamp }).
 */
export async function limitOrRespond(
  key: string,
  config: RateLimitConfig
): Promise<NextResponse | null> {
  const result = await checkRateLimit(key, config);
  if (result.allowed) return null;
  return createErrorResponse("Too many requests. Please try again later.", 429, {
    retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
  });
}
