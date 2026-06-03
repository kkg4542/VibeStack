/**
 * Batch 2 — 18 new tools (30 → 48), big-brand focus, filling the
 * Productivity / Management category gaps.
 *
 * Idempotent: uses upsert keyed on slug, so re-running overwrites the
 * basic fields without creating duplicates. Extended editorial content
 * (overviewHtml, useCases, faq, etc.) is added separately after the
 * schema migration in Stage 1.
 *
 * Run:
 *   npx tsx scripts/seed_tools_batch2.ts
 *
 * Distribution after this batch:
 *   Coding 17 · Productivity 8 · Design 8 · Management 6 · Assistance 6 · Other 3
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const newTools = [
    // ───────────────────────── Productivity (+7) ─────────────────────────
    {
        slug: "microsoft-365-copilot",
        title: "Microsoft 365 Copilot",
        description:
            "AI assistant woven into Word, Excel, PowerPoint, Outlook, and Teams that drafts, summarizes, and analyzes across your work.",
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://www.microsoft.com/microsoft-365/copilot",
        color: "text-blue-500",
        bgGradient: "from-blue-500/20 to-sky-600/20",
        features: ["Office-wide AI", "Email & meeting summaries", "Excel data analysis", "Teams recap"],
        pros: ["Deep Office integration", "Works on your real documents", "Enterprise-grade security"],
        cons: ["Requires M365 subscription + add-on", "Output quality varies by app"],
        isFeatured: false,
        tier: "premium",
    },
    {
        slug: "grammarly",
        title: "Grammarly",
        description:
            "AI writing assistant that checks grammar, tone, and clarity across the web, with generative drafting and rewriting built in.",
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://www.grammarly.com",
        color: "text-emerald-500",
        bgGradient: "from-emerald-500/20 to-green-600/20",
        features: ["Grammar & spelling", "Tone detection", "Generative rewrite", "Works everywhere"],
        pros: ["Ubiquitous browser integration", "Strong free tier", "Catches subtle tone issues"],
        cons: ["Best features are paid", "Suggestions can be over-eager"],
        isFeatured: false,
        tier: "free",
    },
    {
        slug: "gamma",
        title: "Gamma",
        description:
            "Generate polished presentations, documents, and webpages from a prompt, then refine them with an AI-native editor.",
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://gamma.app",
        color: "text-violet-500",
        bgGradient: "from-violet-500/20 to-purple-600/20",
        features: ["Prompt-to-deck", "AI-native editing", "One-click themes", "Web publishing"],
        pros: ["Fast first drafts", "Good-looking defaults", "No slide-fiddling"],
        cons: ["Less control than PowerPoint", "Templated look at scale"],
        isFeatured: false,
        tier: "free",
    },
    {
        slug: "otter-ai",
        title: "Otter.ai",
        description:
            "Real-time meeting transcription and AI notes that capture action items, summaries, and searchable conversation history.",
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://otter.ai",
        color: "text-sky-500",
        bgGradient: "from-sky-500/20 to-blue-600/20",
        features: ["Live transcription", "AI meeting summary", "Action item capture", "Calendar sync"],
        pros: ["Accurate transcription", "Joins meetings automatically", "Searchable archive"],
        cons: ["Free tier minute limits", "Accuracy drops with heavy accents"],
        isFeatured: false,
        tier: "free",
    },
    {
        slug: "zoom-ai-companion",
        title: "Zoom AI Companion",
        description:
            "Zoom's built-in AI that summarizes meetings, drafts follow-ups, and answers questions about what you missed.",
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://www.zoom.com/en/ai-assistant/",
        color: "text-blue-500",
        bgGradient: "from-blue-500/20 to-indigo-600/20",
        features: ["Meeting summary", "Catch-me-up", "Smart compose", "Whiteboard generation"],
        pros: ["Included with paid Zoom", "Zero setup", "Good in-meeting recall"],
        cons: ["Only inside Zoom ecosystem", "Summaries miss nuance"],
        isFeatured: false,
        tier: "free",
    },
    {
        slug: "slack-ai",
        title: "Slack AI",
        description:
            "AI inside Slack that summarizes channels and threads, recaps what you missed, and answers questions from your workspace history.",
        category: "Productivity",
        pricing: "Paid",
        websiteUrl: "https://slack.com/features/ai",
        color: "text-fuchsia-500",
        bgGradient: "from-fuchsia-500/20 to-purple-600/20",
        features: ["Channel summaries", "Thread recap", "Workspace search AI", "Daily digests"],
        pros: ["Cuts channel overload", "Answers from real history", "Native to Slack"],
        cons: ["Paid add-on per seat", "Only as good as your Slack hygiene"],
        isFeatured: false,
        tier: "premium",
    },
    {
        slug: "coda",
        title: "Coda",
        description:
            "All-in-one doc that blends documents, spreadsheets, and apps, with AI for writing, summarizing, and automating tables.",
        category: "Productivity",
        pricing: "Freemium",
        websiteUrl: "https://coda.io",
        color: "text-orange-500",
        bgGradient: "from-orange-500/20 to-amber-600/20",
        features: ["Docs + tables + apps", "Coda AI", "Packs/integrations", "Automations"],
        pros: ["Flexible building blocks", "Strong integrations", "Replaces several tools"],
        cons: ["Learning curve", "Can get slow in large docs"],
        isFeatured: false,
        tier: "free",
    },

    // ───────────────────────── Management (+5) ─────────────────────────
    {
        slug: "jira",
        title: "Jira",
        description:
            "Atlassian's issue and project tracker for software teams, now with Atlassian Intelligence for drafting issues and summarizing work.",
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://www.atlassian.com/software/jira",
        color: "text-blue-500",
        bgGradient: "from-blue-500/20 to-blue-700/20",
        features: ["Agile boards", "Atlassian Intelligence", "Roadmaps", "Automation rules"],
        pros: ["Industry standard for dev teams", "Deeply customizable", "Huge integration ecosystem"],
        cons: ["Complex and heavy", "Slows down for small teams"],
        isFeatured: false,
        tier: "free",
    },
    {
        slug: "asana",
        title: "Asana",
        description:
            "Work management platform for tasks, projects, and goals, with Asana Intelligence for status updates and workflow suggestions.",
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://asana.com",
        color: "text-rose-500",
        bgGradient: "from-rose-500/20 to-pink-600/20",
        features: ["Tasks & projects", "Goals tracking", "Asana Intelligence", "Workflow builder"],
        pros: ["Clean UX", "Good for cross-team work", "Strong reporting"],
        cons: ["Premium tiers add up", "Can feel rigid for eng workflows"],
        isFeatured: false,
        tier: "free",
    },
    {
        slug: "monday",
        title: "Monday.com",
        description:
            "Colorful Work OS for managing projects, CRM, and operations, with AI blocks for automations and content generation.",
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://monday.com",
        color: "text-pink-500",
        bgGradient: "from-pink-500/20 to-red-600/20",
        features: ["Customizable boards", "AI automations", "CRM & dev modules", "Dashboards"],
        pros: ["Highly visual", "Flexible across use cases", "Easy onboarding"],
        cons: ["Pricing scales by seat fast", "Can become cluttered"],
        isFeatured: false,
        tier: "free",
    },
    {
        slug: "clickup",
        title: "ClickUp",
        description:
            "All-in-one productivity platform combining tasks, docs, and goals, with ClickUp Brain for AI writing and project answers.",
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://clickup.com",
        color: "text-purple-500",
        bgGradient: "from-purple-500/20 to-violet-600/20",
        features: ["Tasks + docs + goals", "ClickUp Brain AI", "Custom views", "Native automations"],
        pros: ["Feature-packed", "Generous free tier", "Replaces multiple tools"],
        cons: ["Overwhelming at first", "Occasional performance issues"],
        isFeatured: false,
        tier: "free",
    },
    {
        slug: "airtable",
        title: "Airtable",
        description:
            "Spreadsheet-database hybrid for building flexible apps and workflows, with AI fields for summarizing and categorizing data.",
        category: "Management",
        pricing: "Freemium",
        websiteUrl: "https://airtable.com",
        color: "text-yellow-500",
        bgGradient: "from-yellow-500/20 to-amber-600/20",
        features: ["Relational tables", "AI fields", "Interface designer", "Automations"],
        pros: ["Powerful yet approachable", "Great for structured data", "Strong API"],
        cons: ["Row limits on lower tiers", "Gets pricey at scale"],
        isFeatured: false,
        tier: "free",
    },

    // ───────────────────────── Design (+3) ─────────────────────────
    {
        slug: "figma",
        title: "Figma",
        description:
            "The collaborative interface design standard, now with Figma AI and Make for generating layouts, copy, and prototypes from prompts.",
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://www.figma.com",
        color: "text-fuchsia-500",
        bgGradient: "from-fuchsia-500/20 to-pink-600/20",
        features: ["Collaborative design", "Figma AI / Make", "Prototyping", "Dev Mode"],
        pros: ["Industry standard", "Real-time collaboration", "Massive plugin ecosystem"],
        cons: ["AI features still maturing", "Can be heavy on older machines"],
        isFeatured: false,
        tier: "free",
    },
    {
        slug: "canva",
        title: "Canva",
        description:
            "Drag-and-drop design platform with Magic Studio AI for generating images, text, presentations, and brand assets.",
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://www.canva.com",
        color: "text-cyan-500",
        bgGradient: "from-cyan-500/20 to-teal-600/20",
        features: ["Magic Studio AI", "Templates library", "Brand kit", "Background remover"],
        pros: ["Anyone can use it", "Huge template selection", "Strong free tier"],
        cons: ["Outputs can look templated", "Not for pro-grade design systems"],
        isFeatured: false,
        tier: "free",
    },
    {
        slug: "adobe-firefly",
        title: "Adobe Firefly",
        description:
            "Adobe's generative AI for images, text effects, and generative fill, trained for commercial-safe creative production.",
        category: "Design",
        pricing: "Freemium",
        websiteUrl: "https://www.adobe.com/products/firefly.html",
        color: "text-red-500",
        bgGradient: "from-red-500/20 to-orange-600/20",
        features: ["Text-to-image", "Generative fill", "Text effects", "Creative Cloud integration"],
        pros: ["Commercially safe training", "Integrated into Photoshop", "Strong editing controls"],
        cons: ["Requires Adobe ecosystem for best use", "Credits can run out"],
        isFeatured: false,
        tier: "free",
    },

    // ───────────────────────── Assistance (+2) ─────────────────────────
    {
        slug: "microsoft-copilot",
        title: "Microsoft Copilot",
        description:
            "Microsoft's consumer AI assistant for chat, search, and image generation, integrated across Windows, Edge, and Bing.",
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://copilot.microsoft.com",
        color: "text-sky-500",
        bgGradient: "from-sky-500/20 to-indigo-600/20",
        features: ["Conversational AI", "Web-grounded answers", "Image generation", "Windows integration"],
        pros: ["Free to use", "Built into Windows", "Good cited web answers"],
        cons: ["Less capable than frontier models on hard tasks", "Inconsistent across surfaces"],
        isFeatured: false,
        tier: "free",
    },
    {
        slug: "grok",
        title: "Grok",
        description:
            "xAI's conversational assistant with real-time access to X, known for a less filtered tone and live information.",
        category: "Assistance",
        pricing: "Freemium",
        websiteUrl: "https://grok.com",
        color: "text-zinc-400",
        bgGradient: "from-zinc-500/20 to-slate-600/20",
        features: ["Real-time X access", "Conversational AI", "Image generation", "Reasoning modes"],
        pros: ["Live information from X", "Strong reasoning modes", "Personable tone"],
        cons: ["Best features need X Premium", "Accuracy varies on niche topics"],
        isFeatured: false,
        tier: "free",
    },

    // ───────────────────────── Coding (+1) ─────────────────────────
    {
        slug: "amazon-q-developer",
        title: "Amazon Q Developer",
        description:
            "AWS's AI coding assistant for writing, testing, and modernizing code, with deep knowledge of AWS services and infrastructure.",
        category: "Coding",
        pricing: "Freemium",
        websiteUrl: "https://aws.amazon.com/q/developer/",
        color: "text-orange-500",
        bgGradient: "from-orange-500/20 to-yellow-600/20",
        features: ["Code generation", "AWS-aware suggestions", "Code transformation", "Security scanning"],
        pros: ["Deep AWS integration", "Strong free tier", "Good at infra/IaC code"],
        cons: ["Most valuable inside AWS", "Less polished than Cursor/Copilot for general dev"],
        isFeatured: false,
        tier: "free",
    },
];

async function main() {
    console.log(`Seeding ${newTools.length} new tools (batch 2)...\n`);
    let created = 0;
    let updated = 0;

    for (const tool of newTools) {
        const existing = await prisma.tool.findUnique({ where: { slug: tool.slug } });
        await prisma.tool.upsert({
            where: { slug: tool.slug },
            update: tool,
            create: tool,
        });
        if (existing) {
            updated++;
            console.log(`  ↻ updated: ${tool.title} (${tool.category})`);
        } else {
            created++;
            console.log(`  + created: ${tool.title} (${tool.category})`);
        }
    }

    const total = await prisma.tool.count();
    console.log(`\n✓ Done. ${created} created, ${updated} updated.`);
    console.log(`  Total tools in DB: ${total}`);

    // Category breakdown
    const byCat = await prisma.tool.groupBy({
        by: ["category"],
        _count: { category: true },
    });
    console.log("\n  Category distribution:");
    for (const c of byCat.sort((a, b) => b._count.category - a._count.category)) {
        console.log(`    ${c.category.padEnd(14)} ${c._count.category}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
