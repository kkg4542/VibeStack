"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

/**
 * One curated stack, already resolved on the server: tool names come from the
 * live directory (retired tools dropped), the goal label is the stack's first
 * `idealFor` entry in lib/stacks.ts, and `steps` is its `workflow` with the
 * leading "1. " numbering removed (the list renders its own numbers).
 * `toolSlugs` (optional, same order as `tools`) is kept for callers; the
 * hero no longer draws tool icons.
 */
export interface StackPick {
  id: string;
  name: string;
  goal: string;
  tools: string[];
  toolSlugs?: string[];
  price: string;
  steps: string[];
}

interface StackPickerProps {
  stacks: StackPick[];
  /** Server-rendered supporting sentence and button (under the headline, left). */
  children?: ReactNode;
}

/** Auto-advance interval; matches `--cycle` on the progress bar. */
const CYCLE_MS = 4000;
/** Bar colours in the headline frame, bottom to top: accent, ink, then greys. */
const BAR_COLOURS = ["var(--color-vibe-electric)", "#eff0f1", "#5a5c61", "#74767b"];
const MAX_BARS = 4;

// --- media/visibility as external stores (server snapshot = "no autoplay") ---
function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getMotionAllowed = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}
const getVisible = () => document.visibilityState === "visible";
const getServerFalse = () => false;

/**
 * The hero's h1: "Pick a goal. / Get [frame] the stack." The frame sits on
 * the baseline where a word would be and holds one flat bar per tool of the
 * selected stack; the bars drop in again whenever `stackId` changes. The
 * frame is decorative (aria-hidden, no text), so the heading's text is
 * exactly "Pick a goal. Get the stack." Styles live in VibeHero's HERO_CSS.
 */
export function HeroHeadline({ stackId, tools = [] }: { stackId?: string; tools?: string[] }) {
  const bars = tools.slice(0, MAX_BARS);
  return (
    <h1
      id="hero-heading"
      className="font-display text-[clamp(2rem,11vw,8rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.005em] text-[#eff0f1]"
    >
      <span className="block whitespace-nowrap">Pick a goal.</span>{" "}
      <span className="block whitespace-nowrap">
        Get{" "}
        <span aria-hidden="true" className="vh-frame">
          <span key={stackId ?? "none"} className="vh-bars">
            {bars.map((tool, index) => (
              <span key={`${tool}-${index}`} className="vh-bar-bob" style={{ "--i": index } as CSSProperties}>
                <span className="vh-bar" style={{ background: BAR_COLOURS[index % BAR_COLOURS.length] }} />
              </span>
            ))}
          </span>
        </span>{" "}
        the stack.
      </span>
    </h1>
  );
}

/**
 * The hero's working piece: pick a goal in the list and the frame inside the
 * headline rebuilds that stack as bars, while the result block shows the same
 * stack as real text (name, tools, price, first setup steps, link).
 *
 * Every goal is a real `<a href="/stack/{id}">`, so with no JavaScript (or a
 * middle/modified click) it simply opens that stack's page, and crawlers see
 * the links. With JavaScript, a plain click only changes the selection.
 * The first stack is selected in the server HTML, so the result is complete
 * before hydration and hydration renders the same thing.
 *
 * After hydration the goals advance every 4s until the visitor hovers,
 * focuses, clicks or types in the list or result (then never again). Never
 * under prefers-reduced-motion or while the tab is hidden.
 */
