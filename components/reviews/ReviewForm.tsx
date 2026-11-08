"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useCsrfFetch } from "@/hooks/useCsrfFetch";

export function ReviewForm({ toolSlug }: { toolSlug: string }) {
    const { data: session } = useSession();
    const { csrfFetch } = useCsrfFetch();
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
            const res = await csrfFetch("/api/reviews", {
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
            toast.error(error instanceof Error ? error.message : "Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-card p-6">
            <h3 className="mb-4 text-[20px] font-semibold text-foreground">Write a Review</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="p-0.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none motion-reduce:hover:scale-100"
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                            aria-label={`${star} star${star > 1 ? 's' : ''}`}
                            aria-checked={rating === star}
                            role="radio"
                        >
                            <Star
                                className={`w-6 h-6 ${star <= (hoveredRating || rating)
                                    ? "fill-current text-vibe-link"
                                    : "text-muted-foreground/40"
                                    }`}
                            />
                        </button>
                    ))}
                    <span className="ml-2 self-center text-[15px] text-muted-foreground" aria-live="polite">
                        {rating > 0 ? `${rating} stars` : "Select rating"}
                    </span>
                </div>

                <Textarea
                    placeholder="Share your experience with this tool..."
                    aria-label="Review"
                    className="min-h-[100px] rounded-none bg-background text-base focus-visible:border-vibe-link"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting || rating === 0} className="h-11 rounded-none px-6 text-[16px] font-semibold">
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
