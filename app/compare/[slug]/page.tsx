import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Share2, Sparkles, Scale, Check, Star, Trash2 } from 'lucide-react';
import { getToolBySlug, getTools } from '@/lib/tools-db';
import { PageBackground, BackgroundPresets } from '@/components/effects/PageBackground';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ToolIconRenderer } from '@/components/tools/ToolIconRenderer';
import * as motion from "framer-motion/client";
import { designSystem } from '@/lib/design-system';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const parts = slug.split('-vs-');

    if (parts.length !== 2) {
        return { title: 'Tool Comparison' };
    }

    const [slug1, slug2] = parts;
    const tool1 = await getToolBySlug(slug1);
    const tool2 = await getToolBySlug(slug2);

    if (!tool1 || !tool2) {
        return { title: 'Tool Comparison Not Found' };
    }

    const title = `${tool1.title} vs ${tool2.title}: Which implementation is better in 2026?`;
    const description = `Detailed comparison of ${tool1.title} and ${tool2.title}. Compare features, pricing, pros & cons, and user reviews to decide which tool fits your stack.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
        }
    };
}

// Generate static params for popular combinations (optional, implementation for top tools)
export async function generateStaticParams() {
    const tools = await getTools();
    const comparisons = [];

    // Generate comparisons for tools in the same category
    for (let i = 0; i < tools.length; i++) {
        for (let j = i + 1; j < tools.length; j++) {
            if (tools[i].category === tools[j].category) {
                comparisons.push({
                    slug: `${tools[i].slug}-vs-${tools[j].slug}`
                });
            }
        }
    }

    // Limit to avoiding excessively large build if many tools
    return comparisons.slice(0, 50);
}

export default async function ComparisonSlugPage({ params }: Props) {
    const { slug } = await params;
    const parts = slug.split('-vs-');

    if (parts.length !== 2) {
        notFound();
    }

    const [slug1, slug2] = parts;
    const tool1 = await getToolBySlug(slug1);
    const tool2 = await getToolBySlug(slug2);

    if (!tool1 || !tool2) {
        notFound();
    }

    const selectedTools = [tool1, tool2];

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container mx-auto max-w-7xl px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
                >
                    <div className="flex items-center gap-4">
                        <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Directory
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={`/compare?tools=${slug1},${slug2}`}>
                            <Button variant="outline" className="rounded-full">
                                <Scale className="h-4 w-4 mr-2" />
                                Interactive Compare
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Title Section */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.1 }}
                    className="mb-16 text-center"
                >
                    <Badge variant="outline" className="mb-4 bg-muted/50">{tool1.category} Showdown</Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                        <span className={`bg-clip-text text-transparent bg-linear-to-r ${tool1.bgGradient || 'from-foreground to-foreground'}`}>
                            {tool1.title}
                        </span>
                        <span className="text-muted-foreground mx-4 font-light">vs</span>
                        <span className={`bg-clip-text text-transparent bg-linear-to-r ${tool2.bgGradient || 'from-foreground to-foreground'}`}>
                            {tool2.title}
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Detailed analytic comparison to help you choose the right {tool1.category.toLowerCase()} tool for your needs.
                    </p>
                </motion.div>

                {/* Comparison Cards (Side by Side) */}
                <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
                    {selectedTools.map((tool, index) => (
                        <motion.div
                            key={tool.slug}
                            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-vibe-electric/5 to-transparent rounded-3xl blur-xl" />
                            <Card className="h-full border-border/50 bg-white/50 dark:bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-4 rounded-2xl bg-linear-to-br ${tool.bgGradient || "from-slate-500 to-slate-800"} shadow-lg`}>
                                            <ToolIconRenderer slug={tool.slug} className="h-10 w-10 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">{tool.title}</h2>
                                            <Badge variant="secondary" className="mt-1">{tool.pricing}</Badge>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-6 min-h-[50px]">
                                        {tool.description}
                                    </p>

                                    <Link href={`/tool/${tool.slug}`} className="block mb-8">
                                        <Button className="w-full h-12 rounded-full text-lg" variant={index === 0 ? "default" : "outline"}>
                                            View Full Review
                                        </Button>
                                    </Link>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                                <Check className="h-4 w-4 text-emerald-500" /> Key Features
                                            </h3>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                {tool.features?.slice(0, 5).map(f => (
                                                    <li key={f} className="flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 shrink-0" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Feature Comparison Table */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    whileInView={designSystem.animations.fadeInUp.animate}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <Card className="overflow-hidden border-border/50 bg-white/80 dark:bg-card/80 backdrop-blur">
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold mb-6 text-center">Feature Breakdown</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="py-4 text-left w-1/3">Feature</th>
                                            <th className="py-4 text-center w-1/3 text-lg font-semibold">{tool1.title}</th>
                                            <th className="py-4 text-center w-1/3 text-lg font-semibold">{tool2.title}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40">
                                        <tr>
                                            <td className="py-4 font-medium text-muted-foreground">Pricing Model</td>
                                            <td className="py-4 text-center">
                                                <Badge variant="secondary" className="text-base px-3 py-1">{tool1.pricing}</Badge>
                                            </td>
                                            <td className="py-4 text-center">
                                                <Badge variant="secondary" className="text-base px-3 py-1">{tool2.pricing}</Badge>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 font-medium text-muted-foreground">User Rating</td>
                                            <td className="py-4 text-center">
                                                <div className="flex items-center justify-center gap-1 font-bold">
                                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                    {tool1.review?.rating || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="py-4 text-center">
                                                <div className="flex items-center justify-center gap-1 font-bold">
                                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                    {tool2.review?.rating || 'N/A'}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 font-medium text-muted-foreground align-top pt-6">Pros</td>
                                            <td className="py-4 px-4 align-top">
                                                <ul className="space-y-2 text-sm text-emerald-600 dark:text-emerald-400">
                                                    {tool1.pros?.map(p => <li key={p}>+ {p}</li>)}
                                                </ul>
                                            </td>
                                            <td className="py-4 px-4 align-top">
                                                <ul className="space-y-2 text-sm text-emerald-600 dark:text-emerald-400">
                                                    {tool2.pros?.map(p => <li key={p}>+ {p}</li>)}
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 font-medium text-muted-foreground align-top pt-6">Cons</td>
                                            <td className="py-4 px-4 align-top">
                                                <ul className="space-y-2 text-sm text-rose-600 dark:text-rose-400">
                                                    {tool1.cons?.map(c => <li key={c}>- {c}</li>)}
                                                </ul>
                                            </td>
                                            <td className="py-4 px-4 align-top">
                                                <ul className="space-y-2 text-sm text-rose-600 dark:text-rose-400">
                                                    {tool2.cons?.map(c => <li key={c}>- {c}</li>)}
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* FAQ Section (Auto-generated) */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    whileInView={designSystem.animations.fadeInUp.animate}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mt-20 text-center"
                >
                    <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-6 text-left">
                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                            <h3 className="font-semibold text-lg mb-2">Is {tool1.title} better than {tool2.title}?</h3>
                            <p className="text-muted-foreground">
                                {tool1.title} is generally styled as a {tool1.category} tool, while {tool2.title} also competes in the {tool2.category} space.
                                High-level, if you need features like {tool1.features?.[0]}, {tool1.title} might be the better choice.
                                However, {tool2.title} offers {tool2.features?.[0]}, which is a strong competitor.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                            <h3 className="font-semibold text-lg mb-2">Which tool is cheaper?</h3>
                            <p className="text-muted-foreground">
                                {tool1.title} offers a {tool1.pricing} model, whereas {tool2.title} is {tool2.pricing}.
                                Depending on your team size and requirements, verify the latest pricing on their official websites.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </PageBackground>
    );
}
