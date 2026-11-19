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

describe("Korean reel posts", () => {
    it("are complete and ASCII-slugged", () => {
        for (const p of postsKo) {
            expect(p.slug).toMatch(/^[a-z0-9-]+$/);
            expect(p.excerpt.trim()).not.toBe("");
            expect(p.content.trim()).not.toBe("");
            expect(p.lang).toBe("ko");
        }
    });
});
