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

export const stacks: Stack[] = [
    {
        id: "magic-wand",
        name: "The Magic Wand Stack",
        description: "Generate beautiful UI from text prompts without writing complex CSS.",
        longDescription: "Perfect for beginners and rapid prototyping. This stack combines the power of AI-generated UI with component-based development. Transform your ideas into production-ready interfaces in minutes.",
        totalPrice: "$0/mo",
        tags: ["UI Design", "No-Code", "Beginner", "Free"],
        tools: ["v0", "builder-io"],
        idealFor: ["Rapid prototyping", "Beginners", "MVPs", "Landing pages"],
        workflow: [
            "1. Describe your UI in natural language",
            "2. AI generates React components automatically",
            "3. Export clean, production-ready code",
            "4. Deploy with one click"
        ],
        icon: "🪄",
        color: "text-purple-500",
        curatedBy: {
            name: "Sarah Chen",
            role: "Product Designer @ TechFlow"
        },
        usedBy: "2,400+ Designers",
        shareCount: 1240
    },
    {
        id: "product-designer",
        name: "The Product Designer Stack",
        description: "Professional tools to convert Figma designs directly into production code.",
        longDescription: "For designers who want to ship. This stack bridges the gap between design and development, allowing seamless conversion from Figma to responsive web applications.",
        totalPrice: "$19+/mo",
        tags: ["UI Design", "Professional", "Figma", "Production"],
        tools: ["builder-io", "v0"],
        idealFor: ["Professional designers", "Design teams", "Agencies", "Production apps"],
        workflow: [
            "1. Design in Figma as usual",
            "2. Connect Builder.io to your Figma file",
            "3. Auto-generate responsive components",
            "4. Deploy to your preferred platform"
        ],
        icon: "🎨",
        color: "text-pink-500",
        curatedBy: {
            name: "Alex Rivera",
            role: "Senior UX Engineer"
        },
        usedBy: "850+ Pro Teams",
        shareCount: 856
    },
    {
        id: "learner",
        name: "The Learner Stack",
        description: "Zero-setup environments that explain code as you write it.",
        longDescription: "The perfect starting point for anyone learning to code. Get instant explanations, suggestions, and real-time assistance in a fully cloud-based environment.",
        totalPrice: "$0/mo",
        tags: ["Learning", "Beginner", "Coding", "Free"],
        tools: ["cursor", "replit-ai"],
        idealFor: ["Coding beginners", "Students", "Bootcamps", "Self-taught developers"],
        workflow: [
            "1. Open Replit - no setup required",
            "2. Start writing code with Cursor AI",
            "3. Get instant explanations as you learn",
            "4. Build and share projects instantly"
        ],
        icon: "📚",
        color: "text-green-500",
        curatedBy: {
            name: "David Park",
            role: "Coding Boothcamp Instructor"
        },
        usedBy: "5,000+ Students",
        shareCount: 3420
    },
    {
        id: "10x-engineer",
        name: "The 10x Engineer Stack",
        description: "Autonomous agents and massive context windows for maximum velocity.",
        longDescription: "For developers who want to move at maximum speed. This stack combines autonomous coding agents with smart project management to handle even the most complex workflows.",
        totalPrice: "$40+/mo",
        tags: ["Advanced", "Pro", "Autonomous", "Productivity"],
        tools: ["devin", "supermaven", "linear"],
        idealFor: ["Senior developers", "Startups", "Complex projects", "Fast shipping"],
        workflow: [
            "1. Define tasks in Linear",
            "2. Devin AI handles implementation",
            "3. SuperMaven accelerates coding",
            "4. Deploy with confidence"
        ],
        icon: "🚀",
        color: "text-orange-500",
        curatedBy: {
            name: "James Wilson",
            role: "CTO @ FastShip"
        },
        usedBy: "1,100+ Senior Devs",
        shareCount: 2100
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
        curatedBy: {
            name: "Maria Garcia",
            role: "Indie Hacker"
        },
        usedBy: "1,500+ Freelancers",
        shareCount: 1890
    },
    {
        id: "power-pair",
        name: "The Power Pair Stack",
        description: "The smartest reasoning models integrated directly into your IDE.",
        longDescription: "Combine the best of two worlds. This stack pairs Google's advanced reasoning with GitHub's deep code understanding for unparalleled development experience.",
        totalPrice: "$30+/mo",
        tags: ["Advanced", "Pro", "Reasoning", "Pair Programming"],
        tools: ["github-copilot", "gemini-code-assist"],
        idealFor: ["Professional developers", "Enterprise", "Complex logic", "Code reviews"],
        workflow: [
            "1. Install GitHub Copilot in your IDE",
            "2. Add Gemini Code Assist for reasoning",
            "3. Get context-aware suggestions",
            "4. Review and refine with AI assistance"
        ],
        icon: "🤝",
        color: "text-blue-500",
        curatedBy: {
            name: "Ken Thompson",
            role: "Staff Engineer"
        },
        usedBy: "900+ Enterprise Devs",
        shareCount: 670
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
        curatedBy: {
            name: "Dr. Emily Chen",
            role: "AI Researcher"
        },
        usedBy: "10,000+ Researchers",
        shareCount: 5400
    }
];

export function getStackById(id: string): Stack | undefined {
    return stacks.find(stack => stack.id === id);
}
