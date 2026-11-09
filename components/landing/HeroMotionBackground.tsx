"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  buildSceneData,
  drawFrame,
  LOOP_SECONDS,
  representativeTime,
} from "@/lib/hero-motion/scene";

/** Backing-store resolution cap (device pixels per CSS pixel). */
const MAX_DPR = 1.5;
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
/** The empty 16:9 box in the hero layout the scene is fitted into. */
const STAGE_SELECTOR = "[data-hero-stage]";
/** The hero's layout grid: its size changes whenever the stage may have moved. */
const LAYOUT_SELECTOR = "[data-hero-layout]";

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
 * The hero's looping motion graphic (lib/hero-motion/scene.js) on a
 * full-bleed canvas behind the hero, at full contrast. Decorative only.
 *
 * The canvas covers the whole section, so the ground colour is seamless; the
 * 1920x1080 composition is contain-fitted into the stage, an empty 16:9
 * placeholder in the hero layout (`data-hero-stage`, in the same section).
 * Its rect is measured relative to the canvas and passed to drawFrame as
 * `stage` in canvas pixels. Without a placeholder the scene covers the canvas.
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

    const section = wrap.parentElement;
    const stageEl = section?.querySelector<HTMLElement>(STAGE_SELECTOR) ?? null;
    const layoutEl = section?.querySelector<HTMLElement>(LAYOUT_SELECTOR) ?? null;
    const reducedMq = window.matchMedia(REDUCED_QUERY);

    // Reused for every frame (the stage rect is updated in place on resize).
    const stage = { x: 0, y: 0, w: 0, h: 0 };
    const opts: {
      width: number;
      height: number;
      fontFamily: string;
      bodyFontFamily: string;
      contrast: number;
      data: typeof data;
      stage: typeof stage | undefined;
    } = {
      width: 0,
      height: 0,
      fontFamily: "sans-serif",
      bodyFontFamily: "sans-serif",
      contrast: 1,
      data,
      stage: undefined,
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
      if (w !== canvas.width || h !== canvas.height) {
        // Resizing clears the canvas: redraw now so no blank frame is painted.
        canvas.width = w;
        canvas.height = h;
      }
      opts.width = w;
      opts.height = h;
      opts.stage = undefined;
      if (stageEl && rect.width > 0 && rect.height > 0) {
        // Stage rect relative to the canvas, in canvas (backing-store) pixels.
        const sr = stageEl.getBoundingClientRect();
        const rx = w / rect.width;
        const ry = h / rect.height;
        stage.x = (sr.left - rect.left) * rx;
        stage.y = (sr.top - rect.top) * ry;
        stage.w = sr.width * rx;
        stage.h = sr.height * ry;
        if (stage.w > 0 && stage.h > 0) opts.stage = stage;
      }
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

    // The wrapper (canvas size), the stage (its size) and the layout grid
    // (reflow above the stage, e.g. the h1 after the font swap, moves it).
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    if (stageEl) ro.observe(stageEl);
    if (layoutEl) ro.observe(layoutEl);

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        onScreen = entry.isIntersecting;
        update();
      });
      // Pause when the stage (the only place the scene shows) leaves the viewport.
      io.observe(stageEl ?? wrap);
    }

    const onVisibility = () => update();
    const onReducedChange = () => {
      reduced = reducedMq.matches;
      update();
    };
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
