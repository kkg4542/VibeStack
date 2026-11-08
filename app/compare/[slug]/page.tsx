import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight, Check, Scale, X } from 'lucide-react';
import { getTools } from '@/lib/tools-db';
import { comparePairs, getCompareEditorial } from '@/lib/compare-content';
import { stacks } from '@/lib/stacks';
import { BEST_CATEGORIES } from '@/lib/best-categories';
import { PageBackground, BackgroundPresets } from '@/components/effects/PageBackground';
import { Button } from '@/components/ui/button';
import { ToolIconRenderer } from '@/components/tools/ToolIconRenderer';
import { Section } from '@/components/primitives/Section';
import { fitTitle } from '@/lib/seo-title';

interface Props {
    params: Promise<{ slug: string }>;
}

function lcFirst(s: string): string {
    return s.charAt(0).toLowerCase() + s.slice(1);
}

/**
 * Pick the longest title variant that survives Google's ~60-character SERP
 * budget. Unlike most surfaces, `/compare/*` never actually renders the root
 * layout's " | VibeStack" suffix — `app/compare/layout.tsx` sets a plain-string
 * `title`, which breaks Next.js's template inheritance for this segment — so
 * we pass an empty suffix to `fitTitle` to spend the full 60 characters on
 * real keywords instead of reserving space for text that won't appear.
 *
 * Deliberately defensive: the richest variant is the existing template, so any
 * pair whose title already fits is returned byte-for-byte unchanged. Only pairs
 * that were being truncated anyway get a shorter form. An editorial `title`
 * always wins — that's the escape hatch for pairs where even the shortest
 * generated variant is too long, or where the phrasing people search for
 * differs from the tools' full product names.
 */
