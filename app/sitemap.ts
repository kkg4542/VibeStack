import { MetadataRoute } from "next";
import { getTools } from "@/lib/tools-db";
import { blogPosts } from "@/lib/blog";
import { stacks } from "@/lib/stacks";
import { BEST_CATEGORIES } from "@/lib/best-categories";

const CATEGORY_SLUGS = ["coding", "management", "productivity", "assistance", "design", "other"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://usevibestack.com";
    const tools = await getTools();

    const staticLastModified = new Date("2026-04-01");

    // Static pages
    const staticPages = [
        { route: "", priority: 1.0, changeFrequency: "weekly" as const },
        { route: "/tools", priority: 0.9, changeFrequency: "weekly" as const },
        { route: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
        { route: "/compare", priority: 0.8, changeFrequency: "weekly" as const },
        { route: "/community-stacks", priority: 0.8, changeFrequency: "weekly" as const },
        { route: "/about", priority: 0.6, changeFrequency: "monthly" as const },
        { route: "/build", priority: 0.7, changeFrequency: "monthly" as const },
        { route: "/submit-tool", priority: 0.6, changeFrequency: "monthly" as const },
        { route: "/submit-stack", priority: 0.6, changeFrequency: "monthly" as const },
        { route: "/pricing", priority: 0.7, changeFrequency: "monthly" as const },
        { route: "/sponsor", priority: 0.5, changeFrequency: "monthly" as const },
        { route: "/newsletter", priority: 0.7, changeFrequency: "monthly" as const },
        { route: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
        { route: "/testimonials", priority: 0.5, changeFrequency: "monthly" as const },
        { route: "/roadmap", priority: 0.5, changeFrequency: "monthly" as const },
        { route: "/guidelines", priority: 0.4, changeFrequency: "monthly" as const },
        { route: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
        { route: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    ].map(({ route, priority, changeFrequency }) => ({
        url: `${baseUrl}${route}`,
        lastModified: staticLastModified,
        changeFrequency,
        priority,
    }));

    // Category pages — /categories/[slug]
    const categoryPages = CATEGORY_SLUGS.map((slug) => ({
        url: `${baseUrl}/categories/${slug}`,
        lastModified: staticLastModified,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Tool pages
    const toolPages = tools.map((tool) => ({
        url: `${baseUrl}/tool/${tool.slug}`,
        lastModified: tool.updatedAt ?? new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    // Stack pages
    const stackPages = stacks.map((stack) => ({
        url: `${baseUrl}/stack/${stack.id}`,
        lastModified: staticLastModified,
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    // Blog pages
    const blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // "Best AI [Category] Tools" landing pages
    const bestPages = BEST_CATEGORIES.map((c) => ({
        url: `${baseUrl}/best/${c.slug}`,
        lastModified: staticLastModified,
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    // Comparison pages — mirror generateStaticParams in app/compare/[slug]/page.tsx
    // (same-category pairs, capped to match the build-time generation)
    const comparisonPages = tools
        .flatMap((t1, i) =>
            tools.slice(i + 1)
                .filter((t2) => t1.category === t2.category)
                .map((t2) => ({ slug: `${t1.slug}-vs-${t2.slug}` }))
        )
        .slice(0, 50)
        .map(({ slug }) => ({
            url: `${baseUrl}/compare/${slug}`,
            lastModified: staticLastModified,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }));

    return [
        ...staticPages,
        ...categoryPages,
        ...toolPages,
        ...stackPages,
        ...blogPages,
        ...bestPages,
        ...comparisonPages,
    ];
}
