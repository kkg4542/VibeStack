"use client";

import { m } from "framer-motion";
import { Search, GitCompare, Zap } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Explore",
        description: "Browse 100+ curated AI tools across all categories",
        color: "text-blue-500"
    },
    {
        icon: GitCompare,
        title: "Compare",
        description: "Compare features, pricing, and reviews side-by-side",
        color: "text-purple-500"
    },
    {
        icon: Zap,
        title: "Build",
        description: "Start building with your perfect AI stack",
        color: "text-indigo-500"
    }
];

export function HowItWorks() {
    return (
        <section className="container mx-auto max-w-6xl px-4 py-24 border-y border-border/40">
            <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Get started in 3 simple steps
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Find and integrate the best AI tools into your workflow
                </p>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {steps.map((step, index) => (
                    <m.div
                        key={step.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="text-center relative"
                    >
                        {/* Connector line */}
                        {index < steps.length - 1 && (
                            <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-linear-to-r from-primary/50 to-transparent" />
                        )}

                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-purple-500/20 ${step.color} mb-6 relative z-10 shadow-lg`}>
                            <step.icon className="w-8 h-8" />
                        </div>

                        <div className="text-sm font-semibold text-primary mb-2">
                            Step {index + 1}
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-3">
                            {step.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                        </p>
                    </m.div>
                ))}
            </div>
        </section>
    );
}
