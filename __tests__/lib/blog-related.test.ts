import { describe, it, expect } from "vitest";
import { getInlineCallout, getRelatedContent, hasNoRelatedContent, pickInlineCallout } from "@/lib/blog-related";
import { blogPosts } from "@/lib/blog";
import { BEST_CATEGORIES } from "@/lib/best-categories";
import { hasExtendedContent } from "@/lib/tool-extended-content";
import { classifyBlogLinkTarget } from "@/lib/analytics";
import { COMPARE_EDITORIAL } from "@/lib/compare-content";
import type { BlogPost } from "@/lib/blog-types";
import type { ToolData } from "@/lib/tool-types";

const tool = (slug: string, title: string, category: ToolData["category"] = "Coding"): ToolData => ({
    slug,
    title,
    description: "",
    category,
    pricing: "Freemium",
    websiteUrl: "https://example.com",
});

const TOOLS: ToolData[] = [
    tool("cursor", "Cursor"),
    tool("github-copilot", "GitHub Copilot"),
    tool("aider", "Aider"),
    tool("cody", "Cody"),
    tool("midjourney", "Midjourney", "Design"),
];

const post = (
    tags: string[] | undefined,
    relatedStack?: string,
    callout?: BlogPost["callout"]
): BlogPost => ({
    slug: "test-post",
    title: "Test post",
    excerpt: "",
    content: "",
    date: "Sep 1, 2026",
    author: "Test",
    category: "Test",
    readTime: "5 min",
    image: "/x.png",
    tags,
    relatedStack,
    callout,
});

describe("getRelatedContent", () => {
    it("matches tools by slug, title and slug prefix, ignoring case and punctuation", () => {
        const related = getRelatedContent(post(["CURSOR", "Github Copilot"]), TOOLS);
        expect(related.tools.map((t) => t.slug)).toEqual(["cursor", "github-copilot"]);
    });

    it("does not match a generic tag against an unrelated tool", () => {
        const related = getRelatedContent(post(["AI", "Agents", "IDE"]), TOOLS);
        expect(related.tools).toEqual([]);
    });

    it("only offers comparisons where both tools are mentioned", () => {
        const both = getRelatedContent(post(["cursor", "github-copilot"]), TOOLS);
        expect(both.comparisons.map((c) => c.slug)).toContain("cursor-vs-github-copilot");

        const one = getRelatedContent(post(["cursor"]), TOOLS);
        expect(one.comparisons).toEqual([]);
    });

    it("returns the category hub for matched tools", () => {
        const related = getRelatedContent(post(["midjourney"]), TOOLS);
        expect(related.guides.map((g) => g.slug)).toEqual(["design"]);
    });

    it("tolerates a post with no tags", () => {
        const related = getRelatedContent(post(undefined), TOOLS);
        expect(hasNoRelatedContent(related)).toBe(true);
    });
});

describe("pickInlineCallout", () => {
    it("prefers a comparison that has hand-written editorial copy", () => {
        expect(Object.hasOwn(COMPARE_EDITORIAL, "cursor-vs-github-copilot")).toBe(true); // fixture guard

        const callout = pickInlineCallout(getRelatedContent(post(["cursor", "github-copilot"]), TOOLS));
        expect(callout).toEqual({
            kind: "compare",
            href: "/compare/cursor-vs-github-copilot",
            label: "Cursor vs GitHub Copilot",
        });
    });

    it("skips a template-only comparison and links the first tool instead", () => {
        expect(Object.hasOwn(COMPARE_EDITORIAL, "aider-vs-cody")).toBe(false); // fixture guard

        const related = getRelatedContent(post(["aider", "cody"]), TOOLS);
        expect(related.comparisons.map((c) => c.slug)).toEqual(["aider-vs-cody"]); // exists, but is thin

        expect(pickInlineCallout(related)).toEqual({ kind: "tool", href: "/tool/aider", label: "Aider" });
    });

    it("prefers a tool page over its category hub", () => {
        const callout = pickInlineCallout(getRelatedContent(post(["midjourney"]), TOOLS));
        expect(callout).toEqual({ kind: "tool", href: "/tool/midjourney", label: "Midjourney" });
    });

    it("returns null when there is nothing relevant", () => {
        expect(pickInlineCallout(getRelatedContent(post([]), TOOLS))).toBeNull();
    });
});

describe("getInlineCallout", () => {
    it("uses the hand-picked target for a post whose tags match nothing", () => {
        const p = post(["AI Models"], undefined, { kind: "tool", slug: "cursor" });
        expect(getInlineCallout(p, TOOLS)).toEqual({ kind: "tool", href: "/tool/cursor", label: "Cursor" });
    });

    it("lets the hand-picked target win over a tag match", () => {
        const p = post(["cursor", "github-copilot"], undefined, { kind: "guide", slug: "coding" });
        expect(getInlineCallout(p, TOOLS)?.kind).toBe("guide");
    });

    it("falls back to tag matching when the target no longer exists", () => {
        const p = post(["cursor"], undefined, { kind: "tool", slug: "retired-tool" });
        expect(getInlineCallout(p, TOOLS)).toEqual({ kind: "tool", href: "/tool/cursor", label: "Cursor" });
    });

    it("refuses a comparison override that has no editorial copy", () => {
        const p = post(["Agents"], undefined, { kind: "compare", slug: "aider-vs-cody" });
        expect(getInlineCallout(p, TOOLS)).toBeNull();
    });

    it("returns null for a post with neither tags nor an override", () => {
        expect(getInlineCallout(post(undefined), TOOLS)).toBeNull();
    });
});

describe("curated blog callouts", () => {
    // Tools come from the database at runtime, so a test can't resolve them
    // against it. Every tool page that exists carries extended content, which is
    // the next best check that a typo'd slug can't silently turn a callout off.
    const curated = blogPosts.filter((p) => p.callout);

    it("has curated callouts at all", () => {
        expect(curated.length).toBeGreaterThan(0);
    });

    it.each(curated.map((p) => [p.slug, p.callout!] as const))("%s points at a page that exists", (_slug, callout) => {
        if (callout.kind === "tool") {
            expect(hasExtendedContent(callout.slug), `unknown tool "${callout.slug}"`).toBe(true);
        } else if (callout.kind === "guide") {
            expect(BEST_CATEGORIES.some((c) => c.slug === callout.slug), `unknown guide "${callout.slug}"`).toBe(true);
        } else {
            expect(Object.hasOwn(COMPARE_EDITORIAL, callout.slug), `no editorial comparison "${callout.slug}"`).toBe(true);
        }
    });
});

describe("classifyBlogLinkTarget", () => {
    it.each([
        ["/tool/cursor", "tool"],
        ["/best/coding", "guide"],
        ["/categories/design", "guide"],
        ["/compare/chatgpt-vs-claude", "compare"],
        ["/stack/power-pair", "stack"],
        ["/blog/what-is-vibe-coding", "blog"],
        ["/newsletter", "other"],
    ])("%s → %s", (href, expected) => {
        expect(classifyBlogLinkTarget(href)).toBe(expected);
    });

    it.each([null, "", "https://example.com/tool/x", "//evil.example/tool/x", "#faq", "mailto:a@b.co"])(
        "ignores %s",
        (href) => {
            expect(classifyBlogLinkTarget(href)).toBeNull();
        }
    );
});
