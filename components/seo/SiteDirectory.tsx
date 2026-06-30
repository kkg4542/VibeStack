import Link from "next/link";
import { getTools } from "@/lib/tools-db";
import { blogPosts } from "@/lib/blog";
import { stacks } from "@/lib/stacks";
import { BEST_CATEGORIES } from "@/lib/best-categories";
import { ToolData } from "@/lib/tool-types";

const CATEGORY_SLUGS = ["coding", "management", "productivity", "assistance", "design", "other"] as const;

/**
 * Server-rendered crawlable index of the whole site.
 *
 * The interactive `/tools`, `/compare`, etc. hubs fetch their data on the
 * client, so the initial HTML contained no links to individual tool /
 * comparison / stack pages. Googlebot saw those URLs only in the sitemap,
 * with no internal links pointing at them — the classic cause of
 * "Discovered – currently not indexed". This component renders real <a>
 * links to every indexable page so crawlers can reach and prioritise them.
 */
export async function SiteDirectory() {
    const tools = await getTools();

    // Comparison slugs — must mirror generateStaticParams in
    // app/compare/[slug]/page.tsx exactly (same-category pairs, capped at 50).
    const comparisons = tools
        .flatMap((t1, i) =>
            tools
                .slice(i + 1)
                .filter((t2) => t1.category === t2.category)
                .map((t2) => ({
                    slug: `${t1.slug}-vs-${t2.slug}`,
                    label: `${t1.title} vs ${t2.title}`,
                }))
        )
        .slice(0, 50);

    const sortedTools = [...tools].sort((a, b) => a.title.localeCompare(b.title));

    const linkClass = "hover:text-primary transition-colors";

    return (
        <nav
            aria-label="Site directory"
            className="mt-24 border-t border-border/60 pt-12"
        >
            <div className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground">Browse the full directory</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Every tool, comparison, and guide on VibeStack — in one place.
                </p>
            </div>

            {/* All tools */}
            <section className="mb-12">
                <h3 className="text-sm font-semibold text-foreground mb-4">All AI Tools</h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    {sortedTools.map((tool: ToolData) => (
                        <li key={tool.slug}>
                            <Link href={`/tool/${tool.slug}`} className={linkClass}>
                                {tool.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Best-of guides + categories */}
            <section className="mb-12 grid gap-10 md:grid-cols-2">
                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-4">Best AI Tools by Use Case</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {BEST_CATEGORIES.map((c) => (
                            <li key={c.slug}>
                                <Link href={`/best/${c.slug}`} className={linkClass}>
                                    {c.heading}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-4">Categories</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground capitalize">
                        {CATEGORY_SLUGS.map((slug) => (
                            <li key={slug}>
                                <Link href={`/categories/${slug}`} className={linkClass}>
                                    {slug} tools
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Comparisons */}
            {comparisons.length > 0 && (
                <section className="mb-12">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Popular Comparisons</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        {comparisons.map((c) => (
                            <li key={c.slug}>
                                <Link href={`/compare/${c.slug}`} className={linkClass}>
                                    {c.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Curated stacks */}
            {stacks.length > 0 && (
                <section className="mb-12">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Curated Stacks</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        {stacks.map((stack) => (
                            <li key={stack.id}>
                                <Link href={`/stack/${stack.id}`} className={linkClass}>
                                    {stack.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Latest articles */}
            {blogPosts.length > 0 && (
                <section>
                    <h3 className="text-sm font-semibold text-foreground mb-4">From the Blog</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        {blogPosts.map((post) => (
                            <li key={post.slug}>
                                <Link href={`/blog/${post.slug}`} className={linkClass}>
                                    {post.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </nav>
    );
}
