"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { trackStackFinderStep, trackStackRecommended } from "@/lib/analytics";
import {
  ArrowRight, Code2, Paintbrush, Brain, ArrowLeft, CheckCircle2, DollarSign,
  GraduationCap, Zap, Share2, Sparkles, TrendingUp, Target, RotateCcw,
  Users, Layers, BookOpen, Star, Lightbulb, Monitor, FileCode, TestTube,
  MessageSquare, Heart, Trophy, ExternalLink, Copy, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/lib/tool-icons";
import { cn } from "@/lib/utils";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { ReviewList } from "@/components/reviews/ReviewList";
import { designSystem } from "@/lib/design-system";
import type { Tool } from "@prisma/client";

// Types
type StackRecommendation = {
  name: string;
  description: string;
  totalPrice: string;
  tools: string[];
  whyThisStack: string;
  compatibility: string;
  bestFor: string[];
  usersCount: number;
  rating: number;
};

// Popular Stacks for Showcase
const POPULAR_STACKS = [
  {
    id: "10x-engineer",
    name: "The 10x Engineer Stack",
    description: "Maximum productivity for serious developers",
    tools: ["devin", "supermaven", "cursor"],
    price: "$40+/mo",
    users: 2847,
    rating: 4.9,
    color: "from-indigo-500 to-purple-500",
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
    color: "from-pink-500 to-rose-500",
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
    color: "from-blue-500 to-cyan-500",
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
    color: "from-violet-500 to-purple-500",
    icon: Brain
  }
];

// Enhanced Steps
const STEPS = [
  {
    id: "goal",
    question: "What is your primary goal?",
    description: "Choose what you want to accomplish with AI tools",
    options: [
      { id: "ui", label: "Design UI / Frontend", icon: Paintbrush, description: "Crafting interfaces", color: "from-pink-500 to-rose-500" },
      { id: "logic", label: "Write Code / Logic", icon: Code2, description: "Backend & Systems", color: "from-blue-500 to-cyan-500" },
      { id: "fullstack", label: "Full-Stack Development", icon: Layers, description: "End-to-end", color: "from-indigo-500 to-purple-500" },
      { id: "partner", label: "AI Pair Programming", icon: Brain, description: "Collaborative coding", color: "from-violet-500 to-purple-500" },
      { id: "research", label: "Research & Writing", icon: BookOpen, description: "Content creation", color: "from-emerald-500 to-teal-500" },
    ],
  },
  {
    id: "experience",
    question: "What's your experience level?",
    description: "This helps us recommend the right complexity",
    options: [
      { id: "beginner", label: "Beginner / No-Code", icon: GraduationCap, description: "Just getting started", color: "from-emerald-500 to-teal-500" },
      { id: "intermediate", label: "Intermediate", icon: Code2, description: "Some experience", color: "from-amber-500 to-orange-500" },
      { id: "pro", label: "Pro / Senior Dev", icon: Zap, description: "Expert level", color: "from-indigo-500 to-blue-500" },
    ],
  },
  {
    id: "environment",
    question: "What's your primary code editor?",
    description: "We'll recommend tools that integrate well",
    options: [
      { id: "vscode", label: "VS Code", icon: Monitor, description: "Most popular", color: "from-blue-500 to-cyan-500" },
      { id: "jetbrains", label: "JetBrains", icon: FileCode, description: "IDEs like IntelliJ", color: "from-indigo-500 to-purple-500" },
      { id: "vim", label: "Vim / Neovim", icon: Code2, description: "Terminal-based", color: "from-green-500 to-emerald-500" },
      { id: "other", label: "Other / Cloud", icon: Monitor, description: "Replit, Codespaces", color: "from-slate-500 to-zinc-500" },
    ],
  },
  {
    id: "team",
    question: "What's your team size?",
    description: "Collaboration needs vary by team size",
    options: [
      { id: "solo", label: "Solo / Freelance", icon: Users, description: "Just me", color: "from-violet-500 to-purple-500" },
      { id: "small", label: "Small Team (2-10)", icon: Users, description: "Startup vibes", color: "from-amber-500 to-orange-500" },
      { id: "large", label: "Large Team (10+)", icon: Users, description: "Enterprise", color: "from-blue-500 to-indigo-500" },
    ],
  },
  {
    id: "budget",
    question: "What is your budget?",
    description: "We have great options for every price point",
    options: [
      { id: "free", label: "Free Tier Only", icon: DollarSign, description: "$0 / month", color: "from-emerald-500 to-teal-500" },
      { id: "budget", label: "Budget Friendly", icon: DollarSign, description: "Under $20/mo", color: "from-amber-500 to-orange-500" },
      { id: "paid", label: "Premium", icon: Zap, description: "Best performance", color: "from-indigo-500 to-purple-500" },
    ],
  },
  {
    id: "workflow",
    question: "What matters most to you?",
    description: "Prioritize what you value in AI tools",
    options: [
      { id: "speed", label: "Speed & Efficiency", icon: Zap, description: "Ship faster", color: "from-amber-500 to-orange-500" },
      { id: "quality", label: "Code Quality", icon: CheckCircle2, description: "Fewer bugs", color: "from-emerald-500 to-teal-500" },
      { id: "learning", label: "Learning", icon: GraduationCap, description: "Improve skills", color: "from-blue-500 to-cyan-500" },
      { id: "autonomy", label: "AI Autonomy", icon: Brain, description: "Let AI work", color: "from-violet-500 to-purple-500" },
    ],
  },
];

// Educational content
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

const TESTIMONIALS = [
  {
    quote: "The 10x Engineer Stack changed how I code. I ship features 3x faster now.",
    author: "Alex Chen",
    role: "Senior Developer at Stripe",
    avatar: "AC"
  },
  {
    quote: "As a designer who codes, the Design Pro Stack is perfect for my workflow.",
    author: "Sarah Kim",
    role: "Product Designer",
    avatar: "SK"
  },
  {
    quote: "Started with the Learner Stack and now I'm building full apps. Game changer!",
    author: "Mike Johnson",
    role: "Bootcamp Graduate",
    avatar: "MJ"
  }
];

export default function BuildPage() {
  const { tools } = useAllTools();
  const fadeInUp = designSystem.animations.fadeInUp;
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const isFinished = stepIndex >= STEPS.length;
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

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

  const handleRestart = () => {
    setAnswers({});
    setStepIndex(0);
  };

  const startQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Enhanced Stack Logic
  const getRecommendedStack = useMemo((): StackRecommendation => {
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
          tools: ["v0", "builder-io"],
          whyThisStack: "Perfect for designers and frontend devs who want to move fast without deep CSS knowledge",
          compatibility: "Exports to React, Vue, and plain HTML",
          bestFor: ["Landing pages", "Prototyping", "Design systems"],
          usersCount: 3421,
          rating: 4.6
        };
      } else {
        stack = {
          name: "The Product Designer Stack",
          description: "Professional tools to convert designs directly into production code",
          totalPrice: "$25-40/mo",
          tools: ["builder-io", "v0", "figma"],
          whyThisStack: "Seamlessly bridge design and development with AI-powered conversion",
          compatibility: "Full Figma integration, exports clean code",
          bestFor: ["Design teams", "Production apps", "Design systems"],
          usersCount: 2847,
          rating: 4.8
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
          tools: ["cursor", "replit-ai"],
          whyThisStack: "Built-in tutorials and explanations make learning to code approachable",
          compatibility: "Supports 50+ languages with smart explanations",
          bestFor: ["Learning", "Education", "Small projects"],
          usersCount: 4532,
          rating: 4.8
        };
      } else if (budget === "paid" || workflow === "autonomy") {
        stack = {
          name: "The 10x Engineer Stack",
          description: "Autonomous agents and massive context windows for maximum velocity",
          totalPrice: "$40-60/mo",
          tools: ["devin", "supermaven", "cursor"],
          whyThisStack: "Devin works independently while you focus on architecture. Supermaven predicts your next moves.",
          compatibility: "Works with any codebase, massive context windows",
          bestFor: ["Complex projects", "Senior developers", "High-velocity teams"],
          usersCount: 2847,
          rating: 4.9
        };
      } else {
        stack = {
          name: "The Efficiency Stack",
          description: "Fast, free, and smart tools to speed up your workflow",
          totalPrice: "$0-20/mo",
          tools: ["supermaven", "cursor"],
          whyThisStack: "Supermaven's speed combined with Cursor's IDE integration",
          compatibility: "VS Code extension, supports all major languages",
          bestFor: ["Daily coding", "Refactoring", "Boilerplate"],
          usersCount: 6234,
          rating: 4.7
        };
      }
    }

    // Full-stack
    if (goal === "fullstack") {
      if (budget === "paid") {
        stack = {
          name: "The Full-Stack Pro Stack",
          description: "Complete frontend to backend coverage with AI assistance",
          totalPrice: "$50-70/mo",
          tools: ["cursor", "supermaven", "v0", "claude"],
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
          tools: ["cursor", "v0", "claude"],
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
        tools: ["claude", "perplexity", "mem"],
        whyThisStack: "Perplexity for research, Claude for writing, Mem for memory",
        compatibility: "Web-based, works everywhere",
        bestFor: ["Research", "Documentation", "Content creation"],
        usersCount: 1845,
        rating: 4.7
      };
    }

    return stack;
  }, [answers]);

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

  // Popular Stack Card Component
  const PopularStackCard = ({ stack }: { stack: typeof POPULAR_STACKS[0] }) => {
    const Icon = stack.icon;
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="group cursor-pointer"
        onClick={() => {
          // Pre-fill answers based on stack characteristics
          setShowQuiz(true);
        }}
      >
        <Card className="h-full border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 overflow-hidden">
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
  };

  if (showQuiz) {
    return (
      <PageBackground {...BackgroundPresets.content}>
        <div className="container max-w-5xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUp.transition}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Stack Finder</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
              Find Your{" "}
              <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                Vibe Stack
              </span>
            </h1>

            {!isFinished && (
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Question {stepIndex + 1} of {STEPS.length}</span>
                  <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-3xl mx-auto"
              >
                <Card className="p-8 md:p-12">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {currentStep.question}
                    </h2>
                    <p className="text-muted-foreground">
                      {currentStep.description}
                    </p>
                  </div>

                  <div className={cn(
                    "grid grid-cols-1 gap-4",
                    currentStep.options.length <= 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
                  )}>
                    {currentStep.options.map((option, index) => {
                      const Icon = option.icon;
                      return (
                        <motion.button
                          key={option.id}
                          initial={fadeInUp.initial}
                          animate={fadeInUp.animate}
                          transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                          onClick={() => handleOptionClick(option.id)}
                          disabled={isAnimating}
                          className="group relative flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-background hover:bg-accent hover:border-indigo-500/50 transition-all duration-300"
                        >
                          <div className={`p-4 rounded-2xl bg-linear-to-br ${option.color} mb-4 group-hover:scale-110 transition-transform`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold mb-1">{option.label}</h3>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </motion.button>
                      );
                    })}
                  </div>

                  {stepIndex > 0 && (
                    <div className="mt-8 flex justify-center">
                      <Button variant="ghost" onClick={handleBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                {/* Stack Reveal */}
                <div className="bg-linear-to-b from-indigo-500/10 via-purple-500/5 to-pink-500/5 border border-indigo-500/20 rounded-3xl p-8 md:p-12 mb-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4">
                      <Trophy className="w-4 h-4" />
                      <span>Recommended Stack</span>
                    </div>

                    <motion.h2
                      initial={fadeInUp.initial}
                      animate={fadeInUp.animate}
                      transition={{ ...fadeInUp.transition, delay: 0.2 }}
                      className="text-4xl md:text-5xl font-bold mb-4"
                    >
                      {getRecommendedStack.name}
                    </motion.h2>

                    <motion.p
                      initial={fadeInUp.initial}
                      animate={fadeInUp.animate}
                      transition={{ ...fadeInUp.transition, delay: 0.3 }}
                      className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6"
                    >
                      {getRecommendedStack.description}
                    </motion.p>

                    <div className="flex items-center justify-center gap-6 mb-8">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(getRecommendedStack.rating) ? 'text-amber-500 fill-amber-500' : 'text-muted'}`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{getRecommendedStack.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-5 h-5" />
                        {getRecommendedStack.usersCount.toLocaleString()} users
                      </div>
                      <Badge variant="secondary" className="text-lg px-4 py-1">
                        {getRecommendedStack.totalPrice}
                      </Badge>
                    </div>
                  </div>

                  {/* Why This Stack */}
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-indigo-400" />
                        Why This Stack?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{getRecommendedStack.whyThisStack}</p>
                      <div className="flex flex-wrap gap-2">
                        {getRecommendedStack.bestFor.map((item) => (
                          <Badge key={item} variant="secondary">{item}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tools Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {getRecommendedStack.tools.map((slug, index) => {
                      const tool = getToolDetails(slug);
                      if (!tool) return null;
                      return (
                        <motion.div
                          key={tool.slug}
                          initial={fadeInUp.initial}
                          animate={fadeInUp.animate}
                          transition={{ ...fadeInUp.transition, delay: 0.5 + index * 0.1 }}
                        >
                          <Link href={`/tool/${tool.slug}`} className="group block h-full">
                            <Card className="h-full hover:border-indigo-500/50 transition-all">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className={`p-3 rounded-xl ${tool.bgGradient || "bg-secondary/50"}`}>
                                    {(() => {
                                      const Icon = getToolIcon(tool.slug);
                                      return <Icon className={`w-6 h-6 ${tool.color || "text-foreground"}`} />;
                                    })()}
                                  </div>
                                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-indigo-400 transition-colors" />
                                </div>
                                <h3 className="font-bold mb-1">{tool.title}</h3>
                                <p className="text-xs text-muted-foreground uppercase mb-2">{tool.category}</p>
                                <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                              </CardContent>
                            </Card>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" onClick={handleRestart}>
                      <RotateCcw className="mr-2 h-4 w-4" /> Start Over
                    </Button>
                    <Button variant="outline" onClick={handleShare}>
                      {copied ? <Check className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
                      {copied ? "Copied!" : "Share Stack"}
                    </Button>
                    <Link href="/tools">
                      <Button className="rounded-full">
                        Browse All Tools <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageBackground>
    );
  }

  // Landing Page Content
  return (
    <PageBackground {...BackgroundPresets.content}>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Hero */}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Stack Finder</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            Find Your{" "}
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Vibe Stack
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Answer a few questions and get a personalized AI tool stack curated for your workflow,
            experience level, and budget.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={startQuiz} className="rounded-full h-14 px-8 text-lg">
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

        {/* Popular Stacks */}
        <motion.div
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Stacks</h2>
            <p className="text-muted-foreground">Editor's picks trusted by thousands of developers</p>
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

        {/* Why Stacks Matter */}
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
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 mb-6">
                        <Icon className="w-8 h-8 text-indigo-400" />
                      </div>
                      <div className="text-3xl font-bold text-indigo-400 mb-1">{item.stat}</div>
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

        {/* Testimonials */}
        <motion.div
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ ...fadeInUp.transition, delay: 0.7 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Developers Say</h2>
            <p className="text-muted-foreground">Join thousands of developers using VibeStack</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={fadeInUp.initial}
                animate={fadeInUp.animate}
                transition={{ ...fadeInUp.transition, delay: 0.8 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-medium">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ ...fadeInUp.transition, delay: 0.9 }}
          className="text-center pb-16"
        >
          <Card className="border-indigo-500/20 bg-linear-to-br from-indigo-500/5 to-purple-500/5">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to find your stack?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Take our 2-minute quiz and discover the perfect combination of AI tools for your workflow.
              </p>
              <Button size="lg" onClick={startQuiz} className="rounded-full h-14 px-8 text-lg">
                Start Quiz <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageBackground>
  );
}
