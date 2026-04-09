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
        <main className="min-h-[80vh] flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="mx-auto w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-12 h-12 text-red-500/80" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Failed to load tool</h2>
                    <p className="text-muted-foreground">
                        We encountered an unexpected error while retrieving this tool&apos;s data. 
                        This might be a temporary database interruption.
                    </p>
                </div>
                <div className="flex justify-center gap-4 pt-4">
                    <Button onClick={() => reset()} variant="default" className="rounded-full">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Try again
                    </Button>
                    <Button asChild variant="outline" className="rounded-full">
                        <Link href="/tools">
                            Browse All Tools
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
