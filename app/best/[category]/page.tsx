import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, X, Star, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AffiliateLink } from "@/components/ui/AffiliateLink";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { SimpleAccordionItem } from "@/components/ui/simple-accordion";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { getTools } from "@/lib/tools-db";
import { BEST_CATEGORIES, getBestCategoryBySlug } from "@/lib/best-categories";
import { ToolData } from "@/lib/tool-types";

export function generateStaticParams() {
  return BEST_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const copy = getBestCategoryBySlug(category);
  if (!copy) return { title: "Not Found" };

  const url = `https://usevibestack.com/best/${copy.slug}`;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url,
      type: "article",
    },
  };
}

// Rank tools: featured first, then by feature richness, cap at 12.
function rankTools(tools: ToolData[]): ToolData[] {
  return [...tools]
    .sort((a, b) => {
      if (!!b.isFeatured !== !!a.isFeatured) return b.isFeatured ? 1 : -1;
      return (b.features?.length ?? 0) - (a.features?.length ?? 0);
    })
    .slice(0, 12);
}

export default async function BestCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const copy = getBestCategoryBySlug(category);
  if (!copy) notFound();

  let allTools: ToolData[] = [];
  try {
    allTools = await getTools();
  } catch {
    allTools = [];
  }

  const ranked = rankTools(allTools.filter((t) => t.category === copy.category));
  const url = `https://usevibestack.com/best/${copy.slug}`;

  // ItemList JSON-LD — eligible for "list" rich results
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.heading,
    itemListElement: ranked.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.title,
      url: `https://usevibestack.com/tool/${tool.slug}`,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "Best", item: "https://usevibestack.com/best" },
      { "@type": "ListItem", position: 3, name: copy.heading, item: url },
    ],
  };

  return (
    <PageBackground {...BackgroundPresets.content}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="container max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{copy.heading}</span>
        </nav>

        {/* Hero */}
        <header className="mb-12">
          <Badge variant="outline" className="mb-4 border-vibe-electric/30 bg-vibe-electric/10 text-vibe-electric">
            Updated for 2026
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            {copy.heading}{" "}
            <span className="text-muted-foreground font-normal">— Ranked</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{copy.intro}</p>
        </header>

        {/* Buying guide */}
        <section className="mb-12 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold mb-4">How we picked</h2>
          <ul className="space-y-2.5">
            {copy.buyingGuide.map((g) => (
              <li key={g} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ranked list */}
        {ranked.length === 0 ? (
          <p className="text-muted-foreground mb-12">
            We&apos;re still curating tools for this category.{" "}
            <Link href="/tools" className="text-vibe-electric hover:underline">Browse all tools</Link>.
          </p>
        ) : (
          <div className="space-y-6 mb-16">
            {ranked.map((tool, i) => (
              <article
                key={tool.slug}
                className="rounded-2xl border border-border bg-card p-6 md:p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/50 border border-border/40 text-2xl font-bold text-vibe-electric">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <ToolIconRenderer slug={tool.slug} className={`h-5 w-5 ${tool.color || ""}`} />
                      <h2 className="text-xl font-bold">
                        <Link href={`/tool/${tool.slug}`} className="hover:text-vibe-electric transition-colors">
                          {tool.title}
                        </Link>
                      </h2>
                      <Badge variant="secondary" className="ml-auto shrink-0">{tool.pricing}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </div>

                {/* Pros / cons */}
                {(tool.pros?.length || tool.cons?.length) ? (
                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    {tool.pros?.length ? (
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-emerald-500 mb-2">Pros</div>
                        <ul className="space-y-1.5">
                          {tool.pros.slice(0, 3).map((p) => (
                            <li key={p} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {tool.cons?.length ? (
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-rose-400 mb-2">Cons</div>
                        <ul className="space-y-1.5">
                          {tool.cons.slice(0, 3).map((c) => (
                            <li key={c} className="flex items-start gap-2 text-sm">
                              <X className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className="flex flex-wrap items-center gap-3">
                  <AffiliateLink
                    url={tool.affiliateUrl || tool.websiteUrl}
                    toolSlug={tool.slug}
                    toolName={tool.title}
                    className="h-10 px-5"
                  >
                    Visit {tool.title}
                  </AffiliateLink>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/tool/${tool.slug}`}>
                      Read full review
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {copy.faqs.map((f) => (
              <SimpleAccordionItem key={f.q} title={f.q}>
                {f.a}
              </SimpleAccordionItem>
            ))}
          </div>
        </section>

        {/* Cross-links to other category pages */}
        <section className="mb-16">
          <h2 className="text-lg font-bold mb-4">More best-of guides</h2>
          <div className="flex flex-wrap gap-2">
            {BEST_CATEGORIES.filter((c) => c.slug !== copy.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/best/${c.slug}`}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-vibe-electric/50 transition-colors"
              >
                {c.heading}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Newsletter capture */}
      <NewsletterSection />
    </PageBackground>
  );
}
