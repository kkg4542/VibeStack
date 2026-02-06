"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden border-b border-border/40 bg-background pt-32 md:pt-40">
            {/* Ambient Background Glows - Optimized */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 h-[60vh] w-full max-w-[1200px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px] rounded-full will-change-transform" />
            <div className="absolute top-[30%] left-[15%] z-0 h-[25vh] w-[25vh] bg-purple-500/8 blur-[80px] rounded-full" />

            <div className="relative z-10 flex max-w-[980px] flex-col items-center gap-6 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-md shadow-sm"
                >
                    <Sparkles className="mr-2 h-3.5 w-3.5" />
                    <span className="font-medium">Built with Vibe Coding</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        delay: 0.2,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
                >
                    <span className="bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                        AI Productivity
                    </span>{" "}
                    <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                        Lab
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        delay: 0.4,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed leading-relaxed"
                >
                    Curated tools to accelerate your development workflow.
                    Beautifully designed, developer-focused, and powered by intelligence.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1,
                        delay: 0.5,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="my-8 relative max-w-md mx-auto motion-reduce:transform-none"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
                    <img 
                        src="/illustrations/coding-ai.svg" 
                        alt="AI-powered coding illustration"
                        className="relative z-10 w-full h-auto"
                        width="400"
                        height="300"
                        loading="eager"
                        fetchPriority="high"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        delay: 0.6,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="flex flex-col gap-4 sm:flex-row mt-4 sm:gap-4"
                >
                    <Link
                        id="hero-cta-build" href="/build"
                        className={buttonVariants({ variant: "default", size: "lg" }) + " h-12 sm:h-14 rounded-full px-8 sm:px-10 text-sm sm:text-base font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 group"}
                    >
                        Start Building
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        id="hero-cta-tools" href="/tools"
                        className={buttonVariants({ variant: "outline", size: "lg" }) + " h-12 sm:h-14 rounded-full border-border/60 bg-background/50 px-8 sm:px-10 text-sm sm:text-base backdrop-blur-md hover:bg-accent/50 hover:-translate-y-0.5 transition-all duration-300"}
                    >
                        Explore Tools
                    </Link>
                </motion.div>
            </div>

            {/* Hero visual/grid background overlay - Enhanced contrast */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
        </section>
    );
}
