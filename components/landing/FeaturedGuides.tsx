import Link from "next/link";
import { ArrowRight, BookOpen, Check, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import { Section } from "@/components/primitives/Section";
import { designSystem } from "@/lib/design-system";

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

/**
 * Pull the guide's own section headings out of its HTML.
 *
 * Derived rather than hand-listed so the card can never drift from the article
 * it links to. Returns [] if the shape ever changes, and the block is skipped.
 */
function sectionHeadings(html: string) {
    return [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)]
        .map((m) => m[1].replace(/<[^>]+>/g, "").trim())
        .filter(Boolean);
}

export function FeaturedGuides() {
    const featured = findPost(FEATURED_SLUG);
    const headings = featured ? sectionHeadings(featured.content) : [];
    const highlights = headings.slice(0, 5);
    const moreSections = headings.length - highlights.length;
    const topics = featured?.tags?.slice(0, 7) ?? [];
    const guides = GUIDE_SLUGS.map(findPost).filter((p): p is NonNullable<typeof p> => Boolean(p));

    if (!featured && guides.length === 0) return null;

    return (
        <Section spacing="large" className="relative overflow-hidden">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-flex items-center rounded-full border border-vibe-electric/20 bg-vibe-electric/5 px-3 py-1 text-xs font-medium text-vibe-electric mb-4">
                    <BookOpen className="mr-2 h-3 w-3" />
                    Guides &amp; Comparisons
                </span>
                <h2 className={`${designSystem.typography.section} mb-6`}>
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
                        className="group relative isolate flex flex-col justify-center overflow-hidden rounded-2xl border border-border bg-secondary/20 p-8 transition-colors hover:border-vibe-electric/40 hover:bg-secondary/40 lg:col-span-2 lg:p-12"
                    >
                        {/* Brand wash. The row height is set by the 5-card list beside it,
                            so this card is always taller than its content; the wash plus
                            justify-center keep that extra height from reading as dead space. */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 -z-10 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                            style={{
                                background:
                                    "radial-gradient(110% 80% at 100% 100%, color-mix(in oklab, var(--color-vibe-electric) 14%, transparent) 0%, transparent 60%), radial-gradient(90% 70% at 0% 0%, color-mix(in oklab, var(--color-vibe-purple) 10%, transparent) 0%, transparent 55%)",
                            }}
                        />
                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-vibe-electric">
                                Start here
                            </span>
                            <h3 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-vibe-electric transition-colors text-balance">
                                {featured.title}
                            </h3>
                            <p className="mt-4 max-w-xl text-muted-foreground">{featured.excerpt}</p>

                            {highlights.length > 0 && (
                                <div className="mt-8">
                                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        What&rsquo;s inside
                                    </span>
                                    <ul className="mt-3 space-y-2">
                                        {highlights.map((heading) => (
                                            <li
                                                key={heading}
                                                className="flex items-start gap-2.5 text-sm text-foreground/80"
                                            >
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-vibe-electric/70" />
                                                <span className="line-clamp-2">{heading}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {moreSections > 0 && (
                                        <span className="mt-3 block text-xs text-muted-foreground">
                                            + {moreSections} more sections
                                        </span>
                                    )}
                                </div>
                            )}

                            {topics.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {topics.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1 text-[11px] text-muted-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
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
        </Section>
    );
}
