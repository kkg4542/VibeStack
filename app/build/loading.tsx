import { Skeleton } from "@/components/ui/skeleton";

export default function BuildLoading() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Header Skeleton */}
                    <div className="text-center space-y-4">
                        <Skeleton className="h-12 w-3/4 max-w-xl mx-auto" />
                        <Skeleton className="h-6 w-1/2 max-w-md mx-auto" />
                    </div>

                    {/* Quiz Card Skeleton */}
                    <div className="border border-border/50 bg-secondary/10 rounded-3xl p-8 lg:p-12 mt-12">
                        <div className="space-y-12">
                            {/* Progress bar */}
                            <Skeleton className="h-2 w-full rounded-full" />
                            
                            {/* Question */}
                            <div className="space-y-4">
                                <Skeleton className="h-8 w-1/3" />
                                <Skeleton className="h-10 w-2/3" />
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Skeleton className="h-24 w-full rounded-xl" />
                                <Skeleton className="h-24 w-full rounded-xl" />
                                <Skeleton className="h-24 w-full rounded-xl" />
                                <Skeleton className="h-24 w-full rounded-xl" />
                            </div>

                            {/* Footer controls */}
                            <div className="flex justify-between mt-8 pt-8 border-t border-border/50">
                                <Skeleton className="h-10 w-24 rounded-full" />
                                <Skeleton className="h-10 w-24 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
