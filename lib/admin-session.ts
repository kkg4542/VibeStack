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
  
  if (!session) {
    return {
      isValid: false,
      expiresAt: null,
      timeRemaining: 0,
      shouldWarn: false,
    };
  }
  
  // Get session expiration from request headers or cookies
  const sessionExpiry = request.cookies.get("next-auth.session-token")?.value ||
                       request.cookies.get("__Secure-next-auth.session-token")?.value;
  
  // For JWT sessions, we need to check the token expiration
  // This is a simplified check - in production, decode and verify JWT
  const now = Date.now();
  const maxAge = ADMIN_SESSION_CONFIG.maxAge * 1000; // Convert to ms
  
  // Assume session started when cookie was set (simplified)
  // In production, store session start time in database
  return {
    isValid: true,
    expiresAt: new Date(now + maxAge),
    timeRemaining: maxAge / 1000,
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

/**
 * Extend admin session (call this on user activity)
 */
export async function extendAdminSession(): Promise<void> {
  // In a real implementation, this would update the session in the database
  // or refresh the JWT token
  // For now, this is a placeholder
}
