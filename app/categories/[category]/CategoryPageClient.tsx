"use client";

import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";
import { tools } from "@/lib/tools";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CompareButton } from "@/components/tools/CompareButton";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import {
    Code2,
    FolderKanban,
    Zap,
    MessageSquare,
    Palette,
    Box,
    ArrowLeft,
    TrendingUp,
    Star,
    Sparkles
} from "lucide-react";
import { useMemo } from "react";

interface CategoryPageClientProps {
    category: string;
}

const categoryInfo: Record<string, {
    icon: typeof Code2;
    gradient: string;
    description: string;
    features: string[];
}> = {
    Coding: {
        icon: Code2,
        gradient: "from-blue-500 via-indigo-500 to-purple-500",
        description: "AI-powered coding assistants and development tools that help you write better code faster.",
        features: ["Code completion", "Bug detection", "Code review", "Documentation generation"]
    },
    Management: {
        icon: FolderKanban,
        gradient: "from-emerald-500 via-teal-500 to-cyan-500",
        description: "Project management and team collaboration tools enhanced with AI capabilities.",
        features: ["Task automation", "Team coordination", "Progress tracking", "Smart scheduling"]
    },
    Productivity: {
        icon: Zap,
        gradient: "from-amber-500 via-orange-500 to-red-500",
        description: "Boost your workflow with AI writing assistants, note-taking, and automation tools.",
        features: ["Writing assistance", "Note organization", "Workflow automation", "Time management"]
    },
    Assistance: {
        icon: MessageSquare,
        gradient: "from-violet-500 via-purple-500 to-pink-500",
        description: "AI assistants and chatbots for research, writing, and everyday tasks.",
        features: ["Natural conversations", "Research assistance", "Content creation", "Q&A support"]
    },
    Design: {
        icon: Palette,
        gradient: "from-pink-500 via-rose-500 to-red-500",
        description: "Create stunning visuals with AI-powered design, image generation, and creative tools.",
        features: ["Image generation", "UI/UX design", "Video editing", "Brand creation"]
    },
    Other: {
        icon: Box,
        gradient: "from-slate-500 via-zinc-500 to-neutral-500",
        description: "Specialized AI tools for unique use cases and specific industry needs.",
        features: ["Niche solutions", "Industry-specific", "Custom workflows", "Specialized AI"]
    }
};

