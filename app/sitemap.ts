import { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { blogPosts } from "@/lib/blog";
import { stacks } from "@/lib/stacks";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://usevibestack.com";

    // Static pages
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
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Tool pages
    const toolPages = tools.map((tool) => ({
        url: `${baseUrl}/tool/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    // Stack pages
    const stackPages = stacks.map((stack) => ({
        url: `${baseUrl}/stack/${stack.id}`,
        lastModified: new Date(),
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

    return [...staticPages, ...toolPages, ...stackPages, ...blogPages];
}
