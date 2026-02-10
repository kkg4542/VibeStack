import { NextRequest, NextResponse } from "next/server";

interface HoneypotConfig {
  fieldName: string;
  enabled: boolean;
}

const defaultConfig: HoneypotConfig = {
  fieldName: "website_url", // Common bot-attracting field name
  enabled: process.env.NODE_ENV === "production",
};

interface HoneypotResult {
  valid: boolean;
  isBot: boolean;
}

/**
 * Check if request is from a bot using honeypot field
 * Bots will typically fill hidden fields that humans ignore
 */
export function checkHoneypot(
  request: NextRequest,
  config: Partial<HoneypotConfig> = {}
): HoneypotResult {
  const mergedConfig = { ...defaultConfig, ...config };
  
  if (!mergedConfig.enabled) {
    return { valid: true, isBot: false };
  }
  
  // Check URL query params
  const url = new URL(request.url);
  const queryValue = url.searchParams.get(mergedConfig.fieldName);
  
  if (queryValue && queryValue.trim() !== "") {
    return { valid: false, isBot: true };
  }
  
  return { valid: true, isBot: false };
}

/**
 * Check honeypot from JSON body
 */
export async function checkHoneypotFromBody(
  request: NextRequest,
  config: Partial<HoneypotConfig> = {}
): Promise<HoneypotResult> {
  const mergedConfig = { ...defaultConfig, ...config };
  
  if (!mergedConfig.enabled) {
    return { valid: true, isBot: false };
  }
  
  try {
    const clonedRequest = request.clone();
    const body = await clonedRequest.json();
    
    if (body[mergedConfig.fieldName] && String(body[mergedConfig.fieldName]).trim() !== "") {
      return { valid: false, isBot: true };
    }
    
    return { valid: true, isBot: false };
  } catch {
    // If body parsing fails, assume valid (will be caught by other validation)
    return { valid: true, isBot: false };
  }
}

/**
 * Create honeypot detection response
 */
export function createHoneypotResponse(): NextResponse {
  return NextResponse.json(
    {
      error: "Invalid request",
      message: "Your submission could not be processed. Please try again.",
      code: "HONEYPOT_TRIGGERED",
    },
    { status: 400 }
  );
}

/**
 * Middleware wrapper to check honeypot
 */
export function withHoneypot(
  handler: (request: NextRequest) => Promise<NextResponse>,
  config: Partial<HoneypotConfig> = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    // Check query params first
    const queryCheck = checkHoneypot(request, config);
    if (!queryCheck.valid) {
      return createHoneypotResponse();
    }
    
    // Check body for POST requests
    if (request.method === "POST") {
      const bodyCheck = await checkHoneypotFromBody(request, config);
      if (!bodyCheck.valid) {
        return createHoneypotResponse();
      }
    }
    
    return handler(request);
  };
}

/**
 * React component props for honeypot field
 */
export interface HoneypotFieldProps {
  fieldName?: string;
  label?: string;
}

/**
 * Get honeypot field styles (visually hidden but accessible)
 */
export function getHoneypotStyles(): React.CSSProperties {
  return {
    position: "absolute",
    left: "-9999px",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    opacity: 0,
    pointerEvents: "none",
  };
}
