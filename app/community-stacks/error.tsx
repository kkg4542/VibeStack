'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ServerCrash, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function CommunityStacksError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Community Stacks Error boundary triggered:", error);
    }, [error]);

    return (
        <main className="min-h-[80vh] flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="mx-auto w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <ServerCrash className="w-12 h-12 text-yellow-500/80" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Community Stacks Unavailable</h2>
                    <p className="text-muted-foreground">
                        We&apos;re having trouble loading the community stacks database right now.
                    </p>
                </div>
                <div className="flex justify-center gap-4 pt-4">
                    <Button onClick={() => reset()} variant="default" className="rounded-full">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Reload Stacks
                    </Button>
                    <Button asChild variant="outline" className="rounded-full">
                        <Link href="/">
                            Return Home
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
