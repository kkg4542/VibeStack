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
    //
    // 2026-09-17: four pages revised again for factual corrections —
    // tabnine (free/individual tiers retired; org-only annual pricing),
    // gemini-code-assist (individual tier shut down, Antigravity migration
    // confirmed rather than announced), devin-ai (Devin Desktop / Windsurf
    // lineage added for readers redirected from /tool/windsurf-ide), and
    // claude (dropped a stale model version number).
    //
    // 2026-09-22: internal links added to the new /blog/discontinued-ai-tools-2026
    // post — devin-ai (added the Cascade-replaced-by-Devin-Local detail and
    // linked the post from the Windsurf lineage paragraph), cursor (added a
    // sentence noting Supermaven's autocomplete was folded into Cursor's Tab,
    // linked the post), gemini-code-assist (linked the post from the existing,
    // already-accurate shutdown paragraph; no wording changed there).
    //
    // 2026-11-08: pricing and free-plan claims re-checked against vendor pages
    // and corrected on fifteen pages: lovable, chatgpt, claude, cursor,
    // github-copilot, v0-by-vercel, bolt-new, replit, gemini-code-assist,
    // vercel, devin-ai (Devin Desktop, formerly Windsurf, plans added),
    // amazon-q-developer (IDE plugin end of support added), cody, ollama,
    // tabnine. Unverifiable per-seat figures were replaced with a pointer to
    // the vendor's pricing page.
    lovable: "2026-11-08",
    descript: "2026-09-16",
    runway: "2026-09-16",
    clickup: "2026-09-16",
    "gemini-code-assist": "2026-11-08",
    aider: "2026-09-16",
    "builder-io": "2026-09-16",
    tabnine: "2026-11-08",
    "otter-ai": "2026-09-16",
    cursor: "2026-11-08",
    "github-copilot": "2026-11-08",
    "v0-by-vercel": "2026-11-08",
    "bolt-new": "2026-11-08",
    cody: "2026-11-08",
    cosine: "2026-09-16",
    ollama: "2026-11-08",
    grok: "2026-09-16",
    chatgpt: "2026-11-08",
    claude: "2026-11-08",
    perplexity: "2026-09-18",
    midjourney: "2026-09-16",
    "notion-ai": "2026-09-16",
    figma: "2026-09-16",
    framer: "2026-09-16",
    "amazon-q-developer": "2026-11-08",
    "adobe-firefly": "2026-09-16",
    coda: "2026-09-16",
    coderabbit: "2026-09-16",
    "zoom-ai-companion": "2026-09-16",
    "slack-ai": "2026-09-16",
    linear: "2026-09-16",
    jira: "2026-09-16",
    monday: "2026-09-16",
    asana: "2026-09-16",
    "microsoft-copilot": "2026-09-16",
    "microsoft-365-copilot": "2026-09-16",
    grammarly: "2026-09-16",
    elevenlabs: "2026-09-16",
    canva: "2026-09-16",
    replit: "2026-11-08",
    gamma: "2026-09-16",
    vercel: "2026-11-08",
    "devin-ai": "2026-11-08",
    airtable: "2026-09-16",
};
