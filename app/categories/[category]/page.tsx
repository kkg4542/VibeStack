import { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import { CategoryPageClient } from "./CategoryPageClient";

// Generate static paths for all categories
export function generateStaticParams() {
    const categories = Array.from(new Set(tools.map(tool => tool.category)));
    return categories.map(category => ({
        category: category.toLowerCase().replace(/\s+/g, '-'),
    }));
}

const categoryMap: Record<string, string> = {
    coding: "Coding",
    management: "Management", 
    productivity: "Productivity",
    assistance: "Assistance",
    design: "Design",
    other: "Other"
};

const descriptions: Record<string, string> = {
    Coding: "Discover the best AI coding assistants, code editors, and developer tools. Compare features, pricing, and reviews to find your perfect coding companion.",
    Management: "Find AI-powered project management and team collaboration tools. Streamline your workflow with intelligent task automation.",
    Productivity: "Boost your productivity with AI writing assistants, note-taking tools, and workflow automation. Get more done in less time.",
    Assistance: "Explore AI assistants and chatbots for everyday tasks. From research to creative writing, find the right AI companion.",
    Design: "Create stunning visuals with AI design tools. From image generation to UI/UX design, discover tools that enhance your creative process.",
    Other: "Explore specialized AI tools that don't fit traditional categories. Find unique solutions for your specific needs."
};

// Generate metadata for each category
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category: categorySlug } = await params;
    const category = categoryMap[categorySlug] || categorySlug;
    
    return {
        title: `${category} AI Tools - Best ${category} Tools 2026 | VibeStack`,
        description: descriptions[category] || `Discover the best ${category} AI tools curated by VibeStack.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category: categorySlug } = await params;
    const category = categoryMap[categorySlug];
    
    if (!category) {
        notFound();
    }
    
    const categoryTools = tools.filter(tool => tool.category === category);
    
    if (categoryTools.length === 0) {
        notFound();
    }
    
    return <CategoryPageClient category={category} />;
}
