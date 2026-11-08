'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function ToolError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service like Sentry
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full text-center space-y-8">
                <AlertCircle aria-hidden="true" className="mx-auto h-12 w-12 text-vibe-link" />
                <div className="space-y-3">
                    <h2 className="font-display text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground text-balance">Failed to load tool</h2>
                    <p className="text-base text-muted-foreground">
                        We encountered an unexpected error while retrieving this tool&apos;s data. 
                        This might be a temporary database interruption.
                    </p>
                    {/* Error details are only shown in development to avoid leaking stack traces to end users in production. */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-4 p-4 bg-card text-foreground text-[14px] text-left overflow-auto">
                            <p className="font-bold">Error Details:</p>
                            <pre>{error.message}</pre>
                            {error.stack && <pre className="mt-2 text-[13px] text-muted-foreground">{error.stack}</pre>}
                        </div>
                    )}
                </div>
                <div className="flex justify-center gap-4 pt-4">
                    <Button onClick={() => reset()} variant="default" className="h-11 rounded-none px-6 text-[16px] font-semibold">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Try again
                    </Button>
                    <Button asChild variant="secondary" className="h-11 rounded-none bg-card px-6 text-[16px] hover:bg-accent">
                        <Link href="/tools">
                            Browse All Tools
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
