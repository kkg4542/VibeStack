import { notFound } from "next/navigation";
import { getToolBySlug, getTools } from "@/lib/tools-db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, ArrowLeft, Star, Heart, Scale, Sparkles, TrendingUp, Target, Zap } from "lucide-react";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Metadata } from "next";
import { SocialShare } from "@/components/ui/SocialShare";
import { AffiliateLink } from "@/components/ui/AffiliateLink";
import { SidebarAd } from "@/components/tools/SidebarAd";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";

interface Props {
    params: { slug: string };
}

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

    return {
        title: `${tool.title} Review - AI Productivity Lab`,
        description: tool.description,
    };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = await getToolBySlug(slug);

    if (!tool) {
        notFound();
    }

    const Icon = tool.icon;
    const allTools = await getTools();

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
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="bg-linear-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl p-8 md:p-12 border border-indigo-500/10 relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full" />

                        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start">
                            {/* Icon & Rating */}
                            <motion.div
                                className="shrink-0"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className={`p-6 rounded-3xl bg-linear-to-br ${tool.bgGradient} border border-border/20 shadow-2xl shadow-indigo-500/10`}>
                                    <Icon className="h-16 w-16 text-foreground" />
                                </div>
                                {tool.review && (
                                    <div className="mt-4 flex items-center justify-center gap-1 bg-yellow-500/10 rounded-full px-3 py-1">
                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-bold text-yellow-400">{tool.review.rating}</span>
                                    </div>
                                )}
                            </motion.div>

                            <div className="flex-1 min-w-0">
                                {/* Badges */}
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <Badge variant="outline" className="text-muted-foreground border-border/30 bg-background/50 backdrop-blur-sm">
                                        {tool.category}
                                    </Badge>
                                    <Badge className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border-indigo-500/20">
                                        {tool.pricing}
                                    </Badge>
                                    {tool.isFeatured && (
                                        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                                            <Sparkles className="h-3 w-3 mr-1" />
                                            Featured
                                        </Badge>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent text-balance">
                                    {tool.title}
                                </h1>

                                {/* Description */}
                                <p className="text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
                                    {tool.description}
                                </p>

                                {/* Quick Stats */}
                                <div className="flex flex-wrap gap-6 mb-8">
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="p-2 rounded-lg bg-emerald-500/10">
                                            <Target className="h-4 w-4 text-emerald-500" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-foreground">{tool.category}</div>
                                            <div className="text-muted-foreground text-xs">Category</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="p-2 rounded-lg bg-blue-500/10">
                                            <Zap className="h-4 w-4 text-blue-500" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-foreground">{tool.pricing}</div>
                                            <div className="text-muted-foreground text-xs">Pricing</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="p-2 rounded-lg bg-violet-500/10">
                                            <TrendingUp className="h-4 w-4 text-violet-500" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-foreground">{tool.features?.length || 0}</div>
                                            <div className="text-muted-foreground text-xs">Features</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <AffiliateLink
                                        url={tool.affiliateUrl || tool.websiteUrl}
                                        toolSlug={tool.slug}
                                        toolName={tool.title}
                                        className="h-12 px-8 rounded-full"
                                    >
                                        Visit Website
                                    </AffiliateLink>
                                    <div className="flex gap-3">
                                        <SocialShare
                                            toolSlug={tool.slug}
                                            toolName={tool.title}
                                            url={`https://usevibestack.com/tool/${tool.slug}`}
                                        />
                                        <Button variant="outline" className="h-12 px-6 rounded-full border-border/60 hover:bg-accent/50">
                                            <Heart className="h-4 w-4 mr-2" />
                                            Save
                                        </Button>
                                        <Link href={`/compare?tools=${tool.slug}`}>
                                            <Button variant="outline" className="h-12 px-6 rounded-full border-border/60 hover:bg-accent/50">
                                                <Scale className="h-4 w-4 mr-2" />
                                                Compare
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Key Features - Enhanced */}
                        <motion.section
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                            className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-indigo-500/10">
                                    <Sparkles className="h-5 w-5 text-indigo-500" />
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
                                        <div className="p-1.5 rounded-full bg-indigo-500/20 shrink-0 mt-0.5">
                                            <Check className="h-4 w-4 text-indigo-400" />
                                        </div>
                                        <span className="text-lg text-foreground">{feature}</span>
                                    </motion.li>
                                )) || <p className="text-muted-foreground">No features listed.</p>}
                            </ul>
                        </motion.section>

                        {/* Pros & Cons Section - Enhanced */}
                        <div className="grid sm:grid-cols-2 gap-6">
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

                        {/* In-depth Review - Enhanced */}
                        <motion.section
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                            className="bg-linear-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl p-8 border border-indigo-500/10"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-indigo-500/10">
                                    <Star className="h-5 w-5 text-indigo-500" />
                                </div>
                                <h2 className="text-2xl font-semibold">Expert Review</h2>
                            </div>
                            {tool.review ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 bg-background/50 rounded-2xl border border-border/50">
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
                            className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-border/50 shadow-lg sticky top-24"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-indigo-500/10">
                                    <Target className="h-5 w-5 text-indigo-500" />
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

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": tool.title,
                        "description": tool.description,
                        "applicationCategory": tool.category + "Application",
                        "operatingSystem": "Web, Cloud",
                        "offers": {
                            "@type": "Offer",
                            "price": tool.pricing === "Free" ? "0" : "Varies",
                            "priceCurrency": "USD"
                        },
                        "aggregateRating": tool.review ? {
                            "@type": "AggregateRating",
                            "ratingValue": tool.review.rating,
                            "reviewCount": "1",
                            "bestRating": "5",
                            "worstRating": "1"
                        } : undefined
                    })
                }}
            />

            {/* Exit Intent Popup */}
            <ExitIntentPopup toolSlug={tool.slug} toolName={tool.title} />
        </PageBackground>
    );
}
