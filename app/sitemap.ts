import { MetadataRoute } from "next";
import { getToolsStrict } from "@/lib/tools-db";
import { blogPosts } from "@/lib/blog";
import { stacks, STACKS_REVISED } from "@/lib/stacks";
import { BEST_CATEGORIES, BEST_REVISED } from "@/lib/best-categories";
import { comparePairs } from "@/lib/compare-content";
import { hasExtendedContent, TOOL_EXTENDED_CONTENT_REVISED } from "@/lib/tool-extended-content";

const CATEGORY_SLUGS = ["coding", "management", "productivity", "assistance", "design", "other"];

/** Last hand-edit of the category landing pages. */
const CATEGORIES_REVISED = "2026-07-04";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://usevibestack.com";
    // Strict read (no in-repo fallback): a silently truncated sitemap would drop
    // ~27 tool URLs and every comparison derived from them. Fail the build instead.
    const tools = await getToolsStrict("sitemap");

    const staticLastModified = new Date("2026-04-01");

    // Static pages
    const staticPages = [
        { route: "", priority: 1.0, changeFrequency: "weekly" as const },
        { route: "/tools", priority: 0.9, changeFrequency: "weekly" as const },
        { route: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
        { route: "/compare", priority: 0.8, changeFrequency: "weekly" as const },
        { route: "/community-stacks", priority: 0.8, changeFrequency: "weekly" as const },
        { route: "/about", priority: 0.6, changeFrequency: "monthly" as const },
        { route: "/build", priority: 0.7, changeFrequency: "monthly" as const },
        { route: "/submit-tool", priority: 0.6, changeFrequency: "monthly" as const },
        { route: "/submit-stack", priority: 0.6, changeFrequency: "monthly" as const },
        { route: "/pricing", priority: 0.7, changeFrequency: "monthly" as const },
        { route: "/sponsor", priority: 0.5, changeFrequency: "monthly" as const },
        { route: "/newsletter", priority: 0.7, changeFrequency: "monthly" as const },
        { route: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
        { route: "/testimonials", priority: 0.5, changeFrequency: "monthly" as const },
        { route: "/roadmap", priority: 0.5, changeFrequency: "monthly" as const },
        { route: "/guidelines", priority: 0.4, changeFrequency: "monthly" as const },
        { route: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
        { route: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    ].map(({ route, priority, changeFrequency }) => ({
        url: `${baseUrl}${route}`,
        lastModified: staticLastModified,
        changeFrequency,
        priority,
    }));

    // Category pages — /categories/[slug]
    const categoryPages = CATEGORY_SLUGS.map((slug) => ({
        url: `${baseUrl}/categories/${slug}`,
        lastModified: new Date(CATEGORIES_REVISED),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Tool pages. The extended editorial copy lives in the repo rather than the
    // database, so a copy revision never moves the Tool row's updatedAt. Report
    // whichever of the two is genuinely newer.
    const extendedRevised = new Date(TOOL_EXTENDED_CONTENT_REVISED);
    const toolPages = tools.map((tool) => {
        const dbUpdated = tool.updatedAt ? new Date(tool.updatedAt) : staticLastModified;
        const lastModified =
            hasExtendedContent(tool.slug) && extendedRevised > dbUpdated ? extendedRevised : dbUpdated;

        return {
            url: `${baseUrl}/tool/${tool.slug}`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.9,
        };
    });

    // Stack pages
    const stackPages = stacks.map((stack) => ({
        url: `${baseUrl}/stack/${stack.id}`,
        lastModified: new Date(STACKS_REVISED),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    // Blog pages — refreshed posts carry an `updated` date, which is what we
    // want crawlers to see as lastmod.
    const blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // "Best AI [Category] Tools" landing pages
    const bestPages = BEST_CATEGORIES.map((c) => ({
        url: `${baseUrl}/best/${c.slug}`,
        lastModified: new Date(BEST_REVISED),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    // Comparison pages — the shared pair set (same-category pairs, capped at 50).
    // A comparison is only as fresh as the two tools it describes, so lastmod
    // tracks the most recently updated of the pair.
    const comparisonPages = comparePairs(tools).map(({ slug, t1, t2 }) => {
        const updates = [t1.updatedAt, t2.updatedAt]
            .filter((d): d is string => Boolean(d))
            .map((d) => new Date(d).getTime());

        return {
            url: `${baseUrl}/compare/${slug}`,
            lastModified: updates.length > 0 ? new Date(Math.max(...updates)) : staticLastModified,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        };
    });

    return [
        ...staticPages,
        ...categoryPages,
        ...toolPages,
        ...stackPages,
        ...blogPages,
        ...bestPages,
        ...comparisonPages,
    ];
}
