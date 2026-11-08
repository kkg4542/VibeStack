import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface ReviewItemProps {
    review: {
        id: string;
        rating: number;
        content: string;
        createdAt: string;
        user: {
            name: string | null;
            image: string | null;
        };
    };
}

export function ReviewItem({ review }: ReviewItemProps) {
    return (
        <div className="bg-card p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={review.user.image || ""} />
                        <AvatarFallback>{review.user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-base font-semibold text-foreground">{review.user.name || "Anonymous"}</p>
                        <p className="text-[14px] text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="flex text-vibe-link" role="img" aria-label={`${review.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            aria-hidden="true"
                            className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-muted-foreground/40"}`}
                        />
                    ))}
                </div>
            </div>
            <p className="text-base leading-normal text-foreground">
                {review.content}
            </p>
        </div>
    );
}
