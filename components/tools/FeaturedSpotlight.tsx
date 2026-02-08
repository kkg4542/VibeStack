"use client";

import { tools } from "@/lib/tools";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedSpotlightProps {
    toolSlug: string;
}

export function FeaturedSpotlight({ toolSlug }: FeaturedSpotlightProps) {
    const tool = tools.find(t => t.slug === toolSlug);
    if (!tool) return null;

    const Icon = tool.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-8 mb-16"
        >
            {/* Ambient background effects */}
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/20" />

            <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-secondary/50 border border-border/30 ${tool.color} shadow-2xl shadow-indigo-500/20 transition-transform duration-500 group-hover:scale-110`}>
                    <Icon className="h-12 w-12" />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                        <Badge className="bg-indigo-500 text-white border-none px-3 py-1 flex items-center gap-1.5 shadow-lg shadow-indigo-500/20">
                            <Sparkles className="h-3 w-3" />
                            Featured Tool
                        </Badge>
                        <Badge variant="outline" className="text-muted-foreground border-indigo-500/20 dark:border-white/10 uppercase tracking-widest text-[10px] font-bold">
                            Partner Spotlight
                        </Badge>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-gray-900 via-indigo-800 to-indigo-900 dark:from-white dark:to-white/60 bg-clip-text text-transparent italic">
                        {tool.title}
                    </h2>

                    <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                        {tool.adCopy || tool.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <Button asChild className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-8 py-6 h-auto text-lg font-semibold shadow-xl shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">
                            <Link href={`/tool/${tool.slug}`}>
                                Try it now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Link
                            href={tool.websiteUrl}
                            target="_blank"
                            className="text-sm font-medium text-muted-foreground hover:text-indigo-600 dark:hover:text-white transition-colors"
                        >
                            Visit Official Site
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
