"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Star } from "lucide-react";

const stats = [
    {
        icon: TrendingUp,
        value: "100+",
        label: "AI Tools",
        description: "Curated and verified"
    },
    {
        icon: Users,
        value: "50K+",
        label: "Developers",
        description: "Trust VibeStack"
    },
    {
        icon: Star,
        value: "4.9",
        label: "Average Rating",
        description: "From our community"
    }
];

export function StatsSection() {
    return (
        <section className="container mx-auto max-w-6xl px-4 py-16 border-b border-border/40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="text-4xl font-bold text-foreground mb-2">
                            {stat.value}
                        </div>
                        <div className="text-lg font-semibold text-foreground mb-1">
                            {stat.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {stat.description}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
