"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, ExternalLink, Zap, Users, Star, Heart, TrendingUp, Target, DollarSign, Sparkles, ArrowRight } from "lucide-react";
import { stacks, getStackTools, Stack } from "@/lib/stacks";
import { Tool } from "@/lib/tools";
import { SocialShare } from "@/components/ui/SocialShare";
import { useState, useEffect } from "react";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";

export default function StackDetailPage({ params }: { params: Promise<{ stackId: string }> }) {
    const [mounted, setMounted] = useState(false);
    const [stackData, setStackData] = useState<{ stack: Stack; tools: Tool[] } | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setMounted(true);
        const favorites = JSON.parse(localStorage.getItem("vibestack-favorites") || "[]");

        params.then(async ({ stackId }) => {
            const stack = stacks.find(s => s.id === stackId);
            if (!stack) {
                notFound();
                return;
            }
            const tools = getStackTools(stack).filter((t): t is Tool => t !== undefined);
            setStackData({ stack, tools });
            setIsFavorite(favorites.includes(stackId));
        });
    }, [params]);

    const toggleFavorite = () => {
        params.then(async ({ stackId }) => {
            const favorites = JSON.parse(localStorage.getItem("vibestack-favorites") || "[]");
            const newFavorites = favorites.includes(stackId)
                ? favorites.filter((id: string) => id !== stackId)
                : [...favorites, stackId];
            localStorage.setItem("vibestack-favorites", JSON.stringify(newFavorites));
            setIsFavorite(!isFavorite);
        });
    };

    if (!mounted || !stackData) {
        return (
            <main className="min-h-screen bg-background pt-32 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex p-4 rounded-full bg-indigo-500/10 mb-4">
                        <Sparkles className="h-8 w-8 text-indigo-400 animate-pulse" />
                    </div>
                    <p className="text-muted-foreground">Loading stack details...</p>
                </div>
            </main>
        );
    }

    const { stack, tools: stackTools } = stackData;

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 h-[60vh] w-full max-w-[1400px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[140px]" />
            <div className="absolute top-[20%] left-[10%] z-0 h-[30vh] w-[30vh] bg-purple-500/10 blur-[100px] rounded-full" />
            <div className="absolute top-[40%] right-[10%] z-0 h-[30vh] w-[30vh] bg-pink-500/10 blur-[100px] rounded-full" />
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative z-10 pt-32 pb-20">
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/build"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Stack Finder
                        </Link>
                    </motion.div>

                    {/* Hero Section - Enhanced */}
                    <motion.div
                        initial={designSystem.animations.fadeInUp.initial}
                        animate={designSystem.animations.fadeInUp.animate}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <div className="bg-linear-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl p-8 md:p-12 border border-indigo-500/10 relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full" />
                            
                            <div className="relative z-10">
                                <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                                    <div className="flex-1">
                                        {/* Icon & Tags */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                className="text-6xl"
                                            >
                                                {stack.icon}
                                            </motion.div>
                                            <div className="flex flex-wrap gap-2">
                                                {stack.tags.map((tag) => (
                                                    <Badge key={tag} variant="secondary" className="text-xs bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 ${stack.color}`}>
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
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                    >
                                        <Card className="bg-linear-to-b from-indigo-500/10 to-card/50 border-indigo-500/20 min-w-[200px]">
                                            <CardContent className="p-6 text-center">
                                                <div className="inline-flex p-3 rounded-full bg-indigo-500/10 mb-4">
                                                    <DollarSign className="h-6 w-6 text-indigo-400" />
                                                </div>
                                                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Total Cost</h3>
                                                <div className="text-4xl font-bold text-foreground mb-2">
                                                    {stack.totalPrice}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Estimated monthly cost<br/>for all tools combined
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* About This Stack */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-indigo-500/10">
                                        <Sparkles className="h-5 w-5 text-indigo-500" />
                                    </div>
                                    <h2 className="text-2xl font-semibold">About This Stack</h2>
                                </div>
                                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                    <CardContent className="p-8">
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {stack.longDescription}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.section>

                            {/* Workflow Section */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-violet-500/10">
                                        <Zap className="h-5 w-5 text-violet-500" />
                                    </div>
                                    <h2 className="text-2xl font-semibold">How It Works</h2>
                                </div>
                                <div className="space-y-4">
                                    {stack.workflow.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                        >
                                            <Card className="border-border/50 bg-card/50 hover:border-indigo-500/30 transition-colors group">
                                                <CardContent className="p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                                                            {index + 1}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-foreground text-lg leading-relaxed">{step}</p>
                                                        </div>
                                                        <ArrowRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-indigo-500 transition-colors" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Tools in Stack */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
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
                                            <motion.div
                                                key={tool.slug}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                            >
                                                <Link href={`/tool/${tool.slug}`}>
                                                    <Card className="h-full border-border/50 hover:border-indigo-500/50 hover:bg-accent/50 transition-all duration-300 group">
                                                        <CardContent className="p-6">
                                                            <div className="flex items-start justify-between mb-4">
                                                                <div className={`p-3 rounded-xl bg-linear-to-br ${tool.bgGradient}`}>
                                                                    <tool.icon className={`h-6 w-6 text-white`} />
                                                                </div>
                                                                <ExternalLink className="h-5 w-5 text-muted-foreground/30 group-hover:text-indigo-500 transition-colors" />
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
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.section>

                            {/* Ideal For Section */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-emerald-500/10">
                                        <Users className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    <h2 className="text-2xl font-semibold">Ideal For</h2>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {stack.idealFor.map((item, index) => (
                                        <motion.div
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
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6">
                            {/* CTA Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl border border-indigo-500/20 p-6 backdrop-blur-sm sticky top-24"
                            >
                                <h3 className="text-xl font-bold mb-4">Ready to Build?</h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Start using this stack today and accelerate your development workflow.
                                </p>
                                <div className="space-y-3">
                                    <Link href="/build">
                                        <Button className="w-full rounded-full shadow-lg shadow-indigo-500/20">
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
                            </motion.div>

                            {/* Stack Stats */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="bg-card/50 rounded-3xl border border-border/50 p-6 backdrop-blur-sm"
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
                            </motion.div>
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    );
}
