"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolData } from "@/lib/tool-types";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { cn } from "@/lib/utils";

interface PopularToolsProps {
  tools: ToolData[];
}

/** First sentence of a description, so the detail line stays one thought. */
function firstSentence(text: string) {
  const trimmed = text.trim();
  const match = trimmed.match(/^.+?[.!?](?=\s|$)/);
  return match ? match[0] : trimmed;
}

/**
 * "Names as one paragraph": the heading words and the eight tool names run
 * together as one poster paragraph in the display face, every name a real
 * link to /tool/{slug}, separated by orange commas.
 *
 * Under it, the detail line (category, pricing, one sentence) of the hovered
 * or focused tool; the first tool's by default, so the server HTML is
 * complete. All eight detail blocks are in the HTML, stacked in one grid
 * cell: the cell takes the height of the tallest, so nothing jumps when the
 * selection changes, and only the selected block is visible.
 */
export function PopularTools({ tools }: PopularToolsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const popularTools = tools
    .filter((tool: ToolData) => tool.isFeatured || tool.review)
    .slice(0, 8);

  if (popularTools.length === 0) {
    return null;
  }

  const active = Math.min(activeIndex, popularTools.length - 1);

  return (
    <Section
      spacing="none"
      container={false}
      className="py-16 font-sans md:py-20 lg:py-24"
    >
      <Container>
        <div
          className="reveal font-display text-[clamp(2rem,9vw,3.25rem)] font-extrabold uppercase leading-[1.2] tracking-[-0.005em] md:text-[clamp(2.5rem,5.6vw,5.25rem)] md:leading-[1.05]"
        >
          <h2 id="popular-tools-heading" className="inline text-foreground">
            Popular tools
          </h2>
          <span aria-hidden="true" className="text-vibe-link">
            :
          </span>{" "}
          <ul className="inline">
            {popularTools.map((tool: ToolData, index: number) => {
              const isActive = index === active;
              return (
                <li key={tool.slug} className="inline">
                  <Link
                    href={`/tool/${tool.slug}`}
                    aria-describedby={`popular-tool-detail-${tool.slug}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className={cn(
                      "box-decoration-clone py-1 text-foreground decoration-vibe-electric decoration-[0.09em] underline-offset-[0.12em] transition-colors duration-150 motion-reduce:transition-none",
                      "hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link",
                      isActive ? "md:text-foreground md:underline" : "md:text-muted-foreground"
                    )}
                  >
                    {tool.title}
                  </Link>
                  {index < popularTools.length - 1 ? (
                    <span aria-hidden="true" className="text-vibe-link">
                      ,
                    </span>
                  ) : null}{" "}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Detail line: every block is in the HTML; they share one grid cell. */}
        <div className="mt-8 grid max-w-[64ch] md:mt-10">
          {popularTools.map((tool: ToolData, index: number) => (
            <div
              key={tool.slug}
              id={`popular-tool-detail-${tool.slug}`}
              className={cn("[grid-area:1/1]", index === active ? "visible" : "invisible")}
            >
              <p className="text-[16px] font-semibold text-foreground">
                {tool.category} &middot; {tool.pricing}
              </p>
              <p className="mt-1 line-clamp-2 text-[18px] leading-normal text-muted-foreground">
                {firstSentence(tool.description)}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/tools"
          className="group mt-8 inline-flex min-h-11 items-center gap-2 text-[16px] font-semibold text-vibe-link underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vibe-link"
        >
          View all tools
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </Link>
      </Container>
    </Section>
  );
}