export function CategoryPageClient({ category }: CategoryPageClientProps) {
    const info = categoryInfo[category];
    const Icon = info.icon;

    const categoryTools = useMemo(() => {
        return tools.filter(tool => tool.category === category);
    }, [category]);

    const freeCount = categoryTools.filter(t => t.pricing === "Free" || t.pricing === "Freemium").length;
    const avgRating = categoryTools.reduce((acc, t) => acc + (t.review?.rating || 0), 0) / categoryTools.filter(t => t.review?.rating).length || 0;

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-6xl mx-auto px-4">
                {/* Back Button */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                    className="mb-6"
                >
                    <Button variant="ghost" asChild className="pl-0">
                        <Link href="/tools" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-4 h-4" />
                            Back to All Tools
                        </Link>
                    </Button>
                </motion.div>

                {/* Hero Section */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>{categoryTools.length} Tools Available</span>
                    </motion.div>

                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className={`p-4 rounded-2xl bg-linear-to-br ${info.gradient} shadow-lg`}>
                            <Icon className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            <span className={`bg-linear-to-r ${info.gradient} bg-clip-text text-transparent`}>
                                {category}
                            </span>
                            <br />
                            <span className="text-foreground">AI Tools</span>
                        </h1>
                    </div>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                        {info.description}
                    </p>

                    {/* Stats */}
                    <motion.div
                        initial={designSystem.animations.fadeInUp.initial}
                        animate={designSystem.animations.fadeInUp.animate}
                        transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-8"
                    >
                        <div className="flex items-center gap-2 text-sm">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <TrendingUp className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-foreground">{categoryTools.length}</div>
                                <div className="text-muted-foreground text-xs">Tools</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="p-2 rounded-lg bg-emerald-500/10">
                                <Zap className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-foreground">{freeCount}</div>
                                <div className="text-muted-foreground text-xs">Free Options</div>
                            </div>
                        </div>
                        {avgRating > 0 && (
                            <div className="flex items-center gap-2 text-sm">
                                <div className="p-2 rounded-lg bg-amber-500/10">
                                    <Star className="w-4 h-4 text-amber-500" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-foreground">{avgRating.toFixed(1)}</div>
                                    <div className="text-muted-foreground text-xs">Avg Rating</div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>

                {/* Key Features */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.4 }}
                    className="mb-12"
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        {info.features.map((feature, index) => (
                            <motion.div
                                key={feature}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            >
                                <Badge
                                    variant="secondary"
                                    className="px-4 py-2 text-sm bg-secondary/50 border border-border/40"
                                >
                                    {feature}
                                </Badge>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Tools Grid */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Available Tools</h2>
                        <Badge variant="outline">{categoryTools.length} tools</Badge>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {categoryTools.map((tool, index) => (
                            <motion.div
                                key={tool.slug}
                                initial={designSystem.animations.fadeInUp.initial}
                                animate={designSystem.animations.fadeInUp.animate}
                                transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.6 + index * 0.05 }}
                            >
                                <Link
                                    href={`/tool/${tool.slug}`}
                                    className="block relative group h-full"
                                >
                                    <Card className="h-full relative overflow-hidden border-border/40 bg-card/50 transition-all duration-300 hover:border-border/80 hover:bg-card/80 hover:shadow-2xl">
                                        <div className={`absolute inset-0 bg-linear-to-br ${tool.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />

                                        <CardHeader className="relative h-full flex flex-col pt-8">
                                            <div className="mb-4 flex items-center justify-between gap-4">
                                                <div className={`rounded-lg bg-secondary/80 p-3 ring-1 ring-border shadow-lg ${tool.color}`}>
                                                    <tool.icon className="h-6 w-6" />
                                                </div>
                                                <Badge variant="secondary" className="bg-secondary/50 text-xs font-normal text-muted-foreground backdrop-blur-sm">
                                                    {tool.category}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                                {tool.title}
                                            </CardTitle>
                                            <CardDescription className="text-muted-foreground/90 line-clamp-2 mt-2 leading-relaxed">
                                                {tool.description}
                                            </CardDescription>

                                            <div className="mt-auto pt-6 flex justify-between items-center">
                                                <Badge variant="outline" className="text-xs">
                                                    {tool.pricing}
                                                </Badge>
                                                <CompareButton toolSlug={tool.slug} toolTitle={tool.title} />
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Related Categories */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.7 }}
                    className="mt-16 text-center"
                >
                    <Card className="border-indigo-500/20 bg-linear-to-br from-indigo-500/5 to-purple-500/5">
                        <CardHeader className="p-8">
                            <h3 className="text-xl font-bold mb-2">Explore Other Categories</h3>
                            <p className="text-muted-foreground mb-6">
                                Discover more AI tools across different categories
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {Object.entries(categoryInfo)
                                    .filter(([cat]) => cat !== category)
                                    .map(([cat, catInfo]) => {
                                        const CatIcon = catInfo.icon;
                                        return (
                                            <Button
                                                key={cat}
                                                variant="outline"
                                                asChild
                                                className="rounded-full"
                                            >
                                                <Link href={`/categories/${cat.toLowerCase()}`} className="flex items-center gap-2">
                                                    <CatIcon className="w-4 h-4" />
                                                    {cat}
                                                </Link>
                                            </Button>
                                        );
                                    })}
                            </div>
                        </CardHeader>
                    </Card>
                </motion.div>
            </div>
        </PageBackground>
    );
}
