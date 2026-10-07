import type { BlogPost } from "./blog-types";
import { stacks } from "./stacks";
import { BEST_CATEGORIES } from "./best-categories";
import { comparePairs, COMPARE_EDITORIAL } from "./compare-content";
import type { ToolData } from "./tool-types";

/** Strip punctuation/case so "Bolt.new", "bolt-new" and "Bolt New" all match. */
function normalize(s: string): string {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/**
 * Cumulative prefixes and suffixes of a slug's segments, e.g. "v0-by-vercel"
 * → ["v0", "v0by", "v0byvercel", "byvercel", "vercel"]. Lets a tag like
 * "v0" match "v0-by-vercel" without the false positives of substring
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

export type BestCategoryEntry = (typeof BEST_CATEGORIES)[number];
export type ComparePairEntry = ReturnType<typeof comparePairs>[number];
export type StackEntry = (typeof stacks)[number];

export interface RelatedContent {
    /** Tools whose slug or title the post's tags name. */
    tools: ToolData[];
    /** Category hubs for those tools, in BEST_CATEGORIES order. */
    guides: BestCategoryEntry[];
    /** Published comparisons where BOTH tools are mentioned by the post (max 2). */
    comparisons: ComparePairEntry[];
    relatedStack: StackEntry | undefined;
}

/**
 * Which tool, guide, comparison and stack pages a blog post talks about,
 * judged from its tags. Matching on tags keeps the links genuinely relevant
 * and never fabricates a comparison URL that isn't published.
 */
export function getRelatedContent(post: BlogPost, tools: ToolData[]): RelatedContent {
    const tags = post.tags ?? [];

    const matchedTools = tools.filter((tool) => tags.some((tag) => matchesTag(tool, tag)));

    const guides = BEST_CATEGORIES.filter((c) => matchedTools.some((t) => t.category === c.category));

    const matchedSlugs = new Set(matchedTools.map((t) => t.slug));
    const comparisons = comparePairs(tools)
        .filter((p) => matchedSlugs.has(p.t1.slug) && matchedSlugs.has(p.t2.slug))
        .slice(0, 2);

    const relatedStack = post.relatedStack
        ? stacks.find((s) => s.id === post.relatedStack)
        : undefined;

    return { tools: matchedTools, guides, comparisons, relatedStack };
}

/** True when there is nothing to link to — the bottom "Related" block renders nothing. */
export function hasNoRelatedContent(related: RelatedContent): boolean {
    return related.tools.length === 0 && related.guides.length === 0 && !related.relatedStack;
}

export type InlineCallout =
    | { kind: "compare"; href: string; label: string }
    | { kind: "tool"; href: string; label: string }
    | { kind: "guide"; href: string; label: string };

/**
 * Resolve `post.callout` against live data. Returns null when the post has no
 * override or the target has since disappeared (a retired tool, an unpublished
 * comparison), so a stale override degrades to tag matching instead of
 * shipping a link to a 404. A comparison override must still have editorial
 * copy, for the same reason pickInlineCallout insists on it.
 */
function resolveCalloutOverride(post: BlogPost, tools: ToolData[]): InlineCallout | null {
    const override = post.callout;
    if (!override) return null;

    switch (override.kind) {
        case "tool": {
            const tool = tools.find((t) => t.slug === override.slug);
            return tool ? { kind: "tool", href: `/tool/${tool.slug}`, label: tool.title } : null;
        }
        case "guide": {
            const guide = BEST_CATEGORIES.find((c) => c.slug === override.slug);
            return guide ? { kind: "guide", href: `/best/${guide.slug}`, label: guide.heading } : null;
        }
        case "compare": {
            const pair = comparePairs(tools).find((p) => p.slug === override.slug);
            return pair && Object.hasOwn(COMPARE_EDITORIAL, pair.slug)
                ? { kind: "compare", href: `/compare/${pair.slug}`, label: pair.label }
                : null;
        }
    }
}

/** The inline callout for a post: its hand-picked target if it resolves, else the best tag match. */
export function getInlineCallout(post: BlogPost, tools: ToolData[]): InlineCallout | null {
    return resolveCalloutOverride(post, tools) ?? pickInlineCallout(getRelatedContent(post, tools));
}

/**
 * The single link worth interrupting the reader for, or null.
 *
 * A comparison wins when the post names both tools, but only one with
 * hand-written editorial copy: the rest of the comparison pages are generated
 * from tool data and are the thin pages Search Console has been reluctant to
 * index, so sending readers mid-article to one of those would be a poor
 * handoff. They stay in the bottom "Related" block.
 */
export function pickInlineCallout(related: RelatedContent): InlineCallout | null {
    const compare = related.comparisons.find((c) => Object.hasOwn(COMPARE_EDITORIAL, c.slug));
    if (compare) {
        return { kind: "compare", href: `/compare/${compare.slug}`, label: compare.label };
    }

    const tool = related.tools[0];
    if (tool) {
        return { kind: "tool", href: `/tool/${tool.slug}`, label: tool.title };
    }

    const guide = related.guides[0];
    if (guide) {
        return { kind: "guide", href: `/best/${guide.slug}`, label: guide.heading };
    }

    return null;
}
