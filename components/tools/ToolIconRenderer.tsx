"use client";

import { getToolIcon } from "@/lib/tool-icons";

interface ToolIconRendererProps {
  slug: string;
  className?: string;
}

export function ToolIconRenderer({ slug, className }: ToolIconRendererProps) {
  const IconComponent = getToolIcon(slug);
  return <IconComponent className={className} />;
}
