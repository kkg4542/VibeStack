import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ComparePageClient from "./ComparePageClient";
import { CompareDirectory } from "@/components/seo/CompareDirectory";
import { Container } from "@/components/primitives/Container";
import { getTools } from "@/lib/tools-db";
import { comparePairs } from "@/lib/compare-content";
import { designSystem } from "@/lib/design-system";

const SITE_URL = "https://usevibestack.com";

export const metadata: Metadata = {
    title: "Compare AI Tools",
    description: "Side-by-side comparisons of AI developer tools — features, pricing, and which one fits your workflow.",
    alternates: { canonical: "https://usevibestack.com/compare" },
    openGraph: {
        title: "Compare AI Tools - VibeStack",
        description: "Side-by-side comparisons of AI developer tools — features, pricing, and which one fits your workflow.",
        type: "website",
        url: "https://usevibestack.com/compare",
    },
    twitter: {
        card: "summary_large_image",
        title: "Compare AI Tools - VibeStack",
        description: "Side-by-side comparisons of AI developer tools — features, pricing, and which one fits your workflow.",
    },
};

/** "a, b and c" — used to read the live category counts out as a sentence. */
function sentenceList(parts: string[]): string {
    if (parts.length <= 1) return parts[0] ?? "";
    return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

/**
 * What each published comparison page actually contains. Mirrors the section
 * headings rendered by app/compare/[slug]/page.tsx — if that template gains or
 * loses a section, change this list with it rather than letting the two drift.
 */
const COMPARISON_SECTIONS = [
    {
        title: "Overview",
        body: "What each tool is built for, and the honest reason someone reaches for one over the other.",
    },
    {
        title: "Side-by-side cards",
        body: "Category, pricing tier, key features and — where a tool has one — its rating, in two columns you can scan.",
    },
    {
        title: "Feature breakdown",
        body: "One table covering pricing model, standout features, pros and cons for both tools.",
    },
    {
        title: "Which one is right for you",
        body: "The kind of work each tool suits, written as a choice rather than a feature dump.",
    },
    {
        title: "Our verdict",
        body: "A direct call on which to pick, and when the other one is the better answer.",
    },
    {
        title: "FAQs",
        body: "The specific questions people ask about that pair, plus links to related comparisons.",
    },
];

/**
 * The /compare hub renders its identity, its explanatory copy and its schema on
 * the server.
 *
 * ComparePageClient reads `useSearchParams` and starts in a loading state, so
 * the whole Suspense subtree — including its heading — is absent from the
 * prerendered HTML. That left the parent of 50 comparison pages with no H1, no
 * structured data and barely any text. Everything below that isn't interactive
 * is rendered here instead.
 */
export default async function ComparePage() {
    // Same read CompareDirectory performs below, and the same pair set the
    // sitemap and generateStaticParams use, so the ItemList can't list a URL
    // that isn't published.
    const tools = await getTools();
    const comparisons = comparePairs(tools);

    // Pairings are same-category by construction (see comparePairs), so t1's
    // category describes the whole pair.
    const byCategory = new Map<string, number>();
    for (const pair of comparisons) {
        byCategory.set(pair.t1.category, (byCategory.get(pair.t1.category) ?? 0) + 1);
    }
    const categorySentence = sentenceList(
        [...byCategory.entries()]
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .map(([category, count]) => `${category} (${count})`)
    );

    const faqs = [
        {
            q: "How are the comparisons chosen?",
            a: `Every page pairs two tools from the same category in the directory — coding with coding, design with design — because a code editor and an image generator have nothing meaningful to line up. There are ${comparisons.length} published comparisons today, and all of them are listed at the bottom of this page.`,
        },
        {
            q: "Can I compare more than two tools at once?",
            a: "Yes. The comparison builder on this page holds up to three tools side by side. Add them with the Compare button on any tool card in the directory or on a category page, then use Share to copy a link to the result.",
        },
        {
            q: "Are the prices on these pages current?",
            a: "Pricing is shown as a tier — Free, Freemium, Paid or Enterprise — rather than a live number, because vendors change their plans faster than any directory can follow. Each tool page links straight to the vendor, so check the current price there before you commit to anything.",
        },
        {
            q: "Why isn't a particular pairing here?",
            a: "Either the two tools sit in different categories, or the pair falls outside the published set — VibeStack keeps a fixed number of comparison pages instead of generating every possible combination, so the ones that exist stay maintained. When a pairing is missing, the two tool pages carry the same features, pricing and pros-and-cons detail a comparison would draw on.",
        },
    ];

    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "AI tool comparisons",
        description: "Every published head-to-head comparison on VibeStack.",
        numberOfItems: comparisons.length,
        itemListElement: comparisons.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            url: `${SITE_URL}/compare/${c.slug}`,
        })),
    };

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
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
            { "@type": "ListItem", position: 3, name: "Compare AI Tools", item: `${SITE_URL}/compare` },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            {/* Hub identity. Plain server HTML — no framer wrappers — so it is
                in the prerendered response and visible without JavaScript. */}
            <section className="relative pt-24">
                <Container size="default">
                    <div className="max-w-3xl">
                        <h1 className={`${designSystem.typography.hero} mb-6 leading-tight`}>
                            Compare{" "}
                            <span className="text-gradient-brand">AI tools</span>{" "}
                            side by side
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground mb-5 leading-relaxed">
                            Every comparison here puts two tools from the same category next to
                            each other: what they do, what they cost, what they are bad at, and a
                            plain verdict on which one fits which kind of work.
                        </p>
                        {comparisons.length > 0 && (
                            <p className="text-base text-muted-foreground leading-relaxed">
                                There are {comparisons.length} published comparisons, drawn from the{" "}
                                <Link href="/tools" className="text-vibe-link hover:underline">
                                    {tools.length} tools in the directory
                                </Link>
                                {categorySentence ? <> — {categorySentence}</> : null}. Pairings are
                                always within a category, so you are choosing between two tools that
                                could genuinely replace each other rather than reading a feature
                                list for two products that do different jobs.
                            </p>
                        )}
                    </div>
                </Container>
            </section>

            {/* ComparePageClient reads useSearchParams — the Suspense boundary
                keeps this route statically generated. Its subtree is not
                server-rendered, which is why everything above and below it is. */}
            <Suspense fallback={null}>
                <ComparePageClient />
            </Suspense>

            <Container size="default">
                <section className="border-t border-border/60 pt-12">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                        What every comparison covers
                    </h2>
                    <p className="text-sm text-muted-foreground mb-8 max-w-3xl">
                        The pages follow the same structure, so you can skim two of them and know
                        you are looking at the same things in the same order.
                    </p>
                    <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                        {COMPARISON_SECTIONS.map((section) => (
                            <div key={section.title}>
                                <dt className="text-sm font-semibold text-foreground mb-1">
                                    {section.title}
                                </dt>
                                <dd className="text-sm text-muted-foreground leading-relaxed">
                                    {section.body}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section className="mt-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        How to read one of these
                    </h2>
                    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                        <p>
                            Start at the verdict. It names the situation each tool is the right
                            answer for, which is usually enough to rule one of them out in a
                            sentence. Then work backwards into the feature table if the decision
                            is closer than that.
                        </p>
                        <p>
                            Treat the pricing row as a shape, not a quote. Tools are tagged Free,
                            Freemium, Paid or Enterprise, which tells you whether you can try
                            something this afternoon or need to talk to a sales team — but the
                            actual number belongs to the vendor, and the tool pages link straight
                            there so you can check it.
                        </p>
                        <p>
                            The cons sections are the part worth slowing down for. Two tools can
                            both be good and still not be interchangeable for you; the thing that
                            decides it is almost always a limitation you can live with in one and
                            not the other. If neither comes out ahead, that is a real answer too —
                            plenty of people run both and use each for what it is best at.
                        </p>
                    </div>
                </section>

                {faqs.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-semibold text-foreground mb-6">
                            Questions about these comparisons
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 max-w-5xl">
                            {faqs.map((f) => (
                                <div key={f.q} className="rounded-2xl border border-border/50 bg-card p-5">
                                    <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </Container>

            <Container className="pb-16">
                <CompareDirectory />
            </Container>
        </>
    );
}
