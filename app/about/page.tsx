"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Sparkles,
    Target,
    Zap,
    Heart,
    Rocket,
    Users,
    Mail,
    Twitter,
    Github,
    Linkedin,
    Send,
    Lightbulb,
    Code2,
    Palette,
    Clock
} from "lucide-react";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";
import { useState } from "react";
import { toast } from "sonner";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";

const team = [
    {
        name: "David Kim",
        role: "Founder & Developer",
        bio: "Full-stack developer passionate about AI tools and productivity.",
        avatar: "DK",
        social: {
            twitter: "#",
            github: "#",
            linkedin: "#"
        }
    }
];

const timeline = [
    {
        year: "2024",
        title: "The Beginning",
        description: "VibeStack started as a simple list of AI tools that actually worked.",
        icon: Lightbulb
    },
    {
        year: "2024",
        title: "Community Growth",
        description: "Reached 10,000+ developers using our curated recommendations.",
        icon: Users
    },
    {
        year: "2025",
        title: "AI Stack Finder",
        description: "Launched the interactive tool to help developers find their perfect stack.",
        icon: Code2
    },
    {
        year: "2026",
        title: "The Future",
        description: "Expanding into a comprehensive AI productivity platform.",
        icon: Rocket
    }
];

const values = [
    {
        title: "Design First",
        description: "Tools should be beautiful and intuitive. We believe great design is not just about looks—it's about how it works.",
        icon: Palette,
        color: "from-pink-500 to-rose-500"
    },
    {
        title: "Developer Centric",
        description: "We focus on tools that output code or help manage code. Everything we recommend is tested by real developers.",
        icon: Code2,
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Speed & Efficiency",
        description: "If it slows you down, it's not a productivity tool. We prioritize tools that enhance your workflow.",
        icon: Zap,
        color: "from-amber-500 to-orange-500"
    },
    {
        title: "Community Driven",
        description: "Built by developers, for developers. Our recommendations come from real-world usage and community feedback.",
        icon: Heart,
        color: "from-red-500 to-pink-500"
    }
];

const partners = [
    { name: "Vercel", logo: "▲" },
    { name: "OpenAI", logo: "◯" },
    { name: "Anthropic", logo: "◈" },
    { name: "GitHub", logo: "◎" },
    { name: "Linear", logo: "◐" },
    { name: "Notion", logo: "◼" }
];

export default function AboutPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitting(false);
    };

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-6xl mx-auto px-4">
                {/* Hero Section */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>About Us</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        Building the Future of{" "}
                        <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                            AI Productivity
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        We curate the best AI tools for developers, helping you navigate the rapidly evolving landscape
                        of AI-powered productivity software.
                    </p>
                </motion.div>

                {/* Mission & Vision Cards */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.1 }}
                    className="grid md:grid-cols-2 gap-6 mb-20"
                >
                    <Card className="border-indigo-500/20 bg-linear-to-br from-indigo-500/5 to-purple-500/5">
                        <CardContent className="p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-indigo-500/10">
                                    <Target className="h-6 w-6 text-indigo-500" />
                                </div>
                                <h2 className="text-2xl font-bold">Our Mission</h2>
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                To help developers discover and adopt AI tools that genuinely improve their workflow.
                                We cut through the hype to find tools that deliver real value.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-violet-500/20 bg-linear-to-br from-violet-500/5 to-pink-500/5">
                        <CardContent className="p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-violet-500/10">
                                    <Rocket className="h-6 w-6 text-violet-500" />
                                </div>
                                <h2 className="text-2xl font-bold">Our Vision</h2>
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                A world where every developer has access to the best AI tools, enabling them to build
                                better software faster and more efficiently than ever before.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Core Values */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.2 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-muted-foreground">The principles that guide everything we do</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={value.title}
                                    initial={designSystem.animations.fadeInUp.initial}
                                    animate={designSystem.animations.fadeInUp.animate}
                                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.3 + index * 0.1 }}
                                >
                                    <Card className="h-full border-border/50 hover:border-indigo-500/30 transition-colors group">
                                        <CardContent className="p-6">
                                            <div className={`p-3 rounded-xl bg-linear-to-br ${value.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                            <p className="text-muted-foreground">{value.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.4 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
                        <p className="text-muted-foreground">How VibeStack has evolved over time</p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

                        <div className="space-y-8">
                            {timeline.map((item, index) => {
                                const Icon = item.icon;
                                const isLeft = index % 2 === 0;

                                return (
                                    <motion.div
                                        key={item.title}
                                        initial={designSystem.animations.fadeInUp.initial}
                                        animate={designSystem.animations.fadeInUp.animate}
                                        transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.5 + index * 0.1 }}
                                        className={`relative flex items-center gap-4 md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                                            }`}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-indigo-500 rounded-full border-4 border-background md:-translate-x-1/2 z-10 flex items-center justify-center">
                                            <Icon className="h-4 w-4 text-white" />
                                        </div>

                                        {/* Content */}
                                        <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right md:pr-8' : 'md:pl-8'
                                            }`}>
                                            <Badge variant="secondary" className="mb-2">
                                                {item.year}
                                            </Badge>
                                            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Team Section */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.6 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
                        <p className="text-muted-foreground">The people behind VibeStack</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={designSystem.animations.fadeInUp.initial}
                                animate={designSystem.animations.fadeInUp.animate}
                                transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.7 + index * 0.1 }}
                            >
                                <Card className="text-center border-border/50 hover:border-indigo-500/30 transition-colors">
                                    <CardContent className="p-6">
                                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                                            {member.avatar}
                                        </div>
                                        <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                                        <p className="text-sm text-indigo-400 mb-3">{member.role}</p>
                                        <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                                        <div className="flex justify-center gap-2">
                                            <a href={member.social.twitter} className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors">
                                                <Twitter className="h-4 w-4" />
                                            </a>
                                            <a href={member.social.github} className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors">
                                                <Github className="h-4 w-4" />
                                            </a>
                                            <a href={member.social.linkedin} className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors">
                                                <Linkedin className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Partners */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.8 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Trusted By Industry Leaders</h2>
                        <p className="text-muted-foreground">Companies that believe in our mission</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {partners.map((partner, index) => (
                            <motion.div
                                key={partner.name}
                                initial={designSystem.animations.fadeInUp.initial}
                                animate={designSystem.animations.fadeInUp.animate}
                                transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.9 + index * 0.05 }}
                                className="flex items-center gap-3 px-6 py-3 rounded-full bg-card/50 border border-border/50"
                            >
                                <span className="text-2xl">{partner.logo}</span>
                                <span className="font-medium">{partner.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Section */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.9 }}
                >
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                            <p className="text-muted-foreground">Have a question or suggestion? We&apos;d love to hear from you.</p>
                        </div>

                        <Card className="border-indigo-500/20 bg-linear-to-br from-indigo-500/5 to-purple-500/5">
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Name</label>
                                            <Input
                                                placeholder="Your name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                                className="bg-background/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Email</label>
                                            <Input
                                                type="email"
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="bg-background/50"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Message</label>
                                        <Textarea
                                            placeholder="Tell us what's on your mind..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            rows={5}
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full rounded-full h-12 shadow-lg shadow-indigo-500/20"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            "Sending..."
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>

                                <div className="mt-8 pt-8 border-t border-border/50 text-center">
                                    <p className="text-sm text-muted-foreground mb-4">Or reach us directly at</p>
                                    <a
                                        href="mailto:hello@usevibestack.com"
                                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                                    >
                                        <Mail className="h-4 w-4" />
                                        hello@usevibestack.com
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </PageBackground>
    );
}
