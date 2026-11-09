// @ts-check
/**
 * Hero motion graphic: "goal becomes tools, tools become a stack".
 *
 * One pure drawing function of time, used by both the live hero canvas and
 * the offline MP4 render (scripts/hero-motion/). Plain ESM JavaScript with
 * JSDoc types so Next can import it and a standalone HTML page can load it
 * with a relative module import.
 *
 * 8 s seamless loop at 120 BPM (0.5 s per beat, 16 beats, 4 bars):
 *   bar 1  kinetic type: category words slam in from the right, one per beat,
 *          the orange rest bar grows into their underline rule
 *   bar 2  the last word's letter boxes morph into 8 tiles; tiles take real
 *          brand marks on beats 6-8; the rule becomes a progress bar
 *   bar 3  orthographic camera tilts to isometric, tiles extrude, stack into
 *          a tower, the rule becomes the orange cap
 *   bar 4  the tower unstacks into UI rows with a real free-plan fact each and
 *          a computed summary, then everything collapses into the rest bar
 *
 * Purity: no state between calls (the only module-level cache is a memo of
 * immutable Path2D objects built from constant path strings), no randomness
 * (a seeded integer hash), no clock, no timers. Drawing only via `ctx`.
 * Logical canvas 1920x1080, scaled to cover the real canvas.
 */

import { markForSlug } from "./marks.js";

export const LOOP_SECONDS = 8;
export const BPM = 120;
const BEAT = 60 / BPM;
/** A good still frame (the finished tower) for prefers-reduced-motion. */
export const representativeTime = 5.97;

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

/** "The Vibe Coding Stack" in lib/stacks.ts. */
export const STACK_SLUGS = ["cursor", "claude", "vercel"];
/**
 * Fill to 8 tiles with tools that carry an official brand mark, one per
 * category word where possible (Productivity, Design, Management, ...).
 * slack-ai sits in the rows on purpose: it is a real "Paid" tool, so the
 * free-plan column shows both outcomes. Anything missing from the data is
 * skipped and the list falls back to the data order.
 */
export const FILL_SLUGS = [
  "slack-ai",
  "figma",
  "asana",
  "grammarly",
  "airtable",
  "jira",
  "coda",
  "clickup",
];
/** Category words for bar 1, in order (real category names from the data). */
export const WORD_CATEGORIES = ["Coding", "Design", "Productivity", "Management"];
const TILE_COUNT = 8;
const ROW_COUNT = 4;

/**
 * @typedef {{ slug: string, title: string, pricing: string, category: string }} SceneTool
 * @typedef {{ viewBox?: number[], origin?: number[], evenodd?: boolean, paths: string[] }} Mark
 * @typedef {{ slug: string, title: string, pricing: string, category: string, free: boolean, mark: Mark | null, mono: string }} SceneTile
 * @typedef {{ words: string[], tiles: SceneTile[], rows: SceneTile[], freeRows: number, rowCount: number, summary: string }} SceneData
 * @typedef {{ width: number, height: number, fontFamily?: string, bodyFontFamily?: string, contrast?: number, anchor?: number, data?: SceneData | null,
 *   fit?: "cover" | "width", zoom?: number, focusY?: number,
 *   stage?: { x: number, y: number, w: number, h: number } }} DrawOptions
 *   stage: rect in canvas px; when set, the frame is contain-fitted and
 *   centred in it (anchor/fit/zoom/focusY ignored), the ground still fills
 *   the canvas and everything else is clipped to the stage.
 *   fit: "cover" (default) scales the 1920x1080 frame to cover the canvas;
 *   "width" scales by canvas width x zoom (default 1.25) for tall canvases,
 *   with the composition's vertical centre at focusY (0..1, default 0.5) of
 *   the canvas height. In both modes `anchor` is a fraction of the visible
 *   width and the ground fills the whole canvas.
 */

/** "adobe-firefly" -> "AF", "slack-ai" -> "S" (same rule as tool-icons.tsx). */
export function monogramText(/** @type {string} */ slug) {
  const words = slug
    .split("-")
    .filter((w) => /^[a-z]/.test(w) && w !== "ai");
  const letters = words.slice(0, 2).map((w) => w[0].toUpperCase());
  return letters.join("") || (slug[0] ? slug[0].toUpperCase() : "?");
}

/** "Free" and "Freemium" both mean the tool has a free plan. */
export function hasFreePlan(/** @type {string} */ pricing) {
  return /^(free|freemium)$/i.test(String(pricing).trim());
}

/**
 * Turns real tool records into what the scene draws.
 * @param {SceneTool[]} tools
 * @returns {SceneData}
 */
