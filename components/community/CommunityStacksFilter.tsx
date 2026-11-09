"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Clock, TrendingUp, Heart, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchInput } from "@/components/ui/search-input";
import { Badge } from '@/components/ui/badge';
import { CommunityStackFilters } from '@/lib/data/community-stacks';

interface CommunityStacksFilterProps {
  initialFilters: CommunityStackFilters;
}

const sortOptions = [
  { value: 'popular', label: 'Most Popular', icon: TrendingUp },
  { value: 'newest', label: 'Newest First', icon: Clock },
  { value: 'mostSaved', label: 'Most Saved', icon: Heart },
  { value: 'mostViewed', label: 'Most Viewed', icon: Eye },
] as const;

const timeOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
] as const;

export function CommunityStacksFilter({ initialFilters }: CommunityStacksFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialFilters.search || '');
  const [sortBy, setSortBy] = useState<CommunityStackFilters['sortBy']>(initialFilters.sortBy || 'popular');
  const [timeRange, setTimeRange] = useState<CommunityStackFilters['timeRange']>(initialFilters.timeRange || 'all');

  const updateFilters = (updates: Partial<CommunityStackFilters>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/community-stacks?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search });
  };

  const clearFilters = () => {
    setSearch('');
    setSortBy('popular');
    setTimeRange('all');
    router.push('/community-stacks');
  };

  const hasActiveFilters = search || sortBy !== 'popular' || timeRange !== 'all';

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1">
          <SearchInput
            variant="compact"
            placeholder="Search community stacks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-muted h-10"
          />
        </div>
        <Button type="submit" variant="secondary" className="h-10 rounded-none px-5">
          Search
        </Button>
      </form>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
          <span>Filters:</span>
        </div>

        {/* Sort By Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => {
              const value = e.target.value as CommunityStackFilters['sortBy'];
              setSortBy(value);
              updateFilters({ sortBy: value });
            }}
            aria-label="Sort stacks"
            className="appearance-none bg-muted border border-input rounded-none min-h-10 px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <TrendingUp aria-hidden="true" className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Time Range Dropdown */}
        <div className="relative">
          <select
            value={timeRange}
            onChange={(e) => {
              const value = e.target.value as CommunityStackFilters['timeRange'];
              setTimeRange(value);
              updateFilters({ timeRange: value });
            }}
            aria-label="Filter by time range"
            className="appearance-none bg-muted border border-input rounded-none min-h-10 px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Clock aria-hidden="true" className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-10 text-muted-foreground hover:text-foreground gap-1"
          >
            <X aria-hidden="true" className="h-3 w-3" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <Badge variant="secondary" className="gap-1 overflow-visible">
              Search: {search}
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  updateFilters({ search: undefined });
                }}
                aria-label="Clear search filter"
                className="-my-3 -mr-2 ml-1 inline-flex size-10 items-center justify-center hover:text-destructive"
              >
                <X aria-hidden="true" className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {sortBy !== 'popular' && (
            <Badge variant="secondary" className="gap-1 overflow-visible">
              Sort: {sortOptions.find(o => o.value === sortBy)?.label}
              <button
                type="button"
                onClick={() => {
                  setSortBy('popular');
                  updateFilters({ sortBy: 'popular' });
                }}
                aria-label="Clear sort filter"
                className="-my-3 -mr-2 ml-1 inline-flex size-10 items-center justify-center hover:text-destructive"
              >
                <X aria-hidden="true" className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {timeRange !== 'all' && (
            <Badge variant="secondary" className="gap-1 overflow-visible">
              Time: {timeOptions.find(o => o.value === timeRange)?.label}
              <button
                type="button"
                onClick={() => {
                  setTimeRange('all');
                  updateFilters({ timeRange: 'all' });
                }}
                aria-label="Clear time range filter"
                className="-my-3 -mr-2 ml-1 inline-flex size-10 items-center justify-center hover:text-destructive"
              >
                <X aria-hidden="true" className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
