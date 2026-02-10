import { LucideIcon, Github, Palette, Wand2, Zap, Calendar, FileEdit, Video } from "lucide-react";
import {
    ChatGPTIcon, ClaudeIcon, GeminiIcon, Gemini3Icon, CursorIcon, DevinIcon,
    SupermavenIcon, OllamaIcon, LinearIcon, NotionIcon, ReplitIcon,
    TabnineIcon, CodyIcon, BuilderIoIcon, V0Icon, PerplexityIcon,
    LovableIcon, CodeRabbitIcon, CosineIcon, AiderIcon, WindsurfIcon,
    CopilotIcon,
    PiecesIcon, WarpIcon, ContinueIcon, StackBlitzIcon, CodeSandboxIcon,
    HuggingFaceIcon, DALLEIcon, ElevenLabsIcon, JasperIcon,
    CopyAiIcon, PoeIcon, PhindIcon, DescriptIcon,
    FigmaIcon, RunwayIcon, CanvaIcon, CharacterAiIcon, OtterIcon,
    FirefliesIcon, KrispIcon, ClickUpIcon, AsanaIcon,
    TrelloIcon, GrammarlyIcon, MemIcon, ReflectIcon
} from "@/components/icons/AiIcons";
import { ComponentType } from "react";

export interface Tool {
    slug: string;
    title: string;
    description: string;
    icon: LucideIcon | ComponentType<{ className?: string }>;
    category: "Coding" | "Management" | "Productivity" | "Assistance" | "Design" | "Other";
    pricing: "Free" | "Freemium" | "Paid" | "Enterprise";
    websiteUrl: string;
    affiliateUrl?: string;
    features?: string[];
    color: string;
    bgGradient: string;
    pros?: string[];
    cons?: string[];
    review?: {
        content: string;
        rating: number;
    };
    isFeatured?: boolean;
    adCopy?: string;
}