export function buildSceneData(tools) {
  /** @type {Map<string, SceneTool>} */
  const bySlug = new Map();
  for (const tool of tools) bySlug.set(tool.slug, tool);
  /** @type {SceneTool[]} */
  const picked = [];
  const take = (/** @type {SceneTool | undefined} */ tool) => {
    if (tool && picked.length < TILE_COUNT && !picked.includes(tool)) picked.push(tool);
  };
  for (const slug of STACK_SLUGS) take(bySlug.get(slug));
  for (const slug of FILL_SLUGS) take(bySlug.get(slug));
  for (const tool of tools) if (markForSlug(tool.slug)) take(tool);
  for (const tool of tools) take(tool);

  const tiles = picked.map((tool) => ({
    slug: tool.slug,
    title: tool.title,
    pricing: tool.pricing,
    category: tool.category,
    free: hasFreePlan(tool.pricing),
    // Same mark the site shows (AiIcons, then brand-marks); null = monogram.
    mark: /** @type {Mark | null} */ (markForSlug(tool.slug)),
    mono: monogramText(tool.slug),
  }));
  const rows = tiles.slice(0, ROW_COUNT);
  const freeRows = rows.filter((row) => row.free).length;

  /** @type {Map<string, number>} */
  const counts = new Map();
  for (const tool of tools) counts.set(tool.category, (counts.get(tool.category) || 0) + 1);
  let words = WORD_CATEGORIES.filter((c) => counts.has(c));
  if (words.length < WORD_CATEGORIES.length) {
    const rest = [...counts.entries()]
      .filter(([c]) => !words.includes(c))
      .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
      .map(([c]) => c);
    words = words.concat(rest).slice(0, WORD_CATEGORIES.length);
  }

  return {
    words: words.map((w) => w.toUpperCase()),
    tiles,
    rows,
    freeRows,
    rowCount: rows.length,
    summary: `${freeRows}/${rows.length} WITH A FREE PLAN`,
  };
}

/* ------------------------------------------------------------------ */
/* Colour                                                              */
/* ------------------------------------------------------------------ */

/** @param {string} hex */
function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const C_GROUND = rgb("#18191b");
const C_S2 = rgb("#2a2c2f");
const C_S4 = rgb("#3a3c40");
const C_INK = rgb("#eff0f1");
const C_ACC = rgb("#ff4a1f");
const C_ACC2 = rgb("#b83410");
const C_ACC3 = rgb("#8a270d");

