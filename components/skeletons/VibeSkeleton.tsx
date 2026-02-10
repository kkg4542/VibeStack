import { cn } from "@/lib/utils";

interface VibeSkeletonProps {
  className?: string;
  variant?: "default" | "card" | "circle" | "text" | "avatar";
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export function VibeSkeleton({
  className,
  variant = "default",
  width,
  height,
  animate = true,
}: VibeSkeletonProps) {
  const variantClasses = {
    default: "rounded-lg",
    card: "rounded-xl",
    circle: "rounded-full",
    text: "rounded-md",
    avatar: "rounded-full",
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={cn(
        "bg-muted/50 relative overflow-hidden",
        variantClasses[variant],
        animate && "skeleton-shimmer",
        className
      )}
      style={style}
    >
      {animate && (
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
    </div>
  );
}

interface SkeletonGroupProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}

export function SkeletonGroup({ children, className, gap = 4 }: SkeletonGroupProps) {
  return (
    <div
      className={cn("flex flex-col", className)}
      style={{ gap: `${gap * 0.25}rem` }}
    >
      {children}
    </div>
  );
}

// Pre-built skeleton patterns
export function ToolCardSkeleton() {
  return (
    <div className="h-full rounded-xl border border-border/50 bg-card p-6 space-y-4">
      <div className="flex items-start justify-between">
        <VibeSkeleton variant="card" className="h-12 w-12" />
        <VibeSkeleton variant="circle" className="h-5 w-5" />
      </div>
      <SkeletonGroup gap={2}>
        <VibeSkeleton variant="text" className="h-6 w-3/4" />
        <VibeSkeleton variant="text" className="h-4 w-1/2" />
      </SkeletonGroup>
      <VibeSkeleton variant="text" className="h-4 w-full" />
      <VibeSkeleton variant="text" className="h-4 w-2/3" />
      <VibeSkeleton variant="circle" className="h-6 w-20" />
    </div>
  );
}

export function StackCardSkeleton() {
  return (
    <div className="h-full rounded-xl border border-border/50 bg-card overflow-hidden">
      <VibeSkeleton variant="default" className="h-40 w-full" />
      <div className="p-6 space-y-4">
        <SkeletonGroup gap={2}>
          <VibeSkeleton variant="text" className="h-6 w-3/4" />
          <VibeSkeleton variant="text" className="h-4 w-full" />
        </SkeletonGroup>
        <div className="flex gap-2">
          <VibeSkeleton variant="circle" className="h-6 w-16" />
          <VibeSkeleton variant="circle" className="h-6 w-16" />
          <VibeSkeleton variant="circle" className="h-6 w-16" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex -space-x-2">
            <VibeSkeleton variant="avatar" className="h-8 w-8 border-2 border-background" />
            <VibeSkeleton variant="avatar" className="h-8 w-8 border-2 border-background" />
            <VibeSkeleton variant="avatar" className="h-8 w-8 border-2 border-background" />
          </div>
          <VibeSkeleton variant="text" className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 space-y-4">
      <div className="flex items-start justify-between">
        <VibeSkeleton variant="card" className="h-12 w-12" />
        <VibeSkeleton variant="circle" className="h-6 w-16" />
      </div>
      <SkeletonGroup gap={2}>
        <VibeSkeleton variant="text" className="h-6 w-1/2" />
        <VibeSkeleton variant="text" className="h-4 w-full" />
      </SkeletonGroup>
      <div className="flex flex-wrap gap-2 pt-2">
        <VibeSkeleton variant="circle" className="h-6 w-16" />
        <VibeSkeleton variant="circle" className="h-6 w-20" />
        <VibeSkeleton variant="circle" className="h-6 w-14" />
        <VibeSkeleton variant="circle" className="h-6 w-18" />
      </div>
      <VibeSkeleton variant="text" className="h-4 w-32" />
    </div>
  );
}

export function GridSkeleton({ 
  count = 6, 
  columns = 3,
  children 
}: { 
  count?: number; 
  columns?: number;
  children?: React.ReactNode;
}) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns as keyof typeof gridCols])}>
      {children || Array.from({ length: count }).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container max-w-6xl mx-auto px-4 space-y-12">
        {/* Header Skeleton */}
        <div className="space-y-4 max-w-2xl">
          <VibeSkeleton variant="text" className="h-12 w-3/4" />
          <VibeSkeleton variant="text" className="h-6 w-full" />
          <VibeSkeleton variant="text" className="h-6 w-2/3" />
        </div>
        
        {/* Content Grid */}
        <GridSkeleton count={6} columns={3} />
      </div>
    </div>
  );
}
