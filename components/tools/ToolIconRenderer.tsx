"use client";

import { toolIconMap } from "@/components/icons/tool-icons";

interface ToolIconRendererProps {
  slug: string;
  className?: string;
}

export function ToolIconRenderer({ slug, className }: ToolIconRendererProps) {
  // The map always resolves: a real brand icon, or a lettered mark of the
  // tool's initials. There is no borrowed-logo fallback any more.
  const IconComponent = toolIconMap[slug];
  return <IconComponent className={className} />;
}
