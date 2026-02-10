import { NextRequest, NextResponse } from "next/server";

interface BodySizeConfig {
  maxSize: number; // in bytes
  routePattern?: RegExp;
}

const DEFAULT_MAX_SIZE = 1024 * 1024; // 1MB

const routeSpecificLimits: Record<string, number> = {
  "/api/submissions": 2 * 1024 * 1024, // 2MB for submissions
  "/api/reviews": 512 * 1024, // 512KB for reviews
  "/api/newsletter": 100 * 1024, // 100KB for newsletter
  "/api/tools": 5 * 1024 * 1024, // 5MB for admin tool uploads (images)
  "/api/community-stacks": 2 * 1024 * 1024, // 2MB for community stacks
};

export function getMaxBodySize(pathname: string): number {
  // Check for route-specific limits
  for (const [route, limit] of Object.entries(routeSpecificLimits)) {
    if (pathname.startsWith(route)) {
      return limit;
    }
  }
  return DEFAULT_MAX_SIZE;
}

export function checkBodySize(
  request: NextRequest,
  maxSize: number = DEFAULT_MAX_SIZE
): { valid: boolean; size: number } {
  const contentLength = request.headers.get("content-length");
  
  if (!contentLength) {
    // If no content-length, we'll check during body parsing
    return { valid: true, size: 0 };
  }
  
  const size = parseInt(contentLength, 10);
  
  if (isNaN(size)) {
    return { valid: true, size: 0 };
  }
  
  return { valid: size <= maxSize, size };
}

export function createBodySizeExceededResponse(maxSize: number): NextResponse {
  const sizeInMB = (maxSize / (1024 * 1024)).toFixed(2);
  
  return NextResponse.json(
    {
      error: "Request body too large",
      message: `Maximum request body size is ${sizeInMB}MB`,
      code: "BODY_SIZE_EXCEEDED",
      maxSize: maxSize,
    },
    { status: 413 }
  );
}

export function validateBodySize(
  request: NextRequest,
  pathname: string
): { valid: boolean; response?: NextResponse } {
  const maxSize = getMaxBodySize(pathname);
  const { valid, size } = checkBodySize(request, maxSize);
  
  if (!valid) {
    return {
      valid: false,
      response: createBodySizeExceededResponse(maxSize),
    };
  }
  
  return { valid: true };
}

/**
 * Middleware to validate body size before processing
 * Use this at the start of API route handlers
 */
export function withBodySizeLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  customMaxSize?: number
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const pathname = request.nextUrl.pathname;
    const maxSize = customMaxSize || getMaxBodySize(pathname);
    const { valid, response } = validateBodySize(request, pathname);
    
    if (!valid && response) {
      return response;
    }
    
    return handler(request);
  };
}
