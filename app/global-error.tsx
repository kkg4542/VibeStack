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
    <html lang="en">
      <body className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <AlertCircle className="w-12 h-12 text-vibe-link" aria-hidden="true" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-display uppercase leading-[0.9] text-[clamp(40px,6vw,72px)] text-foreground text-balance">Something went wrong</h1>
            <p className="text-base text-muted-foreground">
              We apologize for the inconvenience. Our team has been notified and is working on a fix.
            </p>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="p-4 bg-secondary rounded-none text-left overflow-auto">
              <p className="text-[15px] font-mono text-foreground" /* taste-skill-ignore */>{error.message}</p>
              <pre className="text-[13px] text-muted-foreground mt-2" /* taste-skill-ignore */>{error.stack}</pre>
            </div>
          )}

          <Button onClick={reset} variant="gradient" size="lg" className="gap-2 rounded-none">
            <RefreshCcw className="w-4 h-4" />
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
