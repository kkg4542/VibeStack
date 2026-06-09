import { getVerifiedTestimonials, getFeaturedStacks } from "@/lib/data/stacks";
import { getTools } from "@/lib/tools-db";
import { stacks } from "@/lib/stacks";
import { blogPosts } from "@/lib/blog";
import { VibeHero } from "@/components/landing/VibeHero";
import { ToolCategories } from "@/components/landing/ToolCategories";
import { PopularTools } from "@/components/landing/PopularTools";
import { FeaturedStacks } from "@/components/landing/FeaturedStacks";
import { StatsSection } from "@/components/landing/StatsSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
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
  const [testimonials, featuredStacks, allTools] = await Promise.all([
    getVerifiedTestimonials(6),
    getFeaturedStacks(6),
    getTools(),
  ]);

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
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <VibeHero />
      
      {/* Tool Categories - Browse by category */}
      <ToolCategories counts={categoryCounts} />
      
      {/* Popular Tools - Trending AI tools */}
      <PopularTools tools={allTools} />
      
      {/* Featured Stacks - Curated workflows */}
      <FeaturedStacks stacks={featuredStacks} />
      
      {/* Stats - Trust indicators (live counts so they never go stale) */}
      <StatsSection
        toolCount={allTools.length}
        stackCount={stacks.length}
        guideCount={blogPosts.length}
      />
      
      {/* How It Works */}
      <HowItWorks />
      
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
