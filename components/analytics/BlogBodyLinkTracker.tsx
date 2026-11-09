"use client";

import { useEffect } from "react";
import { classifyBlogLinkTarget, trackBlogInternalClick } from "@/lib/analytics";

/** id of the element wrapping the article text; the tracker listens on it. */
export const BLOG_BODY_ID = "blog-article-body";

/**
 * Reports clicks on same-site links the author wrote into the article text as
 * `blog_internal_click` (placement "body"). Without it the new callout would
 * have nothing to be compared against: the posts already link to tool pages in
 * their prose, and nobody knows whether anyone follows those links.
 *
 * One delegated listener rather than a handler per link, because the text is
 * server-rendered HTML. The callout is skipped here — it reports itself.
 */
export function BlogBodyLinkTracker({ postSlug }: { postSlug: string }) {
    useEffect(() => {
        const root = document.getElementById(BLOG_BODY_ID);
        if (!root) return;

        const onClick = (event: MouseEvent) => {
            const anchor = (event.target as Element | null)?.closest("a");
            if (!anchor || !root.contains(anchor) || anchor.closest("[data-blog-callout]")) return;

            const href = anchor.getAttribute("href");
            const targetType = classifyBlogLinkTarget(href);
            if (href && targetType) trackBlogInternalClick(postSlug, "body", targetType, href);
        };

        root.addEventListener("click", onClick);
        return () => root.removeEventListener("click", onClick);
    }, [postSlug]);

    return null;
}
