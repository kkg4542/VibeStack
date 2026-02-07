"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { trackStackFinderStep, trackStackRecommended } from "@/lib/analytics";
import { ArrowRight, Code2, Paintbrush, Brain, Layout, ArrowLeft, CheckCircle2, DollarSign, GraduationCap, Zap, Bookmark, Share2, Sparkles, TrendingUp, Target, RotateCcw, FileDown } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";

// Types
type StackRecommendation = {
    name: string;
    description: string;
    totalPrice: string;
    tools: string[]; // Slugs
};

// 1. Deep Filter Questions
const STEPS = [
    {
        id: "goal",
        question: "What is your primary goal?",
        description: "Choose what you want to accomplish with AI tools",
        options: [
            { id: "ui", label: "Design UI / Frontend", icon: Paintbrush, description: "Crafting interfaces", color: "from-pink-500 to-rose-500" },
            { id: "logic", label: "Write Code / Logic", icon: Code2, description: "Backend & Systems", color: "from-blue-500 to-cyan-500" },
            { id: "partner", label: "Pair Programming", icon: Brain, description: "AI Assistance", color: "from-violet-500 to-purple-500" },
        ],
    },
    {
        id: "experience",
        question: "What's your experience level?",
        description: "This helps us recommend the right complexity",
        options: [
            { id: "beginner", label: "Beginner / No-Code", icon: GraduationCap, description: "Keep it simple", color: "from-emerald-500 to-teal-500" },
            { id: "pro", label: "Pro / Developer", icon: Code2, description: "Give me control", color: "from-indigo-500 to-blue-500" },
        ],
    },
    {
        id: "budget",
        question: "What is your budget?",
        description: "We have great options for every price point",
        options: [
            { id: "free", label: "Free Tier Only", icon: DollarSign, description: "$0 / month", color: "from-amber-500 to-orange-500" },
            { id: "paid", label: "Willing to Pay", icon: Zap, description: "For best performance", color: "from-green-500 to-emerald-500" },
        ],
    },
];

