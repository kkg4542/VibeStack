#!/usr/bin/env node
/**
 * Renders one PNG per beat of the 8 s hero loop for review.
 *
 * Usage (from the repo root):
 *   node scripts/hero-motion/beats.mjs [outDir] [--contrast=1] [--anchor=0.5]
 *
 * Writes frame-0.00.png, beat-01 .. beat-16 (each 0.32 s into its beat, i.e.
 * mid-move), and end-7.99.png. Default outDir is the session scratchpad below.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { flag, frameAt, openScene } from "./browser.mjs";

const DEFAULT_OUT =
  "/private/tmp/claude-501/-Users-David-App-Development-VibeStack/7adf5f24-75f0-4628-a5da-8b021ab269b9/scratchpad/hero-beats";
const outDir = resolve(process.argv.slice(2).find((arg) => !arg.startsWith("--")) ?? DEFAULT_OUT);
const contrast = Number(flag("contrast", "1"));
const anchor = Number(flag("anchor", "0.5"));

const shots = [["frame-0.00", 0]];
for (let beat = 1; beat <= 16; beat++) {
  shots.push([`beat-${String(beat).padStart(2, "0")}-${((beat - 1) * 0.5 + 0.32).toFixed(2)}`, (beat - 1) * 0.5 + 0.32]);
}
shots.push(["end-7.99", 7.99]);

await mkdir(outDir, { recursive: true });
const { browser, page } = await openScene({ contrast, anchor });
try {
  for (const [name, t] of shots) {
    await writeFile(resolve(outDir, `${name}.png`), await frameAt(page, t));
  }
} finally {
  await browser.close();
}
console.log(`wrote ${shots.length} PNGs to ${outDir}`);
