"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";
import { MagneticWrapper } from "@/components/effects/MagneticButton";
import { SocialProof } from "./hero/SocialProof";
import { HeroVisual } from "./hero/HeroVisual";

/**
 * Legacy hero (no longer on the home page; still reachable through
 * components/ui/LazyLoad.tsx). Flattened to direction B: display-face
 * headline, solid orange top bar, square flat buttons. No glow orbs, no
 * gradient text, no glass, and no opacity:0 entry state on its own markup.
 */
export function Hero() {
    return (
        <LazyMotionProvider>
            <section className="relative flex min-h-[80svh] flex-col justify-center bg-background pt-32 md:pt-40">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-vibe-electric" />

                <div className="relative mx-auto flex w-full max-w-[1100px] flex-col items-start gap-6 px-4">
                    <p className="text-[16px] font-semibold text-vibe-link">Built with Vibe Coding</p>

                    <h1 className="font-display text-[clamp(40px,6vw,96px)] leading-[0.88] text-balance text-foreground">
                        Find Your Perfect AI Stack
                    </h1>

                    <p className="max-w-[700px] text-[20px] leading-normal text-muted-foreground">
                        Stop searching for tools. Start using proven workflows.
                        Curated AI stacks for developers, designers, and creators.
                    </p>

                    <SocialProof delay={0.45} />

                    <HeroVisual delay={0.5} />

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                        <MagneticWrapper strength={0.15}>
                            <Link
                                id="hero-cta-build"
                                href="/build"
                                className="group inline-flex h-14 items-center justify-center gap-2 rounded-none bg-vibe-electric px-10 text-[18px] font-semibold text-vibe-deep transition-colors hover:bg-[#e8401a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                            >
                                Find My Stack
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                            </Link>
                        </MagneticWrapper>
                        <MagneticWrapper strength={0.15}>
                            <Link
                                id="hero-cta-tools"
                                href="/tools"
                                className="inline-flex h-14 items-center justify-center rounded-none bg-secondary px-10 text-[18px] font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                            >
                                Explore Tools
                            </Link>
                        </MagneticWrapper>
                    </div>
                </div>
            </section>
        </LazyMotionProvider>
    );
}
