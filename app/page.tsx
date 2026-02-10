import { getVerifiedTestimonials, getFeaturedStacks } from "@/lib/data/stacks";
import { VibeHero } from "@/components/landing/VibeHero";
import { ToolCategories } from "@/components/landing/ToolCategories";
import { PopularTools } from "@/components/landing/PopularTools";
import { FeaturedStacks } from "@/components/landing/FeaturedStacks";
import { StatsSection } from "@/components/landing/StatsSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { CTASection } from "@/components/landing/CTASection";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";

export default async function Home() {
  // Fetch data on the server
  const [testimonials, featuredStacks] = await Promise.all([
    getVerifiedTestimonials(6),
    getFeaturedStacks(6),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
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
