"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import { ToolData } from "@/lib/tool-types";
import { getToolIcon } from "@/lib/tool-icons";

interface SidebarAdProps {
    tool: ToolData;
}

export function SidebarAd({ tool }: SidebarAdProps) {
    const Icon = getToolIcon(tool.slug);

    return (
        <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 mb-8 group transition-all duration-300 hover:border-indigo-500/40">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />

            <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-indigo-400 border-indigo-500/30 bg-indigo-500/5 text-[10px] uppercase tracking-wider font-bold">
                        Promoted
                    </Badge>
                    <Sparkles className="h-4 w-4 text-indigo-400/50" />
                </div>

                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-secondary/50 border border-border/20 ${tool.color || "text-foreground"}`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-foreground group-hover:text-indigo-500 transition-colors">
                            {tool.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {tool.adCopy || tool.description}
                        </p>
                    </div>
                </div>

                <Button asChild size="sm" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-500/10">
                    <Link href={`/tool/${tool.slug}`}>
                        Learn More
                        <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
