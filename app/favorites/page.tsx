"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { Heart, Trash2, Search, Loader2, Grid3X3, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/components/icons/tool-icons";
import { stacks } from "@/lib/stacks";
import { countToolsWithFreePlan, freePlanLabel } from "@/lib/stack-facts";
import { useSession } from "next-auth/react";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import type { Tool } from "@prisma/client";
import { useFavorites, type FavoriteItem } from "@/hooks/useFavorites";
import { Container } from "@/components/primitives/Container";

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'name';

export default function FavoritesPage() {
    const { data: session } = useSession();
    const { tools } = useAllTools();
    // Single source of truth: tools (database when signed in, localStorage
    // otherwise) and stacks (localStorage) in one {id,type,addedAt}[] list.
    const {
        favorites,
        isLoading,
        error: favoritesError,
        removeFavorite: removeSaved,
        clearAll: clearSaved,
    } = useFavorites();
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [confirmClearOpen, setConfirmClearOpen] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    const cancelClearRef = useRef<HTMLButtonElement>(null);

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

    const removeFavorite = (item: FavoriteItem) => removeSaved(item.id, item.type);

    // Clear All opens an in-page dialog (Radix Dialog: focus is trapped,
    // Escape and the overlay cancel). Focus starts on Cancel so a stray Enter
    // cannot wipe the list.
    const confirmClearAll = async () => {
        setIsClearing(true);
        try {
            await clearSaved();
        } finally {
            setIsClearing(false);
            setConfirmClearOpen(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-svh bg-background pb-20 pt-32">
                <Container size="default">
                    <div className="flex items-center justify-center py-20">
                        <Loader2 aria-hidden="true" className="h-8 w-8 animate-spin text-muted-foreground motion-reduce:animate-none" />
                    </div>
                </Container>
            </div>
        );
    }

    const favoriteTools = filteredFavorites.filter(f => f.type === 'tool');
    const favoriteStacks = filteredFavorites.filter(f => f.type === 'stack');

    return (
        <PageBackground {...BackgroundPresets.content}>
            <Container size="default">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <h1 className="mb-4 font-display text-[clamp(40px,6vw,96px)] text-foreground">My Favorites</h1>
                            <p className="text-[16px] text-muted-foreground">
                                {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
                                {session?.user && " (synced to your account)"}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    aria-label="Grid view"
                                    aria-pressed={viewMode === 'grid'}
                                    className={`p-2.5 transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link ${viewMode === 'grid' ? 'bg-vibe-electric text-vibe-deep' : 'bg-card text-foreground hover:bg-secondary'}`}
                                >
                                    <Grid3X3 aria-hidden="true" className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    aria-label="List view"
                                    aria-pressed={viewMode === 'list'}
                                    className={`p-2.5 transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link ${viewMode === 'list' ? 'bg-vibe-electric text-vibe-deep' : 'bg-card text-foreground hover:bg-secondary'}`}
                                >
                                    <List aria-hidden="true" className="h-4 w-4" />
                                </button>
                            </div>

                            {favorites.length > 0 && (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setConfirmClearOpen(true)}
                                    className="h-10 rounded-none text-[14px] font-semibold"
                                >
                                    <Trash2 aria-hidden="true" className="mr-2 h-4 w-4" />
                                    Clear All
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {favoritesError && (
                    <p role="alert" className="mb-6 bg-card px-4 py-3 text-[16px] text-foreground">
                        {favoritesError}
                    </p>
                )}

                {/* Filters Bar */}
                <div className="mb-10 flex flex-col gap-1 sm:flex-row">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search favorites..."
                            aria-label="Search favorites"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-11 rounded-none border-0 bg-card pl-10 text-[16px] shadow-none focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link dark:bg-card"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                            >
                                <X aria-hidden="true" className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        aria-label="Filter by category"
                        className="h-11 rounded-none bg-card px-4 text-[16px] text-foreground hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
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
                        aria-label="Sort favorites"
                        className="h-11 rounded-none bg-card px-4 text-[16px] text-foreground hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="name">Name A-Z</option>
                    </select>
                </div>

                {/* Empty State */}
                {favorites.length === 0 && (
                    <div className="bg-card p-8 md:p-12">
                        <Heart aria-hidden="true" className="mb-6 h-10 w-10 text-foreground" />
                        <h2 className="mb-3 font-display text-[clamp(32px,4vw,56px)] text-foreground">No favorites yet</h2>
                        <p className="mb-8 max-w-md text-[16px] leading-normal text-muted-foreground">
                            Start saving your favorite tools and stacks to easily access them later.
                            {session?.user
                                ? " Your favorites will be synced across all your devices."
                                : " Sign in to sync your favorites across devices."
                            }
                        </p>
                        <div className="flex flex-wrap gap-1">
                            <Button asChild className="h-11 rounded-none bg-vibe-electric px-6 text-[16px] font-semibold text-vibe-deep shadow-none hover:bg-vibe-electric/90">
                                <Link href="/tools">Browse Tools</Link>
                            </Button>
                            <Button asChild variant="secondary" className="h-11 rounded-none px-6 text-[16px] font-semibold">
                                <Link href="/build">Find Stack</Link>
                            </Button>
                        </div>
                    </div>
                )}

                {/* Favorites Content */}
                {favorites.length > 0 && (
                    <div className="space-y-12">
                        {/* Tools Section */}
                        {favoriteTools.length > 0 && (
                            <section>
                                <h2 className="mb-6 font-display text-[clamp(32px,4vw,56px)] text-foreground">Tools ({favoriteTools.length})</h2>

                                <div className={viewMode === 'grid'
                                    ? "grid gap-1 md:grid-cols-2 lg:grid-cols-3"
                                    : "space-y-1"
                                }>
                                    {favoriteTools.map((item) => {
                                        const tool = tools.find((t: Tool) => t.slug === item.id);
                                        if (!tool) return null;

                                        return (
                                            <div
                                                key={item.id}
                                                className={`group bg-card text-card-foreground transition-colors duration-150 hover:bg-secondary motion-reduce:transition-none ${viewMode === 'list' ? 'flex items-center p-4' : 'p-4'}`}
                                            >
                                                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                                                    <div className="flex items-start gap-3">
                                                        <Link href={`/tool/${tool.slug}`} className="flex flex-1 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link">
                                                            {/* tool.bgGradient is per-item colour data; it no longer renders. */}
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-secondary text-foreground group-hover:bg-background">
                                                                {(() => {
                                                                    const Icon = getToolIcon(tool.slug);
                                                                    return <Icon className="h-5 w-5" />;
                                                                })()}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <h3 className="truncate text-[16px] font-semibold transition-colors group-hover:text-vibe-link">
                                                                    {tool.title}
                                                                </h3>
                                                                <p className="text-[14px] text-muted-foreground">{tool.category}</p>
                                                            </div>
                                                        </Link>
                                                        <div className="flex items-center gap-2">
                                                            <span className="shrink-0 text-[14px] font-semibold text-foreground">
                                                                {tool.pricing}
                                                            </span>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeFavorite(item)}
                                                                aria-label={`Remove ${tool.title} from favorites`}
                                                                className="size-10 shrink-0 rounded-none px-0 text-muted-foreground hover:bg-vibe-electric hover:text-vibe-deep"
                                                            >
                                                                <Trash2 aria-hidden="true" className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Stacks Section */}
                        {favoriteStacks.length > 0 && (
                            <section>
                                <h2 className="mb-6 font-display text-[clamp(32px,4vw,56px)] text-foreground">Stacks ({favoriteStacks.length})</h2>

                                <div className="grid gap-1 md:grid-cols-2">
                                    {favoriteStacks.map((item) => {
                                        const stack = stacks.find(s => s.id === item.id);
                                        if (!stack) return null;
                                        const freeCount = countToolsWithFreePlan(stack.tools, tools);

                                        return (
                                            <div key={item.id} className="group bg-card p-4 text-card-foreground transition-colors duration-150 hover:bg-secondary motion-reduce:transition-none">
                                                <div className="flex items-start justify-between">
                                                    <Link href={`/stack/${stack.id}`} className="flex flex-1 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link">
                                                        {/* stack.icon is an emoji; direction B shows the initial instead. */}
                                                        <div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center bg-secondary font-display text-[28px] text-foreground group-hover:bg-background">
                                                            {stack.name.charAt(0)}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h3 className="truncate text-[16px] font-semibold transition-colors group-hover:text-vibe-link">
                                                                {stack.name}
                                                            </h3>
                                                            <p className="mt-1 text-[14px] font-semibold text-muted-foreground">
                                                                {freeCount === null
                                                                    ? `${stack.tools.length} tools`
                                                                    : freePlanLabel(freeCount, stack.tools.length)}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeFavorite(item)}
                                                        aria-label={`Remove ${stack.name} from favorites`}
                                                        className="size-10 shrink-0 rounded-none px-0 text-muted-foreground hover:bg-vibe-electric hover:text-vibe-deep"
                                                    >
                                                        <Trash2 aria-hidden="true" className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <p className="mt-3 line-clamp-2 text-[16px] leading-normal text-muted-foreground">
                                                    {stack.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* No Results */}
                        {favorites.length > 0 && filteredFavorites.length === 0 && (
                            <div className="bg-card p-8 md:p-12">
                                <h3 className="mb-2 text-[24px] font-semibold">No matches found</h3>
                                <p className="mb-6 text-[16px] text-muted-foreground">
                                    Try adjusting your search or filters
                                </p>
                                <Button variant="secondary" onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }} className="h-11 rounded-none px-6 text-[16px] font-semibold">
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Container>

            <Dialog
                open={confirmClearOpen}
                onOpenChange={(next) => {
                    // Keep the dialog open while the removal is in flight.
                    if (!isClearing) setConfirmClearOpen(next);
                }}
            >
                <DialogContent
                    className="bg-popover p-8 sm:max-w-[440px]"
                    onOpenAutoFocus={(event) => {
                        event.preventDefault();
                        cancelClearRef.current?.focus();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle className="font-display text-3xl uppercase leading-[0.9] tracking-[-0.005em]">
                            Remove all favorites?
                        </DialogTitle>
                        <DialogDescription className="text-[16px] leading-normal">
                            This removes {favorites.length} saved {favorites.length === 1 ? 'item' : 'items'} from your favorites.
                            {session?.user ? " Saved tools are also removed from your account." : ""} This cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button
                            ref={cancelClearRef}
                            variant="secondary"
                            onClick={() => setConfirmClearOpen(false)}
                            disabled={isClearing}
                            className="h-11 rounded-none px-6 text-[16px] font-semibold"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmClearAll}
                            disabled={isClearing}
                            className="h-11 rounded-none bg-vibe-electric px-6 text-[16px] font-semibold text-vibe-deep shadow-none hover:bg-vibe-electric/90"
                        >
                            {isClearing ? "Removing..." : `Remove ${favorites.length === 1 ? 'item' : `all ${favorites.length}`}`}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </PageBackground>
    );
}
