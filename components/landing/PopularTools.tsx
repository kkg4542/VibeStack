"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, TrendingUp, Star, ExternalLink, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VibeCard } from "@/components/ui/VibeCard";
import { designSystem } from "@/lib/design-system";
import { useTools } from "@/hooks/use-tools";
import { ToolData } from "@/lib/tool-types";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";

export function PopularTools() {
  const { tools, isLoading } = useTools({ limit: 50 });
  const popularTools = tools
    .filter((tool: ToolData) => tool.isFeatured || tool.review)
    .slice(0, 8);

  if (isLoading) {
    return null;
  }
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-vibe-electric/5 to-background" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <m.div
            initial={designSystem.animations.fadeInUp.initial}
            whileInView={designSystem.animations.fadeInUp.animate}
            viewport={{ once: true }}
            transition={designSystem.animations.fadeInUp.transition}
          >
            <Badge
              variant="outline"
              className="mb-4 border-vibe-electric/20 bg-vibe-electric/5 text-vibe-electric"
            >
              <TrendingUp className="mr-2 h-3 w-3" />
              Trending Now
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Popular{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                AI Tools
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the most loved AI tools by our community of builders and creators.
            </p>
          </m.div>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTools.map((tool: ToolData, index: number) => (
            <m.div
              key={tool.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <Link href={`/tool/${tool.slug}`} className="group block h-full">
                <VibeCard
                  className="h-full"
                  tiltStrength={6}
                  glowOnHover={true}
                  depth={15}
                >
                  <div className="h-full flex flex-col p-5">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl ${tool.bgGradient}`}>
                        <ToolIconRenderer
                          slug={tool.slug}
                          className={`w-6 h-6 ${tool.color}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground group-hover:text-vibe-electric transition-colors truncate">
                          {tool.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{tool.category}</span>
                          <span>•</span>
                          <span>{tool.pricing}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {tool.description}
                    </p>

                    {/* Rating & CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      {tool.review ? (
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-medium">{tool.review.rating}</span>
                          <span className="text-xs text-muted-foreground">/5</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-vibe-electric" />
                          <span className="text-xs text-muted-foreground">Featured</span>
                        </div>
                      )}

                      <div className="flex items-center text-xs text-vibe-electric group-hover:text-vibe-cyan transition-colors">
                        <span>Details</span>
                        <ExternalLink className="ml-1 w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </VibeCard>
              </Link>
            </m.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/tools">
            <Button variant="outline" size="lg" className="group rounded-full px-8">
              View All Tools
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
