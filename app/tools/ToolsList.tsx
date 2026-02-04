"use client";

import { Tool, tools } from "@/lib/tools";
import Link from "next/link";
import { FeaturedSpotlight } from "@/components/tools/FeaturedSpotlight";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CompareButton } from "@/components/tools/CompareButton";
import { Scale, ArrowRight, Filter, ChevronDown } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

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
                            <div className="mb-4 flex items-center justify-between gap-4" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
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

                            <div className="mt-auto pt-6 flex justify-end" style={{ transform: "translateZ(40px)" }}>
                                <CompareButton toolSlug={tool.slug} toolTitle={tool.title} />
                            </div>
                        </CardHeader>
                    </Card>
                </motion.div>
            </Link>
        </motion.div>
    );
}

export function ToolsList() {
    const [category, setCategory] = useState<string>("All");
    const [pricing, setPricing] = useState<string>("All");
    const [sortBy, setSortBy] = useState<string>("default");
    const [compareCount, setCompareCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const list = JSON.parse(localStorage.getItem("compareTools") || "[]");
            setCompareCount(list.length);
        };
        updateCount();
        window.addEventListener("storage", updateCount);
        window.addEventListener("compareUpdate", updateCount);
        return () => {
            window.removeEventListener("storage", updateCount);
            window.removeEventListener("compareUpdate", updateCount);
        };
    }, []);

    // Options
    const categories = useMemo(() => ["All", ...Array.from(new Set(tools.map((t) => t.category)))], []);
    const pricingModels = ["All", "Free", "Freemium", "Paid"];

    // Filter & Sort Logic
    const filteredTools = useMemo(() => {
        let result = tools.filter(t => {
            const matchCategory = category === "All" || t.category === category;
            const matchPricing = pricing === "All" || t.pricing === pricing;
            return matchCategory && matchPricing;
        });

        if (sortBy === "rating") {
            result.sort((a, b) => (b.review?.rating || 0) - (a.review?.rating || 0));
        } else if (sortBy === "newest") {
            // Placeholder: currently no 'createdAt', using reverse order
            result.reverse();
        }

        return result;
    }, [category, pricing, sortBy]);

    const featuredTool = useMemo(() => {
        const featured = tools.filter(t => t.isFeatured);
        return featured[Math.floor(Math.random() * featured.length)];
    }, []);

    return (
        <div className="w-full">
            {/* Featured Section */}
            {featuredTool && <FeaturedSpotlight toolSlug={featuredTool.slug} />}

            {/* Filters Row */}
            <div className="flex flex-col gap-8 mb-16">
                {/* Category & Pricing Filters */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${category === cat
                                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                    : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground border border-white/5"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-secondary/30 p-1 rounded-xl border border-white/5">
                            {pricingModels.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPricing(p)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${pricing === p
                                        ? "bg-indigo-500 text-white shadow-md"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <div className="relative group">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-secondary/30 border border-white/5 rounded-xl px-4 py-2 pr-10 text-sm font-medium text-muted-foreground hover:text-foreground focus:outline-none transition-all cursor-pointer"
                            >
                                <option value="default">Sort by Default</option>
                                <option value="rating">Top Rated</option>
                                <option value="newest">Latest Release</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tools Grid */}
            <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool) => (
                        <ToolCard key={tool.slug} tool={tool} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Floating Compare Bar */}
            <AnimatePresence>
                {compareCount > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                    >
                        <div className="bg-indigo-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl flex items-center gap-6 pointer-events-auto">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <Scale className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">{compareCount} Tool{compareCount > 1 ? 's' : ''} Selected</p>
                                    <p className="text-xs text-indigo-100">Compare features side-by-side</p>
                                </div>
                            </div>
                            <Button asChild size="sm" className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold group">
                                <Link href="/compare" className="flex items-center gap-2">
                                    Compare Now
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
