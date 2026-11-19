import { describe, it, expect } from "vitest";
import { toEmbedPermalink } from "@/components/blog/InstagramReelEmbed";
import { postsKo } from "@/lib/blog-data-ko";

describe("toEmbedPermalink", () => {
    it("drops the profile segment embed.js can't resolve", () => {
        expect(toEmbedPermalink("https://www.instagram.com/vibestack.ai/reel/Df47dHlsHQ4/")).toBe(
            "https://www.instagram.com/reel/Df47dHlsHQ4/",
        );
    });
    it("keeps canonical reel and post links", () => {
        expect(toEmbedPermalink("https://www.instagram.com/reel/Abc_1-2/?igsh=x")).toBe("https://www.instagram.com/reel/Abc_1-2/");
        expect(toEmbedPermalink("https://instagram.com/p/Df2i8IWAafz")).toBe("https://www.instagram.com/p/Df2i8IWAafz/");
    });
});

describe("Reel companion posts", () => {
    it("are complete and ASCII-slugged", () => {
        for (const p of postsKo) {
            expect(p.slug).toMatch(/^[a-z0-9-]+$/);
            expect(p.excerpt.trim()).not.toBe("");
            expect(p.content.trim()).not.toBe("");
        }
    });
    it("mark Korean posts as ko and leave English posts unmarked", () => {
        for (const p of postsKo) {
            const hangul = /[\uAC00-\uD7A3]/.test(p.title);
            expect(p.lang).toBe(hangul ? "ko" : undefined);
        }
    });
    it("have unique slugs, empty tags, and a live reel URL unless unpublished", () => {
        const slugs = postsKo.map((p) => p.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
        for (const p of postsKo) {
            expect(p.tags).toEqual([]);
            if (p.reel?.url) expect(p.reel.url).toMatch(/^https:\/\/www\.instagram\.com\/vibestack\.ai\/reel\/[A-Za-z0-9_-]+\/$/);
        }
    });
    it("keep newest first", () => {
        const t = postsKo.map((p) => Date.parse(p.date));
        for (let i = 1; i < t.length; i++) expect(t[i - 1]).toBeGreaterThanOrEqual(t[i]);
    });
});
