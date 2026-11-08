import { getVerifiedTestimonials, getFeaturedStackRanking, resolveFeaturedStacks } from "@/lib/data/stacks";
import { getTools } from "@/lib/tools-db";
import { stacks } from "@/lib/stacks";
import { VibeHero } from "@/components/landing/VibeHero";
import type { StackPick } from "@/components/landing/StackPicker";
import { ToolCategories } from "@/components/landing/ToolCategories";
import { PopularTools } from "@/components/landing/PopularTools";
import { FeaturedStacks } from "@/components/landing/FeaturedStacks";
import { FeaturedGuides } from "@/components/landing/FeaturedGuides";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://usevibestack.com" },
};

const Testimonials = dynamic(() => import("@/components/landing/Testimonials").then(mod => mod.Testimonials));
const NewsletterSection = dynamic(() => import("@/components/landing/NewsletterSection").then(mod => mod.NewsletterSection));
const CTASection = dynamic(() => import("@/components/landing/CTASection").then(mod => mod.CTASection));
const ExitIntentPopup = dynamic(() => import("@/components/ui/ExitIntentPopup").then(mod => mod.ExitIntentPopup));

export default async function Home() {
  // Fetch data on the server
  const [testimonials, featuredRanking, allTools] = await Promise.all([
    getVerifiedTestimonials(6),
    getFeaturedStackRanking(),
    getTools(),
  ]);

  // The database only orders the featured stacks; the copy on each card comes
  // from lib/stacks.ts, the same file /stack/[stackId] renders, and the tool
  // names come from `allTools` — which excludes retired tools. That is what
  // keeps the homepage from advertising a stack differently than its own page
  // does, and what keeps it from linking a stack id that /stack/[stackId]
  // (dynamicParams = false) would 404 on. See lib/data/stacks/core.ts.
  const featuredStacks = resolveFeaturedStacks(featuredRanking, allTools, 6);

  // Hero stack picker: the same resolved stacks (retired tools already dropped),
  // plus the goal label (`idealFor[0]`) and setup steps (`workflow`) from
  // lib/stacks.ts, which FeaturedStack does not carry. Stacks left with no live
  // tools are skipped so the picker never shows an empty "A + B" line.
  const stackPicks: StackPick[] = featuredStacks
    .flatMap((featured) => {
      const source = stacks.find((stack) => stack.id === featured.id);
      if (!source || featured.tools.length === 0) return [];
      return [{
        id: featured.id,
        name: featured.name,
        goal: source.idealFor[0] ?? featured.name,
        tools: featured.tools.map((tool) => tool.name),
        toolSlugs: featured.tools.map((tool) => tool.slug),
        price: featured.totalPrice,
        steps: source.workflow.slice(0, 4).map((step) => step.replace(/^\s*\d+\.\s*/, "")),
      }];
    })
    .slice(0, 6);

  // Real per-category tool counts (category id → count) for the category cards.
  const categoryIdByName: Record<string, string> = {
    Coding: "coding",
    Design: "design",
    Assistance: "assistance",
    Productivity: "productivity",
    Management: "management",
    Other: "other",
  };
  const categoryCounts = allTools.reduce<Record<string, number>>((acc, t) => {
    const id = categoryIdByName[t.category];
    if (id) acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "VibeStack",
    "url": "https://usevibestack.com",
    "description": "Curated AI tools for developers. Discover the best tools to accelerate your workflow.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://usevibestack.com/tools?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-svh bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <VibeHero stacks={stackPicks} />
      
      {/* Tool Categories - Browse by category */}
      <ToolCategories counts={categoryCounts} />
      
      {/* Popular Tools - Trending AI tools */}
      <PopularTools tools={allTools} />
      
      {/* Featured Stacks - Curated workflows */}
      <FeaturedStacks stacks={featuredStacks} />

      {/* Guides & comparisons — server-rendered links into the blog pillar */}
      <FeaturedGuides />

      {/* Testimonials — only render when we have real, verified ones */}
      {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      
      {/* Newsletter */}
      <NewsletterSection />
      
      {/* Final CTA */}
      <CTASection />
      
      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </div>
  );
}
