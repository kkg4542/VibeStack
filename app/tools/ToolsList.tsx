"use client";

import { ToolData } from "@/lib/tool-types";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";
import Link from "next/link";
import dynamic from "next/dynamic";
const FeaturedSpotlight = dynamic(() => import("@/components/tools/FeaturedSpotlight").then(mod => mod.FeaturedSpotlight), { ssr: false });
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { m, AnimatePresence } from "framer-motion";
import { CompareButton } from "@/components/tools/CompareButton";
import { Scale, ArrowRight, Filter, ChevronDown } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

function ToolCard({ tool }: { tool: ToolData }) {
    // tool.color is per-item colour data; in direction B it no longer renders.
    return (
        <m.article
            layout
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="group relative h-full bg-card text-card-foreground transition-colors duration-150 hover:bg-secondary motion-reduce:transition-none"
        >
            <div className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center bg-secondary text-foreground group-hover:bg-background">
                        <ToolIconRenderer slug={tool.slug} className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="text-[14px] text-muted-foreground">
                        {tool.category}
                    </span>
                </div>

                <h3 className="mb-2 text-[20px] font-semibold text-foreground">
                    <Link
                        id={`tool-card-${tool.slug}`}
                        href={`/tool/${tool.slug}`}
                        className="outline-none after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-vibe-link group-hover:text-vibe-link"
                    >
                        {tool.title}
                    </Link>
                </h3>

                <p className="mb-4 line-clamp-2 flex-grow text-[16px] leading-normal text-muted-foreground">
                    {tool.description}
                </p>

                <div className="relative z-10 mt-auto flex justify-end pt-2">
                    <CompareButton toolSlug={tool.slug} toolTitle={tool.title} />
                </div>
            </div>
        </m.article>
    );
}

interface ToolsListProps {
    tools: ToolData[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
    };
    isLoading: boolean;
    filters: {
        category: string;
        pricing: string;
        page: number;
        sortBy: string;
    };
    setFilters: {
        setCategory: (c: string) => void;
        setPricing: (p: string) => void;
        setPage: (p: number) => void;
        setSortBy: (s: string) => void;
    };
}

