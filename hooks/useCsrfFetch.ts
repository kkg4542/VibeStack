'use client';

import { useCsrfToken } from "@/components/providers/CsrfProvider";

interface FetchOptions extends RequestInit {
  skipCsrf?: boolean;
}

/**
 * Hook to make API requests with automatic CSRF token handling
 */
export function useCsrfFetch() {
  const csrfToken = useCsrfToken();

  /**
   * Fetch wrapper that automatically includes CSRF token
   */
  async function csrfFetch(url: string, options: FetchOptions = {}): Promise<Response> {
    const { skipCsrf = false, headers: initialHeaders, ...restOptions } = options;
    
    // Build headers
    const headers = new Headers(initialHeaders);
    
    // Add CSRF token for state-changing methods
    const method = (options.method ?? 'GET').toUpperCase();
    const stateChangingMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
    
    if (!skipCsrf && stateChangingMethods.includes(method) && csrfToken) {
      headers.set('x-csrf-token', csrfToken);
    }
    
    // Set default content type for JSON if not specified
    if (!headers.has('Content-Type') && method !== 'GET' && method !== 'HEAD') {
      headers.set('Content-Type', 'application/json');
    }
    
    return fetch(url, {
      ...restOptions,
      headers,
      credentials: 'include', // Ensure cookies are sent
    });
  }

  return { csrfFetch, csrfToken };
}

/**
 * Standalone function for use outside of React components
 * Uses the CSRF token from the cookie
 */
export async function fetchWithCsrf(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers);
  const method = (options.method ?? 'GET').toUpperCase();
  const stateChangingMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  
  // For state-changing methods, we need to get the token
  if (stateChangingMethods.includes(method)) {
    try {
      // Try to get token from cookie first (it should be there from middleware)
      const tokenResponse = await fetch('/api/csrf', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (tokenResponse.ok) {
        const { token } = await tokenResponse.json();
        if (token) {
          headers.set('x-csrf-token', token);
        }
      }
    } catch (error) {
      console.warn('Failed to fetch CSRF token:', error);
    }
  }
  
  return fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
}

/**
 * Utility to add CSRF token to FormData
 */
export function appendCsrfToFormData(
  formData: FormData, 
  token: string | null
): FormData {
  if (token) {
    formData.set('csrf_token', token);
  }
  return formData;
}
