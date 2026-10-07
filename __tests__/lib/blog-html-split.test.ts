import { describe, it, expect } from "vitest";
import { splitHtmlAtBlock } from "@/lib/blog-html-split";

const para = (n: number) => `<p>${`Sentence number ${n} about AI coding tools. `.repeat(12)}</p>`;
const section = (n: number) => `<h2>Section ${n}</h2>${para(n)}${para(n + 100)}`;

/** Count open vs close tags so a split that cuts through an element fails loudly. */
function isBalanced(html: string): boolean {
    let depth = 0;
    for (const m of html.matchAll(/<(\/?)([a-z0-9]+)\b[^>]*?(\/?)>/gi)) {
        const name = m[2].toLowerCase();
        if (m[3] === "/" || ["br", "img", "hr"].includes(name)) continue;
        depth += m[1] === "/" ? -1 : 1;
        if (depth < 0) return false;
    }
    return depth === 0;
}

describe("splitHtmlAtBlock", () => {
    it("splits a long article at a heading, roughly a third of the way down", () => {
        const html = [1, 2, 3, 4, 5, 6].map(section).join("");
        const result = splitHtmlAtBlock(html);

        expect(result).not.toBeNull();
        const [head, tail] = result!;
        expect(head + tail).toBe(html);
        expect(tail.startsWith("<h2>")).toBe(true);
        expect(head.length / html.length).toBeGreaterThan(0.2);
        expect(head.length / html.length).toBeLessThan(0.55);
        expect(isBalanced(head)).toBe(true);
        expect(isBalanced(tail)).toBe(true);
    });

    it("never splits inside a table, list or blockquote", () => {
        const table =
            "<table><thead><tr><th>Tool</th><th>Price</th></tr></thead><tbody>" +
            "<tr><td>A</td><td>$1</td></tr>".repeat(40) +
            "</tbody></table>";
        const list = `<ul>${"<li><p>Item with a nested paragraph that is long enough to matter.</p></li>".repeat(30)}</ul>`;
        const quote = `<blockquote>${para(7)}${para(8)}</blockquote>`;
        const html = para(1) + table + list + quote + para(2) + para(3);

        const result = splitHtmlAtBlock(html);
        expect(result).not.toBeNull();
        expect(isBalanced(result![0])).toBe(true);
        expect(isBalanced(result![1])).toBe(true);
        expect(result![0] + result![1]).toBe(html);
    });

    it("falls back to a non-heading block boundary when there are no headings", () => {
        const html = Array.from({ length: 12 }, (_, i) => para(i)).join("");
        const result = splitHtmlAtBlock(html);

        expect(result).not.toBeNull();
        expect(result![1].startsWith("<p>")).toBe(true);
    });

    it("returns null for an article too short to interrupt", () => {
        expect(splitHtmlAtBlock(`${para(1)}${para(2)}`)).toBeNull();
        expect(splitHtmlAtBlock("")).toBeNull();
    });

    it("returns null when the whole article is wrapped in one element", () => {
        const html = `<div>${[1, 2, 3, 4, 5, 6].map(section).join("")}</div>`;
        expect(splitHtmlAtBlock(html)).toBeNull();
    });

    it("does not treat void elements as opening a block", () => {
        const html = para(1) + "<br />" + '<img src="/x.png" alt="x" />' + [2, 3, 4, 5, 6].map(section).join("");
        const result = splitHtmlAtBlock(html);

        expect(result).not.toBeNull();
        expect(isBalanced(result![0])).toBe(true);
        expect(isBalanced(result![1])).toBe(true);
    });
});
