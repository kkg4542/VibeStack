"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { tools, Tool } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X, Scale, Share2, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ComparePage() {
    const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        const loadTools = () => {
            setIsLoading(true);
            
            // Check for URL params first
            const toolsParam = searchParams.get('tools');
            if (toolsParam) {
                const slugs = toolsParam.split(',').filter(Boolean);
                const filtered = tools.filter(t => slugs.includes(t.slug)).slice(0, 3);
                setSelectedTools(filtered);
                // Update localStorage to match URL
                localStorage.setItem("compareTools", JSON.stringify(filtered.map(t => t.slug)));
            } else {
                // Fall back to localStorage
                const compareList = JSON.parse(localStorage.getItem("compareTools") || "[]") as string[];
                const filtered = tools.filter(t => compareList.includes(t.slug));
                setSelectedTools(filtered);
            }
            
            setIsLoading(false);
        };

        loadTools();
    }, [searchParams]);

    const removeTool = (slug: string) => {
        const compareList = JSON.parse(localStorage.getItem("compareTools") || "[]") as string[];
        const newList = compareList.filter(s => s !== slug);
        localStorage.setItem("compareTools", JSON.stringify(newList));
        setSelectedTools(selectedTools.filter(t => t.slug !== slug));
    };

    const shareComparison = () => {
        const slugs = selectedTools.map(t => t.slug).join(',');
        const url = `${window.location.origin}/compare?tools=${slugs}`;
        
        navigator.clipboard.writeText(url).then(() => {
            toast.success("Link copied! Share this comparison with others");
        });
    };

    if (isLoading) {
        return (
            <main className="min-h-screen pt-32 pb-20 px-4">
                <div className="container max-w-2xl mx-auto text-center">
                    <p className="text-muted-foreground">Loading comparison...</p>
                </div>
            </main>
        );
    }

    if (selectedTools.length === 0) {
        return (
            <main className="min-h-screen pt-32 pb-20 px-4">
                <div className="container max-w-2xl mx-auto text-center">
                    <div className="p-6 bg-secondary/30 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-white/5">
                        <Scale className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">No tools selected for comparison</h1>
                    <p className="text-muted-foreground mb-8">
                        Select up to 3 tools from our directory to compare them side-by-side.
                    </p>
                    <Button asChild className="bg-indigo-500 hover:bg-indigo-600">
                        <Link href="/tools">Go to Directory</Link>
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-24 pb-20 px-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Directory
                    </Link>
                    
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={shareComparison}
                        className="gap-2"
                    >
                        <Share2 className="h-4 w-4" />
                        Share Comparison
                    </Button>
                </div>

                <h1 className="text-4xl font-bold mb-12 flex items-center gap-3">
                    <Scale className="h-10 w-10 text-indigo-400" />
                    Compare Tools
                </h1>

                <div className="overflow-x-auto pb-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="py-6 px-4 text-left font-semibold text-muted-foreground w-48">Features</th>
                                {selectedTools.map(tool => (
                                    <th key={tool.slug} className="py-6 px-4 min-w-[300px] relative group">
                                        <button
                                            onClick={() => removeTool(tool.slug)}
                                            className="absolute -top-2 -right-2 bg-rose-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        >
                                            <X className="h-4 w-4 text-white" />
                                        </button>
                                        <div className="flex flex-col items-center gap-4">
                                            <div className={`p-4 rounded-2xl bg-secondary/80 border border-white/5 ${tool.color}`}>
                                                <tool.icon className="h-12 w-12" />
                                            </div>
                                            <h2 className="text-xl font-bold">{tool.title}</h2>
                                            <div className="flex gap-2">
                                                <Badge variant="outline">{tool.category}</Badge>
                                                <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">{tool.pricing}</Badge>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {/* Features Row */}
                            <tr>
                                <td className="py-8 px-4 font-semibold text-muted-foreground">Top Features</td>
                                {selectedTools.map(tool => (
                                    <td key={tool.slug} className="py-8 px-4 align-top">
                                        <ul className="space-y-3">
                                            {tool.features?.map(feature => (
                                                <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                ))}
                            </tr>

                            {/* Pros Row */}
                            <tr>
                                <td className="py-8 px-4 font-semibold text-muted-foreground">Pros</td>
                                {selectedTools.map(tool => (
                                    <td key={tool.slug} className="py-8 px-4 align-top">
                                        <ul className="space-y-3">
                                            {tool.pros?.map(pro => (
                                                <li key={pro} className="flex items-start gap-2 text-sm text-emerald-400/80">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                                    {pro}
                                                </li>
                                            )) || "Information pending"}
                                        </ul>
                                    </td>
                                ))}
                            </tr>

                            {/* Cons Row */}
                            <tr>
                                <td className="py-8 px-4 font-semibold text-muted-foreground">Cons</td>
                                {selectedTools.map(tool => (
                                    <td key={tool.slug} className="py-8 px-4 align-top">
                                        <ul className="space-y-3">
                                            {tool.cons?.map(con => (
                                                <li key={con} className="flex items-start gap-2 text-sm text-rose-400/80">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                                                    {con}
                                                </li>
                                            )) || "Information pending"}
                                        </ul>
                                    </td>
                                ))}
                            </tr>

                            {/* Rating Row */}
                            <tr>
                                <td className="py-8 px-4 font-semibold text-muted-foreground">Expert Rating</td>
                                {selectedTools.map(tool => (
                                    <td key={tool.slug} className="py-8 px-4 align-top text-center">
                                        {tool.review ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="text-3xl font-bold">{tool.review.rating}</span>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i} className={`h-4 w-4 ${i < Math.floor(tool.review!.rating) ? 'text-yellow-400' : 'text-zinc-600'}`}>
                                                            ★
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : "N/A"}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
