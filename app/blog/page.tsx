"use client";

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog";
import { Calendar, Clock, User, Search, ArrowRight, Filter, X, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { PopularToolsRail } from "@/components/blog/PopularToolsRail";
import { Container } from "@/components/primitives/Container";

type SortOption = "newest" | "oldest" | "readTime";

/** Shared focus ring for every control on the page. */
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link";

/** Square filter chip; selected = orange fill with dark text. */
function chipClass(selected: boolean) {
    return `px-3 py-2 text-[14px] font-semibold transition-colors duration-150 ${FOCUS} ${selected
        ? "bg-vibe-electric text-vibe-deep"
        : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
        }`;
}

export default function BlogListingPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [showFilters, setShowFilters] = useState(false);

    // Get unique categories and tags
    const categories = useMemo(() => {
        const cats = new Set(blogPosts.map(post => post.category));
        return ["All", ...Array.from(cats)];
    }, []);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        blogPosts.forEach(post => {
            if (post.tags) {
                post.tags.forEach(tag => tags.add(tag));
            }
        });
        return Array.from(tags).slice(0, 10);
    }, []);

    // Filter and sort posts
    const filteredPosts = useMemo(() => {
        let posts = blogPosts.filter(post => {
            const matchSearch = !searchQuery ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchCategory = selectedCategory === "All" || post.category === selectedCategory;
            return matchSearch && matchCategory;
        });

        // Sort posts
        switch (sortBy) {
            case "newest":
                posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            case "oldest":
                posts = posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                break;
            case "readTime":
                posts = posts.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
                break;
        }

        return posts;
    }, [searchQuery, selectedCategory, sortBy]);

    // Featured posts (first 2)
    const featuredPosts = blogPosts.slice(0, 2);
    const regularPosts = filteredPosts.filter(post =>
        !featuredPosts.some(fp => fp.slug === post.slug)
    );

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
        setSortBy("newest");
    };

    return (
        <PageBackground {...BackgroundPresets.content}>
            <Container>
                {/* Hero */}
                <header className="mb-16 pt-8">
                    <p className="mb-5 text-[16px] font-semibold text-vibe-link">
                        {blogPosts.length} articles published
                    </p>

                    <h1 className="mb-6 font-display text-balance text-[clamp(32px,6vw,96px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">
                        Insights on AI &amp; Development
                    </h1>

                    <p className="mb-10 max-w-[60ch] text-[18px] leading-normal text-muted-foreground">
                        Deep dives into modern development workflows, AI tool comparisons, productivity hacks, and the future of coding.
                    </p>

                    {/* Search and filters */}
                    <div className="max-w-3xl bg-card p-2">
                        <div className="relative flex items-center">
                            <Search aria-hidden="true" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                aria-label="Search articles"
                                placeholder="Search articles by title, category, or tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full bg-background py-4 pl-12 pr-14 text-[16px] text-foreground placeholder:text-muted-foreground ${FOCUS}`}
                            />
                            {(searchQuery || selectedCategory !== "All") && (
                                <button
                                    onClick={clearFilters}
                                    aria-label="Clear filters"
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground ${FOCUS}`}
                                >
                                    <X aria-hidden="true" className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Filter bar */}
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                aria-expanded={showFilters}
                                className={`flex items-center gap-2 px-3 py-2 text-[15px] text-muted-foreground transition-colors hover:text-foreground ${FOCUS}`}
                            >
                                <Filter aria-hidden="true" className="h-4 w-4" />
                                Filters
                                <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform motion-reduce:transition-none ${showFilters ? "rotate-180" : ""}`} />
                            </button>

                            {selectedCategory !== "All" && (
                                <button
                                    onClick={() => setSelectedCategory("All")}
                                    className={`inline-flex items-center gap-1.5 bg-secondary px-3 py-2 text-[14px] font-semibold text-foreground hover:bg-accent ${FOCUS}`}
                                >
                                    {selectedCategory}
                                    <X aria-hidden="true" className="h-3.5 w-3.5" />
                                </button>
                            )}
                            <span className="px-3 py-2 text-[14px] text-muted-foreground">
                                Sort: {sortBy === "newest" ? "Newest" : sortBy === "oldest" ? "Oldest" : "Read Time"}
                            </span>
                        </div>

                        {/* Expandable filters */}
                        {showFilters && (
                            <div className="mt-2 bg-background p-4">
                                <div className="mb-5">
                                    <span className="mb-2 block text-[14px] text-muted-foreground">Categories</span>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                aria-pressed={selectedCategory === cat}
                                                className={chipClass(selectedCategory === cat)}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <span className="mb-2 block text-[14px] text-muted-foreground">Sort By</span>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { value: "newest", label: "Newest First" },
                                            { value: "oldest", label: "Oldest First" },
                                            { value: "readTime", label: "Read Time" }
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => setSortBy(option.value as SortOption)}
                                                aria-pressed={sortBy === option.value}
                                                className={chipClass(sortBy === option.value)}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Popular tags */}
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                        <span className="mr-1 text-[15px] text-muted-foreground">Popular:</span>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSearchQuery(tag)}
                                className={`inline-flex min-h-10 items-center bg-secondary px-3 py-1.5 text-[14px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground ${FOCUS}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-3">
                        {/* Featured posts */}
                        {!searchQuery && selectedCategory === "All" && (
                            <section className="mb-20">
                                <h2 className="mb-8 font-display text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground">
                                    Featured Articles
                                </h2>

                                <div className="grid gap-3 md:grid-cols-2 md:gap-6">
                                    {featuredPosts.map((post, index) => (
                                        <article key={post.slug}>
                                            <Link href={`/blog/${post.slug}`} className={`group flex h-full flex-col bg-foreground text-background ${FOCUS}`}>
                                                <div className="relative aspect-16/10 w-full overflow-hidden bg-secondary">
                                                    <Image
                                                        src={post.image}
                                                        alt={`Featured image for: ${post.title}`}
                                                        fill
                                                        priority={index < 2}
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col p-6">
                                                    <span className="mb-3 self-start bg-vibe-electric px-2.5 py-1 text-[14px] font-semibold text-vibe-deep">
                                                        {post.category}
                                                    </span>
                                                    <h3 className="mb-3 line-clamp-2 text-[24px] font-semibold leading-tight text-background decoration-vibe-electric decoration-2 underline-offset-4 group-hover:underline">
                                                        {post.title}
                                                    </h3>
                                                    <p className="mb-6 line-clamp-2 text-[16px] leading-normal text-background/80">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-[14px] text-background/75">
                                                        <div className="flex items-center gap-4">
                                                            <span className="flex items-center gap-1.5">
                                                                <User className="h-3.5 w-3.5" aria-hidden="true" />
                                                                <span className="sr-only">Author: </span>{post.author}
                                                            </span>
                                                            <span className="flex items-center gap-1.5">
                                                                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                                                <span className="sr-only">Read time: </span>{post.readTime}
                                                            </span>
                                                        </div>
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                                                            <span className="sr-only">Date: </span>{post.date}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* All posts */}
                        <section>
                            <div className="mb-8 flex items-baseline gap-3">
                                <h2 className="font-display text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground">
                                    {searchQuery || selectedCategory !== "All" ? "Search Results" : "Latest Articles"}
                                </h2>
                                {filteredPosts.length > 0 && (
                                    <span className="text-[16px] text-muted-foreground">
                                        ({filteredPosts.length})
                                    </span>
                                )}
                            </div>

                            {filteredPosts.length === 0 ? (
                                <div className="bg-card px-6 py-16 text-center">
                                    <Search aria-hidden="true" className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
                                    <p className="mb-6 text-[18px] text-muted-foreground">No articles found matching your search.</p>
                                    <button
                                        onClick={clearFilters}
                                        className={`inline-flex h-11 items-center bg-vibe-electric px-6 text-[16px] font-semibold text-vibe-deep transition-colors hover:bg-vibe-electric/90 ${FOCUS}`}
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                                    {(searchQuery || selectedCategory !== "All" ? filteredPosts : regularPosts).map((post) => (
                                        <article key={post.slug}>
                                            <Link href={`/blog/${post.slug}`} className={`group flex h-full flex-col bg-card transition-colors duration-150 hover:bg-accent ${FOCUS}`}>
                                                <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                                                    <Image
                                                        src={post.image}
                                                        alt={`Article thumbnail: ${post.title}`}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col p-6">
                                                    <div className="mb-2 flex items-center gap-2 text-[14px] text-muted-foreground">
                                                        <span className="font-semibold text-vibe-link">{post.category}</span>
                                                        <span aria-hidden="true">&middot;</span>
                                                        <span className="flex items-center">
                                                            <Clock className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                                                            <span className="sr-only">Read time: </span>{post.readTime}
                                                        </span>
                                                    </div>
                                                    <h3 className="mb-2 line-clamp-2 text-[19px] font-semibold leading-snug text-foreground decoration-vibe-electric decoration-2 underline-offset-4 group-hover:underline">
                                                        {post.title}
                                                    </h3>
                                                    <p className="mb-5 line-clamp-2 text-[16px] leading-normal text-muted-foreground">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="mt-auto flex items-center gap-2 text-[14px] text-muted-foreground">
                                                        <User className="h-3.5 w-3.5" aria-hidden="true" />
                                                        <span className="sr-only">Author: </span> {post.author}
                                                        <span className="ml-auto flex items-center">
                                                            <Calendar className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                                                            <span className="sr-only">Date: </span> {post.date}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-3 lg:col-span-1 lg:mt-[88px]">
                        {/* Newsletter CTA: the accent field */}
                        <div className="bg-vibe-electric p-6 text-vibe-deep">
                            <h3 className="mb-2 font-display text-[36px] uppercase leading-[0.9] tracking-[-0.005em]">Stay Updated</h3>
                            <p className="mb-5 text-[16px] leading-normal">
                                Get weekly insights on AI tools and productivity tips.
                            </p>
                            <Link
                                href="/newsletter"
                                className="group inline-flex h-11 w-full items-center justify-center gap-2 bg-vibe-deep px-5 text-[16px] font-semibold text-[#eff0f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-deep"
                            >
                                Subscribe
                                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                            </Link>
                        </div>

                        {/* Categories */}
                        <div className="bg-card p-6">
                            <h3 className="mb-4 text-[18px] font-semibold">Categories</h3>
                            <div className="space-y-1">
                                {categories.filter(cat => cat !== "All").map((cat) => {
                                    const count = blogPosts.filter(p => p.category === cat).length;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            aria-pressed={selectedCategory === cat}
                                            className={`flex w-full items-center justify-between px-3 py-2 text-[15px] transition-colors ${FOCUS} ${selectedCategory === cat
                                                ? "bg-vibe-electric font-semibold text-vibe-deep"
                                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                                }`}
                                        >
                                            <span>{cat}</span>
                                            <span className="text-[14px]">{count}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="mt-20">
                    <PopularToolsRail />
                </div>
            </Container>
        </PageBackground>
    );
}
