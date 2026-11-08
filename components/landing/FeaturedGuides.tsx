import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import { Container } from "@/components/primitives/Container";

/**
 * Server-rendered "Guides and comparisons" section.
 *
 * The homepage previously linked to zero /blog/* pages, so the site's highest
 * intent guides had no internal links from the strongest page on the domain.
 * This is deliberately static markup (no "use client", no framer-motion) so the
 * links are present in the initial HTML for crawlers.
 *
 * Composition: the pillar guide is a large inverse field (ink ground, ground
 * text) across about 7/12 of the width; the supporting guides stack beside it
 * as surface fields. Fields are separated by tone and space, never by lines.
 */

/** The pillar guide — rendered as the large field. */
const FEATURED_SLUG = "best-ai-tools-for-vibe-coding";

/** Supporting guides, in the order we want them crawled. */
const GUIDE_SLUGS = [
    "cursor-vs-windsurf",
    "cursor-vs-github-copilot",
    "chatgpt-vs-claude",
    "gpt5-vs-claude5",
    "what-is-vibe-coding",
];

/** Stagger classes for scroll-driven reveals (defined in globals.css). */
const REVEAL_DELAYS = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

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
        <section className="bg-background py-24 text-foreground md:py-36">
            <Container>
                <div className="reveal mb-12 md:mb-16">
                    <h2 className="font-display text-[clamp(40px,5.5vw,84px)] text-foreground">
                        Guides and comparisons
                    </h2>
                    <p className="mt-6 max-w-[60ch] text-[18px] leading-normal text-foreground">
                        Deep dives on the tools builders actually ship with: which editor to pick, which
                        assistant to pay for, and how the whole stack fits together.
                    </p>
                </div>

                <div className="grid gap-3 lg:grid-cols-12 lg:gap-6">
                    {featured && (
                        <div className="reveal lg:col-span-7">
                            <Link
                                href={`/blog/${featured.slug}`}
                                className="group flex h-full flex-col bg-foreground p-6 text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vibe-link sm:p-8 lg:p-12"
                            >
                                <h3 className="font-display text-balance text-[clamp(32px,3.6vw,56px)] text-background decoration-vibe-electric decoration-4 underline-offset-[0.12em] group-hover:underline group-focus-visible:underline">
                                    {featured.title}
                                </h3>
                                <p className="mt-5 max-w-[60ch] text-[17px] leading-normal text-background">
                                    {featured.excerpt}
                                </p>

                                {highlights.length > 0 && (
                                    <div className="mt-8">
                                        <p className="text-[16px] font-semibold text-background">
                                            What&rsquo;s inside
                                        </p>
                                        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[16px] leading-normal text-background">
                                            {highlights.map((heading) => (
                                                <li key={heading}>{heading}</li>
                                            ))}
                                        </ul>
                                        {moreSections > 0 && (
                                            <p className="mt-3 text-[14px] text-background/75">
                                                and {moreSections} more sections
                                            </p>
                                        )}
                                    </div>
                                )}

                                {topics.length > 0 && (
                                    <p className="mt-6 text-[16px] leading-normal text-background">
                                        <span className="font-semibold">Covers </span>
                                        {topics.join(", ")}
                                    </p>
                                )}

                                <div className="mt-auto flex items-center gap-3 pt-8 text-[14px] text-background/75">
                                    <span>{featured.readTime}</span>
                                    <span aria-hidden="true">&middot;</span>
                                    <span>Updated {featured.updated ?? featured.date}</span>
                                    <ArrowRight
                                        aria-hidden="true"
                                        className="ml-auto h-6 w-6 text-background transition-transform duration-200 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0"
                                    />
                                </div>
                            </Link>
                        </div>
                    )}

                    <ul className="flex flex-col gap-3 lg:col-span-5">
                        {guides.map((post, i) => (
                            <li
                                key={post.slug}
                                className={`reveal flex-1 ${REVEAL_DELAYS[i % REVEAL_DELAYS.length]}`}
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group flex h-full flex-col justify-center bg-card p-5 hover:bg-accent focus-visible:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link sm:p-6"
                                >
                                    <span className="text-[14px] text-muted-foreground">{post.category}</span>
                                    <span className="mt-1 text-[20px] font-semibold leading-snug text-foreground decoration-vibe-electric decoration-2 underline-offset-4 group-hover:underline group-focus-visible:underline">
                                        {post.title}
                                    </span>
                                    <span className="mt-2 text-[14px] text-muted-foreground">{post.readTime}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-10">
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-1.5 text-[18px] font-semibold text-vibe-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vibe-link"
                    >
                        View all guides
                        <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                        />
                    </Link>
                </div>
            </Container>
        </section>
    );
}
