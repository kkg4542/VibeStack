"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { tools } from "@/lib/tools";
import { stacks } from "@/lib/stacks";
import { trackSearchQuery } from "@/lib/analytics";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const searchTools = useMemo(() => {
        if (!query.trim()) return [];
        
        const lowerQuery = query.toLowerCase();
        
        return tools.filter(tool => 
            tool.title.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery) ||
            tool.category.toLowerCase().includes(lowerQuery) ||
            tool.features?.some(f => f.toLowerCase().includes(lowerQuery))
        ).map(tool => ({ type: 'tool', ...tool }));
    }, [query]);

    const searchStacks = useMemo(() => {
        if (!query.trim()) return [];
        
        const lowerQuery = query.toLowerCase();
        
        return stacks.filter(stack => 
            stack.name.toLowerCase().includes(lowerQuery) ||
            stack.description.toLowerCase().includes(lowerQuery) ||
            stack.tags.some(t => t.toLowerCase().includes(lowerQuery))
        ).map(stack => ({ type: 'stack', ...stack }));
    }, [query]);

    const recentSearches = useMemo(() => {
        if (typeof window === 'undefined') return [];
        const saved = localStorage.getItem('vibestack-recent-searches');
        return saved ? JSON.parse(saved) : [];
    }, []);

    const trendingSearches = useMemo(() => [
        "AI coding assistant",
        "no-code UI",
        "pair programming",
        "free AI tools",
        "workflow automation"
    ], []);

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
            }
        }
    };

    const clearRecentSearches = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('vibestack-recent-searches');
        }
    };

    const highlightMatch = (text: string) => {
        if (!query.trim()) return text;
        
        const regex = new RegExp(`(${query.split('').join('.*')})`, 'gi');
        return text.replace(regex, '<mark class="bg-indigo-500/20 text-indigo-400 rounded px-1">$1</mark>');
    };

    if (!mounted) {
        return (
            <main className="min-h-screen bg-background pt-24 pb-20">
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
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="container max-w-4xl mx-auto px-4">
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Search</h1>
                    <p className="text-muted-foreground mb-6">
                        Find AI tools, stacks, and resources
                    </p>

                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search for tools, stacks, or keywords..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                            className="pl-12 pr-12 h-14 text-lg bg-background border-border"
                            autoFocus
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Quick Filters */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {['Free', 'Freemium', 'Paid'].map(filter => (
                            <Button
                                key={filter}
                                variant="outline"
                                size="sm"
                                onClick={() => setQuery(prev => prev ? `${prev} ${filter}`.trim() : filter)}
                                className="rounded-full"
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                {hasResults && (
                    <div className="space-y-6">
                        {/* Tools Results */}
                        {searchTools.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <h2 className="text-xl font-semibold">
                                        Tools <Badge variant="secondary" className="ml-2">{searchTools.length}</Badge>
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {searchTools.map((tool: any) => (
                                        <Link key={tool.slug} href={`/tool/${tool.slug}`}>
                                            <Card className="hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                                                <CardContent className="p-4">
                                                    <div className="flex items-start gap-4">
                                                        <div className={`p-3 rounded-lg ${tool.bgGradient}`}>
                                                            <tool.icon className={`h-6 w-6 ${tool.color}`} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 
                                                                    className="text-lg font-semibold"
                                                                    dangerouslySetInnerHTML={{ __html: highlightMatch(tool.title) }}
                                                                />
                                                                <Badge variant="outline" className="text-xs">
                                                                    {tool.pricing}
                                                                </Badge>
                                                            </div>
                                                            <p 
                                                                className="text-sm text-muted-foreground line-clamp-2"
                                                                dangerouslySetInnerHTML={{ __html: highlightMatch(tool.description) }}
                                                            />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stacks Results */}
                        {searchStacks.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <h2 className="text-xl font-semibold">
                                        Stacks <Badge variant="secondary" className="ml-2">{searchStacks.length}</Badge>
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {searchStacks.map((stack: any) => (
                                        <Link key={stack.id} href={`/stack/${stack.id}`}>
                                            <Card className="hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
                                                <CardContent className="p-4">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
                                                            {stack.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 
                                                                    className="text-lg font-semibold"
                                                                    dangerouslySetInnerHTML={{ __html: highlightMatch(stack.name) }}
                                                                />
                                                                <Badge variant="secondary" className="text-xs">
                                                                    {stack.totalPrice}
                                                                </Badge>
                                                            </div>
                                                            <p 
                                                                className="text-sm text-muted-foreground line-clamp-2"
                                                                dangerouslySetInnerHTML={{ __html: highlightMatch(stack.description) }}
                                                            />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {showEmpty && (
                    <div className="text-center py-12">
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
                    </div>
                )}

                {/* Suggestions */}
                {showSuggestions && (
                    <div className="space-y-8">
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-muted-foreground" />
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
                                    {recentSearches.map((search: string, index: number) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleSearch(search)}
                                            className="rounded-full"
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
                                <TrendingUp className="h-5 w-5 text-indigo-500" />
                                <h2 className="text-lg font-semibold">Trending Searches</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {trendingSearches.map((search, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleSearch(search)}
                                        className="rounded-full"
                                    >
                                        {search}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
