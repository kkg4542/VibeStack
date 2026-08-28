import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Who's Behind Our AI Tool Picks",
    description: "VibeStack's AI tool picks come from developers who actually use them, not press releases — see who's behind the site and how picks get updated.",
    alternates: { canonical: "https://usevibestack.com/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
