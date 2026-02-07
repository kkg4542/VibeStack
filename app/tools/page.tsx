"use client";

import { Metadata } from "next";
import { ToolsList } from "./ToolsList";
import { motion } from "framer-motion";
import { Search, Sparkles, TrendingUp, Target, Zap } from "lucide-react";
import { designSystem } from "@/lib/design-system";
import { tools } from "@/lib/tools";
import { useState } from "react";

// Note: Can't export metadata from client component, moved to separate metadata file would be ideal

export default function ToolsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Calculate stats
    const categoriesCount = new Set(tools.map(t => t.category)).size;
    const freeToolsCount = tools.filter(t => t.pricing === "Free" || t.pricing === "Freemium").length;

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 h-[50vh] w-full max-w-[1400px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[140px]" />
            <div className="absolute top-[30%] left-[10%] z-0 h-[30vh] w-[30vh] bg-purple-500/10 blur-[100px] rounded-full" />
            <div className="absolute top-[50%] right-[10%] z-0 h-[30vh] w-[30vh] bg-blue-500/10 blur-[100px] rounded-full" />

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative z-10 pt-32 pb-20">
                {/* Hero Section */}
                <div className="container max-w-6xl mx-auto px-4">
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
                            <Sparkles className="w-4 h-4" />
                            <span>{tools.length} AI Tools Curated</span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            Discover the{" "}
                            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                                Perfect AI Tool
                            </span>
                            <br />
                            for Every Task
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                            From coding assistants to design tools, explore our comprehensive database of AI-powered solutions curated for developers and creators.
                        </p>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-8 mb-12"
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <div className="p-2 rounded-lg bg-emerald-500/10">
                                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-foreground">{tools.length}+</div>
                                    <div className="text-muted-foreground text-xs">Tools Listed</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="p-2 rounded-lg bg-blue-500/10">
                                    <Target className="w-4 h-4 text-blue-500" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-foreground">{categoriesCount}</div>
                                    <div className="text-muted-foreground text-xs">Categories</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="p-2 rounded-lg bg-violet-500/10">
                                    <Zap className="w-4 h-4 text-violet-500" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-foreground">{freeToolsCount}</div>
                                    <div className="text-muted-foreground text-xs">Free Options</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="max-w-2xl mx-auto relative"
                        >
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search by name, category, or feature..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                                💡 Try searching &quot;coding&quot;, &quot;free&quot;, or &quot;design&quot;
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Tools List Component */}
                    <ToolsList searchQuery={searchQuery} />
                </div>
            </div>
        </main>
    );
}
