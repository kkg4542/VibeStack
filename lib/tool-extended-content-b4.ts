import type { ToolExtendedContent } from "./tool-extended-content";

/**
 * Batch 4 extended editorial content — otter-ai, slack-ai, supermaven,
 * tabnine, zoom-ai-companion. Written to match the tone, structure, and
 * internal-linking pattern of lib/tool-extended-content.ts. Kept as a
 * separate module to avoid merge conflicts with other in-flight batches;
 * merge into TOOL_EXTENDED_CONTENT (or have getExtendedContent read both)
 * once all batches land.
 */
export const TOOL_EXTENDED_CONTENT_B4: Record<string, ToolExtendedContent> = {
    "otter-ai": {
        overviewHtml: `
            <p><strong>Otter.ai</strong> does one job: it turns spoken conversation into searchable text. What keeps it independent in a market where every video platform now ships its own assistant is that it is not attached to a platform. An Otter bot joins through your calendar, so a week of meetings scattered across Zoom, Google Meet, and Microsoft Teams lands in a single archive with one summary format and one search box, instead of three archives that cannot see each other. For a team standardized on one platform, a native assistant like <a href="/tool/zoom-ai-companion">Zoom AI Companion</a> is the cheaper and less intrusive choice. For everyone whose calendar is a mix, that consolidation is the whole reason to pay.</p>

            <p>The mechanics are straightforward. OtterPilot joins the call, transcribes in real time with speaker labels, and afterward produces a summary, a list of extracted action items, and a transcript you can search by keyword or query conversationally through Otter Chat — closer to how <a href="/tool/notion-ai">Notion AI</a> queries a workspace, but scoped to things people said out loud. You can also upload recordings you already have, which matters more than it sounds: a backlog of old interviews or calls becomes searchable without re-running anything. Action items are something you review and then move into <a href="/tool/asana">Asana</a>, <a href="/tool/jira">Jira</a>, or wherever work actually lives. Otter is not a task tracker and does not pretend to be one.</p>

            <h3>Where the transcript degrades</h3>

            <p>Otter is good on clean audio with one person speaking at a time, and it is worth being specific about what breaks that rather than waving at accuracy in the abstract. Cross-talk is the biggest failure mode: when two people overlap, the transcript tends to interleave them or assign the whole passage to whoever was louder. A conference room where several people share one microphone is the hardest case for speaker separation, because the model has far less signal to distinguish voices than when everyone is on their own headset — the same meeting can transcribe well remotely and badly in person. Strong accents and non-native speech reduce word accuracy. Domain jargon, product names, and people's names get mangled routinely unless you add them to a custom vocabulary, which is a real feature and worth ten minutes of setup for any recurring meeting. Otter has historically been English-first, so multilingual teams should confirm current language coverage against their actual meetings rather than assuming.</p>

            <p>The single improvement most teams skip is labeling the speakers. Attribution becomes substantially more useful once voices are named, and an unlabeled transcript full of Speaker 1 and Speaker 2 loses most of its value three months later when nobody remembers who was on the call.</p>

            <h3>Having a transcript is not having a meeting record</h3>

            <p>This gap decides whether Otter is worth it. A transcript is a complete, unstructured record of what was said. A useful meeting record is a short, structured statement of what was decided and who owns what next — and the second does not fall out of the first automatically. Otter's summaries are a genuine head start, and they do flatten things: a decision reversed late in the call, a dissent voiced once and not repeated, an action item implied rather than stated. Anything consequential is worth checking against the transcript, which is quick precisely because the transcript is searchable. Teams that get real value here treat the summary as a draft a human edits, not as minutes.</p>

            <p>Several situations argue against Otter outright. A third-party recording bot is a compliance problem in legal, HR, M&amp;A, and clinical settings, where a native platform feature already carries an approval that an outside vendor does not. Recording consent is jurisdictional and is not Otter's problem to solve on your behalf — announce the bot, and check local rules before making auto-join the default across an entire calendar. If all your meetings happen on one platform, you are paying a second time for something already bundled. And if the real problem is that your meetings are unfocused, a transcript will not fix it. You will simply own a complete and permanent record of a bad meeting.</p>
        `,
        useCases: [
            {
                title: "One archive across mixed video platforms",
                body: "Teams whose calls land on Zoom, Meet, and Teams in the same week get a consistent transcript and summary format regardless of platform, and one place to search them, instead of stitching together three native exports that each behave differently.",
            },
            {
                title: "Interview and research transcription",
                body: "Journalists, UX researchers, and academics transcribe one-on-one interviews into searchable text so they can quote accurately and find a specific exchange across dozens of past conversations without scrubbing audio.",
            },
            {
                title: "Processing recordings you already have",
                body: "Existing audio and video files can be uploaded and transcribed, which turns a backlog of old calls, webinars, or field recordings into searchable text without anyone repeating the original session.",
            },
            {
                title: "Reading a meeting you could not attend",
                body: "Rather than blocking an hour to watch a recording, someone who missed a call reads the summary and jumps to the two sections that concern them — the main reason people keep Otter running on meetings they routinely skip.",
            },
            {
                title: "Live text for accessibility",
                body: "Real-time transcription gives participants who are deaf or hard of hearing, or who simply process written language faster, a live text stream to follow during the call rather than a transcript that only arrives afterward.",
            },
            {
                title: "Follow-up capture for solo operators",
                body: "Founders and freelancers with no one taking notes rely on automatic summaries and extracted action items so commitments made during back-to-back calls do not quietly evaporate by the end of the day.",
            },
            {
                title: "Reconstructing an old decision",
                body: "When a choice made months ago resurfaces, Otter Chat can be asked about it in plain language across accumulated meeting history — considerably faster than guessing which recording it was and scrubbing through it.",
            },
        ],
        pricingDetail:
            "Otter.ai is freemium. The free tier includes real-time transcription and basic summaries but caps monthly transcription minutes tightly enough that anyone recording meetings regularly will hit the ceiling. Paid Pro and Business tiers raise that allowance and add deeper search, more integrations, and team administration. The structural point to note when budgeting is that cost here tracks minutes recorded as well as seats, so a small team that records everything can cost more than a larger one that records selectively — which makes an explicit policy about what actually gets recorded a cost decision, not just a privacy one.",
        faq: [
            {
                q: "Does Otter work with Zoom, Google Meet, and Microsoft Teams?",
                a: "Yes, and that cross-platform reach is the core reason to choose it over a platform-native assistant. It joins through a calendar integration and produces the same transcript and summary format no matter which video tool hosted the call.",
            },
            {
                q: "How accurate is the transcription?",
                a: "Strong on clean audio with people speaking one at a time, and noticeably worse with heavy cross-talk, background noise, shared conference-room microphones, or strong accents. Rather than trusting a headline accuracy figure from anyone, test it on a recording of your own worst-case meeting — that is the condition that determines whether it is useful to you.",
            },
            {
                q: "Can Otter reliably tell speakers apart?",
                a: "It separates speakers well when each person has their own microphone and takes turns, and struggles when several people share one room mic or talk over each other. Taking a few minutes to label voices improves attribution meaningfully, and adding names and jargon to a custom vocabulary reduces the most annoying transcription errors.",
            },
            {
                q: "Do I need to tell people the bot is recording?",
                a: "Assume yes, and check your own jurisdiction — recording consent rules vary by country and by state, and Otter does not resolve them for you. There is a practical dimension beyond the legal one: because Otter joins as a visible third-party participant rather than a native platform feature, some hosts and compliance teams will object to its presence even where recording is permitted.",
            },
            {
                q: "Is the free plan enough?",
                a: "For occasional calls, yes. For anyone recording several meetings a week, the monthly minute cap runs out well before the month does, and a paid plan becomes the practical requirement rather than an upgrade.",
            },
        ],
    },

    "slack-ai": {
        overviewHtml: `
            <p><strong>Slack AI</strong> tackles a different problem than meeting assistants like <a href="/tool/otter-ai">Otter.ai</a> or <a href="/tool/zoom-ai-companion">Zoom AI Companion</a>: it isn't about audio at all, it's about the sheer volume of written asynchronous conversation that piles up across channels and threads. In a busy Slack workspace, the cost of missing a day is real — dozens of channels, hundreds of messages, and no realistic way to read them all. Slack AI is built directly into Slack to summarize that backlog, recap what you missed, and let you ask questions of your workspace's message history in plain language instead of scrolling, and unlike a bolt-on browser extension, it runs natively inside the same interface people already spend the day in.</p>

            <p>The concrete features are channel and thread summaries (condensing a long-running discussion into a few sentences), daily recap digests delivered automatically, and an AI-powered search layer that answers natural-language questions grounded in your actual Slack history — conceptually similar to how <a href="/tool/notion-ai">Notion AI</a>'s Ask Notion answers from your own documents rather than the open web. All of it runs inside Slack's existing security and permissions boundary, so summaries and search results stay scoped to channels you already have access to; there is no separate index that leaks content from private channels you were never a member of. For a manager returning from a week away, or a new hire trying to understand why a decision was made, that grounded search is often more useful than the summaries themselves.</p>

            <p>The strength is real: for anyone in a large, high-volume workspace, cutting through channel overload with a two-sentence summary instead of scrolling a 300-message thread is a genuine time saver, and it compounds across a team rather than helping just one person. The honest weaknesses are structural. Slack AI is only as good as your Slack hygiene — a workspace with messy channel naming, no clear structure, and important decisions buried in random DMs gives Slack AI little to work with, and it has nothing to say about context that lives outside Slack entirely, in a tool like <a href="/tool/jira">Jira</a> or a document in <a href="/tool/coda">Coda</a>. It is also sold as a paid add-on layered on top of an existing paid Slack plan rather than something available to free or entry-tier workspaces, which puts it out of reach for smaller or budget-constrained teams who might benefit from it just as much as a large enterprise would.</p>

            <p>Who it is for: mid-size and large organizations with genuinely high Slack message volume, distributed or async-first teams spread across time zones who can't realistically read everything live, and anyone tired of scrolling long threads to find one decision. Who it is not for: small teams with light Slack usage where there's little backlog to summarize in the first place, or teams whose real institutional knowledge lives outside Slack in documents and tickets rather than in chat messages, where the summaries simply have less to draw on.</p>
        `,
        useCases: [
            {
                title: "Catching up after time off",
                body: "Returning from vacation or a busy stretch, employees use Slack AI's recap to get a condensed summary of what happened in their key channels instead of scrolling back through days of unread messages.",
            },
            {
                title: "Summarizing long-running threads",
                body: "When a debate in a channel spirals into hundreds of replies, Slack AI can condense the thread into a short summary of the actual decision or outcome, saving anyone who joins late from reading the whole history.",
            },
            {
                title: "Workspace search for institutional knowledge",
                body: "Instead of guessing which channel a past decision was made in, employees ask Slack AI's search a plain-language question and get an answer grounded in the actual message history, cutting out manual keyword searching.",
            },
            {
                title: "Async-first distributed teams",
                body: "Teams spread across time zones, where no single person sees every channel live, use daily digests and summaries to stay aligned without requiring everyone to be online and reading in real time.",
            },
        ],
        pricingDetail:
            "Slack AI is sold as a paid add-on layered on top of an existing paid Slack plan, priced per seat rather than bundled free into every tier — it is not available on Slack's free plan. Because it's an add-on rather than a standalone product, the practical cost for a team is the underlying Slack plan plus the per-seat AI add-on charge, which is why it tends to show up in mid-size and larger organizations rather than small workspaces evaluating cost per head.",
        faq: [
            {
                q: "Is Slack AI free?",
                a: "No. Slack AI is a paid, per-seat add-on layered on top of an existing paid Slack plan — it isn't available on Slack's free tier, and there's no separate standalone free version.",
            },
            {
                q: "How is Slack AI different from a meeting assistant like Otter.ai?",
                a: "Slack AI summarizes and searches written, asynchronous conversation inside Slack channels and threads. Otter.ai and Zoom AI Companion transcribe and summarize spoken meetings. They solve different problems and are commonly used together rather than as alternatives.",
            },
            {
                q: "Does Slack AI's search only look at messages I can already see?",
                a: "Yes. Summaries and AI search results stay scoped to the channels and conversations you already have permission to access — it doesn't surface anything from private channels or DMs you're not a member of.",
            },
        ],
    },

    supermaven: {
        overviewHtml: `
            <p><strong>Supermaven</strong> is a code-completion tool that deliberately does one thing rather than many. Where <a href="/tool/cursor">Cursor</a> and <a href="/tool/github-copilot">GitHub Copilot</a> have expanded into chat, multi-file agents, code review, and CLIs, Supermaven has stayed narrowly focused on inline autocomplete — the tab-key suggestion that appears as you type — and optimized it as hard as possible for two things: latency and context. It ships as an extension for VS Code, JetBrains IDEs, and Neovim, and installs alongside whatever chat or agent tool a developer already uses rather than trying to replace it. That narrowness is a deliberate bet: rather than competing on feature breadth against much larger platforms, it competes on being the single best version of one specific interaction.</p>

            <p>The two specs it leads on aren't abstract marketing numbers — they change how the tool actually feels to use. A claimed 1-million-token context window means it can hold far more of a project's surrounding code in view than typical completion models, so suggestions are less likely to hallucinate a function signature that doesn't exist or miss a type defined in a file you haven't opened. On a large monorepo, that shows up concretely as fewer wrong imports and fewer plausible-looking APIs that don't actually exist in your codebase. The low-latency completion pipeline means suggestions tend to appear before your eyes have even left the line you're typing, which keeps you in flow instead of pausing to evaluate a popup that showed up a beat late — a difference that feels small in isolation but compounds meaningfully over a full day of typing.</p>

            <p>The tradeoff is exactly what you'd expect from a single-purpose tool: Supermaven has no chat, no agent mode, and can't plan or execute a multi-file refactor — for that kind of work you still need <a href="/tool/cursor">Cursor</a>, <a href="/tool/windsurf-ide">Windsurf</a>, or Copilot's agent mode. Its ecosystem and integrations are also considerably smaller than Copilot's, since it isn't wired into a platform the way Copilot is wired into GitHub pull requests, and there's no code-review or CLI surface to speak of. One detail worth knowing before standardizing a team on it: the Supermaven team joined Cursor's parent company, Anysphere, in late 2024, so it's worth checking the current state of its roadmap and editor support rather than assuming a fully independent trajectory going forward.</p>

            <p>Who it is for: developers who already have a chat or agent tool for planning and multi-file work and specifically want the fastest, most context-aware autocomplete layered on top of it — and who care enough about typing-flow latency to notice the difference day to day. Who it is not for: developers who want one consolidated tool covering completion, chat, and agentic edits, or teams that specifically want deep GitHub-native workflow integration; <a href="/tool/github-copilot">GitHub Copilot</a> or <a href="/tool/tabnine">Tabnine</a> fit those needs better.</p>
        `,
        useCases: [
            {
                title: "Fast inline autocomplete for daily coding",
                body: "Developers who type a lot of routine, boilerplate-adjacent code use Supermaven purely for its tab-completion speed, keeping a separate chat or agent tool open for anything that requires planning or multi-file changes.",
            },
            {
                title: "Working in large monorepos",
                body: "The large context window means completions are more likely to correctly reference helper functions and types defined elsewhere in a big codebase, reducing the frequency of hallucinated imports or wrong function signatures on large projects.",
            },
            {
                title: "Pairing with a separate chat or agent tool",
                body: "Because Supermaven has no chat or agent surface of its own, developers commonly run it alongside a tool like Claude or Cursor's chat for planning and reasoning, using Supermaven strictly to accelerate the actual typing.",
            },
        ],
        pricingDetail:
            "Supermaven is freemium: a free individual tier covers everyday completion use, while a low-cost paid Pro tier removes usage limits. Pricing is flat rather than metered by tokens or credits, which is part of its pitch — it aims to be cheap and predictable compared with agent-heavy tools that bill by usage. Because it offers no chat or agent features, there's no separate agent-usage tier the way there is with broader platforms.",
        faq: [
            {
                q: "Is Supermaven faster than GitHub Copilot?",
                a: "Speed is Supermaven's entire pitch, and in practice its completions do tend to surface noticeably sooner than Copilot's. Whether that matters depends on how you work: if you accept inline suggestions constantly while typing, the lower latency meaningfully changes how it feels to code. If you mostly use chat and agents, it's largely irrelevant.",
            },
            {
                q: "Does Supermaven have chat or agent features?",
                a: "No. Supermaven is deliberately autocomplete-only — a large context window feeding fast inline completions. It won't execute multi-file changes, run terminal commands, or hold a conversation. For agentic work you'd pair it with a separate tool like Cursor or Copilot's agent mode.",
            },
            {
                q: "Can I use Supermaven and Cursor or Copilot at the same time?",
                a: "You can, but not with two tools both providing inline completions — they'll compete for the same suggestion slot. The common setup is disabling the other tool's inline completions while keeping its chat or agent features, and letting Supermaven own the tab key.",
            },
        ],
    },

    tabnine: {
        overviewHtml: `
            <p><strong>Tabnine</strong> predates the current generation of AI coding assistants and has spent the years since being out-featured by them. It is still deployed widely, and the reason has almost nothing to do with completion quality. Tabnine competes on where the software runs and on what its vendor can prove about the model's training data. For the organizations that buy it, those are not nice-to-haves layered on top of a coding tool; they are the entire purchasing criterion, and everything else is a secondary score.</p>

            <h3>The deployment model is the product</h3>

            <p>Tabnine can run as ordinary SaaS, inside a customer-controlled private cloud tenant, on servers in a customer's own data center, or fully air-gapped on a network with no route to the internet at all. That last configuration is the one that wins deals. A defense contractor, a hospital system, or a bank operating under an exfiltration policy cannot send a proprietary source file to a third-party inference endpoint, regardless of how good that endpoint's model is or how strong the vendor's retention policy reads on paper. Tabnine's answer is that inference happens inside the boundary, so there is no outbound request left to argue about.</p>

            <blockquote>The question a security review asks is not whether the model is good. It is what leaves the network, and whether you can prove it.</blockquote>

            <h3>The training-data position</h3>

            <p>The second pillar is provenance. Tabnine's stated position is that its models were trained on permissively licensed code rather than on whatever could be scraped, which is aimed directly at legal teams worried about copyleft-licensed material surfacing inside a proprietary product. Enterprise agreements pair that with IP indemnification and zero-retention handling of customer code. Whether this risk is large in practice is genuinely debated — but it does not have to be large to be disqualifying. One unresolved question from counsel is enough to stall a company-wide rollout, and Tabnine sells to the people whose job is closing that question.</p>

            <p>Enterprise customers can also connect their own repositories for context and tune a model on their internal codebase, so completions reflect house conventions and private libraries rather than generic open-source patterns, without that code feeding a model any other customer will ever touch. Coverage across VS Code, the JetBrains family, Visual Studio, and Eclipse matters to the same buyer for an unglamorous reason: a company with twenty years of accumulated tooling cannot standardize on a plugin that only ships for one editor.</p>

            <h3>What you trade away</h3>

            <p>Capability, mostly. Developers who have used both consistently place <a href="/tool/github-copilot">GitHub Copilot</a>, <a href="/tool/cursor">Cursor</a>, and latency-focused tools like <a href="/tool/supermaven">Supermaven</a> ahead of Tabnine on raw completion quality and on agentic multi-file work. That gap is structural rather than a matter of effort — a competitor free to call the largest hosted model available has options that a product which must also run on a customer's own hardware simply does not.</p>

            <p>The second trade is felt at signup, and it damages Tabnine's reputation more than the first. The free and individual paid tiers deliver an ordinary autocomplete tool; on-premises deployment, air-gapped operation, and private-codebase tuning — the entire reason to choose Tabnine — sit behind the enterprise plan. A developer evaluating it casually is testing a product stripped of its thesis and concludes, reasonably, that it is unremarkable. <a href="/compare/cursor-vs-tabnine">Comparing it with Cursor</a> on completions alone reaches the same verdict and misses the point in the same way.</p>

            <h3>When on-premises is the wrong answer</h3>

            <p>Self-hosting an assistant is a commitment, and plenty of teams talk themselves into it without needing to:</p>

            <ul>
                <li><strong>Your real requirement is no training on your code.</strong> That is a contractual guarantee the major cloud assistants already offer on business tiers. If nobody is demanding an air gap, you can buy the guarantee without buying the infrastructure.</li>
                <li><strong>You have nobody to operate it.</strong> On-prem inference means capacity planning, hardware budget, upgrade windows, and someone on call. Purchasing it without that team produces a stale deployment that quietly falls behind and nobody trusts.</li>
                <li><strong>You are a small team with no regulatory exposure.</strong> The governance architecture is the expensive part. If it is not solving a problem you are legally obliged to solve, you are paying for insurance against a risk you do not carry.</li>
                <li><strong>Developer enthusiasm will decide the rollout.</strong> If adoption depends on engineers preferring the suggestions, a governance-first tool loses that argument and the licenses go unused — a worse outcome than deploying nothing.</li>
            </ul>

            <p>Who it fits: regulated enterprises and security organizations evaluating AI coding tools through a data-governance lens, where deployment topology is the specification rather than a footnote. Teams thinking through the broader problem may find <a href="/blog/zero-knowledge-ai">confidential computation approaches</a> a useful frame for what guarantees are actually available and what they cost.</p>
        `,
        useCases: [
            {
                title: "Code assistance inside a network that cannot call out",
                body: "Defense, healthcare, and financial environments where source code is contractually barred from reaching a third-party endpoint deploy Tabnine on their own infrastructure or fully air-gapped. The comparison that decides the purchase is not Tabnine against Copilot — it is Tabnine against having no AI assistance at all, because every cloud option was eliminated before the evaluation started.",
            },
            {
                title: "Clearing legal and procurement rather than impressing developers",
                body: "The blocker in a large organization is frequently a review board rather than an engineering preference. Tabnine is built to answer that review: permissively licensed training data to address copyleft contamination concerns, IP indemnification, zero retention of customer code, private-codebase tuning that never feeds a shared model, and one governed tool that can be standardized across a mixed fleet of VS Code, JetBrains, Visual Studio, and Eclipse users rather than a different exception approved per editor.",
            },
        ],
        pricingDetail:
            "Tabnine is freemium, and the tier structure is unusually consequential here. A free individual tier provides basic completion across supported IDEs, and a paid Pro tier extends usage for individuals and small teams. The capabilities that actually differentiate Tabnine — on-premises and air-gapped deployment, private-codebase model tuning, indemnification, and admin governance — are enterprise features. Any organization evaluating Tabnine for the reasons Tabnine is worth choosing should therefore price the enterprise plan from the start and, separately, budget the internal cost of running inference on its own hardware. A pilot conducted on the free tier tells you almost nothing about the product you would actually be buying.",
        faq: [
            {
                q: "Can Tabnine really run with no internet connection?",
                a: "Yes. Fully air-gapped deployment is supported and is the configuration that justifies the product's existence. It also means your organization owns the operational burden — hardware, capacity, and model updates all become internal responsibilities rather than a vendor's.",
            },
            {
                q: "Do I need the enterprise plan to get the privacy features?",
                a: "Yes. Free and Pro give you AI completion. On-premises and air-gapped deployment and private-codebase tuning are enterprise-tier capabilities, which means the tiers most people try are the tiers least representative of what Tabnine is for.",
            },
            {
                q: "Was Tabnine's model trained on GPL or other copyleft code?",
                a: "Tabnine's position is that its models were trained on permissively licensed code specifically to avoid copyleft contamination concerns, and enterprise agreements add IP indemnification on top. If this is a live question for your legal team, get the current scope and indemnity terms in writing from the vendor rather than relying on a summary anywhere, including this one.",
            },
            {
                q: "Is Tabnine as good as Copilot at completions?",
                a: "Generally not, and the honest comparisons say so. Copilot, Cursor, and latency-focused tools like Supermaven tend to come out ahead on raw suggestion quality and agentic multi-file work. Tabnine's advantage is architectural, and it only matters if your constraints make the cloud alternatives ineligible.",
            },
            {
                q: "Does Tabnine support my IDE?",
                a: "Coverage is deliberately broad — VS Code, the JetBrains family, Visual Studio, and Eclipse among others — because Tabnine sells to organizations that cannot standardize on a single editor. Confirm the current list for your specific tooling before planning a rollout.",
            },
            {
                q: "Do I actually need on-premises, or is a cloud vendor's business tier enough?",
                a: "Ask what the requirement really is. If it is that your code must not be used for training and must not be retained, the major cloud assistants already commit to that contractually and you avoid running inference yourself. If the requirement is that code must not traverse the public internet at all, or that inference must work inside an isolated network, then no contractual promise substitutes and self-hosting is the only path.",
            },
        ],
    },

    "zoom-ai-companion": {
        overviewHtml: `
            <p><strong>Zoom AI Companion</strong> is Zoom's own built-in meeting assistant, and its defining trait is exactly that: it's native, not an add-on. Where <a href="/tool/otter-ai">Otter.ai</a> joins as a third-party bot that has to be invited into a call on any platform, AI Companion is simply already there inside every eligible Zoom meeting, with no separate app to install and no bot to admit and no participant to see join the call. For organizations already standardized on Zoom for video calls, that zero-setup integration is the whole appeal — it removes an entire category of rollout friction that a third-party tool has to solve for.</p>

            <p>Inside a meeting, AI Companion generates a post-meeting summary with highlights and next steps, and its "Catch Me Up" feature lets someone joining late — or catching up afterward — get a quick recap of what they missed without rewatching the recording. Outside the meeting itself, it extends into Zoom Team Chat with smart compose suggestions and into Zoom Docs and Whiteboard with AI-assisted content and mind-map generation, so the assistant follows you across Zoom's broader product suite rather than staying confined to the call window. That breadth across chat, docs, and whiteboarding is something a call-only transcription bot like <a href="/tool/otter-ai">Otter.ai</a> simply doesn't attempt, since Otter's whole product is scoped to the meeting itself.</p>

            <p>Its biggest strength is also its biggest limitation: because it's bundled directly into Zoom, there's no separate per-seat AI subscription to buy or bot to manage the way there is with <a href="/tool/slack-ai">Slack AI</a>'s add-on pricing model — it's simply included as part of an eligible Zoom plan, which lowers the barrier for a team to turn it on and start using it immediately. But that same tight integration means it only helps with meetings that actually happen in Zoom; it has nothing to offer for calls on Teams or Meet, which is exactly the gap that a cross-platform tool like Otter.ai exists to fill for teams that aren't fully standardized on one video vendor. Users and reviewers also consistently note that its meeting summaries, while useful for a quick recap, can miss nuance and context compared to a dedicated transcription-first product that has made summarization accuracy its entire focus rather than one feature among many.</p>

            <p>Who it is for: teams and organizations already running their meetings on Zoom who want in-meeting AI recall and summaries without adding another vendor, bot, or subscription to manage, and admins who value having AI usage governed under the same plan and account controls as the rest of Zoom. Who it is not for: teams whose meetings are spread across multiple video platforms, who will get more consistent results from a platform-agnostic tool like Otter.ai, or anyone who needs a meeting summary with more depth and nuance than a quick auto-generated recap provides.</p>
        `,
        useCases: [
            {
                title: "Zero-setup meeting summaries",
                body: "Teams already on Zoom get automatic post-meeting summaries and next-step highlights with no bot to invite and no separate app to configure, since the assistant is built directly into the platform they're already using.",
            },
            {
                title: "Catching up on missed meetings",
                body: "Employees who join a call late, or miss it entirely, use Catch Me Up to get a fast recap of what happened instead of scrubbing through a full recording, saving time on meetings that ran long.",
            },
            {
                title: "In-meeting whiteboard and mind-map generation",
                body: "During brainstorms, teams use AI Companion inside Zoom Whiteboard to generate mind maps and organize ideas on the fly, keeping the ideation and the AI assistance in the same window as the discussion.",
            },
            {
                title: "Chat drafting in Zoom Team Chat",
                body: "Outside of meetings, employees use AI Companion's smart compose in Zoom Team Chat to draft messages and follow-ups faster, extending the assistant's usefulness beyond the meeting itself.",
            },
        ],
        pricingDetail:
            "Zoom AI Companion is bundled into eligible Zoom plans rather than sold as a separate subscription or per-seat add-on — there is no standalone AI Companion purchase. Its availability depends on the Zoom plan and account type a host is on rather than an extra AI-specific fee, which is a structurally different model from Slack AI's paid per-seat add-on approach. Because it's included rather than metered, the practical cost consideration is simply which Zoom plan tier makes AI Companion available on your account, not a separate line item to budget for.",
        faq: [
            {
                q: "Do I have to pay extra for Zoom AI Companion?",
                a: "No separate subscription — it's bundled into eligible Zoom plans rather than sold as a standalone add-on. Availability depends on which Zoom plan and account type you're on rather than an additional AI-specific charge.",
            },
            {
                q: "Does Zoom AI Companion work for meetings on other platforms like Teams or Google Meet?",
                a: "No. It's built into Zoom specifically and only works within Zoom meetings, chat, docs, and whiteboard. If your team's meetings are spread across multiple video platforms, a cross-platform tool like Otter.ai will give you more consistent coverage.",
            },
            {
                q: "How good are Zoom AI Companion's meeting summaries?",
                a: "Useful for a quick recap of highlights and next steps, but users consistently note that the summaries can miss nuance and finer context compared to a dedicated transcription-first tool. Treat it as a fast overview rather than a substitute for reviewing the recording on anything high-stakes.",
            },
        ],
    },
};
