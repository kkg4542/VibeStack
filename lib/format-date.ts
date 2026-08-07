/**
 * Convert a human-readable date string (e.g. "Jul 18, 2026") into an ISO
 * 8601 date ("2026-07-18") suitable for structured data (datePublished /
 * dateModified) and OpenGraph publishedTime / modifiedTime.
 *
 * Uses local date components (year/month/day) rather than `toISOString()`
 * so a UTC offset can't shift the date backward/forward by a day for
 * timezone-less inputs like "Jul 18, 2026".
 *
 * Returns `undefined` on unparseable input so callers can safely omit the
 * field instead of emitting an "Invalid Date" string.
 */
export function toISODate(dateStr: string | undefined | null): string | undefined {
    if (!dateStr) return undefined;

    const parsed = new Date(dateStr);
    if (Number.isNaN(parsed.getTime())) return undefined;

    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
