import { ArrowRight } from "lucide-react";
import { BlogTrackedLink } from "@/components/analytics/BlogTrackedLink";
import type { InlineCallout } from "@/lib/blog-related";

interface BlogInlineCalloutProps {
    postSlug: string;
    callout: InlineCallout;
}

const COPY: Record<InlineCallout["kind"], { eyebrow: string; body: (label: string) => string; cta: string }> = {
    compare: {
        eyebrow: "Side by side",
        body: (label) => `${label}: where they differ on pricing, features, and who each one suits.`,
        cta: "Read the comparison",
    },
    tool: {
        eyebrow: "In depth",
        body: (label) => `Our ${label} review covers what it costs, what it does well, and where it falls short.`,
        cta: "Read the review",
    },
    guide: {
        eyebrow: "Ranked picks",
        body: (label) => `${label}, ranked, with pricing and who each tool is for.`,
        cta: "See the guide",
    },
};

/**
 * One contextual pointer, placed about a third of the way into a post, for the
 * reader who will not scroll to the "Related" list at the bottom. A plain
 * <aside>, not a banner: it should read as part of the article.
 */
export function BlogInlineCallout({ postSlug, callout }: BlogInlineCalloutProps) {
    const copy = COPY[callout.kind];

    return (
        <aside
            aria-label="Related on VibeStack"
            data-blog-callout
            className="not-prose my-10 rounded-xl border border-primary/20 bg-primary/5 p-5"
        >
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{copy.eyebrow}</p>
            <p className="mt-2 text-base text-foreground">{copy.body(callout.label)}</p>
            <BlogTrackedLink
                href={callout.href}
                postSlug={postSlug}
                placement="inline"
                targetType={callout.kind}
                className="mt-3 inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
                {copy.cta}
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </BlogTrackedLink>
        </aside>
    );
}
