"use client";

import { m } from "framer-motion";
import { Star, Twitter, TrendingUp, Clock, DollarSign, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { VibeCard } from "@/components/ui/VibeCard";
import { VerifiedTestimonial } from "@/lib/data/stacks";

interface TestimonialsGridProps {
    testimonials: VerifiedTestimonial[];
}

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {testimonials.map((testimonial, index) => (
                <m.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="h-full"
                >
                    <VibeCard
                        className="h-full flex flex-col"
                        tiltStrength={3}
                        glowOnHover={true}
                        depth={10}
                    >
                        <div className="p-8 flex flex-col h-full">
                            {/* Header: User Info & Verification */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 ring-2 ring-vibe-electric/10">
                                        <AvatarImage src={testimonial.user.avatar || undefined} alt={testimonial.user.name} />
                                        <AvatarFallback className="bg-linear-to-br from-vibe-electric/20 to-vibe-purple/20 text-vibe-electric font-semibold text-sm">
                                            {testimonial.user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold text-sm leading-none mb-1">
                                            {testimonial.user.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {testimonial.user.role} at {testimonial.user.company}
                                        </div>
                                    </div>
                                </div>
                                {testimonial.user.verified && (
                                    <div className="text-vibe-cyan" title="Verified User">
                                        <Twitter className="w-4 h-4" />
                                    </div>
                                )}
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <div className="relative mb-6 grow">
                                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-vibe-electric/10 -z-10 transform -scale-x-100" />
                                <p className="text-foreground/90 leading-relaxed text-base">
                                    &quot;{testimonial.content}&quot;
                                </p>
                            </div>

                            {/* Metrics Section (if available) */}
                            {testimonial.metrics && (
                                <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-white/5 mb-4">
                                    {testimonial.metrics.productivityGain && (
                                        <div className="text-center">
                                            <div className="text-xs text-muted-foreground mb-1">Productivity</div>
                                            <div className="text-sm font-bold text-vibe-electric items-center justify-center flex gap-1">
                                                <TrendingUp className="w-3 h-3" />
                                                {testimonial.metrics.productivityGain}
                                            </div>
                                        </div>
                                    )}
                                    {testimonial.metrics.timeSaved && (
                                        <div className="text-center border-l border-white/5">
                                            <div className="text-xs text-muted-foreground mb-1">Time Saved</div>
                                            <div className="text-sm font-bold text-vibe-purple items-center justify-center flex gap-1">
                                                <Clock className="w-3 h-3" />
                                                {testimonial.metrics.timeSaved}
                                            </div>
                                        </div>
                                    )}
                                    {testimonial.metrics.roi && (
                                        <div className="text-center border-l border-white/5">
                                            <div className="text-xs text-muted-foreground mb-1">ROI</div>
                                            <div className="text-sm font-bold text-vibe-neon items-center justify-center flex gap-1">
                                                <DollarSign className="w-3 h-3" />
                                                {testimonial.metrics.roi}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Footer: Stack/Tool & Date */}
                            <div className="mt-auto pt-2 flex items-center justify-between text-xs text-muted-foreground">
                                <div>
                                    {testimonial.stackName && (
                                        <span className="inline-flex items-center">
                                            Using <Badge variant="secondary" className="ml-2 h-5 text-[10px] px-1.5">{testimonial.stackName}</Badge>
                                        </span>
                                    )}
                                </div>
                                <div>
                                    {new Date(testimonial.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </VibeCard>
                </m.div>
            ))}
        </div>
    );
}
