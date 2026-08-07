"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Zap, Target, Layers, Brain, GraduationCap, Paintbrush, Wand2 } from "lucide-react";
import { designSystem } from "@/lib/design-system";

// Ids/names/descriptions/tools/price below mirror the curated stacks in
// lib/stacks.ts — they used to be a separate, made-up list (ids like
// "design-pro", "startup", "fullstack", "researcher" that don't exist as
// stack pages) with no links at all. Keeping them in sync means every card
// here can link straight to its real /stack/{id} page.
export const POPULAR_STACKS = [
  {
    id: "10x-engineer",
    name: "The 10x Engineer Stack",
    description: "Autonomous agents and massive context windows for maximum velocity",
    tools: ["devin-ai", "supermaven", "linear"],
    price: "$40+/mo",
    users: 2847,
    rating: 4.9,
    color: "from-vibe-purple to-vibe-electric",
    icon: Zap
  },
  {
    id: "product-designer",
    name: "The Product Designer Stack",
    description: "Professional tools to convert Figma designs directly into production code",
    tools: ["builder-io", "v0-by-vercel"],
    price: "$19+/mo",
    users: 1923,
    rating: 4.7,
    color: "from-vibe-pink to-rose-500",
    icon: Paintbrush
  },
  {
    id: "learner",
    name: "The Learner Stack",
    description: "Zero-setup environments that explain code as you write it",
    tools: ["cursor", "replit"],
    price: "$0/mo",
    users: 4532,
    rating: 4.8,
    color: "from-emerald-500 to-teal-500",
    icon: GraduationCap
  },
  {
    id: "efficiency",
    name: "The Efficiency Stack",
    description: "Fast, free, and smart tools to speed up your workflow",
    tools: ["supermaven", "cursor"],
    price: "$0/mo",
    users: 3156,
    rating: 4.6,
    color: "from-amber-500 to-orange-500",
    icon: Target
  },
  {
    id: "power-pair",
    name: "The Power Pair Stack",
    description: "The smartest reasoning models integrated directly into your IDE",
    tools: ["github-copilot", "gemini-code-assist"],
    price: "$30+/mo",
    users: 2678,
    rating: 4.8,
    color: "from-blue-500 to-vibe-cyan",
    icon: Layers
  },
  {
    id: "smart-assistant",
    name: "The Smart Assistant Stack",
    description: "High-intelligence chat and search models available for free",
    tools: ["claude", "perplexity"],
    price: "$0/mo",
    users: 1845,
    rating: 4.7,
    color: "from-violet-500 to-vibe-purple",
    icon: Brain
  },
  {
    id: "magic-wand",
    name: "The Magic Wand Stack",
    description: "Generate beautiful UI from text prompts without writing complex CSS",
    tools: ["v0-by-vercel", "builder-io"],
    price: "$0/mo",
    users: 5124,
    rating: 4.9,
    color: "from-purple-500 to-fuchsia-500",
    icon: Wand2
  }
];

interface PopularStack {
  id: string;
  name: string;
  description: string;
  tools: string[];
  price: string;
  users: number;
  rating: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PopularStackCardProps {
  stack: PopularStack;
}

function PopularStackCard({ stack }: PopularStackCardProps) {
  const Icon = stack.icon;
  return (
    <Link href={`/stack/${stack.id}`} className="block group">
      <motion.div whileHover={{ y: -5 }}>
        <Card className="h-full border-border/50 hover:border-vibe-electric/50 transition-all duration-300 hover:shadow-xl hover:shadow-vibe-electric/10 overflow-hidden">
          <div className={`h-2 bg-linear-to-r ${stack.color}`} />
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-linear-to-br ${stack.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-medium">{stack.rating}</span>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-vibe-electric transition-colors">{stack.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{stack.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{stack.price}</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" />
                {stack.users.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

export function PopularStacksGrid() {
  const fadeInUp = designSystem.animations.fadeInUp;

  return (
    <motion.div
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={{ ...fadeInUp.transition, delay: 0.3 }}
      className="mb-24"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Popular Stacks</h2>
        <p className="text-muted-foreground">Editor&apos;s picks — hand-curated workflows</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POPULAR_STACKS.map((stack, index) => (
          <motion.div
            key={stack.id}
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.4 + index * 0.1 }}
          >
            <PopularStackCard stack={stack} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
