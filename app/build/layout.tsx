import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Build Your AI Stack",
    description: "Answer a few questions and get a personalized AI tool stack curated for your workflow — from coding assistants to project management.",
    alternates: { canonical: "https://usevibestack.com/build" },
};

export default function BuildLayout({ children }: { children: React.ReactNode }) {
    return children;
}
