import * as motion from "framer-motion/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, Sparkles, Target, Zap, TrendingUp, Heart, Scale } from "lucide-react";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";
import { AffiliateLink } from "@/components/ui/AffiliateLink";
import { SocialShare } from "@/components/ui/SocialShare";
import { designSystem } from "@/lib/design-system";
import Link from "next/link";

export function ToolHero({ tool }: { tool: any }) {
  return (
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="bg-linear-to-br from-vibe-electric/5 via-vibe-purple/5 to-vibe-pink/5 rounded-3xl p-8 md:p-12 border border-vibe-electric/10 relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-vibe-electric/10 blur-[100px] rounded-full" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full" />

                        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start">
                            {/* Icon & Rating */}
                            <motion.div
                                className="shrink-0"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className={`p-6 rounded-3xl bg-linear-to-br ${tool.bgGradient} border border-border/20 shadow-2xl shadow-vibe-electric/10`}>
                                    <ToolIconRenderer slug={tool.slug} className="h-16 w-16 text-foreground" />
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
                                    <Badge variant="outline" className="text-muted-foreground border-border/30 bg-muted backdrop-blur-sm">
                                        {tool.category}
                                    </Badge>
                                    <Badge className="bg-vibe-electric/10 text-vibe-electric hover:bg-vibe-electric/20 border-vibe-electric/20">
                                        {tool.pricing}
                                    </Badge>
                                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                        <ShieldCheck className="h-3 w-3 mr-1" />
                                        Vetted
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
  );
}
