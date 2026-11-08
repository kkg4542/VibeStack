import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/primitives/Container";

export default function BuildLoading() {
    return (
        <div className="min-h-dvh bg-background pt-32 pb-20">
            <Container size="default">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Header Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-3/4 max-w-xl rounded-none" />
                        <Skeleton className="h-6 w-1/2 max-w-md rounded-none" />
                    </div>

                    {/* Quiz Card Skeleton */}
                    <div className="bg-card p-8 lg:p-12 mt-12">
                        <div className="space-y-12">
                            {/* Progress bar */}
                            <Skeleton className="h-2 w-full rounded-none" />

                            {/* Question */}
                            <div className="space-y-4">
                                <Skeleton className="h-8 w-1/3 rounded-none" />
                                <Skeleton className="h-10 w-2/3 rounded-none" />
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Skeleton className="h-24 w-full rounded-none" />
                                <Skeleton className="h-24 w-full rounded-none" />
                                <Skeleton className="h-24 w-full rounded-none" />
                                <Skeleton className="h-24 w-full rounded-none" />
                            </div>

                            {/* Footer controls */}
                            <div className="flex justify-between mt-8 pt-8">
                                <Skeleton className="h-12 w-24 rounded-none" />
                                <Skeleton className="h-12 w-24 rounded-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
