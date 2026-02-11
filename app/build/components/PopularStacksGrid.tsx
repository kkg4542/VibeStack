"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Zap, Target, Layers, Brain, GraduationCap, Paintbrush } from "lucide-react";
import { designSystem } from "@/lib/design-system";

export const POPULAR_STACKS = [
  {
    id: "10x-engineer",
    name: "The 10x Engineer Stack",
    description: "Maximum productivity for serious developers",
    tools: ["devin", "supermaven", "cursor"],
    price: "$40+/mo",
    users: 2847,
    rating: 4.9,
    color: "from-vibe-purple to-vibe-electric",
    icon: Zap
  },
  {
    id: "design-pro",
    name: "The Design Pro Stack",
    description: "From Figma to production in minutes",
    tools: ["v0", "builder-io", "figma"],
    price: "$25+/mo",
    users: 1923,
    rating: 4.7,
    color: "from-vibe-pink to-rose-500",
    icon: Paintbrush
  },
  {
    id: "learner",
    name: "The Learner Stack",
    description: "Perfect for beginners and students",
    tools: ["cursor", "replit-ai", "claude"],
    price: "$0-20/mo",
    users: 4532,
    rating: 4.8,
    color: "from-emerald-500 to-teal-500",
    icon: GraduationCap
  },
  {
    id: "startup",
    name: "The Startup Stack",
    description: "Ship fast with minimal overhead",
    tools: ["github-copilot", "linear", "notion-ai"],
    price: "$30+/mo",
    users: 3156,
    rating: 4.6,
    color: "from-amber-500 to-orange-500",
    icon: Target
  },
  {
    id: "fullstack",
    name: "The Full-Stack Stack",
    description: "Frontend to backend covered",
    tools: ["cursor", "supermaven", "v0"],
    price: "$35+/mo",
    users: 2678,
    rating: 4.8,
    color: "from-blue-500 to-vibe-cyan",
    icon: Layers
  },
  {
    id: "researcher",
    name: "The Researcher Stack",
    description: "Deep research and documentation",
    tools: ["claude", "perplexity", "mem"],
    price: "$0-20/mo",
    users: 1845,
    rating: 4.7,
    color: "from-violet-500 to-vibe-purple",
    icon: Brain
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
  onClick: () => void;
}

function PopularStackCard({ stack, onClick }: PopularStackCardProps) {
  const Icon = stack.icon;
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
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
          <h3 className="font-bold text-lg mb-2">{stack.name}</h3>
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
  );
}

interface PopularStacksGridProps {
  onStackClick: () => void;
}

export function PopularStacksGrid({ onStackClick }: PopularStacksGridProps) {
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
        <p className="text-muted-foreground">Editor&apos;s picks trusted by thousands of developers</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POPULAR_STACKS.map((stack, index) => (
          <motion.div
            key={stack.id}
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.4 + index * 0.1 }}
          >
            <PopularStackCard stack={stack} onClick={onStackClick} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
