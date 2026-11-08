"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { ToolData } from "@/lib/tool-types";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";
import { useActiveSponsorship } from "@/hooks/use-sponsorships";
import { SponsorshipPlacements } from "@/lib/sponsorships";

interface SidebarAdProps {
    tool: ToolData;
}

export function SidebarAd({ tool }: SidebarAdProps) {
    const { data } = useActiveSponsorship(SponsorshipPlacements.sidebarAd);
    const sponsoredTool = data?.sponsorship?.tool;
    const activeTool = sponsoredTool || tool;

    return (
        <div className="group mb-8 bg-card p-6">
            <div className="space-y-4">
                <p className="text-[14px] text-muted-foreground">
                    {sponsoredTool ? "Current sponsor" : "Promoted"}
                </p>

                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-background text-foreground">
                        <ToolIconRenderer slug={activeTool.slug} className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-[18px] font-semibold text-foreground transition-colors group-hover:text-vibe-link">
                            {activeTool.title}
                        </h4>
                        <p className="mt-1 line-clamp-2 text-base text-muted-foreground">
                            {activeTool.adCopy || activeTool.description}
                        </p>
                    </div>
                </div>

                <Button
                    asChild
                    className="h-11 w-full rounded-none bg-vibe-electric text-[16px] font-semibold text-vibe-deep hover:bg-vibe-electric/90"
                >
                    <Link href={`/tool/${activeTool.slug}`}>
                        Learn More
                        <ExternalLink aria-hidden="true" className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
