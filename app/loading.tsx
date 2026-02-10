import { VibeSkeleton, SkeletonGroup, GridSkeleton } from "@/components/skeletons/VibeSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar Skeleton */}
      <div className="border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <VibeSkeleton variant="text" className="h-8 w-32" />
          <div className="flex gap-4">
            <VibeSkeleton variant="text" className="h-8 w-20" />
            <VibeSkeleton variant="text" className="h-8 w-20" />
            <VibeSkeleton variant="text" className="h-8 w-20" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <VibeSkeleton variant="text" className="h-12 w-3/4 mx-auto" />
          <VibeSkeleton variant="text" className="h-6 w-1/2 mx-auto" />
          <VibeSkeleton variant="card" className="h-12 w-48 mx-auto mt-8" />
        </div>

        {/* Tools Grid */}
        <GridSkeleton count={6} columns={3} />
      </main>
    </div>
  );
}
