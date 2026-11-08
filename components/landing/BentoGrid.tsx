"use client";

import Link from "next/link";
import { useState } from "react";
import { ToolData } from "@/lib/tool-types";
import { useAllTools } from "@/hooks/use-tools";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";
import { Section } from "@/components/primitives/Section";
import { cn } from "@/lib/utils";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link";

/**
 * Legacy section (not on the home page; still reachable through
 * components/ui/LazyLoad.tsx). Direction B: flat card cells, icon on a flat
 * `bg-secondary` square (tool.color / tool.bgGradient no longer render), no
 * 3D tilt, glass, glow or shadows. Hover is one tone step.
 */
function BentoCard({ tool, index }: { tool: ToolData, index: number }) {
    return (
        <div className={cn("reveal", index === 0 || index === 3 ? "md:col-span-2" : "md:col-span-1")}>
            <Link
                id={`featured-tool-${tool.slug}`}
                href={`/tool/${tool.slug}`}
                className={cn("group flex h-full flex-col bg-card p-6 pt-8 transition-colors hover:bg-secondary", focusRing)}
            >
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="bg-secondary p-3 text-foreground group-hover:bg-background">
                        <ToolIconRenderer slug={tool.slug} className="h-6 w-6" />
                    </div>
                    <span className="text-[14px] text-muted-foreground">
                        {tool.category}
                    </span>
                </div>
                <h3 className="text-[20px] font-semibold text-foreground group-hover:text-vibe-link">
                    {tool.title}
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
                    {tool.description}
                </p>
            </Link>
        </div>
    );
}

export function BentoGrid() {
    const [category, setCategory] = useState("All");
    const { tools, isLoading } = useAllTools();

    // Filter tools based on category
    const filteredTools = tools.filter((tool: ToolData) =>
        category === "All" ? true : tool.category === category
    );

    // Use first 8 tools for the landing page (or 7 to fit grid perfectly? Keeping 8 for now)
    const featuredTools = filteredTools.slice(0, 8);

    const categories = ["All", "Coding", "Assistance", "Productivity", "Design", "Management"];

    return (
        <Section spacing="default">
            <div className="mb-12">
                <h2 className="font-display mb-6 text-[clamp(32px,4vw,56px)] leading-[0.88] text-balance text-foreground">
                    Essential Tools
                </h2>
                <p className="mb-8 max-w-2xl text-[18px] text-muted-foreground">
                    Hand-picked AI tools that integrate seamlessly into your workflow.
                </p>

                {/* Category Filter (Issue 12) */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            type="button"
                            key={cat}
                            onClick={() => setCategory(cat)}
                            aria-pressed={category === cat}
                            className={cn(
                                "rounded-none px-4 py-2 text-[16px] font-semibold transition-colors",
                                focusRing,
                                category === cat
                                    ? "bg-vibe-electric text-vibe-deep"
                                    : "bg-card text-foreground hover:bg-secondary"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {!isLoading && featuredTools.map((tool: ToolData, index: number) => (
                    <BentoCard key={tool.slug} tool={tool} index={index} />
                ))}
            </div>

            <div className="mt-12">
                <Link
                    href="/tools"
                    className={cn("inline-flex items-center gap-2 text-[18px] font-semibold text-vibe-link underline-offset-4 hover:underline", focusRing)}
                >
                    View all {tools.length}+ tools →
                </Link>
            </div>
        </Section>
    );
}
