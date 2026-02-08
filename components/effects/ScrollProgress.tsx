"use client";

import { useEffect, useState } from "react";
import { m, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
    color?: string;
    height?: number;
    position?: "top" | "bottom";
    showPercentage?: boolean;
}

export function ScrollProgress({
    color = "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)", // indigo to purple to pink
    height = 3,
    position = "top",
    showPercentage = false,
}: ScrollProgressProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            setProgress(Math.round(latest * 100));
        });
    }, [scrollYProgress]);

    return (
        <>
            {/* Progress Bar */}
            <m.div
                className={`fixed left-0 right-0 z-[100] ${position === "top" ? "top-0" : "bottom-0"}`}
                style={{
                    scaleX,
                    transformOrigin: "0%",
                    background: color,
                    height,
                }}
            />

            {/* Percentage Indicator (optional) */}
            {showPercentage && (
                <m.div
                    className="fixed bottom-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1 text-sm font-medium text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {progress}%
                </m.div>
            )}
        </>
    );
}

// Circular progress indicator
export function ScrollProgressCircular({
    size = 50,
    strokeWidth = 4,
    color = "#6366f1",
}: {
    size?: number;
    strokeWidth?: number;
    color?: string;
}) {
    const { scrollYProgress } = useScroll();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            setProgress(latest);
        });
    }, [scrollYProgress]);

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <m.div
                className="relative"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    className="transform -rotate-90"
                >
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="rgba(99, 102, 241, 0.2)"
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress circle */}
                    <m.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 0.1 }}
                    />
                </svg>
                {/* Percentage text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-foreground">
                        {Math.round(progress * 100)}%
                    </span>
                </div>
            </m.div>
        </div>
    );
}

// Reading progress for blog posts
export function ReadingProgress() {
    const [readingTime, setReadingTime] = useState(0);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    useEffect(() => {
        // Estimate reading time based on word count
        const content = document.querySelector("article");
        if (content) {
            const text = content.textContent || "";
            const wordCount = text.split(/\s+/).length;
            const minutes = Math.ceil(wordCount / 200); // Average reading speed
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setReadingTime(minutes);
        }
    }, []);

    return (
        <div className="sticky top-14 z-40 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between py-2 text-xs text-muted-foreground">
                <span>Reading time: {readingTime} min</span>
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Reading
                </span>
            </div>
            <m.div
                className="h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
                style={{ scaleX }}
            />
        </div>
    );
}
