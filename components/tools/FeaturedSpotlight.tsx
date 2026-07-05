"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToolData } from "@/lib/tool-types";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";
import { useActiveSponsorship } from "@/hooks/use-sponsorships";
import { SponsorshipPlacements } from "@/lib/sponsorships";
import { AffiliateLink } from "@/components/ui/AffiliateLink";

interface FeaturedSpotlightProps {
    tool: ToolData;
}

export function FeaturedSpotlight({ tool }: FeaturedSpotlightProps) {
    const { data } = useActiveSponsorship(SponsorshipPlacements.featuredSpotlight);
    const sponsoredTool = data?.sponsorship?.tool;
    const activeTool = sponsoredTool || tool;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-8 mb-16"
        >
            {/* Ambient background effects */}
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />

            <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-secondary/50 border border-border/30 ${activeTool.color || "text-foreground"} shadow-2xl shadow-primary/20 transition-transform duration-500 group-hover:scale-110`}>
                    <ToolIconRenderer slug={activeTool.slug} className="h-12 w-12" />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                        <Badge className="bg-primary text-primary-foreground border-none px-3 py-1 flex items-center gap-1.5 shadow-lg shadow-primary/20">
                            <Sparkles className="h-3 w-3" />
                            Featured Tool
                        </Badge>
                        {sponsoredTool && (
                            <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10">
                                Current Sponsor
                            </Badge>
                        )}
                        <Badge variant="outline" className="text-muted-foreground border-primary/20 dark:border-white/10 uppercase tracking-widest text-[10px] font-bold">
                            Partner Spotlight
                        </Badge>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-brand italic">
                        {activeTool.title}
                    </h2>

                    <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                        {activeTool.adCopy || activeTool.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-6 h-auto text-lg font-semibold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                            <Link href={`/tool/${activeTool.slug}`}>
                                Try it now
                                <ArrowRight className="ml-2 h-5 w-5" />
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
        </motion.div>
    );
}
