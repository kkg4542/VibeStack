export interface Review {
    id: string;
    toolSlug: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    content: string;
    date: string;
}

const STORAGE_KEY = "vibestack-reviews";

export const getReviews = (toolSlug: string): Review[] => {
    if (typeof window === "undefined") return [];

    try {
        const allReviews = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as Review[];
        return allReviews.filter(r => r.toolSlug === toolSlug).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (e) {
        return [];
    }
};

export const addReview = (review: Omit<Review, "id" | "date">) => {
    if (typeof window === "undefined") return;

    const newReview: Review = {
        ...review,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
    };

    const allReviews = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as Review[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newReview, ...allReviews]));

    // Dispatch event to update components
    window.dispatchEvent(new Event("reviews-updated"));

    return newReview;
};
