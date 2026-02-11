"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, ExternalLink, Zap, Users, Star, Heart, TrendingUp, Target, DollarSign, Sparkles, ArrowRight, BarChart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Stack } from "@/lib/stacks";
import { ToolData } from "@/lib/tool-types";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/components/icons/tool-icons";
import { SocialShare } from "@/components/ui/SocialShare";
import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { designSystem } from "@/lib/design-system";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";

interface StackDetailClientProps {
    stack: Stack;
    metrics?: {
        views: number;
        saves: number;
        shares: number;
        popularityScore: number;
    } | null;
}

export function StackDetailClient({ stack, metrics }: StackDetailClientProps) {
    const { tools } = useAllTools();
    // Lazy initialization to avoid setState in effect
    const [isFavorite, setIsFavorite] = useState(() => {
        if (typeof window === 'undefined') return false;
        try {
            const favorites = JSON.parse(localStorage.getItem("vibestack-favorites") || "[]");
            return favorites.includes(stack.id);
        } catch {
            return false;
        }
    });

    const stackTools = stack.tools.map(slug => tools.find((t: ToolData) => t.slug === slug)).filter((t): t is ToolData => t !== undefined);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("vibestack-favorites") || "[]");
        const newFavorites = favorites.includes(stack.id)
            ? favorites.filter((id: string) => id !== stack.id)
            : [...favorites, stack.id];
        localStorage.setItem("vibestack-favorites", JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-6xl mx-auto px-4">
                {/* Back Link */}
                <m.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                >
                    <Link
                        href="/build"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Stack Finder
                    </Link>
                </m.div>

                {/* Hero Section - Enhanced */}
                <m.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                    className="mb-16"
                >
                    <div className="bg-linear-to-br from-vibe-electric/5 via-vibe-purple/5 to-vibe-pink/5 rounded-3xl p-8 md:p-12 border border-vibe-electric/10 relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-vibe-electric/10 blur-[100px] rounded-full" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full" />

                        <div className="relative z-10">
                            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                                <div className="flex-1">
                                    {/* Icon & Tags */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <m.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="text-6xl"
                                        >
                                            {stack.icon}
                                        </m.div>
                                        <div className="flex flex-wrap gap-2">
                                            {stack.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs bg-vibe-electric/10 text-vibe-electric border-vibe-electric/20">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance ${stack.color}`}>
                                        {stack.name}
                                    </h1>

                                    <p className="text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
                                        {stack.description}
                                    </p>

                                    {/* Quick Stats */}
                                    <div className="flex flex-wrap gap-6 mb-8">
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="p-2 rounded-lg bg-emerald-500/10">
                                                <DollarSign className="h-4 w-4 text-emerald-500" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground">{stack.totalPrice}</div>
                                                <div className="text-muted-foreground text-xs">Per Month</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="p-2 rounded-lg bg-blue-500/10">
                                                <Target className="h-4 w-4 text-blue-500" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground">{stackTools.length}</div>
                                                <div className="text-muted-foreground text-xs">Tools</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="p-2 rounded-lg bg-violet-500/10">
                                                <TrendingUp className="h-4 w-4 text-violet-500" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground">{stack.workflow.length}</div>
                                                <div className="text-muted-foreground text-xs">Steps</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-4">
                                        <Button
                                            variant={isFavorite ? "default" : "outline"}
                                            onClick={toggleFavorite}
                                            className="h-12 px-6 rounded-full"
                                        >
                                            <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                                            {isFavorite ? "Saved" : "Save Stack"}
                                        </Button>
                                        <SocialShare
                                            toolSlug={stack.id}
                                            toolName={stack.name}
                                            url={`https://usevibestack.com/stack/${stack.id}`}
                                        />
                                        <Link href="/build">
                                            <Button variant="outline" className="h-12 px-6 rounded-full">
                                                <Sparkles className="h-4 w-4 mr-2" />
                                                Find Another
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Cost Card */}
                                <m.div
                                    initial={designSystem.animations.fadeInUp.initial}
                                    animate={designSystem.animations.fadeInUp.animate}
                                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.3 }}
                                >
                                    <Card className="bg-linear-to-b from-vibe-electric/10 to-card/50 border-vibe-electric/20 min-w-[200px]">
                                        <CardContent className="p-6 text-center">
                                            <div className="inline-flex p-3 rounded-full bg-vibe-electric/10 mb-4">
                                                <DollarSign className="h-6 w-6 text-vibe-electric" />
                                            </div>
                                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Total Cost</h3>
                                            <div className="text-4xl font-bold text-foreground mb-2">
                                                {stack.totalPrice}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Estimated monthly cost<br />for all tools combined
                                            </p>
                                        </CardContent>
                                    </Card>
                                </m.div>
                            </div>
                        </div>
                    </div>
                </m.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* About This Stack */}
                        <m.section
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-vibe-electric/10">
                                    <Sparkles className="h-5 w-5 text-vibe-electric" />
                                </div>
                                <h2 className="text-2xl font-semibold">About This Stack</h2>
                            </div>
                            <Card className="border-border/50 bg-white backdrop-blur-sm">
                                <CardContent className="p-8">
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {stack.longDescription}
                                    </p>
                                </CardContent>
                            </Card>
                        </m.section>

                        {/* Workflow Section */}
                        <m.section
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-violet-500/10">
                                    <Zap className="h-5 w-5 text-violet-500" />
                                </div>
                                <h2 className="text-2xl font-semibold">How It Works</h2>
                            </div>
                            <div className="space-y-4">
                                {stack.workflow.map((step, index) => (
                                    <m.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <Card className="border-border/50 bg-white hover:border-vibe-electric/30 transition-colors group">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-vibe-electric to-vibe-purple flex items-center justify-center text-white font-bold shadow-lg shadow-vibe-electric/20">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-foreground text-lg leading-relaxed">{step}</p>
                                                    </div>
                                                    <ArrowRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-vibe-electric transition-colors" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </m.div>
                                ))}
                            </div>
                        </m.section>

                        {/* Tools in Stack */}
                        <m.section
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-amber-500/10">
                                    <Star className="h-5 w-5 text-amber-500" />
                                </div>
                                <h2 className="text-2xl font-semibold">Tools Included ({stackTools.length})</h2>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {stackTools.map((tool, index) => {
                                    if (!tool) return null;
                                    return (
                                        <m.div
                                            key={tool.slug}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                        >
                                            <Link href={`/tool/${tool.slug}`}>
                                                <Card className="h-full border-border/50 hover:border-vibe-electric/50 hover:bg-accent/50 transition-all duration-300 group">
                                                    <CardContent className="p-6">
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className={`p-3 rounded-xl bg-linear-to-br ${tool.bgGradient || "from-slate-500/60 to-slate-800/60"}`}>
                                                                {(() => {
                                                                    const Icon = getToolIcon(tool.slug);
                                                                    return <Icon className="h-6 w-6 text-white" />;
                                                                })()}
                                                            </div>
                                                            <ExternalLink className="h-5 w-5 text-muted-foreground/30 group-hover:text-vibe-electric transition-colors" />
                                                        </div>
                                                        <h3 className="text-lg font-bold mb-1">{tool.title}</h3>
                                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{tool.category}</p>
                                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                                            {tool.description}
                                                        </p>
                                                        <Badge variant="secondary">
                                                            {tool.pricing}
                                                        </Badge>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </m.div>
                                    );
                                })}
                            </div>
                        </m.section>

                        {/* Ideal For Section */}
                        <m.section
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-emerald-500/10">
                                    <Users className="h-5 w-5 text-emerald-500" />
                                </div>
                                <h2 className="text-2xl font-semibold">Ideal For</h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {stack.idealFor.map((item, index) => (
                                    <m.div
                                        key={item}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Badge variant="outline" className="text-sm py-2.5 px-5 border-border/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-colors cursor-default">
                                            <CheckCircle2 className="h-3.5 w-3.5 mr-2 text-emerald-500" />
                                            {item}
                                        </Badge>
                                    </m.div>
                                ))}
                            </div>
                        </m.section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* CTA Card */}
                        <m.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                            className="bg-linear-to-br from-vibe-electric/10 to-vibe-purple/10 rounded-3xl border border-vibe-electric/20 p-6 backdrop-blur-sm sticky top-24"
                        >
                            <h3 className="text-xl font-bold mb-4">Ready to Build?</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Start using this stack today and accelerate your development workflow.
                            </p>
                            <div className="space-y-3">
                                <Link href="/build">
                                    <Button className="w-full rounded-full shadow-lg shadow-vibe-electric/20">
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Find Your Stack
                                    </Button>
                                </Link>
                                <Link href="/tools">
                                    <Button variant="outline" className="w-full rounded-full">
                                        Browse All Tools
                                    </Button>
                                </Link>
                            </div>
                        </m.div>

                        {/* Curator Profile */}
                        {stack.curatedBy && (
                            <m.div
                                initial={designSystem.animations.fadeInUp.initial}
                                whileInView={designSystem.animations.fadeInUp.animate}
                                viewport={{ once: true }}
                                transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.2 }}
                                className="bg-white rounded-3xl border border-border/50 p-6 backdrop-blur-sm"
                            >
                                <h3 className="font-semibold mb-4">Curated By</h3>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-background ring-2 ring-border/50">
                                        <AvatarImage src={stack.curatedBy.avatar} alt={stack.curatedBy.name} />
                                        <AvatarFallback className="bg-vibe-purple/10 text-vibe-purple font-semibold">
                                            {stack.curatedBy.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-bold text-foreground text-sm">{stack.curatedBy.name}</div>
                                        <div className="text-xs text-muted-foreground">{stack.curatedBy.role}</div>
                                    </div>
                                </div>
                            </m.div>
                        )}

                        {/* Stack Stats */}
                        <m.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.1 }}
                            className="bg-white rounded-3xl border border-border/50 p-6 backdrop-blur-sm"
                        >
                            <h3 className="font-semibold mb-4">Stack Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground">Tools</span>
                                    <span className="font-medium">{stackTools.length}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground">Monthly Cost</span>
                                    <span className="font-medium">{stack.totalPrice}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                    <span className="text-sm text-muted-foreground">Workflow Steps</span>
                                    <span className="font-medium">{stack.workflow.length}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-muted-foreground">Target Users</span>
                                    <span className="font-medium">{stack.idealFor.length} types</span>
                                </div>
                            </div>
                        </m.div>

                        {/* Community Insights (Analytics) */}
                        <m.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.3 }}
                            className="bg-linear-to-br from-slate-900 to-slate-800 text-white rounded-3xl border border-white/10 p-6 backdrop-blur-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-vibe-electric/20 blur-[60px] rounded-full" />

                            <div className="flex items-center gap-2 mb-6 relative z-10">
                                <BarChart className="w-5 h-5 text-vibe-electric" />
                                <h3 className="font-semibold">Community Insights</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                    <div className="text-muted-foreground text-xs mb-1">Views</div>
                                    <div className="text-2xl font-bold flex items-center gap-2">
                                        {(metrics?.views || (stack.shareCount || 0) * 3.5).toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                    <div className="text-muted-foreground text-xs mb-1">Shares</div>
                                    <div className="text-2xl font-bold text-vibe-electric">
                                        {(metrics?.shares || stack.shareCount || 0).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>Popularity Score</span>
                                    <span className="text-vibe-electric font-bold">{metrics?.popularityScore || 98}/100</span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div
                                        className="bg-vibe-electric h-full rounded-full"
                                        style={{ width: `${metrics?.popularityScore || 98}%` }}
                                    />
                                </div>
                            </div>
                        </m.div>
                    </aside>
                </div>
            </div>
        </PageBackground>
    );
}
