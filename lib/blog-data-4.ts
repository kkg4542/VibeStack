import { BlogPost } from "./blog-types";

/**
 * Batch 4 — "vibe coding" niche content.
 * This is VibeStack's positioning angle: curating the AI stack for people who
 * build fast by describing what they want. Posts target the niche's search
 * terms and link internally to /tool (affiliate), /best, and /build.
 * Content is factual and current for mid-2026 — no fabricated benchmarks.
 */
export const postsBatch4: BlogPost[] = [
  {
    slug: "complete-vibe-coding-stack-2026",
    title: "The Complete Vibe Coding Stack for 2026",
    excerpt:
      "The exact stack that makes vibe coding work in 2026 — editor, app builder, assistant, review, and deployment — plus why each pick wins its layer, where the layers grind against each other, what to cut at each budget, and the mistakes that quietly cost you a weekend.",
    date: "Jul 18, 2026",
    updated: "Sep 18, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "12 min read",
    image: "/images/blog/ultimate-developer-stack-2026.png",
    tags: ["Vibe Coding", "AI Stack", "Cursor", "v0", "Bolt.new"],
    content: `
      <p><strong>Vibe coding</strong> is a simple idea: you describe what you want in plain language, and AI writes, edits, and ships most of the code. You stay in the driver's seat — steering, reviewing, deciding — but you're no longer typing every line. Done well, it's the fastest way to build software today.</p>
      <p>The catch is that vibe coding only works as well as your <em>stack</em>. Here's the exact set of tools we recommend in mid-2026, layer by layer, updated for the latest models and releases — plus why each pick wins its layer, where the layers grind against each other, and what to cut when the budget is tight. New to the idea? Start with <a href="/blog/what-is-vibe-coding">what vibe coding actually is</a>. Want a personalized version? <a href="/build">Take the 60-second stack quiz</a>.</p>
      <p>One framing up front: a layer earns its place only if it covers a failure the others can't. The editor has no taste about UI, the builder loses coherence past a certain size, the assistant can't see your repo, and review catches what none of them notice.</p>

      <h2>1. The editor — where you live</h2>
      <p><a href="/tool/cursor">Cursor</a> is the heart of most vibe coding stacks. It's an AI-first editor that indexes your whole codebase, predicts multi-file edits, and runs an agent that can implement a feature from a single sentence. The Cursor 3.11 release (July 2026) added a side chat panel, searchable agent transcripts, a Cursor for iOS public beta, and first-class support for xAI's <strong>Grok 4.5</strong> — a model co-trained on real Cursor usage data. Its Composer 2.5 agent handles the multi-file heavy lifting. If you want the most powerful "describe it and watch it happen" experience, start here.</p>
      <p>Prefer to stay in your current editor? <a href="/tool/github-copilot">GitHub Copilot</a> brings strong AI into VS Code, JetBrains, and more — see our <a href="/blog/cursor-vs-github-copilot">Cursor vs GitHub Copilot</a> breakdown. Also worth a look: <a href="/tool/devin-ai">Devin Desktop</a>, the AI editor Codeium shipped as Windsurf; Cognition now calls Devin Desktop "the new name for Windsurf", and its plans and pricing carried over (our <a href="/blog/cursor-vs-windsurf">Cursor vs Windsurf</a> comparison describes the pre-rebrand version).</p>

      <h2>2. The app builder — zero to working app</h2>
      <p>When you want to go from prompt to a running app without local setup, reach for an app builder:</p>
      <ul>
        <li><a href="/tool/v0-by-vercel">v0 by Vercel</a> — best for polished React + Tailwind UI you can drop into a codebase.</li>
        <li><a href="/tool/bolt-new">Bolt.new</a> — full-stack apps in an in-browser environment with a live preview.</li>
        <li><a href="/tool/lovable">Lovable</a> — product-minded building for non-developers shipping an MVP.</li>
      </ul>
      <p>Full comparison: <a href="/blog/ai-app-builders-bolt-v0-lovable">Bolt.new vs v0 vs Lovable</a>. A popular pattern is to prototype in one of these, then move the code into Cursor to finish the hard parts.</p>

      <h2>3. The assistant — your thinking partner</h2>
      <p>Outside the editor you'll want a frontier assistant for planning, debugging, and writing. The 2026 landscape is richer than ever:</p>
      <ul>
        <li><a href="/tool/claude">Claude</a> — led by <strong>Claude Opus 5</strong> (Anthropic's recommended starting point for most workloads), with <strong>Claude Fable 5.1</strong> as the escalation tier above it and <strong>Claude Sonnet 5</strong> as the fast default for Free and Pro users. Excellent at long-context reasoning and code review.</li>
        <li><a href="/tool/chatgpt">ChatGPT</a> — now led by <strong>GPT-6 Astra</strong> (September 2026), which OpenAI calls "the world's most intelligent and aligned model" and describes as state of the art on software engineering, computer use, and browsing; the earlier <strong>GPT-5.6</strong> family (Sol, Terra, Luna) is still available. The broadest ecosystem of the three.</li>
        <li><a href="/tool/perplexity">Perplexity</a> — for cited, verifiable research (see <a href="/blog/chatgpt-vs-perplexity">ChatGPT vs Perplexity</a>).</li>
      </ul>
      <p>Many vibe coders keep two open — one to plan, one to double-check. See <a href="/blog/chatgpt-vs-claude">ChatGPT vs Claude</a> to pick your primary. If you prefer open weights, Meta's <strong>Llama 5</strong> (a 600B-parameter open model with a 5M-token context, released April 2026) is a strong self-hostable option, and Google's <strong>Gemini 3.8 Flash</strong> is a capable, fast choice for agentic and coding work.</p>

      <h2>4. Design &amp; media — make it look shipped</h2>
      <p>Round out the stack with <a href="/tool/framer">Framer</a> for production websites from a prompt, <a href="/tool/midjourney">Midjourney</a> for imagery, and <a href="/tool/elevenlabs">ElevenLabs</a> for voice if your product needs audio (<a href="/blog/elevenlabs-review">our ElevenLabs review</a>). If you already have a design system and brand tokens to respect, read <a href="/blog/nocode-design-v0">v0 vs Builder.io</a> before picking a generative UI tool — the two solve very different problems.</p>

      <h2>5. Version control &amp; deployment — ship it safely</h2>
      <p>Vibe coding produces code fast, which makes version control matter <em>more</em>, not less. Commit early and often so you can always roll back an agent run that went sideways — a clean git history is your undo button. When it's time to go live, <a href="/tool/vercel">Vercel</a> deploys most modern web apps in minutes with automatic previews on every push, so you can share a working link before the feature is even finished. GitHub plus Vercel (or a similar host) is the quiet backbone that lets the flashy AI layers stay reckless without you losing work.</p>

      <h2>6. Review — the layer everyone skips</h2>
      <p>This is what separates a stack that scales from one that collapses in week three. When you generate code faster than you read it, review debt builds up silently: the app works, so nothing forces you to look, and by the time you do there are three competing patterns for the same problem. The agent won't flag any of it, because each change was locally reasonable.</p>
      <p>Two cheap habits fix most of that. Put an automated reviewer on your pull requests — <a href="/tool/coderabbit">CodeRabbit</a> comments line by line on a diff and catches exactly what agents get wrong: an unhandled error path, a changed function signature whose other callers weren't updated, a secret that drifted into a committed file. Then ask for tests as part of each feature, not after it. A few tests around your core flows are what let you accept a 400-line refactor without reading every line.</p>

      <h2>7. Planning — where the prompt comes from</h2>
      <p>Vibe coding usually fails not because the AI wrote bad code but because the request was vague. "Add user settings" produces something; "add a settings page with email, password change, and notification toggles, using the existing form components, saving optimistically" produces the right thing.</p>
      <p>Solo, a markdown file of scoped tasks is enough. With more than one person, <a href="/tool/linear">Linear</a> is the standard pick — its issues are small and specific enough to paste almost verbatim into an agent, a real advantage over loosely-worded tickets (see <a href="/blog/linear-method-explained">why Linear's method wins</a>). Pair it with <a href="/tool/notion-ai">Notion AI</a> if architecture decisions need to live somewhere you can point an assistant at. A well-specified issue is already most of a good prompt.</p>

      <h2>How the layers work together</h2>
      <p>The magic isn't any single tool — it's the handoff between them. A typical loop: plan the feature with your assistant, generate the UI in v0 or Bolt.new, drop it into Cursor and let the agent wire up the logic, review and commit, then deploy on Vercel. When something breaks, paste the error back into your assistant or let the editor's agent debug it. The goal isn't the most impressive stack — it's the smallest one that gets you from idea to shipped.</p>

      <h2>Where the layers grind against each other</h2>
      <p>Every stack has seams. Knowing them in advance is the difference between a smooth weekend and a lost one.</p>
      <ul>
        <li><strong>Builder output doesn't match your project.</strong> Generated UI assumes a component library, a Tailwind config, and a styling convention, so dropping it into an existing codebase means inheriting a second design system. Paste your conventions into the prompt first, and treat the import as a refactor rather than a copy-paste.</li>
        <li><strong>Builder costs scale with repo size, not request size.</strong> In-browser builders keep the model aware of your whole file tree, so a one-line change in a mature project costs far more than it did on day one. Budget by codebase size — same economics we unpack in <a href="/blog/token-economics-2026">token economics</a>.</li>
        <li><strong>Your assistant can't see what your editor did.</strong> You plan a feature in a chat window, the editor's agent implements it slightly differently, and your assistant's mental model is now stale. Re-paste the actual code before asking follow-ups.</li>
        <li><strong>Two agents in one repo.</strong> An editor agent and a background agent touching overlapping files produce conflicts that look like bugs. Keep concurrent agents on separate branches.</li>
        <li><strong>Builder-hosted infrastructure is the real lock-in.</strong> The generated code is portable; the database, auth, and storage wired into a builder's own platform are less so. Export early and confirm it runs locally.</li>
      </ul>

      <h2>Budget tiers</h2>
      <table>
        <thead>
          <tr><th>Tier</th><th>Roughly</th><th>What you get</th></tr>
        </thead>
        <tbody>
          <tr><td>Free</td><td>$0</td><td>Cursor free + one assistant free tier + v0/Bolt free credits</td></tr>
          <tr><td>Solo builder</td><td>~$30&ndash;50/mo</td><td>Cursor Plus ($8) or Premium ($30) + Claude Pro or ChatGPT Plus ($20); enough to build daily</td></tr>
          <tr><td>Full stack</td><td>~$95/mo + Framer</td><td>Cursor Premium + both assistants + an app builder (Bolt.new or Lovable Pro, $25) + Framer for sites</td></tr>
        </tbody>
      </table>
      <p>If you can only pay for one thing, pay for the editor — that's where the hours go and where the paid tier changes the most, roughly the difference between an agent that finishes a feature and one that gives up partway. The order to cut everything else, first to last: the app builder, the second assistant, the design tools (a plain Tailwind landing page ships fine), and only then the editor.</p>
      <p>There's also a genuinely cheap route: run open-weight models locally with <a href="/tool/ollama">Ollama</a> for zero marginal cost, no rate limits, and nothing leaving your machine. You pay in capability — local models still trail the frontier on multi-file agentic work — but for autocomplete, boilerplate, and refactors inside one well-defined file it's more than good enough, paired with a single frontier assistant for the hard problems. See <a href="/blog/local-llm-llama4">running open models locally</a>.</p>

      <h2>A starter stack (free-friendly)</h2>
      <ol>
        <li><strong>Cursor</strong> (free tier) as your editor</li>
        <li><strong>v0</strong> or <strong>Bolt.new</strong> for fast UI/prototypes</li>
        <li><strong>Claude</strong> or <strong>ChatGPT</strong> as your assistant</li>
        <li><strong>Framer</strong> when you need a real landing page</li>
      </ol>
      <p>Set that up, then ship something small end to end before adding a thing. For a worked example of that loop under time pressure, <a href="/blog/build-app-in-a-weekend-ai-stack">building an app in a weekend</a> walks through it hour by hour.</p>

      <h2>Common mistakes</h2>
      <ul>
        <li><strong>Assembling the whole stack before shipping anything.</strong> The most common failure isn't a bad tool choice, it's spending the first weekend choosing tools. One editor, one assistant, one deploy target and a live page beats a five-layer stack and nothing shipped.</li>
        <li><strong>Letting an agent run without committing first.</strong> An agent that touches twelve files and makes things worse is only a problem if you can't get back. That one habit removes most of the risk from this entire approach.</li>
        <li><strong>No tests, then wondering if the refactor broke something.</strong> Without a few tests you can't tell "the agent improved this" from "the agent quietly broke a path I don't exercise."</li>
        <li><strong>Prompting for features instead of constraints.</strong> Describing <em>what</em> to build gets generic output; adding the file layout, components to reuse, and patterns to avoid gets something you'd have written yourself.</li>
        <li><strong>Staying in the app builder too long.</strong> Builders are the fastest route to the first version and the slowest to the tenth. When changes start costing more and landing worse, that's the signal to export into an editor, not to buy a bigger plan.</li>
        <li><strong>Never reading the generated code.</strong> Not every line — but if you can't explain roughly how your app works, you can't debug it under pressure or judge whether the next suggestion is reasonable.</li>
        <li><strong>Chasing every model release.</strong> Swapping your workflow on every announcement costs more than the marginal gain. Re-evaluate on a schedule instead.</li>
      </ul>

      <h2>The stack at a glance</h2>
      <table>
        <thead>
          <tr><th>Layer</th><th>Top pick</th><th>Alternatives</th></tr>
        </thead>
        <tbody>
          <tr><td>Editor</td><td>Cursor (3.11, Composer 2.5)</td><td>GitHub Copilot, Devin Desktop</td></tr>
          <tr><td>App builder</td><td>v0 by Vercel</td><td>Bolt.new, Lovable</td></tr>
          <tr><td>Assistant</td><td>Claude (Sonnet 5 / Opus 5 / Fable 5.1)</td><td>ChatGPT (GPT-6 Astra), Gemini 3.8 Flash</td></tr>
          <tr><td>Research</td><td>Perplexity</td><td>ChatGPT deep research</td></tr>
          <tr><td>Design &amp; ship</td><td>Framer</td><td>Midjourney, ElevenLabs</td></tr>
          <tr><td>Review</td><td>CodeRabbit</td><td>Your own PR discipline</td></tr>
          <tr><td>Planning</td><td>Linear</td><td>Notion, a markdown file</td></tr>
        </tbody>
      </table>
      <p>That's enough to ship a real product solo. Browse everything in our <a href="/best/coding">best AI coding tools</a> and <a href="/best/design">best AI design tools</a> guides, see the individual rankings in <a href="/blog/best-ai-tools-for-vibe-coding">the best AI tools for vibe coding</a>, or <a href="/build">build your personalized stack</a>.</p>
    `,
    faq: [
      {
        q: "What tools do I need to start vibe coding?",
        a: "Three: an AI-first editor, a frontier assistant, and somewhere to deploy. Cursor plus Claude or ChatGPT plus Vercel is a complete stack, and all three have free plans, though Vercel's free Hobby plan is for personal, non-commercial use only. Everything else — an app builder, design tools, automated review, a planning tool — is worth adding once you've shipped something and know which layer is actually slowing you down.",
      },
      {
        q: "How much does a vibe coding stack cost per month?",
        a: "You can start at $0 on free tiers. A serious solo setup runs roughly $30 to $50 a month: Cursor Plus ($8) or Premium ($30, needed for Claude and GPT models) plus Claude Pro or ChatGPT Plus ($20). A full stack with both assistants and an app builder starts around $95 before design tools. Prices change, so check each vendor's pricing page. If you only pay for one thing, pay for the editor — that's where the paid tier changes the most about what you can actually finish.",
      },
      {
        q: "Do I still need to know how to code?",
        a: "Not to build something that works, but yes to keep it working. Non-developers ship real MVPs with app builders every week. The difference shows up in debugging, judging whether a suggestion is reasonable, and handling anything involving auth, payments, or data you can't afford to lose. You don't need to write every line, but you should be able to explain roughly how your own app works.",
      },
      {
        q: "Should I use Cursor or an app builder like Bolt.new?",
        a: "Both, at different stages. App builders are the fastest path from nothing to a running prototype with no local setup, but each change gets more expensive and less reliable as the project grows. Editors are slower to start and don't hit that wall. The standard 2026 pattern is to generate the first version in a builder, then export the code into Cursor and finish the hard parts there.",
      },
      {
        q: "What's the biggest mistake beginners make?",
        a: "Assembling the whole stack before shipping anything. The second biggest is letting an agent run across a dozen files without committing first — an agent that makes things worse is only a real problem if you can't get back to a working state. Commit before every meaningful agent run and most of the risk in this approach disappears.",
      },
      {
        q: "Do I need automated code review if I'm working solo?",
        a: "It helps more solo than on a team, because there's nobody else looking. When you generate code faster than you read it, review debt builds up invisibly: duplicated helpers, three patterns for the same problem, unhandled error paths. A tool like CodeRabbit reads the diff with fresh eyes, which is exactly the perspective the agent that wrote the code lacks.",
      },
    ],
  },
  {
    slug: "what-is-vibe-coding",
    callout: { kind: "guide", slug: "coding" },
    title: "What Is Vibe Coding? A Beginner's Guide (2026)",
    excerpt:
      "Vibe coding means building software by describing what you want and letting AI write it. Here's what the term really means, who it's for, the tools that power it, and how to start.",
    date: "Jul 18, 2026",
    updated: "Sep 18, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "7 min read",
    image: "/images/blog/vibe-coding-manifesto.png",
    tags: ["Vibe Coding", "AI Coding", "Beginner"],
    content: `
      <p>"Vibe coding" is everywhere in 2026 — but what does it actually mean? In short: <strong>you build software by describing what you want in natural language, and AI handles most of the implementation.</strong> You guide the direction and review the output; the AI does the typing.</p>

      <h2>Where the term comes from</h2>
      <p>It captures a shift in how building feels. Instead of remembering exact syntax and writing every line, you work at the level of intent — "add a login page with Google auth," "make this responsive," "fix this bug" — and an AI editor or agent makes the change. You're coding by vibes: steering toward the result you can picture, and correcting course when the output drifts. The term went mainstream once AI editors got good enough that whole features could be built this way, not just autocompleted line by line.</p>

      <h2>Why it took off in 2026</h2>
      <p>Two things had to be true for vibe coding to work: the models had to be smart enough to hold a real codebase in context, and the tools had to turn that intelligence into safe, reviewable edits. Both arrived. Frontier assistants like <a href="/tool/claude">Claude</a> (Sonnet 5, Opus 5 and the top-tier Fable 5.1) and <a href="/tool/chatgpt">ChatGPT</a> (GPT-6 Astra, with the GPT-5.6 family below it) reason across large projects, while AI editors like <a href="/tool/cursor">Cursor</a> run agents that edit multiple files, run commands, and verify the result. The gap between "I want this" and "it exists" has never been smaller.</p>

      <h2>A concrete example</h2>
      <p>Say you want a simple habit tracker. Instead of scaffolding a project by hand, you open an AI editor and type: "Create a habit tracker with a list of habits, a daily checkbox for each, and a streak counter." The agent generates the components, state, and storage, and shows you a running app. You review it, then refine by conversation: "Make completed habits turn green," "Add a weekly view," "Store this in a database so it persists." Each request is a sentence; each result is real, working code you approve. That loop — describe, review, refine — <em>is</em> vibe coding.</p>

      <h2>Vibe coding vs. traditional coding vs. no-code</h2>
      <p>It sits between two older approaches. Traditional coding gives you total control but demands you write and remember everything. No-code tools are fast but box you into their features. Vibe coding splits the difference: you get the speed of describing intent <em>and</em> the flexibility of real code underneath, because the AI is writing that code, not hiding it behind a locked visual editor. When you outgrow a no-code tool you hit a wall; when you outgrow a prompt, you just open the code and keep going.</p>
      <table>
        <thead>
          <tr><th></th><th>Traditional coding</th><th>Vibe coding</th><th>No-code</th></tr>
        </thead>
        <tbody>
          <tr><td>How you work</td><td>Write every line yourself</td><td>Describe intent, review the code</td><td>Click through a visual editor</td></tr>
          <tr><td>Speed</td><td>Slowest</td><td>Fast</td><td>Fast</td></tr>
          <tr><td>Ceiling</td><td>None</td><td>None &mdash; it's real code underneath</td><td>The tool's feature set</td></tr>
          <tr><td>Skill needed</td><td>Write and remember everything</td><td>Specify clearly, review sharply</td><td>Little to none</td></tr>
          <tr><td>When you outgrow it</td><td>You don't</td><td>Open the code and keep going</td><td>You hit a wall</td></tr>
        </tbody>
      </table>

      <h2>Who it's for</h2>
      <ul>
        <li><strong>Experienced developers</strong> who want to move 5&ndash;10x faster on boilerplate, refactors, and glue code.</li>
        <li><strong>Indie hackers &amp; founders</strong> shipping MVPs solo, without a team.</li>
        <li><strong>Designers and non-developers</strong> who can now turn ideas into working apps with tools like <a href="/tool/lovable">Lovable</a> and <a href="/tool/bolt-new">Bolt.new</a>.</li>
      </ul>

      <h2>Common mistakes beginners make</h2>
      <ul>
        <li><strong>Accepting code you don't understand.</strong> If you can't tell what a change does, ask the AI to explain it before you move on — that's how you learn and how you catch bugs.</li>
        <li><strong>Prompting for too much at once.</strong> Big vague requests produce big vague messes. Build in small, testable steps.</li>
        <li><strong>Skipping version control.</strong> Commit often so a bad agent run is a one-click undo, not a lost afternoon.</li>
        <li><strong>Not running the app.</strong> Test after every meaningful change so a bug can't hide several prompts deep.</li>
      </ul>

      <h2>What it is NOT</h2>
      <p>It's not "no skill required." The best vibe coders still understand architecture, review AI output critically, and know when the AI is wrong. AI amplifies judgment — it doesn't replace it. On large or sensitive codebases, human review matters more, not less: an agent that confidently ships a subtle bug is worse than no agent at all if nobody checks. The skill is shifting from typing code to specifying intent clearly and reviewing output sharply.</p>

      <h2>How to start</h2>
      <ol>
        <li>Get an AI-first editor — <a href="/tool/cursor">Cursor</a> is the most popular starting point, and its free tier is enough to learn on.</li>
        <li>Add an assistant like <a href="/tool/claude">Claude</a> or <a href="/tool/chatgpt">ChatGPT</a> for planning and debugging.</li>
        <li>Try an app builder like <a href="/tool/v0-by-vercel">v0</a> or <a href="/tool/bolt-new">Bolt.new</a> to go from idea to running app fast.</li>
      </ol>
      <p>That's the whole starting kit — one editor, one assistant, one app builder, all with free tiers. If you want the full menu of options at each layer before you commit, our guide to the <a href="/blog/best-ai-tools-for-vibe-coding">best AI tools for vibe coding</a> breaks down every layer of the stack and what each one is actually for.</p>

      <h2>A first project to try</h2>
      <p>Pick something small and real — a personal dashboard, a link-in-bio page, a simple CRUD app. Describe the one core flow to your editor's agent, review each change it proposes, and run the app after every step. You'll learn more in one weekend of building this way than in a month of reading about it. When you're ready to go bigger, our <a href="/blog/build-app-in-a-weekend-ai-stack">weekend build playbook</a> walks through a full project stage by stage.</p>
      <h2>Skills that still matter</h2>
      <p>Vibe coding lowers the barrier to entry, but it rewards a few skills more than ever. Clear thinking: the better you can describe what you want, the better the output. Reading code: you don't have to write every line, but you need to recognize when a line is wrong. Debugging instinct: knowing how to isolate a problem and feed the AI the right context turns a stuck afternoon into a five-minute fix. And architectural judgment: deciding how the pieces fit together is still a human call. AI handles the typing; you handle the thinking — and the people who thrive are the ones who lean into that division of labor rather than expecting the AI to do both.</p>

      <p>Ready to assemble your toolkit? Read <a href="/blog/complete-vibe-coding-stack-2026">The Complete Vibe Coding Stack for 2026</a> or <a href="/build">take the stack quiz</a>.</p>
    `,
    faq: [
      {
        q: "What is vibe coding in simple terms?",
        a: "Vibe coding is building software by describing what you want in plain language and letting AI write most of the implementation. You work at the level of intent — \"add a login page with Google auth,\" \"make this responsive\" — and an AI editor or agent makes the change. You still steer, review, and decide; the AI does the typing.",
      },
      {
        q: "How do I start vibe coding?",
        a: "Three steps. Get an AI-first editor — Cursor is the most popular starting point and its free tier is enough to learn on. Add an assistant like Claude or ChatGPT for planning and debugging. Then pick something small and real, describe the one core flow to your editor's agent, and run the app after every change. A weekend of building this way teaches you more than a month of reading about it.",
      },
      {
        q: "Do I need to know how to code to vibe code?",
        a: "Not to get started — tools like Lovable and Bolt.new let designers and non-developers turn ideas into working apps. But vibe coding is not \"no skill required.\" The best vibe coders understand architecture, review AI output critically, and know when the AI is wrong. Reading code matters even when you're not writing it: you need to recognize when a line is wrong.",
      },
      {
        q: "Is vibe coding the same as no-code?",
        a: "No. No-code tools are fast but box you into their feature set, so when you outgrow them you hit a wall. Vibe coding produces real code underneath, so when you outgrow a prompt you just open the file and keep going. It sits between traditional coding and no-code: the speed of describing intent with the flexibility of actual code.",
      },
      {
        q: "What tools do I need for vibe coding?",
        a: "One tool per layer is enough to start: an AI-first editor (Cursor), a frontier assistant (Claude or ChatGPT) for planning and debugging, and optionally an app builder (v0 or Bolt.new) when you want to skip setup and start from a running app. All of them have free tiers, so you can assemble a complete loop without spending anything.",
      },
      {
        q: "What mistakes do beginners make with vibe coding?",
        a: "Four keep showing up: accepting code you don't understand, prompting for too much at once, skipping version control, and not running the app between changes. The fixes are simple — ask the AI to explain a change before moving on, build in small testable steps, commit often so a bad agent run is a one-click undo, and test after every meaningful change so a bug can't hide several prompts deep.",
      },
    ],
  },
  {
    slug: "cursor-vs-windsurf",
    title: "Cursor vs Windsurf: Best AI Editor 2026",
    excerpt:
      "Both are AI-first code editors built for vibe coding. Here's how Cursor and Windsurf compare on agents, codebase context, models, UX, and price in mid-2026.",
    date: "Jul 18, 2026",
    updated: "Sep 18, 2026",
    author: "David Kim",
    category: "Comparison",
    readTime: "7 min read",
    image: "/images/blog/blog_cursor_ide.png",
    tags: ["Cursor", "Windsurf", "AI Editor"],
    content: `
      <p><strong>Update:</strong> Windsurf no longer ships under that name. Cognition acquired it from Codeium in July 2025 and renamed it <a href="/tool/devin-ai">Devin Desktop</a>; devin.ai/desktop calls it "the new name for Windsurf", and windsurf.com/pricing now redirects to devin.ai/pricing. Cognition says plans and pricing carried over. The feature comparison below describes Windsurf before the rename, so check Cognition's site for what Devin Desktop offers today.</p>

      <p>If you're choosing an AI-first editor for vibe coding, the two names that come up most are <a href="/tool/cursor">Cursor</a> and Windsurf, now <a href="/tool/devin-ai">Devin Desktop</a>. Both are forks of VS Code reimagined around AI, so your extensions and keybindings come along either way. The differences are in the agent, the flow, and the feel. Here's how they compare in mid-2026.</p>

      <h2>Agents &amp; multi-file editing</h2>
      <p>Both can take a natural-language instruction and edit across multiple files. Cursor's agent — now on the <strong>Composer 2.5</strong> architecture in the Cursor 3.11 release (July 2026) — is extremely mature and fast, and the update added a side chat panel, searchable agent transcripts, and a Cursor for iOS public beta. Windsurf, built by Codeium, leans on its <strong>Flow</strong> context awareness, which is praised for keeping track of what you're doing across a long session and feeling more guided. If you like an agent that proactively follows your train of thought, Windsurf is compelling; if you want maximum raw agent power and control, Cursor edges ahead.</p>

      <h2>Autocomplete &amp; Tab</h2>
      <p>Beyond the agent, the everyday experience is inline prediction. Cursor's "Tab" is famous for predicting multi-line edits and your next likely change, not just the next token — it often stages the exact edit you were about to make three lines down. Windsurf's completions are strong and fast too, with its own supercomplete-style suggestions. For many developers this moment-to-moment autocomplete, more than the headline agent, is what makes an editor feel fast; both deliver, with Cursor's prediction slightly more aggressive and Windsurf's a touch calmer.</p>

      <h2>Codebase context</h2>
      <p>Both index your repository for context-aware suggestions. Cursor has a slight edge in raw prediction quality for many users; Windsurf's Flow-based context handling in longer flows is excellent. In practice both are strong — the difference is feel, not a capability gap you'll hit day to day.</p>

      <h2>Terminal &amp; command execution</h2>
      <p>Modern vibe coding leans on the agent running commands for you — installing packages, running tests, starting the dev server. Both editors let their agents execute terminal commands and read the output to self-correct, which is where a lot of the "it just did it" magic comes from. Cursor's agent is particularly comfortable chaining commands and reacting to failures; Windsurf's guided Flow keeps you looped in on what it's about to run. If you want the agent to move autonomously, either works — decide how much oversight you want and pick the one whose defaults match.</p>

      <h2>Models</h2>
      <p>Both editors are model-flexible and expose a picker, so you can run frontier models from OpenAI, Anthropic, and xAI in either — OpenAI's <strong>GPT-6 Astra</strong> and older <strong>GPT-5.6</strong> generations, Anthropic's <strong>Claude Sonnet 5</strong>, <strong>Claude Opus 5</strong> and <strong>Claude Fable 5.1</strong>, and xAI's Grok line, now on <strong>Grok 4.6</strong>. Cursor added Grok 4.5 as a first-class option in its 3.11 release — fitting, since that model was co-trained on real Cursor usage data. Pickers change release to release (and the Windsurf side of this comparison is frozen in its pre-rebrand state), so check the current list in the app. On model choice the two were effectively even; what differs is how each editor orchestrates those models around your code.</p>

      <h2>UX &amp; learning curve</h2>
      <p>Because both are VS Code forks, migration is painless. Windsurf is often described as cleaner out of the box, with a calmer default UI; Cursor exposes more power (and more knobs), which power users love and newcomers sometimes find busy. Try each for an afternoon — the "right" one is the one whose flow clicks for you.</p>

      <h2>Extensions &amp; migration</h2>
      <p>Because both are VS Code forks, switching is close to painless: your extensions, themes, and keybindings come across, and the file tree, command palette, and shortcuts you already know are all there. This is a big part of why developers try both — there's almost no switching cost, so you can run a real project through each over a couple of afternoons and let the experience decide rather than committing on faith.</p>

      <h2>Which one for which user</h2>
      <ul>
        <li><strong>You want maximum power and control</strong> — Cursor, with its deep settings and aggressive agent.</li>
        <li><strong>You want a calm, guided experience</strong> — Windsurf, whose Flow keeps you oriented without overwhelming you.</li>
        <li><strong>You're new to AI editors</strong> — either works, but Windsurf's cleaner defaults are a gentler on-ramp.</li>
        <li><strong>You want the most popular, best-documented option</strong> — Cursor has the larger community and more tutorials to lean on.</li>
      </ul>

      <h2>The bigger picture</h2>
      <p>Here's the reassuring part: you can't really make a wrong choice. Both are excellent, both stay current with the newest models, and both are improving on a rapid release cadence. Picking one isn't a marriage — export your project, install the other, and you're moved in within an afternoon. Spend less energy agonizing over the decision and more actually building; the editor that helps you ship today is the right one, and you can always switch tomorrow.</p>

      <h2>Comparison at a glance</h2>
      <table>
        <thead>
          <tr><th></th><th>Cursor</th><th>Windsurf</th></tr>
        </thead>
        <tbody>
          <tr><td>Base</td><td>VS Code fork</td><td>VS Code fork (by Codeium)</td></tr>
          <tr><td>Agent</td><td>Composer 2.5, very powerful</td><td>Flow, guided &amp; context-aware</td></tr>
          <tr><td>Standout</td><td>Raw agent power, iOS beta, transcripts</td><td>Clean UX, long-session coherence</td></tr>
          <tr><td>Models</td><td>OpenAI, Anthropic, xAI (Grok added in 3.11)</td><td>OpenAI, Anthropic, and more</td></tr>
          <tr><td>Feel</td><td>More power, more knobs</td><td>Cleaner, more guided</td></tr>
          <tr><td>Price</td><td>Free; Plus $8, Premium $30, Super $100, Ultra $200/mo</td><td>Free; Pro $20, Max $200/mo</td></tr>
        </tbody>
      </table>

      <h2>Pricing</h2>
      <p>Both offer free plans, but the paid ladders differ. For new customers, Cursor sells <strong>Free</strong> (Agent and Chat with limited usage, limited Tab, no third-party models), <strong>Plus</strong> at $8/mo (Cursor's own models only), <strong>Premium</strong> at $30/mo, <strong>Super</strong> at $100/mo and <strong>Ultra</strong> at $200/mo. Claude and GPT models need Premium or above and are billed at API list price, separate from the plan's pool. The older Hobby, Pro ($20) and Pro+ ($60) plans are legacy plans no longer sold to new customers. Because frontier-model usage is billed on top, two developers on the same plan can see very different bills.</p>
      <p>Windsurf, now Devin Desktop, runs Free ($0), Pro at <strong>$20/mo</strong> and Max at $200/mo. Its free plan is unusual in a good way: Tab completions and inline edits are unlimited, while agent work runs on a light quota with limited model availability. Start free on both, push a real task through each, and keep the winner; the deciding factor should be which flow you enjoy.</p>

      <h2>Verdict</h2>
      <ul>
        <li><strong><a href="/tool/cursor">Cursor</a></strong> — the more configurable of the two, and our pick if you want maximum agentic control.</li>
        <li><strong>Windsurf, now <a href="/tool/devin-ai">Devin Desktop</a></strong> — a cleaner, guided agent flow that many developers preferred for its calm, coherent sessions; Cognition's relaunch is the version you would install today.</li>
      </ul>
      <p>Either one anchors a great <a href="/blog/complete-vibe-coding-stack-2026">vibe coding stack</a>. The editor is only the first layer, though — see the <a href="/blog/best-ai-tools-for-vibe-coding">best AI tools for vibe coding</a> for the assistant, app builder, and deployment pieces that go around it. You can also browse more options in our <a href="/best/coding">best AI coding tools</a> guide, or compare Cursor with the other big rival in <a href="/blog/cursor-vs-github-copilot">Cursor vs GitHub Copilot</a>.</p>
    `,
    faq: [
      {
        q: "Is Cursor or Windsurf better in 2026?",
        a: "They're close enough that you can't really make a wrong choice. Cursor edges ahead on raw agent power and control — its Composer 2.5 agent is extremely mature, and Cursor 3.11 added a side chat panel, searchable agent transcripts, and an iOS public beta. Windsurf wins on calm: its Flow context awareness keeps long sessions coherent and its defaults are cleaner. Pick Cursor for maximum power, Windsurf for a more guided experience.",
      },
      {
        q: "How much does Windsurf cost?",
        a: "Windsurf is now Devin Desktop, and Cognition says its plans and pricing carried over: Free ($0), Pro ($20/mo) and Max ($200/mo). On Free, Tab completions and inline edits are unlimited, while agent work runs on a light quota with limited model availability, so heavy agent users will want Pro. See devin.ai/pricing for current details.",
      },
      {
        q: "How much does Cursor cost?",
        a: "New customers choose from Free (limited Agent, Chat and Tab, no third-party models), Plus at $8/mo (Cursor's own models only), Premium at $30/mo, Super at $100/mo and Ultra at $200/mo. Claude and GPT models need Premium or above and are billed at API list price, separate from the plan's pool, so your real cost depends on which models you use. Hobby, Pro ($20) and Pro+ ($60) are legacy plans no longer sold to new customers.",
      },
      {
        q: "Is Windsurf the same as Codeium?",
        a: "Codeium rebranded to Windsurf in late 2024, evolving from an autocomplete extension into a full AI editor, with an agent called Cascade — the direct equivalent of Cursor's Composer. The name changed again after that: Cognition acquired Windsurf in July 2025 and later renamed it Devin Desktop, which devin.ai/desktop calls \"the new name for Windsurf\".",
      },
      {
        q: "Can I switch between Cursor and Windsurf easily?",
        a: "Yes. Both are VS Code forks, so your extensions, themes, and keybindings come across and the file tree, command palette, and shortcuts are all where you expect. There's almost no switching cost, which is why so many developers run a real project through each over a couple of afternoons and let the experience decide.",
      },
      {
        q: "Do both editors support the newest models?",
        a: "Both are model-flexible and expose a picker covering OpenAI's GPT-6 Astra and GPT-5.6 generations, Anthropic's Claude Sonnet 5, Claude Opus 5 and Claude Fable 5.1, and more — the exact list changes release to release, and the Windsurf side here is frozen in its pre-rebrand state. Cursor additionally added xAI's Grok as a first-class option in its 3.11 release; Grok 4.5 was co-trained on real Cursor usage data, and xAI has since shipped Grok 4.6. On model choice the two were effectively even; what differs is how each editor orchestrates those models around your code.",
      },
    ],
  },
  {
    slug: "build-app-in-a-weekend-ai-stack",
    title: "Build an App in a Weekend with AI (2026)",
    excerpt:
      "A step-by-step playbook for shipping a working app in a weekend with vibe coding — the exact AI tools for each stage, hour by hour, updated for 2026.",
    date: "Jul 18, 2026",
    updated: "Sep 16, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "6 min read",
    image: "/images/blog/blog_cloud_dev.png",
    tags: [
      "Cursor",
      "Windsurf",
      "Claude",
      "ChatGPT",
      "v0",
      "Bolt.new",
      "Framer",
      "Vercel",
      "Vibe Coding",
      "Indie Hacking",
    ],
    content: `
      <p>Shipping a real app in a weekend used to be a stretch goal. With the right vibe coding stack, it's a realistic plan. Here's the exact playbook and the tools for each stage — plus the mistakes that quietly eat your weekend if you're not careful.</p>

      <h2>Before you start — set the table</h2>
      <p>The builders who finish do a little prep. Make sure you have accounts (and free credits) ready for the tools you'll use, so you're not signing up mid-flow. Have a GitHub repo and a <a href="/tool/vercel">Vercel</a> account set up for deployment. And most importantly, come in with a <em>tiny</em> idea — something you could describe in one sentence. "A tool that does X for Y" beats "a platform for Z" every time. If you can't state the app in a breath, it's too big for a weekend.</p>

      <h2>Friday night — shape the idea</h2>
      <p>Open <a href="/tool/claude">Claude</a> (Sonnet 5 is plenty for this) or <a href="/tool/chatgpt">ChatGPT</a> and talk through the idea: who it's for, the one core flow, and the simplest version worth shipping. Have it draft a feature list and a basic data model. Then do the most important thing of the whole weekend — <strong>cut scope</strong>. Pick <em>one</em> thing your app does well and delete everything else from the plan. The number one reason weekend builds fail isn't the code; it's trying to ship three features instead of one.</p>

      <h2>Saturday morning — generate the UI</h2>
      <p>Use <a href="/tool/v0-by-vercel">v0</a> to generate the screens from a prompt, or <a href="/tool/bolt-new">Bolt.new</a> to spin up a full-stack starter with a live preview. You'll have something clickable within the first hour. Don't polish yet — you just want the skeleton of every screen your core flow touches, so you can feel whether the flow makes sense before you build the logic behind it. (Comparing the two? See <a href="/blog/ai-app-builders-bolt-v0-lovable">Bolt.new vs v0 vs Lovable</a>.)</p>

      <h2>Saturday afternoon — build the core in your editor</h2>
      <p>Move into <a href="/tool/cursor">Cursor</a> (or <a href="/tool/devin-ai">Devin Desktop</a>, the editor Codeium launched as Windsurf, if you prefer a calmer flow) and implement the core flow by describing it. Let the agent — Cursor's Composer 2.5 handles multi-file work — wire up state, routes, and the database. Two rules keep this fast: <strong>review every change</strong> (vibe coding works because you stay the editor-in-chief), and <strong>run the app after every step</strong> so a bug never hides three prompts deep. If the agent goes down a wrong path, stop it early and re-specify rather than patching on top of a bad foundation.</p>

      <h2>Sunday morning — connect the real pieces</h2>
      <p>Now wire in the things a demo can fake but a product can't: authentication, a real database, and any external API your core flow needs. Describe each integration to your editor's agent and let it scaffold the boilerplate, then test the unhappy paths — what happens when a request fails, a field is empty, or a user isn't logged in. This is where vibe coding pays off most: the tedious plumbing that used to eat a full day now takes an hour of prompting and review.</p>

      <h2>Sunday afternoon — polish &amp; ship</h2>
      <p>Use <a href="/tool/framer">Framer</a> for a quick landing page, deploy on <a href="/tool/vercel">Vercel</a>, and write your launch copy with your assistant. Add analytics, fix the rough edges the AI missed, and ship it. Resist the urge to add "just one more feature" — a shipped, small app beats an unshipped, ambitious one every single time.</p>

      <h2>What to skip</h2>
      <p>Half of finishing is knowing what <em>not</em> to build. For a weekend project, skip user settings pages, admin dashboards, onboarding flows, edge-case error handling beyond the basics, and anything labeled "nice to have." Skip custom design systems — use whatever the app builder or a component library gives you. Skip premature optimization; nobody's app fell over from too few users on launch day. Every hour you don't spend on these is an hour toward actually shipping the one thing that matters.</p>

      <h2>After the weekend</h2>
      <p>You shipped — now what? Put the link in front of a few real people and watch where they get confused; that's your roadmap. Fix the top one or two friction points, then decide honestly whether the idea has legs before pouring in more time. Many weekend builds are experiments, and that's the point: the cost of trying an idea has collapsed, so build several, ship them all, and let the ones people actually use tell you where to invest.</p>

      <h2>The mindset that makes it work</h2>
      <p>The tools are only half of it; the other half is how you approach the weekend. Treat it as a sprint toward a shippable thing, not a search for the perfect thing. Make decisions fast and reversibly — you can always change them later. When you're stuck, ask the AI to explain the problem before asking it to fix the problem; you'll debug faster and actually learn something. And protect your energy: two focused four-hour blocks beat one exhausted twelve-hour grind. Momentum is the real resource, and shipping something small on Sunday is what keeps it alive for the next build.</p>

      <h2>The weekend stack at a glance</h2>
      <table>
        <thead>
          <tr><th>Stage</th><th>Tool</th><th>Goal</th></tr>
        </thead>
        <tbody>
          <tr><td>Plan</td><td>Claude / ChatGPT</td><td>Scope down to one core flow</td></tr>
          <tr><td>UI</td><td>v0 / Bolt.new</td><td>Clickable screens fast</td></tr>
          <tr><td>Build</td><td>Cursor / Devin Desktop</td><td>Implement the core flow</td></tr>
          <tr><td>Integrate</td><td>Cursor agent</td><td>Auth, database, APIs</td></tr>
          <tr><td>Ship</td><td>Framer + Vercel</td><td>Landing page &amp; deploy</td></tr>
        </tbody>
      </table>
      <p>Want this tailored to your role and budget? <a href="/build">Take the stack quiz</a> or read the full <a href="/blog/complete-vibe-coding-stack-2026">Complete Vibe Coding Stack</a> guide. New to the whole idea? Start with <a href="/blog/what-is-vibe-coding">What Is Vibe Coding?</a></p>
    `,
    faq: [
      {
        q: "Can you really build an app in a weekend with AI?",
        a: "Yes, if you scope it to one core flow. The constraint in 2026 isn't how fast code gets written — an agent can scaffold auth, a database layer, and a half-dozen screens in an afternoon — it's how much you try to build. A weekend is enough for one thing done well and deployed to a real URL; it is not enough for three features, an admin panel, and a settings page.",
      },
      {
        q: "What AI tools do I need to build an app in a weekend?",
        a: "One per stage: an assistant (Claude or ChatGPT) to shape the idea and cut scope, an app builder (v0 or Bolt.new) to generate clickable screens fast, an AI editor (Cursor) to implement the core flow and wire up auth and data, and Vercel to deploy. Framer is optional for a landing page. Every one of these has a free plan, so a first personal build costs nothing; Vercel's free Hobby plan is for personal, non-commercial use, so a commercial launch needs Vercel Pro ($20/mo).",
      },
      {
        q: "Do I need to know how to code to do this?",
        a: "You need to be able to read code, not write it. The agent produces the implementation, but you're the editor-in-chief: reviewing each change, spotting when it has gone down the wrong path, and stopping it early. Non-developers can get further with Lovable or Bolt.new, which handle the backend and deployment for you, but you'll still move faster if you can tell what a diff does.",
      },
      {
        q: "How long does each stage take?",
        a: "Roughly: Friday night for scoping and a data model (1–2 hours), Saturday morning for generated UI (2–3 hours), Saturday afternoon for the core flow in your editor (3–4 hours), Sunday morning for auth, database, and APIs (3 hours), Sunday afternoon for a landing page, deploy, and launch copy (2–3 hours). Two focused four-hour blocks per day beats one exhausted twelve-hour grind.",
      },
      {
        q: "What should I skip in a weekend build?",
        a: "User settings pages, admin dashboards, onboarding flows, custom design systems, edge-case error handling beyond the basics, and anything labeled \"nice to have.\" Skip premature optimization too — no weekend project has ever fallen over from too many users on launch day. Every hour you don't spend on these is an hour toward shipping the one thing that matters.",
      },
      {
        q: "Why do most weekend builds fail?",
        a: "Scope, not code. The builds that don't ship almost always tried to do three things instead of one. The second most common failure is not running the app between changes, which lets a bug hide three prompts deep and turns Sunday into a debugging session. Cut scope until the app fits in one sentence, commit before every agent run, and test after every meaningful change.",
      },
    ],
  },
  {
    slug: "best-ai-tools-for-vibe-coding",
    callout: { kind: "guide", slug: "coding" },
    relatedStack: "vibe-coding",
    title: "Best Vibe Coding Tools (2026): What's Free, What Costs Money",
    excerpt:
      "Which vibe coding tools are free and which cost money: free plan limits, first paid plans and catches for 12 tools, checked on vendor pages Nov 8, 2026.",
    date: "Jul 18, 2026",
    updated: "Nov 8, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "13 min read",
    image: "/images/blog/cursor-vs-vscode.png",
    tags: [
      "Cursor",
      "Windsurf",
      "GitHub Copilot",
      "Claude",
      "ChatGPT",
      "v0",
      "Bolt.new",
      "Lovable",
      "Vercel",
      "Vibe Coding",
      "AI Stack",
    ],
    content: `
      <p><em>Checked against each vendor's pricing page on November 8, 2026.</em></p>
      <p>You can start vibe coding for $0. Every tool in the table below has a free way in (for Ollama, that means local models on your own hardware). The catch is that free plans differ far more than their names suggest: one gives you a daily message cap, another will not let you touch the code it wrote, and a third forbids commercial use. Several pricing pages also changed recently, so a lot of what you will read elsewhere, including older versions of this page, is out of date.</p>
      <p>This guide covers the four layers a vibe coding setup needs, a table of what each tool's free plan gives you and what its first paid plan costs, the specific limits you will hit and when, three ways to start, and when paying actually makes sense. Every price and limit below comes from the vendor's own pricing page, linked in each row. New to the idea? Read <a href="/blog/what-is-vibe-coding">What Is Vibe Coding?</a> first.</p>

      <h2>The four layers you actually need</h2>
      <p>A working setup has four jobs to cover. You need one tool per job, not one of everything.</p>
      <h3>1. An AI editor or agent</h3>
      <p>This is where the code lives and where an agent makes changes across your project. Cursor, Devin Desktop (the editor formerly called Windsurf), GitHub Copilot and Kiro sit here. If you plan to keep a project past the first weekend, this is the layer you will spend the most time in.</p>
      <h3>2. An app builder</h3>
      <p>App builders go from a prompt to a running app in the browser with no local setup. v0, Bolt.new, Lovable and Replit sit here. They are the quickest way to see whether an idea works, but each one limits what you can do with the code on its free plan, so read the catches before you build anything you want to keep.</p>
      <h3>3. A general assistant</h3>
      <p>Claude or ChatGPT is where you plan a feature, paste an error the agent cannot fix, or ask for a second opinion on a diff. Both also have coding agents of their own (Claude Code and Codex), which is where their free plans differ most.</p>
      <h3>4. A deploy target</h3>
      <p>Something has to turn your code into a public URL. Vercel is the common choice for web apps, and some app builders publish for you. The deploy layer is also where "free" most often stops being enough, because hosting terms decide whether you can run a business on it.</p>

      <h2>Free vs paid: every tool in one table</h2>
      <p>"What the free plan gives" uses each vendor's own wording, shortened. "First paid plan" is the cheapest plan a new customer can buy today. Vendors change these often, so each row links to the pricing page we checked.</p>
      <table>
        <thead>
          <tr><th>Tool</th><th>Free plan</th><th>What the free plan gives (vendor wording)</th><th>First paid plan</th><th>The catch</th></tr>
        </thead>
        <tbody>
          <tr><td><a href="/tool/cursor">Cursor</a></td><td>Yes (Free)</td><td>Agent and Chat with limited usage, limited Tab</td><td>Plus, $8/mo (Cursor's own models only)</td><td>No third-party models on Free or Plus. Claude and GPT models need Premium ($30/mo) or above and are billed at API list price, separate from the plan. <a href="https://cursor.com/pricing" target="_blank" rel="noopener">Pricing page</a></td></tr>
          <tr><td><a href="/tool/devin-ai">Devin Desktop (Windsurf)</a></td><td>Yes ($0)</td><td>A light quota to code with agents, limited model availability, unlimited inline edits, unlimited Tab completions</td><td>Pro, $20/mo</td><td>Free has only a light agent quota and limited model availability. <a href="https://devin.ai/pricing" target="_blank" rel="noopener">Pricing page</a></td></tr>
          <tr><td><a href="/tool/github-copilot">GitHub Copilot</a></td><td>Yes, no credit card</td><td>2,000 completions per month, entry-level models, Copilot CLI, limited chat and agent usage</td><td>Pro, $10/user/mo</td><td>Completions are capped per month and GitHub says allotments may change over time. <a href="https://github.com/features/copilot/plans" target="_blank" rel="noopener">Pricing page</a></td></tr>
          <tr><td><a href="/tool/claude">Claude</a></td><td>Yes (Free)</td><td>Some of Claude's models (not the top tier), limited usage every 5 hours and every week; web search, code execution, Artifacts, connectors</td><td>Pro, $20/mo billed monthly ($17/mo billed annually, $200 up front)</td><td>Claude Code is not included in Free; it starts at Pro. <a href="https://claude.com/pricing" target="_blank" rel="noopener">Pricing page</a></td></tr>
          <tr><td><a href="/tool/chatgpt">ChatGPT (Codex)</a></td><td>Yes (Free)</td><td>Free includes "limited Codex access"</td><td>Go, $8/mo in the US (localised elsewhere)</td><td>Go is the plan that may include ads. Plus is $20/mo. <a href="https://learn.chatgpt.com/docs/pricing" target="_blank" rel="noopener">Pricing page</a></td></tr>
          <tr><td><a href="/tool/v0-by-vercel">v0</a></td><td>Yes (Free)</td><td>7 messages a day, $5 of one-time credits for new users, Design Mode, GitHub sync, deploy to Vercel</td><td>Plus, $30/user/mo per v0's docs (see the pricing page)</td><td>The 7-message daily cap, and new users get $5 once, not every month. The old Premium plan is closed to new users. <a href="https://v0.app/pricing" target="_blank" rel="noopener">Pricing page</a></td></tr>
          <tr><td><a href="/tool/bolt-new">Bolt.new</a></td><td>Yes, free forever, no card</td><td>1M tokens a month with a 300K daily limit</td><td>Pro, $25/mo</td><td>Bolt branding on your websites. Pro removes it and adds a custom domain. <a href="https://bolt.new/pricing" target="_blank" rel="noopener">Pricing page</a></td></tr>
          <tr><td><a href="/tool/lovable">Lovable</a></td><td>Yes (Free)</td><td>5 build credits a day, up to 30 a month; Git sync; publishing to invited people only (up to 10 per project)</td><td>Pro, from $25/mo (100 credits)</td><td>You cannot edit or download code on Free, and there is no custom domain. <a href="https://docs.lovable.dev/introduction/plans-and-credits" target="_blank" rel="noopener">Pricing page</a></td></tr>
          <tr><td><a href="/tool/replit">Replit</a></td><td>Yes (Starter)</td><td>A daily Agent allowance, limited monthly cloud credits, basic Agent access, one published app</td><td>Core, includes $20 of monthly credits ($18/mo billed annually; check the pricing page for monthly billing)</td><td>One published app on Starter. <a href="https://replit.com/pricing" target="_blank" rel="noopener">Pricing page</a></td></tr>
          <tr><td><a href="/tool/vercel">Vercel</a></td><td>Yes (Hobby, $0)</td><td>"For personal, non-commercial use"; 1M CDN requests, 100 GB Fast Data Transfer, 1M function invocations and 4 hours of Fluid Active CPU a month, 10 GB deployment storage, 1 seat</td><td>Pro, $20/mo</td><td>Non-commercial only, and Hobby cannot buy extra usage. A real product needs Pro. <a href="https://vercel.com/pricing" target="_blank" rel="noopener">Pricing page</a></td></tr>
          <tr><td><a href="/tool/ollama">Ollama</a></td><td>Yes, for local models</td><td>Local models are free, with no subscription or service fees, unlimited on your own hardware</td><td>Pro, $20/mo (for cloud models)</td><td>Cloud models are paid per token with usage credits and have a 3-concurrent-request limit. <a href="https://ollama.com/pricing" target="_blank" rel="noopener">Pricing page</a></td></tr>
          <tr><td>Kiro (AWS)</td><td>Yes (free tier)</td><td>50 credits a month</td><td>Pro, $20/user/mo</td><td>The free tier is 50 credits a month; check the pricing page for what a credit covers. <a href="https://kiro.dev/pricing" target="_blank" rel="noopener">Pricing page</a></td></tr>
        </tbody>
      </table>
      <p>Two names have moved. Devin Desktop is Windsurf: Cognition's own page calls it "the new name for Windsurf", and windsurf.com/pricing now redirects to devin.ai/pricing. And Cursor's Pro, Pro+, Hobby and Teams plans still appear in many articles, but Cursor lists them as legacy plans that new customers can no longer buy; new customers choose from Free, Plus, Premium ($30/mo), Super ($100/mo) and Ultra ($200/mo).</p>

      <h2>What the free plans cannot do</h2>
      <p>Each free plan has one limit that decides whether it works for you. Here is each one, framed by when you will run into it.</p>
      <ul>
        <li><strong>v0: 7 messages a day.</strong> You will hit this on the first real afternoon of iterating on a UI. New users also get $5 of credits once, not monthly, so the free plan is a trial run for a screen or two, not a place to build a whole app.</li>
        <li><strong>Lovable: no code editing or downloading, and private publishing.</strong> You will hit this the moment you want to change a line by hand or take the code elsewhere. Git sync is included on Free, but publishing is limited to people you invite (up to 10 per project) and there is no custom domain, so you cannot launch to the public on Free.</li>
        <li><strong>Vercel Hobby: non-commercial use only.</strong> You will hit this the day the project makes money or is built for a business. Vercel describes Hobby as "for personal, non-commercial use", and Hobby cannot buy extra usage when you exceed its monthly limits. A paying product belongs on Pro ($20/mo).</li>
        <li><strong>Claude: no Claude Code on Free.</strong> You will hit this as soon as you want Claude's agent working inside your repository rather than in a chat window. Claude Code starts at Pro. The free chat plan is still useful for planning and debugging, within its 5-hour and weekly usage limits.</li>
        <li><strong>Bolt.new: branding and token caps.</strong> You will hit the 300K daily token limit on a long build session, and the branding the day you want to show the site to customers. Pro ($25/mo) removes the daily limit and the branding and adds a custom domain.</li>
        <li><strong>Replit: one published app.</strong> You will hit this when you want a second project live at the same time. Starter also has only a daily Agent allowance and limited monthly cloud credits.</li>
        <li><strong>Cursor Free: no third-party models.</strong> You will hit this if you want Claude or GPT models inside Cursor. They are not on Free or Plus; Cursor requires Premium or above and bills them at API list price on top of the plan.</li>
        <li><strong>GitHub Copilot Free: 2,000 completions a month.</strong> You will hit this in steady daily use, and chat and agent usage are limited too. Pro is $10/user/mo.</li>
      </ul>

      <h2>Three ways to start</h2>
      <p>Each of these uses only the plans in the table above. Totals add the listed monthly prices and nothing else.</p>

      <h3>1. The $0 stack: editor, assistant, deploy</h3>
      <p>Use <a href="/tool/cursor">Cursor</a> Free as your editor, <a href="/tool/claude">Claude</a> Free for planning and debugging, and <a href="/tool/vercel">Vercel</a> Hobby to deploy. That is the same three tools as our <a href="/stack/vibe-coding">Vibe Coding Stack</a>, on their free plans. Total: $0 a month.</p>
      <p>What you give up: Cursor Free has limited Agent, Chat and Tab usage and no third-party models; Claude Free has 5-hour and weekly limits and no Claude Code; Vercel Hobby is for personal, non-commercial projects only. If you prefer to stay in VS Code, swap Cursor for <a href="/tool/github-copilot">GitHub Copilot</a> Free (2,000 completions a month); if you want unlimited Tab completions, try <a href="/tool/devin-ai">Devin Desktop</a> Free. Either way the total stays $0. For comparison, see <a href="/compare/cursor-vs-github-copilot">Cursor vs GitHub Copilot</a>.</p>

      <h3>2. App builder first</h3>
      <p>If you would rather not set up an editor yet, start in a builder. Our <a href="/stack/weekend-build">Weekend Build Stack</a> uses <a href="/tool/claude">Claude</a> to shape the idea, <a href="/tool/bolt-new">Bolt.new</a> to build the app in the browser, and <a href="/tool/vercel">Vercel</a> to deploy it. On free plans that costs $0, with Bolt branding on the site and Vercel Hobby's non-commercial rule.</p>
      <p>Which builder to pick, based on the free plans: Bolt.new if you want a monthly token allowance (1M tokens a month, 300K a day); <a href="/tool/v0-by-vercel">v0</a> if you mainly need UI and are happy with 7 messages a day; <a href="/tool/replit">Replit</a> if you want one published app hosted in the same place you build it; <a href="/tool/lovable">Lovable</a> only if you are fine not editing or downloading the code until you pay. Our judgment, based on those limits: plan to move the code into an editor once the idea proves itself, because every builder's free plan caps how far one project can go. Side by side: <a href="/compare/v0-by-vercel-vs-bolt-new">v0 vs Bolt.new</a> and <a href="/compare/cursor-vs-replit">Cursor vs Replit</a>.</p>

      <h3>3. Around $20 a month: pay for one layer</h3>
      <p>Pay for the one layer whose limit you hit first, and keep everything else free. Three verified ways to spend about $20:</p>
      <ul>
        <li><strong>Claude Pro ($20/mo billed monthly) + Copilot Free or Devin Desktop Free + Vercel Hobby = $20/mo.</strong> This is the option that unlocks Claude Code, the agent that works in your repository. Billed annually, Claude Pro is $17/mo ($200 up front).</li>
        <li><strong>Devin Desktop Pro ($20/mo) + Claude Free + Vercel Hobby = $20/mo.</strong> Choose this if the editor's agent quota is what keeps stopping you.</li>
        <li><strong>ChatGPT Plus ($20/mo) + Copilot Free + Vercel Hobby = $20/mo.</strong> Choose this if you already work in ChatGPT and want more than Free's limited Codex access.</li>
      </ul>
      <p>If you want something cheaper, Copilot Pro is $10/user/mo and Cursor Plus is $8/mo (Cursor's own models only). If the project is commercial, add Vercel Pro at $20/mo to any of these, which makes the total $40/mo. See <a href="/compare/chatgpt-vs-claude">ChatGPT vs Claude</a> if you are choosing between the two assistants.</p>

      <h2>Setup order: blank editor to live URL</h2>
      <ol>
        <li><strong>Install an editor.</strong> Pick one from the table (Cursor, Devin Desktop, or Copilot inside VS Code) and open an empty folder. Put it under git from the first minute so any agent change can be undone.</li>
        <li><strong>Open an assistant in a browser tab.</strong> Claude Free or ChatGPT Free. Use it to write a one-paragraph spec: who the app is for, the one thing it does, and what you are leaving out.</li>
        <li><strong>Build the first feature with the agent.</strong> Paste the spec into the editor's agent, ask for the smallest working version, and run the app after every change. Review each diff before accepting it. If you would rather start from a running app, generate it in a builder first (see <a href="/compare/cursor-vs-v0-by-vercel">Cursor vs v0</a>) and bring the code over.</li>
        <li><strong>Deploy.</strong> Connect the repository to Vercel and push. Hobby is fine while the project is personal and non-commercial.</li>
        <li><strong>Pay only when a limit stops you.</strong> Note which cap you keep hitting, then use the rules below to decide what, if anything, to buy.</li>
      </ol>

      <h2>When to pay</h2>
      <p>Pay when a specific limit blocks something you need, not because a plan sounds better. These are the triggers that matter:</p>
      <ul>
        <li><strong>The project is commercial.</strong> Move from Vercel Hobby to Pro ($20/mo). Hobby is for personal, non-commercial use, so this is a terms question, not a traffic question.</li>
        <li><strong>You need a custom domain on a builder-hosted site.</strong> Bolt.new Pro ($25/mo) adds one and removes the branding. Lovable's free plan has no custom domain; its Pro plan starts at $25/mo.</li>
        <li><strong>You need to edit or own the code from Lovable.</strong> Editing and downloading code are not on Lovable's free plan.</li>
        <li><strong>You keep running out of daily allowance.</strong> v0 Free stops at 7 messages a day and Bolt.new Free at 300K tokens a day. If that happens every session, either pay for that builder or move the project into an editor.</li>
        <li><strong>You want Claude Code.</strong> It needs Claude Pro ($20/mo billed monthly) or higher.</li>
        <li><strong>You want Claude or GPT models inside Cursor.</strong> That needs Cursor Premium ($30/mo) or above, plus API list-price usage on top. Our judgment: if that is the main reason to pay, compare it with paying for Claude Pro or ChatGPT Plus directly before deciding.</li>
      </ul>

      <h2>Avoid starting here</h2>
      <p>These tools still appear in many lists, but they are a poor place to begin today:</p>
      <ul>
        <li><strong><a href="https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals" target="_blank" rel="noopener">Gemini Code Assist for individuals</a>.</strong> Google says that starting June 18, 2026 the IDE extensions stopped serving requests for the individual, AI Pro and AI Ultra tiers, and points users to Antigravity.</li>
        <li><strong><a href="https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-developer-ide-end-of-support.html" target="_blank" rel="noopener">Amazon Q Developer IDE plugins</a>.</strong> AWS says it will discontinue support for the Q Developer IDE plugins on April 30, 2027, and points to Kiro. The pricing page still lists a Free tier (50 agentic requests a month) and Pro at $19/user/mo, but starting there means planning a move within months.</li>
        <li><strong>Tabnine.</strong> Its public pricing URL now redirects to a contact-sales page. There is no public price we could verify; check with the vendor.</li>
        <li><strong>Cody (Sourcegraph).</strong> Sourcegraph's pricing page lists only an Enterprise plan with a minimum annual contract. No Cody plan or free plan is listed.</li>
      </ul>

      <h2>How we check this</h2>
      <p>Every price, plan name and free-plan limit on this page was checked against the vendor's own pricing or documentation page on November 8, 2026, and each table row links to the page we used. Where a vendor's pages disagree (v0's pricing page shows a figure that its docs do not explain), we say so and use the documented number. Where we could not verify a price, we say that instead of estimating one.</p>
      <p>What we did not do: we did not benchmark model quality or compare code output between tools, so nothing here ranks tools on how good their AI is. Prices and allowances change, sometimes without notice (GitHub says its allotments "may change over time"), so check the vendor's pricing page before you buy. For a broader ranking of coding tools, see our <a href="/best/coding">best AI coding tools</a> guide.</p>
    `,
    faq: [
      {
        q: "Is vibe coding free?",
        a: "You can start for $0. Cursor, Devin Desktop, GitHub Copilot, Claude, ChatGPT, v0, Bolt.new, Lovable, Replit, Vercel and Kiro all have free plans, and Ollama is free for local models on your own hardware. The free plans have real limits, though: for example v0 allows 7 messages a day, Lovable does not let you edit or download code, and Vercel Hobby is for personal, non-commercial use only.",
      },
      {
        q: "What is the cheapest way to start vibe coding?",
        a: "A $0 stack: Cursor Free (or GitHub Copilot Free, or Devin Desktop Free) as the editor, Claude Free or ChatGPT Free as the assistant, and Vercel Hobby to deploy a personal project. If you want to pay for one thing, the cheapest verified paid plans here are Cursor Plus at $8/mo (Cursor's own models only), ChatGPT Go at $8/mo in the US, and Copilot Pro at $10/user/mo. Checked against vendor pricing pages on November 8, 2026.",
      },
      {
        q: "Is Cursor still free?",
        a: "Yes. New customers get Cursor's Free plan, which includes Agent and Chat with limited usage and limited Tab. Third-party models such as Claude and GPT are not on Free; they need Premium ($30/mo) or above and are billed at API list price. The old Pro, Pro+, Hobby and Teams plans are legacy plans that new customers can no longer buy; the cheapest paid plan for new customers is Plus at $8/mo.",
      },
      {
        q: "Is Windsurf now Devin Desktop?",
        a: "Yes. Cognition's devin.ai/desktop page calls Devin Desktop \"the new name for Windsurf\", and windsurf.com/pricing redirects to devin.ai/pricing. The Free plan ($0) includes a light agent quota, limited model availability, unlimited inline edits and unlimited Tab completions. Pro is $20/mo and Max is $200/mo.",
      },
      {
        q: "Can I use Claude Code on the free plan?",
        a: "No. Claude Code is not included in Claude's Free plan. It is available on Pro ($20/mo billed monthly, or $17/mo billed annually at $200 up front), Max ($100/mo) and Ultra ($200/mo). Claude Free still covers chat with web search, code execution, Artifacts and connectors, with usage limits every 5 hours and every week.",
      },
      {
        q: "Is Vercel Hobby OK for a real product?",
        a: "Not for a commercial one. Vercel describes Hobby as \"for personal, non-commercial use\", and Hobby cannot buy extra usage beyond its monthly limits. A product that makes money or serves a business needs Vercel Pro, which is $20/mo. Hobby is fine for personal, non-commercial projects.",
      },
    ],
  },
];
