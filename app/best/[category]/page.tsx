import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, X, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AffiliateLink } from "@/components/ui/AffiliateLink";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { SimpleAccordionItem } from "@/components/ui/simple-accordion";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { getTools } from "@/lib/tools-db";
import { BEST_CATEGORIES, getBestCategoryBySlug } from "@/lib/best-categories";
import { ToolData } from "@/lib/tool-types";
import { Section } from "@/components/primitives/Section";

export function generateStaticParams() {
  return BEST_CATEGORIES.map((c) => ({ category: c.slug }));
}

// Only slugs returned by generateStaticParams() are valid routes — otherwise
// any slug rendered a soft-404 "Not Found" page at 200.
export const dynamicParams = false;

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
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://usevibestack.com/tools" },
      { "@type": "ListItem", position: 3, name: copy.heading, item: url },
    ],
  };

  return (
    <PageBackground {...BackgroundPresets.content}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Section spacing="default" containerSize="small">
        {/* Breadcrumb */}
        <nav className="mb-10 flex flex-wrap items-center gap-1 text-[14px] text-muted-foreground">
          <Link href="/" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link">Home</Link>
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
          <Link href="/tools" className="hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link">Tools</Link>
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
          <span className="text-foreground">{copy.heading}</span>
        </nav>

        {/* Hero */}
        <header className="mb-16">
          <p className="mb-6 text-[16px] font-semibold text-vibe-link">
            Updated for 2026
          </p>
          <h1 className="mb-8 font-display text-[clamp(32px,6vw,88px)] text-balance text-foreground">
            {copy.heading}{" "}
            <span className="text-muted-foreground">— Ranked</span>
          </h1>
          <p className="text-[18px] leading-normal text-muted-foreground sm:text-[20px]">{copy.intro}</p>
        </header>

        {/* Buying guide */}
        <section className="mb-16 bg-card p-6 md:p-8">
          <h2 className="mb-4 text-[20px] font-semibold">How we picked</h2>
          <ul className="space-y-2.5">
            {copy.buyingGuide.map((g) => (
              <li key={g} className="flex items-start gap-2 text-[16px] leading-normal text-muted-foreground">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* At-a-glance comparison table */}
        {ranked.length > 0 ? (
          <section className="mb-16">
            <h2 className="mb-6 font-display text-[clamp(32px,4vw,56px)] text-foreground">At a glance</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-1 text-left text-[16px]">
                <thead>
                  <tr className="bg-secondary text-[14px] text-muted-foreground">
                    <th scope="col" className="px-4 py-3 font-semibold">#</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Tool</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Pricing</th>
                    <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">Standout features</th>
                  </tr>
                </thead>
                <tbody>
                  {ranked.map((tool, i) => (
                    <tr key={tool.slug} className="bg-card">
                      <td className="px-4 py-3 font-semibold tabular-nums text-vibe-link">{i + 1}</td>
                      <td className="px-4 py-3">
                        <Link href={`/tool/${tool.slug}`} className="font-semibold transition-colors hover:text-vibe-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link">
                          {tool.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{tool.pricing}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                        {(tool.features ?? []).slice(0, 3).join(", ") || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {/* Ranked list */}
        {ranked.length === 0 ? (
          <p className="mb-16 text-[16px] text-muted-foreground">
            We&apos;re still curating tools for this category.{" "}
            <Link href="/tools" className="font-semibold text-vibe-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link">Browse all tools</Link>.
          </p>
        ) : (
          <div className="mb-16 space-y-1">
            {ranked.map((tool, i) => (
              <article
                key={tool.slug}
                className="bg-card p-6 md:p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="min-w-12 shrink-0 font-display text-[clamp(40px,5vw,64px)] tabular-nums text-vibe-link">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      {/* tool.color is per-item colour data; it no longer renders. */}
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-secondary text-foreground">
                        <ToolIconRenderer slug={tool.slug} className="h-5 w-5" />
                      </span>
                      <h2 className="text-[24px] font-semibold">
                        <Link href={`/tool/${tool.slug}`} className="transition-colors hover:text-vibe-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link">
                          {tool.title}
                        </Link>
                      </h2>
                      <span className="ml-auto shrink-0 bg-secondary px-3 py-1 text-[14px] font-semibold text-foreground">{tool.pricing}</span>
                    </div>
                    <p className="text-[16px] leading-normal text-muted-foreground">{tool.description}</p>
                  </div>
                </div>

                {/* Pros / cons */}
                {(tool.pros?.length || tool.cons?.length) ? (
                  <div className="mb-6 grid gap-1 sm:grid-cols-2">
                    {tool.pros?.length ? (
                      <div className="bg-secondary p-4">
                        <h3 className="mb-2 text-[16px] font-semibold text-foreground">Pros</h3>
                        <ul className="space-y-1.5">
                          {tool.pros.slice(0, 3).map((p) => (
                            <li key={p} className="flex items-start gap-2 text-[16px]">
                              <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {tool.cons?.length ? (
                      <div className="bg-secondary p-4">
                        <h3 className="mb-2 text-[16px] font-semibold text-foreground">Cons</h3>
                        <ul className="space-y-1.5">
                          {tool.cons.slice(0, 3).map((c) => (
                            <li key={c} className="flex items-start gap-2 text-[16px]">
                              <X aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
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
                    label={`Visit ${tool.title}`}
                    className="h-10 px-5"
                  >
                    Visit {tool.title}
                  </AffiliateLink>
                  <Button asChild variant="ghost" size="sm" className="h-10 rounded-none px-4 text-[16px] font-semibold">
                    <Link href={`/tool/${tool.slug}`}>
                      Read full review
                      <ArrowRight aria-hidden="true" className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Long-form editorial body */}
        {copy.body?.length ? (
          <section className="mb-16">
            <h2 className="mb-6 font-display text-[clamp(32px,4vw,56px)] text-foreground">How to choose</h2>
            <div className="space-y-4 text-[16px] leading-normal text-muted-foreground [&_a]:font-semibold [&_a]:text-vibe-link [&_a]:hover:underline [&_strong]:text-foreground">
              {copy.body.map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-6 font-display text-[clamp(32px,4vw,56px)] text-foreground">Frequently asked questions</h2>
          <div className="space-y-1">
            {copy.faqs.map((f) => (
              <SimpleAccordionItem key={f.q} title={f.q}>
                {f.a}
              </SimpleAccordionItem>
            ))}
          </div>
        </section>

        {/* Cross-links to other category pages */}
        <section className="mb-16">
          <h2 className="mb-4 text-[20px] font-semibold">More best-of guides</h2>
          <div className="flex flex-wrap gap-1">
            {BEST_CATEGORIES.filter((c) => c.slug !== copy.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/best/${c.slug}`}
                className="inline-flex items-center gap-1.5 bg-card px-4 py-2.5 text-[16px] font-semibold text-foreground transition-colors duration-150 hover:bg-vibe-electric hover:text-vibe-deep focus-visible:bg-vibe-electric focus-visible:text-vibe-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none"
              >
                {c.heading}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </section>
      </Section>

      {/* Newsletter capture */}
      <NewsletterSection />
    </PageBackground>
  );
}
