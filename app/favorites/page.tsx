"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Trash2, ArrowLeft, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { tools } from "@/lib/tools";
import { stacks } from "@/lib/stacks";
import { useSession } from "next-auth/react";

type FavoriteItem = {
    id: string;
    type: 'tool' | 'stack';
    addedAt: number;
};

export default function FavoritesPage() {
    const { data: session } = useSession();
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load favorites
    useEffect(() => {
        setMounted(true);
        loadFavorites();
    }, [session]);

    const loadFavorites = async () => {
        setIsLoading(true);
        
        if (session?.user?.id) {
            // Load from DB
            try {
                const response = await fetch('/api/favorites');
                if (response.ok) {
                    const dbFavorites = await response.json();
                    const formatted = dbFavorites.map((f: any) => ({
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
            // Load from localStorage
            const saved = localStorage.getItem("vibestack-favorites");
            if (saved) {
                setFavorites(JSON.parse(saved));
            }
        }
        
        setIsLoading(false);
    };

    const filteredFavorites = favorites.filter(item => {
        if (!searchQuery.trim()) return true;

        const lowerQuery = searchQuery.toLowerCase();
        if (item.type === 'tool') {
            const tool = tools.find(t => t.slug === item.id);
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
                    stack.description.toLowerCase().includes(lowerQuery) ||
                    stack.tags.some(t => t.toLowerCase().includes(lowerQuery))
                );
            }
        }
        return false;
    });

    const removeFavorite = async (id: string, type: 'tool' | 'stack') => {
        if (session?.user?.id && type === 'tool') {
            // Remove from DB
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
        
        // Update local state
        const updated = favorites.filter(f => f.id !== id);
        setFavorites(updated);
        localStorage.setItem("vibestack-favorites", JSON.stringify(updated));
    };

    const clearAll = async () => {
        if (confirm("Are you sure you want to remove all favorites?")) {
            if (session?.user?.id) {
                // Clear all from DB
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
            <main className="min-h-screen bg-background pt-24 pb-20">
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
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
                            <Heart className="h-8 w-8 text-red-500 fill-current" />
                            My Favorites
                        </h1>
                        <p className="text-muted-foreground">
                            {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
                            {session?.user && " (synced to your account)"}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search favorites..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-64"
                            />
                        </div>
                        {favorites.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearAll}
                                className="text-red-500 hover:text-red-600"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Clear All
                            </Button>
                        )}
                    </div>
                </div>

                {/* Empty State */}
                {favorites.length === 0 && (
                    <div className="text-center py-16">
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
                            <Button asChild className="rounded-full">
                                <Link href="/tools">Browse Tools</Link>
                            </Button>
                            <Button asChild variant="outline" className="rounded-full">
                                <Link href="/build">Find Stack</Link>
                            </Button>
                        </div>
                    </div>
                )}

                {/* Favorites Grid */}
                {favorites.length > 0 && (
                    <div className="space-y-8">
                        {/* Tools Section */}
                        {favoriteTools.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Tools ({favoriteTools.length})</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {favoriteTools.map((item) => {
                                        const tool = tools.find(t => t.slug === item.id);
                                        if (!tool) return null;

                                        return (
                                            <Card key={item.id} className="group border-border/50 hover:border-indigo-500/50 hover:bg-accent/50 transition-all duration-300">
                                                <CardContent className="p-4">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <Link href={`/tool/${tool.slug}`} className="flex items-center gap-3">
                                                            <div className={`p-2.5 rounded-lg ${tool.bgGradient}`}>
                                                                <tool.icon className={`h-5 w-5 ${tool.color}`} />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold group-hover:text-indigo-500 transition-colors">
                                                                    {tool.title}
                                                                </h3>
                                                                <p className="text-xs text-muted-foreground">{tool.category}</p>
                                                            </div>
                                                        </Link>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeFavorite(item.id, 'tool')}
                                                            className="text-muted-foreground hover:text-red-500"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {tool.pricing}
                                                    </Badge>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Stacks Section */}
                        {favoriteStacks.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Stacks ({favoriteStacks.length})</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {favoriteStacks.map((item) => {
                                        const stack = stacks.find(s => s.id === item.id);
                                        if (!stack) return null;

                                        return (
                                            <Card key={item.id} className="group border-border/50 hover:border-indigo-500/50 hover:bg-accent/50 transition-all duration-300">
                                                <CardContent className="p-4">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <Link href={`/stack/${stack.id}`} className="flex items-center gap-3">
                                                            <div className="shrink-0 w-12 h-12 rounded-lg bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
                                                                {stack.icon}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold group-hover:text-indigo-500 transition-colors">
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
                                                            className="text-muted-foreground hover:text-red-500"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {stack.description}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* No Results */}
                {favorites.length > 0 && filteredFavorites.length === 0 && (
                    <div className="text-center py-12">
                        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No matches found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search query
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
