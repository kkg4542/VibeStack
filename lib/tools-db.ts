import { prisma } from "./prisma";
import { ToolData } from "@/lib/tool-types";

export async function getTools(): Promise<ToolData[]> {
    try {
        const dbTools = await prisma.tool.findMany();
        return dbTools.map(tool => ({
            slug: tool.slug,
            title: tool.title,
            description: tool.description,
            category: tool.category as "Coding" | "Management" | "Productivity" | "Assistance" | "Design" | "Other",
            pricing: tool.pricing as "Free" | "Freemium" | "Paid" | "Enterprise",
            websiteUrl: tool.websiteUrl,
            affiliateUrl: tool.affiliateUrl || undefined,
            features: tool.features,
            color: tool.color || "text-foreground",
            bgGradient: tool.bgGradient || "from-transparent to-transparent",
            pros: tool.pros,
            cons: tool.cons,
            isFeatured: tool.isFeatured,
            adCopy: undefined,
        }));
    } catch (error) {
        console.error("Failed to fetch tools from database:", error);
        return []; // Fallback to empty array to allow build to continue
    }
}

export async function getToolBySlug(slug: string): Promise<ToolData | null> {
    try {
        const tool = await prisma.tool.findUnique({ where: { slug } });
        if (!tool) return null;
        return {
            slug: tool.slug,
            title: tool.title,
            description: tool.description,
            category: tool.category as "Coding" | "Management" | "Productivity" | "Assistance" | "Design" | "Other",
            pricing: tool.pricing as "Free" | "Freemium" | "Paid" | "Enterprise",
            websiteUrl: tool.websiteUrl,
            affiliateUrl: tool.affiliateUrl || undefined,
            features: tool.features,
            color: tool.color || "text-foreground",
            bgGradient: tool.bgGradient || "from-transparent to-transparent",
            pros: tool.pros,
            cons: tool.cons,
            isFeatured: tool.isFeatured,
            adCopy: undefined,
        };
    } catch (error) {
        console.error(`Failed to fetch tool ${slug} from database:`, error);
        return null;
    }
}
