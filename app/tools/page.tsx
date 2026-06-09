import { Metadata } from "next";
import ToolsPageClient from "./ToolsPageClient";

export const metadata: Metadata = {
    title: "AI Tools Directory",
    description: "Discover curated AI tools for developers, designers, and creators. Filter by category, pricing, and workflow impact to build your perfect AI stack.",
    alternates: { canonical: "https://usevibestack.com/tools" },
    openGraph: {
        title: "AI Tools Directory - VibeStack",
        description: "Curated AI tools vetted for real workflow impact.",
        type: "website",
        url: "https://usevibestack.com/tools",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Tools Directory - VibeStack",
        description: "Curated AI tools vetted for real workflow impact.",
    },
};

export default function ToolsPage() {
    return <ToolsPageClient />;
}
