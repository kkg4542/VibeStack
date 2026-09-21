import { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import ToolsPageClient from "./ToolsPageClient";
import { SiteDirectory } from "@/components/seo/SiteDirectory";
import { Container } from "@/components/primitives/Container";
import { getTools } from "@/lib/tools-db";
import { comparePairs } from "@/lib/compare-content";
import { BEST_CATEGORIES } from "@/lib/best-categories";
import { designSystem } from "@/lib/design-system";
import { ToolData } from "@/lib/tool-types";

const SITE_URL = "https://usevibestack.com";

export const metadata: Metadata = {
    title: "AI Tools Directory",
    description: "Discover curated AI tools for developers, designers, and creators. Filter by category, pricing, and workflow impact to build your perfect AI stack.",
    alternates: { canonical: "https://usevibestack.com/tools" },
    openGraph: {
        title: "AI Tools Directory - VibeStack",
        description: "Curated AI tools vetted for real workflow impact.",
        type: "website",
        url: "https://usevibestack.com/tools",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Tools Directory - VibeStack",
        description: "Curated AI tools vetted for real workflow impact.",
    },
};

/**
 * Live category counts, biggest first. Derived from the same `getTools()` read
 * the rest of the page uses, so the copy can never drift from the directory —
 * never hard-code these numbers.
 */
function categoryBreakdown(tools: ToolData[]) {
    const counts = new Map<ToolData["category"], number>();
    for (const tool of tools) {
        counts.set(tool.category, (counts.get(tool.category) ?? 0) + 1);
    }
    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([category, count]) => ({
            category,
            count,
            // /categories/[category] keys off the lower-cased category name.
            slug: category.toLowerCase(),
        }));
}

/**
 * The hub's identity — H1, intro and structured data — is rendered here, on the
 * server, rather than inside ToolsPageClient.
 *
 * ToolsPageClient mounts `PageBackground` through `dynamic(..., { ssr: false })`
 * and fetches its tools from the client, so its entire subtree (H1 included) is
 * absent from the prerendered HTML: crawlers saw a hub with no heading, no
 * intro and no schema. Moving the badge/H1/lead paragraph up here fixes that
 * without touching the framer-motion enter animations below, which are the
 * reason this content can't simply be server-rendered in place.
 */
export default async function ToolsPage() {
    // Same read SiteDirectory performs below, so the copy, the ItemList schema
    // and the crawlable links can never disagree about what is published.
    // getTools() already filters out retired slugs.
    const tools = await getTools();
    const categories = categoryBreakdown(tools);
    const comparisonCount = comparePairs(tools).length;

    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "AI Tools Directory",
        description: "Every AI tool published in the VibeStack directory.",
        numberOfItems: tools.length,
        itemListElement: tools.map((tool, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: tool.title,
            url: `${SITE_URL}/tool/${tool.slug}`,
        })),
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "AI Tools Directory", item: `${SITE_URL}/tools` },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            {/* Server-rendered hub identity. Plain HTML on purpose — no framer
                wrappers, so it is visible with or without JavaScript. */}
            <section className="relative pt-24">
                <Container size="default">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibe-electric/10 border border-vibe-electric/20 text-vibe-link text-sm font-medium mb-6 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4" />
                            <span>{tools.length} tools, vetted for real work</span>
                        </div>

                        <h1 className={`${designSystem.typography.hero} mb-6 max-w-4xl mx-auto leading-tight`}>
                            The AI{" "}
                            <span className="text-gradient-brand">tools directory</span>{" "}
                            for people who ship
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed">
                            Skip the hype. We test, tag, and track AI products by real workflow
                            impact, not buzz — so you can compare by category, pricing, and
                            outcome and build a stack that actually saves time.
                        </p>

                        <div className="text-base text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed space-y-4 text-left sm:text-center">
                            <p>
                                {tools.length} tools are listed across {categories.length}{" "}
                                categories. Each one has its own page covering what it does, the
                                features it ships, what it costs, and where it falls short. Tools
                                whose vendor has shut down or been absorbed into another product are
                                pulled from the directory rather than left to send you somewhere
                                that no longer exists.
                            </p>
                            <p>
                                Use the search and filters below to narrow by category or pricing,
                                open a tool page for the full breakdown, then put two of them next
                                to each other in one of the{" "}
                                <Link href="/compare" className="text-vibe-link hover:underline">
                                    {comparisonCount} head-to-head comparisons
                                </Link>
                                . If you would rather start from a shortlist, the{" "}
                                {BEST_CATEGORIES.length} best-of guides rank the top picks for each
                                category.
                            </p>
                        </div>

                        <p className="text-sm font-medium text-foreground mb-3">Browse by category</p>
                        <ul className="flex flex-wrap justify-center gap-2 mb-4">
                            {categories.map((c) => (
                                <li key={c.slug}>
                                    <Link
                                        href={`/categories/${c.slug}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm text-muted-foreground hover:border-vibe-electric/40 hover:text-foreground transition-colors"
                                    >
                                        {c.category}
                                        <span className="text-xs text-muted-foreground/70">{c.count}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </section>

            <ToolsPageClient />
            <Container>
                <SiteDirectory />
            </Container>
        </>
    );
}
