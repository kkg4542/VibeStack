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
  const [abVariant, setAbVariant] = useState<"A" | "B" | "C">("A");
  
  // A/B testing setup
  useEffect(() => {
    if (abTestVariant) {
      setAbVariant(abTestVariant);
    } else {
      // Randomly assign variant if not provided
      const variants: ("A" | "B" | "C")[] = ["A", "B", "C"];
      const savedVariant = localStorage.getItem(`ab_variant_${toolSlug}`);
      if (savedVariant && ["A", "B", "C"].includes(savedVariant)) {
        setAbVariant(savedVariant as "A" | "B" | "C");
      } else {
        const randomVariant = variants[Math.floor(Math.random() * variants.length)];
        localStorage.setItem(`ab_variant_${toolSlug}`, randomVariant);
        setAbVariant(randomVariant);
      }
    }
  }, [toolSlug, abTestVariant]);

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
      console.error("Failed to track click:", error);
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