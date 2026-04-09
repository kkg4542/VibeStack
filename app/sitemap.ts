import { MetadataRoute } from "next";
import { getTools } from "@/lib/tools-db";
import { blogPosts } from "@/lib/blog";
import { stacks } from "@/lib/stacks";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://usevibestack.com";
    const tools = await getTools();

    // Static pages — use a fixed date (updated manually on major changes)
    const staticLastModified = new Date("2026-04-01");
    const staticPages = [
        "",
        "/tools",
        "/blog",
        "/about",
        "/build",
        "/submit-tool",
        "/submit-stack",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: staticLastModified,
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Tool pages — use actual updatedAt from DB
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

    // Blog pages — use actual publication dates
    const blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...toolPages, ...stackPages, ...blogPages];
}