/** @param {number[]} a @param {number[]} b @param {number} t */
function mixRgb(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
/** @param {number[]} c */
function css(c) {
  return `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`;
}

/** Every non-ground colour mixed toward the ground by `contrast`. */
function palette(/** @type {number} */ k) {
  const ka = Math.min(1, k * 1.5);
  const tone = (/** @type {number[]} */ c) => mixRgb(C_GROUND, c, k);
  const acc = (/** @type {number[]} */ c) => mixRgb(C_GROUND, c, ka);
  const p = {
    ground: C_GROUND,
    s2: tone(C_S2),
    s4: tone(C_S4),
    ink: tone(C_INK),
    acc: acc(C_ACC),
    acc2: acc(C_ACC2),
    acc3: acc(C_ACC3),
  };
  return {
    rgb: p,
    ground: css(p.ground),
    s2: css(p.s2),
    s4: css(p.s4),
    ink: css(p.ink),
    acc: css(p.acc),
    acc2: css(p.acc2),
    acc3: css(p.acc3),
  };
}

/* ------------------------------------------------------------------ */
/* Easing (functions of time, no overshoot)                            */
/* ------------------------------------------------------------------ */

/** @param {number} x */
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
/** Progress of a phase that starts at `s` and lasts `d` seconds. */
const prog = (/** @type {number} */ t, /** @type {number} */ s, /** @type {number} */ d) =>
  clamp01((t - s) / d);
const EXPO_N = 1 - Math.pow(2, -10);
/** Exponential ease-out, exactly 0 at p=0 and 1 at p=1. */
const expo = (/** @type {number} */ p) => (1 - Math.pow(2, -10 * p)) / EXPO_N;
const SPRING_W = 9;
const SPRING_N = 1 - (1 + SPRING_W) * Math.exp(-SPRING_W);
/** Critically damped spring step response, normalised to end at exactly 1. */
const spring = (/** @type {number} */ p) =>
  (1 - (1 + SPRING_W * p) * Math.exp(-SPRING_W * p)) / SPRING_N;
/** @param {number} a @param {number} b @param {number} t */
const lerp = (a, b, t) => a + (b - a) * t;

/** Seeded integer hash -> [0, 1). Replaces Math.random. */
function hash01(/** @type {number} */ n) {
  let x = Math.imul(n | 0, 0x9e3779b1);
  x ^= x >>> 16;
  x = Math.imul(x, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

/* ------------------------------------------------------------------ */
/* Layout (logical 1920x1080)                                          */
/* ------------------------------------------------------------------ */

const LW = 1920;
const LH = 1080;
const TYPE_PX = 380;
const TRACK = 0.012 * TYPE_PX;
const BASE_Y = 650; // type baseline
const RULE_Y = 676; // underline rule / rest bar top
const RULE_H = 24;
const REST_W = 360;
const WORD_FIT = 0.88; // a bar-1 word spans at most this share of the width
const WORD_MARGIN = 0.06; // ...and never starts left of this (bleeds right only)
const TILE = 250;
const GAP = 30;
const GRID_CY = 375; // grid centre, also the 3D world origin (y); grid 110..640
const GRID_W = 4 * TILE + 3 * GAP; // 1090
const COMP_HALF = 600; // half width of the bar 2-4 composition incl. the iso grid
const FRAME_MARGIN = 40;
const ISO_CY = 560; // world origin on screen once the camera is isometric (grid)
const TOWER_CY = 853; // ...panned down so the full tower fits
const SLAB = 88;
const SLAB_STEP = 96; // slab + 8 gap
const CAP_H = 30;
const ROW0 = 100; // first UI row top (screen y)
const ROW_STEP = 168;
const ROW_TILE = 128;
const ROW_LEFT = -450; // rows block spans -450..450 around the composition centre
const NAME_DX = ROW_LEFT + ROW_TILE + 36; // name / bar left
const ROW_RIGHT = 450;
const NAME_PX = 56;
const FACT_PX = 60;
const SUM_Y = ROW0 + 3 * ROW_STEP + ROW_TILE + 52; // 784
const SUM_H = 32;
const SUM_W = ROW_RIGHT - ROW_LEFT; // 900
const SUM_PX = 100;
const ISO_E = Math.atan(1 / Math.SQRT2); // 35.264 deg elevation
const WY = (/** @type {number} */ screenY) => screenY - GRID_CY; // screen y -> world y

// Phase times (seconds).
const MORPH_T = 4 * BEAT; // 2.0
const BOXES_T = 2.62; // letter rects hand over to tile boxes
const CAM_T = 8 * BEAT; // 4.0
const EXTRUDE_T = 9 * BEAT; // 4.5
const STACK_T = 4.95;
const STACK_DT = 0.095;
const CAP_T = 5.64;
const UNSTACK_T = 12 * BEAT; // 6.0
const SUMMARY_T = 14 * BEAT; // 7.0
const COLLAPSE_T = 15 * BEAT; // 7.5: one right-to-left wipe over the rows
const WIPE_D = 0.2; // wipe done at 7.7
const HOME_T = 7.7; // then the summary bar slides into the rest bar
const HOME_D = 0.28; // ...and lands at 7.98

/* Unstack (beat 13): the camera flattens while the whole tower shrinks into
 * the row-0 tile slot as one rigid stack; then pieces peel off the top every
 * 1/16 s and travel straight to their place. The tower is levelled so the top
 * piece always has the furthest target (cap -> summary, row 3 bar, row 3
 * tile, row 2 bar, ...): a later piece starts behind and stops short of every
 * earlier one, so moving pieces never cross (asserted in the tests). */
const FLAT_D = 0.18;
const PEEL_T = UNSTACK_T + FLAT_D; // 6.18
const PEEL_DT = BEAT / 8; // an eighth of a beat
const PEEL_D = 0.3;

/** Tower level of tile i: bottom->top row 0 tile, row 0 bar, row 1 tile, ... */
export function levelOf(/** @type {number} */ i, /** @type {number} */ n) {
  let level = 0;
  for (let r = 0; r < ROW_COUNT; r++) {
    for (const j of [r, r + ROW_COUNT]) {
      if (j >= n) continue;
      if (j === i) return level;
      level++;
    }
  }
  return level;
}

/**
 * World rect of an unstacking piece at t >= 6.0: tile i, or the orange cap
 * for i = -1. `moving` is true while the piece is in transit on its own.
 * @param {number} i @param {number} t @param {number} n
 */
export function unstackPiece(i, t, n) {
  const lv = i < 0 ? n : levelOf(i, n);
  const pg = spring(prog(t, UNSTACK_T, FLAT_D));
  let x = lerp(-TILE / 2, ROW_LEFT, pg);
  let y = lerp(-TILE / 2, ROW0 - GRID_CY, pg);
  let w = lerp(TILE, ROW_TILE, pg);
  let d = w;
  // The tower squashes into a flat stack as the camera flattens (tiny z keeps
  // the stacking order), so it never rises out of frame.
  let z = lerp(lv * SLAB_STEP, lv * 0.5, pg);
  let h = lerp(i < 0 ? CAP_H : SLAB, 0.5, pg);
  const order = n - lv; // the cap peels first, the bottom tile never moves
  const p = order >= n ? 0 : expo(prog(t, PEEL_T + order * PEEL_DT, PEEL_D));
  /** @type {number[]} */
  let target;
  if (i < 0) target = [ROW_LEFT, SUM_Y - GRID_CY, SUM_H, SUM_H];
  else {
    const r = i % ROW_COUNT;
    const ry = ROW0 + r * ROW_STEP - GRID_CY;
    target = i >= ROW_COUNT ? [NAME_DX, ry + 94, ROW_RIGHT - NAME_DX, 16] : [ROW_LEFT, ry, ROW_TILE, ROW_TILE];
  }
  x = lerp(x, target[0], p);
  y = lerp(y, target[1], p);
  w = lerp(w, target[2], p);
  d = lerp(d, target[3], p);
  h = lerp(h, 0, p);
  if (p >= 1) z = 0;
  return { x, y, w, d, z, h, p, moving: p > 0 && p < 1 };
}

/** When row r's pieces have (mostly) landed, so its labels can wipe in. */
function rowReadyTime(/** @type {number} */ r, /** @type {number} */ n) {
  let order = 0;
  for (const j of [r, r + ROW_COUNT]) if (j < n && n - levelOf(j, n) < n) order = Math.max(order, n - levelOf(j, n));
  return PEEL_T + order * PEEL_DT + PEEL_D * 0.6;
}

/** Tile i mark reveal: tiles 0-2 on beat 6, 3-5 on beat 7, 6-7 on beat 8. */
const markTime = (/** @type {number} */ i) => 5 * BEAT + Math.floor(i / 3) * BEAT + (i % 3) * 0.1;

/* ------------------------------------------------------------------ */
/* Drawing helpers                                                     */
/* ------------------------------------------------------------------ */

/** @type {Map<string, any>} memo of immutable Path2D objects */
const pathCache = new Map();
function getPath(/** @type {string} */ d) {
  let p = pathCache.get(d);
  if (!p) {
    p = new Path2D(d);
    pathCache.set(d, p);
  }
  return p;
}

/**
 * @typedef {{
 *   ctx: CanvasRenderingContext2D, s: number, ox: number, oy: number,
 *   vl: number, vr: number, cx: number, P: ReturnType<typeof palette>,
 *   display: string, body: string, data: SceneData
 * }} Frame
 */

/** setTransform in logical units on top of the cover scale. */
function setT(
  /** @type {Frame} */ f,
  /** @type {number} */ a,
  /** @type {number} */ b,
  /** @type {number} */ c,
  /** @type {number} */ d,
  /** @type {number} */ e,
  /** @type {number} */ g,
) {
  f.ctx.setTransform(f.s * a, f.s * b, f.s * c, f.s * d, f.s * e + f.ox, f.s * g + f.oy);
}

/**
 * A brand mark (or monogram) centred at (lx, ly) in a face's local space.
 * @param {Frame} f @param {SceneTile} tile
 * @param {number[]} m face affine [a,b,c,d,e,f]
 * @param {number} lx @param {number} ly @param {number} box @param {string} color
 */
function drawMark(f, tile, m, lx, ly, box, color) {
  if (box < 1.5) return;
  const ctx = f.ctx;
  ctx.fillStyle = color;
  if (tile.mark && typeof Path2D !== "undefined") {
    const vb = tile.mark.viewBox || [24, 24];
    const org = tile.mark.origin || [0, 0];
    const sc = box / Math.max(vb[0], vb[1]);
    const mx = lx - (vb[0] * sc) / 2 - org[0] * sc;
    const my = ly - (vb[1] * sc) / 2 - org[1] * sc;
    setT(f, m[0] * sc, m[1] * sc, m[2] * sc, m[3] * sc, m[0] * mx + m[2] * my + m[4], m[1] * mx + m[3] * my + m[5]);
    /** @type {CanvasFillRule} */
    const rule = tile.mark.evenodd ? "evenodd" : "nonzero";
    for (const d of tile.mark.paths) ctx.fill(getPath(d), rule);
  } else {
    // Monogram: same proportions as tool-icons.tsx (17/24 or 14/24 of the tile).
    setT(f, m[0], m[1], m[2], m[3], m[4], m[5]);
    const px = box * (tile.mono.length > 1 ? 0.97 : 1.18);
    ctx.font = `800 ${px.toFixed(2)}px ${f.display}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(tile.mono, lx, ly + px * 0.04);
  }
}

/**
 * @typedef {{ x: number, y: number, w: number, d: number, z: number, h: number,
 *   top: string, sideY: string, sideX: string, mark: number, markInk: string,
 *   tile: SceneTile | null, key: number }} Box
 * @typedef {{ c: number, s: number, sinE: number, cosE: number, cy: number }} Camera
 */

/** Orthographic projection of a world point (origin at cx, cam.cy). */
function projX(/** @type {Frame} */ f, /** @type {Camera} */ cam, /** @type {number} */ x, /** @type {number} */ y) {
  return f.cx + x * cam.c - y * cam.s;
}
function projY(
  /** @type {Camera} */ cam,
  /** @type {number} */ x,
  /** @type {number} */ y,
  /** @type {number} */ z,
) {
  return cam.cy + (x * cam.s + y * cam.c) * cam.sinE - z * cam.cosE;
}

/** Draws one box: the two visible side faces, then the top face, then marks. */
function drawBox(/** @type {Frame} */ f, /** @type {Camera} */ cam, /** @type {Box} */ b) {
  if (b.w < 0.05 || b.d < 0.05) return;
  const ctx = f.ctx;
  const zt = b.z + b.h;
  const showSides = b.h > 0.05 && cam.cosE > 1e-4;
  if (showSides) {
    // +y face (front-left): u along x, v down the height.
    const ex = projX(f, cam, b.x, b.y + b.d);
    const ey = projY(cam, b.x, b.y + b.d, zt);
    const my = [cam.c, cam.s * cam.sinE, 0, cam.cosE, ex, ey];
    setT(f, my[0], my[1], my[2], my[3], my[4], my[5]);
    ctx.fillStyle = b.sideY;
    ctx.fillRect(0, 0, b.w, b.h);
    if (cam.s > 1e-4) {
      // +x face (front-right): u along y.
      const rx = projX(f, cam, b.x + b.w, b.y);
      const ry = projY(cam, b.x + b.w, b.y, zt);
      setT(f, -cam.s, cam.c * cam.sinE, 0, cam.cosE, rx, ry);
      ctx.fillStyle = b.sideX;
      ctx.fillRect(0, 0, b.d, b.h);
    }
    if (b.tile && b.h > 10 && b.mark > 0) {
      drawMark(f, b.tile, my, b.w / 2, b.h / 2, b.h * 0.6 * b.mark, f.P.ink);
    }
  }
  const tx = projX(f, cam, b.x, b.y);
  const ty = projY(cam, b.x, b.y, zt);
  const mt = [cam.c, cam.s * cam.sinE, -cam.s, cam.c * cam.sinE, tx, ty];
  setT(f, mt[0], mt[1], mt[2], mt[3], mt[4], mt[5]);
  ctx.fillStyle = b.top;
  ctx.fillRect(0, 0, b.w, b.d);
  if (b.tile && b.mark > 0) {
    drawMark(f, b.tile, mt, b.w / 2, b.d / 2, Math.min(b.w, b.d) * 0.6 * b.mark, b.markInk);
  }
}

/** Lerp a box's geometry toward a target rect in place. */
function toward(
  /** @type {Box} */ b,
  /** @type {number} */ x,
  /** @type {number} */ y,
  /** @type {number} */ w,
  /** @type {number} */ d,
  /** @type {number} */ z,
  /** @type {number} */ h,
  /** @type {number} */ p,
) {
  if (p <= 0) return;
  b.x = lerp(b.x, x, p);
  b.y = lerp(b.y, y, p);
  b.w = lerp(b.w, w, p);
  b.d = lerp(b.d, d, p);
  b.z = lerp(b.z, z, p);
  b.h = lerp(b.h, h, p);
}

/** Clip-wiped single line of text (reveal without fades). */
function wipeText(
  /** @type {Frame} */ f,
  /** @type {string} */ text,
  /** @type {number} */ x,
  /** @type {number} */ y,
  /** @type {number} */ clipL,
  /** @type {number} */ clipR,
  /** @type {number} */ top,
  /** @type {number} */ bottom,
) {
  if (clipR - clipL < 0.5) return;
  const ctx = f.ctx;
  ctx.save();
  setT(f, 1, 0, 0, 1, 0, 0);
  ctx.beginPath();
  ctx.rect(clipL, top, clipR - clipL, bottom - top);
  ctx.clip();
  ctx.fillText(text, x, y);
  ctx.restore();
}

/* ------------------------------------------------------------------ */
/* The frame                                                           */
/* ------------------------------------------------------------------ */

/**
 * Draws the frame at time `t` (seconds; wrapped to the 8 s loop).
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} tIn
 * @param {DrawOptions} opts
 */
export function drawFrame(ctx, tIn, opts) {
  const t = ((tIn % LOOP_SECONDS) + LOOP_SECONDS) % LOOP_SECONDS;
  const width = opts.width;
  const height = opts.height;
  const k = opts.contrast == null ? 1 : clamp01(opts.contrast);
  const stage = opts.stage;
  let anchor = opts.anchor == null ? 0.5 : opts.anchor;
  let s;
  let ox;
  let oy;
  let vl;
  let vr;
  if (stage) {
    // 'stage': contain-fit the 1920x1080 frame into a rect (canvas px),
    // centred like the MP4; everything but the ground is clipped to it.
    s = Math.min(stage.w / LW, stage.h / LH);
    ox = stage.x + (stage.w - LW * s) / 2;
    oy = stage.y + (stage.h - LH * s) / 2;
    vl = (stage.x - ox) / s;
    vr = vl + stage.w / s;
    anchor = 0.5;
  } else {
    // 'cover' (default): the 1920x1080 frame covers the canvas (desktop, MP4).
    // 'width': scale by width (x zoom) for tall canvases such as phones; the
    // composition's vertical centre sits at focusY of the canvas height.
    if (opts.fit === "width") {
      s = (width / LW) * (opts.zoom == null ? 1.25 : opts.zoom);
      oy = (opts.focusY == null ? 0.5 : opts.focusY) * height - (LH / 2) * s;
    } else {
      s = Math.max(width / LW, height / LH);
      oy = (height - LH * s) / 2;
    }
    ox = (width - LW * s) / 2;
    vl = -ox / s;
    vr = vl + width / s;
  }
  const P = palette(k);

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = P.ground;
  ctx.fillRect(0, 0, width, height);

  if (stage) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(stage.x, stage.y, stage.w, stage.h);
    ctx.clip();
  }
  drawScene(ctx, t, opts, s, ox, oy, vl, vr, anchor, P);
  if (stage) ctx.restore();
}

/**
 * Everything above the ground, in logical 1920x1080 units.
 * @param {CanvasRenderingContext2D} ctx @param {number} t @param {DrawOptions} opts
 * @param {number} s @param {number} ox @param {number} oy @param {number} vl @param {number} vr
 * @param {number} anchor @param {ReturnType<typeof palette>} P
 */
function drawScene(ctx, t, opts, s, ox, oy, vl, vr, anchor, P) {
  const vw = vr - vl;
  // Bar 1 type and the rest bar sit on the anchor; the bigger bar 2-4
  // composition is centred on it but kept inside the frame with a margin.
  const cx = vl + anchor * vw;
  const compLo = vl + FRAME_MARGIN + COMP_HALF;
  const compHi = vr - FRAME_MARGIN - COMP_HALF;
  const compCx = compLo > compHi ? (vl + vr) / 2 : Math.min(compHi, Math.max(compLo, cx));
  const data = opts.data;
  /** @type {Frame} */
  const f = {
    ctx,
    s,
    ox,
    oy,
    vl,
    vr,
    cx: compCx,
    P,
    display: opts.fontFamily || "sans-serif",
    body: opts.bodyFontFamily || opts.fontFamily || "sans-serif",
    data: /** @type {SceneData} */ (data),
  };
  const words = data && data.words.length ? data.words : [];

  // Word layout (needed in bars 1-2 for the type and the rule).
  ctx.font = `800 ${TYPE_PX}px ${f.display}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  // Type layout feeds the letters (to 2.62 s) and the rule spans (to 2.5 s).
  const needType = t < BOXES_T && words.length > 0;
  // Each word is fitted to WORD_FIT of the width (smaller font for long
  // words) and never starts left of the margin, so any bleed is on the right.
  /** @type {number[][]} */
  const wordWs = [];
  /** @type {number[]} */
  const wordTotal = [];
  /** @type {number[]} */
  const wordLeft = [];
  /** @type {number[]} */
  const wordScale = [];
  let capH0 = 0.7 * TYPE_PX;
  if (needType) {
    const avail = WORD_FIT * vw;
    const minLeft = vl + WORD_MARGIN * vw;
    for (const word of words) {
      const ws = [];
      let total = 0;
      for (let j = 0; j < word.length; j++) {
        const w = ctx.measureText(word[j]).width;
        ws.push(w);
        total += w + (j ? TRACK : 0);
      }
      const sc = Math.min(1, avail / total);
      for (let j = 0; j < ws.length; j++) ws[j] *= sc;
      total *= sc;
      wordWs.push(ws);
      wordTotal.push(total);
      wordScale.push(sc);
      wordLeft.push(Math.max(minLeft, cx - total / 2));
    }
    const mH = ctx.measureText("H");
    if (mH && mH.actualBoundingBoxAscent > 0) capH0 = mH.actualBoundingBoxAscent;
  }
  const last = words.length - 1;

  /* -------- bar 1: kinetic type -------- */
  if (needType && t < BOXES_T) {
    ctx.fillStyle = P.ink;
    setT(f, 1, 0, 0, 1, 0, 0);
    for (let i = 0; i <= last; i++) {
      const t0 = i * BEAT;
      if (t < t0) break;
      if (i < last && t > t0 + BEAT + 0.6) continue;
      const word = words[i];
      const ws = wordWs[i];
      const total = wordTotal[i];
      const left = wordLeft[i];
      const track = TRACK * wordScale[i];
      ctx.font = `800 ${(TYPE_PX * wordScale[i]).toFixed(2)}px ${f.display}`;
      const enterDx = vr + 40 - left;
      const exitDx = left + total - vl + 40;
      let x = left;
      for (let j = 0; j < word.length; j++) {
        const w = ws[j];
        const jit = hash01(i * 31 + j * 7 + 3) * 0.012;
        let lx = x + (1 - expo(prog(t, t0 + j * 0.022 + jit, 0.34))) * (enterDx + j * 24);
        if (i < last) lx -= expo(prog(t, t0 + BEAT + j * 0.014, 0.3)) * exitDx;
        x += w + track;
        if (lx > vr || lx + w < vl) continue;
        // Bar 2 morph: the glyph stays until its box has covered it.
        if (i === last && t >= MORPH_T && prog(t, MORPH_T + j * 0.01, 0.14) >= 1) continue;
        ctx.fillText(word[j], lx, BASE_Y);
      }
    }
  }

  if (!data || !data.tiles.length) {
    // No data: rest pose only.
    setT(f, 1, 0, 0, 1, 0, 0);
    ctx.fillStyle = P.acc;
    ctx.fillRect(cx - REST_W / 2, RULE_Y, REST_W, RULE_H);
    return;
  }

  const tiles = data.tiles;
  const n = tiles.length;
  const rows = data.rows;
  const gridL = -GRID_W / 2;

  /* -------- bar 2a: letter boxes -> tiles -------- */
  if (needType && t >= MORPH_T && t < BOXES_T) {
    const word = words[last];
    const ws = wordWs[last];
    const L = word.length;
    const stag = Math.min(0.01, 0.12 / L);
    const sc = wordScale[last];
    const pad = 0.02 * TYPE_PX * sc;
    const capH = capH0 * sc;
    ctx.fillStyle = P.ink;
    setT(f, 1, 0, 0, 1, 0, 0);
    let x = wordLeft[last];
    /** @type {number[]} */
    const lx = [];
    for (let j = 0; j < L; j++) {
      lx.push(x);
      x += ws[j] + TRACK * sc;
    }
    const tileOf = (/** @type {number} */ j) => Math.min(n - 1, Math.floor((j * n) / L));
    const drawLetter = (/** @type {number} */ j, /** @type {number} */ ti) => {
      const pw = expo(prog(t, MORPH_T + j * 0.01, 0.14));
      const pm = spring(prog(t, MORPH_T + 0.12 + j * stag, 0.36));
      const h0 = (capH + 2 * pad) * pw;
      const bx = lx[j] - 2;
      const by = BASE_Y + pad - h0;
      const bw = ws[j] + 4;
      const tx = compCx + gridL + (ti % 4) * (TILE + GAP);
      const ty = GRID_CY - TILE - GAP / 2 + Math.floor(ti / 4) * (TILE + GAP);
      const rx = lerp(bx, tx, pm);
      const ry = lerp(by, ty, pm);
      const rw = lerp(bw, TILE, pm);
      const rh = lerp(h0, TILE, pm);
      if (rx > vr || rx + rw < vl || rh < 0.05) return;
      ctx.fillRect(rx, ry, rw, rh);
    };
    for (let j = 0; j < L; j++) drawLetter(j, tileOf(j));
    // Tiles no letter maps to (short words) grow out of the nearest letter.
    for (let i = 0; i < n; i++) {
      const j = Math.min(L - 1, Math.floor((i * L) / n));
      if (tileOf(j) !== i) drawLetter(j, i);
    }
  }

  /* -------- camera -------- */
  let u = 0;
  if (t >= CAM_T && t < UNSTACK_T) u = spring(prog(t, CAM_T, BEAT));
  else if (t >= UNSTACK_T) u = 1 - spring(prog(t, UNSTACK_T, 0.45));
  const theta = (u * Math.PI) / 4;
  const elev = Math.PI / 2 - u * (Math.PI / 2 - ISO_E);
  /** @type {Camera} */
  const cam = {
    c: u === 0 ? 1 : Math.cos(theta),
    s: u === 0 ? 0 : Math.sin(theta),
    sinE: u === 0 ? 1 : Math.sin(elev),
    cosE: u === 0 ? 0 : Math.cos(elev),
    // Orthographic pan: frame the iso grid, then follow the tower as it grows.
    cy: lerp(GRID_CY, lerp(ISO_CY, TOWER_CY, spring(prog(t, STACK_T, 1))), u),
  };

  /* -------- boxes: tiles + the rule/cap -------- */
  /** @type {Box[]} */
  const boxes = [];
  const extrude = expo(prog(t, EXTRUDE_T, 0.35));
  const towerTop = n * SLAB_STEP;

  if (t >= BOXES_T) {
    for (let i = 0; i < n; i++) {
      const tile = tiles[i];
      /** @type {Box} */
      const b = {
        x: gridL + (i % 4) * (TILE + GAP),
        y: -TILE - GAP / 2 + Math.floor(i / 4) * (TILE + GAP),
        w: TILE,
        d: TILE,
        z: 0,
        h: SLAB * extrude,
        top: P.ink,
        sideY: P.s4,
        sideX: P.s2,
        mark: expo(prog(t, markTime(i), 0.3)),
        markInk: P.ground,
        tile,
        key: i,
      };
      // Stack: lift first, then slide to the tower footprint.
      const lv = levelOf(i, n);
      const sk = STACK_T + lv * STACK_DT;
      const pz = spring(prog(t, sk, 0.22));
      const pxy = spring(prog(t, sk + 0.05, 0.3));
      if (pz > 0 || pxy > 0) {
        b.z = lerp(b.z, lv * SLAB_STEP, pz);
        b.x = lerp(b.x, -TILE / 2, pxy);
        b.y = lerp(b.y, -TILE / 2, pxy);
      }
      // Unstack into UI rows: tiles 0-3 become row tiles, 4-7 the row bars.
      if (t >= UNSTACK_T) {
        const q = unstackPiece(i, t, n);
        b.x = q.x;
        b.y = q.y;
        b.w = q.w;
        b.d = q.d;
        b.z = q.z;
        b.h = q.h;
        const row = rows[i % ROW_COUNT];
        if (i >= ROW_COUNT) {
          b.mark *= 1 - q.p;
          // Hard colour step mid-move (a lerp from ink to orange would pass
          // through off-palette pinks).
          if (q.p > 0.4 && row) b.top = row.free ? P.acc : P.s4;
        }
      }
      boxes.push(b);
    }
  } else if (t >= MORPH_T + 0.4) {
    // During the letter morph, marks land on tiles whose letters have arrived.
    for (let i = 0; i < n; i++) {
      const pm = expo(prog(t, markTime(i), 0.3));
      if (pm <= 0) continue;
      boxes.push({
        x: gridL + (i % 4) * (TILE + GAP),
        y: -TILE - GAP / 2 + Math.floor(i / 4) * (TILE + GAP),
        w: TILE,
        d: TILE,
        z: 0,
        h: 0,
        top: P.ink,
        sideY: P.s4,
        sideX: P.s2,
        mark: pm,
        markInk: P.ground,
        tile: tiles[i],
        key: i,
      });
    }
  }

  // The orange rule: rest bar -> word underline -> progress bar -> cap -> summary -> rest bar.
  const restX = cx - compCx - REST_W / 2; // rest bar in world x
  /** @type {Box} */
  const rule = {
    x: restX,
    y: WY(RULE_Y),
    w: REST_W,
    d: RULE_H,
    z: 0,
    h: 0,
    top: P.acc,
    sideY: P.acc2,
    sideX: P.acc3,
    mark: 0,
    markInk: P.ground,
    tile: null,
    key: 99,
  };
  if (t < CAM_T) {
    const beat = Math.floor(t / BEAT);
    /** @param {number} b */
    const span = (b) => {
      if (b < 0) return [restX, restX + REST_W];
      if (b <= last && b < 4 && wordTotal[b] != null) {
        const l = wordLeft[b] - compCx;
        return [l, l + wordTotal[b]];
      }
      const frac = [1 / 8, 3 / 8, 6 / 8, 1][Math.min(3, b - 4)];
      return [gridL, gridL + GRID_W * frac];
    };
    const from = span(beat - 1);
    const to = span(beat);
    const p = spring(prog(t, beat * BEAT, 0.4));
    const l = lerp(from[0], to[0], p);
    const r = lerp(from[1], to[1], p);
    rule.x = l;
    rule.w = r - l;
  } else {
    rule.x = gridL;
    rule.w = GRID_W;
    rule.h = CAP_H * extrude;
    const pz = spring(prog(t, CAP_T, 0.26));
    const pxy = spring(prog(t, CAP_T + 0.04, 0.28));
    if (pz > 0 || pxy > 0) {
      rule.z = lerp(0, towerTop, pz);
      rule.x = lerp(rule.x, -TILE / 2, pxy);
      rule.y = lerp(rule.y, -TILE / 2, pxy);
      rule.w = lerp(rule.w, TILE, pxy);
      rule.d = lerp(rule.d, TILE, pxy);
    }
    if (t >= UNSTACK_T) {
      const q = unstackPiece(-1, t, n);
      rule.x = q.x;
      rule.y = q.y;
      rule.w = q.w;
      rule.d = q.d;
      rule.z = q.z;
      rule.h = q.h;
    }
    const pf = spring(prog(t, SUMMARY_T, 0.4));
    if (pf > 0) rule.w = lerp(SUM_H, (SUM_W * data.freeRows) / Math.max(1, data.rowCount), pf);
    // After the rows are wiped, the summary bar alone slides home.
    toward(rule, restX, WY(RULE_Y), REST_W, RULE_H, 0, 0, spring(prog(t, HOME_T, HOME_D)));
  }

  // Bar 4 collapse: one right-to-left wipe over everything except the
  // orange summary bar, which is drawn last, unclipped.
  const collapsing = t >= COLLAPSE_T;
  const wipe = expo(prog(t, COLLAPSE_T, WIPE_D));
  const showRows = !collapsing || wipe < 1;
  const blockL = compCx + ROW_LEFT - 24;
  const blockR = compCx + ROW_RIGHT + 24;
  if (collapsing && showRows) {
    ctx.save();
    setT(f, 1, 0, 0, 1, 0, 0);
    ctx.beginPath();
    ctx.rect(blockL, 0, (blockR - blockL) * (1 - wipe), LH);
    ctx.clip();
  }

  // Summary track (behind the fill), bar 4 only.
  if (t >= SUMMARY_T && showRows) {
    const pt = expo(prog(t, SUMMARY_T, 0.35));
    /** @type {Box} */
    const track = {
      x: ROW_LEFT,
      y: WY(SUM_Y),
      w: SUM_W * pt,
      d: SUM_H,
      z: 0,
      h: 0,
      top: P.s2,
      sideY: P.s2,
      sideX: P.s2,
      mark: 0,
      markInk: P.ground,
      tile: null,
      key: -1,
    };
    drawBox(f, cam, track);
  }

  if (!collapsing) boxes.push(rule);
  // Painter's order: back to front along the view direction; stable on ties.
  const depth = (/** @type {Box} */ b) => {
    const xc = b.x + b.w / 2;
    const yc = b.y + b.d / 2;
    const yr = xc * cam.s + yc * cam.c;
    return Math.round((yr * cam.cosE + (b.z + b.h / 2) * cam.sinE) * 100);
  };
  // Flat but still stacked (unstack): higher slabs on top, ties keep order.
  if (u > 0 || t >= UNSTACK_T) {
    const keys = boxes.map((b) => (u > 0 ? depth(b) : Math.round(b.z * 100)));
    for (let i = 1; i < boxes.length; i++) {
      const kb = keys[i];
      const bb = boxes[i];
      let j = i - 1;
      while (j >= 0 && keys[j] > kb) {
        keys[j + 1] = keys[j];
        boxes[j + 1] = boxes[j];
        j--;
      }
      keys[j + 1] = kb;
      boxes[j + 1] = bb;
    }
  }
  if (showRows) for (const b of boxes) drawBox(f, cam, b);

  /* -------- bar 4: row labels and the summary -------- */
  if (t >= PEEL_T && showRows) {
    ctx.fillStyle = P.ink;
    ctx.textBaseline = "alphabetic";
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r];
      const top = ROW0 + r * ROW_STEP;
      // Name (body face), wiped in from the left once the row has landed
      // (rows fill bottom-up, following the peel).
      const ready = rowReadyTime(r, n);
      const pn = expo(prog(t, ready, 0.35));
      ctx.font = `600 ${NAME_PX}px ${f.body}`;
      ctx.textAlign = "left";
      const nl = compCx + NAME_DX;
      wipeText(f, row.title, nl, top + 64, nl, nl + 560 * pn, top, top + 84);
      // Real free-plan fact (display face), wiped in from the right.
      const pf = expo(prog(t, ready + 0.08, 0.35));
      ctx.font = `800 ${FACT_PX}px ${f.display}`;
      ctx.textAlign = "right";
      const fr = compCx + ROW_RIGHT;
      wipeText(f, row.free ? "FREE PLAN" : "NO FREE PLAN", fr, top + 64, fr - 440 * pf, fr, top, top + 84);
    }
    const ps = expo(prog(t, SUMMARY_T + 0.06, 0.4));
    if (ps > 0) {
      ctx.font = `800 ${SUM_PX}px ${f.display}`;
      // Fit the line to the rows block (never wider than SUM_W).
      const natural = ctx.measureText(data.summary).width;
      const px = natural > SUM_W ? (SUM_PX * SUM_W) / natural : SUM_PX;
      if (px !== SUM_PX) ctx.font = `800 ${px.toFixed(2)}px ${f.display}`;
      ctx.textAlign = "left";
      const sl = compCx + ROW_LEFT;
      const base = SUM_Y + SUM_H + 24 + SUM_PX * 0.74;
      wipeText(f, data.summary, sl, base, sl, sl + SUM_W * ps, SUM_Y + SUM_H + 4, base + 24);
    }
  }

  if (collapsing) {
    if (showRows) ctx.restore();
    drawBox(f, cam, rule);
  }
}
