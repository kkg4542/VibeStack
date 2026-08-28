import type { ToolData } from "./tool-types";

export interface ComparePair {
    /** URL slug, e.g. "chatgpt-vs-claude" → /compare/chatgpt-vs-claude */
    slug: string;
    /** Human label, e.g. "ChatGPT vs Claude" */
    label: string;
    t1: ToolData;
    t2: ToolData;
}

/** Hard cap on published comparison pages — keeps the sitemap focused. */
const COMPARE_PAIR_LIMIT = 50;

/**
 * The canonical list of published comparison pages: same-category pairs in
 * `getTools()` order, capped at 50.
 *
 * This is the single source of truth shared by generateStaticParams
 * (app/compare/[slug]/page.tsx), the sitemap, and every server-rendered
 * directory that links to comparisons. Changing the ordering or the cap
 * changes which URLs exist — don't.
 */
export function comparePairs(tools: ToolData[]): ComparePair[] {
    const all = tools.flatMap((t1, i) =>
        tools
            .slice(i + 1)
            .filter((t2) => t1.category === t2.category)
            .map((t2) => ({
                slug: `${t1.slug}-vs-${t2.slug}`,
                label: `${t1.title} vs ${t2.title}`,
                t1,
                t2,
            }))
    );

    const capped = all.slice(0, COMPARE_PAIR_LIMIT);

    // Safety net: a page with hand-written editorial copy is a page someone
    // invested in and search engines have already indexed. Adding one tool to
    // the directory must never silently push it past COMPARE_PAIR_LIMIT and
    // drop it out of the sitemap / generateStaticParams. Editorial slugs are
    // always published, cap or not.
    const published = new Set(capped.map((p) => p.slug));
    const rescued = all.filter(
        (p) => !published.has(p.slug) && Object.hasOwn(COMPARE_EDITORIAL, p.slug)
    );

    return [...capped, ...rescued];
}

/**
 * Hand-written editorial copy for high-traffic comparison pages.
 * Pages without an entry fall back to data-generated copy in
 * app/compare/[slug]/page.tsx. Slugs must match `${slug1}-vs-${slug2}`
 * in the order produced by `comparePairs()`.
 */
