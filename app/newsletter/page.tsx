"use client";

import * as motion from "framer-motion/client";
import { 
    Mail, 
    Calendar, 
    ArrowRight, 
    Sparkles,
    TrendingUp,
    Users,
    Zap,
    CheckCircle2,
    Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

// Sample newsletter archive data
const newsletterArchive = [
    {
        id: "feb-2026",
        title: "February 2026: The Rise of AI Agents",
        date: "February 1, 2026",
        readTime: "5 min read",
        description: "This month we explore the latest breakthrough in AI agents, featuring GPT-5.2's autonomous capabilities and the new wave of agent-first development tools.",
        highlights: ["GPT-5.2 Agent Mode", "Claude 5 Sonnet", "10 New Tools Added"],
        featured: true
    },
    {
        id: "jan-2026",
        title: "January 2026: AI Coding Wars",
        date: "January 1, 2026",
        readTime: "4 min read",
        description: "Cursor vs Windsurf vs Cody - we break down the top AI code editors and help you choose the right one for your workflow.",
        highlights: ["Cursor Review", "Windsurf Analysis", "Code Editor Comparison"],
        featured: false
    },
    {
        id: "dec-2025",
        title: "December 2025: Year in Review",
        date: "December 1, 2025",
        readTime: "7 min read",
        description: "Looking back at the biggest AI tool launches of 2025 and predicting what's coming in 2026. Plus our top picks for every category.",
        highlights: ["2025 Highlights", "2026 Predictions", "Best of 2025 Awards"],
        featured: false
    },
    {
        id: "nov-2025",
        title: "November 2025: Design Tools Revolution",
        date: "November 1, 2025",
        readTime: "4 min read",
        description: "AI-powered design tools are changing how creatives work. From v0 to Midjourney v7, we cover the latest innovations.",
        highlights: ["v0 Deep Dive", "Midjourney v7", "Design Tool Comparison"],
        featured: false
    },
    {
        id: "oct-2025",
        title: "October 2025: Productivity Power-Ups",
        date: "October 1, 2025",
        readTime: "5 min read",
        description: "Supercharge your workflow with these AI productivity tools. Notion AI, Mem, and Reflect compared head-to-head.",
        highlights: ["Notion AI Review", "Mem Analysis", "Workflow Automation"],
        featured: false
    },
    {
        id: "sep-2025",
        title: "September 2025: Getting Started with AI",
        date: "September 1, 2025",
        readTime: "6 min read",
        description: "New to AI tools? This guide covers everything you need to know to get started, from ChatGPT basics to advanced prompting techniques.",
        highlights: ["AI 101 Guide", "Prompt Engineering", "Tool Selection Tips"],
        featured: false
    }
];

const stats = [
    { label: "Subscribers", value: "2,500+", icon: Users },
    { label: "Weekly Issue", value: "Every Monday", icon: Calendar },
    { label: "Open Rate", value: "45%", icon: TrendingUp },
    { label: "Issues Sent", value: "24", icon: Zap }
];

function NewsletterCard({ issue, index }: { issue: typeof newsletterArchive[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Card className={`border-border/50 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg ${issue.featured ? 'border-indigo-500/30 bg-linear-to-br from-indigo-500/5 to-purple-500/5' : ''}`}>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {issue.date}
                            <span className="text-border">|</span>
                            <Clock className="w-4 h-4" />
                            {issue.readTime}
                        </div>
                        {issue.featured && (
                            <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20">
                                Latest
                            </Badge>
                        )}
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                        {issue.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                        {issue.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {issue.highlights.map((highlight, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                                {highlight}
                            </Badge>
                        ))}
                    </div>

                    <Button variant="ghost" className="p-0 h-auto text-indigo-400 hover:text-indigo-300 hover:bg-transparent group">
                        Read Issue
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default function NewsletterPage() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success("Successfully subscribed! Check your inbox for confirmation.");
        setEmail("");
        setIsSubmitting(false);
    };

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-5xl mx-auto px-4">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6"
                    >
                        <Mail className="w-4 h-4" />
                        <span>Weekly Newsletter</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        The VibeStack{" "}
                        <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                            Newsletter
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                        Get the latest AI tools, reviews, and productivity tips delivered to your inbox every Monday. 
                        No spam, just value.
                    </p>

                    {/* Subscribe Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-md mx-auto mb-12"
                    >
                        <form onSubmit={handleSubscribe} className="flex gap-3">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 bg-card/50 border-border/40"
                            />
                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="rounded-full px-6"
                            >
                                {isSubmitting ? "Subscribing..." : "Subscribe"}
                            </Button>
                        </form>
                        <p className="text-xs text-muted-foreground mt-3">
                            Join 2,500+ developers. Unsubscribe anytime.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
                    >
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.label} className="text-center">
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 mb-2">
                                        <Icon className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                                </div>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* What to Expect */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-16"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">What to Expect</h2>
                        <p className="text-muted-foreground">Every issue includes</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Sparkles,
                                title: "Tool Spotlights",
                                description: "In-depth reviews of the latest and most impactful AI tools"
                            },
                            {
                                icon: Zap,
                                title: "Productivity Tips",
                                description: "Practical advice on integrating AI into your workflow"
                            },
                            {
                                icon: TrendingUp,
                                title: "Industry Insights",
                                description: "Analysis of trends and predictions in the AI space"
                            }
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                >
                                    <Card className="h-full border-border/50">
                                        <CardContent className="p-6 text-center">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 mb-4">
                                                <Icon className="w-6 h-6 text-indigo-400" />
                                            </div>
                                            <h3 className="font-bold mb-2">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Archive */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Archive</h2>
                            <p className="text-muted-foreground text-sm">Past issues available to read</p>
                        </div>
                        <Badge variant="outline">{newsletterArchive.length} issues</Badge>
                    </div>

                    <div className="space-y-4">
                        {newsletterArchive.map((issue, index) => (
                            <NewsletterCard key={issue.id} issue={issue} index={index} />
                        ))}
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <Card className="border-indigo-500/20 bg-linear-to-br from-indigo-500/5 to-purple-500/5">
                        <CardContent className="p-8">
                            <Mail className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Ready to join?</h3>
                            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                                Get AI tool recommendations, productivity tips, and industry insights delivered weekly.
                            </p>
                            <Button asChild className="rounded-full">
                                <Link href="/about" className="flex items-center gap-2">
                                    Subscribe Now
                                    <CheckCircle2 className="w-4 h-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </PageBackground>
    );
}
