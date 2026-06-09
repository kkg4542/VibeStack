import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Roadmap",
    description: "See what's coming next for VibeStack — upcoming features, integrations, and community requests.",
    alternates: { canonical: "https://usevibestack.com/roadmap" },
};

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
    return children;
}
