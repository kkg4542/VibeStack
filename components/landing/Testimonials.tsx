"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Senior Developer",
        company: "TechCorp",
        content: "VibeStack helped me discover tools that 3x'd my productivity. The curated selection is incredible!",
        rating: 5,
        avatar: "SC"
    },
    {
        name: "Alex Rodriguez",
        role: "Product Manager",
        company: "StartupXYZ",
        content: "Best collection of AI tools in one place. Saves me hours of research every week.",
        rating: 5,
        avatar: "AR"
    },
    {
        name: "Maya Patel",
        role: "Tech Lead",
        company: "DevStudio",
        content: "The stack builder feature is genius. Found the perfect combo of tools for our team.",
        rating: 5,
        avatar: "MP"
    }
];

export function Testimonials() {
    return (
        <section className="container mx-auto max-w-6xl px-4 py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Loved by developers worldwide
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Join thousands of developers who trust VibeStack for their AI tool needs
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={testimonial.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="h-full border-border/40 bg-card/40 backdrop-blur-sm hover:border-border/80 transition-all">
                            <CardContent className="p-6">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-foreground mb-6 leading-relaxed">
                                    &quot;{testimonial.content}&quot;
                                </p>

                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                            {testimonial.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold text-foreground">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {testimonial.role} at {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
