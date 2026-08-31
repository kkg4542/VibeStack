import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import {
  generateCsrfToken,
  validateCsrfToken,
  isCsrfProtectedMethod,
  isCsrfExcludedPath,
  CSRF_COOKIE_NAME,
  CSRF_HEADER_NAME
} from "@/lib/csrf";
import { withCORS, isPreflightRequest, handleCorsPreflight } from "@/lib/cors";

// Initialize Redis client for rate limiting.
// The URL is shape-checked because Upstash's other credential set — the
// `rediss://` connection string — makes `new Redis()` throw at module scope,
// which here means the middleware bundle fails to evaluate at all. Same guard
// as lib/redis.ts; kept inline so this Edge bundle doesn't pull that module in.
function buildEdgeRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || !url.startsWith("https://")) return null;

  try {
    return new Redis({ url, token });
  } catch {
    return null;
  }
}

const redis = buildEdgeRedis();

// Create rate limiters for different endpoints.
// `analytics` is deliberately off: it adds a second Redis write on every
// request purely to populate the Upstash dashboard, which is one more thing
// that can fail on a path where a throw takes down every /api route.
const ratelimit = redis ? {
  // Admin: 5 requests per minute
  admin: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
  }),
  // General API: 100 requests per minute
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1 m"),
  }),
} : null;

/**
 * Upstash calls in middleware must never be able to take the site down.
 * This file matches /admin/* and /api/*, so an unhandled throw here returns
 * MIDDLEWARE_INVOCATION_FAILED for EVERY api route — newsletter, submissions,
 * reviews, Stripe checkout and the Stripe webhook included. That is exactly
 * what happened the first time the Upstash env vars were set in production:
 * this branch had never executed there before, because `ratelimit` had always
 * been null.
 *
 * On failure the request is let through. Route handlers do their own limiting
 * via lib/redis.ts, which has its own in-process fallback, so a broken Upstash
 * degrades the outer limit instead of closing the entire API.
 */
async function limitOrPassThrough(
  limiter: Ratelimit,
  ip: string
): Promise<{ success: boolean; limit: number; remaining: number } | null> {
  try {
    const { success, limit, remaining } = await limiter.limit(ip);
    return { success, limit, remaining };
  } catch (error) {
    console.error("[middleware] Upstash rate limit failed, passing through:", error);
    return null;
  }
}

// In-memory failed attempt tracking — secondary defense only.
// WARNING: This Map is NOT shared across serverless instances or Edge workers.
// Primary rate limiting should rely on Redis (Upstash) below.
const failedAttempts = new Map<string, { count: number; resetTime: number }>();
const MAX_TRACKED_IPS = 10000;

// Periodic cleanup of expired entries to prevent memory leaks
function cleanupExpiredAttempts() {
  const now = Date.now();
  for (const [ip, attempt] of failedAttempts.entries()) {
    if (now > attempt.resetTime) {
      failedAttempts.delete(ip);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Cleanup if map is getting too large
  if (failedAttempts.size > MAX_TRACKED_IPS) {
    cleanupExpiredAttempts();
  }

  const attempt = failedAttempts.get(ip);

  if (!attempt || now > attempt.resetTime) {
    failedAttempts.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }); // 15 minutes
    return false;
  }

  attempt.count++;

  // Block after 5 failed attempts
  if (attempt.count >= 5) {
    return true;
  }

  return false;
}

/**
 * Timing-safe string comparison to prevent timing attacks on credentials
 */
async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);

  // Hash both values to ensure constant-time comparison regardless of length
  const aHash = new Uint8Array(await crypto.subtle.digest("SHA-256", aBytes));
  const bHash = new Uint8Array(await crypto.subtle.digest("SHA-256", bBytes));

  if (aHash.length !== bHash.length) return false;

  let result = 0;
  for (let i = 0; i < aHash.length; i++) {
    result |= aHash[i] ^ bHash[i];
  }
  return result === 0;
}

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return "127.0.0.1";
}

