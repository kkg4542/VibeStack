"use client";

import { m } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Briefcase, BarChart, CheckCircle2 } from "lucide-react";
// Import Testimonial type from Prisma if possible, but for client component using a defined interface might be safer/cleaner
// or duplicate the type definition if simple.
// Since we used `include` in the fetch, we need a compatible type.

interface VerifiedTestimonial {
    id: string;
    user: {
        name: string;
        handle: string;
        avatar: string | null;
        verified: boolean;
        role: string;
        company: string;
    };
    stackName: string | null;
    toolName: string | null;
    rating: number;
    content: string;
    metrics: {
        productivityGain?: string;
        timeSaved?: string;
        roi?: string;
    } | null;
    videoUrl: string | null;
    socialProof: {
        likes: number;
        retweets: number;
    } | null;
    createdAt: Date;
}

interface TestimonialCardProps {
    testimonial: VerifiedTestimonial;
    index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
    const metrics = testimonial.metrics;

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
        >
            <Card className="h-full border-border/50 hover:border-vibe-electric/30 hover:shadow-lg hover:shadow-vibe-electric/5 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-12 h-12 text-vibe-electric rotate-180" />
                </div>

                <CardContent className="p-6 flex flex-col h-full">
                    {/* Header: User Info */}
                    <div className="flex items-start gap-4 mb-4">
                        <Avatar className="w-12 h-12 border-2 border-background ring-2 ring-border/50">
                            <AvatarImage src={testimonial.user.avatar || undefined} alt={testimonial.user.name || "User"} />
                            <AvatarFallback className="bg-vibe-electric/10 text-vibe-electric font-semibold">
                                {testimonial.user.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold text-foreground flex items-center gap-2">
                                {testimonial.user.name}
                                {testimonial.user.verified && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" aria-label="Verified User" />
                                )}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap">
                                {testimonial.user.role && (
                                    <>
                                        <span>{testimonial.user.role}</span>
                                        {testimonial.user.company && <span className="opacity-50">at</span>}
                                    </>
                                )}
                                {testimonial.user.company && (
                                    <span className="font-medium text-foreground/80 flex items-center gap-1">
                                        <Briefcase className="w-3 h-3" />
                                        {testimonial.user.company}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6 grow">
                        <p className="text-muted-foreground leading-relaxed">
                            &quot;{testimonial.content}&quot;
                        </p>
                    </div>

                    {/* Footer: Metrics & Context */}
                    <div className="mt-auto space-y-4">
                        {metrics && (
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(metrics).map(([key, value]) => (
                                    <Badge key={key} variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                                        <BarChart className="w-3 h-3 mr-1.5" />
                                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                        <span className="ml-1 font-bold">{typeof value === 'string' ? value : JSON.stringify(value)}</span>
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                            <div>
                                {testimonial.toolName && (
                                    <span>Using <span className="font-medium text-foreground">{testimonial.toolName}</span></span>
                                )}
                                {testimonial.stackName && (
                                    <span>Stack: <span className="font-medium text-foreground">{testimonial.stackName}</span></span>
                                )}
                            </div>
                            {/* Stars could go here if rating is needed */}
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-base ${i < testimonial.rating ? "text-amber-400" : "text-muted"}`}>
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </m.div>
    );
}
