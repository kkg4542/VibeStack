"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/landing/Hero";
import { FeaturedStacks } from "@/components/landing/FeaturedStacks";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { m } from "framer-motion";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";

// Dynamic imports for below-the-fold components to reduce initial bundle size
const HowItWorks = dynamic(() => import("@/components/landing/HowItWorks").then(m => ({ default: m.HowItWorks })), {
  loading: () => <div className="h-96 w-full animate-pulse bg-muted/20" />
});

const Testimonials = dynamic(() => import("@/components/landing/Testimonials").then(m => ({ default: m.Testimonials })), {
  loading: () => <div className="h-96 w-full animate-pulse bg-muted/20" />
});

const CTASection = dynamic(() => import("@/components/landing/CTASection").then(m => ({ default: m.CTASection })), {
  loading: () => <div className="h-64 w-full animate-pulse bg-muted/20" />
});

// Note: metadata export moved to layout.tsx as client components cannot export metadata

export default function Home() {
  return (
    <LazyMotionProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/20">
        <Hero />

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <FeaturedStacks />
        </m.div>

        <HowItWorks />

        <Testimonials />

        <CTASection />

        {/* Exit Intent Popup */}
        <ExitIntentPopup />
      </div>
    </LazyMotionProvider>
  );
}
