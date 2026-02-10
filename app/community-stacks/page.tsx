import { Metadata } from 'next';
import { getCommunityStacks, CommunityStackFilters } from '@/lib/data/community-stacks';
import { CommunityStacksPageClient } from './CommunityStacksPageClient';

export const metadata: Metadata = {
  title: 'Community Stacks | VibeStack',
  description: 'Discover and share AI tool stacks curated by the community. Find the perfect workflow for your needs.',
};

export default async function CommunityStacksPage(props: {
  searchParams: Promise<{
    search?: string;
    sortBy?: 'popular' | 'newest' | 'mostSaved' | 'mostViewed';
    timeRange?: 'all' | 'week' | 'month' | 'year';
  }>;
}) {
  const searchParams = await props.searchParams;

  // Parse filters from URL
  const filters: CommunityStackFilters = {
    search: searchParams.search,
    sortBy: searchParams.sortBy || 'popular',
    timeRange: searchParams.timeRange || 'all',
  };

  // Fetch community stacks
  const { stacks, totalCount } = await getCommunityStacks(filters, 20, 0);

  return (
    <CommunityStacksPageClient
      stacks={stacks}
      totalCount={totalCount}
      filters={filters}
    />
  );
}
