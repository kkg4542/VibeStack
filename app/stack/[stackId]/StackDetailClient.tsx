"use client";

import Link from "next/link";
import { ArrowLeft, Check, ArrowRight, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Stack } from "@/lib/stacks";
import { ToolData } from "@/lib/tool-types";
import { getToolIcon } from "@/components/icons/tool-icons";
import { SocialShare } from "@/components/ui/SocialShare";
import { useState, useSyncExternalStore } from "react";
import {
    addLocalFavorite,
    isLocalFavorite,
    removeLocalFavorite,
    subscribeLocalFavorites,
} from "@/lib/favorites-storage";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { Container } from "@/components/primitives/Container";
import { StackViewTracker } from "@/components/stacks/StackViewTracker";
import { cn } from "@/lib/utils";
import { countToolsWithFreePlan } from "@/lib/stack-facts";

interface StackDetailClientProps {
    stack: Stack;
    metrics?: {
        views: number;
        saves: number;
        shares: number;
        popularityScore: number;
    } | null;
    stackTools: ToolData[];
}

// Direction B: flat tone steps, square corners, one orange accent with dark
// text. Content is plain markup (no framer opacity:0 entry states), so every
// section is visible in the SSR HTML and with JS off. The only motion is the
// CSS scroll-driven `.reveal` (never below opacity .35, off under reduced
// motion).
const sectionHeading = "font-display text-[clamp(32px,4vw,56px)] leading-[0.88] text-foreground mb-6";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link";
const squareButton = cn(
    "inline-flex h-12 items-center justify-center gap-2 rounded-none px-6 text-[16px] font-semibold transition-colors",
    focusRing
);

