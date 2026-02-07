import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ToolCardSkeleton() {
    return (
        <Card className="h-full border-border/50">
            <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-6 w-20 rounded-full" />
            </CardContent>
        </Card>
    );
}

export function ToolDetailSkeleton() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Hero Skeleton */}
                <div className="mb-16">
                    <div className="bg-card/50 rounded-3xl p-8 md:p-12 border border-border/50">
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            <Skeleton className="h-32 w-32 rounded-3xl shrink-0" />
                            <div className="flex-1 space-y-6 w-full">
                                <div className="flex flex-wrap gap-2">
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                </div>
                                <Skeleton className="h-12 w-3/4" />
                                <Skeleton className="h-6 w-full" />
                                <div className="flex flex-wrap gap-4">
                                    <Skeleton className="h-12 w-32 rounded-full" />
                                    <Skeleton className="h-12 w-32 rounded-full" />
                                    <Skeleton className="h-12 w-32 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-border/50">
                            <CardContent className="p-8 space-y-4">
                                <Skeleton className="h-8 w-48" />
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                                        <Skeleton className="h-6 flex-1" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <Card className="border-border/50">
                                <CardContent className="p-8 space-y-4">
                                    <Skeleton className="h-8 w-24" />
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-full" />
                                    ))}
                                </CardContent>
                            </Card>
                            <Card className="border-border/50">
                                <CardContent className="p-8 space-y-4">
                                    <Skeleton className="h-8 w-24" />
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-full" />
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-border/50">
                            <CardContent className="p-6 space-y-4">
                                <Skeleton className="h-6 w-32" />
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex justify-between">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ToolGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ToolCardSkeleton key={i} />
            ))}
        </div>
    );
}
