/**
 * Capture consistent dark-mode screenshots of key pages for Product Hunt
 * gallery images. Run against either local dev or production.
 *
 * Usage:
 *   npm run screenshots:ph                  # uses production
 *   BASE_URL=http://localhost:3000 npm run screenshots:ph
 *   BASE_URL=... ONLY=hero npm run screenshots:ph     # one page only
 *
 * Output: marketing/ph-screenshots/<slug>.png  (1440x900, dark mode, 2x DPR)
 *
 * Notes:
 * - Hides CustomCursor and ScrollProgress (visual noise for marketing shots)
 * - Disables all CSS animations and framer-motion transitions
 * - Waits for fonts + network idle + a small settle delay
 * - 2x DPR means actual PNG is 2880x1800 → looks crisp when scaled down to
 *   1270x760 for PH. Don't downscale to PH dimensions until final export.
 */

import { chromium, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

interface Shot {
    slug: string;            // filename
    path: string;            // URL path
    waitFor?: string;        // optional selector to wait for
    scrollTo?: number;       // optional scroll-Y before capture (px)
    fullPage?: boolean;      // capture full scroll (for long pages)
}

const SHOTS: Shot[] = [
    { slug: "hero",          path: "/" },
    { slug: "best-coding",   path: "/best/coding" },
    { slug: "compare-cursor-windsurf", path: "/compare/cursor-vs-windsurf-ide" },
    { slug: "stack-10x-engineer",      path: "/stack/10x-engineer" },
    { slug: "tool-cursor",   path: "/tool/cursor", scrollTo: 600 },
    { slug: "categories-coding",       path: "/categories/coding" },
    { slug: "tools-grid",    path: "/tools" },
    { slug: "blog-index",    path: "/blog" },
];

const BASE_URL = process.env.BASE_URL ?? "https://usevibestack.com";
const ONLY = process.env.ONLY;
const OUT_DIR = join(process.cwd(), "marketing", "ph-screenshots");

// CSS injected to silence motion + hide marketing-noise overlays.
const PREP_CSS = `
    /* Disable all CSS / framer-motion transitions and animations */
    *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
    }
    /* Hide the custom cursor and scroll-progress overlay */
    [data-custom-cursor], .custom-cursor,
    [data-scroll-progress], .scroll-progress { display: none !important; }
    /* Hide scrollbar (Chromium) */
    ::-webkit-scrollbar { display: none !important; }
    html { scrollbar-width: none !important; }
`;

async function settle(page: Page, ms = 600) {
    await page.evaluate((d) => new Promise((r) => setTimeout(r, d)), ms);
}

async function capture(shot: Shot) {
    const url = `${BASE_URL}${shot.path}`;
    console.log(`📸 ${shot.slug.padEnd(28)} ← ${url}`);

    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: "dark",
        // Persist theme cookie BEFORE first navigation so no flash-of-light-theme
        storageState: {
            cookies: [],
            origins: [{
                origin: BASE_URL,
                localStorage: [{ name: "vibestack-theme", value: "dark" }],
            }],
        },
    });

    const page = await context.newPage();
    await page.addStyleTag({ content: PREP_CSS }).catch(() => {});

    try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
        // Re-inject after navigation just in case the first injection raced.
        await page.addStyleTag({ content: PREP_CSS });

        if (shot.waitFor) await page.waitForSelector(shot.waitFor, { timeout: 10_000 });

        // Wait for web fonts so text reflow doesn't shift mid-capture
        await page.evaluate(() => (document as any).fonts?.ready);

        if (shot.scrollTo) await page.evaluate((y) => window.scrollTo(0, y), shot.scrollTo);
        await settle(page, 800);

        const outPath = join(OUT_DIR, `${shot.slug}.png`);
        await page.screenshot({
            path: outPath,
            fullPage: shot.fullPage ?? false,
            type: "png",
        });
        console.log(`   → ${outPath}`);
    } catch (err) {
        console.error(`   ✗ failed: ${(err as Error).message}`);
    } finally {
        await browser.close();
    }
}

async function main() {
    await mkdir(OUT_DIR, { recursive: true });

    const targets = ONLY
        ? SHOTS.filter((s) => s.slug.includes(ONLY))
        : SHOTS;

    if (targets.length === 0) {
        console.error(`No shots matched ONLY="${ONLY}". Available slugs:`);
        SHOTS.forEach((s) => console.error(`  - ${s.slug}`));
        process.exit(1);
    }

    console.log(`Target: ${BASE_URL}`);
    console.log(`Output: ${OUT_DIR}`);
    console.log(`Shots:  ${targets.length}\n`);

    for (const shot of targets) {
        await capture(shot);
    }

    console.log(`\n✓ Done. ${targets.length} screenshot(s) written.`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
