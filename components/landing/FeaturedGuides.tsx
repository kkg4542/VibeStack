import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog";

/**
 * Server-rendered "Guides & comparisons" section.
 *
 * The homepage previously linked to zero /blog/* pages, so the site's highest
 * intent guides had no internal links from the strongest page on the domain.
 * This is deliberately static markup (no "use client", no framer-motion) so the
 * links are present in the initial HTML for crawlers.
 */

/** The pillar guide — rendered as the large card. */
const FEATURED_SLUG = "best-ai-tools-for-vibe-coding";

/** Supporting guides, in the order we want them crawled. */
const GUIDE_SLUGS = [
    "cursor-vs-windsurf",
    "cursor-vs-github-copilot",
    "chatgpt-vs-claude",
    "gpt5-vs-claude5",
    "what-is-vibe-coding",
];

function findPost(slug: string) {
    return blogPosts.find((p) => p.slug === slug);
}

export function FeaturedGuides() {
    const featured = findPost(FEATURED_SLUG);
    const guides = GUIDE_SLUGS.map(findPost).filter((p): p is NonNullable<typeof p> => Boolean(p));

    if (!featured && guides.length === 0) return null;

    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center rounded-full border border-vibe-electric/20 bg-vibe-electric/5 px-3 py-1 text-xs font-medium text-vibe-electric mb-4">
                        <BookOpen className="mr-2 h-3 w-3" />
                        Guides &amp; Comparisons
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Learn the{" "}
                        <span className="text-gradient-brand">vibe coding</span> stack
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Deep dives on the tools builders actually ship with — which editor to pick, which
                        assistant to pay for, and how the whole stack fits together.
                    </p>
                </div>

                <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
                    {featured && (
                        <Link
                            href={`/blog/${featured.slug}`}
                            className="group flex flex-col justify-between rounded-2xl border border-border bg-secondary/20 p-8 transition-colors hover:border-vibe-electric/40 hover:bg-secondary/40 lg:col-span-2"
                        >
                            <div>
                                <span className="text-xs font-medium uppercase tracking-wide text-vibe-electric">
                                    Start here
                                </span>
                                <h3 className="mt-3 text-2xl md:text-3xl font-bold text-foreground group-hover:text-vibe-electric transition-colors text-balance">
                                    {featured.title}
                                </h3>
                                <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
                            </div>
                            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    {featured.readTime}
                                </span>
                                <span>•</span>
                                <span>Updated {featured.updated ?? featured.date}</span>
                                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground/60 group-hover:text-vibe-electric transition-colors" />
                            </div>
                        </Link>
                    )}

                    <ul className="flex flex-col gap-4">
                        {guides.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group flex h-full flex-col rounded-xl border border-border bg-secondary/10 p-5 transition-colors hover:border-vibe-electric/40 hover:bg-secondary/30"
                                >
                                    <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                                        {post.category}
                                    </span>
                                    <span className="mt-1 font-semibold text-foreground group-hover:text-vibe-electric transition-colors">
                                        {post.title}
                                    </span>
                                    <span className="mt-1 text-xs text-muted-foreground">{post.readTime}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-vibe-electric transition-colors"
                    >
                        View all guides
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
