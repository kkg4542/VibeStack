"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
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
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useCsrfFetch } from "@/hooks/useCsrfFetch";

// The tools API returns full database rows, so each tool carries the database
// id that POST /api/community-stacks expects in `toolIds` (ToolData omits it).
type ToolWithId = ToolData & { id?: string };

const NAME_MAX = 100;
const DESCRIPTION_MAX = 1000;

export default function SubmitStackPage() {
    const { tools: allTools } = useAllTools();
    const { status } = useSession();
    const { csrfFetch } = useCsrfFetch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [authOpen, setAuthOpen] = useState(false);
    // Synchronous guard: state updates are async, so two quick submits could both pass an isSubmitting check.
    const submittingRef = useRef(false);

    // Form State
    const [stackName, setStackName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTools = allTools.filter((t: ToolData) =>
        !selectedTools.includes(t.slug) &&
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    const resetForm = () => {
        setStackName("");
        setDescription("");
        setSelectedTools([]);
        setSearchQuery("");
        setErrorMessage("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submittingRef.current) return;

        if (status !== "authenticated") {
            setAuthOpen(true);
            return;
        }

        const toolIds = selectedTools
            .map((slug) => (allTools as ToolWithId[]).find((t) => t.slug === slug)?.id)
            .filter((id): id is string => Boolean(id));

        if (toolIds.length === 0 || toolIds.length !== selectedTools.length) {
            setErrorMessage("We could not match one of the selected tools. Remove it and add it again, or reload the page.");
            return;
        }

        submittingRef.current = true;
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const res = await csrfFetch("/api/community-stacks", {
                method: "POST",
                body: JSON.stringify({
                    name: stackName.trim(),
                    description: description.trim(),
                    toolIds,
                }),
            });

            if (res.ok) {
                resetForm();
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            if (res.status === 401) {
                setAuthOpen(true);
                setErrorMessage("Your session has expired. Sign in again to submit your stack.");
                return;
            }

            const data = await res.json().catch(() => null);
            setErrorMessage(
                typeof data?.error === "string" && data.error
                    ? data.error
                    : "Something went wrong while submitting your stack. Please try again."
            );
        } catch {
            setErrorMessage("Network error. Check your connection and try again.");
        } finally {
            submittingRef.current = false;
            setIsSubmitting(false);
        }
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
                        <h1 className="mb-4 font-display text-balance text-[clamp(40px,6vw,72px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">Stack Published!</h1>
                        <p className="mb-8 text-[18px] leading-normal text-muted-foreground">
                            Your stack is saved and public. The Community Stacks list is cached for a few minutes, so it may take a moment to show up there.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button asChild className="h-11 rounded-none px-6 text-[16px] font-semibold">
                                <Link href="/community-stacks">View Community Stacks</Link>
                            </Button>
                            <Button
                                onClick={() => setIsSuccess(false)}
                                variant="secondary"
                                className="h-11 rounded-none bg-background px-6 text-[16px] font-semibold hover:bg-accent"
                            >
                                Submit Another Stack
                            </Button>
                        </div>
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

                {status === "unauthenticated" ? (
                    <div className="bg-card p-6 sm:p-8">
                        <h2 className="mb-3 text-[26px] font-semibold">Sign in to submit your stack</h2>
                        <p className="mb-6 text-[17px] leading-normal text-muted-foreground">
                            Stacks are published under your account, so you need to be signed in to share one.
                        </p>
                        <Button
                            type="button"
                            onClick={() => setAuthOpen(true)}
                            size="lg"
                            className="h-12 rounded-none px-8 text-[16px] font-semibold"
                        >
                            Sign in
                        </Button>
                    </div>
                ) : (
                <div className="bg-card p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-8" aria-busy={isSubmitting}>

                        {/* Stack name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[15px] font-semibold">Stack Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g., The Ultimate React Polish Stack"
                                value={stackName}
                                onChange={(e) => setStackName(e.target.value)}
                                required
                                maxLength={NAME_MAX}
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
                                maxLength={DESCRIPTION_MAX}
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

                        <Button
                            type="submit"
                            size="lg"
                            className="h-12 w-full rounded-none text-[16px] font-semibold"
                            disabled={isSubmitting || status === "loading" || !stackName.trim() || !description.trim() || selectedTools.length === 0}
                        >
                            {isSubmitting ? (
                                "Submitting..."
                            ) : (
                                <>
                                    Publish Stack <Send aria-hidden="true" className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>

                        <p className="text-[14px] text-muted-foreground">
                            Your stack is published to Community Stacks under your account name as soon as you submit it.
                        </p>

                    </form>
                </div>
                )}

                <div aria-live="assertive" className="mt-4">
                    {errorMessage && (
                        <p className="bg-card p-4 text-[15px] font-semibold text-destructive">{errorMessage}</p>
                    )}
                </div>
            </Container>
            <AuthDialog open={authOpen} onOpenChange={setAuthOpen} callbackUrl="/submit-stack" />
        </PageBackground>
    );
}
