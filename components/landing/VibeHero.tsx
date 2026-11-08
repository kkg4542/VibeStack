import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { StackPicker, type StackPick } from "@/components/landing/StackPicker";

interface VibeHeroProps {
  /** Curated stacks resolved on the server (app/page.tsx). Up to six. */
  stacks: StackPick[];
}

/**
 * Layout for "the sentence is the layout". Kept next to the markup it styles
 * (only this hero uses it); `.progress-fill` lives in app/globals.css.
 *
 * Grid: the headline spans the full width; under it the supporting sentence
 * and button, the goal list and the result block sit in three columns at lg,
 * list + result side by side at md, and one column on phones.
 *
 * The frame (.vh-frame) is an inline-block in the headline, one cap height
 * tall (0.72em, an estimate for Big Shoulders) and 1.75em wide, sitting on the
 * baseline (overflow:hidden makes its bottom edge its baseline). Its bars drop
 * in with a 130ms stagger whenever the stack changes, then bob very slightly.
 * Motion is transform/opacity only, opacity never below .35, and off under
 * prefers-reduced-motion (the bars then simply sit in place).
 */
const HERO_CSS = `
.vh-grid{display:grid;grid-template-columns:minmax(0,1fr);grid-template-areas:"head" "intro" "list" "result";row-gap:2rem}
.vh-head{grid-area:head}.vh-intro{grid-area:intro}.vh-list{grid-area:list}.vh-result{grid-area:result}
@media (min-width:768px){
  .vh-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-areas:"head head" "intro intro" "list result";column-gap:2rem;row-gap:2.5rem}
}
@media (min-width:1024px){
  .vh-grid{grid-template-columns:minmax(0,.85fr) minmax(0,1fr) minmax(0,1.15fr);grid-template-areas:"head head head" "intro list result";column-gap:3rem}
}
.vh-frame{position:relative;display:inline-block;vertical-align:baseline;width:1.75em;height:.72em;overflow:hidden;background:#222427}
.vh-bars{position:absolute;inset:.07em;display:flex;flex-direction:column-reverse;gap:.045em}
.vh-bar-bob{display:block;flex:none;height:.105em;animation:vh-bob 2.8s ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.45s)}
.vh-bar{display:block;height:100%;animation:vh-drop .6s cubic-bezier(.34,1.45,.64,1) both;animation-delay:calc(var(--i) * 130ms)}
@keyframes vh-drop{from{transform:translateY(-.9em);opacity:.35}to{transform:none;opacity:1}}
@keyframes vh-bob{from{transform:translateY(0)}to{transform:translateY(-.018em)}}
@media (prefers-reduced-motion:reduce){.vh-bar,.vh-bar-bob{animation:none}}
`;

/**
 * Homepage hero, "the sentence is the layout": a solid orange bar along the
 * top, the sentence "Pick a goal. / Get [frame] the stack." as the h1 at
 * poster scale (the frame shows the selected stack as bars), then one
 * supporting sentence and the button, the goal list, and the selected stack
 * as real text.
 *
 * Server component: everything here, including the picker's default
 * selection, is in the server HTML. The hero is always a dark surface.
 */
export function VibeHero({ stacks }: VibeHeroProps) {
  const intro = (
    <>
      <p className="max-w-[44ch] text-[17px] leading-normal text-[#b0b2b6] md:text-[18px]">
        Hand-picked AI tools grouped into stacks, with real prices and the order to set them up.
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
    </>
  );

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-vibe-deep pt-16 font-sans text-[#eff0f1]"
    >
      <style>{HERO_CSS}</style>
      {/* The signature: one solid orange bar across the top, right under the fixed nav. */}
      <div aria-hidden="true" className="h-[7px] bg-vibe-electric" />

      <Container className="pb-12 pt-8 md:pt-10">
        <StackPicker stacks={stacks}>{intro}</StackPicker>
      </Container>
    </section>
  );
}
