import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Submit Your Stack",
    description: "Share your AI tool stack with the VibeStack community and help others build better workflows.",
    alternates: { canonical: "https://usevibestack.com/submit-stack" },
};

export default function SubmitStackLayout({ children }: { children: React.ReactNode }) {
    return children;
}
