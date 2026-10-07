/* eslint-disable @next/next/no-html-link-for-pages -- fixture markup, not navigation */
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BlogInlineCallout } from "@/components/blog/BlogInlineCallout";
import { BlogBodyLinkTracker, BLOG_BODY_ID } from "@/components/analytics/BlogBodyLinkTracker";

describe("BlogInlineCallout", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
  });

  it("links to the target and reports the click as an inline blog_internal_click", () => {
    render(
      <BlogInlineCallout
        postSlug="gpt5-vs-claude5"
        callout={{ kind: "compare", href: "/compare/chatgpt-vs-claude", label: "ChatGPT vs Claude" }}
      />
    );

    const link = screen.getByRole("link", { name: /read the comparison/i });
    expect(link.getAttribute("href")).toBe("/compare/chatgpt-vs-claude");

    fireEvent.click(link);
    expect(window.gtag).toHaveBeenCalledWith("event", "blog_internal_click", {
      post_slug: "gpt5-vs-claude5",
      placement: "inline",
      target_type: "compare",
      target_path: "/compare/chatgpt-vs-claude",
    });
  });
});

describe("BlogBodyLinkTracker", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
  });

  const renderArticle = () =>
    render(
      <>
        <div id={BLOG_BODY_ID}>
          <p>
            <a href="/tool/cursor">Cursor</a> <a href="https://example.com/x">External</a>
          </p>
          <aside data-blog-callout>
            <a href="/best/coding">Callout link</a>
          </aside>
        </div>
        <a href="/tool/claude">Outside the body</a>
        <BlogBodyLinkTracker postSlug="what-is-vibe-coding" />
      </>
    );

  it("reports a same-site link written into the text", () => {
    renderArticle();
    fireEvent.click(screen.getByRole("link", { name: "Cursor" }));

    expect(window.gtag).toHaveBeenCalledTimes(1);
    expect(window.gtag).toHaveBeenCalledWith("event", "blog_internal_click", {
      post_slug: "what-is-vibe-coding",
      placement: "body",
      target_type: "tool",
      target_path: "/tool/cursor",
    });
  });

  it("ignores external links, the callout (which reports itself) and links outside the body", () => {
    renderArticle();
    fireEvent.click(screen.getByRole("link", { name: "External" }));
    fireEvent.click(screen.getByRole("link", { name: "Callout link" }));
    fireEvent.click(screen.getByRole("link", { name: "Outside the body" }));

    expect(window.gtag).not.toHaveBeenCalled();
  });
});
