import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ToolsPageClient from "./ToolsPageClient";
import { SiteDirectory } from "@/components/seo/SiteDirectory";
import { Container } from "@/components/primitives/Container";
import { getTools } from "@/lib/tools-db";
import { comparePairs } from "@/lib/compare-content";
import { BEST_CATEGORIES } from "@/lib/best-categories";
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

    // Filter options and header stats for the client island, derived from the
    // same read so the chips can never go stale against the data (this is how
    // "Other" had gone missing from the hard-coded list).
    const categoryOptions = categories.map((c) => c.category);
    const PRICING_ORDER: ToolData["pricing"][] = ["Free", "Freemium", "Paid", "Enterprise"];
    const pricingOptions = PRICING_ORDER.filter((p) => tools.some((t) => t.pricing === p));
    const freeToolsCount = tools.filter((t) => t.pricing === "Free").length;

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
                    <div>
                        <p className="mb-6 text-[16px] font-semibold text-vibe-link">
                            {tools.length} tools, vetted for real work
                        </p>

                        <h1 className="mb-8 max-w-5xl font-display text-[clamp(36px,6vw,96px)] text-balance text-foreground">
                            The AI tools directory for people who ship
                        </h1>

                        <p className="mb-6 max-w-3xl text-[18px] leading-normal text-foreground sm:text-[20px]">
                            Skip the hype. We test, tag, and track AI products by real workflow
                            impact, not buzz — so you can compare by category, pricing, and
                            outcome and build a stack that actually saves time.
                        </p>

                        <div className="mb-10 max-w-3xl space-y-4 text-[16px] leading-normal text-muted-foreground">
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
                                <Link href="/compare" className="font-semibold text-vibe-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link">
                                    {comparisonCount} head-to-head comparisons
                                </Link>
                                . If you would rather start from a shortlist, the{" "}
                                {BEST_CATEGORIES.length} best-of guides rank the top picks for each
                                category.
                            </p>
                        </div>

                        <p className="mb-3 text-[16px] font-semibold text-foreground">Browse by category</p>
                        <ul className="mb-4 flex flex-wrap gap-1">
                            {categories.map((c) => (
                                <li key={c.slug}>
                                    <Link
                                        href={`/categories/${c.slug}`}
                                        className="group inline-flex items-baseline gap-2 rounded-none bg-card px-4 py-2.5 text-[16px] font-semibold text-foreground transition-colors duration-150 hover:bg-vibe-electric hover:text-vibe-deep focus-visible:bg-vibe-electric focus-visible:text-vibe-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none"
                                    >
                                        {c.category}
                                        <span className="text-[14px] tabular-nums text-muted-foreground group-hover:text-vibe-deep group-focus-visible:text-vibe-deep">{c.count}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </section>

            {/* ToolsPageClient reads ?category= / ?q= via useSearchParams, which
                needs a Suspense boundary; everything above stays server-rendered
                and the route stays static. */}
            <Suspense fallback={null}>
                <ToolsPageClient
                    categories={categoryOptions}
                    pricingOptions={pricingOptions}
                    stats={{
                        totalTools: tools.length,
                        categoriesCount: categoryOptions.length,
                        freeToolsCount,
                    }}
                />
            </Suspense>
            <Container>
                <SiteDirectory />
            </Container>
        </>
    );
}
