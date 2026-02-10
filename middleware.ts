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

// Initialize Redis client for rate limiting
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
  : null;

// Create rate limiters for different endpoints
const ratelimit = redis ? {
  // Admin: 5 requests per minute
  admin: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
  }),
  // General API: 100 requests per minute
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1 m"),
    analytics: true,
  }),
} : null;

// Store failed attempts per IP
const failedAttempts = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
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

  // Protect only /admin and /api/... (sensitive) routes
  const isProtectedPath =
    req.nextUrl.pathname.startsWith("/admin") ||
    (req.nextUrl.pathname.startsWith("/api") &&
      !req.nextUrl.pathname.startsWith("/api/auth") &&
      !req.nextUrl.pathname.startsWith("/api/tools") &&
      !req.nextUrl.pathname.startsWith("/api/stacks") &&
      !req.nextUrl.pathname.startsWith("/api/sponsorships") &&
      !req.nextUrl.pathname.startsWith("/api/blog") &&
      !req.nextUrl.pathname.startsWith("/api/csrf") &&
      !req.nextUrl.pathname.startsWith("/api/webhooks") &&
      !req.nextUrl.pathname.startsWith("/api/stripe/webhook"));

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
      const { success, limit, remaining } = await ratelimit.admin.limit(ip);

      if (!success) {
        return new NextResponse("Rate limit exceeded", {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
          },
        });
      }
    }

    // Basic Auth
    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
      try {
        const authValue = basicAuth.split(" ")[1];
        const decoded = atob(authValue);
        const separatorIndex = decoded.indexOf(":");

        if (separatorIndex === -1) {
          throw new Error("Invalid auth format");
        }

        const user = decoded.substring(0, separatorIndex);
        const pwd = decoded.substring(separatorIndex + 1);

        const validUser = process.env.ADMIN_USER;
        const validPwd = process.env.ADMIN_PASSWORD;

        // Require environment variables
        if (!validUser || !validPwd) {
          console.error("ADMIN_USER and ADMIN_PASSWORD must be set");
          return new NextResponse("Server configuration error", { status: 500 });
        }

        if (user === validUser && pwd === validPwd) {
          // Clear failed attempts on success
          failedAttempts.delete(ip);

          // Add security headers
          response.headers.set("X-Content-Type-Options", "nosniff");
          response.headers.set("X-Frame-Options", "DENY");
          response.headers.set("X-XSS-Protection", "1; mode=block");
          response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

          return response;
        }
      } catch (error) {
        console.error("Auth parsing error:", error);
      }
    }

    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Admin Area"',
      },
    });
  }

  // API rate limiting
  if (req.nextUrl.pathname.startsWith("/api") && process.env.UPSTASH_REDIS_REST_URL && ratelimit) {
    const { success, limit, remaining } = await ratelimit.api.limit(ip);

    response.headers.set("X-RateLimit-Limit", limit.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());

    if (!success) {
      return new NextResponse("Rate limit exceeded", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": "0",
          "Retry-After": "60",
        },
      });
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
