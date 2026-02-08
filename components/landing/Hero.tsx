"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { designSystem } from "@/lib/design-system";
import { BackgroundGlows } from "./hero/BackgroundGlows";
import { SocialProof } from "./hero/SocialProof";
import { HeroVisual } from "./hero/HeroVisual";

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
                <BackgroundGlows />

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
                        className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance"
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

                    <SocialProof delay={0.45} />

                    <HeroVisual delay={0.5} />

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
            </section>
        </LazyMotionProvider>
    );
}

