/**
 * Engagement counters for one stack, as stored on the `StackMetrics` row.
 *
 * This is the *only* thing the database is allowed to say about a curated
 * stack. What a stack *is* — its name, blurb, price, tool list, workflow — lives
 * in `lib/stacks.ts` and nowhere else; see {@link FeaturedStackRanking}.
 */
export interface StackMetricsSummary {
  views: number;
  saves: number;
  avgRating: number;
  reviewCount: number;
  popularityScore: number;
}

/**
 * One entry in the metrics-ordered featured list: an *identifier* plus its
 * engagement numbers. Deliberately carries no copy.
 *
 * `id` is a `lib/stacks.ts` stack id (the DB stores the same value in
 * `Stack.idField`). Resolving it back into content is
 * `resolveFeaturedStacks()`'s job, which is what keeps the homepage and
 * `/stack/<id>` reading the same source.
 */
export interface FeaturedStackRanking {
  id: string;
  metrics: StackMetricsSummary | null;
}

/**
 * A featured stack card, ready to render: curated content from
 * `lib/stacks.ts`, tool display names resolved against the live tool
 * directory, and DB metrics attached.
 *
 * `id` is guaranteed to be a real `lib/stacks.ts` id, so `/stack/${id}` is
 * always a route that `generateStaticParams()` emitted.
 */
export interface FeaturedStack {
  id: string;
  name: string;
  description: string;
  totalPrice: string;
  tags: string[];
  icon: string;
  /**
   * Tool slug plus the title `getTools()` returned for it. Slugs with no live
   * tool (retired, or not in the directory) are dropped during resolution, so
   * this list can be shorter than the stack's `tools` array in `lib/stacks.ts`.
   */
  tools: {
    slug: string;
    name: string;
  }[];
  metrics: StackMetricsSummary | null;
  curator: {
    name: string;
    role: string;
  } | null;
}

export interface StackWithMetrics {
  id: string;
  idField: string;
  name: string;
  description: string | null;
  longDescription: string | null;
  totalPrice: string | null;
  tags: string[];
  idealFor: string[];
  workflow: string[];
  icon: string | null;
  color: string | null;
  tools: {
    id: string;
    name: string;
    slug: string;
    category: string;
    pricing: string;
  }[];
  metrics: StackMetricsSummary | null;
  curator: {
    name: string;
    image: string | null;
    role: string;
  } | null;
}

export interface VerifiedTestimonial {
  id: string;
  user: {
    name: string;
    handle: string;
    avatar: string | null;
    verified: boolean;
    role: string;
    company: string;
  };
  stackName: string | null;
  toolName: string | null;
  rating: number;
  content: string;
  metrics: {
    productivityGain?: string;
    timeSaved?: string;
    roi?: string;
  } | null;
  videoUrl: string | null;
  socialProof: {
    likes: number;
    retweets: number;
  } | null;
  createdAt: Date;
}

export interface StackInsights {
  adoptionTrend: {
    month: string;
    users: number;
  }[];
  avgTimeSaved: string;
  avgCostSaved: string;
  productivityBoost: number;
  toolPopularity: {
    toolId: string;
    toolName: string;
    usage: number;
  }[];
}
