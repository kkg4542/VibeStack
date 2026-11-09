import { NextRequest, NextResponse } from "next/server";

interface CorsConfig {
  origin: string | string[] | ((origin: string) => boolean);
  methods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  credentials: boolean;
  maxAge: number;
}

/**
 * Exact origins only. Responses carry Access-Control-Allow-Credentials, so an
 * entry here can read authenticated responses: never add "*", and never list
 * a domain we don't own. The default used to be vibestack.dev, which is not
 * this site (production is usevibestack.com, see app/robots.ts and
 * app/sitemap.ts), so the real origin was never on the list.
 */
const PRODUCTION_ORIGINS = ["https://usevibestack.com", "https://www.usevibestack.com"];
const DEV_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"];

function resolveAllowedOrigins(): string[] {
  const fromEnv = process.env.CORS_ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin && origin !== "*");
  if (fromEnv && fromEnv.length > 0) return fromEnv;
  return process.env.NODE_ENV === "production"
    ? PRODUCTION_ORIGINS
    : [...PRODUCTION_ORIGINS, ...DEV_ORIGINS];
}

const defaultConfig: CorsConfig = {
  origin: resolveAllowedOrigins(),
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-csrf-token",
    "X-Requested-With",
    "Accept",
  ],
  exposedHeaders: ["x-csrf-token", "X-RateLimit-Limit", "X-RateLimit-Remaining"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

function isOriginAllowed(origin: string, allowedOrigins: CorsConfig["origin"]): boolean {
  if (Array.isArray(allowedOrigins)) {
    return allowedOrigins.includes(origin);
  }
  if (typeof allowedOrigins === "function") {
    return allowedOrigins(origin);
  }
  // A bare "*" is never honoured: the caller would then reflect the request's
  // own Origin alongside Allow-Credentials, i.e. trust every site.
  return allowedOrigins === origin;
}

export function withCORS(
  request: NextRequest,
  response: NextResponse,
  config: Partial<CorsConfig> = {}
): NextResponse {
  const mergedConfig = { ...defaultConfig, ...config };
  const origin = request.headers.get("origin") || "";
  
  // Check if origin is allowed
  const isAllowed = isOriginAllowed(origin, mergedConfig.origin);
  
  if (isAllowed) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  
  // Always set these CORS headers for preflight
  response.headers.set("Access-Control-Allow-Methods", mergedConfig.methods.join(", "));
  response.headers.set("Access-Control-Allow-Headers", mergedConfig.allowedHeaders.join(", "));
  response.headers.set("Access-Control-Expose-Headers", mergedConfig.exposedHeaders.join(", "));
  response.headers.set("Access-Control-Max-Age", mergedConfig.maxAge.toString());
  
  if (mergedConfig.credentials) {
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }
  
  // Add Vary header for caching
  response.headers.set("Vary", "Origin");
  
  return response;
}

export function handleCorsPreflight(request: NextRequest): NextResponse {
  const response = new NextResponse(null, { status: 204 });
  return withCORS(request, response);
}

export function addCorsHeaders(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  return withCORS(request, response);
}

export function isPreflightRequest(request: NextRequest): boolean {
  return (
    request.method === "OPTIONS" &&
    (request.headers.get("access-control-request-method") !== null ||
      request.headers.get("access-control-request-headers") !== null)
  );
}
