"use client";

import { useState } from "react";
import { ArrowRight, Check, Rocket, Shield, Terminal, Zap, TrendingUp, Users, Award, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";
import { ServicesGrid } from "./components/ServicesGrid";
import { PricingSection } from "./components/PricingSection";
import { Testimonials } from "./components/Testimonials";

export default function ConsultingPage() {
    const [loading, setLoading] = useState(false);

    async function handleCheckout(placement: string) {
        setLoading(true);
        try {
            const res = await fetch('/api/sponsorships/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ placement })
            });

            const data = await res.json();
            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (error) {
            alert('Failed to start checkout. Please contact us at hello@usevibestack.com');
            setLoading(false);
        }
    }
    const services = [
        {
            title: "AI Workflow Audit",
            description: "We analyze your current development process and identify bottlenecks where AI agents can accelerate output by 10x.",
            icon: <Terminal className="h-6 w-6 text-vibe-purple" />,
            features: ["Codebase Analysis", "Agent Integration Plan", "ROI Estmation"],
        },
        {
            title: "Custom Agent Build",
            description: "Need a specialized agent for your internal data? We build secure, private RAG pipelines tailored to your business logic.",
            icon: <Zap className="h-6 w-6 text-purple-400" />,
            features: ["Private LLM Setup", "Custom vector DB", "Slack/Discord Integration"],
        },
        {
            title: "Vibe Coding Training",
            description: "Train your engineering team to move from 'writing code' to 'orchestrating agents'. The shift requires a new mindset.",
            icon: <Rocket className="h-6 w-6 text-pink-400" />,
            features: ["Prompt Architecture", "Cursor Mastery", "Review Workflows"],
        },
    ];

    return (
        <main className="relative min-h-screen bg-background pt-24 pb-20 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 h-[60vh] w-full max-w-[1200px] bg-vibe-purple/10 dark:bg-vibe-purple/20 blur-[140px] rounded-full px-4" />
            <div className="absolute top-[20%] left-[10%] z-0 h-[30vh] w-[30vh] bg-purple-500/10 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute top-[40%] right-[10%] z-0 h-[30vh] w-[30vh] bg-blue-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: "2s" }} />

            {/* Background pattern overlay */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />

            <div className="relative z-10">
                {/* Hero */}
                <section className="container mx-auto px-4 pt-20 pb-32 text-center">
                    <motion.div
                        initial={designSystem.animations.fadeInUp.initial}
                        animate={designSystem.animations.fadeInUp.animate}
                        transition={designSystem.animations.fadeInUp.transition}
                    >
                        <div className="mx-auto mb-6 flex max-w-fit items-center rounded-full border border-vibe-electric/30 bg-vibe-electric/10 px-4 py-2 text-sm font-medium text-vibe-electric backdrop-blur-md">
                            <span className="mr-2 flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vibe-electric opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-vibe-electric"></span>
                            </span>
                            Now Accepting Partners for Q1 2026
                        </div>

                        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-7xl text-balance leading-tight">
                            Promote Your AI Tool to{" "}
                            <span className="bg-linear-to-r from-vibe-electric via-vibe-purple to-vibe-pink bg-clip-text text-transparent">
                                Thousands of Developers
                            </span>
                        </h1>

                        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                            VibeStack is the fastest-growing community for AI productivity.
                            Showcase your product where the builders are.
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Button
                                size="lg"
                                className="rounded-full shadow-lg shadow-vibe-electric/20 px-8 text-base h-12"
                                onClick={() => handleCheckout('featuredSpotlight')}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Book a Sponsorship
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Link href="/tools">
                                <Button variant="outline" size="lg" className="rounded-full px-8 text-base h-12">
                                    View Our Reach
                                </Button>
                            </Link>
                            <p className="text-sm text-muted-foreground mt-2">
                                Or <a href="mailto:hello@usevibestack.com" className="underline">contact us</a> for custom packages
                            </p>
                        </div>
                    </motion.div>
                </section>

                <ServicesGrid />

                {/* Social Proof / Trust */}
                <section className="border-t border-border/40 bg-secondary/5 py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-12 text-3xl font-bold">Why Advertise with Us?</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="p-6">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                                    <Shield className="h-6 w-6 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-semibold">High Intent</h3>
                                <p className="mt-2 text-muted-foreground">Our users are actively looking for tools to adopt, not just browsing.</p>
                            </div>
                            <div className="p-6">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                                    <Rocket className="h-6 w-6 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-semibold">Developer Focused</h3>
                                <p className="mt-2 text-muted-foreground">Reach software engineers, founders, and CTOs making purchasing decisions.</p>
                            </div>
                            <div className="p-6">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                                    <Terminal className="h-6 w-6 text-amber-500" />
                                </div>
                                <h3 className="text-xl font-semibold">Native Feel</h3>
                                <p className="mt-2 text-muted-foreground">Ads are integrated directly into the UI, maintaining our premium aesthetic.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <PricingSection handleCheckout={handleCheckout} loading={loading} />

                {/* Sponsor Copy Guidelines */}
                <section className="container mx-auto px-4 pb-16">
                    <div className="mx-auto max-w-3xl rounded-2xl border border-border/50 bg-white p-8">
                        <h3 className="text-xl font-semibold text-foreground mb-3">Sponsor Copy Guidelines</h3>
                        <p className="text-muted-foreground mb-4">Keep it clear and honest. We review copy to maintain user trust.</p>
                        <ul className="space-y-2 text-sm text-foreground/80">
                            <li>Length: 60–120 characters (one-line summary)</li>
                            <li>Required: product name + one-sentence value</li>
                            <li>Avoid: exaggerated claims and guarantees</li>
                        </ul>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="border-y border-border/40 bg-secondary/5 py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 md:grid-cols-3">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-vibe-electric/10">
                                    <TrendingUp className="h-8 w-8 text-vibe-electric" />
                                </div>
                                <div className="text-4xl font-bold text-foreground mb-2">50K+</div>
                                <p className="text-muted-foreground">Monthly Visitors</p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10">
                                    <Users className="h-8 w-8 text-purple-500" />
                                </div>
                                <div className="text-4xl font-bold text-foreground mb-2">15K+</div>
                                <p className="text-muted-foreground">Newsletter Subscribers</p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500/10">
                                    <Award className="h-8 w-8 text-pink-500" />
                                </div>
                                <div className="text-4xl font-bold text-foreground mb-2">92%</div>
                                <p className="text-muted-foreground">Developer Audience</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Testimonials />

                {/* Final CTA */}
                <section className="container mx-auto px-4 py-20">
                    <motion.div
                        initial={designSystem.animations.fadeInUp.initial}
                        whileInView={designSystem.animations.fadeInUp.animate}
                        viewport={{ once: true }}
                        transition={designSystem.animations.fadeInUp.transition}
                        className="relative overflow-hidden rounded-3xl border border-vibe-electric/20 bg-linear-to-br from-vibe-electric/10 via-vibe-purple/5 to-vibe-pink/10 p-12 lg:p-16 text-center backdrop-blur-sm"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[20px_20px]" />
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <Mail className="w-16 h-16 mx-auto mb-6 text-vibe-electric" />
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Let&apos;s discuss how we can help you reach thousands of developers actively searching for tools like yours.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="rounded-full shadow-lg shadow-vibe-electric/20 px-8"
                                    onClick={() => handleCheckout('featuredSpotlight')}
                                    disabled={loading}
                                >
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Get Started Now
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Link href="mailto:hello@usevibestack.com?subject=Partnership%20Inquiry">
                                    <Button variant="outline" size="lg" className="rounded-full px-8">
                                        Or Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </section>

            </div>
        </main>
    );
}
