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
    return (
        <div
            onClick={() => setSelectedPlan(plan.name as "Standard" | "Premium")}
            className={cn(
                "relative flex flex-col rounded-xl border p-6 transition-all duration-200 cursor-pointer",
                selectedPlan === plan.name
                    ? (plan.isPremium
                        ? "bg-indigo-500/10 border-indigo-500/50 ring-1 ring-indigo-500/50"
                        : "bg-blue-500/5 border-blue-500/50 ring-1 ring-blue-500/50")
                    : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 opacity-70 hover:opacity-100"
            )}
        >
            {plan.isPremium && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Most Popular
                </div>
            )}

            <div className="flex items-center justify-between mb-2">
                <span className={cn(
                    "text-base font-semibold",
                    plan.isPremium ? "text-indigo-400" : "text-blue-400"
                )}>
                    {plan.name}
                </span>
                {selectedPlan === plan.name && <Check className={cn("h-5 w-5", plan.isPremium ? "text-indigo-500" : "text-blue-500")} />}
            </div>

            <div className="mb-4">
                <div className="text-4xl font-bold text-white">
                    {plan.price}
                    <span className="text-sm font-normal text-zinc-500 ml-1">/mo</span>
                </div>
                <p className="text-sm text-zinc-400 mt-2 min-h-[40px]">
                    {plan.description}
                </p>
            </div>

            <div className="flex-1">
                <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                            <div className={cn(
                                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                                plan.isPremium ? "bg-indigo-500/20" : "bg-blue-500/20"
                            )}>
                                <Check className={cn(
                                    "h-2.5 w-2.5",
                                    plan.isPremium ? "text-indigo-400" : "text-blue-400"
                                )} />
                            </div>
                            <span className="leading-tight">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={cn(
                "w-full py-2 text-center rounded-lg text-sm font-medium transition-colors",
                selectedPlan === plan.name
                    ? (plan.isPremium ? "bg-indigo-500/20 text-indigo-300" : "bg-blue-500/20 text-blue-300")
                    : "bg-zinc-800 text-zinc-500"
            )}>
                {selectedPlan === plan.name ? "Selected" : "Select Plan"}
            </div>
        </div>
    );
}
