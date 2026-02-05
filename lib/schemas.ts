import { z } from 'zod';

// Tool schemas
export const ToolCategorySchema = z.enum(['coding', 'design', 'productivity', 'other']);
export const ToolPricingSchema = z.enum(['free', 'freemium', 'paid']);

export const ToolFeatureSchema = z.string().min(1).max(500);

export const ToolReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  author: z.string().min(1).max(100),
  comment: z.string().min(1).max(1000),
  date: z.string().datetime().optional(),
});

export const CreateToolSchema = z.object({
  slug: z.string()
    .min(1, "Slug is required")
    .max(50, "Slug must be 50 characters or less")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  category: ToolCategorySchema,
  pricing: ToolPricingSchema,
  websiteUrl: z.string().url("Invalid website URL"),
  affiliateUrl: z.string().url("Invalid affiliate URL").optional(),
  icon: z.string().min(1).max(100),
  features: z.array(ToolFeatureSchema).max(10),
  pros: z.array(z.string().min(1).max(200)).max(5),
  cons: z.array(z.string().min(1).max(200)).max(5),
  reviews: z.array(ToolReviewSchema).optional(),
});

export const UpdateToolSchema = CreateToolSchema.partial();

// Newsletter schema
export const NewsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().max(100).optional(),
});

// Review schema
export const CreateReviewSchema = z.object({
  toolId: z.string().min(1),
  rating: z.number().min(1).max(5),
  content: z.string().min(1).max(1000),
});

// Stack schema
export const StackToolSchema = z.object({
  toolSlug: z.string().min(1),
  description: z.string().min(1).max(200),
});

export const CreateStackSchema = z.object({
  slug: z.string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  icon: z.string().min(1).max(100),
  tools: z.array(StackToolSchema).min(1).max(10),
});

// Search params schema
export const SearchParamsSchema = z.object({
  q: z.string().min(1).max(100).optional(),
  category: ToolCategorySchema.optional(),
  pricing: ToolPricingSchema.optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
});

export type CreateToolInput = z.infer<typeof CreateToolSchema>;
export type UpdateToolInput = z.infer<typeof UpdateToolSchema>;
export type NewsletterInput = z.infer<typeof NewsletterSchema>;
export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
export type CreateStackInput = z.infer<typeof CreateStackSchema>;
export type SearchParamsInput = z.infer<typeof SearchParamsSchema>;
