"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { designSystem } from "@/lib/design-system";

export function Hero() {
    const shouldReduceMotion = useReducedMotion();
    const fadeInUp = designSystem.animations.fadeInUp;
    const elegantEase = designSystem.animations.elegantEase;

    const transition = {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: elegantEase
    };

    const delayedTransition = (delay: number) => ({
        ...transition,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <LazyMotionProvider>
            <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden border-b border-border/40 bg-background pt-32 md:pt-40">
                {/* Ambient Background Glows - Optimized (Issue 16) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 h-[60vh] w-full max-w-[1200px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[80px] rounded-full will-change-transform" />
                <div className="absolute top-[30%] left-[15%] z-0 h-[25vh] w-[25vh] bg-purple-500/5 blur-[60px] rounded-full" />

                <div className="relative z-10 flex max-w-[980px] flex-col items-center gap-6 px-4 text-center">
                    <m.div
                        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={transition}
                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-md shadow-sm"
                    >
                        <Sparkles className="mr-2 h-3.5 w-3.5" />
                        <span className="font-medium">Built with Vibe Coding</span>
                    </m.div>

                    <m.h1
                        initial={fadeInUp.initial}
                        animate={fadeInUp.animate}
                        transition={delayedTransition(0.2)}
                        className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        <span className="bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                            Find Your Perfect
                        </span>{" "}
                        <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                            AI Stack
                        </span>
                    </m.h1>

                    <m.p
                        initial={fadeInUp.initial}
                        animate={fadeInUp.animate}
                        transition={delayedTransition(0.4)}
                        className="max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed leading-relaxed"
                    >
                        Stop searching for tools. Start using proven workflows.
                        Curated AI stacks for developers, designers, and creators.
                    </m.p>

                    {/* Social Proof */}
                    <m.div
                        initial={fadeInUp.initial}
                        animate={fadeInUp.animate}
                        transition={delayedTransition(0.45)}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-background flex items-center justify-center text-[10px] font-bold text-white"
                                >
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <span>
                            <strong className="text-foreground">15,000+</strong> developers trust VibeStack
                        </span>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={delayedTransition(0.5)}
                        className="my-8 relative max-w-md mx-auto motion-reduce:transform-none"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-2xl" />
                        <Image
                            src="/illustrations/coding-ai.svg"
                            alt="AI-powered coding illustration"
                            className="relative z-10 w-full h-auto drop-shadow-2xl"
                            width={400}
                            height={300}
                            priority
                        />
                    </m.div>

                    <m.div
                        initial={fadeInUp.initial}
                        animate={fadeInUp.animate}
                        transition={delayedTransition(0.6)}
                        className="flex flex-col gap-5 sm:flex-row mt-6 sm:gap-4"
                    >
                        <MagneticButton strength={0.15}>
                            <Link
                                id="hero-cta-build" href="/build"
                                className={buttonVariants({ variant: "default", size: "lg" }) + " h-12 sm:h-14 rounded-full px-8 sm:px-10 text-sm sm:text-base font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 group"}
                            >
                                Find My Stack
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </MagneticButton>
                        <MagneticButton strength={0.15}>
                            <Link
                                id="hero-cta-tools" href="/tools"
                                className={buttonVariants({ variant: "outline", size: "lg" }) + " h-12 sm:h-14 rounded-full border-border/60 bg-background/50 px-8 sm:px-10 text-sm sm:text-base backdrop-blur-md hover:bg-accent/50 hover:-translate-y-0.5 transition-all duration-300"}
                            >
                                Explore Tools
                            </Link>
                        </MagneticButton>
                    </m.div>
                </div>

                {/* Hero visual/grid background overlay - Enhanced contrast (Issue 17) */}
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808025_1px,transparent_1px),linear-gradient(to_bottom,#80808025_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
            </section>
        </LazyMotionProvider>
    );
}
