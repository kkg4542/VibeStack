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
  metrics: {
    views: number;
    saves: number;
    avgRating: number;
    reviewCount: number;
    popularityScore: number;
  } | null;
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
