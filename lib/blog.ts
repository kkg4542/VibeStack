import { BlogPost } from "./blog-types";
import { postsBatch1 } from "./blog-data-1";
import { postsBatch2 } from "./blog-data-2";
import { postsBatch3 } from "./blog-data-3";
import { postsBatch4 } from "./blog-data-4";

export type { BlogPost };
// Batch 4 (vibe-coding niche) and batch 3 (comparisons/reviews) first — these
// are the highest-value pages for SEO/affiliate, so they lead the blog index.
export const blogPosts: BlogPost[] = [...postsBatch4, ...postsBatch3, ...postsBatch1, ...postsBatch2];
