import type { ToolExtendedContent } from "./tool-extended-content";

/**
 * Batch B3 of long-form per-tool content, rendered below the standard
 * template sections on /tool/[slug] pages (see lib/tool-extended-content.ts
 * for the shared interface and rendering contract). Kept in a separate file
 * to avoid merge conflicts with other batches being authored in parallel.
 *
 * Covers: cody, cosine, grok, ollama
 */
export const TOOL_EXTENDED_CONTENT_B3: Record<string, ToolExtendedContent> = {
    cody: {
        overviewHtml: `
            <p>Before anything else about the product: <strong>Cody is an enterprise purchase now, and only an enterprise purchase.</strong> Sourcegraph closed new signups for Cody Free, Cody Pro and Enterprise Starter on 25 June 2025 and shut those plans down on 23 July 2025, announced on its own blog under the title "Changes to Cody Free, Pro, and Enterprise Starter plans". The consumer-facing marketing page at sourcegraph.com/cody now redirects to the documentation, and the first line of that documentation is a support notice: Sourcegraph Enterprise. The listed price is 59 dollars per user per month on an annual contract.</p>

            <p>So if you arrived here as an individual developer comparing assistants, this one is not on the shortlist any more, and no amount of feature discussion changes that. Everything below is written for the only reader who can still act on it: someone deciding whether an organisation should run Sourcegraph and put Cody on top of it.</p>

            <h3>Retrieval is the product; completion is the commodity</h3>

            <p>Sourcegraph sells code search to organisations whose codebases are too large for anyone to hold in their head — hundreds of repositories, millions of files, years of accumulated decisions. Cody is what happens when you put a language model in front of that index. Every assistant has to answer the same question, which is which code the model should actually see, and most answer it by guessing from your open tabs and recent edits. Cody answers it by running a search.</p>

            <p>That is an architectural difference rather than a marketing one, and it has a consequence worth understanding before a trial: Cody's value is not roughly constant across teams the way <a href="/tool/github-copilot">GitHub Copilot</a>'s or <a href="/tool/cursor">Cursor</a>'s is. It scales with the size and the disorder of the thing being searched. It runs as an extension in VS Code and the JetBrains IDEs and does the usual things — chat, inline completion, commands for drafting tests or explaining a selection — and nobody picks it for those. What differs is that it can pull in code from repositories nobody on the team has open, because Sourcegraph already indexed them. Ask why a service returns a particular error and a local-context tool can only reason about the file in front of it; a search-backed one can surface the other call sites, the shared helper living two repositories over, and the migration that changed the behaviour in the first place.</p>

            <p>Cody also lets an organisation choose among several underlying models rather than being welded to one vendor's. That reads like a checkbox and is not one: where legal has approved exactly one model provider, an assistant that cannot switch providers is an assistant that cannot be deployed at all.</p>

            <h3>The price is the filter, and the platform underneath is the real bill</h3>

            <p>59 dollars per user per month, committed annually, is roughly three times what the per-seat assistants cost, and that is only the licence. The context that differentiates Cody depends on Sourcegraph's index, so the actual decision is whether the organisation is prepared to run Sourcegraph — self-hosted, dedicated, or managed — and to keep it indexed as the code moves. For an enterprise already running it, Cody is close to free marginal effort, and the security posture is a genuine argument in its favour: code is indexed and served inside infrastructure you control rather than shipped to a shared third-party service, which is the kind of guarantee that decides procurement in regulated environments. Teams working through what those guarantees are actually worth may find <a href="/blog/zero-knowledge-ai">the confidential-computation framing</a> a useful companion. For a team not already running Sourcegraph, the honest cost of Cody includes standing up and operating a code search platform, which is a different conversation from installing an extension.</p>

            <h3>Small repositories erase the advantage</h3>

            <p>Retrieval only helps when retrieval is hard. On a project of a few dozen files, a modern assistant can hold the relevant code in its context window directly, and the machinery that makes Cody interesting has nothing left to do. You still pay for it, though — an index to stand up, a deployment to configure, and freshness to worry about, because a search index that lags behind the branch you are working on will describe code that no longer exists with complete confidence.</p>

            <p>The inverse case is where the price makes sense. A codebase with undocumented internal libraries, two half-finished framework migrations, and conventions that live only in the memory of people who left is a retrieval problem, and retrieval is what Sourcegraph spent years building. So the question to settle first is not whether Cody is good. It is whether your estate is large enough and tangled enough that whole-estate context justifies both the seat price and the platform beneath it.</p>

            <h3>When to pick something else</h3>

            <p>If you are one developer, or a startup, or anyone without a procurement process, pick something else — there is no tier for you, and that is the end of the analysis. If the goal is to hand over a ticket and return to a finished pull request, <a href="/tool/devin-ai">Devin</a> is aimed at that job in a way Cody is not; Cody is a strongly grounded assistant rather than an autonomous one. If you want the most fluid in-editor experience with no infrastructure behind it, <a href="/compare/cursor-vs-github-copilot">the Cursor and Copilot comparison</a> is the more relevant read. If the hard requirement is that no source code may leave your network under any circumstances, an on-premises completion tool like <a href="/tool/tabnine">Tabnine</a> attacks that directly rather than as a side effect of where your search index happens to live. And if you are starting a greenfield project this week, there is nothing to search yet — revisit it when the codebase has enough history to be worth indexing.</p>
        `,
        useCases: [
            {
                title: "Ramping up inside a codebase nobody fully understands",
                body: "A new engineer can ask in plain language how a subsystem works and get an answer grounded in the code that is actually deployed rather than documentation written two reorganisations ago. This is the single most commonly cited reason large engineering organisations keep paying for it, and it is the use case that most obviously justifies an enterprise seat price.",
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
            "There is no individual tier. Cody Free, Cody Pro and Enterprise Starter stopped accepting new signups on 25 June 2025 and were discontinued on 23 July 2025; what remains is Sourcegraph Enterprise, listed at 59 dollars per user per month on an annual commitment. Any page still describing a free or 9-dollar Pro plan — and there are many — predates that change. Budget for the platform as well as the seats: the recurring cost of Cody is not only its licence but the Sourcegraph deployment that gives it something to search, plus whatever the chosen model provider charges under the terms you negotiate. Sourcegraph has since put its newer effort behind a separate product called Amp, which is sold on its own terms rather than as a Cody tier, so confirm which product a quote actually covers before signing.",
        faq: [
            {
                q: "Is there still a free version of Cody?",
                a: "No. Sourcegraph closed new signups on 25 June 2025 and ended Cody Free, Cody Pro and Enterprise Starter on 23 July 2025. Cody is supported on Sourcegraph Enterprise only, and the documentation says so in its first line. If a comparison table still shows a free Cody tier, it has not been updated since mid-2025.",
            },
            {
                q: "What should an individual developer use instead?",
                a: "Something with a tier they can actually buy. Copilot and Cursor both sell to individuals; Tabnine is the answer when code must not leave your machine; Ollama plus an editor plugin is the answer when you want to pay nothing and own the hardware. None of them reproduce Cody's cross-repository retrieval, but that capability was never really aimed at a single developer's project anyway.",
            },
            {
                q: "How is Cody actually different from Copilot or Cursor?",
                a: "Where the context comes from. Copilot and Cursor build context primarily from your open workspace and are generally faster and smoother for moment-to-moment editing. Cody queries Sourcegraph's index, which lets it answer questions that span repositories you do not have open. On a small project that difference is invisible; on a large multi-repository estate it is the whole point, which is also why the product ended up priced and packaged for that estate and nobody else.",
            },
            {
                q: "Do I need Sourcegraph to get the benefit?",
                a: "Yes, and now literally so — Cody is only supported on Sourcegraph Enterprise. The whole-codebase and cross-repository context that distinguishes it comes from Sourcegraph's search index, so the adoption decision is really about whether you are willing to run and maintain that platform. Teams that want context with no infrastructure step should look at editor-native tools instead.",
            },
            {
                q: "Can Cody run on our own infrastructure?",
                a: "Yes — running it against a self-hosted or dedicated Sourcegraph deployment is one of the main reasons security-conscious organisations still choose it over cloud-only competitors. Confirm the current deployment options and the data-handling terms for whichever model provider you select, since those are two separate questions and only one of them is answered by self-hosting the index.",
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
            <p><strong>Cosine has pivoted, and most of what you will read about it elsewhere describes a product that no longer exists.</strong> It was known for Genie, an autonomous coding agent in roughly the same category as <a href="/tool/devin-ai">Devin</a>: describe a bug, the agent searches the repository, plans, edits the files the change touches, and hands back a diff. That is not how the company presents itself now. cosine.sh describes Cosine as <em>the Sovereign AI Lab</em>, and the one-sentence version of the business is that it trains AI models and specialised coding agents for organisations that need frontier capability inside secure environments.</p>

            <p>The distinction that matters is who that sentence is addressed to. The reader it describes is not a developer choosing an assistant; it is an organisation with a constraint — a classification boundary, an air gap, a regulator, a codebase written in something the general-purpose models barely saw during training — that rules out the normal options before the evaluation starts. Worth noting that the pricing page has not entirely followed the front page there: it still sells a $19 Starter plan described as being for solo developers and side projects. So the self-serve door is open, but the product behind it is being built for the constrained buyer, and that is the gap to keep in mind when you read a feature list written for someone whose problems are not yours.</p>

            <h3>What is actually on offer</h3>

            <p>The product line is a set of models under the Lumen name — Lumen Scout, Lumen Outpost and Lumen Sovereign — rather than a single subscription tier list, and the naming tracks the deployment story rather than a good, better, best ladder. Around them the site organises its solutions along four axes: sovereign AI, air-gapped operation, cybersecurity, and niche languages. Applications are narrower and more specific than a general coding assistant: a red-team application is offered, and a training application is listed as coming soon. You reach the system through a CLI or through Cosine's cloud rather than as an editor plugin, which tells you something about the assumed user — this is tooling for an engineering or security team with an environment to integrate with, not a tab-completion experience.</p>

            <p>Of those four axes, niche languages is the one most worth pausing on, because it is the only one that is about capability rather than deployment. A general-purpose assistant's competence in a language tracks how much of that language it saw in training, which is why they are fluent in TypeScript and vague in whatever your industrial control system is written in. A lab that trains its own models can attack that directly. Whether it succeeds is not something this page can tell you, and it is not something a vendor's own numbers can tell you either — Cosine publishes benchmark results of its own devising, and vendor-run benchmarks are evidence about the vendor's confidence rather than about your codebase.</p>

            <h3>When Cosine is the wrong conversation</h3>

            <p>If your code can go to a commercial cloud API, this is not your tool, and the pivot is the reason: you would be buying a sovereignty and security story you do not need, from a small vendor, in place of mature products. A developer who wants an assistant should be reading about <a href="/tool/cursor">Cursor</a> or <a href="/tool/github-copilot">GitHub Copilot</a>; a team that wants tickets worked autonomously should be reading about <a href="/tool/devin-ai">Devin</a> and <a href="/blog/autonomous-agents-devin">the broader shift from assistants to agents</a>. Cosine only becomes the interesting answer at the point where those have already been eliminated by a rule somebody else wrote.</p>

            <p>The evaluation advice for the old Genie still applies to the coding-agent half of this, and it is the part vendors are least keen to have you do: take ten tickets your team actually closed last quarter, replay them, and count how many produced a diff you would have merged with light edits. That number is the one that predicts anything. Everything else — the leaderboard, the demo, this page — is a proxy for it. And because deployment is the whole premise here, get the deployment questions answered in writing before a pilot: where the weights live, what leaves the boundary during a run, what is retained, and what happens to your workflows if the company is acquired.</p>
        `,
        useCases: [
            {
                title: "Coding assistance inside an air-gapped or classified environment",
                body: "The premise of the whole product. Where an environment has no route to a commercial model API, the choice is not between vendors but between having AI assistance at all and not having it, and that is the only situation in which a specialist lab beats an incumbent on anything other than price.",
            },
            {
                title: "Codebases in languages the mainstream models handle badly",
                body: "Defence, industrial, telecoms and financial systems are full of languages and dialects that general-purpose assistants saw little of in training, and their output degrades accordingly. A vendor that trains its own models can target that gap directly, which is a different proposition from a thinner wrapper around someone else's frontier model.",
            },
            {
                title: "Security work rather than feature work",
                body: "Cosine lists a red-team application alongside its coding agents, which puts it in front of a security team rather than a product team. Treat that as a separate evaluation with separate success criteria — the question is what it finds on a system you already know the answers for, not whether it writes pleasant code.",
            },
        ],
        pricingDetail:
            "There is no free tier, so any description of Cosine as freemium — including an earlier version of this page — is out of date. The published plans are self-serve and credit-based rather than per-seat: Starter at $19/month with 4M credits, which the pricing page addresses to solo developers and side projects; Team at $199/month with 47M credits; and Enterprise at $999/month with 240M credits, aimed at highly regulated industries that prioritise data privacy. Extra credits are sold by the million and get cheaper as the plan gets larger — roughly $6.50, $5.00 and $4.50 per million across the three tiers — which is worth an extra second of arithmetic, because it means the entry plan carries the worst unit price at exactly the point a heavy user starts overrunning its allowance. The credit mechanic is the real budgeting risk, and the vendor is straightforward about why: its own FAQ defines credits as usage across agent work, model calls and cloud execution, with actual consumption depending on task size, model choice and runtime. That is an honest answer and an unforecastable one. The bill tracks how much work the agents do rather than how many people you employ, so a team of four can outspend a team of forty, and nobody — the vendor included — can tell you what one of your tickets costs until you have run a few. Meter a representative sample before committing to a tier. Private and air-gapped deployments sit outside the table entirely: the same FAQ says enterprise and private deployments are scoped with sales because infrastructure, support and security requirements differ, so if a deployment constraint is why you are reading this, treat the published prices as context rather than as your quote. These figures come from the vendor's own pricing page and this is a market where they move — confirm them there before budgeting.",
        faq: [
            {
                q: "Is Cosine still the company behind Genie?",
                a: "It is the same company, but the positioning has moved. Cosine now presents itself as a sovereign AI lab training models and specialised coding agents for organisations working inside secure environments, with a model line called Lumen. If you came here looking for a general-purpose autonomous coding agent to point at a normal repository, that is no longer what the front door describes.",
            },
            {
                q: "Who is this actually for?",
                a: "Organisations whose environment disqualifies the mainstream tools before the comparison starts — air-gapped networks, classified or sovereignty-constrained deployments, security teams, and codebases written in languages that general-purpose models handle poorly. Anyone can buy the $19 Starter plan, and the pricing page still names solo developers on it, so nothing stops an individual trying it. But if none of those constraints describe you, you are evaluating a specialist against incumbents with far more maturity and a much larger support surface, and the entry price is close enough to theirs that it will not be what decides it.",
            },
            {
                q: "How do you use it — is there an editor extension?",
                a: "The surfaces the company lists are a CLI and its cloud, not an IDE plugin. That is consistent with the buyer: a team integrating a capability into an existing secure environment and its pipelines, rather than an individual developer installing something into VS Code over lunch.",
            },
            {
                q: "Should I trust the benchmark numbers on the site?",
                a: "Treat them as vendor-run, because they are. A benchmark designed and executed by the company whose product it scores is a statement of what the company believes it is good at, which is genuinely informative and is not independent evidence. For a specialist claim like competence in an unusual language, the only test that settles it is running the thing against your own code.",
            },
            {
                q: "Can I let a coding agent merge without review?",
                a: "No, and that is not a limitation of this particular vendor. No autonomous coding agent available today should merge unreviewed into a codebase anyone depends on. The specific risk is that a wrong change is internally consistent rather than obviously broken: an agent that misidentifies where a change belongs does not stop, it makes every subsequent edit consistent with the mistake, and the result is harder to catch in review than code that is simply broken.",
            },
            {
                q: "Should we buy this instead of Cursor or Copilot?",
                a: "Only if a rule prevents you from buying those. They solve the everyday problem — making a developer faster at work they are already doing — with far more maturity and a much larger support surface. Cosine is aimed at the case where that option is off the table. The cost of picking it anyway is not really the sticker price, which starts in the same range as a Cursor or Copilot seat; it is a smaller vendor, a thinner ecosystem, and a credit-metered bill that moves with how hard the agents work rather than with headcount.",
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
};
