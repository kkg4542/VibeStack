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
        <div className="p-6 rounded-xl bg-secondary/30 border border-border/30 backdrop-blur-sm">
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
                            className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-muted-foreground/30"}`}
                        />
                    ))}
                </div>
            </div>
            <p className="text-foreground/80 leading-relaxed text-sm">
                {review.content}
            </p>
        </div>
    );
}
