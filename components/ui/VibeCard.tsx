"use client";

import { useRef, ReactNode } from "react";
import { m, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface VibeCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glowOnHover?: boolean;
  floatAnimation?: boolean;
  borderGradient?: boolean;
  depth?: number;
}

export function VibeCard({
  children,
  className,
  tiltStrength = 10,
  glowOnHover = true,
  floatAnimation = false,
  borderGradient = false,
  depth = 20,
}: VibeCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smooth tilt
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltStrength, -tiltStrength]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltStrength, tiltStrength]), springConfig);

  // Transform for glow position (MUST be at top level, not inside conditional)
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  // Compute glow background at top level to satisfy React Hooks rules
  const glowBackground = useTransform(
    [glowX, glowY],
    ([latestX, latestY]) =>
      `radial-gradient(400px circle at ${latestX}% ${latestY}%, rgba(0, 217, 255, 0.15), transparent 40%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize mouse position relative to center (-0.5 to 0.5)
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={floatAnimation ? {
        y: [0, -10, 0],
      } : undefined}
      transition={floatAnimation ? {
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      } : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-white/5 to-white/0",
        "border border-white/10",
        "backdrop-blur-xl",
        "transition-colors duration-300",
        "group cursor-pointer",
        className
      )}
    >
      {/* Animated gradient border */}
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

      {/* Glow effect following cursor */}
      {glowOnHover && (
        <m.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: glowBackground,
          }}
        />
      )}

      {/* Content with 3D depth */}
      <div
        style={{
          transform: `translateZ(${depth}px)`,
        }}
        className="relative z-10 h-full"
      >
        {children}
      </div>

      {/* Ambient glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-vibe-electric/5 via-transparent to-vibe-neon/5" />
      </div>
    </m.div>
  );
}

// Simpler version without 3D tilt
interface VibeCardSimpleProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glow" | "gradient" | "glass";
}

export function VibeCardSimple({
  children,
  className,
  variant = "default",
}: VibeCardSimpleProps) {
  const variantStyles = {
    default: "bg-card/50 border-border/50 hover:border-vibe-electric/30",
    glow: "bg-card/50 border-border/50 hover:shadow-lg hover:shadow-vibe-electric/20 hover:border-vibe-electric/30",
    gradient: "border-gradient-vibe bg-vibe-deep/50",
    glass: "bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10",
  };

  return (
    <m.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6",
        "transition-all duration-300",
        "group cursor-pointer",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </m.div>
  );
}

// Interactive card with click animation
interface VibeCardInteractiveProps extends VibeCardProps {
  onClick?: () => void;
  href?: string;
}

export function VibeCardInteractive({
  children,
  onClick,
  href,
  ...props
}: VibeCardInteractiveProps) {
  const cardContent = (
    <VibeCard {...props}>
      {children}
    </VibeCard>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {cardContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="block w-full h-full text-left">
      {cardContent}
    </button>
  );
}
