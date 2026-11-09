#!/usr/bin/env node
/**
 * Renders the 8 s hero loop to marketing/hero-loop-8s.mp4.
 *
 * Usage (from the repo root):
 *   node scripts/hero-motion/render.mjs [--contrast=1] [--anchor=0.5] [--out=marketing/hero-loop-8s.mp4]
 *
 * What it does:
 *   1. Opens scripts/hero-motion/index.html in headless Chrome (Playwright).
 *   2. For each of the 480 output frames (60 fps x 8.000 s) draws 8 subframes
 *      spread across a 180-degree shutter (1/120 s centred on the frame time;
 *      the scene wraps time, so the loop stays seamless) and saves them as PNG.
 *   3. ffmpeg averages each group of 8 (tmix) and keeps one frame in eight:
 *
 *      /opt/homebrew/bin/ffmpeg -y -framerate 480 -i <tmp>/s%05d.png \
 *        -vf "tmix=frames=8:weights='1 1 1 1 1 1 1 1',select='eq(mod(n\,8)\,7)',setpts=N/(60*TB),
 *             scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" \
 *        -r 60 -frames:v 480 -an -c:v libx264 -preset slow -crf 16 \
 *        -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
 *        -movflags +faststart marketing/hero-loop-8s.mp4
 *
 *   4. Deletes the temporary frames.
 * Output: H.264 yuv420p, 1920x1080, 60 fps, exactly 480 frames, no audio.
 */
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { ROOT, flag, frameAt, openScene } from "./browser.mjs";

const FFMPEG = "/opt/homebrew/bin/ffmpeg";
const FPS = 60;
const SECONDS = 8;
const SUB = 8; // 8 subframes: 3 read as separate ghost copies on fast type
const SHUTTER = 0.5 / FPS; // 180 degrees
const contrast = Number(flag("contrast", "1"));
const anchor = Number(flag("anchor", "0.5"));
const out = resolve(ROOT, flag("out", "marketing/hero-loop-8s.mp4"));

const tmp = await mkdtemp(join(tmpdir(), "hero-loop-"));
try {
  const { browser, page } = await openScene({ contrast, anchor });
  try {
    const frames = FPS * SECONDS;
    let i = 0;
    for (let f = 0; f < frames; f++) {
      for (let k = 0; k < SUB; k++) {
        const t = f / FPS + ((k + 0.5) / SUB - 0.5) * SHUTTER;
        await writeFile(join(tmp, `s${String(i++).padStart(5, "0")}.png`), await frameAt(page, t));
      }
      if (f % 60 === 59) console.log(`frames ${f + 1}/${frames}`);
    }
  } finally {
    await browser.close();
  }

  await mkdir(dirname(out), { recursive: true });
  const args = [
    "-y", "-loglevel", "error",
    "-framerate", String(FPS * SUB), "-i", join(tmp, "s%05d.png"),
    "-vf",
    `tmix=frames=${SUB}:weights='${Array(SUB).fill(1).join(" ")}',select='eq(mod(n\\,${SUB})\\,${SUB - 1})',setpts=N/(${FPS}*TB),` +
      "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p",
    "-r", String(FPS), "-frames:v", String(FPS * SECONDS), "-an",
    "-c:v", "libx264", "-preset", "slow", "-crf", "16",
    "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
    "-movflags", "+faststart",
    out,
  ];
  await new Promise((done, fail) => {
    const ff = spawn(FFMPEG, args, { stdio: "inherit" });
    ff.on("error", fail);
    ff.on("exit", (code) => (code === 0 ? done() : fail(new Error(`ffmpeg exited ${code}`))));
  });
  console.log(`wrote ${out}`);
} finally {
  await rm(tmp, { recursive: true, force: true });
}
