export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  /** Last substantive content refresh, e.g. "Jul 28, 2026". Feeds dateModified + sitemap lastmod. */
  updated?: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  tags?: string[];
  relatedStack?: string;
  /**
   * Hand-picked target for the inline callout, for posts whose tags are topics
   * ("Agents", "AI Models") rather than tool names and so never match anything.
   * Resolved against the live tool list; if the target no longer exists the
   * post quietly falls back to tag matching. Leave unset when no tool, guide or
   * comparison is genuinely relevant — a forced link is worse than none.
   */
  callout?: { kind: "compare" | "tool" | "guide"; slug: string };
  /** Rendered as a server-side FAQ section + FAQPage structured data. */
  faq?: { q: string; a: string }[];
}

