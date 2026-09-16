import type { ToolExtendedContent } from "./tool-extended-content";

/**
 * Batch B3 of long-form per-tool content, rendered below the standard
 * template sections on /tool/[slug] pages (see lib/tool-extended-content.ts
 * for the shared interface and rendering contract). Kept in a separate file
 * to avoid merge conflicts with other batches being authored in parallel.
 *
 * Covers: cody, cosine, grok, ollama, openai-sora
 */
export const TOOL_EXTENDED_CONTENT_B3: Record<string, ToolExtendedContent> = {
    cody: {
        overviewHtml: `
            <p><strong>Cody</strong> is Sourcegraph's AI coding assistant, and the most useful way to evaluate it is to start with the company rather than the product. Sourcegraph sells code search to organizations whose codebases are too large for anyone to hold in their head: hundreds of repositories, millions of files, years of accumulated decisions. Cody is what happens when you put a language model in front of that index. Every assistant has to answer the same question — which code should the model actually see? — and most answer it by guessing from your open tabs and recent edits. Cody answers it by running a search.</p>

            <p>That is an architectural difference rather than a marketing one, and it has a consequence worth understanding before you trial anything: Cody's value is not roughly constant across teams the way <a href="/tool/github-copilot">GitHub Copilot</a>'s or <a href="/tool/cursor">Cursor</a>'s is. It scales with the size and the disorder of the thing being searched.</p>

            <h3>Retrieval is the product; completion is the commodity</h3>

            <p>Cody runs as an extension in VS Code and the JetBrains IDEs and does what everything in this category does — chat, inline completion, commands for drafting tests or explaining a selection. Nobody picks it for those. What differs is where the context comes from. Cody can pull in code from repositories you have never opened, because Sourcegraph already indexed them. Ask why a service returns a particular error and a local-context tool can only reason about the file in front of it; a search-backed one can surface the other call sites, the shared helper living two repositories over, and the migration that changed the behaviour in the first place.</p>

            <p>Cody also lets a team choose among several underlying models rather than being welded to one vendor's. That reads like a checkbox and is not one: inside an organisation where legal has approved exactly one model provider, an assistant that cannot switch providers is an assistant that cannot be deployed at all.</p>

            <h3>Small repositories erase the advantage</h3>

            <p>Retrieval only helps when retrieval is hard. On a project of a few dozen files, a modern assistant can hold the relevant code in its context window directly, and the machinery that makes Cody interesting has nothing left to do. You still pay for it, though — an index to stand up, a deployment to configure, and freshness to worry about, because a search index that lags behind the branch you are working on will describe code that no longer exists with complete confidence.</p>

            <p>The inverse case is where the price makes sense. A codebase with undocumented internal libraries, two half-finished framework migrations, and conventions that live only in the memory of people who left is a retrieval problem, and retrieval is what Sourcegraph spent years building. So the question to settle first is not whether Cody is good. It is whether your codebase is large enough and tangled enough that whole-estate context is worth the setup it demands.</p>

            <h3>You are adopting Sourcegraph, not an editor plugin</h3>

            <p>This is the part that catches teams out. The context that differentiates Cody depends on Sourcegraph's index, so the real decision is whether your organisation is prepared to run Sourcegraph — self-hosted, in a dedicated instance, or managed — and to keep it indexed as the code moves. For an enterprise already running it, Cody is close to free marginal effort, and the security posture is a genuine argument in its favour: code is indexed and served inside infrastructure you control rather than shipped to a shared third-party service, which is the kind of guarantee that decides procurement in regulated environments. Teams working through what those guarantees are actually worth may find <a href="/blog/zero-knowledge-ai">the confidential-computation framing</a> a useful companion. For a team not already running Sourcegraph, the honest cost of Cody includes standing up and operating a code search platform, which is a different conversation than installing an extension. Sourcegraph has also repositioned its individual-developer tiers more than once while concentrating on the enterprise product, so confirm what is currently offered to individuals rather than planning around a free or Pro plan that may have moved.</p>

            <h3>When to pick something else</h3>

            <p>Cody is a strongly grounded assistant, not an autonomous one. If the goal is to hand over a ticket and return to a finished pull request, <a href="/tool/devin-ai">Devin</a> or the multi-file agent flows in <a href="/tool/windsurf-ide">Windsurf</a> are aimed at that job in a way Cody is not. If you want the most fluid in-editor experience with no infrastructure behind it, <a href="/compare/cursor-vs-github-copilot">the Cursor and Copilot comparison</a> is the more relevant read. If the hard requirement is that no source code may leave your network under any circumstances, an on-premises completion tool like <a href="/tool/tabnine">Tabnine</a> attacks that directly rather than as a side effect of where your search index happens to live. And if you are starting a greenfield project this week, there is nothing to search yet — revisit it when the codebase has enough history to be worth indexing.</p>
        `,
        useCases: [
            {
                title: "Ramping up inside a codebase nobody fully understands",
                body: "A new engineer can ask in plain language how a subsystem works and get an answer grounded in the code that is actually deployed rather than documentation written two reorganisations ago. This is the single most commonly cited reason large engineering organisations keep paying for it.",
            },
            {
                title: "Tracing a change across repository boundaries",
                body: "Platform and infrastructure teams use cross-repository context to find out who consumes an interface before they change it. An assistant limited to the open workspace structurally cannot answer that question, because the consumers are in repositories nobody has open.",
            },
            {
                title: "Finding the precedent instead of inventing one",
                body: "In an old codebase the right answer is usually not the idiomatic answer from a training set — it is whatever the team already does. Search-backed context lets the assistant locate an existing implementation of the same pattern, so new code matches house convention rather than a generic blog post.",
            },
            {
                title: "Giving a security-constrained org an assistant at all",
                body: "Where code cannot be sent to a shared cloud service, running Cody against a self-hosted or dedicated Sourcegraph deployment keeps indexing and retrieval inside a controlled boundary, and the ability to select among approved model providers matters as much as the deployment topology to the review board signing it off.",
            },
        ],
        pricingDetail:
            "Cody has carried a free tier for individuals and a paid Pro tier above it, but those individual plans have been repositioned more than once as Sourcegraph concentrated on its enterprise business, so treat any description of them — including this one — as something to verify on Sourcegraph's own site before planning around it. The tier that actually matters is Enterprise, where self-hosted or dedicated deployment, administrative controls, model-provider selection, and the codebase indexing that makes whole-estate context possible are negotiated per organisation. Budget for the platform underneath as well as the assistant on top: the recurring cost of Cody is not only its licence but the Sourcegraph deployment that gives it something to search.",
        faq: [
            {
                q: "How is Cody actually different from Copilot or Cursor?",
                a: "Where the context comes from. Copilot and Cursor build context primarily from your open workspace and are generally faster and smoother for moment-to-moment editing. Cody queries Sourcegraph's index, which lets it answer questions that span repositories you do not have open. On a small project that difference is invisible; on a large multi-repository estate it is the whole point.",
            },
            {
                q: "Do I need Sourcegraph to get the benefit?",
                a: "Effectively yes. The whole-codebase and cross-repository context that distinguishes Cody comes from Sourcegraph's search index, so the adoption decision is really about whether you are willing to run and maintain that platform. Teams that want context with no infrastructure step should look at editor-native tools instead.",
            },
            {
                q: "Can Cody run on our own infrastructure?",
                a: "Yes — running it against a self-hosted or dedicated Sourcegraph deployment is one of the main reasons security-conscious organisations choose it over cloud-only competitors. Confirm the current deployment options and the data-handling terms for whichever model provider you select, since those are two separate questions and only one of them is answered by self-hosting the index.",
            },
            {
                q: "Can we choose which model Cody uses?",
                a: "Model selection is part of the enterprise offering, which matters more for compliance than for quality. Organisations frequently have an approved list of model providers, and being able to point the assistant at an approved one is often the difference between a rollout and a rejected proposal.",
            },
            {
                q: "Is Cody an autonomous coding agent?",
                a: "Not in the sense that Devin is. It is best understood as a well-grounded assistant that answers questions and drafts changes with unusually good knowledge of your system, rather than something you assign a ticket to and leave alone. If autonomous execution is the requirement, evaluate agent products against that requirement directly instead of expecting Cody to grow into one.",
            },
        ],
    },

    cosine: {
        overviewHtml: `
            <p><strong>Cosine</strong> builds an autonomous coding agent, marketed as <strong>Genie</strong>, in the same category as <a href="/tool/devin-ai">Devin</a> rather than the completion-first category occupied by <a href="/tool/github-copilot">GitHub Copilot</a>. The intended shape of use is familiar by now: you describe a bug or a feature, the agent explores the repository, forms a plan, edits however many files the change touches, and hands back something for a human to review.</p>

            <p>Writing usefully about a tool like this requires admitting something first. This is a young category and Cosine is a small vendor inside it, which means specific capability claims age in weeks and independent evidence is thin. So the honest thing to publish is not a feature list that may be wrong by the time you read it, but the two things that do not change: what work this class of tool is currently good for, and what you have to verify yourself before trusting any product in it — including this one.</p>

            <h3>The shape of work that suits an autonomous agent</h3>

            <p>Agents in this category perform best on tasks with three properties, and the properties matter far more than which vendor you pick. The task has to be <strong>locatable</strong> — there has to be a findable place in the code where the change belongs, rather than a design decision to be made first. It has to be <strong>bounded</strong>, meaning a competent engineer could describe what done looks like in a sentence or two. And it has to be <strong>verifiable</strong> by something other than a human reading the diff: a test that fails before and passes after, a type checker, a linter, a reproduction script. Where all three hold, delegating the work and reviewing a pull request is a reasonable trade. Where any one fails, you get plausible code that solves a problem adjacent to yours, and reviewing it costs more than writing it would have.</p>

            <p>The failure mode specific to this category is worth naming because it is not obvious from a demo. An agent that misidentifies where a change belongs does not stop; it commits to the wrong location and then makes every subsequent edit consistent with that mistake. The output is internally coherent and entirely wrong, which is considerably harder to catch in review than code that is simply broken. That is why every vendor here talks about codebase understanding before generation — Cosine's stated emphasis is semantic search over the repository ahead of planning — and why a human in the loop is not a temporary limitation of the current generation but the thing that makes the current generation usable.</p>

            <h3>Where it does not belong, and what to check before adopting</h3>

            <p>Do not reach for an autonomous agent when the hard part of the work is deciding what to build. Ambiguous requirements, architecture choices, anything touching auth, payments, migrations, or data deletion, and anything where the cost of a subtly wrong change is measured in customer trust — all of it belongs with a person, possibly a person using <a href="/tool/cursor">Cursor</a>, where a developer sees each change as it happens. It is also the wrong tool if your repository lacks the test coverage to tell you whether a change is safe: an agent removes the writing effort, not the verifying effort, and without tests you have simply moved the whole burden into code review. And if your team is not already comfortable rejecting AI-generated pull requests, adding a machine that produces them faster will not help.</p>

            <p>Before committing to Cosine or any competitor, run your own evaluation rather than accepting anyone's reported benchmark scores, this page included. Public agent benchmarks measure performance on curated public repositories, which is not the same thing as performance on your undocumented internal framework. Take ten tickets your team actually closed last quarter, replay them, and count how many produced a diff you would have merged with light edits. Separately, ask the vendor where your code goes during a run, what is retained, and — since this is a young company in a consolidating market — what happens to your workflows if the product is acquired or discontinued. Those questions are answerable now and are more predictive than any leaderboard. <a href="/blog/autonomous-agents-devin">The broader shift from assistants to agents</a> is worth reading before you scope a pilot.</p>
        `,
        useCases: [
            {
                title: "Mechanical changes with a clear finish line",
                body: "Dependency bumps that require touching call sites, renaming a concept across a package, backfilling tests for existing functions, adding an endpoint that mirrors three existing ones. These are locatable, bounded, and verifiable, which is exactly the profile where handing off the writing and keeping the reviewing is a favourable trade.",
            },
            {
                title: "Running a real evaluation of the agent category",
                body: "Because nobody can tell you from outside whether an agent works on your codebase, the most valuable early use is a structured trial: replay closed tickets, measure how often the output is mergeable, and note where it went wrong. That exercise is worth doing regardless of which vendor you eventually choose, and it is the only way to find out whether your repository is legible enough for any agent to work in.",
            },
        ],
        pricingDetail:
            "Cosine has been offered on a freemium basis, with a free tier intended for evaluation and paid plans for teams needing more volume, collaboration features, or a self-managed deployment. Pricing and packaging in the autonomous-agent category change frequently, so confirm current terms on the vendor's own site rather than relying on any third-party summary. The more useful budgeting point is that seat or subscription cost is rarely the dominant expense here: agent runs consume model tokens, and the review time a team spends on agent-authored pull requests is a real cost that does not appear on any invoice. Model both before concluding an agent is cheaper than the engineer it was supposed to free up.",
        faq: [
            {
                q: "Is Cosine the same kind of thing as Devin?",
                a: "Conceptually yes — both are autonomous coding agents that take a task description and attempt to plan and execute a complete change, as opposed to suggesting code inline. The differences between vendors in this category are mostly maturity, integrations, and deployment options rather than the underlying idea, which is why evaluating on your own repository matters more than comparing feature lists.",
            },
            {
                q: "Can I let it merge without review?",
                a: "No, and that is not a limitation of this particular product. No autonomous coding agent available today should merge unreviewed into a codebase anyone depends on. The specific risk is that a wrong change is internally consistent rather than obviously broken, which makes it harder to spot than ordinary bad code.",
            },
            {
                q: "What kinds of tickets actually work?",
                a: "Ones where the change has a findable home in the code, where done can be described in a sentence, and where something automated can prove it worked. If a ticket requires deciding what to build, or if nothing but a human reading the diff can confirm correctness, it is the wrong candidate no matter how capable the agent is.",
            },
            {
                q: "Can it run on our own infrastructure?",
                a: "A self-managed deployment has been part of Cosine's stated positioning, which is aimed at teams that cannot send proprietary code to a third-party service. Treat this as a question for the vendor rather than a settled fact — get the current deployment options, the data-retention terms, and whether any model calls leave your boundary, in writing.",
            },
            {
                q: "Should we buy this instead of Cursor or Copilot?",
                a: "They solve different problems and are not really substitutes. An editor-native assistant makes a developer faster at work they are doing; an agent attempts work in their absence. Most teams that adopt an agent keep the assistant, because the agent only covers the narrow slice of tickets that are well-scoped enough to delegate.",
            },
            {
                q: "How much should I trust published benchmark numbers?",
                a: "Less than the marketing around them implies. Agent benchmarks run against curated public repositories with clean tests and clear issue descriptions, which is close to the best case and unlike most working codebases. A vendor scoring well has demonstrated something real but not the thing you need to know. Replay your own closed tickets instead; ten of them will tell you more than any leaderboard.",
            },
        ],
    },

    grok: {
        overviewHtml: `
            <p><strong>Grok</strong> is xAI's conversational assistant, available as a standalone app and website and built directly into <strong>X</strong>. Its distinguishing feature is structural rather than stylistic: it has first-party access to activity on X. Most assistants reach current information through a web search tool over an index that updates on its own schedule. Grok can reach the conversation itself. That advantage is narrow, real, and worth understanding precisely, because it decides the handful of questions where Grok is the better answer and the many where it is not.</p>

            <h3>What first-party access to X actually buys</h3>

            <p>Two things, mostly. The first is recency on events that are being discussed as they happen — a live sports result, an unfolding news event, an outage, an announcement made twenty minutes ago. A web index has to crawl an article that someone has to write first; posts exist immediately. The second is reaction, which is a different kind of question entirely. "What is the response to this launch" is not answerable from a search index at all, because the thing being asked about is a distribution of opinions rather than a fact. On that specific class of question, an assistant plugged into a live social platform has information that <a href="/tool/chatgpt">ChatGPT</a> and <a href="/tool/perplexity">Perplexity</a> structurally do not.</p>

            <h3>Reasoning modes and deeper search</h3>

            <p>Like its peers, Grok exposes more than one depth setting: a fast conversational mode for ordinary questions, a reasoning mode that spends longer working through harder ones, and an agentic search mode that goes and gathers sources across the web and X before answering rather than replying from what the model already knows. The practical guidance is the same as with any assistant offering this split — the slow modes are worth their latency on multi-step and research questions, and waste it on everything else. Grok also includes image generation and voice interaction alongside text, so for many users it functions as a general-purpose assistant with the live-data capability as an extra rather than as the reason they opened it.</p>

            <h3>Grok as a model, not just an app</h3>

            <p>xAI sells API access to its models, which is the part of the product most easily missed by anyone evaluating the chat app alone. It has also shipped coding-oriented model variants, and xAI models have appeared in the model pickers of third-party developer tools including <a href="/tool/cursor">Cursor</a> and <a href="/tool/github-copilot">GitHub Copilot</a>. This matters for two reasons. It means you can evaluate the model on your own work without adopting the assistant or the social platform around it, and it means "is Grok good" is really two questions — one about a consumer product and one about a model family — that frequently get answered as though they were one.</p>

            <h3>Where real-time data stops helping</h3>

            <p>Live social posts are a source with a specific and well-understood shape. They are fast, they are unfiltered, and they are not verified. For a developing story, the early posts are frequently wrong in ways that later reporting corrects, and an assistant summarising them faithfully will reproduce the error faithfully. For contested claims, volume is not evidence — the loudest account of an event is not the accurate one, and no summariser can tell the difference from the text alone. And for anything that is not discussed on X, the advantage simply does not apply: an obscure technical question, a historical topic, a scientific literature review all fall back to ordinary model knowledge plus web search, where citation-first tools are built for exactly that job. The rule of thumb is that Grok's edge tracks how much of the answer lives in conversation and decays to zero as the question moves toward the archive.</p>

            <h3>When to use something else</h3>

            <p>Pick a citation-first tool when the output has to be checkable: <a href="/tool/perplexity">Perplexity</a> is designed around showing its sources, and for research where you need to follow a claim back to its origin that design matters more than freshness. Pick <a href="/tool/claude">Claude</a> or a comparable assistant when the work is long-form reasoning, careful writing, or extended document analysis, where real-time access contributes nothing. And if you do not use X, weigh the product accordingly — a capability built on a platform you are not part of is a feature you will rarely trigger, and the honest comparison then is just model against model. The side-by-side pages for <a href="/compare/chatgpt-vs-grok">ChatGPT and Grok</a> and for <a href="/compare/claude-vs-grok">Claude and Grok</a> go through those trade-offs in more detail.</p>
        `,
        useCases: [
            {
                title: "Following a story while it is still developing",
                body: "For events being discussed in real time — a breaking incident, a live result, a service outage — an assistant reading the platform directly is working from fresher material than one waiting on a crawler. Treat early consensus as provisional, because that is what it is.",
            },
            {
                title: "Gauging reaction rather than retrieving facts",
                body: "Questions about how something landed publicly are not search queries. A distribution of opinion is only available where the opinions are, which is the one category where live social access is not a convenience but a prerequisite.",
            },
            {
                title: "Making sense of a thread without leaving X",
                body: "Because Grok is embedded in the X app, summarising a long argument, getting background on an unfamiliar reference, or asking what a post is responding to happens in place. The value here is the absence of a context switch more than the answer quality.",
            },
            {
                title: "Monitoring a topic that lives on the platform",
                body: "Some subjects — parts of the developer ecosystem, crypto, sports, entertainment — have their primary discussion on X rather than in publications. For those, an assistant with platform access covers the actual source of record instead of the coverage about it.",
            },
            {
                title: "A general assistant with a less hedged tone",
                body: "For everyday questions, drafting, and brainstorming, some users prefer a model that answers directly rather than qualifying heavily. That is a genuine preference rather than a capability, and it cuts both ways: less hedging also means fewer signals about where the answer is uncertain.",
            },
            {
                title: "Image generation inside the same assistant",
                body: "Image generation is built in, which is convenient for casual and social use where the alternative is opening a separate tool. For production creative work, dedicated image tools remain the stronger choice on control and output quality.",
            },
            {
                title: "Evaluating xAI models through the API or an editor",
                body: "Developers can reach xAI models through the API or select them in third-party tools' model pickers, which makes it possible to test the models on real coding and reasoning work without adopting the consumer app at all — and separates the question of model quality from any opinion about the platform.",
            },
        ],
        pricingDetail:
            "Grok has a free tier with rate-limited conversational access. Fuller capability — higher limits, the more capable models, and the deeper reasoning and search modes — has been sold both bundled into X's premium subscription tiers and as a standalone xAI subscription, and the balance between those two routes has changed more than once, so check what is currently offered before comparing cost against a competitor. The structural point for budgeting is that part of Grok's value is tied to a social platform: if you already subscribe to X, marginal cost is low and the integration is the payoff; if you do not, you are evaluating a general-purpose assistant whose headline differentiator applies to a platform you are not on. Developers have a third path entirely, since API access to xAI models is priced separately from any consumer subscription.",
        faq: [
            {
                q: "What can Grok do that ChatGPT and Claude cannot?",
                a: "Read what is being said on X right now, as a first-party capability rather than through a general web search tool. That helps on live events and on questions about public reaction, and does nothing for questions whose answers live in documents rather than conversation.",
            },
            {
                q: "Do I need an X subscription?",
                a: "A free tier exists with limited usage. Fuller access has been available both through X's premium tiers and through a standalone subscription, and the packaging has shifted over time — verify current terms directly rather than relying on any summary, including this one.",
            },
            {
                q: "Is it reliable for research?",
                a: "It is strongest where the subject matter is live discussion and weaker where an answer needs to be traced to a verifiable source. Social posts are fast and unverified, and early accounts of a developing story are often wrong. For work that has to withstand checking, a citation-first tool is the safer default.",
            },
            {
                q: "Can I use it for coding?",
                a: "xAI has shipped coding-oriented model variants and its models have appeared in third-party developer tools' model pickers, so testing them inside an editor you already use is straightforward. Judge them on your own code — coding performance varies enough by language and task that a general impression of the chat app predicts very little.",
            },
            {
                q: "Is there an API?",
                a: "Yes, xAI offers API access to its models, priced separately from consumer subscriptions. This is the cleanest way to evaluate the underlying models on their merits, since it removes the app, the platform integration, and the tone from the assessment.",
            },
            {
                q: "Is it worth using if I am not on X?",
                a: "Then you are evaluating an ordinary general-purpose assistant, because the differentiator is the part you will not use. That can still be a fine outcome if you like how the model answers, but the comparison against competitors should be made on model quality and price rather than on the real-time capability.",
            },
            {
                q: "What happens on topics nobody posts about?",
                a: "It falls back to what the model knows plus ordinary web search, exactly like everything else. The real-time advantage is proportional to how much of the answer exists in conversation, so on obscure technical, historical, or academic questions it contributes nothing and the tool should be judged on general capability alone.",
            },
        ],
    },

    ollama: {
        overviewHtml: `
            <p><strong>Ollama</strong> belongs in a different category from almost everything else on this site. It is not an assistant, and comparing it with <a href="/tool/chatgpt">ChatGPT</a> or <a href="/tool/claude">Claude</a> is a category error in the same way as comparing a database server with a spreadsheet. Ollama is a runtime: it downloads open-weight models, manages them, and serves them from your own machine over a local API. What you do with that is up to whatever you point at it.</p>

            <h3>A runtime, not a chatbot</h3>

            <p>Its contribution was making this boring. Running an open model locally used to mean Python environments, driver versions, and model-format conversions performed by hand. Ollama reduced it to pulling a model and running it, in roughly the spirit that container tooling once did for deployment. Everything interesting about it follows from that, including the parts that disappoint people.</p>

            <h3>The constraint that decides everything is memory</h3>

            <p>The first question about any local model is not how smart it is. It is whether it fits. A model's weights have to be held in memory to be used, and if they fit in GPU memory the model runs at the speed the hardware allows. If they do not, work spills onto the CPU and system RAM and throughput falls off sharply — not slightly slower, but slow enough to change what the tool is for. This is why hardware advice in this space sounds monotonous: capability is gated by memory capacity more than by raw compute.</p>

            <p>Practically, small models in the range most people run first are comfortable on ordinary consumer hardware, mid-sized models want a reasonably capable discrete GPU or a machine with a large unified memory pool, and the largest open-weight releases are out of reach for typical personal machines regardless of patience. Apple Silicon is unusually well suited here because the GPU addresses the same large memory pool as the CPU, which sidesteps the discrete-VRAM ceiling that limits many consumer graphics cards. One detail that catches people out: the weights are not the only thing consuming memory. Long contexts require additional memory that grows with the amount of text in play, so a model that loads comfortably can still run out of room on a long document. <a href="/blog/local-llm-llama4">The case for running models on your own machine</a> and <a href="/blog/agentic-hardware-m5-blackwell">the hardware side of it</a> go further into the trade-offs.</p>

            <h3>Quantization is the dial you are already turning</h3>

            <p>Models in Ollama's library are distributed in quantized form, meaning the weights are stored at reduced numerical precision so a model that would not otherwise fit does. This is the single most important thing to understand about local inference, because it is a quality setting that most users never realise they set. Heavier quantization shrinks a model and speeds it up, and it degrades output — usually gracefully at first, and then not. The useful heuristic is that a larger model quantized more aggressively often beats a smaller model at higher precision, but the crossover point depends on the model family and on your task, and the only way to find it is to try the variants on work you actually care about rather than on a puzzle you found online.</p>

            <h3>What you get in exchange for the quality gap</h3>

            <p>Be honest about the trade first: open-weight models you can run on consumer hardware generally trail frontier hosted models on hard reasoning, long-horizon coding, and instruction-following precision. There is no prompt that closes that gap and no upgrade button, because the ceiling is your hardware. What you get instead is three things a hosted API cannot offer at any price. Nothing leaves the machine, which is a categorically stronger guarantee than a vendor's retention policy, however well written — the relevant comparison is <a href="/blog/zero-knowledge-ai">what guarantees are actually available from hosted providers</a>, and "the request never happened" wins all of them. It works with no network, which matters for air-gapped environments, travel, and anything where connectivity is unreliable. And the marginal cost of a token is zero, which changes what you are willing to build: retry loops, bulk processing, and chatty agent designs that would be reckless against a metered API become unremarkable when the only meter is electricity.</p>

            <h3>Wiring it into things you already use</h3>

            <p>Ollama serves a local HTTP endpoint and provides an OpenAI-compatible interface, which is why the ecosystem around it grew so fast: a large amount of existing software can be pointed at a local endpoint by changing a base URL and a model name. Command-line and editor assistants take Ollama as a backend — <a href="/tool/aider">Aider</a> is the common pairing, since it already treats the model as a swappable component, and running it against a local model turns a per-token cost into a fixed one. A Modelfile lets you pin a system prompt and generation parameters to a named model so a particular configuration becomes reproducible rather than something you retype. The practical shape that works for most people is not all-local or all-cloud but a split: local models for high-volume, privacy-sensitive, or repetitive work, and a frontier hosted model for the hard problems.</p>

            <h3>When running models locally is the wrong call</h3>

            <p>Do not do this if you need the best available answer and have no constraint forcing the work onto your own hardware — you will spend a weekend to arrive somewhere a subscription would have taken you in a minute. Do not do it on underpowered hardware and conclude the technology is bad; you have measured your laptop, not the field. Do not choose it for a production service without accounting for what you are now operating, because a local endpoint is a service with capacity limits, upgrade work, and someone responsible when it stops. Do not assume "open weights" means "open source" — several widely used model licences carry restrictions on commercial use and redistribution, and that is a question for whoever signs off on your dependencies, not an afterthought. And do not adopt it purely to save money without doing the arithmetic: <a href="/blog/token-economics-2026">the cost of inference</a> only favours local hardware above a certain sustained volume, and below it the hardware sits idle while a metered API would have cost less than the electricity.</p>
        `,
        useCases: [
            {
                title: "Work that contractually cannot leave the machine",
                body: "Where a client agreement, a regulatory rule, or an internal policy forbids sending source code or documents to a third party, local inference is not a preference but the only configuration that complies. The argument is unusually easy to make to a security reviewer because there is no outbound request to assess.",
            },
            {
                title: "Backing a coding assistant without per-token billing",
                body: "Tools that treat the model as a swappable component can be pointed at a local endpoint instead of a cloud API, which converts a usage-based bill into a fixed hardware cost. Pairing with Aider is the common example, and it changes how freely you iterate once every retry is free.",
            },
            {
                title: "Comparing open models without wrangling environments",
                body: "Pulling several model families and switching between them with one command makes genuine comparison practical, which used to be a research chore involving conversion scripts and dependency conflicts. This is the fastest way to find out which open model is actually adequate for a specific job.",
            },
            {
                title: "High-volume, low-difficulty batch work",
                body: "Classification, tagging, extraction, and first-pass summarisation over large document sets are tasks where a smaller model is usually good enough and the volume is what costs money. Running these locally removes the per-token cost from the design entirely, which is often what makes the project viable.",
            },
            {
                title: "Offline and disconnected environments",
                body: "Air-gapped networks, field work, flights, and unreliable connectivity all rule out hosted assistants by default. A local runtime keeps working because it never needed the network in the first place, which is also what makes it a reasonable foundation for applications that must degrade gracefully.",
            },
        ],
        pricingDetail:
            "Ollama is free and open-source software with no subscription tiers, usage limits, or per-token billing — there is no plan to compare because inference is not being sold to you. That does not make it costless. The expense moves to hardware capable of holding a useful model in memory, to the electricity to run it, and to your own time configuring and maintaining it, none of which appear on an invoice. The comparison that matters is total cost over a sustained workload rather than price per request: a metered API is cheaper for intermittent use of a frontier model, while local hardware wins when volume is high and consistent, when the task does not demand frontier capability, or when a compliance requirement has already eliminated the hosted option and the real alternative is having no AI assistance at all.",
        faq: [
            {
                q: "Is Ollama actually free?",
                a: "Yes — open-source software with no subscription, no usage caps, and no per-token charge. The real cost is the hardware needed to run models at a speed you will tolerate, plus the time to set it up and keep it current.",
            },
            {
                q: "What hardware do I need?",
                a: "Memory capacity is the binding constraint. Smaller models run acceptably on ordinary modern machines, mid-sized ones want a capable GPU or a large unified memory pool, and the biggest open-weight releases are impractical on typical personal hardware. If a model does not fit in GPU memory, it will still run, but slowly enough that the experience changes character.",
            },
            {
                q: "Are local models as good as ChatGPT or Claude?",
                a: "Generally not on hard reasoning, long coding tasks, and precise instruction-following, and it is worth being blunt about that rather than discovering it mid-project. Ollama's advantages are privacy, offline operation, and cost control, not leaderboard performance. Many people run both and route work by difficulty.",
            },
            {
                q: "What is quantization costing me?",
                a: "Some output quality, in exchange for fitting in memory and running faster. The degradation is gradual up to a point and then noticeable. A bigger model at heavier quantization frequently outperforms a smaller model at lighter quantization, but where that crossover sits depends on the model and the task, so test the variants on your own work.",
            },
            {
                q: "Can I use Ollama with tools I already have?",
                a: "Usually. It serves a local HTTP endpoint with an OpenAI-compatible interface, so a great deal of existing software can be redirected to it by changing a base URL and a model name. That compatibility is the main reason the surrounding ecosystem grew as quickly as it did.",
            },
            {
                q: "Does it work with no internet connection?",
                a: "Once a model is downloaded, yes, completely. You need connectivity to pull models and updates, and nothing after that. This is what makes it usable on air-gapped networks and the reason it appears in environments where a hosted assistant was never an option.",
            },
            {
                q: "Is open-weight the same as open-source?",
                a: "No, and conflating them creates real legal exposure. Several widely used model licences place conditions on commercial use or redistribution that an OSI-approved licence would not. Read the licence for the specific model you intend to ship with rather than assuming the category is permissive.",
            },
            {
                q: "Should I self-host instead of paying for an API?",
                a: "Only if the arithmetic supports it. Sustained high volume, tasks that do not need frontier capability, and hard privacy requirements all favour local. Intermittent use of a genuinely difficult task favours the API, because idle hardware is pure cost while a metered call is not. Most teams end up splitting the work rather than choosing a side.",
            },
        ],
    },

    "openai-sora": {
        overviewHtml: `
            <p><strong>Sora</strong> is OpenAI's video generation model, and the useful way to evaluate it is not to ask how good the output looks. The output looks good. The question that decides whether it belongs in your work is whether a clip it produces can leave the building — whether it can be cut, cleared, disclosed, and handed to someone who is paying for it. That is a different question from the one <a href="/tool/runway">Runway</a> is built to answer, and the two products sit on opposite sides of it.</p>

            <p>Runway sells an editing suite with generation attached, so its promise is that you can keep working on what comes out. Sora's promise is close to the reverse: you describe a shot and it returns a finished one, picture and synchronised sound arriving together from a single pass. When the result is right, it is right faster than any other route to the same frame. When it is nearly right, you are back at the prompt, because there is no layer to open.</p>

            <h3>A finished clip is not an editable clip</h3>

            <p>Everything downstream follows from this. A composite generation is delivered as one baked image sequence: no mattes, no separated subject, no depth pass, no isolated background. If the actor's hand is wrong in the third second, you cannot fix the hand — you can only roll again and hope the rest survives. Iteration in Sora is a slot machine with a very good payout table, not a set of controls.</p>

            <p>In practice this reshapes how you brief the work. Prompting becomes the craft, because it is the only lever, and shot selection happens before the edit rather than inside it. Teams that get good results treat generation as a casting call — produce many candidates cheaply, choose ruthlessly, and never plan a shot whose value depends on one specific detail landing. Teams that struggle are the ones who wrote a storyboard first and then tried to make the model match it frame for frame.</p>

            <h3>Two products are wearing the same name</h3>

            <p>Most arguments about Sora are people evaluating different things. One is the consumer app: a feed, a remix culture, cameos of friends, short vertical clips made and consumed in the same place. The other is Sora as a generation engine reached through OpenAI's paid subscriptions and, separately, through programmatic access. These have different limits, different surfaces, different watermarking behaviour and, frequently, different answers to whether something is allowed.</p>

            <p>Decide which one you are buying before you form an opinion. If you came through <a href="/tool/chatgpt">ChatGPT</a> because a plan you already pay for includes some video generation, you are a creator using a bundled feature and the economics are excellent. If you need clips generated on a schedule, by a pipeline, with predictable cost per delivered asset, you are evaluating an API product and the questions are availability, rate limits, and per-asset cost — none of which the app tells you anything about.</p>

            <h3>What travels with the file</h3>

            <p>Generated video does not arrive as a neutral MP4. OpenAI has said Sora output carries C2PA provenance metadata identifying it as AI-generated, and downloads from the consumer surfaces have carried a visible moving watermark as well. Which tiers and which surfaces strip or keep the visible mark has already changed more than once, so confirm the current behaviour against OpenAI's own documentation before you quote a client a deliverable spec.</p>

            <p>The part people underestimate is that provenance is a workflow problem, not just a policy one. Metadata is fragile — re-encoding, screen recording, and a fair number of upload pipelines drop it — while the visible watermark is the opposite: durable, and sitting in the frame where a brand safety reviewer will see it. Meanwhile the large distribution platforms now expect creators to disclose realistic synthetic media in their own right. Treat disclosure as something you plan for at the brief stage, alongside music licensing, rather than something you discover during delivery.</p>

            <h3>Likeness is gated, and that is the point</h3>

            <p>The app's cameo feature lets a person insert their own likeness into generated video, and it is built around verified consent: the person records themselves to establish the likeness, controls who is permitted to use it, and can withdraw that permission. This is the single clearest signal of how OpenAI is positioning the product, because it is an explicit decision to make the most commercially tempting feature the least freely available one.</p>

            <p>For commercial work the consequence is simple and easy to forget. You cannot cast someone in a Sora video the way you would cast them in an edit. Real people have to opt in themselves, which means talent, executives, and customers become scheduling dependencies rather than prompt parameters. Plan for that before you sell a concept that depends on a recognisable face.</p>

            <h3>Characters and brands you do not own</h3>

            <p>The model is good enough to produce something that reads as an established character or a recognisable brand world, and that capability is exactly where the legal ground is least settled. OpenAI's approach to third-party rightsholders has already shifted once since the product launched, in the direction of giving those rightsholders more control rather than less — which tells you something about the direction of travel even if the specifics change again.</p>

            <p>The practical rule for anyone spending a client's money: do not build a campaign concept on intellectual property you do not control, and do not assume that what the model will generate today is what it will generate, or permit, next quarter. Generated homage is fine for a mood board and dangerous on a media buy.</p>

            <h3>The limits that decide whether a shot survives an edit</h3>

            <p>Sora produces shots, not sequences. Clips are short, and asking for longer output is where coherence typically degrades first. Continuity across separate generations is the harder version of the same problem: the same character, wardrobe, location and lighting across three clips is not something you can simply request, which is why generated material tends to work best when each shot stands alone rather than cutting together into a scene.</p>

            <p>Two other failure modes are worth knowing before you promise anything. Legible on-screen text — signage, packaging, a UI, a headline — is unreliable, so plan to add type in post rather than generate it. And matching generated footage to material you actually shot remains genuinely hard: grain structure, lens character, and lighting direction will not line up, and an audience that could not name the problem will still feel that the cut is wrong.</p>

            <h3>When not to use Sora</h3>

            <p>Do not use it when the shot has to be fixed rather than replaced. Anything that needs a subject matted, an object removed, a region retimed, or a specific element replaced belongs in <a href="/tool/runway">Runway</a>, where those tools exist, and the quality gap between the two generators matters far less than the existence of a second attempt that is not a full re-roll. Do not use it for a continuous scene, for a shot that must intercut with live-action plates, or for anything where a real person, a specific product, or an exact brand asset has to be reproduced faithfully.</p>

            <p>Do not use it, either, where the medium is wrong. If the deliverable is a still image, a still-image tool such as <a href="/tool/midjourney">Midjourney</a> gives more control over the frame than pulling one out of generated motion. If the job is really editing talking-head footage or a podcast, <a href="/tool/descript">Descript</a> is the correct tool, and if the missing piece is a voice track rather than a picture, <a href="/tool/elevenlabs">ElevenLabs</a> is more mature at it. And do not use it where the client's review process cannot accommodate a disclosure line or a visible mark on the file — that is a conversation to have before the work, not after. Our wider view of where generative video has got to is in <a href="/blog/sora-video-generation-revolution">this piece on Sora and AI video generation</a>.</p>
        `,
        useCases: [
            {
                title: "Atmosphere shots nobody is checking against reality",
                body: "Establishing views, textures, weather, abstract motion, an aerial-feeling pass over a landscape that does not exist. This is where a single baked clip is genuinely enough, because the brief is a mood rather than a specific fact, and no editor is going to need to remove something from the frame later.",
            },
            {
                title: "Moving pitch material for unfunded work",
                body: "A director, agency, or founder showing what an idea feels like before anyone has committed a budget to it. The audience understands they are looking at intent rather than a deliverable, which removes most of the clearance and continuity problems at a stroke.",
            },
            {
                title: "Social-first clips where the generation is the whole deliverable",
                body: "Short vertical content made for a feed, where there is no edit downstream and no plate to match. The consumer app is built for exactly this, and it is the one context where the lack of an editing suite genuinely costs you nothing.",
            },
            {
                title: "Internal drafts that replace a description",
                body: "Showing a team what a proposed sequence, transition, or visual direction looks like instead of arguing about it in a document. These clips are disposable by design, which makes generation quality and speed the only things that matter and licensing questions moot.",
            },
        ],
        pricingDetail:
            "Sora is not sold as its own standalone subscription; access is bundled through OpenAI's existing products — primarily paid ChatGPT plans and the dedicated Sora app — with generation limits, resolution, and clip length scaling by tier rather than a flat per-tool price. Broader programmatic or enterprise-scale access to Sora remains more limited and considerably more expensive than OpenAI's text-based APIs, reflecting the much higher compute cost of video generation; there is no meaningful free tier for unrestricted use.",
        faq: [
            {
                q: "Can I put a Sora clip in paid client work?",
                a: "Paid access is intended to cover commercial use, but that is rarely the binding constraint. What actually stops delivery is everything around the clip: whether a recognisable person consented, whether the concept leans on intellectual property you do not own, whether a visible watermark is acceptable on the file, and whether the distribution platform requires a synthetic-media disclosure. Read OpenAI's current terms for the surface you are generating on, and treat the clearance questions as part of the brief rather than a formality at the end.",
            },
            {
                q: "Does the watermark come off?",
                a: "Whether a visible mark appears at all depends on which surface and which tier you generated on, and that behaviour has changed as the product has evolved, so check the current documentation rather than a blog post. What does not change is the framing: removing a mark is a terms question before it is a technical one, and it does nothing about the provenance metadata or about a platform's own disclosure rules.",
            },
            {
                q: "Will anyone be able to tell the footage was generated?",
                a: "OpenAI has said Sora output carries C2PA provenance metadata marking it as AI-generated, and a visible watermark has accompanied downloads from the consumer surfaces. Metadata is easy to lose by accident — re-encoding and some upload pipelines drop it — so its absence proves nothing either way. Do not build a plan around footage being untraceable, and do not assume a file that has lost its metadata has therefore lost its origin.",
            },
            {
                q: "Sora or Runway when there is a deadline?",
                a: "Runway, in most cases, because a deadline is really a question about what happens when a shot is eighty percent right. Runway gives you rotoscoping, inpainting, and retiming to rescue it; Sora gives you the prompt again. Choose Sora when the shot stands alone, the brief is atmosphere, and speed to a usable first result is the thing being optimised.",
            },
            {
                q: "Can I generate a video of a specific real person?",
                a: "Not as an open capability. The cameo feature is built on verified consent from the person themselves, who controls who may use their likeness and can revoke it. This is deliberate rather than an oversight, and it means a recognisable face in a commercial concept is a casting and scheduling problem, not a prompting one.",
            },
            {
                q: "What if I prompt a character or brand I do not own?",
                a: "You may or may not get output, because the policy around third-party rightsholders has already shifted once since launch toward giving those holders more control. Either way the risk sits with you the moment the clip is used commercially. Homage is fine on a mood board; it is a bad foundation for a campaign, and what the model permits this quarter is not a licence.",
            },
            {
                q: "Why does the shot fall apart when I ask for something longer?",
                a: "Because these models hold a scene together over a shot, not over a sequence, and the longer the requested duration the more opportunities there are for an object, a face, or a background to drift. The working answer is to structure the idea as separate short shots rather than fighting for one long take. Current duration and resolution limits vary by tier and change often enough that the official documentation is the only reliable source.",
            },
            {
                q: "Is there a way to use it programmatically rather than through the app?",
                a: "Programmatic access has been rolled out separately from the consumer app, with its own availability, restrictions, and cost structure. Because video generation is expensive to serve, the terms here move more than they do on text models, so check OpenAI's API documentation for what is currently offered before you design a pipeline around it — and cost a pilot batch before you commit to volume.",
            },
        ],
    },
};
