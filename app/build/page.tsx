"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2, Paintbrush, Brain, Layout, ArrowLeft, CheckCircle2, DollarSign, GraduationCap, Zap } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { tools } from "@/lib/tools";
import { cn } from "@/lib/utils";

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
        options: [
            { id: "ui", label: "Design UI / Frontend", icon: Paintbrush, description: "Crafting interfaces" },
            { id: "logic", label: "Write Code / Logic", icon: Code2, description: "Backend & Systems" },
            { id: "partner", label: "Pair Programming", icon: Brain, description: "AI Assistance" },
        ],
    },
    {
        id: "experience",
        question: "What's your experience level?",
        options: [
            { id: "beginner", label: "Beginner / No-Code", icon: GraduationCap, description: "Keep it simple" },
            { id: "pro", label: "Pro / Developer", icon: Code2, description: "Give me control" },
        ],
    },
    {
        id: "budget",
        question: "What is your budget?",
        options: [
            { id: "free", label: "Free Tier Only", icon: DollarSign, description: "$0 / month" },
            { id: "paid", label: "Willing to Pay", icon: Zap, description: "For best performance" },
        ],
    },
];

export default function BuildPage() {
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const currentStep = STEPS[stepIndex];
    const isLastStep = stepIndex === STEPS.length - 1;
    const isFinished = stepIndex >= STEPS.length;

    const handleOptionClick = (optionId: string) => {
        setAnswers(prev => ({ ...prev, [currentStep.id]: optionId }));
        if (isLastStep) {
            setStepIndex(prev => prev + 1);
        } else {
            setStepIndex(prev => prev + 1);
        }
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
                    description: "Generate beautiful UI from text prompts without writing complex CSS.",
                    totalPrice: "$0/mo (Free tiers)",
                    tools: ["v0", "builder-io"]
                };
            }
            return {
                name: "The Product Designer Stack",
                description: "Professional tools to convert Figma designs directly into production code.",
                totalPrice: "$19+/mo",
                tools: ["builder-io", "v0"]
            };
        }

        // Coding/Logic Stacks
        if (goal === "logic") {
            if (experience === "beginner") {
                return {
                    name: "The Learner Stack",
                    description: "Zero-setup environments that explain code as you write it.",
                    totalPrice: "$0/mo",
                    tools: ["cursor", "replit-ai"]
                };
            }
            if (budget === "paid") {
                return {
                    name: "The 10x Engineer Stack",
                    description: "Autonomous agents and massive context windows for maximum velocity.",
                    totalPrice: "$40+/mo",
                    tools: ["devin", "supermaven", "linear"]
                };
            }
            return {
                name: "The Efficiency Stack",
                description: "Fast, free, and smart tools to speed up your workflow.",
                totalPrice: "$0/mo",
                tools: ["supermaven", "cursor"]
            };
        }

        // Partner Stacks (Default)
        if (budget === "paid") {
            return {
                name: "The Power Pair Stack",
                description: "The smartest reasoning models integrated directly into your IDE.",
                totalPrice: "$30+/mo",
                tools: ["github-copilot", "gemini-code-assist"]
            };
        }
        return {
            name: "The Smart Assistant Stack",
            description: "High-intelligence chat and search models available for free.",
            totalPrice: "$0/mo",
            tools: ["claude", "perplexity"]
        };
    };

    // Helper to get tool details
    const getToolDetails = (slug: string) => tools.find(t => t.slug === slug);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-20">
            <div className="absolute top-0 z-0 h-[50vh] w-full bg-indigo-500/5 blur-[120px]" />

            <div className="z-10 w-full max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">
                        Find Your <span className="text-indigo-500">Vibe Stack</span>
                    </h1>
                    {!isFinished && (
                        <p className="text-muted-foreground text-lg">
                            Step {stepIndex + 1} of {STEPS.length}: {currentStep.question}
                        </p>
                    )}
                </motion.div>

                <AnimatePresence mode="wait">
                    {!isFinished ? (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full max-w-2xl mx-auto"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentStep.options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleOptionClick(option.id)}
                                        className="group relative flex flex-col items-center text-center p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-accent/50 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
                                    >
                                        <div className="p-4 rounded-full bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                                            <option.icon className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-xl font-medium mb-2 text-foreground">{option.label}</h3>
                                        <p className="text-sm text-muted-foreground">{option.description}</p>
                                    </button>
                                ))}
                            </div>

                            {stepIndex > 0 && (
                                <div className="mt-8 flex justify-center">
                                    <Button variant="ghost" onClick={handleBack} className="text-muted-foreground hover:text-foreground">
                                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full"
                        >
                            {/* Stack Reveal Card */}
                            <div className="bg-linear-to-b from-indigo-500/10 to-card/50 border border-indigo-500/20 rounded-3xl p-8 md:p-12 mb-12 shadow-2xl shadow-indigo-500/10">
                                <div className="flex items-center justify-center gap-2 mb-6 text-indigo-400">
                                    <CheckCircle2 className="h-6 w-6" />
                                    <span className="font-medium tracking-wide uppercase text-sm">Recommended Stack</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                                    {getRecommendedStack().name}
                                </h2>
                                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                    {getRecommendedStack().description}
                                </p>

                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-12">
                                    <span className="font-semibold">{getRecommendedStack().totalPrice}</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                                    {getRecommendedStack().tools.map((slug) => {
                                        const tool = getToolDetails(slug);
                                        if (!tool) return null;
                                        return (
                                            <Link key={tool.slug} href={`/tool/${tool.slug}`} className="group relative">
                                                <div className="h-full flex flex-col p-6 rounded-2xl border border-border/50 bg-background/80 hover:bg-accent/50 hover:border-indigo-500/50 transition-all duration-300">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className={cn("p-3 rounded-lg bg-linear-to-br", tool.bgGradient)}>
                                                            <tool.icon className={cn("h-6 w-6", tool.color)} />
                                                        </div>
                                                        <ArrowRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-indigo-500 transition-colors" />
                                                    </div>
                                                    <h3 className="text-lg font-bold mb-1">{tool.title}</h3>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{tool.category}</p>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {tool.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex justify-center gap-4">
                                <Button
                                    variant="outline"
                                    onClick={handleRestart}
                                    className="rounded-full h-12 px-6"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Start Over
                                </Button>
                                <Link href="/tools">
                                    <Button className="rounded-full h-12 px-8 shadow-lg shadow-indigo-500/20">
                                        Browse All Tools <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
