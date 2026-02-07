"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightProps {
    children: React.ReactNode;
    className?: string;
    size?: number;
    color?: string;
}

export function Spotlight({ 
    children, 
    className = "", 
    size = 400,
    color = "rgba(99, 102, 241, 0.15)" // indigo-500 with low opacity
}: SpotlightProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            ${size}px circle at ${mouseX}px ${mouseY}px,
                            ${color},
                            transparent 80%
                        )
                    `,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// Alternative: Background spotlight that follows cursor
export function BackgroundSpotlight({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className={`relative ${className}`}>
            <motion.div
                className="pointer-events-none fixed inset-0 z-0 opacity-40"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(99, 102, 241, 0.06),
                            transparent 40%
                        )
                    `,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// Card spotlight effect with glow
export function CardSpotlight({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ 
            x: e.clientX - rect.left, 
            y: e.clientY - rect.top 
        });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.1), transparent 40%)`,
                }}
            />
            <div className="relative z-10 h-full">{children}</div>
        </div>
    );
}
