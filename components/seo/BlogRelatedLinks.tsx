import { BlogTrackedLink } from "@/components/analytics/BlogTrackedLink";
import { BlogPost } from "@/lib/blog";
import { getRelatedContent, hasNoRelatedContent } from "@/lib/blog-related";
import { ToolData } from "@/lib/tool-types";

interface BlogRelatedLinksProps {
    post: BlogPost;
    tools: ToolData[];
}

// Direction B: flat surface chips, orange fill with dark text on hover/focus,
// matching the "Related comparisons" links on /compare/[slug].
const linkClass =
    "inline-flex items-center bg-card px-4 py-2.5 text-[16px] font-semibold text-foreground transition-colors duration-150 hover:bg-vibe-electric hover:text-vibe-deep focus-visible:bg-vibe-electric focus-visible:text-vibe-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none";

/**
 * Server-rendered cross-links from a blog post to the tool, guide, comparison
 * and stack pages it talks about.
 *
 * Blog posts were leaf nodes: lots of inbound crawl, no outbound links to the
 * money pages. What counts as "talks about" lives in lib/blog-related.ts so the
 * inline callout and this list never disagree.
 */
export function BlogRelatedLinks({ post, tools }: BlogRelatedLinksProps) {
    const related = getRelatedContent(post, tools);

    if (hasNoRelatedContent(related)) {
        return null;
    }

    const link = (href: string, targetType: "tool" | "guide" | "compare" | "stack", label: string) => (
        <BlogTrackedLink
            href={href}
            postSlug={post.slug}
            placement="related"
            targetType={targetType}
            className={linkClass}
        >
            {label}
        </BlogTrackedLink>
    );

    return (
        <nav
            aria-label="Related reading"
            className="mt-20"
        >
            <h2 className="mb-4 text-[20px] font-semibold text-foreground">Related on VibeStack</h2>
            <ul className="flex flex-wrap gap-1">
                {related.tools.map((tool) => (
                    <li key={`tool-${tool.slug}`}>{link(`/tool/${tool.slug}`, "tool", `${tool.title} review`)}</li>
                ))}
                {related.guides.map((c) => (
                    <li key={`best-${c.slug}`}>{link(`/best/${c.slug}`, "guide", c.heading)}</li>
                ))}
                {related.comparisons.map((c) => (
                    <li key={`compare-${c.slug}`}>{link(`/compare/${c.slug}`, "compare", c.label)}</li>
                ))}
                {related.relatedStack && (
                    <li key={`stack-${related.relatedStack.id}`}>
                        {link(`/stack/${related.relatedStack.id}`, "stack", related.relatedStack.name)}
                    </li>
                )}
            </ul>
        </nav>
    );
}
