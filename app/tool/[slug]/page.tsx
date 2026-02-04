import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { SocialShare } from "@/components/ui/SocialShare";
import { AffiliateLink } from "@/components/ui/AffiliateLink";

interface Props {
    params: { slug: string };
}

// Generate static params for all tools
export async function generateStaticParams() {
    return tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const tool = tools.find((t) => t.slug === slug);
    if (!tool) return { title: "Tool Not Found" };

    return {
        title: `${tool.title} Review - AI Productivity Lab`,
        description: tool.description,
    };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = tools.find((t) => t.slug === slug);

    if (!tool) {
        notFound();
    }

    const Icon = tool.icon;

    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="container max-w-4xl mx-auto px-4">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Tools
                </Link>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                    <div className={`p-4 rounded-2xl bg-card border border-border shadow-sm ${tool.color}`}>
                        <Icon className="h-12 w-12" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold tracking-tight">{tool.title}</h1>
                            <Badge variant="outline" className="text-muted-foreground border-white/10">
                                {tool.category}
                            </Badge>
                            <Badge className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border-indigo-500/20">
                                {tool.pricing}
                            </Badge>
                        </div>

                        <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
                            {tool.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <AffiliateLink
                                url={tool.affiliateUrl || tool.websiteUrl}
                                toolSlug={tool.slug}
                                toolName={tool.title}
                            >
                                Visit Website
                            </AffiliateLink>

                            <SocialShare
                                toolSlug={tool.slug}
                                toolName={tool.title}
                                url={`https://vibestack.com/tool/${tool.slug}`}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <section className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                            <h2 className="text-2xl font-semibold mb-6 text-foreground">Key Features</h2>
                            <ul className="space-y-4">
                                {tool.features?.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check className="h-6 w-6 text-indigo-400 shrink-0" />
                                        <span className="text-lg text-muted-foreground">{feature}</span>
                                    </li>
                                )) || <p className="text-muted-foreground">No features listed.</p>}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">About {tool.title}</h2>
                            <div className="prose prose-invert prose-zinc max-w-none">
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {tool.title} is a leading tool in the {tool.category} space.
                                    It is designed to help developers and teams improve their workflow through
                                    intelligent features and seamless integration.
                                    <br /><br />
                                    (This is a placeholder for the full review content. In a real application,
                                    this would be populated from a CMS or markdown file.)
                                </p>
                            </div>
                        </section>
                    </div>

                    <aside className="md:col-span-1 space-y-6">
                        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                            <h3 className="font-semibold mb-4 text-foreground">Tool Details</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Pricing</span>
                                    <span className="font-medium text-foreground">{tool.pricing}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Category</span>
                                    <span className="font-medium text-foreground">{tool.category}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Website</span>
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
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
