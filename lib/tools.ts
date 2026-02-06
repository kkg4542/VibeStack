import { LucideIcon, Github, Palette, Wand2, Zap, Calendar, FileEdit, Video } from "lucide-react";
import {
    ChatGPTIcon, ClaudeIcon, GeminiIcon, CursorIcon, DevinIcon,
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
        description: "The new standard for agentic AI.",
        icon: ChatGPTIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://chat.openai.com",
        color: "text-emerald-400",
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
        description: "Just released: The new apex of reasoning.",
        icon: ClaudeIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://claude.ai",
        color: "text-orange-400",
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
        description: "Native multimodal reasoning at scale.",
        icon: GeminiIcon,
        category: "Coding",
        pricing: "Paid",
        websiteUrl: "https://cloud.google.com/gemini/code-assist",
        color: "text-sky-400",
        bgGradient: "from-sky-500/10 to-transparent",
        features: ["Gemini 3 Deep Think", "Native AV Processing", "1M Context"]
    },
    {
        slug: "cursor",
        title: "Cursor",
        description: "The AI-first code editor built for speed.",
        icon: CursorIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://cursor.sh",
        affiliateUrl: "https://cursor.sh",
        color: "text-blue-400",
        bgGradient: "from-blue-500/10 to-transparent",
        features: ["AI Chat", "Codebase Indexing", "Agent Mode"],
        isFeatured: true,
        adCopy: "Stop fighting your editor. Start flowing with Cursor's predictive coding."
    },
    {
        slug: "devin",
        title: "Devin",
        description: "The first autonomous AI software engineer.",
        icon: DevinIcon,
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
        icon: SupermavenIcon,
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
        description: "Your AI pair programmer.",
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
        description: "Project management for high-performance teams.",
        icon: LinearIcon,
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
        icon: NotionIcon,
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
        description: "AI code assistant associated with privacy and security.",
        icon: TabnineIcon,
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
        icon: CodyIcon,
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
        icon: BuilderIoIcon,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://builder.io",
        color: "text-green-400",
        bgGradient: "from-green-500/10 to-transparent",
        features: ["Design to Code", "Visual CMS", "Figma Import"]
    },
    {
        slug: "v0",
        title: "v0",
        description: "Generate UI with simple text prompts.",
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
        description: "Where knowledge begins.",
        icon: PerplexityIcon,
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
        icon: LovableIcon,
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
        icon: CodeRabbitIcon,
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
        icon: CosineIcon,
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
        description: "The first agentic IDE that flows with you.",
        icon: WindsurfIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://codeium.com/windsurf",
        color: "text-cyan-400",
        bgGradient: "from-cyan-500/10 to-transparent",
        features: ["Flow State AI", "Deep Codebase Indexing", "Context-aware Thinking"]
    },
    {
        slug: "pieces",
        title: "Pieces",
        description: "AI-enabled code snippet manager that saves and searches your code.",
        icon: PiecesIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://pieces.app",
        color: "text-yellow-400",
        bgGradient: "from-yellow-500/10 to-transparent",
        features: ["Snippet Management", "AI Search", "Workflow Automation"]
    },
    {
        slug: "warp",
        title: "Warp",
        description: "The AI-powered terminal for the 21st century.",
        icon: WarpIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://warp.dev",
        color: "text-purple-500",
        bgGradient: "from-purple-500/10 to-transparent",
        features: ["AI Command Search", "Modern IDE Features", "Collaboration"]
    },
    {
        slug: "continue",
        title: "Continue",
        description: "Open-source autopilot for software development in VS Code.",
        icon: ContinueIcon,
        category: "Coding",
        pricing: "Free",
        websiteUrl: "https://continue.dev",
        color: "text-green-500",
        bgGradient: "from-green-500/10 to-transparent",
        features: ["Open Source", "Local Models", "Customizable"]
    },
    {
        slug: "stackblitz",
        title: "StackBlitz",
        description: "Instant dev environments that run in your browser.",
        icon: StackBlitzIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://stackblitz.com",
        color: "text-blue-600",
        bgGradient: "from-blue-600/10 to-transparent",
        features: ["Browser IDE", "WebContainers", "Instant Preview"]
    },
    {
        slug: "codesandbox",
        title: "CodeSandbox",
        description: "Cloud development platform for rapid web development.",
        icon: CodeSandboxIcon,
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://codesandbox.io",
        color: "text-pink-500",
        bgGradient: "from-pink-500/10 to-transparent",
        features: ["Live Collaboration", "DevContainers", "GitHub Integration"]
    },
    {
        slug: "huggingface",
        title: "Hugging Face",
        description: "The AI community building the future with open-source models.",
        icon: HuggingFaceIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://huggingface.co",
        color: "text-yellow-500",
        bgGradient: "from-yellow-500/10 to-transparent",
        features: ["Model Hub", "Transformers Library", "Inference API"]
    },
    {
        slug: "midjourney",
        title: "Midjourney",
        description: "AI-powered image generation from text descriptions.",
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
        description: "Create realistic images and art from text descriptions by OpenAI.",
        icon: DALLEIcon,
        category: "Design",
        pricing: "Paid",
        websiteUrl: "https://openai.com/dall-e-3",
        color: "text-emerald-400",
        bgGradient: "from-emerald-400/10 to-transparent",
        features: ["Text-to-Image", "ChatGPT Integration", "High Quality"]
    },
    {
        slug: "elevenlabs",
        title: "ElevenLabs",
        description: "Realistic AI voice generator with emotional range.",
        icon: ElevenLabsIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://elevenlabs.io",
        color: "text-indigo-400",
        bgGradient: "from-indigo-400/10 to-transparent",
        features: ["Voice Cloning", "Multilingual", "Emotional Speech"]
    },
    {
        slug: "gamma",
        title: "Gamma",
        description: "Create beautiful presentations, documents, and webpages with AI.",
        icon: Wand2,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://gamma.app",
        color: "text-violet-500",
        bgGradient: "from-violet-500/10 to-transparent",
        features: ["AI Presentation", "Document Creation", "Web Publishing"]
    },
    {
        slug: "jasper",
        title: "Jasper",
        description: "AI content platform for marketing teams and enterprises.",
        icon: JasperIcon,
        category: "Assistance",
        pricing: "Paid",
        websiteUrl: "https://jasper.ai",
        color: "text-red-500",
        bgGradient: "from-red-500/10 to-transparent",
        features: ["Marketing Copy", "Brand Voice", "SEO Optimization"]
    },
    {
        slug: "copyai",
        title: "Copy.ai",
        description: "AI-powered copywriting tool for marketing and sales.",
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
        description: "Platform for AI chatbots from Quora. Access multiple AI models.",
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
        description: "AI search engine for developers with instant answers.",
        icon: PhindIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://phind.com",
        color: "text-cyan-500",
        bgGradient: "from-cyan-500/10 to-transparent",
        features: ["Developer Search", "Code Examples", "Technical Answers"]
    },
    {
        slug: "descript",
        title: "Descript",
        description: "All-in-one video and podcast editing with AI.",
        icon: DescriptIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://descript.com",
        color: "text-blue-300",
        bgGradient: "from-blue-300/10 to-transparent",
        features: ["Video Editing", "Transcription", "Overdub"]
    },
    {
        slug: "raycast",
        title: "Raycast",
        description: "Blazingly fast, totally extendable launcher with AI.",
        icon: Zap,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://raycast.com",
        color: "text-red-400",
        bgGradient: "from-red-400/10 to-transparent",
        features: ["Quick Launcher", "AI Commands", "Extensions"]
    },
    {
        slug: "figma-ai",
        title: "Figma AI",
        description: "AI features built into Figma for design automation.",
        icon: FigmaIcon,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://figma.com/ai",
        color: "text-purple-600",
        bgGradient: "from-purple-600/10 to-transparent",
        features: ["Auto Layout", "Content Generation", "Design Systems"]
    },
    {
        slug: "runway",
        title: "Runway",
        description: "AI-powered video editing and generation platform.",
        icon: RunwayIcon,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://runwayml.com",
        color: "text-pink-600",
        bgGradient: "from-pink-600/10 to-transparent",
        features: ["Video Generation", "Motion Graphics", "Green Screen"]
    },
    {
        slug: "canva-ai",
        title: "Canva AI",
        description: "AI-powered design tools for everyone.",
        icon: CanvaIcon,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://canva.com",
        color: "text-teal-500",
        bgGradient: "from-teal-500/10 to-transparent",
        features: ["Magic Design", "Text to Image", "Brand Kit"]
    },
    {
        slug: "character-ai",
        title: "Character.ai",
        description: "Chat with AI characters and create your own.",
        icon: CharacterAiIcon,
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://character.ai",
        color: "text-amber-400",
        bgGradient: "from-amber-400/10 to-transparent",
        features: ["AI Characters", "Conversations", "Custom Personalities"]
    },
    {
        slug: "otter-ai",
        title: "Otter.ai",
        description: "AI meeting assistant that records and transcribes.",
        icon: OtterIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://otter.ai",
        color: "text-blue-700",
        bgGradient: "from-blue-700/10 to-transparent",
        features: ["Meeting Transcription", "Live Notes", "Action Items"]
    },
    {
        slug: "fireflies",
        title: "Fireflies.ai",
        description: "AI assistant for meetings and voice conversations.",
        icon: FirefliesIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://fireflies.ai",
        color: "text-orange-600",
        bgGradient: "from-orange-600/10 to-transparent",
        features: ["Meeting Recording", "Conversation Intelligence", "CRM Integration"]
    },
    {
        slug: "krisp",
        title: "Krisp",
        description: "AI-powered noise cancellation for calls.",
        icon: KrispIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://krisp.ai",
        color: "text-green-600",
        bgGradient: "from-green-600/10 to-transparent",
        features: ["Noise Cancellation", "Voice Cancellation", "Accent Localization"]
    },
    {
        slug: "motion",
        title: "Motion",
        description: "AI-powered productivity and calendar assistant.",
        icon: Calendar,
        category: "Management",
        pricing: "Paid",
        websiteUrl: "https://usemotion.com",
        color: "text-indigo-600",
        bgGradient: "from-indigo-600/10 to-transparent",
        features: ["Auto-scheduling", "Task Management", "Calendar Integration"]
    },
    {
        slug: "clickup",
        title: "ClickUp",
        description: "All-in-one productivity platform with AI features.",
        icon: ClickUpIcon,
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://clickup.com",
        color: "text-purple-700",
        bgGradient: "from-purple-700/10 to-transparent",
        features: ["Task Management", "Docs", "AI Writing"]
    },
    {
        slug: "asana",
        title: "Asana",
        description: "Work management platform with AI assistant.",
        icon: AsanaIcon,
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://asana.com",
        color: "text-red-600",
        bgGradient: "from-red-600/10 to-transparent",
        features: ["Project Management", "AI Workflows", "Goal Tracking"]
    },
    {
        slug: "trello",
        title: "Trello",
        description: "Visual collaboration tool with AI capabilities.",
        icon: TrelloIcon,
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://trello.com",
        color: "text-blue-500",
        bgGradient: "from-blue-500/10 to-transparent",
        features: ["Kanban Boards", "Automation", "Power-Ups"]
    },
    {
        slug: "grammarly",
        title: "Grammarly",
        description: "AI writing assistant for clear communication.",
        icon: GrammarlyIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://grammarly.com",
        color: "text-green-500",
        bgGradient: "from-green-500/10 to-transparent",
        features: ["Grammar Check", "Tone Detection", "Plagiarism Detection"]
    },
    {
        slug: "quillbot",
        title: "QuillBot",
        description: "AI paraphrasing and writing tool.",
        icon: FileEdit,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://quillbot.com",
        color: "text-teal-400",
        bgGradient: "from-teal-400/10 to-transparent",
        features: ["Paraphrasing", "Grammar Checker", "Summarizer"]
    },
    {
        slug: "lumen5",
        title: "Lumen5",
        description: "AI-powered video creation platform.",
        icon: Video,
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://lumen5.com",
        color: "text-purple-500",
        bgGradient: "from-purple-500/10 to-transparent",
        features: ["Blog to Video", "Media Library", "Brand Templates"]
    },
    {
        slug: "synthesia",
        title: "Synthesia",
        description: "AI video creation with virtual avatars.",
        icon: Video,
        category: "Design",
        pricing: "Paid",
        websiteUrl: "https://synthesia.io",
        color: "text-blue-400",
        bgGradient: "from-blue-400/10 to-transparent",
        features: ["AI Avatars", "Text to Video", "Multiple Languages"]
    },
    {
        slug: "mem",
        title: "Mem",
        description: "AI-powered notes and knowledge management.",
        icon: MemIcon,
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://mem.ai",
        color: "text-purple-400",
        bgGradient: "from-purple-400/10 to-transparent",
        features: ["AI Search", "Smart Collections", "Self-organizing"]
    },
    {
        slug: "reflect",
        title: "Reflect",
        description: "AI-powered note-taking app with backlinking.",
        icon: ReflectIcon,
        category: "Productivity",
        pricing: "Paid",
        websiteUrl: "https://reflect.app",
        color: "text-indigo-500",
        bgGradient: "from-indigo-500/10 to-transparent",
        features: ["AI Assistant", "Backlinks", "End-to-end Encryption"]
    }
];
