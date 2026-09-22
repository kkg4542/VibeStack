import { ToolData } from "@/lib/tool-types";
import { hasExtendedContent, TOOL_EXTENDED_CONTENT_REVISED } from "@/lib/tool-extended-content";
import { TOOL_CONTENT_REVISED_BY_SLUG } from "@/lib/tool-content-revised";

/**
 * The later of (a) the editorial revision date for a tool's copy and (b) the
 * database row's `updatedAt` — i.e. the same "last substantive content change"
 * semantic `lib/blog-types.ts` gives a blog post's `updated` field.
 *
 * (a) is `TOOL_CONTENT_REVISED_BY_SLUG[slug]` if the slug has its own entry,
 * else `TOOL_EXTENDED_CONTENT_REVISED` if the tool carries extended content,
 * else absent. (b) is `tool.updatedAt`, parsed.
 *
 * This is NOT a claim that a human re-verified the vendor's pricing, feature
 * set, etc. on the returned date — (b) moves on any write to the Tool row,
 * editorial or not, so "last revised" here means "last touched", not
 * "last fact-checked".
 *
 * Returns `null` only when neither (a) nor (b) is available (no editorial
 * override, no extended content, and no `updatedAt` on the row) — callers
 * that need a guaranteed date, such as the sitemap, substitute their own
 * fallback in that case, e.g. a static site-launch date.
 */
export function toolLastRevised(tool: Pick<ToolData, "slug" | "updatedAt">): Date | null {
    const override = TOOL_CONTENT_REVISED_BY_SLUG[tool.slug];
    const editorialRevised = override
        ? new Date(override)
        : hasExtendedContent(tool.slug)
          ? new Date(TOOL_EXTENDED_CONTENT_REVISED)
          : null;
    const dbUpdated = tool.updatedAt ? new Date(tool.updatedAt) : null;

    if (editorialRevised && dbUpdated) {
        return editorialRevised > dbUpdated ? editorialRevised : dbUpdated;
    }
    return editorialRevised ?? dbUpdated;
}
