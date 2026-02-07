"use client";

import { ArrowRight, Check, Rocket, Shield, Terminal, Zap, TrendingUp, Users, Award, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as motion from "framer-motion/client";

export default function ConsultingPage() {
    const services = [
        {
            title: "AI Workflow Audit",
            description: "We analyze your current development process and identify bottlenecks where AI agents can accelerate output by 10x.",
            icon: <Terminal className="h-6 w-6 text-indigo-400" />,
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 h-[60vh] w-full max-w-[1200px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[140px] rounded-full px-4" />
            <div className="absolute top-[20%] left-[10%] z-0 h-[30vh] w-[30vh] bg-purple-500/10 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute top-[40%] right-[10%] z-0 h-[30vh] w-[30vh] bg-blue-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: "2s" }} />

            {/* Background pattern overlay */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />

            <div className="relative z-10">
                {/* Hero */}
                <section className="container mx-auto px-4 pt-20 pb-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mx-auto mb-6 flex max-w-fit items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-400 backdrop-blur-md">
                            <span className="mr-2 flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Now Accepting Partners for Q1 2026
                        </div>

                        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
                            Promote Your AI Tool to <br />
                            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                                Thousands of Developers
                            </span>
                        </h1>

                        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                            VibeStack is the fastest-growing community for AI productivity.
                            Showcase your product where the builders are.
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link href="mailto:hello@usevibestack.com?subject=Sponsorship%20Inquiry">
                                <Button size="lg" className="rounded-full shadow-lg shadow-indigo-500/20 px-8 text-base h-12">
                                    Book a Sponsorship
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/tools">
                                <Button variant="outline" size="lg" className="rounded-full px-8 text-base h-12">
                                    View Our Reach
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* Services Grid */}
                <section className="container mx-auto px-4 py-20">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-foreground">Advertising Solutions</h2>
                        <p className="mt-4 text-muted-foreground">High-impact placements to drive growth.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10"
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/50 ring-1 ring-border group-hover:bg-indigo-500/10 group-hover:ring-indigo-500/30 transition-colors">
                                <Rocket className="h-6 w-6 text-pink-400" />
                            </div>
                            <h3 className="mb-3 text-2xl font-semibold text-foreground">Featured Spotlight</h3>
                            <p className="mb-6 text-muted-foreground">Get the prime spot on our homepage and tools usage list. Includes a custom verified badge.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-indigo-500" />
                                    Top of Homepage Placement
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-indigo-500" />
                                    &quot;Featured&quot; Badge
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-indigo-500" />
                                    ~15k Monthly Impressions
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10"
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/50 ring-1 ring-border group-hover:bg-indigo-500/10 group-hover:ring-indigo-500/30 transition-colors">
                                <Zap className="h-6 w-6 text-purple-400" />
                            </div>
                            <h3 className="mb-3 text-2xl font-semibold text-foreground">Sidebar Ads</h3>
                            <p className="mb-6 text-muted-foreground">Contextual targeting on product detail pages. Reach users exploring your competitors.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-indigo-500" />
                                    Category Targeting
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-indigo-500" />
                                    Sticky Sidebar Visibility
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-indigo-500" />
                                    High Intent Traffic
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10"
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/50 ring-1 ring-border group-hover:bg-indigo-500/10 group-hover:ring-indigo-500/30 transition-colors">
                                <Terminal className="h-6 w-6 text-indigo-400" />
                            </div>
                            <h3 className="mb-3 text-2xl font-semibold text-foreground">Newsletter</h3>
                            <p className="mb-6 text-muted-foreground">Sponsor our weekly dispatch to 5,000+ AI engineers and early adopters.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-indigo-500" />
                                    Dedicated Sponsor Slot
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-indigo-500" />
                                    40%+ Open Rate
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-indigo-500" />
                                    Exclusive Shout-out
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

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

                {/* Pricing Section */}
                <section className="container mx-auto px-4 py-24">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Transparent Pricing</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Simple, straightforward rates with no hidden fees. All packages include detailed analytics and performance tracking.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                        {/* Starter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-8 transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10"
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Sidebar Ads</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-foreground">$299</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>Category-targeted placement</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>~8k monthly impressions</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>Analytics dashboard</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>A/B testing support</span>
                                </li>
                            </ul>
                            <Link href="mailto:hello@usevibestack.com?subject=Sidebar%20Ads%20Inquiry">
                                <Button variant="outline" className="w-full rounded-full">
                                    Get Started
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Professional - Highlighted */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="group relative overflow-hidden rounded-3xl border-2 border-indigo-500/50 bg-linear-to-b from-indigo-500/10 to-card/50 p-8 shadow-xl shadow-indigo-500/20 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/30"
                        >
                            <div className="absolute top-4 right-4">
                                <Badge className="bg-indigo-500 text-white border-indigo-500">Most Popular</Badge>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Featured Spotlight</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-foreground">$799</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>Homepage hero placement</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>~15k monthly impressions</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>&quot;Featured&quot; badge on listing</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>Priority in search results</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>Social media mentions</span>
                                </li>
                            </ul>
                            <Link href="mailto:hello@usevibestack.com?subject=Featured%20Spotlight%20Inquiry">
                                <Button className="w-full rounded-full shadow-lg">
                                    Get Started
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Enterprise */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-8 transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10"
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Newsletter Sponsor</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-foreground">$499</span>
                                    <span className="text-muted-foreground">/issue</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>Dedicated sponsor slot</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>5,000+ subscribers</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>40%+ open rate</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <span>Custom creative support</span>
                                </li>
                            </ul>
                            <Link href="mailto:hello@usevibestack.com?subject=Newsletter%20Sponsorship%20Inquiry">
                                <Button variant="outline" className="w-full rounded-full">
                                    Get Started
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground mt-8">
                        All prices in USD. Custom packages available for annual commitments.
                    </p>
                </section>

                {/* Stats Section */}
                <section className="border-y border-border/40 bg-secondary/5 py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 md:grid-cols-3">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
                                    <TrendingUp className="h-8 w-8 text-indigo-500" />
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

                {/* Testimonials */}
                <section className="container mx-auto px-4 py-24">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-4">What Our Partners Say</h2>
                        <p className="text-muted-foreground">Trusted by leading AI companies and developer tools.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm"
                        >
                            <div className="mb-4 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Award key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                                ))}
                            </div>
                            <p className="text-sm text-foreground/90 mb-4">
                                &quot;VibeStack drove 500+ quality signups in our first month. The developer audience is exactly who we needed to reach.&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-indigo-500/20" />
                                <div>
                                    <div className="font-semibold text-sm text-foreground">Sarah Chen</div>
                                    <div className="text-xs text-muted-foreground">VP Marketing, DevTools Inc</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm"
                        >
                            <div className="mb-4 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Award key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                                ))}
                            </div>
                            <p className="text-sm text-foreground/90 mb-4">
                                &quot;Best ROI we&apos;ve seen from any developer marketing channel. The team is responsive and the analytics are detailed.&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-purple-500/20" />
                                <div>
                                    <div className="font-semibold text-sm text-foreground">Marcus Rodriguez</div>
                                    <div className="text-xs text-muted-foreground">Growth Lead, AI Startup</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm"
                        >
                            <div className="mb-4 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Award key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                                ))}
                            </div>
                            <p className="text-sm text-foreground/90 mb-4">
                                &quot;The newsletter sponsorship was a game-changer. High-quality clicks and actual conversions, not just vanity metrics.&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-pink-500/20" />
                                <div>
                                    <div className="font-semibold text-sm text-foreground">Jessica Park</div>
                                    <div className="text-xs text-muted-foreground">Founder, CodeFlow</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="container mx-auto px-4 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 p-12 lg:p-16 text-center backdrop-blur-sm"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[20px_20px]" />
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <Mail className="w-16 h-16 mx-auto mb-6 text-indigo-400" />
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Let&apos;s discuss how we can help you reach thousands of developers actively searching for tools like yours.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="mailto:hello@usevibestack.com?subject=Partnership%20Inquiry">
                                    <Button size="lg" className="rounded-full shadow-lg shadow-indigo-500/20 px-8">
                                        Schedule a Call
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/tools">
                                    <Button variant="outline" size="lg" className="rounded-full px-8">
                                        View Our Reach
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
