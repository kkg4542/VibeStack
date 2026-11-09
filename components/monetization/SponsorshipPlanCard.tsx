import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface Plan {
    name: string;
    price: string;
    description: string;
    features: string[];
    placement: string;
    color: string;
    isPremium: boolean;
}

interface SponsorshipPlanCardProps {
    plan: Plan;
    selectedPlan: string;
    setSelectedPlan: (plan: "Standard" | "Premium") => void;
}

export function SponsorshipPlanCard({ plan, selectedPlan, setSelectedPlan }: SponsorshipPlanCardProps) {
    const isSelected = selectedPlan === plan.name;

    return (
        <div
            onClick={() => setSelectedPlan(plan.name as "Standard" | "Premium")}
            className={cn(
                "relative flex flex-col p-6 cursor-pointer transition-colors duration-200",
                isSelected
                    ? "bg-accent outline-2 -outline-offset-2 outline-vibe-electric"
                    : "bg-secondary hover:bg-accent"
            )}
        >
            {plan.isPremium && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-vibe-electric text-vibe-deep text-[13px] font-bold px-3 py-1 uppercase tracking-wider">
                    Most Popular
                </div>
            )}

            <div className="flex items-center justify-between mb-2">
                <span className="text-base font-semibold text-vibe-link">
                    {plan.name}
                </span>
                {isSelected && <Check className="h-5 w-5 text-vibe-link" />}
            </div>

            <div className="mb-4">
                <div className="font-display text-5xl font-extrabold uppercase leading-none text-foreground">
                    {plan.price}
                    {plan.price !== "Custom" && (
                        <span className="font-sans text-sm font-normal normal-case text-muted-foreground ml-1">/mo</span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground mt-2 min-h-[40px]">
                    {plan.description}
                </p>
            </div>

            <div className="flex-1">
                <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-vibe-link" />
                            <span className="leading-tight">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={cn(
                "w-full py-2 text-center text-sm font-medium transition-colors",
                isSelected
                    ? "bg-vibe-electric text-vibe-deep"
                    : "bg-background text-muted-foreground"
            )}>
                {isSelected ? "Selected" : "Select Plan"}
            </div>
        </div>
    );
}
