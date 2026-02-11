"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { designSystem } from "@/lib/design-system";

interface BuildPageHeroProps {
  onStartQuiz: () => void;
}

export function BuildPageHero({ onStartQuiz }: BuildPageHeroProps) {
  const fadeInUp = designSystem.animations.fadeInUp;

  return (
    <motion.div
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={fadeInUp.transition}
      className="text-center py-16 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibe-electric/10 border border-vibe-electric/20 text-vibe-electric text-sm font-medium mb-6"
      >
        <Sparkles className="w-4 h-4" />
        <span>AI Stack Finder</span>
      </motion.div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
        Find Your{" "}
        <span className="bg-linear-to-r from-vibe-electric via-vibe-purple to-vibe-pink bg-clip-text text-transparent">
          Vibe Stack
        </span>
      </h1>

      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Answer a few questions and get a personalized AI tool stack curated for your workflow,
        experience level, and budget.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" onClick={onStartQuiz} className="rounded-full h-14 px-8 text-lg">
          Start Quiz <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button variant="outline" size="lg" asChild className="rounded-full h-14 px-8 text-lg">
          <Link href="/tools">Browse All Tools</Link>
        </Button>
      </div>

      <div className="flex justify-center gap-8 mt-12 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Takes 2 minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>100% Free</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Personalized Results</span>
        </div>
      </div>
    </motion.div>
  );
}
