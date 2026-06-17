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
  /**
   * Optional long-form body paragraphs (HTML allowed) rendered below the
   * ranked list. Adds the editorial depth search engines reward — fill this
   * for high-intent categories that already pull impressions.
   */
  body?: string[];
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
      "The best AI project management tools of 2026, ranked and compared. Find the right AI project management software for your team — Linear, Jira, Asana, ClickUp, Monday & more, with features, pricing, and pros & cons.",
    intro:
      "AI has quietly rewired project management: the best tools now triage incoming work, summarize long threads, draft status updates, and suggest roadmaps on their own. We tested and ranked the top AI project management tools of 2026 so you can pick the right one for your team — whether you ship software, run cross-functional projects, or just want the busywork gone.",
    body: [
      "If you only remember one thing: there is no single \"best\" AI project management tool — there's the best one <em>for your team</em>. Engineering-led teams that value speed and keyboard-first workflows gravitate to <a href=\"/tool/linear\">Linear</a>, whose AI triage routes and labels incoming issues automatically. Larger software orgs already living in the Atlassian ecosystem lean on <a href=\"/tool/jira\">Jira</a> and its Atlassian Intelligence features. Cross-functional teams — marketing, ops, and product working side by side — tend to land on <a href=\"/tool/asana\">Asana</a>, <a href=\"/tool/monday\">Monday.com</a>, or <a href=\"/tool/clickup\">ClickUp</a>, which trade some engineering polish for flexibility and friendlier onboarding.",
      "The \"AI\" in AI project management means something concrete in 2026, not a chatbot bolted on. The features that actually save time are: <strong>automatic triage</strong> (new tasks get categorized, prioritized, and assigned), <strong>auto-summaries</strong> (long comment threads and project updates condensed into a paragraph), <strong>smart roadmaps and planning</strong> (the tool drafts timelines from your backlog), and <strong>natural-language automations</strong> (describe a workflow in plain English and the tool builds it). When you compare tools, weigh those four capabilities far above the marketing copy.",
      "Budget matters more than the pricing pages suggest. Every tool below has a free tier worth starting on, but per-seat costs diverge fast as you scale — Monday.com and Asana in particular climb quickly with team size, while ClickUp's free tier is unusually generous. Linear stays affordable for small engineering teams but costs more than Jira at larger scale. Our advice: shortlist two tools, run a real project through each free tier for a week, and let your team's actual adoption decide. The full comparison table and ranked breakdowns below cover features, pricing traps, and who each tool is — and isn't — for.",
    ],
    buyingGuide: [
      "Team type: engineering-first (Linear, Jira) vs. cross-functional (Asana, Monday, ClickUp) tools differ sharply.",
      "AI features: triage, auto-summaries, and smart roadmaps save real time — chat add-ons rarely do.",
      "Integrations: Slack, GitHub, and calendar sync matter most for daily flow.",
      "Pricing at scale: check the per-seat cost at your real team size, not the entry price.",
      "Speed: the best tools feel instant — sluggish ones quietly kill adoption.",
    ],
    faqs: [
      {
        q: "What is the best AI project management tool in 2026?",
        a: "For engineering teams, Linear leads thanks to its speed and AI triage. For cross-functional teams, ClickUp and Asana are the strongest all-rounders, while Jira remains the default for large software orgs already on Atlassian. There's no universal winner — the best AI project management tool depends on your team type, which is why we rank them with that context below.",
      },
      {
        q: "How do I choose the right AI project management tool for my team?",
        a: "Start with your team's makeup. If you're engineering-led and value speed, try Linear or Jira. If you run cross-functional projects across marketing, ops, and product, ClickUp, Asana, or Monday.com fit better. Then shortlist two, run a real project through each free tier for a week, and check the AI features that matter — automatic triage, summaries, and smart planning — rather than the feature-count marketing.",
      },
      {
        q: "Which AI project management tool should I use for my next project?",
        a: "For a software project, Linear (small, fast teams) or Jira (larger orgs) are the safest picks. For a mixed team or operations work, ClickUp is the most flexible all-in-one, and Asana is the cleanest for status reporting. If your project is data-heavy, Airtable's database-style workflows can beat a traditional task tracker. Match the tool to the project's shape, not the other way around.",
      },
      {
        q: "Is there a free AI project management tool?",
        a: "Yes. Every tool in our ranking has a free tier. ClickUp's is the most generous for small teams, Linear and Asana offer capable free plans for getting started, and Jira is free for up to 10 users. The AI features are sometimes limited or metered on free tiers, so confirm which AI capabilities you get before committing.",
      },
      {
        q: "What's the difference between Linear, Jira, and Asana?",
        a: "Linear is the fast, keyboard-first issue tracker engineering teams love — opinionated and lightweight. Jira is the heavyweight, deeply customizable standard for large software organizations, powerful but complex. Asana is a cross-functional work management platform with a cleaner UX, better suited to non-engineering teams. In short: Linear for speed, Jira for scale and customization, Asana for cross-team clarity.",
      },
      {
        q: "Do AI project management tools actually save time?",
        a: "When the AI does real work — auto-triaging tasks, summarizing threads, and drafting roadmaps — yes, the time savings are meaningful, especially for managers who spend hours on status updates. When 'AI' is just a chat box, the gains are marginal. Judge a tool by its triage, summary, and planning features, not by whether it has an AI label.",
      },
      {
        q: "Are AI project management tools worth paying for in 2026?",
        a: "For most teams past a handful of people, yes. The paid tiers unlock the automations and AI features that remove repetitive coordination work, and the time saved typically outweighs the per-seat cost. Solo users and very small teams can often stay on free tiers, so start there and upgrade only when you hit real limits.",
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
