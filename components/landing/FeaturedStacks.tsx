import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FeaturedStack } from "@/lib/data/stacks/types";
import { Container } from "@/components/primitives/Container";
import { cn } from "@/lib/utils";

// Static so the delay utilities exist in the stylesheet.
const revealDelays = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

interface FeaturedStacksProps {
  /**
   * Already resolved by resolveFeaturedStacks(): the copy is lib/stacks.ts's
   * and `stack.id` is guaranteed to be a route /stack/[stackId] prerendered,
   * so the links below cannot 404.
   */
  stacks: FeaturedStack[];
}

/**
 * "Popular stacks" as a full-width ledger: one display-size heading, then one
 * full-bleed row per stack. Rows are told apart by a step in tone (card /
 * ground, alternating), never by lines. Hover or focus turns the whole row
 * into an orange field with dark text.
 *
 * Server component: plain links in the initial HTML.
 */
export function FeaturedStacks({ stacks }: FeaturedStacksProps) {
  return (
    <section className="bg-background pb-24 pt-24 text-foreground md:pb-36 md:pt-36">
      <Container>
        <div className="reveal mb-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 md:mb-14">
          <h2 className="font-display text-[clamp(48px,7vw,112px)] text-foreground">
            Popular stacks
          </h2>
          <Link
            href="/build"
            className="group inline-flex items-center gap-1.5 text-[18px] font-semibold text-vibe-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vibe-link"
          >
            Build your own
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </Link>
        </div>
      </Container>

      <ul className="flex flex-col">
        {stacks.map((stack, index) => (
          <li key={stack.id} className={cn("reveal", revealDelays[index % revealDelays.length])}>
            <Link
              href={`/stack/${stack.id}`}
              className={cn(
                "group block hover:bg-vibe-electric focus-visible:bg-vibe-electric focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-vibe-deep",
                index % 2 === 0 ? "bg-card" : "bg-background"
              )}
            >
              <Container className="grid gap-x-8 gap-y-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_11.5rem] md:items-baseline md:py-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_16rem]">
                {/* Phones: name and price share the first line; md+: grid cells. */}
                <span className="flex items-baseline justify-between gap-4 md:contents">
                  <span className="font-display min-w-0 text-[clamp(32px,4.2vw,64px)] text-foreground group-hover:text-vibe-deep group-focus-visible:text-vibe-deep">
                    {stack.name}
                  </span>
                  <span className="font-display shrink-0 text-right text-[clamp(32px,4.2vw,64px)] tabular-nums text-vibe-link group-hover:text-vibe-deep group-focus-visible:text-vibe-deep md:order-3 md:justify-self-end">
                    {stack.totalPrice || "Free"}
                  </span>
                </span>
                <span className="text-[18px] leading-normal text-foreground group-hover:text-vibe-deep group-focus-visible:text-vibe-deep md:order-2">
                  {stack.tools.map((tool) => tool.name).join(" + ")}
                </span>
              </Container>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
