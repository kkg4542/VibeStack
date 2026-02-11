"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, DollarSign, TrendingUp } from "lucide-react";
import { designSystem } from "@/lib/design-system";

const WHY_STACKS_MATTER = [
  {
    title: "Synergy",
    description: "Tools that work together multiply your productivity",
    icon: Layers,
    stat: "3.2x",
    statLabel: "Productivity Boost"
  },
  {
    title: "Cost Efficiency",
    description: "Bundled tools often cost less than individual subscriptions",
    icon: DollarSign,
    stat: "40%",
    statLabel: "Average Savings"
  },
  {
    title: "Learning Curve",
    description: "Curated stacks reduce decision fatigue and setup time",
    icon: TrendingUp,
    stat: "70%",
    statLabel: "Faster Onboarding"
  }
];

export function WhyStacksMatter() {
  const fadeInUp = designSystem.animations.fadeInUp;

  return (
    <motion.div
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={{ ...fadeInUp.transition, delay: 0.5 }}
      className="mb-24"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Stacks Matter</h2>
        <p className="text-muted-foreground">The right combination multiplies your productivity</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {WHY_STACKS_MATTER.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.6 + index * 0.1 }}
            >
              <Card className="text-center h-full">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-vibe-electric/10 mb-6">
                    <Icon className="w-8 h-8 text-vibe-electric" />
                  </div>
                  <div className="text-3xl font-bold text-vibe-electric mb-1">{item.stat}</div>
                  <div className="text-sm text-muted-foreground mb-4">{item.statLabel}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
