import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Submit a Tool",
    description: "Suggest an AI tool for the VibeStack directory. We review every submission against our editorial guidelines.",
    alternates: { canonical: "https://usevibestack.com/submit-tool" },
};

export default function SubmitToolLayout({ children }: { children: React.ReactNode }) {
    return children;
}
