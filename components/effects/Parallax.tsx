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
            {layers.map((layer, index) => (
                <ParallaxLayer
                    key={index}
                    layer={layer}
                    index={index}
                    progress={scrollYProgress}
                />
            ))}
        </div>
    );
}

function ParallaxLayer({
    layer,
    index,
    progress,
}: {
    layer: {
        children: React.ReactNode;
        speed: number;
        zIndex?: number;
    };
    index: number;
    progress: any;
}) {
    const y = useTransform(progress, [0, 1], [0, layer.speed * 200]);

    return (
        <motion.div
            className="absolute inset-0"
            style={{
                y,
                zIndex: layer.zIndex || index,
            }}
        >
            {layer.children}
        </motion.div>
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
                {words.map((word, i) => (
                    <ParallaxWord
                        key={i}
                        word={word}
                        index={i}
                        total={words.length}
                        progress={scrollYProgress}
                        className="mr-2 overflow-hidden"
                    />
                ))}
            </div>
        </div>
    );
}

function ParallaxWord({
    word,
    index,
    total,
    progress,
    className,
}: {
    word: string;
    index: number;
    total: number;
    progress: any; // Using explicit type for MotionValue is complex, any is fine here or MotionValue<number>
    className: string;
}) {
    const start = index / total;
    const end = start + 1 / total;
    const y = useTransform(progress, [start, end], ["100%", "0%"]);

    return (
        <span className={className}>
            <motion.span className="inline-block" style={{ y }}>
                {word}
            </motion.span>
        </span>
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