export function StackPicker({ stacks, children }: StackPickerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // The result text only animates after the selection changes, never on load.
  const [hasChanged, setHasChanged] = useState(false);
  const [paused, setPaused] = useState(false);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const motionAllowed = useSyncExternalStore(subscribeReducedMotion, getMotionAllowed, getServerFalse);
  const visible = useSyncExternalStore(subscribeVisibility, getVisible, getServerFalse);
  const autoplay = !paused && motionAllowed && visible && stacks.length > 1;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => {
      setSelectedIndex((index) => (index + 1) % stacks.length);
      setHasChanged(true);
    }, CYCLE_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, selectedIndex, stacks.length]);

  if (stacks.length === 0) {
    return (
      <div className="vh-grid">
        <div className="vh-head">
          <HeroHeadline />
        </div>
        <div className="vh-intro">{children}</div>
      </div>
    );
  }

  const selected = stacks[selectedIndex] ?? stacks[0];

  const pause = () => {
    if (!paused) setPaused(true);
  };

  const select = (index: number) => {
    setSelectedIndex(index);
    setHasChanged(true);
    setPaused(true);
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    // Let the browser follow the link for modified clicks (new tab/window) and
    // for keyboard activation (Enter fires a click with detail === 0).
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.detail === 0
    ) {
      return;
    }
    event.preventDefault();
    select(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    let next: number | null = null;
    if (event.key === "ArrowDown") next = (index + 1) % stacks.length;
    else if (event.key === "ArrowUp") next = (index - 1 + stacks.length) % stacks.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stacks.length - 1;
    if (next === null) return;
    event.preventDefault();
    select(next);
    linkRefs.current[next]?.focus();
  };

  const pauseHandlers = {
    onPointerEnter: pause,
    onPointerDown: pause,
    onFocus: pause,
    onKeyDown: pause,
  };

  return (
    <div data-paused={paused ? "" : undefined} className="vh-grid">
      <div className="vh-head">
        <HeroHeadline stackId={selected.id} tools={selected.tools} />
      </div>

      <div className="vh-intro">{children}</div>

      <ul aria-label="Goals" className="vh-list flex flex-col gap-1" {...pauseHandlers}>
        {stacks.map((stack, index) => {
          const isSelected = index === selectedIndex;
          return (
            <li key={stack.id}>
              <a
                ref={(node) => {
                  linkRefs.current[index] = node;
                }}
                href={`/stack/${stack.id}`}
                tabIndex={isSelected ? 0 : -1}
                aria-current={isSelected ? "true" : undefined}
                onClick={(event) => handleClick(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={
                  "font-display relative block overflow-hidden px-4 py-2.5 text-[26px] font-extrabold uppercase leading-none tracking-[-0.005em] " +
                  "focus-visible:outline-2 focus-visible:-outline-offset-2 " +
                  (isSelected
                    ? "bg-vibe-electric text-vibe-deep focus-visible:outline-vibe-deep"
                    : "text-[#eff0f1] hover:bg-[#222427] focus-visible:outline-[#eff0f1]")
                }
              >
                {stack.goal}
                {isSelected && autoplay && (
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-vibe-deep/20">
                    <span
                      key={selectedIndex}
                      className="progress-fill block h-full bg-vibe-deep"
                      style={{ "--cycle": `${CYCLE_MS / 1000}s` } as CSSProperties}
                    />
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>

      {/*
        Fixed minimum height: every line below is clamped (name 1 line, tools
        2, each step 2, at most 3 steps), so the worst case (~339px) fits in
        22rem and the hero never changes height when the selection changes.
      */}
      <div
        data-ui
        aria-live={autoplay ? "off" : "polite"}
        className="vh-result min-h-[22rem] bg-[#222427] p-5 md:p-6"
        {...pauseHandlers}
      >
        <div
          key={selected.id}
          className={
            hasChanged
              ? "transition-[opacity,transform] duration-200 ease-out starting:translate-y-1 starting:opacity-35 motion-reduce:transition-none"
              : undefined
          }
        >
          <p className="font-display truncate text-[28px] font-extrabold uppercase leading-none tracking-[-0.005em] text-[#eff0f1]">
            {selected.name}
          </p>
          <p className="mt-2 line-clamp-2 text-[18px] font-semibold leading-[1.35] text-[#eff0f1]">
            {selected.tools.join(" + ")}
          </p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
            <p className="font-display text-[28px] font-extrabold leading-none tracking-[-0.005em] text-[#eff0f1]">
              {selected.price}
            </p>
            <a
              href={`/stack/${selected.id}`}
              className="text-[16px] font-semibold text-vibe-electric underline decoration-2 underline-offset-4 transition-colors hover:text-[#eff0f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#eff0f1] motion-reduce:transition-none"
            >
              Open this stack<span className="sr-only">: {selected.name}</span>
            </a>
          </div>
          {selected.steps.length > 0 && (
            <ol
              aria-label={`How to set up ${selected.name}`}
              className="mt-4 list-decimal space-y-2 pl-5 text-[16px] leading-[1.4] text-[#eff0f1] marker:font-semibold marker:text-[#b0b2b6]"
            >
              {selected.steps.slice(0, 3).map((step) => (
                <li key={step}>
                  <span className="line-clamp-2">{step}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
