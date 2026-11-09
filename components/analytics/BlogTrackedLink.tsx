"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import {
    trackBlogInternalClick,
    type BlogLinkPlacement,
    type BlogLinkTarget,
} from "@/lib/analytics";

interface BlogTrackedLinkProps extends Omit<ComponentProps<typeof Link>, "href" | "onClick"> {
    href: string;
    postSlug: string;
    placement: BlogLinkPlacement;
    targetType: BlogLinkTarget;
}

/** A <Link> that reports the click to GA4 as `blog_internal_click`. */
export function BlogTrackedLink({
    href,
    postSlug,
    placement,
    targetType,
    ...props
}: BlogTrackedLinkProps) {
    return (
        <Link
            href={href}
            onClick={() => trackBlogInternalClick(postSlug, placement, targetType, href)}
            {...props}
        />
    );
}
