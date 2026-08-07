export interface Stack {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    totalPrice: string;
    tags: string[];
    tools: string[]; // Tool slugs
    idealFor: string[];
    workflow: string[];
    icon: string;
    color: string;
    curatedBy?: {
        name: string;
        role: string;
        avatar?: string;
    };
    usedBy?: string; // e.g. "1,200+ Developers"
    shareCount?: number;
}

/**
 * Date of the last hand-edit to the curated stacks below. Drives sitemap
 * lastmod for /stack/* — bump it whenever this file's content changes.
 */
export const STACKS_REVISED = "2026-08-07";

export const stacks: Stack[] = [
    {
        id: "magic-wand",
        name: "The Magic Wand Stack",
        description: "Generate beautiful UI from text prompts without writing complex CSS.",
        longDescription: "The Magic Wand Stack pairs v0 by Vercel with Builder.io so you can go from a plain-English prompt to a working interface without hand-writing CSS or wiring up a component library from scratch. v0 turns a short description — \"a pricing page with three tiers and a toggle for monthly and yearly billing\" — into React components built on shadcn/ui and Tailwind, so the output already follows modern accessibility and responsive-design conventions instead of needing a cleanup pass. Builder.io picks up from there: it lets you visually rearrange, restyle, and extend what v0 generated, or start a section from its own visual editor and export the result as clean React, Vue, or plain HTML. Because both tools run in the browser, the loop from prompt to shippable component is short enough to use for real client work, not just throwaway demos — describe the section, generate it, drag a few elements around in Builder.io, and export. It's the fastest path in this directory from an idea to a UI you can deploy, which is why it's the default recommendation for beginners, freelancers building landing pages, and anyone validating an MVP before investing in a full design system.",
        totalPrice: "$0/mo",
        tags: ["UI Design", "No-Code", "Beginner", "Free"],
        tools: ["v0-by-vercel", "builder-io"],
        idealFor: ["Rapid prototyping", "Beginners", "MVPs", "Landing pages"],
        workflow: [
            "1. Describe your UI in natural language",
            "2. AI generates React components automatically",
            "3. Export clean, production-ready code",
            "4. Deploy with one click"
        ],
        icon: "🪄",
        color: "text-purple-500",
    },
    {
        id: "product-designer",
        name: "The Product Designer Stack",
        description: "Professional tools to convert Figma designs directly into production code.",
        longDescription: "For designers who want to ship. This stack bridges the gap between design and development, allowing seamless conversion from Figma to responsive web applications.",
        totalPrice: "$19+/mo",
        tags: ["UI Design", "Professional", "Figma", "Production"],
        tools: ["builder-io", "v0-by-vercel"],
        idealFor: ["Professional designers", "Design teams", "Agencies", "Production apps"],
        workflow: [
            "1. Design in Figma as usual",
            "2. Connect Builder.io to your Figma file",
            "3. Auto-generate responsive components",
            "4. Deploy to your preferred platform"
        ],
        icon: "🎨",
        color: "text-pink-500",
    },
    {
        id: "learner",
        name: "The Learner Stack",
        description: "Zero-setup environments that explain code as you write it.",
        longDescription: "The perfect starting point for anyone learning to code. Get instant explanations, suggestions, and real-time assistance in a fully cloud-based environment.",
        totalPrice: "$0/mo",
        tags: ["Learning", "Beginner", "Coding", "Free"],
        tools: ["cursor", "replit"],
        idealFor: ["Coding beginners", "Students", "Bootcamps", "Self-taught developers"],
        workflow: [
            "1. Open Replit - no setup required",
            "2. Start writing code with Cursor AI",
            "3. Get instant explanations as you learn",
            "4. Build and share projects instantly"
        ],
        icon: "📚",
        color: "text-green-500",
    },
    {
        id: "10x-engineer",
        name: "The 10x Engineer Stack",
        description: "Autonomous agents and massive context windows for maximum velocity.",
        longDescription: "For developers who want to move at maximum speed. This stack combines autonomous coding agents with smart project management to handle even the most complex workflows.",
        totalPrice: "$40+/mo",
        tags: ["Advanced", "Pro", "Autonomous", "Productivity"],
        tools: ["devin-ai", "supermaven", "linear"],
        idealFor: ["Senior developers", "Startups", "Complex projects", "Fast shipping"],
        workflow: [
            "1. Define tasks in Linear",
            "2. Devin AI handles implementation",
            "3. SuperMaven accelerates coding",
            "4. Deploy with confidence"
        ],
        icon: "🚀",
        color: "text-orange-500",
    },
    {
        id: "efficiency",
        name: "The Efficiency Stack",
        description: "Fast, free, and smart tools to speed up your workflow.",
        longDescription: "Balance speed and cost. This stack provides intelligent code completion and AI assistance without breaking the bank.",
        totalPrice: "$0/mo",
        tags: ["Productivity", "Free", "Smart", "Fast"],
        tools: ["supermaven", "cursor"],
        idealFor: ["Freelancers", "Side projects", "Budget-conscious", "Speed-focused"],
        workflow: [
            "1. Install Cursor IDE",
            "2. Enable SuperMaven autocomplete",
            "3. Get intelligent suggestions instantly",
            "4. Ship features faster"
        ],
        icon: "⚡",
        color: "text-yellow-500",
    },
    {
        id: "power-pair",
        name: "The Power Pair Stack",
        description: "GitHub Copilot and Gemini Code Assist run side by side in your IDE — Copilot's fast autocomplete paired with Gemini's long-context reasoning, both usable on their free tiers.",
        longDescription: "GitHub Copilot and Gemini Code Assist make an unusual power pair: both offer genuinely useful free tiers, so running them side by side costs nothing extra beyond the setup time. Copilot's strength is line-by-line autocomplete — it excels at predicting the next few tokens inside a function you're already writing, and its inline suggestions feel instant in VS Code, Visual Studio, and JetBrains IDEs. Gemini Code Assist covers the gap Copilot leaves: a much larger context window that can reason across an entire file or several open files at once, which makes it the better choice when you need to explain a confusing bug, plan a refactor that touches multiple functions, or ask \"why does this fail\" instead of \"what comes next.\" In practice, developers running this power pair let Copilot handle the moment-to-moment typing and switch to Gemini Code Assist's chat panel whenever a task needs broader reasoning, rather than picking one assistant to do everything. Because Copilot's free tier meters monthly completions and chat requests while Gemini Code Assist's free tier meters daily requests per user, the two rarely run out at the same time — most solo developers and small teams stay within both free tiers for regular day-to-day coding.",
        totalPrice: "$30+/mo",
        tags: ["Advanced", "Pro", "Reasoning", "Pair Programming"],
        tools: ["github-copilot", "gemini-code-assist"],
        idealFor: ["Professional developers", "Enterprise", "Complex logic", "Code reviews"],
        workflow: [
            "1. Install GitHub Copilot in your IDE and sign in with a GitHub account on its free tier",
            "2. Add the Gemini Code Assist extension and connect it to a Google account",
            "3. Let Copilot autocomplete routine lines as you type; open Gemini Code Assist's chat when a task needs multi-file reasoning or an explanation",
            "4. Use Gemini Code Assist to plan a refactor or debug a hard failure, then let Copilot handle the mechanical edits it suggests"
        ],
        icon: "🤝",
        color: "text-blue-500",
    },
    {
        id: "smart-assistant",
        name: "The Smart Assistant Stack",
        description: "High-intelligence chat and search models available for free.",
        longDescription: "Powerful AI without the cost. This stack combines Claude's advanced reasoning with Perplexity's web-aware search for comprehensive assistance.",
        totalPrice: "$0/mo",
        tags: ["Assistant", "Research", "Reasoning", "Free"],
        tools: ["claude", "perplexity"],
        idealFor: ["Research", "Learning", "Documentation", "General assistance"],
        workflow: [
            "1. Use Perplexity for web-aware search",
            "2. Deep-dive with Claude's reasoning",
            "3. Get code examples and explanations",
            "4. Combine insights for best results"
        ],
        icon: "🧠",
        color: "text-indigo-500",
    }
];

export function getStackById(id: string): Stack | undefined {
    return stacks.find(stack => stack.id === id);
}
