import Link from "next/link";

/**
 * Closing choice, "question at both edges": a flat orange field, the question
 * in two centred lines (line one near the top edge, line two near the bottom),
 * and between them one row holding two solid buttons with "or" on the axis.
 *
 * Static markup, fully visible in the SSR HTML, no motion. Dark text on orange.
 *
 * Size arithmetic, measured with Big Shoulders 800 caps: "NOT SURE WHERE" is
 * 6.47em wide (the estimate of 5.7em wrapped it to two lines at 390). On phones
 * the type is 13.5vw (53px at 390: 343px of 358px available; 86px at 639: 558px
 * of 591px). From md it is the brief's clamp(64px, 11vw, 168px) (84px at 768:
 * 544px of 720px; 158px at 1440: 1023px of 1376px; capped at 168px: 1087px).
 *
 * The h2 is one heading whose middle is an empty spacer; the button row is
 * centred on the field over that spacer. The spacer's min-height keeps the
 * lines clear of the buttons on short screens.
 */
export function CTASection() {
  const button =
    "inline-flex h-14 w-[72%] items-center justify-center px-6 text-[18px] font-semibold transition-transform duration-150 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-deep motion-reduce:transition-none motion-reduce:active:translate-y-0 md:w-[200px]";

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative bg-vibe-electric font-sans text-vibe-deep"
    >
      <div className="relative mx-auto flex min-h-[60svh] w-full max-w-[1600px] px-4 sm:px-6 md:min-h-[80svh] lg:px-8">
        <h2
          id="cta-heading"
          className="font-display flex w-full flex-col items-center justify-between py-8 text-center text-[13.5vw] font-extrabold uppercase leading-[0.88] tracking-[-0.005em] md:py-12 md:text-[clamp(64px,11vw,168px)]"
        >
          <span className="block">Not sure where</span>
          <span aria-hidden="true" className="block min-h-[190px] md:min-h-[80px]" />
          <span className="block">to start?</span>
        </h2>

        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3 md:flex-row md:justify-center md:gap-0">
          <Link href="/build" className={`${button} bg-vibe-deep text-white`}>
            Find your stack
          </Link>
          <span className="text-[18px] md:w-[240px] md:text-center">or</span>
          <Link href="/tools" className={`${button} bg-[#eff0f1] text-vibe-deep`}>
            Browse all tools
          </Link>
        </div>
      </div>
    </section>
  );
}