function fitCompareTitle(tool1Title: string, tool2Title: string, custom?: string): string {
    const base = `${tool1Title} vs ${tool2Title}`;
    const variants = [
        `${base} (2026): Features, Pricing & Verdict`,
        `${base} (2026): Features & Pricing`,
        `${base} (2026) Compared`,
        `${base} (2026)`,
        base,
    ];

    return fitTitle(variants, custom, "");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const parts = slug.split('-vs-');

    if (parts.length !== 2) {
        return { title: 'Tool Comparison' };
    }

    const tools = await getTools();
    const tool1 = tools.find(t => t.slug === parts[0]);
    const tool2 = tools.find(t => t.slug === parts[1]);

    if (!tool1 || !tool2) {
        return { title: 'Tool Comparison Not Found' };
    }

    const editorial = getCompareEditorial(slug);
    const title = fitCompareTitle(tool1.title, tool2.title, editorial?.title);
    const description = editorial?.description ??
        `${tool1.title} or ${tool2.title}? Side-by-side comparison of features, pricing, pros & cons — plus a clear verdict on which ${tool1.category.toLowerCase()} tool fits your workflow.`;
    const url = `https://usevibestack.com/compare/${slug}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: 'article',
        }
    };
}

export async function generateStaticParams() {
    const tools = await getTools();
    return comparePairs(tools).map(({ slug }) => ({ slug }));
}

// Only slugs returned by generateStaticParams() are valid routes — otherwise
// any slug rendered a soft-404 "Not Found" page at 200.
export const dynamicParams = false;

export default async function ComparisonSlugPage({ params }: Props) {
    const { slug } = await params;
    const parts = slug.split('-vs-');

    if (parts.length !== 2) {
        notFound();
    }

    const tools = await getTools();
    const tool1 = tools.find(t => t.slug === parts[0]);
    const tool2 = tools.find(t => t.slug === parts[1]);

    if (!tool1 || !tool2) {
        notFound();
    }

    const selectedTools = [tool1, tool2];
    const editorial = getCompareEditorial(slug);
    const url = `https://usevibestack.com/compare/${slug}`;

    // Overview copy: hand-written where available, data-driven otherwise.
    const intro = editorial?.intro ?? [
        `${tool1.title} and ${tool2.title} both compete in the ${tool1.category.toLowerCase()} space, but they take noticeably different approaches. ${tool1.title}: ${tool1.description} ${tool2.title}: ${tool2.description}`,
        `On pricing, ${tool1.title} runs a ${tool1.pricing.toLowerCase()} model while ${tool2.title} is ${tool2.pricing.toLowerCase()}. Feature-wise, ${tool1.title} leans into ${(tool1.features ?? []).slice(0, 3).join(", ") || "its core workflow"}, whereas ${tool2.title} emphasizes ${(tool2.features ?? []).slice(0, 3).join(", ") || "a different set of strengths"}. The sections below break down where each one actually earns its keep.`,
    ];

    const verdict = editorial?.verdict ?? (
        `There is no universal winner between ${tool1.title} and ${tool2.title} — the right pick depends on which trade-offs match your workflow. ` +
        (tool1.pros?.[0] ? `Lean toward ${tool1.title} if ${lcFirst(tool1.pros[0])} is what you need most. ` : '') +
        (tool2.pros?.[0] ? `Lean toward ${tool2.title} if ${lcFirst(tool2.pros[0])} matters more. ` : '') +
        `Both have free trials or entry tiers, so the cheapest research is an afternoon spent testing each against a real task.`
    );

    // FAQ — rendered on-page and mirrored into FAQPage JSON-LD.
    const bothFree = ["Free", "Freemium"].includes(tool1.pricing) && ["Free", "Freemium"].includes(tool2.pricing);
    const freeTool = ["Free", "Freemium"].includes(tool1.pricing) ? tool1 : ["Free", "Freemium"].includes(tool2.pricing) ? tool2 : null;
    const faqs: { q: string; a: string }[] = [
        {
            q: `Is ${tool1.title} better than ${tool2.title}?`,
            a: `Neither is universally better — they optimize for different things. ${tool1.title} stands out for ${(tool1.pros ?? tool1.features ?? []).slice(0, 2).map(lcFirst).join(" and ") || "its core strengths"}, while ${tool2.title} counters with ${(tool2.pros ?? tool2.features ?? []).slice(0, 2).map(lcFirst).join(" and ") || "a different focus"}. Match those strengths to your actual workflow and the "better" tool becomes obvious.`,
        },
        {
            q: `Which is cheaper, ${tool1.title} or ${tool2.title}?`,
            a: `${tool1.title} uses a ${tool1.pricing.toLowerCase()} model and ${tool2.title} is ${tool2.pricing.toLowerCase()}. ${bothFree ? "Both let you start free, so total cost depends on which paid tier you eventually need." : freeTool ? `${freeTool.title} is the lower-risk starting point since you can begin without paying.` : "Neither has a meaningful free tier, so compare the paid plans against your expected usage."} Always verify current pricing on the official sites — plans change frequently.`,
        },
        {
            q: `Can I use ${tool1.title} and ${tool2.title} together?`,
            a: `Yes — nothing stops you from running both, and many ${tool1.category.toLowerCase()} workflows pair them deliberately: use each tool for the part of the job it does best, then consolidate later once a clear favorite emerges. The main cost of running both is subscription overlap, not compatibility.`,
        },
        {
            q: `Which should a beginner start with?`,
            a: freeTool
                ? `Start with ${freeTool.title}: its ${freeTool.pricing.toLowerCase()} tier means you can learn the workflow without commitment, then evaluate whether ${freeTool.slug === tool1.slug ? tool2.title : tool1.title} solves anything you're still missing.`
                : `Start with whichever offers a trial for your use case, and give it a real project rather than a toy test — differences between ${tool1.title} and ${tool2.title} only show up under realistic workloads.`,
        },
        ...(editorial?.faqs ?? []),
    ];

    // Related comparisons that share a tool with this page, from the same
    // capped pair set the sitemap publishes.
    const related = comparePairs(tools)
        .filter(p => p.slug !== slug)
        .filter(p =>
            p.t1.slug === tool1.slug || p.t2.slug === tool1.slug ||
            p.t1.slug === tool2.slug || p.t2.slug === tool2.slug
        )
        .slice(0, 8);

    // Category hub for tool1, plus every curated stack featuring either tool —
    // server-rendered internal links so crawlers can walk between hubs.
    const bestCategory = BEST_CATEGORIES.find(c => c.category === tool1.category);
    const relatedStacks = stacks.filter(
        s => s.tools.includes(tool1.slug) || s.tools.includes(tool2.slug)
    );

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://usevibestack.com" },
            { "@type": "ListItem", position: 2, name: "Compare", item: "https://usevibestack.com/compare" },
            { "@type": "ListItem", position: 3, name: `${tool1.title} vs ${tool2.title}`, item: url },
        ],
    };

    return (
        <PageBackground {...BackgroundPresets.content}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            <Section spacing="small" containerSize="large">
                {/* Breadcrumb + actions. Plain server HTML: no entrance animation,
                    so everything is visible without JavaScript. */}
                <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <nav className="flex flex-wrap items-center gap-1 text-[14px] text-muted-foreground">
                        <Link href="/" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link">Home</Link>
                        <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                        <Link href="/compare" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link">Compare</Link>
                        <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                        <span className="text-foreground">{tool1.title} vs {tool2.title}</span>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Button variant="secondary" className="rounded-none" asChild>
                            <Link href={`/compare?tools=${tool1.slug},${tool2.slug}`}>
                                <Scale aria-hidden="true" className="mr-2 h-4 w-4" />
                                Interactive Compare
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Title Section */}
                <div className="mb-16 max-w-5xl">
                    <p className="mb-6 text-[16px] font-semibold text-vibe-link">{tool1.category} Showdown · Updated for 2026</p>
                    {/* tool.bgGradient is per-item colour data; in direction B it no longer renders. */}
                    <h1 className="mb-8 font-display text-[clamp(36px,5.5vw,88px)] text-balance text-foreground">
                        <span>{tool1.title}</span>{" "}
                        <span className="text-muted-foreground">vs</span>{" "}
                        <span>{tool2.title}</span>
                    </h1>
                    <p className="max-w-2xl text-[18px] leading-normal text-muted-foreground sm:text-[20px]">
                        Features, pricing, pros & cons — and a clear verdict on which {tool1.category.toLowerCase()} tool fits your workflow.
                    </p>
                </div>

                {/* Overview */}
                <div className="mb-16 max-w-3xl">
                    <h2 className="mb-6 font-display text-[clamp(32px,4vw,56px)] text-foreground">Overview</h2>
                    <div className="space-y-4 text-[16px] leading-normal text-muted-foreground">
                        {intro.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </div>

                {/* Comparison Cards (Side by Side) */}
                <div className="mb-16 grid max-w-5xl gap-1 md:grid-cols-2">
                    {selectedTools.map((tool, index) => (
                        <div key={tool.slug} className="h-full bg-card p-8">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-secondary text-foreground">
                                    <ToolIconRenderer slug={tool.slug} className="h-10 w-10" />
                                </div>
                                <div>
                                    <h2 className="text-[24px] font-semibold">{tool.title}</h2>
                                    <p className="mt-1 text-[16px] text-muted-foreground">{tool.pricing}</p>
                                </div>
                            </div>

                            <p className="mb-6 min-h-[50px] text-[16px] leading-normal text-muted-foreground">
                                {tool.description}
                            </p>

                            <Button
                                className={`mb-8 h-12 w-full rounded-none text-[16px] font-semibold shadow-none ${index === 0 ? "bg-vibe-electric text-vibe-deep hover:bg-vibe-electric/90" : ""}`}
                                variant={index === 0 ? "default" : "secondary"}
                                asChild
                            >
                                <Link href={`/tool/${tool.slug}`}>
                                    View Full Review
                                </Link>
                            </Button>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-3 flex items-center gap-2 text-[16px] font-semibold">
                                        <Check aria-hidden="true" className="h-4 w-4" /> Key Features
                                    </h3>
                                    <ul className="space-y-2 text-[16px] text-muted-foreground">
                                        {tool.features?.slice(0, 5).map(f => (
                                            <li key={f} className="flex items-start gap-2">
                                                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-muted-foreground" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Feature Comparison Table */}
                <div className="max-w-4xl">
                    <h2 className="mb-8 font-display text-[clamp(32px,4vw,56px)] text-foreground">Feature Breakdown</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-1 text-[16px]">
                            <thead>
                                <tr className="bg-secondary">
                                    <th scope="col" className="w-1/3 px-4 py-4 text-left font-semibold">Feature</th>
                                    <th scope="col" className="w-1/3 px-4 py-4 text-left text-[18px] font-semibold">{tool1.title}</th>
                                    <th scope="col" className="w-1/3 px-4 py-4 text-left text-[18px] font-semibold">{tool2.title}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-card">
                                    <th scope="row" className="px-4 py-4 text-left font-semibold text-muted-foreground">Pricing Model</th>
                                    <td className="px-4 py-4 font-semibold">{tool1.pricing}</td>
                                    <td className="px-4 py-4 font-semibold">{tool2.pricing}</td>
                                </tr>
                                <tr className="bg-card">
                                    <th scope="row" className="px-4 py-4 text-left align-top font-semibold text-muted-foreground">Standout Features</th>
                                    <td className="px-4 py-4 align-top text-muted-foreground">
                                        {(tool1.features ?? []).slice(0, 3).join(" · ") || "—"}
                                    </td>
                                    <td className="px-4 py-4 align-top text-muted-foreground">
                                        {(tool2.features ?? []).slice(0, 3).join(" · ") || "—"}
                                    </td>
                                </tr>
                                <tr className="bg-card">
                                    <th scope="row" className="px-4 py-4 text-left align-top font-semibold text-muted-foreground">Pros</th>
                                    <td className="px-4 py-4 align-top">
                                        <ul className="space-y-2 text-foreground">
                                            {tool1.pros?.map(p => <li key={p}>+ {p}</li>)}
                                        </ul>
                                    </td>
                                    <td className="px-4 py-4 align-top">
                                        <ul className="space-y-2 text-foreground">
                                            {tool2.pros?.map(p => <li key={p}>+ {p}</li>)}
                                        </ul>
                                    </td>
                                </tr>
                                <tr className="bg-card">
                                    <th scope="row" className="px-4 py-4 text-left align-top font-semibold text-muted-foreground">Cons</th>
                                    <td className="px-4 py-4 align-top">
                                        <ul className="space-y-2 text-muted-foreground">
                                            {tool1.cons?.map(c => <li key={c}>- {c}</li>)}
                                        </ul>
                                    </td>
                                    <td className="px-4 py-4 align-top">
                                        <ul className="space-y-2 text-muted-foreground">
                                            {tool2.cons?.map(c => <li key={c}>- {c}</li>)}
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Choose X / Choose Y */}
                <div className="mt-20 max-w-4xl">
                    <h2 className="mb-8 font-display text-[clamp(32px,4vw,56px)] text-foreground">Which one is right for you?</h2>
                    <div className="grid gap-1 md:grid-cols-2">
                        {selectedTools.map((tool) => (
                            <div key={tool.slug} className="bg-card p-6">
                                <h3 className="mb-4 text-[20px] font-semibold">
                                    Choose <span className="text-vibe-link">{tool.title}</span> if…
                                </h3>
                                <ul className="space-y-3">
                                    {(tool.pros ?? []).slice(0, 4).map((p) => (
                                        <li key={p} className="flex items-start gap-2 text-[16px] text-muted-foreground">
                                            <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                                            <span>{p} matters to your workflow</span>
                                        </li>
                                    ))}
                                    {(tool.cons ?? []).slice(0, 1).map((c) => (
                                        <li key={c} className="flex items-start gap-2 text-[16px] text-muted-foreground">
                                            <X aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                                            <span>…and you can live with: {lcFirst(c)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Verdict: the one inverse field on the page. */}
                <div className="mt-20 max-w-4xl bg-foreground p-8 text-background md:p-12">
                    <h2 className="mb-4 font-display text-[clamp(32px,4vw,56px)]">Our verdict</h2>
                    <p className="text-[18px] leading-normal">{verdict}</p>
                </div>

                {/* FAQ Section */}
                <div className="mt-20 max-w-3xl">
                    <h2 className="mb-8 font-display text-[clamp(32px,4vw,56px)] text-foreground">Frequently Asked Questions</h2>
                    <div className="space-y-1 text-left">
                        {faqs.map((f) => (
                            <div key={f.q} className="bg-card p-6">
                                <h3 className="mb-2 text-[18px] font-semibold">{f.q}</h3>
                                <p className="text-[16px] leading-normal text-muted-foreground">{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related comparisons */}
                {related.length > 0 && (
                    <div className="mt-20 max-w-4xl">
                        <h2 className="mb-4 text-[20px] font-semibold">Related comparisons</h2>
                        <div className="flex flex-wrap gap-1">
                            {related.map((r) => (
                                <Link
                                    key={r.slug}
                                    href={`/compare/${r.slug}`}
                                    className="inline-flex items-center gap-1.5 bg-card px-4 py-2.5 text-[16px] font-semibold text-foreground transition-colors duration-150 hover:bg-vibe-electric hover:text-vibe-deep focus-visible:bg-vibe-electric focus-visible:text-vibe-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none"
                                >
                                    {r.label}
                                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Category hub + curated stacks — static server-rendered links */}
                <nav aria-label="Keep exploring" className="mt-16 max-w-4xl">
                    <h2 className="mb-4 text-[20px] font-semibold">Keep exploring</h2>
                    <div className="flex flex-wrap gap-1">
                        {bestCategory && (
                            <Link
                                href={`/best/${bestCategory.slug}`}
                                className="inline-flex items-center gap-1.5 bg-card px-4 py-2.5 text-[16px] font-semibold text-foreground transition-colors duration-150 hover:bg-vibe-electric hover:text-vibe-deep focus-visible:bg-vibe-electric focus-visible:text-vibe-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none"
                            >
                                Best {tool1.category.toLowerCase()} tools
                                <ArrowRight aria-hidden="true" className="h-4 w-4" />
                            </Link>
                        )}
                        {relatedStacks.map((s) => (
                            <Link
                                key={s.id}
                                href={`/stack/${s.id}`}
                                className="inline-flex items-center gap-1.5 bg-card px-4 py-2.5 text-[16px] font-semibold text-foreground transition-colors duration-150 hover:bg-vibe-electric hover:text-vibe-deep focus-visible:bg-vibe-electric focus-visible:text-vibe-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none"
                            >
                                {s.name}
                                <ArrowRight aria-hidden="true" className="h-4 w-4" />
                            </Link>
                        ))}
                    </div>
                    <div className="mt-6">
                        <Link href="/tools" className="group inline-flex items-center text-[16px] font-semibold text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none">
                            <ArrowLeft aria-hidden="true" className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                            Browse the full tool directory
                        </Link>
                    </div>
                </nav>
            </Section>
        </PageBackground>
    );
}
