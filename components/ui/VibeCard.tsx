"use client";

import { useRef, ReactNode, useState } from "react";
import { m, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VibeCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "elevated" | "outline" | "gradient";
  hover?: "lift" | "glow" | "both" | "none";
  tilt?: boolean;
  tiltStrength?: number;
  float?: boolean;
  spotlight?: boolean;
  glowOnHover?: boolean;
  borderGradient?: boolean;
  depth?: number;
  onClick?: () => void;
  href?: string;
}

export function VibeCard({
  children,
  className,
  variant = "default",
  hover = "both",
  tilt = false,
  tiltStrength = 10,
  float = false,
  spotlight = false,
  glowOnHover = true,
  borderGradient = false,
  depth = 20,
  onClick,
  href,
}: VibeCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltStrength, -tiltStrength]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltStrength, tiltStrength]), springConfig);

  // Glow position transforms
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const glowBackground = useTransform(
    [glowX, glowY],
    ([latestX, latestY]) =>
      `radial-gradient(400px circle at ${latestX}% ${latestY}%, rgba(0, 217, 255, 0.15), transparent 40%)`
  );

  const variantClasses = {
    default: "bg-card border-border/50",
    glass: "bg-white/5 backdrop-blur-xl border-white/10",
    elevated: "bg-card shadow-lg border-border/30",
    outline: "border-border bg-transparent",
    gradient: "border-gradient-vibe bg-vibe-deep/50",
  };

  const hoverClasses = {
    none: "",
    lift: "hover:-translate-y-1.5 hover:shadow-xl",
    glow: "hover:shadow-lg hover:shadow-vibe-electric/20 hover:border-vibe-electric/30",
    both: "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-vibe-electric/10 hover:border-vibe-electric/30",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    
    setMousePosition({ x: localX, y: localY });

    if (tilt && !shouldReduceMotion) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) / rect.width);
      y.set((e.clientY - centerY) / rect.height);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tilt) {
      x.set(0);
      y.set(0);
    }
  };

  const cardContent = (
    <m.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={tilt && !shouldReduceMotion ? {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      } : undefined}
      animate={float && !shouldReduceMotion ? {
        y: [0, -10, 0],
      } : undefined}
      transition={float && !shouldReduceMotion ? {
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      } : undefined}
      whileHover={!shouldReduceMotion && !tilt ? { y: -4 } : undefined}
      whileTap={onClick && !shouldReduceMotion ? { scale: 0.98 } : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "transition-all duration-300 ease-out",
        variantClasses[variant],
        hover !== "none" && hoverClasses[hover],
        (onClick || href) && "cursor-pointer",
        className
      )}
    >
      {/* Border gradient animation */}
      {borderGradient && (
        <m.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, #00d9ff, #ff00ff, #00d9ff)",
            backgroundSize: "200% 200%",
            padding: "1px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Spotlight effect */}
      {spotlight && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Cursor-following glow */}
      {glowOnHover && tilt && !shouldReduceMotion && (
        <m.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: glowBackground }}
        />
      )}

      {/* Content with 3D depth */}
      <div
        style={tilt && !shouldReduceMotion ? {
          transform: `translateZ(${depth}px)`,
        } : undefined}
        className="relative z-10 h-full"
      >
        {children}
      </div>

      {/* Ambient glow */}
      {glowOnHover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-br from-vibe-electric/5 via-transparent to-vibe-neon/5" />
        </div>
      )}
    </m.div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

// Backward compatibility - VibeCardSimple is now just VibeCard with variant="glass"
export function VibeCardSimple({
  children,
  className,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glow" | "gradient" | "glass";
}) {
  const variantMap: Record<string, VibeCardProps["variant"]> = {
    default: "default",
    glow: "glass",
    gradient: "gradient",
    glass: "glass",
  };

  return (
    <VibeCard variant={variantMap[variant]} hover="both" className={className}>
      {children}
    </VibeCard>
  );
}

// Backward compatibility - VibeCardInteractive is now VibeCard with onClick/href
export function VibeCardInteractive({
  children,
  onClick,
  href,
  ...props
}: VibeCardProps & { onClick?: () => void; href?: string }) {
  return (
    <VibeCard {...props} onClick={onClick} href={href}>
      {children}
    </VibeCard>
  );
}
