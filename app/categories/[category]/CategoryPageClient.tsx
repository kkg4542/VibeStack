"use client";

import { getToolIcon } from "@/components/icons/tool-icons";
import Link from "next/link";
import { CompareButton } from "@/components/tools/CompareButton";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import {
    Code2,
    FolderKanban,
    Zap,
    MessageSquare,
    Palette,
    Box,
    ArrowLeft
} from "lucide-react";
import type { ToolData } from "@/lib/tool-types";
import { Container } from "@/components/primitives/Container";

interface CategoryPageClientProps {
    category: string;
    tools: ToolData[];
}

const categoryInfo: Record<string, {
    icon: typeof Code2;
    description: string;
    features: string[];
}> = {
    Coding: {
        icon: Code2,
        description: "AI-powered coding assistants and development tools that help you write better code faster.",
        features: ["Code completion", "Bug detection", "Code review", "Documentation generation"]
    },
    Management: {
        icon: FolderKanban,
        description: "Project management and team collaboration tools enhanced with AI capabilities.",
        features: ["Task automation", "Team coordination", "Progress tracking", "Smart scheduling"]
    },
    Productivity: {
        icon: Zap,
        description: "Boost your workflow with AI writing assistants, note-taking, and automation tools.",
        features: ["Writing assistance", "Note organization", "Workflow automation", "Time management"]
    },
    Assistance: {
        icon: MessageSquare,
        description: "AI assistants and chatbots for research, writing, and everyday tasks.",
        features: ["Natural conversations", "Research assistance", "Content creation", "Q&A support"]
    },
    Design: {
        icon: Palette,
        description: "Create stunning visuals with AI-powered design, image generation, and creative tools.",
        features: ["Image generation", "UI/UX design", "Video editing", "Brand creation"]
    },
    Other: {
        icon: Box,
        description: "Specialized AI tools for unique use cases and specific industry needs.",
        features: ["Niche solutions", "Industry-specific", "Custom workflows", "Specialized AI"]
    }
};

export function CategoryPageClient({ category, tools: categoryTools }: CategoryPageClientProps) {
    const info = categoryInfo[category];
    const Icon = info.icon;

    const freeCount = categoryTools.filter((t) => t.pricing === "Free" || t.pricing === "Freemium").length;

    return (
        <PageBackground {...BackgroundPresets.content}>
            <Container size="default">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href="/tools"
                        className="inline-flex items-center gap-2 text-[16px] font-semibold text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none"
                    >
                        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                        Back to All Tools
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="mb-16">
                    <p className="mb-6 flex items-center gap-2 text-[16px] font-semibold text-vibe-link">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                        <span>{categoryTools.length} Tools Available</span>
                    </p>

                    <h1 className="mb-8 font-display text-[clamp(40px,6vw,96px)] text-balance text-foreground">
                        {category} AI Tools
                    </h1>

                    <p className="mb-10 max-w-2xl text-[18px] leading-normal text-muted-foreground sm:text-[20px]">
                        {info.description}
                    </p>

                    {/* Stats */}
                    <dl className="grid max-w-xl grid-cols-2 gap-1">
                        <div className="flex flex-col-reverse bg-card px-4 py-4 sm:px-6">
                            <dt className="mt-2 text-[16px] text-muted-foreground">Tools</dt>
                            <dd className="font-display text-[clamp(32px,4vw,56px)] tabular-nums text-foreground">{categoryTools.length}</dd>
                        </div>
                        <div className="flex flex-col-reverse bg-card px-4 py-4 sm:px-6">
                            <dt className="mt-2 text-[16px] text-muted-foreground">Free Options</dt>
                            <dd className="font-display text-[clamp(32px,4vw,56px)] tabular-nums text-foreground">{freeCount}</dd>
                        </div>
                    </dl>
                </div>

                {/* Key Features */}
                <div className="mb-12">
                    <ul className="flex flex-wrap gap-1">
                        {info.features.map((feature) => (
                            <li
                                key={feature}
                                className="bg-secondary px-4 py-2 text-[16px] text-foreground"
                            >
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tools Grid */}
                <div>
                    <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
                        <h2 className="font-display text-[clamp(32px,4vw,56px)] text-foreground">Available Tools</h2>
                        <span className="text-[16px] font-semibold tabular-nums text-muted-foreground">{categoryTools.length} tools</span>
                    </div>

                    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
                        {categoryTools.map((tool) => (
                            <div key={tool.slug}>
                                {/* tool.color / tool.bgGradient are per-item colour data; in direction B they no longer render. */}
                                <Link
                                    href={`/tool/${tool.slug}`}
                                    className="group relative block h-full bg-card text-card-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none"
                                >
                                    <div className="relative flex h-full flex-col p-6">
                                        <div className="mb-4 flex items-center justify-between gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center bg-secondary text-foreground group-hover:bg-background">
                                                {(() => {
                                                    const ToolIcon = getToolIcon(tool.slug);
                                                    return <ToolIcon className="h-6 w-6" />;
                                                })()}
                                            </div>
                                            <span className="text-[14px] text-muted-foreground">
                                                {tool.category}
                                            </span>
                                        </div>
                                        <h3 className="text-[20px] font-semibold text-foreground group-hover:text-vibe-link">
                                            {tool.title}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-[16px] leading-normal text-muted-foreground">
                                            {tool.description}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-6">
                                            <span className="text-[14px] font-semibold text-foreground">
                                                {tool.pricing}
                                            </span>
                                            <CompareButton toolSlug={tool.slug} toolTitle={tool.title} />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Categories */}
                <div className="mt-16 bg-foreground p-8 text-background md:p-12">
                    <h3 className="mb-2 text-[24px] font-semibold">Explore Other Categories</h3>
                    <p className="mb-6 text-[16px] text-background/80">
                        Discover more AI tools across different categories
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {Object.entries(categoryInfo)
                            .filter(([cat]) => cat !== category)
                            .map(([cat, catInfo]) => {
                                const CatIcon = catInfo.icon;
                                return (
                                    <Link
                                        key={cat}
                                        href={`/categories/${cat.toLowerCase()}`}
                                        className="inline-flex items-center gap-2 bg-background px-4 py-2.5 text-[16px] font-semibold text-foreground transition-colors duration-150 hover:bg-vibe-electric hover:text-vibe-deep focus-visible:bg-vibe-electric focus-visible:text-vibe-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-electric motion-reduce:transition-none"
                                    >
                                        <CatIcon aria-hidden="true" className="h-4 w-4" />
                                        {cat}
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            </Container>
        </PageBackground>
    );
}
