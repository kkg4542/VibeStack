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
        <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full text-center space-y-8">
                <ServerCrash aria-hidden="true" className="mx-auto h-14 w-14 text-vibe-link" />
                <div className="space-y-3">
                    <h2 className="font-display text-balance text-[clamp(32px,4vw,48px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground">Community Stacks Unavailable</h2>
                    <p className="text-[17px] text-muted-foreground">
                        We&apos;re having trouble loading the community stacks database right now.
                    </p>
                </div>
                <div className="flex justify-center gap-4 pt-4">
                    <Button onClick={() => reset()} variant="default" className="h-11 rounded-none px-6 text-[16px] font-semibold">
                        <RefreshCcw aria-hidden="true" className="mr-2 h-4 w-4" />
                        Reload Stacks
                    </Button>
                    <Button asChild variant="secondary" className="h-11 rounded-none px-6 text-[16px] font-semibold hover:bg-accent">
                        <Link href="/">
                            Return Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
