import { Search, GitCompare, Zap } from "lucide-react";
import { Section } from "@/components/primitives/Section";

const steps = [
    {
        icon: Search,
        title: "Explore",
        description: "Browse hand-curated AI tools across every category",
    },
    {
        icon: GitCompare,
        title: "Compare",
        description: "Compare features, pricing, and reviews side-by-side",
    },
    {
        icon: Zap,
        title: "Build",
        description: "Start building with your perfect AI stack",
    }
];

/**
 * Legacy section (not on the home page). Direction B: three flat card cells
 * on the ground, step number in the display face, plain icons, no gradients,
 * no connector lines. Plain markup, no opacity:0 entry state.
 */
export function HowItWorks() {
    return (
        <Section spacing="default" className="bg-background">
            <div className="mb-12">
                <h2 className="font-display mb-4 text-[clamp(32px,4vw,56px)] leading-[0.88] text-balance text-foreground">
                    Get started in 3 simple steps
                </h2>
                <p className="max-w-2xl text-[18px] text-muted-foreground">
                    Find and integrate the best AI tools into your workflow
                </p>
            </div>

            <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {steps.map((step, index) => (
                    <li key={step.title} className="reveal bg-card p-8">
                        <div className="mb-6 flex items-baseline justify-between">
                            <span className="font-display text-[56px] leading-[0.88] tabular-nums text-vibe-link">
                                {index + 1}
                            </span>
                            <step.icon className="h-7 w-7 text-foreground" aria-hidden="true" />
                        </div>
                        <h3 className="mb-3 text-[22px] font-semibold text-foreground">
                            {step.title}
                        </h3>
                        <p className="text-[16px] leading-relaxed text-muted-foreground">
                            {step.description}
                        </p>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
