"use client";

import { m } from "framer-motion";
import { Card } from "@/components/ui/card";

export function CommunityStackCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full p-6 sm:p-8 bg-card/50">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            <div className="h-3 w-24 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-6 w-16 bg-muted animate-pulse rounded" />
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
        </div>

        {/* Curator */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            <div className="space-y-1">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-3 w-20 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
      </Card>
    </m.div>
  );
}

export function CommunityStacksGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <CommunityStackCardSkeleton key={index} index={index} />
      ))}
    </div>
  );
}

export function ToolCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full p-6 bg-card/50">
        {/* Icon & Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-muted animate-pulse" />
          <div className="h-5 w-20 bg-muted animate-pulse rounded" />
        </div>

        {/* Title */}
        <div className="h-6 w-3/4 bg-muted animate-pulse rounded mb-2" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
        </div>
      </Card>
    </m.div>
  );
}

export function ToolsGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ToolCardSkeleton key={index} index={index} />
      ))}
    </div>
  );
}
