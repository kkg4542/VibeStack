"use client";

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Search, ArrowRight, BookOpen, TrendingUp, Sparkles, Filter, X, ChevronDown } from "lucide-react";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";
import { useState, useMemo } from "react";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";

type SortOption = "newest" | "oldest" | "readTime";

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
            <div className="container max-w-7xl mx-auto px-4">
                {/* Hero Section - Enhanced */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                    className="text-center mb-16"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibe-electric/10 border border-vibe-electric/20 text-vibe-electric text-sm font-medium mb-6 backdrop-blur-sm"
                    >
                        <BookOpen className="w-4 h-4" />
                        <span>{blogPosts.length} Articles Published</span>
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                        Insights on{" "}
                        <span className="bg-linear-to-r from-vibe-electric via-purple-400 to-pink-500 bg-clip-text text-transparent">
                            AI & Development
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                        Deep dives into modern development workflows, AI tool comparisons, productivity hacks, and the future of coding.
                    </p>

                    {/* Enhanced Search Bar */}
                    <motion.div
                        initial={designSystem.animations.fadeInUp.initial}
                        animate={designSystem.animations.fadeInUp.animate}
                        transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.3 }}
                        className="max-w-3xl mx-auto relative"
                    >
                        <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/40 p-2 shadow-lg">
                            <div className="relative flex items-center">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search articles by title, category, or tags..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-32 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                                />
                                {(searchQuery || selectedCategory !== "All") && (
                                    <button
                                        onClick={clearFilters}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Filter Bar */}
                            <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-border/30">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Filter className="w-4 h-4" />
                                    Filters
                                    <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Active Filters */}
                                {selectedCategory !== "All" && (
                                    <Badge
                                        variant="secondary"
                                        className="cursor-pointer hover:bg-secondary/80"
                                        onClick={() => setSelectedCategory("All")}
                                    >
                                        {selectedCategory}
                                        <X className="w-3 h-3 ml-1" />
                                    </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                    Sort: {sortBy === "newest" ? "Newest" : sortBy === "oldest" ? "Oldest" : "Read Time"}
                                </Badge>
                            </div>

                            {/* Expandable Filters */}
                            {showFilters && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 pt-4 border-t border-border/30"
                                >
                                    {/* Category Pills */}
                                    <div className="mb-4">
                                        <span className="text-xs text-muted-foreground block mb-2">Categories</span>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setSelectedCategory(cat)}
                                                    aria-pressed={selectedCategory === cat}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${selectedCategory === cat
                                                        ? "bg-vibe-electric text-white shadow-md"
                                                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sort Options */}
                                    <div>
                                        <span className="text-xs text-muted-foreground block mb-2">Sort By</span>
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
                                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${sortBy === option.value
                                                        ? "bg-vibe-electric text-white shadow-md"
                                                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Popular Tags */}
                    <motion.div
                        initial={designSystem.animations.fadeInUp.initial}
                        animate={designSystem.animations.fadeInUp.animate}
                        transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.4 }}
                        className="mt-6"
                    >
                        <span className="text-sm text-muted-foreground mr-3">Popular:</span>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSearchQuery(tag)}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-colors mr-2 mb-2"
                            >
                                #{tag}
                            </button>
                        ))}
                    </motion.div>
                </motion.div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Featured Posts Section */}
                        {!searchQuery && selectedCategory === "All" && (
                            <motion.div
                                initial={designSystem.animations.fadeInUp.initial}
                                whileInView={designSystem.animations.fadeInUp.animate}
                                viewport={{ once: true }}
                                transition={designSystem.animations.fadeInUp.transition}
                                className="mb-16"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <Sparkles className="w-5 h-5 text-vibe-electric" />
                                    <h2 className="text-2xl font-bold text-foreground">Featured Articles</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {featuredPosts.map((post, index) => (
                                        <motion.article
                                            key={post.slug}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <Link href={`/blog/${post.slug}`} className="group block h-full">
                                                <Card className="h-full border-border/40 bg-card/50 overflow-hidden transition-all duration-300 hover:border-vibe-electric/50 hover:bg-card/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-vibe-electric/10 p-0 gap-0">
                                                    <div className="relative aspect-16/10 w-full overflow-hidden bg-secondary/50">
                                                        <Image
                                                            src={post.image}
                                                            alt={`Featured image for: ${post.title}`}
                                                            fill
                                                            priority={index < 2}
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                                            <Badge className="bg-vibe-electric text-white border-vibe-electric mb-3">
                                                                {post.category}
                                                            </Badge>
                                                            <h3 className="text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors line-clamp-2">
                                                                {post.title}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div className="p-6">
                                                        <p className="text-muted-foreground line-clamp-2 mb-4">
                                                            {post.excerpt}
                                                        </p>
                                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                            <div className="flex items-center gap-4">
                                                                <span className="flex items-center gap-1">
                                                                    <User className="w-3 h-3" aria-hidden="true" />
                                                                    <span className="sr-only">Author: </span>{post.author}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" aria-hidden="true" />
                                                                    <span className="sr-only">Read time: </span>{post.readTime}
                                                                </span>
                                                            </div>
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" aria-hidden="true" />
                                                                <span className="sr-only">Date: </span>{post.date}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </motion.article>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* All Posts Section */}
                        <motion.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-5 h-5 text-vibe-electric" />
                                    <h2 className="text-2xl font-bold text-foreground">
                                        {searchQuery || selectedCategory !== "All" ? "Search Results" : "Latest Articles"}
                                    </h2>
                                    {filteredPosts.length > 0 && (
                                        <span className="text-sm text-muted-foreground">
                                            ({filteredPosts.length})
                                        </span>
                                    )}
                                </div>
                            </div>

                            {filteredPosts.length === 0 ? (
                                <div className="text-center py-16 bg-card/30 rounded-3xl border border-border/30">
                                    <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                                        <Search className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground text-lg mb-4">No articles found matching your search.</p>
                                    <Button
                                        variant="outline"
                                        onClick={clearFilters}
                                        className="rounded-full"
                                    >
                                        Clear All Filters
                                    </Button>
                                </div>
                            ) : (
                                <motion.div
                                    variants={designSystem.animations.staggerContainer}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}
                                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {(searchQuery || selectedCategory !== "All" ? filteredPosts : regularPosts).map((post, index) => (
                                        <motion.article
                                            key={post.slug}
                                            variants={designSystem.animations.fadeInUp}
                                            transition={{ ...designSystem.animations.fadeInUp.transition, delay: index * 0.05 }}
                                        >
                                            <Link href={`/blog/${post.slug}`} className="group block h-full">
                                                <Card className="h-full border-border/40 bg-card/50 overflow-hidden transition-all duration-300 hover:border-border/80 hover:bg-card/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-vibe-electric/10 p-0 gap-0">
                                                    <div className="relative aspect-video w-full overflow-hidden bg-secondary/50">
                                                        <Image
                                                            src={post.image}
                                                            alt={`Article thumbnail: ${post.title}`}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    </div>
                                                    <div className="flex flex-col gap-6 p-6">
                                                        <CardHeader className="space-y-2 p-0">
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20 transition-colors">
                                                                    {post.category}
                                                                </Badge>
                                                                <span aria-hidden="true">•</span>
                                                                <span className="flex items-center">
                                                                    <Clock className="mr-1 h-3 w-3" aria-hidden="true" />
                                                                    <span className="sr-only">Read time: </span>{post.readTime}
                                                                </span>
                                                            </div>
                                                            <CardTitle className="text-lg group-hover:text-primary transition-colors text-foreground line-clamp-2">
                                                                {post.title}
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="p-0">
                                                            <CardDescription className="line-clamp-2 text-muted-foreground text-sm">
                                                                {post.excerpt}
                                                            </CardDescription>
                                                            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border/50">
                                                                <User className="h-3 w-3" aria-hidden="true" />
                                                                <span className="sr-only">Author: </span> {post.author}
                                                                <span className="ml-auto flex items-center">
                                                                    <Calendar className="mr-1 h-3 w-3" aria-hidden="true" />
                                                                    <span className="sr-only">Date: </span> {post.date}
                                                                </span>
                                                            </div>
                                                        </CardContent>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </motion.article>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-6 lg:mt-20">
                        {/* Newsletter CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-linear-to-br from-vibe-electric/10 via-purple-500/5 to-pink-500/10 rounded-3xl border border-vibe-electric/20 p-6 backdrop-blur-sm lg:sticky lg:top-24"
                        >
                            <Sparkles className="w-10 h-10 mb-4 text-vibe-electric" />
                            <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Get weekly insights on AI tools and productivity tips.
                            </p>
                            <Link href="/#newsletter">
                                <Button className="w-full rounded-full shadow-lg shadow-vibe-electric/20">
                                    Subscribe
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Categories */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-card/50 rounded-3xl border border-border/40 p-6 backdrop-blur-sm"
                        >
                            <h3 className="font-semibold mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.filter(cat => cat !== "All").map((cat) => {
                                    const count = blogPosts.filter(p => p.category === cat).length;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${selectedCategory === cat
                                                ? "bg-vibe-electric/10 text-vibe-electric"
                                                : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            <span>{cat}</span>
                                            <span className="text-xs bg-secondary/50 px-2 py-0.5 rounded-full">
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </aside>
                </div>
            </div>
        </PageBackground>
    );
}
