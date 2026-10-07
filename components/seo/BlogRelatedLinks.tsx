import { BlogTrackedLink } from "@/components/analytics/BlogTrackedLink";
import { BlogPost } from "@/lib/blog";
import { getRelatedContent, hasNoRelatedContent } from "@/lib/blog-related";
import { ToolData } from "@/lib/tool-types";

interface BlogRelatedLinksProps {
    post: BlogPost;
    tools: ToolData[];
}

const linkClass = "hover:text-primary transition-colors";

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
            className="mt-16 border-t border-border/60 pt-10"
        >
            <h2 className="text-sm font-semibold text-foreground mb-4">Related on VibeStack</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
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
