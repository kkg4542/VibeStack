import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import type { StackPick } from "@/components/landing/StackPicker";
import { HeroMotionBackground, type HeroMotionTool } from "@/components/landing/HeroMotionBackground";

interface VibeHeroProps {
  /** Curated stacks resolved on the server (app/page.tsx). The first one fills the h1 frame. */
  stacks: StackPick[];
  /** Minimal tool records (slug, title, pricing, category) for the motion graphic. */
  tools: HeroMotionTool[];
}

/**
 * Layout for the full-screen "film title" hero. Kept next to the markup it
 * styles (only this hero uses it).
 *
 * .vh-screen fills the first screen under the fixed 64px nav, capped at 980px
 * on very tall screens. .vh-stage is the empty 16:9 box the motion graphic is
 * fitted into: the full column width, and at lg also no taller than the
 * screen minus the 7px bar and the layout's 2 x 3rem padding.
 *
 * The frame (.vh-frame) is an inline-block in the headline, one cap height
 * tall (0.72em, an estimate for Big Shoulders) and 1.75em wide, sitting on the
 * baseline (overflow:hidden makes its bottom edge its baseline). Its bars drop
 * in once with a 130ms stagger, then bob very slightly. Motion is
 * transform/opacity only, opacity never below .35, and off under
 * prefers-reduced-motion (the bars then simply sit in place).
 */
const HERO_CSS = `
.vh-screen{min-height:min(calc(100svh - 64px),980px)}
.vh-stage{width:100%;aspect-ratio:16/9}
@media (min-width:1024px){.vh-stage{width:min(100%,calc((min(100svh - 64px,980px) - 7px - 6rem) * 16 / 9))}}
.vh-frame{position:relative;display:inline-block;vertical-align:baseline;width:1.75em;height:.72em;overflow:hidden;background:#222427}
.vh-bars{position:absolute;inset:.07em;display:flex;flex-direction:column-reverse;gap:.045em}
.vh-bar-bob{display:block;flex:none;height:.105em;animation:vh-bob 2.8s ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.45s)}
.vh-bar{display:block;height:100%;animation:vh-drop .6s cubic-bezier(.34,1.45,.64,1) both;animation-delay:calc(var(--i) * 130ms)}
@keyframes vh-drop{from{transform:translateY(-.9em);opacity:.35}to{transform:none;opacity:1}}
@keyframes vh-bob{from{transform:translateY(0)}to{transform:translateY(-.018em)}}
@media (prefers-reduced-motion:reduce){.vh-bar,.vh-bar-bob{animation:none}}
`;

/** Bar colours in the headline frame, bottom to top: accent, ink, then greys. */
const BAR_COLOURS = ["var(--color-vibe-electric)", "#eff0f1", "#5a5c61", "#74767b"];
const MAX_BARS = 4;

/**
 * The h1: "Pick a goal. / Get [frame] the stack." The frame sits on the
 * baseline where a word would be and holds one flat bar per tool of the
 * default (first) stack. It is decorative (aria-hidden, no text), so the
 * heading's text is exactly "Pick a goal. Get the stack."
 *
 * Sized to its column with container units: the longer line ("GET [frame]
 * THE STACK.") measures about 7.7em in Big Shoulders 800, so 12cqi keeps it
 * inside the column with a small margin, always on exactly two lines.
 */
function HeroHeadline({ tools = [] }: { tools?: string[] }) {
  const bars = tools.slice(0, MAX_BARS);
  return (
    <h1
      id="hero-heading"
      className="font-display text-[clamp(2rem,12cqi,8rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.005em] text-[#eff0f1]"
    >
      <span className="block whitespace-nowrap">Pick a goal.</span>{" "}
      <span className="block whitespace-nowrap">
        Get{" "}
        <span aria-hidden="true" className="vh-frame">
          <span className="vh-bars">
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
 * Homepage hero, full-screen "film title": a solid orange bar along the top,
 * then two zones at lg (one column below it). Left, about 5/12: the h1, one
 * supporting sentence and the button. Right, about 7/12: the stage, an empty
 * 16:9 box (data-hero-stage) that HeroMotionBackground measures and plays the
 * lib/hero-motion scene inside, at full contrast. No text overlaps the stage.
 * The goal list and result block live in GoalPickerSection, right below.
 *
 * Server component: all text is in the server HTML; the canvas is a client
 * island behind everything (aria-hidden). No framer-motion here. The hero is
 * always a dark surface.
 */
export function VibeHero({ stacks, tools }: VibeHeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-vibe-deep pt-16 font-sans text-[#eff0f1]"
    >
      {/* Full-bleed canvas; the scene itself is drawn inside the stage box. */}
      <HeroMotionBackground tools={tools} />
      <style>{HERO_CSS}</style>

      <div className="vh-screen relative z-10 flex flex-col">
        {/* The signature: one solid orange bar across the top, right under the fixed nav. */}
        <div aria-hidden="true" className="h-[7px] bg-vibe-electric" />

        <div
          data-hero-layout
          className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 content-center gap-y-10 px-4 py-10 sm:px-6 md:py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-x-12 lg:px-10"
        >
          <div className="@container">
            <HeroHeadline tools={stacks[0]?.tools} />
            <p className="mt-6 max-w-[44ch] text-[17px] leading-normal text-[#b0b2b6] md:text-[18px]">
              Hand-picked AI tools grouped into stacks, with the order to set them up.
              Free to browse.
            </p>
            <Link
              id="hero-cta-build"
              href="/build"
              className="group mt-6 inline-flex h-12 items-center gap-2 bg-vibe-electric px-6 text-[16px] font-semibold text-vibe-deep transition-transform duration-150 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#eff0f1] motion-reduce:transition-none motion-reduce:active:translate-y-0"
            >
              Find my stack
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <div data-hero-stage aria-hidden="true" className="vh-stage" />
          </div>
        </div>
      </div>
    </section>
  );
}
