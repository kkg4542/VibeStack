"use client";

import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tool, tools } from "@/lib/tools";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function BentoCard({ tool, index }: { tool: Tool, index: number }) {
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
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="h-full"
                >
                    <Card className="h-full relative overflow-hidden border-border/40 bg-card/40 transition-all duration-500 hover:border-border/80 hover:bg-card/60 hover:shadow-2xl hover:shadow-indigo-500/10 backdrop-blur-md">
                        <div className={`absolute inset-0 bg-linear-to-br ${tool.bgGradient} opacity-0 transition-opacity duration-700 group-hover:opacity-[0.07]`} />

                        <CardHeader className="relative z-10 h-full flex flex-col pt-8" style={{ transformStyle: "preserve-3d" }}>
                            <div className="mb-4 flex items-center justify-between" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                                <motion.div
                                    whileHover={{
                                        z: 50,
                                        scale: 1.2,
                                        translateY: -8,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    className={`rounded-xl bg-secondary/80 p-2.5 ring-1 ring-border shadow-inner ${tool.color}`}
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transform: "translateZ(60px)",
                                    }}
                                >
                                    <tool.icon className="h-6 w-6" />
                                </motion.div>
                                <Badge variant="secondary" className="bg-secondary/40 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground backdrop-blur-sm" style={{ transform: "translateZ(20px)" }}>
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
                </motion.div>
            </Link>
        </motion.div>
    );
}

export function BentoGrid() {
    // Use first 4 tools for the landing page
    const featuredTools = tools.slice(0, 4);

    return (
        <section className="container mx-auto max-w-6xl px-4 py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12 flex flex-col items-center text-center"
            >
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Essential Tools
                </h2>
                <p className="max-w-[600px] text-muted-foreground">
                    Hand-picked AI tools that integrate seamlessly into your workflow.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {featuredTools.map((tool, index) => (
                    <BentoCard key={tool.slug} tool={tool} index={index} />
                ))}
            </div>
        </section>
    );
}
