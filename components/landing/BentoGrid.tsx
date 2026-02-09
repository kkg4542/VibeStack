"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToolData } from "@/lib/tool-types";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";
import { SponsorshipModal } from "@/components/monetization/SponsorshipModal";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/lib/tool-icons";

function BentoCard({ tool, index }: { tool: ToolData, index: number }) {
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
        <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`block relative group ${index === 0 || index === 3 ? "md:col-span-2" : "md:col-span-1"}`}
            style={{ perspective: "1000px" }}
        >
            <Link
                id={`featured-tool-${tool.slug}`}
                href={`/tool/${tool.slug}`}
                className="block h-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <m.div
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="h-full motion-reduce:transform-none"
                >
                    <Card className="h-full relative overflow-hidden border-border/40 bg-card/40 transition-all duration-500 hover:border-border/80 hover:bg-card/60 hover:shadow-2xl hover:shadow-indigo-500/10 backdrop-blur-md">
                        <div className={`absolute inset-0 bg-linear-to-br ${tool.bgGradient || "from-transparent to-transparent"} opacity-0 transition-opacity duration-700 group-hover:opacity-[0.15]`} />

                        <CardHeader className="relative z-10 h-full flex flex-col pt-8" style={{ transformStyle: "preserve-3d" }}>
                            <div className="mb-4 flex items-center justify-between gap-4" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                                <m.div
                                    whileHover={{
                                        z: 50,
                                        scale: 1.2,
                                        translateY: -8,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    className={`rounded-lg bg-secondary/80 p-3 ring-1 ring-border shadow-lg ${tool.color || "text-foreground"} group-hover:shadow-indigo-500/20`}
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transform: "translateZ(60px)",
                                    }}
                                >
                                    {(() => {
                                        const ToolIcon = getToolIcon(tool.slug);
                                        return <ToolIcon className="h-6 w-6" />;
                                    })()}
                                </m.div>
                                <Badge variant="secondary" className="bg-secondary/50 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground backdrop-blur-sm" style={{ transform: "translateZ(20px)" }}>
                                    {tool.category}
                                </Badge>
                            </div>
                            <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300" style={{ transform: "translateZ(40px)" }}>
                                {tool.title}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground/80 leading-relaxed mt-2" style={{ transform: "translateZ(30px)" }}>
                                {tool.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </m.div>
            </Link>
        </m.div>
    );
}

export function BentoGrid() {
    const [category, setCategory] = useState("All");
    const { tools, isLoading } = useAllTools();

    // Filter tools based on category
    const filteredTools = tools.filter((tool: ToolData) =>
        category === "All" ? true : tool.category === category
    );

    // Use first 8 tools for the landing page (or 7 to fit grid perfectly? Keeping 8 for now)
    const featuredTools = filteredTools.slice(0, 8);

    const categories = ["All", "Coding", "Assistance", "Productivity", "Design", "Management"];

    return (
        <LazyMotionProvider>
            <section className="container mx-auto max-w-6xl px-4 py-24">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Essential Tools
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        Hand-picked AI tools that integrate seamlessly into your workflow.
                    </p>

                    {/* Category Filter (Issue 12) */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${category === cat
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </m.div>

                <m.div
                    layout
                    className="grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                    {!isLoading && featuredTools.map((tool: ToolData, index: number) => (
                        <BentoCard key={tool.slug} tool={tool} index={index} />
                    ))}
                </m.div>

                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <Link
                        href="/tools"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                        View all {tools.length}+ tools →
                    </Link>
                </m.div>
            </section>
        </LazyMotionProvider>
    );
}
