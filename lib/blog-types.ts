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
  /** Rendered as a server-side FAQ section + FAQPage structured data. */
  faq?: { q: string; a: string }[];
}

