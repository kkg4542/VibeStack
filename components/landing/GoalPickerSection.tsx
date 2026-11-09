import { StackPicker, type StackPick } from "@/components/landing/StackPicker";

interface GoalPickerSectionProps {
  /** Curated stacks resolved on the server (app/page.tsx). Up to six. */
  stacks: StackPick[];
}

/**
 * The goal list and result block, directly under the full-screen hero. Same
 * StackPicker as before (first stack selected in the server HTML, links to
 * /stack/{id}, auto-advance until the visitor interacts). Same dark ground as
 * the hero and the same container and 5/7 column split, so the list sits
 * under the headline and the result under the motion stage.
 */
export function GoalPickerSection({ stacks }: GoalPickerSectionProps) {
  if (stacks.length === 0) return null;
  return (
    <section
      aria-labelledby="goal-picker-heading"
      className="bg-vibe-deep font-sans text-[#eff0f1]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 pb-16 pt-12 sm:px-6 md:pb-20 md:pt-16 lg:px-10">
        <h2
          id="goal-picker-heading"
          className="font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.005em] text-[#eff0f1]"
        >
          Your goal, your stack.
        </h2>
        <div className="mt-8 md:mt-10">
          <StackPicker stacks={stacks} />
        </div>
      </div>
    </section>
  );
}
