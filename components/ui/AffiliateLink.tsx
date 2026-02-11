"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { trackAffiliateClick } from "@/lib/analytics";
import { useState, useEffect } from "react";

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

  const handleClick = async () => {
    // Track in Google Analytics
    trackAffiliateClick(toolSlug, toolName, fullUrl);

    // Track in our database
    try {
      await fetch("/api/analytics/affiliate-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolSlug,
          toolName,
          url: fullUrl,
          abVariant: abVariant,
        }),
      });
    } catch (error) {
      // Error handled silently
    }
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
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="font-medium text-indigo-400 hover:underline truncate max-w-[150px]"
      >
        {children}
      </a>
    );
  }

  return (
    <Button
      size="lg"
      className={`rounded-full shadow-lg shadow-indigo-500/20 ${className || ""}`}
      asChild
    >
      <a
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {getButtonText()}
        <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );
}