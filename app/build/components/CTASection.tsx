"use client";

import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  onStartQuiz: () => void;
}

/**
 * Direction B: the closing call to action is an inverse field (ink ground,
 * graphite text) with one orange button. No gradient, no glow.
 */
export function CTASection({ onStartQuiz }: CTASectionProps) {
  return (
    <div className="pb-16">
      <div className="bg-foreground p-8 text-background md:p-12">
        <h2 className="font-display mb-4 text-[clamp(32px,4vw,56px)] leading-[0.88] text-balance">
          Ready to find your stack?
        </h2>
        <p className="mb-8 max-w-xl text-[18px] leading-normal opacity-80">
          Take our 2-minute quiz and discover the perfect combination of AI tools for your workflow.
        </p>
        <button
          type="button"
          onClick={onStartQuiz}
          className="group inline-flex h-14 items-center justify-center gap-2 rounded-none bg-vibe-electric px-8 text-[18px] font-semibold text-vibe-deep transition-colors hover:bg-[#e8401a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-electric"
        >
          Start Quiz
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
        </button>
      </div>
    </div>
  );
}
