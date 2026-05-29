"use client";

import { m, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Wrench,
  Layers,
  Star,
  FileText,
  TrendingUp,
  Zap
} from "lucide-react";
import { designSystem } from "@/lib/design-system";

const stats = [
  {
    icon: Wrench,
    value: 30,
    suffix: "+",
    label: "AI Tools",
    description: "Hand-picked & reviewed",
    color: "from-cyan-600 to-blue-600",
  },
  {
    icon: Layers,
    value: 7,
    suffix: "",
    label: "Curated Stacks",
    description: "Ready-to-use workflows",
    color: "from-purple-600 to-pink-600",
  },
  {
    icon: FileText,
    value: 36,
    suffix: "+",
    label: "Guides",
    description: "Comparisons & reviews",
    color: "from-emerald-400 to-emerald-600",
  },
  {
    icon: Star,
    value: 100,
    suffix: "%",
    label: "Free",
    description: "No account needed",
    color: "from-amber-400 to-orange-500",
  },
];

function AnimatedNumber({ 
  value, 
  suffix = "", 
  isDecimal = false 
}: { 
  value: number; 
  suffix?: string;
  isDecimal?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value, isDecimal]);

  return (
    <span ref={ref}>
      {isDecimal ? count.toFixed(1) : count}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-vibe-purple/5 to-background" />
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <m.div
          initial={designSystem.animations.fadeInUp.initial}
          whileInView={designSystem.animations.fadeInUp.animate}
          viewport={{ once: true }}
          transition={designSystem.animations.fadeInUp.transition}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-vibe-electric via-vibe-cyan to-vibe-neon">
              build with AI
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hand-picked tools, ready-to-use stacks, and honest comparison guides — free to browse.
          </p>
        </m.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="group"
              >
                <div className="relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-center hover:border-vibe-electric/30 transition-all duration-300 hover:shadow-lg hover:shadow-vibe-electric/5">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl bg-linear-to-br ${stat.color} bg-opacity-10 mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Value */}
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      <span className={`text-transparent bg-clip-text bg-linear-to-r ${stat.color}`}>
                        <AnimatedNumber
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </span>
                    </div>

                    {/* Label */}
                    <h3 className="font-semibold text-foreground mb-1">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibe-electric/10 border border-vibe-electric/20">
            <TrendingUp className="w-4 h-4 text-vibe-electric" />
            <span className="text-sm text-vibe-electric">
              Growing daily with new tools and stacks
            </span>
            <Zap className="w-4 h-4 text-vibe-electric" />
          </div>
        </m.div>
      </div>
    </section>
  );
}
