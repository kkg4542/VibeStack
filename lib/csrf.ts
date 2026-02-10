import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';
const CSRF_FORM_FIELD = 'csrf_token';
const TOKEN_LENGTH = 32;

/**
 * Generate a cryptographically secure CSRF token
 */
export async function generateCsrfToken(): Promise<string> {
  const array = new Uint8Array(TOKEN_LENGTH);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Set CSRF token in cookie
 */
export async function setCsrfToken(): Promise<string> {
  const token = await generateCsrfToken();
  const cookieStore = await cookies();
  
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  
  return token;
}

/**
 * Get CSRF token from cookie
 */
export async function getCsrfToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_COOKIE_NAME)?.value ?? null;
}

/**
 * Extract CSRF token from request (header, body, or form data)
 */
export function extractCsrfTokenFromRequest(request: NextRequest): string | null {
  // Check header first
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  if (headerToken) return headerToken;
  
  // Check query params
  const url = new URL(request.url);
  const queryToken = url.searchParams.get(CSRF_FORM_FIELD);
  if (queryToken) return queryToken;
  
  return null;
}

/**
 * Extract CSRF token from FormData
 */
export async function extractCsrfTokenFromFormData(request: NextRequest): Promise<string | null> {
  try {
    const formData = await request.formData();
    return formData.get(CSRF_FORM_FIELD)?.toString() ?? null;
  } catch {
    return null;
  }
}

/**
 * Extract CSRF token from JSON body
 */
export async function extractCsrfTokenFromJson(request: NextRequest): Promise<string | null> {
  try {
    const clonedRequest = request.clone();
    const body = await clonedRequest.json();
    return body?.csrf_token ?? null;
  } catch {
    return null;
  }
}

/**
 * Validate CSRF token
 */
export async function validateCsrfToken(request: NextRequest): Promise<{ valid: boolean; token: string | null }> {
  const cookieToken = (await cookies()).get(CSRF_COOKIE_NAME)?.value ?? null;
  
  if (!cookieToken) {
    return { valid: false, token: null };
  }
  
  // Try to get token from various sources
  let requestToken = extractCsrfTokenFromRequest(request);
  
  if (!requestToken) {
    // Check Content-Type to determine how to parse body
    const contentType = request.headers.get('content-type') ?? '';
    
    if (contentType.includes('application/json')) {
      requestToken = await extractCsrfTokenFromJson(request);
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      requestToken = await extractCsrfTokenFromFormData(request);
    }
  }
  
  if (!requestToken) {
    return { valid: false, token: cookieToken };
  }
  
  // Use timing-safe comparison
  const valid = await timingSafeCompare(cookieToken, requestToken);
  return { valid, token: cookieToken };
}

/**
 * Timing-safe string comparison to prevent timing attacks
 */
async function timingSafeCompare(a: string, b: string): Promise<boolean> {
  if (a.length !== b.length) {
    // Still do comparison to prevent timing attacks
    const dummy = 'a'.repeat(Math.max(a.length, b.length));
    crypto.subtle.digest('SHA-256', new TextEncoder().encode(dummy));
    return false;
  }
  
  const encoder = new TextEncoder();
  const aBuffer = encoder.encode(a);
  const bBuffer = encoder.encode(b);
  
  // Use SubtleCrypto for timing-safe comparison
  const aHash = await crypto.subtle.digest('SHA-256', aBuffer);
  const bHash = await crypto.subtle.digest('SHA-256', bBuffer);
  
  const aArray = new Uint8Array(aHash);
  const bArray = new Uint8Array(bHash);
  
  let result = 0;
  for (let i = 0; i < aArray.length; i++) {
    result |= aArray[i] ^ bArray[i];
  }
  
  return result === 0;
}

/**
 * Check if request method requires CSRF protection
 */
export function isCsrfProtectedMethod(method: string): boolean {
  const protectedMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  return protectedMethods.includes(method.toUpperCase());
}

/**
 * Check if path should be excluded from CSRF protection
 */
export function isCsrfExcludedPath(path: string): boolean {
  const excludedPaths = [
    '/api/auth',
    '/api/webhooks',
    '/api/stripe/webhook',
  ];
  
  return excludedPaths.some(excluded => path.startsWith(excluded));
}

export {
  CSRF_COOKIE_NAME,
  CSRF_HEADER_NAME,
  CSRF_FORM_FIELD,
};
