"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { designSystem } from "@/lib/design-system";

interface CTASectionProps {
  onStartQuiz: () => void;
}

export function CTASection({ onStartQuiz }: CTASectionProps) {
  const fadeInUp = designSystem.animations.fadeInUp;

  return (
    <motion.div
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={{ ...fadeInUp.transition, delay: 0.9 }}
      className="text-center pb-16"
    >
      <Card className="border-vibe-electric/20 bg-linear-to-br from-vibe-electric/5 to-vibe-purple/5">
        <CardContent className="p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to find your stack?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Take our 2-minute quiz and discover the perfect combination of AI tools for your workflow.
          </p>
          <Button size="lg" onClick={onStartQuiz} className="rounded-full h-14 px-8 text-lg">
            Start Quiz <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