export const tools: Tool[] = [
    {
        slug: "chatgpt",
        title: "GPT-5.2",
        description: "Frontier AI model for complex reasoning. Industry-leading agent mode for multi-step workflows.",
        icon: ChatGPTIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://chat.openai.com",
        color: "text-emerald-600 dark:text-emerald-400",
        bgGradient: "from-emerald-500/10 to-transparent",
        features: ["GPT-5.2 Codex", "Stabilized Context", "xHigh Reasoning"],
        pros: ["Highest reasoning capabilities", "Massive ecosystem", "Versatile agent mode"],
        cons: ["Subscription required for best features", "Privacy concerns"],
        review: {
            content: "GPT-5.2 sets a new benchmark for AI agents. Its ability to solve complex multi-step problems is currently unmatched in the industry.",
            rating: 4.9
        }
    },
    {
        slug: "claude",
        title: "Claude by Anthropic",
        description: "Advanced AI assistant for nuanced tasks. 1M token context handles entire codebases in one session.",
        icon: ClaudeIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://claude.ai",
        color: "text-orange-600 dark:text-orange-400",
        bgGradient: "from-orange-500/10 to-transparent",
        features: ["Claude 5 Sonnet", "1M Context", "Agentic Capabilities"],
        pros: ["Natural writing style", "Huge 1M token context", "Excellent documentation handling"],
        cons: ["Usage limits on free tier", "API can be expensive"],
        review: {
            content: "Claude 5 is the preferred choice for long-form content and complex document analysis. Its 1M token context is a game changer for researchers.",
            rating: 4.8
        }
    },
    {
        slug: "gemini-code-assist",
        title: "Gemini 3 Pro",
        description: "Enterprise AI for cloud-native development. Multimodal understanding processes code, docs, and diagrams.",
        icon: Gemini3Icon,
        category: "Coding",
        pricing: "Paid",
        websiteUrl: "https://cloud.google.com/gemini/code-assist",
        color: "text-indigo-600 dark:text-indigo-400",
        bgGradient: "from-indigo-500/10 to-transparent",
        features: ["Gemini 3 Deep Think", "Native AV Processing", "1M Context"]
    },
    {
        slug: "cursor",
        title: "Cursor",
        description: "AI-native code editor that predicts your next move. Agent mode writes full features from prompts.",
        icon: CursorIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://cursor.sh",
        affiliateUrl: "https://cursor.sh",
        color: "text-blue-600 dark:text-blue-400",
        bgGradient: "from-blue-500/10 to-transparent",
        features: ["AI Chat", "Codebase Indexing", "Agent Mode"],
        isFeatured: true,
        adCopy: "Stop fighting your editor. Start flowing with Cursor's predictive coding."
    },
    {
        slug: "devin",
        title: "Devin",
        description: "Autonomous AI engineer that codes, debugs, and deploys. Works independently from planning to production.",
        icon: DevinIcon,
        category: "Coding",
        pricing: "Paid",
        websiteUrl: "https://devin.ai",
        color: "text-amber-600 dark:text-amber-500",
        bgGradient: "from-amber-500/10 to-transparent",
        features: ["Autonomous Coding", "Self-Healing", "Deployment"]
    },
    {
        slug: "supermaven",
        title: "Supermaven",
        description: "Ultra-fast code completion withsub-100ms latency. 1M token context sees your entire project.",
        icon: SupermavenIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://supermaven.com",
        color: "text-rose-600 dark:text-rose-400",
        bgGradient: "from-rose-500/10 to-transparent",
        features: ["1M Context Window", "Instant Completion", "Low Latency"]
    },
    {
        slug: "ollama",
        title: "Ollama",
        description: "Run powerful LLMs locally for full privacy. Supports Llama 3, Mistral, and custom models offline.",
        icon: OllamaIcon,
        category: "Other",
        pricing: "Free",
        websiteUrl: "https://ollama.com",
        color: "text-slate-900 dark:text-slate-100",
        bgGradient: "from-slate-500/10 to-transparent",
        features: ["Local Inference", "Privacy", "Llama 3 / Mistral Support"]
    },
    {
        slug: "github-copilot",
        title: "GitHub Copilot",
        description: "AI pair programmer from GitHub. Context-aware completions trained on billions of public repos.",
        icon: CopilotIcon,
        category: "Coding",
        pricing: "Paid",
        websiteUrl: "https://github.com/features/copilot",
        color: "text-slate-900 dark:text-slate-200",
        bgGradient: "from-slate-500/10 to-transparent",
        features: ["Autocomplete", "Copilot Workspace", "Pull Request Summaries"]
    },
    {
        slug: "linear",
        title: "Linear",
        description: "Issue tracker built for high-velocity teams. AI-powered triage and sprint planning.",
        icon: LinearIcon,
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://linear.app",
        // TODO: Add after Impact.com approval: affiliateUrl: "https://impact.com/...",
        color: "text-indigo-600 dark:text-indigo-400",
        bgGradient: "from-indigo-500/10 to-transparent",
        features: ["Issue Tracking", "Cycles", "Roadmaps"]
    },
    {
        slug: "notion-ai",
        title: "Notion AI",
        description: "All-in-one workspace for teams. AI writes, organizes, and searches your docs and wikis.",
        icon: NotionIcon,
        category: "Productivity",
        pricing: "Paid",
        websiteUrl: "https://notion.so",
        // TODO: Add after affiliate.notion.so approval: affiliateUrl: "https://affiliate.notion.so/vibestack",
        color: "text-amber-600 dark:text-amber-400",
        bgGradient: "from-amber-500/10 to-transparent",
        features: ["Writing Assistant", "Database AI", "Summarization"]
    },
    {
        slug: "replit-ai",
        title: "Replit AI",
        description: "Web-based IDE with instant collaboration. Ship projects without local setup, AI assistance included.",
        icon: ReplitIcon,
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
        description: "Privacy-first AI code assistant. Train on your private codebase, runs locally or in secure cloud.",
        icon: TabnineIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://tabnine.com",
        color: "text-purple-600 dark:text-purple-400",
        bgGradient: "from-purple-500/10 to-transparent",
        features: ["Private Codebase Training", "Local Mode", "Security"]
    },
    {
        slug: "cody",
        title: "Cody",
        description: "AI code assistant that adapts to your codebase. Deep context from files, git history, and dependencies.",
        icon: CodyIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://sourcegraph.com/cody",
        color: "text-violet-600 dark:text-violet-400",
        bgGradient: "from-violet-500/10 to-transparent",
        features: ["Codebase Search", "Context Awareness", "Unit Test Generation"]
    },
    {
        slug: "builder-io",
        title: "Builder.io",
        description: "Design-to-code platform for product teams. Import from Figma, generate production-ready components.",
        icon: BuilderIoIcon,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://builder.io",
        color: "text-green-600 dark:text-green-400",
        bgGradient: "from-green-500/10 to-transparent",
        features: ["Design to Code", "Visual CMS", "Figma Import"]
    },
    {
        slug: "v0",
        title: "v0",
        description: "Generate React UIs from text prompts. Built by Vercel, outputs shadcn/ui + Tailwind code.",
        icon: V0Icon,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://v0.dev",
        affiliateUrl: "https://v0.dev",
        color: "text-zinc-900 dark:text-zinc-400",
        bgGradient: "from-zinc-500/10 to-transparent",
        features: ["React Code Gen", "Shadcn UI", "Tailwind"],
        isFeatured: true,
        adCopy: "Ship beautiful UI in seconds with Vercel's generative interface engine."
    },
    {
        slug: "perplexity",
        title: "Perplexity",
        description: "AI-powered answer engine with real-time search. Cites sources for every claim, Pro mode for deep research.",
        icon: PerplexityIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://perplexity.ai",
        color: "text-teal-600 dark:text-teal-400",
        bgGradient: "from-teal-500/10 to-transparent",
        features: ["Real-time Search", "Citations", "Pro Search"]
    },
    {
        slug: "lovable",
        title: "Lovable",
        description: "Full-stack app builder with AI. Generates frontend, backend, and database from natural language.",
        icon: LovableIcon,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://lovable.dev",
        color: "text-pink-600 dark:text-pink-400",
        bgGradient: "from-pink-500/10 to-transparent",
        features: ["Full-stack Generation", "Supabase Integration", "Visual Editing"]
    },
    {
        slug: "coderabbit",
        title: "CodeRabbit",
        description: "AI code reviewer that catches bugs before production. Automated pull request analysis and suggestions.",
        icon: CodeRabbitIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://coderabbit.ai",
        color: "text-emerald-600 dark:text-emerald-500",
        bgGradient: "from-emerald-500/10 to-transparent",
        features: ["Auto-summaries", "Contextual Feedback", "Line-by-line Reviews"]
    },
    {
        slug: "cosine",
        title: "Cosine",
        description: "AI code intelligence for large repositories. Deep semantic search across millions of lines.",
        icon: CosineIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://cosine.sh",
        color: "text-blue-600 dark:text-blue-500",
        bgGradient: "from-blue-500/10 to-transparent",
        features: ["Genie 2 Architecture", "Deep Semantic Search", "On-prem Isolation"]
    },
    {
        slug: "aider",
        title: "Aider",
        description: "Terminal-based AI pair programmer. Edits multiple files, git-aware, works with any LLM.",
        icon: AiderIcon,
        category: "Coding",
        pricing: "Free",
        websiteUrl: "https://aider.chat",
        color: "text-zinc-900 dark:text-zinc-300",
        bgGradient: "from-zinc-500/10 to-transparent",
        features: ["CLI First", "Git-aware", "Multi-file Editing"]
    },
    {
        slug: "windsurf",
        title: "Windsurf",
        description: "Agentic IDE that anticipates your next move. Flow mode writes code while you describe the intent.",
        icon: WindsurfIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://codeium.com/windsurf",
        color: "text-cyan-600 dark:text-cyan-400",
        bgGradient: "from-cyan-500/10 to-transparent",
        features: ["Flow State AI", "Deep Codebase Indexing", "Context-aware Thinking"]
    },
    {
        slug: "pieces",
        title: "Pieces",
        description: "Code snippet manager with AI context. Remembers where you found code, auto-generates docs.",
        icon: PiecesIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://pieces.app",
        color: "text-yellow-600 dark:text-yellow-400",
        bgGradient: "from-yellow-500/10 to-transparent",
        features: ["Snippet Management", "AI Search", "Workflow Automation"]
    },
    {
        slug: "warp",
        title: "Warp",
        description: "Modern terminal with AI command search. Autocomplete for bash, remembers your history.",
        icon: WarpIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://warp.dev",
        color: "text-purple-600 dark:text-purple-500",
        bgGradient: "from-purple-500/10 to-transparent",
        features: ["AI Command Search", "Modern IDE Features", "Collaboration"]
    },
    {
        slug: "continue",
        title: "Continue",
        description: "Open-source copilot alternative. Self-host or use cloud, integrates with VS Code and JetBrains.",
        icon: ContinueIcon,
        category: "Coding",
        pricing: "Free",
        websiteUrl: "https://continue.dev",
        color: "text-green-600 dark:text-green-500",
        bgGradient: "from-green-500/10 to-transparent",
        features: ["Open Source", "Local Models", "Customizable"]
    },
    {
        slug: "stackblitz",
        title: "StackBlitz",
        description: "Instant dev environments in the browser. No setup, runs Node.js natively via WebContainers.",
        icon: StackBlitzIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://stackblitz.com",
        color: "text-blue-700 dark:text-blue-600",
        bgGradient: "from-blue-600/10 to-transparent",
        features: ["Browser IDE", "WebContainers", "Instant Preview"]
    },
    {
        slug: "codesandbox",
        title: "CodeSandbox",
        description: "Cloud IDE for web developers. Live collaboration, DevContainers, connects to GitHub.",
        icon: CodeSandboxIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://codesandbox.io",
        color: "text-pink-600 dark:text-pink-500",
        bgGradient: "from-pink-500/10 to-transparent",
        features: ["Live Collaboration", "DevContainers", "GitHub Integration"]
    },
    {
        slug: "huggingface",
        title: "Hugging Face",
        description: "Open-source AI model hub. 500K+ models, datasets, and apps. Run inference or fine-tune.",
        icon: HuggingFaceIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://huggingface.co",
        color: "text-yellow-600 dark:text-yellow-500",
        bgGradient: "from-yellow-500/10 to-transparent",
        features: ["Model Hub", "Transformers Library", "Inference API"]
    },
    {
        slug: "midjourney",
        title: "Midjourney",
        description: "Text-to-image AI for artists and designers. Photorealistic renders and artistic styles.",
        icon: Palette,
        category: "Design",
        pricing: "Paid",
        websiteUrl: "https://midjourney.com",
        color: "text-purple-400",
        bgGradient: "from-purple-400/10 to-transparent",
        features: ["Image Generation", "Artistic Styles", "High Resolution"]
    },
    {
        slug: "dalle",
        title: "DALL-E 3",
        description: "OpenAI's image generator integrated with ChatGPT. Highly accurate text rendering in images.",
        icon: DALLEIcon,
        category: "Design",
        pricing: "Paid",
        websiteUrl: "https://openai.com/dall-e-3",
        color: "text-emerald-600 dark:text-emerald-400",
        bgGradient: "from-emerald-400/10 to-transparent",
        features: ["Text-to-Image", "ChatGPT Integration", "High Quality"]
    },
    {
        slug: "elevenlabs",
        title: "ElevenLabs",
        description: "AI voice synthesis with emotion control. Clone voices, support 29 languages, broadcast quality.",
        icon: ElevenLabsIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://elevenlabs.io",
        color: "text-indigo-600 dark:text-indigo-400",
        bgGradient: "from-indigo-400/10 to-transparent",
        features: ["Voice Cloning", "Multilingual", "Emotional Speech"]
    },
    {
        slug: "gamma",
        title: "Gamma",
        description: "AI presentation builder for modern teams. Generates slides from prompts, publish as website.",
        icon: Wand2,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://gamma.app",
        color: "text-violet-600 dark:text-violet-500",
        bgGradient: "from-violet-500/10 to-transparent",
        features: ["AI Presentation", "Document Creation", "Web Publishing"]
    },
    {
        slug: "jasper",
        title: "Jasper",
        description: "Enterprise AI writing platform for marketers. Brand voice consistency, SEO optimization built-in.",
        icon: JasperIcon,
        category: "Assistance",
        pricing: "Paid",
        websiteUrl: "https://jasper.ai",
        // TODO: Add after jasper.ai/affiliates approval: affiliateUrl: "https://jasper.ai/affiliate/vibestack",
        color: "text-red-600 dark:text-red-500",
        bgGradient: "from-red-500/10 to-transparent",
        features: ["Marketing Copy", "Brand Voice", "SEO Optimization"]
    },
    {
        slug: "copyai",
        title: "Copy.ai",
        description: "AI copywriter for marketing teams. Email templates, social posts, ad copy in seconds.",
        icon: CopyAiIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://copy.ai",
        color: "text-blue-400",
        bgGradient: "from-blue-400/10 to-transparent",
        features: ["Marketing Copy", "Email Templates", "Social Media"]
    },
    {
        slug: "poe",
        title: "Poe",
        description: "Multi-model AI platform from Quora. Chat with GPT-4, Claude, Llama in one interface.",
        icon: PoeIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://poe.com",
        color: "text-orange-500",
        bgGradient: "from-orange-500/10 to-transparent",
        features: ["Multiple Models", "Custom Bots", "API Access"]
    },
    {
        slug: "phind",
        title: "Phind",
        description: "AI search engine for developers. Instant answers with code examples, cites documentation.",
        icon: PhindIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://phind.com",
        color: "text-cyan-600 dark:text-cyan-500",
        bgGradient: "from-cyan-500/10 to-transparent",
        features: ["Developer Search", "Code Examples", "Technical Answers"]
    },
    {
        slug: "descript",
        title: "Descript",
        description: "Video and podcast editor with text-based editing. Transcribe, edit like a doc, AI voices.",
        icon: DescriptIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://descript.com",
        // TODO: Add after descript.com/affiliates approval: affiliateUrl: "https://www.descript.com/affiliate/vibestack",
        color: "text-blue-500 dark:text-blue-300",
        bgGradient: "from-blue-300/10 to-transparent",
        features: ["Video Editing", "Transcription", "Overdub"]
    },
    {
        slug: "raycast",
        title: "Raycast",
        description: "Productivity launcher for macOS with AI. Command palette, window management, AI chat.",
        icon: Zap,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://raycast.com",
        color: "text-red-600 dark:text-red-400",
        bgGradient: "from-red-400/10 to-transparent",
        features: ["Quick Launcher", "AI Commands", "Extensions"]
    },
    {
        slug: "figma-ai",
        title: "Figma AI",
        description: "AI design automation in Figma. Auto layout suggestions, content generation, design system management.",
        icon: FigmaIcon,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://figma.com/ai",
        color: "text-purple-700 dark:text-purple-600",
        bgGradient: "from-purple-600/10 to-transparent",
        features: ["Auto Layout", "Content Generation", "Design Systems"]
    },
    {
        slug: "runway",
        title: "Runway",
        description: "AI video generation and editing. Text-to-video, motion tracking, green screen removal.",
        icon: RunwayIcon,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://runwayml.com",
        color: "text-pink-700 dark:text-pink-600",
        bgGradient: "from-pink-600/10 to-transparent",
        features: ["Video Generation", "Motion Graphics", "Green Screen"]
    },
    {
        slug: "canva-ai",
        title: "Canva AI",
        description: "Design tool for non-designers. Magic Design creates layouts, Text-to-Image for custom graphics.",
        icon: CanvaIcon,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://canva.com",
        // TODO: Add after canva.com/affiliates approval: affiliateUrl: "https://www.canva.com/affiliates/vibestack",
        color: "text-teal-600 dark:text-teal-500",
        bgGradient: "from-teal-500/10 to-transparent",
        features: ["Magic Design", "Text to Image", "Brand Kit"]
    },
    {
        slug: "character-ai",
        title: "Character.ai",
        description: "Interactive AI chatbots with personalities. Create custom characters or chat with community-made ones.",
        icon: CharacterAiIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://character.ai",
        color: "text-amber-600 dark:text-amber-400",
        bgGradient: "from-amber-400/10 to-transparent",
        features: ["AI Characters", "Conversations", "Custom Personalities"]
    },
    {
        slug: "otter-ai",
        title: "Otter.ai",
        description: "AI meeting assistant that transcribes in real-time. Search past meetings, share highlights.",
        icon: OtterIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://otter.ai",
        color: "text-blue-800 dark:text-blue-700",
        bgGradient: "from-blue-700/10 to-transparent",
        features: ["Meeting Transcription", "Live Notes", "Action Items"]
    },
    {
        slug: "fireflies",
        title: "Fireflies.ai",
        description: "Voice conversation AI for teams. Join meetings, transcribe, extract action items automatically.",
        icon: FirefliesIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://fireflies.ai",
        color: "text-orange-700 dark:text-orange-600",
        bgGradient: "from-orange-600/10 to-transparent",
        features: ["Meeting Recording", "Conversation Intelligence", "CRM Integration"]
    },
    {
        slug: "krisp",
        title: "Krisp",
        description: "AI noise cancellation for crystal-clear calls. Removes background noise, echo, and accents.",
        icon: KrispIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://krisp.ai",
        color: "text-green-700 dark:text-green-600",
        bgGradient: "from-green-600/10 to-transparent",
        features: ["Noise Cancellation", "Voice Cancellation", "Accent Localization"]
    },
    {
        slug: "motion",
        title: "Motion",
        description: "AI calendar that auto-schedules tasks. Prioritizes work, blocks focus time, moves meetings.",
        icon: Calendar,
        category: "Management",
        pricing: "Paid",
        websiteUrl: "https://usemotion.com",
        color: "text-indigo-700 dark:text-indigo-600",
        bgGradient: "from-indigo-600/10 to-transparent",
        features: ["Auto-scheduling", "Task Management", "Calendar Integration"]
    },
    {
        slug: "clickup",
        title: "ClickUp",
        description: "Project management hub for teams. AI writes docs, summarizes tasks, auto-assigns work.",
        icon: ClickUpIcon,
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://clickup.com",
        // TODO: Add after clickup.com/partners/affiliates approval: affiliateUrl: "https://clickup.com/affiliates/vibestack",
        color: "text-purple-800 dark:text-purple-700",
        bgGradient: "from-purple-700/10 to-transparent",
        features: ["Task Management", "Docs", "AI Writing"]
    },
    {
        slug: "asana",
        title: "Asana",
        description: "Work management for teams at scale. AI suggests workflows, predicts risks, auto-updates status.",
        icon: AsanaIcon,
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://asana.com",
        // TODO: Add after Impact.com approval: affiliateUrl: "https://impact.com/asana/vibestack",
        color: "text-red-700 dark:text-red-600",
        bgGradient: "from-red-600/10 to-transparent",
        features: ["Project Management", "AI Workflows", "Goal Tracking"]
    },
    {
        slug: "trello",
        title: "Trello",
        description: "Visual Kanban boards with automation. Butler AI automates repetitive tasks, integrates with apps.",
        icon: TrelloIcon,
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://trello.com",
        color: "text-blue-600 dark:text-blue-500",
        bgGradient: "from-blue-500/10 to-transparent",
        features: ["Kanban Boards", "Automation", "Power-Ups"]
    },
    {
        slug: "grammarly",
        title: "Grammarly",
        description: "AI writing assistant for grammar and style. Real-time corrections, tone adjustments, plagiarism detection.",
        icon: GrammarlyIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://grammarly.com",
        // TODO: Add after grammarly.com/affiliates approval: affiliateUrl: "https://www.grammarly.com/affiliates/vibestack",
        color: "text-green-600 dark:text-green-500",
        bgGradient: "from-green-500/10 to-transparent",
        features: ["Grammar Check", "Tone Detection", "Plagiarism Detection"]
    },
    {
        slug: "quillbot",
        title: "QuillBot",
        description: "AI paraphrasing tool for writers. Reword text, check grammar, summarize long documents.",
        icon: FileEdit,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://quillbot.com",
        color: "text-teal-600 dark:text-teal-400",
        bgGradient: "from-teal-400/10 to-transparent",
        features: ["Paraphrasing", "Grammar Checker", "Summarizer"]
    },
    {
        slug: "lumen5",
        title: "Lumen5",
        description: "Turn blog posts into videos with AI. Auto-generates scenes, picks media, adds music.",
        icon: Video,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://lumen5.com",
        color: "text-purple-600 dark:text-purple-500",
        bgGradient: "from-purple-500/10 to-transparent",
        features: ["Blog to Video", "Media Library", "Brand Templates"]
    },
    {
        slug: "synthesia",
        title: "Synthesia",
        description: "AI video with virtual presenters. Text-to-video in 120+ languages, no camera needed.",
        icon: Video,
        category: "Design",
        pricing: "Paid",
        websiteUrl: "https://synthesia.io",
        color: "text-blue-600 dark:text-blue-400",
        bgGradient: "from-blue-400/10 to-transparent",
        features: ["AI Avatars", "Text to Video", "Multiple Languages"]
    },
    {
        slug: "mem",
        title: "Mem",
        description: "Self-organizing notes with AI. Auto-tags, connects ideas, surfaces relevant notes when you write.",
        icon: MemIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://mem.ai",
        color: "text-purple-600 dark:text-purple-400",
        bgGradient: "from-purple-400/10 to-transparent",
        features: ["AI Search", "Smart Collections", "Self-organizing"]
    },
    {
        slug: "reflect",
        title: "Reflect",
        description: "Networked notes with AI assistance. Backlinks connect thoughts, encrypted for privacy.",
        icon: ReflectIcon,
        category: "Productivity",
        pricing: "Paid",
        websiteUrl: "https://reflect.app",
        color: "text-indigo-600 dark:text-indigo-500",
        bgGradient: "from-indigo-500/10 to-transparent",
        features: ["AI Assistant", "Backlinks", "End-to-end Encryption"]
    }
];
