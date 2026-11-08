"use client";

import Link from "next/link";
import { Star, Users, Zap, Layers, Brain, GraduationCap, Paintbrush, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Ids/names/descriptions/tools/price below mirror the curated stacks in
// lib/stacks.ts — they used to be a separate, made-up list (ids like
// "design-pro", "startup", "fullstack", "researcher" that don't exist as
// stack pages) with no links at all. Keeping them in sync means every card
// here can link straight to its real /stack/{id} page.
export const POPULAR_STACKS = [
  {
    id: "10x-engineer",
    name: "The 10x Engineer Stack",
    description: "An autonomous coding agent paired with fast, opinionated issue tracking for maximum velocity",
    tools: ["devin-ai", "linear"],
    price: "$40+/mo",
    users: 2847,
    rating: 4.9,
    color: "bg-secondary",
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
    color: "bg-secondary",
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
    color: "bg-secondary",
    icon: GraduationCap
  },
  {
    id: "power-pair",
    name: "The Power Pair Stack",
    description: "The smartest reasoning models integrated directly into your IDE",
    tools: ["github-copilot", "gemini-code-assist"],
    price: "$30+/mo",
    users: 2678,
    rating: 4.8,
    color: "bg-secondary",
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
    color: "bg-secondary",
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
    color: "bg-secondary",
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

// Direction B: flat card cells, icon on a flat `bg-secondary` square (the
// per-stack `color` is now that neutral token), hover = one tone step. Plain
// markup, so the grid is in the SSR HTML (no framer opacity:0 entry state).
function PopularStackCard({ stack }: PopularStackCardProps) {
  const Icon = stack.icon;
  return (
    <Link
      href={`/stack/${stack.id}`}
      className="group block h-full bg-card p-6 transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className={cn("p-3 text-foreground group-hover:bg-background", stack.color)}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-1 text-[14px] text-foreground">
          <Star className="h-4 w-4 fill-current text-vibe-link" aria-hidden="true" />
          <span className="font-semibold">{stack.rating}</span>
        </div>
      </div>
      <h3 className="mb-2 text-[18px] font-semibold text-foreground group-hover:text-vibe-link">{stack.name}</h3>
      <p className="mb-4 text-[16px] text-muted-foreground">{stack.description}</p>
      <div className="flex items-center justify-between text-[14px] text-muted-foreground">
        <span className="font-semibold text-foreground">{stack.price}</span>
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" aria-hidden="true" />
          {stack.users.toLocaleString()}
        </span>
      </div>
    </Link>
  );
}

export function PopularStacksGrid() {
  return (
    <section className="mb-24">
      <div className="mb-10">
        <h2 className="font-display mb-4 text-[clamp(32px,4vw,56px)] leading-[0.88] text-balance text-foreground">
          Popular Stacks
        </h2>
        <p className="text-[18px] text-muted-foreground">Editor&apos;s picks, hand-curated workflows</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {POPULAR_STACKS.map((stack) => (
          <div key={stack.id} className="reveal">
            <PopularStackCard stack={stack} />
          </div>
        ))}
      </div>
    </section>
  );
}
