"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Search,
    Home,
    ArrowLeft,
    Sparkles,
    Wrench
} from "lucide-react";
import { SearchInput } from "@/components/ui/search-input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAllTools } from "@/hooks/use-tools";
import { blogPosts } from "@/lib/blog";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { getToolIcon } from "@/components/icons/tool-icons";
import type { Tool } from "@prisma/client";
import { Container } from "@/components/primitives/Container";

export default function NotFound() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const { tools } = useAllTools();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Get featured content
    const featuredTools = tools.slice(0, 3);
    const latestPosts = blogPosts.slice(0, 2);

    const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link";
    const btn = "h-12 rounded-none px-6 text-[16px] font-semibold";

    return (
        <PageBackground {...BackgroundPresets.content}>
            <Container size="md">
                {/* 404 hero */}
                <div className="mb-20 pt-8">
                    <p
                        aria-hidden="true"
                        className="mb-4 font-display text-[clamp(160px,30vw,320px)] leading-[0.8] tracking-[-0.01em] text-vibe-link"
                    >
                        404
                    </p>

                    <p className="mb-4 text-[16px] font-semibold text-muted-foreground">Lost in the Stack?</p>

                    <h1 className="mb-6 font-display text-balance text-[clamp(40px,6vw,96px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">
                        Page Not Found
                    </h1>

                    <p className="mb-10 max-w-[60ch] text-[18px] leading-normal text-muted-foreground">
                        Oops! Looks like this page wandered off into the digital void.
                        But don&apos;t worry, we&apos;ve got plenty of other great content for you!
                    </p>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="mb-8 max-w-xl">
                        <div className="relative">
                            <SearchInput
                                variant="hero"
                                placeholder="Search for tools, stacks, or articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pr-32"
                            >
                                <Button
                                    type="submit"
                                    className="absolute right-2 top-1/2 h-10 -translate-y-1/2 rounded-none px-5 font-semibold"
                                >
                                    Search
                                </Button>
                            </SearchInput>
                        </div>
                    </form>

                    {/* Quick links */}
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="default" className={btn}>
                            <Link href="/">
                                <Home aria-hidden="true" className="mr-2 h-4 w-4" />
                                Go Home
                            </Link>
                        </Button>

                        <Button asChild variant="secondary" className={`${btn} hover:bg-accent`}>
                            <Link href="/tools">
                                <Wrench aria-hidden="true" className="mr-2 h-4 w-4" />
                                Browse Tools
                            </Link>
                        </Button>

                        <Button asChild variant="secondary" className={`${btn} hover:bg-accent`}>
                            <Link href="/build">
                                <Sparkles aria-hidden="true" className="mr-2 h-4 w-4" />
                                AI Stack Finder
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Recommended content */}
                <div className="grid gap-10 md:grid-cols-2 md:gap-6">
                    {/* Popular tools */}
                    <div>
                        <h2 className="mb-6 text-[24px] font-semibold">Popular Tools</h2>
                        <div className="space-y-2">
                            {featuredTools.map((tool: Tool) => (
                                <Link
                                    key={tool.slug}
                                    href={`/tool/${tool.slug}`}
                                    className={`group flex items-center gap-4 bg-card p-4 transition-colors duration-150 hover:bg-accent ${focus}`}
                                >
                                    <div className="bg-secondary p-2.5">
                                        {(() => {
                                            const Icon = getToolIcon(tool.slug);
                                            return <Icon aria-hidden="true" className="h-5 w-5 text-foreground" />;
                                        })()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-[17px] font-semibold decoration-vibe-electric decoration-2 underline-offset-4 group-hover:underline">
                                            {tool.title}
                                        </h3>
                                        <p className="line-clamp-1 text-[15px] text-muted-foreground">
                                            {tool.description}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-[14px] text-muted-foreground">
                                        {tool.category}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Latest articles */}
                    <div>
                        <h2 className="mb-6 text-[24px] font-semibold">Latest Articles</h2>
                        <div className="space-y-2">
                            {latestPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className={`group block bg-card p-4 transition-colors duration-150 hover:bg-accent ${focus}`}
                                >
                                    <p className="mb-1 text-[14px] font-semibold text-vibe-link">
                                        {post.category}
                                    </p>
                                    <h3 className="line-clamp-2 text-[17px] font-semibold decoration-vibe-electric decoration-2 underline-offset-4 group-hover:underline">
                                        {post.title}
                                    </h3>
                                    <p className="mt-1 text-[14px] text-muted-foreground">
                                        {post.date}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Helpful links */}
                <div className="mt-16 flex flex-col justify-between gap-4 bg-card p-6 md:flex-row md:items-center">
                    <p className="text-[17px] text-foreground">
                        Can&apos;t find what you&apos;re looking for?
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button variant="secondary" className="h-11 rounded-none bg-background px-5 text-[16px] font-semibold hover:bg-accent" asChild>
                            <Link href="/search">
                                <Search aria-hidden="true" className="mr-2 h-4 w-4" />
                                Advanced Search
                            </Link>
                        </Button>
                        <Link
                            href="/about"
                            className={`inline-flex h-11 items-center px-3 text-[16px] font-semibold text-vibe-link underline-offset-4 hover:underline ${focus}`}
                        >
                            Contact Support
                            <ArrowLeft aria-hidden="true" className="ml-2 h-4 w-4 rotate-180" />
                        </Link>
                    </div>
                </div>
            </Container>
        </PageBackground>
    );
}
