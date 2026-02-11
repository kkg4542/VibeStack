"use client";

import { Metadata } from "next";
import { ToolsList } from "./ToolsList";
import { m } from "framer-motion";
import { Search, Sparkles, TrendingUp, Target, Zap, ShieldCheck, RefreshCw, Layers, ArrowRight } from "lucide-react";
import { VibeCard } from "@/components/ui/VibeCard";
import { designSystem } from "@/lib/design-system";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const PageBackground = dynamic(() => import("@/components/effects/PageBackground").then(mod => mod.PageBackground), { ssr: false });
import { BackgroundPresets } from "@/components/effects/PageBackground";
import { useTools } from "@/hooks/use-tools";
import { ToolData } from "@/lib/tool-types";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import { SearchInput } from "@/components/ui/search-input";

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
    const [featuredStacks, setFeaturedStacks] = useState<Array<{
        id: string;
        idField: string;
        name: string;
        description: string | null;
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
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-6xl mx-auto px-4">
                <m.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                    className="text-center mb-16"
                >
                    {/* Badge */}
                    <m.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibe-electric/10 border border-vibe-electric/20 text-vibe-electric text-sm font-medium mb-6 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>{totalTools} tools, vetted for real work</span>
                    </m.div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance max-w-4xl mx-auto leading-tight">
                        Skip the hype. Find the{" "}
                        <span className="bg-linear-to-r from-vibe-electric via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            tools that ship
                        </span>{" "}
                        your work faster.
                    </h1>

                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                        We test, tag, and track AI products by real workflow impact, not buzz. Compare tools by category, pricing, and outcomes to build a stack that actually saves time.
                    </p>

                    {/* Quick Stats */}
                    <m.div
                        initial={designSystem.animations.fadeInUp.initial}
                        animate={designSystem.animations.fadeInUp.animate}
                        transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-8 mb-12"
                    >
                        <div className="flex items-center gap-2 text-sm">
                            <div className="p-2 rounded-lg bg-emerald-500/10">
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-foreground">{totalTools}+</div>
                                <div className="text-muted-foreground text-xs">Tools Listed</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <Target className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-foreground">{categoriesCount}</div>
                                <div className="text-muted-foreground text-xs">Categories</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="p-2 rounded-lg bg-violet-500/10">
                                <Zap className="w-4 h-4 text-violet-500" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-foreground">{freeToolsCount}</div>
                                <div className="text-muted-foreground text-xs">Free Options</div>
                            </div>
                        </div>
                    </m.div>

                    {/* Trust Signals */}
                    <m.div
                        initial={designSystem.animations.fadeInUp.initial}
                        animate={designSystem.animations.fadeInUp.animate}
                        transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.35 }}
                        className="grid gap-6 md:grid-cols-3 text-left max-w-5xl mx-auto mb-12"
                    >
                        <div className="rounded-2xl border border-border/40 bg-card backdrop-blur-sm p-6">
                            <div className="flex items-center gap-2 mb-3 text-sm text-foreground/80">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                Real-use validation
                            </div>
                            <p className="text-sm text-muted-foreground">
                                We prioritize tools with clear workflows, stable UX, and measurable time-savings.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-border/40 bg-card backdrop-blur-sm p-6">
                            <div className="flex items-center gap-2 mb-3 text-sm text-foreground/80">
                                <RefreshCw className="w-4 h-4 text-blue-500" />
                                Monthly rechecks
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Pricing, policies, and features are reviewed on a monthly cadence.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-border/40 bg-card backdrop-blur-sm p-6">
                            <div className="flex items-center gap-2 mb-3 text-sm text-foreground/80">
                                <Layers className="w-4 h-4 text-violet-500" />
                                Stack compatibility
                            </div>
                            <p className="text-sm text-muted-foreground">
                                We evaluate how tools work together, not just in isolation.
                            </p>
                        </div>
                    </m.div>

                    {/* Search Bar */}
                    <m.div
                        initial={designSystem.animations.fadeInUp.initial}
                        animate={designSystem.animations.fadeInUp.animate}
                        transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.4 }}
                        className="max-w-2xl mx-auto relative"
                    >
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
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                            Try searching &quot;coding&quot;, &quot;free&quot;, or &quot;design&quot;
                        </p>
                    </m.div>
                </m.div>

                {/* Starter Stacks */}
                <section className="mb-16">
                    <div className="flex items-end justify-between gap-6 mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-foreground">Starter Stacks</h2>
                            <p className="text-sm text-muted-foreground">
                                Proven combinations you can adopt immediately.
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {(featuredStacks.length > 0 ? featuredStacks : starterStackFallbacks).map((stack) => (
                            <m.div
                                key={stack.name}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link href={"idField" in stack ? `/stack/${stack.idField}` : "#"} className="block h-full">
                                    <VibeCard
                                        className="h-full"
                                        tiltStrength={5}
                                        glowOnHover={true}
                                        depth={10}
                                    >
                                        <div className="p-6 flex flex-col h-full">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-vibe-electric transition-colors">
                                                        {stack.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {"summary" in stack ? stack.summary : (stack.description ?? "A curated stack for faster outcomes.")}
                                                    </p>
                                                </div>
                                                <div className="p-2 rounded-full bg-vibe-electric/10 text-vibe-electric">
                                                    <Layers className="w-5 h-5" />
                                                </div>
                                            </div>

                                            <div className="mt-auto">
                                                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                                                    <div className="flex -space-x-3">
                                                        {stack.tools.slice(0, 4).map((tool, i) => {
                                                            const name = typeof tool === "string" ? tool : tool.name;
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    className="w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground shadow-xs ring-2 ring-background z-10"
                                                                    title={name}
                                                                    style={{ zIndex: 10 - i }}
                                                                >
                                                                    {name.charAt(0)}
                                                                </div>
                                                            );
                                                        })}
                                                        {stack.tools.length > 4 && (
                                                            <div className="w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-[10px] font-medium text-muted-foreground shadow-xs ring-2 ring-background z-0 pl-1">
                                                                +{stack.tools.length - 4}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-vibe-electric font-medium">
                                                        View Stack
                                                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </VibeCard>
                                </Link>
                            </m.div>
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
            </div>
        </PageBackground>
    );
}
