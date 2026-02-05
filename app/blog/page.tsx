import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";

export const metadata: Metadata = {
    title: "Blog - AI Productivity Lab",
    description: "Insights, tutorials, and comparisons of the best AI tools.",
};

export default function BlogListingPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div className="container max-w-5xl mx-auto px-4">
                <PageHeader
                    title="Latest Insights"
                    description="Deep dives into modern development workflows, AI tool comparisons, and productivity hacks."
                />

                <motion.div
                    variants={designSystem.animations.staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]"
                >
                    {blogPosts.map((post) => (
                        <motion.div
                            key={post.slug}
                            variants={designSystem.animations.fadeInUp}
                            transition={designSystem.animations.fadeInUp.transition}
                        >
                            <Link href={`/blog/${post.slug}`} className="group block h-full">
                                <Card className="h-full border-border/40 bg-card/50 overflow-hidden transition-all duration-300 hover:border-border/80 hover:bg-card/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 p-0 gap-0">
                                    <div className="relative aspect-video w-full overflow-hidden bg-secondary/50">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <div className="flex flex-col gap-6 p-6">
                                        <CardHeader className="space-y-2 p-0">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20 transition-colors">
                                                    {post.category}
                                                </Badge>
                                                <span>•</span>
                                                <span className="flex items-center">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {post.readTime}
                                                </span>
                                            </div>
                                            <CardTitle className="text-xl group-hover:text-primary transition-colors text-foreground line-clamp-2">
                                                {post.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <CardDescription className="line-clamp-2 text-muted-foreground">
                                                {post.excerpt}
                                            </CardDescription>
                                            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border/50">
                                                <User className="h-3 w-3" />
                                                {post.author}
                                                <span className="ml-auto flex items-center">
                                                    <Calendar className="mr-1 h-3 w-3" />
                                                    {post.date}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </main>
    );
}
