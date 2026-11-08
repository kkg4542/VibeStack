"use client";

import { ReactNode } from "react";
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

// Direction B: a flat surface card. No gradient, glow, blur, spotlight, tilt
// or float. tilt / tiltStrength / float / spotlight / glowOnHover /
// borderGradient / depth stay in the props contract so call sites compile,
// but are ignored. Every hover mode except "none" is a single tone step.
export function VibeCard({
  children,
  className,
  variant = "default",
  hover = "both",
  onClick,
  href,
}: VibeCardProps) {
  const variantClasses = {
    default: "bg-card border border-border",
    glass: "bg-card border border-border",
    elevated: "bg-card border border-border",
    outline: "bg-transparent border border-border",
    gradient: "bg-card border border-border",
  };

  const hoverClasses = {
    none: "",
    lift: "hover:bg-accent",
    glow: "hover:bg-accent",
    both: "hover:bg-accent",
  };

  const cardContent = (
    <div
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl text-card-foreground",
        "transition-colors duration-200 ease-out motion-reduce:transition-none",
        variantClasses[variant],
        hoverClasses[hover],
        (onClick || href) && "cursor-pointer",
        className
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
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
