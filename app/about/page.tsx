import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About - AI Productivity Lab",
    description: "Learn more about why we built VibeStack.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div className="container max-w-3xl mx-auto px-4">
                <h1 className="text-4xl font-bold tracking-tight mb-8">About VibeStack</h1>

                <div className="prose dark:prose-invert prose-zinc prose-indigo text-lg text-muted-foreground">
                    <p>
                        Welcome to <strong>AI Productivity Lab</strong> (VibeStack).
                    </p>
                    <p>
                        As developers, we are overwhelmed by the speed of AI innovation. Every day, a new tool promises to revolutionize how we code, design, and manage products.
                    </p>
                    <p>
                        Our mission is simple: <strong>Curate the signal from the noise.</strong>
                    </p>
                    <p>
                        We don't list every AI tool. We only list the ones that have a proven track record of actually improving developer productivity.
                    </p>

                    <h2 className="text-foreground mt-12 mb-6 text-2xl font-bold">Our Philosophy</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Design First:</strong> Tools should be beautiful and intuitive.</li>
                        <li><strong>Developer Centric:</strong> We focus on tools that output code or help managing code.</li>
                        <li><strong>Speed:</strong> If it slows you down, it's not a productivity tool.</li>
                    </ul>

                    <h2 className="text-foreground mt-12 mb-6 text-2xl font-bold">Contact</h2>
                    <p>
                        Have a tool suggestion? Reach out to us at <a href="mailto:hello@vibestack.com" className="text-primary hover:text-primary/80 transition-colors">hello@vibestack.com</a>.
                    </p>
                </div>
            </div>
        </main>
    );
}
