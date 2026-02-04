import { Metadata } from "next";
import { ToolsList } from "./ToolsList";

export const metadata: Metadata = {
    title: "All Tools - AI Productivity Lab",
    description: "Browse our curated collection of AI tools for developers.",
};

export default function ToolsPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">All AI Tools</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore our complete database of tools designed to accelerate your workflow.
                    </p>
                </div>

                <ToolsList />
            </div>
        </main>
    );
}
