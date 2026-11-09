"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { trackAffiliateClick } from "@/lib/analytics";

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
  /**
   * Exact button text. When given it wins over the A/B copy, so a list of
   * links can all read the same. Only the default (button) variant uses it.
   */
  label?: string;
  /**
   * The tool's pricing tier. When given and not Free/Freemium, the "Try Free"
   * copy is never shown for this tool.
   */
  pricing?: string;
}

const AB_VARIANTS = ["A", "B", "C"] as const;
type AbVariant = (typeof AB_VARIANTS)[number];

const AB_COPY: Record<AbVariant, string> = {
  A: "Visit Website",
  B: "Try Free",
  C: "Get Started",
};

/**
 * Deterministic variant per tool. Hashing the slug (instead of Math.random +
 * localStorage) means server and client always agree, so there is no hydration
 * mismatch, and a given tool shows the same copy to every visitor.
 */
function variantForSlug(slug: string): AbVariant {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return AB_VARIANTS[hash % AB_VARIANTS.length];
}

export function AffiliateLink({
  url,
  toolSlug,
  toolName,
  children,
  variant: buttonVariant = "default",
  className,
  abTestVariant,
  label,
  pricing,
}: AffiliateLinkProps) {
  let abVariant: AbVariant = abTestVariant ?? variantForSlug(toolSlug);
  // "Try Free" must never be attached to a paid tool.
  if (abVariant === "B" && pricing && pricing !== "Free" && pricing !== "Freemium") {
    abVariant = "A";
  }

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

  const buttonText = label ?? AB_COPY[abVariant];

  if (buttonVariant === "link") {
    return (
      <a
        href={redirectUrl}
        target="_blank"
        rel={AFFILIATE_REL}
        onClick={handleClick}
        className="inline-flex min-h-10 items-center font-medium text-vibe-link hover:underline truncate max-w-[150px] md:min-h-0"
      >
        {children}
      </a>
    );
  }

  return (
    <Button
      size="lg"
      className={`rounded-none bg-vibe-electric text-vibe-deep hover:bg-vibe-electric/90 ${className || ""}`}
      asChild
    >
      <a
        href={redirectUrl}
        target="_blank"
        rel={AFFILIATE_REL}
        onClick={handleClick}
      >
        {buttonText}
        <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );
}