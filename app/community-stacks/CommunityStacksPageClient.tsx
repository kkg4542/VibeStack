"use client";

import Link from 'next/link';
import Image from 'next/image';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { Plus, Users, TrendingUp, Clock, Eye, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VibeCard } from '@/components/ui/VibeCard';
import { PageBackground, BackgroundPresets } from '@/components/effects/PageBackground';
import { designSystem } from '@/lib/design-system';
import { CommunityStacksFilter } from '@/components/community/CommunityStacksFilter';
import { CommunityStackFilters, CommunityStackWithDetails } from '@/lib/data/community-stacks';

interface CommunityStacksPageClientProps {
    stacks: CommunityStackWithDetails[];
    totalCount: number;
    filters: CommunityStackFilters;
}

export function CommunityStacksPageClient({ stacks, totalCount, filters }: CommunityStacksPageClientProps) {
    // Stats for the page
    const stats = [
        { label: 'Community Stacks', value: totalCount.toLocaleString(), icon: Users },
        { label: 'Most Popular', value: 'This Week', icon: TrendingUp },
        { label: 'Updated', value: 'Just Now', icon: Clock },
    ];

    return (
        <LazyMotion features={domAnimation}>
            <PageBackground {...BackgroundPresets.content}>
                <div className="container mx-auto px-4 pt-24 pb-20">
                    {/* Header Section */}
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <m.div
                            initial={designSystem.animations.fadeInUp.initial}
                            animate={designSystem.animations.fadeInUp.animate}
                            transition={designSystem.animations.fadeInUp.transition}
                        >
                            <Badge
                                variant="outline"
                                className="mb-4 border-vibe-electric/30 bg-vibe-electric/5 text-vibe-electric"
                            >
                                <Users className="mr-2 h-3 w-3" />
                                Community Curated
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Community{' '}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600">
                                    Stacks
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                                Discover AI tool workflows curated by developers like you.
                                Share your stack and help others build better workflows.
                            </p>
                        </m.div>

                        {/* Stats */}
                        <m.div
                            className="flex flex-wrap justify-center gap-6 mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                >
                                    <stat.icon className="w-4 h-4 text-vibe-electric" />
                                    <span className="font-medium text-foreground">{stat.value}</span>
                                    <span>{stat.label}</span>
                                </div>
                            ))}
                        </m.div>

                        {/* CTA Button */}
                        <m.div
                            className="mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <Link href="/submit-stack">
                                <Button
                                    size="lg"
                                    className="rounded-full px-8 shadow-lg shadow-vibe-electric/20"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Share Your Stack
                                </Button>
                            </Link>
                        </m.div>
                    </div>

                    {/* Filters */}
                    <CommunityStacksFilter initialFilters={filters} />

                    {/* Results Count */}
                    <div className="mb-6 text-sm text-muted-foreground">
                        Showing {stacks.length} of {totalCount} community stacks
                    </div>

                    {/* Community Stacks Grid */}
                    {stacks.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {stacks.map((stack, index) => (
                                <m.div
                                    key={stack.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                >
                                    <Link
                                        href={`/community-stack/${stack.id}`}
                                        className="group block h-full"
                                    >
                                        <VibeCard
                                            className="h-full"
                                            tiltStrength={8}
                                            glowOnHover={true}
                                            depth={20}
                                        >
                                            <div className="h-full flex flex-col p-6 sm:p-8">
                                                {/* Stack Name & Featured Badge */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-foreground group-hover:text-vibe-electric transition-colors line-clamp-2">
                                                            {stack.name}
                                                        </h3>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Created {new Date(stack.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    {stack.isFeatured && (
                                                        <Badge
                                                            variant="secondary"
                                                            className="bg-vibe-electric/10 text-vibe-electric border-vibe-electric/20 shrink-0"
                                                        >
                                                            Featured
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Description */}
                                                {stack.description && (
                                                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                                                        {stack.description}
                                                    </p>
                                                )}

                                                {/* Metrics */}
                                                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="w-3 h-3" />
                                                        {stack.viewCount.toLocaleString()}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Heart className="w-3 h-3" />
                                                        {stack.likeCount}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <ArrowRight className="w-3 h-3" />
                                                        {stack.saveCount} saves
                                                    </span>
                                                </div>

                                                {/* Curator Info */}
                                                <div className="mt-auto pt-4 border-t border-white/10">
                                                    <div className="flex items-center gap-3">
                                                        {stack.curator.image ? (
                                                            <Image
                                                                src={stack.curator.image}
                                                                alt={stack.curator.name || 'Anonymous'}
                                                                width={32}
                                                                height={32}
                                                                className="w-8 h-8 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-xs font-bold text-white">
                                                                {stack.curator.name?.charAt(0) || '?'}
                                                            </div>
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium truncate">
                                                                {stack.curator.name || 'Anonymous'}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Community Curator
                                                            </p>
                                                        </div>
                                                        <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-vibe-electric transition-colors" />
                                                    </div>
                                                </div>
                                            </div>
                                        </VibeCard>
                                    </Link>
                                </m.div>
                            ))}
                        </div>
                    ) : (
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="inline-flex p-4 rounded-full bg-vibe-electric/10 mb-6">
                                <Users className="h-12 w-12 text-vibe-electric" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">No stacks found</h3>
                            <p className="text-muted-foreground mb-6">
                                {filters.search
                                    ? `No stacks match your search for "${filters.search}"`
                                    : "Be the first to share a stack with the community!"
                                }
                            </p>
                            <Link href="/submit-stack">
                                <Button
                                    size="lg"
                                    className="rounded-full px-8"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Share Your Stack
                                </Button>
                            </Link>
                        </m.div>
                    )}

                    {/* Load More Button (if there are more results) */}
                    {stacks.length < totalCount && (
                        <div className="mt-12 text-center">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 border-vibe-electric/30 hover:border-vibe-electric hover:bg-vibe-electric/10"
                            >
                                Load More Stacks
                            </Button>
                        </div>
                    )}
                </div>
            </PageBackground>
        </LazyMotion>
    );
}
