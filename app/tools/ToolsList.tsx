"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Tool, tools } from "@/lib/tools"; // Added 'tools' import
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as motion from "framer-motion/client";
import { AnimatePresence } from "framer-motion";

export function ToolsList() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    // Extract unique categories
    const categories = useMemo(() => ["All", ...Array.from(new Set(tools.map((t) => t.category)))], []);

    // Filter tools
    const filteredTools = useMemo(() => selectedCategory === "All"
        ? tools
        : tools.filter((t) => t.category === selectedCategory), [selectedCategory]);

    return (
        <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                            ? "bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/50"
                            : "bg-zinc-900/50 text-muted-foreground hover:bg-zinc-800 hover:text-foreground"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Tools Grid */}
            <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool) => (
                        <motion.div
                            key={tool.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link
                                href={`/tool/${tool.slug}`}
                                className="block relative group h-full"
                            >
                                <Card className="h-full relative overflow-hidden border-white/5 bg-zinc-900/40 transition-all duration-300 hover:border-white/10 hover:bg-zinc-900/60">
                                    <div className={`absolute inset-0 bg-linear-to-br ${tool.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                                    <CardHeader>
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className={`rounded-lg bg-zinc-900/80 p-2 ring-1 ring-white/10 ${tool.color}`}>
                                                <tool.icon className="h-5 w-5" />
                                            </div>
                                            <Badge variant="secondary" className="bg-zinc-800/50 text-xs font-normal text-muted-foreground">
                                                {tool.category}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl font-medium text-foreground">{tool.title}</CardTitle>
                                        <CardDescription className="text-muted-foreground line-clamp-2">
                                            {tool.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
