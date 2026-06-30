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
import { MotionDiv, MotionSection, MotionLi, MotionSpan, MotionP, MotionH1, MotionH2, MotionH3 } from "@/components/ui/motion-wrapper";
import { designSystem } from "@/lib/design-system";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { SimpleAccordionItem } from "@/components/ui/simple-accordion";
import { getExtendedContent } from "@/lib/tool-extended-content";
import sanitizeHtml from "sanitize-html";

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
                    url: `${url}/opengraph-image`,
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

    const extended = getExtendedContent(slug);
    const extendedOverviewHtml = extended
        ? sanitizeHtml(extended.overviewHtml, {
              allowedTags: [
                  "p", "br", "strong", "b", "em", "i", "u", "h2", "h3", "h4",
                  "ul", "ol", "li", "a", "blockquote", "code",
              ],
              allowedAttributes: {
                  a: ["href", "title", "target", "rel"],
              },
          })
        : null;

    // Structured data for Google rich results.
    // SoftwareApplication: enables the tool to appear in Google's app/software cards.
    // BreadcrumbList: shows breadcrumb trail in search results.
    // We deliberately omit AggregateRating until we have real review counts —
    // emitting fake/single-review ratings violates Google's structured data policy.
    const canonicalUrl = `https://usevibestack.com/tool/${tool.slug}`;
    const ogImage = `${canonicalUrl}/opengraph-image`;
    const isFree = tool.pricing === "Free" || tool.pricing === "Freemium";

    const softwareJsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.title,
        description: tool.description,
        applicationCategory:
            tool.category === "Coding" ? "DeveloperApplication" : "BusinessApplication",
        operatingSystem: "Web",
        url: canonicalUrl,
        image: ogImage,
        sameAs: [tool.websiteUrl],
        offers: {
            "@type": "Offer",
            price: isFree ? "0" : undefined,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: tool.affiliateUrl || tool.websiteUrl,
        },
    };

    const faqJsonLd =
        extended?.faq && extended.faq.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: extended.faq.map((item) => ({
                      "@type": "Question",
                      name: item.q,
                      acceptedAnswer: {
                          "@type": "Answer",
                          text: item.a,
                      },
                  })),
              }
            : null;

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://usevibestack.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Tools",
                item: "https://usevibestack.com/tools",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: tool.title,
                item: canonicalUrl,
            },
        ],
    };

    return (
        <PageBackground {...BackgroundPresets.content}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <div className="container max-w-6xl mx-auto px-4">
                {/* Back Link */}
                <MotionDiv
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
                </MotionDiv>

                {/* Hero Section - Enhanced */}
                <ToolHero tool={tool} />

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Key Features - Desktop */}
                        <div className="hidden md:block">
                            <MotionSection
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
                                        <MotionLi
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
                                        </MotionLi>
                                    )) || <p className="text-muted-foreground">No features listed.</p>}
                                </ul>
                            </MotionSection>
                        </div>

                        {/* Key Features - Mobile Accordion */}
                        <div className="md:hidden">
                            <SimpleAccordionItem title="Key Features" icon={<Sparkles className="h-4 w-4" />} defaultOpen={true}>
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
                            <MotionSection
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
                            </MotionSection>
                            <MotionSection
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
                            </MotionSection>
                        </div>

                        {/* Pros & Cons - Mobile Accordion */}
                        <div className="md:hidden space-y-4">
                            <SimpleAccordionItem title="Pros" icon={<Check className="h-4 w-4" />} defaultOpen={false}>
                                <ul className="space-y-3">
                                    {tool.pros?.map((pro) => (
                                        <li key={pro} className="flex items-start gap-3 text-foreground/80">
                                            <div className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                                            {pro}
                                        </li>
                                    )) || <p className="text-sm text-muted-foreground">Information pending.</p>}
                                </ul>
                            </SimpleAccordionItem>

                            <SimpleAccordionItem title="Cons" icon={<ExternalLink className="h-4 w-4" />} defaultOpen={false}>
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

                        {/* Extended Editorial Content (per-slug long-form) */}
                        {extended && (
                            <MotionSection
                                initial={designSystem.animations.fadeInUp.initial}
                                whileInView={designSystem.animations.fadeInUp.animate}
                                viewport={{ once: true }}
                                transition={designSystem.animations.fadeInUp.transition}
                                className="bg-card backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-lg space-y-10"
                            >
                                {extendedOverviewHtml && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 rounded-lg bg-vibe-electric/10">
                                                <Sparkles className="h-5 w-5 text-vibe-electric" />
                                            </div>
                                            <h2 className="text-2xl font-semibold text-foreground">
                                                In-Depth Overview
                                            </h2>
                                        </div>
                                        <div
                                            className="prose prose-invert prose-zinc max-w-none prose-a:text-vibe-electric"
                                            dangerouslySetInnerHTML={{ __html: extendedOverviewHtml }}
                                        />
                                    </div>
                                )}

                                {extended.useCases && extended.useCases.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 rounded-lg bg-vibe-electric/10">
                                                <Target className="h-5 w-5 text-vibe-electric" />
                                            </div>
                                            <h2 className="text-2xl font-semibold text-foreground">Use Cases</h2>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {extended.useCases.map((uc) => (
                                                <div
                                                    key={uc.title}
                                                    className="p-5 rounded-2xl bg-secondary/30 border border-border/50"
                                                >
                                                    <h3 className="font-semibold text-foreground mb-2">
                                                        {uc.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {uc.body}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {extended.pricingDetail && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-lg bg-vibe-electric/10">
                                                <Zap className="h-5 w-5 text-vibe-electric" />
                                            </div>
                                            <h2 className="text-2xl font-semibold text-foreground">
                                                Pricing Detail
                                            </h2>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {extended.pricingDetail}
                                        </p>
                                    </div>
                                )}

                                {extended.faq && extended.faq.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 rounded-lg bg-vibe-electric/10">
                                                <ShieldCheck className="h-5 w-5 text-vibe-electric" />
                                            </div>
                                            <h2 className="text-2xl font-semibold text-foreground">
                                                Frequently Asked Questions
                                            </h2>
                                        </div>
                                        <div className="space-y-4">
                                            {extended.faq.map((item) => (
                                                <div
                                                    key={item.q}
                                                    className="p-5 rounded-2xl bg-secondary/30 border border-border/50"
                                                >
                                                    <h3 className="font-semibold text-foreground mb-2">
                                                        {item.q}
                                                    </h3>
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {item.a}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </MotionSection>
                        )}

                        {/* In-depth Review - Enhanced */}
                        <MotionSection
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
                        </MotionSection>

                        {/* User Reviews */}
                        <MotionSection
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
                        </MotionSection>

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
                        <MotionDiv
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
                        </MotionDiv>
                    </aside>
                </div>
            </div>

            <ToolSEO tool={tool} />

            {/* Exit Intent Popup */}
            <ExitIntentPopup toolSlug={tool.slug} toolName={tool.title} />
        </PageBackground>
    );
}
