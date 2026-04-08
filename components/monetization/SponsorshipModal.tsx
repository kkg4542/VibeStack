"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SponsorshipPlacements } from "@/lib/sponsorships";
import { toast } from "sonner";
import { SponsorshipPlanCard } from "./SponsorshipPlanCard";

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
                        <SponsorshipPlanCard
                            key={plan.name}
                            plan={plan as any}
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan}
                        />
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
