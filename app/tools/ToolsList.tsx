"use client";

import { ToolData } from "@/lib/tool-types";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";
import Link from "next/link";
import dynamic from "next/dynamic";
const FeaturedSpotlight = dynamic(() => import("@/components/tools/FeaturedSpotlight").then(mod => mod.FeaturedSpotlight), { ssr: false });
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CompareButton } from "@/components/tools/CompareButton";
import { Scale, ArrowRight, Filter, ChevronDown } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

function ToolCard({ tool }: { tool: ToolData }) {
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
        <motion.article
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
                className="block relative group h-full focus-visible:ring-2 focus-visible:ring-primary rounded-3xl outline-none"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                aria-label={`View details for ${tool.title}`}
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
                        <div className={`absolute inset-0 bg-linear-to-br ${tool.bgGradient || "from-transparent to-transparent"} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} aria-hidden="true" />

                        <CardHeader className="relative h-full flex flex-col pt-8" style={{ transformStyle: "preserve-3d" }}>
                            <div className="mb-4 flex items-center justify-between gap-4" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                                <motion.div
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
                                    <ToolIconRenderer slug={tool.slug} className="h-6 w-6" aria-hidden="true" />
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
        </motion.article>
    );
}

interface ToolsListProps {
    searchQuery?: string;
    tools: ToolData[];
}

export function ToolsList({ searchQuery = "", tools }: ToolsListProps) {
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
    const categories = useMemo(
        () => ["All", ...Array.from(new Set(tools.map((t) => t.category)))],
        [tools]
    );
    const pricingModels = ["All", "Free", "Freemium", "Paid"];

    // Filter & Sort Logic
    const filteredTools = useMemo(() => {
        const result = tools.filter(t => {
            const matchCategory = category === "All" || t.category === category;
            const matchPricing = pricing === "All" || t.pricing === pricing;
            const matchSearch = !searchQuery ||
                t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.features?.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchCategory && matchPricing && matchSearch;
        });

        if (sortBy === "rating") {
            result.sort((a, b) => (b.review?.rating || 0) - (a.review?.rating || 0));
        } else if (sortBy === "newest") {
            // Placeholder: currently no 'createdAt', using reverse order
            result.reverse();
        }

        return result;
    }, [category, pricing, sortBy, searchQuery, tools]);

    const featuredTool = useMemo(() => {
        const featured = tools.filter(t => t.isFeatured);
        // Use deterministic selection based on date or similar to avoid hydration mismatch
        // For now, just pick the first one or use a consistent seed if possible.
        // Or better, move this to a client component that mounts, OR just use the first one.
        // Randomness in SSR/SSG causes hydration mismatch.
        // Let's use the day of year to rotate it? Or just index 0.
        return featured.length > 0 ? featured[0] : null;
    }, [tools]);

    return (
        <div className="w-full">
            {/* Featured Section */}
            {featuredTool && <FeaturedSpotlight tool={featuredTool} />}

            {/* Filters Row */}
            <div className="flex flex-col gap-4 mb-12">

                {/* Row 1: Controls (Pricing & Sort) - Balanced Layout */}
                <div className="flex flex-wrap items-center justify-between gap-4 w-full">

                    {/* Left Anchor: Tool Count */}
                    <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/50 text-xs font-bold text-foreground">
                            {filteredTools.length}
                        </span>
                        <span className="font-medium">Tools Available</span>
                    </div>

                    {/* Right Anchor: Filter Controls */}
                    <div className="flex flex-wrap items-center justify-end gap-3 ml-auto md:ml-0 w-full md:w-auto">
                        {/* Pricing Segmented Control */}
                        <div className="flex bg-secondary/50 p-1 rounded-lg border border-border/40 dark:border-white/5">
                            {pricingModels.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPricing(p)}
                                    aria-pressed={pricing === p}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${pricing === p
                                        ? "bg-indigo-500 text-white shadow-md"
                                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative group">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                aria-label="Sort tools"
                                className="appearance-none bg-secondary/50 border border-border/40 dark:border-white/5 rounded-lg pl-4 pr-10 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground focus:outline-none transition-all cursor-pointer hover:border-border/80"
                            >
                                <option value="default">Default</option>
                                <option value="rating">Top Rated</option>
                                <option value="newest">Newest</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none text-muted-foreground" />
                        </div>
                    </div>
                </div>
                {/* Row 2: Categories - Scrollable Horizontal List */}
                <div className="w-full -mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto no-scrollbar pb-2 mask-image-fade">
                    <div className="flex items-center gap-2 min-w-max border-b border-border/40 dark:border-white/5 pb-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                aria-pressed={category === cat}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${category === cat
                                    ? "bg-indigo-500 text-white border-indigo-500 shadow-md shadow-indigo-500/20"
                                    : "bg-transparent text-muted-foreground border-transparent hover:bg-secondary/80 hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Landing Pages Link */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        View detailed category pages:
                    </p>
                    <div className="flex items-center gap-2">
                        {categories.filter(c => c !== "All").map((cat) => (
                            <Link
                                key={cat}
                                href={`/categories/${cat.toLowerCase()}`}
                                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tools Grid */}
            < motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" >
                <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool) => (
                        <ToolCard key={tool.slug} tool={tool} />
                    ))}
                </AnimatePresence>
            </motion.div >

            {/* Floating Compare Bar */}
            <AnimatePresence>
                {
                    compareCount > 0 && (
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
                    )
                }
            </AnimatePresence >
        </div >
    );
}
