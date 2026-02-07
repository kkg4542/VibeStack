"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign, Sparkles, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { stacks } from "@/lib/stacks";
import { designSystem } from "@/lib/design-system";

export function FeaturedStacks() {
    // Select specific stacks to feature (e.g., 10x-engineer, product-designer, magic-wand)
    const featuredStackIds = ["10x-engineer", "product-designer", "magic-wand"];
    const featuredStacks = stacks.filter(s => featuredStackIds.includes(s.id));

    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

            <div className="container px-4 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={designSystem.animations.fadeInUp.initial}
                        whileInView={designSystem.animations.fadeInUp.animate}
                        viewport={{ once: true }}
                        transition={designSystem.animations.fadeInUp.transition}
                    >
                        <Badge variant="outline" className="mb-4 border-indigo-500/20 bg-indigo-500/5 text-indigo-400">
                            <Sparkles className="mr-2 h-3 w-3" />
                            Curated Worfklows
                        </Badge>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            Popular{" "}
                            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                AI Stacks
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Don&apos;t start from scratch. Use the same tools as the world&apos;s best builders.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {featuredStacks.map((stack, index) => (
                        <motion.div
                            key={stack.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={`/stack/${stack.id}`} className="group block h-full">
                                <div className="h-full flex flex-col relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 hover:border-indigo-500/50 hover:bg-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
                                    {/* Icon & Title */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                                {stack.icon}
                                            </div>
                                            <div>
                                                <h3 className={`text-xl font-bold ${stack.color} group-hover:brightness-110 transition-colors`}>
                                                    {stack.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                    <span>{stack.tools.length} Tools</span>
                                                    <span>•</span>
                                                    <span>{stack.totalPrice}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-muted-foreground mb-6 line-clamp-2">
                                        {stack.description}
                                    </p>

                                    {/* Tools Preview */}
                                    <div className="mt-auto">
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {stack.tags.slice(0, 3).map(tag => (
                                                <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Curator Info (Authority) */}
                                        {stack.curatedBy && (
                                            <div className="flex items-center gap-3 pt-6 border-t border-border/50">
                                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                                    {stack.curatedBy.name.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-medium truncate">Curated by {stack.curatedBy.name}</p>
                                                    <p className="text-[10px] text-muted-foreground truncate">{stack.curatedBy.role}</p>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-indigo-500 transition-colors" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/build"
                        className={buttonVariants({ variant: "outline", size: "lg" }) + " rounded-full px-8"}
                    >
                        Find My Perfect Stack <Zap className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
