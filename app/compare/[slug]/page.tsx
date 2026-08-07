import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight, Check, Scale, X } from 'lucide-react';
import { getTools } from '@/lib/tools-db';
import { comparePairs, getCompareEditorial } from '@/lib/compare-content';
import { stacks } from '@/lib/stacks';
import { BEST_CATEGORIES } from '@/lib/best-categories';
import { PageBackground, BackgroundPresets } from '@/components/effects/PageBackground';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ToolIconRenderer } from '@/components/tools/ToolIconRenderer';
import { MotionDiv } from "@/components/ui/motion-wrapper";
import { designSystem } from '@/lib/design-system';

interface Props {
    params: Promise<{ slug: string }>;
}

function lcFirst(s: string): string {
    return s.charAt(0).toLowerCase() + s.slice(1);
}

/** Appended by the root layout's title template (app/layout.tsx). */
const TITLE_SUFFIX = " | VibeStack";
/** Google truncates SERP titles somewhere around here. */
const TITLE_MAX_LENGTH = 60;

/**
 * Pick the longest title variant that survives Google's ~60-character SERP
 * budget once " | VibeStack" is appended.
 *
 * Deliberately defensive: the richest variant is the existing template, so any
 * pair whose title already fits is returned byte-for-byte unchanged. Only pairs
 * that were being truncated anyway get a shorter form. An editorial `title`
 * always wins — that's the escape hatch for pairs where even the shortest
 * generated variant is too long, or where the phrasing people search for
 * differs from the tools' full product names.
 */
