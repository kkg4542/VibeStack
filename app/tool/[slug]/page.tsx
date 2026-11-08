import { notFound } from "next/navigation";
import { getToolBySlug, getTools, getToolsStrict } from "@/lib/tools-db";
import { ToolData } from "@/lib/tool-types";
import { Check, ArrowLeft, Star, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Metadata } from "next";
import { AffiliateLink } from "@/components/ui/AffiliateLink";
import { SidebarAd } from "@/components/tools/SidebarAd";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { SimpleAccordionItem } from "@/components/ui/simple-accordion";
import { getExtendedContent } from "@/lib/tool-extended-content";
import { toolLastRevised } from "@/lib/tool-revised";
import { fitTitle } from "@/lib/seo-title";
import sanitizeHtml from "sanitize-html";

import { ToolCompareLinks } from "@/components/seo/ToolCompareLinks";

import { ToolHero } from "./components/ToolHero";
import { ToolSEO } from "./components/ToolSEO";
import { Container } from "@/components/primitives/Container";

/** Google truncates SERP meta descriptions somewhere around here. */
const DESCRIPTION_MAX_LENGTH = 155;

/**
 * Pick the longest title variant that survives Google's ~60-character SERP
 * budget once " | VibeStack" is appended (see lib/seo-title.ts).
 *
 * These pages used to target the tool's own brand name ("Airtable Review &
 * Features"), which competes with the vendor's own site for a query it can
 * never win and was responsible for a large share of near-zero-CTR
 * impressions. Re-anchoring the title on the alternatives/pricing angle
 * targets intent the directory can actually rank for.
 */
function fitToolTitle(title: string): string {
    const variants = [
        `${title} Review (2026): Pricing, Features & Alternatives`,
        `${title} Review (2026): Pricing & Alternatives`,
        `${title} Review (2026): Pricing`,
        `${title} Review (2026)`,
        `${title} Review`,
    ];

    return fitTitle(variants);
}

/**
 * Truncate `text` to at most `maxLength` characters without cutting mid-word.
 * Trailing punctuation left dangling by the cut is stripped before the
 * ellipsis is appended.
 */
function truncateAtWord(text: string, maxLength: number): string {
    const trimmed = text.trim();
    if (trimmed.length <= maxLength) return trimmed;

    const sliced = trimmed.slice(0, maxLength);
    const lastSpace = sliced.lastIndexOf(" ");
    const safe = lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;
    return `${safe.replace(/[.,;:!?-]+$/, "")}…`;
}

/**
 * Build a meta description that signals search intent (pricing, pros/cons,
 * alternatives) instead of echoing tool.description verbatim, which is
 * on-page product copy and doesn't hint at any of the comparison intent
 * people actually search for. Never asserts tool-specific facts (price,
 * specs) that aren't already in tool.description — only frames what's there.
 *
 * Guaranteed to return no more than DESCRIPTION_MAX_LENGTH characters
 * regardless of how long tool.title or tool.description are.
 */
function buildToolDescription(tool: ToolData): string {
    const category = tool.category.toLowerCase();
    const lead = `${tool.title} review: pricing, pros & cons, and the best ${category} alternatives.`;

    if (lead.length > DESCRIPTION_MAX_LENGTH) {
        // Unusually long tool name — drop the category clause and, if still
        // too long, hard-truncate at a word boundary as a last resort.
        const shortLead = `${tool.title} review: pricing, pros, cons & alternatives.`;
        return shortLead.length > DESCRIPTION_MAX_LENGTH
            ? truncateAtWord(shortLead, DESCRIPTION_MAX_LENGTH)
            : shortLead;
    }

    const budget = DESCRIPTION_MAX_LENGTH - lead.length - 1; // 1 for the joining space
    if (budget < 20 || !tool.description) return lead;

    const extra = truncateAtWord(tool.description, budget);
    return extra ? `${lead} ${extra}` : lead;
}

// Only slugs returned by generateStaticParams() are valid routes.
// Everything else returns a real HTTP 404 instead of a soft-404 (200 + "Tool Not Found"),
// which previously let unlimited bogus URLs be crawled as valid pages.
// Safe because generateStaticParams() reads the exact same table (prisma.tool, unfiltered)
// that getToolBySlug() reads, and tool pages are already static-only (new tools require a redeploy).
export const dynamicParams = false;

