"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SponsorshipPlacements } from "@/lib/sponsorships";
import { toast } from "sonner";

export function SponsorshipModal() {
    const [selectedPlan, setSelectedPlan] = useState<"Standard" | "Premium">("Premium");
    const [sponsorName, setSponsorName] = useState("");
    const [sponsorUrl, setSponsorUrl] = useState("");
    const [sponsorEmail, setSponsorEmail] = useState("");
    const [toolSlug, setToolSlug] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const plans = [
        {
            name: "Standard",
            price: "$99",
            description: "Great for indie hackers & startups.",
            features: [
                "Featured in 'All Tools' List",
                "Do-Follow Backlink (SEO)",
                "Permanent Listing",
            ],
            placement: SponsorshipPlacements.sidebarAd,
            color: "blue",
            isPremium: false,
        },
        {
            name: "Premium",
            price: "$299",
            description: "Maximum visibility for serious brands.",
            features: [
                "Homepage 'Essential Tools' Spot",
                "Newsletter Mention (5k+ subs)",
                "Social Media Shoutout",
                "Priority Support",
            ],
            placement: SponsorshipPlacements.featuredSpotlight,
            color: "indigo",
            isPremium: true,
        },
    ];

    const currentPlan = plans.find(p => p.name === selectedPlan) || plans[1];

    const handleCheckout = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/sponsorships/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    placement: currentPlan.placement,
                    sponsorName,
                    sponsorUrl,
                    sponsorEmail,
                    toolSlug,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to start checkout");
            window.location.href = data.checkoutUrl;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Checkout failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hidden border-indigo-500/30 bg-indigo-500/5 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300 md:inline-flex">
                    <Rocket className="mr-2 h-3.5 w-3.5" />
                    Advertise with us
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl bg-zinc-950 border-zinc-800 p-0 overflow-hidden gap-0">
                <DialogHeader className="p-6 pb-2 text-center">
                    <DialogTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
                        <Sparkles className="h-6 w-6 text-indigo-400" />
                        Get Featured on VibeStack
                    </DialogTitle>
                    <p className="text-zinc-400 mt-2">
                        Choose the perfect plan to boost your visibility.
                    </p>
                </DialogHeader>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
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

                            {/* Visual button inside card to show 'Selected' state */}
                            <div className={cn(
                                "w-full py-2 text-center rounded-lg text-sm font-medium transition-colors",
                                selectedPlan === plan.name
                                    ? (plan.isPremium ? "bg-indigo-500/20 text-indigo-300" : "bg-blue-500/20 text-blue-300")
                                    : "bg-zinc-800 text-zinc-500"
                            )}>
                                {selectedPlan === plan.name ? "Selected" : "Select Plan"}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 bg-zinc-900/50 border-t border-zinc-800 flex flex-col items-center gap-4">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                            placeholder="Company name"
                            value={sponsorName}
                            onChange={(e) => setSponsorName(e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                            placeholder="Website URL"
                            value={sponsorUrl}
                            onChange={(e) => setSponsorUrl(e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                            placeholder="Contact email"
                            value={sponsorEmail}
                            onChange={(e) => setSponsorEmail(e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
                            placeholder="Tool slug (required)"
                            value={toolSlug}
                            onChange={(e) => setToolSlug(e.target.value)}
                        />
                    </div>
                    <Button
                        className={cn(
                            "w-full sm:min-w-[200px] font-semibold h-12 rounded-lg text-white transition-all text-lg shadow-xl",
                            currentPlan.isPremium
                                ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20"
                                : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
                        )}
                        onClick={handleCheckout}
                        disabled={isLoading || !sponsorName || !sponsorUrl || !sponsorEmail || !toolSlug}
                    >
                        {isLoading ? "Redirecting..." : `Proceed with ${currentPlan.name}`}
                    </Button>
                    <p className="text-xs text-zinc-500 flex items-center justify-center gap-2">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        Secure monthly billing via Stripe. Cancel anytime.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
