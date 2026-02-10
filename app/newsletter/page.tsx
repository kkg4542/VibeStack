"use client";

import { m } from "framer-motion";
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
import { designSystem } from "@/lib/design-system";

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

const fadeInUp = designSystem.animations.fadeInUp;

function NewsletterCard({ issue, index }: { issue: typeof newsletterArchive[0]; index: number }) {
    return (
        <m.div
            initial={fadeInUp.initial}
            whileInView={fadeInUp.animate}
            viewport={{ once: true }}
            transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
        >
            <Card className={`${designSystem.cards.interactive} ${issue.featured ? designSystem.cards.highlighted : ''}`}>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">{issue.date}</p>
                            <h3 className="font-bold text-lg mb-2 group-hover:text-vibe-electric transition-colors">
                                {issue.title}
                            </h3>
                        </div>
                        {issue.featured && (
                            <Badge className="bg-vibe-electric/10 text-vibe-electric border-vibe-electric/20">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Latest
                            </Badge>
                        )}
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {issue.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {issue.highlights.map((highlight) => (
                            <span 
                                key={highlight}
                                className="text-xs px-2 py-1 rounded-full bg-background border border-border/50"
                            >
                                {highlight}
                            </span>
                        ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {issue.readTime}
                        </span>
                        <Link 
                            href={`/newsletter/${issue.id}`}
                            className="flex items-center gap-1 text-vibe-electric hover:text-vibe-cyan transition-colors"
                        >
                            Read <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </m.div>
    );
}

export default function NewsletterPage() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                toast.success("Successfully subscribed! Check your inbox for confirmation.");
                setEmail("");
            } else {
                const data = await response.json();
                toast.error(data.error || "Failed to subscribe. Please try again.");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className={`container ${designSystem.spacing.container} mx-auto px-4 py-16 md:py-24`}>
                {/* Hero */}
                <m.div
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={fadeInUp.transition}
                    className="text-center mb-16"
                >
                    <m.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${designSystem.badges.primary} text-sm font-medium mb-6`}
                    >
                        <Mail className="w-4 h-4" />
                        <span>Weekly Newsletter</span>
                    </m.div>

                    <h1 className={`${designSystem.typography.hero} mb-6 max-w-4xl mx-auto`}>
                        The VibeStack{" "}
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${designSystem.gradients.text}`}>
                            Newsletter
                        </span>
                    </h1>

                    <m.p
                        initial={fadeInUp.initial}
                        animate={fadeInUp.animate}
                        transition={{ ...fadeInUp.transition, delay: 0.2 }}
                        className={`${designSystem.typography.subtitle} max-w-3xl mx-auto mb-8`}
                    >
                        Get the latest AI tools, reviews, and productivity tips delivered to your inbox every Monday. 
                        No spam, just value.
                    </m.p>

                    {/* Subscribe Form */}
                    <m.div
                        initial={fadeInUp.initial}
                        animate={fadeInUp.animate}
                        transition={{ ...fadeInUp.transition, delay: 0.3 }}
                        className="max-w-md mx-auto mb-12"
                    >
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 bg-card/50 border-border/40 h-12"
                            />
                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={`${designSystem.buttons.medium} bg-gradient-to-r from-vibe-electric to-vibe-cyan hover:shadow-lg hover:shadow-vibe-electric/30`}
                            >
                                {isSubmitting ? "Subscribing..." : "Subscribe"}
                            </Button>
                        </form>
                        <p className="text-xs text-muted-foreground mt-3">
                            Join 2,500+ developers. Unsubscribe anytime.
                        </p>
                    </m.div>

                    {/* Stats */}
                    <m.div
                        initial={fadeInUp.initial}
                        animate={fadeInUp.animate}
                        transition={{ ...fadeInUp.transition, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
                    >
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <m.div 
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-vibe-electric/10 mb-2">
                                        <Icon className="w-5 h-5 text-vibe-electric" />
                                    </div>
                                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                                </m.div>
                            );
                        })}
                    </m.div>
                </m.div>

                {/* What to Expect */}
                <m.div
                    initial={fadeInUp.initial}
                    whileInView={fadeInUp.animate}
                    viewport={{ once: true }}
                    transition={{ ...fadeInUp.transition, delay: 0.2 }}
                    className="mb-20"
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
                                description: "Actionable workflows and techniques to boost your output"
                            },
                            {
                                icon: CheckCircle2,
                                title: "Curated Picks",
                                description: "Hand-selected tools that actually deliver on their promises"
                            }
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <m.div
                                    key={item.title}
                                    initial={fadeInUp.initial}
                                    whileInView={fadeInUp.animate}
                                    viewport={{ once: true }}
                                    transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                                >
                                    <Card className="text-center h-full">
                                        <CardContent className="p-6">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-vibe-electric/10 mb-4">
                                                <Icon className="w-6 h-6 text-vibe-electric" />
                                            </div>
                                            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground text-sm">{item.description}</p>
                                        </CardContent>
                                    </Card>
                                </m.div>
                            );
                        })}
                    </div>
                </m.div>

                {/* Archive */}
                <div>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">Newsletter Archive</h2>
                        <p className="text-muted-foreground">Browse previous issues</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsletterArchive.map((issue, index) => (
                            <NewsletterCard key={issue.id} issue={issue} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </PageBackground>
    );
}
