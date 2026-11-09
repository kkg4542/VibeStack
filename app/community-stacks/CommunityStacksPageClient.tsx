"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Users, TrendingUp, Clock, Eye, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageBackground, BackgroundPresets } from '@/components/effects/PageBackground';
import { CommunityStacksFilter } from '@/components/community/CommunityStacksFilter';
import { CommunityStackFilters, CommunityStackWithDetails } from '@/lib/data/community-stacks';
import { Container } from '@/components/primitives/Container';

interface CommunityStacksPageClientProps {
    stacks: CommunityStackWithDetails[];
    totalCount: number;
    filters: CommunityStackFilters;
}

const PAGE_SIZE = 20;

export function CommunityStacksPageClient({ stacks: initialStacks, totalCount, filters }: CommunityStacksPageClientProps) {
    // Extra pages fetched by "Load More". They belong to the server-rendered page
    // they were loaded for (`base`); when the filters change the server hands us
    // a new `initialStacks` array and the extras are ignored (no effect needed).
    const [more, setMore] = useState<{ base: CommunityStackWithDetails[]; items: CommunityStackWithDetails[] }>({
        base: initialStacks,
        items: [],
    });
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [loadError, setLoadError] = useState('');

    const extra = more.base === initialStacks ? more.items : [];
    const stacks = [...initialStacks, ...extra];
    const hasMore = stacks.length < totalCount;

    const loadMore = async () => {
        if (isLoadingMore) return;
        setIsLoadingMore(true);
        setLoadError('');
        try {
            const params = new URLSearchParams();
            if (filters.search) params.set('search', filters.search);
            if (filters.sortBy) params.set('sortBy', filters.sortBy);
            if (filters.timeRange) params.set('timeRange', filters.timeRange);
            params.set('limit', String(PAGE_SIZE));
            params.set('offset', String(stacks.length));

            const res = await fetch(`/api/community-stacks?${params.toString()}`);
            if (!res.ok) throw new Error('bad status');
            const data = await res.json();
            const incoming: CommunityStackWithDetails[] = Array.isArray(data.stacks) ? data.stacks : [];
            const seen = new Set(stacks.map((s) => s.id));
            setMore({
                base: initialStacks,
                items: [...extra, ...incoming.filter((s) => !seen.has(s.id))],
            });
        } catch {
            setLoadError('Could not load more stacks. Please try again.');
        } finally {
            setIsLoadingMore(false);
        }
    };

    // Stats for the page
    const stats = [
        { label: 'Community Stacks', value: totalCount.toLocaleString(), icon: Users },
        { label: 'Most Popular', value: 'This Week', icon: TrendingUp },
        { label: 'Updated', value: 'Just Now', icon: Clock },
    ];

    return (
        <PageBackground {...BackgroundPresets.content}>
            <Container className="pt-24 pb-20">
                {/* Header */}
                <div className="mb-16">
                    <p className="mb-5 text-[16px] font-semibold text-vibe-link">Community Curated</p>
                    <h1 className="mb-6 font-display text-balance text-[clamp(40px,6vw,96px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">
                        Community Stacks
                    </h1>
                    <p className="max-w-[60ch] text-[18px] leading-normal text-muted-foreground">
                        Discover AI tool workflows curated by developers like you.
                        Share your stack and help others build better workflows.
                    </p>

                    {/* Stats */}
                    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex items-center gap-2 text-[16px] text-muted-foreground"
                            >
                                <stat.icon aria-hidden="true" className="h-4 w-4 text-vibe-link" />
                                <span className="font-semibold text-foreground">{stat.value}</span>
                                <span>{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-10">
                        <Button
                            size="lg"
                            className="h-12 rounded-none px-8 text-[16px] font-semibold"
                            asChild
                        >
                            <Link href="/submit-stack">
                                <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
                                Share Your Stack
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <CommunityStacksFilter initialFilters={filters} />

                {/* Results count */}
                <div className="mb-6 text-[15px] text-muted-foreground">
                    Showing {stacks.length} of {totalCount} community stacks
                </div>

                {/* Community stacks grid */}
                {stacks.length > 0 ? (
                    <div className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                        {stacks.map((stack) => (
                            <article
                                key={stack.id}
                                className="flex h-full flex-col bg-card p-6 sm:p-8"
                            >
                                {/* Name and featured tag */}
                                <div className="mb-4 flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="line-clamp-2 text-[20px] font-semibold text-foreground">
                                            {stack.name}
                                        </h3>
                                        <p className="mt-1 text-[14px] text-muted-foreground">
                                            Created {new Date(stack.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {stack.isFeatured && (
                                        <span className="shrink-0 bg-vibe-electric px-2.5 py-1 text-[14px] font-semibold text-vibe-deep">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                {/* Description */}
                                {stack.description && (
                                    <p className="mb-4 line-clamp-2 text-[16px] leading-normal text-muted-foreground">
                                        {stack.description}
                                    </p>
                                )}

                                {/* Tools in this stack (plain text: tool pages are not guaranteed for every stored tool) */}
                                {stack.tools.length > 0 && (
                                    <ul className="mb-4 flex flex-wrap gap-2" aria-label="Tools in this stack">
                                        {stack.tools.slice(0, 5).map((tool) => (
                                            <li key={tool.id} className="bg-background px-2.5 py-1 text-[14px] font-semibold text-foreground">
                                                {tool.name}
                                            </li>
                                        ))}
                                        {stack.tools.length > 5 && (
                                            <li className="px-1 py-1 text-[14px] text-muted-foreground">+{stack.tools.length - 5} more</li>
                                        )}
                                    </ul>
                                )}

                                {/* Metrics */}
                                <div className="mb-6 flex items-center gap-4 text-[14px] text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <Eye aria-hidden="true" className="h-3.5 w-3.5" />
                                        {stack.viewCount.toLocaleString()}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Heart aria-hidden="true" className="h-3.5 w-3.5" />
                                        {stack.likeCount}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                                        {stack.saveCount} saves
                                    </span>
                                </div>

                                {/* Curator */}
                                <div className="mt-auto flex items-center gap-3">
                                    {stack.curator.image ? (
                                        <Image
                                            src={stack.curator.image}
                                            alt={stack.curator.name || 'Anonymous'}
                                            width={32}
                                            height={32}
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-[14px] font-semibold text-foreground">
                                            {stack.curator.name?.charAt(0) || '?'}
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[15px] font-semibold">
                                            {stack.curator.name || 'Anonymous'}
                                        </p>
                                        <p className="text-[14px] text-muted-foreground">
                                            Community Curator
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="bg-card px-6 py-20 text-center">
                        <Users aria-hidden="true" className="mx-auto mb-6 h-12 w-12 text-vibe-link" />
                        <h2 className="mb-2 text-[26px] font-semibold">No stacks found</h2>
                        <p className="mb-6 text-[17px] text-muted-foreground">
                            {filters.search
                                ? `No stacks match your search for "${filters.search}"`
                                : "Be the first to share a stack with the community!"
                            }
                        </p>
                        <Button
                            size="lg"
                            className="h-12 rounded-none px-8 text-[16px] font-semibold"
                            asChild
                        >
                            <Link href="/submit-stack">
                                <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
                                Share Your Stack
                            </Link>
                        </Button>
                    </div>
                )}

                {/* Load more (if there are more results) */}
                {hasMore && (
                    <div className="mt-12 text-center">
                        <Button
                            type="button"
                            variant="secondary"
                            size="lg"
                            onClick={loadMore}
                            disabled={isLoadingMore}
                            className="h-12 rounded-none px-8 text-[16px] font-semibold hover:bg-accent"
                        >
                            {isLoadingMore ? 'Loading...' : 'Load More Stacks'}
                        </Button>
                    </div>
                )}
                <div aria-live="polite" className="mt-4 text-center">
                    {loadError && <p className="text-[15px] font-semibold text-destructive">{loadError}</p>}
                </div>
            </Container>
        </PageBackground>
    );
}
