import { getVerifiedTestimonials, getFeaturedStacks } from "@/lib/data/stacks";
import { VibeHero } from "@/components/landing/VibeHero";
import { FeaturedStacks } from "@/components/landing/FeaturedStacks";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTASection } from "@/components/landing/CTASection";
import { Testimonials } from "@/components/landing/Testimonials";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";

export default async function Home() {
  // Fetch data on the server
  const [testimonials, featuredStacks] = await Promise.all([
    getVerifiedTestimonials(6),
    getFeaturedStacks(6),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <VibeHero />
      
      <FeaturedStacks stacks={featuredStacks} />
      
      <HowItWorks />
      
      <Testimonials testimonials={testimonials} />
      
      <CTASection />
      
      <ExitIntentPopup />
    </div>
  );
}
