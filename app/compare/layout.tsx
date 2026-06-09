import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compare AI Tools",
    description: "Side-by-side comparisons of AI developer tools — features, pricing, and which one fits your workflow.",
    alternates: { canonical: "https://usevibestack.com/compare" },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
    return children;
}
