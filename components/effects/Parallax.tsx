"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxProps {
    children: React.ReactNode;
    offset?: number;
    speed?: number;
    className?: string;
}

// Simple parallax wrapper
export function Parallax({
    children,
    offset = 50,
    speed = 0.5,
    className = "",
}: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y: smoothY }}>{children}</motion.div>
        </div>
    );
}

// Parallax background layer
export function ParallaxBackground({
    children,
    speed = 0.5,
    className = "",
}: {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div
                className="absolute inset-0 -z-10"
                style={{ y }}
            >
                {children}
            </motion.div>
        </div>
    );
}

// Parallax with scale effect
export function ParallaxScale({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div style={{ scale, opacity }}>{children}</motion.div>
        </div>
    );
}

// Multi-layer parallax for depth
export function MultiLayerParallax({
    layers,
    className = "",
}: {
    layers: {
        children: React.ReactNode;
        speed: number;
        zIndex?: number;
    }[];
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            {layers.map((layer, index) => {
                const y = useTransform(
                    scrollYProgress,
                    [0, 1],
                    [0, layer.speed * 200]
                );

                return (
                    <motion.div
                        key={index}
                        className="absolute inset-0"
                        style={{
                            y,
                            zIndex: layer.zIndex || index,
                        }}
                    >
                        {layer.children}
                    </motion.div>
                );
            })}
        </div>
    );
}

// Parallax text with letter animation
export function ParallaxText({
    text,
    className = "",
}: {
    text: string;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const words = text.split(" ");

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <div className="flex flex-wrap">
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + 1 / words.length;
                    const y = useTransform(
                        scrollYProgress,
                        [start, end],
                        ["100%", "0%"]
                    );

                    return (
                        <span key={i} className="mr-2 overflow-hidden">
                            <motion.span
                                className="inline-block"
                                style={{ y }}
                            >
                                {word}
                            </motion.span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

// Horizontal parallax for galleries
export function HorizontalParallax({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ x }} className="flex gap-4">
                {children}
            </motion.div>
        </div>
    );
}
