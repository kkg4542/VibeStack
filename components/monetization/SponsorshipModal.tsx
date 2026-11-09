"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, Sparkles } from "lucide-react";
import { useState } from "react";
import { SponsorshipPlacements } from "@/lib/sponsorships";
import { SponsorshipPlanCard } from "./SponsorshipPlanCard";

interface SponsorshipModalProps {
    /** Custom trigger element. Defaults to the compact "Advertise with us" button. */
    trigger?: React.ReactNode;
}

export function SponsorshipModal({ trigger }: SponsorshipModalProps = {}) {
    const [selectedPlan, setSelectedPlan] = useState<"Standard" | "Premium">("Premium");
    const [sponsorName, setSponsorName] = useState("");
    const [sponsorUrl, setSponsorUrl] = useState("");
    const [sponsorEmail, setSponsorEmail] = useState("");
    const [toolSlug, setToolSlug] = useState("");

    const plans = [
        {
            name: "Standard",
            price: "Custom",
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
            price: "Custom",
            description: "Maximum visibility for serious brands.",
            features: [
                "Homepage 'Essential Tools' Spot",
                "Newsletter mention",
                "Social Media Shoutout",
                "Priority Support",
            ],
            placement: SponsorshipPlacements.featuredSpotlight,
            color: "indigo",
            isPremium: true,
        },
    ];

    const currentPlan = plans.find(p => p.name === selectedPlan) || plans[1];

    // Contact-based for now (self-serve billing re-enabled once traffic
    // justifies it). Opens a pre-filled email to our inbox.
    const handleContact = () => {
        const subject = `Sponsorship inquiry — ${currentPlan.name} plan`;
        const body = [
            `Plan: ${currentPlan.name}`,
            `Company: ${sponsorName || "-"}`,
            `Website: ${sponsorUrl || "-"}`,
            `Tool to feature: ${toolSlug || "-"}`,
            "",
            "Tell us a bit about what you'd like to promote:",
        ].join("\n");
        window.location.href =
            `mailto:hello@usevibestack.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button variant="outline" size="sm" className="hidden rounded-none bg-secondary text-foreground hover:bg-accent hover:text-foreground md:inline-flex">
                        <Rocket className="mr-2 h-3.5 w-3.5" />
                        Advertise with us
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl bg-popover p-0 overflow-hidden gap-0">
                <DialogHeader className="p-6 pb-2 text-center">
                    <DialogTitle className="flex items-center justify-center gap-2 font-display text-3xl font-extrabold uppercase">
                        <Sparkles aria-hidden="true" className="h-6 w-6 text-vibe-link" />
                        Get Featured on VibeStack
                    </DialogTitle>
                    <p className="text-muted-foreground mt-2">
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

                <div className="p-6 bg-secondary flex flex-col items-center gap-4">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                            className="w-full h-11 rounded-none border border-input bg-background px-3 py-2 text-sm text-foreground"
                            placeholder="Company name"
                            aria-label="Company name"
                            value={sponsorName}
                            onChange={(e) => setSponsorName(e.target.value)}
                        />
                        <input
                            className="w-full h-11 rounded-none border border-input bg-background px-3 py-2 text-sm text-foreground"
                            placeholder="Website URL"
                            aria-label="Website URL"
                            value={sponsorUrl}
                            onChange={(e) => setSponsorUrl(e.target.value)}
                        />
                        <input
                            className="w-full h-11 rounded-none border border-input bg-background px-3 py-2 text-sm text-foreground"
                            placeholder="Contact email"
                            aria-label="Contact email"
                            value={sponsorEmail}
                            onChange={(e) => setSponsorEmail(e.target.value)}
                        />
                        <input
                            className="w-full h-11 rounded-none border border-input bg-background px-3 py-2 text-sm text-foreground"
                            placeholder="Tool to feature (optional)"
                            aria-label="Tool to feature (optional)"
                            value={toolSlug}
                            onChange={(e) => setToolSlug(e.target.value)}
                        />
                    </div>
                    <Button
                        className="w-full sm:min-w-[200px] font-semibold h-12 rounded-none text-lg"
                        onClick={handleContact}
                        disabled={!sponsorName || !sponsorUrl || !sponsorEmail}
                    >
                        {`Contact us about ${currentPlan.name}`}
                    </Button>
                    <p className="text-[13px] text-muted-foreground flex items-center justify-center gap-2">
                        <span className="flex h-1.5 w-1.5 bg-vibe-electric"></span>
                        We&apos;ll reply within 1 business day with availability &amp; next steps.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
