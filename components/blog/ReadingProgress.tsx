"use client";

import { m, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <m.div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-100 h-1.5 origin-left bg-vibe-electric"
            style={{ scaleX }}
        />
    );
}
