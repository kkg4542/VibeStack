import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SearchResultSkeleton() {
    return (
        <Card className="border-border/50">
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function SearchPageSkeleton() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container max-w-4xl mx-auto px-4">
                {/* Header Skeleton */}
                <div className="text-center mb-12 space-y-4">
                    <Skeleton className="h-8 w-32 rounded-full mx-auto" />
                    <Skeleton className="h-12 w-96 mx-auto" />
                    <Skeleton className="h-6 w-64 mx-auto" />
                </div>

                {/* Search Input Skeleton */}
                <Skeleton className="h-16 w-full max-w-2xl mx-auto rounded-2xl mb-12" />

                {/* Results Skeleton */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-5 w-10 rounded-full" />
                    </div>
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <SearchResultSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SearchResultsSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
                <SearchResultSkeleton key={i} />
            ))}
        </div>
    );
}
