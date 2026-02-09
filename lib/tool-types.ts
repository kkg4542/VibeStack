export interface ToolData {
  slug: string;
  title: string;
  description: string;
  category: "Coding" | "Management" | "Productivity" | "Assistance" | "Design" | "Other";
  pricing: "Free" | "Freemium" | "Paid" | "Enterprise";
  websiteUrl: string;
  affiliateUrl?: string | null;
  features?: string[] | null;
  pros?: string[] | null;
  cons?: string[] | null;
  color?: string | null;
  bgGradient?: string | null;
  tier?: string | null;
  isFeatured?: boolean | null;
  adCopy?: string | null;
  review?: {
    content: string;
    rating: number;
  } | null;
  createdAt?: string;
  updatedAt?: string;
}
