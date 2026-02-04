"use client";

import { ArrowRight, Check, Rocket, Shield, Terminal, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
                            Accepting New Clients for Q1 2026
                        </div>

                        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
                            Building the Future <br />
                            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                                at the Speed of Thought
                            </span>
                        </h1>

                        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                            We help forward-thinking companies adopt "Vibe Coding" methodologies.
                            Don't just write software. Orchestrate it.
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link href="mailto:hello@usevibestack.com">
                                <Button size="lg" className="rounded-full shadow-lg shadow-indigo-500/20 px-8 text-base h-12">
                                    Contact via Email
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/blog/vibe-coding-manifesto">
                                <Button variant="outline" size="lg" className="rounded-full px-8 text-base h-12">
                                    Read the Manifesto
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* Services Grid */}
                <section className="container mx-auto px-4 py-20">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-foreground">How We Accelerate Your Team</h2>
                        <p className="mt-4 text-muted-foreground">Comprehensive services for the Agentic Era.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {services.map((service, idx) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10"
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/50 ring-1 ring-border group-hover:bg-indigo-500/10 group-hover:ring-indigo-500/30 transition-colors">
                                    {service.icon}
                                </div>
                                <h3 className="mb-3 text-2xl font-semibold text-foreground">{service.title}</h3>
                                <p className="mb-6 text-muted-foreground">{service.description}</p>
                                <ul className="space-y-3">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center text-sm text-foreground/80">
                                            <Check className="mr-3 h-4 w-4 text-indigo-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Social Proof / Trust */}
                <section className="border-t border-border/40 bg-secondary/5 py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-12 text-3xl font-bold">Why VibeStack?</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="p-6">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                                    <Shield className="h-6 w-6 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-semibold">100% Private</h3>
                                <p className="mt-2 text-muted-foreground">We build on your infrastructure. Your data never leaves your VPC.</p>
                            </div>
                            <div className="p-6">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                                    <Rocket className="h-6 w-6 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-semibold">Day 1 Value</h3>
                                <p className="mt-2 text-muted-foreground">Our "Starter Stacks" deploy in minutes, not months. Immediate ROI.</p>
                            </div>
                            <div className="p-6">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                                    <Terminal className="h-6 w-6 text-amber-500" />
                                </div>
                                <h3 className="text-xl font-semibold">Developer First</h3>
                                <p className="mt-2 text-muted-foreground">Built by engineers, for engineers. No low-code lock-in.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
