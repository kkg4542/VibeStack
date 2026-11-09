import { beforeAll, describe, expect, it } from "vitest";
import {
  BPM,
  LOOP_SECONDS,
  buildSceneData,
  drawFrame,
  hasFreePlan,
  representativeTime,
  unstackPiece,
} from "@/lib/hero-motion/scene.js";
import snapshot from "@/scripts/hero-motion/snapshot.json";

type Call = [string, ...unknown[]];
type Rect = { x: number; y: number; w: number; d: number };

const DRAW_METHODS = new Set(["fillRect", "strokeRect", "fill", "stroke", "fillText", "strokeText", "drawImage"]);
const BANNED_METHODS = new Set(["createLinearGradient", "createRadialGradient", "createConicGradient", "createPattern"]);

/** A canvas 2D context stand-in that records every method call and property write. */
function recordingCtx() {
  const log: Call[] = [];
  const state: Record<string, unknown> = { font: "10px sans-serif" };
  const methods: Record<string, (...args: unknown[]) => unknown> = {
    measureText: (text: unknown) => {
      const px = Number(/(\d+(?:\.\d+)?)px/.exec(String(state.font))?.[1] ?? 10);
      // Deterministic fake metrics: narrower for I, wider for M/W.
      const str = String(text);
      let w = 0;
      for (const ch of str) w += ch === "I" ? 0.22 * px : /[MW]/.test(ch) ? 0.62 * px : 0.46 * px;
      return { width: w, actualBoundingBoxAscent: 0.72 * px };
    },
  };
  const ctx = new Proxy(
    {},
    {
      get(_target, prop: string) {
        if (prop in methods) {
          return (...args: unknown[]) => {
            log.push([prop, ...args.map(simplify)]);
            return methods[prop](...args);
          };
        }
        if (prop in state) return state[prop];
        return (...args: unknown[]) => {
          log.push([prop, ...args.map(simplify)]);
        };
      },
      set(_target, prop: string, value: unknown) {
        state[prop] = value;
        log.push([`set:${prop}`, simplify(value)]);
        return true;
      },
    },
  );
  return { ctx: ctx as unknown as CanvasRenderingContext2D, log };
}

function simplify(v: unknown) {
  if (typeof v === "number") return Math.round(v * 1e6) / 1e6;
  if (v && typeof v === "object" && "d" in v) return `path:${String((v as { d: string }).d).slice(0, 24)}`;
  return v;
}

const tools = Object.entries(snapshot.tools).map(([slug, [title, pricing, category]]) => ({
  slug,
  title,
  pricing,
  category,
}));
const data = buildSceneData(tools);
const opts = {
  width: 1920,
  height: 1080,
  fontFamily: "Big Shoulders",
  bodyFontFamily: "Public Sans",
  contrast: 1,
  anchor: 0.5,
  data,
};

function render(t: number, o: Partial<typeof opts> = {}) {
  const { ctx, log } = recordingCtx();
  drawFrame(ctx, t, { ...opts, ...o });
  return log;
}

const SAMPLES = Array.from({ length: 161 }, (_, i) => i * 0.05);

beforeAll(() => {
  // jsdom has no Path2D; a minimal stand-in keeps the brand-mark branch covered.
  (globalThis as { Path2D?: unknown }).Path2D = class {
    d: string;
    constructor(d: string) {
      this.d = d;
    }
  };
});

describe("hero motion scene data", () => {
  it("builds 8 real tiles, 4 rows and a computed free-plan summary", () => {
    expect(LOOP_SECONDS).toBe(8);
    expect(BPM).toBe(120);
    expect(data.words).toEqual(["CODING", "DESIGN", "PRODUCTIVITY", "MANAGEMENT"]);
    expect(data.tiles).toHaveLength(8);
    expect(data.tiles.slice(0, 3).map((t) => t.slug)).toEqual(["cursor", "claude", "vercel"]);
    for (const tile of data.tiles) {
      const [title, pricing] = snapshot.tools[tile.slug as keyof typeof snapshot.tools];
      expect(tile.title).toBe(title);
      expect(tile.free).toBe(hasFreePlan(pricing));
    }
    expect(data.rows).toHaveLength(4);
    const free = data.rows.filter((r) => r.free).length;
    expect(data.summary).toBe(`${free}/4 WITH A FREE PLAN`);
  });

  it("gives every tile a real mark (AiIcons or brand-marks) and real row titles", () => {
    for (const tile of data.tiles) expect(tile.mark).not.toBeNull();
    expect(data.rows.map((r) => r.title)).toEqual(["Cursor", "Claude", "Vercel", "Slack AI"]);
  });

  it("treats Free and Freemium as a free plan", () => {
    expect(hasFreePlan("Free")).toBe(true);
    expect(hasFreePlan("Freemium")).toBe(true);
    expect(hasFreePlan("Paid")).toBe(false);
    expect(hasFreePlan("Enterprise")).toBe(false);
  });
});

