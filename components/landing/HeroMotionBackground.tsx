"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  buildSceneData,
  drawFrame,
  LOOP_SECONDS,
  representativeTime,
} from "@/lib/hero-motion/scene";

/* Tuning. Contrast mixes every scene colour toward the hero ground (0 = invisible, 1 = full). */
/**
 * Scene contrast at 768px and up. Measured over all 240 frames at 1440x900:
 * at 0.2 the #b0b2b6 intro stays >= 4.59:1 and the h1 >= 5.7:1; at 0.24 the
 * intro drops to 3.99:1 in 16% of frames. Don't raise it without re-measuring.
 */
const CONTRAST_DEFAULT = 0.2;
/** Scene contrast below 768px, where the copy covers more of the scene. */
const CONTRAST_SMALL = 0.18;
/** Horizontal focus of the composition (0 = left edge, 1 = right edge) at 1024px and up. */
const ANCHOR_WIDE = 0.72;
/** Horizontal focus below 1024px. */
const ANCHOR_NARROW = 0.5;
/** Backing-store resolution cap (device pixels per CSS pixel). */
const MAX_DPR = 1.5;
const WIDE_QUERY = "(min-width: 1024px)";
const SMALL_QUERY = "(max-width: 767.98px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/** The four fields the scene reads, picked from ToolData on the server. */
export interface HeroMotionTool {
  slug: string;
  title: string;
  pricing: string;
  category: string;
}

interface HeroMotionBackgroundProps {
  tools: HeroMotionTool[];
}

/** Reads a next/font family list from a CSS variable on <html>. */
function fontFromVar(name: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || "sans-serif";
}

/**
 * The hero's looping motion graphic (lib/hero-motion/scene.js) as a
 * full-bleed, low-contrast background canvas. Decorative only.
 *
 * - Drawn imperatively: no React state, one reused options object, so a frame
 *   allocates nothing beyond what drawFrame itself does.
 * - Runs only while on screen and the tab is visible; pausing keeps the phase,
 *   so resuming continues where it stopped instead of jumping.
 * - prefers-reduced-motion: one still frame (representativeTime), no loop.
 * - Starts at opacity 0 over the hero's own ground (the scene's ground is the
 *   same #18191b) and fades in after the first frame with fonts loaded.
 *
 * No framer-motion on purpose: the hero is a server component and must not
 * depend on LazyMotion.
 */
export function HeroMotionBackground({ tools }: HeroMotionBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = useMemo(() => buildSceneData(tools), [tools]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const wideMq = window.matchMedia(WIDE_QUERY);
    const smallMq = window.matchMedia(SMALL_QUERY);
    const reducedMq = window.matchMedia(REDUCED_QUERY);

    // Reused for every frame.
    const opts = {
      width: 0,
      height: 0,
      fontFamily: "sans-serif",
      bodyFontFamily: "sans-serif",
      contrast: CONTRAST_DEFAULT,
      anchor: ANCHOR_WIDE,
      // Phones: the hero is a tall canvas, so cover-fit would keep only a thin
      // vertical slice of the 1920x1080 scene; fit it to the width instead.
      fit: "cover" as "cover" | "width",
      data,
    };

    let disposed = false;
    let fontsReady = false;
    let onScreen = typeof IntersectionObserver === "undefined";
    let reduced = reducedMq.matches;
    let shown = false;
    let rafId = 0;
    /** Scene time (s) at the last pause; the loop resumes from here. */
    let phase = 0;
    /** performance.now() origin of the running loop; -1 = set on the next frame. */
    let startAt = -1;

    const canDraw = () => fontsReady && opts.width > 0 && opts.height > 0;

    const draw = (t: number) => {
      drawFrame(ctx, t, opts);
      if (!shown) {
        shown = true;
        canvas.style.opacity = "1";
      }
    };

    const tick = (now: number) => {
      if (startAt < 0) startAt = now - phase * 1000;
      draw((now - startAt) / 1000);
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
      if (startAt >= 0) phase = ((performance.now() - startAt) / 1000) % LOOP_SECONDS;
      startAt = -1;
    };

    /** Starts or stops the loop (or draws the still) to match the current conditions. */
    const update = () => {
      if (disposed) return;
      if (!canDraw()) {
        stop();
        return;
      }
      if (reduced) {
        stop();
        draw(representativeTime);
        return;
      }
      if (onScreen && !document.hidden) {
        if (!rafId) {
          startAt = -1;
          rafId = requestAnimationFrame(tick);
        }
      } else {
        stop();
      }
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = Math.max(0, Math.round(rect.width * ratio));
      const h = Math.max(0, Math.round(rect.height * ratio));
      opts.anchor = wideMq.matches ? ANCHOR_WIDE : ANCHOR_NARROW;
      opts.contrast = smallMq.matches ? CONTRAST_SMALL : CONTRAST_DEFAULT;
      opts.fit = smallMq.matches ? "width" : "cover";
      if (w !== canvas.width || h !== canvas.height) {
        // Resizing clears the canvas: redraw now so no blank frame is painted.
        canvas.width = w;
        canvas.height = h;
      }
      opts.width = w;
      opts.height = h;
      if (!canDraw()) {
        update();
        return;
      }
      if (reduced) draw(representativeTime);
      else if (rafId && startAt >= 0) draw((performance.now() - startAt) / 1000);
      // Not looping yet (first frame after fonts load, or paused): draw the
      // current phase now so the scene appears even before rAF fires.
      else draw(phase);
      update();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        onScreen = entry.isIntersecting;
        update();
      });
      io.observe(wrap);
    }

    const onVisibility = () => update();
    const onReducedChange = () => {
      reduced = reducedMq.matches;
      update();
    };
    // Breakpoint changes always come with a resize, which re-reads both queries.
    document.addEventListener("visibilitychange", onVisibility);
    reducedMq.addEventListener("change", onReducedChange);

    // Fonts: draw nothing until both faces are in, so the first frame is final.
    opts.fontFamily = fontFromVar("--font-big-shoulders");
    opts.bodyFontFamily = fontFromVar("--font-public-sans");
    const fontSet = document.fonts;
    const fontsLoaded = fontSet
      ? Promise.all([
          fontSet.load(`800 100px ${opts.fontFamily}`),
          fontSet.load(`600 100px ${opts.bodyFontFamily}`),
        ])
      : Promise.resolve();
    fontsLoaded
      .catch(() => undefined)
      .then(() => {
        if (disposed) return;
        fontsReady = true;
        resize();
      });

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      ro.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMq.removeEventListener("change", onReducedChange);
    };
  }, [data]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-full w-full bg-vibe-deep opacity-0 transition-opacity duration-700 ease-out motion-reduce:transition-none"
      />
    </div>
  );
}
