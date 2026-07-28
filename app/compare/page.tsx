import { Metadata } from "next";
import { Suspense } from "react";
import ComparePageClient from "./ComparePageClient";
import { CompareDirectory } from "@/components/seo/CompareDirectory";

export const metadata: Metadata = {
    title: "Compare AI Tools",
    description: "Side-by-side comparisons of AI developer tools — features, pricing, and which one fits your workflow.",
    alternates: { canonical: "https://usevibestack.com/compare" },
    openGraph: {
        title: "Compare AI Tools - VibeStack",
        description: "Side-by-side comparisons of AI developer tools — features, pricing, and which one fits your workflow.",
        type: "website",
        url: "https://usevibestack.com/compare",
    },
    twitter: {
        card: "summary_large_image",
        title: "Compare AI Tools - VibeStack",
        description: "Side-by-side comparisons of AI developer tools — features, pricing, and which one fits your workflow.",
    },
};

export default function ComparePage() {
    return (
        <>
            {/* ComparePageClient reads useSearchParams — the Suspense boundary
                keeps this route statically generated. */}
            <Suspense fallback={null}>
                <ComparePageClient />
            </Suspense>
            <div className="container max-w-6xl mx-auto px-4 pb-16">
                <CompareDirectory />
            </div>
        </>
    );
}
