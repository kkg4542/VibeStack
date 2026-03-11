import { getVerifiedTestimonials, getFeaturedStacks } from "@/lib/data/stacks";
import { VibeHero } from "@/components/landing/VibeHero";
import { ToolCategories } from "@/components/landing/ToolCategories";
import { PopularTools } from "@/components/landing/PopularTools";
import { FeaturedStacks } from "@/components/landing/FeaturedStacks";
import { StatsSection } from "@/components/landing/StatsSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import dynamic from "next/dynamic";

const Testimonials = dynamic(() => import("@/components/landing/Testimonials").then(mod => mod.Testimonials));
const NewsletterSection = dynamic(() => import("@/components/landing/NewsletterSection").then(mod => mod.NewsletterSection));
const CTASection = dynamic(() => import("@/components/landing/CTASection").then(mod => mod.CTASection));
const ExitIntentPopup = dynamic(() => import("@/components/ui/ExitIntentPopup").then(mod => mod.ExitIntentPopup));

export default async function Home() {
  // Fetch data on the server
  const [testimonials, featuredStacks] = await Promise.all([
    getVerifiedTestimonials(6),
    getFeaturedStacks(6),
  ]);

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
      <ToolCategories />
      
      {/* Popular Tools - Trending AI tools */}
      <PopularTools />
      
      {/* Featured Stacks - Curated workflows */}
      <FeaturedStacks stacks={featuredStacks} />
      
      {/* Stats - Trust indicators */}
      <StatsSection />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Testimonials */}
      <Testimonials testimonials={testimonials} />
      
      {/* Newsletter */}
      <NewsletterSection />
      
      {/* Final CTA */}
      <CTASection />
      
      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </div>
  );
}
