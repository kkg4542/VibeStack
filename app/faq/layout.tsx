import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ",
    description: "Frequently asked questions about VibeStack — how we curate AI tools, submissions, pricing, and more.",
    alternates: { canonical: "https://usevibestack.com/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return children;
}
