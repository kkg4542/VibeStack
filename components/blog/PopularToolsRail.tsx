import Link from "next/link";
import { Code2, Palette, Sparkles, LayoutGrid, ArrowRight } from "lucide-react";

interface ToolLink {
    slug: string;
    label: string;
    blurb: string;
}

interface ToolGroup {
    title: string;
    categoryHref: string;
    icon: React.ComponentType<{ className?: string }>;
    tools: ToolLink[];
}

const TOOL_GROUPS: ToolGroup[] = [
    {
        title: "Coding",
        categoryHref: "/categories/coding",
        icon: Code2,
        tools: [
            { slug: "aider", label: "Aider", blurb: "Terminal AI pair programmer, free & open source" },
            { slug: "amazon-q-developer", label: "Amazon Q Developer", blurb: "AWS-native coding assistant" },
            { slug: "coderabbit", label: "CodeRabbit", blurb: "AI code review on every pull request" },
            { slug: "cody", label: "Cody", blurb: "Sourcegraph's codebase-aware assistant" },
            { slug: "cosine", label: "Cosine", blurb: "Autonomous agent that fixes bugs and ships PRs" },
            { slug: "tabnine", label: "Tabnine", blurb: "Private, on-prem AI autocomplete" },
            { slug: "supermaven", label: "Supermaven", blurb: "The fastest AI autocomplete around" },
        ],
    },
    {
        title: "Design",
        categoryHref: "/categories/design",
        icon: Palette,
        tools: [
            { slug: "adobe-firefly", label: "Adobe Firefly", blurb: "Commercial-safe generative AI for Creative Cloud" },
            { slug: "galileo-ai", label: "Galileo AI", blurb: "Turns text prompts into editable Figma files" },
            { slug: "openai-sora", label: "Sora", blurb: "OpenAI's photorealistic text-to-video model" },
            { slug: "builder-io", label: "Builder.io", blurb: "AI visual page building for real codebases" },
        ],
    },
    {
        title: "Assistance",
        categoryHref: "/categories/assistance",
        icon: Sparkles,
        tools: [
            { slug: "grok", label: "Grok", blurb: "xAI's assistant with live access to X" },
            { slug: "ollama", label: "Ollama", blurb: "Run open-source LLMs locally on your machine" },
        ],
    },
    {
        title: "Productivity",
        categoryHref: "/categories/productivity",
        icon: LayoutGrid,
        tools: [
            { slug: "coda", label: "Coda", blurb: "All-in-one docs with AI-powered tables" },
            { slug: "otter-ai", label: "Otter.ai", blurb: "Real-time meeting transcription and AI notes" },
            { slug: "slack-ai", label: "Slack AI", blurb: "Summarizes channels and catches you up on threads" },
            { slug: "zoom-ai-companion", label: "Zoom AI Companion", blurb: "Meeting summaries and follow-ups inside Zoom" },
        ],
    },
];

const COMPARE_LINKS: { href: string; label: string }[] = [
    { href: "/compare/cursor-vs-aider", label: "Cursor vs Aider" },
    { href: "/compare/github-copilot-vs-coderabbit", label: "GitHub Copilot vs CodeRabbit" },
    { href: "/compare/midjourney-vs-adobe-firefly", label: "Midjourney vs Adobe Firefly" },
    { href: "/compare/notion-ai-vs-coda", label: "Notion AI vs Coda" },
];

/**
 * Server-rendered internal link module pointing from the blog hub into the
 * tool directory. Renders as plain markup (no client-only data fetching, no
 * entrance animation) so the links are present in the initial HTML.
 */
export function PopularToolsRail() {
    return (
        <section
            aria-labelledby="popular-tools-heading"
            className="bg-card/50 rounded-3xl border border-border/40 p-6 sm:p-8 backdrop-blur-sm"
        >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
                <div>
                    <h2 id="popular-tools-heading" className="text-2xl font-bold text-foreground mb-2">
                        Explore the AI Tool Directory
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-2xl">
                        Every workflow we write about here also has a hands-on breakdown in the directory —
                        pricing, pros, cons, and how each tool stacks up against the competition.
                    </p>
                </div>
                <Link
                    href="/tools"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-vibe-electric hover:text-vibe-electric/80 transition-colors shrink-0"
                >
                    Browse all tools
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {TOOL_GROUPS.map((group) => (
                    <div key={group.title}>
                        <Link
                            href={group.categoryHref}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-vibe-electric transition-colors mb-3"
                        >
                            <group.icon className="w-4 h-4 text-vibe-electric" aria-hidden="true" />
                            {group.title}
                        </Link>
                        <ul className="space-y-2.5">
                            {group.tools.map((tool) => (
                                <li key={tool.slug}>
                                    <Link
                                        href={`/tool/${tool.slug}`}
                                        className="group block text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <span className="font-medium text-foreground/90 group-hover:text-vibe-electric transition-colors">
                                            {tool.label}
                                        </span>
                                        {" — "}
                                        {tool.blurb}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border/30">
                <span className="text-xs text-muted-foreground block mb-3">Head-to-head comparisons</span>
                <div className="flex flex-wrap gap-2">
                    {COMPARE_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
