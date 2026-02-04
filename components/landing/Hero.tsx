"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import * as motion from "framer-motion/client";

export function Hero() {
    return (
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden border-b border-border/40 bg-background pt-32 md:pt-40">
            {/* Background Glow - Adjusted opacity for light mode */}
            <div className="absolute top-0 z-0 h-[50vh] w-full bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px]" />

            <div className="relative z-10 flex max-w-[980px] flex-col items-center gap-6 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-sm"
                >
                    <Sparkles className="mr-2 h-3.5 w-3.5" />
                    <span>Built with Vibe Coding</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
                >
                    <span className="bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                        AI Productivity
                    </span>{" "}
                    <span className="bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        Lab
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-[700px] text-lg text-muted-foreground md:text-xl"
                >
                    Curated tools to accelerate your development workflow.
                    Beautifully designed, developer-focused, and powered by intelligence.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col gap-4 sm:flex-row"
                >
                    <Link
                        href="/build"
                        className={buttonVariants({ variant: "default", size: "lg" }) + " h-12 rounded-full px-8 text-base font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"}
                    >
                        Start Building
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                        href="/tools"
                        className={buttonVariants({ variant: "outline", size: "lg" }) + " h-12 rounded-full border-border/50 bg-background/50 px-8 text-base backdrop-blur-sm hover:bg-accent/50"}
                    >
                        Explore Tools
                    </Link>
                </motion.div>
            </div>

            {/* Hero visual/grid background overlay */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </section>
    );
}
