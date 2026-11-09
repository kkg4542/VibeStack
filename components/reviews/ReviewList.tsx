"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
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

type LoadState = "loading" | "ready" | "error";

export function ReviewList({ toolSlug }: { toolSlug: string }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [state, setState] = useState<LoadState>("loading");

    // GET /api/reviews?toolSlug=... answers { data: Review[], timestamp } (no
    // pagination: all reviews, newest first). Errors answer { error, ... }.
    const loadReviews = useCallback(async () => {
        try {
            const res = await fetch(`/api/reviews?toolSlug=${encodeURIComponent(toolSlug)}`);
            if (!res.ok) throw new Error(`Reviews request failed with ${res.status}`);
            const json: unknown = await res.json();
            const data = (json as { data?: unknown } | null)?.data;
            if (!Array.isArray(data)) throw new Error("Unexpected reviews response");
            setReviews(data as Review[]);
            setState("ready");
        } catch (error) {
            console.error(error);
            setState("error");
        }
    }, [toolSlug]);

    const retry = () => {
        setState("loading");
        void loadReviews();
    };

    useEffect(() => {
        void loadReviews();

        // Listen for updates from form
        const onSubmitted = () => void loadReviews();
        window.addEventListener("review-submitted", onSubmitted);
        return () => window.removeEventListener("review-submitted", onSubmitted);
    }, [loadReviews]);

    if (state === "loading") {
        return (
            <div role="status" className="py-8 text-center text-base text-muted-foreground">
                Loading reviews...
            </div>
        );
    }

    if (state === "error") {
        return (
            <div role="alert" className="bg-card px-6 py-12 text-center">
                <p className="mb-6 text-base text-foreground">Could not load reviews.</p>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={retry}
                    className="h-11 rounded-none px-6 text-[16px] font-semibold"
                >
                    Try again
                </Button>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="bg-card px-6 py-12 text-center">
                <p className="text-base text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
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
