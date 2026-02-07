import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StackCardSkeleton() {
    return (
        <Card className="h-full border-border/50">
            <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-12 w-12 rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-20 rounded-full" />
                        </div>
                    </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
            </CardContent>
        </Card>
    );
}

export function StackDetailSkeleton() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Hero Skeleton */}
                <div className="mb-16">
                    <div className="bg-card/50 rounded-3xl p-8 md:p-12 border border-border/50">
                        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                            <div className="flex-1 space-y-6 w-full">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-16 w-16 rounded-2xl" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                        <Skeleton className="h-6 w-24 rounded-full" />
                                    </div>
                                </div>
                                <Skeleton className="h-12 w-2/3" />
                                <Skeleton className="h-6 w-full" />
                                <div className="flex flex-wrap gap-4">
                                    <Skeleton className="h-12 w-32 rounded-full" />
                                    <Skeleton className="h-12 w-32 rounded-full" />
                                </div>
                            </div>
                            <Skeleton className="h-40 w-48 rounded-2xl shrink-0" />
                        </div>
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-border/50">
                            <CardContent className="p-8 space-y-4">
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-24 w-full" />
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <Skeleton className="h-8 w-48" />
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Card key={i} className="border-border/50">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
                                        <Skeleton className="h-6 flex-1" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <StackCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-border/50">
                            <CardContent className="p-6 space-y-4">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-24 w-full rounded-xl" />
                                <Skeleton className="h-12 w-full rounded-full" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function StackGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <StackCardSkeleton key={i} />
            ))}
        </div>
    );
}
