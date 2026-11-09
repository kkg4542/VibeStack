"use client";

import Link from "next/link";
import { Zap, Layers, Brain, GraduationCap, Paintbrush, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAllTools } from "@/hooks/use-tools";
import { countToolsWithFreePlan, freePlanLabel } from "./stack-facts";

// Ids/names/descriptions/tools below mirror the curated stacks in
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
    color: "bg-secondary",
    icon: Zap
  },
  {
    id: "product-designer",
    name: "The Product Designer Stack",
    description: "Professional tools to convert Figma designs directly into production code",
    tools: ["builder-io", "v0-by-vercel"],
    color: "bg-secondary",
    icon: Paintbrush
  },
  {
    id: "learner",
    name: "The Learner Stack",
    description: "Zero-setup environments that explain code as you write it",
    tools: ["cursor", "replit"],
    color: "bg-secondary",
    icon: GraduationCap
  },
  {
    id: "power-pair",
    name: "The Power Pair Stack",
    description: "The smartest reasoning models integrated directly into your IDE",
    tools: ["github-copilot", "gemini-code-assist"],
    color: "bg-secondary",
    icon: Layers
  },
  {
    id: "smart-assistant",
    name: "The Smart Assistant Stack",
    description: "High-intelligence chat and search models available for free",
    tools: ["claude", "perplexity"],
    color: "bg-secondary",
    icon: Brain
  },
  {
    id: "magic-wand",
    name: "The Magic Wand Stack",
    description: "Generate beautiful UI from text prompts without writing complex CSS",
    tools: ["v0-by-vercel", "builder-io"],
    color: "bg-secondary",
    icon: Wand2
  }
];

interface PopularStack {
  id: string;
  name: string;
  description: string;
  tools: string[];
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PopularStackCardProps {
  stack: PopularStack;
  tools: { slug: string; pricing?: string | null }[];
}

// Direction B: flat card cells, icon on a flat `bg-secondary` square (the
// per-stack `color` is now that neutral token), hover = one tone step. Plain
// markup, so the grid is in the SSR HTML (no framer opacity:0 entry state).
function PopularStackCard({ stack, tools }: PopularStackCardProps) {
  const Icon = stack.icon;
  // Derived from each tool's own pricing field; stays hidden until the tool
  // data has loaded rather than showing a guess.
  const freeCount = countToolsWithFreePlan(stack.tools, tools);
  return (
    <Link
      href={`/stack/${stack.id}`}
      className="group block h-full bg-card p-6 transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className={cn("p-3 text-foreground group-hover:bg-background", stack.color)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <h3 className="mb-2 text-[18px] font-semibold text-foreground group-hover:text-vibe-link">{stack.name}</h3>
      <p className="mb-4 text-[16px] text-muted-foreground">{stack.description}</p>
      <div className="flex items-center justify-between text-[14px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Layers className="h-4 w-4" aria-hidden="true" />
          {stack.tools.length} {stack.tools.length === 1 ? "tool" : "tools"}
        </span>
        {freeCount !== null && (
          <span className="font-semibold text-foreground">{freePlanLabel(freeCount, stack.tools.length)}</span>
        )}
      </div>
    </Link>
  );
}

export function PopularStacksGrid() {
  const { tools } = useAllTools();
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
            <PopularStackCard stack={stack} tools={tools} />
          </div>
        ))}
      </div>
    </section>
  );
}
