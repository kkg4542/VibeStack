"use client";

import { cn } from "@/lib/utils";
import { m, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

interface VibeCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "elevated" | "outline";
  hover?: "lift" | "glow" | "both" | "none";
  tilt?: boolean;
  float?: boolean;
  spotlight?: boolean;
  onClick?: () => void;
}

export function VibeCard({
  children,
  className,
  variant = "default",
  hover = "both",
  tilt = false,
  float = false,
  spotlight = false,
  onClick,
}: VibeCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || shouldReduceMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTransform({ rotateX, rotateY });
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  const variantClasses = {
    default: "bg-card border border-border/50",
    glass: "bg-white border border-border shadow-sm dark:bg-card/50 dark:backdrop-blur-xl dark:border-white/5",
    elevated: "bg-card shadow-lg border border-border/30",
    outline: "border border-border bg-transparent",
  };

  const hoverClasses = {
    none: "",
    lift: "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl",
    glow: "transition-all duration-300 ease-out hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/20",
    both: "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30",
  };

  return (
    <m.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-xl overflow-hidden",
        variantClasses[variant],
        hoverClasses[hover],
        float && !shouldReduceMotion && "animate-vibe-float",
        onClick && "cursor-pointer",
        className
      )}
      style={{
        transform: tilt && !shouldReduceMotion
          ? `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`
          : undefined,
        transition: tilt ? "transform 0.1s ease-out" : undefined,
      }}
      whileHover={!shouldReduceMotion && !tilt ? { y: -4 } : undefined}
      whileTap={onClick && !shouldReduceMotion ? { scale: 0.98 } : undefined}
    >
      {/* Spotlight effect */}
      {spotlight && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </m.div>
  );
}
