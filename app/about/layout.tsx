import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "VibeStack is an AI productivity lab curating the best AI tools for developers. Learn about our mission and how we vet every tool.",
    alternates: { canonical: "https://usevibestack.com/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
