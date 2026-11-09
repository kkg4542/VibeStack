import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { StackPromoCard } from "@/components/blog/StackPromoCard";
import { BlogRelatedLinks } from "@/components/seo/BlogRelatedLinks";
import { BlogInlineCallout } from "@/components/blog/BlogInlineCallout";
import { BlogBodyLinkTracker, BLOG_BODY_ID } from "@/components/analytics/BlogBodyLinkTracker";
import { getTools } from "@/lib/tools-db";
import { getInlineCallout } from "@/lib/blog-related";
import { splitHtmlAtBlock } from "@/lib/blog-html-split";
import sanitizeHtml from "sanitize-html";
import { toISODate } from "@/lib/format-date";
import { Container } from "@/components/primitives/Container";

/**
 * Article prose, direction B. Colours come from theme tokens through the
 * typography plugin's own variables, so light and dark both work. Body copy is
 * 18px with 1.65 leading; code blocks and callouts are flat surface fields.
 */
const PROSE_CLASSES = [
    "prose prose-lg mx-auto max-w-none text-[18px] leading-[1.65]",
    "[--tw-prose-body:var(--color-foreground)] [--tw-prose-headings:var(--color-foreground)]",
    "[--tw-prose-lead:var(--color-muted-foreground)] [--tw-prose-links:var(--color-vibe-link)]",
    "[--tw-prose-bold:var(--color-foreground)] [--tw-prose-counters:var(--color-muted-foreground)]",
    "[--tw-prose-bullets:var(--color-muted-foreground)] [--tw-prose-hr:var(--color-border)]",
    "[--tw-prose-quotes:var(--color-foreground)] [--tw-prose-quote-borders:var(--color-vibe-electric)]",
    "[--tw-prose-captions:var(--color-muted-foreground)] [--tw-prose-code:var(--color-foreground)]",
    "[--tw-prose-pre-code:var(--color-foreground)] [--tw-prose-pre-bg:var(--color-card)]",
    "[--tw-prose-th-borders:var(--color-border)] [--tw-prose-td-borders:var(--color-border)]",
    "prose-p:leading-[1.65] prose-li:leading-[1.65]",
    "prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-[28px] prose-h2:leading-tight prose-h3:text-[22px] prose-h3:leading-snug",
    "prose-a:font-semibold prose-a:underline-offset-4 hover:prose-a:decoration-2",
    "prose-pre:rounded-none prose-pre:bg-card prose-pre:text-[15px] prose-pre:leading-[1.6]",
    "prose-code:before:content-none prose-code:after:content-none prose-code:font-normal",
    "prose-blockquote:border-l-4 prose-blockquote:bg-card prose-blockquote:px-6 prose-blockquote:py-1 prose-blockquote:font-normal prose-blockquote:not-italic",
    // Wide comparison tables scroll inside the column instead of widening the page on phones.
    "prose-img:rounded-none prose-table:block prose-table:max-w-full prose-table:overflow-x-auto prose-table:text-[16px]",
].join(" ");

interface Props {
    params: { slug: string };
}

// Only slugs returned by generateStaticParams() are valid routes.
// Everything else returns a real HTTP 404 instead of a soft-404 (200 + "Post Not Found").
// Safe because generateStaticParams() and the page body both read the same in-repo
// `blogPosts` array, so coverage is exact by construction.
export const dynamicParams = false;

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

    const url = `https://usevibestack.com/blog/${post.slug}`;
    const publishedTime = toISODate(post.date);
    const modifiedTime = toISODate(post.updated ?? post.date);

    return {
        title: `${post.title} | VibeStack Blog`,
        description: post.excerpt,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: url,
            type: "article",
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            authors: [post.author],
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const tools = await getTools();

    // Sanitize HTML content to prevent XSS attacks
    const sanitizedContent = sanitizeHtml(post.content, {
        allowedTags: [
            'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'span', 'div',
            'table', 'thead', 'tbody', 'tr', 'th', 'td'
        ],
        allowedAttributes: {
            '*': ['class', 'id'],
            'a': ['href', 'title', 'target', 'rel'],
            'img': ['src', 'alt', 'title'],
        },
        disallowedTagsMode: 'discard',
    });

    // One contextual link a third of the way down, for readers who leave before
    // the "Related" list at the bottom. Needs both something worth linking to
    // and a safe place in the markup to put it; without either the article
    // renders exactly as before.
    const callout = getInlineCallout(post, tools);
    const split = callout ? splitHtmlAtBlock(sanitizedContent) : null;

    return (
        <div className="min-h-svh bg-background pt-32 pb-20">
            <ReadingProgress />
            <Container size="prose">
                <Link
                    href="/blog"
                    className="mb-10 inline-flex items-center text-[16px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vibe-link"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>

                <article>
                    <header className="mb-12">
                        <div className="mb-6 flex flex-wrap items-center gap-3 text-[15px]">
                            <span className="bg-secondary px-2.5 py-1 font-semibold text-foreground">
                                {post.category}
                            </span>
                            <span className="flex items-center text-muted-foreground">
                                <Clock aria-hidden="true" className="mr-1.5 h-4 w-4" />
                                {post.readTime}
                            </span>
                        </div>

                        <h1 className="mb-8 font-display text-balance text-[clamp(32px,5vw,64px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <User aria-hidden="true" className="h-4 w-4" />
                                {post.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar aria-hidden="true" className="h-4 w-4" />
                                {post.date}
                            </div>
                        </div>
                    </header>

                    <div className="relative mb-12 aspect-video w-full overflow-hidden bg-secondary">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    <div id={BLOG_BODY_ID}>
                        {callout && split ? (
                            <>
                                <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: split[0] }} />
                                <BlogInlineCallout postSlug={post.slug} callout={callout} />
                                <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: split[1] }} />
                            </>
                        ) : (
                            <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                        )}
                    </div>
                    <BlogBodyLinkTracker postSlug={post.slug} />

                    {post.faq && post.faq.length > 0 && (
                        <section
                            aria-labelledby="faq-heading"
                            className={`${PROSE_CLASSES} mt-16 bg-card p-6 sm:p-10 prose-h2:mt-0`}
                        >
                            <h2 id="faq-heading">Frequently asked questions</h2>
                            {post.faq.map((item) => (
                                <div key={item.q}>
                                    <h3>{item.q}</h3>
                                    <p>{item.a}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {post.relatedStack && <StackPromoCard stackId={post.relatedStack} />}
                </article>

                <BlogRelatedLinks post={post} tools={tools} />
            </Container>

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "description": post.excerpt,
                        "image": post.image,
                        "datePublished": toISODate(post.date),
                        "dateModified": toISODate(post.updated ?? post.date),
                        "author": {
                            "@type": "Person",
                            "name": post.author,
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "VibeStack",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://usevibestack.com/logo.png"
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://usevibestack.com/blog/${post.slug}`
                        }
                    })
                }}
            />

            {/* Breadcrumb Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "Home", item: "https://usevibestack.com" },
                            { "@type": "ListItem", position: 2, name: "Blog", item: "https://usevibestack.com/blog" },
                            { "@type": "ListItem", position: 3, name: post.title, item: `https://usevibestack.com/blog/${post.slug}` },
                        ],
                    })
                }}
            />

            {/* FAQ Structured Data — mirrors the rendered FAQ section above */}
            {post.faq && post.faq.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": post.faq.map((item) => ({
                                "@type": "Question",
                                "name": item.q,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": item.a,
                                },
                            })),
                        })
                    }}
                />
            )}
        </div>
    );
}
