"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { 
  Mail, 
  Sparkles, 
  Zap,
  Bell,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { designSystem } from "@/lib/design-system";

const benefits = [
  { icon: Sparkles, text: "Weekly AI tool discoveries" },
  { icon: Zap, text: "New stack recommendations" },
  { icon: Bell, text: "Exclusive deals & updates" },
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail("");
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-vibe-electric/5 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-r from-vibe-electric/10 via-vibe-cyan/10 to-vibe-neon/10 blur-[120px] rounded-full -z-10" />

      <div className="container px-4 mx-auto relative z-10">
        <m.div
          initial={designSystem.animations.fadeInUp.initial}
          whileInView={designSystem.animations.fadeInUp.animate}
          viewport={{ once: true }}
          transition={designSystem.animations.fadeInUp.transition}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-8 md:p-12 rounded-3xl border border-border bg-white shadow-sm overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-linear-to-br from-vibe-electric/5 via-transparent to-vibe-neon/5" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <Badge 
                  variant="outline" 
                  className="mb-4 border-vibe-electric/20 bg-vibe-electric/5 text-vibe-electric"
                >
                  <Mail className="mr-2 h-3 w-3" />
                  Stay Updated
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Get the Latest{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-blue-600">
                    AI Insights
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Join 5,000+ developers receiving weekly updates on new AI tools, 
                  stack recommendations, and exclusive deals.
                </p>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <m.div
                      key={benefit.text}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border/50"
                    >
                      <Icon className="w-4 h-4 text-vibe-electric" />
                      <span className="text-sm text-muted-foreground">{benefit.text}</span>
                    </m.div>
                  );
                })}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-background/50 border-border/50 focus:border-vibe-electric"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || isSuccess}
                    className="h-12 px-6 bg-linear-to-r from-vibe-electric to-vibe-cyan hover:shadow-lg hover:shadow-vibe-electric/30 transition-all duration-300"
                  >
                    {isSuccess ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Subscribed!
                      </>
                    ) : isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
