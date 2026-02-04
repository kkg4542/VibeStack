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
import { Plus } from "lucide-react";

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
            <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-white/10">
                <DialogHeader>
                    <DialogTitle className="text-white">Submit your Tool</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Fill out the form below to get your AI tool featured on VibeStack.
                    </DialogDescription>
                </DialogHeader>
                <div className="h-[500px] w-full mt-4 rounded-md overflow-hidden bg-white">
                    {/* Placeholder for Typeform/Tally Embed */}
                    {/* In a real scenario, use an iframe from Typeform or Tally */}
                    <iframe
                        src="https://tally.so/embed/w7Xj0y?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="Submit AI Tool"
                        className="w-full h-full"
                    ></iframe>
                </div>
            </DialogContent>
        </Dialog>
    );
}
