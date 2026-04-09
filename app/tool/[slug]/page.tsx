import { notFound } from "next/navigation";
import { getToolBySlug, getTools } from "@/lib/tools-db";
import { ToolData } from "@/lib/tool-types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, ArrowLeft, Star, Heart, Scale, Sparkles, TrendingUp, Target, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Metadata } from "next";
import { SocialShare } from "@/components/ui/SocialShare";
import { AffiliateLink } from "@/components/ui/AffiliateLink";
import { SidebarAd } from "@/components/tools/SidebarAd";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { SimpleAccordionItem } from "@/components/ui/simple-accordion";

import { ToolHero } from "./components/ToolHero";
import { ToolSEO } from "./components/ToolSEO";



// Generate static params for all tools
export async function generateStaticParams() {
    const tools = await getTools();
    return tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const tool = await getToolBySlug(slug);
    if (!tool) return { title: "Tool Not Found" };

    const url = `https://usevibestack.com/tool/${tool.slug}`;

    return {
        title: `${tool.title} Review & Features - AI Productivity Lab`,
        description: tool.description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: `${tool.title} - VibeStack AI Tools`,
            description: tool.description,
            url: url,
            type: "website",
            images: [
                {
                    url: `https://usevibestack.com/api/og?title=${encodeURIComponent(tool.title)}`,
                    width: 1200,
                    height: 630,
                    alt: tool.title,
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: tool.title,
            description: tool.description,
        }
    };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let tool: ToolData | null = null;
    let allTools: ToolData[] = [];
    try {
        tool = await getToolBySlug(slug);
    } catch (e) {
        console.error("[ToolPage] getToolBySlug failed:", e);
        throw e;
    }

    if (!tool) {
        notFound();
    }

    try {
        allTools = await getTools();
    } catch (e) {
        console.error("[ToolPage] getTools failed:", e);
        allTools = [];
    }

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-6xl mx-auto px-4">
                {/* Back Link */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                >
                    <Link
                        href="/tools"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Tools
                    </Link>
                </motion.div>

                {/* Hero Section - Enhanced */}
                <ToolHero tool={tool} />

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Key Features - Desktop */}
                        <div className="hidden md:block">
                            <motion.section
                                initial={designSystem.animations.fadeInUp.initial}
                                whileInView={designSystem.animations.fadeInUp.animate}
                                viewport={{ once: true }}
                                transition={designSystem.animations.fadeInUp.transition}
                                className="bg-card backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-lg"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-vibe-electric/10">
                                        <Sparkles className="h-5 w-5 text-vibe-electric" />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-foreground">Key Features</h2>
                                </div>
                                <ul className="space-y-4">
                                    {tool.features?.map((feature, index) => (
                                        <motion.li
                                            key={feature}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                                        >
                                            <div className="p-1.5 rounded-full bg-vibe-electric/20 shrink-0 mt-0.5">
                                                <Check className="h-4 w-4 text-vibe-electric" />
                                            </div>
                                            <span className="text-lg text-foreground">{feature}</span>
                                        </motion.li>
                                    )) || <p className="text-muted-foreground">No features listed.</p>}
                                </ul>
                            </motion.section>
                        </div>

                        {/* Key Features - Mobile Accordion */}
                        <div className="md:hidden">
                            <SimpleAccordionItem title="Key Features" icon={Sparkles} defaultOpen={true}>
                                <ul className="space-y-4">
                                    {tool.features?.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30"
                                        >
                                            <div className="p-1 rounded-full bg-vibe-electric/20 shrink-0 mt-0.5">
                                                <Check className="h-3 w-3 text-vibe-electric" />
                                            </div>
                                            <span className="text-base text-foreground">{feature}</span>
                                        </li>
                                    )) || <p className="text-muted-foreground">No features listed.</p>}
                                </ul>
                            </SimpleAccordionItem>
                        </div>

                        {/* Pros & Cons Section - Desktop */}
                        <div className="hidden md:grid sm:grid-cols-2 gap-6">
                            <motion.section
                                initial={designSystem.animations.fadeInUp.initial}
                                whileInView={designSystem.animations.fadeInUp.animate}
                                viewport={{ once: true }}
                                transition={designSystem.animations.fadeInUp.transition}
                                className="bg-emerald-500/5 rounded-3xl p-8 border border-emerald-500/20 hover:border-emerald-500/30 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-emerald-500/20">
                                        <Check className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-emerald-400">Pros</h3>
                                </div>
                                <ul className="space-y-3">
                                    {tool.pros?.map((pro) => (
                                        <li key={pro} className="flex items-start gap-3 text-foreground/80">
                                            <div className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                                            {pro}
                                        </li>
                                    )) || <p className="text-sm text-muted-foreground">Information pending.</p>}
                                </ul>
                            </motion.section>
                            <motion.section
                                initial={designSystem.animations.fadeInUp.initial}
                                whileInView={designSystem.animations.fadeInUp.animate}
                                viewport={{ once: true }}
                                transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.1 }}
                                className="bg-rose-500/5 rounded-3xl p-8 border border-rose-500/20 hover:border-rose-500/30 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-rose-500/20">
                                        <ExternalLink className="h-5 w-5 text-rose-500 rotate-45" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-rose-400">Cons</h3>
                                </div>
                                <ul className="space-y-3">
                                    {tool.cons?.map((con) => (
                                        <li key={con} className="flex items-start gap-3 text-foreground/80">
                                            <div className="mt-1.5 h-2 w-2 rounded-full bg-rose-400 shrink-0" />
                                            {con}
                                        </li>
                                    )) || <p className="text-sm text-muted-foreground">Information pending.</p>}
                                </ul>
                            </motion.section>
                        </div>

                        {/* Pros & Cons - Mobile Accordion */}
                        <div className="md:hidden space-y-4">
                            <SimpleAccordionItem title="Pros" icon={Check} defaultOpen={false}>
                                <ul className="space-y-3">
                                    {tool.pros?.map((pro) => (
                                        <li key={pro} className="flex items-start gap-3 text-foreground/80">
                                            <div className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                                            {pro}
                                        </li>
                                    )) || <p className="text-sm text-muted-foreground">Information pending.</p>}
                                </ul>
                            </SimpleAccordionItem>

                            <SimpleAccordionItem title="Cons" icon={ExternalLink} defaultOpen={false}>
                                <ul className="space-y-3">
                                    {tool.cons?.map((con) => (
                                        <li key={con} className="flex items-start gap-3 text-foreground/80">
                                            <div className="mt-1.5 h-2 w-2 rounded-full bg-rose-400 shrink-0" />
                                            {con}
                                        </li>
                                    )) || <p className="text-sm text-muted-foreground">Information pending.</p>}
                                </ul>
                            </SimpleAccordionItem>
                        </div>

                        {/* In-depth Review - Enhanced */}
                        <motion.section
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                            className="bg-linear-to-br from-vibe-electric/5 to-vibe-purple/5 rounded-3xl p-8 border border-vibe-electric/10"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-vibe-electric/10">
                                    <Star className="h-5 w-5 text-vibe-electric" />
                                </div>
                                <h2 className="text-2xl font-semibold">Expert Review</h2>
                            </div>
                            {tool.review ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 bg-muted rounded-2xl border border-border/50">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-6 w-6 ${i < Math.floor(tool.review!.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}`} />
                                            ))}
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-foreground">{tool.review.rating}</span>
                                            <span className="text-muted-foreground">/ 5.0</span>
                                        </div>
                                    </div>
                                    <div className="prose prose-invert prose-zinc max-w-none">
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {tool.review.content}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground italic">Full review coming soon.</p>
                            )}
                        </motion.section>

                        {/* User Reviews */}
                        <motion.section
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                            className="mt-12"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-violet-500/10">
                                        <TrendingUp className="h-5 w-5 text-violet-500" />
                                    </div>
                                    <h2 className="text-2xl font-semibold">User Reviews</h2>
                                </div>
                            </div>

                            <div className="grid gap-8">
                                <ReviewForm toolSlug={tool.slug} />
                                <ReviewList toolSlug={tool.slug} />
                            </div>
                        </motion.section>

                        {/* Similar Tools */}
                        <RelatedTools
                            currentSlug={tool.slug}
                            category={tool.category}
                            pricing={tool.pricing}
                            tools={allTools}
                            title={`Top Alternatives to ${tool.title}`}
                        />
                    </div>

                    {/* Sidebar Ad Section - Enhanced */}
                    <aside className="lg:col-span-1 space-y-6">
                        {/* Promoting a Featured Tool */}
                        {(() => {
                            const relatedAd = allTools.find(t =>
                                t.isFeatured &&
                                t.slug !== tool.slug &&
                                t.category === tool.category
                            ) || allTools.find(t => t.isFeatured && t.slug !== tool.slug);

                            if (!relatedAd) return null;
                            const { icon: _icon, ...toolData } = relatedAd;
                            return <SidebarAd tool={toolData} />;
                        })()}

                        {/* Tool Details Card */}
                        <motion.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                            className="bg-card backdrop-blur-sm rounded-3xl p-6 border border-border/50 shadow-lg sticky top-24"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-vibe-electric/10">
                                    <Target className="h-5 w-5 text-vibe-electric" />
                                </div>
                                <h3 className="font-semibold text-foreground">Tool Details</h3>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center py-3 border-b border-border/50">
                                    <span className="text-muted-foreground">Pricing</span>
                                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                                        {tool.pricing}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-border/50">
                                    <span className="text-muted-foreground">Category</span>
                                    <span className="font-medium text-foreground">{tool.category}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-border/50">
                                    <span className="text-muted-foreground">Features</span>
                                    <span className="font-medium text-foreground">{tool.features?.length || 0}</span>
                                </div>
                                <div className="pt-2">
                                    <span className="text-muted-foreground block mb-2">Website</span>
                                    <AffiliateLink
                                        url={tool.affiliateUrl || tool.websiteUrl}
                                        toolSlug={tool.slug}
                                        toolName={tool.title}
                                        variant="link"
                                    >
                                        {tool.websiteUrl.replace('https://', '')}
                                    </AffiliateLink>
                                </div>
                            </div>
                        </motion.div>
                    </aside>
                </div>
            </div>

            <ToolSEO tool={tool} />

            {/* Exit Intent Popup */}
            <ExitIntentPopup toolSlug={tool.slug} toolName={tool.title} />
        </PageBackground>
    );
}
