import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/api/", "/private/", "/_next/", "/consulting"],
        },
        sitemap: "https://usevibestack.com/sitemap.xml",
    };
}
