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
            <p><strong>Otter.ai</strong> is a standalone AI meeting assistant built around one core capability: turning spoken conversation into a real-time, searchable, summarized text record. Unlike a video-conferencing vendor's built-in assistant — <a href="/tool/zoom-ai-companion">Zoom AI Companion</a> is the obvious comparison — Otter is platform-agnostic. It joins meetings on Zoom, Google Meet, and Microsoft Teams alike through a calendar integration, rather than being locked to one ecosystem. That positioning is the whole reason it still exists as an independent product: teams whose meetings are scattered across two or three different video tools want one consistent transcript and notes layer instead of three separate native ones that don't talk to each other, each with its own summary format and its own separate archive to search later.</p>

            <p>Mechanically, an Otter bot (branded OtterPilot) joins the call, transcribes speech in real time with speaker labels, and after the meeting produces an AI summary, extracted action items, and a fully searchable archive. Otter Chat lets you ask questions against your accumulated meeting history — "what did we decide about the launch date last week?" — in a way that is conceptually similar to how <a href="/tool/notion-ai">Notion AI</a>'s Ask Notion queries a workspace, just scoped to spoken conversation instead of documents. Action items can be reviewed and, depending on your other tools, copied into a task tracker like <a href="/tool/asana">Asana</a> or <a href="/tool/jira">Jira</a> rather than being automatically synced, since Otter itself is not a project-management tool and doesn't try to be one. Calendar sync also means recurring meetings build up a running archive automatically, without anyone having to remember to hit record each time.</p>

            <p>Transcription accuracy on clear audio with a single speaker at a time is genuinely strong, and the automatic bot-join via calendar sync means you rarely have to remember to start it. The honest weaknesses are real, though: heavy cross-talk, strong accents, and noisy audio all degrade transcript quality noticeably, the free tier's monthly minute cap is tight enough that anyone using it seriously will hit the wall within a few weeks, and because Otter joins as a third-party bot rather than a native platform feature, some meeting hosts and compliance teams object to an outside recorder being present at all — a friction that a platform-native assistant simply doesn't create. It's also worth being clear-eyed that a transcript and a summary are not the same thing as understanding; the AI-generated summary can flatten nuance or misattribute a point to the wrong speaker, so anything decision-critical is worth spot-checking against the underlying transcript.</p>

            <p>Who it is for: teams and individuals whose meetings happen across multiple video platforms and who want one unified, searchable notes archive rather than fragmented per-platform summaries — journalists, researchers, and consultants recording interviews fall into the same bucket, since they need a portable transcript independent of whichever video tool a given source prefers. Who it is not for: organizations standardized entirely on one video platform, where a bundled native assistant is already included at no extra cost and doesn't require inviting an outside bot into every call, or teams in industries where a third-party recording bot raises compliance concerns that a native, platform-level feature would not.</p>
        `,
        useCases: [
            {
                title: "Cross-platform meeting notes",
                body: "Teams that take calls on a mix of Zoom, Meet, and Teams use Otter to get one consistent transcript and summary format regardless of which tool the meeting happened on, instead of stitching together three different native exports.",
            },
            {
                title: "Interview and research transcription",
                body: "Journalists, UX researchers, and academics use Otter to transcribe one-on-one interviews and turn them into searchable text, letting them quote accurately and search across dozens of past conversations by keyword.",
            },
            {
                title: "Action item capture for solo operators",
                body: "Founders and freelancers who don't have an assistant taking notes use Otter's automatic summaries and action-item extraction to make sure follow-ups don't get lost after a busy day of back-to-back calls.",
            },
            {
                title: "Building a searchable meeting archive",
                body: "Teams onboarding a new hire or revisiting a decision from months ago use Otter Chat to query the full history of past meetings in natural language, rather than scrubbing through recordings or guessing which call it was.",
            },
        ],
        pricingDetail:
            "Otter.ai is freemium: the free tier includes real-time transcription and basic summaries but caps monthly transcription minutes tightly enough that regular use runs out quickly. Paid Pro and Business tiers raise the monthly minute allowance and add features like deeper search, more integrations, and higher usage limits for teams. Because pricing is per-user and minute-based rather than a flat seat fee, cost scales with how many meetings you actually record rather than just headcount.",
        faq: [
            {
                q: "Does Otter.ai work with Zoom, Google Meet, and Microsoft Teams?",
                a: "Yes — that cross-platform reach is Otter's core differentiator versus a platform-native assistant. It joins meetings across all three via a calendar integration and produces a consistent transcript and summary format regardless of which video tool was used.",
            },
            {
                q: "How accurate is Otter's transcription?",
                a: "It is strong on clear audio with speakers talking one at a time, but accuracy drops noticeably with heavy cross-talk, background noise, or strong accents. For high-stakes transcripts, a manual review pass is still worthwhile.",
            },
            {
                q: "Is Otter's free plan enough for regular use?",
                a: "For occasional meetings, yes. For anyone recording multiple meetings a week, the free tier's monthly minute cap is tight enough that you'll likely need a paid Pro or Business plan to avoid running out mid-month.",
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
            <p><strong>Tabnine</strong> is one of the oldest AI code-completion tools still in active use, and by 2026 it has settled into a clear niche: privacy and compliance rather than raw completion quality or agentic capability. Its pitch is aimed squarely at organizations that legally or contractually cannot send their proprietary source code to a third-party cloud API — financial institutions, healthcare companies, defense contractors, and any enterprise with strict IP-exfiltration policies. Where most competitors lead with speed or breadth of features, Tabnine leads with "your code never has to leave your infrastructure," and everything about its product and pricing structure is built around making that claim actually true rather than just marketing language.</p>

            <p>That promise is backed by real architecture: Tabnine offers on-premises and air-gapped deployment options, and lets a team fine-tune a model on its own private codebase without that code contributing to any shared or public model that could later leak internal patterns to other customers. It works across a genuinely wide range of IDEs — VS Code, the JetBrains family, Visual Studio, Eclipse, and others — which matters for large enterprises with heterogeneous developer tooling rather than a single standardized editor, where a completion tool that only supports one IDE simply isn't viable to roll out company-wide.</p>

            <p>The honest tradeoff is capability. Reviewers and developers who've used both consistently find Tabnine's raw completion quality and agentic features trail well behind <a href="/tool/github-copilot">GitHub Copilot</a>, <a href="/tool/cursor">Cursor</a>, and speed-focused tools like <a href="/tool/supermaven">Supermaven</a> — none of Tabnine's competitors have to make the same architectural compromises that come with keeping everything on-premises, so they can lean harder into larger cloud-hosted models. And the features that actually justify choosing Tabnine in the first place — local/on-prem deployment and private-codebase model training — are gated behind its enterprise plan, not available on the free or lower individual tiers. An individual developer signing up for the free tier gets a fairly ordinary autocomplete tool without the privacy architecture that is the whole reason to pick Tabnine over alternatives in the first place, which can make an initial trial feel underwhelming relative to what the product is actually built for.</p>

            <p>Who it is for: regulated-industry enterprises and security-conscious organizations that need code completion running inside their own infrastructure and are willing to pay for an enterprise plan to get it, and IT and security teams evaluating AI coding tools specifically through a data-governance lens rather than a raw-capability leaderboard. Who it is not for: individual developers, startups, or teams without strict compliance requirements who just want the best possible completion quality or agentic coding features — for those users, <a href="/tool/cursor">Cursor</a>, Copilot, or Supermaven will outperform Tabnine on capability alone, and the privacy architecture that makes Tabnine worth its price for a bank or hospital is simply not something a small unregulated team needs to pay for.</p>
        `,
        useCases: [
            {
                title: "Regulated-industry compliance",
                body: "Financial services, healthcare, and government contractors adopt Tabnine specifically because it can run on-premises or air-gapped, satisfying compliance requirements that rule out sending proprietary code to a third-party cloud model.",
            },
            {
                title: "Private codebase fine-tuning",
                body: "Enterprises with large, distinctive internal codebases use Tabnine's private-model training to get completions tuned to their own conventions and internal libraries, without that code being used to train any shared model.",
            },
            {
                title: "Heterogeneous IDE environments",
                body: "Large organizations where developers use a mix of VS Code, JetBrains, Visual Studio, and Eclipse deploy Tabnine as a single standardized completion tool across all of them, rather than picking per-editor solutions.",
            },
        ],
        pricingDetail:
            "Tabnine is freemium: a free individual tier offers basic AI code completion across supported IDEs. A paid Pro tier extends usage and features for individuals and small teams. Critically, the privacy-focused capabilities that differentiate Tabnine — on-premises or air-gapped deployment and training on a private codebase — require the Enterprise plan, so organizations evaluating Tabnine for its core value proposition should budget for enterprise pricing rather than the free or Pro tiers.",
        faq: [
            {
                q: "Is Tabnine as good as GitHub Copilot for completions?",
                a: "Not on raw completion quality — most comparisons find Copilot, Cursor, and speed-focused tools like Supermaven ahead of Tabnine there. Tabnine's advantage is elsewhere: privacy, on-premises deployment, and private codebase training, which those tools don't offer.",
            },
            {
                q: "Can Tabnine run entirely offline or on-premises?",
                a: "Yes, that's its core differentiator. Tabnine offers on-premises and air-gapped deployment options so code never has to leave an organization's own infrastructure, which is the deciding factor for many regulated-industry customers.",
            },
            {
                q: "Do I need the enterprise plan to get Tabnine's privacy features?",
                a: "Yes. The free and Pro tiers give you AI completion, but on-premises/air-gapped deployment and private-codebase model training — the features that are the whole reason most organizations choose Tabnine — are gated behind the Enterprise plan.",
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
