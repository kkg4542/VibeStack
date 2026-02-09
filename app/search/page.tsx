"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, X, Clock, TrendingUp, Sparkles, ArrowRight, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ToolData } from "@/lib/tool-types";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/lib/tool-icons";
import { stacks, Stack } from "@/lib/stacks";
import { trackSearchQuery } from "@/lib/analytics";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [mounted, setMounted] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const { tools } = useAllTools();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const saved = localStorage.getItem('vibestack-recent-searches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    const searchTools = useMemo(() => {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase();

        return tools.filter((tool: ToolData) =>
            tool.title.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery) ||
            tool.category.toLowerCase().includes(lowerQuery) ||
            tool.features?.some(f => f.toLowerCase().includes(lowerQuery))
        ).map((tool: ToolData) => ({ type: 'tool' as const, ...tool }));
    }, [query, tools]);

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
        if (newQuery.trim() && searchTools.length > 0) {
            trackSearchQuery(newQuery, searchTools.length);

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

        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase()
                ? <mark key={i} className="bg-indigo-500/20 text-indigo-400 rounded px-1">{part}</mark>
                : part
        );
    };

    if (!mounted) {
        return (
            <main className="min-h-screen bg-background pt-32 pb-20">
                <div className="container max-w-4xl mx-auto px-4">
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </main>
        );
    }

    const hasResults = searchTools.length > 0 || searchStacks.length > 0;
    const showEmpty = query.trim() && !hasResults;
    const showSuggestions = !query.trim();

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-4xl mx-auto px-4">
                {/* Search Header */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Smart Search</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                        Find Your Perfect{" "}
                        <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                            AI Tool
                        </span>
                    </h1>

                    <p className="text-muted-foreground text-lg mb-8">
                        Search across {tools.length}+ tools and stacks
                    </p>

                    {/* Search Input */}
                    <div className="relative max-w-2xl mx-auto">
                        <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/40 shadow-lg">
                            <div className="flex items-center px-4 py-2">
                                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                                <Input
                                    type="text"
                                    placeholder="Search tools, stacks, or features..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                                    className="flex-1 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                                    autoFocus
                                />
                                {query && (
                                    <button
                                        onClick={() => setQuery('')}
                                        className="p-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Quick Filters */}
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                            {quickFilters.map(filter => (
                                <Button
                                    key={filter.value}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSearch(filter.value)}
                                    className="rounded-full text-xs border-border/50 hover:border-indigo-500/50 hover:bg-indigo-500/5"
                                >
                                    {filter.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Results */}
                {hasResults && (
                    <motion.div
                        initial={designSystem.animations.fadeInUp.initial}
                        animate={designSystem.animations.fadeInUp.animate}
                        transition={designSystem.animations.fadeInUp.transition}
                        className="space-y-8"
                    >
                        {/* Tools Results */}
                        {searchTools.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-1.5 rounded-lg bg-indigo-500/10">
                                        <Sparkles className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <h2 className="text-xl font-semibold">
                                        Tools
                                    </h2>
                                    <Badge variant="secondary">{searchTools.length}</Badge>
                                </div>
                                <div className="space-y-3">
                                    {searchTools.map((tool: ToolData, index: number) => (
                                        <motion.div
                                            key={tool.slug}
                                            initial={designSystem.animations.fadeInUp.initial}
                                            animate={designSystem.animations.fadeInUp.animate}
                                            transition={{ ...designSystem.animations.fadeInUp.transition, delay: index * 0.05 }}
                                        >
                                            <Link href={`/tool/${tool.slug}`}>
                                                <Card className="hover:bg-accent/50 transition-colors cursor-pointer border-border/50 group">
                                                    <CardContent className="p-4">
                                                        <div className="flex items-start gap-4">
                                                            <div className={`p-3 rounded-xl bg-linear-to-br ${tool.bgGradient || "from-slate-500/60 to-slate-800/60"} shrink-0`}>
                                                                {(() => {
                                                                    const Icon = getToolIcon(tool.slug);
                                                                    return <Icon className="h-6 w-6 text-white" />;
                                                                })()}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h3 className="text-lg font-semibold group-hover:text-indigo-500 transition-colors">
                                                                        {highlightMatch(tool.title)}
                                                                    </h3>
                                                                    <Badge variant="outline" className="text-xs shrink-0">
                                                                        {tool.pricing}
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                                    {highlightMatch(tool.description)}
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-2">
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        {tool.category}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                            <ArrowRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-indigo-500 transition-colors shrink-0 self-center" />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stacks Results */}
                        {searchStacks.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-1.5 rounded-lg bg-violet-500/10">
                                        <Sparkles className="w-4 h-4 text-violet-500" />
                                    </div>
                                    <h2 className="text-xl font-semibold">
                                        Stacks
                                    </h2>
                                    <Badge variant="secondary">{searchStacks.length}</Badge>
                                </div>
                                <div className="space-y-3">
                                    {searchStacks.map((stack: Stack, index) => (
                                        <motion.div
                                            key={stack.id}
                                            initial={designSystem.animations.fadeInUp.initial}
                                            animate={designSystem.animations.fadeInUp.animate}
                                            transition={{ ...designSystem.animations.fadeInUp.transition, delay: index * 0.05 }}
                                        >
                                            <Link href={`/stack/${stack.id}`}>
                                                <Card className="hover:bg-accent/50 transition-colors cursor-pointer border-border/50 group">
                                                    <CardContent className="p-4">
                                                        <div className="flex items-start gap-4">
                                                            <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
                                                                {stack.icon}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h3 className="text-lg font-semibold group-hover:text-violet-500 transition-colors">
                                                                        {highlightMatch(stack.name)}
                                                                    </h3>
                                                                    <Badge variant="secondary" className="text-xs shrink-0">
                                                                        {stack.totalPrice}
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                                    {highlightMatch(stack.description)}
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-2">
                                                                    {stack.tags.slice(0, 3).map(tag => (
                                                                        <Badge key={tag} variant="outline" className="text-xs">
                                                                            {tag}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <ArrowRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-violet-500 transition-colors shrink-0 self-center" />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Empty State */}
                {showEmpty && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 bg-card/30 rounded-3xl border border-border/30"
                    >
                        <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                            <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No results found</h3>
                        <p className="text-muted-foreground mb-6">
                            Try different keywords or browse our tools
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Button asChild variant="default" className="rounded-full">
                                <Link href="/tools">Browse Tools</Link>
                            </Button>
                            <Button asChild variant="outline" className="rounded-full">
                                <Link href="/build">Find Stack</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Suggestions */}
                {showSuggestions && (
                    <motion.div
                        initial={designSystem.animations.fadeInUp.initial}
                        animate={designSystem.animations.fadeInUp.animate}
                        transition={designSystem.animations.fadeInUp.transition}
                        className="space-y-8"
                    >
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-lg bg-secondary">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <h2 className="text-lg font-semibold">Recent Searches</h2>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearRecentSearches}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        Clear
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {recentSearches.map((search, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleSearch(search)}
                                            className="rounded-full border-border/50 hover:border-indigo-500/50"
                                        >
                                            {search}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trending Searches */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 rounded-lg bg-indigo-500/10">
                                    <TrendingUp className="h-4 w-4 text-indigo-500" />
                                </div>
                                <h2 className="text-lg font-semibold">Trending Searches</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {trendingSearches.map((search, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleSearch(search)}
                                        className="rounded-full border-border/50 hover:border-indigo-500/50 hover:bg-indigo-500/5"
                                    >
                                        {search}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </PageBackground>
    );
}
