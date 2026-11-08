"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "coding",
    name: "AI Coding",
    description: "Code faster with AI-powered IDEs and assistants",
    // Names are display-only text, but they still have to be products a
    // reader can go and find. Windsurf sat here until Cognition folded it into
    // Devin Desktop; it is retired from the directory, so the homepage should
    // not be the one place still advertising it.
    tools: ["Cursor", "GitHub Copilot", "Replit", "Bolt.new"],
  },
  {
    id: "design",
    name: "AI Design",
    description: "Create stunning visuals with generative AI",
    tools: ["Midjourney", "v0", "Framer", "Runway"],
  },
  {
    id: "assistance",
    name: "AI Assistants",
    description: "Chat assistants for writing, research and analysis",
    tools: ["ChatGPT", "Claude", "Gemini", "Perplexity"],
  },
  {
    id: "productivity",
    name: "Productivity",
    description: "Automate repetitive tasks and organize your work",
    tools: ["Notion AI"],
  },
  {
    id: "management",
    name: "Management",
    description: "Project management with AI-powered insights",
    tools: ["Linear"],
  },
  {
    id: "other",
    name: "More Tools",
    description: "Explore specialized AI tools for every need",
    tools: ["ElevenLabs", "Descript", "Vercel"],
  },
];

// Static so the delay utilities exist in the stylesheet; only the first rows stagger.
const revealDelays = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

interface ToolCategoriesProps {
  /** Real per-category tool counts from the DB, keyed by category id. */
  counts?: Record<string, number>;
}

/**
 * "Statement, table pushed right": a two-line display heading across the
 * width, then a 12-column grid with the filter and live count in columns 1-4
 * and the category table in columns 5-12 (stacked on phones).
 *
 * Every row is a real link to /categories/{id} and the whole row is the hit
 * area. Hover/focus turns the row into an orange field with dark text; that
 * is plain CSS, so it works before hydration. Each row always shows its
 * featured tools (no expanding panel, so rows never change height under the
 * pointer); the description stays in the filter's haystack.
 */
export function ToolCategories({ counts }: ToolCategoriesProps = {}) {
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLUListElement>(null);

  const needle = query.trim().toLowerCase();
  const visible = needle
    ? categories.filter((category) =>
        [category.name, category.description, ...category.tools]
          .join(" ")
          .toLowerCase()
          .includes(needle)
      )
    : categories;

  // Arrow keys move focus between the row links.
  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const links = Array.from(
      listRef.current?.querySelectorAll<HTMLAnchorElement>("a[data-category-link]") ?? []
    );
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (current === -1) return;
    event.preventDefault();
    const next = event.key === "ArrowDown" ? current + 1 : current - 1;
    links[(next + links.length) % links.length]?.focus();
  }

  return (
    <Section
      spacing="none"
      container={false}
      className="py-16 font-sans md:py-20 lg:py-24"
    >
      <Container>
        <h2 className="reveal font-display text-[clamp(3rem,7vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.005em] text-foreground">
          <span className="block whitespace-nowrap">Browse by</span>{" "}
          <span className="block whitespace-nowrap">category</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 items-start gap-x-8 gap-y-8 md:mt-[72px] md:grid-cols-12 md:grid-rows-[auto_1fr] lg:mt-24">
          {/*
            Columns 1-4: the filter, top-aligned with the first row. Its live
            count is a separate grid item placed under it from md up; on
            phones it follows the table so it is not read as an eyebrow.
          */}
          <div className="reveal md:col-span-4 md:col-start-1 md:row-start-1">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Filter categories"
              placeholder="Filter categories"
              autoComplete="off"
              className="h-12 w-full bg-secondary px-4 text-[16px] text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
            />
          </div>

          {/* Columns 5-12: the table. Rows are separated by space and tone only. */}
          <div className="md:col-span-8 md:col-start-5 md:row-start-1 md:row-span-2">
            <ul ref={listRef} onKeyDown={onKeyDown} className="flex flex-col gap-1">
              {visible.map((category, index) => {
                const count = counts?.[category.id];
                return (
                  <li
                    key={category.id}
                    className={cn(
                      "reveal group/row relative bg-card px-4 py-4 text-foreground transition-colors duration-150 motion-reduce:transition-none sm:px-5",
                      "hover:bg-vibe-electric hover:text-vibe-deep focus-within:bg-vibe-electric focus-within:text-vibe-deep",
                      revealDelays[index]
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Link
                        href={`/categories/${category.id}`}
                        data-category-link
                        className="font-display min-w-0 text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.005em] after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-vibe-deep"
                      >
                        {category.name}
                      </Link>
                      {count ? (
                        <span className="shrink-0 text-[16px] font-semibold tabular-nums">
                          {count} {count === 1 ? "tool" : "tools"}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-[16px] leading-normal text-muted-foreground group-hover/row:text-vibe-deep group-focus-within/row:text-vibe-deep">
                      {category.tools.join(", ")}
                    </p>
                  </li>
                );
              })}
            </ul>

            {visible.length === 0 ? (
              <p className="bg-card px-4 py-4 text-[16px] text-foreground sm:px-5">
                No category matches &ldquo;{query.trim()}&rdquo;.
              </p>
            ) : null}
          </div>

          <p
            aria-live="polite"
            className="reveal min-h-6 text-[16px] font-semibold tabular-nums text-muted-foreground md:col-span-4 md:col-start-1 md:row-start-2 md:-mt-5"
          >
            {needle
              ? `${visible.length} of ${categories.length} categories`
              : `${categories.length} categories`}
          </p>
        </div>
      </Container>
    </Section>
  );
}
