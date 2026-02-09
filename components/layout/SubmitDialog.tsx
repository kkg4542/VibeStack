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
import { toast } from "sonner";

export function SubmitDialog() {
    const [sponsorName, setSponsorName] = useState("");
    const [sponsorUrl, setSponsorUrl] = useState("");
    const [sponsorEmail, setSponsorEmail] = useState("");
    const [toolSlug, setToolSlug] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const startCheckout = async (placement: string) => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/sponsorships/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    placement,
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
                <Button
                    size="sm"
                    className="h-9 rounded-full bg-linear-to-r from-indigo-500 to-purple-600 px-5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 gap-2 border border-white/10"
                >
                    <Plus className="h-4 w-4" />
                    Advertise
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-[800px] border-white/10 bg-zinc-950/90 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground text-zinc-400 hover:text-white z-50 cursor-pointer">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-white/10">
                    {/* Left: Standard */}
                    <div className="flex flex-col p-8 md:p-10 bg-white/5">
                        <DialogHeader>
                            <div className="mb-4 inline-flex items-center rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-white/10 w-fit">
                                Standard
                            </div>
                            <DialogTitle className="text-2xl font-bold text-white">Basic Listing</DialogTitle>
                            <DialogDescription className="mt-2 text-sm text-zinc-400 leading-relaxed">
                                Join the directory queue. Great for hobby projects and open source tools.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="my-8 space-y-4">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white tracking-tight">$99</span>
                                <span className="text-zinc-500 text-sm">/ month</span>
                            </div>
                            <ul className="space-y-3 pt-4">
                                {["Basic tool profile page", "Standard search visibility", "7-14 day review queue", "Community support"].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                                        <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-auto">
                            <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all font-medium"
                                onClick={() => startCheckout(SponsorshipPlacements.sidebarAd)}
                                disabled={isLoading || !sponsorName || !sponsorUrl || !sponsorEmail || !toolSlug}
                            >
                                {isLoading ? "Redirecting..." : "Get Started"}
                            </Button>
                            <p className="mt-3 text-center text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
                                Monthly billing via Stripe
                            </p>
                        </div>
                    </div>

                    {/* Right: Premium */}
                    <div className="relative flex flex-col p-8 md:p-10 bg-indigo-500/5">
                        {/* Subtle Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-b from-indigo-500/5 to-transparent pointer-events-none" />

                        <DialogHeader className="relative z-10">
                            <div className="mb-4 inline-flex items-center rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-bold text-indigo-300 ring-1 ring-inset ring-indigo-500/20 w-fit shadow-lg shadow-indigo-500/10">
                                ✨ Recommended
                            </div>
                            <DialogTitle className="text-2xl font-bold text-white">Featured Listing</DialogTitle>
                            <DialogDescription className="mt-2 text-sm text-indigo-200/80 leading-relaxed">
                                Get instant approval and reach 50,000+ developers with premium placement.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="relative z-10 my-8 space-y-4">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white tracking-tight">$299</span>
                                <span className="text-indigo-200/60 text-sm font-medium">/ month</span>
                            </div>
                            <ul className="space-y-3 pt-4">
                                {[
                                    "⚡️ Instant 24h Approval",
                                    "🔥 Pinned to Homepage (High Traffic)",
                                    "💌 Newsletter Feature (5k+ Subs)",
                                    "🔗 Do-follow SEO Backlink",
                                    "🎨 Custom Verified Badge"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-white">
                                        <Star className="h-4 w-4 shrink-0 text-indigo-400 fill-indigo-400/20" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <Button
                                className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                onClick={() => startCheckout(SponsorshipPlacements.featuredSpotlight)}
                                disabled={isLoading || !sponsorName || !sponsorUrl || !sponsorEmail || !toolSlug}
                            >
                                {isLoading ? "Redirecting..." : "Get Featured Now"}
                            </Button>
                            <p className="mt-3 text-center text-[10px] text-indigo-300/40 uppercase tracking-wider font-medium">
                                Monthly billing via Stripe
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-white/10 bg-black/40">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <input
                            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                            placeholder="Company name"
                            value={sponsorName}
                            onChange={(e) => setSponsorName(e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                            placeholder="Website URL"
                            value={sponsorUrl}
                            onChange={(e) => setSponsorUrl(e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                            placeholder="Contact email"
                            value={sponsorEmail}
                            onChange={(e) => setSponsorEmail(e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                            placeholder="Tool slug (required)"
                            value={toolSlug}
                            onChange={(e) => setToolSlug(e.target.value)}
                        />
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-3">
                        Sponsorships are billed monthly. Cancel anytime.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
