/**
 * Shared Playwright setup for beats.mjs and render.mjs.
 *
 * Opens scripts/hero-motion/index.html at 1920x1080 through request routing on
 * a fake origin (http://hero-motion.local/ -> repo root), so ES module imports
 * work without file:// CORS limits and without binding a local port.
 * Tries the system Google Chrome first (channel "chrome"), then Playwright's
 * bundled Chromium.
 */
import { readFile } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const ORIGIN = "http://hero-motion.local";
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
};

export async function launch() {
  const errors = [];
  for (const options of [{ channel: "chrome" }, {}]) {
    try {
      return await chromium.launch({ headless: true, ...options });
    } catch (error) {
      errors.push(`${options.channel ?? "bundled chromium"}: ${error.message.split("\n")[0]}`);
    }
  }
  throw new Error(`Could not launch a browser:\n  ${errors.join("\n  ")}`);
}

/** @returns {Promise<{ browser: import('playwright').Browser, page: import('playwright').Page }>} */
export async function openScene({ contrast = 1, anchor = 0.5 } = {}) {
  const browser = await launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on("pageerror", (error) => console.error("[page]", error.message));
  await page.route(`${ORIGIN}/**`, async (route) => {
    const path = decodeURIComponent(new URL(route.request().url()).pathname);
    const file = resolve(ROOT, `.${path}`);
    if (!file.startsWith(ROOT + sep)) return route.fulfill({ status: 403 });
    try {
      const body = await readFile(file);
      await route.fulfill({ status: 200, body, contentType: TYPES[extname(file)] ?? "application/octet-stream" });
    } catch {
      await route.fulfill({ status: 404, body: "not found" });
    }
  });
  await page.goto(`${ORIGIN}/scripts/hero-motion/index.html?contrast=${contrast}&anchor=${anchor}`);
  const { fontsOk } = await page.evaluate(() => window.ready);
  if (!fontsOk) console.warn("warning: fonts did not load; output uses fallback faces");
  return { browser, page };
}

/** Draws frame t and returns a PNG of the canvas. */
export async function frameAt(page, t) {
  await page.evaluate((time) => window.seek(time), t);
  return page.locator("#c").screenshot({ type: "png", animations: "disabled" });
}

/** Reads --key=value flags. */
export function flag(name, fallback) {
  const hit = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}