export function StackDetailClient({ stack, metrics, stackTools }: StackDetailClientProps) {
    // Stacks are always saved in this browser (localStorage, shared format in
    // lib/favorites-storage.ts, so /favorites lists them). useSyncExternalStore
    // keeps the SSR/hydration render at "not saved" and then reads the real value.
    const isFavorite = useSyncExternalStore(
        subscribeLocalFavorites,
        () => isLocalFavorite(stack.id, "stack"),
        () => false
    );
    const [favoriteStatus, setFavoriteStatus] = useState("");

    // Derived from each tool's own pricing field; null (hidden) unless every
    // tool of the stack is present in `stackTools`.
    const totalTools = stack.tools.length;
    const freeCount = countToolsWithFreePlan(stack.tools, stackTools);

    const toggleFavorite = () => {
        const next = isFavorite
            ? removeLocalFavorite(stack.id, "stack")
            : addLocalFavorite(stack.id, "stack");
        if (next === null) {
            setFavoriteStatus("Could not save: your browser is blocking local storage.");
            return;
        }
        setFavoriteStatus(isFavorite ? `${stack.name} removed from your favorites.` : `${stack.name} saved to your favorites.`);
    };

    return (
        <PageBackground {...BackgroundPresets.content}>
            <StackViewTracker stackId={stack.id} />
            <Container>
                {/* Back Link */}
                <Link
                    href="/build"
                    className={cn(
                        "group mb-8 inline-flex items-center text-[16px] text-muted-foreground transition-colors hover:text-foreground",
                        focusRing
                    )}
                >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                    Back to Stack Finder
                </Link>

                {/* Hero */}
                <div
                    className={cn(
                        "mb-16 grid",
                        freeCount !== null && "lg:grid-cols-[minmax(0,1fr)_18rem]"
                    )}
                >
                    <div className="bg-card p-8 md:p-12">
                        {/* Tags */}
                        <ul className="mb-6 flex flex-wrap gap-2">
                            {stack.tags.map((tag) => (
                                <li key={tag} className="bg-secondary px-3 py-1 text-[14px] text-foreground">
                                    {tag}
                                </li>
                            ))}
                        </ul>

                        {/* Title (stack.color is a neutral token since direction B) */}
                        <h1 className={cn("font-display mb-6 text-[clamp(40px,6vw,96px)] leading-[0.88] text-balance", stack.color)}>
                            {stack.name}
                        </h1>

                        <p className="mb-8 max-w-3xl text-[20px] leading-normal text-muted-foreground">
                            {stack.description}
                        </p>

                        {/* Quick Stats */}
                        <dl className="mb-10 flex flex-wrap gap-x-10 gap-y-4">
                            {freeCount !== null && (
                                <div>
                                    <dt className="text-[14px] text-muted-foreground">With a free plan</dt>
                                    <dd className="font-display text-[40px] leading-none tabular-nums text-foreground">
                                        {freeCount}/{totalTools}
                                    </dd>
                                </div>
                            )}
                            <div>
                                <dt className="text-[14px] text-muted-foreground">Tools</dt>
                                <dd className="font-display text-[40px] leading-none tabular-nums text-foreground">{stackTools.length}</dd>
                            </div>
                            <div>
                                <dt className="text-[14px] text-muted-foreground">Steps</dt>
                                <dd className="font-display text-[40px] leading-none tabular-nums text-foreground">{stack.workflow.length}</dd>
                            </div>
                        </dl>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-start gap-4">
                            <button
                                type="button"
                                onClick={toggleFavorite}
                                aria-pressed={isFavorite}
                                className={cn(
                                    squareButton,
                                    isFavorite
                                        ? "bg-vibe-electric text-vibe-deep hover:bg-[#e8401a]"
                                        : "bg-secondary text-foreground hover:bg-muted"
                                )}
                            >
                                <Heart aria-hidden="true" className={cn("h-4 w-4", isFavorite && "fill-current")} />
                                {isFavorite ? "Saved" : "Save Stack"}
                            </button>
                            <span role="status" aria-live="polite" className="sr-only">
                                {favoriteStatus}
                            </span>
                            <Link
                                href="/build"
                                className={cn(squareButton, "bg-secondary text-foreground hover:bg-muted")}
                            >
                                Find Another
                            </Link>
                        </div>

                        <div className="mt-8">
                            <SocialShare
                                toolSlug={stack.id}
                                toolName={stack.name}
                                url={`https://usevibestack.com/stack/${stack.id}`}
                                label="Share this stack"
                            />
                        </div>
                    </div>

                    {/* Free-plan summary: the page's one orange field */}
                    {freeCount !== null && (
                        <div className="flex flex-col justify-end bg-vibe-electric p-8 text-vibe-deep">
                            <h2 className="text-[16px] font-semibold">Free plans</h2>
                            <div className="font-display my-3 text-[clamp(56px,6vw,88px)] leading-[0.88] tabular-nums">
                                {freeCount}/{totalTools}
                            </div>
                            <p className="text-[16px] leading-normal">
                                {freeCount === 1 ? "tool in this stack offers" : "tools in this stack offer"} a free plan, per each tool&apos;s own page
                            </p>
                        </div>
                    )}
                </div>

                <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
                    {/* Main Content */}
                    <div className="space-y-16 lg:col-span-2">
                        {/* About This Stack */}
                        <section className="reveal">
                            <h2 className={sectionHeading}>About This Stack</h2>
                            <div className="bg-card p-8">
                                <p className="text-[18px] leading-relaxed text-muted-foreground">
                                    {stack.longDescription}
                                </p>
                            </div>
                        </section>

                        {/* Workflow Section */}
                        <section className="reveal">
                            <h2 className={sectionHeading}>How It Works</h2>
                            <ol className="flex flex-col">
                                {stack.workflow.map((step, index) => (
                                    <li
                                        key={index}
                                        className={cn(
                                            "flex items-baseline gap-6 p-6",
                                            index % 2 === 0 ? "bg-card" : "bg-background"
                                        )}
                                    >
                                        <span className="font-display w-10 shrink-0 text-[40px] leading-none tabular-nums text-vibe-link">
                                            {index + 1}
                                        </span>
                                        <p className="flex-1 text-[18px] leading-relaxed text-foreground">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </section>

                        {/* Tools in Stack */}
                        <section className="reveal">
                            <h2 className={sectionHeading}>Tools Included ({stackTools.length})</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {stackTools.map((tool) => {
                                    if (!tool) return null;
                                    const Icon = getToolIcon(tool.slug);
                                    return (
                                        <Link
                                            key={tool.slug}
                                            href={`/tool/${tool.slug}`}
                                            className={cn(
                                                "group flex h-full flex-col bg-card p-6 transition-colors hover:bg-secondary",
                                                focusRing
                                            )}
                                        >
                                            <div className="mb-4 flex items-start justify-between">
                                                <div className="bg-secondary p-3 text-foreground group-hover:bg-background">
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-vibe-link motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                                            </div>
                                            <h3 className="mb-1 text-[18px] font-semibold text-foreground">{tool.title}</h3>
                                            <p className="mb-3 text-[14px] text-muted-foreground">{tool.category}</p>
                                            <p className="mb-4 line-clamp-2 text-[16px] text-muted-foreground">
                                                {tool.description}
                                            </p>
                                            <span className="mt-auto w-fit bg-secondary px-3 py-1 text-[14px] text-foreground group-hover:bg-background">
                                                {tool.pricing}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Ideal For Section */}
                        <section className="reveal">
                            <h2 className={sectionHeading}>Ideal For</h2>
                            <ul className="flex flex-wrap gap-3">
                                {stack.idealFor.map((item) => (
                                    <li key={item} className="inline-flex items-center bg-card px-5 py-2.5 text-[16px] text-foreground">
                                        <Check className="mr-2 h-4 w-4 text-vibe-link" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* CTA: inverse field */}
                        <div className="bg-foreground p-6 text-background lg:sticky lg:top-24">
                            <h3 className="mb-4 text-[20px] font-semibold">Ready to Build?</h3>
                            <p className="mb-6 text-[16px] leading-normal opacity-80">
                                Start using this stack today and accelerate your development workflow.
                            </p>
                            <div className="space-y-3">
                                <Link
                                    href="/build"
                                    className={cn(squareButton, "w-full bg-vibe-electric text-vibe-deep hover:bg-[#e8401a]")}
                                >
                                    Find Your Stack
                                </Link>
                                <Link
                                    href="/tools"
                                    className={cn(squareButton, "w-full bg-background text-foreground hover:bg-card")}
                                >
                                    Browse All Tools
                                </Link>
                            </div>
                        </div>

                        {/* Curator Profile */}
                        {stack.curatedBy && (
                            <div className="bg-card p-6">
                                <h3 className="mb-4 text-[16px] font-semibold">Curated By</h3>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={stack.curatedBy.avatar} alt={stack.curatedBy.name} />
                                        <AvatarFallback className="bg-secondary font-semibold text-foreground">
                                            {stack.curatedBy.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="text-[16px] font-semibold text-foreground">{stack.curatedBy.name}</div>
                                        <div className="text-[14px] text-muted-foreground">{stack.curatedBy.role}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Stack Stats */}
                        <div className="bg-card p-6">
                            <h3 className="mb-4 text-[16px] font-semibold">Stack Stats</h3>
                            <dl className="space-y-1">
                                {[
                                    { label: "Tools", value: stackTools.length },
                                    ...(freeCount !== null
                                        ? [{ label: "With a free plan", value: `${freeCount} of ${totalTools}` }]
                                        : []),
                                    { label: "Workflow Steps", value: stack.workflow.length },
                                    { label: "Target Users", value: `${stack.idealFor.length} types` },
                                ].map((row, index) => (
                                    <div
                                        key={row.label}
                                        className={cn(
                                            "flex items-center justify-between px-3 py-2",
                                            index % 2 === 0 ? "bg-background" : "bg-card"
                                        )}
                                    >
                                        <dt className="text-[14px] text-muted-foreground">{row.label}</dt>
                                        <dd className="text-[16px] font-semibold text-foreground">{row.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        {/* Community Insights — only when we have real, non-zero metrics.
                            No fake fallback numbers: each stat renders only if it's
                            actually > 0, and the whole card disappears if none are. */}
                        {(() => {
                            const hasViews = !!metrics?.views;
                            const hasShares = !!metrics?.shares;
                            const hasPopularity = !!metrics?.popularityScore;

                            if (!hasViews && !hasShares && !hasPopularity) {
                                return null;
                            }

                            return (
                                <div className="bg-card p-6">
                                    <h3 className="mb-6 text-[16px] font-semibold">Community Insights</h3>

                                    {(hasViews || hasShares) && (
                                        <div className={cn("grid gap-4", hasViews && hasShares ? "grid-cols-2" : "grid-cols-1")}>
                                            {hasViews && (
                                                <div className="bg-background p-4">
                                                    <div className="mb-1 text-[14px] text-muted-foreground">Views</div>
                                                    <div className="font-display text-[32px] leading-none tabular-nums text-foreground">
                                                        {metrics!.views.toLocaleString()}
                                                    </div>
                                                </div>
                                            )}
                                            {hasShares && (
                                                <div className="bg-background p-4">
                                                    <div className="mb-1 text-[14px] text-muted-foreground">Shares</div>
                                                    <div className="font-display text-[32px] leading-none tabular-nums text-vibe-link">
                                                        {metrics!.shares.toLocaleString()}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {hasPopularity && (
                                        <div className="mt-6">
                                            <div className="flex items-center justify-between text-[14px] text-muted-foreground">
                                                <span>Popularity Score</span>
                                                <span className="font-semibold text-vibe-link">{metrics!.popularityScore}/100</span>
                                            </div>
                                            <div className="mt-2 h-2 w-full overflow-hidden bg-background">
                                                <div
                                                    className="h-full bg-vibe-electric"
                                                    style={{ width: `${metrics!.popularityScore}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </aside>
                </div>
            </Container>
        </PageBackground>
    );
}