export default function BuildPage() {
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isAnimating, setIsAnimating] = useState(false);

    const currentStep = STEPS[stepIndex];
    const isLastStep = stepIndex === STEPS.length - 1;
    const isFinished = stepIndex >= STEPS.length;

    const handleOptionClick = (optionId: string) => {
        trackStackFinderStep(currentStep.id, optionId);
        setIsAnimating(true);
        setAnswers(prev => ({ ...prev, [currentStep.id]: optionId }));

        setTimeout(() => {
            if (isLastStep) {
                setStepIndex(prev => prev + 1);
            } else {
                setStepIndex(prev => prev + 1);
            }
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

    // 2. Vibe Stacks Logic
    const getRecommendedStack = (): StackRecommendation => {
        const { goal, experience, budget } = answers;

        // UI Stacks
        if (goal === "ui") {
            if (experience === "beginner" || budget === "free") {
                return {
                    name: "The Magic Wand Stack",
                    description: "Generate beautiful UI from text prompts without writing complex CSS. Perfect for rapid prototyping.",
                    totalPrice: "$0/mo (Free tiers)",
                    tools: ["v0", "builder-io"]
                };
            }
            return {
                name: "The Product Designer Stack",
                description: "Professional tools to convert Figma designs directly into production code. Best for design teams.",
                totalPrice: "$19+/mo",
                tools: ["builder-io", "v0"]
            };
        }

        // Coding/Logic Stacks
        if (goal === "logic") {
            if (experience === "beginner") {
                return {
                    name: "The Learner Stack",
                    description: "Zero-setup environments that explain code as you write it. Great for learning programming concepts.",
                    totalPrice: "$0/mo",
                    tools: ["cursor", "replit-ai"]
                };
            }
            if (budget === "paid") {
                return {
                    name: "The 10x Engineer Stack",
                    description: "Autonomous agents and massive context windows for maximum velocity. For serious developers.",
                    totalPrice: "$40+/mo",
                    tools: ["devin", "supermaven", "linear"]
                };
            }
            return {
                name: "The Efficiency Stack",
                description: "Fast, free, and smart tools to speed up your workflow without breaking the bank.",
                totalPrice: "$0/mo",
                tools: ["supermaven", "cursor"]
            };
        }

        // Partner Stacks (Default)
        if (budget === "paid") {
            return {
                name: "The Power Pair Stack",
                description: "The smartest reasoning models integrated directly into your IDE. Best for complex problem solving.",
                totalPrice: "$30+/mo",
                tools: ["github-copilot", "gemini-code-assist"]
            };
        }
        return {
            name: "The Smart Assistant Stack",
            description: "High-intelligence chat and search models available for free. Great for research and learning.",
            totalPrice: "$0/mo",
            tools: ["claude", "perplexity"]
        };
    };

    // Helper to get tool details
    const getToolDetails = (slug: string) => tools.find(t => t.slug === slug);

    const stack = isFinished ? getRecommendedStack() : null;

    useEffect(() => {
        if (stack) {
            trackStackRecommended(stack.name, stack.totalPrice);
        }
    }, [stack]);

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                        Find Your{" "}
                        <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                            Vibe Stack
                        </span>
                    </h1>

                    {!isFinished && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center gap-2"
                        >
                            <div className="flex gap-1">
                                {STEPS.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${idx <= stepIndex
                                            ? "w-8 bg-indigo-500"
                                            : "w-2 bg-muted"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-2">
                                Step {stepIndex + 1} of {STEPS.length}
                            </span>
                        </motion.div>
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
                            {/* Question Card */}
                            <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-12 shadow-xl">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                        {currentStep.question}
                                    </h2>
                                    <p className="text-muted-foreground">
                                        {currentStep.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {currentStep.options.map((option, index) => {
                                        const Icon = option.icon;
                                        return (
                                            <motion.button
                                                key={option.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                                onClick={() => handleOptionClick(option.id)}
                                                disabled={isAnimating}
                                                className="group relative flex flex-col items-center text-center p-8 rounded-2xl border border-border/50 bg-background/50 hover:bg-accent/50 hover:border-indigo-500/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5"
                                            >
                                                <div className={`p-4 rounded-2xl bg-linear-to-br ${option.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                                    <Icon className="h-8 w-8 text-white" />
                                                </div>
                                                <h3 className="text-xl font-semibold mb-2 text-foreground">{option.label}</h3>
                                                <p className="text-sm text-muted-foreground">{option.description}</p>

                                                <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {stepIndex > 0 && (
                                    <div className="mt-8 flex justify-center">
                                        <Button
                                            variant="ghost"
                                            onClick={handleBack}
                                            className="text-muted-foreground hover:text-foreground rounded-full"
                                        >
                                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="w-full"
                        >
                            {/* Stack Reveal Card */}
                            <div className="bg-linear-to-b from-indigo-500/10 via-purple-500/5 to-pink-500/5 border border-indigo-500/20 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl shadow-indigo-500/10 relative overflow-hidden">
                                {/* Decorative Background */}
                                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />

                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="flex items-center justify-center gap-2 mb-6">
                                        <div className="p-2 rounded-full bg-indigo-500/20">
                                            <CheckCircle2 className="h-6 w-6 text-indigo-400" />
                                        </div>
                                        <span className="font-medium tracking-wide uppercase text-sm text-indigo-400">
                                            Recommended Stack
                                        </span>
                                    </div>

                                    {/* Stack Name */}
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent"
                                    >
                                        {stack!.name}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-center"
                                    >
                                        {stack!.description}
                                    </motion.p>

                                    {/* Price Badge */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex justify-center mb-12"
                                    >
                                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                            <DollarSign className="h-5 w-5" />
                                            <span className="font-bold text-lg">{stack!.totalPrice}</span>
                                        </div>
                                    </motion.div>

                                    {/* Tools Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                        {stack!.tools.map((slug, index) => {
                                            const tool = getToolDetails(slug);
                                            if (!tool) return null;
                                            return (
                                                <motion.div
                                                    key={tool.slug}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5 + index * 0.1 }}
                                                >
                                                    <Link href={`/tool/${tool.slug}`} className="group block h-full">
                                                        <div className="h-full flex flex-col p-6 rounded-2xl border border-border/50 bg-background/80 hover:bg-accent/50 hover:border-indigo-500/50 transition-all duration-300 shadow-sm hover:shadow-lg">
                                                            <div className="flex items-start justify-between mb-4">
                                                                <div className={cn("p-3 rounded-xl bg-linear-to-br", tool.bgGradient)}>
                                                                    <tool.icon className={cn("h-6 w-6", tool.color)} />
                                                                </div>
                                                                <ArrowRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-indigo-500 transition-colors" />
                                                            </div>
                                                            <h3 className="text-lg font-bold mb-1">{tool.title}</h3>
                                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{tool.category}</p>
                                                            <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
                                                                {tool.description}
                                                            </p>
                                                            <Badge variant="secondary" className="mt-4 w-fit">
                                                                {tool.pricing}
                                                            </Badge>
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Alternative Stacks */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="border-t border-border/50 pt-8"
                                    >
                                        <p className="text-sm text-muted-foreground text-center mb-4">
                                            Not quite right? Try these alternatives:
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-3">
                                            <Button variant="outline" className="rounded-full">
                                                <Target className="h-4 w-4 mr-2" />
                                                More UI Tools
                                            </Button>
                                            <Button variant="outline" className="rounded-full">
                                                <TrendingUp className="h-4 w-4 mr-2" />
                                                Free Alternatives
                                            </Button>
                                            <Link href="/tools">
                                                <Button variant="outline" className="rounded-full">
                                                    Browse All
                                                </Button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="flex flex-col sm:flex-row justify-center gap-4"
                            >
                                <Button
                                    variant="outline"
                                    onClick={handleRestart}
                                    className="rounded-full h-12 px-6"
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" /> Start Over
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        if (stack) {
                                            navigator.clipboard.writeText(`Check out my recommended stack: ${stack.name} - ${window.location.href}`);
                                            alert("Stack link copied to clipboard!");
                                        }
                                    }}
                                    className="rounded-full h-12 px-6"
                                >
                                    <Share2 className="mr-2 h-4 w-4" /> Share Stack
                                </Button>
                                <Link href="/tools">
                                    <Button className="rounded-full h-12 px-8 shadow-lg shadow-indigo-500/20">
                                        Browse All Tools <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageBackground>
    );
}
