"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Sparkles, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { tools as allTools } from "@/lib/tools";

export default function SubmitStackPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [stackName, setStackName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [email, setEmail] = useState("");

    const filteredTools = allTools.filter(t =>
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

    if (isSuccess) {
        return (
            <PageBackground {...BackgroundPresets.gradient}>
                <div className="container max-w-2xl mx-auto pt-32 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card/50 backdrop-blur-xl border border-green-500/20 rounded-3xl p-12 shadow-2xl"
                    >
                        <div className="inline-flex p-4 rounded-full bg-green-500/10 mb-6">
                            <CheckCircle2 className="h-12 w-12 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Submission Received!</h1>
                        <p className="text-muted-foreground text-lg mb-8">
                            Thanks for sharing your stack. Our editors will review it and notify you once it's live on VibeStack.
                        </p>
                        <Button
                            onClick={() => setIsSuccess(false)}
                            variant="outline"
                            className="rounded-full"
                        >
                            Submit Another Stack
                        </Button>
                    </motion.div>
                </div>
            </PageBackground>
        );
    }

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-2xl mx-auto pt-32 pb-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>Community Contributions</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Submit Your Stack</h1>
                    <p className="text-muted-foreground text-lg">
                        Share your workflow with thousands of other developers.
                    </p>
                </motion.div>

                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Stack Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Stack Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g., The Ultimate React Polish Stack"
                                value={stackName}
                                onChange={(e) => setStackName(e.target.value)}
                                required
                                className="bg-background/50"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Why does this stack work?</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your workflow and why you chose these tools..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="min-h-[120px] bg-background/50"
                            />
                        </div>

                        {/* Tools Selector */}
                        <div className="space-y-4">
                            <Label>Tools Used (Max 5)</Label>

                            {/* Selected Tools Tags */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                {selectedTools.map(slug => {
                                    const tool = allTools.find(t => t.slug === slug);
                                    if (!tool) return null;
                                    return (
                                        <Badge key={slug} variant="secondary" className="pl-2 pr-1 py-1 gap-1 text-sm bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/20 text-indigo-300">
                                            {tool.title}
                                            <button
                                                type="button"
                                                onClick={() => removeTool(slug)}
                                                className="hover:bg-indigo-500/20 rounded-full p-0.5"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    );
                                })}
                            </div>

                            {/* Search Input */}
                            <div className="relative">
                                <Input
                                    placeholder="Search for tools to add..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-background/50"
                                    disabled={selectedTools.length >= 5}
                                />

                                {searchQuery && (
                                    <div className="absolute z-10 w-full mt-2 bg-popover/90 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden">
                                        {filteredTools.length > 0 ? (
                                            filteredTools.map(tool => (
                                                <button
                                                    key={tool.slug}
                                                    type="button"
                                                    onClick={() => addTool(tool.slug)}
                                                    className="w-full flex items-center gap-3 p-3 hover:bg-accent/50 text-left transition-colors"
                                                >
                                                    <div className={`p-1.5 rounded bg-linear-to-br ${tool.bgGradient}`}>
                                                        <tool.icon className={`h-4 w-4 ${tool.color}`} />
                                                    </div>
                                                    <span className="font-medium">{tool.title}</span>
                                                    <Plus className="ml-auto h-4 w-4 text-muted-foreground" />
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-sm text-muted-foreground">
                                                No tools found.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Can't find a tool? Mention it in the description.
                            </p>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Your Email (Optional)</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="To notify you when it's published"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-background/50"
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full h-12 rounded-full font-semibold shadow-lg shadow-indigo-500/20"
                            disabled={isSubmitting || !stackName || !description || selectedTools.length === 0}
                        >
                            {isSubmitting ? (
                                "Submitting..."
                            ) : (
                                <>
                                    Submit for Review <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>

                    </form>
                </Card>
            </div>
        </PageBackground>
    );
}
