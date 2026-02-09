"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { AuthDialog } from "@/components/auth/AuthDialog";

export function ReviewForm({ toolSlug }: { toolSlug: string }) {
    const { data: session } = useSession();
    const user = session?.user;

    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setIsAuthOpen(true);
            return;
        }

        if (rating === 0) {
            toast.warning("Please select a rating");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    toolSlug,
                    rating,
                    content,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to submit review");
            }

            setContent("");
            setRating(0);
            toast.success("Review submitted successfully!");

            // Dispatch event to update list
            window.dispatchEvent(new Event("review-submitted"));
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 rounded-xl bg-secondary/30 border border-border/30 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none transition-transform hover:scale-110"
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                            aria-label={`${star} star${star > 1 ? 's' : ''}`}
                            aria-pressed={rating === star}
                            role="radio"
                        >
                            <Star
                                className={`w-6 h-6 ${star <= (hoveredRating || rating)
                                    ? "fill-yellow-500 text-yellow-500"
                                    : "text-muted-foreground/40"
                                    }`}
                            />
                        </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground self-center" aria-live="polite">
                        {rating > 0 ? `${rating} stars` : "Select rating"}
                    </span>
                </div>

                <Textarea
                    placeholder="Share your experience with this tool..."
                    className="min-h-[100px] bg-secondary/50 border-border/30 focus:border-indigo-500"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting || rating === 0}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Post Review"
                        )}
                    </Button>
                </div>
            </form>

            <AuthDialog
                open={isAuthOpen}
                onOpenChange={setIsAuthOpen}
            />
        </div>
    );
}
