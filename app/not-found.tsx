"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Search, 
    Home, 
    ArrowLeft, 
    Sparkles, 
    Compass,
    Lightbulb,
    Wrench,
    BookOpen,
    Zap
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as motion from "framer-motion/client";
import { tools } from "@/lib/tools";
import { blogPosts } from "@/lib/blog";

export default function NotFound() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Get featured content
    const featuredTools = tools.slice(0, 3);
    const latestPosts = blogPosts.slice(0, 2);

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 h-[60vh] w-full max-w-[1400px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[140px]" />
            <div className="absolute top-[20%] left-[10%] z-0 h-[30vh] w-[30vh] bg-purple-500/10 blur-[100px] rounded-full" />
            <div className="absolute top-[40%] right-[10%] z-0 h-[30vh] w-[30vh] bg-pink-500/10 blur-[100px] rounded-full" />
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative z-10 pt-32 pb-20 px-4">
                <div className="container max-w-5xl mx-auto">
                    {/* 404 Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        {/* Animated 404 */}
                        <div className="relative mb-8">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-[12rem] md:text-[16rem] font-bold leading-none tracking-tighter"
                            >
                                <span className="bg-linear-to-b from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                                    404
                                </span>
                            </motion.div>
                            
                            {/* Floating Elements */}
                            <motion.div
                                animate={{ 
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-1/4 left-1/4 text-6xl"
                            >
                                🔍
                            </motion.div>
                            
                            <motion.div
                                animate={{ 
                                    y: [0, 10, 0],
                                    rotate: [0, -5, 5, 0]
                                }}
                                transition={{ 
                                    duration: 3.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                                className="absolute top-1/3 right-1/4 text-5xl"
                            >
                                ❓
                            </motion.div>

                            <motion.div
                                animate={{ 
                                    scale: [1, 1.1, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-4xl"
                            >
                                ✨
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                                <Compass className="w-4 h-4" />
                                <span>Lost in the Stack?</span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                                Page Not Found
                            </h1>

                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                                Oops! Looks like this page wandered off into the digital void. 
                                But don&apos;t worry—we&apos;ve got plenty of other great content for you!
                            </p>
                        </motion.div>

                        {/* Search Box */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            onSubmit={handleSearch}
                            className="max-w-xl mx-auto mb-8"
                        >
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search for tools, stacks, or articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-32 py-6 rounded-2xl bg-card/50 border-border/40 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-indigo-500/50"
                                />
                                <Button 
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                                >
                                    Search
                                </Button>
                            </div>
                        </motion.form>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-wrap justify-center gap-3"
                        >
                            <Button asChild variant="default" className="rounded-full h-12 px-6 shadow-lg shadow-indigo-500/20">
                                <Link href="/">
                                    <Home className="mr-2 h-4 w-4" />
                                    Go Home
                                </Link>
                            </Button>

                            <Button asChild variant="outline" className="rounded-full h-12 px-6 border-border/60">
                                <Link href="/tools">
                                    <Wrench className="mr-2 h-4 w-4" />
                                    Browse Tools
                                </Link>
                            </Button>

                            <Button asChild variant="outline" className="rounded-full h-12 px-6 border-border/60">
                                <Link href="/build">
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    AI Stack Finder
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Recommended Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {/* Popular Tools */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-indigo-500/10">
                                    <Zap className="h-5 w-5 text-indigo-500" />
                                </div>
                                <h2 className="text-xl font-semibold">Popular Tools</h2>
                            </div>
                            <div className="space-y-3">
                                {featuredTools.map((tool, index) => (
                                    <motion.div
                                        key={tool.slug}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                                    >
                                        <Link href={`/tool/${tool.slug}`}>
                                            <Card className="border-border/50 hover:border-indigo-500/50 hover:bg-accent/50 transition-all duration-300 group cursor-pointer">
                                                <CardContent className="p-4 flex items-center gap-4">
                                                    <div className={`p-2.5 rounded-lg bg-linear-to-br ${tool.bgGradient}`}>
                                                        <tool.icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold group-hover:text-indigo-500 transition-colors">
                                                            {tool.title}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                                            {tool.description}
                                                        </p>
                                                    </div>
                                                    <Badge variant="secondary" className="shrink-0">
                                                        {tool.category}
                                                    </Badge>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Latest Articles */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-violet-500/10">
                                    <BookOpen className="h-5 w-5 text-violet-500" />
                                </div>
                                <h2 className="text-xl font-semibold">Latest Articles</h2>
                            </div>
                            <div className="space-y-3">
                                {latestPosts.map((post, index) => (
                                    <motion.div
                                        key={post.slug}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                                    >
                                        <Link href={`/blog/${post.slug}`}>
                                            <Card className="border-border/50 hover:border-violet-500/50 hover:bg-accent/50 transition-all duration-300 group cursor-pointer">
                                                <CardContent className="p-4">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <Badge variant="secondary" className="mb-2">
                                                                {post.category}
                                                            </Badge>
                                                            <h3 className="font-semibold group-hover:text-violet-500 transition-colors line-clamp-2">
                                                                {post.title}
                                                            </h3>
                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                {post.date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Helpful Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        className="mt-16 pt-8 border-t border-border/50"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-amber-500/10">
                                    <Lightbulb className="h-5 w-5 text-amber-500" />
                                </div>
                                <p className="text-muted-foreground">
                                    Can&apos;t find what you&apos;re looking for?
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Link href="/search">
                                    <Button variant="outline" className="rounded-full">
                                        <Search className="mr-2 h-4 w-4" />
                                        Advanced Search
                                    </Button>
                                </Link>
                                <Link href="/consulting">
                                    <Button variant="ghost" className="rounded-full text-indigo-400 hover:text-indigo-300">
                                        Contact Support
                                        <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
