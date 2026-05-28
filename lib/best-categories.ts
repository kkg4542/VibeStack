import { ToolData } from "./tool-types";

export type BestCategory = ToolData["category"];

interface CategoryCopy {
  /** URL slug, e.g. "coding" → /best/coding */
  slug: string;
  /** DB category value */
  category: BestCategory;
  /** Search-intent H1, e.g. "Best AI Coding Tools" */
  heading: string;
  /** <title> / meta */
  metaTitle: string;
  metaDescription: string;
  /** Intro paragraph above the ranked list */
  intro: string;
  /** Short buying-guide bullets */
  buyingGuide: string[];
  faqs: { q: string; a: string }[];
}

export const BEST_CATEGORIES: CategoryCopy[] = [
  {
    slug: "coding",
    category: "Coding",
    heading: "Best AI Coding Tools",
    metaTitle: "Best AI Coding Tools (2026) — Editors, Agents & Assistants",
    metaDescription:
      "The best AI coding tools of 2026, ranked. Compare AI code editors, agents, and assistants like Cursor, Copilot, and more — features, pricing, pros & cons.",
    intro:
      "AI coding tools have gone from autocomplete to full agents that ship features. Here are the ones worth your time in 2026 — ranked by how much they actually accelerate real development work.",
    buyingGuide: [
      "Agentic vs. autocomplete: decide if you want a pair-programmer or a full task-runner.",
      "Codebase context: bigger context windows mean better multi-file edits.",
      "IDE fit: some live in VS Code, others are standalone editors.",
      "Pricing: most have a free tier — try before committing to Pro.",
    ],
    faqs: [
      {
        q: "What is the best AI coding tool in 2026?",
        a: "It depends on your workflow. Cursor leads for agentic, multi-file editing, while GitHub Copilot wins on IDE coverage and enterprise support. Try the free tiers of the top picks below.",
      },
      {
        q: "Are AI coding tools worth paying for?",
        a: "For most professional developers, yes — the time saved on boilerplate, refactors, and debugging typically pays back the subscription within the first week.",
      },
      {
        q: "Can AI coding tools replace developers?",
        a: "No. They accelerate developers but still need human direction, review, and architectural judgment — especially on large or legacy codebases.",
      },
    ],
  },
  {
    slug: "design",
    category: "Design",
    heading: "Best AI Design Tools",
    metaTitle: "Best AI Design Tools (2026) — Image, UI & Video Generators",
    metaDescription:
      "The best AI design tools of 2026, ranked. Generate images, UI, and video with tools like Midjourney, Framer, Runway, and more — compared by features and pricing.",
    intro:
      "From image generation to full website design, AI design tools now produce production-ready output. These are the best in 2026 for designers, founders, and creators.",
    buyingGuide: [
      "Output type: image, video, UI, or full websites — pick for your job.",
      "Editability: can you refine the output, or is it one-shot?",
      "Brand control: style references and design systems keep output on-brand.",
      "Licensing: check commercial-use terms before shipping.",
    ],
    faqs: [
      {
        q: "What is the best AI design tool in 2026?",
        a: "For images, Midjourney still leads on aesthetics; for websites, Framer ships real production sites; for video, Runway is the pro choice. See the ranked list below.",
      },
      {
        q: "Can I use AI-generated designs commercially?",
        a: "Most paid tiers grant commercial rights, but terms vary by tool — always confirm the license for your specific plan before using output in production.",
      },
    ],
  },
  {
    slug: "assistance",
    category: "Assistance",
    heading: "Best AI Assistants",
    metaTitle: "Best AI Assistants (2026) — Chatbots & Research Tools Compared",
    metaDescription:
      "The best AI assistants of 2026, ranked. Compare ChatGPT, Claude, Perplexity, and more for writing, research, coding, and everyday tasks.",
    intro:
      "AI assistants are the swiss-army knife of modern work — writing, research, analysis, and code. Here's how the top assistants stack up in 2026.",
    buyingGuide: [
      "Reasoning vs. speed: pick frontier models for hard problems, faster ones for volume.",
      "Context length: longer context handles whole documents and codebases.",
      "Citations: research assistants like Perplexity show sources.",
      "Ecosystem: custom GPTs, projects, and integrations add real leverage.",
    ],
    faqs: [
      {
        q: "Which AI assistant is best in 2026?",
        a: "Claude excels at writing and long-context work, ChatGPT has the broadest ecosystem, and Perplexity is best for cited research. The ranked list below breaks down each.",
      },
      {
        q: "Are free AI assistants good enough?",
        a: "Free tiers are great for casual use. Heavy users hit rate limits and miss the best models — the paid tiers are usually worth it for daily work.",
      },
    ],
  },
  {
    slug: "productivity",
    category: "Productivity",
    heading: "Best AI Productivity Tools",
    metaTitle: "Best AI Productivity Tools (2026) — Notes, Writing & Workflows",
    metaDescription:
      "The best AI productivity tools of 2026, ranked. Automate notes, writing, and workflows with the top AI-powered productivity apps.",
    intro:
      "AI is quietly rebuilding the productivity stack — drafting, summarizing, and automating the busywork. These are the best AI productivity tools to reclaim your hours in 2026.",
    buyingGuide: [
      "Where it lives: tools inside your existing workspace reduce context switching.",
      "Automation depth: from suggestions to full workflow automation.",
      "Team vs. solo: pricing and collaboration features differ a lot.",
      "Data privacy: check how your content is used and stored.",
    ],
    faqs: [
      {
        q: "What is the best AI productivity tool in 2026?",
        a: "It depends on your stack — tools that live inside your existing workspace tend to win on adoption. See the ranked picks below.",
      },
    ],
  },
  {
    slug: "management",
    category: "Management",
    heading: "Best AI Project Management Tools",
    metaTitle: "Best AI Project Management Tools (2026) — Compared & Ranked",
    metaDescription:
      "The best AI project management tools of 2026, ranked. Compare AI-powered task tracking, triage, and team collaboration tools.",
    intro:
      "Project management tools now triage, summarize, and plan with AI. Here are the best AI project management tools for shipping teams in 2026.",
    buyingGuide: [
      "Team type: engineering-first vs. cross-functional tools differ sharply.",
      "AI features: triage, auto-summaries, and smart roadmaps save real time.",
      "Integrations: Slack, GitHub, and calendar sync matter most.",
      "Speed: the best tools feel instant — sluggish ones kill adoption.",
    ],
    faqs: [
      {
        q: "What is the best AI project management tool in 2026?",
        a: "Linear leads for engineering teams thanks to speed and AI triage. See the full ranked list below for cross-functional options.",
      },
    ],
  },
  {
    slug: "other",
    category: "Other",
    heading: "Best AI Tools",
    metaTitle: "Best AI Tools (2026) — Specialized & Emerging Picks",
    metaDescription:
      "The best specialized AI tools of 2026, ranked. Voice, video, audio, and emerging AI tools worth trying this year.",
    intro:
      "Some of the most useful AI tools don't fit a neat category — voice, audio, infra, and the genuinely new. Here are the best of the rest in 2026.",
    buyingGuide: [
      "Use case fit: these tools are specialized — match to your exact need.",
      "Maturity: check whether it's production-ready or early access.",
      "Pricing model: usage-based pricing can scale fast.",
    ],
    faqs: [
      {
        q: "What other AI tools are worth trying in 2026?",
        a: "Voice tools like ElevenLabs, video editors like Descript, and platforms like Vercel each lead their niche. See the ranked list below.",
      },
    ],
  },
];

export function getBestCategoryBySlug(slug: string): CategoryCopy | undefined {
  return BEST_CATEGORIES.find((c) => c.slug === slug);
}
