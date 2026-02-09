"use client";

import { m } from "framer-motion";
import { Star, Heart, Twitter, TrendingUp, Clock, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { VibeCard } from "@/components/ui/VibeCard";
import { VerifiedTestimonial } from "@/lib/data/stacks";
import { designSystem } from "@/lib/design-system";

interface TestimonialsProps {
  testimonials: VerifiedTestimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const fadeInUp = designSystem.animations.fadeInUp;

  return (
    <section className="container mx-auto max-w-6xl px-4 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-vibe-electric/5 rounded-full blur-[120px] -z-10" />

      <m.div
        initial={fadeInUp.initial}
        whileInView={fadeInUp.animate}
        viewport={{ once: true }}
        transition={fadeInUp.transition}
        className="text-center mb-16"
      >
        <Badge 
          variant="outline" 
          className="mb-4 border-vibe-electric/30 bg-vibe-electric/5 text-vibe-electric"
        >
          <Heart className="mr-2 h-3 w-3" />
          Real User Stories
        </Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Loved by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibe-electric to-vibe-neon">
            developers worldwide
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of developers who trust VibeStack for their AI tool needs
        </p>
      </m.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <m.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <VibeCard 
              className="h-full"
              tiltStrength={8}
              glowOnHover={true}
              depth={30}
            >
              <div className="p-6 flex flex-col h-full">
                {/* Rating and Verification */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                  </div>
                  {testimonial.user.verified && (
                    <Badge variant="secondary" className="text-xs bg-vibe-electric/10 text-vibe-electric border-vibe-electric/20">
                      <Twitter className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <p className="text-foreground mb-6 leading-relaxed grow text-lg">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Metrics */}
                {testimonial.metrics && (
                  <div className="grid grid-cols-3 gap-2 mb-6 p-3 bg-white/5 rounded-lg">
                    {testimonial.metrics.productivityGain && (
                      <div className="text-center">
                        <TrendingUp className="w-4 h-4 mx-auto mb-1 text-vibe-electric" />
                        <div className="text-xs text-muted-foreground">Productivity</div>
                        <div className="text-sm font-bold text-vibe-electric">
                          {testimonial.metrics.productivityGain}
                        </div>
                      </div>
                    )}
                    {testimonial.metrics.timeSaved && (
                      <div className="text-center">
                        <Clock className="w-4 h-4 mx-auto mb-1 text-vibe-purple" />
                        <div className="text-xs text-muted-foreground">Time Saved</div>
                        <div className="text-sm font-bold text-vibe-purple">
                          {testimonial.metrics.timeSaved}
                        </div>
                      </div>
                    )}
                    {testimonial.metrics.roi && (
                      <div className="text-center">
                        <DollarSign className="w-4 h-4 mx-auto mb-1 text-vibe-neon" />
                        <div className="text-xs text-muted-foreground">ROI</div>
                        <div className="text-sm font-bold text-vibe-neon">
                          {testimonial.metrics.roi}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* User Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <Avatar className="h-12 w-12 ring-2 ring-vibe-electric/20">
                    <AvatarImage src={testimonial.user.avatar || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-vibe-electric to-vibe-neon text-white font-semibold">
                      {testimonial.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground truncate">
                      {testimonial.user.name}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {testimonial.user.role} at {testimonial.user.company}
                    </div>
                    <div className="text-xs text-vibe-electric/70">
                      {testimonial.user.handle}
                    </div>
                  </div>
                </div>

                {/* Stack Name */}
                {testimonial.stackName && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Badge variant="outline" className="text-xs border-white/10">
                      Using: {testimonial.stackName}
                    </Badge>
                  </div>
                )}

                {/* Social Proof */}
                {testimonial.socialProof && (
                  <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {testimonial.socialProof.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Twitter className="w-3 h-3" />
                      {testimonial.socialProof.retweets}
                    </span>
                  </div>
                )}
              </div>
            </VibeCard>
          </m.div>
        ))}
      </div>

      {/* View All Link */}
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12"
      >
        <a 
          href="/testimonials" 
          className="text-vibe-electric hover:text-vibe-cyan transition-colors inline-flex items-center gap-2"
        >
          View all testimonials
          <TrendingUp className="w-4 h-4" />
        </a>
      </m.div>
    </section>
  );
}

// Server component wrapper
import { getVerifiedTestimonials } from "@/lib/data/stacks";

export async function TestimonialsServer() {
  const testimonials = await getVerifiedTestimonials(6);
  return <Testimonials testimonials={testimonials} />;
}
