import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

interface AdminSessionConfig {
  maxAge: number; // Maximum session age in seconds
  warningThreshold: number; // Warning threshold in seconds
}

const ADMIN_SESSION_CONFIG: AdminSessionConfig = {
  maxAge: 8 * 60 * 60, // 8 hours for admin sessions
  warningThreshold: 30 * 60, // Warn 30 minutes before expiration
};

interface SessionInfo {
  isValid: boolean;
  expiresAt: Date | null;
  timeRemaining: number; // in seconds
  shouldWarn: boolean;
}

/**
 * Check if admin session is still valid
 */
export async function checkAdminSession(request: NextRequest): Promise<SessionInfo> {
  const session = await auth();
  
  if (!session || !session.user) {
    return {
      isValid: false,
      expiresAt: null,
      timeRemaining: 0,
      shouldWarn: false,
    };
  }
  
  // Check for session expiration using the session's built-in expires field
  const sessionExpires = (session as any).expires;
  
  if (sessionExpires) {
    const expiresAt = new Date(sessionExpires);
    const now = Date.now();
    const timeRemainingMs = expiresAt.getTime() - now;
    const timeRemaining = Math.max(0, Math.floor(timeRemainingMs / 1000));
    
    // Apply admin-specific max age (stricter than general session)
    const adminMaxAgeMs = ADMIN_SESSION_CONFIG.maxAge * 1000;
    const adminTimeRemaining = Math.min(timeRemaining, ADMIN_SESSION_CONFIG.maxAge);
    
    if (timeRemainingMs <= 0) {
      return {
        isValid: false,
        expiresAt,
        timeRemaining: 0,
        shouldWarn: false,
      };
    }
    
    return {
      isValid: true,
      expiresAt,
      timeRemaining: adminTimeRemaining,
      shouldWarn: timeRemaining <= ADMIN_SESSION_CONFIG.warningThreshold,
    };
  }
  
  // If no expiration info available, session is valid but apply default timeout
  return {
    isValid: true,
    expiresAt: new Date(Date.now() + ADMIN_SESSION_CONFIG.maxAge * 1000),
    timeRemaining: ADMIN_SESSION_CONFIG.maxAge,
    shouldWarn: false,
  };
}

/**
 * Middleware to enforce admin session timeout
 */
export async function requireAdminSession(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const sessionInfo = await checkAdminSession(request);
  
  if (!sessionInfo.isValid) {
    return NextResponse.json(
      {
        error: "Session expired",
        code: "SESSION_EXPIRED",
        message: "Your session has expired. Please sign in again.",
      },
      { status: 401 }
    );
  }
  
  // Add session warning header if close to expiration
  const response = await handler(request);
  
  if (sessionInfo.shouldWarn) {
    response.headers.set("X-Session-Warning", "true");
    response.headers.set("X-Session-Time-Remaining", sessionInfo.timeRemaining.toString());
  }
  
  return response;
}

/**
 * Check if user needs to re-authenticate for sensitive operations
 */
export async function requireReauthentication(
  request: NextRequest,
  lastAuthTime: Date | null,
  maxAgeMinutes: number = 15
): Promise<boolean> {
  if (!lastAuthTime) {
    return true;
  }
  
  const now = Date.now();
  const lastAuth = lastAuthTime.getTime();
  const maxAgeMs = maxAgeMinutes * 60 * 1000;
  
  return now - lastAuth > maxAgeMs;
}