// Generate static params for all tools.
// getToolsStrict() (no in-repo fallback, throws on a failed or short read) is required here:
// with dynamicParams = false, a fallback to the 21-tool in-repo array would deploy the
// remaining tool pages as hard 404s. Failing the build is the better outcome.
export async function generateStaticParams() {
    const tools = await getToolsStrict("tool/[slug] generateStaticParams");
    return tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const tool = await getToolBySlug(slug);
    if (!tool) return { title: "Tool Not Found" };

    const url = `https://usevibestack.com/tool/${tool.slug}`;
    const title = fitToolTitle(tool.title);
    const description = buildToolDescription(tool);

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url: url,
            type: "website",
            images: [
                {
                    url: `${url}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: tool.title,
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: tool.title,
            description,
        }
    };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let tool: ToolData | null = null;
    let allTools: ToolData[] = [];
    try {
        tool = await getToolBySlug(slug);
    } catch (e) {
        console.error("[ToolPage] getToolBySlug failed:", e);
        throw e;
    }

    if (!tool) {
        notFound();
    }

    try {
        allTools = await getTools();
    } catch (e) {
        console.error("[ToolPage] getTools failed:", e);
        allTools = [];
    }

    const extended = getExtendedContent(slug);
    const extendedOverviewHtml = extended
        ? sanitizeHtml(extended.overviewHtml, {
              allowedTags: [
                  "p", "br", "strong", "b", "em", "i", "u", "h2", "h3", "h4",
                  "ul", "ol", "li", "a", "blockquote", "code",
              ],
              allowedAttributes: {
                  a: ["href", "title", "target", "rel"],
              },
          })
        : null;

    // Structured data for Google rich results.
    // SoftwareApplication: enables the tool to appear in Google's app/software cards.
    // BreadcrumbList: shows breadcrumb trail in search results.
    // We deliberately omit AggregateRating until we have real review counts —
    // emitting fake/single-review ratings violates Google's structured data policy.
    const canonicalUrl = `https://usevibestack.com/tool/${tool.slug}`;
    const ogImage = `${canonicalUrl}/opengraph-image`;
    const isFree = tool.pricing === "Free" || tool.pricing === "Freemium";

    // Last substantive content change — the later of the editorial revision
    // date and the DB row's updatedAt. See lib/tool-revised.ts for the exact
    // semantics (it is "last touched", not "last fact-checked").
    const lastRevised = toolLastRevised(tool);
    const lastRevisedIso = lastRevised ? lastRevised.toISOString().slice(0, 10) : null;
    const lastRevisedHuman = lastRevised
        ? lastRevised.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
          })
        : null;

    const softwareJsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.title,
        description: tool.description,
        applicationCategory:
            tool.category === "Coding" ? "DeveloperApplication" : "BusinessApplication",
        operatingSystem: "Web",
        url: canonicalUrl,
        image: ogImage,
        sameAs: [tool.websiteUrl],
        ...(lastRevisedIso ? { dateModified: lastRevisedIso } : {}),
        offers: {
            "@type": "Offer",
            price: isFree ? "0" : undefined,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: tool.affiliateUrl || tool.websiteUrl,
        },
    };

    const faqJsonLd =
        extended?.faq && extended.faq.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: extended.faq.map((item) => ({
                      "@type": "Question",
                      name: item.q,
                      acceptedAnswer: {
                          "@type": "Answer",
                          text: item.a,
                      },
                  })),
              }
            : null;

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://usevibestack.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Tools",
                item: "https://usevibestack.com/tools",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: tool.title,
                item: canonicalUrl,
            },
        ],
    };

    // Direction B: flat tone-step fields, square corners, no lines/shadows.
    // Section titles in the display face; card titles stay Public Sans.
    const sectionField = "reveal bg-card p-6 md:p-10";
    const sectionTitle =
        "font-display text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground text-balance";
    const cardTitle = "text-[20px] font-semibold leading-tight text-foreground";

    return (
        <PageBackground {...BackgroundPresets.content}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <Container size="default">
                {/* Back Link */}
                <Link
                    href="/tools"
                    className="group mb-8 inline-flex items-center text-[16px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vibe-link"
                >
                    <ArrowLeft
                        aria-hidden="true"
                        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    />
                    Back to Tools
                </Link>

                {/* Hero */}
                <ToolHero tool={tool} />

                {/* Last-revised date — plain server-rendered HTML so crawlers
                    and AI surfaces that don't run client JS still see it. */}
                {lastRevisedIso && lastRevisedHuman && (
                    <p className="-mt-12 mb-12 text-[14px] text-muted-foreground">
                        Last updated <time dateTime={lastRevisedIso}>{lastRevisedHuman}</time>
                    </p>
                )}

                {/* Content Grid */}
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="space-y-8 lg:col-span-2">
                        {/* Key Features - Desktop */}
                        <div className="hidden md:block">
                            <section className={sectionField}>
                                <h2 className={`${sectionTitle} mb-8`}>Key Features</h2>
                                <ul className="grid gap-1">
                                    {tool.features?.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-4 bg-background px-5 py-4"
                                        >
                                            <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-vibe-link" />
                                            <span className="text-[18px] text-foreground">{feature}</span>
                                        </li>
                                    )) || <p className="text-muted-foreground">No features listed.</p>}
                                </ul>
                            </section>
                        </div>

                        {/* Key Features - Mobile Accordion */}
                        <div className="md:hidden">
                            <SimpleAccordionItem title="Key Features" defaultOpen={true}>
                                <ul className="grid gap-1">
                                    {tool.features?.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3 bg-background p-3"
                                        >
                                            <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-vibe-link" />
                                            <span className="text-base text-foreground">{feature}</span>
                                        </li>
                                    )) || <p className="text-muted-foreground">No features listed.</p>}
                                </ul>
                            </SimpleAccordionItem>
                        </div>

                        {/* Pros & Cons Section - Desktop */}
                        <div className="hidden gap-1 sm:grid-cols-2 md:grid">
                            <section className="reveal bg-card p-8">
                                <h3 className={`${cardTitle} mb-6 text-[24px]`}>Pros</h3>
                                <ul className="space-y-3">
                                    {tool.pros?.map((pro) => (
                                        <li key={pro} className="flex items-start gap-3 text-base text-foreground">
                                            <Plus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-vibe-link" />
                                            {pro}
                                        </li>
                                    )) || <p className="text-base text-muted-foreground">Information pending.</p>}
                                </ul>
                            </section>
                            <section className="reveal reveal-delay-1 bg-card p-8">
                                <h3 className={`${cardTitle} mb-6 text-[24px]`}>Cons</h3>
                                <ul className="space-y-3">
                                    {tool.cons?.map((con) => (
                                        <li key={con} className="flex items-start gap-3 text-base text-foreground">
                                            <Minus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                                            {con}
                                        </li>
                                    )) || <p className="text-base text-muted-foreground">Information pending.</p>}
                                </ul>
                            </section>
                        </div>

                        {/* Pros & Cons - Mobile Accordion */}
                        <div className="space-y-4 md:hidden">
                            <SimpleAccordionItem title="Pros" defaultOpen={false}>
                                <ul className="space-y-3">
                                    {tool.pros?.map((pro) => (
                                        <li key={pro} className="flex items-start gap-3 text-base text-foreground">
                                            <Plus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-vibe-link" />
                                            {pro}
                                        </li>
                                    )) || <p className="text-base text-muted-foreground">Information pending.</p>}
                                </ul>
                            </SimpleAccordionItem>

                            <SimpleAccordionItem title="Cons" defaultOpen={false}>
                                <ul className="space-y-3">
                                    {tool.cons?.map((con) => (
                                        <li key={con} className="flex items-start gap-3 text-base text-foreground">
                                            <Minus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                                            {con}
                                        </li>
                                    )) || <p className="text-base text-muted-foreground">Information pending.</p>}
                                </ul>
                            </SimpleAccordionItem>
                        </div>

                        {/* Extended Editorial Content (per-slug long-form) */}
                        {extended && (
                            <section className={`${sectionField} space-y-12`}>
                                {extendedOverviewHtml && (
                                    <div>
                                        <h2 className={`${sectionTitle} mb-6`}>In-Depth Overview</h2>
                                        <div
                                            className="prose prose-zinc max-w-none dark:prose-invert prose-a:text-vibe-link"
                                            dangerouslySetInnerHTML={{ __html: extendedOverviewHtml }}
                                        />
                                    </div>
                                )}

                                {extended.useCases && extended.useCases.length > 0 && (
                                    <div>
                                        <h2 className={`${sectionTitle} mb-6`}>Use Cases</h2>
                                        <div className="grid gap-1 sm:grid-cols-2">
                                            {extended.useCases.map((uc) => (
                                                <div key={uc.title} className="bg-background p-5">
                                                    <h3 className="mb-2 text-[18px] font-semibold text-foreground">
                                                        {uc.title}
                                                    </h3>
                                                    <p className="text-base leading-normal text-muted-foreground">
                                                        {uc.body}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {extended.pricingDetail && (
                                    <div>
                                        <h2 className={`${sectionTitle} mb-4`}>Pricing Detail</h2>
                                        <p className="text-base leading-normal text-muted-foreground md:text-[18px]">
                                            {extended.pricingDetail}
                                        </p>
                                    </div>
                                )}

                                {extended.faq && extended.faq.length > 0 && (
                                    <div>
                                        <h2 className={`${sectionTitle} mb-6`}>Frequently Asked Questions</h2>
                                        <div className="grid gap-1">
                                            {extended.faq.map((item) => (
                                                <div key={item.q} className="bg-background p-5">
                                                    <h3 className="mb-2 text-[18px] font-semibold text-foreground">
                                                        {item.q}
                                                    </h3>
                                                    <p className="text-base leading-normal text-muted-foreground">
                                                        {item.a}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* In-depth Review */}
                        <section className={sectionField}>
                            <h2 className={`${sectionTitle} mb-6`}>Expert Review</h2>
                            {tool.review ? (
                                <div className="space-y-6">
                                    <div className="flex flex-wrap items-center gap-4 bg-background p-4">
                                        <div
                                            className="flex gap-1"
                                            role="img"
                                            aria-label={`${tool.review.rating} out of 5 stars`}
                                        >
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    aria-hidden="true"
                                                    className={`h-6 w-6 ${i < Math.floor(tool.review!.rating) ? "fill-current text-vibe-link" : "text-muted-foreground/40"}`}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-display text-[48px] leading-[0.88] tabular-nums text-foreground">
                                                {tool.review.rating}
                                            </span>
                                            <span className="text-base text-muted-foreground">/ 5.0</span>
                                        </div>
                                    </div>
                                    <div className="prose prose-zinc max-w-none dark:prose-invert">
                                        <p className="text-[18px] leading-normal text-muted-foreground">
                                            {tool.review.content}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-base text-muted-foreground">Full review coming soon.</p>
                            )}
                        </section>

                        {/* User Reviews */}
                        <section className="reveal mt-12">
                            <h2 className={`${sectionTitle} mb-8`}>User Reviews</h2>
                            <div className="grid gap-8">
                                <ReviewForm toolSlug={tool.slug} />
                                <ReviewList toolSlug={tool.slug} />
                            </div>
                        </section>

                        {/* Crawlable links into the site's best-ranking cluster (/compare/*) */}
                        <ToolCompareLinks
                            toolSlug={tool.slug}
                            toolTitle={tool.title}
                            tools={allTools}
                        />

                        {/* Similar Tools */}
                        <RelatedTools
                            currentSlug={tool.slug}
                            category={tool.category}
                            pricing={tool.pricing}
                            tools={allTools}
                            title={`Top Alternatives to ${tool.title}`}
                        />
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6 lg:col-span-1">
                        {/* Promoting a Featured Tool */}
                        {(() => {
                            const relatedAd = allTools.find(t =>
                                t.isFeatured &&
                                t.slug !== tool.slug &&
                                t.category === tool.category
                            ) || allTools.find(t => t.isFeatured && t.slug !== tool.slug);

                            if (!relatedAd) return null;
                            const { icon: _icon, ...toolData } = relatedAd;
                            return <SidebarAd tool={toolData} />;
                        })()}

                        {/* Tool Details Card */}
                        <div className="sticky top-24 bg-card p-6">
                            <h3 className={`${cardTitle} mb-5`}>Tool Details</h3>
                            <dl className="grid gap-1 text-base">
                                <div className="flex items-center justify-between gap-4 bg-background px-4 py-3">
                                    <dt className="text-muted-foreground">Pricing</dt>
                                    <dd className="font-semibold text-foreground">{tool.pricing}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-4 bg-background px-4 py-3">
                                    <dt className="text-muted-foreground">Category</dt>
                                    <dd className="font-semibold text-foreground">{tool.category}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-4 bg-background px-4 py-3">
                                    <dt className="text-muted-foreground">Features</dt>
                                    <dd className="font-semibold tabular-nums text-foreground">{tool.features?.length || 0}</dd>
                                </div>
                                <div className="bg-background px-4 py-3">
                                    <dt className="mb-1 text-muted-foreground">Website</dt>
                                    <dd>
                                        <AffiliateLink
                                            url={tool.affiliateUrl || tool.websiteUrl}
                                            toolSlug={tool.slug}
                                            toolName={tool.title}
                                            variant="link"
                                        >
                                            {tool.websiteUrl.replace('https://', '')}
                                        </AffiliateLink>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </aside>
                </div>
            </Container>

            <ToolSEO tool={tool} />

            {/* Exit Intent Popup */}
            <ExitIntentPopup toolSlug={tool.slug} toolName={tool.title} />
        </PageBackground>
    );
}
