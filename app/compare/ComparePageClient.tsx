"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToolData } from "@/lib/tool-types";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/components/icons/tool-icons";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Minus, Plus, Scale, Share2, Star, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { Container } from "@/components/primitives/Container";

export default function ComparePageClient() {
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
            <div className="relative overflow-hidden pb-16 pt-12">
                <Container size="xs">
                    <p className="flex items-center gap-3 text-[16px] text-muted-foreground">
                        <Scale aria-hidden="true" className="h-6 w-6 text-foreground" />
                        Loading comparison...
                    </p>
                </Container>
            </div>
        );
    }

    if (selectedTools.length === 0) {
        return (
            <PageBackground {...BackgroundPresets.content} className="min-h-0 pb-16 pt-12">
                <Container size="default">
                    <div className="bg-card p-8 md:p-12">
                        <h2 className="mb-4 font-display text-[clamp(32px,4vw,56px)] text-foreground">
                            Build your own comparison
                        </h2>
                        <p className="mb-8 max-w-2xl text-[18px] leading-normal text-muted-foreground">
                            Already narrowed it down? Pick up to 3 tools from the directory with
                            the Compare button and they will line up here side-by-side — features,
                            pricing, pros and cons in one view.
                        </p>
                        <Button asChild className="h-12 rounded-none bg-vibe-electric px-8 text-[16px] font-semibold text-vibe-deep shadow-none hover:bg-vibe-electric/90">
                            <Link href="/tools">Browse Tools Directory</Link>
                        </Button>
                    </div>
                </Container>
            </PageBackground>
        );
    }

    return (
        <PageBackground {...BackgroundPresets.content} className="min-h-0 pt-12">
            <Container>
                {/* Header */}
                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/tools" className="group inline-flex items-center text-[16px] font-semibold text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none">
                            <ArrowLeft aria-hidden="true" className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                            Back to Directory
                        </Link>
                    </div>

                    <div className="flex items-center gap-1">
                        {selectedTools.length < 3 && (
                            <Button variant="secondary" className="rounded-none" asChild>
                                <Link href="/tools">
                                    <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
                                    Add More
                                </Link>
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            onClick={shareComparison}
                            className="rounded-none"
                        >
                            <Share2 aria-hidden="true" className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                    </div>
                </div>

                {/* Title */}
                <div className="mb-12">
                    <h2 className="mb-3 font-display text-[clamp(32px,4vw,56px)] text-foreground">Your comparison</h2>
                    <p className="text-[16px] text-muted-foreground">
                        Comparing {selectedTools.length} tools side-by-side
                    </p>
                </div>

                {/* Comparison Cards */}
                <div className="grid gap-1 lg:grid-cols-3">
                    {selectedTools.map((tool) => (
                        <div key={tool.slug} className="h-full bg-card p-6">
                            {/* Header */}
                            <div className="mb-6 flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    {/* tool.bgGradient is per-item colour data; it no longer renders. */}
                                    <div className="flex h-14 w-14 items-center justify-center bg-secondary text-foreground">
                                        {(() => {
                                            const Icon = getToolIcon(tool.slug);
                                            return <Icon className="h-8 w-8" />;
                                        })()}
                                    </div>
                                    <div>
                                        <h2 className="text-[20px] font-semibold">{tool.title}</h2>
                                        <p className="mt-1 text-[14px] text-muted-foreground">
                                            {tool.category}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeTool(tool.slug)}
                                    aria-label={`Remove ${tool.title} from comparison`}
                                    className="bg-secondary p-2 text-foreground transition-colors duration-150 hover:bg-vibe-electric hover:text-vibe-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none"
                                >
                                    <Trash2 aria-hidden="true" className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Rating */}
                            {tool.review && (
                                <div className="mb-6 flex items-center gap-2 bg-secondary p-3">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} aria-hidden="true" className={`h-4 w-4 ${i < Math.floor(tool.review!.rating) ? 'fill-current text-vibe-link' : 'text-muted-foreground'}`} />
                                        ))}
                                    </div>
                                    <span className="font-semibold">{tool.review.rating}</span>
                                    <span className="text-[14px] text-muted-foreground">/ 5.0</span>
                                </div>
                            )}

                            {/* Pricing */}
                            <div className="mb-6">
                                <h3 className="mb-2 text-[14px] font-semibold text-muted-foreground">Pricing</h3>
                                <p className="text-[16px] font-semibold text-foreground">
                                    {tool.pricing}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h3 className="mb-3 text-[14px] font-semibold text-muted-foreground">Key Features</h3>
                                <ul className="space-y-2">
                                    {tool.features?.slice(0, 4).map((feature) => (
                                        <li key={feature} className="flex items-start gap-2 text-[16px]">
                                            <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Pros */}
                            <div className="mb-6">
                                <h3 className="mb-3 text-[14px] font-semibold text-foreground">Pros</h3>
                                <ul className="space-y-2">
                                    {tool.pros?.slice(0, 3).map((pro) => (
                                        <li key={pro} className="flex items-start gap-2 text-[16px] text-muted-foreground">
                                            <Plus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                                            {pro}
                                        </li>
                                    )) || <p className="text-[16px] text-muted-foreground">No pros listed</p>}
                                </ul>
                            </div>

                            {/* Cons */}
                            <div className="mb-6">
                                <h3 className="mb-3 text-[14px] font-semibold text-foreground">Cons</h3>
                                <ul className="space-y-2">
                                    {tool.cons?.slice(0, 3).map((con) => (
                                        <li key={con} className="flex items-start gap-2 text-[16px] text-muted-foreground">
                                            <Minus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                                            {con}
                                        </li>
                                    )) || <p className="text-[16px] text-muted-foreground">No cons listed</p>}
                                </ul>
                            </div>

                            {/* CTA */}
                            <Button className="w-full rounded-none" variant="secondary" asChild>
                                <Link href={`/tool/${tool.slug}`}>
                                    View Details
                                    <ExternalLink aria-hidden="true" className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Comparison Table */}
                {selectedTools.length > 1 && (
                    <div className="mt-12">
                        <h2 className="mb-6 font-display text-[clamp(32px,4vw,56px)] text-foreground">Feature Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-separate border-spacing-y-1 text-[16px]">
                                <thead>
                                    <tr className="bg-secondary">
                                        <th scope="col" className="px-4 py-4 text-left font-semibold text-muted-foreground">Feature</th>
                                        {selectedTools.map(tool => (
                                            <th key={tool.slug} scope="col" className="px-4 py-4 text-left font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-7 w-7 items-center justify-center bg-background text-foreground">
                                                        {(() => {
                                                            const Icon = getToolIcon(tool.slug);
                                                            return <Icon className="h-4 w-4" />;
                                                        })()}
                                                    </div>
                                                    {tool.title}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Category Row */}
                                    <tr className="bg-card">
                                        <th scope="row" className="px-4 py-4 text-left font-normal text-muted-foreground">Category</th>
                                        {selectedTools.map(tool => (
                                            <td key={tool.slug} className="px-4 py-4">
                                                {tool.category}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Pricing Row */}
                                    <tr className="bg-card">
                                        <th scope="row" className="px-4 py-4 text-left font-normal text-muted-foreground">Pricing</th>
                                        {selectedTools.map(tool => (
                                            <td key={tool.slug} className="px-4 py-4">
                                                <span className="font-semibold">{tool.pricing}</span>
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Rating Row */}
                                    <tr className="bg-card">
                                        <th scope="row" className="px-4 py-4 text-left font-normal text-muted-foreground">Rating</th>
                                        {selectedTools.map(tool => (
                                            <td key={tool.slug} className="px-4 py-4">
                                                {tool.review ? (
                                                    <div className="flex items-center gap-1">
                                                        <Star aria-hidden="true" className="h-4 w-4 fill-current text-vibe-link" />
                                                        <span className="font-semibold">{tool.review.rating}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">N/A</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Features Count */}
                                    <tr className="bg-card">
                                        <th scope="row" className="px-4 py-4 text-left font-normal text-muted-foreground">Features</th>
                                        {selectedTools.map(tool => (
                                            <td key={tool.slug} className="px-4 py-4">
                                                <span className="font-semibold">{tool.features?.length || 0}</span>
                                                <span className="ml-1 text-[14px] text-muted-foreground">listed</span>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </Container>
        </PageBackground>
    );
}
