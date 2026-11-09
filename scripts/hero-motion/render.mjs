#!/usr/bin/env node
/**
 * Renders the 8 s hero loop to marketing/hero-loop-8s.mp4.
 *
 * Usage (from the repo root):
 *   node scripts/hero-motion/render.mjs [--contrast=1] [--anchor=0.5] [--out=marketing/hero-loop-8s.mp4]
 *
 * What it does:
 *   1. Opens scripts/hero-motion/index.html in headless Chrome (Playwright).
 *   2. For each of the 480 output frames (60 fps x 8.000 s) draws N subframes
 *      spread across a 180-degree shutter (1/120 s centred on the frame time;
 *      the scene wraps time, so the loop stays seamless), averages them in the
 *      page (float accumulation) and saves the blended frame as PNG.
 *      N = 32 during bar 1 (0-2 s), where the type slams in and travels
 *      hundreds of px per frame, and 8 elsewhere: with fewer subframes very
 *      fast letters show as separate stepped copies instead of a blur.
 *   3. ffmpeg encodes the 480 PNGs:
 *
 *      /opt/homebrew/bin/ffmpeg -y -framerate 60 -i <tmp>/f%05d.png \
 *        -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" \
 *        -an -c:v libx264 -preset slow -crf 16 \
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
import { ROOT, flag, openScene } from "./browser.mjs";

const FFMPEG = "/opt/homebrew/bin/ffmpeg";
const FPS = 60;
const SECONDS = 8;
/** Subframes per output frame: dense where the bar-1 type moves fastest. */
const subframesAt = (f) => (f / FPS < 2 ? 32 : 8);
const SHUTTER = 0.5 / FPS; // 180 degrees
const contrast = Number(flag("contrast", "1"));
const anchor = Number(flag("anchor", "0.5"));
const out = resolve(ROOT, flag("out", "marketing/hero-loop-8s.mp4"));

const tmp = await mkdtemp(join(tmpdir(), "hero-loop-"));
try {
  const { browser, page } = await openScene({ contrast, anchor });
  try {
    // Blend in the page: accumulate N draws in a float buffer, write the mean back.
    await page.evaluate(() => {
      const canvas = document.getElementById("c");
      const ctx = canvas.getContext("2d");
      const n = canvas.width * canvas.height * 4;
      const acc = new Float32Array(n);
      const out = ctx.createImageData(canvas.width, canvas.height);
      window.seekBlend = (times) => {
        acc.fill(0);
        for (const t of times) {
          window.seek(t);
          const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          for (let i = 0; i < n; i++) acc[i] += d[i];
        }
        const inv = 1 / times.length;
        for (let i = 0; i < n; i++) out.data[i] = Math.round(acc[i] * inv);
        ctx.putImageData(out, 0, 0);
      };
    });
    const frames = FPS * SECONDS;
    for (let f = 0; f < frames; f++) {
      const sub = subframesAt(f);
      const times = Array.from({ length: sub }, (_, k) => f / FPS + ((k + 0.5) / sub - 0.5) * SHUTTER);
      await page.evaluate((ts) => window.seekBlend(ts), times);
      const png = await page.locator("#c").screenshot({ type: "png", animations: "disabled" });
      await writeFile(join(tmp, `f${String(f).padStart(5, "0")}.png`), png);
      if (f % 60 === 59) console.log(`frames ${f + 1}/${frames}`);
    }
  } finally {
    await browser.close();
  }

  await mkdir(dirname(out), { recursive: true });
  const args = [
    "-y", "-loglevel", "error",
    "-framerate", String(FPS), "-i", join(tmp, "f%05d.png"),
    "-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p",
    "-frames:v", String(FPS * SECONDS), "-an",
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
