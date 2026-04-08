import { Skeleton } from "@/components/ui/skeleton";

export default function ToolLoading() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            {/* Header Skeleton */}
            <div className="border-b border-border/50 bg-secondary/20">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <Skeleton className="w-[120px] h-[120px] rounded-2xl shrink-0" />
                        <div className="flex-1 space-y-4">
                            <Skeleton className="h-10 w-3/4 max-w-sm" />
                            <Skeleton className="h-6 w-full max-w-2xl" />
                            <div className="flex gap-4">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-[300px] w-full rounded-xl" />
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </main>
    );
}
