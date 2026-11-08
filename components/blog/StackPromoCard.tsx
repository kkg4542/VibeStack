"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStackById } from "@/lib/stacks";

interface StackPromoCardProps {
    stackId: string;
}

/**
 * In-article stack recommendation. Direction B: an inverse field (ink ground,
 * ground text) with one orange action. The stack's emoji icon is no longer
 * rendered; the stack's initial sits on a flat square instead.
 */
export function StackPromoCard({ stackId }: StackPromoCardProps) {
    const stack = getStackById(stackId);

    if (!stack) return null;

    return (
        <aside className="my-16 bg-foreground p-6 text-background sm:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
                <div
                    aria-hidden="true"
                    className="flex h-20 w-20 shrink-0 items-center justify-center bg-background font-display text-[44px] uppercase leading-none text-foreground"
                >
                    {stack.name.charAt(0)}
                </div>

                <div className="flex-1 space-y-3">
                    <p className="text-[15px] font-semibold text-background/75">Recommended stack</p>
                    <h3 className="text-[26px] font-semibold leading-tight text-background">{stack.name}</h3>
                    <p className="text-[17px] leading-normal text-background">{stack.description}</p>
                    {stack.tags.length > 0 && (
                        <p className="text-[15px] text-background/75">{stack.tags.slice(0, 3).join(", ")}</p>
                    )}
                </div>

                <div className="shrink-0">
                    <Link
                        href={`/stack/${stack.id}`}
                        className="group inline-flex h-12 items-center gap-2 bg-vibe-electric px-7 text-[16px] font-semibold text-vibe-deep transition-colors hover:bg-vibe-electric/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vibe-electric"
                    >
                        Try This Stack
                        <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                        />
                    </Link>
                </div>
            </div>
        </aside>
    );
}
