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
        ],
    },
    {
        title: "Design",
        categoryHref: "/categories/design",
        icon: Palette,
        tools: [
            { slug: "adobe-firefly", label: "Adobe Firefly", blurb: "Commercial-safe generative AI for Creative Cloud" },
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
            className="bg-card p-6 sm:p-10"
        >
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 id="popular-tools-heading" className="mb-3 font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground">
                        Explore the AI Tool Directory
                    </h2>
                    <p className="max-w-[60ch] text-[16px] leading-normal text-muted-foreground">
                        Every workflow we write about here also has a hands-on breakdown in the directory:
                        pricing, pros, cons, and how each tool stacks up against the competition.
                    </p>
                </div>
                <Link
                    href="/tools"
                    className="group inline-flex shrink-0 items-center gap-1.5 text-[16px] font-semibold text-vibe-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vibe-link"
                >
                    Browse all tools
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {TOOL_GROUPS.map((group) => (
                    <div key={group.title}>
                        <Link
                            href={group.categoryHref}
                            className="mb-4 inline-flex items-center gap-2 text-[17px] font-semibold text-foreground transition-colors hover:text-vibe-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                        >
                            <group.icon className="h-4 w-4 text-vibe-link" aria-hidden="true" />
                            {group.title}
                        </Link>
                        <ul className="space-y-3">
                            {group.tools.map((tool) => (
                                <li key={tool.slug}>
                                    <Link
                                        href={`/tool/${tool.slug}`}
                                        className="group block text-[15px] leading-snug text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                                    >
                                        <span className="font-semibold text-foreground transition-colors group-hover:text-vibe-link">
                                            {tool.label}
                                        </span>
                                        {": "}
                                        {tool.blurb}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-10">
                <span className="mb-3 block text-[15px] font-semibold text-foreground">Head-to-head comparisons</span>
                <div className="flex flex-wrap gap-2">
                    {COMPARE_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex items-center bg-background px-3 py-2 text-[14px] text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
