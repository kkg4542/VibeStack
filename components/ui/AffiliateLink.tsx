"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { trackAffiliateClick } from "@/lib/analytics";
import { useState } from "react";

/**
 * Deliberately without "noreferrer". The href is same-origin (/go/[slug]), and
 * that route reads the Referer header to record WHICH page produced the click —
 * the admin dashboard's top-earning-pages view is built on exactly that. With
 * noreferrer every click would land as "(direct/unknown)". The outbound hop to
 * the affiliate is made by our own redirect, under the site's Referrer-Policy,
 * so nothing extra reaches the destination either way.
 */
const AFFILIATE_REL = "sponsored noopener";

interface AffiliateLinkProps {
  url: string;
  toolSlug: string;
  toolName: string;
  children: React.ReactNode;
  variant?: "default" | "link";
  className?: string;
  abTestVariant?: "A" | "B" | "C";
}

export function AffiliateLink({
  url,
  toolSlug,
  toolName,
  children,
  variant: buttonVariant = "default",
  className,
  abTestVariant
}: AffiliateLinkProps) {
  // Initialize state with lazy function to avoid setState in useEffect
  const [abVariant, setAbVariant] = useState<"A" | "B" | "C">(() => {
    if (abTestVariant) {
      return abTestVariant;
    }

    // Check localStorage for saved variant
    if (typeof window !== 'undefined') {
      const savedVariant = localStorage.getItem(`ab_variant_${toolSlug}`);
      if (savedVariant && ["A", "B", "C"].includes(savedVariant)) {
        return savedVariant as "A" | "B" | "C";
      }
    }

    // Randomly assign if not found
    const variants: ("A" | "B" | "C")[] = ["A", "B", "C"];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];

    // Save to localStorage for consistency
    if (typeof window !== 'undefined') {
      localStorage.setItem(`ab_variant_${toolSlug}`, randomVariant);
    }

    return randomVariant;
  });

  const fullUrl = `${url}${url.includes("?") ? "&" : "?"}ref=vibestack&utm_source=vibestack`;
  // Every outbound affiliate click routes through the server redirect so
  // click tracking happens server-side (100% reliable) instead of relying on
  // a client-side fetch that can be blocked or fail silently.
  const redirectUrl = `/go/${toolSlug}?v=${abVariant}`;

  const handleClick = () => {
    // Track in Google Analytics. The DB record is written server-side by
    // /go/[slug] itself, so there's no client-side tracking call here.
    trackAffiliateClick(toolSlug, toolName, fullUrl);
  };

  // Get button text based on A/B variant
  const getButtonText = () => {
    switch (abVariant) {
      case "A":
        return "Visit Website";
      case "B":
        return "Try Free";
      case "C":
        return "Get Started";
      default:
        return children;
    }
  };

  if (buttonVariant === "link") {
    return (
      <a
        href={redirectUrl}
        target="_blank"
        rel={AFFILIATE_REL}
        onClick={handleClick}
        className="font-medium text-vibe-link hover:underline truncate max-w-[150px]"
      >
        {children}
      </a>
    );
  }

  return (
    <Button
      size="lg"
      className={`rounded-full shadow-lg shadow-vibe-electric/20 ${className || ""}`}
      asChild
    >
      <a
        href={redirectUrl}
        target="_blank"
        rel={AFFILIATE_REL}
        onClick={handleClick}
      >
        {getButtonText()}
        <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );
}