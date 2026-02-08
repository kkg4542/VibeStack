"use client";

import { m } from "framer-motion";
import { designSystem } from "@/lib/design-system";

interface SocialProofProps {
    delay?: number;
}

export function SocialProof({ delay = 0.45 }: SocialProofProps) {
    const fadeInUp = designSystem.animations.fadeInUp;
    const shouldReduceMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

    const transition = {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: designSystem.animations.elegantEase,
        delay: shouldReduceMotion ? 0 : delay,
    };

    return (
        <m.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={transition}
            className="flex items-center gap-2 text-sm text-muted-foreground"
        >
            <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 border-2 border-background flex items-center justify-center text-[10px] font-bold text-white"
                    >
                        {String.fromCharCode(64 + i)}
                    </div>
                ))}
            </div>
            <span>
                <strong className="text-foreground">15,000+</strong> developers trust VibeStack
            </span>
        </m.div>
    );
}
