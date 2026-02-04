"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, ExternalLink, Zap, Users, Star, Heart } from "lucide-react";
import { stacks, getStackTools, Stack } from "@/lib/stacks";
import { Tool } from "@/lib/tools";
import { SocialShare } from "@/components/ui/SocialShare";
import { useState, useEffect } from "react";

export default function StackDetailPage({ params }: { params: Promise<{ stackId: string }> }) {
    const [mounted, setMounted] = useState(false);
    const [stackData, setStackData] = useState<{ stack: Stack; tools: Tool[] } | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setMounted(true);
        const favorites = JSON.parse(localStorage.getItem("vibestack-favorites") || "[]");
        setIsFavorite(favorites);

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
            <main className="min-h-screen bg-background pt-24 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground">Loading stack details...</p>
                </div>
            </main>
        );
    }

    const { stack, tools: stackTools } = stackData;

    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Back Link */}
                <Link
                    href="/build"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Stack Finder
                </Link>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-6xl">{stack.icon}</span>
                            <div className="flex-1">
                                <h1 className={`text-4xl font-bold tracking-tight ${stack.color}`}>
                                    {stack.name}
                                </h1>
                                <div className="flex items-center gap-2 mt-2">
                                    {stack.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
                            {stack.description}
                        </p>

                        <div className="flex flex-wrap gap-4 items-center mb-6">
                            <Button
                                variant={isFavorite ? "default" : "outline"}
                                onClick={toggleFavorite}
                                className="gap-2"
                            >
                                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                                {isFavorite ? "Saved" : "Save Stack"}
                            </Button>

                            <SocialShare
                                toolSlug={stack.id}
                                toolName={stack.name}
                                url={`https://vibestack.com/stack/${stack.id}`}
                            />
                        </div>
                    </div>

                    <Card className="bg-linear-to-b from-indigo-500/10 to-card/50 border-indigo-500/20">
                        <CardContent className="p-6">
                            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Total Cost</h3>
                            <div className="text-4xl font-bold text-foreground mb-2">
                                {stack.totalPrice}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Per month for all tools
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Long Description */}
                <section className="mb-12">
                    <Card className="border-border/50">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-semibold mb-4">About This Stack</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {stack.longDescription}
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Workflow Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <Zap className="h-6 w-6 text-indigo-500" />
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {stack.workflow.map((step, index) => (
                            <Card key={index} className="border-border/50">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-3">
                                        <div className="shrink-0 w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-semibold text-sm">
                                            {index + 1}
                                        </div>
                                        <p className="text-muted-foreground">{step}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Tools in Stack */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <Star className="h-6 w-6 text-yellow-500" />
                        Tools Included ({stackTools.length})
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stackTools.map((tool) => {
                            if (!tool) return null;
                            return (
                                <Link key={tool.slug} href={`/tool/${tool.slug}`}>
                                    <Card className="h-full border-border/50 hover:border-indigo-500/50 hover:bg-accent/50 transition-all duration-300 group">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-3 rounded-lg ${tool.bgGradient}`}>
                                                    <tool.icon className={`h-6 w-6 ${tool.color}`} />
                                                </div>
                                                <ExternalLink className="h-5 w-5 text-muted-foreground/30 group-hover:text-indigo-500 transition-colors" />
                                            </div>
                                            <h3 className="text-lg font-bold mb-1">{tool.title}</h3>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{tool.category}</p>
                                            <Badge variant="secondary" className="text-xs">
                                                {tool.pricing}
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Ideal For Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <Users className="h-6 w-6 text-green-500" />
                        Ideal For
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {stack.idealFor.map((item) => (
                            <Badge key={item} variant="outline" className="text-sm py-2 px-4 border-border/50">
                                {item}
                            </Badge>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-linear-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Start using this stack today and accelerate your development workflow.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button size="lg" className="rounded-full shadow-lg shadow-indigo-500/20" asChild>
                            <Link href="/build">
                                Find Your Stack
                                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full" asChild>
                            <Link href="/tools">
                                Browse All Tools
                            </Link>
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    );
}
