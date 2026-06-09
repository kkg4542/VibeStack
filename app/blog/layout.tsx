import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog — AI Workflow Guides",
    description: "Guides, comparisons, and deep dives on AI developer tools and productivity workflows from the VibeStack team.",
    alternates: { canonical: "https://usevibestack.com/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return children;
}
