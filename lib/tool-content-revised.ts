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
    cursor: "2026-09-16",
    "github-copilot": "2026-09-16",
    "v0-by-vercel": "2026-09-16",
    "bolt-new": "2026-09-16",
    cody: "2026-09-16",
    cosine: "2026-09-16",
    ollama: "2026-09-16",
    grok: "2026-09-16",
    chatgpt: "2026-09-16",
    claude: "2026-09-16",
    perplexity: "2026-09-16",
    midjourney: "2026-09-16",
    "notion-ai": "2026-09-16",
    figma: "2026-09-16",
    framer: "2026-09-16",
    "amazon-q-developer": "2026-09-16",
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
    replit: "2026-09-16",
    gamma: "2026-09-16",
    vercel: "2026-09-16",
    "devin-ai": "2026-09-16",
    airtable: "2026-09-16",
};
