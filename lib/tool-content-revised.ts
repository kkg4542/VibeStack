/**
 * Per-tool override for the editorial revision date the sitemap reports as lastmod.
 *
 * TOOL_EXTENDED_CONTENT_REVISED is a single corpus-wide constant, so every tool
 * page carrying extended content reports the same lastmod. That is truthful while
 * the copy is written in batches, but it cannot express a revision to one tool:
 * bumping the constant would claim all 48 pages changed on that date, and leaving
 * it alone would understate a page that genuinely did.
 *
 * A slug listed here reports its own date instead. Add an entry when you revise a
 * single tool's copy; leave every untouched tool on the batch constant.
 *
 * Dates are ISO (YYYY-MM-DD) and must match a revision that actually happened.
 */
export const TOOL_CONTENT_REVISED_BY_SLUG: Record<string, string> = {
    // Rewritten out of the shared 48-page template: per-tool section structure,
    // use-case and FAQ counts, and a "when not to use this" section.
    lovable: "2026-09-16",
    descript: "2026-09-16",
    runway: "2026-09-16",
    clickup: "2026-09-16",
    "gemini-code-assist": "2026-09-16",
    aider: "2026-09-16",
    "builder-io": "2026-09-16",
    tabnine: "2026-09-16",
    "otter-ai": "2026-09-16",
};
