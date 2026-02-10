"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Eye, Heart, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VibeCard } from "@/components/ui/VibeCard";
import { StackWithMetrics } from "@/lib/data/stacks";
import { designSystem } from "@/lib/design-system";

interface FeaturedStacksProps {
  stacks: StackWithMetrics[];
}

export function FeaturedStacks({ stacks }: FeaturedStacksProps) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] bg-vibe-electric/5 blur-[120px] rounded-full -z-10" />

      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <m.div
            initial={designSystem.animations.fadeInUp.initial}
            whileInView={designSystem.animations.fadeInUp.animate}
            viewport={{ once: true }}
            transition={designSystem.animations.fadeInUp.transition}
          >
            <Badge variant="outline" className="mb-4 border-vibe-electric/20 bg-vibe-electric/5 text-vibe-electric">
              <Sparkles className="mr-2 h-3 w-3" />
              Curated Workflows
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Popular{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-vibe-electric to-vibe-neon">
                AI Stacks
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Don&apos;t start from scratch. Use the same tools as the world&apos;s best builders.
            </p>
          </m.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stacks.map((stack, index) => (
            <m.div
              key={stack.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <Link href={`/stack/${stack.idField}`} className="group block h-full">
                <VibeCard
                  className="h-full"
                  tiltStrength={8}
                  glowOnHover={true}
                  depth={20}
                >
                  <div className="h-full flex flex-col p-6 sm:p-8">
                    {/* Icon & Title */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                          {stack.icon || "🚀"}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-vibe-electric transition-colors">
                            {stack.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>{stack.tools.length} Tools</span>
                            <span>•</span>
                            <span>{stack.totalPrice || "Free"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 line-clamp-2">
                      {stack.description}
                    </p>

                    {/* Metrics */}
                    {stack.metrics && (
                      <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {stack.metrics.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {stack.metrics.saves}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {stack.metrics.avgRating.toFixed(1)}
                        </span>
                      </div>
                    )}

                    {/* Tools Preview */}
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {stack.tags.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Curator Info (Authority) */}
                      {stack.curator ? (
                        <div className="flex items-center gap-3 pt-6 border-t border-foreground/10">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vibe-electric to-vibe-neon flex items-center justify-center text-xs font-bold text-white">
                            {stack.curator.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">Curated by {stack.curator.name}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{stack.curator.role}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-vibe-electric transition-colors" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
                          <div className="flex -space-x-2">
                            {stack.tools.slice(0, 4).map((tool, i) => (
                              <div
                                key={tool.id}
                                className="w-8 h-8 rounded-full bg-foreground/10 border-2 border-background flex items-center justify-center text-xs"
                                title={tool.name}
                              >
                                {tool.name.charAt(0)}
                              </div>
                            ))}
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-vibe-electric transition-colors" />
                        </div>
                      )}
                    </div>
                  </div>
                </VibeCard>
              </Link>
            </m.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/build"
            className={buttonVariants({ variant: "outline", size: "lg" }) + " rounded-full px-8 border-vibe-electric/30 hover:border-vibe-electric hover:bg-vibe-electric/10"}
          >
            Find My Perfect Stack <Zap className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
