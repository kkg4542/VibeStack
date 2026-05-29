import { prisma } from "./prisma";
import { ToolData } from "@/lib/tool-types";
import { tools } from "./tools";

/**
 * Curated popularity ranking. Tools appear in this order at the top of every
 * listing (tools page, /best pages, etc.); anything not listed falls after,
 * sorted alphabetically. Edit this list to re-rank the directory.
 */
export const POPULARITY_ORDER: string[] = [
    "chatgpt",
    "claude",
    "cursor",
    "github-copilot",
    "midjourney",
    "perplexity",
    "notion-ai",
    "v0-by-vercel",
    "bolt-new",
    "windsurf-ide",
    "elevenlabs",
    "runway",
    "framer",
    "linear",
    "vercel",
    "replit",
    "descript",
    "devin-ai",
    "openai-sora",
    "galileo-ai",
];

function popularityRank(slug: string): number {
    const i = POPULARITY_ORDER.indexOf(slug);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
}

/** Sort by curated popularity, then alphabetically by title for the rest. */
export function sortByPopularity(list: ToolData[]): ToolData[] {
    return [...list].sort((a, b) => {
        const ra = popularityRank(a.slug);
        const rb = popularityRank(b.slug);
        if (ra !== rb) return ra - rb;
        return a.title.localeCompare(b.title);
    });
}

export async function getTools(): Promise<ToolData[]> {
    try {
        const dbTools = await prisma.tool.findMany();
        const mapped = dbTools.map(tool => ({
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
        return sortByPopularity(mapped);
    } catch (error) {
        console.error("Failed to fetch tools from database:", error);
        if (tools && tools.length > 0) return sortByPopularity(tools); // Fallback to hardcoded array
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
        return tools.find(t => t.slug === slug) || null;
    }
}