describe("drawFrame", () => {
  it("is deterministic", () => {
    for (const t of [0, 0.37, 1.9, 2.3, 3.2, 4.6, 5.4, representativeTime, 6.2, 6.9, 7.3, 7.8]) {
      expect(render(t)).toEqual(render(t));
    }
  });

  it("closes the loop exactly (t = 0, 8, 16, -8)", () => {
    const a = render(0);
    expect(render(8)).toEqual(a);
    expect(render(16)).toEqual(a);
    expect(render(-8)).toEqual(a);
    // The last frame of the loop is already the rest pose: same calls, the
    // only differences are sub-pixel geometry.
    const end = render(7.999);
    const draws = (log: Call[]) => log.filter((c) => DRAW_METHODS.has(c[0])).map((c) => c[0]);
    expect(draws(end)).toEqual(draws(a));
  });

  it("frame 0 is the single orange bar on the ground", () => {
    const draws = render(0).filter((c) => DRAW_METHODS.has(c[0]));
    expect(draws).toHaveLength(2); // ground + bar
    expect(render(0)).toContainEqual(["set:fillStyle", "rgb(255,74,31)"]);
  });

  it("never uses gradients, shadows, filters or non-default compositing", () => {
    for (const t of SAMPLES) {
      for (const contrast of [1, 0.35]) {
        for (const [name, value] of render(t, { contrast, anchor: 0.72 })) {
          expect(BANNED_METHODS.has(name)).toBe(false);
          expect(["set:shadowBlur", "set:shadowColor", "set:shadowOffsetX", "set:shadowOffsetY", "set:filter"]).not.toContain(name);
          if (name === "set:globalCompositeOperation") expect(value).toBe("source-over");
          if (name === "set:globalAlpha") expect(value).toBe(1);
        }
      }
    }
  });

  it("stays within the draw-call budget and draws something every frame", () => {
    let max = 0;
    for (const t of SAMPLES) {
      const n = render(t, { anchor: 0.72 }).filter((c) => DRAW_METHODS.has(c[0])).length;
      max = Math.max(max, n);
      expect(n).toBeLessThanOrEqual(400);
      expect(n).toBeGreaterThanOrEqual(2);
    }
    expect(max).toBeGreaterThan(10);
  });

  it("changes on every beat (no hold longer than half a second)", () => {
    for (let t = 0; t < 8; t += 0.25) {
      expect(render(t)).not.toEqual(render(t + 0.25));
    }
  });

  it("fits each settled bar-1 word: inside the frame at 0.5, bleeding right only at 0.72", () => {
    for (let i = 0; i < 4; i++) {
      const t = i * 0.5 + 0.48;
      for (const anchor of [0.5, 0.72]) {
        const xs = render(t, { anchor })
          .filter((c) => c[0] === "fillText" && String(c[1]).length === 1)
          .map((c) => Number(c[2]));
        expect(xs.length).toBeGreaterThan(0);
        expect(Math.min(...xs)).toBeGreaterThanOrEqual(0);
        if (anchor === 0.5) expect(Math.max(...xs)).toBeLessThan(1920);
      }
    }
  });

  it("unstacks cleanly: no moving piece overlaps another moving or landed piece (6.0-6.5 s)", () => {
    const n = data.tiles.length;
    const ids = [-1, ...Array.from({ length: n }, (_, i) => i)];
    const hit = (a: Rect, b: Rect) =>
      a.x < b.x + b.w - 0.01 && b.x < a.x + a.w - 0.01 && a.y < b.y + b.d - 0.01 && b.y < a.y + a.d - 0.01;
    for (let k = 0; k <= 60; k++) {
      const t = 6 + k / 60;
      const pieces = ids.map((i) => ({ i, ...unstackPiece(i, t, n) }));
      const moving = pieces.filter((p) => p.moving);
      const landed = pieces.filter((p) => p.p >= 1);
      for (let a = 0; a < moving.length; a++) {
        for (let b = a + 1; b < moving.length; b++) expect(hit(moving[a], moving[b]), `t=${t}`).toBe(false);
        for (const l of landed) expect(hit(moving[a], l), `t=${t}`).toBe(false);
      }
    }
    // Every piece has landed by 7.0 s (the bottom tile is already in its row
    // slot and never moves).
    for (const i of ids) {
      const end = unstackPiece(i, 7, n);
      expect(end.moving).toBe(false);
      expect(end.p === 1 || i === 0).toBe(true);
    }
  });

  it("fit 'width' on a phone canvas keeps every row label and the summary inside the canvas", () => {
    const W = 563;
    const H = 1674;
    for (const anchor of [0.5, 0.72]) {
      const log = render(7.3, { width: W, height: H, fit: "width", anchor } as Partial<typeof opts>);
      // Replay transform/align/font state to get each label's device-space x extent.
      let m = [1, 0, 0, 1, 0, 0];
      let align = "left";
      let font = "10px sans-serif";
      const labels = new Set([...data.rows.map((r) => r.title), "FREE PLAN", "NO FREE PLAN", data.summary]);
      let seen = 0;
      for (const [name, ...args] of log) {
        if (name === "setTransform") m = args as number[];
        else if (name === "set:textAlign") align = String(args[0]);
        else if (name === "set:font") font = String(args[0]);
        else if (name === "fillText" && labels.has(String(args[0]))) {
          const px = Number(/(\d+(?:\.\d+)?)px/.exec(font)?.[1]);
          let w = 0;
          for (const ch of String(args[0])) w += ch === "I" ? 0.22 * px : /[MW]/.test(ch) ? 0.62 * px : 0.46 * px;
          const x = Number(args[1]);
          const left = align === "right" ? x - w : align === "center" ? x - w / 2 : x;
          const x0 = m[0] * left + m[4];
          const x1 = m[0] * (left + w) + m[4];
          expect(x0, `${args[0]} @ anchor ${anchor}`).toBeGreaterThanOrEqual(0);
          expect(x1, `${args[0]} @ anchor ${anchor}`).toBeLessThanOrEqual(W);
          seen++;
        }
      }
      expect(seen).toBe(data.rows.length * 2 + 1);
      // The ground still fills the whole canvas.
      expect(log).toContainEqual(["fillRect", 0, 0, W, H]);
    }
  });

  it("mixes colours toward the ground at low contrast", () => {
    const low = render(5.97, { contrast: 0.3 });
    expect(low).not.toContainEqual(["set:fillStyle", "rgb(239,240,241)"]);
    expect(low).toContainEqual(["set:fillStyle", "rgb(24,25,27)"]);
  });
});
