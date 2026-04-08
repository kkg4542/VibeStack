"use client";

import { useEffect, useState, useCallback } from "react";
// import { getReviews, Review } from "@/lib/reviews-store"; // Removed local store
import { ReviewItem } from "./ReviewItem";

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

    const loadReviews = useCallback(async () => {
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
    }, [toolSlug]);

    useEffect(() => {
        loadReviews();

        // Listen for updates from form
        window.addEventListener("review-submitted", loadReviews);
        return () => window.removeEventListener("review-submitted", loadReviews);
    }, [loadReviews]);

    if (isLoading) {
        return <div className="text-center py-8 text-muted-foreground">Loading reviews...</div>;
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-secondary/30 rounded-xl border border-border/30">
                <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
            ))}
        </div>
    );
}
