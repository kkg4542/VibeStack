/** Appended by the root layout's title template (app/layout.tsx). */
export const TITLE_SUFFIX = " | VibeStack";
/** Google truncates SERP titles somewhere around here. */
export const TITLE_MAX_LENGTH = 60;

/**
 * Pick the longest (richest) title variant from a list ordered richest-first
 * that still survives Google's ~60-character SERP budget once `suffix` is
 * appended. Falls back to the last (shortest) variant if none fit.
 *
 * An optional `custom` override always wins — that's the escape hatch for
 * pages where even the shortest generated variant is too long, or where the
 * phrasing people search for differs from the generated template.
 *
 * `suffix` defaults to `TITLE_SUFFIX` because most surfaces render inside the
 * root layout's `title.template` ("%s | VibeStack"), which appends it
 * automatically. `/compare/*` is the one exception: `app/compare/layout.tsx`
 * sets a plain-string `title`, which breaks Next.js's template inheritance for
 * that whole segment, so no suffix is ever actually rendered there. Compare
 * pages pass `suffix = ""` to reclaim that unused budget for real keywords —
 * this is intentional, not a bug to "fix" by restoring the suffix.
 */
export function fitTitle(variants: string[], custom?: string, suffix: string = TITLE_SUFFIX): string {
    if (custom) return custom;

    return (
        variants.find((v) => v.length + suffix.length <= TITLE_MAX_LENGTH) ??
        variants[variants.length - 1]
    );
}