export async function middleware(req: NextRequest) {
  const ip = getClientIP(req);
  const response = NextResponse.next();

  // Handle CORS preflight requests
  if (isPreflightRequest(req)) {
    return handleCorsPreflight(req);
  }

  // Add CORS headers to API responses
  if (req.nextUrl.pathname.startsWith("/api")) {
    withCORS(req, response);
  }

  // Check for HTTPS in production (skip for localhost)
  const host = req.headers.get("host") || "";
  if (
    process.env.NODE_ENV === "production" &&
    req.headers.get("x-forwarded-proto") !== "https" &&
    !host.includes("localhost") &&
    !host.includes("127.0.0.1")
  ) {
    return NextResponse.redirect(
      `https://${host}${req.nextUrl.pathname}`,
      301
    );
  }

  // CSRF Protection for state-changing requests
  const isProtectedMethod = isCsrfProtectedMethod(req.method);
  const isExcludedPath = isCsrfExcludedPath(req.nextUrl.pathname);

  if (isProtectedMethod && !isExcludedPath && req.nextUrl.pathname.startsWith("/api")) {
    const { valid, token } = await validateCsrfToken(req);

    if (!valid) {
      return new NextResponse(
        JSON.stringify({
          error: "Invalid or missing CSRF token",
          code: "CSRF_INVALID"
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Add CSRF token to response header for subsequent requests
    if (token) {
      response.headers.set(CSRF_HEADER_NAME, token);
    }
  }

  // Generate new CSRF token for GET requests if not present
  if (req.method === "GET" && !req.cookies.get(CSRF_COOKIE_NAME)) {
    const csrfToken = await generateCsrfToken();
    response.cookies.set(CSRF_COOKIE_NAME, csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    response.headers.set(CSRF_HEADER_NAME, csrfToken);
  }

  // Protect ONLY admin surface: /admin pages and /api/admin/* routes.
  // All other public API endpoints (newsletter, favorites, reviews,
  // submissions, community-stacks, analytics, etc.) rely on CSRF +
  // rate limiting alone, not admin password.
  const isProtectedPath =
    req.nextUrl.pathname.startsWith("/admin") ||
    req.nextUrl.pathname.startsWith("/api/admin");

  if (isProtectedPath) {
    // Check rate limiting
    if (isRateLimited(ip)) {
      return new NextResponse("Too many failed attempts. Please try again in 15 minutes.", {
        status: 429,
        headers: {
          "Retry-After": "900", // 15 minutes in seconds
        },
      });
    }

    // Apply rate limiting for Redis
    if (process.env.UPSTASH_REDIS_REST_URL && ratelimit) {
      const result = await limitOrPassThrough(ratelimit.admin, ip);

      if (result && !result.success) {
        return new NextResponse("Rate limit exceeded", {
          status: 429,
          headers: {
            "X-RateLimit-Limit": result.limit.toString(),
            "X-RateLimit-Remaining": result.remaining.toString(),
          },
        });
      }
    }

    // Custom Cookie-based Auth for Admin
    if (req.nextUrl.pathname.startsWith("/admin/login")) {
      // Allow access to login page
      return response;
    }

    const adminCookie = req.cookies.get("vibestack_admin")?.value;
    let isAuthenticated = false;

    if (adminCookie) {
      const validPwd = process.env.ADMIN_PASSWORD;
      if (validPwd) {
        // Compute expected hash
        const encoder = new TextEncoder();
        const data = encoder.encode(validPwd + "vibestack_admin_salt_7391");
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const expectedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        if (adminCookie === expectedHash) {
          isAuthenticated = true;
        }
      }
    }

    if (isAuthenticated) {
      // Clear failed attempts on success
      failedAttempts.delete(ip);

      // Add security headers
      response.headers.set("X-Content-Type-Options", "nosniff");
      response.headers.set("X-Frame-Options", "DENY");
      response.headers.set("X-XSS-Protection", "1; mode=block");
      response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

      return response;
    }

    // Redirect to custom login form instead of basic auth popup
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // API rate limiting
  if (req.nextUrl.pathname.startsWith("/api") && process.env.UPSTASH_REDIS_REST_URL && ratelimit) {
    const result = await limitOrPassThrough(ratelimit.api, ip);

    if (result) {
      response.headers.set("X-RateLimit-Limit", result.limit.toString());
      response.headers.set("X-RateLimit-Remaining", result.remaining.toString());

      if (!result.success) {
        return new NextResponse("Rate limit exceeded", {
          status: 429,
          headers: {
            "X-RateLimit-Limit": result.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "Retry-After": "60",
          },
        });
      }
    }

    return response;
  }

  // Add security headers to all responses
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/admin/:path*",
    {
      source: "/api/:path*",
      missing: [
        { type: "header", key: "next-action" },
      ],
    },
  ],
};
