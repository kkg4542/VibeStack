"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Star, X } from "lucide-react";
import { useState } from "react";
import { SponsorshipPlacements } from "@/lib/sponsorships";

export function SubmitDialog() {
    const [sponsorName, setSponsorName] = useState("");
    const [sponsorUrl, setSponsorUrl] = useState("");
    const [sponsorEmail, setSponsorEmail] = useState("");
    const [toolSlug, setToolSlug] = useState("");
    const isLoading = false;

    // Contact-based for now — opens a pre-filled email instead of self-serve
    // checkout (re-enabled once traffic justifies paid placements).
    const startCheckout = async (placement: string) => {
        const label = placement === SponsorshipPlacements.featuredSpotlight ? "Featured Listing" : "Basic Listing";
        const subject = `Advertising inquiry — ${label}`;
        const body = [
            `Plan: ${label}`,
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
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-9 px-2 text-sm font-medium text-muted-foreground hover:bg-transparent hover:text-foreground dark:hover:bg-transparent"
                >
                    Advertise
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-[800px] border-0 bg-popover p-0 overflow-hidden shadow-2xl" /* taste-skill-ignore: real dialog overlay */>
                <DialogClose className="absolute right-1 top-1 inline-flex size-11 items-center justify-center rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground text-muted-foreground hover:text-foreground z-50 cursor-pointer">
                    <X aria-hidden="true" className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Standard */}
                    <div className="flex flex-col p-8 md:p-10 bg-foreground/5">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-foreground">Basic Listing</DialogTitle>
                            <DialogDescription className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                Join the directory queue. Great for hobby projects and open source tools.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="my-8 space-y-4">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-foreground tracking-tight">Custom</span>
                                <span className="text-muted-foreground text-sm">pricing</span>
                            </div>
                            <ul className="space-y-3 pt-4">
                                {["Basic tool profile page", "Standard search visibility", "7-14 day review queue", "Community support"].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-auto">
                            <Button
                                variant="secondary"
                                className="w-full h-12 rounded-xl bg-foreground/10 text-foreground hover:bg-foreground/15 transition-colors font-medium"
                                onClick={() => startCheckout(SponsorshipPlacements.sidebarAd)}
                                disabled={!sponsorName || !sponsorUrl || !sponsorEmail}
                            >
                                Contact us
                            </Button>
                            <p className="mt-3 text-center text-[13px] text-muted-foreground">
                                We reply within 1 business day
                            </p>
                        </div>
                    </div>

                    {/* Right: Premium */}
                    <div className="relative flex flex-col p-8 md:p-10 bg-muted">

                        <DialogHeader className="relative z-10">
                            <DialogTitle className="text-2xl font-bold text-foreground">Featured Listing</DialogTitle>
                            <DialogDescription className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                Premium placement across the homepage and tool listings.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="relative z-10 my-8 space-y-4">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-foreground tracking-tight">Custom</span>
                                <span className="text-muted-foreground text-sm font-medium">pricing</span>
                            </div>
                            <ul className="space-y-3 pt-4">
                                {[
                                    "Instant 24h approval",
                                    "Pinned to the homepage",
                                    "Newsletter feature",
                                    "Do-follow SEO backlink",
                                    "Custom verified badge"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-foreground">
                                        <Star className="h-4 w-4 shrink-0 text-vibe-link" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <Button
                                className="w-full h-12 rounded-xl bg-vibe-electric hover:bg-vibe-electric/90 text-vibe-deep font-semibold transition-colors"
                                onClick={() => startCheckout(SponsorshipPlacements.featuredSpotlight)}
                                disabled={!sponsorName || !sponsorUrl || !sponsorEmail}
                            >
                                Contact us to get featured
                            </Button>
                            <p className="mt-3 text-center text-[13px] text-muted-foreground">
                                We reply within 1 business day
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-secondary">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <input
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
                            placeholder="Company name"
                            aria-label="Company name"
                            value={sponsorName}
                            onChange={(e) => setSponsorName(e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
                            placeholder="Website URL"
                            aria-label="Website URL"
                            value={sponsorUrl}
                            onChange={(e) => setSponsorUrl(e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
                            placeholder="Contact email"
                            aria-label="Contact email"
                            value={sponsorEmail}
                            onChange={(e) => setSponsorEmail(e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
                            placeholder="Tool to feature (optional)"
                            aria-label="Tool to feature (optional)"
                            value={toolSlug}
                            onChange={(e) => setToolSlug(e.target.value)}
                        />
                    </div>
                    <p className="text-[13px] text-muted-foreground mt-3">
                        Sponsorships are billed monthly. Cancel anytime.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
