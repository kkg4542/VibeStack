"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { trackStackFinderStep, trackStackRecommended } from "@/lib/analytics";
import {
  ArrowRight, Code2, Paintbrush, Brain, ArrowLeft, CheckCircle2, DollarSign,
  GraduationCap, Zap, Share2, RotateCcw, Users, Layers, BookOpen, Star,
  Lightbulb, Monitor, FileCode, Check
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/components/icons/tool-icons";
import { cn } from "@/lib/utils";
import type { Tool } from "@prisma/client";
import { QuizLeadCapture } from "@/components/landing/QuizLeadCapture";
import { Container } from "@/components/primitives/Container";

export type StackRecommendation = {
  name: string;
  description: string;
  totalPrice: string;
  tools: string[];
  whyThisStack: string;
  compatibility: string;
  bestFor: string[];
  usersCount: number;
  rating: number;
  // id in lib/stacks.ts for the matching curated stack page, when this quiz
  // result maps 1:1 to one. Lets us link out to the full write-up instead of
  // duplicating it here with no way back.
  stackId?: string;
};

export const STEPS = [
  {
    id: "goal",
    question: "What is your primary goal?",
    description: "Choose what you want to accomplish with AI tools",
    options: [
      { id: "ui", label: "Design UI / Frontend", icon: Paintbrush, description: "Crafting interfaces", color: "bg-secondary" },
      { id: "logic", label: "Write Code / Logic", icon: Code2, description: "Backend & Systems", color: "bg-secondary" },
      { id: "fullstack", label: "Full-Stack Development", icon: Layers, description: "End-to-end", color: "bg-secondary" },
      { id: "partner", label: "AI Pair Programming", icon: Brain, description: "Collaborative coding", color: "bg-secondary" },
      { id: "research", label: "Research & Writing", icon: BookOpen, description: "Content creation", color: "bg-secondary" },
    ],
  },
  {
    id: "experience",
    question: "What's your experience level?",
    description: "This helps us recommend the right complexity",
    options: [
      { id: "beginner", label: "Beginner / No-Code", icon: GraduationCap, description: "Just getting started", color: "bg-secondary" },
      { id: "intermediate", label: "Intermediate", icon: Code2, description: "Some experience", color: "bg-secondary" },
      { id: "pro", label: "Pro / Senior Dev", icon: Zap, description: "Expert level", color: "bg-secondary" },
    ],
  },
  {
    id: "environment",
    question: "What's your primary code editor?",
    description: "We'll recommend tools that integrate well",
    options: [
      { id: "vscode", label: "VS Code", icon: Monitor, description: "Most popular", color: "bg-secondary" },
      { id: "jetbrains", label: "JetBrains", icon: FileCode, description: "IDEs like IntelliJ", color: "bg-secondary" },
      { id: "vim", label: "Vim / Neovim", icon: Code2, description: "Terminal-based", color: "bg-secondary" },
      { id: "other", label: "Other / Cloud", icon: Monitor, description: "Replit, Codespaces", color: "bg-secondary" },
    ],
  },
  {
    id: "team",
    question: "What's your team size?",
    description: "Collaboration needs vary by team size",
    options: [
      { id: "solo", label: "Solo / Freelance", icon: Users, description: "Just me", color: "bg-secondary" },
      { id: "small", label: "Small Team (2-10)", icon: Users, description: "Startup vibes", color: "bg-secondary" },
      { id: "large", label: "Large Team (10+)", icon: Users, description: "Enterprise", color: "bg-secondary" },
    ],
  },
  {
    id: "budget",
    question: "What is your budget?",
    description: "We have great options for every price point",
    options: [
      { id: "free", label: "Free Tier Only", icon: DollarSign, description: "$0 / month", color: "bg-secondary" },
      { id: "budget", label: "Budget Friendly", icon: DollarSign, description: "Under $20/mo", color: "bg-secondary" },
      { id: "paid", label: "Premium", icon: Zap, description: "Best performance", color: "bg-secondary" },
    ],
  },
  {
    id: "workflow",
    question: "What matters most to you?",
    description: "Prioritize what you value in AI tools",
    options: [
      { id: "speed", label: "Speed & Efficiency", icon: Zap, description: "Ship faster", color: "bg-secondary" },
      { id: "quality", label: "Code Quality", icon: CheckCircle2, description: "Fewer bugs", color: "bg-secondary" },
      { id: "learning", label: "Learning", icon: GraduationCap, description: "Improve skills", color: "bg-secondary" },
      { id: "autonomy", label: "AI Autonomy", icon: Brain, description: "Let AI work", color: "bg-secondary" },
    ],
  },
];

export function useStackRecommendation(answers: Record<string, string>): StackRecommendation {
  return useMemo(() => {
    const { goal, experience, environment, team, budget, workflow } = answers;

    let stack: StackRecommendation = {
      name: "The Universal Stack",
      description: "A balanced set of tools for general development",
      totalPrice: "$0-30/mo",
      tools: ["cursor", "claude"],
      whyThisStack: "These tools offer the best balance of power and accessibility.",
      compatibility: "Works with any editor and language",
      bestFor: ["General development", "Learning", "Prototyping"],
      usersCount: 5234,
      rating: 4.7
    };

    // UI/Frontend focused
    if (goal === "ui") {
      if (experience === "beginner") {
        stack = {
          name: "The Magic Wand Stack",
          description: "Generate beautiful UI from text prompts without writing complex CSS",
          totalPrice: "$0-15/mo",
          tools: ["v0-by-vercel", "builder-io"],
          whyThisStack: "Perfect for designers and frontend devs who want to move fast without deep CSS knowledge",
          compatibility: "Exports to React, Vue, and plain HTML",
          bestFor: ["Landing pages", "Prototyping", "Design systems"],
          usersCount: 3421,
          rating: 4.6,
          stackId: "magic-wand"
        };
      } else {
        stack = {
          name: "The Product Designer Stack",
          description: "Professional tools to convert designs directly into production code",
          totalPrice: "$25-40/mo",
          tools: ["builder-io", "v0-by-vercel", "figma"],
          whyThisStack: "Seamlessly bridge design and development with AI-powered conversion",
          compatibility: "Full Figma integration, exports clean code",
          bestFor: ["Design teams", "Production apps", "Design systems"],
          usersCount: 2847,
          rating: 4.8,
          stackId: "product-designer"
        };
      }
    }

    // Logic/Backend focused
    if (goal === "logic") {
      if (experience === "beginner") {
        stack = {
          name: "The Learner Stack",
          description: "Zero-setup environments that explain code as you write it",
          totalPrice: "$0-20/mo",
          tools: ["cursor", "replit"],
          whyThisStack: "Built-in tutorials and explanations make learning to code approachable",
          compatibility: "Supports 50+ languages with smart explanations",
          bestFor: ["Learning", "Education", "Small projects"],
          usersCount: 4532,
          rating: 4.8,
          stackId: "learner"
        };
      } else if (budget === "paid" || workflow === "autonomy") {
        stack = {
          name: "The 10x Engineer Stack",
          description: "Autonomous agents and massive context windows for maximum velocity",
          totalPrice: "$40-60/mo",
          tools: ["devin-ai", "cursor"],
          whyThisStack: "Devin works independently while you focus on architecture, and Cursor keeps you in the loop for everything you want to steer directly.",
          compatibility: "Works with any codebase, massive context windows",
          bestFor: ["Complex projects", "Senior developers", "High-velocity teams"],
          usersCount: 2847,
          rating: 4.9,
          stackId: "10x-engineer"
        };
      }
      // Otherwise falls through to the default Universal Stack (Cursor + Claude)
      // above. This branch used to recommend a Supermaven + Cursor "Efficiency
      // Stack," but Supermaven was discontinued (folded into Cursor Tab), and
      // a single remaining tool isn't a "stack" worth a dedicated result — see
      // lib/stacks.ts, where the same curated stack was retired outright.
    }

    // Full-stack
    if (goal === "fullstack") {
      if (budget === "paid") {
        stack = {
          name: "The Full-Stack Pro Stack",
          description: "Complete frontend to backend coverage with AI assistance",
          totalPrice: "$50-70/mo",
          tools: ["cursor", "v0-by-vercel", "claude"],
          whyThisStack: "Every layer of your stack enhanced with AI",
          compatibility: "Works across frontend, backend, and database",
          bestFor: ["Full-stack apps", "Startups", "Agencies"],
          usersCount: 2678,
          rating: 4.8
        };
      } else {
        stack = {
          name: "The Indie Hacker Stack",
          description: "Ship complete products on a budget",
          totalPrice: "$0-30/mo",
          tools: ["cursor", "v0-by-vercel", "claude"],
          whyThisStack: "Cursor for code, v0 for UI, Claude for everything else",
          compatibility: "Perfect for rapid prototyping and MVPs",
          bestFor: ["Indie hackers", "Side projects", "MVPs"],
          usersCount: 4521,
          rating: 4.7
        };
      }
    }

    // Research/Writing
    if (goal === "research") {
      stack = {
        name: "The Researcher Stack",
        description: "Deep research, documentation, and content creation",
        totalPrice: "$0-20/mo",
        tools: ["claude", "perplexity", "notion-ai"],
        whyThisStack: "Perplexity for research, Claude for writing, Notion AI for organizing notes",
        compatibility: "Web-based, works everywhere",
        bestFor: ["Research", "Documentation", "Content creation"],
        usersCount: 1845,
        rating: 4.7
      };
    }

    return stack;
  }, [answers]);
}

interface QuizInterfaceProps {
  onRestart: () => void;
}

// Direction B: flat tone steps, square corners, one orange accent with dark
// text. Motion is transform-only (never an opacity:0 entry state) and drops
// to nothing under prefers-reduced-motion.
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link";
const squareButton = cn(
  "inline-flex h-12 items-center justify-center gap-2 rounded-none px-6 text-[16px] font-semibold transition-colors",
  focusRing
);

export function QuizInterface({ onRestart }: QuizInterfaceProps) {
  const { tools } = useAllTools();
  const reduceMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const isFinished = stepIndex >= STEPS.length;
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const getRecommendedStack = useStackRecommendation(answers);

  const handleOptionClick = (optionId: string) => {
    trackStackFinderStep(currentStep.id, optionId);
    setIsAnimating(true);
    setAnswers(prev => ({ ...prev, [currentStep.id]: optionId }));

    setTimeout(() => {
      setStepIndex(prev => prev + 1);
      setIsAnimating(false);
    }, 400);
  };

  const handleBack = () => {
    setStepIndex(prev => Math.max(0, prev - 1));
  };

  const getToolDetails = (slug: string) => tools.find((t: Tool) => t.slug === slug);

  useEffect(() => {
    if (isFinished) {
      trackStackRecommended(getRecommendedStack.name, getRecommendedStack.totalPrice);
    }
  }, [isFinished, getRecommendedStack]);

  const handleShare = () => {
    const text = `Check out my recommended stack: ${getRecommendedStack.name}`;
    navigator.clipboard.writeText(`${text} - ${window.location.href}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const slide = reduceMotion ? 0 : 24;

  return (
    <Container size="md">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-6 text-[16px] font-semibold text-vibe-link">AI Stack Finder</p>

        <h1 className="font-display mb-8 text-[clamp(40px,6vw,96px)] leading-[0.88] text-balance text-foreground">
          Find Your Vibe Stack
        </h1>

        {!isFinished && (
          <div className="max-w-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[14px] text-muted-foreground">Question {stepIndex + 1} of {STEPS.length}</span>
              <span className="text-[14px] tabular-nums text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-card [&>div]:bg-vibe-electric" />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {!isFinished ? (
          <m.div
            key="question"
            initial={{ x: slide }}
            animate={{ x: 0 }}
            exit={{ x: -slide }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-3xl"
          >
            <div className="bg-card p-8 md:p-12">
              <div className="mb-8">
                <h2 className="mb-2 text-[clamp(24px,3vw,32px)] font-semibold leading-tight text-foreground">
                  {currentStep.question}
                </h2>
                <p className="text-[16px] text-muted-foreground">
                  {currentStep.description}
                </p>
              </div>

              <div className={cn(
                "grid grid-cols-1 gap-3",
                currentStep.options.length <= 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
              )}>
                {currentStep.options.map((option) => {
                  const Icon = option.icon;
                  const isSelected = answers[currentStep.id] === option.id;
                  return (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => handleOptionClick(option.id)}
                      disabled={isAnimating}
                      aria-pressed={isSelected}
                      className={cn(
                        "group relative flex flex-col items-start rounded-none p-6 text-left transition-colors disabled:cursor-default",
                        focusRing,
                        isSelected
                          ? "bg-vibe-electric text-vibe-deep"
                          : "bg-background text-foreground hover:bg-secondary"
                      )}
                    >
                      <div
                        className={cn(
                          "mb-4 p-3",
                          isSelected ? "bg-transparent text-vibe-deep" : cn(option.color, "text-foreground group-hover:bg-background")
                        )}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mb-1 text-[18px] font-semibold">{option.label}</h3>
                      <p className={cn("text-[16px]", isSelected ? "text-vibe-deep" : "text-muted-foreground")}>
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {stepIndex > 0 && (
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={cn(squareButton, "bg-transparent px-0 text-muted-foreground hover:text-foreground")}
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                </div>
              )}
            </div>
          </m.div>
        ) : (
          <StackRecommendationResult
            stack={getRecommendedStack}
            onRestart={onRestart}
            onShare={handleShare}
            copied={copied}
            getToolDetails={getToolDetails}
          />
        )}
      </AnimatePresence>
    </Container>
  );
}

interface StackRecommendationResultProps {
  stack: StackRecommendation;
  onRestart: () => void;
  onShare: () => void;
  copied: boolean;
  getToolDetails: (slug: string) => Tool | undefined;
}

function StackRecommendationResult({
  stack,
  onRestart,
  onShare,
  copied,
  getToolDetails
}: StackRecommendationResultProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      key="results"
      initial={{ y: reduceMotion ? 0 : 24 }}
      animate={{ y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* Stack Reveal */}
      <div className="mb-8 bg-card p-8 md:p-12">
        <div className="mb-10">
          <p className="mb-4 text-[16px] font-semibold text-vibe-link">Recommended Stack</p>

          <h2 className="font-display mb-4 text-[clamp(32px,4vw,56px)] leading-[0.88] text-balance text-foreground">
            {stack.name}
          </h2>

          <p className="mb-6 max-w-2xl text-[20px] leading-normal text-muted-foreground">
            {stack.description}
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[16px]">
            <div className="flex items-center gap-2">
              <div className="flex" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(stack.rating) ? "fill-current text-vibe-link" : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="font-semibold text-foreground">{stack.rating}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5" aria-hidden="true" />
              {stack.usersCount.toLocaleString()} users
            </div>
            <span className="bg-secondary px-4 py-1 text-[18px] font-semibold tabular-nums text-foreground">
              {stack.totalPrice}
            </span>
          </div>

          {stack.stackId && (
            <Link
              href={`/stack/${stack.stackId}`}
              className={cn(
                "group inline-flex items-center gap-1.5 text-[16px] font-semibold text-vibe-link underline-offset-4 hover:underline",
                focusRing
              )}
            >
              View the full {stack.name} write-up
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
            </Link>
          )}
        </div>

        {/* Why This Stack */}
        <div className="mb-8 bg-background p-6">
          <h3 className="mb-4 flex items-center gap-2 text-[18px] font-semibold text-foreground">
            <Lightbulb className="h-5 w-5 text-vibe-link" aria-hidden="true" />
            Why This Stack?
          </h3>
          <p className="mb-4 text-[16px] text-foreground">{stack.whyThisStack}</p>
          <ul className="flex flex-wrap gap-2">
            {stack.bestFor.map((item) => (
              <li key={item} className="bg-secondary px-3 py-1 text-[14px] text-foreground">{item}</li>
            ))}
          </ul>
        </div>

        {/* Lead capture — fires right after the user sees the "why" */}
        <QuizLeadCapture
          stackName={stack.name}
          stackPrice={stack.totalPrice}
          toolSlugs={stack.tools}
        />

        {/* Tools Grid */}
        <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {stack.tools.map((slug) => {
            const tool = getToolDetails(slug);
            if (!tool) return null;
            const Icon = getToolIcon(tool.slug);
            return (
              <Link
                key={tool.slug}
                href={`/tool/${tool.slug}`}
                className={cn("group block h-full bg-background p-6 transition-colors hover:bg-secondary", focusRing)}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="bg-secondary p-3 text-foreground group-hover:bg-background">
                    <Icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-vibe-link motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                </div>
                <h3 className="mb-1 text-[18px] font-semibold text-foreground">{tool.title}</h3>
                <p className="mb-2 text-[14px] text-muted-foreground">{tool.category}</p>
                <p className="line-clamp-2 text-[16px] text-muted-foreground">{tool.description}</p>
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={onRestart} className={cn(squareButton, "bg-secondary text-foreground hover:bg-muted")}>
            <RotateCcw className="h-4 w-4" /> Start Over
          </button>
          <button type="button" onClick={onShare} className={cn(squareButton, "bg-secondary text-foreground hover:bg-muted")}>
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            {copied ? "Copied!" : "Share Stack"}
          </button>
          <Link href="/tools" className={cn(squareButton, "group bg-vibe-electric text-vibe-deep hover:bg-[#e8401a]")}>
            Browse All Tools
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
          </Link>
        </div>
      </div>
    </m.div>
  );
}
