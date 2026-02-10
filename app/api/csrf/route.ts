import { NextResponse } from "next/server";
import { getCsrfToken, setCsrfToken } from "@/lib/csrf";
import { auth } from "@/auth";

/**
 * GET /api/csrf
 * Returns the current CSRF token or generates a new one
 */
export async function GET() {
  try {
    // Check if user is authenticated
    const session = await auth();
    
    // Get existing token or generate new one
    let token = await getCsrfToken();
    
    if (!token) {
      token = await setCsrfToken();
    }
    
    return NextResponse.json(
      { 
        token,
        authenticated: !!session?.user 
      },
      { 
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
        }
      }
    );
  } catch (error) {
    console.error("CSRF token generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/csrf
 * Regenerates CSRF token (useful for token rotation)
 */
export async function POST() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    const token = await setCsrfToken();
    
    return NextResponse.json(
      { token },
      { status: 200 }
    );
  } catch (error) {
    console.error("CSRF token regeneration error:", error);
    return NextResponse.json(
      { error: "Failed to regenerate CSRF token" },
      { status: 500 }
    );
  }
}
