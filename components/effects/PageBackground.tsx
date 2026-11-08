"use client";

import { cn } from "@/lib/utils";

export type BackgroundVariant = "grid" | "gradient" | "clean" | "hero";

interface PageBackgroundProps {
  /**
   * Background style variant
   * Kept for compatibility. In direction B every variant renders the same
   * plain ground-coloured background (no grid, orbs or gradients).
   */
  variant?: BackgroundVariant;
  /**
   * Kept for compatibility; ignored (direction B has no glow orbs).
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
  className,
  children,
}: PageBackgroundProps) {
  // Direction B: every variant is a plain ground-coloured wrapper. No grid,
  // no orbs, no blur, no fade. `variant` and `showOrbs` stay in the props
  // contract (and BackgroundPresets) so existing call sites compile.

  // A <div>, not a <main>. app/layout.tsx already wraps every page in
  // <main id="main-content">, and this component renders inside it on 25
  // pages — so a <main> here nested one inside another, which is invalid and
  // leaves assistive tech and reader modes picking between two candidates for
  // the page's main content. Nothing selects this element by tag; the skip
  // link targets #main-content on the layout.
  return (
    <div
      className={cn(
        "relative min-h-svh bg-background pt-24 pb-20 overflow-hidden",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
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
