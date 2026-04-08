import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const baseSubmissionSchema = z.object({
  toolName: z.string().min(2, "Tool name must be at least 2 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  websiteUrl: z.string().url("Must be a valid URL"),
  category: z.string().min(1, "Category is required").max(50),
  pricing: z.string().min(1, "Pricing is required").max(50),
  email: z.string().email("Invalid email address"),
  tier: z.enum(["free", "priority", "premium"]).default("free"),
});

export const submissionSchema = baseSubmissionSchema.extend({
  amount: z.number().default(0),
});

export const checkoutSchema = baseSubmissionSchema;

export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type SubmissionInput = z.infer<typeof submissionSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
