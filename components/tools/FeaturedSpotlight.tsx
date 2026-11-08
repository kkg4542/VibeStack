"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ToolData } from "@/lib/tool-types";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";
import { useActiveSponsorship } from "@/hooks/use-sponsorships";
import { SponsorshipPlacements } from "@/lib/sponsorships";
import { AffiliateLink } from "@/components/ui/AffiliateLink";

interface FeaturedSpotlightProps {
    tool: ToolData;
}

/**
 * Featured tool band: one flat surface field, the icon on a square one tone
 * step down, display-face title, orange primary action with dark text.
 * No entrance animation (content is visible at full opacity on first paint).
 */
export function FeaturedSpotlight({ tool }: FeaturedSpotlightProps) {
    const { data } = useActiveSponsorship(SponsorshipPlacements.featuredSpotlight);
    const sponsoredTool = data?.sponsorship?.tool;
    const activeTool = sponsoredTool || tool;

    return (
        <div className="mb-16 bg-card p-6 md:p-10">
            <div className="flex flex-col items-center gap-8 md:flex-row">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center bg-background text-foreground">
                    <ToolIconRenderer slug={activeTool.slug} className="h-12 w-12" />
                </div>

                <div className="min-w-0 flex-1 text-center md:text-left">
                    <div className="mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[14px] md:justify-start">
                        <span className="bg-vibe-electric px-3 py-1 font-semibold text-vibe-deep">
                            Featured tool
                        </span>
                        {sponsoredTool && (
                            <span className="text-muted-foreground">Current sponsor</span>
                        )}
                        <span className="text-muted-foreground">Partner spotlight</span>
                    </div>

                    <h2 className="mb-4 font-display text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground text-balance">
                        {activeTool.title}
                    </h2>

                    <p className="mb-6 max-w-2xl text-[18px] leading-normal text-muted-foreground">
                        {activeTool.adCopy || activeTool.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
                        <Button
                            asChild
                            className="group h-12 rounded-none bg-vibe-electric px-8 text-[16px] font-semibold text-vibe-deep transition-transform duration-150 hover:bg-vibe-electric/90 active:translate-y-px motion-reduce:transition-none motion-reduce:active:translate-y-0"
                        >
                            <Link href={`/tool/${activeTool.slug}`}>
                                Try it now
                                <ArrowRight
                                    aria-hidden="true"
                                    className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                                />
                            </Link>
                        </Button>
                        <AffiliateLink
                            url={activeTool.affiliateUrl || activeTool.websiteUrl}
                            toolSlug={activeTool.slug}
                            toolName={activeTool.title}
                            variant="link"
                        >
                            Visit Official Site
                        </AffiliateLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
