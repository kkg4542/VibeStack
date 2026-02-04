"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export function SponsorSection() {
    return (
        <section className="w-full py-8 border-b border-border/40 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 to-purple-500/5 p-6 md:p-8 shadow-sm">

                    {/* Label */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-primary">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="text-xs font-bold tracking-wider uppercase">Premium Sponsor</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">
                            Cursor - The AI-first Code Editor
                        </h3>
                        <p className="text-muted-foreground max-w-xl">
                            Build software faster with an editor designed for pair-programming with AI.
                            Get a free month of Pro with our exclusive link.
                        </p>
                    </div>

                    {/* Action */}
                    <Link
                        href="https://cursor.sh"
                        target="_blank"
                        className="group flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 font-medium transition-all shadow-lg shadow-indigo-500/20"
                    >
                        Try Cursor Pro
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
