"use client";

import { ToolData } from "@/lib/tool-types";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";
import Link from "next/link";
import dynamic from "next/dynamic";
const FeaturedSpotlight = dynamic(() => import("@/components/tools/FeaturedSpotlight").then(mod => mod.FeaturedSpotlight), { ssr: false });
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { m, AnimatePresence } from "framer-motion";
import { VibeCard } from "@/components/ui/VibeCard";
import { CompareButton } from "@/components/tools/CompareButton";
import { Scale, ArrowRight, Filter, ChevronDown } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

function ToolCard({ tool }: { tool: ToolData }) {
    return (
        <m.article
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
        >
            <Link
                id={`tool-card-${tool.slug}`}
                href={`/tool/${tool.slug}`}
                className="block h-full focus-visible:ring-2 focus-visible:ring-primary rounded-3xl outline-none"
                aria-label={`View details for ${tool.title}`}
            >
                <VibeCard
                    className="h-full"
                    tiltStrength={5}
                    glowOnHover={true}
                    depth={10}
                >
                    <div className="flex flex-col h-full p-6">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <div className={`rounded-lg bg-secondary/80 p-3 ring-1 ring-border shadow-lg ${tool.color || "text-foreground"} group-hover:shadow-vibe-electric/20 transition-all duration-300`}>
                                <ToolIconRenderer slug={tool.slug} className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <Badge variant="secondary" className="bg-secondary text-xs font-normal text-muted-foreground backdrop-blur-sm">
                                {tool.category}
                            </Badge>
                        </div>

                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                            {tool.title}
                        </h3>

                        <p className="text-muted-foreground/90 line-clamp-2 leading-relaxed text-sm mb-4 flex-grow">
                            {tool.description}
                        </p>

                        <div className="pt-4 flex justify-end border-t border-border/40 mt-auto">
                            <CompareButton toolSlug={tool.slug} toolTitle={tool.title} />
                        </div>
                    </div>
                </VibeCard>
            </Link>
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
                    <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-xs font-bold text-foreground">
                            {pagination?.total ?? tools.length}
                        </span>
                        <span className="font-medium">Tools Available</span>
                    </div>

                    {/* Right Anchor: Filter Controls */}
                    <div className="flex flex-wrap items-center justify-end gap-3 ml-auto md:ml-0 w-full md:w-auto">
                        {/* Pricing Segmented Control */}
                        <div className="flex bg-secondary p-1 rounded-lg border border-border/40 dark:border-white/5">
                            {pricingModels.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPricing(p)}
                                    aria-pressed={pricing === p}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${pricing === p
                                        ? "bg-vibe-electric text-white shadow-md"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
                                className="appearance-none bg-secondary border border-border/40 dark:border-white/5 rounded-lg pl-4 pr-10 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground focus:outline-none transition-all cursor-pointer hover:border-border/80"
                            >
                                <option value="default">Default</option>
                                <option value="rating">Top Rated</option>
                                <option value="newest">Newest</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none text-muted-foreground" />
                        </div>
                    </div>
                </div>
                {/* Row 2: Categories - Scrollable Horizontal List */}
                <div className="w-full -mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto no-scrollbar pb-2 mask-image-fade">
                    <div className="flex items-center gap-2 min-w-max border-b border-border/40 dark:border-white/5 pb-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                aria-pressed={category === cat}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${category === cat
                                    ? "bg-vibe-electric text-white border-vibe-electric shadow-md shadow-vibe-electric/20"
                                    : "bg-transparent text-muted-foreground border-transparent hover:bg-secondary/80 hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Landing Pages Link */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        View detailed category pages:
                    </p>
                    <div className="flex items-center gap-2">
                        {categories.filter(c => c !== "All").map((cat) => (
                            <Link
                                key={cat}
                                href={`/categories/${cat.toLowerCase()}`}
                                className="text-xs text-vibe-electric hover:text-vibe-cyan transition-colors"
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
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/20 backdrop-blur-sm rounded-3xl min-h-[400px]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-4 border-vibe-electric border-t-transparent rounded-full animate-spin" />
                            <p className="text-sm font-medium text-muted-foreground">Refreshing tools...</p>
                        </div>
                    </div>
                )}

                {/* Tools Grid */}
                <m.div layout className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${isLoading ? 'opacity-40' : 'opacity-100'}`} >
                    <AnimatePresence mode="popLayout">
                        {tools.length > 0 ? (
                            tools.map((tool) => (
                                <ToolCard key={tool.slug} tool={tool} />
                            ))
                        ) : !isLoading && (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-muted-foreground">No tools found matching your criteria.</p>
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        setCategory("All");
                                        setPricing("All");
                                    }}
                                    className="mt-2 text-vibe-electric"
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
                        variant="outline"
                        size="sm"
                        disabled={page <= 1 || isLoading}
                        onClick={() => {
                            setPage(page - 1);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        className="rounded-xl"
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
                                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === p
                                            ? "bg-vibe-electric text-white"
                                            : "hover:bg-secondary text-muted-foreground"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                </div>
                            ))}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!pagination.hasMore || isLoading}
                        onClick={() => {
                            setPage(page + 1);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        className="rounded-xl"
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
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                        >
                                <div className="bg-vibe-electric text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl flex items-center gap-6 pointer-events-auto">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <Scale className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{compareCount} Tool{compareCount > 1 ? 's' : ''} Selected</p>
                                        <p className="text-xs text-vibe-electric/80">Compare features side-by-side</p>
                                    </div>
                                </div>
                                <Button asChild size="sm" className="bg-white text-vibe-electric hover:bg-vibe-electric/10 rounded-xl font-bold group">
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
