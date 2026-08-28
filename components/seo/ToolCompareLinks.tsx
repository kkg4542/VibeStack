import Link from "next/link";
import { ToolData } from "@/lib/tool-types";
import { comparePairs } from "@/lib/compare-content";

interface Props {
    toolSlug: string;
    toolTitle: string;
    tools: ToolData[];
}

/**
 * Server-rendered links from a /tool/[slug] page to every published
 * /compare/[slug] page that features this tool.
 *
 * GSC data shows /tool/* pages get the most impressions (31%) but rank worst
 * (~47th avg position), while /compare/* pages rank best (~27.5th avg
 * position) but the only comparison link on a tool page pointed at
 * /compare?tools=slug — a query-string URL for the interactive comparer, not
 * the static /compare/[slug] pages, so tool pages sent zero crawlable link
 * equity into the site's best-ranking cluster. This component closes that
 * gap by rendering real <a> links to the actual comparison pages this tool
 * appears in.
 */
export function ToolCompareLinks({ toolSlug, toolTitle, tools }: Props) {
    const comparisons = comparePairs(tools).filter(
        (p) => p.t1.slug === toolSlug || p.t2.slug === toolSlug
    );

    if (comparisons.length === 0) return null;

    return (
        <nav
            aria-label={`Comparisons involving ${toolTitle}`}
            className="mt-12"
        >
            <h2 className="text-2xl font-semibold text-foreground mb-4">
                Compare {toolTitle}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {comparisons.map((c) => {
                    const other = c.t1.slug === toolSlug ? c.t2 : c.t1;
                    return (
                        <li key={c.slug}>
                            <Link href={`/compare/${c.slug}`} className="hover:text-primary transition-colors">
                                {toolTitle} vs {other.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