export interface CompareEditorial {
  /**
   * Optional <title> override. Unlike /tool/* and /stack/*, compare pages get
   * NO " | VibeStack" suffix — app/compare/layout.tsx sets a plain-string
   * title, which stops the root layout's title template from cascading to this
   * segment. So the full ~60-character SERP budget is available here. Use it
   * when the generated template would truncate, or when the phrasing people
   * actually search for differs from the tools' full product names.
   */
  title?: string;
  /**
   * Optional <meta name="description"> override, used verbatim by
   * generateMetadata() in app/compare/[slug]/page.tsx in place of the generic
   * template. Keep this at 155 characters or fewer — Google truncates SERP
   * snippets around that length. Should name one concrete, pair-specific
   * difference rather than restating the generic "features, pricing & verdict"
   * template every other page falls back to.
   */
  description?: string;
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
  "cursor-vs-gemini-code-assist": {
    title: "Cursor vs Gemini Code Assist: Pricing & Verdict",
    intro: [
      "Cursor and Gemini Code Assist both put AI in front of your code, but only one of them is an editor. Cursor is a VS Code fork rebuilt around AI: multi-file agent edits, codebase-wide chat, and a model picker that spans Claude, GPT, Gemini, and Grok. Gemini Code Assist is an extension — it adds Google's Gemini models to the IDE you already use, and its real differentiator is awareness of your Google Cloud resources on the paid Enterprise tier.",
      "Pricing is where they diverge hardest, and it's the comparison most people are actually running. Cursor charges credits: $20/mo Pro, $60 Pro+, $200 Ultra, and how far a tier stretches depends on which model you point at your prompts — frontier models burn credits fast, cheaper ones last. The capability is worth it for many developers, but you end up doing arithmetic in your head before firing off a long agent run. Gemini Code Assist went the opposite direction with an unusually generous free individual tier: up to 6,000 code requests and 240 chat requests per day, which for a solo developer was effectively unlimited.",
      "That free tier now carries an asterisk. Google set June 18, 2026 as the cutoff for the Code Assist IDE extensions and the Gemini CLI on the individual, Google AI Pro, and Google AI Ultra tiers, pointing those users to Antigravity and the Antigravity CLI instead. If the free allowance is the reason you're considering it, confirm what's currently served for your account before building a workflow on it. The paid Standard (~$19–23/user/mo) and Enterprise (~$45–54/user/mo) tiers aimed at Google Cloud organizations continue, and that's where the product's genuine strength — suggestions grounded in your actual cloud services — lives.",
    ],
    verdict:
      "Choose Cursor if agentic, multi-file development is the job and you'd rather absorb variable credit costs for the most capable AI editor available. Choose Gemini Code Assist if your team builds on Google Cloud and wants an assistant that understands your infrastructure, or if you want in-IDE completions at no cost and have verified which tier still serves your account after the Antigravity migration. They aren't really the same product: one replaces your editor, the other adds Google's models to it.",
    faqs: [
      {
        q: "Is Gemini Code Assist still free?",
        a: "It had a very generous free individual tier — roughly 6,000 code requests and 240 chat requests per day — but Google set June 18, 2026 as the date the Code Assist IDE extensions and Gemini CLI stop serving individual, Google AI Pro, and Google AI Ultra accounts, migrating them to Antigravity. Check your account's current status before relying on the free allowance. The paid Standard and Enterprise tiers are unaffected.",
      },
      {
        q: "Can I use Gemini models inside Cursor?",
        a: "Yes. Cursor's model picker includes Gemini alongside Claude, GPT, and Grok, so you can get Gemini's output inside an agentic editor. The catch is that it runs on Cursor credits rather than Google's free allowance — you're paying Cursor for the editor, not Google for the model access.",
      },
    ],
  },
  "github-copilot-vs-coderabbit": {
    title: "GitHub Copilot vs CodeRabbit (2026): Code Review",
    description:
      "GitHub Copilot writes your code; CodeRabbit reviews it on every pull request. They solve different bottlenecks — here's which one you actually need.",
    intro: [
      "These two get compared because both have \"AI\" and \"code\" in the pitch, but they sit at opposite ends of the same workflow and they aren't really competitors. GitHub Copilot is a writing tool: inline completions, chat, and agent mode inside VS Code and JetBrains, plus a CLI and a cloud agent that can open pull requests. CodeRabbit is a reviewing tool: it attaches to your repository and posts change summaries and line-by-line review comments with suggested fixes on every pull request that opens. Copilot helps you produce the diff. CodeRabbit reads the diff after you push it.",
      "The genuine overlap is narrower than the search results suggest. GitHub ships its own Copilot code review inside pull requests, so the real question for most teams isn't \"Copilot or CodeRabbit\" but \"is Copilot's built-in review enough, or do I want a dedicated reviewer?\" CodeRabbit goes deeper: it reviews line by line rather than summarizing, picks up your codebase's conventions over repeated reviews, is configurable per repository, and works on GitLab, Bitbucket, and Azure DevOps as well as GitHub. Its cost is noise — on an active repo it comments a lot, and most teams spend the first couple of weeks tuning what it flags before the signal-to-noise ratio feels right.",
      "Budget matters here because these are two line items, not one. Copilot is priced per developer (Pro at $10/mo, with all plans moved to usage-based AI credits as of June 1, 2026), and CodeRabbit is a separate per-seat cost layered on top. A ten-person team adopting both is signing up for two subscriptions that solve two different bottlenecks.",
    ],
    verdict:
      "These are complements, not alternatives — teams that seriously evaluate both usually end up running both, with Copilot at the keyboard and CodeRabbit at the pull request. If you can only fund one, diagnose your bottleneck honestly: if code sits in review for days and bugs slip through, CodeRabbit buys back more time; if writing the code is the slow part, Copilot does. And if you already pay for Copilot in a GitHub-native shop, spend a sprint with Copilot's built-in code review before adding a second bill — for smaller teams it may be sufficient.",
    faqs: [
      {
        q: "Is CodeRabbit a replacement for GitHub Copilot?",
        a: "No. CodeRabbit doesn't write code in your editor — it has no inline completions, no chat-while-you-type, and no agent building features for you. It reviews pull requests after the code exists. Dropping Copilot for CodeRabbit would leave you without an authoring assistant entirely.",
      },
      {
        q: "Does GitHub Copilot do code review?",
        a: "Yes — Copilot code review runs inside GitHub pull requests, summarizing changes and suggesting review comments. It's convenient because it's already bundled, but it's a lighter pass than a dedicated reviewer. CodeRabbit's line-by-line depth, per-repo configuration, and support for GitLab, Bitbucket, and Azure DevOps are what teams pay extra for.",
      },
      {
        q: "Do I need both Copilot and CodeRabbit?",
        a: "Only if both stages of your workflow are slow. They cover different points in the cycle — authoring versus reviewing — so running both is redundant only in budget, not in function. Start with whichever bottleneck costs you more hours per week and add the second once you can measure the gap.",
      },
    ],
  },
  "github-copilot-vs-supermaven": {
    title: "GitHub Copilot vs Supermaven: Speed & Context",
    description:
      "Copilot covers chat, agents, and PR review; Supermaven does one thing — the fastest, most context-aware autocomplete with a 1M-token window.",
    intro: [
      "Supermaven and GitHub Copilot both autocomplete your code, and that's roughly where the similarity ends. Supermaven is a single-purpose speed tool: a 1M-token context window and completions that arrive fast enough to feel like part of the editor rather than a round trip to a server. Copilot is a platform — completions, chat, agent mode (generally available on VS Code and JetBrains since March 2026), code review inside pull requests, a CLI, and a cloud agent.",
      "The two specs Supermaven leads on aren't marketing abstractions; they change how the tool feels. Latency decides whether you wait for a suggestion or read one that's already sitting there. When completions land before your eyes leave the line you're typing, you stay in flow instead of pausing to evaluate a popup — and that difference compounds over a day far more than a few percentage points of suggestion quality. The 1M-token window decides how much of your repository the model saw before guessing: with a window that large, completions match the helper functions and types defined in files you never opened, rather than inventing plausible-looking APIs. On a big monorepo that shows up concretely as fewer hallucinated imports and fewer wrong function signatures.",
      "Where Supermaven stops is everything past the cursor. It won't plan a multi-file refactor, open a pull request, or review a diff, and its ecosystem and integrations are much smaller than Copilot's. Copilot does all of that and is wired into GitHub, where the rest of your workflow already lives — at the price of usage-metered billing since June 2026 and completions that feel a step slower. One more thing worth knowing before standardizing a team on Supermaven: its team joined Cursor's parent company Anysphere in late 2024, so check the current state of the extension for your editor rather than assuming an independent roadmap.",
    ],
    verdict:
      "Choose Supermaven if autocomplete is the part of AI coding you actually use all day and you want the fastest, most context-aware version of it for a low flat price. Choose GitHub Copilot if you want one tool covering the whole cycle — completion, chat, agents, and pull request review — and you'll trade a little latency and predictable billing for that breadth. There's also a hybrid a lot of completion-sensitive developers land on: turn off Copilot's inline suggestions, keep its chat and agent features, and let Supermaven own the tab key.",
    faqs: [
      {
        q: "Is Supermaven faster than GitHub Copilot?",
        a: "Speed is Supermaven's entire pitch, and in practice its completions do surface noticeably sooner than Copilot's. Whether that matters depends on how you work: if you accept suggestions constantly while typing, the lower latency is the difference between staying in flow and waiting. If you mostly use chat and agents, it's irrelevant.",
      },
      {
        q: "Can I run Supermaven and GitHub Copilot at the same time?",
        a: "Yes, but not with both providing inline completions — two extensions competing for the same suggestion slot fight each other. The workable setup is to disable Copilot's inline suggestions in your editor settings while keeping Copilot Chat, agent mode, and PR review, and let Supermaven handle autocomplete.",
      },
      {
        q: "Does Supermaven have agent features?",
        a: "No. Supermaven is deliberately autocomplete-first — a 1M-token context window feeding fast, in-line completions. It won't execute multi-file changes, run terminal commands, or open pull requests. If you need agentic work, that's Copilot's agent mode or a full AI editor like Cursor.",
      },
    ],
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
  "notion-ai-vs-microsoft-365-copilot": {
    title: "Notion AI vs Microsoft 365 Copilot (2026)",
    description:
      "Notion AI answers from your Notion workspace; Copilot answers from Word, Excel, Outlook, and Teams. Same idea, pointed at completely different data.",
    intro: [
      "Notion AI and Microsoft 365 Copilot both promise AI grounded in your own work, but they're grounded in different places. Notion AI reads your Notion workspace — the docs, wikis, and databases your team already maintains — and \"Ask Notion\" turns that into a queryable knowledge base. Copilot reads Microsoft Graph: Word documents, Excel workbooks, Outlook threads, Teams meetings. Neither is better in the abstract. Whichever one points at where your team's real information already lives is the one that will actually answer questions.",
      "The pricing structures differ more than the sticker prices suggest, and this is where most evaluations go wrong. Notion folded AI into the plan itself: since May 2025 there's no separate $10 AI add-on, and full AI — including Ask Notion and Agents — comes with the Business tier at $20/user/mo. One line item, and teams already on Business pay nothing extra. Microsoft charges an add-on on top of a subscription you already hold: Copilot Business runs roughly $18–21/user/mo (the $18 promotional annual rate runs through mid-2026 before rising) or about $30/user/mo for Enterprise, and that sits on top of a qualifying Microsoft 365 plan. The real cost is the sum of both.",
      "Two footnotes that trip up buyers. Microsoft 365 Copilot Chat is included at no additional cost for eligible Microsoft 365 users, but it does not connect to your Office apps — it can't read your email, recap a meeting, or analyze your spreadsheet, so \"free Copilot\" is not the product being compared here. On the Notion side, Custom Agents began consuming paid credits in May 2026 at $10 per 1,000 monthly credits, so heavy agent use adds a metered charge on top of the $20 seat.",
      "In practice the decision is usually already made for you. If your team's knowledge lives in Notion pages and databases, Copilot has nothing to read. If your team runs on Excel models, Outlook threads, and Teams meetings, Notion AI can't see any of it. The genuinely open case is a team that hasn't committed to either platform — and there the question is which workspace you want, not which AI.",
    ],
    verdict:
      "Choose Notion AI if your source of truth is a Notion workspace and you like AI arriving inside a single $20/user plan rather than as a separate purchase order. Choose Microsoft 365 Copilot if your work already lives in Office and you need AI inside Word, Excel, Outlook, and Teams under Microsoft's security and compliance boundary — and budget it as an add-on on top of your existing Microsoft 365 seats, not a replacement for them. Pick the workspace first; the AI follows.",
    faqs: [
      {
        q: "Can Microsoft 365 Copilot read my Notion pages?",
        a: "Not out of the box. Copilot answers from Microsoft Graph — your Office files, mail, and Teams content. Enterprise admins can index external sources through Microsoft Graph connectors, but that's an IT project rather than a setting you toggle, and it won't give you the same fidelity as Ask Notion running natively over a Notion workspace.",
      },
      {
        q: "Is the free version of Microsoft 365 Copilot enough?",
        a: "Only if you want a general chatbot. Microsoft 365 Copilot Chat is included for eligible Microsoft 365 users, but it doesn't connect to your Office apps — no summarizing an email thread, no recapping a Teams meeting, no analyzing your Excel data. Every capability people compare against Notion AI requires the paid add-on.",
      },
      {
        q: "Which is better for meeting notes?",
        a: "Copilot, if your meetings happen in Teams — it recaps calls directly, including what you missed and the action items, because it has the transcript. Notion AI handles meeting notes you write or record inside Notion and is stronger afterwards, at turning those notes into searchable team knowledge alongside the rest of your docs.",
      },
    ],
  },
  "notion-ai-vs-grammarly": {
    description:
      "Notion AI drafts and answers questions inside your workspace docs; Grammarly checks grammar, tone, and clarity everywhere else you type on the web.",
    intro: [
      "Notion AI and Grammarly both put AI writing help in front of you, but they solve different problems. Notion AI lives inside your Notion workspace — drafting, summarizing, translating, and answering questions across the docs, wikis, and databases you already have there. Grammarly works everywhere else: a browser extension and desktop app that checks grammar, spelling, tone, and clarity in Gmail, Google Docs, Slack, and practically any text box on the web, plus a generative rewrite mode.",
      "The difference is scope versus reach. Notion AI's value is tied entirely to how much of your work already lives in Notion — it can't help with an email or a Slack message. Grammarly's value comes from being everywhere you write, but it doesn't know your team's wiki or project database the way Notion AI does.",
    ],
    verdict:
      "Choose Notion AI if your team's knowledge and drafts already live in Notion and you want AI answering questions across that workspace. Choose Grammarly if you want consistent grammar, tone, and clarity checking across every app you write in, not just one workspace. Many people who use Notion daily still keep Grammarly running everywhere else — the two solve different halves of the writing problem.",
  },
  "cursor-vs-amazon-q-developer": {
    description:
      "Cursor is a general-purpose AI code editor; Amazon Q Developer specializes in AWS — infrastructure code, service-aware suggestions, security scans.",
    intro: [
      "Cursor and Amazon Q Developer both add AI to writing code, but they're built for different starting points. Cursor is a full AI-native code editor — a VS Code fork where multi-file agent edits, codebase-wide chat, and tab completion work across any language or stack. Amazon Q Developer is AWS's own coding assistant, built into IDEs as an extension and tuned specifically for AWS: it understands AWS services, helps write and modernize infrastructure-as-code, and runs security scans against your code.",
      "The practical split is general development versus AWS-specific work. Cursor doesn't care which cloud you deploy to; its strength is agentic, multi-file changes across a whole codebase. Amazon Q Developer's suggestions get noticeably more useful the more your project touches AWS services, and its code transformation and security-scanning features are aimed squarely at teams already living in AWS infrastructure.",
    ],
    verdict:
      "Choose Cursor if you want the strongest general-purpose AI editor and your stack isn't tied to one cloud provider. Choose Amazon Q Developer if your team builds heavily on AWS and wants an assistant that understands your infrastructure and can help modernize or secure it. Teams deep in AWS sometimes run both — Cursor for day-to-day coding, Amazon Q for AWS-specific tasks.",
  },
  "notion-ai-vs-gamma": {
    description:
      "Notion AI enhances documents and wikis you already have; Gamma generates an entire presentation, doc, or webpage from a single prompt.",
    intro: [
      "Notion AI and Gamma both bring AI into document creation, but they start from opposite ends. Notion AI is embedded in your existing Notion workspace — it drafts, summarizes, and answers questions using the docs, wikis, and databases you've already built up over time. Gamma starts from nothing: describe what you want and it generates a full presentation, one-page document, or simple webpage, complete with layout and design, that you then refine in its AI-native editor.",
      "The difference shows up in what you're actually trying to produce. If you're organizing ongoing team knowledge — notes, project trackers, wikis — Notion AI's job is to make that existing workspace smarter. If you need a polished deck or one-off webpage fast and don't want to fight with slide layout, Gamma's prompt-to-deck workflow gets you a presentable first draft in minutes.",
    ],
    verdict:
      "Choose Notion AI if your work is ongoing team knowledge management and you want AI woven into docs you'll keep updating. Choose Gamma when you need a good-looking presentation, document, or simple webpage quickly and don't need it to live inside a larger workspace. Many teams use Notion for the workspace and reach for Gamma specifically when a client-facing deck is due.",
  },
  "cursor-vs-v0-by-vercel": {
    description:
      "Cursor is a full IDE for editing any codebase; v0 generates standalone React + Tailwind UI components and pages from a prompt.",
    intro: [
      "Cursor and v0 by Vercel both write code with AI, but they operate at different scopes. Cursor is a complete AI-native code editor — a VS Code fork where you work across an entire codebase, in any language or framework, with agentic multi-file edits and chat. v0 is narrower and more specialized: describe a UI and it generates a real React component or page styled with Tailwind and shadcn/ui, which you can iterate on in v0's own interface before pulling the code into your project.",
      "The overlap is smaller than it looks. v0 is genuinely excellent at the specific job of turning a prompt into a clean, deployable UI — landing pages, dashboards, forms — but it stays inside the React and Tailwind world and doesn't manage your whole codebase. Cursor can do that same UI-generation work, but its real strength is everything past the first component: wiring it into your app, backend logic, and the rest of a project v0 was never built to touch.",
    ],
    verdict:
      "Choose v0 when you need a clean UI component or page fast and are happy working in React and Tailwind. Choose Cursor when you're building or maintaining a full application and want one AI-native editor for the whole codebase, not just the front end. A common workflow: generate the UI in v0, then bring the code into Cursor to wire it up.",
  },
  "midjourney-vs-runway": {
    description:
      "Midjourney generates still images with a distinctive aesthetic; Runway generates and edits AI video used in real film production.",
    intro: [
      "Midjourney and Runway both lead their categories in generative visuals, but they're not really competing for the same job. Midjourney generates still images — it's the aesthetic benchmark for AI art, with a distinctive, art-directed look that designers and concept artists reach for specifically. Runway generates and edits video: text-to-video, image-to-video, and tools like motion brush that give you frame-level control, and it's used in real film and commercial production rather than just for stills.",
      "The choice mostly makes itself once you know what you're producing. If the deliverable is a single striking image — concept art, a thumbnail, a mood board — Midjourney's output quality is hard to match. If the deliverable involves motion — a short clip, a video ad, a visual-effects shot — Runway is built for that timeline-based, frame-by-frame work in a way Midjourney simply isn't.",
    ],
    verdict:
      "Choose Midjourney when the final output is a still image and visual style matters most. Choose Runway when you need moving footage, from a text prompt or an existing image or clip. Many creative pipelines use both: generate a still in Midjourney, then bring it into Runway to animate.",
  },
  "midjourney-vs-lovable": {
    description:
      "Midjourney generates AI images; Lovable generates working full-stack apps from a prompt — different tools for entirely different jobs.",
    intro: [
      "Midjourney and Lovable get compared mostly because both turn a text prompt into something finished, but they finish completely different things. Midjourney generates still images with a distinctive, art-directed aesthetic — it's a tool for visual creation, nothing more. Lovable generates a working full-stack application: describe what you want built, and it scaffolds a React frontend with a Supabase backend, database, and auth, then deploys it to a live URL you can share within minutes.",
      "There's essentially no functional overlap here — Midjourney can't write you an app, and Lovable can't produce fine art or concept imagery. The reason people search for this pairing is usually workflow, not competition: builders using Lovable to ship an app often turn to Midjourney (or a similar image model) for the visual assets — hero images, icons, marketing graphics — that go into the product Lovable builds.",
    ],
    verdict:
      "These aren't really alternatives to choose between — pick Midjourney for image generation and Lovable for building a working application, and expect to use both together rather than instead of each other if your project needs custom visuals inside a real app.",
  },
  "cursor-vs-supermaven": {
    description:
      "Cursor is a full agentic AI editor; Supermaven is a single-purpose autocomplete tool built for the fastest, most context-aware completions.",
    intro: [
      "Cursor and Supermaven sit at different points on the same spectrum. Cursor is a complete AI-native code editor — a VS Code fork built around agentic, multi-file edits, codebase-wide chat, and a model picker spanning Claude, GPT, Gemini, and Grok. Supermaven is deliberately narrower: it's an autocomplete extension you add to whatever editor you already use, built around a 1M-token context window and completions fast enough to feel like part of typing rather than a round trip to a server.",
      "The tradeoff is breadth versus depth in one specific skill. Cursor can plan and execute changes across a whole codebase, open pull requests, and hold a conversation about your architecture — capabilities Supermaven doesn't attempt. Supermaven's narrower focus means its tab-completion is often faster and more context-aware than what a general-purpose agentic editor prioritizes, since that's the only thing it's optimizing for.",
    ],
    verdict:
      "Choose Cursor if agentic, multi-file development is the actual job you need done. Choose Supermaven if autocomplete is the AI feature you use constantly and you want the fastest, most context-aware version of it in your existing editor. Some developers run both: Cursor for agent work, Supermaven's extension for raw completion speed elsewhere.",
  },
  "chatgpt-vs-devin-ai": {
    description:
      "ChatGPT is a general-purpose assistant you converse with; Devin is an autonomous coding agent that takes a ticket and returns a pull request.",
    intro: [
      "ChatGPT and Devin are both AI products from the current wave, but they're built for almost entirely different jobs. ChatGPT is a general-purpose conversational assistant — writing, research, brainstorming, coding help, image generation — that responds interactively while you drive the conversation. Devin, from Cognition, is an autonomous AI software engineer: you hand it a ticket or task description, and it plans, writes, tests, and iterates on code largely on its own in its own environment, returning a pull request rather than a chat reply.",
      "The difference is interactive help versus delegated work. ChatGPT can absolutely help you write or debug code, but you're the one driving each step and applying the result. Devin is built to be given a well-scoped task and left alone to complete it asynchronously — genuinely useful for offloading routine engineering chores, but with less moment-to-moment control than a conversation.",
    ],
    verdict:
      "Choose ChatGPT for interactive help across writing, research, and coding where you want to stay in the loop on every step. Choose Devin specifically for well-defined, self-contained coding tasks you're comfortable delegating and reviewing after the fact — a bug fix, a small feature, a migration. They aren't substitutes: one is a conversation partner, the other is a task you assign and check on later.",
  },
  "cursor-vs-tabnine": {
    description:
      "Cursor chases the most capable agentic coding experience; Tabnine trades some capability for on-prem, privacy-first AI completion.",
    intro: [
      "Cursor and Tabnine both put AI into code completion, but they're optimizing for opposite priorities. Cursor is an AI-native editor chasing the most capable agentic experience available — multi-file edits, codebase-wide chat, and completions powered by frontier cloud models. Tabnine has settled into a different niche entirely: privacy and compliance. It offers on-premises and air-gapped deployment, and lets regulated organizations fine-tune a model on their own codebase without that code ever leaving their infrastructure.",
      "The honest tradeoff is capability for control. Cursor's completions and agent features consistently rank ahead of Tabnine's, because Cursor isn't constrained by the architectural compromises that come with on-prem deployment. Tabnine's pitch isn't raw quality — it's that your proprietary code never has to touch a third-party cloud, which matters enormously to organizations under strict data-governance rules and not at all to everyone else.",
    ],
    verdict:
      "Choose Cursor if you want the most capable agentic coding experience available and don't have restrictions on sending code to a cloud model. Choose Tabnine if your organization has compliance requirements that rule out third-party cloud APIs and you're willing to trade some capability — and pay for Tabnine's enterprise plan — for on-premises or air-gapped deployment.",
  },
  "bolt-new-vs-windsurf-ide": {
    description:
      "Bolt.new builds full-stack apps from a prompt in your browser; Windsurf is an AI-native desktop IDE built for ongoing development.",
    intro: [
      "Bolt.new and Windsurf both bring agentic AI to building software, but for different stages of a project. Bolt.new is a browser-based app builder: describe what you want, and it scaffolds, runs, and deploys a full-stack app instantly, with zero local setup. Windsurf is a full desktop IDE — a VS Code fork built around an agent (Cascade) that tracks your intent across a session, handles deep codebase context, and supports multi-file edits and refactoring the way a professional development environment needs to.",
      "The right tool tracks how far along your project is. For a zero-to-prototype app or a quick MVP, Bolt's sandboxed browser environment gets something working in front of you fastest, with nothing to configure. Once a project needs a real local environment, git history, custom tooling, or ongoing maintenance across a growing codebase, Windsurf's full IDE gives you the control Bolt's browser sandbox doesn't.",
    ],
    verdict:
      "Choose Bolt.new for fast prototypes and simple apps you want running in minutes with no setup. Choose Windsurf for real, ongoing development where you need a complete local IDE and deeper codebase-aware editing. A common path: prototype in Bolt, then move into Windsurf (or another full IDE) once the project needs to grow past a demo.",
  },
  "github-copilot-vs-aider": {
    description:
      "GitHub Copilot is a polished, GUI-based coding assistant across major IDEs; Aider is a free, open-source, terminal-only pair programmer.",
    intro: [
      "GitHub Copilot and Aider both write code with AI, but they represent opposite philosophies. Copilot is a commercial product tightly integrated into VS Code, JetBrains, and other major editors — inline completions, chat, and agent mode, all with a polished GUI and a flat subscription price. Aider is free and open source, runs entirely in a terminal with no GUI or editor plugin, and edits files directly in a git repository — committing each change with an auto-generated message so every AI edit is a discrete, reviewable commit.",
      "The differences that matter are cost, model choice, and interface. Copilot bundles its AI into one subscription with a specific set of models; Aider is model-agnostic — you bring an API key for Claude, GPT, Gemini, or a local model, and pay the provider directly rather than a flat fee. Copilot's GUI is friendlier for developers who want inline suggestions as they type; Aider's terminal-first, git-clean workflow appeals to developers who live in the command line and want precise control over what gets committed.",
    ],
    verdict:
      "Choose GitHub Copilot if you want a polished, GUI-integrated assistant with predictable subscription pricing across your existing editor. Choose Aider if you're comfortable in a terminal, want to pick your own model, and value having every AI change land as a clean, individually reviewable git commit. Aider's free-and-open-source model makes it worth trying even if you end up sticking with Copilot day to day.",
  },
};

export function getCompareEditorial(slug: string): CompareEditorial | undefined {
  return COMPARE_EDITORIAL[slug];
}
