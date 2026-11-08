"use client";

import { Metadata } from "next";
import { ToolsList } from "./ToolsList";
import { ShieldCheck, RefreshCw, Layers, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const PageBackground = dynamic(() => import("@/components/effects/PageBackground").then(mod => mod.PageBackground), { ssr: false });
import { BackgroundPresets } from "@/components/effects/PageBackground";
import { useTools } from "@/hooks/use-tools";
import { ToolData } from "@/lib/tool-types";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import { SearchInput } from "@/components/ui/search-input";
import { Container } from "@/components/primitives/Container";

// Note: Metadata moved to page.tsx (Server Component) for SEO

export default function ToolsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("All");
    const [pricing, setPricing] = useState("All");
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("default");

    const debouncedSearch = useDebounce(searchQuery, 300);

    const { tools, pagination, isLoading } = useTools({
        q: debouncedSearch || undefined,
        category: category === "All" ? undefined : category.toLowerCase(),
        pricing: pricing === "All" ? undefined : pricing.toLowerCase(),
        page,
        limit: 20
    });

    // Stats calculations (use total from pagination if available)
    const totalTools = pagination?.total ?? tools.length;
    // Categories and Free options stats are usually static or from a separate summary API, 
    // for now we'll use estimates or keep them if they don't break.
    const categoriesCount = 12; // Static estimate or could be fetched
    const freeToolsCount = Math.floor(totalTools * 0.7); // Rough estimate for now
    const starterStackFallbacks = [
        {
            id: "indie-builder",
            name: "Indie Builder Stack",
            summary: "Ship an MVP with speed and low overhead.",
            tools: ["Cursor", "v0", "Claude"]
        },
        {
            id: "research-writing",
            name: "Research & Writing Stack",
            summary: "From research to publishable drafts in one flow.",
            tools: ["Perplexity", "Claude", "Notion AI"]
        },
        {
            id: "fullstack-ai-dev",
            name: "Full-Stack AI Dev Stack",
            summary: "Build complete apps with AI-powered coding.",
            tools: ["Cursor", "GitHub Copilot", "Vercel v0"]
        },
        {
            id: "ai-content-creator",
            name: "AI Content Creator Stack",
            summary: "Create, edit, and publish content faster.",
            tools: ["ChatGPT", "Midjourney", "Descript"]
        }
    ];
    // Shape of /api/stacks/featured, which resolves every card out of
    // lib/stacks.ts — so `id` is always a stack page that exists.
    const [featuredStacks, setFeaturedStacks] = useState<Array<{
        id: string;
        name: string;
        description: string;
        tools: { name: string; slug: string }[];
    }>>([]);

    useEffect(() => {
        let isMounted = true;
        fetch("/api/stacks/featured?limit=4")
            .then((res) => res.json())
            .then((data) => {
                if (!isMounted) return;
                if (Array.isArray(data?.stacks) && data.stacks.length > 0) {
                    setFeaturedStacks(data.stacks);
                }
            })
            .catch(() => {
                // Fallback is handled by render
            });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        // The page header (badge, H1, intro) is server-rendered in
        // app/tools/page.tsx and sits directly above this block, so it owns the
        // offset under the fixed nav. Keep this padding small or the two halves
        // of the hero drift apart.
        <PageBackground {...BackgroundPresets.content} className="pt-8">
            <Container size="default">
                <div className="mb-16">
                    {/* The badge, H1 and lead paragraph live in
                        app/tools/page.tsx. They are static copy, and keeping
                        them here left the hub with no heading and no intro in
                        the prerendered HTML. */}
                    {/* Quick Stats */}
                    <dl className="mb-12 grid grid-cols-3 gap-1">
                        <div className="flex flex-col-reverse bg-card px-4 py-4 sm:px-6">
                            <dt className="mt-2 text-[14px] text-muted-foreground sm:text-[16px]">Tools listed</dt>
                            <dd className="font-display text-[clamp(32px,4vw,56px)] tabular-nums text-foreground">{totalTools}+</dd>
                        </div>
                        <div className="flex flex-col-reverse bg-card px-4 py-4 sm:px-6">
                            <dt className="mt-2 text-[14px] text-muted-foreground sm:text-[16px]">Categories</dt>
                            <dd className="font-display text-[clamp(32px,4vw,56px)] tabular-nums text-foreground">{categoriesCount}</dd>
                        </div>
                        <div className="flex flex-col-reverse bg-card px-4 py-4 sm:px-6">
                            <dt className="mt-2 text-[14px] text-muted-foreground sm:text-[16px]">Free options</dt>
                            <dd className="font-display text-[clamp(32px,4vw,56px)] tabular-nums text-foreground">{freeToolsCount}</dd>
                        </div>
                    </dl>

                    {/* Trust Signals */}
                    <div className="mb-12 grid gap-1 md:grid-cols-3">
                        <div className="bg-secondary p-6">
                            <div className="mb-3 flex items-center gap-2 text-[16px] font-semibold text-foreground">
                                <ShieldCheck aria-hidden="true" className="h-5 w-5" />
                                Real-use validation
                            </div>
                            <p className="text-[16px] leading-normal text-muted-foreground">
                                We prioritize tools with clear workflows, stable UX, and measurable time-savings.
                            </p>
                        </div>
                        <div className="bg-secondary p-6">
                            <div className="mb-3 flex items-center gap-2 text-[16px] font-semibold text-foreground">
                                <RefreshCw aria-hidden="true" className="h-5 w-5" />
                                Monthly rechecks
                            </div>
                            <p className="text-[16px] leading-normal text-muted-foreground">
                                Pricing, policies, and features are reviewed on a monthly cadence.
                            </p>
                        </div>
                        <div className="bg-secondary p-6">
                            <div className="mb-3 flex items-center gap-2 text-[16px] font-semibold text-foreground">
                                <Layers aria-hidden="true" className="h-5 w-5" />
                                Stack compatibility
                            </div>
                            <p className="text-[16px] leading-normal text-muted-foreground">
                                We evaluate how tools work together, not just in isolation.
                            </p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl">
                        <div className="relative">
                            <SearchInput
                                variant="hero"
                                placeholder="Search by name, category, or feature..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setPage(1); // Reset to first page on search
                                }}
                                aria-label="Search AI tools"
                                className="h-14 rounded-none border-0 bg-card py-0 text-[18px] focus:ring-0 focus:border-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                            />
                        </div>
                        <p className="mt-3 text-[14px] text-muted-foreground">
                            Try searching &quot;coding&quot;, &quot;free&quot;, or &quot;design&quot;
                        </p>
                    </div>
                </div>

                {/* Starter Stacks */}
                <section className="mb-16">
                    <div className="mb-8">
                        <h2 className="font-display text-[clamp(32px,4vw,56px)] text-foreground">Starter stacks</h2>
                        <p className="mt-3 text-[16px] text-muted-foreground">
                            Proven combinations you can adopt immediately.
                        </p>
                    </div>
                    <div className="grid gap-1 md:grid-cols-2">
                        {(featuredStacks.length > 0 ? featuredStacks : starterStackFallbacks).map((stack) => (
                            <div key={stack.name}>
                                <Link
                                    href={"summary" in stack ? "#" : `/stack/${stack.id}`}
                                    className="group block h-full bg-card text-foreground transition-colors duration-150 hover:bg-vibe-electric hover:text-vibe-deep focus-visible:bg-vibe-electric focus-visible:text-vibe-deep focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-vibe-deep motion-reduce:transition-none"
                                >
                                    <div className="flex h-full flex-col p-6">
                                        <div className="mb-6">
                                            <h3 className="mb-1 text-[20px] font-semibold">
                                                {stack.name}
                                            </h3>
                                            <p className="line-clamp-2 text-[16px] leading-normal text-muted-foreground group-hover:text-vibe-deep group-focus-visible:text-vibe-deep">
                                                {"summary" in stack ? stack.summary : stack.description}
                                            </p>
                                        </div>

                                        <div className="mt-auto">
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-1">
                                                    {stack.tools.slice(0, 4).map((tool, i) => {
                                                        const name = typeof tool === "string" ? tool : tool.name;
                                                        return (
                                                            <div
                                                                key={i}
                                                                className="flex h-8 w-8 items-center justify-center bg-secondary text-[13px] font-semibold text-foreground"
                                                                title={name}
                                                            >
                                                                {name.charAt(0)}
                                                            </div>
                                                        );
                                                    })}
                                                    {stack.tools.length > 4 && (
                                                        <div className="flex h-8 w-8 items-center justify-center bg-secondary text-[13px] font-semibold text-foreground">
                                                            +{stack.tools.length - 4}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 text-[16px] font-semibold text-vibe-link group-hover:text-vibe-deep group-focus-visible:text-vibe-deep">
                                                    View Stack
                                                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tools List Component */}
                <ToolsList
                    tools={tools}
                    pagination={pagination}
                    isLoading={isLoading}
                    filters={{ category, pricing, page, sortBy }}
                    setFilters={{
                        setCategory: (c: string) => { setCategory(c); setPage(1); },
                        setPricing: (p: string) => { setPricing(p); setPage(1); },
                        setPage,
                        setSortBy
                    }}
                />
            </Container>
        </PageBackground>
    );
}
