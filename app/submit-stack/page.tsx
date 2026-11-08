"use client";

import { useState } from "react";
import { Send, CheckCircle2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/components/icons/tool-icons";
import { ToolData } from "@/lib/tool-types";
import { Container } from "@/components/primitives/Container";

export default function SubmitStackPage() {
    const { tools: allTools } = useAllTools();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [stackName, setStackName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [email, setEmail] = useState("");

    const filteredTools = allTools.filter((t: ToolData) =>
        !selectedTools.includes(t.slug) &&
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Reset and show success
        setIsSubmitting(false);
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const addTool = (slug: string) => {
        if (selectedTools.length < 5) {
            setSelectedTools([...selectedTools, slug]);
            setSearchQuery("");
        }
    };

    const removeTool = (slug: string) => {
        setSelectedTools(selectedTools.filter(t => t !== slug));
    };

    const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link";

    if (isSuccess) {
        return (
            <PageBackground {...BackgroundPresets.gradient}>
                <Container size="xs" className="pt-32">
                    <div className="bg-card p-8 sm:p-12">
                        <CheckCircle2 aria-hidden="true" className="mb-6 h-12 w-12 text-vibe-link" />
                        <h1 className="mb-4 font-display text-balance text-[clamp(40px,6vw,72px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">Submission Received!</h1>
                        <p className="mb-8 text-[18px] leading-normal text-muted-foreground">
                            Thanks for sharing your stack. Our editors will review it and notify you once it&apos;s live on VibeStack.
                        </p>
                        <Button
                            onClick={() => setIsSuccess(false)}
                            variant="secondary"
                            className="h-11 rounded-none bg-background px-6 text-[16px] font-semibold hover:bg-accent"
                        >
                            Submit Another Stack
                        </Button>
                    </div>
                </Container>
            </PageBackground>
        );
    }

    return (
        <PageBackground {...BackgroundPresets.content}>
            <Container size="xs" className="pt-32 pb-20">
                <header className="mb-12">
                    <p className="mb-5 text-[16px] font-semibold text-vibe-link">Community Contributions</p>
                    <h1 className="mb-5 font-display text-balance text-[clamp(40px,6vw,88px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">Submit Your Stack</h1>
                    <p className="text-[18px] leading-normal text-muted-foreground">
                        Share your workflow with thousands of other developers.
                    </p>
                </header>

                <div className="bg-card p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Stack name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[15px] font-semibold">Stack Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g., The Ultimate React Polish Stack"
                                value={stackName}
                                onChange={(e) => setStackName(e.target.value)}
                                required
                                className="bg-background"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-[15px] font-semibold">Why does this stack work?</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your workflow and why you chose these tools..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="min-h-[120px] bg-background"
                            />
                        </div>

                        {/* Tools selector */}
                        <div className="space-y-4">
                            <Label className="text-[15px] font-semibold">Tools Used (Max 5)</Label>

                            {/* Selected tools */}
                            <div className="mb-2 flex flex-wrap gap-2">
                                {selectedTools.map(slug => {
                                    const tool = allTools.find((t: ToolData) => t.slug === slug);
                                    if (!tool) return null;
                                    return (
                                        <span key={slug} className="inline-flex items-center gap-1 bg-vibe-electric py-1 pl-3 pr-1 text-[15px] font-semibold text-vibe-deep">
                                            {tool.title}
                                            <button
                                                type="button"
                                                onClick={() => removeTool(slug)}
                                                aria-label={`Remove ${tool.title}`}
                                                className="p-1 hover:bg-vibe-deep/10 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-vibe-deep"
                                            >
                                                <X aria-hidden="true" className="h-3.5 w-3.5" />
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>

                            {/* Search input */}
                            <div className="relative">
                                <Input
                                    placeholder="Search for tools to add..."
                                    aria-label="Search for tools to add"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-background"
                                    disabled={selectedTools.length >= 5}
                                />

                                {searchQuery && (
                                    <div className="absolute z-10 mt-1 w-full overflow-hidden bg-popover shadow-xl" data-ui> {/* taste-skill-ignore: real dropdown overlay */}
                                        {filteredTools.length > 0 ? (
                                            filteredTools.map((tool: ToolData) => (
                                                <button
                                                    key={tool.slug}
                                                    type="button"
                                                    onClick={() => addTool(tool.slug)}
                                                    className={`flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-accent ${focus}`}
                                                >
                                                    <div className="bg-secondary p-1.5">
                                                        {(() => {
                                                            const Icon = getToolIcon(tool.slug);
                                                            return <Icon aria-hidden="true" className="h-4 w-4 text-foreground" />;
                                                        })()}
                                                    </div>
                                                    <span className="text-[16px] font-semibold">{tool.title}</span>
                                                    <Plus aria-hidden="true" className="ml-auto h-4 w-4 text-muted-foreground" />
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-[15px] text-muted-foreground">
                                                No tools found.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <p className="text-[14px] text-muted-foreground">
                                Can&apos;t find a tool? Mention it in the description.
                            </p>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[15px] font-semibold">Your Email (Optional)</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="To notify you when it's published"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-background"
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="h-12 w-full rounded-none text-[16px] font-semibold"
                            disabled={isSubmitting || !stackName || !description || selectedTools.length === 0}
                        >
                            {isSubmitting ? (
                                "Submitting..."
                            ) : (
                                <>
                                    Submit for Review <Send aria-hidden="true" className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>

                    </form>
                </div>
            </Container>
        </PageBackground>
    );
}
