"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Star } from "lucide-react";

export function SubmitDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    className="h-8 rounded-full bg-white/10 px-4 text-xs font-medium text-white hover:bg-white/20 shadow-none border border-white/5 gap-2"
                >
                    <Plus className="h-3.5 w-3.5" />
                    Get Featured
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] bg-zinc-950 border-white/10 p-0 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-[500px]">
                    {/* Free Tier */}
                    <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
                        <DialogHeader>
                            <DialogTitle className="text-white text-xl mb-2">Standard Listing</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Submit your tool to our directory queue.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 py-8">
                            <ul className="space-y-4 text-sm text-zinc-300">
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                                    Basic directory listing
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                                    Review time: 7-14 days
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                                    Standard visibility
                                </li>
                            </ul>
                        </div>

                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5" asChild>
                            <a href="https://tally.so/embed/w7Xj0y" target="_blank">Submit for Free</a>
                        </Button>
                    </div>

                    {/* Paid Tier */}
                    <div className="p-8 bg-indigo-500/5 relative flex flex-col">
                        <div className="absolute top-4 right-4 bg-indigo-500 text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-wider">
                            Recommended
                        </div>
                        <DialogHeader>
                            <DialogTitle className="text-white text-xl mb-2">Featured Listing</DialogTitle>
                            <DialogDescription className="text-indigo-200/70">
                                Get in front of 50k+ developers instantly.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 py-8">
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-white">$49</span>
                                <span className="text-zinc-400 text-sm ml-1">/ one-time</span>
                            </div>
                            <ul className="space-y-4 text-sm text-indigo-100/90">
                                <li className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-indigo-400 fill-indigo-400" />
                                    <span className="font-semibold text-white">Instant Approval (24h)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-indigo-400 fill-indigo-400" />
                                    <span className="font-semibold text-white">Pinned to Homepage</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-indigo-400 fill-indigo-400" />
                                    <span className="font-semibold text-white">Newsletter Mention</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-indigo-400 fill-indigo-400" />
                                    Do-follow SEO Backlinks
                                </li>
                            </ul>
                        </div>

                        <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" asChild>
                            <a href="https://buy.stripe.com/test_premium_submission" target="_blank">Get Featured Now</a>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
