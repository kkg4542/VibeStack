"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
            <div className="max-w-md w-full text-center">
                {/* Error Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
                        <div className="relative p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                            <AlertTriangle className="h-12 w-12 text-red-500" />
                        </div>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-4 text-foreground">
                    Something Went Wrong
                </h1>

                <p className="text-muted-foreground mb-2">
                    We apologize for the inconvenience.
                </p>

                {error.message && (
                    <p className="text-sm text-muted-foreground/70 mb-8 font-mono bg-muted/50 p-3 rounded-lg">
                        {error.message}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                    <Button
                        onClick={reset}
                        variant="default"
                        className="rounded-full"
                    >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Again
                    </Button>

                    <Button asChild variant="outline" className="rounded-full">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>
                </div>

                {/* Debug Info */}
                {process.env.NODE_ENV === "development" && error.digest && (
                    <div className="mt-8 pt-8 border-t border-border">
                        <details className="text-left">
                            <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground flex items-center gap-2">
                                <Bug className="h-4 w-4" />
                                Debug Information
                            </summary>
                            <div className="mt-4 space-y-2 text-xs font-mono text-muted-foreground/80">
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

                <div className="mt-8 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                        Still having trouble?
                    </p>
                    <Link
                        href="mailto:hello@usevibestack.com"
                        className="text-sm text-indigo-500 hover:text-indigo-400 transition-colors"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </main>
    );
}
