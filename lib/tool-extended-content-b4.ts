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
            <p><strong>Slack AI</strong> is search and summarization built into Slack: thread and channel summaries, recaps of what you missed, and a search layer you can ask questions in plain language rather than guessing keywords. Unlike <a href="/tool/otter-ai">Otter.ai</a> or <a href="/tool/zoom-ai-companion">Zoom AI Companion</a>, none of it involves audio. It works on the written backlog, the channels and threads that pile up whether or not anyone reads them. The pitch is time saved. The variable that actually decides the outcome is something no vendor page asks about: whether your workspace's accumulated conversation is an archive worth querying or noise with timestamps. Two companies with identical headcount and identical seat counts land on opposite sides of that line.</p>

            <h3>Archive or backlog?</h3>

            <p>An archive is where the reasoning behind decisions ended up. A backlog is volume that was never worth reading in the first place, and summarizing noise produces shorter noise. The distinction is testable before you spend anything. Pick three decisions your team made last quarter and try to reconstruct why each one went the way it did, using Slack search by hand. If the reasoning is in there and finding it is merely tedious, Slack AI turns a tedious retrieval into a cheap one, which is a real and repeatable gain. If the reasoning is not in there because it happened in a call, a DM, or someone's head, no model retrieves what was never written down. That test takes twenty minutes and predicts the outcome better than any trial.</p>

            <h3>Retention policy sets the ceiling</h3>

            <p>Any AI layer over your history inherits whatever your workspace keeps. If retention deletes messages after a few months, model quality is irrelevant to a question about last year, and short retention is usually deliberate rather than accidental, set by legal for exactly the reason that makes it inconvenient here. Free workspaces have historically limited how far back history is visible at all, which is a second, separate ceiling.</p>

            <p>The inverse is the part teams miss. Extending retention to make the AI more useful also extends what is discoverable in litigation and what is exposed if the workspace is ever breached. That is a legal decision wearing a product costume, and it should be made by the people who own the retention policy rather than by whoever is running the AI pilot. Find out what your workspace actually retains, and who set it, before the evaluation rather than after.</p>

            <h3>Where your decisions actually live</h3>

            <p>If your organization records decisions in <a href="/tool/notion-ai">Notion</a>, tracks work in <a href="/tool/jira">Jira</a> or <a href="/tool/linear">Linear</a>, and writes specs in <a href="/tool/coda">Coda</a>, then Slack holds the coordination around decisions rather than the decisions themselves. It knows the team is shipping Thursday. It rarely knows why Thursday. Slack has been extending search across connected tools, so this boundary is moving and you should verify what your plan actually connects today rather than assuming either the narrow version or the expansive one. The underlying judgment holds either way: an assistant answers well about the surface it can see, and a strongly documented organization may get more from the AI inside its documentation tool than from the AI inside its chat tool.</p>

            <h3>What the summaries flatten</h3>

            <p>A summary compresses a conversation into its apparent consensus, and the losses are predictable enough to plan around. The objection raised once and never repeated tends to disappear. A decision reversed in the last few messages can be reported as the original decision. The difference between someone committing to do a thing and someone agreeing the thing should happen collapses into one sentence. Tone goes first of all, so a joke or a sarcastic aside can be read back as a plain statement of intent.</p>

            <p>For catching up, none of that matters much. For anything consequential, open the thread. The summary is excellent at telling you which thread to open, and that is most of the value on offer here.</p>

            <h3>Permissions and the objection you will hear</h3>

            <p>Results stay scoped to what you can already see: the channels you belong to and your own conversations. It does not surface private channels you were never in. This is worth stating plainly in your rollout note, because the first reaction from employees is that the company has started reading Slack with a machine, and the accurate answer is that the feature does not widen anyone's access. It is also worth being honest about the corollary: because scope is per-user, an administrator and a new hire asking the same question can get different answers, and neither is wrong.</p>

            <p>Whether your content is used to train models is a separate question and a fair one to raise in review. Slack's stated position has been that customer content is not used to train generative models and that the models serving these features operate within Slack-controlled infrastructure. If that matters to your legal or security team, take the current commitment from Slack's own documentation and put it in writing before the question arrives in an all-hands, rather than relying on any secondhand summary including this one.</p>

            <h3>When not to buy it</h3>

            <ul>
                <li><strong>The workspace is small or quiet.</strong> If nobody on the team has a backlog, you are paying per seat to summarize a scroll that takes a minute to read.</li>
                <li><strong>Retention is short by policy.</strong> The questions people most want answered are historical, and those are the exact questions a short retention window has already deleted.</li>
                <li><strong>The real problem is channel chaos.</strong> Structure, naming conventions, and a habit of posting decisions where they belong are prerequisites, not things the AI supplies. Over a disorganized workspace it returns confident answers assembled from the wrong context, which is worse than an empty result because it looks like an answer.</li>
                <li><strong>Your institutional knowledge lives in documents and tickets.</strong> Buy the AI where the knowledge is.</li>
                <li><strong>Your pain is meetings, not messages.</strong> That is a different product category entirely, and <a href="/tool/otter-ai">Otter.ai</a> or a native assistant like <a href="/tool/zoom-ai-companion">Zoom AI Companion</a> is the place to look.</li>
                <li><strong>You are hoping it replaces documentation.</strong> A tool that can half-reconstruct a decision from chat reduces the pressure to write the decision down, and a reconstruction is worse than a one-paragraph decision record every single time.</li>
            </ul>

            <p>Who it fits: a mid-size or large workspace with genuine volume, a long-lived history, and a culture that argues in channels rather than in DMs. For everyone else, the honest recommendation is to fix where decisions get written before paying to search where they did not.</p>
        `,
        useCases: [
            {
                title: "Catching up on a workspace that genuinely has volume",
                body: "Someone returning from a week away, or covering for a colleague across time zones, reads channel recaps and thread summaries instead of scrolling days of unread messages. This is the use case that survives contact with reality most reliably, because it depends only on volume existing rather than on the content being well organized. The value scales with how much you actually missed, which is why the same feature feels essential in a busy workspace and pointless in a quiet one.",
            },
            {
                title: "Reconstructing why something was decided",
                body: "When a settled question resurfaces months later, asking in plain language across accumulated history beats guessing which channel it happened in. The honest precondition, and the reason this list is short: it only works if the reasoning was written in a channel the asker can access and is still inside your retention window. Where teams debate in threads and then post the outcome, this is the strongest argument for the product. Where they debate on calls and post only the conclusion, it returns the conclusion you already had.",
            },
        ],
        pricingDetail:
            "Slack AI is a capability layered on paid Slack rather than a standalone product, and its commercial packaging has moved over time: it has been sold as a per-seat add-on on top of an existing paid plan, and it has also been positioned as part of paid plans, with more advanced search and agent capabilities licensed separately. Because packaging is exactly the kind of thing that changes between renewals, price it from Slack's current plan documentation or your account team rather than from any third-party description. What holds regardless of the current arrangement: it is not something a free workspace gets, cost tracks seats rather than message volume, and it rides on top of what you already pay for Slack. So the number to compare against a dedicated alternative is the incremental cost per seat, not the whole Slack bill.",
        faq: [
            {
                q: "Is Slack AI included in our plan, or an extra cost?",
                a: "Check your own plan rather than a description of it. Slack has packaged these features as a paid per-seat add-on and has also bundled them into paid tiers, with more advanced capability licensed separately, and that arrangement has changed more than once. The only durable answer is that it requires a paid Slack plan and that cost scales per seat.",
            },
            {
                q: "Can it read private channels or DMs I am not a member of?",
                a: "No. Summaries and answers stay inside the permissions you already have, so the feature does not widen anyone's access to content. One consequence worth communicating during rollout is that scope is per-user, which means an administrator and a new hire can ask the same question and get legitimately different answers.",
            },
            {
                q: "Is it useful if our message retention is only a few months?",
                a: "Much less useful, and this is the single most underrated constraint. Retention sets a hard ceiling on what any AI layer can retrieve, and the historical questions people most want answered are the ones a short window has already deleted. Extending retention to compensate is a legal decision about discoverability, not a product setting, so raise it with whoever owns the policy.",
            },
            {
                q: "Is our Slack content used to train AI models?",
                a: "Slack's stated position has been that customer content is not used to train generative models and that the models behind these features run within Slack-controlled infrastructure. If your security or legal team needs that as a commitment rather than a summary, get the current terms from Slack directly, since this is precisely the kind of language vendors revise.",
            },
            {
                q: "Should we buy this or a meeting assistant?",
                a: "They solve unrelated problems and the choice depends on where your information is stranded. If people are losing decisions inside long written threads, this is the right category. If they are losing them inside calls nobody took notes on, you want transcription instead, and teams frequently end up running both because the two failures are independent.",
            },
        ],
    },

    supermaven: {
        overviewHtml: `
            <p><strong>Supermaven</strong> does one thing. While <a href="/tool/cursor">Cursor</a> and <a href="/tool/github-copilot">GitHub Copilot</a> expanded into chat, multi-file agents, code review, and command-line tools, Supermaven stayed on inline autocomplete, the grey suggestion you accept with the tab key, and optimized it for two properties: how quickly it appears and how much of your project it has already read. It ships as an extension for VS Code, JetBrains IDEs, and Neovim, and it is built to sit beside whatever agent you already use rather than to replace it. Evaluating it as a Copilot alternative is the most common route to the wrong conclusion about it, because it is not trying to occupy that slot.</p>

            <h3>Latency is the feature, and it is not a gimmick</h3>

            <p>Speed reads like a marketing axis until you notice it changes the interaction itself. A completion that arrives while your fingers are still moving gets evaluated as part of typing: you glance, take it or keep going, and never leave the line. A completion that arrives after you have stopped is a decision. You have already switched into reading mode, and the cost of considering it is paid whether you accept it or not. Supermaven optimizes hard for the first case, which is why people who like it describe it in terms of flow rather than in terms of output quality.</p>

            <p>The corollary matters just as much and is rarely said out loud. Low latency is only valuable when rejecting a suggestion is nearly free, which is true of a one-line completion and false of a multi-file change you have to read. That is the honest boundary of the entire product: it improves the cheap-to-reject interaction and has nothing to offer on the expensive ones.</p>

            <h3>A long context window changes what it gets wrong</h3>

            <p>The second claim is an unusually large context window, meaning how much surrounding code the model holds while completing. Rather than quoting a token figure that shifts with each model release, it is more useful to know what the difference looks like at the keyboard: fewer invented helper functions, fewer imports from modules that do not exist, and completions that follow a convention defined in a file you never opened this session. On a large monorepo that is exactly where narrow-context completers fail most visibly, and the failures are annoying out of proportion to their size because each one costs a lookup.</p>

            <p>What a large window does not buy is judgment. It will still complete a call into the wrong abstraction layer, because seeing your code is not the same as knowing which parts of it you are supposed to use. More context reduces factual errors about your codebase. It does not reduce architectural ones, and no amount of it turns a completer into a reviewer.</p>

            <h3>Running it next to Cursor or Copilot</h3>

            <p>Two tools both drawing inline suggestions will fight over the same slot, and the symptoms are flickering ghost text, duplicated suggestions, or one quietly winning in a way that makes both feel worse. The working arrangement is to let Supermaven own the tab key and switch off inline completions in the other tool while keeping its chat and agent surfaces. That also frames the cost honestly: this is a second subscription stacked on one you already pay for, and it has to justify itself on typing alone. If you have not settled the primary tool yet, settle that first. <a href="/compare/cursor-vs-supermaven">Cursor against Supermaven</a> and <a href="/compare/github-copilot-vs-supermaven">Copilot against Supermaven</a> are comparisons between a platform and a component, and reading them that way is what makes them useful.</p>

            <h3>When Supermaven is the wrong choice</h3>

            <ul>
                <li><strong>You want one tool rather than a stack.</strong> A consolidated platform that does completion, chat, and agentic edits at a good-enough level beats a best-in-class completer plus three other subscriptions for most individuals, and every extra tool is a configuration to maintain.</li>
                <li><strong>Typing is not your bottleneck.</strong> If your days go to unfamiliar code, test design, or deciding what to build, faster keystrokes multiply the part that was never slowing you down.</li>
                <li><strong>You need GitHub-native workflow.</strong> Pull request review, issue context, and repository-level automation live with <a href="/tool/github-copilot">GitHub Copilot</a>. Supermaven has no surface there and is not attempting one.</li>
                <li><strong>Your code cannot leave your network.</strong> This is a hosted completion service, so surrounding context goes to the vendor to be completed. Where that is disqualifying, the category to look at is self-hosted assistants such as <a href="/tool/tabnine">Tabnine</a>, and you should read the current data-handling terms rather than infer them.</li>
                <li><strong>You are standardizing a whole team on it.</strong> The Supermaven team joined Anysphere, the company behind Cursor, in late 2024. What that means today, whether the standalone extensions are still being updated, still open to new signups, and still on their own roadmap rather than being folded into Cursor, is something to confirm directly with the vendor before a team commits. Acquisitions and shutdowns are frequent in this category and any write-up, this one included, ages quickly.</li>
            </ul>

            <p>Who it fits: developers who already have an agent for planning and multi-file work and who notice completion latency day to day. If you are earlier than that and still assembling the basics, <a href="/blog/cursor-vs-github-copilot">the Cursor and Copilot comparison</a> is the better starting point, because the primary tool decision determines whether a specialist completer is worth adding at all.</p>
        `,
        useCases: [
            {
                title: "Fast inline completion alongside a separate agent",
                body: "Developers who keep a chat or agent tool open for planning and refactors run Supermaven purely for the tab key, on the theory that the two jobs have different requirements. Planning wants a strong model and tolerates a wait. Typing wants a suggestion before attention moves, and one tool optimized for each beats one tool splitting the difference.",
            },
            {
                title: "Large monorepos where narrow context fails",
                body: "In a codebase where the helper you need was defined in a file you have never opened, completers with small context windows invent plausible names and imports. A large window makes completions more likely to reference what actually exists, which shows up as fewer interruptions to go look something up rather than as a visible feature.",
            },
            {
                title: "Editors the agentic tools do not reach",
                body: "Neovim and JetBrains users often cannot or will not migrate to a VS Code fork to get a modern assistant. Because Supermaven ships as an extension rather than an editor, it adds current-generation completion without changing where you work, which is frequently the deciding factor for developers with a long-tuned environment.",
            },
        ],
        pricingDetail:
            "Supermaven is structured as freemium: a free individual tier covers ordinary completion use and a paid tier lifts the limits. The model matters more than the figure. Billing is flat per user rather than metered by tokens, credits, or agent runs, which is a direct consequence of the product doing only completion, and there is no agent tier because there are no agents. Two cautions before budgeting. First, this is usually a second subscription next to the agent you already pay for, so judge it on the typing experience rather than on total capability. Second, confirm current availability and terms with the vendor, since ownership of the product changed after those tiers were introduced.",
        faq: [
            {
                q: "Is Supermaven actually faster than GitHub Copilot?",
                a: "Latency is its entire reason for existing, and developers who use both generally report its suggestions arriving sooner. Rather than trusting a figure from anyone, install it for a day and watch whether suggestions land before your attention leaves the line, because that threshold is what the whole claim rests on and it depends on your machine, your network, and your typing speed.",
            },
            {
                q: "Does it have chat or agent features?",
                a: "No, deliberately. There is no chat panel, no agent mode, no terminal execution, and no multi-file planning. If you want those, you need a separate tool, which is the setup Supermaven assumes you already have.",
            },
            {
                q: "Can I run it at the same time as Cursor or Copilot?",
                a: "Yes, but not with both providing inline completions, since they compete for the same suggestion slot and the result is flicker or duplicated ghost text. Disable inline completions in the other tool, keep its chat and agent surfaces, and let Supermaven own the tab key.",
            },
            {
                q: "Is Supermaven still an independent product?",
                a: "The team joined Anysphere, the company behind Cursor, in late 2024. Where that leaves the standalone extensions now, whether they are actively maintained, accepting new users, and developed separately from Cursor, is worth checking against the vendor's own current status page before you build a workflow or a team rollout on it.",
            },
            {
                q: "Which editors does it support?",
                a: "It has shipped extensions for VS Code, the JetBrains IDEs, and Neovim, which is the main reason it appears in setups where a VS Code fork is not an option. Confirm the current list and the maintenance status of the specific extension you need, because plugin support across editors is uneven and can lag.",
            },
            {
                q: "Does my code leave my machine?",
                a: "Yes, as with other hosted completion tools. Surrounding context is sent to the vendor's service to generate a suggestion, so this is not local inference. If your organization cannot allow that, you are in the on-premises category rather than the low-latency one, and should read the vendor's current data-handling and retention terms instead of assuming either way.",
            },
            {
                q: "Is it worth paying for if I already pay for Cursor or Copilot?",
                a: "Only on one test: whether you accept inline suggestions constantly while typing. If you do, the interaction you perform hundreds of times a day gets better and the second subscription is easy to justify. If you mostly drive work through chat and agents, you are paying for a property of an interaction you barely use.",
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
            <p><strong>Zoom AI Companion</strong> is Zoom's own meeting assistant, and the most consequential thing about it is not on the feature list. For an organization already running on Zoom, there is almost nothing to decide. No new vendor to review, no data processing agreement to negotiate, no third-party bot appearing in the participant list, no second tool for people to learn. It is a setting an administrator turns on. That single fact reframes every comparison against a dedicated product like <a href="/tool/otter-ai">Otter.ai</a>, because the specialist is not being judged against a blank slate. It is being judged against something already switched on and already paid for.</p>

            <h3>Almost nothing to buy, and that is the point</h3>

            <p>The capabilities are what you would expect from a platform assistant rather than a specialist: a post-meeting summary with highlights and next steps, a Catch Me Up recap for someone arriving late, the ability to ask what has been covered while the meeting is still running, thread summaries and message drafting in Zoom Team Chat, and content and mind-map generation in Zoom Docs and Whiteboard. None of these individually beats a tool built solely for that job. They win on a different axis, which is that the cost of trying them is an admin toggle rather than a procurement cycle.</p>

            <p>Commercial packaging works the same way, and it is worth being careful here because this is where write-ups go stale fastest. AI Companion has been positioned as included with eligible paid Zoom accounts rather than sold as a separate per-seat AI subscription, and Zoom has also introduced paid add-on tiers covering more advanced capability. Which features sit on which side of that line moves release to release, so confirm your own plan's entitlements in Zoom's current documentation instead of trusting any third-party summary, this one included. The structural point survives the details: the baseline assistant is a plan feature, not a separate purchase, which is a different model from paying per seat for an assistant layered onto a chat tool such as <a href="/tool/slack-ai">Slack AI</a>.</p>

            <h3>The split with Otter is your calendar, not accuracy</h3>

            <p>Most comparisons ask which one writes better summaries. That is close to the least decision-relevant question available, because differences in summary quality are small next to a coverage difference that is absolute. Ask where your meetings happen instead. If they all happen in Zoom, a native assistant covers all of them and a third-party tool is a second bill for the same output. If a meaningful share happen on Microsoft Teams or Google Meet, AI Companion cannot see those at all, and you end up with two or three archives in different formats and no single place to search, which is precisely the problem <a href="/tool/otter-ai">Otter.ai</a> exists to solve by joining through your calendar regardless of platform.</p>

            <p>A second axis is worth adding: what you need out of the meeting afterward. A recap you read once and discard is exactly what a native assistant is built to produce. A transcript you need to keep, quote, search months later, or hand to someone else, as with interviews, user research, or anything evidentiary, favors a transcription-first product where the transcript is the deliverable rather than a byproduct of generating the summary.</p>

            <h3>When to leave it turned off</h3>

            <p>Native does not mean harmless, and there are meetings where the correct configuration is off. Sensitive conversations, including HR matters, investigations, terminations, and clinical or legal discussions, produce a generated record that is as discoverable as any other record, and the person being discussed did not agree to it. Summaries also travel further than the meeting did, so decide who may forward one before you find out. Anything treated as minutes deserves particular suspicion: a recap that misattributes a decision or quietly drops the dissent is worse than no notes, and the discipline that keeps the feature useful is treating it as recall rather than as record. Data handling is a review question worth doing once rather than assuming, and Zoom's public position has been that customer content is not used to train its AI models, which your compliance team should take from Zoom's current terms rather than from a summary of them. Finally, if the underlying problem is that you have too many meetings, an assistant makes bad meetings cheaper to hold rather than rarer, which is the one outcome nobody is actually trying to buy.</p>
        `,
        useCases: [
            {
                title: "Summaries for an organization already standardized on Zoom",
                body: "Teams whose calls all happen in one place get post-meeting summaries and next steps without adding a vendor, a bot, or a subscription. The reason this is the dominant use case is not quality. It is that the alternative requires someone to run a procurement and a security review for a marginal improvement.",
            },
            {
                title: "Catching up without rewatching",
                body: "Someone joining twenty minutes late, or reviewing afterward, gets a recap instead of scrubbing a recording. Asking what has been covered while the meeting is still running is the more useful version of this, because it lets a late arrival rejoin the conversation rather than reconstruct it later.",
            },
            {
                title: "Meetings you deliberately decline",
                body: "Once a reliable recap exists, attendance becomes optional for meetings where someone is present only to stay informed. Used this way the assistant is a scheduling lever rather than a note-taking feature, and it is the highest-value outcome available here.",
            },
            {
                title: "Calls where an external recorder is unwelcome",
                body: "Some hosts, clients, and security teams object to a third-party bot joining, independent of whether recording itself is permitted. A native feature avoids introducing a new processor into the call, which is a lower bar to clear than approving another vendor, though it is not a substitute for checking your own recording and consent rules.",
            },
            {
                title: "Team Chat backlog and drafting",
                body: "Outside meetings, thread summaries and compose suggestions in Zoom Team Chat extend the assistant to written conversation. This matters mainly to organizations that use Zoom as their chat tool rather than running chat elsewhere, where the equivalent feature belongs to that vendor instead.",
            },
            {
                title: "Drafting in Docs and Whiteboard during a session",
                body: "Generating a first outline in Zoom Docs or organizing a brainstorm into a mind map in Whiteboard keeps ideation and assistance in the same window as the discussion, which is the practical advantage of an assistant that spans a suite rather than one that stops at the call.",
            },
            {
                title: "Governed rollout instead of shadow notetakers",
                body: "Left alone, employees install personal AI notetakers and join them to company calls, which is the actual data exposure most organizations have. Enabling a native assistant under existing account controls gives IT one place to set policy and one behavior to communicate, and removes the motivation for the unmanaged version.",
            },
        ],
        pricingDetail:
            "Zoom AI Companion is packaged as a feature of eligible paid Zoom plans rather than as a standalone AI product, and Zoom has also introduced paid add-on tiers that extend it beyond the included baseline. The practical consequence is that the budget question is not how many AI seats to buy but which plan your accounts are on and which capabilities that plan currently entitles them to, and the answer moves as Zoom repackages. Confirm entitlements against Zoom's own current plan documentation before assuming a given feature is included, and treat the included baseline as the thing to compare against a dedicated tool's per-seat cost.",
        faq: [
            {
                q: "Do we have to pay extra for AI Companion?",
                a: "The baseline assistant has been packaged as part of eligible paid Zoom plans rather than sold as a separate per-seat subscription, and Zoom has also introduced paid add-on tiers for more advanced capability. Because that boundary moves, verify what your specific plan includes in Zoom's current documentation rather than relying on a secondhand description.",
            },
            {
                q: "Does it work for meetings on Microsoft Teams or Google Meet?",
                a: "No. It only sees meetings, chat, docs, and whiteboards inside Zoom. That is the entire reason cross-platform tools exist, and if a meaningful share of your calls happen elsewhere, a native assistant leaves you with partial coverage and a split archive.",
            },
            {
                q: "Should we use AI Companion or Otter.ai?",
                a: "Decide on coverage first, not quality. All meetings in Zoom means the native assistant is already there and a second tool is a second bill. A mixed calendar means only a platform-agnostic tool gives you one archive. The tiebreaker after that is what you need afterward: a disposable recap favors the native option, while a transcript you must keep, quote, and search later favors a transcription-first product.",
            },
            {
                q: "Can we treat the summaries as official meeting minutes?",
                a: "No, and it is worth saying so explicitly when you roll it out. Generated recaps can flatten a reversal made late in the call, drop an objection raised once, or attribute a decision to the wrong person. Use them for recall and spot-check anything consequential, because a plausible wrong record is more damaging than no record at all.",
            },
        ],
    },
};
