"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
// import { getReviews, Review } from "@/lib/reviews-store"; // Removed local store

interface Review {
    id: string;
    rating: number;
    content: string;
    createdAt: string;
    user: {
        name: string | null;
        image: string | null;
    };
}

export function ReviewList({ toolSlug }: { toolSlug: string }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadReviews = async () => {
        try {
            const res = await fetch(`/api/reviews?slug=${toolSlug}`);
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();

        // Listen for updates from form
        window.addEventListener("review-submitted", loadReviews);
        return () => window.removeEventListener("review-submitted", loadReviews);
    }, [toolSlug]);

    if (isLoading) {
        return <div className="text-center py-8 text-muted-foreground">Loading reviews...</div>;
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={review.user.image || ""} />
                                <AvatarFallback>{review.user.name?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium text-sm">{review.user.name || "Anonymous"}</p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-zinc-700"}`}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-sm">
                        {review.content}
                    </p>
                </div>
            ))}
        </div>
    );
}
