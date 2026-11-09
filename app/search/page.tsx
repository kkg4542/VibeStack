"use client";

import { Suspense, useState, useEffect, useMemo, useId } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, X, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolData } from "@/lib/tool-types";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/components/icons/tool-icons";
import { stacks, Stack } from "@/lib/stacks";
import { trackSearchQuery } from "@/lib/analytics";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { Container } from "@/components/primitives/Container";

const SEARCH_LOADING = (
    <div className="min-h-svh bg-background pb-20 pt-32">
        <Container size="small">
            <p className="text-[16px] text-muted-foreground">Loading...</p>
        </Container>
    </div>
);

// useSearchParams needs a Suspense boundary, so the page body lives in
// SearchPageContent and the default export only supplies the boundary.
export default function SearchPage() {
    return (
        <Suspense fallback={SEARCH_LOADING}>
            <SearchPageContent />
        </Suspense>
    );
}

/** Mirror the query into ?q= without a navigation (no RSC request, no scroll). */
function writeQueryToUrl(value: string) {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (value.trim()) params.set("q", value);
    else params.delete("q");
    const next = params.toString();
    window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${next ? `?${next}` : ""}${window.location.hash}`
    );
}

function SearchPageContent() {
    const urlQuery = useSearchParams().get("q") ?? "";
    const inputId = useId();
    const [query, setQuery] = useState(urlQuery);
    // Follow ?q= when it changes while the page is already mounted (e.g. the
    // mobile drawer or a trending link used from /search itself).
    const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
    if (urlQuery !== prevUrlQuery) {
        setPrevUrlQuery(urlQuery);
        setQuery(urlQuery);
    }
    const [mounted, setMounted] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const { tools } = useAllTools();

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('vibestack-recent-searches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    const matchTools = (q: string): ToolData[] => {
        if (!q.trim()) return [];

        const lowerQuery = q.toLowerCase();

        return tools.filter((tool: ToolData) =>
            tool.title.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery) ||
            tool.category.toLowerCase().includes(lowerQuery) ||
            tool.features?.some(f => f.toLowerCase().includes(lowerQuery))
        );
    };

    const searchTools = useMemo(
        () => matchTools(query).map((tool: ToolData) => ({ type: 'tool' as const, ...tool })),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [query, tools]
    );

    const searchStacks = useMemo(() => {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase();

        return stacks.filter(stack =>
            stack.name.toLowerCase().includes(lowerQuery) ||
            stack.description.toLowerCase().includes(lowerQuery) ||
            stack.tags.some(t => t.toLowerCase().includes(lowerQuery))
        ).map(stack => ({ type: 'stack' as const, ...stack }));
    }, [query]);

    const trendingSearches = useMemo(() => [
        "AI coding assistant",
        "no-code UI",
        "pair programming",
        "free AI tools",
        "workflow automation",
        "design tools",
        "productivity"
    ], []);

    const quickFilters = [
        { label: "Free", value: "free" },
        { label: "Freemium", value: "freemium" },
        { label: "Coding", value: "coding" },
        { label: "Design", value: "design" }
    ];

    const handleSearch = (newQuery: string) => {
        setQuery(newQuery);
        writeQueryToUrl(newQuery);
        // Count results for the query being submitted, not the previous one
        // still held in state.
        const resultCount = matchTools(newQuery).length;
        if (newQuery.trim() && resultCount > 0) {
            trackSearchQuery(newQuery, resultCount);

            // Save to recent searches
            if (typeof window !== 'undefined') {
                const recent = localStorage.getItem('vibestack-recent-searches');
                const recentList = recent ? JSON.parse(recent) : [];
                const updated = [newQuery, ...recentList.filter((s: string) => s !== newQuery)].slice(0, 5);
                localStorage.setItem('vibestack-recent-searches', JSON.stringify(updated));
                setRecentSearches(updated);
            }
        }
    };

    const clearRecentSearches = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('vibestack-recent-searches');
            setRecentSearches([]);
        }
    };

    const highlightMatch = (text: string) => {
        if (!query.trim()) return text;

        // Escape regex metacharacters so queries like "(" or "+" cannot throw.
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase()
                ? <mark key={i} className="bg-vibe-electric px-0.5 text-vibe-deep">{part}</mark>
                : part
        );
    };

    if (!mounted) {
        return SEARCH_LOADING;
    }

    const hasResults = searchTools.length > 0 || searchStacks.length > 0;
    const showEmpty = query.trim() && !hasResults;
    const showSuggestions = !query.trim();

    return (
        <PageBackground {...BackgroundPresets.content}>
            <Container size="small">
                {/* Search Header */}
                <div className="mb-16">
                    <p className="mb-6 text-[16px] font-semibold text-vibe-link">Smart Search</p>

                    <h1 className="mb-6 font-display text-[clamp(40px,6vw,96px)] text-balance text-foreground">
                        Find Your Perfect AI Tool
                    </h1>

                    <p className="mb-8 text-[18px] text-muted-foreground sm:text-[20px]">
                        Search across {tools.length}+ tools and stacks
                    </p>

                    {/* Search Input */}
                    <div className="relative">
                        <div className="relative bg-card focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-vibe-link">
                            <div className="flex items-center px-4 py-2">
                                <Search aria-hidden="true" className="mr-3 h-5 w-5 text-muted-foreground" />
                                <label htmlFor={inputId} className="sr-only">
                                    Search tools, stacks, or features
                                </label>
                                <Input
                                    id={inputId}
                                    type="text"
                                    placeholder="Search tools, stacks, or features..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                                    className="h-12 flex-1 rounded-none border-0 bg-transparent text-[18px] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
                                    autoFocus
                                />
                                {query && (
                                    <button
                                        onClick={() => { setQuery(''); writeQueryToUrl(''); }}
                                        aria-label="Clear search"
                                        className="p-2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                                    >
                                        <X aria-hidden="true" className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Quick Filters */}
                        <div className="mt-4 flex flex-wrap gap-1">
                            {quickFilters.map(filter => (
                                <Button
                                    key={filter.value}
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleSearch(filter.value)}
                                    className="h-10 rounded-none bg-card px-4 text-[16px] font-semibold text-foreground hover:bg-vibe-electric hover:text-vibe-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                                >
                                    {filter.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results */}
                {hasResults && (
                    <div className="space-y-12">
                        {/* Tools Results */}
                        {searchTools.length > 0 && (
                            <div>
                                <div className="mb-4 flex items-baseline gap-3">
                                    <h2 className="font-display text-[clamp(32px,4vw,56px)] text-foreground">
                                        Tools
                                    </h2>
                                    <span className="text-[16px] font-semibold tabular-nums text-muted-foreground">{searchTools.length}</span>
                                </div>
                                <div className="space-y-1">
                                    {searchTools.map((tool: ToolData) => (
                                        <div key={tool.slug}>
                                            <Link href={`/tool/${tool.slug}`} className="group flex items-start gap-4 bg-card p-4 text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none">
                                                {/* tool.bgGradient is per-item colour data; it no longer renders. */}
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-secondary text-foreground group-hover:bg-background">
                                                    {(() => {
                                                        const Icon = getToolIcon(tool.slug);
                                                        return <Icon className="h-6 w-6" />;
                                                    })()}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                                        <h3 className="text-[18px] font-semibold transition-colors group-hover:text-vibe-link">
                                                            {highlightMatch(tool.title)}
                                                        </h3>
                                                        <span className="shrink-0 text-[14px] font-semibold text-foreground">
                                                            {tool.pricing}
                                                        </span>
                                                    </div>
                                                    <p className="line-clamp-2 text-[16px] leading-normal text-muted-foreground">
                                                        {highlightMatch(tool.description)}
                                                    </p>
                                                    <p className="mt-2 text-[14px] text-muted-foreground">
                                                        {tool.category}
                                                    </p>
                                                </div>
                                                <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 self-center text-muted-foreground transition-transform duration-150 group-hover:translate-x-1 group-hover:text-vibe-link motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stacks Results */}
                        {searchStacks.length > 0 && (
                            <div>
                                <div className="mb-4 flex items-baseline gap-3">
                                    <h2 className="font-display text-[clamp(32px,4vw,56px)] text-foreground">
                                        Stacks
                                    </h2>
                                    <span className="text-[16px] font-semibold tabular-nums text-muted-foreground">{searchStacks.length}</span>
                                </div>
                                <div className="space-y-1">
                                    {searchStacks.map((stack: Stack) => (
                                        <div key={stack.id}>
                                            <Link href={`/stack/${stack.id}`} className="group flex items-start gap-4 bg-card p-4 text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none">
                                                {/* stack.icon is an emoji; direction B shows the initial instead. */}
                                                <div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center bg-secondary font-display text-[28px] text-foreground group-hover:bg-background">
                                                    {stack.name.charAt(0)}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                                        <h3 className="text-[18px] font-semibold transition-colors group-hover:text-vibe-link">
                                                            {highlightMatch(stack.name)}
                                                        </h3>
                                                        <span className="shrink-0 text-[14px] font-semibold text-foreground">
                                                            {stack.totalPrice}
                                                        </span>
                                                    </div>
                                                    <p className="line-clamp-2 text-[16px] leading-normal text-muted-foreground">
                                                        {highlightMatch(stack.description)}
                                                    </p>
                                                    <p className="mt-2 text-[14px] text-muted-foreground">
                                                        {stack.tags.slice(0, 3).join(", ")}
                                                    </p>
                                                </div>
                                                <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 self-center text-muted-foreground transition-transform duration-150 group-hover:translate-x-1 group-hover:text-vibe-link motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {showEmpty && (
                    <div className="bg-card p-8 md:p-12">
                        <h3 className="mb-2 text-[24px] font-semibold">No results found</h3>
                        <p className="mb-6 text-[16px] text-muted-foreground">
                            Try different keywords or browse our tools
                        </p>
                        <div className="flex flex-wrap gap-1">
                            <Button asChild variant="default" className="h-11 rounded-none bg-vibe-electric px-6 text-[16px] font-semibold text-vibe-deep hover:bg-vibe-electric/90">
                                <Link href="/tools">Browse Tools</Link>
                            </Button>
                            <Button asChild variant="secondary" className="h-11 rounded-none px-6 text-[16px] font-semibold">
                                <Link href="/build">Find Stack</Link>
                            </Button>
                        </div>
                    </div>
                )}

                {/* Suggestions */}
                {showSuggestions && (
                    <div className="space-y-12">
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="flex items-center gap-2 text-[20px] font-semibold">
                                        <Clock aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
                                        Recent Searches
                                    </h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearRecentSearches}
                                        className="rounded-none text-[16px] text-muted-foreground hover:text-foreground"
                                    >
                                        Clear
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {recentSearches.map((search, index) => (
                                        <Button
                                            key={index}
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => handleSearch(search)}
                                            className="h-10 rounded-none bg-card px-4 text-[16px] font-semibold text-foreground hover:bg-vibe-electric hover:text-vibe-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                                        >
                                            {search}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trending Searches */}
                        <div>
                            <h2 className="mb-4 flex items-center gap-2 text-[20px] font-semibold">
                                <TrendingUp aria-hidden="true" className="h-5 w-5 text-vibe-link" />
                                Trending Searches
                            </h2>
                            <div className="flex flex-wrap gap-1">
                                {trendingSearches.map((search, index) => (
                                    <Button
                                        key={index}
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => handleSearch(search)}
                                        className="h-10 rounded-none bg-card px-4 text-[16px] font-semibold text-foreground hover:bg-vibe-electric hover:text-vibe-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                                    >
                                        {search}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </PageBackground>
    );
}
