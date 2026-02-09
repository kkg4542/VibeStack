"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Heart, Trash2, ArrowLeft, Search, Loader2, Grid3X3, List, Filter, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/lib/tool-icons";
import { stacks } from "@/lib/stacks";
import { useSession } from "next-auth/react";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { FavoriteWithTool } from "@/lib/schemas";
import type { Tool } from "@prisma/client";

type FavoriteItem = {
    id: string;
    type: 'tool' | 'stack';
    addedAt: number;
};

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'name';

export default function FavoritesPage() {
    const { data: session } = useSession();
    const { tools } = useAllTools();
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const loadFavorites = async () => {
        setIsLoading(true);

        if (session?.user?.id) {
            try {
                const response = await fetch('/api/favorites');
                if (response.ok) {
                    const dbFavorites: FavoriteWithTool[] = await response.json();
                    const formatted = dbFavorites.map((f) => ({
                        id: f.tool.slug,
                        type: 'tool' as const,
                        addedAt: new Date(f.createdAt).getTime(),
                    }));
                    setFavorites(formatted);
                }
            } catch (error) {
                console.error('Failed to load favorites:', error);
            }
        } else {
            const saved = localStorage.getItem("vibestack-favorites");
            if (saved) {
                setFavorites(JSON.parse(saved));
            }
        }

        setIsLoading(false);
    };

    // Load favorites
    useEffect(() => {
        setMounted(true);
        loadFavorites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    // Get unique categories from favorite tools
    const categories = useMemo(() => {
        const cats = new Set<string>();
        favorites.forEach(item => {
            if (item.type === 'tool') {
                const tool = tools.find((t: Tool) => t.slug === item.id);
                if (tool) cats.add(tool.category);
            }
        });
        return ['all', ...Array.from(cats)];
    }, [favorites, tools]);

    const filteredFavorites = useMemo(() => {
        let filtered = favorites.filter(item => {
            if (!searchQuery.trim()) return true;

            const lowerQuery = searchQuery.toLowerCase();
            if (item.type === 'tool') {
                const tool = tools.find((t: Tool) => t.slug === item.id);
                if (tool) {
                    return (
                        tool.title.toLowerCase().includes(lowerQuery) ||
                        tool.description.toLowerCase().includes(lowerQuery) ||
                        tool.category.toLowerCase().includes(lowerQuery)
                    );
                }
            } else if (item.type === 'stack') {
                const stack = stacks.find(s => s.id === item.id);
                if (stack) {
                    return (
                        stack.name.toLowerCase().includes(lowerQuery) ||
                        stack.description.toLowerCase().includes(lowerQuery)
                    );
                }
            }
            return false;
        });

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(item => {
                if (item.type === 'tool') {
                    const tool = tools.find((t: Tool) => t.slug === item.id);
                    return tool?.category === selectedCategory;
                }
                return false;
            });
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return b.addedAt - a.addedAt;
                case 'oldest':
                    return a.addedAt - b.addedAt;
                case 'name':
                    const nameA = a.type === 'tool'
                        ? tools.find((t: Tool) => t.slug === a.id)?.title || ''
                        : stacks.find(s => s.id === a.id)?.name || '';
                    const nameB = b.type === 'tool'
                        ? tools.find((t: Tool) => t.slug === b.id)?.title || ''
                        : stacks.find(s => s.id === b.id)?.name || '';
                    return nameA.localeCompare(nameB);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [favorites, searchQuery, selectedCategory, sortBy, tools]);

    const removeFavorite = async (id: string, type: 'tool' | 'stack') => {
        if (session?.user?.id && type === 'tool') {
            try {
                await fetch('/api/favorites', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ toolId: id }),
                });
            } catch (error) {
                console.error('Failed to remove favorite:', error);
            }
        }

        const updated = favorites.filter(f => f.id !== id);
        setFavorites(updated);
        localStorage.setItem("vibestack-favorites", JSON.stringify(updated));
    };

    const clearAll = async () => {
        if (confirm("Are you sure you want to remove all favorites?")) {
            if (session?.user?.id) {
                for (const fav of favorites) {
                    if (fav.type === 'tool') {
                        await fetch('/api/favorites', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ toolId: fav.id }),
                        });
                    }
                }
            }
            setFavorites([]);
            localStorage.removeItem("vibestack-favorites");
        }
    };

    if (!mounted || isLoading) {
        return (
            <main className="min-h-screen bg-background pt-32 pb-20">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                </div>
            </main>
        );
    }

    const favoriteTools = filteredFavorites.filter(f => f.type === 'tool');
    const favoriteStacks = filteredFavorites.filter(f => f.type === 'stack');

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-6xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-rose-500/10">
                                    <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
                                </div>
                                <h1 className="text-4xl font-bold text-balance">My Favorites</h1>
                            </div>
                            <p className="text-muted-foreground">
                                {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
                                {session?.user && " (synced to your account)"}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* View Mode Toggle */}
                            <div className="flex items-center bg-card/50 rounded-lg border border-border/50 p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-indigo-500 text-white' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-indigo-500 text-white' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    <List className="h-4 w-4" />
                                </button>
                            </div>

                            {favorites.length > 0 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={clearAll}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-full"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Clear All
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Filters Bar */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.1 }}
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                >
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search favorites..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 rounded-full bg-card/50 border-border/50"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 rounded-full bg-card/50 border border-border/50 text-sm"
                    >
                        <option value="all">All Categories</option>
                        {categories.filter(c => c !== 'all').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="px-4 py-2 rounded-full bg-card/50 border border-border/50 text-sm"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="name">Name A-Z</option>
                    </select>
                </motion.div>

                {/* Empty State */}
                {favorites.length === 0 && (
                    <motion.div
                        initial={designSystem.animations.fadeInUp.initial}
                        animate={designSystem.animations.fadeInUp.animate}
                        transition={designSystem.animations.fadeInUp.transition}
                        className="text-center py-16 bg-card/30 rounded-3xl border border-border/30"
                    >
                        <div className="inline-flex p-6 rounded-full bg-muted/50 mb-6">
                            <Heart className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-3">No favorites yet</h2>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            Start saving your favorite tools and stacks to easily access them later.
                            {session?.user
                                ? " Your favorites will be synced across all your devices."
                                : " Sign in to sync your favorites across devices."
                            }
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Button asChild className="rounded-full shadow-lg shadow-indigo-500/20">
                                <Link href="/tools">Browse Tools</Link>
                            </Button>
                            <Button asChild variant="outline" className="rounded-full">
                                <Link href="/build">Find Stack</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Favorites Content */}
                {favorites.length > 0 && (
                    <div className="space-y-8">
                        {/* Tools Section */}
                        {favoriteTools.length > 0 && (
                            <motion.section
                                initial={designSystem.animations.fadeInUp.initial}
                                animate={designSystem.animations.fadeInUp.animate}
                                transition={designSystem.animations.fadeInUp.transition}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Sparkles className="w-5 h-5 text-indigo-500" />
                                    <h2 className="text-xl font-semibold">Tools ({favoriteTools.length})</h2>
                                </div>

                                <div className={viewMode === 'grid'
                                    ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                                    : "space-y-3"
                                }>
                                    {favoriteTools.map((item, index) => {
                                        const tool = tools.find((t: Tool) => t.slug === item.id);
                                        if (!tool) return null;

                                        return (
                                            <motion.div
                                                key={item.id}
                                                initial={designSystem.animations.fadeInUp.initial}
                                                animate={designSystem.animations.fadeInUp.animate}
                                                transition={{ ...designSystem.animations.fadeInUp.transition, delay: index * 0.05 }}
                                            >
                                                <Card className={`group border-border/50 hover:border-indigo-500/50 hover:bg-accent/50 transition-all duration-300 ${viewMode === 'list' ? 'flex items-center p-4' : ''
                                                    }`}>
                                                    <CardContent className={viewMode === 'list' ? 'p-0 flex-1' : 'p-4'}>
                                                        <div className={`flex items-start gap-3 ${viewMode === 'list' ? '' : 'mb-3'}`}>
                                                            <Link href={`/tool/${tool.slug}`} className="flex items-center gap-3 flex-1">
                                                                <div className={`p-2.5 rounded-lg bg-linear-to-br ${tool.bgGradient || "from-slate-500/60 to-slate-800/60"} shrink-0`}>
                                                                    {(() => {
                                                                        const Icon = getToolIcon(tool.slug);
                                                                        return <Icon className="h-5 w-5 text-white" />;
                                                                    })()}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <h3 className="font-semibold group-hover:text-indigo-500 transition-colors truncate">
                                                                        {tool.title}
                                                                    </h3>
                                                                    <p className="text-xs text-muted-foreground">{tool.category}</p>
                                                                </div>
                                                            </Link>
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="secondary" className="text-xs shrink-0">
                                                                    {tool.pricing}
                                                                </Badge>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => removeFavorite(item.id, 'tool')}
                                                                    className="text-muted-foreground hover:text-red-500 shrink-0"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.section>
                        )}

                        {/* Stacks Section */}
                        {favoriteStacks.length > 0 && (
                            <motion.section
                                initial={designSystem.animations.fadeInUp.initial}
                                animate={designSystem.animations.fadeInUp.animate}
                                transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.1 }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Sparkles className="w-5 h-5 text-violet-500" />
                                    <h2 className="text-xl font-semibold">Stacks ({favoriteStacks.length})</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {favoriteStacks.map((item, index) => {
                                        const stack = stacks.find(s => s.id === item.id);
                                        if (!stack) return null;

                                        return (
                                            <motion.div
                                                key={item.id}
                                                initial={designSystem.animations.fadeInUp.initial}
                                                animate={designSystem.animations.fadeInUp.animate}
                                                transition={{ ...designSystem.animations.fadeInUp.transition, delay: index * 0.05 }}
                                            >
                                                <Card className="group border-border/50 hover:border-violet-500/50 hover:bg-accent/50 transition-all duration-300">
                                                    <CardContent className="p-4">
                                                        <div className="flex items-start justify-between">
                                                            <Link href={`/stack/${stack.id}`} className="flex items-center gap-3 flex-1">
                                                                <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
                                                                    {stack.icon}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <h3 className="font-semibold group-hover:text-violet-500 transition-colors truncate">
                                                                        {stack.name}
                                                                    </h3>
                                                                    <Badge variant="outline" className="text-xs mt-1">
                                                                        {stack.totalPrice}
                                                                    </Badge>
                                                                </div>
                                                            </Link>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeFavorite(item.id, 'stack')}
                                                                className="text-muted-foreground hover:text-red-500 shrink-0"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                                                            {stack.description}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.section>
                        )}

                        {/* No Results */}
                        {favorites.length > 0 && filteredFavorites.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 bg-card/30 rounded-3xl border border-border/30"
                            >
                                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">No matches found</h3>
                                <p className="text-muted-foreground mb-4">
                                    Try adjusting your search or filters
                                </p>
                                <Button variant="outline" onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }} className="rounded-full">
                                    Clear Filters
                                </Button>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </PageBackground>
    );
}
