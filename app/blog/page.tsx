"use client";

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Search, ArrowRight, BookOpen, TrendingUp, Sparkles } from "lucide-react";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";
import { useState, useMemo } from "react";

export default function BlogListingPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    // Get unique categories
    const categories = useMemo(() => {
        const cats = new Set(blogPosts.map(post => post.category));
        return ["All", ...Array.from(cats)];
    }, []);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const matchSearch = !searchQuery ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchCategory = selectedCategory === "All" || post.category === selectedCategory;
            return matchSearch && matchCategory;
        });
    }, [searchQuery, selectedCategory]);

    // Featured posts (first 2)
    const featuredPosts = blogPosts.slice(0, 2);
    const regularPosts = filteredPosts.filter(post => 
        !featuredPosts.some(fp => fp.slug === post.slug)
    );

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 h-[50vh] w-full max-w-[1400px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[140px]" />
            <div className="absolute top-[30%] right-[15%] z-0 h-[25vh] w-[25vh] bg-purple-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-[60%] left-[15%] z-0 h-[25vh] w-[25vh] bg-pink-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative z-10 pt-32 pb-20">
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Hero Section */}
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6 backdrop-blur-sm"
                        >
                            <BookOpen className="w-4 h-4" />
                            <span>{blogPosts.length} Articles Published</span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            Insights on{" "}
                            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                                AI & Development
                            </span>
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                            Deep dives into modern development workflows, AI tool comparisons, productivity hacks, and the future of coding.
                        </p>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="max-w-2xl mx-auto relative mb-8"
                        >
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                                />
                            </div>
                        </motion.div>

                        {/* Category Filter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap justify-center gap-2"
                        >
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                                        selectedCategory === cat
                                            ? "bg-indigo-500 text-white border-indigo-500 shadow-md shadow-indigo-500/20"
                                            : "bg-transparent text-muted-foreground border-transparent hover:bg-secondary/80 hover:text-foreground"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Featured Posts Section - Only show if no search/filter */}
                    {!searchQuery && selectedCategory === "All" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-16"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <Sparkles className="w-5 h-5 text-indigo-500" />
                                <h2 className="text-2xl font-bold text-foreground">Featured Articles</h2>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                {featuredPosts.map((post, index) => (
                                    <motion.div
                                        key={post.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link href={`/blog/${post.slug}`} className="group block h-full">
                                            <Card className="h-full border-border/40 bg-card/50 overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:bg-card/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 p-0 gap-0">
                                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/50">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                                        <Badge className="bg-indigo-500 text-white border-indigo-500 mb-3">
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
                                                                <User className="w-3 h-3" />
                                                                {post.author}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {post.readTime}
                                                            </span>
                                                        </div>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {post.date}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* All Posts Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <TrendingUp className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-2xl font-bold text-foreground">
                                {searchQuery || selectedCategory !== "All" ? "Search Results" : "Latest Articles"}
                            </h2>
                            {filteredPosts.length > 0 && (
                                <span className="text-sm text-muted-foreground">
                                    ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})
                                </span>
                            )}
                        </div>

                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground text-lg mb-4">No articles found matching your search.</p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("All");
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <motion.div
                                variants={designSystem.animations.staggerContainer}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {(searchQuery || selectedCategory !== "All" ? filteredPosts : regularPosts).map((post, index) => (
                                    <motion.div
                                        key={post.slug}
                                        variants={designSystem.animations.fadeInUp}
                                        transition={{ ...designSystem.animations.fadeInUp.transition, delay: index * 0.05 }}
                                    >
                                        <Link href={`/blog/${post.slug}`} className="group block h-full">
                                            <Card className="h-full border-border/40 bg-card/50 overflow-hidden transition-all duration-300 hover:border-border/80 hover:bg-card/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 p-0 gap-0">
                                                <div className="relative aspect-video w-full overflow-hidden bg-secondary/50">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
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
                                                            <span>•</span>
                                                            <span className="flex items-center">
                                                                <Clock className="mr-1 h-3 w-3" />
                                                                {post.readTime}
                                                            </span>
                                                        </div>
                                                        <CardTitle className="text-xl group-hover:text-primary transition-colors text-foreground line-clamp-2">
                                                            {post.title}
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="p-0">
                                                        <CardDescription className="line-clamp-2 text-muted-foreground">
                                                            {post.excerpt}
                                                        </CardDescription>
                                                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border/50">
                                                            <User className="h-3 w-3" />
                                                            {post.author}
                                                            <span className="ml-auto flex items-center">
                                                                <Calendar className="mr-1 h-3 w-3" />
                                                                {post.date}
                                                            </span>
                                                        </div>
                                                    </CardContent>
                                                </div>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Newsletter CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 p-12 text-center backdrop-blur-sm"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[20px_20px]" />
                        <div className="relative z-10">
                            <Sparkles className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
                            <h3 className="text-3xl font-bold mb-4">Never Miss an Update</h3>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Join 5,000+ developers getting weekly insights on AI tools, productivity tips, and coding best practices.
                            </p>
                            <Link href="/#newsletter">
                                <Button size="lg" className="rounded-full shadow-lg shadow-indigo-500/20 px-8">
                                    Subscribe to Newsletter
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
