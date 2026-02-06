"use client";

import { Hero } from "@/components/landing/Hero";
import { StatsSection } from "@/components/landing/StatsSection";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTASection } from "@/components/landing/CTASection";
import { motion } from "framer-motion";

// Note: metadata export moved to layout.tsx as client components cannot export metadata

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/20">
      <Hero />

      <StatsSection />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <BentoGrid />
      </motion.div>

      <HowItWorks />

      <Testimonials />

      <CTASection />
    </div>
  );
}
