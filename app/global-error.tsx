"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-destructive/10">
              <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-balance">Something went wrong</h1>
            <p className="text-muted-foreground">
              We apologize for the inconvenience. Our team has been notified and is working on a fix.
            </p>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="p-4 bg-muted rounded-lg text-left overflow-auto">
              <p className="text-sm font-mono text-destructive">{error.message}</p>
              <pre className="text-xs text-muted-foreground mt-2">{error.stack}</pre>
            </div>
          )}

          <Button onClick={reset} className="gap-2">
            <RefreshCcw className="w-4 h-4" />
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
