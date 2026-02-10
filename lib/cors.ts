import { NextRequest, NextResponse } from "next/server";

interface CorsConfig {
  origin: string | string[] | ((origin: string) => boolean);
  methods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  credentials: boolean;
  maxAge: number;
}

const defaultConfig: CorsConfig = {
  origin: process.env.CORS_ALLOWED_ORIGINS?.split(",") || [
    "http://localhost:3000",
    "https://vibestack.dev",
    "https://www.vibestack.dev",
  ],
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
  return allowedOrigins === origin || allowedOrigins === "*";
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
