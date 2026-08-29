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
import { Plus, Star, X } from "lucide-react";
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
                    variant="gradient"
                    className="h-9 rounded-full px-5 text-xs font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Advertise
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-[800px] border-border bg-popover/90 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground text-muted-foreground hover:text-foreground z-50 cursor-pointer">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-border">
                    {/* Left: Standard */}
                    <div className="flex flex-col p-8 md:p-10 bg-foreground/5">
                        <DialogHeader>
                            <div className="mb-4 inline-flex items-center rounded-md bg-foreground/5 px-2.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border w-fit">
                                Standard
                            </div>
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
                                variant="outline"
                                className="w-full h-12 rounded-xl border-border bg-foreground/5 text-foreground hover:bg-foreground/10 hover:border-border transition-all font-medium"
                                onClick={() => startCheckout(SponsorshipPlacements.sidebarAd)}
                                disabled={!sponsorName || !sponsorUrl || !sponsorEmail}
                            >
                                Contact us
                            </Button>
                            <p className="mt-3 text-center text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                We reply within 1 business day
                            </p>
                        </div>
                    </div>

                    {/* Right: Premium */}
                    <div className="relative flex flex-col p-8 md:p-10 bg-primary/5">
                        {/* Subtle Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

                        <DialogHeader className="relative z-10">
                            <div className="mb-4 inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary ring-1 ring-inset ring-primary/20 w-fit shadow-lg shadow-primary/10">
                                ✨ Recommended
                            </div>
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
                                    "⚡️ Instant 24h Approval",
                                    "🔥 Pinned to the homepage",
                                    "💌 Newsletter feature",
                                    "🔗 Do-follow SEO Backlink",
                                    "🎨 Custom Verified Badge"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-foreground">
                                        <Star className="h-4 w-4 shrink-0 text-primary fill-primary/20" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <Button
                                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                onClick={() => startCheckout(SponsorshipPlacements.featuredSpotlight)}
                                disabled={!sponsorName || !sponsorUrl || !sponsorEmail}
                            >
                                Contact us to get featured
                            </Button>
                            <p className="mt-3 text-center text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                We reply within 1 business day
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-border bg-muted/50">
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
                    <p className="text-[10px] text-muted-foreground mt-3">
                        Sponsorships are billed monthly. Cancel anytime.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