function fitCompareTitle(tool1Title: string, tool2Title: string, custom?: string): string {
    if (custom) return custom;

    const base = `${tool1Title} vs ${tool2Title}`;
    const variants = [
        `${base} (2026): Features, Pricing & Verdict`,
        `${base} (2026): Features & Pricing`,
        `${base} (2026) Compared`,
        `${base} (2026)`,
        base,
    ];

    return (
        variants.find((v) => v.length + TITLE_SUFFIX.length <= TITLE_MAX_LENGTH) ??
        variants[variants.length - 1]
    );
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

    const title = fitCompareTitle(tool1.title, tool2.title, getCompareEditorial(slug)?.title);
    const description = `${tool1.title} or ${tool2.title}? Side-by-side comparison of features, pricing, pros & cons — plus a clear verdict on which ${tool1.category.toLowerCase()} tool fits your workflow.`;
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

            <div className="container mx-auto max-w-7xl px-4 py-8">
                {/* Breadcrumb + actions */}
                <MotionDiv
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
                >
                    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-foreground">Home</Link>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <Link href="/compare" className="hover:text-foreground">Compare</Link>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="text-foreground">{tool1.title} vs {tool2.title}</span>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link href={`/compare?tools=${tool1.slug},${tool2.slug}`}>
                            <Button variant="outline" className="rounded-full">
                                <Scale className="h-4 w-4 mr-2" />
                                Interactive Compare
                            </Button>
                        </Link>
                    </div>
                </MotionDiv>

                {/* Title Section */}
                <MotionDiv
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.1 }}
                    className="mb-12 text-center"
                >
                    <Badge variant="outline" className="mb-4 bg-muted/50">{tool1.category} Showdown · Updated for 2026</Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance tracking-tight">
                        <span className={`bg-clip-text text-transparent bg-linear-to-r ${tool1.bgGradient || 'from-foreground to-foreground'}`}>
                            {tool1.title}
                        </span>
                        <span className="text-muted-foreground mx-4 font-light">vs</span>
                        <span className={`bg-clip-text text-transparent bg-linear-to-r ${tool2.bgGradient || 'from-foreground to-foreground'}`}>
                            {tool2.title}
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Features, pricing, pros & cons — and a clear verdict on which {tool1.category.toLowerCase()} tool fits your workflow.
                    </p>
                </MotionDiv>

                {/* Overview */}
                <MotionDiv
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.15 }}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        {intro.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </MotionDiv>

                {/* Comparison Cards (Side by Side) */}
                <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
                    {selectedTools.map((tool, index) => (
                        <MotionDiv
                            key={tool.slug}
                            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-vibe-electric/5 to-transparent rounded-3xl blur-xl" />
                            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-4 rounded-2xl bg-linear-to-br ${tool.bgGradient || "from-slate-500 to-slate-800"} shadow-lg`}>
                                            <ToolIconRenderer slug={tool.slug} className="h-10 w-10 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">{tool.title}</h2>
                                            <Badge variant="secondary" className="mt-1">{tool.pricing}</Badge>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-6 min-h-[50px]">
                                        {tool.description}
                                    </p>

                                    <Link href={`/tool/${tool.slug}`} className="block mb-8">
                                        <Button className="w-full h-12 rounded-full text-lg" variant={index === 0 ? "default" : "outline"}>
                                            View Full Review
                                        </Button>
                                    </Link>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                                <Check className="h-4 w-4 text-emerald-500" /> Key Features
                                            </h3>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                {tool.features?.slice(0, 5).map(f => (
                                                    <li key={f} className="flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 shrink-0" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </MotionDiv>
                    ))}
                </div>

                {/* Feature Comparison Table */}
                <MotionDiv
                    initial={designSystem.animations.fadeInUp.initial}
                    whileInView={designSystem.animations.fadeInUp.animate}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur">
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold mb-6 text-center">Feature Breakdown</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="py-4 text-left w-1/3">Feature</th>
                                            <th className="py-4 text-center w-1/3 text-lg font-semibold">{tool1.title}</th>
                                            <th className="py-4 text-center w-1/3 text-lg font-semibold">{tool2.title}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40">
                                        <tr>
                                            <td className="py-4 font-medium text-muted-foreground">Pricing Model</td>
                                            <td className="py-4 text-center">
                                                <Badge variant="secondary" className="text-base px-3 py-1">{tool1.pricing}</Badge>
                                            </td>
                                            <td className="py-4 text-center">
                                                <Badge variant="secondary" className="text-base px-3 py-1">{tool2.pricing}</Badge>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 font-medium text-muted-foreground align-top pt-6">Standout Features</td>
                                            <td className="py-4 px-4 align-top text-sm text-muted-foreground">
                                                {(tool1.features ?? []).slice(0, 3).join(" · ") || "—"}
                                            </td>
                                            <td className="py-4 px-4 align-top text-sm text-muted-foreground">
                                                {(tool2.features ?? []).slice(0, 3).join(" · ") || "—"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 font-medium text-muted-foreground align-top pt-6">Pros</td>
                                            <td className="py-4 px-4 align-top">
                                                <ul className="space-y-2 text-sm text-emerald-600 dark:text-emerald-400">
                                                    {tool1.pros?.map(p => <li key={p}>+ {p}</li>)}
                                                </ul>
                                            </td>
                                            <td className="py-4 px-4 align-top">
                                                <ul className="space-y-2 text-sm text-emerald-600 dark:text-emerald-400">
                                                    {tool2.pros?.map(p => <li key={p}>+ {p}</li>)}
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 font-medium text-muted-foreground align-top pt-6">Cons</td>
                                            <td className="py-4 px-4 align-top">
                                                <ul className="space-y-2 text-sm text-rose-600 dark:text-rose-400">
                                                    {tool1.cons?.map(c => <li key={c}>- {c}</li>)}
                                                </ul>
                                            </td>
                                            <td className="py-4 px-4 align-top">
                                                <ul className="space-y-2 text-sm text-rose-600 dark:text-rose-400">
                                                    {tool2.cons?.map(c => <li key={c}>- {c}</li>)}
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                </MotionDiv>

                {/* Choose X / Choose Y */}
                <MotionDiv
                    initial={designSystem.animations.fadeInUp.initial}
                    whileInView={designSystem.animations.fadeInUp.animate}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mt-16"
                >
                    <h2 className="text-2xl font-bold mb-8 text-center">Which one is right for you?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {selectedTools.map((tool) => (
                            <Card key={tool.slug} className="border-border/50 bg-card/60">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-4">
                                        Choose <span className="text-vibe-electric">{tool.title}</span> if…
                                    </h3>
                                    <ul className="space-y-3">
                                        {(tool.pros ?? []).slice(0, 4).map((p) => (
                                            <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                                <span>{p} matters to your workflow</span>
                                            </li>
                                        ))}
                                        {(tool.cons ?? []).slice(0, 1).map((c) => (
                                            <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <X className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
                                                <span>…and you can live with: {lcFirst(c)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </MotionDiv>

                {/* Verdict */}
                <MotionDiv
                    initial={designSystem.animations.fadeInUp.initial}
                    whileInView={designSystem.animations.fadeInUp.animate}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mt-16"
                >
                    <Card className="border-vibe-electric/20 bg-linear-to-br from-vibe-electric/5 to-vibe-purple/5">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold mb-4">Our verdict</h2>
                            <p className="text-muted-foreground leading-relaxed">{verdict}</p>
                        </CardContent>
                    </Card>
                </MotionDiv>

                {/* FAQ Section */}
                <MotionDiv
                    initial={designSystem.animations.fadeInUp.initial}
                    whileInView={designSystem.animations.fadeInUp.animate}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mt-20"
                >
                    <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6 text-left">
                        {faqs.map((f) => (
                            <div key={f.q} className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                                <h3 className="font-semibold text-lg mb-2">{f.q}</h3>
                                <p className="text-muted-foreground">{f.a}</p>
                            </div>
                        ))}
                    </div>
                </MotionDiv>

                {/* Related comparisons */}
                {related.length > 0 && (
                    <MotionDiv
                        initial={designSystem.animations.fadeInUp.initial}
                        whileInView={designSystem.animations.fadeInUp.animate}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto mt-20"
                    >
                        <h2 className="text-lg font-bold mb-4">Related comparisons</h2>
                        <div className="flex flex-wrap gap-2">
                            {related.map((r) => (
                                <Link
                                    key={r.slug}
                                    href={`/compare/${r.slug}`}
                                    className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-vibe-electric/50 transition-colors"
                                >
                                    {r.label}
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            ))}
                        </div>
                    </MotionDiv>
                )}

                {/* Category hub + curated stacks — static server-rendered links */}
                <nav aria-label="Keep exploring" className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-lg font-bold mb-4">Keep exploring</h2>
                    <div className="flex flex-wrap gap-2">
                        {bestCategory && (
                            <Link
                                href={`/best/${bestCategory.slug}`}
                                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-vibe-electric/50 transition-colors"
                            >
                                Best {tool1.category.toLowerCase()} tools
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        )}
                        {relatedStacks.map((s) => (
                            <Link
                                key={s.id}
                                href={`/stack/${s.id}`}
                                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-vibe-electric/50 transition-colors"
                            >
                                {s.name}
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        ))}
                    </div>
                    <div className="mt-6">
                        <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Browse the full tool directory
                        </Link>
                    </div>
                </nav>
            </div>
        </PageBackground>
    );
}
