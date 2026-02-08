"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { designSystem } from "@/lib/design-system";

interface HeroVisualProps {
    delay?: number;
}

export function HeroVisual({ delay = 0.5 }: HeroVisualProps) {
    const shouldReduceMotion = useReducedMotion();

    const transition = {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: designSystem.animations.elegantEase,
        delay: shouldReduceMotion ? 0 : delay,
    };

    return (
        <m.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transition}
            className="my-8 relative max-w-md mx-auto motion-reduce:transform-none"
        >
            <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-2xl" />
            <Image
                src="/illustrations/coding-ai.svg"
                alt="AI-powered coding illustration"
                className="relative z-10 w-full h-auto drop-shadow-2xl"
                width={400}
                height={300}
                priority
            />
        </m.div>
    );
}
