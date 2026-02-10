"use client";

import { getToolIcon } from "@/components/icons/tool-icons";
import { toolIconMap } from "@/components/icons/tool-icons";
import { Github } from "lucide-react";

interface ToolIconRendererProps {
  slug: string;
  className?: string;
}

export function ToolIconRenderer({ slug, className }: ToolIconRendererProps) {
  // Direct conditional rendering instead of creating component during render
  const IconComponent = toolIconMap[slug] || Github;
  return <IconComponent className={className} />;
}
