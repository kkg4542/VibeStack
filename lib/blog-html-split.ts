/** Elements that never have a closing tag, so they must not deepen the nesting. */
const VOID_TAGS = new Set(["br", "img", "hr", "input", "meta", "link", "wbr"]);

const TAG = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g;

/** Don't interrupt before the reader has had something to read. */
const MIN_CHARS_BEFORE = 800;
/** …and don't strand a callout just above the end of the article. */
const MIN_CHARS_AFTER = 800;
/** The window, as a share of the article, in which a split point is acceptable. */
const WINDOW_START = 0.2;
const WINDOW_END = 0.55;
/** Aim for roughly a third of the way down. */
const TARGET = 1 / 3;

/**
 * Split sanitized article HTML into two well-formed halves at a top-level block
 * boundary, so something can be rendered between them.
 *
 * "Top-level" is the point: splitting at a paragraph inside a table, list or
 * blockquote would leave an unclosed tag in each half. A boundary is only
 * considered when no element is open, which also means an article wrapped in a
 * single outer <div> yields no split point and gets `null` — callers then fall
 * back to not showing the inline element rather than risk broken markup.
 *
 * Expects sanitize-html output (balanced tags, `>` escaped inside attribute
 * values); it is not a general HTML parser.
 *
 * A heading boundary is preferred, since a callout reads best between sections.
 * Returns null when the article is too short to interrupt or has no safe point.
 */
export function splitHtmlAtBlock(html: string): [string, string] | null {
    const boundaries: { index: number; isHeading: boolean }[] = [];
    let depth = 0;

    for (const match of html.matchAll(TAG)) {
        const isClose = match[1] === "/";
        const name = match[2].toLowerCase();
        const selfClosing = match[3] === "/" || VOID_TAGS.has(name);

        if (isClose) {
            depth = Math.max(0, depth - 1);
            continue;
        }

        if (depth === 0) {
            boundaries.push({ index: match.index ?? 0, isHeading: /^h[1-6]$/.test(name) });
        }
        if (!selfClosing) depth += 1;
    }

    const total = html.length;
    const candidates = boundaries.filter(
        ({ index }) =>
            index >= MIN_CHARS_BEFORE &&
            total - index >= MIN_CHARS_AFTER &&
            index >= total * WINDOW_START &&
            index <= total * WINDOW_END
    );
    if (candidates.length === 0) return null;

    const pool = candidates.some((c) => c.isHeading) ? candidates.filter((c) => c.isHeading) : candidates;
    const goal = total * TARGET;
    const best = pool.reduce((a, b) => (Math.abs(b.index - goal) < Math.abs(a.index - goal) ? b : a));

    return [html.slice(0, best.index), html.slice(best.index)];
}
