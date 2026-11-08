import { Skeleton } from "@/components/ui/skeleton";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";

export default function ToolLoading() {
    return (
        <div className="min-h-dvh bg-background pt-32 pb-20">
            {/* Header Skeleton */}
            <Section spacing="default" container={false} className="bg-card">
                <Container size="default">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <Skeleton className="w-[120px] h-[120px] shrink-0 bg-background" />
                        <div className="flex-1 space-y-4">
                            <Skeleton className="h-10 w-3/4 max-w-sm bg-background" />
                            <Skeleton className="h-6 w-full max-w-2xl bg-background" />
                            <div className="flex gap-4">
                                <Skeleton className="h-6 w-24 bg-background" />
                                <Skeleton className="h-6 w-24 bg-background" />
                                <Skeleton className="h-6 w-24 bg-background" />
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Content Skeleton */}
            <Section spacing="default" containerSize="default">
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
                        <Skeleton className="h-[300px] w-full" />
                        <Skeleton className="h-[200px] w-full" />
                    </div>
                </div>
            </Section>
        </div>
    );
}
