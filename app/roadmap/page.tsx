"use client";

import * as motion from "framer-motion/client";
import {
    MapPin,
    CheckCircle2,
    Clock,
    Sparkles,
    Rocket,
    Zap,
    Users,
    Star,
    ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { designSystem } from "@/lib/design-system";
import Link from "next/link";

const roadmapItems = [
    {
        quarter: "Q1 2026",
        status: "completed",
        title: "Platform Foundation",
        description: "Core platform features",
        items: [
            { text: "Launched with 60+ curated AI tools", completed: true },
            { text: "Stack Finder quiz", completed: true },
            { text: "User authentication & favorites", completed: true },
            { text: "Tool comparison feature", completed: true },
            { text: "Review & rating system", completed: true }
        ]
    },
    {
        quarter: "Q2 2026",
        status: "completed",
        title: "Community & Content",
        description: "Building our community",
        items: [
            { text: "Blog with AI industry insights", completed: true },
            { text: "Stack submission system", completed: true },
            { text: "Newsletter launch", completed: true },
            { text: "Social sharing features", completed: true },
            { text: "Dark/light mode toggle", completed: true }
        ]
    },
    {
        quarter: "Q3 2026",
        status: "in-progress",
        title: "Enhanced Discovery",
        description: "Currently in development",
        items: [
            { text: "AI-powered tool recommendations", completed: false },
            { text: "Advanced filtering & search", completed: true },
            { text: "Category-specific landing pages", completed: true },
            { text: "User collections & lists", completed: false },
            { text: "Tool usage analytics", completed: false }
        ]
    },
    {
        quarter: "Q4 2026",
        status: "planned",
        title: "Pro Features",
        description: "Premium experiences",
        items: [
            { text: "VibeStack Pro subscription", completed: false },
            { text: "Exclusive deals & discounts", completed: false },
            { text: "API access for developers", completed: false },
            { text: "Integration guides & tutorials", completed: false },
            { text: "Team collaboration features", completed: false }
        ]
    },
    {
        quarter: "2027",
        status: "planned",
        title: "The Future",
        description: "Long-term vision",
        items: [
            { text: "Mobile app (iOS & Android)", completed: false },
            { text: "Browser extension", completed: false },
            { text: "Discord community", completed: false },
            { text: "AI chatbot assistant", completed: false },
            { text: "500+ tools in database", completed: false }
        ]
    }
];

const changelog = [
    {
        date: "February 2026",
        version: "v2.1.0",
        changes: [
            { type: "feature", text: "Added FAQ and Roadmap pages" },
            { type: "improvement", text: "Enhanced light mode visibility across all components" },
            { type: "fix", text: "Fixed TypeScript strict mode violations" },
            { type: "feature", text: "New category landing pages" }
        ]
    },
    {
        date: "January 2026",
        version: "v2.0.0",
        changes: [
            { type: "feature", text: "Redesigned UI with new design system" },
            { type: "feature", text: "Added Stack submission feature" },
            { type: "feature", text: "Launched consulting/advertising page" },
            { type: "improvement", text: "Improved tool card interactions with 3D effects" }
        ]
    },
    {
        date: "December 2025",
        version: "v1.5.0",
        changes: [
            { type: "feature", text: "Added blog section with 5+ articles" },
            { type: "feature", text: "Newsletter subscription system" },
            { type: "feature", text: "Tool comparison page" },
            { type: "improvement", text: "Performance optimizations" }
        ]
    },
    {
        date: "November 2025",
        version: "v1.0.0",
        changes: [
            { type: "feature", text: "Initial launch with 60+ tools" },
            { type: "feature", text: "Stack Finder quiz" },
            { type: "feature", text: "User favorites system" },
            { type: "feature", text: "Review & rating system" }
        ]
    }
];

function StatusBadge({ status }: { status: string }) {
    const styles = {
        completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        "in-progress": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        planned: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
    };

    const icons = {
        completed: CheckCircle2,
        "in-progress": Clock,
        planned: MapPin
    };

    const Icon = icons[status as keyof typeof icons];

    return (
        <Badge className={`${styles[status as keyof typeof styles]} border`}>
            <Icon className="w-3 h-3 mr-1" />
            {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    );
}

function ChangeTypeBadge({ type }: { type: string }) {
    const styles = {
        feature: "bg-vibe-electric/10 text-vibe-electric dark:text-vibe-electric",
        improvement: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        fix: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
    };

    return (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles[type as keyof typeof styles]}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
    );
}

export default function RoadmapPage() {
    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-5xl mx-auto px-4">
                {/* Hero Section */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibe-electric/10 border border-vibe-electric/20 text-vibe-electric text-sm font-medium mb-6">
                        <MapPin className="w-4 h-4" />
                        <span>Roadmap & Updates</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                        Our Journey{" "}
                        <span className="bg-linear-to-r from-vibe-electric via-purple-400 to-pink-500 bg-clip-text text-transparent">
                            & Roadmap
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        See what we&apos;ve built, what we&apos;re working on, and what&apos;s coming next.
                        We&apos;re building VibeStack in public.
                    </p>
                </motion.div>

                {/* Roadmap Timeline */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.1 }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <Rocket className="w-6 h-6 text-vibe-electric" />
                        <h2 className="text-2xl font-bold">Product Roadmap</h2>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

                        <div className="space-y-8">
                            {roadmapItems.map((item, index) => {
                                const isLeft = index % 2 === 0;

                                return (
                                    <motion.div
                                        key={item.quarter}
                                        initial={designSystem.animations.fadeInUp.initial}
                                        animate={designSystem.animations.fadeInUp.animate}
                                        transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.2 + index * 0.1 }}
                                        className={`relative flex items-start gap-4 md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                                            }`}
                                    >
                                        {/* Timeline Dot */}
                                        <div className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-4 border-background md:-translate-x-1/2 z-10 flex items-center justify-center ${item.status === 'completed' ? 'bg-emerald-500' :
                                                item.status === 'in-progress' ? 'bg-amber-500' : 'bg-slate-400'
                                            }`}>
                                            {item.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-white" />}
                                            {item.status === 'in-progress' && <Clock className="h-4 w-4 text-white" />}
                                            {item.status === 'planned' && <MapPin className="h-4 w-4 text-white" />}
                                        </div>

                                        {/* Content */}
                                        <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right md:pr-8' : 'md:pl-8'
                                            }`}>
                                            <Card className="border-border/50 hover:border-vibe-electric/30 transition-colors">
                                                <CardContent className="p-6">
                                                    <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                                                        <StatusBadge status={item.status} />
                                                        <Badge variant="secondary">{item.quarter}</Badge>
                                                    </div>
                                                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                                                    <ul className="space-y-2">
                                                        {item.items.map((listItem, i) => (
                                                            <li key={i} className={`flex items-center gap-2 text-sm ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                                                                {listItem.completed ? (
                                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                                ) : (
                                                                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                                                )}
                                                                <span className={listItem.completed ? 'text-foreground' : 'text-muted-foreground'}>
                                                                    {listItem.text}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Changelog */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.5 }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <Sparkles className="w-6 h-6 text-vibe-electric" />
                        <h2 className="text-2xl font-bold">Changelog</h2>
                    </div>

                    <div className="space-y-6">
                        {changelog.map((release, index) => (
                            <motion.div
                                key={release.version}
                                initial={designSystem.animations.fadeInUp.initial}
                                animate={designSystem.animations.fadeInUp.animate}
                                transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.6 + index * 0.1 }}
                            >
                                <Card className="border-border/50">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold">{release.version}</h3>
                                                <p className="text-sm text-muted-foreground">{release.date}</p>
                                            </div>
                                            {index === 0 && (
                                                <Badge className="bg-vibe-electric/10 text-vibe-electric dark:text-vibe-electric border-vibe-electric/20">
                                                    Latest
                                                </Badge>
                                            )}
                                        </div>

                                        <ul className="space-y-3">
                                            {release.changes.map((change, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <ChangeTypeBadge type={change.type} />
                                                    <span className="text-sm text-foreground">{change.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Feature Request CTA */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.8 }}
                    className="text-center"
                >
                    <Card className="border-vibe-electric/20 bg-linear-to-br from-vibe-electric/5 to-purple-500/5">
                        <CardContent className="p-8">
                            <Zap className="w-12 h-12 text-vibe-electric mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Have a feature idea?</h3>
                            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                                We&apos;re building VibeStack for you. Share your ideas and help shape the future of the platform.
                            </p>
                            <Button asChild className="rounded-full">
                                <Link href="/about" className="flex items-center gap-2">
                                    Submit Feedback
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </PageBackground>
    );
}