export function ToolsList({ tools, pagination, isLoading, filters, setFilters }: ToolsListProps) {
    const { category, pricing, sortBy, page } = filters;
    const { setCategory, setPricing, setSortBy, setPage } = setFilters;
    const [compareCount, setCompareCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const list = JSON.parse(localStorage.getItem("compareTools") || "[]");
            setCompareCount(list.length);
        };
        updateCount();
        window.addEventListener("storage", updateCount);
        window.addEventListener("compareUpdate", updateCount);
        return () => {
            window.removeEventListener("storage", updateCount);
            window.removeEventListener("compareUpdate", updateCount);
        };
    }, []);

    // Options
    const categories = ["All", "Coding", "Design", "Productivity", "Assistance", "Management"]; // Expanded default list
    const pricingModels = ["All", "Free", "Freemium", "Paid"];

    const featuredTool = useMemo(() => {
        const featured = tools.filter(t => t.isFeatured);
        return featured.length > 0 ? featured[0] : null;
    }, [tools]);

    return (
        <div className="w-full">
            {/* Featured Section */}
            {featuredTool && <FeaturedSpotlight tool={featuredTool} />}

            {/* Filters Row */}
            <div className="flex flex-col gap-4 mb-12">

                {/* Row 1: Controls (Pricing & Sort) - Balanced Layout */}
                <div className="flex flex-wrap items-center justify-between gap-4 w-full">

                    {/* Left Anchor: Tool Count */}
                    <div className="hidden md:flex items-baseline gap-2 text-[16px] text-muted-foreground">
                        <span className="font-semibold tabular-nums text-foreground">
                            {pagination?.total ?? tools.length}
                        </span>
                        <span>tools available</span>
                    </div>

                    {/* Right Anchor: Filter Controls */}
                    <div className="flex flex-wrap items-center justify-end gap-3 ml-auto md:ml-0 w-full md:w-auto">
                        {/* Pricing Segmented Control */}
                        <div className="flex gap-1">
                            {pricingModels.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPricing(p)}
                                    aria-pressed={pricing === p}
                                    className={`rounded-none px-3 py-2 text-[14px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none ${pricing === p
                                        ? "bg-vibe-electric text-vibe-deep"
                                        : "bg-card text-foreground hover:bg-secondary"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative group">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                aria-label="Sort tools"
                                className="cursor-pointer appearance-none rounded-none bg-card py-2 pl-4 pr-10 text-[14px] font-semibold text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none"
                            >
                                <option value="default">Default</option>
                                <option value="rating">Top Rated</option>
                                <option value="newest">Newest</option>
                            </select>
                            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                    </div>
                </div>
                {/* Row 2: Categories - Scrollable Horizontal List */}
                <div className="w-full -mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto no-scrollbar pb-2 mask-image-fade">
                    <div className="flex min-w-max items-center gap-1 pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                aria-pressed={category === cat}
                                className={`rounded-none px-4 py-2.5 text-[16px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none ${category === cat
                                    ? "bg-vibe-electric text-vibe-deep"
                                    : "bg-card text-foreground hover:bg-secondary"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Landing Pages Link */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <p className="text-[16px] text-muted-foreground">
                        View detailed category pages:
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {categories.filter(c => c !== "All").map((cat) => (
                            <Link
                                key={cat}
                                href={`/categories/${cat.toLowerCase()}`}
                                className="text-[16px] font-semibold text-vibe-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Loading Overlay */}
            <div className="relative">
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex min-h-[400px] items-start justify-center bg-background/60 pt-24">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-vibe-electric border-t-transparent motion-reduce:animate-none" />
                            <p className="text-[16px] font-semibold text-foreground">Refreshing tools...</p>
                        </div>
                    </div>
                )}

                {/* Tools Grid */}
                <m.div layout className={`grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${isLoading ? 'opacity-40' : 'opacity-100'}`} >
                    <AnimatePresence mode="popLayout">
                        {tools.length > 0 ? (
                            tools.map((tool) => (
                                <ToolCard key={tool.slug} tool={tool} />
                            ))
                        ) : !isLoading && (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-[16px] text-muted-foreground">No tools found matching your criteria.</p>
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        setCategory("All");
                                        setPricing("All");
                                    }}
                                    className="mt-2 text-[16px] text-vibe-link"
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </AnimatePresence>
                </m.div >
            </div>

            {/* Pagination UI */}
            {pagination && pagination.totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-4">
                    <Button
                        variant="secondary"
                        size="sm"
                        disabled={page <= 1 || isLoading}
                        onClick={() => {
                            setPage(page - 1);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        className="rounded-none"
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                            .filter(p => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
                            .map((p, i, arr) => (
                                <div key={p} className="flex items-center gap-2">
                                    {i > 0 && arr[i - 1] !== p - 1 && <span className="text-muted-foreground">...</span>}
                                    <button
                                        onClick={() => {
                                            setPage(p);
                                            window.scrollTo({ top: 400, behavior: 'smooth' });
                                        }}
                                        disabled={isLoading}
                                        className={`h-10 w-10 rounded-none text-[14px] font-semibold tabular-nums transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none ${page === p
                                            ? "bg-vibe-electric text-vibe-deep"
                                            : "bg-card text-foreground hover:bg-secondary"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                </div>
                            ))}
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        disabled={!pagination.hasMore || isLoading}
                        onClick={() => {
                            setPage(page + 1);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        className="rounded-none"
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* Floating Compare Bar */}
            <AnimatePresence>
                {
                    compareCount > 0 && (
                        <m.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                        >
                                <div className="pointer-events-auto flex items-center gap-6 bg-vibe-electric px-6 py-4 text-vibe-deep shadow-lg"> {/* taste-skill-ignore: floating overlay bar */}
                                <div className="flex items-center gap-3">
                                    <Scale aria-hidden="true" className="h-5 w-5" />
                                    <div>
                                        <p className="text-[16px] font-semibold">{compareCount} Tool{compareCount > 1 ? 's' : ''} Selected</p>
                                        <p className="text-[14px] text-vibe-deep">Compare features side-by-side</p>
                                    </div>
                                </div>
                                <Button asChild size="sm" className="group rounded-none bg-vibe-deep font-semibold text-[#eff0f1] hover:bg-vibe-deep/90">
                                    <Link href="/compare" className="flex items-center gap-2">
                                        Compare Now
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </div>
                        </m.div>
                    )
                }
            </AnimatePresence >
        </div >
    );
}
