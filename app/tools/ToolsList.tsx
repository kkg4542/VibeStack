"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Tool, tools } from "@/lib/tools";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

function ToolCard({ tool }: { tool: Tool }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
                perspective: "1000px",
            }}
        >
            <Link
                id={`tool-card-${tool.slug}`}
                href={`/tool/${tool.slug}`}
                className="block relative group h-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="h-full"
                >
                    <Card className="h-full relative overflow-hidden border-border/40 bg-card/50 transition-all duration-300 hover:border-border/80 hover:bg-card/80 hover:shadow-2xl">
                        <div className={`absolute inset-0 bg-linear-to-br ${tool.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />

                        <CardHeader className="relative h-full flex flex-col pt-8" style={{ transformStyle: "preserve-3d" }}>
                            <div className="mb-4 flex items-center justify-between" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                                <motion.div
                                    whileHover={{
                                        z: 50,
                                        scale: 1.2,
                                        translateY: -8,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    className={`rounded-lg bg-secondary/80 p-3 ring-1 ring-border shadow-lg ${tool.color} group-hover:shadow-indigo-500/20`}
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transform: "translateZ(60px)",
                                    }}
                                >
                                    <tool.icon className="h-6 w-6" />
                                </motion.div>
                                <Badge variant="secondary" className="bg-secondary/50 text-xs font-normal text-muted-foreground backdrop-blur-sm" style={{ transform: "translateZ(20px)" }}>
                                    {tool.category}
                                </Badge>
                            </div>
                            <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300" style={{ transform: "translateZ(40px)" }}>
                                {tool.title}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground/90 line-clamp-2 mt-2 leading-relaxed" style={{ transform: "translateZ(30px)" }}>
                                {tool.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </motion.div>
            </Link>
        </motion.div>
    );
}

export function ToolsList() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    // Extract unique categories
    const categories = useMemo(() => ["All", ...Array.from(new Set(tools.map((t) => t.category)))], []);

    // Filter tools
    const filteredTools = useMemo(() => selectedCategory === "All"
        ? tools
        : tools.filter((t) => t.category === selectedCategory), [selectedCategory]);

    return (
        <div className="w-full">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                            ? "bg-primary/10 text-primary ring-1 ring-primary/50"
                            : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Tools Grid */}
            <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool) => (
                        <ToolCard key={tool.slug} tool={tool} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
