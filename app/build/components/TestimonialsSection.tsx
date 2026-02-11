"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { designSystem } from "@/lib/design-system";

const TESTIMONIALS = [
  {
    quote: "The 10x Engineer Stack changed how I code. I ship features 3x faster now.",
    author: "Alex Chen",
    role: "Senior Developer at Stripe",
    avatar: "AC"
  },
  {
    quote: "As a designer who codes, the Design Pro Stack is perfect for my workflow.",
    author: "Sarah Kim",
    role: "Product Designer",
    avatar: "SK"
  },
  {
    quote: "Started with the Learner Stack and now I'm building full apps. Game changer!",
    author: "Mike Johnson",
    role: "Bootcamp Graduate",
    avatar: "MJ"
  }
];

export function TestimonialsSection() {
  const fadeInUp = designSystem.animations.fadeInUp;

  return (
    <motion.div
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={{ ...fadeInUp.transition, delay: 0.7 }}
      className="mb-24"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Developers Say</h2>
        <p className="text-muted-foreground">Join thousands of developers using VibeStack</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.8 + index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-vibe-electric/20 flex items-center justify-center text-vibe-electric font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
