/**
 * Hand-written editorial copy for high-traffic comparison pages.
 * Pages without an entry fall back to data-generated copy in
 * app/compare/[slug]/page.tsx. Slugs must match `${slug1}-vs-${slug2}`
 * in the order produced by the pair generator (see sitemap.ts).
 */
export interface CompareEditorial {
  /** Opening paragraphs rendered under "Overview". Plain text. */
  intro: string[];
  /** Closing verdict paragraph. Plain text. */
  verdict: string;
  /** Extra pair-specific FAQs appended to the generated ones. */
  faqs?: { q: string; a: string }[];
}

export const COMPARE_EDITORIAL: Record<string, CompareEditorial> = {
  "chatgpt-vs-claude": {
    intro: [
      "ChatGPT and Claude are the two most widely used general-purpose AI assistants, and for most people the honest answer is that both are excellent. ChatGPT, built by OpenAI, leads on breadth: image generation, voice conversations, a huge plugin and GPT-store ecosystem, and the most polished mobile experience. Claude, built by Anthropic, has earned a reputation for stronger long-form writing, more careful reasoning over large documents, and coding output that many developers prefer.",
      "The practical difference shows up in how you work. If your day involves brainstorming, quick research, image creation, and voice interaction, ChatGPT's feature surface is hard to beat. If you spend hours editing long documents, analyzing dense material, or pair-programming, Claude's larger effective context and steadier tone tend to win people over.",
    ],
    verdict:
      "Pick ChatGPT if you want the most complete consumer AI product — multimodal features, plugins, and ecosystem. Pick Claude if your work is writing- or code-heavy and you value depth over breadth. Many professionals simply keep both: ChatGPT for versatility, Claude for the heavy lifting on text and code.",
    faqs: [
      {
        q: "Is Claude better than ChatGPT for coding?",
        a: "Many developers prefer Claude for multi-file reasoning and long refactors, while ChatGPT remains strong for quick snippets and breadth of framework knowledge. Try both on a real task from your codebase — the difference is workflow-dependent.",
      },
    ],
  },
  "chatgpt-vs-perplexity": {
    intro: [
      "ChatGPT and Perplexity solve different problems that happen to share a chat box. ChatGPT is a general-purpose assistant: writing, coding, brainstorming, image generation, and open-ended conversation. Perplexity is an AI answer engine: it runs live web searches for every query and returns a synthesized answer with citations you can check.",
      "That difference matters most when freshness and verifiability count. Perplexity is the stronger tool for research, fact-finding, and anything where you need sources. ChatGPT is the stronger tool when you're creating something — a document, a plan, code — rather than looking something up.",
    ],
    verdict:
      "Use Perplexity as your research front-end and ChatGPT as your creation workspace. If you can only justify one subscription: choose Perplexity if most of your AI use is asking questions about the world, and ChatGPT if most of it is producing work product.",
  },
  "chatgpt-vs-grok": {
    intro: [
      "ChatGPT is the establishment pick; Grok, from xAI, is the challenger with a personality. Grok's standout advantage is real-time access to X (Twitter) data, which makes it unusually good at answering questions about breaking news and live public sentiment. It also applies fewer stylistic guardrails, which some users find refreshing and others find erratic.",
      "ChatGPT counters with maturity: a far larger ecosystem, stronger multimodal features, better mobile and desktop apps, and more predictable output quality across professional tasks. For business writing, coding, and structured work, ChatGPT remains the safer default.",
    ],
    verdict:
      "Choose Grok if live social-media awareness and an unfiltered tone are what you're missing. Choose ChatGPT for everything else — it's the more complete and more consistent product for professional use.",
  },
  "chatgpt-vs-microsoft-copilot": {
    intro: [
      "This comparison is really about where you work. Microsoft Copilot embeds OpenAI models directly inside Word, Excel, Outlook, and Teams — if your organization lives in Microsoft 365, Copilot brings AI to the documents and email you already have open, with enterprise-grade data governance.",
      "Standalone ChatGPT is the more capable raw assistant: newer models arrive there first, the feature set is broader (custom GPTs, advanced voice, image generation), and it isn't tied to one office suite. But it sits outside your documents, so you're pasting context in rather than working in place.",
    ],
    verdict:
      "If your company runs on Microsoft 365 and IT controls matter, Copilot's in-app integration usually justifies itself. If you want the strongest general assistant and don't need Office integration, ChatGPT is the better tool. Power users in Microsoft shops often end up with both.",
  },
  "claude-vs-perplexity": {
    intro: [
      "Claude and Perplexity are complements more than competitors. Claude is a reasoning and writing engine: it shines when you hand it a long document, a messy codebase, or a hard drafting task and let it think. Perplexity is a live answer engine: every response is grounded in a fresh web search and comes with citations.",
      "The trade-off is knowledge freshness versus depth of work. Perplexity always knows what happened this morning; Claude produces the more polished analysis, summary, or draft once the source material is in front of it.",
    ],
    verdict:
      "Choose Perplexity if your main need is trustworthy, cited answers about current topics. Choose Claude if your main need is high-quality output — writing, analysis, code. The strongest research workflow uses Perplexity to gather sources and Claude to turn them into finished work.",
  },
  "claude-vs-grok": {
    intro: [
      "Claude and Grok sit at opposite ends of the assistant spectrum. Claude emphasizes careful reasoning, long-context document work, and consistently professional output — it's the assistant you hand a 200-page contract or a gnarly refactor. Grok emphasizes immediacy and attitude, with real-time X (Twitter) data and a deliberately irreverent voice.",
      "For professional writing, coding, and analysis, Claude is the more dependable choice. Grok's edge is narrower but real: live awareness of what's trending and a tone some users genuinely prefer for casual use.",
    ],
    verdict:
      "Pick Claude for serious work — documents, code, analysis. Pick Grok if real-time social context is central to what you do or you want a more entertaining daily driver. They overlap less than most assistant pairs.",
  },
  "cursor-vs-github-copilot": {
    intro: [
      "Cursor and GitHub Copilot represent two philosophies of AI coding. Copilot is an assistant added to your existing editor — inline completions, chat, and increasingly capable agents inside VS Code, JetBrains, and others. Cursor is an entire editor (a VS Code fork) rebuilt around AI, where multi-file edits, codebase-aware chat, and agentic workflows are the core interaction, not a plugin.",
      "Copilot's strengths are ubiquity and price: it works in the tools you already use, and its per-seat cost is easy to justify. Cursor's strength is depth: when you want the AI to plan and execute changes across a codebase, its integrated experience is ahead of plugin-based rivals.",
    ],
    verdict:
      "Choose Copilot if you want strong AI assistance without changing editors, or you're standardizing across a large team. Choose Cursor if AI-driven development is your primary workflow and you're willing to switch editors for the deepest integration. Many developers who try Cursor for a week don't go back.",
    faqs: [
      {
        q: "Can I use GitHub Copilot inside Cursor?",
        a: "Cursor is a VS Code fork and supports many VS Code extensions, but its own AI features replace what Copilot does. Running both is redundant — pick one as your primary assistant.",
      },
    ],
  },
  "cursor-vs-windsurf-ide": {
    intro: [
      "Cursor and Windsurf are the two leading AI-native editors, both VS Code forks, both built around agentic coding. Cursor got there first and has the larger user base and more mature ecosystem. Windsurf (from Codeium) counters with its Cascade agent, which emphasizes automatically tracking your intent across a session, and aggressive pricing.",
      "In day-to-day use they are closer than their marketing suggests: both offer codebase-aware chat, multi-file edits, and background agents. Differences come down to feel — Cursor gives the developer more explicit control, Windsurf leans further into automation — and to which model access and pricing tier fits your budget.",
    ],
    verdict:
      "You can't go badly wrong with either. Choose Cursor for the more proven option with the larger community and finer-grained control. Choose Windsurf if its agent-first flow or pricing suits you better — it's the strongest Cursor alternative available.",
  },
  "cursor-vs-bolt-new": {
    intro: [
      "Cursor and Bolt.new both generate code with AI, but for different audiences. Cursor is a professional IDE for developers working in real codebases — you own the environment, the git history, and every line. Bolt.new is a browser-based app builder: describe what you want, and it scaffolds, runs, and deploys a full-stack app without any local setup.",
      "The right choice tracks your starting point. If you have an existing codebase and engineering habits, Bolt's sandboxed environment will feel confining. If you're going zero-to-prototype and don't want to configure anything, Bolt gets a working app in front of you faster than any IDE.",
    ],
    verdict:
      "Choose Bolt.new for rapid prototypes, MVPs, and non-developers shipping simple apps. Choose Cursor for everything past the prototype stage — real projects need the control a real IDE provides. A common path: prototype in Bolt, then move the code into Cursor to grow it.",
  },
  "cursor-vs-replit": {
    intro: [
      "Cursor is a desktop AI IDE for professional development; Replit is a cloud platform where the editor, runtime, database, and deployment all live in the browser, with an AI agent that can build apps end-to-end. Replit's superpower is zero setup — you can go from prompt to deployed app in one sitting, from any machine, including an iPad.",
      "Cursor's superpower is depth in real codebases: local tooling, any stack, your own infrastructure, and stronger control over what the AI changes. Teams with established repos and CI pipelines will find Replit's environment limiting; beginners and rapid builders will find Cursor's setup overhead unnecessary.",
    ],
    verdict:
      "Choose Replit to learn, prototype, and ship small apps with zero configuration. Choose Cursor for professional work on codebases you'll maintain for years. They serve adjacent but genuinely different jobs.",
  },
  "midjourney-vs-adobe-firefly": {
    intro: [
      "Midjourney and Adobe Firefly lead AI image generation from opposite directions. Midjourney is the aesthetic benchmark — its images have a distinctive, art-directed quality that still sets the standard, and its community-driven workflow rewards prompt craft. Firefly is the professional-pipeline choice: trained on licensed content, commercially safer by design, and integrated directly into Photoshop, Illustrator, and Express.",
      "For working designers the integration question often decides it. Firefly's generative fill and editing live inside the Adobe tools you already use, with output Adobe indemnifies for commercial use. Midjourney produces more striking standalone images but lives outside your design pipeline.",
    ],
    verdict:
      "Choose Midjourney when the image itself is the product and you want the best-looking output. Choose Firefly when AI is one step in a professional design workflow and commercial-use safety matters. Studios frequently use Midjourney to explore and Firefly to finish.",
  },
  "notion-ai-vs-coda": {
    intro: [
      "Notion AI and Coda AI both bolt intelligence onto an all-in-one workspace, and the comparison is really between the workspaces. Notion is the more popular, more polished tool for docs, wikis, and lightweight databases, with AI for writing, summarizing, and Q&A across your workspace. Coda is the more programmable platform — its formula language, buttons, and Packs make documents behave like apps, and its AI plugs into that automation.",
      "If your team mostly writes and organizes, Notion's simplicity and ecosystem win. If your team builds workflows — trackers, approval chains, tools that act on data — Coda's document-as-app model goes further than Notion without code.",
    ],
    verdict:
      "Choose Notion AI for knowledge work: docs, wikis, notes, and a gentler learning curve. Choose Coda when you need documents that function like software. Both AIs are only as useful as the workspace they live in, so pick the platform first and the AI follows.",
  },
};

export function getCompareEditorial(slug: string): CompareEditorial | undefined {
  return COMPARE_EDITORIAL[slug];
}
