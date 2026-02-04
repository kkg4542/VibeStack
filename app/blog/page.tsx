import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog - AI Productivity Lab",
    description: "Insights, tutorials, and comparisons of the best AI tools.",
};

export default function BlogListingPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div className="container max-w-5xl mx-auto px-4">
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Latest Insights</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Deep dives into modern development workflows, AI tool comparisons, and productivity hacks.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                            <Card className="h-full border-border/40 bg-card/50 overflow-hidden transition-all duration-300 hover:border-border/80 hover:bg-card/80 hover:-translate-y-1 hover:shadow-md">
                                <div className="aspect-video w-full overflow-hidden bg-secondary/50">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <CardHeader className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                                            {post.category}
                                        </Badge>
                                        <span>•</span>
                                        <span className="flex items-center">
                                            <Clock className="mr-1 h-3 w-3" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors text-foreground">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
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
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
