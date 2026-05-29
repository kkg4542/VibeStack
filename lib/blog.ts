import { BlogPost } from "./blog-types";
import { postsBatch1 } from "./blog-data-1";
import { postsBatch2 } from "./blog-data-2";
import { postsBatch3 } from "./blog-data-3";

export type { BlogPost };
// Batch 3 (search-intent comparison/review posts) first so they surface at the
// top of the blog index — they're the highest-value pages for SEO/affiliate.
export const blogPosts: BlogPost[] = [...postsBatch3, ...postsBatch1, ...postsBatch2];
