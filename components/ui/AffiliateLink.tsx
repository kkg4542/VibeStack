"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { trackAffiliateClick } from "@/lib/analytics";

interface AffiliateLinkProps {
  url: string;
  toolSlug: string;
  toolName: string;
  children: React.ReactNode;
  variant?: "default" | "link";
  className?: string;
}

export function AffiliateLink({ 
  url, 
  toolSlug, 
  toolName, 
  children,
  variant = "default",
  className
}: AffiliateLinkProps) {
  const fullUrl = `${url}${url.includes('?') ? '&' : '?'}ref=vibestack&utm_source=vibestack`;

  const handleClick = () => {
    trackAffiliateClick(toolSlug, toolName, fullUrl);
  };

  if (variant === "link") {
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
      className={`rounded-full shadow-lg shadow-indigo-500/20 ${className || ''}`}
      asChild
    >
      <a
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {children}
        <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );
}
