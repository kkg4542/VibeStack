import { describe, it, expect, vi } from "vitest";

// The hasExtendedContent branch in toolLastRevised is currently dead in
// practice — every live tool has its own TOOL_CONTENT_REVISED_BY_SLUG entry,
// so no real slug reaches it — but it is the correct fallback for a tool
// added without one, and we're asked to preserve it. Since no real slug
// exercises it, patch hasExtendedContent so one synthetic slug does, while
// leaving every other lookup (including TOOL_EXTENDED_CONTENT_REVISED) real.
const EXTENDED_ONLY_SLUG = "__fixture-extended-content-only__";
vi.mock("@/lib/tool-extended-content", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/tool-extended-content")>();
  return {
    ...actual,
    hasExtendedContent: (slug: string) =>
      slug === EXTENDED_ONLY_SLUG || actual.hasExtendedContent(slug),
  };
});

import { toolLastRevised } from "@/lib/tool-revised";
import { TOOL_CONTENT_REVISED_BY_SLUG } from "@/lib/tool-content-revised";
import { TOOL_EXTENDED_CONTENT_REVISED } from "@/lib/tool-extended-content";

describe("toolLastRevised", () => {
  it("returns the editorial date when it is later than updatedAt", () => {
    // "claude" carries a real per-tool override (2026-09-17). A DB write
    // months earlier must not shadow a genuine copy revision.
    const slug = "claude";
    const override = TOOL_CONTENT_REVISED_BY_SLUG[slug];
    expect(override).toBeTruthy(); // guard: fails loudly if the fixture slug is ever removed

    const result = toolLastRevised({ slug, updatedAt: "2026-01-01T00:00:00.000Z" });
    expect(result).toEqual(new Date(override));
  });

  it("returns updatedAt when it is later than the editorial date", () => {
    // 11 live tools are in exactly this state: the September audit touched
    // the DB row after the editorial date was written, so the DB half of the
    // max() — not the hand-maintained map — is what should win.
    const slug = "lovable";
    const override = TOOL_CONTENT_REVISED_BY_SLUG[slug];
    expect(override).toBeTruthy();

    const laterUpdatedAt = "2026-09-20T00:00:00.000Z";
    const result = toolLastRevised({ slug, updatedAt: laterUpdatedAt });
    expect(result).toEqual(new Date(laterUpdatedAt));
  });

  it("falls back to TOOL_EXTENDED_CONTENT_REVISED when a slug has no override but has extended content", () => {
    // The dead-in-practice branch: no per-tool override, but hasExtendedContent()
    // is true, so the batch constant applies — still later than an old DB write.
    const result = toolLastRevised({
      slug: EXTENDED_ONLY_SLUG,
      updatedAt: "2026-01-01T00:00:00.000Z",
    });
    expect(result).toEqual(new Date(TOOL_EXTENDED_CONTENT_REVISED));
  });

  it("returns null when there is no editorial date and no updatedAt", () => {
    // No override, no extended content, no DB timestamp — nothing to report.
    // Callers (e.g. the sitemap) are documented to substitute their own
    // fallback in this case; the helper must not invent one.
    const result = toolLastRevised({ slug: "__slug-with-no-data-at-all__", updatedAt: undefined });
    expect(result).toBeNull();
  });

  it("every TOOL_CONTENT_REVISED_BY_SLUG value parses as a valid, non-future date", () => {
    // Cheap typo guard on a hand-maintained map: a fat-fingered "2062-09-16"
    // would otherwise silently claim a page was revised decades from now.
    const now = new Date();
    for (const [slug, dateStr] of Object.entries(TOOL_CONTENT_REVISED_BY_SLUG)) {
      const parsed = new Date(dateStr);
      expect(Number.isNaN(parsed.getTime()), `"${slug}": "${dateStr}" is not a valid date`).toBe(
        false
      );
      expect(parsed.getTime(), `"${slug}": "${dateStr}" is in the future`).toBeLessThanOrEqual(
        now.getTime()
      );
    }
  });
});
