import { LucideIcon, Terminal, LayoutTemplate, PenTool, Bot, Code2, Cpu, Github, MessagesSquare, Sparkles, Shield, Search, Blocks, Braces, Zap, HardDrive, Rabbit, FileSearch, Command, Wind, Wand2 } from "lucide-react";

export interface Tool {
    slug: string;
    title: string;
    description: string;
    icon: LucideIcon;
    category: "Coding" | "Management" | "Productivity" | "Assistance" | "Design" | "Other";
    pricing: "Free" | "Freemium" | "Paid" | "Enterprise";
    websiteUrl: string;
    affiliateUrl?: string;
    features?: string[];
    color: string;
    bgGradient: string;
}

export const tools: Tool[] = [
    {
        slug: "devin",
        title: "Devin",
        description: "The first autonomous AI software engineer.",
        icon: Bot,
        category: "Coding",
        pricing: "Paid",
        websiteUrl: "https://devin.ai",
        color: "text-amber-500",
        bgGradient: "from-amber-500/10 to-transparent",
        features: ["Autonomous Coding", "Self-Healing", "Deployment"]
    },
    {
        slug: "supermaven",
        title: "Supermaven",
        description: "The fastest copilot with a 1 million token context.",
        icon: Zap,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://supermaven.com",
        color: "text-rose-400",
        bgGradient: "from-rose-500/10 to-transparent",
        features: ["1M Context Window", "Instant Completion", "Low Latency"]
    },
    {
        slug: "ollama",
        title: "Ollama",
        description: "Get up and running with large language models locally.",
        icon: HardDrive,
        category: "Other",
        pricing: "Free",
        websiteUrl: "https://ollama.com",
        color: "text-slate-100",
        bgGradient: "from-slate-500/10 to-transparent",
        features: ["Local Inference", "Privacy", "Llama 3 / Mistral Support"]
    },
    {
        slug: "cursor",
        title: "Cursor",
        description: "The AI-first code editor built for speed.",
        icon: Terminal,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://cursor.sh",
        affiliateUrl: "https://cursor.sh",
        color: "text-blue-400",
        bgGradient: "from-blue-500/10 to-transparent",
        features: ["AI Chat", "Codebase Indexing", "Agent Mode"]
    },
    {
        slug: "github-copilot",
        title: "GitHub Copilot",
        description: "Your AI pair programmer.",
        icon: Github,
        category: "Coding",
        pricing: "Paid",
        websiteUrl: "https://github.com/features/copilot",
        color: "text-slate-200",
        bgGradient: "from-slate-500/10 to-transparent",
        features: ["Autocomplete", "Copilot Workspace", "Pull Request Summaries"]
    },
    {
        slug: "claude",
        title: "Claude 5 Sonnet",
        description: "Just released: The new apex of reasoning.",
        icon: MessagesSquare,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://claude.ai",
        color: "text-orange-400",
        bgGradient: "from-orange-500/10 to-transparent",
        features: ["Claude 5 Sonnet", "1M Context", "Agentic Capabilities"]
    },
    {
        slug: "gemini-code-assist",
        title: "Gemini 3 Pro",
        description: "Native multimodal reasoning at scale.",
        icon: Sparkles,
        category: "Coding",
        pricing: "Paid",
        websiteUrl: "https://cloud.google.com/gemini/code-assist",
        color: "text-sky-400",
        bgGradient: "from-sky-500/10 to-transparent",
        features: ["Gemini 3 Deep Think", "Native AV Processing", "1M Context"]
    },
    {
        slug: "linear",
        title: "Linear",
        description: "Project management for high-performance teams.",
        icon: LayoutTemplate,
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://linear.app",
        color: "text-indigo-400",
        bgGradient: "from-indigo-500/10 to-transparent",
        features: ["Issue Tracking", "Cycles", "Roadmaps"]
    },
    {
        slug: "notion-ai",
        title: "Notion AI",
        description: "Your connected workspace, now with intelligence.",
        icon: PenTool,
        category: "Productivity",
        pricing: "Paid",
        websiteUrl: "https://notion.so",
        color: "text-amber-400",
        bgGradient: "from-amber-500/10 to-transparent",
        features: ["Writing Assistant", "Database AI", "Summarization"]
    },
    {
        slug: "replit-ai",
        title: "Replit AI",
        description: "The AI-powered software development platform.",
        icon: Code2,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://replit.com/ai",
        color: "text-orange-500",
        bgGradient: "from-orange-500/10 to-transparent",
        features: ["Collaborative Coding", "Instant Deployment", "Ghostwriter"]
    },
    {
        slug: "tabnine",
        title: "Tabnine",
        description: "AI code assistant associated with privacy and security.",
        icon: Shield,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://tabnine.com",
        color: "text-purple-400",
        bgGradient: "from-purple-500/10 to-transparent",
        features: ["Private Codebase Training", "Local Mode", "Security"]
    },
    {
        slug: "cody",
        title: "Cody",
        description: "AI that knows your entire codebase by Sourcegraph.",
        icon: Search,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://sourcegraph.com/cody",
        color: "text-violet-400",
        bgGradient: "from-violet-500/10 to-transparent",
        features: ["Codebase Search", "Context Awareness", "Unit Test Generation"]
    },
    {
        slug: "builder-io",
        title: "Builder.io",
        description: "Visual development platform to ship faster.",
        icon: Blocks,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://builder.io",
        color: "text-green-400",
        bgGradient: "from-green-500/10 to-transparent",
        features: ["Design to Code", "Visual CMS", "Figma Import"]
    },
    {
        slug: "chatgpt",
        title: "GPT-5.2",
        description: "The new standard for agentic AI.",
        icon: Bot,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://chat.openai.com",
        color: "text-emerald-400",
        bgGradient: "from-emerald-500/10 to-transparent",
        features: ["GPT-5.2 Codex", "Stabilized Context", "xHigh Reasoning"]
    },
    {
        slug: "v0",
        title: "v0",
        description: "Generate UI with simple text prompts.",
        icon: Braces,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://v0.dev",
        affiliateUrl: "https://v0.dev",
        color: "text-zinc-400",
        bgGradient: "from-zinc-500/10 to-transparent",
        features: ["React Code Gen", "Shadcn UI", "Tailwind"]
    },
    {
        slug: "perplexity",
        title: "Perplexity",
        description: "Where knowledge begins.",
        icon: Cpu,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://perplexity.ai",
        color: "text-teal-400",
        bgGradient: "from-teal-500/10 to-transparent",
        features: ["Real-time Search", "Citations", "Pro Search"]
    },
    {
        slug: "lovable",
        title: "Lovable",
        description: "Build full-stack apps at the speed of thought with AI.",
        icon: Wand2,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://lovable.dev",
        color: "text-pink-400",
        bgGradient: "from-pink-500/10 to-transparent",
        features: ["Full-stack Generation", "Supabase Integration", "Visual Editing"]
    },
    {
        slug: "coderabbit",
        title: "CodeRabbit",
        description: "AI-powered code reviews that actually understand your context.",
        icon: Rabbit,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://coderabbit.ai",
        color: "text-emerald-500",
        bgGradient: "from-emerald-500/10 to-transparent",
        features: ["Auto-summaries", "Contextual Feedback", "Line-by-line Reviews"]
    },
    {
        slug: "cosine",
        title: "Cosine",
        description: "The AI code knowledge base for complex repositories.",
        icon: FileSearch,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://cosine.sh",
        color: "text-blue-500",
        bgGradient: "from-blue-500/10 to-transparent",
        features: ["Genie 2 Architecture", "Deep Semantic Search", "On-prem Isolation"]
    },
    {
        slug: "aider",
        title: "Aider",
        description: "Command-line AI pairing that edits code directly in your local files.",
        icon: Command,
        category: "Coding",
        pricing: "Free",
        websiteUrl: "https://aider.chat",
        color: "text-zinc-300",
        bgGradient: "from-zinc-500/10 to-transparent",
        features: ["CLI First", "Git-aware", "Multi-file Editing"]
    },
    {
        slug: "windsurf",
        title: "Windsurf",
        description: "The first agentic IDE that flows with you.",
        icon: Wind,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://codeium.com/windsurf",
        color: "text-cyan-400",
        bgGradient: "from-cyan-500/10 to-transparent",
        features: ["Flow State AI", "Deep Codebase Indexing", "Context-aware Thinking"]
    }
];
