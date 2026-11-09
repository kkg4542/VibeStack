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
 * <aside>, not a banner: it should read as part of the article. Direction B:
 * a flat surface field, square, with link-orange text (dark enough on light).
 */
export function BlogInlineCallout({ postSlug, callout }: BlogInlineCalloutProps) {
    const copy = COPY[callout.kind];

    return (
        <aside
            aria-label="Related on VibeStack"
            data-blog-callout
            className="not-prose my-12 bg-card p-6 sm:p-8"
        >
            <p className="text-[15px] font-semibold text-vibe-link">{copy.eyebrow}</p>
            <p className="mt-2 text-[18px] leading-normal text-foreground">{copy.body(callout.label)}</p>
            <BlogTrackedLink
                href={callout.href}
                postSlug={postSlug}
                placement="inline"
                targetType={callout.kind}
                className="group mt-4 inline-flex items-center text-[16px] font-semibold text-vibe-link underline-offset-4 hover:underline hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vibe-link"
            >
                {copy.cta}
                <ArrowRight
                    aria-hidden="true"
                    className="ml-1.5 h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
            </BlogTrackedLink>
        </aside>
    );
}
