'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CsrfContextType {
  token: string | null;
  isLoading: boolean;
}

const CsrfContext = createContext<CsrfContextType>({
  token: null,
  isLoading: true,
});

export function useCsrf() {
  return useContext(CsrfContext);
}

interface CsrfProviderProps {
  children: ReactNode;
  initialToken?: string | null;
}

export function CsrfProvider({ children, initialToken }: CsrfProviderProps) {
  const [token, setToken] = useState<string | null>(initialToken ?? null);
  const [isLoading, setIsLoading] = useState(!initialToken);

  useEffect(() => {
    if (initialToken) {
      setIsLoading(false);
      return;
    }

    // Fetch CSRF token if not provided
    async function fetchToken() {
      try {
        const response = await fetch('/api/csrf');
        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
        }
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchToken();
  }, [initialToken]);

  return (
    <CsrfContext.Provider value={{ token, isLoading }}>
      {children}
    </CsrfContext.Provider>
  );
}

/**
 * Hook to get CSRF token for API requests
 */
export function useCsrfToken(): string | null {
  const { token } = useCsrf();
  return token;
}

/**
 * Component to render CSRF token as hidden input
 */
interface CsrfInputProps {
  name?: string;
}

export function CsrfInput({ name = 'csrf_token' }: CsrfInputProps) {
  const { token, isLoading } = useCsrf();
  
  if (isLoading) {
    return <input type="hidden" name={name} value="loading" />;
  }
  
  return <input type="hidden" name={name} value={token ?? ''} />;
}
