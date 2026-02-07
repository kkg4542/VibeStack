"use client";

import { cn } from "@/lib/utils";

export type BackgroundVariant = "grid" | "gradient" | "clean" | "hero";

interface PageBackgroundProps {
  /**
   * Background style variant
   * - grid: Subtle grid pattern with radial fade (default for content pages)
   * - gradient: Rich gradient orbs without grid
   * - clean: Plain background, no effects (good for forms/ads)
   * - hero: Rich gradients + subtle grid (good for landing pages)
   */
  variant?: BackgroundVariant;
  /**
   * Show additional decorative glow orbs
   */
  showOrbs?: boolean;
  /**
   * Custom className for the container
   */
  className?: string;
  /**
   * Children to render inside the background
   */
  children: React.ReactNode;
}

/**
 * Unified page background component for consistent design across the app.
 * 
 * Usage:
 * - Main/Hero pages: variant="hero" showOrbs={true}
 * - Content pages (Tools, Blog, etc.): variant="grid" showOrbs={false}
 * - Clean pages (Forms, Ads): variant="clean" showOrbs={false}
 */
export function PageBackground({
  variant = "grid",
  showOrbs = false,
  className,
  children,
}: PageBackgroundProps) {
  const hasGrid = variant === "grid" || variant === "hero";
  const hasGradientOrbs = variant === "gradient" || variant === "hero" || showOrbs;

  return (
    <main
      className={cn(
        "relative min-h-screen bg-background pt-24 pb-20 overflow-hidden",
        className
      )}
    >
      {/* Grid Pattern - for grid and hero variants */}
      {hasGrid && (
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"
          aria-hidden="true"
        />
      )}

      {/* Gradient Orbs - for gradient, hero, or when explicitly enabled */}
      {hasGradientOrbs && (
        <>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 z-0 h-[50vh] w-full max-w-[1400px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[140px]"
            aria-hidden="true"
          />
          <div
            className="absolute top-[30%] left-[10%] z-0 h-[30vh] w-[30vh] bg-purple-500/10 blur-[100px] rounded-full"
            aria-hidden="true"
          />
          <div
            className="absolute top-[50%] right-[10%] z-0 h-[30vh] w-[30vh] bg-blue-500/10 blur-[100px] rounded-full"
            aria-hidden="true"
          />
        </>
      )}

      {/* Extra glow for hero pages */}
      {variant === "hero" && (
        <>
          <div
            className="absolute bottom-0 left-[20%] z-0 h-[40vh] w-[40vh] bg-pink-500/5 blur-[120px] rounded-full"
            aria-hidden="true"
          />
          <div
            className="absolute top-[60%] right-[20%] z-0 h-[35vh] w-[35vh] bg-cyan-500/5 blur-[100px] rounded-full"
            aria-hidden="true"
          />
        </>
      )}

      {/* Bottom fade gradient for smooth transition to footer */}
      {variant !== "clean" && (
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent z-0"
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </main>
  );
}

/**
 * Preset configurations for common page types
 */
export const BackgroundPresets = {
  /** For landing/home pages - Rich hero effect */
  hero: {
    variant: "hero" as const,
    showOrbs: true,
  },
  /** For content pages (Tools, Blog, Search, etc.) */
  content: {
    variant: "grid" as const,
    showOrbs: false,
  },
  /** For clean pages (Forms, Ads, Simple pages) */
  clean: {
    variant: "clean" as const,
    showOrbs: false,
  },
  /** For pages that want gradient orbs without grid */
  gradient: {
    variant: "gradient" as const,
    showOrbs: true,
  },
};
