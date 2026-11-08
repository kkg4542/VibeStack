import Link from "next/link";
import { ToolData } from "@/lib/tool-types";
import { getToolIcon } from "@/components/icons/tool-icons";

interface Props {
    currentSlug: string;
    category: string;
    pricing?: string;
    tools: ToolData[];
    title?: string;
}

/**
 * Alternatives grid. Flat surface cards (bg-card) with the icon on a square
 * one tone step down, in text-foreground; per-tool colour data is not used.
 * Hover or focus turns the whole card into an orange field with dark text.
 */
export function RelatedTools({ currentSlug, category, pricing, tools, title = "Related Tools" }: Props) {
    // Smart algorithm: prioritize same category, then similar pricing
    const relatedTools = tools
        .filter((t) => t.slug !== currentSlug)
        .map((t) => {
            // Calculate relevance score
            let score = 0;
            if (t.category === category) score += 10;
            if (t.pricing === pricing) score += 5;
            // Secondary: same category but different pricing
            if (t.category === category && t.pricing !== pricing) score += 3;
            return { tool: t, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map((item) => item.tool);

    if (relatedTools.length === 0) return null;

    return (
        <section className="mt-24">
            <h2 className="mb-8 font-display text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground text-balance">
                {title}
            </h2>
            <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
                {relatedTools.map((tool) => (
                    <Link
                        key={tool.slug}
                        href={`/tool/${tool.slug}`}
                        className="group flex h-full flex-col gap-4 bg-card p-6 text-foreground transition-colors duration-150 hover:bg-vibe-electric focus-visible:bg-vibe-electric focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-vibe-deep motion-reduce:transition-none"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-background text-foreground">
                                {(() => {
                                    const Icon = getToolIcon(tool.slug);
                                    return <Icon aria-hidden="true" className="h-5 w-5" />;
                                })()}
                            </div>
                            <span className="truncate text-[14px] text-muted-foreground group-hover:text-vibe-deep group-focus-visible:text-vibe-deep">
                                {tool.category}
                            </span>
                        </div>
                        <h3 className="text-[18px] font-semibold leading-tight group-hover:text-vibe-deep group-focus-visible:text-vibe-deep">
                            {tool.title}
                        </h3>
                        <p className="line-clamp-2 text-base text-muted-foreground group-hover:text-vibe-deep group-focus-visible:text-vibe-deep">
                            {tool.description}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
