"use client";

import { useEffect, useState } from "react";
import { Review, getReviews } from "@/lib/reviews-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export function ReviewList({ toolSlug }: { toolSlug: string }) {
    const [reviews, setReviews] = useState<Review[]>([]);

    const loadReviews = () => {
        setReviews(getReviews(toolSlug));
    };

    useEffect(() => {
        loadReviews();

        // Listen for updates
        window.addEventListener("reviews-updated", loadReviews);
        return () => window.removeEventListener("reviews-updated", loadReviews);
    }, [toolSlug]);

    if (reviews.length === 0) {
        return (
            <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-white/5">
                <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="bg-card/50 border border-border/50 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={review.userAvatar} />
                                <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-semibold text-sm">{review.userName}</h4>
                                <div className="flex text-xs text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-current" : "text-zinc-600 fill-none"}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                        {review.content}
                    </p>
                </div>
            ))}
        </div>
    );
}
