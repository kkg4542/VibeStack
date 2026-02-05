"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Assuming generic textarea or use input? I'll check.
import { useAuth } from "@/context/auth-context";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { addReview } from "@/lib/reviews-store";
import { Star } from "lucide-react";

export function ReviewForm({ toolSlug }: { toolSlug: string }) {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setIsAuthOpen(true);
            return;
        }

        if (rating === 0) return;

        addReview({
            toolSlug,
            userId: user.id,
            userName: user.name,
            userAvatar: user.avatar,
            rating,
            content,
        });

        // Reset
        setRating(0);
        setContent("");
        alert("Review submitted successfully!");
    };

    if (!user) {
        return (
            <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">Have you used this tool?</h3>
                <p className="text-muted-foreground mb-6 text-sm">Sign in to share your experience with the community.</p>
                <AuthDialog
                    open={isAuthOpen}
                    onOpenChange={setIsAuthOpen}
                    trigger={
                        <Button>Write a Review</Button>
                    }
                />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Write a Verified Review</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Rating</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >
                            <Star
                                className={`h-6 w-6 transition-colors ${star <= (hoverRating || rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-zinc-600"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Your Review</label>
                <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="What did you like or dislike?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>

            <Button type="submit" disabled={rating === 0 || !content.trim()}>
                Submit Review
            </Button>
        </form>
    );
}
