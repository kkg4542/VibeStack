import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

interface Props {
    params: { slug: string };
}

// Generate static params for all posts
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} - AI Productivity Lab`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <ReadingProgress />
            <div className="container max-w-3xl mx-auto px-4">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>

                <article>
                    <header className="mb-12 text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10">
                                {post.category}
                            </Badge>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground flex items-center">
                                <Clock className="mr-1 h-3.5 w-3.5" />
                                {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight text-foreground">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {post.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {post.date}
                            </div>
                        </div>
                    </header>

                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-secondary/30 mb-12 border border-border shadow-sm">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div
                        className="prose dark:prose-invert prose-zinc prose-indigo mx-auto prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </div>
        </main>
    );
}
