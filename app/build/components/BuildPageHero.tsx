"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BuildPageHeroProps {
  onStartQuiz: () => void;
}

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link";
const squareButton = cn(
  "inline-flex h-14 items-center justify-center gap-2 rounded-none px-8 text-[18px] font-semibold transition-colors",
  focusRing
);

/**
 * Direction B: display-face title, flat square buttons, no badge pill, no
 * gradient text. Plain markup, so it is visible in the SSR HTML (no framer
 * opacity:0 entry state).
 */
export function BuildPageHero({ onStartQuiz }: BuildPageHeroProps) {
  return (
    <div className="py-16 md:py-24">
      <p className="mb-6 text-[16px] font-semibold text-vibe-link">AI Stack Finder</p>

      <h1 className="font-display mb-6 max-w-4xl text-[clamp(40px,6vw,96px)] leading-[0.88] text-balance text-foreground">
        Find Your Vibe Stack
      </h1>

      <p className="mb-10 max-w-2xl text-[20px] leading-normal text-muted-foreground">
        Answer a few questions and get a personalized AI tool stack curated for your workflow,
        experience level, and budget.
      </p>

      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={onStartQuiz}
          className={cn(squareButton, "group bg-vibe-electric text-vibe-deep hover:bg-[#e8401a]")}
        >
          Start Quiz
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
        </button>
        <Link href="/tools" className={cn(squareButton, "bg-secondary text-foreground hover:bg-muted")}>
          Browse All Tools
        </Link>
      </div>

      <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[16px] text-muted-foreground">
        {["Takes 2 minutes", "100% Free", "Personalized Results"].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-vibe-link" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
