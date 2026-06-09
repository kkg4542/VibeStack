import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Newsletter",
    description: "Get curated AI tool picks and workflow tips delivered to your inbox. Join the VibeStack newsletter.",
    alternates: { canonical: "https://usevibestack.com/newsletter" },
};

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
    return children;
}
