import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { stacks } from "@/lib/stacks";
import { BEST_CATEGORIES } from "@/lib/best-categories";
import { comparePairs } from "@/lib/compare-content";
import { ToolData } from "@/lib/tool-types";

interface BlogRelatedLinksProps {
    post: BlogPost;
    tools: ToolData[];
}

const linkClass = "hover:text-primary transition-colors";

/** Strip punctuation/case so "Bolt.new", "bolt-new" and "Bolt New" all match. */
function normalize(s: string): string {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/**
 * Cumulative prefixes and suffixes of a slug's segments, e.g. "v0-by-vercel"
 * → ["v0", "v0by", "v0byvercel", "byvercel", "vercel"]. Lets a tag like
 * "Windsurf" match "windsurf-ide" without the false positives of substring
 * matching.
 */
function slugAliases(slug: string): { prefixes: string[]; suffixes: string[] } {
    const parts = slug.split("-").map(normalize).filter(Boolean);
    const prefixes: string[] = [];
    const suffixes: string[] = [];

    for (let i = 1; i <= parts.length; i++) {
        prefixes.push(parts.slice(0, i).join(""));
        suffixes.push(parts.slice(parts.length - i).join(""));
    }

    return { prefixes, suffixes };
}

function matchesTag(tool: ToolData, tag: string): boolean {
    const t = normalize(tag);
    if (!t) return false;

    if (t === normalize(tool.slug) || t === normalize(tool.title)) return true;

    // Length floors keep generic tags ("IDE", "AI") from matching a tool
    // whose slug merely ends with that word.
    const { prefixes, suffixes } = slugAliases(tool.slug);
    if (t.length >= 2 && prefixes.includes(t)) return true;
    if (t.length >= 4 && suffixes.includes(t)) return true;

    return false;
}

/**
 * Server-rendered cross-links from a blog post to the tool, guide, comparison
 * and stack pages it talks about.
 *
 * Blog posts were leaf nodes: lots of inbound crawl, no outbound links to the
 * money pages. Matching on the post's tags keeps the links genuinely relevant
 * and never fabricates a comparison URL that isn't published.
 */
export function BlogRelatedLinks({ post, tools }: BlogRelatedLinksProps) {
    const tags = post.tags ?? [];

    const matchedTools = tools.filter((tool) => tags.some((tag) => matchesTag(tool, tag)));

    // Category hubs for the matched tools, deduped, in BEST_CATEGORIES order.
    const guides = BEST_CATEGORIES.filter((c) => matchedTools.some((t) => t.category === c.category));

    // Published comparisons where BOTH tools are mentioned by this post.
    const matchedSlugs = new Set(matchedTools.map((t) => t.slug));
    const comparisons = comparePairs(tools)
        .filter((p) => matchedSlugs.has(p.t1.slug) && matchedSlugs.has(p.t2.slug))
        .slice(0, 2);

    const relatedStack = post.relatedStack
        ? stacks.find((s) => s.id === post.relatedStack)
        : undefined;

    if (matchedTools.length === 0 && guides.length === 0 && !relatedStack) {
        return null;
    }

    return (
        <nav
            aria-label="Related reading"
            className="mt-16 border-t border-border/60 pt-10"
        >
            <h2 className="text-sm font-semibold text-foreground mb-4">Related on VibeStack</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {matchedTools.map((tool) => (
                    <li key={`tool-${tool.slug}`}>
                        <Link href={`/tool/${tool.slug}`} className={linkClass}>
                            {tool.title} review
                        </Link>
                    </li>
                ))}
                {guides.map((c) => (
                    <li key={`best-${c.slug}`}>
                        <Link href={`/best/${c.slug}`} className={linkClass}>
                            {c.heading}
                        </Link>
                    </li>
                ))}
                {comparisons.map((c) => (
                    <li key={`compare-${c.slug}`}>
                        <Link href={`/compare/${c.slug}`} className={linkClass}>
                            {c.label}
                        </Link>
                    </li>
                ))}
                {relatedStack && (
                    <li key={`stack-${relatedStack.id}`}>
                        <Link href={`/stack/${relatedStack.id}`} className={linkClass}>
                            {relatedStack.name}
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}
