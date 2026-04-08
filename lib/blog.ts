import { BlogPost } from "./blog-types";
import { postsBatch1 } from "./blog-data-1";
import { postsBatch2 } from "./blog-data-2";

export type { BlogPost };
export const blogPosts: BlogPost[] = [...postsBatch1, ...postsBatch2];
