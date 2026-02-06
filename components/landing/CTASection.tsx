"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
    return (
        <section className="container mx-auto max-w-6xl px-4 py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 p-12 md:p-16 text-center"
            >
                {/* Ambient Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
                
                <div className="relative z-10">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-md shadow-sm mb-6"
                    >
                        <Sparkles className="mr-2 h-3.5 w-3.5" />
                        <span className="font-medium">Start building faster today</span>
                    </motion.div>
                    
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                        Ready to accelerate your workflow?
                    </h2>
                    
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of developers who are building faster with AI-powered tools
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/build">
                            <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group">
                                Find Your Stack
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="/tools">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                                Browse All Tools
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
