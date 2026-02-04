import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/lib/tools";
import * as motion from "framer-motion/client";

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
                    <motion.div
                        key={tool.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`block relative group ${index === 0 || index === 3 ? "md:col-span-2" : "md:col-span-1"}`}
                    >
                        <Link
                            href={`/tool/${tool.slug}`}
                            className="block h-full"
                        >
                            <Card className="h-full relative overflow-hidden border-border/40 bg-card/50 transition-all duration-300 hover:border-border/80 hover:bg-card/80 hover:shadow-md">
                                <div className={`absolute inset-0 bg-linear-to-br ${tool.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />

                                <CardHeader>
                                    <div className="mb-2 flex items-center justify-between">
                                        <div className={`rounded-lg bg-background/50 p-2 ring-1 ring-border/50 ${tool.color}`}>
                                            <tool.icon className="h-5 w-5" />
                                        </div>
                                        <Badge variant="secondary" className="bg-secondary/50 text-xs font-normal text-muted-foreground">
                                            {tool.category}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl font-medium text-foreground">{tool.title}</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        {tool.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
