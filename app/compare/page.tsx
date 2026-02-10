"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToolData } from "@/lib/tool-types";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/components/icons/tool-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, X, Scale, Share2, Sparkles, Star, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import * as motion from "framer-motion/client";
import { Card, CardContent } from "@/components/ui/card";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";

export default function ComparePage() {
    const [selectedTools, setSelectedTools] = useState<ToolData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const { tools } = useAllTools();

    useEffect(() => {
        const loadTools = () => {
            setIsLoading(true);

            // Check for URL params first
            const toolsParam = searchParams.get('tools');
            if (toolsParam) {
                const slugs = toolsParam.split(',').filter(Boolean);
                const filtered = tools.filter((t: ToolData) => slugs.includes(t.slug)).slice(0, 3);
                setSelectedTools(filtered);
                // Update localStorage to match URL
                localStorage.setItem("compareTools", JSON.stringify(filtered.map((t: ToolData) => t.slug)));
            } else {
                // Fall back to localStorage
                const compareList = JSON.parse(localStorage.getItem("compareTools") || "[]") as string[];
                const filtered = tools.filter((t: ToolData) => compareList.includes(t.slug));
                setSelectedTools(filtered);
            }

            setIsLoading(false);
        };

        loadTools();
    }, [searchParams, tools]);

    const removeTool = (slug: string) => {
        const compareList = JSON.parse(localStorage.getItem("compareTools") || "[]") as string[];
        const newList = compareList.filter(s => s !== slug);
        localStorage.setItem("compareTools", JSON.stringify(newList));
        setSelectedTools(selectedTools.filter((t: ToolData) => t.slug !== slug));
    };

    const shareComparison = () => {
        const slugs = selectedTools.map((t: ToolData) => t.slug).join(',');
        const url = `${window.location.origin}/compare?tools=${slugs}`;

        navigator.clipboard.writeText(url).then(() => {
            toast.success("Comparison link copied! Share this with others");
        });
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background relative overflow-hidden pt-32 pb-20 px-4">
                <div className="container max-w-2xl mx-auto text-center">
                    <div className="inline-flex p-4 rounded-full bg-indigo-500/10 mb-4">
                        <Scale className="h-8 w-8 text-indigo-400 animate-pulse" />
                    </div>
                    <p className="text-muted-foreground">Loading comparison...</p>
                </div>
            </main>
        );
    }

    if (selectedTools.length === 0) {
        return (
            <PageBackground {...BackgroundPresets.content}>
                <div className="container max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex p-6 bg-indigo-500/10 rounded-full w-24 h-24 mx-auto mb-6 items-center justify-center border border-indigo-500/20">
                            <Scale className="h-12 w-12 text-indigo-400" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4 text-balance">Compare AI Tools</h1>
                        <p className="text-muted-foreground text-lg mb-8">
                            Select up to 3 tools from our directory to compare them side-by-side and find the perfect fit for your workflow.
                        </p>
                        <Button asChild className="rounded-full shadow-lg shadow-indigo-500/20 px-8 h-12">
                            <Link href="/tools">Browse Tools Directory</Link>
                        </Button>
                    </motion.div>
                </div>
            </PageBackground>
        );
    }

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
                >
                    <div className="flex items-center gap-4">
                        <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Directory
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        {selectedTools.length < 3 && (
                            <Link href="/tools">
                                <Button variant="outline" className="rounded-full">
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Add More
                                </Button>
                            </Link>
                        )}
                        <Button
                            variant="outline"
                            onClick={shareComparison}
                            className="rounded-full"
                        >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-indigo-500/10">
                            <Scale className="h-6 w-6 text-indigo-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-balance">Tool Comparison</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Comparing {selectedTools.length} tools side-by-side
                    </p>
                </motion.div>

                {/* Comparison Cards */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {selectedTools.map((tool, index) => (
                        <motion.div
                            key={tool.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        >
                            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-indigo-500/30 transition-colors">
                                <CardContent className="p-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-2xl bg-linear-to-br ${tool.bgGradient || "from-slate-500/60 to-slate-800/60"}`}>
                                                {(() => {
                                                    const Icon = getToolIcon(tool.slug);
                                                    return <Icon className="h-8 w-8 text-white" />;
                                                })()}
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold">{tool.title}</h2>
                                                <Badge variant="secondary" className="mt-1">
                                                    {tool.category}
                                                </Badge>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeTool(tool.slug)}
                                            className="p-2 rounded-full bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* Rating */}
                                    {tool.review && (
                                        <div className="flex items-center gap-2 mb-6 p-3 bg-yellow-500/5 rounded-xl border border-yellow-500/10">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(tool.review!.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}`} />
                                                ))}
                                            </div>
                                            <span className="font-bold">{tool.review.rating}</span>
                                            <span className="text-muted-foreground text-sm">/ 5.0</span>
                                        </div>
                                    )}

                                    {/* Pricing */}
                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Pricing</h3>
                                        <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-sm py-1 px-3">
                                            {tool.pricing}
                                        </Badge>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium text-muted-foreground mb-3">Key Features</h3>
                                        <ul className="space-y-2">
                                            {tool.features?.slice(0, 4).map((feature) => (
                                                <li key={feature} className="flex items-start gap-2 text-sm">
                                                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                                    <span className="text-muted-foreground">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Pros */}
                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium text-emerald-400 mb-3">Pros</h3>
                                        <ul className="space-y-2">
                                            {tool.pros?.slice(0, 3).map((pro) => (
                                                <li key={pro} className="flex items-start gap-2 text-sm text-emerald-400/80">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                                    {pro}
                                                </li>
                                            )) || <p className="text-sm text-muted-foreground">No pros listed</p>}
                                        </ul>
                                    </div>

                                    {/* Cons */}
                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium text-rose-400 mb-3">Cons</h3>
                                        <ul className="space-y-2">
                                            {tool.cons?.slice(0, 3).map((con) => (
                                                <li key={con} className="flex items-start gap-2 text-sm text-rose-400/80">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                                                    {con}
                                                </li>
                                            )) || <p className="text-sm text-muted-foreground">No cons listed</p>}
                                        </ul>
                                    </div>

                                    {/* CTA */}
                                    <Link href={`/tool/${tool.slug}`}>
                                        <Button className="w-full rounded-full" variant="outline">
                                            View Details
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Table */}
                {selectedTools.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-12"
                    >
                        <h2 className="text-2xl font-bold mb-6">Feature Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-border/50">
                                        <th className="py-4 px-4 text-left font-medium text-muted-foreground">Feature</th>
                                        {selectedTools.map(tool => (
                                            <th key={tool.slug} className="py-4 px-4 text-left font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <div className={`p-1.5 rounded-lg bg-linear-to-br ${tool.bgGradient || "from-slate-500/60 to-slate-800/60"}`}>
                                                        {(() => {
                                                            const Icon = getToolIcon(tool.slug);
                                                            return <Icon className="h-4 w-4 text-white" />;
                                                        })()}
                                                    </div>
                                                    {tool.title}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/30">
                                    {/* Category Row */}
                                    <tr>
                                        <td className="py-4 px-4 text-muted-foreground">Category</td>
                                        {selectedTools.map(tool => (
                                            <td key={tool.slug} className="py-4 px-4">
                                                <Badge variant="secondary">{tool.category}</Badge>
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Pricing Row */}
                                    <tr>
                                        <td className="py-4 px-4 text-muted-foreground">Pricing</td>
                                        {selectedTools.map(tool => (
                                            <td key={tool.slug} className="py-4 px-4">
                                                <span className="font-medium">{tool.pricing}</span>
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Rating Row */}
                                    <tr>
                                        <td className="py-4 px-4 text-muted-foreground">Rating</td>
                                        {selectedTools.map(tool => (
                                            <td key={tool.slug} className="py-4 px-4">
                                                {tool.review ? (
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                        <span className="font-medium">{tool.review.rating}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">N/A</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Features Count */}
                                    <tr>
                                        <td className="py-4 px-4 text-muted-foreground">Features</td>
                                        {selectedTools.map(tool => (
                                            <td key={tool.slug} className="py-4 px-4">
                                                <span className="font-medium">{tool.features?.length || 0}</span>
                                                <span className="text-muted-foreground text-sm ml-1">listed</span>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </PageBackground>
    );
}
