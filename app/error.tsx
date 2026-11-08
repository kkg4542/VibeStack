"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import * as Sentry from "@sentry/nextjs";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
        // Report to Sentry
        Sentry.captureException(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
            <div className="max-w-xl w-full text-center bg-card px-6 py-12 sm:px-10">
                {/* Error Icon */}
                <div className="mb-8 flex justify-center">
                    <AlertTriangle className="h-12 w-12 text-vibe-link" aria-hidden="true" />
                </div>

                <h1 className="font-display uppercase leading-[0.9] text-[clamp(40px,6vw,72px)] mb-6 text-foreground text-balance">
                    Something Went Wrong
                </h1>

                <p className="text-base text-muted-foreground mb-2">
                    We apologize for the inconvenience.
                </p>

                {process.env.NODE_ENV === "development" && error.message && (
                    <p className="text-[15px] text-foreground mb-8 font-mono bg-secondary p-3 rounded-none text-left break-all" /* taste-skill-ignore */>
                        {error.message}
                    </p>
                )}

                {process.env.NODE_ENV !== "development" && (
                    <p className="text-base text-muted-foreground mb-8">
                        An unexpected error occurred. Please try again or contact support if the problem persists.
                    </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                    <Button
                        onClick={reset}
                        variant="gradient"
                        size="lg"
                        className="rounded-none"
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Again
                    </Button>

                    <Button asChild variant="secondary" size="lg" className="rounded-none">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>
                </div>

                {/* Debug Info */}
                {process.env.NODE_ENV === "development" && error.digest && (
                    <div className="mt-10">
                        <details className="text-left">
                            <summary className="text-base text-muted-foreground cursor-pointer hover:text-foreground flex items-center gap-2">
                                <Bug className="h-4 w-4" />
                                Debug Information
                            </summary>
                            <div className="mt-4 space-y-2 text-[13px] font-mono text-foreground bg-secondary p-3" /* taste-skill-ignore */>
                                <p>
                                    <span className="font-semibold">Digest:</span> {error.digest}
                                </p>
                                <p className="break-all">
                                    <span className="font-semibold">Stack:</span>
                                    <br />
                                    {error.stack?.split('\n').slice(0, 3).map((line, i) => (
                                        <span key={i} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </details>
                    </div>
                )}

                <div className="mt-10">
                    <p className="text-base text-muted-foreground mb-4">
                        Still having trouble?
                    </p>
                    <Link
                        href="mailto:hello@usevibestack.com"
                        className="text-base font-semibold text-vibe-link underline-offset-4 hover:underline"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
