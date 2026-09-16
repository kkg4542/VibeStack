/**
 * Long-form per-tool content rendered below the standard template sections
 * on /tool/[slug] pages. The DB Tool record only carries short fields
 * (description, features[], pros[], cons[]). For tools where we want
 * substantive editorial copy — for SEO, for users, or both — we store it
 * here and render it as additional content blocks on the detail page.
 *
 * Keyed by slug. Missing slugs simply render no extended section.
 */

export interface ToolExtendedContent {
    /** Sanitized HTML, rendered as an in-depth article block. */
    overviewHtml: string;
    /** Short paragraphs, one per use case. */
    useCases?: { title: string; body: string }[];
    /** Pricing detail beyond the simple Free/Freemium/Paid/Enterprise tier. */
    pricingDetail?: string;
    /** Common questions and answers, rendered as FAQ. */
    faq?: { q: string; a: string }[];
}

// Additional editorial batches. Split across files purely to keep each module a
// reviewable size; they are merged into one lookup at the bottom of this file.
import { TOOL_EXTENDED_CONTENT_B2 } from "./tool-extended-content-b2";
import { TOOL_EXTENDED_CONTENT_B3 } from "./tool-extended-content-b3";
import { TOOL_EXTENDED_CONTENT_B4 } from "./tool-extended-content-b4";

/**
 * Last hand-edit of the editorial content in this module and its batch files.
 * The Tool record's `updatedAt` lives in the database and does not move when we
 * revise copy here, so the sitemap uses this date to report a truthful lastmod
 * for tools that carry extended content.
 */
export const TOOL_EXTENDED_CONTENT_REVISED = "2026-08-16";

export const TOOL_EXTENDED_CONTENT: Record<string, ToolExtendedContent> = {
    lovable: {
        overviewHtml: `
            <p><strong>Lovable</strong> answers a question most AI coding tools quietly dodge: what happens when the person building the app has never opened a terminal? You describe an application in plain language, and Lovable produces a working full-stack project — interface, database, authentication, deployment — without you touching an editor. Almost every other tool in this category assumes a developer is driving. Lovable assumes a founder is.</p>

            <p>That assumption shapes everything about the product, including its limits. The most useful way to evaluate Lovable is not "how good is the generated code" but "how far can a non-developer get before the project needs someone who reads stack traces" — and, just as importantly, "what happens at that moment."</p>

            <h3>What the first prompt actually produces</h3>

            <p>A single prompt gets you a deployed application with a live URL, usually within a couple of minutes. Under the hood that is a conventional React and Vite frontend, Tailwind for styling, and Supabase for Postgres, authentication, and file storage. Nothing exotic; nothing bespoke to Lovable. From there you iterate by chatting ("make the header sticky", "add a plan selector to the pricing page"), by clicking directly into elements, or by editing the source in a built-in editor if you happen to know how.</p>

            <p>The choice of ordinary, boring technology is the point. Lovable is not generating a proprietary app format that only Lovable can run. It is generating the kind of project a contract developer could open on a Monday morning without asking what any of it is.</p>

            <h3>The complexity ceiling, and how you hit it</h3>

            <p>Every AI app builder has a point where accumulated edits start to conflict with each other, and Lovable is no exception. The symptom is recognizable: a change you request in one place quietly breaks behavior somewhere else, you ask the AI to fix it, and the fix breaks a third thing. For a developer this is a normal Tuesday — you read the diff and undo the bad part. For a non-developer it is a dead end, because the recovery move requires exactly the skill the tool promised you would not need.</p>

            <p>Roughly speaking, this arrives when a project grows past a handful of distinct screens or starts carrying business logic that spans several of them — permissions that differ by role, billing state that affects what a user can see, multi-step workflows with partial saves. Simple, wide apps (many similar pages, little cross-cutting logic) hold up far better than small, deep ones.</p>

            <h3>Ejecting to GitHub is the real feature</h3>

            <p>The eject path is what makes the ceiling survivable. A Lovable project can be connected to your own GitHub repository, cloned, and continued in any editor, with no ongoing dependency on Lovable itself. That is a genuinely different posture from closed no-code platforms, where hitting the ceiling means rebuilding from zero.</p>

            <p>It is worth being clear-eyed about what ejecting costs, though. Once a developer starts committing changes outside Lovable, the chat-driven workflow stops being the source of truth, and you have effectively converted a no-code project into a normal software project with normal software costs. The correct way to think about the eject hatch is as an insurance policy, not a second phase of the same experience. If you are handing off, a tool like <a href="/tool/cursor">Cursor</a> is where the project usually continues.</p>

            <h3>When not to use Lovable</h3>

            <p>Lovable is the wrong choice more often than its marketing implies. Skip it if the application's value lives in logic rather than screens — pricing engines, scheduling optimizers, anything where the hard part is a rule set rather than a UI. Skip it if you are bound by a stack you do not control: if your company runs on .NET and a specific managed database, a generated React and Supabase project is a migration project, not a head start. Skip it if the data is regulated enough that you need to answer detailed questions about where it lives and who can reach it before the first user signs up.</p>

            <p>And skip it if you are an experienced developer looking for daily leverage. Lovable is excellent at the first ninety minutes of a project and unremarkable at month three, which is the inverse of what a working engineer needs. Developers evaluating this whole category should read our breakdown of <a href="/blog/ai-app-builders-bolt-v0-lovable">Bolt, v0, and Lovable</a> before picking one, because the three tools are aimed at visibly different people: <a href="/tool/v0-by-vercel">v0</a> at developers who want polished UI, <a href="/tool/bolt-new">Bolt.new</a> at developers who want a fast end-to-end scaffold, and Lovable at the person who is not going to write the code at all.</p>
        `,
        useCases: [
            {
                title: "Founder MVPs before there is a team",
                body: "A solo founder builds the first usable version of a product without hiring or learning React. Auth, database, and deployment come with the generated stack, so the founder's attention goes to the one screen that makes the product different rather than the ten that every product has.",
            },
            {
                title: "Internal tools that never clear the backlog",
                body: "Operations, support, and marketing teams build the small dashboards and forms that engineering will never prioritize. Because the backend is Supabase, wiring the tool to data the company already has is usually a configuration problem rather than an integration project.",
            },
            {
                title: "Designers shipping something clickable and real",
                body: "A designer turns a concept into a deployed app with real interactivity, real persistence, and a URL to send someone. Users behave differently with a working product than with a prototype that only moves where the prototype was told to move, and that difference is what the exercise is for.",
            },
            {
                title: "Investor and customer demos",
                body: "Showing a working product rather than slides changes the conversation, and the fact that the project can be ejected to GitHub means the demo survives technical diligence instead of collapsing under it.",
            },
            {
                title: "An executable spec for the developer you are about to hire",
                body: "Some teams use Lovable deliberately as a throwaway: build the thing badly, learn what it actually needs to do, then hand the repository to a developer as a precise description of the intended product. A working artifact removes far more ambiguity from a handoff than a requirements document does.",
            },
        ],
        pricingDetail:
            "Lovable's free tier allows a generous number of daily messages and unlimited projects, which is enough to evaluate the product and build a small MVP. Paid plans (currently Starter, Pro, and Teams) unlock higher message volume, private projects, custom domains, and team collaboration. Pricing is monthly with annual discounts; specific dollar amounts shift frequently, so check the official site before quoting numbers to a team.",
        faq: [
            {
                q: "Do I own the code Lovable generates?",
                a: "Yes. Projects can be exported, pushed to your own GitHub, and run independently of Lovable. This is one of the more important differentiators from closed no-code tools, and it is the reason a Lovable project can survive a decision to stop using Lovable.",
            },
            {
                q: "What stack does Lovable use under the hood?",
                a: "React with Vite for the frontend, Tailwind for styling, and Supabase (Postgres, Auth, and Storage) for the backend, with an integrated deploy pipeline that produces a live preview URL automatically. It is a conventional stack on purpose — a developer can pick it up without learning anything Lovable-specific.",
            },
            {
                q: "What is the biggest limitation?",
                a: "Complexity, not quality. Once a project grows past a handful of screens or accumulates logic that spans several of them, the AI's edits start conflicting with earlier work, and undoing a bad change requires reading the code. That is the moment the tool stops being a no-code tool.",
            },
            {
                q: "Is Lovable better than v0 or Bolt.new?",
                a: "They are aimed at different people, so the comparison resolves by asking who is building. v0 is strongest when a developer wants polished UI components for a project they will assemble themselves. Bolt.new suits developers who want a fast full-stack scaffold to take over. Lovable is the one designed for someone who does not intend to write code at all.",
            },
            {
                q: "Can a developer pick up a Lovable project mid-flight?",
                a: "Yes — connect the project to GitHub and a developer can clone it and continue in any editor. The generated code is conventional and readable, which is less common among AI-generated codebases than you would hope. Expect the developer to spend the first day tidying rather than shipping.",
            },
            {
                q: "What happens to my app if I stop paying for Lovable?",
                a: "The important question is whether you exported first. A project connected to your own GitHub repository and running on infrastructure you control keeps working regardless of your Lovable subscription. A project that only ever lived inside Lovable's hosting does not have that guarantee, so if the app matters, push it to a repository you own early rather than at the moment you need to leave.",
            },
        ],
    },

    chatgpt: {
        overviewHtml: `
            <p><strong>ChatGPT</strong> is the page nobody needs to read to know what the product is, which is exactly why a description of it is worthless. The interesting thing about ChatGPT in its current form is that it is no longer really an assistant. It is a platform with an assistant on the front, and almost every serious question about it — is the subscription worth it, should we buy it for the company, do we need Claude as well — is a question about the platform rather than about how well it answers a prompt.</p>

            <h3>It is a platform now, and that changes the evaluation</h3>

            <p>The chat box is the least differentiated part of the product. Every frontier assistant has one, they are all fluent, and the ranking between them changes often enough that choosing on conversational quality is choosing on noise. What surrounds the chat box is harder to replicate: file handling, a code-execution environment for data work, image generation, voice, connectors into other applications, custom assistants you can configure and share, and a mobile and desktop client that most competitors have not matched for polish.</p>

            <p>That surface area is the actual product, and it is why the honest comparison against a rival is rarely "which one writes better." It is "which one already has the thing I need attached to it." For a large number of people the answer is ChatGPT by default, not because it is the strongest model on any given week but because the capability they wanted was already in the same window.</p>

            <h3>Files, data, and the feature people underuse</h3>

            <p>The single most underused thing in the paid product is uploading a document or a spreadsheet and asking questions of it. Analysis runs in a sandboxed environment where the model writes and executes code against your file, which means you can get charts, cleaned tables, and calculations from someone who has never opened a data notebook. For the many jobs where the data work is not hard but is annoying — reconciling two exports, finding the rows that do not match, summarising a quarter of survey responses — this closes a real gap.</p>

            <p>It also fails in ways worth knowing before you rely on it. It is confident about what a column means, it will quietly drop rows it could not parse, and it does not know the business rules that make a number correct. Treat the output the way you would treat work from a fast, bright contractor who has never seen your data: worth having, worth checking. The same applies to long documents, where summarising is reliable and finding the one clause that matters is not.</p>

            <h3>Custom GPTs, and the honest ceiling on them</h3>

            <p>A custom GPT is a saved configuration: instructions, some uploaded reference material, optionally a connection to an external service, wrapped in a shareable link. What you are buying is not intelligence but the elimination of setup — the analyst who re-explains the reporting format every Monday builds it once, and the rest of the team stops re-explaining it too.</p>

            <p>The ceiling arrives quickly. A custom GPT is a prompt with attachments, not an application. It has no state between conversations, no reliable enforcement of the rules you wrote, and no way to guarantee that a user who asks sideways gets the behaviour you intended. Teams that expect an internal product from one tend to be disappointed; teams that expect a well-made shortcut are usually happy. If you find yourself wanting version control, tests, and audit logs around one, you have outgrown the format and want the API.</p>

            <h3>The subscription and the API are separate purchases</h3>

            <p>This trips up more people than it should. Paying for ChatGPT does not give you API access, and paying for the API does not give you the app. They are billed separately, metered differently, and aimed at different users: the subscription is a flat-rate consumer product with usage limits, the API is metered by tokens and has no interface at all.</p>

            <p>The practical implication for anyone building something is that the app is where you work out whether an idea is viable and the API is where you ship it. Getting a prompt to behave in the chat window costs you a subscription you already have; running it ten thousand times a day is a line in an infrastructure budget. Our piece on <a href="/blog/token-economics-2026">token economics</a> covers why that second number behaves so differently from the first, and <a href="/blog/future-prompting">how prompting is changing</a> covers the first.</p>

            <h3>Buying it for a team is a different question</h3>

            <p>An individual asks whether the monthly fee improves their day. An organisation asks a completely different set of questions, and the answers are what actually decide the purchase: can we administer seats centrally, does it connect to our identity provider, can we control which connectors are enabled, is workspace data excluded from model training by default, what is retained and for how long, and can we produce an answer for an auditor about all of it.</p>

            <p>The business and enterprise tiers exist to answer those, and the gap between them and an individual subscription is administrative rather than conversational — the model is not smarter, the controls are. The specifics of what each tier includes have been revised repeatedly, so confirm the current terms in OpenAI's own documentation rather than trusting any summary, including this one. What is stable enough to plan around is the shape: individual plans are consumer products with consumer data handling, and the business tiers are where the controls a security review asks about actually live.</p>

            <p>The unglamorous part matters too. Shadow usage is the normal state of affairs in companies that have not bought anything — people paste work into a personal account because nobody gave them a sanctioned option. Buying a workspace is frequently less about enabling AI than about moving usage that already happens onto infrastructure you can see.</p>

            <h3>When ChatGPT is the wrong default</h3>

            <p>It is the wrong default when you need to verify rather than read. A general assistant produces fluent claims with no reliable provenance, and the browsing it does when prompted is not the same as a tool built around citation. If the output is going to be defended to someone, start with <a href="/tool/perplexity">Perplexity</a> instead — <a href="/compare/chatgpt-vs-perplexity">ChatGPT vs Perplexity</a> separates the two cases.</p>

            <p>It is the wrong default when the work is one very long document or one very large piece of code and the failure mode you fear is losing the thread halfway through. Plenty of people who use ChatGPT for everything else keep <a href="/tool/claude">Claude</a> open for exactly that; <a href="/compare/chatgpt-vs-claude">ChatGPT vs Claude</a> and our <a href="/blog/chatgpt-vs-claude">longer write-up</a> both land on the same split.</p>

            <p>It is the wrong default inside a codebase. It will write good code for a problem you describe, and it has no idea what is in your repository. An editor-integrated tool like <a href="/tool/cursor">Cursor</a> is not competing on model quality there; it is competing on knowing what the other four hundred files say.</p>

            <p>And it is the wrong default if you only ever needed one narrow thing. A person who wanted transcription, or image generation, or grammar checking, and bought a general assistant to get it, has usually bought a worse version of a dedicated tool at a similar price. Breadth is only an advantage if you use the breadth.</p>
        `,
        useCases: [
            {
                title: "The place questions get asked by default",
                body: "Drafting, explaining, rewriting, summarising, working out what you actually think. This is the majority of usage and it is not exciting, but the fact that no tool switch is required is most of the reason it wins over marginally better single-purpose products.",
            },
            {
                title: "Interrogating a document you were not going to read",
                body: "A contract, a policy, a long report, a set of meeting notes. Summarising is dependable; locating the one clause that changes your decision is less so, which makes this an accelerant for reading rather than a substitute for it.",
            },
            {
                title: "Spreadsheet work by someone who is not an analyst",
                body: "Upload the file and the model writes and runs code against it, returning cleaned tables and charts. The value is concentrated in the tedious middle of data work, and the risk is that it does not know which of your columns is authoritative.",
            },
            {
                title: "Packaging a repeated task as a custom GPT",
                body: "Any request you re-explain weekly is a configuration you could have saved once and shared. The gain is removing setup, not adding capability, and it holds up well until somebody expects it to behave like an application.",
            },
            {
                title: "First drafts of things nobody enjoys writing",
                body: "Job descriptions, release notes, status updates, the third version of an announcement. Output quality matters less here than escape velocity from a blank page, which is the one thing a general assistant is unambiguously good at.",
            },
            {
                title: "Proving out a prompt before it becomes an API call",
                body: "Developers use the app to find the phrasing that works, then move the stable version into code where it can be versioned and tested. Using the chat window as a workbench is cheaper than iterating against a metered endpoint.",
            },
        ],
        pricingDetail:
            "ChatGPT has six tiers in 2026: Free ($0, with ads and tight limits in the US), Go ($8/mo, more volume but still ad-supported and missing advanced features), Plus ($20/mo, the sweet spot with full models and features), Pro ($200/mo, for power users wanting the largest context and highest Deep Research limits), Business ($25/user/mo), and Enterprise (custom). The pricing trap to watch: the free and Go tiers are noticeably degraded by ads and rate limits compared to a year ago, and the jump from $20 Plus to $200 Pro is steep with little in between — heavy users can outgrow Plus without Pro being worth 10x the cost.",
        faq: [
            {
                q: "Is the paid subscription worth it over the free tier?",
                a: "For occasional questions, no. For anything where you would be annoyed to hit a limit mid-task, yes, and the reason is usually access to the fuller feature set rather than a better conversation — file analysis, image generation, and the higher-capability models are where the paid tiers separate themselves. The specific limits and what sits behind each tier change frequently, so check the current plan comparison rather than an article.",
            },
            {
                q: "Does OpenAI train on what I type?",
                a: "It depends on which product you are using, and this is worth getting right rather than guessing. Consumer plans and business or enterprise workspaces are handled differently, and the consumer settings include controls over whether your conversations can be used to improve models. Because these terms are revised periodically, read OpenAI's current documentation before making a policy decision for a team, and do not rely on a third-party description of it.",
            },
            {
                q: "Does my subscription include API access?",
                a: "No. The subscription and the API are separate products with separate billing. The subscription gives you the applications and their usage limits; the API is metered by token usage and gives you no interface. If you are building something, expect to pay for both — one to develop against and one to run on.",
            },
            {
                q: "ChatGPT or Claude?",
                a: "Decide on the shape of your work rather than on which is smarter, because that ranking is unstable and the differences that matter are not. ChatGPT if you want the widest set of capabilities behind one interface and the best clients to reach them through. Claude if your work is long documents, long code, or prose you will publish with your name on it. Many people who are honest about their usage end up paying for both, and treat that as a reasonable cost rather than an indecisive one.",
            },
            {
                q: "How much should I trust what it tells me?",
                a: "Trust it on shape and distrust it on specifics. It is reliable at structure, explanation, rephrasing, and telling you what kind of thing you are looking at. It is unreliable on figures, citations, dates, names, and anything it would have to have looked up. The failure mode is not vagueness but confident precision, which is the hardest kind of error to catch by reading.",
            },
        ],
    },

    claude: {
        overviewHtml: `
            <p><strong>Claude</strong>, made by Anthropic, is the assistant people choose for a narrower set of reasons than they choose <a href="/tool/chatgpt">ChatGPT</a> for, and those reasons hold up better over time than any benchmark does. It is the tool that gets picked when the input is long, when the output has to read well, or when a developer wants to build something on top of a model rather than talk to one. Very little of that is about which model scored what this quarter.</p>

            <h3>Long context is a working style, not a spec line</h3>

            <p>Every assistant advertises a context window, and the number is close to meaningless on its own. What matters is whether the model still behaves sensibly when the window is actually full — whether it remembers a constraint you set at the top after forty exchanges, whether it notices that page nine contradicts page two, whether it stays on the register you asked for instead of drifting back to a default voice.</p>

            <p>That is where Claude earned its reputation, and it shows up as a different way of working rather than as a feature you switch on. Instead of chunking a document and summarising the summaries, you put the whole thing in and ask questions of it. Instead of describing your code, you paste the files. The practical test is simple and you should run it on your own material: take the longest, messiest input you genuinely deal with, and see whether the answer degrades at the end the way you expect it to. Published limits vary by model and plan and are revised often, so check the current documentation rather than planning around a figure.</p>

            <h3>Why writers keep choosing it</h3>

            <p>The claim that Claude writes better is the kind of subjective thing this site normally avoids, but it is worth stating precisely because the precise version is defensible. Editors who use it report less of a specific tax: fewer throat-clearing openers, less padding toward a word count, fewer of the tics that make a paragraph legible as machine output. The drafts need less removal.</p>

            <p>It is also unusually good at holding a voice across a long piece and at following editorial instructions that are about restraint — do not add a conclusion, do not use lists, keep the original sentence structure. Models tend to over-serve when asked to under-serve, and this one does it less.</p>

            <p>None of which makes it a writer. It makes it a faster path to a draft that a writer has to fix less, which is a smaller claim and a more useful one. If your bottleneck is having something to say rather than typing it, no assistant changes your week.</p>

            <h3>The developer story the consumer page undersells</h3>

            <p>A large share of Claude's real usage never touches the chat interface. Anthropic's API is a primary product rather than an afterthought, and the surrounding tooling — a command-line coding agent, a protocol for connecting models to external tools and data sources, SDKs for building agents — has made it a common default for teams building AI features rather than consuming them.</p>

            <p>That matters even if you are evaluating the consumer subscription, because it determines where the product's attention goes. Features tend to arrive shaped for people building things: longer context, better tool use, more reliable instruction-following on structured output. If what you want is voice, image generation, and a consumer ecosystem, you are not the user this roadmap is for, and you will feel it.</p>

            <p>For sustained work inside a real repository the coding agent is the part worth evaluating, and it is a different experience from pasting code into a chat window. It reads files, runs commands, and works across a project. Whether that beats an editor-integrated tool like <a href="/tool/cursor">Cursor</a> depends mostly on whether you would rather stay in your editor or work from a terminal.</p>

            <h3>Most teams that pick Claude keep ChatGPT too</h3>

            <p>This is the part comparison articles are reluctant to say, and it is the most accurate observation available: among people who use AI seriously, running both is common and is not a failure of decision-making. The tools have genuinely different centres of gravity, the marginal subscription is cheap relative to a salaried hour, and the switching cost is a browser tab.</p>

            <p>The split people describe is consistent. Claude for the long document, the code, the thing being published. ChatGPT for the quick question, the image, the voice conversation, the task that touches something else in its ecosystem. If you are trying to standardise a team on exactly one, be clear that you are optimising for procurement simplicity and not for output, because the people doing the work will route around you. <a href="/compare/chatgpt-vs-claude">ChatGPT vs Claude</a> works through where each lands, and our <a href="/blog/gpt5-vs-claude5">head-to-head on the frontier models</a> covers the capability question that this argument usually hides behind.</p>

            <h3>When Claude is the wrong choice</h3>

            <p>Do not choose it if you want one application that does everything. The feature surface is deliberately narrower — image generation and voice are not where the investment goes — and choosing Claude as your only assistant means accepting that some tasks will send you elsewhere.</p>

            <p>Do not choose it expecting the expensive plans to be a smarter model. The higher consumer tiers buy usage capacity, not capability, and buyers misread this constantly. If you are not hitting limits, the upgrade changes nothing about the answers you get.</p>

            <p>Do not choose it for research that has to be sourced. Like any general assistant, it produces fluent claims whose provenance you cannot check from the output, and a citation-first tool such as <a href="/tool/perplexity">Perplexity</a> is a different category of instrument — see <a href="/compare/claude-vs-perplexity">Claude vs Perplexity</a>.</p>

            <p>And do not choose it on the assumption that careful phrasing means careful facts. The prose being measured and the content being correct are unrelated properties, and a well-hedged wrong answer is harder to catch than a badly written one.</p>
        `,
        useCases: [
            {
                title: "Reading the long thing end to end",
                body: "A contract, a policy set, a research corpus, a codebase you inherited. The distinguishing behaviour is not that it can accept the input but that it is still coherent about the beginning once it has reached the end, which is what makes cross-referencing questions worth asking.",
            },
            {
                title: "Editing that does not flatten a voice",
                body: "Tightening, restructuring, and cutting while keeping the author's register intact. It follows restraint instructions better than most, which matters because the usual complaint about AI editing is that it makes everything sound the same.",
            },
            {
                title: "Sustained work in a real repository",
                body: "Through the command-line coding agent, multi-file changes with the project actually in view rather than described. This is a different activity from asking a chat window for a function, and it is the form most developers who stay with Claude settle into.",
            },
            {
                title: "Building a product on the API",
                body: "Teams shipping AI features often pick Anthropic because instruction-following and structured output are dependable enough to build on. The relevant question there is not which model is smartest but which one behaves the same way tomorrow.",
            },
        ],
        pricingDetail:
            "Claude offers Free ($0), Pro ($20/mo), Max 5x ($100/mo), Max 20x ($200/mo), Team (from $25/seat/mo), and Enterprise (custom). The critical thing to understand: the Max tiers are usage multipliers, not model upgrades — Max 5x and 20x give you the same models as Pro but with 5x and 20x the per-session capacity. Buy Max only if you are hitting Pro's session limits, not because you expect a smarter model. On the API side, the Opus 4.6 launch cut input/output costs by 67% (from $15/$75 to $5/$25 per million tokens), and the June 2026 launch of Sonnet 5 added a cheaper mid-tier option at an introductory $2/$10 per million tokens (rising to $3/$15 from September 2026). Claude Fable 5 now sits above Opus as Anthropic's flagship model, with Opus 4.8 and Haiku 4.5 continuing as prior-generation options.",
        faq: [
            {
                q: "What is the difference between the Pro and Max plans?",
                a: "Capacity, not capability. The higher consumer tiers run the same models and give you more usage before you hit a limit. This is the single most misread thing about Claude's pricing: people buy up expecting better answers and get the same answers, more often. Upgrade if you are actually hitting session limits; otherwise it changes nothing.",
            },
            {
                q: "Is Claude better than ChatGPT?",
                a: "At different things, and the honest answer annoys people who want one. Claude for long inputs, code you will maintain, and prose you will publish. ChatGPT for breadth, multimodal work, and having the widest set of capabilities in one place. Neither holds a durable lead on raw reasoning for long enough to build a purchasing decision on it.",
            },
            {
                q: "What does the free plan actually give you?",
                a: "Enough to judge whether the writing and reasoning suit you, which is the only question a free tier needs to answer. It runs on a capable default model with meaningful usage limits, and the developer-oriented tooling and the highest-capability models sit behind the paid tiers. Because what each tier includes is revised regularly, check the current plan page before assuming any specific feature is or is not included.",
            },
            {
                q: "How much can I actually put into one conversation?",
                a: "Enough for a full contract, a long report, or a substantial chunk of a codebase, which is the practically useful way to describe it. Exact token limits differ by model and plan and have moved several times, so treat any number you see quoted as provisional and confirm it in Anthropic's documentation. The more useful test is empirical: give it your longest real input and see whether the quality holds at the end.",
            },
            {
                q: "Is it a good choice for coding?",
                a: "It is one of the two or three answers most developers would accept, with a caveat about form. If you want AI inside your editor, an editor-first tool is the better shape. If you are comfortable working from a terminal and want an agent that reads files and runs commands across a project, the Claude coding tooling is well regarded for exactly that. Both approaches beat pasting snippets into a chat window.",
            },
            {
                q: "Can we use it with company data?",
                a: "That is a question about which plan and which terms, not about the model. The team and enterprise tiers are where the administrative controls, retention settings, and compliance documentation live, and the handling differs from consumer plans. Read Anthropic's current terms and security documentation before a rollout rather than relying on a summary, because this is precisely the area that gets revised.",
            },
            {
                q: "What does Claude do badly?",
                a: "It is over-cautious in ways that occasionally get in the way of legitimate work, particularly around anything that pattern-matches to a sensitive topic. It has a smaller consumer ecosystem than its main competitor, so integrations you expect may not exist. And its fluency is not evidence of accuracy — a measured, well-structured, entirely wrong answer is a real output, and the polish makes it harder to spot.",
            },
        ],
    },

    cursor: {
        overviewHtml: `
            <p><strong>Cursor</strong> is a fork of VS Code with AI built into the editor rather than attached to it. That single architectural decision explains most of what is interesting about the product — why it spread as fast as it did, why it is so easy to trial, and why it can get expensive. The useful question is not what Cursor is. It is whether the way Cursor wants you to work matches the way your codebase actually changes.</p>

            <h3>The fork is the strategy, not a footnote</h3>

            <p>Because Cursor is VS Code underneath, adopting it costs close to nothing. Extensions install through the same marketplace flow, keybindings and settings import in a single step, the theme comes across, and the file tree, terminal, and debugger behave the way your hands already expect. There is no week of relearning muscle memory, which is the usual reason developers refuse to even evaluate a new editor.</p>

            <p>The underrated consequence is reversibility. Trialling Cursor is not a commitment, because the project you opened is still an ordinary VS Code project and you can go back mid-afternoon having lost nothing. For a team lead deciding whether to run a pilot, that asymmetry matters more than any feature table: the downside of trying is near zero, so the only real question is whether the upside shows up.</p>

            <p>The flip side is that none of this applies if VS Code is not where you live. A JetBrains or Neovim developer evaluating Cursor is being asked to change editors, not to add AI, and that is a much harder trade. Our look at <a href="/blog/cursor-vs-vscode">why developers leave VS Code for Cursor</a> covers what that transition feels like from the inside.</p>

            <h3>Context management is the actual skill</h3>

            <p>Most disappointing sessions with Cursor are context problems rather than model problems. The agent answers well when it is looking at the right code and badly when it is guessing, and which of those happens is largely under your control.</p>

            <p>Cursor indexes the repository so it can retrieve relevant code semantically instead of relying on whatever you happen to have open, and you can steer that by referencing specific files, folders, symbols, and documentation directly in a prompt. Paths can be excluded from indexing with a <code>.cursorignore</code> file, which is worth doing for generated code, vendored dependencies, and large fixture sets that otherwise dilute retrieval. You can also commit rules files to the repository so every developer's agent inherits the same conventions — naming, banned libraries, what a test is supposed to look like — rather than each person re-explaining house style in every conversation.</p>

            <p>Teams that get consistently good output treat those rules as a maintained artefact and review them like any other configuration. Teams that get mediocre output type one sentence into the chat box and blame the model.</p>

            <h3>What usage-based pricing does to your working rhythm</h3>

            <p>Cursor bills against a pool of usage credits rather than a flat allowance of requests, and the practical effect is behavioural more than financial. Frontier models drain the pool quickly; cheaper ones stretch it. Once you notice that, you start rationing — saving the expensive model for the hard problem, running exploratory questions on something lighter, hesitating before firing off a large agent run late in a billing period.</p>

            <p>Whether that is good or bad depends on the person. Some developers find the pressure clarifying, because it discourages the habit of throwing an agent at code you have not read. Others find it corrosive: an editor that makes you price a thought before having it is a worse editor, whatever the arithmetic says. Either way, budget by how your team actually works rather than by the sticker price, because two developers on the same plan can have completely different months. Our piece on <a href="/blog/token-economics-2026">token economics</a> explains why nearly every tool in this category has drifted toward metering.</p>

            <p>Tier names and credit amounts change often enough that any figure quoted anywhere — including here — ages badly. Confirm the current structure on Cursor's own pricing page before committing a team budget.</p>

            <h3>Privacy mode, indexing, and what a team has to sign off on</h3>

            <p>This is where rollouts usually stall, and it is much cheaper to resolve before the pilot than after. Cursor offers a privacy mode intended to ensure your code is not retained or used to train models, and on business plans it can be enforced across the organisation rather than left to each developer's settings. That enforcement is the part a security reviewer cares about, because a per-user toggle is not a control.</p>

            <p>Be clear about what the mode does and does not promise. It is a retention and training guarantee, not local execution: prompts and the surrounding code still travel to a model provider in order to be answered, and building the index involves sending code out to be embedded. If your requirement is that source must never leave your network under any circumstances, this is the wrong shape of product entirely and you should be evaluating self-hosted assistants such as <a href="/tool/tabnine">Tabnine</a>. If your requirement is the far more common one — no training on our code, no retention, a report compliance can file — read Cursor's current security documentation and check it against your own policy rather than trusting anyone's summary of it.</p>

            <h3>Cursor against the alternatives, honestly</h3>

            <p>Against <a href="/tool/github-copilot">GitHub Copilot</a> the trade is editor depth versus institutional fit: Cursor's agent does more inside the editor, while Copilot sits closer to pull requests, organisation policy, and a purchasing path most companies have already walked — <a href="/compare/cursor-vs-github-copilot">Cursor vs GitHub Copilot</a> works through it. Against <a href="/tool/windsurf-ide">Windsurf</a> the products are genuinely close, and the decision usually turns on how the quota feels and which agent's habits you prefer; see <a href="/compare/cursor-vs-windsurf-ide">Cursor vs Windsurf</a>. Against generation-first tools like <a href="/tool/v0-by-vercel">v0</a> and <a href="/tool/bolt-new">Bolt.new</a> there is barely a comparison to make, because those start projects and Cursor maintains them. Plenty of developers use one of each.</p>

            <h3>Who should not switch to Cursor</h3>

            <p>Do not switch if your editor is not VS Code and you are happy in it. The migration cost that makes Cursor almost free for VS Code users makes it expensive for everyone else, and Copilot reaches your existing IDE through a plugin without asking you to leave.</p>

            <p>Do not switch if you need a fixed, predictable monthly cost per developer. Usage-based billing across a team of unknown appetite is a forecasting problem, and finance tends to dislike it more than engineering does.</p>

            <p>Do not switch if your review culture cannot absorb larger diffs. An agent that edits ten files at once only makes a team faster if somebody can genuinely read ten files of changes. Otherwise you have converted writing time into review debt, and the gain quietly disappears downstream.</p>

            <p>And do not switch expecting an agent to work unsupervised on a codebase nobody on the team understands. Cursor is at its best in the hands of someone who could have made the change themselves and is choosing not to spend the afternoon doing it.</p>
        `,
        useCases: [
            {
                title: "Refactors that touch more files than you want to open",
                body: "Renaming a concept across a repository, migrating off a deprecated API, pulling a tangled module apart. This is the work where a codebase-aware agent most clearly beats autocomplete, and also the work where the review matters most — the agent is confident in the places it is wrong.",
            },
            {
                title: "Getting oriented in a repository you did not write",
                body: "Asking where authentication is handled, what calls a function, or why a config value exists, and getting answers grounded in the actual code rather than in general knowledge about how such things are usually done. For a new joiner this replaces the first week of reading with a conversation.",
            },
            {
                title: "The unglamorous middle of a feature",
                body: "The route, the form, the validation, the test file that mirrors the one next to it. Cursor compresses the part of the job that is pattern-following rather than thinking, which shifts your attention to the part that is not.",
            },
            {
                title: "Languages you only visit occasionally",
                body: "A backend developer touching the deployment scripts, or a frontend developer fixing something in a service they do not own. The agent supplies the idiom you would otherwise spend an hour searching for, and the fact that you can still read the result is what keeps it safe.",
            },
        ],
        pricingDetail:
            "Cursor offers Hobby (free, limited completions and agent requests), Pro ($20/mo, or $16/mo annually, with a $20 monthly credit pool, frontier models, MCPs, and cloud agents), Pro+ ($60/mo, 3x usage credits), Ultra ($200/mo, 20x usage), Teams ($40/user/mo with SSO and admin controls), and Enterprise (custom). The pricing trap: since the mid-2025 shift to credit-based billing, your real cost depends on model choice and prompt complexity. Fast Claude Sonnet requests deplete credits quickly while economical models stretch further, so two developers on the same $20 Pro plan can have very different experiences depending on how they work.",
        faq: [
            {
                q: "Do I have to learn a new editor?",
                a: "No, as long as you already use VS Code. Cursor is a fork of it, so the interface, extensions, settings, and keybindings carry over and can be imported in one step. Most VS Code users are productive the same day. If you use JetBrains or Neovim, the honest answer is different — you would be changing editors, which is a real cost that no feature list offsets automatically.",
            },
            {
                q: "How does usage-based pricing change things day to day?",
                a: "Less than the pricing page suggests and more than you would like. Each plan includes a credit pool, and different models draw on it at very different rates, so the meaningful variable is which model you reach for and how often you let an agent run long. The practical consequence is that you start making small economic decisions inside your editor, which some developers find focusing and others find distracting.",
            },
            {
                q: "Can I keep Cursor away from parts of my codebase?",
                a: "Yes. A .cursorignore file excludes paths from indexing, which is worth configuring for secrets-adjacent directories, vendored code, generated output, and anything large enough to pollute retrieval. Treat it as a quality setting as much as a privacy one — a tighter index usually produces better answers, not just safer ones.",
            },
            {
                q: "Is Cursor safe to roll out across a team?",
                a: "That depends on what your policy actually requires. Cursor's privacy mode is designed so code is not retained or used for training, and on business plans it can be enforced organisation-wide rather than left to individual settings, which is the part security reviewers ask about. What it does not do is keep code on your machine — prompts and context still go to a model provider to be answered. If your rule is that source cannot leave the network at all, you need a self-hosted tool instead. Read Cursor's current security documentation rather than relying on a summary.",
            },
            {
                q: "Cursor or GitHub Copilot?",
                a: "Cursor if the centre of your work is the editor and you want an agent that makes multi-file changes with real codebase context. Copilot if the centre of your work is GitHub — pull requests, issues, organisation policy — or if predictable procurement matters more to whoever signs off than the last increment of editing power. Plenty of teams run both and do not find that wasteful.",
            },
            {
                q: "Does the free plan get you anywhere?",
                a: "It is enough to answer the only question that matters at the start: does this change how the work feels on your codebase, not on a demo repository. The limited completions and agent requests run out quickly under daily use, so treat the free tier as an evaluation rather than a plan.",
            },
            {
                q: "What does Cursor do badly?",
                a: "It is overconfident on tasks that require understanding something the code does not state — an undocumented business rule, a constraint that lives in someone's head, a workaround whose reason was never written down. It will produce a clean, plausible change that violates the rule without hesitating. It is also weak where it has no context to retrieve, which is exactly when a large agent run is most tempting and least advisable.",
            },
        ],
    },

    "github-copilot": {
        overviewHtml: `
            <p><strong>GitHub Copilot</strong> is usually described as the assistant with the widest reach, which is true and also slightly beside the point. Its durable advantage is not that the model is better — model leadership in this category changes hands every few months — but that Copilot arrives attached to the system your code, your reviews, your identity provider, and frequently your existing vendor contract already run through. That is a different kind of moat, and it explains why Copilot loses individual bake-offs and wins organisational ones.</p>

            <h3>Two evaluations, one product</h3>

            <p>An individual developer and a platform team are effectively assessing different products, and conflating the two is the most common mistake in this comparison.</p>

            <p>Evaluated by a developer alone, Copilot is a competent, broadly available assistant with inline completions, chat, and an agent mode that now reaches the JetBrains IDEs as well as VS Code — the latter mattering more than it sounds, because it brought agentic assistance to a large population of Java, Kotlin, and Python developers who were never going to switch editors. On raw editing power it is a reasonable tool that rarely wins a head-to-head against <a href="/tool/cursor">Cursor</a> or <a href="/tool/windsurf-ide">Windsurf</a>.</p>

            <p>Evaluated by an organisation, the question changes to: what will it take to put this in front of four hundred engineers, what can we turn off, what can we prove to an auditor, and how many quarters of procurement does it cost. On that scorecard Copilot is frequently the only candidate that clears the bar, and the editing gap stops being decisive.</p>

            <h3>The procurement path is the product</h3>

            <p>Copilot is administered where the rest of your GitHub estate is administered. Seats are assigned through the organisation, access follows your existing SSO and identity setup, and the policy controls are enterprise-shaped rather than user-shaped: administrators can enable or disable specific Copilot capabilities across an organisation, restrict which repositories or file paths the assistant is allowed to use as context, and require a filter that blocks suggestions matching publicly available code. Policy changes land in the audit log, which is the difference between a setting and a control you can evidence.</p>

            <p>Two other things come up constantly in legal review. GitHub states that prompts and suggestions from the business and enterprise plans are not retained and not used to train models — verify the current terms yourself, because this is exactly the sentence that gets revised. And Microsoft offers an intellectual property indemnity covering Copilot output for paid plans, subject to conditions including having the public-code filter enabled. For a risk-averse buyer, an indemnity from a vendor of that size is often worth more than a measurably better completion.</p>

            <p>Then there is the least glamorous advantage of all: if your company already buys GitHub, adding Copilot is a line item rather than a new vendor. Anyone who has taken a novel supplier through security review, data processing agreements, and finance knows how much that is worth in elapsed months.</p>

            <h3>What the GitHub surface area gives you</h3>

            <p>Because Copilot is native to the platform, it appears in places an editor extension structurally cannot reach. It can summarise a pull request, leave a first-pass review on a diff, and answer questions about a change in the same thread where the change is being discussed. Work can be handed to a coding agent that operates on an issue and comes back with a pull request, so the unit of delegation becomes a task in your tracker rather than a prompt in your sidebar.</p>

            <p>That last shift is the interesting one. An editor-based agent assumes a developer is present and steering. A platform-based agent assumes the work arrives as a ticket and the output arrives as something reviewable. Which of those fits better is a question about how your team is organised, not about model quality.</p>

            <h3>The cases where Copilot is the wrong purchase</h3>

            <p>Skip it if the hard part of your work is large, multi-file editing under close supervision. That is where the editor-first tools have iterated hardest and Copilot is a step behind; if your developers are the sort who will actually notice the difference, they will notice it every day.</p>

            <p>Skip it if your code does not live on GitHub. Strip away the platform integration and most of the argument for Copilot goes with it, leaving a mid-pack assistant chosen for reasons that no longer apply to you.</p>

            <p>Be careful, too, about treating the entry price as the budget. Copilot's cheapest paid tier is the most approachable way into serious AI assistance, but usage-based billing means heavy chat and agent users draw down a credit allowance that flat-rate habits will exhaust. Forecast by how your heaviest users work, not by seat count multiplied by sticker price.</p>

            <p>And do not buy it expecting to win an argument with skeptical senior engineers. Copilot is an excellent organisational default and a poor way to convince someone who has already formed an opinion from a better editor. If that constituency matters, budget for a second tool rather than a longer debate — <a href="/compare/cursor-vs-github-copilot">Cursor vs GitHub Copilot</a> and our <a href="/blog/cursor-vs-github-copilot">longer write-up on the same question</a> both land there.</p>
        `,
        useCases: [
            {
                title: "Completions as the boring baseline",
                body: "Inline suggestions and an editor chat that can see the files you have open. This is the part most developers use most of the time, and for many teams it alone justifies the seat without anyone ever touching agent mode.",
            },
            {
                title: "First-pass review on pull requests",
                body: "Copilot can summarise a diff and leave review comments before a human opens it. It does not replace a reviewer, but it catches the class of issue that makes reviewers feel their time was wasted, which is a real contribution to the morale of a code review culture.",
            },
            {
                title: "Delegating an issue rather than a prompt",
                body: "The coding agent takes a tracked issue and returns a pull request. The interesting consequence is organisational: the work item stays in the tracker where it can be prioritised, assigned, and audited, instead of living in a chat transcript on someone's laptop.",
            },
            {
                title: "JetBrains teams that were previously excluded",
                body: "Agent mode reaching the JetBrains IDEs opened agentic assistance to developers who were never going to abandon their editor to get it. For Java and Kotlin shops in particular, this removed the standing objection that serious AI tooling meant moving to VS Code.",
            },
            {
                title: "Standardising a large engineering organisation",
                body: "One assistant, one policy surface, one audit trail, one invoice. Platform teams do not choose Copilot because it is the most capable option; they choose it because it is the option they can turn on for everyone and still answer questions about six months later.",
            },
            {
                title: "Answering questions where the answer already lives",
                body: "Because Copilot sits inside GitHub, it can be asked about a repository, a diff, or a discussion from within GitHub itself. For someone trying to understand a change they did not make, that is often closer to the work than an editor would be.",
            },
        ],
        pricingDetail:
            "GitHub Copilot offers Free (limited features and models), Pro ($10/mo, unlimited completions plus an AI-credit allowance), Pro+ ($39/mo, higher allowance), Business ($19/user/mo), Enterprise ($39/user/mo), plus a Student plan with unlimited completions. The major 2026 change: as of June 1, all plans transitioned to usage-based billing. Every plan includes a monthly pool of GitHub AI Credits, and chat, agent mode, code review, the cloud agent, CLI, and Copilot Apps all consume those credits based on token usage. The trap to watch: what used to feel unlimited is now metered, so heavy agent and chat users can exhaust their credit allotment and need to buy more.",
        faq: [
            {
                q: "Is the free plan worth using?",
                a: "As an evaluation, yes. Copilot Free gives individuals limited access to features and models, and verified students get a considerably more generous plan. It is enough to learn whether inline assistance changes how you work, which is the question worth answering before anyone pays.",
            },
            {
                q: "What changed when Copilot moved to usage-based billing?",
                a: "Every plan now includes a monthly allowance of credits that chat, agent mode, code review, and the cloud agent draw against, with the option to buy more. Completions remain the part that feels unlimited on paid plans. The practical effect is that the heaviest agent users in a team, not the average user, determine what the tool actually costs you.",
            },
            {
                q: "Does GitHub train models on my code?",
                a: "GitHub's position is that prompts and suggestions on the business and enterprise plans are not retained and are not used for training, with different handling on individual plans. Because these terms are revised periodically, confirm the current policy in GitHub's own documentation before a rollout rather than relying on any third-party description, including this one.",
            },
            {
                q: "Can administrators restrict what Copilot sees?",
                a: "Yes, and this is one of the stronger arguments for the business tiers. Organisations can exclude specific repositories and file paths from being used as context, enable or disable individual Copilot features, and see policy changes reflected in the audit log. The exclusions are worth configuring deliberately — secrets-adjacent directories and vendored code are the usual first candidates.",
            },
            {
                q: "What about suggestions that match public code?",
                a: "Copilot can be configured to block suggestions that match publicly available code, and organisations can enforce that filter rather than leaving it to individuals. Microsoft's IP indemnity for paid plans is conditioned on protections like this being in place, so the setting is not only a legal preference but part of the assurance you are buying. Check the current terms with your account team.",
            },
            {
                q: "Does agent mode work in JetBrains IDEs?",
                a: "Yes. Agent mode is generally available in the JetBrains IDEs as well as VS Code, which mattered a great deal to Java, Kotlin, and Python teams that had been choosing between their editor and agentic assistance. If your organisation is JetBrains-standard, this is frequently the single fact that decides the purchase.",
            },
            {
                q: "Copilot or Cursor?",
                a: "Answer a different question first: who is deciding. An individual optimising their own day will usually prefer Cursor's editor-native agent. An organisation optimising for rollout, policy, audit, and procurement will usually land on Copilot, and will be right to. The two answers disagreeing is not a contradiction — they are different problems.",
            },
            {
                q: "Do teams end up running more than one assistant?",
                a: "Often, and it is a defensible outcome rather than a failure of decision-making. Copilot becomes the organisation-wide default that everyone gets, and a smaller group with heavier editing needs also carries a seat on an editor-first tool. The cost of the second tool is usually less than the cost of arguing about the first one for another quarter.",
            },
        ],
    },

    midjourney: {
        overviewHtml: `
            <p><strong>Midjourney</strong> is the image generator people reach for when the picture is the point. That is a smaller claim than "best image model" and a more durable one: the ranking of image models by any measurable property changes constantly, while the reasons a designer keeps a Midjourney subscription open have stayed remarkably stable. Those reasons are aesthetic consistency, style control, and the fact that its output usually looks like someone decided how it should look.</p>

            <h3>The house style is a feature, and you cannot fully escape it</h3>

            <p>Midjourney is opinionated in a way most generators are not. Ask for something plain and you tend to get something composed — considered lighting, a deliberate palette, a sense that the frame was chosen. For concept work, editorial imagery, and anything where mediocrity is the real risk, that bias does most of the work for you.</p>

            <p>It cuts the other way when you need neutrality. A flat product shot on white, a diagram, an image that must not editorialise — these fight the model's instincts, and you spend your prompt budget suppressing style rather than specifying content. If the majority of your output needs to be unremarkable, a less opinionated generator is less work.</p>

            <h3>Style control is the actual skill</h3>

            <p>The gap between people who get good results and people who do not is almost entirely about control, and prompt wording is the least of it. The levers that matter are the ones that make a result repeatable: style parameters that dial how much the model asserts its own taste, stylisation and variety settings, reference images that steer the look rather than the subject, and seeds that let you return to a result instead of hoping.</p>

            <p>Reference-based steering is the part worth learning properly. Showing the model an image and saying "like this" is far more precise than any adjective, and it is how people maintain a recognisable look across a body of work. There is also a personalisation mechanism that learns your preferences from your own ratings, which pushes defaults toward the kind of image you keep choosing. The exact parameter names and syntax change between versions, so learn the concepts here and confirm the current flags in Midjourney's own documentation.</p>

            <h3>Consistency across a set is the professional requirement</h3>

            <p>One good image is a demo. A series where the same character, product, or environment appears across a dozen frames is a job, and it is the thing generative tools were bad at for years. Midjourney's reference features are aimed squarely at this: locking a subject's appearance so it survives changes of pose, scene, and lighting.</p>

            <p>It works well enough to be useful and not well enough to be automatic. Expect to generate more than you keep, expect small drift in details that a viewer will notice across a sequence, and expect to do finishing work outside the tool. It has moved storyboards, series illustration, and campaign work from impossible to laborious, which is a genuine change, but nobody should promise a client frame-exact consistency on the strength of it.</p>

            <h3>Commercial use is the question most people skip</h3>

            <p>This is where an afternoon of fun becomes a business decision, and it deserves more care than it usually gets.</p>

            <p>Midjourney's terms of service grant paid subscribers ownership of the assets they create, subject to conditions in those terms — and the conditions are the part to read, not the headline. Historically they have included additional requirements for companies above a certain size, and rights have been tied to maintaining an active subscription in ways that are easy to misremember. Do not take this paragraph as legal advice or as current; open the terms yourself before a commercial deployment, and involve someone who reads contracts if the deployment is significant.</p>

            <p>Two related things catch people out. First, generations are public by default on the standard tiers — your prompts and images are visible in the community feed — with private generation available only on the higher plans. If you are exploring an unannounced product or a client's brand, that is a confidentiality problem before it is a preference. Second, ownership of the output is not the same as clearance of what is in it. An image that reproduces a recognisable trademark, a public figure, or a distinctive artist's style carries risks that no generator's terms resolve for you.</p>

            <h3>Where the precision breaks down</h3>

            <p>Text inside images remains the most reliable disappointment. It has improved to the point where short words sometimes land, and it is nowhere near the point where you can put a headline, a logo, or a label in an image and ship it. Anything with type belongs in a design tool, with the generated image as a layer underneath.</p>

            <p>Precise editing is the other wall. Midjourney can vary regions and extend a canvas, and it is not a retoucher — you cannot reliably ask for this hand to have the right number of fingers, this label moved two centimetres left, this exact shade. Generation is a proposal, not a spec, and the last ten percent of a professional image happens in <a href="/tool/canva">Canva</a> or Photoshop regardless.</p>

            <h3>There is no free door</h3>

            <p>Midjourney is subscription-only, which is an unusual position now that most competitors offer some free allowance. Practically, it means you cannot evaluate it the way you evaluate everything else: you commit a month, and the first month is partly spent learning the controls rather than judging the ceiling.</p>

            <p>The tier structure is built around generation speed and privacy rather than image quality, so the model you get is the same at every level. That makes the choice a throughput question, and throughput is genuinely hard to estimate before you have worked the way the tool wants you to. Budget for a month of tuition.</p>

            <h3>When to use something else</h3>

            <p>Use something else when you need images casually and occasionally. Generation bundled into <a href="/tool/chatgpt">ChatGPT</a> is less controllable and vastly more convenient, and for a blog header nobody will study, convenience wins outright.</p>

            <p>Use something else when licensing and indemnity are the requirement rather than the look. Tools built for enterprise creative work, such as <a href="/tool/adobe-firefly">Adobe Firefly</a>, compete precisely on trained-data provenance and commercial assurances — <a href="/compare/midjourney-vs-adobe-firefly">Midjourney vs Adobe Firefly</a> is that argument in full.</p>

            <p>Use something else when the deliverable moves. Video is a different discipline with different tools, and <a href="/compare/midjourney-vs-runway">Midjourney vs Runway</a> and <a href="/tool/openai-sora">Sora</a> cover that ground; our piece on <a href="/blog/sora-video-generation-revolution">where generative video has got to</a> is the wider view.</p>

            <p>And use something else when what you need is design rather than an image — a layout, a deck, a set of branded assets with type in them. Midjourney makes pictures. It does not make artefacts.</p>
        `,
        useCases: [
            {
                title: "Exploring a visual direction before committing",
                body: "Generating many variations of a concept to find out what a project should look like. The opinionated aesthetic is an advantage here, because the failure mode of exploration is blandness and this model is not bland.",
            },
            {
                title: "Editorial and campaign imagery where the look carries the work",
                body: "Hero images, article art, and campaign visuals that would otherwise be stock photography or a commission. The quality clears the bar for published work, with the caveat that anything containing type gets assembled elsewhere.",
            },
            {
                title: "Series work with a recurring character or subject",
                body: "Storyboards, illustrated sequences, and campaigns built around a mascot. Reference-based consistency makes this feasible rather than automatic — expect to generate generously and to fix drift by hand.",
            },
            {
                title: "Pitch and mood boards",
                body: "Assembling a visual argument for a client or an internal review, fast enough that you can arrive with three directions instead of one. This is low-risk usage, since nothing in a mood board ships.",
            },
            {
                title: "Backgrounds, textures, and environment plates",
                body: "Source material destined for compositing rather than standalone images. The absence of precise editing matters less when the output was always going to be one layer in a larger file.",
            },
        ],
        pricingDetail:
            "Midjourney has four subscription tiers and, as of 2026, no free trial: Basic ($10/mo, ~3.3 fast GPU hours / ~200 images, no Relax Mode), Standard ($30/mo, unlimited relaxed generations + 15 fast GPU hours), Pro ($60/mo, 30 fast GPU hours + stealth mode), and Mega ($120/mo, for production pipelines). Annual billing knocks 20% off each. The pricing trap: 'fast GPU hours' are the real currency, and on the $10 Basic plan they run out fast — heavy users effectively need Standard or higher for unlimited (relaxed) generation. There is no way to evaluate the tool without subscribing.",
        faq: [
            {
                q: "Can I use Midjourney images commercially?",
                a: "Generally yes for paid subscribers, with conditions that you need to read rather than assume. Midjourney's terms grant subscribers ownership of what they create, subject to provisions that have historically included extra requirements for larger companies and a dependence on keeping the subscription active. Separately, owning the output does not clear what is depicted in it — recognisable trademarks, public figures, and distinctive artist styles carry their own risks. Read the current terms, and take advice if the use is commercially significant.",
            },
            {
                q: "Are my images and prompts private?",
                a: "Not by default on the standard tiers. Generations appear in the public community feed unless you are on a plan that includes private generation. This surprises people working on unannounced products or client brands, and it is worth settling before you paste a confidential brief into a prompt box.",
            },
            {
                q: "Do I still have to use Discord?",
                a: "No. There is a full web application alongside the original Discord bot, and you can generate, organise, and manage images entirely there. The Discord-only requirement was the single biggest reason people bounced off the tool, and its removal makes the current product much easier to recommend to anyone who is not already a Discord user.",
            },
            {
                q: "Midjourney or the image generation built into a general assistant?",
                a: "Depends whether the image is the deliverable or a garnish. If you need something visual to accompany work whose substance is elsewhere, the bundled generator is less controllable and far more convenient, and it costs you nothing extra. If the image is what you are actually making — if someone will look at it closely and judge it — the control that Midjourney gives you over style, references, and consistency is what you are paying a separate subscription for.",
            },
        ],
    },

    perplexity: {
        overviewHtml: `
            <p><strong>Perplexity</strong> is usually introduced as a search engine with an AI on top, which undersells the only thing about it that actually matters. A general assistant gives you an answer you have to take on faith. Perplexity gives you an answer with the sources attached, which means you can do something no chatbot output permits: check it. Everything worth saying about the product follows from that one property, including the ways it fails.</p>

            <h3>Citations change what you are allowed to do with the answer</h3>

            <p>An unsourced answer from a language model is, epistemically, a rumour. It may well be right, and you have no route from reading it to knowing it. That is fine for drafting an email and disqualifying for anything you will assert to someone else.</p>

            <p>Perplexity retrieves live sources, synthesises an answer from them, and links each claim back to where it came from. The practical effect is that the tool stops being an oracle and becomes a research assistant: it finds and reads faster than you do, and you retain the job of deciding what is true. For anyone who has to defend a number in a meeting, that is a categorical difference rather than a feature.</p>

            <p>It also changes the shape of the work. The right way to use it is to read the answer as a map of where to look, then open the two or three sources that carry the weight of your conclusion. People who use it well spend meaningful time in the citation panel. People who treat the summary as the deliverable have bought a chatbot with extra steps.</p>

            <h3>Where the citation model breaks</h3>

            <p>This is the section every other review of this tool leaves out, and it is the one that determines whether you can rely on it.</p>

            <p>The first and most common failure is that a citation is present but does not support the sentence it is attached to. The source is real, the link works, the page is roughly on-topic, and the specific claim is either not in it or is a distorted version of something adjacent. Because a footnote reads as verification, this is far more dangerous than an obviously unsourced assertion — the apparatus of rigour is doing the opposite of its job. Any claim you intend to rely on needs the source opened, not counted.</p>

            <p>The second is source quality. Synthesis inherits the reliability of what was retrieved, and on thin, contested, or commercially crowded topics what gets retrieved is content marketing, aggregator pages, and forum posts. The answer will be written with exactly the same confidence as one built from primary research. Notice what is in the citation list before you notice how well the paragraph reads.</p>

            <p>The third is recency and drift. A live index means the answer to the same question can change between Tuesday and Thursday, which is a feature when the world changed and a problem when you are trying to reproduce a piece of analysis. If a finding matters, save the sources rather than the answer.</p>

            <p>And the fourth is that summarising several sources into one paragraph can manufacture a consensus that does not exist. Disagreement between sources is information, and a synthesis that smooths it into a single confident statement has destroyed the most useful thing on the page.</p>

            <h3>Against a search engine, and against a chatbot</h3>

            <p>Against a conventional search engine, the trade is speed for control. Perplexity is faster when your question has an answer that exists across several pages and you would otherwise assemble it yourself. A search engine is better when you know what you are looking for, when you need the primary source rather than a description of it, or when the ranking itself is the information — sometimes what you want to know is which pages exist, not what they collectively say. Most people who adopt Perplexity do not stop searching; they stop searching for the class of question that was really a research task.</p>

            <p>Against a general assistant, the boundary is cleaner than it looks. <a href="/tool/chatgpt">ChatGPT</a> and <a href="/tool/claude">Claude</a> can browse when asked, and that is not the same as being built around retrieval — the citation is an option in one architecture and the foundation of the other. Conversely, Perplexity is not the tool for extended creative writing, for working through a long document you supply, or for anything inside a codebase. <a href="/compare/chatgpt-vs-perplexity">ChatGPT vs Perplexity</a> and <a href="/compare/claude-vs-perplexity">Claude vs Perplexity</a> both come down to whether the output needs provenance, and our <a href="/blog/chatgpt-vs-perplexity">longer write-up</a> goes through the cases.</p>

            <h3>When not to use Perplexity</h3>

            <p>Do not use it as your only assistant. It is a research instrument, and asking it to be a general-purpose companion means accepting a worse version of a product that costs about the same.</p>

            <p>Do not use it for anything where the answer must be right rather than probably right, without opening the sources. Medical, legal, financial, and regulatory questions are exactly where the citation-that-does-not-support-the-claim failure does the most damage, because the reader is least equipped to notice.</p>

            <p>Do not use it as a citation manager. The links in an answer are evidence that something was read, not a bibliography you can paste into a paper. Academic and professional citation requires you to have read and cited the source yourself, and reviewers are increasingly good at spotting work where that did not happen.</p>

            <p>And do not use it for questions about your own material — your documents, your data, your internal decisions. It is pointed at the open web. Something workspace-grounded like <a href="/tool/notion-ai">Notion AI</a> is aimed at that problem, and a general assistant with your file uploaded is aimed at it too.</p>
        `,
        useCases: [
            {
                title: "Fact-finding you will have to defend",
                body: "Any question where the next step is telling someone else the answer. The citation trail is what turns a plausible paragraph into something you can stand behind, provided you actually open the two or three sources doing the real work.",
            },
            {
                title: "Extended research on an unfamiliar topic",
                body: "The deeper research mode runs a longer, multi-source investigation and returns something structured. It is at its best as a well-organised starting point for reading rather than as a finished report, which is roughly the standard you would hold a capable intern to.",
            },
            {
                title: "Catching up on something that moved recently",
                body: "Because retrieval is live, it handles the last few months better than a model relying on training data. This is the clearest everyday advantage over a general assistant and the reason many people keep it open alongside one.",
            },
        ],
        pricingDetail:
            "Perplexity offers Free ($0, 5 Deep Research + 3 Pro Searches per day), Pro ($20/mo or $200/yr, full Sonar family + selectable GPT-5.6/Claude Fable 5/Gemini 3.5 Flash, Spaces, Pages, Labs), Max ($200/mo, adds Perplexity Computer orchestrating 19 sub-agent models), Education Pro ($10/mo for students), Enterprise Pro ($40/seat/mo), and Enterprise Max ($325/seat/mo). The Comet browser is free for everyone, with Comet Plus ($5/mo, or included with Pro/Max) unlocking premium publisher content. The pricing note: the free tier is unusually generous for casual research, and the leap to Max is only worth it for power users who need the multi-agent Computer feature.",
        faq: [
            {
                q: "How is this different from just asking ChatGPT?",
                a: "Provenance. A general assistant produces a fluent answer you have to trust; Perplexity produces one with sources you can open. Both can be wrong, but only one of them lets you find out from the output itself. For anything you will repeat to another person, that difference is the entire product.",
            },
            {
                q: "If there is a citation, does that mean the answer is correct?",
                a: "No, and this is the single most important thing to understand about the tool. A citation can be real, live, and roughly on-topic while failing to support the specific sentence attached to it. Footnotes read as rigour, which makes this failure harder to catch than a plainly unsourced claim. Open the sources for anything you intend to rely on.",
            },
            {
                q: "Does it replace Google?",
                a: "For research-shaped questions, largely. For navigation, for finding a specific primary source, and for cases where the set of results is itself the information, no. Most people end up using both and routing by question type without thinking about it much.",
            },
            {
                q: "Is the free tier enough?",
                a: "For occasional research, generally yes — the free plan includes a daily allowance of the more thorough search and research modes, which is enough to learn whether the workflow suits you. Daily researchers hit the limits. Because those allowances are adjusted periodically, check the current plan page rather than any figure quoted in an article.",
            },
            {
                q: "Can I choose which underlying model it uses?",
                a: "On the paid tiers you can generally select between Perplexity's own models and frontier models from other providers. It matters less than you would expect, because the quality of a retrieval-based answer is dominated by what got retrieved rather than by which model wrote the paragraph. Improving your question beats changing the model.",
            },
            {
                q: "Can I cite Perplexity in academic or professional work?",
                a: "Cite the sources, never the tool. Perplexity is a way of finding material, equivalent to a database search, and the scholarly requirement that you read what you cite is unchanged by how you found it. Passing along a citation you have not opened is a failure mode that predates AI and is now much easier to commit.",
            },
            {
                q: "Is it any good for writing or coding?",
                a: "It is competent and it is not what the product is for. Extended creative writing, work on a long document you supply, and anything inside a codebase are all better served elsewhere. Buying a research tool and using it as a general assistant gets you a worse assistant at a similar price.",
            },
            {
                q: "What is the honest case against it?",
                a: "That it is a narrow product and its core promise degrades quietly. The narrowness is manageable — you keep a general assistant too. The quiet degradation is the real risk: weak sources and unsupported citations produce output that looks more rigorous than an unsourced answer while being no more reliable, and the only defence is the discipline of actually reading what it links to.",
            },
        ],
    },

    "notion-ai": {
        overviewHtml: `
            <p><strong>Notion AI</strong> is the one tool on this site where the buying decision is almost entirely determined before you look at the product. It is not a standalone assistant that happens to live in Notion. It is a set of capabilities whose value is a function of what is already in your workspace, which means two companies can buy the identical thing and have completely different experiences of it. If your organisation does not run on Notion, this page can save you the evaluation: it is not a candidate, and nothing in the feature list changes that.</p>

            <h3>This is not a product you can evaluate on its own</h3>

            <p>Compare Notion AI to <a href="/tool/chatgpt">ChatGPT</a> or <a href="/tool/claude">Claude</a> on writing quality and it loses, which tells you nothing, because nobody buys it for that. The drafting and rewriting features are competent and interchangeable with what a general assistant does. What a general assistant cannot do is answer a question about what your team decided in March.</p>

            <p>The distinctive capability is retrieval over your own workspace — asking a question in plain language and getting an answer drawn from your pages, databases, and, where connected, from other systems your team uses. That reframes the purchase. You are not comparing assistants; you are deciding whether to make your accumulated internal writing queryable.</p>

            <p>Which means the honest evaluation sequence is: are we on Notion, is the knowledge that matters actually in Notion, and do people look for it often enough that finding it faster is worth a per-seat increase. Answer no to the first and you are done. Answer yes to the first and no to the second and you have a content problem that buying AI will not solve — it will just produce confident answers from your three most out-of-date pages.</p>

            <h3>Workspace answers are only as good as the workspace</h3>

            <p>Every retrieval product inherits the quality of what it retrieves from, and internal documentation is usually worse than teams believe. The specific failure is not sparseness, which is obvious and easy to diagnose. It is stale material that reads authoritative: the superseded spec, the pricing page from two strategies ago, the onboarding doc nobody updated. A human searching finds five results and notices the dates. An AI answer picks one and states it.</p>

            <p>Teams that get real value from this tend to have done unglamorous work first — archiving what is dead, giving pages owners, keeping decisions in documents rather than in chat threads. That work pays off with or without AI, which is a reasonable way to think about the spend: you are not buying a knowledge base, you are buying better access to one you have to maintain anyway.</p>

            <p>There is a second-order effect worth planning for. Once people trust workspace answers, the incentive to write things down changes, in both directions. Some teams start documenting more carefully because the documentation is finally being read. Others stop reading the source entirely and treat the summary as canon, which is how a wrong page becomes institutional truth. Which of those happens is about your culture, not about the tool.</p>

            <h3>When not to buy it</h3>

            <p>Do not buy it if you are not already committed to Notion. Adopting a workspace in order to get its AI layer is an enormous change justified by a small one, and the migration cost dwarfs the benefit. Choose the workspace on its merits — <a href="/compare/notion-ai-vs-coda">Notion AI vs Coda</a> covers the nearest alternative — and treat the AI as something you get afterwards.</p>

            <p>Do not buy it if your knowledge actually lives somewhere else. Companies whose real source of truth is a shared drive, a ticket tracker, or a chat history will find that workspace search answers from the fraction of reality that happens to be in Notion, with no indication that the rest exists. Where your documents live decides which vendor's AI is relevant to you; <a href="/compare/notion-ai-vs-microsoft-365-copilot">Notion AI vs Microsoft 365 Copilot</a> is that comparison for organisations on the Microsoft stack.</p>

            <p>Do not buy it as a writing tool. If what you want is drafting and editing, a general assistant is better at it and a dedicated writing product like <a href="/tool/grammarly">Grammarly</a> is more thorough about it — see <a href="/compare/notion-ai-vs-grammarly">Notion AI vs Grammarly</a>. Paying a per-seat workspace upgrade to get mid-tier drafting is the most common way to overpay here.</p>

            <p>And do not buy it for a small team with a small workspace. The value scales with the volume of internal writing that exists and with how many people need to find it. Four people who all remember where everything is do not have the problem this solves.</p>
        `,
        useCases: [
            {
                title: "Asking the workspace instead of searching it",
                body: "Questions like what we decided about pricing, or who owns this integration, answered from your own pages rather than from the open web. This is the capability that justifies the product, and it degrades exactly as far as your documentation does.",
            },
            {
                title: "Drafting and rewriting where the work already is",
                body: "Composing, restructuring, and summarising inside the page rather than in a separate tab. The quality is ordinary; the absence of copy-paste is the point, and for a lot of daily writing that is enough to change behaviour.",
            },
            {
                title: "Filling in database properties at scale",
                body: "Categorising, extracting, or summarising across many rows at once — turning a list of raw entries into something with structure. This is the most quietly useful feature and the one most likely to justify the upgrade for operations teams.",
            },
            {
                title: "Turning raw capture into something findable",
                body: "Meeting notes, research dumps, and interview transcripts processed into structured pages in the same place the project lives. The gain is less about the summary than about the material ending up somewhere it can be retrieved later.",
            },
        ],
        pricingDetail:
            "Notion has four tiers: Free ($0), Plus ($10/user/mo annually, $12 monthly), Business ($20/user/mo annually, $24 monthly), and Enterprise (custom). The pivotal 2026 change: the old $10/mo standalone AI add-on was eliminated in May 2025, and full AI — AI Agents and Ask Notion — now lives in the Business plan. Free and Plus get only a limited AI trial that stops responding once exhausted. The catch to budget for: Custom Agents began running on Notion credits ($10 per 1,000 monthly credits) as of May 4, 2026, though the standard Notion Agent, AI writing, database autofill, and AI search do not burn credits.",
        faq: [
            {
                q: "Can I use Notion AI without using Notion?",
                a: "No, and the question is worth taking literally. There is no standalone product and no meaningful version of this that operates on documents living elsewhere. If you are not a Notion organisation, this is not a shortlist item, and evaluating it further is time you will not get back.",
            },
            {
                q: "Is AI included in my plan or does it cost extra?",
                a: "This has changed more than once. Notion previously sold AI as a separate per-seat add-on and later folded the full capability into a higher plan tier, so the effective answer for most teams is that meaningful AI means being on a more expensive plan rather than buying a bolt-on. Some advanced agent features also draw on a separately purchased credit pool. Because the packaging keeps moving, check Notion's current pricing page before budgeting.",
            },
            {
                q: "How good is workspace search in practice?",
                a: "Good in proportion to your documentation and unreliable in proportion to your clutter. It is genuinely strong at finding something you know exists but cannot locate, and weak at distinguishing a current document from a superseded one that reads just as confidently. Treat it as a fast way to find the page, and then read the page.",
            },
            {
                q: "Does it search tools outside Notion?",
                a: "It can connect to some common systems so answers draw on more than your workspace alone, which materially improves coverage for teams whose documents are split across a couple of places. Which connectors exist and what each tier includes changes, so confirm the current list rather than assuming your stack is covered.",
            },
            {
                q: "Does this replace a subscription to a general assistant?",
                a: "For almost nobody. They solve different problems: one answers from your internal knowledge, the other answers from general knowledge and is better at reasoning, coding, and long-form work. Most teams that adopt Notion AI keep a general assistant too, and the spend is additive rather than substitutive — worth saying out loud during budgeting.",
            },
            {
                q: "What is the most common way this disappoints teams?",
                a: "Buying it to fix a documentation problem. A workspace where knowledge is thin, stale, or scattered produces answers that are thin, stale, or scattered, delivered with more confidence than a search result would have carried. The tool amplifies whatever discipline you already had about writing things down; it does not supply it.",
            },
        ],
    },

    canva: {
        overviewHtml: `
            <p><strong>Canva</strong> is the design platform that made graphic design accessible to people who are not designers, and its <strong>Magic Studio</strong> suite extended that promise into AI. The core idea is unchanged — drag-and-drop templates anyone can use — but it now bundles text-to-image (Dream Lab), AI copywriting (Magic Write), object removal (Magic Eraser), image extension (Magic Expand), Background Remover, and more behind the same friendly interface.</p>

            <p>The pricing is a genuine freemium model. <strong>Canva Free</strong> is unusually generous — 1.6M+ templates, 4.7M+ free assets, real-time collaboration, and roughly 50 monthly AI credits — enough for real work, not just a teaser. <strong>Pro (around $15/mo, $120/yr)</strong> adds the Brand Kit, premium assets, and ~500 monthly AI credits, which covers moderate daily use of Magic Studio. <strong>Teams ($10/user/mo, 3-user minimum)</strong> brings collaboration and brand controls.</p>

            <p>Its strength is approachability at scale. For social media, presentations, marketing one-pagers, and quick branded assets, Canva lets a non-designer produce a good-enough result in minutes, and Magic Studio removes even more of the manual work. For most small businesses and creators, it is the fastest path from idea to publishable visual.</p>

            <p>The honest weaknesses: AI features run on a <strong>pooled monthly credit system</strong>, so heavy Magic Studio users exhaust their credits and must wait or upgrade. Outputs can look templated — the same polish that makes Canva fast also makes Canva designs recognizable. And it is not a professional design-system tool; teams building serious product UI use <a href="/tool/figma">Figma</a> instead. The 2024 shift of Teams to per-seat pricing also raised costs sharply for small groups. See our <a href="/tool/figma">Figma</a> review for a closer look at that trade-off.</p>

            <p>Who it is for: non-designers, marketers, creators, and small teams who want fast, good-looking visuals without learning professional tools. Who it is not for: product designers building design systems, or anyone whose work demands a distinctive, non-templated visual identity.</p>
        `,
        useCases: [
            {
                title: "Social media and marketing assets",
                body: "Canva's bread and butter: producing on-brand social posts, ads, and marketing one-pagers fast. Magic Write drafts the copy and Dream Lab generates supporting imagery, so a marketer can go from brief to publishable in a single session.",
            },
            {
                title: "Presentations and documents",
                body: "Non-designers use Canva to build presentations that look professionally designed without a designer. Templates plus Magic Studio's resizing and image tools make it easy to keep a deck consistent and polished.",
            },
            {
                title: "Quick image editing with Magic Studio",
                body: "Background Remover, Magic Eraser, and Magic Expand handle common photo edits that used to require Photoshop skills. For everyday tasks — clean up a product photo, extend a background — Canva does it in a couple of clicks.",
            },
        ],
        pricingDetail:
            "Canva uses a freemium model: Free ($0, genuinely useful with 1.6M+ templates, 4.7M+ assets, and ~50 monthly AI credits), Pro (around $15/mo or $120/yr, with Brand Kit, premium assets, and ~500 monthly AI credits), Teams ($10/user/mo with a 3-user minimum), and Enterprise (custom). The pricing traps: AI features draw from a pooled monthly credit system shared across Magic Write, Dream Lab, Magic Resize and others, so heavy AI use depletes credits; and the 2024 move of Teams from a flat ~$120/yr (up to 5 users) to per-seat pricing raised costs 300%+ for small teams, which catches people off guard.",
        faq: [
            {
                q: "Is Canva Free actually usable, or just a trial?",
                a: "It is genuinely usable, not a time-limited trial. The free tier includes 1.6M+ templates, 4.7M+ free assets, real-time collaboration, and roughly 50 monthly AI credits. Many individuals never need to upgrade; Pro mainly adds the Brand Kit, premium content, and more AI credits.",
            },
            {
                q: "How do Canva's AI credits work?",
                a: "Magic Studio features share a pooled monthly credit allowance — about 50 credits on Free and 500 on Pro — across Magic Write, Dream Lab image generation, Magic Resize, and others. Heavy AI users can run out before the month ends and must wait for the reset or upgrade.",
            },
            {
                q: "Canva or Figma — which should I use?",
                a: "Canva is for fast, accessible visual content — social posts, presentations, marketing assets — by non-designers. Figma is for professional interface design and design systems. They serve different jobs; many teams use Canva for marketing and Figma for product. See our Canva vs Figma comparison.",
            },
            {
                q: "Why did Canva Teams get more expensive?",
                a: "In September 2024 Canva moved Teams from a flat rate (about $120/yr for up to 5 users) to per-seat pricing at $10/user/month with a 3-user minimum. For a 5-person team that raised the annual cost from ~$120 to ~$500 — a 300%+ increase that surprised many existing customers.",
            },
            {
                q: "Do Canva designs look generic?",
                a: "They can. The template-driven approach that makes Canva fast also makes its output recognizable, and over-relying on defaults produces designs that look like everyone else's. With custom assets and a Brand Kit you can differentiate, but for a truly distinctive identity a professional designer and tool are still better.",
            },
        ],
    },

    figma: {
        overviewHtml: `
            <p><strong>Figma</strong> does not need introducing to anybody evaluating it, so this page skips that and answers the question people actually arrive with: given that our team is already in Figma, do its AI features mean we do not need one of the standalone generation tools? The answer is more often yes than the standalone vendors would like, and the reason has almost nothing to do with which product generates a better-looking screen.</p>

            <h3>The question is not whether Figma has AI</h3>

            <p>A separate generation tool produces something outside your design system, outside your file structure, and outside the review process your team uses. Every one of those boundaries is a handoff, and handoffs are where the time you saved goes. Figma's advantage is not the quality of its generation; it is that whatever gets generated arrives already inside the file where the work was going to happen, alongside your components, your libraries, and the people who comment on it.</p>

            <p>That is a meaningful bar for a challenger to clear. To be worth adopting, an external tool has to be enough better at generating to outweigh the fact that its output starts life in the wrong place. For screens that are variations on things your product already has, it usually is not. For a greenfield concept where you have no system to respect, it often is.</p>

            <h3>First drafts in the file you were going to open anyway</h3>

            <p>The features that earn their keep are unglamorous and cumulatively significant. Generating a first-pass layout from a description gets you past the blank canvas, which is a real cost even for experienced designers. Producing plausible placeholder content instead of repeated dummy text makes a mock-up read like a product rather than like a mock-up, and it changes the quality of feedback you get in review — people respond to realistic content and ignore lorem ipsum.</p>

            <p>Then there is search and reuse, which matters more the larger your system is. In a mature library the most common waste is rebuilding a component that already exists because nobody could find it, and better retrieval across your own design system addresses that directly. It is the least exciting AI feature in the product and probably the one with the best return.</p>

            <p>What none of this does is design. The generated layout is a competent arrangement of conventional patterns, which is exactly what you want for the fourth settings page and exactly what you do not want for the screen your product is actually about.</p>

            <h3>Design to code, and what the handoff really saves</h3>

            <p>Figma's push toward generating code from designs is aimed at the oldest waste in the pipeline: a developer rebuilding, by hand and by eye, something that was already fully specified. Dev Mode has carried the practical version of this for a while — specs, measurements, assets, and tokens read directly from the file — and the AI layer extends it toward emitting code that reflects your actual components rather than generic markup.</p>

            <p>Be realistic about the ceiling. Generated code is a starting point that respects your design decisions, not a component you merge unreviewed, and how useful it is depends heavily on whether your design system and your codebase agree with each other. Teams whose Figma components map cleanly onto real front-end components get a lot from this. Teams where the design system is aspirational and the codebase is a decade of accumulated decisions get a plausible file that does not fit anything.</p>

            <p>The comparison people actually want here is against a generator like <a href="/tool/v0-by-vercel">v0</a>, and the honest framing is that they start from opposite ends. v0 starts from a prompt and produces code; Figma starts from a design that already exists and tries to carry it across. If the design is the artefact your organisation agrees on, the second direction is the one that matches how you work — our look at <a href="/blog/nocode-design-v0">design tools generating code</a> covers the trade in more depth.</p>

            <h3>Seats, credits, and the part finance asks about</h3>

            <p>Two cost mechanics are worth understanding before an upgrade conversation. The first is that the free tier is a trial rather than a plan: the cap on files is low enough that any sustained real work requires paying, so treat the free tier as a way to answer whether the tool suits you and not as a way to run a team.</p>

            <p>The second is that AI features consume a metered allowance included with each plan, with more available to buy. The practical consequence is that AI usage is a variable cost layered on top of a per-seat fixed cost, which is a shape finance departments dislike and engineering leads forget to mention. The allowances and add-on prices are revised periodically, so confirm current figures on Figma's pricing page rather than planning around a number in an article.</p>

            <h3>When a separate generation tool is the better answer</h3>

            <p>Reach outside Figma when you have no design system to protect. Early-stage work, a brand-new product, a throwaway concept for a pitch — nothing is being violated, so the advantage of staying inside the file mostly evaporates and raw generation speed wins.</p>

            <p>Reach outside when the deliverable is a working thing rather than a design of one. If what you need at the end of the afternoon is a deployed site, that is <a href="/tool/framer">Framer</a>'s job. If it is a running application, that is <a href="/tool/lovable">Lovable</a>'s. Figma produces designs, and expecting a shipped artefact from it is a category error rather than a shortfall.</p>

            <p>And reach outside if you are not a designer and never intended to become one. Figma's AI features lower the floor; they do not remove it, and the interface still assumes you know what a constraint and an auto-layout are. Someone who needs a presentation or a social graphic wants <a href="/tool/canva">Canva</a>, and will be much happier there.</p>
        `,
        useCases: [
            {
                title: "Getting past the blank canvas",
                body: "Generating a first-pass layout from a description so the work starts as editing rather than as invention. The output is conventional by construction, which is fine for the screens that should be conventional and unhelpful for the ones that should not.",
            },
            {
                title: "Realistic placeholder content",
                body: "Replacing dummy text and grey boxes with content that reads like the real thing. This changes the quality of review feedback more than it changes the design, because stakeholders respond to plausible content and skim past filler.",
            },
            {
                title: "Finding what your design system already has",
                body: "Better retrieval across a large library, so a designer stops rebuilding a component that exists three pages away. Unexciting, and probably the highest-return AI feature in the product for any team with a mature system.",
            },
            {
                title: "Engineers consuming designs without designing",
                body: "Dev Mode gives developers specs, measurements, assets, and tokens straight from the file, with code generation on top. A large share of Figma seats belong to people who never draw anything, and this is what they are paying for.",
            },
            {
                title: "Prototyping interaction without wiring every state",
                body: "Producing clickable flows fast enough to test a hypothesis with real users in the same week you had it. The value is in shortening the loop between a question about behaviour and an observation of it.",
            },
        ],
        pricingDetail:
            "Figma offers Starter (free, but capped at 3 design files and 3 FigJam boards), Professional ($16/user/mo, unlimited files, version history, team libraries, plugins), Organization ($55/user/mo, SSO and org-wide design systems), and Enterprise ($90/user/mo). Each tier includes monthly AI credits (500 on Starter, 3,000 Professional, 3,500 Organization, 4,250 Enterprise), with add-on packs (e.g. 5,000 credits for $120/mo) or pay-as-you-go at $0.03/credit. The thing to understand in 2026: you can no longer buy individual tools (Dev Mode, Make, FigJam) separately — access is bundled through plans and seat types, so cost is managed at the plan level rather than per feature.",
        faq: [
            {
                q: "Do Figma's AI features remove the need for a tool like v0?",
                a: "For most teams with an existing product, largely yes, and not because the generation is better. Output that appears inside your file, next to your components and your reviewers, avoids a handoff that usually costs more than the generation saved. The exception is greenfield work with no design system to respect, where an external generator's speed is not offset by anything.",
            },
            {
                q: "Is the free plan enough for real work?",
                a: "No, and it is not meant to be. The file cap on the free tier is low enough that any sustained project exceeds it quickly, so treat it as an evaluation rather than a plan. Serious use means the paid working tier, which is where unlimited files, version history, shared libraries, and plugins live.",
            },
            {
                q: "Do the AI features cost extra on top of my seat?",
                a: "Effectively yes, in the form of a metered allowance. Each plan includes a pool of AI credits, and heavier use means buying more, which turns AI into a variable cost sitting on top of a fixed per-seat one. Allowances and add-on pricing are adjusted periodically, so check the current pricing page before assuming your team's usage fits inside what is included.",
            },
        ],
    },

    grammarly: {
        overviewHtml: `
            <p><strong>Grammarly</strong> occupies an awkward position that most reviews of it never address. General-purpose assistants now correct grammar perfectly well, for free, and a great many people have one open already. So the interesting question is not whether Grammarly checks writing accurately — it does — but why a dedicated product for this still exists, and what you are actually agreeing to when you put it on every machine in a company.</p>

            <p>Three things decide that, and none of them is feature coverage.</p>

            <h3>The first question a security review asks: where does the text go?</h3>

            <p>This is the argument that stops or starts most organisational deployments, and it is worth understanding structurally rather than as a yes-or-no.</p>

            <p>Grammarly's value comes from working everywhere you type, and that mechanism is the concern. A browser extension and a desktop integration that can suggest improvements to a sentence must be able to read that sentence, which means text from your mail client, your internal tools, your ticketing system and your documents is in scope by default. This is not a hidden behaviour or an accusation; it is how ambient correction necessarily works. Any tool offering the same convenience has the same shape.</p>

            <p>What varies, and what you should actually be evaluating, is the configuration around it: which applications and domains the integration is permitted on, whether text is processed and discarded or retained, whether organisational content can be excluded from model training, what the retention period is, and whether administrators can enforce any of that centrally rather than trusting each user's settings. Those controls are a function of which plan you are on and which admin surface you get, and the answers have been revised more than once, so read the current data-processing documentation rather than a summary of it. Our piece on <a href="/blog/zero-knowledge-ai">keeping sensitive data out of model providers</a> covers the general shape of this problem.</p>

            <p>The unhelpful version of this conversation ends in a blanket ban, which usually just moves the same text into a personal account on an unmanaged browser. The useful version is narrower: decide which teams are excluded outright — legal, anything under privilege, anything handling regulated personal data, pre-announcement material — and deploy with an application allowlist for everyone else.</p>

            <h3>Why a dedicated corrector still beats asking an assistant</h3>

            <p>The honest case for Grammarly in the age of capable general models is not quality. It is the absence of a decision.</p>

            <p>Sending a sentence to <a href="/tool/chatgpt">ChatGPT</a> or <a href="/tool/claude">Claude</a> for a check costs a context switch, a copy, a paste, a prompt and a paste back. That is cheap enough that nobody objects and expensive enough that nobody does it for the message they are about to send in a chat window. The result is that assistant-based proofreading happens for documents that felt important and does not happen for the hundred smaller pieces of writing where errors are actually embarrassing — the reply to a customer, the release note, the comment on a shared file.</p>

            <p>Grammarly wins that ground by removing the decision entirely. Its correction is ambient rather than requested. That is a genuine and narrow advantage, and it collapses the moment your writing is concentrated in one place: if everything you produce is a long document you were going to edit deliberately anyway, an assistant will do more for you and you are paying for ubiquity you do not use.</p>

            <p>The comparison with <a href="/tool/notion-ai">Notion AI</a> makes the same point from the other direction — <a href="/compare/notion-ai-vs-grammarly">the two products</a> are separated by where your writing lives, not by how well either one spots a comma splice.</p>

            <h3>Accepting every suggestion makes everyone sound the same</h3>

            <p>The correction engine handles two categories of suggestion and does not usefully distinguish them for the user. The first is mechanical: spelling, agreement, punctuation, obvious repetition. These are close to objectively right and accepting them without thought is fine.</p>

            <p>The second is stylistic: split that sentence, soften that phrase, use the active voice, remove the qualifier, reword for confidence. These are opinions dressed as corrections, and the opinion is a general one about neutral professional English. Applied once, it improves a clumsy paragraph. Applied to everything a team writes, it converges on a middle register — the rhythm flattens, the long deliberate sentence gets broken up, the dry aside gets removed as unclear, and everyone's mail starts to sound like everyone else's.</p>

            <p>For most internal writing, that convergence is a fair trade or even a benefit. It is a real cost for anyone whose writing is meant to be identifiable: marketing copy, anything published under a person's name, communication where warmth or bluntness is doing work. Distinguish between people using it for correctness and people using it for voice, and let the second group ignore most of the second category.</p>

            <p>The related warning for the enterprise features: a brand-tone or style-guide configuration is a genuine consistency tool, and it is also a mechanism for enforcing sameness at scale. Deploy it where consistency is the goal, not across the whole company by default.</p>

            <h3>When not to deploy it</h3>

            <p>Do not deploy it where the text is confidential by obligation rather than by preference — privileged legal material, regulated personal or health data, anything under embargo — unless your compliance function has reviewed the specific configuration in writing.</p>

            <p>Do not buy it as a drafting tool. Generative writing is bundled into it now, and it is fine, but it is not the reason this product is better than the alternatives and it is not where a frontier assistant loses.</p>

            <p>Do not deploy it to people who write in a second language and need to learn, without saying so explicitly. Accepting corrections silently is a fast path to fluent output and slow improvement, which may be exactly what you want, but it should be a decision rather than a side effect.</p>

            <p>And do not roll it out to an entire organisation because a few teams asked. Ubiquity is the whole product, which means the deployment surface is every application on every machine — a scope worth choosing deliberately rather than by default.</p>
        `,
        useCases: [
            {
                title: "Correcting the writing nobody would proofread",
                body: "Chat replies, ticket comments, short mail, review notes. This is where ambient correction earns its keep, because these are precisely the pieces nobody would paste into an assistant and precisely where a visible error costs something.",
            },
            {
                title: "Customer-facing communication under time pressure",
                body: "Support and success teams writing quickly to people who will judge the company by the sentence. Correctness matters more than voice here, which makes it the population where accepting almost every suggestion is the right default.",
            },
            {
                title: "Writing in a second language at work",
                body: "The largest and least-discussed use. It removes a class of error that has nothing to do with competence and quietly changes how a person's contributions are received in writing-heavy organisations.",
            },
            {
                title: "Catching tone before it lands badly",
                body: "Flagging that a message reads as curt or combative before it is sent. Treat it as a prompt to reread rather than an instruction to soften, since the suggestion has no idea what the relationship or the history is.",
            },
            {
                title: "Enforcing terminology across a team",
                body: "Style-guide and brand-tone configuration on the team tiers, used to keep product names, spellings and forbidden phrasings consistent. Useful where consistency is genuinely the objective; corrosive if applied to writing that is supposed to sound like a person.",
            },
            {
                title: "Academic and long-form editing passes",
                body: "A mechanical sweep before a human edit, including the plagiarism check where a submission requires one. It handles the pass that rewards patience rather than judgement, and it is a poor substitute for the pass that rewards judgement.",
            },
        ],
        pricingDetail:
            "Grammarly's plan structure is Free, Pro and Enterprise. Free covers real-time grammar, spelling, punctuation and clarity plus a monthly allowance of AI prompts (100/mo at the time of writing), so the generative features are usable without paying. Pro ($12/user/mo billed annually, or $30/mo month-to-month) raises that allowance substantially, adds plagiarism detection and full rewrites, and carries the team features — style guides and brand tones — for teams up to 149 seats. Enterprise (custom) is where the security controls, governance and administrative enforcement live, from 150 seats. Two things matter more than the headline rate. The month-to-month price is far above the annual one, so a short trial is disproportionately expensive. And for any organisational deployment the relevant question is which tier carries the admin controls your security review will ask about, since that — not the AI allowance — is usually what decides the tier. Grammarly has revised both the plan boundaries and the allowances, so confirm current terms on its own pricing page.",
        faq: [
            {
                q: "Why pay for this when ChatGPT corrects writing for free?",
                a: "Because the advantage is not quality, it is the removal of a decision. Pasting into an assistant is cheap enough that nobody objects and expensive enough that nobody does it for a chat reply or a ticket comment, which is where visible errors actually happen. Grammarly's correction is ambient rather than requested. If your writing is concentrated in long documents you were going to edit deliberately anyway, that advantage does not apply and an assistant will do more for you.",
            },
            {
                q: "What should our security review actually ask about?",
                a: "Not whether it reads your text — it has to, that is how ambient correction works. Ask which applications and domains the integration can run on and whether that is centrally enforceable, whether text is retained or discarded after processing, whether organisational content is excluded from model training, and what the retention period is. Those answers depend on the tier and have been revised, so get them from current documentation rather than from a summary. Then exclude the teams whose material is confidential by obligation rather than preference, and allowlist applications for everyone else.",
            },
            {
                q: "Will it flatten how our team writes?",
                a: "If people accept every suggestion, yes, and the mechanism is worth naming. Mechanical fixes are close to objectively correct. Style suggestions — split this, soften that, use the active voice — are opinions about neutral professional English, and applied across everything a team writes they converge on a middle register. That is a fair trade for internal and support writing. It is a real cost for anything published under a person's name, where the right instruction is to ignore most of the stylistic category.",
            },
        ],
    },

    "v0-by-vercel": {
        overviewHtml: `
            <p><strong>v0</strong> is the tool in this category most often evaluated against the wrong competitors. It gets compared to <a href="/tool/lovable">Lovable</a> and <a href="/tool/bolt-new">Bolt.new</a> because all three turn prompts into working software, but those two are trying to produce an application and v0 is trying to produce a layer. The realistic v0 session does not end with a deployed product. It ends with a component you paste into a repository that already exists.</p>

            <h3>What v0 actually emits</h3>

            <p>The output is React, styled with Tailwind, built on shadcn/ui primitives, and shaped to Next.js conventions. That is a specific and opinionated target, and how well v0 fits your team is mostly a question of how close your stack already sits to it. A team on Next.js and Tailwind is receiving code they can merge. A team on Vue, or on a CSS-in-JS system, or on a component library with its own primitives, is receiving a design to reimplement — still useful, but a different and slower kind of useful.</p>

            <p>Worth noting that shadcn/ui is not a dependency you install and hide behind. Its components are copied into your project as source you own and edit. That property is why v0's output integrates as well as it does: it is generating code of the same kind you would already have in the repository, rather than configuration for a library only it understands.</p>

            <h3>The paste is the workflow</h3>

            <p>Most of the value shows up in one narrow motion: you need a screen that is tedious rather than hard — a settings page, a data table with filters and empty states, a multi-step form, a dashboard shell — and you would rather not spend a day arranging it. You describe it, iterate in the chat or by manipulating elements directly, and move the result into your codebase. v0 provides a command-line path for dropping generated blocks into an existing project through the shadcn CLI as well as straightforward copying; check the current documentation for the exact invocation, since that surface has changed more than once.</p>

            <p>Everything downstream of that paste is your normal process. Your router, your data fetching, your state management, your tests, your review. v0 does not want to own any of it, which is why it coexists comfortably with an editor-first tool like <a href="/tool/cursor">Cursor</a> rather than competing with one.</p>

            <h3>If your team already has a design system</h3>

            <p>This is the case where v0 is either excellent or actively annoying, with very little in between, and the deciding factor is how specific your system is.</p>

            <p>If your design system is essentially Tailwind plus shadcn plus a theme, v0 lands close enough that adapting output is a matter of swapping tokens and tightening spacing. If your system has its own primitives, its own naming, and rules a reviewer will enforce, then generated code that ignores all of it creates a translation step that can cost more than writing the component would have. The mitigation is to show rather than describe: give v0 representative existing components as context so it can imitate concrete patterns instead of guessing from adjectives. It follows examples considerably better than it follows instructions.</p>

            <p>There is also a quieter organisational risk. A generator that produces plausible, attractive, slightly-off components can erode a design system faster than it accelerates it, because the off-by-a-little version ships and becomes precedent. Teams that keep this under control tend to route v0 output through the same review that any component change would get, rather than treating it as already-approved because it looks finished.</p>

            <h3>Credits, and why the bill tracks regeneration</h3>

            <p>v0 is credit-metered, and the thing that consumes credits is iteration. Getting a complex screen to the state you wanted is rarely one generation; it is a sequence of refinements, and each one costs. The practical consequence is that a precise first prompt is worth real money, and that a habit of nudging the output repeatedly toward a picture in your head is the expensive way to use the tool. Past a certain point it is cheaper to accept the structure and finish the details by hand.</p>

            <p>Because plan names and credit allowances change, treat any figure you read as provisional and confirm the current terms on Vercel's pricing page before planning around them.</p>

            <h3>Where v0 stops being the right tool</h3>

            <p>Stop at the point the work becomes behaviour rather than appearance. Authorisation rules, data consistency, background jobs, anything where the difficulty is in what happens rather than what it looks like — a UI generator has nothing distinctive to offer there, and asking it anyway produces confident code that has not considered your constraints.</p>

            <p>Skip v0 entirely if you are not writing React, because the output is not portable in any meaningful sense. Skip it if you want something that builds and hosts an entire application for you, which is Lovable's job for non-developers and Bolt's for developers; our comparison of <a href="/blog/ai-app-builders-bolt-v0-lovable">Bolt, v0, and Lovable</a> separates those three cleanly, and <a href="/blog/nocode-design-v0">v0 against Builder.io</a> covers the design-tool angle. And be wary of reaching for it on components that are core to your product's identity. v0 is very good at the screens every product has and noticeably less interesting on the one screen yours is actually about.</p>
        `,
        useCases: [
            {
                title: "The screens nobody wants to build from scratch",
                body: "Settings pages, tables with sorting and filtering and a decent empty state, onboarding forms, dashboard shells. Interfaces where the requirements are well understood and the work is arrangement rather than invention, which is precisely where a generator's weaknesses do not surface.",
            },
            {
                title: "Moving a design into an existing React codebase",
                body: "Designers on the paid tiers can bring Figma work in, and the output arrives as the same kind of Tailwind and shadcn source the repository already contains. The handoff stops being a document a developer interprets and becomes a component a developer edits, which is a shorter conversation.",
            },
        ],
        pricingDetail:
            "v0 has five credit-based tiers: Free ($0, $5 monthly credits, up to 200 projects, Design Mode, GitHub sync), Premium ($20/mo, $20 monthly credits, Figma imports, v0 API, higher limits), Team ($30/user/mo), Business ($100/user/mo), and Enterprise (custom). All tiers access the three model tiers (Mini, Pro, Max) and differ in credits, daily limits, and collaboration. Purchased credits expire after one year. The pricing trap: generation cost scales with complexity, so heavy users on Premium can exhaust their $20 credit pool and need to buy more — budget by how much you actually generate, not by the flat sticker price.",
        faq: [
            {
                q: "Do I have to use Next.js and deploy to Vercel?",
                a: "You can export the code and host it anywhere, but you should be honest about how opinionated the output is. It is React with Tailwind and shadcn/ui, shaped to Next.js conventions. Outside that stack you are translating rather than integrating, and the further away you are, the less of v0's advantage survives the trip.",
            },
            {
                q: "What does v0 actually give me?",
                a: "Components and pages as source code you own, not a hosted artefact you rent. Because shadcn/ui components are copied into a project rather than installed as an opaque dependency, what you receive is ordinary code in your repository that any developer on the team can read and change without learning anything v0-specific.",
            },
            {
                q: "How do I get generated code into an existing project?",
                a: "Either by copying it directly or through the shadcn command-line path v0 provides for adding a generated block to a project. The exact command has changed across releases, so take it from the current v0 documentation rather than from memory or an older tutorial.",
            },
            {
                q: "Can v0 follow our design system?",
                a: "Partially, and it depends on how far your system sits from Tailwind and shadcn. The approach that works is showing it real components from your codebase as context so it can copy concrete patterns; the approach that disappoints is describing your system in prose and hoping. If your primitives are genuinely custom, expect to adapt output rather than merge it.",
            },
            {
                q: "v0, Lovable, or Bolt.new?",
                a: "They answer different questions. v0 produces UI for a codebase that already exists and assumes a developer will take it from there. Bolt.new builds a running full-stack project in the browser for developers who will steer it. Lovable builds an application for someone who does not intend to write code at all. If you already have a repository, v0 is the one designed for your situation.",
            },
            {
                q: "Why do my credits disappear so quickly?",
                a: "Because iteration is what costs, not output size. Each refinement of a complex screen is another metered generation, so a long back-and-forth chasing an exact visual result is the expensive path. Writing a more specific first prompt, and finishing the last ten percent by hand instead of asking for it, is usually both cheaper and faster.",
            },
        ],
    },

    "bolt-new": {
        overviewHtml: `
            <p><strong>Bolt.new</strong>, from StackBlitz, is the AI builder whose identity is a runtime rather than a model. Everything distinctive about it follows from one fact: the generated application runs inside your browser tab, in a real Node environment compiled to WebAssembly, with no server executing your code and nothing installed on your machine. Deciding whether Bolt suits you is mostly deciding whether you want that trade.</p>

            <h3>A whole stack, running in a browser tab</h3>

            <p>The practical experience is that you describe an application and then watch it run — not a preview image, not a mocked interaction, but the actual project executing with a package manager, a dev server, and a terminal you can type into. Errors appear as errors. The AI can see them and try again. Because nothing is provisioned, the gap between having an idea and watching it fail for a real reason is measured in seconds.</p>

            <p>This makes Bolt unusually good at a specific thing that the polished app builders are bad at: telling you quickly that an approach does not work. A tool that only shows you a rendering will let you believe a plan is fine for much longer than a tool that runs it.</p>

            <h3>What the sandbox will not do</h3>

            <p>The constraint is the same as the feature. A browser-based Node runtime is not a Linux machine, and the things it cannot do are specific rather than vague. Anything that depends on a native binary compiled for a host platform is out of reach. Runtimes that are not JavaScript — a Python service, a Go binary, a Ruby backend — are not what this environment is for. There is no container to run a database in, which is why persistence is handled by connecting to an external service such as Supabase rather than by something inside the tab, and why deployment goes out to a hosting provider rather than staying where you built it.</p>

            <p>Browser support is narrower than an ordinary web application's, since the technology depends on capabilities not every browser exposes the same way; check the current requirements before you plan a workshop around it. And because the whole project lives in a tab, the session is more fragile than a checkout on disk. Connecting the project to a repository early is the difference between a bad afternoon and a lost one.</p>

            <p>None of this is a defect. It is the cost of not installing anything, and it is a reasonable price for a JavaScript project. It is a fatal price for a polyglot one.</p>

            <h3>Reasons to build somewhere else</h3>

            <p>Do not use Bolt if you cannot read the code it produces. This is the sharpest difference from <a href="/tool/lovable">Lovable</a>, which is built for people who will never open the source and structures its whole experience around protecting them from it. Bolt assumes a developer is in the chair and hands you the project accordingly. When something goes wrong — and on anything non-trivial it will — Bolt's recovery path is that you understand what happened.</p>

            <p>Do not use it for a project you expect to grow large. Token consumption is driven substantially by keeping the AI in sync with your files, so the cost of each message climbs with the size of the codebase rather than with the size of your request. A one-line change in a big project is not a cheap message. The economics favour small, fast, early work, which is also where the tool is most enjoyable.</p>

            <p>Do not use it when the environment is the point. If your application depends on a specific runtime version, a native dependency, a local database, or infrastructure you have to configure, you will spend the session fighting the sandbox instead of benefiting from it — reach for a conventional setup and an editor-first tool like <a href="/tool/cursor">Cursor</a> instead, or a cloud environment such as <a href="/tool/replit">Replit</a> that gives you a real machine. And if you want UI rather than an application, <a href="/tool/v0-by-vercel">v0</a> is aimed at that narrower job. Our comparison of <a href="/blog/ai-app-builders-bolt-v0-lovable">Bolt, v0, and Lovable</a> lays the three out side by side, and <a href="/compare/cursor-vs-bolt-new">Cursor vs Bolt.new</a> covers the build-versus-maintain split.</p>
        `,
        useCases: [
            {
                title: "Starting before you install anything",
                body: "A borrowed laptop, a locked-down work machine, a tablet, a machine that does not have the right Node version. The entire setup step disappears, which is most valuable exactly when setting up would have been the largest part of the task.",
            },
            {
                title: "Learning with a runtime that actually runs",
                body: "Beginners see generated code execute immediately and can break it on purpose to find out what happens. The feedback loop is what teaches; a builder that only shows a finished preview hides the part worth learning from.",
            },
            {
                title: "Time-boxed builds where setup is the enemy",
                body: "Hackathons and one-day spikes, where hours spent on environment configuration are hours not spent on the idea. Bolt converts that overhead into build time, and the throwaway nature of the result means the token economics never get uncomfortable.",
            },
            {
                title: "Answering a technical question by trying it",
                body: "Does this library do what the README implies, does this API shape work, will this integration behave. Building a disposable app to find out is often faster than reading, and Bolt makes disposable genuinely cheap because nothing was set up to begin with.",
            },
            {
                title: "Demos that need to be real",
                body: "A working, deployed application for a client or stakeholder inside a single session. Paid plans remove Bolt branding and support a custom domain, which is the difference between showing a product and showing a tool you used.",
            },
        ],
        pricingDetail:
            "Bolt offers Free (1M tokens/month, 300K daily limit, no credit card, but Bolt branding and no custom domain), Pro ($25/mo or ~$22.50 annually, 10M+ tokens, no daily limit, token rollover for up to two months, custom domains, no branding), and Teams ($30/member/month). The crucial pricing mechanic: Bolt is token-based and most tokens are consumed syncing your project's files to the AI — so the larger your codebase, the more each message costs, independent of how small the edit is. Heavy users on bigger projects can exhaust even the Pro allotment, so budget by project size, not just message count.",
        faq: [
            {
                q: "What is a WebContainer and why does it matter here?",
                a: "It is StackBlitz's technology for running a Node environment inside the browser using WebAssembly, and it is the reason Bolt can execute your project rather than merely render it. Your code is not being run on a remote server that has to be provisioned for you; it runs locally in the tab, which is what makes starting instant and what makes the limits specific.",
            },
            {
                q: "What cannot run inside Bolt?",
                a: "Anything outside the JavaScript world, broadly. Non-JS runtimes, native binaries compiled for a host platform, containerised services, and a locally running database are not what this environment provides. Persistence comes from connecting an external service, and production hosting happens on a provider outside the tab. If your stack needs any of those, the sandbox is a wall rather than a convenience.",
            },
            {
                q: "Why do my tokens drain faster as the project grows?",
                a: "Because much of the consumption is keeping the AI aware of your project's files rather than processing your sentence. That means cost scales with codebase size, not edit size, and a trivial change to a mature project can be an expensive message. Budget by how big the project will get, and expect the tool to feel cheapest in exactly the early phase where it is also most fun.",
            },
            {
                q: "Bolt.new or Lovable?",
                a: "It comes down to who is sitting there. Bolt hands a developer a running project and expects them to steer, debug, and take over. Lovable is designed so that a non-developer never has to look at the code and has a guided path when things go wrong. If you can read a stack trace, Bolt gives you more control; if you cannot, it gives you a problem.",
            },
        ],
    },

    "windsurf-ide": {
        overviewHtml: `
            <p><strong>Windsurf</strong>, previously Codeium, is the closest thing <a href="/tool/cursor">Cursor</a> has to a direct rival, and almost everyone who evaluates one evaluates the other. Saying they are both good is technically true and completely useless, so this page is organised around the places they genuinely diverge — the agent's posture, the shape of the billing, where the company came from, and what an enterprise buyer can do with each. If none of those distinctions matter to you, the two products are close enough that you should pick on price and stop thinking about it.</p>

            <h3>Cascade wants a longer leash</h3>

            <p>Cascade is Windsurf's agent, and the difference from a competitor's agent is one of posture rather than capability. It is built around reading the codebase, forming a plan that spans several files, and then carrying that plan out as a sequence of steps you watch rather than approve one at a time. The product's centre of gravity is the multi-step run: describe an outcome, let it work, review what came back.</p>

            <p>Whether you like that depends on how you prefer to be wrong. A longer autonomous run gets further before you have to intervene, and when it has misunderstood something it gets further in the wrong direction too. Developers who work in outcomes tend to find this natural. Developers who work in increments, checking each edit as it lands, find it uncomfortable, and that discomfort is the real reason most Cursor-versus-Windsurf preferences are held so firmly with so little to point at.</p>

            <h3>Quotas instead of credits</h3>

            <p>Windsurf retired credit-based billing in favour of daily and weekly quotas, which is a meaningfully different experience even at a similar price. A credit pool invites you to price each request; a quota invites you to use what you have and stop when it is gone. Nothing accumulates, nothing carries over, and the reset is a date rather than a balance.</p>

            <p>The two failure modes are different and worth matching against yourself. Credits fail by making you hesitate. Quotas fail by ending your day — you are mid-task, the quota is exhausted, and there is nothing to do but wait or upgrade. If your work arrives in unpredictable bursts, a hard stop is worse than a slow drain. If you work steadily, a quota is the calmer of the two and removes an entire category of small decisions.</p>

            <p>Tab completion sits outside this entirely and does not draw down the quota, which makes the free tier genuinely usable as a permanent completion tool even though it is not usable as a permanent agent.</p>

            <h3>Where Windsurf and Cursor actually diverge</h3>

            <p>On editing, less than the discourse suggests. Both are VS Code-derived, both migrate your extensions and keybindings, both have a capable multi-file agent, and both change fast enough that any specific advantage described today may not survive the quarter.</p>

            <p>The durable differences are these: Windsurf's billing is quota-shaped where Cursor's is credit-shaped; Windsurf's agent is tuned for longer autonomous runs where Cursor's is more comfortable being interrupted; Windsurf ships plugins that put its assistance inside editors you already use, which Cursor by construction cannot; and Windsurf inherits an enterprise deployment story from its Codeium era that Cursor approached from the other direction. Our <a href="/compare/cursor-vs-windsurf-ide">Cursor vs Windsurf comparison</a> and the longer <a href="/blog/cursor-vs-windsurf">write-up on the same question</a> go through the day-to-day feel.</p>

            <h3>The ownership question that is not in any feature table</h3>

            <p>Windsurf went through one of the more turbulent corporate stretches in this market. A widely reported acquisition by OpenAI did not complete; Google then struck a licensing arrangement that brought over the company's founders and part of its research team; and Cognition, the company behind <a href="/tool/devin-ai">Devin</a>, acquired what remained. The product kept shipping throughout, which is the most relevant fact, but a buyer signing a multi-year commitment is entitled to weigh it.</p>

            <p>The reasonable reading is neither dismissal nor alarm. Windsurf is now part of a company whose own product is an autonomous coding agent, which suggests a coherent direction rather than a holding pattern. But if your procurement process asks about vendor stability — and for a tool this deep in the development workflow it should — this is the history you will be asked to explain, so know it before the meeting rather than during it.</p>

            <h3>You do not have to change editors</h3>

            <p>This is the option Cursor structurally cannot offer and it is underweighted in most comparisons. Windsurf's lineage as an editor extension means its assistance is still available as a plugin for other environments, including the JetBrains IDEs, rather than only inside its own editor. For a team that is standardised on JetBrains and has no intention of moving, that is the difference between a product they can evaluate and a product they cannot.</p>

            <p>The editor gets the newest and deepest version of the experience; the plugins are a narrower surface. But narrower and available beats better and unreachable when the alternative is asking forty engineers to change how they work.</p>

            <h3>The enterprise angle it inherited</h3>

            <p>Codeium built an enterprise business before Windsurf was an editor, and that history shows up as deployment options aimed at organisations that cannot send source code to a vendor's cloud — including self-hosted and hybrid arrangements. For a defence contractor, a bank, or anyone whose policy makes the usual answer a non-starter, this is a materially different conversation from the one you have with most tools in this category.</p>

            <p>Availability and terms in this area change, and it is not something to take on trust from a third party. If self-hosting is your reason for looking at Windsurf, confirm the current offering directly with the vendor before it becomes the basis of a decision.</p>

            <h3>Who should stay on Cursor, or skip both</h3>

            <p>Stay where you are if you are already productive in Cursor. The delta is not large enough to justify relearning an agent's habits, and switching costs are paid in attention rather than money.</p>

            <p>Skip Windsurf if you need serious agent use without paying, because the free quota is genuinely tight and you will meet it in days rather than weeks — Tab completion is the only part that is free in any sustained sense. Skip it if a hard stop mid-task is worse for you than a gradually emptying budget, since that is exactly what quota billing produces. Skip it if you want continuous supervision of every edit, because you will be working against the grain of a product designed for longer runs. And skip both this and Cursor if your problem is starting projects rather than maintaining them: <a href="/tool/bolt-new">Bolt.new</a> and <a href="/tool/v0-by-vercel">v0</a> are aimed at that, and <a href="/compare/bolt-new-vs-windsurf-ide">Bolt.new vs Windsurf</a> works through why the two categories rarely substitute for each other.</p>
        `,
        useCases: [
            {
                title: "Changes you would rather describe than perform",
                body: "A migration that touches a dozen files, a pattern applied consistently across a module, a refactor whose shape is obvious and whose execution is tedious. Cascade's plan-then-execute run is built for exactly this, and it is the work where watching an agent go for several minutes is less stressful than approving each step.",
            },
            {
                title: "Free completions as a permanent baseline",
                body: "Tab completion does not consume quota, so a developer who wants fast AI completions and nothing more can sit on the free tier indefinitely. That is a real, unusual offer in a market where the free tiers are mostly time-limited evaluations wearing a different name.",
            },
            {
                title: "A second agent for the change the first one got wrong",
                body: "Some developers keep both Windsurf and Cursor and hand a stuck task to the other one. The agents fail differently enough that this works more often than it should, and given what an hour of a senior engineer costs, the second subscription is not the expensive part of that arrangement.",
            },
        ],
        pricingDetail:
            "After the March 19, 2026 overhaul, Windsurf offers Free ($0, unlimited Tab autocomplete plus a light daily/weekly quota for Cascade and Chat), Pro ($20/mo, up from $15), Max ($200/mo), Teams ($40/user/mo), and Enterprise (custom), with 17–20% off on annual billing. The big change: the old credit system was retired in favor of daily and weekly quotas. The trap to know: the free quota realistically lasts only two to three days of active coding before it runs dry, so anyone using the agent seriously will need Pro quickly — Tab autocomplete is the only truly unlimited free feature.",
        faq: [
            {
                q: "What happened to Codeium?",
                a: "Codeium became Windsurf, moving from an autocomplete extension into a full AI editor built around the Cascade agent. If you used Codeium, Windsurf is its direct continuation rather than a separate product, and the extension lineage is why assistance is still available inside other editors today.",
            },
            {
                q: "Who owns Windsurf now, and should I care?",
                a: "After a reported OpenAI acquisition fell through and Google licensed technology in a deal that took the founders and part of the research team, Cognition — the company behind Devin — acquired the remainder. You should care to the extent that your procurement process asks about vendor stability, which for a tool embedded this deeply in daily development it reasonably should. The product has continued shipping, and Cognition's own focus on autonomous coding agents is at least a consistent direction. Ask the vendor directly about roadmap commitments if you are signing for multiple years.",
            },
            {
                q: "How far does the free tier actually go?",
                a: "Tab completion is unlimited and stays that way, which makes the free tier a legitimate permanent option for that one workflow. Cascade and chat run against a light daily and weekly quota that a developer using the agent in earnest will exhaust in a couple of days. Treat the free plan as either a completions tool forever or an agent trial briefly, but not as both.",
            },
            {
                q: "Windsurf or Cursor?",
                a: "Decide on two things rather than on feature lists. First, do you prefer an agent that runs longer before checking in, or one you interrupt constantly — Windsurf leans toward the former. Second, would you rather be slowed by a draining credit balance or stopped by an exhausted quota, because that is the actual difference in how the bills feel. If neither distinction moves you, they are close enough that price should decide it.",
            },
            {
                q: "Do I have to use the Windsurf editor to get Windsurf?",
                a: "No, and this is worth knowing if your team will not change editors. Windsurf offers plugins that bring its assistance into other environments including the JetBrains IDEs, a legacy of its life as an extension. The standalone editor is where the deepest version of the experience lives, but the plugin route makes the tool evaluable for teams that would otherwise have to decline on principle.",
            },
        ],
    },

    replit: {
        overviewHtml: `
            <p><strong>Replit</strong> is a browser-based development platform that combines a full coding environment, hosting, databases, and an AI agent into one place — no local setup required. Its 2026 identity centers on <strong>Replit Agent</strong>, which can build and deploy working applications from a prompt, making Replit a popular choice for people who want to go from idea to live app without configuring anything locally.</p>

            <p>The plan structure shifted in early 2026. <strong>Starter (Free)</strong> gives 1,200 minutes of development time per month, basic AI, one published app, and limited daily Agent credits — enough to learn and experiment. <strong>Core ($20/mo, or $25 monthly)</strong> unlocks full Replit Agent access, unlimited apps, more compute, and $25 in monthly usage credits. The old Teams plan is being replaced by a new <strong>Pro tier ($100/mo)</strong> for up to 15 builders with pooled credits, rolling out in February 2026.</p>

            <p>Its strength is being genuinely all-in-one and accessible. For education, hackathons, quick experiments, and non-developers building their first app, Replit removes every setup barrier — you open a browser tab and you are coding, with the Agent able to scaffold and deploy for you. The collaborative, run-anywhere nature is hard to match.</p>

            <p>The honest weaknesses: Replit combines subscription tiers with <strong>usage-based charges that frequently surprise people</strong>, especially on AI-intensive Agent work — the bill can climb beyond the base subscription faster than expected. The Agent, like all such tools, is probabilistic and makes mistakes, and for sustained professional engineering many developers still prefer a local setup with <a href="/tool/cursor">Cursor</a> or <a href="/tool/github-copilot">GitHub Copilot</a>. See <a href="/compare/cursor-vs-replit">Cursor vs Replit</a>.</p>

            <p>Who it is for: learners, educators, hackathon builders, and non-developers who want a zero-setup, all-in-one environment with an AI agent that can deploy. Who it is not for: professional teams doing sustained engineering (a local setup is usually better), or anyone who needs predictable costs and dislikes usage-based billing surprises.</p>
        `,
        useCases: [
            {
                title: "Zero-setup app building with Agent",
                body: "Replit Agent builds and deploys working apps from a prompt inside the browser. For non-developers and quick experiments, this removes all environment setup — you describe what you want and get a live, hosted result.",
            },
            {
                title: "Education and learning to code",
                body: "Replit's all-in-one browser environment is widely used in classrooms and self-teaching because there is nothing to install and projects are instantly shareable. Students code, run, and collaborate from any device.",
            },
            {
                title: "Hackathons and rapid experiments",
                body: "When speed matters, Replit's combination of editor, hosting, database, and Agent in one place lets teams ship a working prototype in hours. The instant deploy and collaboration make it a hackathon staple.",
            },
        ],
        pricingDetail:
            "Replit offers Starter (free, 1,200 dev minutes/month, basic AI, one published app, limited daily Agent credits), Core ($20/mo annually, $25 monthly — full Agent access, unlimited apps, more compute, $25 in monthly usage credits, custom domains, PostgreSQL), and a new Pro tier ($100/mo, up to 15 builders with pooled credits, one-month rollover) replacing the old Teams plan as of February 20, 2026. The major pricing trap: on top of the subscription, Replit charges usage-based fees that often surprise teams — AI-intensive Agent work can push the real monthly bill well beyond the base plan. Watch usage credits closely if you lean on the Agent.",
        faq: [
            {
                q: "Why is my Replit bill higher than the subscription price?",
                a: "Because Replit layers usage-based charges on top of the subscription. AI-intensive Agent work consumes usage credits, and once you exhaust your monthly allotment, additional usage is billed — which frequently surprises teams. If you rely heavily on the Agent, monitor your credit consumption closely.",
            },
            {
                q: "What is Replit Agent?",
                a: "Replit Agent is the AI that builds and deploys applications from a natural-language prompt, all within Replit's browser environment. It is powerful but probabilistic — it can make mistakes — so review its output rather than assuming it is correct, especially for anything important.",
            },
            {
                q: "Is the free Replit plan enough?",
                a: "For learning and small experiments, yes — Starter gives 1,200 dev minutes/month, basic AI, one published app, and limited Agent credits. Anyone building seriously or using the Agent heavily will need Core ($20/mo) for full access and more credits.",
            },
            {
                q: "Is Replit good for professional development?",
                a: "It is excellent for learning, prototyping, education, and quick deploys, but for sustained professional engineering many developers still prefer a local setup with a tool like Cursor or GitHub Copilot. Replit's strength is accessibility and all-in-one convenience, not heavy production workflows. See our Cursor vs Replit comparison.",
            },
            {
                q: "What happened to the Replit Teams plan?",
                a: "It is being replaced by a new Pro tier at $100/month, launched around February 20, 2026, supporting up to 15 builders with pooled credits, one-month credit rollover, and priority support. Existing Teams users were migrated to the new structure.",
            },
        ],
    },

    "gemini-code-assist": {
        overviewHtml: `
            <p><strong>Gemini Code Assist</strong> is the hardest tool in this category to evaluate on its own terms, because it is not really sold as a standalone coding assistant. It is the developer-facing edge of Google Cloud. Judged as an editor plugin it is competent and unremarkable; judged as the AI layer of a platform your infrastructure already runs on, it does something its competitors structurally cannot.</p>

            <h3>What "Google Cloud native" actually buys you</h3>

            <p>An editor-only assistant knows your files. That is a real advantage and it is also the whole extent of its context. Gemini Code Assist's paid Cloud tiers can reason about the environment your code deploys into — the services in your project, the shape of your data warehouse, the identity and permission model you are working against. The difference shows up on a specific class of question: not "write this function" but "why does this service account not have access to that bucket", or "write the query against the table we actually have".</p>

            <p>This is why the tool's value is so uneven across teams. If your work involves Cloud Run, BigQuery, IAM policies, and Terraform aimed at GCP, the assistant is operating with information no other tool has. If you are writing a React frontend that talks to an API, it is just another model in a sidebar.</p>

            <h3>The free individual tier, and the Antigravity cutover</h3>

            <p>The free tier for individuals was, for a long time, the most generous offer in serious AI coding assistance — up to 6,000 code-related requests and 240 chat requests per day, which is more headroom than most developers can consume. It made a capable assistant available to students, hobbyists, and anyone who could not justify a subscription.</p>

            <p>That offer is in transition. Google announced that the Gemini Code Assist IDE extensions and the Gemini CLI would stop serving the individual, Google AI Pro, and Google AI Ultra tiers as of June 18, 2026, directing those users to <strong>Antigravity</strong> and the Antigravity CLI. That date has now passed, so anyone evaluating the individual tier should verify its current state directly with Google rather than relying on any third-party summary, including this one. The paid Standard and Enterprise tiers aimed at Google Cloud organisations were not part of that announcement.</p>

            <h3>In the IDE: completions, chat, and the boring parts</h3>

            <p>Day to day it does what you expect: inline completions, a chat panel that can see your open files, explanations of unfamiliar code, and generation of tests and boilerplate. It plugs into VS Code and the JetBrains editors as well as Google's own Cloud Shell Editor and Cloud Workstations, so a team already standardised on Google's development environments gets it without adopting a new editor.</p>

            <p>It has also extended outward from the editor into code review on pull requests, which is where a lot of teams first encounter it without having made a purchasing decision at all.</p>

            <h3>Where it sits against Copilot and Cursor</h3>

            <p>The comparison resolves cleanly along one axis: how much of your problem is inside the codebase versus inside the platform. <a href="/tool/cursor">Cursor</a> is the more advanced editor, with better multi-file agentic editing and a faster pace of iteration on the editing experience itself — see <a href="/compare/cursor-vs-gemini-code-assist">Cursor vs Gemini Code Assist</a> for the detail. <a href="/tool/github-copilot">GitHub Copilot</a> has the deepest integration with the place most code actually lives, and if your org's centre of gravity is GitHub rather than GCP, that gravity usually wins.</p>

            <p>Gemini Code Assist's counterargument is not "we are a better editor". It is that the expensive questions in a cloud-heavy codebase are not editing questions, and that an assistant which can see the running environment answers them more usefully. Whether that is worth a seat depends entirely on how much of your week is spent on infrastructure rather than application logic. For background on the models underneath, our <a href="/blog/gemini-3-pro-deep-dive">Gemini deep dive</a> covers the family in more depth.</p>

            <h3>Procurement, licensing, and what happens to your code</h3>

            <p>For enterprise buyers this is frequently the deciding section rather than a footnote. The paid tiers are administered like the rest of Google Cloud — the same billing account, the same org policies, the same identity system — which removes an entire procurement exercise for a company that is already a Cloud customer. Google has also offered indemnification covering generative output for Code Assist, which is the kind of assurance legal teams ask about before an engineering team is allowed to turn anything on.</p>

            <p>Data handling differs by tier and is worth reading rather than assuming: the terms that apply to a free individual account are not the terms that apply to a paid Cloud deployment, and the opt-out settings differ. Confirm the current policy with your account team before a rollout, particularly if you are in a regulated industry.</p>

            <h3>When not to pick Gemini Code Assist</h3>

            <p>Skip it if you are not on Google Cloud. Almost the entire argument for the tool is the platform integration, and without that you are choosing a mid-pack assistant over more mature alternatives for no reason. Skip it if you want a state-of-the-art agentic editor that plans and executes multi-file changes with minimal supervision — that is where <a href="/tool/cursor">Cursor</a> and <a href="/tool/windsurf-ide">Windsurf</a> have been iterating hardest. Skip it if your code lives in GitHub and your workflow is organised around pull requests, where Copilot's integration is simply closer to the work.</p>

            <p>And be careful about building an individual workflow on the free tier right now. The announced transition to Antigravity means the individual-tier experience is in motion, and "free and generous" is a weak foundation if the product underneath you is changing shape. Organisations on the paid Cloud tiers are in a considerably more stable position.</p>
        `,
        useCases: [
            {
                title: "Cloud-heavy backend and platform work",
                body: "Teams working in Cloud Run, BigQuery, Pub/Sub, IAM, and GCP-targeted Terraform get suggestions grounded in the project's actual resources rather than a generic guess at what the environment looks like. This is the tool's one genuinely defensible advantage, and it is decisive for the people it applies to.",
            },
            {
                title: "Standardising on a single vendor's AI",
                body: "Organisations already committed to Google across Cloud and Workspace often prefer one billing relationship, one identity model, one set of admin controls, and one legal review over assembling a best-of-breed stack. The integration argument here is as much about procurement and governance as it is about the model.",
            },
            {
                title: "Everyday completions and code explanation",
                body: "Inline suggestions, a chat panel with file context, test generation, and explaining code someone else wrote — the ordinary work any assistant handles. Worth naming plainly because it is what most of the usage actually is, and because it is the part where Gemini Code Assist is comparable to its rivals rather than differentiated from them.",
            },
        ],
        pricingDetail:
            "Gemini Code Assist offers a Free tier for individuals (up to 6,000 code requests and 240 chat requests per day on Gemini models), Standard (~$19–22.8/user/mo), and Enterprise (~$45–54/user/mo) with full Google Cloud integration, plus 17% off annually. The critical thing to know before adopting it as an individual: Google announced that Gemini Code Assist IDE extensions and the Gemini CLI would stop serving the individual, Google AI Pro, and Google AI Ultra tiers as of June 18, 2026, directing those users to Antigravity and the Antigravity CLI. That date has passed, so confirm the individual tier's current state against Google's own documentation before planning around it. The paid Cloud-oriented tiers were not part of that announcement.",
        faq: [
            {
                q: "What is the status of the individual tier and Antigravity?",
                a: "Google announced that the Gemini Code Assist IDE extensions and the Gemini CLI would stop serving the individual, Google AI Pro, and Google AI Ultra tiers as of June 18, 2026, and directed those users to Antigravity and the Antigravity CLI. That date has passed, so check Google's own documentation for the current state before planning around the individual tier. The paid Standard and Enterprise tiers for Google Cloud organisations were not part of that announcement.",
            },
            {
                q: "Does it really know about my Google Cloud project?",
                a: "On the paid Cloud tiers, yes — that awareness of your services, resources, and data is the product's central claim, and it is why questions about permissions, deployments, and queries against your own schema get better answers than a generic assistant can give. The Enterprise tier extends this further by grounding suggestions in your private repositories. On the free individual tier you are getting a capable general assistant, not this.",
            },
            {
                q: "Is it worth using if we are not on Google Cloud?",
                a: "Rarely. Strip out the platform integration and what remains is a competent assistant competing against tools that have iterated harder on the editing experience. Teams outside the Google ecosystem are generally better served by Cursor for agentic editing or GitHub Copilot for tight integration with where their code already lives.",
            },
            {
                q: "What happens to our code — is it used for training?",
                a: "This differs by tier and is the wrong thing to take on trust from a review. The terms governing a free individual account are not the terms governing a paid Google Cloud deployment, and the available opt-out settings differ between them. Read the current data-use documentation for the specific tier you intend to buy, and if you are in a regulated industry, get it confirmed by your account team in writing before rollout.",
            },
        ],
    },

    jira: {
        overviewHtml: `
            <p><strong>Jira</strong> is the tool people complain about while renewing it, and both halves of that sentence are informative. The complaints are real and they are mostly accurate. The renewals are also rational, because the organisations that keep paying are usually the ones where the alternative is not a lighter tracker but an inability to answer a question someone external is entitled to ask.</p>

            <p>So this page does not argue that Jira is good or bad. It argues that Jira is the correct answer to one specific condition — a process you did not get to design — and the wrong answer to almost everything else.</p>

            <h3>What "heavy" actually means, concretely</h3>

            <p>The word gets thrown around without content, so here is the content. Jira is heavy in four distinguishable ways, and only some of them apply to any given installation.</p>

            <p>It is heavy at the interface: more fields, more screens, more clicks between intending to file something and having filed it. It is heavy at the data model: a project carries workflow schemes, screen schemes, field configurations, permission schemes and notification schemes, each of which can be shared across projects or not. It is heavy at the process layer, because everything the data model allows, some team has turned on. And it is heavy administratively, because all of the above has to be maintained by a person as teams reorganise.</p>

            <p>A small team that creates one project and never touches a scheme experiences almost none of this. A team that joins a company with six years of accumulated configuration experiences all of it on day one. When someone says Jira is slow and bloated, ask which of the four they mean, because two of them are the vendor's fault and two of them are the previous administrator's.</p>

            <h3>Someone has to own the configuration</h3>

            <p>This is the cost people forget to budget. Configurability is not free capability; it is capability that requires a maintainer. In practice that means a named person — an internal admin, a platform team, or a consultant on retainer — who owns workflows, permissions and the field taxonomy, and who says no to requests that would make the instance worse.</p>

            <p>Instances without that person degrade in a recognisable way. Required fields accumulate because someone once wanted a report. Workflow states multiply until nobody can explain the difference between two of them. Automation rules fire in unexpected combinations. None of this is a defect in the software; it is what happens to a configurable system with no owner, and it is the single best predictor of whether a team will describe Jira as powerful or as a swamp.</p>

            <h3>Where Jira wins outright</h3>

            <p>Jira is the right tool when the workflow is specified by someone who is not on your team and the specification has consequences. Regulated development where a change has to show review, approval and test evidence in a fixed order. Safety-relevant engineering where traceability from requirement to implementation to verification has to be reconstructable years later. Organisations under audit obligations where "we followed the process" has to be demonstrated rather than asserted. Customer contracts that dictate escalation paths and response handling.</p>

            <p>In every one of those cases, the ability to enforce a workflow — to make a transition impossible unless conditions are met, and to record who did what and when — is the entire purchase. Lighter trackers do not merely make this harder; most of them have deliberately declined to build it, because enforcement is exactly the weight they were trying to shed.</p>

            <h3>The ecosystem is an asset and a lock-in at once</h3>

            <p>Jira sits inside Atlassian's other products and a large third-party marketplace, and this is genuinely useful: requirements written in Confluence that link both ways, code branches in Bitbucket that attach to issues, and marketplace apps that cover gaps the base product leaves.</p>

            <p>Be honest about the second effect, though. Marketplace apps become load-bearing quietly. A team adds one for time reporting, another for a specific chart an executive likes, a third for test management, and eighteen months later a migration proposal has to account for four vendors rather than one. Track which apps are load-bearing, because that list is your actual switching cost, not the issue export.</p>

            <h3>Migration is the expensive part, in both directions</h3>

            <p>Getting issues out of Jira is straightforward. Getting the process out is not. Workflows, permission schemes, automation rules and the reports built on top of custom fields do not have equivalents in a tool that deliberately lacks those concepts, so a migration to something lighter is usually a process redesign wearing a migration's clothes.</p>

            <p>The same applies in reverse, which is the part teams underestimate when they consolidate onto Jira. Importing another tracker's issues is easy; deciding how its conventions map onto schemes is where the weeks go. Budget the design work explicitly in either direction and the project stops surprising people.</p>

            <h3>The AI features are not the reason to buy it</h3>

            <p>Assisted issue drafting, summarisation and natural-language queries are now present across this entire category at a broadly similar level, so they do not distinguish Jira from anything else on this list. What is worth checking before planning around them is which tier they sit in, since that placement has been revised more than once and a feature you assumed was included may sit a plan above where you are.</p>

            <p>The AI capability that would actually matter here is different from what is generally shipped: not drafting issues faster, but reading six years of accumulated configuration and telling you which of it is dead. Nobody has solved that, and it is the problem large instances actually have.</p>

            <h3>When to pick Linear, Monday or Asana instead</h3>

            <p>Pick <a href="/tool/linear">Linear</a> when your team owns its own process and nobody outside it needs to inspect the procedure. You are trading enforcement for speed, and if there is nothing to enforce, the trade is free.</p>

            <p>Pick <a href="/tool/monday">Monday</a> when the work is not software. Marketing calendars, client delivery and operations queues can be modelled in Jira, and the result is always a worse version of a tool built for that audience, maintained by an engineer who resents it.</p>

            <p>Pick <a href="/tool/asana">Asana</a> when the reporting audience is executive rather than operational — when the recurring question is how a portfolio of initiatives is tracking across departments, not what happened to a specific ticket. Jira can produce that view with enough configuration, which is precisely the problem. <a href="/tool/clickup">ClickUp</a> is the middle option for organisations that want one system for both and will accept interface density in exchange.</p>

            <p>And do not pick Jira because it is what everyone uses. That reasoning is how instances acquire their first thousand unnecessary fields.</p>
        `,
        useCases: [
            {
                title: "Development under an external process obligation",
                body: "Regulated, safety-relevant or contractually-governed work where transitions must be gated and the audit trail has to be reconstructable later. This is the case where Jira's weight is the product rather than a side effect, and where lighter trackers are not a cheaper option but a non-option.",
            },
            {
                title: "Coordinating work across many teams and projects",
                body: "Dependency mapping, cross-project hierarchies and roll-up views for organisations where one initiative touches several groups with different workflows. The value comes from those groups not having to share a process, which is exactly what an opinionated tracker refuses to allow.",
            },
            {
                title: "Service desks and intake with enforced handling",
                body: "Requests arriving from outside engineering with response expectations, escalation paths and queue ownership attached. Enforcement and recording matter more than interface speed here, and this is often the workload that justifies the instance for the rest of the company.",
            },
            {
                title: "Consolidating trackers after an acquisition",
                body: "When several groups arrive with incompatible conventions, a tool that can express all of them without forcing one team's process onto another is the pragmatic choice. Plan for the mapping design to take longer than the data import, because it always does.",
            },
        ],
        pricingDetail:
            "Jira has four tiers: Free (up to 10 users, scrum/kanban boards, agile reporting, custom workflows, 2GB storage), Standard (~$7.91/user/mo, more scale and permissions), Premium (~$14.54/user/mo), and Enterprise (custom). Two structural points matter more than the per-seat figure. First, the AI features and the advanced planning views sit in the upper tiers rather than the lower ones, so check which tier carries the specific capability you are planning around before you budget. Second, marketplace apps are billed separately and scale with your user count, so an instance that depends on several of them can cost meaningfully more than the plan price suggests. Atlassian revises tier contents and self-managed licensing regularly, so treat any figure quoted outside its own pricing page as indicative only.",
        faq: [
            {
                q: "Is Jira too complex for a small team?",
                a: "Usually, yes — but for a reason worth stating precisely. A small team creating one project with default settings does not experience much complexity at all. The complexity arrives with accumulated configuration, and a small team has neither accumulated any nor has anyone to maintain it later. If nobody outside your team dictates your process, you are paying for enforcement you will never use.",
            },
            {
                q: "Do we need a dedicated Jira administrator?",
                a: "Any instance that will still be running in three years needs a named owner, even part-time. The role is less about configuring things than about declining to configure things: keeping the field taxonomy small, keeping workflow states meaningful, and retiring what a reorganisation left behind. Instances without that person do not fail dramatically, they just become slowly unusable.",
            },
            {
                q: "Jira or Linear?",
                a: "Ask who owns the process. If your team designs its own workflow, Linear removes friction you are currently paying for. If the workflow is imposed from outside and compliance with it has to be demonstrable, Linear has deliberately not built the enforcement you need. Preference for one interface over another is a real consideration but it is the tiebreaker, not the decision.",
            },
            {
                q: "Can we use Jira for non-engineering teams?",
                a: "You can, and it works well for intake and service-style queues where enforcement matters. It works badly for marketing calendars, campaign planning and client delivery, where the audience wants a visual surface and no vocabulary lessons. Forcing those teams in usually produces a shadow spreadsheet within a quarter, which is worse than having chosen a second tool on purpose.",
            },
            {
                q: "How bad is migrating away from Jira?",
                a: "The issue data moves easily. The process does not. Workflows, permission schemes, automation and any reporting built on custom fields have no equivalent in tools that deliberately lack those concepts, so the migration is really a process redesign. Add to that any marketplace apps that have become load-bearing, since each one is a separate vendor to unwind.",
            },
            {
                q: "Is the free plan usable?",
                a: "For a genuinely small group, yes — boards, agile reporting and custom workflows are all present. Treat it as an honest trial rather than a destination, since the constraints that push teams to pay are user count and storage rather than feature crippling, and both arrive without warning.",
            },
            {
                q: "Are the AI features a reason to upgrade?",
                a: "On their own, no. Assisted drafting, summarising and natural-language search now exist across every tool in this category at a comparable level, so they should not move a platform decision. If you are upgrading, upgrade for the planning, permission or governance capability in the tier and treat the AI as something that came in the box.",
            },
            {
                q: "Why does Jira have such a bad reputation if so many teams use it?",
                a: "Because most people encounter it as a user of someone else's configuration. The experience that generates the complaints — twelve required fields, states nobody can define, a board that loads slowly because it queries half the instance — is the output of years of unowned accumulation rather than of the product's defaults. That distinction matters when you are choosing, because you are choosing whether to take on the maintenance, not just the software.",
            },
        ],
    },

    clickup: {
        overviewHtml: `
            <p><strong>ClickUp</strong> does not really compete on features, even though it has more of them than almost anything else in its category. It competes on a proposition: that one workspace holding tasks, documents, goals, dashboards, whiteboards, and an AI layer called <strong>ClickUp Brain</strong> is better than five specialised tools that each do their own job well. Everything anyone likes or dislikes about ClickUp follows from whether that proposition holds for their team.</p>

            <h3>One tool instead of six: the trade</h3>

            <p>The case for consolidation is real and usually understated. Work that lives in one system does not need to be reconciled across systems. A task, the document explaining it, the goal it rolls up to, and the dashboard reporting on it are the same objects rather than four representations that drift apart. Nobody has to ask which tool is authoritative. Procurement signs one contract, and onboarding covers one product.</p>

            <p>The cost is equally real. A tool that does eight things does none of them as sharply as the product built to do only that thing, and the gap shows up exactly where a team is most opinionated. Engineers used to a fast, keyboard-driven issue tracker notice the difference immediately. Writers who live in a polished document editor notice it too. Consolidation trades peak quality in each function for coherence across all of them, and the right answer depends on whether your team's pain is "our tools are excellent but disconnected" or "each of our tools is mediocre".</p>

            <p>There is a third cost that rarely makes it into the evaluation: configuration. ClickUp's flexibility means it does not arrive with an opinion about how you work, so someone has to supply one. Teams that adopt it without designating an owner for the workspace structure end up with a system where every team invented different statuses, custom fields multiplied, and nobody trusts the dashboards — which is the same fragmentation they were trying to escape, now inside a single product.</p>

            <h3>Brain is a separate line item</h3>

            <p>The most common budgeting surprise with ClickUp is that the AI is not part of the plan you just priced. ClickUp Brain — the writing, summarizing, AI fields, and agent features — is an add-on charged per seat on top of whatever workspace tier you are on, including the free one. For a team that is evaluating ClickUp specifically because of its AI features, the real per-seat cost is the plan plus Brain, which can be close to double what the pricing page's headline number suggests.</p>

            <p>This is worth modelling before a rollout rather than after, because it changes the comparison. ClickUp's workspace tiers undercut most competitors on raw capability per dollar; ClickUp plus Brain lands in a different bracket where it is competing against tools with AI included. Both comparisons are legitimate — just make sure you are running the one that matches what you are actually going to buy.</p>

            <h3>When a dedicated tool beats the all-in-one</h3>

            <p>Do not consolidate onto ClickUp if your team's core workflow is the thing it would be replacing. Engineering organisations with a strong opinion about how issues should move generally prefer <a href="/tool/linear">Linear</a>, whose entire design is a refusal to be configurable — and if you want to understand why that refusal appeals to people, our write-up of <a href="/blog/linear-method-explained">the Linear method</a> covers the reasoning. Large enterprises with deep release, compliance, and reporting requirements stay on <a href="/tool/jira">Jira</a> because the ecosystem around it is the actual product. Teams whose centre of gravity is writing and knowledge rather than task state are happier in <a href="/tool/notion-ai">Notion</a>.</p>

            <p>Skip it as well if nobody will own the configuration, if your team's tolerance for a dense interface is low, or if you are buying it to solve a process problem. ClickUp will faithfully implement a broken process at greater speed and with better dashboards. And be cautious about very large, heavily customised workspaces: the same breadth that makes the product capable makes it heavier than a focused tool, and performance is something to test against your real data volume before committing a large team. Teams weighing the middle ground usually also look at <a href="/tool/asana">Asana</a> and <a href="/tool/monday">Monday.com</a>, both of which sit closer to a defined opinion than ClickUp does.</p>
        `,
        useCases: [
            {
                title: "Collapsing tool sprawl into one workspace",
                body: "The reason most teams arrive: separate subscriptions for tasks, documents, goals, and reporting that nobody has fully reconciled, plus the recurring argument about which one is authoritative. ClickUp genuinely covers all of those surfaces at once, and for teams whose problem is fragmentation rather than depth, that is the whole value proposition.",
            },
            {
                title: "Processes that refuse to fit a standard board",
                body: "Custom views, fields, statuses, and automations let a team model an unusual workflow instead of bending it to fit someone else's template — agencies tracking client deliverables, operations teams running approval chains, anything where the stages are specific to the business. This flexibility is why ClickUp wins deals that more opinionated tools cannot, and it is also why an unowned ClickUp workspace degrades so quickly.",
            },
        ],
        pricingDetail:
            "ClickUp has four core tiers: Free Forever ($0, unlimited tasks and members but 100MB storage), Unlimited ($7/user/mo annually, the value sweet spot with unlimited storage, dashboards, Gantt), Business ($12/user/mo annually, $19 monthly — adds 250+ automations, workload views, SSO), and Enterprise (custom), with a Business Plus option around $19. The critical pricing trap: ClickUp Brain (AI) is NOT included in any workspace plan — it is a separate add-on at roughly $7–9/user/mo (with an Everything AI option around $28). A team expecting AI should budget the plan price plus Brain, which can nearly double the per-seat cost. Annual billing saves 30–40%.",
        faq: [
            {
                q: "Is AI included in ClickUp's plans?",
                a: "No — this is the most important pricing catch. ClickUp Brain is a separate add-on charged per seat on top of any workspace plan, including Free. A team that wants AI features needs to budget the plan price plus Brain, which can nearly double the per-seat cost, so run your comparison against competitors using that combined number rather than the headline tier price.",
            },
            {
                q: "Which ClickUp plan is the best value?",
                a: "For most teams, Unlimited at $7/user/month — it adds unlimited storage, dashboards, and Gantt charts at a price that undercuts most competitors. The Free tier is genuinely usable but its 100MB storage cap is hit quickly once you attach files.",
            },
            {
                q: "Is ClickUp hard to learn?",
                a: "It can be, and the difficulty is less about the interface than about the decisions. ClickUp has no strong opinion about how you should work, so a team has to make dozens of small structural choices before the tool feels coherent. Teams that assign one person to own the workspace design get through this; teams that let everyone configure their own corner tend to stay confused.",
            },
            {
                q: "ClickUp or Notion?",
                a: "It depends on whether your work is mostly state or mostly prose. ClickUp is a structured project-management platform first — tasks, dashboards, timelines — with documents attached. Notion is a documents-and-databases workspace with project management layered on. Pick by asking where your team already spends its day, because the tool you choose for the other job will always feel like a compromise.",
            },
            {
                q: "Should an engineering team use ClickUp instead of Linear or Jira?",
                a: "Usually not, if engineering is the primary user. Linear wins on speed and a deliberately narrow opinion about how issues move; Jira wins on ecosystem depth and enterprise reporting. ClickUp makes more sense when engineering is one of several functions sharing a workspace and the value of everyone being in the same system outweighs having the best possible issue tracker.",
            },
            {
                q: "How hard is it to leave ClickUp later?",
                a: "Harder than getting in, which is true of every all-in-one but worth planning for. Tasks and fields generally export, but the things you built inside ClickUp — automations, dashboards, document structure, cross-object relationships — do not have an equivalent to import into somewhere else. The more deeply you customise, the more of the migration cost is rebuilding logic rather than moving data. Run a trial export early so you know what the escape looks like before you depend on it.",
            },
            {
                q: "Does ClickUp slow down in large workspaces?",
                a: "Some users report it, particularly in large workspaces with heavy customisation, many automations, and large dashboards. It is not universal and the product has improved, but the pattern is consistent enough that the sensible move is a pilot with realistic data volume and view complexity rather than a small clean test space that will not reproduce the problem.",
            },
        ],
    },

    asana: {
        overviewHtml: `
            <p><strong>Asana</strong> is bought for a reason its feature list does not advertise. Organisations rarely adopt it because their teams need somewhere to put tasks — they already have somewhere, usually three somewheres. They adopt it because somebody senior cannot get a trustworthy answer to the question "how are our priorities actually tracking", and Asana is structured around producing that answer.</p>

            <p>That makes it a different kind of purchase from the tools it is usually listed beside, and it fails for a different reason too.</p>

            <h3>It is a reporting instrument before it is a task list</h3>

            <p>The parts of Asana that justify its price are the upper ones: goals, portfolios, workload and the roll-ups built on them. A goal is meant to be a durable statement of intent that individual projects roll into, so that progress on the goal is derived from work rather than typed in by whoever prepares the slide.</p>

            <p>Compare that to an issue tracker, which is built bottom-up: the issue is the atom, and anything resembling a portfolio is assembled afterwards from queries. Asana is built top-down, and the task exists partly so that something above it has a number. This is not a criticism. It is the correct architecture for the problem it is solving, and it is the reason engineers who evaluate it on task-level ergonomics come away unimpressed — they are inspecting the foundation and reporting that it is not a nice room.</p>

            <h3>Goals and portfolios only work if the bottom is honest</h3>

            <p>Here is the failure mode, and it is close to universal in unsuccessful rollouts. Leadership adopts Asana for visibility. Teams keep doing their real work where they were already doing it. Somebody is then asked to keep Asana updated for reporting purposes, which turns it into a second system maintained for an audience rather than a first system used by practitioners.</p>

            <p>A derived number computed from data nobody maintains is worse than no number, because it is believed. Executives make calls on a dashboard that reflects how recently someone remembered to tick a box. If you cannot answer the question "where does a person actually doing this work spend their day", buying portfolio reporting will produce confident fiction, and the tool will get the blame for a rollout decision.</p>

            <h3>Rollout is the hard part, not configuration</h3>

            <p>Asana is not difficult to set up, and that is misleading. The difficult work is social: getting the teams whose data feeds the roll-up to treat it as the place the work lives, which means giving them something in return. Usually that is the removal of a status meeting, a weekly report, or a recurring request for an update — and it has to be an actual removal, not a promise.</p>

            <p>Rollouts that skip this step follow a recognisable arc. Adoption is high in the first month because it is new, drops in the second, and by the fourth the portfolio view is stale enough that leadership stops trusting it and reinstates the status meeting. The tool did nothing wrong at any point in that sequence.</p>

            <h3>Why it loses to a tracker in engineering</h3>

            <p>Engineering teams reject Asana for reasons that are specific and worth naming rather than dismissing as preference. There is no equivalent of the tight branch, commit and review loop that a developer tracker provides. Filing is heavier than engineers will tolerate for the volume of small items they generate. The vocabulary is task-and-project rather than issue-and-cycle. And the cadence model does not match how a team that ships continuously actually plans.</p>

            <p>The pragmatic arrangement in most mid-size companies is not to win that argument. Engineering keeps its tracker; Asana carries the initiative-level record that the rest of the company reads, with a link between them. Trying to collapse both into one system is how you end up with a portfolio nobody updates.</p>

            <h3>The overlap with Monday is real, and the difference is temperament</h3>

            <p>Asana and <a href="/tool/monday">Monday</a> can both do most of what the other does, so comparing capability lists will not separate them. The difference is what each optimises when forced to choose. Monday optimises the operator's daily surface: visual, immediate, shaped by whoever owns the board. Asana optimises the structure above the work: consistent objects, goals that roll up, portfolios that mean the same thing in two departments.</p>

            <p>The practical test is who complains after three months. If it is the people doing the work, saying the tool is fussy, you probably wanted Monday. If it is the people reading the reports, saying they cannot compare two departments, you probably wanted Asana.</p>

            <h3>When to pick Linear, Jira or Monday instead</h3>

            <p>Pick <a href="/tool/linear">Linear</a> when the users are engineers and the reporting audience is the team itself. Pick <a href="/tool/jira">Jira</a> when a process has to be enforced and evidenced rather than merely tracked, which Asana does not attempt. Pick <a href="/tool/monday">Monday</a> when the buyer is a department head who wants a visual system running this week and nobody upstairs is asking for cross-department comparability. And pick <a href="/tool/clickup">ClickUp</a> if you genuinely want one dense system for everything and will accept the interface that comes with that ambition.</p>

            <p>Finally, do not buy Asana to solve a prioritisation problem. If leadership has not decided what matters, a portfolio view will render the indecision in a nicer typeface and change nothing else.</p>
        `,
        useCases: [
            {
                title: "Giving leadership a derived view of initiatives",
                body: "Goals and portfolios that compute progress from projects instead of from a manually-prepared slide. This is the purchase justification in most organisations, and it only holds if the underlying projects are genuinely maintained by the people doing the work.",
            },
            {
                title: "Coordinating work that crosses departments",
                body: "Launches, campaigns and programmes where marketing, operations, legal and product each own a piece with dependencies between them. Consistent project structure across functions is what makes the handoffs legible, and it is the thing ad-hoc boards lose first.",
            },
            {
                title: "Replacing a recurring status meeting",
                body: "The rollout tactic that determines whether adoption survives. Teams maintain the record because doing so removes an obligation they already resent; if nothing is removed in exchange, the data goes stale and the reporting above it becomes fiction.",
            },
            {
                title: "Workload and capacity conversations",
                body: "Seeing who is committed to what across several projects before adding another one. The value is in the argument it enables with a stakeholder, not in the chart itself, and it depends on estimates being entered with some consistency.",
            },
            {
                title: "Structured intake for a shared service team",
                body: "Forms that turn requests from the rest of the company into tasks with owners and required fields, so a design, legal or IT group stops being managed through direct messages. Modest, unglamorous, and often the part of the deployment people actually thank you for.",
            },
        ],
        pricingDetail:
            "Asana offers Personal (free, up to 10 users, with basic features but no timelines, goals, or automations), Starter ($10.99/user/mo annually — timeline and Gantt views, unlimited automations, dashboards and forms), Advanced ($24.99/user/mo annually — goals, portfolios, workload and advanced integrations), and Enterprise tiers (custom). The structural point that decides most purchases: the capabilities Asana is actually bought for — goals, portfolios and workload — sit in the Advanced tier and above, so the Starter price is rarely the price a company reporting to an executive audience ends up paying. AI capabilities are distributed across tiers with usage allowances that Asana has revised more than once, so check the current plan comparison before assuming a given AI feature is included at your level.",
        faq: [
            {
                q: "Is Asana worth it if teams already have their own tools?",
                a: "It depends entirely on whether those teams will maintain their work in Asana as the primary record. If they will, the roll-up above it is genuinely valuable and hard to get any other way. If they will not, you are buying a second system that someone updates for reporting purposes, and a derived number computed from stale data is more dangerous than no number at all.",
            },
            {
                q: "Which tier do we actually need?",
                a: "Most organisations buying Asana for the reason they think they are buying it need goals, portfolios and workload, which sit above the entry tier. If the entry tier looks sufficient on paper, it is worth checking whether what you actually wanted was a lighter tool — a team that only needs projects and tasks is not yet the customer Asana is designed for.",
            },
            {
                q: "Can engineering use Asana as its tracker?",
                a: "It can be made to work and it rarely survives. Engineers reject it for concrete reasons: no tight loop with branches and reviews, heavier filing than the volume of small items justifies, and a cadence model that does not match continuous shipping. The arrangement that holds in practice is engineering keeping its own tracker while the initiative-level record the rest of the company reads lives in Asana.",
            },
            {
                q: "Why do Asana rollouts fail?",
                a: "Almost always the same way: it is introduced as a visibility requirement from above without removing any existing obligation below. Adoption spikes, decays over a couple of months, and the portfolio view becomes stale enough that leadership stops trusting it. Successful rollouts trade something away — a status meeting, a weekly report, a recurring update request — and make the trade visible to the people being asked to change.",
            },
        ],
    },

    gamma: {
        overviewHtml: `
            <p><strong>Gamma</strong> is an AI-native tool for creating presentations, documents, and webpages from a prompt. Instead of starting with a blank slide and fighting alignment and formatting, you describe what you want and Gamma generates a polished, on-brand deck you then refine in an editor designed around AI rather than around traditional slide software. It is one of the clearest answers to "I need a good-looking presentation and I don't want to spend hours in PowerPoint."</p>

            <p>The pricing runs on AI credits. <strong>Free</strong> gives 400 one-time credits — enough to generate a handful of real presentations — with Gamma branding on your work. <strong>Plus ($12/mo, or $8 annually)</strong> removes the branding, gives 1,000 refreshing monthly credits, unlocks better image models, and doubles the cards-per-prompt limit. <strong>Pro ($25/mo, or $15 annually)</strong> adds premium AI models, API access, custom fonts, analytics, and 4,000 monthly credits. Team and Business tiers add shared themes and admin controls.</p>

            <p>Its strength is speed to a good-looking result. For anyone who needs a presentation, pitch, or one-page site fast and values design polish without design skill, Gamma's prompt-to-deck flow is genuinely faster than building manually, and the default output looks intentional rather than templated-cheap.</p>

            <p>The honest weaknesses: it offers less fine-grained control than PowerPoint or Keynote, so designers who want pixel-level control can find it limiting, and at scale its output can take on a recognizable "Gamma look." The credit system also meters generation — heavy users on Free or Plus can run out, and credits generally do not roll over. For polished marketing graphics outside the deck format, <a href="/tool/canva">Canva</a> is more versatile. </p>

            <p>Who it is for: founders, marketers, and professionals who need good-looking presentations and docs fast without slide-software fiddling. Who it is not for: designers who want precise control over every element, or heavy users who would chafe at the credit limits and the recognizable default style.</p>
        `,
        useCases: [
            {
                title: "Fast presentation generation",
                body: "Gamma's core: describe a topic and get a polished, on-brand deck in moments, then refine it. For pitches, internal updates, and client presentations, it removes the slow, fiddly part of slide-building while producing something that looks intentional.",
            },
            {
                title: "Pitch and sales decks",
                body: "Founders and sales teams use Gamma to produce investor and sales decks quickly, iterating on structure and design through prompts rather than manual formatting. The polished defaults make early drafts presentable without a designer.",
            },
            {
                title: "One-page sites and documents",
                body: "Beyond slides, Gamma generates webpages and documents from prompts, letting users publish a simple landing page or a formatted doc without separate tools. It is a fast path to a shareable, good-looking page.",
            },
        ],
        pricingDetail:
            "Gamma runs on AI credits: Free ($0, 400 one-time credits, Gamma branding), Plus ($12/mo or $8 annually — 1,000 refreshing monthly credits, no branding, advanced image models, 20 cards per prompt), Pro ($25/mo or $15 annually — premium AI models, API access, custom fonts, analytics, 4,000 monthly credits), Ultra ($100/mo), plus Team ($20/seat/mo, min 2) and Business ($40/seat/mo). The mechanics to know: generation is metered by credits, and on most plans unused credits do not roll over. Free's 400 credits are one-time (not refreshing), so once exhausted you need to upgrade to keep generating. Annual billing is required to hit the advertised lower rates.",
        faq: [
            {
                q: "How do Gamma's credits work?",
                a: "Gamma meters AI generation with credits. Free gives 400 one-time credits (not refreshing), Plus gives 1,000 refreshing monthly credits, and Pro gives 4,000. On most plans unused credits do not roll over. Once Free's one-time credits are gone, you must upgrade to keep generating.",
            },
            {
                q: "Is the free Gamma plan enough?",
                a: "For trying it out, yes — 400 one-time credits generate a handful of real presentations. But because those credits are one-time rather than refreshing, and free work carries Gamma branding, regular users quickly move to Plus ($12/mo) for refreshing credits and no badge.",
            },
            {
                q: "Is Gamma better than PowerPoint?",
                a: "For speed and getting to a good-looking draft, often yes — Gamma's prompt-to-deck flow is far faster than building slides manually. But PowerPoint and Keynote offer more fine-grained control. Gamma trades precision for speed and design polish; choose based on whether you value getting it done fast or controlling every detail.",
            },
            {
                q: "Do Gamma presentations look generic?",
                a: "The defaults look polished, but at scale Gamma's output can take on a recognizable style. With custom themes, fonts (on Pro), and your own content you can differentiate, but as with any template-driven tool, leaning entirely on defaults produces decks that resemble other Gamma decks.",
            },
            {
                q: "Can I use Gamma for more than slides?",
                a: "Yes. Beyond presentations, Gamma generates documents and webpages from prompts, so you can produce a simple one-page site or a formatted document in the same tool. It is positioned as a general 'create polished content from a prompt' tool, not just a deck maker.",
            },
        ],
    },

    framer: {
        overviewHtml: `
            <p><strong>Framer</strong> is easiest to place by what comes out of the far end of it. <a href="/tool/figma">Figma</a> produces a design. A code generator produces a repository. Framer produces a website that is live, hosted, on your domain, and being served to visitors — and it does that from an interface that a designer, rather than a developer, is expected to drive. Everything appealing and everything limiting about the product follows from that one commitment.</p>

            <h3>The deliverable is a live site, not a file</h3>

            <p>The motion Framer is built around is design, publish, done. There is no export step, no handoff, no ticket asking someone to implement the thing you drew. For a marketer who needs a landing page by Thursday or a founder who needs a site before a launch, collapsing those three stages into one is the entire value proposition, and it is a larger change to how work feels than any individual feature.</p>

            <p>The visual control is genuinely designer-grade rather than template-grade. Responsive behaviour, layout, typography, and animation are all directly manipulable, and sites built in it tend not to look like they came from a builder — which is a low bar that most builders still fail. The AI features sit on top of this rather than underneath it: layout generation to get a structure started, assistance with copy and translation, help with small pieces of custom code. They shorten the beginning of the work. The visual editor is still where the work happens.</p>

            <h3>Hosting is part of the product, for better and worse</h3>

            <p>Publishing is not an integration; it is the product. Framer runs the infrastructure, handles the domain, serves the pages, and manages the things that make a site work in public — meta tags, sitemaps, redirects, and pages rendered so that crawlers see real content rather than an empty shell. For a small team with nobody who wants to own a deployment pipeline, removing that entire category of concern is worth real money.</p>

            <p>The cost is that you have chosen a platform and not just a tool. Your site runs where Framer runs it, under Framer's plan structure, with page and content limits that belong to your tier rather than to your hosting bill. Growth is therefore a pricing event: adding pages or content can push you up a tier in a way that has nothing to do with traffic. Plan limits and prices have been restructured before, so check the current plans before committing a site you expect to grow substantially.</p>

            <h3>Against Webflow, the nearest real comparison</h3>

            <p>These two occupy the same territory and lean different ways, and choosing between them is mostly a question about who is doing the work.</p>

            <p>Webflow is the more powerful and more literal tool: it exposes the underlying box model, gives you finer structural control, and rewards someone who understands how HTML and CSS actually behave. Framer is the more designer-native one, where the interface resembles a design tool and animation and interaction are unusually easy to get right. The rough heuristic is that a person who thinks in stylesheets will find Framer occasionally constraining, and a person who thinks in frames and layers will find Webflow occasionally tedious. Neither is wrong, and the deciding factor is usually which description fits the person who will maintain the site in six months.</p>

            <h3>Against Lovable and the app builders</h3>

            <p>This comparison comes up constantly and it should not. <a href="/tool/lovable">Lovable</a> and its neighbours generate applications — with databases, authentication, and business logic — from prompts, and hand you a codebase. Framer builds websites: marketing pages, content, forms, the public face of a company.</p>

            <p>The boundary is whether users log in and change state. Sites that inform, persuade, and collect enquiries are Framer's domain and it is very good at them. The moment you need accounts, permissions, stored data, or anything a user manipulates, you are building an application and this is the wrong tool — see <a href="/blog/ai-app-builders-bolt-v0-lovable">the app builders compared</a> for that category. Plenty of companies correctly use both: a marketing site in Framer and a product built somewhere else entirely.</p>

            <h3>The wall you hit when you need code</h3>

            <p>Framer allows custom code components and script insertion, so it is not a sealed box, and there is still a real ceiling that matters for anyone thinking about the long term.</p>

            <p>The important question is portability. Framer is not designed around handing you a complete codebase you can host somewhere else, which means the site you build largely lives where you built it. If an eventual migration to your own infrastructure is a requirement rather than a hypothetical — because a developer will take it over, because of a procurement rule, or because you want the option — establish exactly what you could extract before you build fifty pages, not after. Confirm current capabilities directly rather than trusting a description.</p>

            <p>The second ceiling is integration depth. Anything that needs server-side logic, a real backend, custom API routes, or behaviour that does not fit the platform's model becomes awkward at best. The right time to notice this is during evaluation, when the requirements list is still honest, rather than at the point where one stakeholder request does not fit.</p>

            <h3>When not to choose Framer</h3>

            <p>Do not choose it if nobody on the team has design judgement. It gives you control, and control without taste produces worse results than a rigid template would. A team with no designer is often better served by something more opinionated that constrains them into a decent outcome.</p>

            <p>Do not choose it if a developer will own the site anyway. If someone is going to maintain it in code, the reasons to accept a proprietary platform mostly disappear, and a conventional framework with a headless content source gives more control and no lock-in.</p>

            <p>Do not choose it for an application. Repeating this because it is the most expensive mistake available here: the moment the requirements include accounts and stored state, you have left the category.</p>

            <p>And do not choose it if your content volume is about to explode. Page and content limits are tied to plan tiers, so a site that grows into hundreds of pages carries a cost curve worth modelling before you start rather than discovering at renewal.</p>
        `,
        useCases: [
            {
                title: "Marketing sites a designer can ship alone",
                body: "Landing pages, product sites, and campaign microsites built and published without a developer in the loop. The compression of design, build, and deploy into one person's afternoon is the reason teams adopt it, and it holds up as long as the site stays a site.",
            },
            {
                title: "Content-driven sites someone non-technical maintains",
                body: "Blogs, case study libraries, and documentation-style content running on the built-in CMS, where a marketer adds entries without touching layout. Worth checking the content and collection limits on your intended tier early, because this is the usage that grows fastest.",
            },
        ],
        pricingDetail:
            "After its October 2025 overhaul, Framer offers Free ($0, design and try with Framer branding and a subdomain), Basic ($10/mo annually, $15 monthly — removes branding, free custom domain, 30 pages, 1 CMS collection), Pro ($30/mo annually, $45 monthly — 150 pages, 10 CMS collections, 2,500 CMS items, staging, roles, redirects, 90-day analytics), Scale ($100/mo annually, with expandable add-ons), and Enterprise (custom). The older Mini ($5) and several other tiers were removed in the overhaul. The trap: page, CMS-item, and bandwidth limits on lower tiers can force an upgrade as a site grows, and monthly billing is meaningfully more expensive than annual.",
        faq: [
            {
                q: "Framer or Webflow?",
                a: "Pick by who maintains the site. Webflow exposes more of the underlying web platform and rewards someone comfortable with how HTML and CSS behave; Framer feels like a design tool and makes interaction and animation notably easier. A person who thinks in stylesheets will occasionally find Framer constraining. A person who thinks in layers and frames will occasionally find Webflow tedious.",
            },
            {
                q: "Framer or Figma?",
                a: "They are not alternatives. Figma is where you design interfaces and hand them to developers; Framer is where you build and publish a website. If your output is a live marketing site, Framer. If it is app UI, a design system, or a specification for engineers, Figma. Many teams use both without any overlap at all.",
            },
            {
                q: "Can I export my site as code and host it elsewhere?",
                a: "Do not assume so. Framer is built around publishing on its own infrastructure rather than around producing a portable codebase, so treat the site as living where you built it. If future migration is a hard requirement, confirm exactly what can be extracted before you invest in a large site, and confirm it with Framer directly rather than from any article.",
            },
            {
                q: "Is the free plan usable for a real site?",
                a: "For building, learning, and showing someone a draft, yes. For a site the public is meant to take seriously, no — the free tier carries Framer branding and a Framer subdomain. The first paid tier is what removes both and attaches your own domain, which is the practical minimum for anything customer-facing.",
            },
            {
                q: "Can I add custom code?",
                a: "Yes, within limits. You can build custom code components and insert scripts, which covers analytics, third-party widgets, and bespoke interactive pieces. What it does not cover is server-side logic, a real backend, or anything needing custom API routes. It is an escape hatch for extending a website, not a route to building an application.",
            },
            {
                q: "Is it any good for SEO?",
                a: "The fundamentals are handled. Pages are served so that crawlers see actual content rather than an empty shell, and the usual controls — meta tags, sitemaps, redirects — are part of the product rather than plugins you bolt on. Beyond that, the ranking outcome depends on your content and your site structure, which is true of every platform and is where the effort actually goes.",
            },
            {
                q: "When is Framer the wrong tool?",
                a: "When users log in. Anything with accounts, permissions, or stored state that people manipulate is an application, and you want an app builder or a developer instead. It is also the wrong tool when a developer was always going to own the site, since the platform trade-off buys you nothing in that case, and when nobody involved has the design judgement to use the control it gives you.",
            },
        ],
    },

    linear: {
        overviewHtml: `
            <p><strong>Linear</strong> is the rare tool that is easier to evaluate by what it refuses to do. Almost every question worth asking about it — should we migrate, will the team accept it, will it still fit in two years — reduces to a single test: are you willing to change how you work to match the tool, or do you expect the tool to change to match you? Linear only rewards the first answer. Teams that arrive expecting the second one churn, and they usually blame the wrong thing on the way out.</p>

            <h3>The opinion is the product, and it is not negotiable</h3>

            <p>Most trackers sell configurability and let each team build its own process on top. Linear sells a process and lets you adjust the edges. Issues are small. Status sets are short. Estimates are optional and deliberately coarse. Work is planned in fixed-length cycles rather than in whatever container a project manager invents. None of that is a technical limitation — it is a position, argued publicly by the company, that most of the configuration other trackers offer is a way for organisations to encode dysfunction and then maintain it forever.</p>

            <p>If you agree with that position, the tool feels like relief. If you do not, it feels like being told no by software. Both reactions are correct responses to the same product, which is why "is Linear good" is a question with no answer and "does our process survive contact with Linear's defaults" is a question with a very quick one.</p>

            <h3>Speed is a workflow claim, not a benchmark claim</h3>

            <p>Linear's reputation for being fast is usually described as a rendering story, and that undersells it. The thing that actually changes behaviour is that the entire application is reachable from the keyboard, and issue creation is cheap enough that people do it while they are still talking. In trackers where filing takes a minute and a decision about six fields, engineers batch it, forget it, and keep the real backlog in their heads or in a chat thread. The observable difference after a migration is not that anyone types faster; it is that things get written down that previously did not.</p>

            <p>That also sets the ceiling on the benefit. If your team's problem is that work is poorly specified, or that priorities change weekly from above, a faster input box does not touch it. Linear makes a well-run team quicker. It does not make a badly-run one well-run, and teams that adopt it hoping for the second outcome report, accurately, that nothing improved.</p>

            <h3>Cycles are not sprints, and the difference is the point</h3>

            <p>A cycle is a fixed window that work flows through, not a commitment your team signs up to hit. Unfinished issues roll forward automatically. There is no ceremony for accepting scope and no ritual for explaining a miss. The intent is that the cadence gives you a rhythm and a set of charts without giving anyone a stick.</p>

            <p>This is genuinely at odds with how scrum is practised in many organisations, where the sprint commitment is the unit of accountability and the burndown is reported upward. If someone above your team needs sprint-level predictability from a signed commitment, Linear will be used against its grain and you will spend your time reconstructing scrum inside a tool built to avoid it. Our write-up of <a href="/blog/linear-method-explained">the Linear method</a> covers the reasoning behind the cadence in more detail; you can adopt the reasoning without adopting the tool, and some teams should.</p>

            <h3>Where the guardrails actually stop you</h3>

            <p>The limits are consistent and predictable, which is the best thing you can say about limits. Workflow states are constrained rather than arbitrary. Custom fields exist but are not the heart of the data model, so processes that depend on many required attributes per issue feel wrong here. There are no elaborate permission schemes that let you hide projects from most of the company, which is a feature if you want default transparency and a blocker if you have contractual reasons to compartmentalise. Approval gates, sign-off chains and validation rules that must be enforced rather than agreed are not really available.</p>

            <p>Read that list as a disqualification test rather than a wish list. If two or more of those items are requirements handed to you by someone who is not on your team, Linear is the wrong purchase and no amount of enthusiasm from engineering will change that.</p>

            <h3>When to pick Jira, Monday or Asana instead</h3>

            <p>Pick <a href="/tool/jira">Jira</a> when the process is not yours to design — when auditors, regulators, safety standards or a parent company specify the workflow and you have to prove it was followed. Jira's configurability is the cost of being able to model a process you did not choose, and Linear has deliberately not paid that cost.</p>

            <p>Pick <a href="/tool/monday">Monday</a> when the people who need to see the work are in marketing, sales or operations and do not think in issues at all. Linear's interface assumes an engineering reader; a visual board that a campaign manager can run without training is a different product for a different audience, not a worse version of this one.</p>

            <p>Pick <a href="/tool/asana">Asana</a> when the question being asked is "how are the company's twelve initiatives tracking" rather than "what is this team shipping this week". Linear has projects and roadmaps, but it is built bottom-up from the issue, and portfolio reporting to an executive audience is not what it optimises. <a href="/tool/clickup">ClickUp</a> is the option when you want one system covering both and are willing to accept a denser interface to get it.</p>

            <p>And pick nothing at all if you are two people. A shared document listing what each of you is doing is not a worse tracker; it is the correct tool until coordination actually costs you something.</p>
        `,
        useCases: [
            {
                title: "A product team that ships continuously",
                body: "The case Linear is designed around: a small-to-mid engineering group with authority over its own process, shipping on a steady cadence, where the main enemy is friction rather than governance. Everything the tool does well is aimed at this shape of team, and everything it refuses to do is refused on this team's behalf.",
            },
            {
                title: "Getting work out of chat and into writing",
                body: "Teams whose real backlog lives in message threads adopt Linear less for the reporting than for the fact that filing an issue is cheap enough to do mid-conversation. The measurable change is in what gets recorded, not in how fast anyone works, and it is the most reliable return on a migration.",
            },
            {
                title: "Writing tickets that an AI agent can act on",
                body: "Once coding agents started implementing tickets, the specificity of the ticket became the bottleneck. Linear's small, tightly-scoped issues paste into an agent brief far better than a loosely-worded epic does, which is a side effect of the format rather than an AI feature.",
            },
        ],
        pricingDetail:
            "Linear keeps pricing simple: Free (unlimited members with an issue cap, enough for small teams), Basic (around $8/user/mo), Business (around $14/user/mo, adding advanced features, more integrations, and AI), and Enterprise (custom, with SSO and advanced security). Billing is per active user, monthly or annual, with the usual annual discount. Because exact figures and what sits behind each tier shift, confirm the current plan comparison on Linear's own site before quoting numbers to a team. The number is rarely the deciding factor anyway — the deciding factor is whether Linear's opinionated, software-focused workflow matches how your team already works, because the tool will not bend to meet you.",
        faq: [
            {
                q: "Linear or Jira?",
                a: "Decide it on who owns your process. If your team designs its own workflow and answers for outcomes rather than for procedure, Linear removes work. If the workflow is specified by someone outside the team — compliance, a regulator, a parent company, a customer contract — you need a tool that can model an arbitrary process and prove it was followed, and that is Jira. Speed and design preferences are real but they are the tiebreaker, not the criterion.",
            },
            {
                q: "Can we make Linear work like our current process?",
                a: "Partially, and the parts that do not fit are the ones that will decide it. Linear expects short status sets, small issues, optional coarse estimates and a fixed cadence. If your process depends on many required fields per issue, enforced approval gates, or hiding projects from most of the organisation, you will be fighting the product rather than configuring it.",
            },
            {
                q: "Is the free plan enough to run a real team?",
                a: "For a small team, often yes. The free tier supports unlimited members with a cap on total issues, which is a limit you hit through age rather than through headcount — a team of five will reach it eventually simply by existing. Treat the free plan as a genuine trial of the workflow rather than as a permanent arrangement.",
            },
            {
                q: "Will non-engineers use it?",
                a: "Some will, reluctantly. Designers and technical product managers generally adapt. Marketing, sales and operations usually do not, because the vocabulary and the keyboard-first interface assume you think in issues and cycles. If a significant share of the people who need visibility are outside engineering, expect to run a second tool for them or to choose a broader one for everybody.",
            },
            {
                q: "What breaks when a company grows into it?",
                a: "Two things, reliably. Cross-team dependency tracking gets harder than it is in a tool built around portfolio structure, and the absence of granular permissions becomes a real conversation once there is work that legal or HR does not want visible by default. Neither is fatal, but both arrive around the same growth stage and both are easier to plan for than to discover.",
            },
            {
                q: "Do the AI features change the decision?",
                a: "No, and it is worth saying plainly. Assisted drafting, summarising and triage are now present in every tracker in this category at a broadly comparable level, so they are not a differentiator in either direction. Choose on workflow fit and treat the AI as a convenience that arrives regardless of what you pick.",
            },
            {
                q: "Is migrating off it hard if we change our minds?",
                a: "Less hard than migrating off a heavily-configured tracker, because there is less configuration to lose. Issues, comments and history export in conventional forms, and the thing that does not survive is the process convention itself — the cycles, the scoped issues, the short status sets — which was the reason you were there. Teams rarely regret the data; they regret rebuilding the habit.",
            },
            {
                q: "Why do teams switch to Linear and then switch away again?",
                a: "Almost always the same story. Engineering adopts it, likes it, and the company then grows a set of requirements engineering does not control — audit trails, approval chains, non-engineering departments needing the same system, executive portfolio reporting. Linear did not get worse; the buying criteria changed. Knowing that in advance is the best argument for choosing it deliberately rather than by enthusiasm.",
            },
        ],
    },

    monday: {
        overviewHtml: `
            <p><strong>Monday.com</strong> is usually evaluated against engineering trackers, which is the wrong comparison and produces the wrong conclusion. It is not competing with <a href="/tool/linear">Linear</a> or <a href="/tool/jira">Jira</a> for the same buyer. It is competing with a shared spreadsheet, an email thread and a whiteboard, in departments that have never had a system at all — and that is a much larger population than engineering.</p>

            <h3>The buyer is usually not IT, and that explains the product</h3>

            <p>Most of this category is sold into engineering or into a central IT function, so it is designed to survive a technical evaluation. Monday is generally bought by a marketing lead, an operations manager or an agency owner who needs the thing working this week, has no administrator to call, and will abandon it if the first hour is confusing.</p>

            <p>Every visible design choice follows from that. Colour is used as data rather than decoration, because a status you can read from across a room is worth more than a status you have to click into. Templates are prominent, because a blank board is a failure for this buyer in a way it is not for an engineer. Automations are written in near-English sentences, because the person who needs one cannot write a rule expression and will not open documentation. Critics read this as unserious. It is the specification.</p>

            <h3>A board is a spreadsheet that can send email</h3>

            <p>The most useful way to understand what Monday actually is: take the spreadsheet a team is already running, keep its shape, and give the columns behaviour. A status column notifies someone when it changes. A date column escalates when it passes. A person column becomes an assignment. A form feeds new rows in from outside the company without giving anyone a seat.</p>

            <p>That framing predicts both the wins and the failures. It wins wherever a team's real system of record is a spreadsheet that has outgrown itself — the giveaway being colour-coded cells, a tab per month, and one person who is the only one allowed to edit it. It fails wherever the work has genuine structural depth: many-to-many relationships, versioned artefacts, dependency graphs that actually need solving. Those are not spreadsheet problems and dressing a spreadsheet in colour does not make them tractable.</p>

            <h3>Flexibility becomes sprawl on a schedule</h3>

            <p>Because anyone can create a board, everyone does, and the failure mode arrives in a predictable sequence. First, two departments model the same entity — a client, a campaign, a request — differently. Then someone links them and discovers the fields do not correspond. Then a third board is created to reconcile the first two. By the time anyone asks for a cross-department report, the data cannot support one.</p>

            <p>The fix is unglamorous and has to be decided early, before boards multiply: a small number of shared entity definitions that departments extend rather than reinvent, and one person who owns that vocabulary. This is the same maintenance burden that heavier tools carry, arriving through the back door because nobody thought they were buying an administered system. Seat-based billing compounds it, since boards that nobody has used in months keep consuming licences.</p>

            <h3>When to pick Linear, Jira or Asana instead</h3>

            <p>Pick <a href="/tool/linear">Linear</a> if the work is software and the users are engineers. Monday can hold a development backlog and engineers will route around it within a quarter, because the vocabulary, the keyboard behaviour and the branch and pull-request connections they expect are not there.</p>

            <p>Pick <a href="/tool/jira">Jira</a> if any workflow has to be enforced rather than agreed. Monday's automations are conveniences, not gates; they can notify and update, but they are not designed to make an unauthorised transition impossible or to prove to an auditor that it was never possible.</p>

            <p>Pick <a href="/tool/asana">Asana</a> if the primary reader is an executive rather than the person doing the work. The two products overlap heavily in what they can do, and the honest difference is temperament: Monday optimises for the operator's daily surface, Asana optimises for the structured roll-up above it. <a href="/tool/airtable">Airtable</a> is the better answer when the thing you actually have is a relational database with a project-management skin, and <a href="/tool/clickup">ClickUp</a> when you want maximum feature coverage in one place.</p>
        `,
        useCases: [
            {
                title: "Marketing campaign and content calendars",
                body: "Briefs, owners, review stages and publish dates on one board, with the state of every item legible at a glance. This is the workload Monday is most often bought for and the one it handles with the least configuration.",
            },
            {
                title: "Client and agency delivery tracking",
                body: "One board per client or one row per engagement, with intake forms from the client side and status columns that notify account managers on change. Agencies value that a client can be given a filtered view without being given a licence.",
            },
            {
                title: "A lightweight sales pipeline",
                body: "Deals as rows, stages as a status column, automations for follow-up reminders. It suits teams whose pipeline is genuinely simple and who would otherwise be running it in a spreadsheet; teams with real forecasting and quota requirements outgrow it and should buy a CRM.",
            },
            {
                title: "Operations request queues",
                body: "Facilities, finance and internal-services requests arriving through a form and moving across a board with ownership visible. The value is that the requester needs no account and the queue owner needs no training.",
            },
            {
                title: "Recruiting pipelines",
                body: "Candidates by stage, with interviewers assigned and dates driving reminders. Reasonable for a company hiring occasionally, and a poor substitute for an applicant tracking system once compliance record-keeping or structured scorecards are required.",
            },
            {
                title: "Event and launch coordination",
                body: "Cross-department checklists with hard dates, where the point is that ten people from five functions can see the same countdown without a status meeting. Timeline and calendar views carry this case more than the board view does.",
            },
            {
                title: "Retiring a spreadsheet that outgrew itself",
                body: "The most common real migration: a colour-coded sheet with a tab per month and a single person permitted to edit it. Monday keeps the shape people already understand and adds notification, ownership and intake, which is usually the whole requirement.",
            },
        ],
        pricingDetail:
            "Monday.com offers Free (limited seats and basic boards), Basic (around $9/seat/mo), Standard (around $12/seat/mo, the common real-team starting point with timeline views and automations), Pro (around $19/seat/mo, advanced automations, time tracking, more AI), and Enterprise (custom). Two structural traps matter more than the headline rate. Seats are sold in fixed bands rather than one at a time, so a team that grows by one person can jump a band and pay for several unused seats. And automation and integration usage is metered per month on the lower tiers, which is the most common reason a team upgrades mid-year without having added anybody. Confirm current per-seat figures and band sizes on monday's own pricing page, as both are adjusted periodically.",
        faq: [
            {
                q: "Is Monday.com suitable for a software team?",
                a: "As the engineering team's primary tracker, no. It can hold a backlog, but it lacks the vocabulary, the keyboard-driven speed and the code integrations engineers expect, and teams route around it. It is a reasonable place for the work around engineering — launch coordination, roadmap communication to other departments — while the engineers use a tracker built for them.",
            },
            {
                q: "How do the seat bands actually bite?",
                a: "Seats come in fixed bands rather than individually, so adding one person can move you to the next band and bill you for several seats nobody occupies. Budget by the band you will land in after your next two hires rather than by your current headcount, and audit for seats held by people who have stopped using the tool.",
            },
            {
                q: "When does Monday stop being the right tool?",
                a: "At the point where your data has real structure — many-to-many relationships, records that need versioning, dependencies that must be computed rather than noted. A board is a spreadsheet with behaviour, and those are not spreadsheet problems. If you find yourself building a third board purely to reconcile the first two, you have hit it.",
            },
            {
                q: "Monday or Asana?",
                a: "They overlap enough that capability lists will not separate them. Choose on who the primary reader is. If it is the person doing the work and they want a visual surface they can run themselves, Monday. If it is a leadership audience asking how a portfolio of initiatives is tracking across departments, Asana's goals and portfolio structure is built for that question and Monday's is not.",
            },
            {
                q: "How do we stop boards from multiplying out of control?",
                a: "Decide early, because it is far cheaper before the sprawl than after. Agree a small set of shared definitions for the entities several departments touch — client, campaign, request — and give one person the authority to say no to a board that reinvents one. The sprawl is not a product defect; it is what happens to any system where creation is free and nobody owns the vocabulary.",
            },
            {
                q: "Are the AI features worth upgrading for?",
                a: "Treat them as a convenience rather than a reason. Drafting, summarising and suggested automations are now standard across this whole category, and users who lean on them heavily tend to report they are shallower than the marketing implies. Upgrade for the automation volume, the views or the governance you need, and accept the AI as something that came along with the tier.",
            },
        ],
    },

    airtable: {
        overviewHtml: `
            <p><strong>Airtable</strong> is a spreadsheet-database hybrid that lets teams build flexible, relational apps without code — combining the familiarity of a spreadsheet with the structure of a database and an interface designer on top. In 2026 it relaunched as an AI-native platform: its assistant, <strong>Omni</strong> (which unified the earlier Cobuilder and Assistant features in June 2025), can build production-ready apps with data, automations, and interfaces from natural-language conversation — and, notably, asking Omni to build and iterate on apps comes at no additional cost.</p>

            <p>The plan structure: <strong>Free</strong> includes unlimited bases but caps records at 1,000 per base and 5 editors, with 250 AI credits per editor for testing AI fields. <strong>Team ($20/user/mo annually)</strong> raises records to 50,000 per base with 25,000 automation runs and more AI credits. <strong>Business ($45/user/mo annually)</strong> adds 125,000 records, SSO, admin controls, and premium extensions. Enterprise is custom. Crucially, you are billed only for users with edit permissions — read-only collaborators and form submitters are free.</p>

            <p>Its strengths are structured flexibility and the new AI-native app building. Where a spreadsheet sprawls into chaos, Airtable keeps data relational and queryable, and Omni now lets non-developers spin up real internal apps conversationally. For teams managing structured data — content calendars, CRMs, inventories, project trackers — it hits a sweet spot between a spreadsheet and a custom-built app.</p>

            <p>The honest weaknesses: the free tier's 1,000-record cap is hit fast by any real dataset, pushing teams to paid plans, and per-editor pricing adds up. Analysis-type AI questions consume credits (around 10 credits per response), so heavy AI use has a metered cost beyond app-building. For pure documents and notes, <a href="/tool/notion-ai">Notion</a> or <a href="/tool/coda">Coda</a> fit better — Airtable's strength is structured, relational data, not free-form docs.</p>

            <p>Who it is for: teams managing structured, relational data who want to build flexible internal apps — now conversationally via Omni — without code. Who it is not for: teams whose work is mostly documents and notes (use Notion/Coda), or those whose datasets quickly blow past the free record limits on a tight budget.</p>
        `,
        useCases: [
            {
                title: "No-code internal apps with Omni",
                body: "Airtable's 2026 headline: Omni builds production-ready apps — data, automations, interfaces — from natural-language conversation, at no extra cost. Non-developers spin up internal tools (trackers, CRMs, request systems) by describing what they need rather than configuring from scratch.",
            },
            {
                title: "Structured data management",
                body: "Where spreadsheets sprawl, Airtable keeps data relational and queryable — content calendars, inventories, project databases. The interface designer turns that data into usable views for the team, bridging spreadsheet familiarity and database structure.",
            },
            {
                title: "Lightweight CRM and pipelines",
                body: "Teams use Airtable to run CRMs and pipelines without dedicated software — linking records, automating follow-ups, and building custom views. Its flexibility makes it a fast way to stand up a structured system tailored to a specific process.",
            },
        ],
        pricingDetail:
            "Airtable offers Free ($0, unlimited bases but 1,000 records/base, 5 editors, 250 AI credits/editor, 100 automation runs/mo), Team ($20/user/mo annually or $24 monthly — 50,000 records/base, 25,000 automation runs, more AI credits), Business ($45/user/mo annually or $54 monthly — 125,000 records, SSO, admin controls, premium extensions), and Enterprise Scale (custom). Billing applies only to users with edit permissions; read-only collaborators and form submitters are free. The traps: the free 1,000-record cap is hit quickly by real datasets, and AI analysis questions consume credits (~10 per response), so heavy AI use is metered on top of the plan — though building apps with Omni itself is free.",
        faq: [
            {
                q: "Is building apps with Airtable's AI free?",
                a: "Yes — asking Omni to build and iterate on your apps comes at no additional cost. What does consume credits is AI analysis (questions about your data cost around 10 credits per response). So app-building via Omni is free, but heavy data-analysis AI use draws down your monthly credit allowance.",
            },
            {
                q: "What is Airtable Omni?",
                a: "Omni is Airtable's integrated AI assistant, which in June 2025 unified the older Cobuilder and Assistant features into one conversational surface. It can build production-ready apps with data, automations, and interfaces, research the web, analyze data, and create or update records — all through natural-language conversation.",
            },
            {
                q: "Is the free Airtable plan enough?",
                a: "For small projects and testing, yes, but the 1,000-records-per-base cap is the binding limit — real datasets exceed it quickly, pushing you to Team ($20/user/mo) for 50,000 records. The free tier is best for evaluating Airtable and Omni rather than running production data.",
            },
            {
                q: "Airtable or Notion — which should I use?",
                a: "Airtable is for structured, relational data and no-code apps — think databases, CRMs, and trackers. Notion is for documents, notes, and knowledge with lighter databases attached. If your center of gravity is structured data and app-building, Airtable; if it is docs and knowledge, Notion. Many teams use both.",
            },
            {
                q: "How does Airtable bill for users?",
                a: "On Team and Business plans you are charged only for users with edit permissions on at least one base. Read-only collaborators, form submitters, and share-link viewers are free. This makes it cheaper to share data widely while paying only for the people who actually build and edit.",
            },
        ],
    },

    runway: {
        overviewHtml: `
            <p><strong>Runway</strong> is usually filed under "AI video generators", which undersells what it is and explains why a lot of people try it once and conclude it is a toy. Generation is the headline, but the product around it is a post-production suite — rotoscoping, inpainting, motion tracking, retiming, upscaling — and those tools are what make the generated material usable in work that has to be delivered to a client. The difference between Runway and a pure text-to-video demo is the difference between a camera and a photograph.</p>

            <h3>Generation is only half the product</h3>

            <p>A prompt-to-clip tool gives you something you either accept or regenerate. Runway gives you something you can keep working on. That distinction is the entire reason it shows up in professional pipelines: a shot that is eighty percent right is worthless if your only option is to roll the dice again, and valuable if you can mask out the wrong part and replace it.</p>

            <p>In practice a working session rarely looks like typing one prompt. It looks like generating a base, extending it, brushing motion onto a specific region, erasing an object that drifted, upscaling the result, and cutting the useful two seconds out of a four-second clip. Almost none of that is generative. All of it is why the generated part survives.</p>

            <h3>The Gen-series models in practice</h3>

            <p>Runway's Gen-series models handle text-to-video, image-to-video, and video-to-video, and the direction of travel across generations has been consistency rather than raw spectacle — holding a character, an object, or a location stable across shots, which is the thing that decides whether generated footage can be cut together into something coherent. Newer generations also support driving a generated performance from an ordinary video reference, which moves the tool closer to directing and further from rolling dice.</p>

            <p>Image-to-video is the mode professionals reach for most, and it is worth saying why: starting from a still you control removes most of the ambiguity from the prompt. You are no longer negotiating with the model about what the scene looks like, only about how it moves. Teams often generate or shoot the still first and treat Runway as the motion step.</p>

            <h3>Rotoscoping, inpainting, and the unglamorous work</h3>

            <p>The features that earn Runway a subscription are the boring ones. Its green-screen tool mattes a subject out of footage that was never shot against a green screen, which is a task that historically ate hours of an artist's week. Inpainting removes an object, a logo, a microphone, or a person from a moving shot and fills the hole plausibly. Motion Brush applies movement to a chosen region rather than the whole frame. Frame interpolation and upscaling clean up material that is nearly good enough.</p>

            <p>None of this is exciting to demo, and all of it is what an actual job consists of. A studio that never generates a single frame can still get value out of Runway as a cleanup and matting tool, and some do exactly that.</p>

            <h3>Credits are the real unit of planning</h3>

            <p>Every meaningful decision in Runway is denominated in credits, which are consumed per generation and scale with clip length and model quality. This matters more than the monthly price, because creative work is iterative by nature: the shot you keep is rarely the first one, and every discarded attempt costs the same as a kept one. Budget for the ratio between attempts and keepers, not for the number of finished shots.</p>

            <p>The practical discipline is to do exploration cheaply — short durations, lower-cost models, small tests to check whether an idea works at all — and spend real credits only on the version you already believe in. Teams that burn through an allowance in a week are almost always the ones generating full-length, maximum-quality clips while still deciding what the shot should be.</p>

            <h3>When Runway is the wrong tool</h3>

            <p>Do not reach for Runway when the deliverable needs to match footage you already shot exactly — matching grain, lens characteristics, and lighting to real plates remains genuinely hard, and a mismatch reads as wrong to viewers who could not tell you why. Do not use it for long-form continuous scenes; generated video works in shots, not sequences, and the seams get harder to hide the longer you ask it to run. Do not use it where text has to be legible on screen, or where a specific real person, product, or brand asset has to be reproduced faithfully.</p>

            <p>It is also the wrong purchase for occasional use. The credit model rewards people working on something continuously and punishes the user who wants one clip a month — that person is better served by a general-purpose tool they already pay for. And if the output you need is a still image rather than motion, <a href="/tool/midjourney">Midjourney</a> remains the stronger craft tool; see <a href="/compare/midjourney-vs-runway">Midjourney vs Runway</a> for where the line falls. For raw generative quality without the editing suite, <a href="/tool/openai-sora">Sora</a> is the obvious alternative to weigh.</p>
        `,
        useCases: [
            {
                title: "B-roll and inserts that are impractical to shoot",
                body: "Establishing shots, abstract textures, aerial-style movement, and scenes that would need a location, a permit, or a crew. This is the highest-value generative use because the bar is atmosphere rather than exact fidelity, and nobody in the audience is checking the shot against reality.",
            },
            {
                title: "Previsualization and pitch films",
                body: "Directors and agencies build a moving version of an idea before anyone commits a budget to it. A rough generated sequence communicates intent in a way storyboards cannot, and it is cheap enough to make three versions and argue about them.",
            },
            {
                title: "Object, logo, and rig removal",
                body: "Inpainting on moving footage handles the cleanup work that used to require frame-by-frame paint: a brand mark that was not cleared, a boom mic in shot, a crew member in a reflection, a modern object in a period scene.",
            },
            {
                title: "Matting without a green screen",
                body: "Runway's rotoscoping can isolate a subject from footage shot on location, which opens up compositing on material that was never planned for it. For documentary and run-and-gun work, where staging a proper key was never an option, this is often the single feature that justifies the subscription.",
            },
            {
                title: "Look development and style exploration",
                body: "Video-to-video restyling lets a team test several visual directions on the same footage before choosing one. It is faster than grading each option properly, and the point is the decision, not the deliverable.",
            },
            {
                title: "Rescuing and extending existing footage",
                body: "Retiming, frame interpolation, upscaling, and generative extension of a shot that ended a beat too early. This is the least glamorous category and frequently the most used, because it fixes problems that already exist in an edit rather than creating new material.",
            },
        ],
        pricingDetail:
            "Runway uses a credit-based model: Free (one-time credit allotment, watermarked output, limits), Standard (around $15/mo), Pro (around $35/mo), Unlimited (around $95/mo, adding a relaxed mode for unlimited slower generations), and Enterprise (custom). Annual billing discounts apply. The key mechanic: credits are consumed per generation and scale with clip length and the model used, so AI video gets expensive fast — heavy users on lower tiers exhaust credits quickly. Confirm current prices and credit allowances on Runway's site, as generative-video pricing changes often.",
        faq: [
            {
                q: "Why do credits disappear so fast?",
                a: "Because you pay per attempt, not per result. Generation cost scales with clip length and model quality, and creative work involves discarding far more shots than you keep, so the allowance is really a budget for iteration. The fix is workflow rather than tier: explore with short, cheap generations and reserve high-quality runs for shots you have already decided on. The Unlimited tier's relaxed mode exists for high-volume work where waiting longer is acceptable.",
            },
            {
                q: "Can I use Runway output in commercial work?",
                a: "Runway's paid plans have been intended for commercial use, and the free tier's watermarking makes its status obvious. Read the current terms before a client deliverable rather than trusting a summary, and note that broader questions about training data and generative output remain unsettled across the industry — for work with real legal exposure, agencies increasingly route generated material past their own counsel, the same way they would with stock or archive footage.",
            },
            {
                q: "Runway or Sora?",
                a: "Sora is the stronger pure generator; Runway is the stronger production environment. If you want the best single clip a prompt can produce, weigh Sora. If the clip has to be matted, cleaned, extended, or cut together with other shots, Runway's editing tools are the reason to be there, and they matter more than a marginal quality difference once the work has a deadline attached.",
            },
        ],
    },

    elevenlabs: {
        overviewHtml: `
            <p><strong>ElevenLabs</strong> is the leading AI voice platform, best known for producing remarkably natural-sounding text-to-speech and voice cloning. In 2026 it spans a full audio stack — text-to-speech, voice cloning, dubbing, sound effects, music, and conversational AI agents — all under one credit system. For anyone who needs high-quality synthetic voice, from audiobook narration to app voiceovers to AI phone agents, it sets the quality benchmark.</p>

            <p>The pricing has seven tiers built on credits, where one credit maps to roughly one character of text. <strong>Free</strong> gives 10,000 credits/month (about ten minutes of speech) but with no commercial rights and required attribution. <strong>Starter ($5/mo)</strong> unlocks commercial rights and instant voice cloning. <strong>Creator ($22/mo)</strong> adds professional voice cloning and 100,000 characters. <strong>Pro ($99/mo)</strong>, <strong>Scale ($330/mo)</strong>, and <strong>Business ($1,320/mo)</strong> raise volume for production use, with Enterprise custom. Conversational AI agents are billed separately at roughly $0.08–0.12 per minute.</p>

            <p>Its strengths are voice quality and breadth. ElevenLabs' output is consistently the most natural in the market, its voice cloning is powerful (instant and professional tiers), and the platform covers nearly every audio-AI need in one place. For creators and developers building voice into products, it is the default choice.</p>

            <p>The honest weaknesses: the credit-to-character model means long-form or high-volume audio gets expensive, and serious production can require the higher tiers. The free tier's lack of commercial rights and required attribution make it strictly a trial. And powerful voice cloning raises real ethical and consent considerations that responsible users must handle carefully. For full video/podcast editing rather than pure voice, <a href="/tool/descript">Descript</a> is a better fit.</p>

            <p>Who it is for: creators, developers, and businesses who need top-quality AI voice — narration, voiceovers, dubbing, or conversational agents. Who it is not for: casual users whose needs fit a free tier with attribution, or anyone needing a full video/podcast editor rather than a voice engine.</p>
        `,
        useCases: [
            {
                title: "Narration and voiceover",
                body: "ElevenLabs' core: turning scripts into natural-sounding narration for audiobooks, videos, e-learning, and app voiceovers. Its quality is the market benchmark, making synthetic voice viable where it previously sounded too robotic to use.",
            },
            {
                title: "Voice cloning and dubbing",
                body: "With instant and professional voice cloning, creators replicate a specific voice for consistent narration, and the dubbing tools translate content into other languages while preserving voice character — powerful for scaling content across markets (with proper consent).",
            },
            {
                title: "Conversational AI agents",
                body: "Developers build voice agents — phone assistants, in-app voices — on ElevenLabs' conversational AI, billed per minute (roughly $0.08–0.12). The natural voice quality makes these agents feel far less robotic than older text-to-speech systems.",
            },
        ],
        pricingDetail:
            "ElevenLabs has seven credit-based tiers (1 credit ≈ 1 character): Free ($0, 10,000 credits/mo ≈ ten minutes, no commercial rights, attribution required), Starter ($5/mo, commercial rights + instant voice cloning), Creator ($22/mo, 100,000 characters + professional voice cloning), Pro ($99/mo, 500,000 characters), Scale ($330/mo, 2M characters), Business ($1,320/mo), and Enterprise (custom). Annual billing saves ~17%. Conversational AI agents are billed separately at roughly $0.08–0.12/minute by model tier. The trap: long-form or high-volume audio consumes credits fast, so production work can require stepping up tiers — budget by total characters, not just the monthly sticker price.",
        faq: [
            {
                q: "Can I use ElevenLabs audio commercially?",
                a: "Only on paid plans. The free tier explicitly excludes commercial rights and requires attributing ElevenLabs. Commercial usage rights begin at the Starter tier ($5/mo), which also unlocks instant voice cloning. If you plan to publish or monetize the audio, you need at least Starter.",
            },
            {
                q: "How do ElevenLabs credits work?",
                a: "Credits map directly to characters of text — using the standard Multilingual v2 model, 1 credit equals 1 character. Each plan includes a monthly credit allowance (10,000 on Free up to millions on higher tiers). Long-form or high-volume audio consumes credits quickly, so budget by total characters you expect to generate.",
            },
            {
                q: "How good is ElevenLabs' voice cloning?",
                a: "It is among the best available, offered in two forms: Instant Voice Cloning (from a short sample, on Starter+) and Professional Voice Cloning (higher fidelity, on Creator+). It is powerful enough that responsible use requires proper consent for any voice you clone — an important ethical consideration.",
            },
            {
                q: "ElevenLabs or Descript — which do I need?",
                a: "ElevenLabs is a voice engine — best for high-quality text-to-speech, cloning, dubbing, and voice agents. Descript is a full video and podcast editor with AI tools built in. If you need synthetic voice or voice infrastructure, ElevenLabs; if you need to edit recorded video/audio content, Descript.",
            },
            {
                q: "How much do ElevenLabs voice agents cost?",
                a: "Conversational AI agents are billed separately from the character-based plans, at roughly $0.08/minute (Standard), $0.10/minute (Turbo), and $0.12/minute (Premium) depending on the model tier. This per-minute model is distinct from the credit/character system used for text-to-speech.",
            },
        ],
    },

    descript: {
        overviewHtml: `
            <p><strong>Descript</strong> is a video and podcast editor built on one inversion: the transcript is the timeline. It listens to your recording, writes out every word, and then treats that document as the authoritative version of the media. Delete a sentence from the text and the sentence leaves the audio and the video with it. Reorder two paragraphs and the footage reorders. Nothing else in the editing world works this way, and whether Descript is right for you comes down almost entirely to whether that inversion fits the thing you are making.</p>

            <p>Around that core sit the cleanup tools most people actually buy it for — Studio Sound for audio that was recorded in a bad room, one-click removal of filler words and long gaps, eye-contact correction for people who read from a script, and <strong>Underlord</strong>, the AI assistant that handles routine editing requests. None of these are novel individually. What is unusual is that they are all reachable by someone who has never learned a timeline.</p>

            <h3>Editing a video by editing a document</h3>

            <p>The practical consequence of transcript-first editing is that the skill required to use it is literacy, not craft. Cutting a rambling ninety-minute interview down to forty tight minutes is, in Descript, a job that looks like copyediting: read, select, delete, read again. In a conventional editor the same job means scrubbing a waveform, finding the in and out points by ear, and cutting clips — a slower loop that most non-editors abandon.</p>

            <p>This is also where the workflow's limits come from. Text is a linear representation, so anything whose value is not carried by speech is invisible to it. A silent B-roll sequence, a graphics-heavy explainer, a musical transition, a reaction shot — none of those live in the transcript, so none of them get easier. Descript can still place them, but you are back to ordinary editing for exactly the parts the transcript cannot describe. Talk-driven content gets enormous leverage; everything else gets a little.</p>

            <p>The second consequence is stylistic, and it is worth naming because it affects how finished work sounds. When deletion is this frictionless, editors delete a lot — every "um", every breath, every half-second of thinking. Aggressively de-filtered speech can end up sounding hurried and slightly airless, and audiences notice even when they cannot say why. The tool will happily let you strip a conversation of its rhythm. Leaving some of it in is a choice you now have to make deliberately.</p>

            <h3>Where Descript stops and a timeline NLE starts</h3>

            <p>Descript is a finishing tool for spoken-word content, not a general post-production environment, and the honest boundary is easier to draw than most vendors admit. You will outgrow it if your work depends on frame-accurate trims, multi-camera sync across many angles, layered motion graphics, colour grading beyond basic correction, or complex audio mixing with buses and sends. Those are the jobs Premiere, Final Cut, and DaVinci Resolve exist for, and Descript does not pretend otherwise.</p>

            <p>You should also skip it if your material is not primarily people talking — event footage, product films, anything scored and cut to music. And it is a poor fit as a middle step in someone else's pipeline: Descript is designed to take a recording and produce a finished file, along with transcripts and subtitles, rather than to hand editorial decisions to a downstream conform. If a professional editor is going to finish the piece, they will want the raw media and their own timeline, and the round trip will cost you more than the transcript saved.</p>

            <p>And if what you actually want is the transcript rather than an edit — meeting notes, a searchable record, a summary — a dedicated transcription service such as <a href="/tool/otter-ai">Otter.ai</a> does that job for less money and without asking you to open an editor at all.</p>

            <p>One more distinction that trips people up: Descript edits recordings of real voices. If what you want is synthetic narration generated from a script with no recording involved, <a href="/tool/elevenlabs">ElevenLabs</a> is the dedicated tool for that job, and the two are complements rather than competitors.</p>
        `,
        useCases: [
            {
                title: "Podcast production end to end",
                body: "Record, edit in the transcript, clean the audio with Studio Sound, strip filler, and publish — without a separate DAW. For interview shows in particular, the transcript is also the deliverable that feeds show notes, chapter markers, and quote pulls, so the editing pass and the promotion pass stop being separate work.",
            },
            {
                title: "Talking-head video and course content",
                body: "Tutorials, internal training, and YouTube explainers are almost pure speech, which is exactly the shape Descript is built for. Eye-contact correction in particular matters here, because reading from a script and looking at the camera are otherwise mutually exclusive.",
            },
            {
                title: "Fixing a take without re-recording it",
                body: "Voice cloning through Overdub lets you correct a misspoken word or a wrong figure by typing the replacement, which turns a re-shoot into a two-minute fix. Treat it as a repair tool rather than a production method, and get explicit consent before cloning anyone else's voice.",
            },
            {
                title: "Interview and research workflows",
                body: "Journalists, user researchers, and analysts use Descript less as an editor and more as a searchable archive of conversations — find the moment someone said the thing, pull the clip, quote the transcript. The editing features are almost a side effect of the transcript being good.",
            },
        ],
        pricingDetail:
            "Descript has five tiers: Free ($0, ~1 media hour/month, watermarked exports, no AI credits or Underlord), Hobbyist ($16/user/mo annually or $24 monthly, ~10 hours, basic AI), Creator ($24/user/mo annually or $35 monthly, the podcaster/YouTuber go-to with Studio Sound, full Underlord, 4K exports), Business ($50/user/mo annually or $65 monthly, ~30 hours for small teams), and Enterprise (custom). AI features consume AI credits tracked per plan. The trap: the free tier is strictly a trial (1 hour, watermarks, no AI), so any real content work needs at least Creator — and heavy AI use can exhaust credits before the period resets.",
        faq: [
            {
                q: "How does text-based editing actually work?",
                a: "Descript transcribes the recording and links every word in the transcript to its position in the media. Deleting a word from the document removes the corresponding audio and video; moving a paragraph moves the footage. You are still making edit decisions, but you are making them by reading rather than by scrubbing.",
            },
            {
                q: "Do the cuts sound obvious?",
                a: "Usually not for speech, because Descript cuts at word boundaries and handles the joins for you. Where it can get audible is when you remove a lot of consecutive filler in one breath group, or cut across a change in room tone or background noise. The fix is the same as in any editor: listen back to the joins rather than trusting the transcript view, and leave a little breathing room around the cuts.",
            },
            {
                q: "What is Overdub, and is it safe to use?",
                a: "Overdub is Descript's voice cloning feature: you train a model on your own voice and can then type corrections that are rendered in it. Technically it is best used for small repairs rather than generating whole passages. Ethically, only clone a voice with the speaker's explicit consent — Descript gates training on a consent recording for this reason, and the same caution applies to anything you publish with it.",
            },
            {
                q: "Can I take a Descript project into Premiere or Resolve to finish it?",
                a: "Plan on Descript being the end of the chain rather than the middle of it. It is built to output finished media along with transcripts and subtitles, not to hand a full editorial decision list to a downstream conform. If a professional editor is finishing the piece, give them the original recordings and let them work in their own tool.",
            },
            {
                q: "Is the free plan enough to do real work?",
                a: "No, and it is not meant to be. Free gives you roughly one media hour a month with watermarked exports and no AI credits or Underlord access, which is enough to test whether the transcript workflow suits you. Publishing anything means a paid tier, and the AI cleanup tools that make Descript worth using start at Creator.",
            },
            {
                q: "Can Descript handle multi-camera or graphics-heavy video?",
                a: "Only lightly. It supports multiple tracks and basic layering, but multi-camera sync across many angles, layered motion graphics, and detailed colour work are jobs for a conventional NLE. If your edit spends more time on what is on screen than on what is being said, you are using the wrong tool.",
            },
            {
                q: "How accurate does the transcript need to be?",
                a: "More accurate than you might assume, because the transcript is not just a convenience — it is the interface. Clean audio, one speaker at a time, and a decent microphone all improve accuracy, and improving accuracy directly reduces editing time. Heavy accents, crosstalk, and noisy rooms degrade it, and you will feel that as friction in every subsequent step.",
            },
            {
                q: "Descript or ElevenLabs?",
                a: "Different problems. Descript edits recordings of real people; ElevenLabs generates speech that was never recorded. If you have footage and need to cut it, that is Descript. If you have a script and need a voice, that is ElevenLabs. Teams producing narrated video sometimes use both.",
            },
        ],
    },

    vercel: {
        overviewHtml: `
            <p><strong>Vercel</strong> is the deployment and hosting platform built by the creators of Next.js, and the default home for modern front-end and full-stack JavaScript apps. Its pitch is frictionless deploys: connect a Git repository and every push ships to a fast global edge network with preview URLs for every branch. Around that core it has built an AI ecosystem — <a href="/tool/v0-by-vercel">v0</a> for AI UI generation and the Vercel AI SDK for building AI features into apps — making it as much an AI-app platform as a host in 2026.</p>

            <p>The plan structure: <strong>Hobby (Free)</strong> is genuinely useful for personal projects and prototypes, with generous limits, preview deploys, and HTTPS. <strong>Pro (around $20/user/mo)</strong> adds team collaboration, more compute and bandwidth, analytics, and higher limits. <strong>Enterprise</strong> (custom) brings SLAs, advanced security, and dedicated support. A crucial detail: on top of the subscription, Vercel charges <strong>usage-based fees</strong> for bandwidth, function execution, and other resources, which can grow with traffic.</p>

            <p>Its strengths are developer experience and ecosystem fit. For Next.js apps especially, nothing matches the smoothness of Vercel's deploy flow, preview environments, and edge performance. The integration with v0 and the AI SDK means you can design, build, and ship AI-powered apps within one coherent ecosystem.</p>

            <p>The honest weaknesses: the usage-based pricing on top of the subscription is the recurring surprise — a viral app or heavy traffic can produce bills well above the $20 base, and developers have been caught out by this. It is also optimized for the JS/Next.js world, so other stacks see less benefit, and for simple static sites cheaper hosts suffice. For the UI-generation piece specifically, see <a href="/tool/v0-by-vercel">v0</a>.</p>

            <p>Who it is for: developers and teams building modern front-end or full-stack JS apps — especially Next.js — who want the smoothest deploy experience and an integrated AI ecosystem. Who it is not for: projects on other stacks, simple static sites where a cheaper host suffices, or teams who need fully predictable costs and dislike usage-based billing.</p>
        `,
        useCases: [
            {
                title: "Frictionless Git-based deploys",
                body: "Vercel's core: connect a repository and every push deploys to a fast global edge network, with a unique preview URL for every branch and pull request. For modern web teams, this deploy-and-preview flow is the smoothest available, especially for Next.js.",
            },
            {
                title: "Hosting AI-powered apps",
                body: "With the Vercel AI SDK and tight integration with v0, Vercel is a natural home for AI-powered applications — you can build AI features with the SDK and deploy them on infrastructure designed for fast, edge-served responses, all in one ecosystem.",
            },
            {
                title: "Preview environments for collaboration",
                body: "Every branch gets a live preview URL, so teams review real, deployed versions of changes before merging. Designers, PMs, and stakeholders can see and comment on actual working pages rather than local screenshots, tightening the feedback loop.",
            },
        ],
        pricingDetail:
            "Vercel offers Hobby (free, generous limits for personal projects with preview deploys and HTTPS), Pro (around $20/user/mo, adding team collaboration, more compute and bandwidth, analytics, and higher limits), and Enterprise (custom, with SLAs and advanced security). The critical thing to understand: on top of the subscription, Vercel bills usage-based fees for bandwidth, serverless/edge function execution, and other resources. A high-traffic or viral app can generate costs well beyond the $20 base — this is the most common billing surprise. Monitor usage and set spend limits if cost predictability matters.",
        faq: [
            {
                q: "Why might my Vercel bill exceed the $20 Pro price?",
                a: "Because Vercel charges usage-based fees on top of the subscription — for bandwidth, function execution, and other resources. A high-traffic or viral app can push these well beyond the base $20, which is the most common surprise for Vercel users. Set spending limits and monitor usage if predictable costs matter.",
            },
            {
                q: "Is Vercel only for Next.js?",
                a: "It is optimized for Next.js (which Vercel created) and the broader JS/front-end ecosystem, where it shines. It supports other frameworks too, but the deepest benefits — performance optimizations, integrations, deploy smoothness — are greatest for Next.js apps. Other stacks see less advantage.",
            },
            {
                q: "Is the free Hobby plan enough?",
                a: "For personal projects, prototypes, and small sites, yes — Hobby is genuinely useful with generous limits, preview deploys, and HTTPS. You move to Pro when you need team collaboration, more compute and bandwidth, or commercial usage, which the Hobby plan's terms don't cover.",
            },
            {
                q: "How does Vercel relate to v0?",
                a: "Both are made by Vercel and designed to work together: v0 generates AI-powered UI and code, which deploys seamlessly to Vercel's hosting. Together with the Vercel AI SDK, they form an ecosystem for designing, building, and shipping AI-powered apps. See our v0 page for the UI-generation side.",
            },
            {
                q: "Is Vercel good for static sites?",
                a: "It works well, but for simple static sites a cheaper or free host may suffice — Vercel's real value is in dynamic, full-stack, and AI-powered apps with edge functions and previews. If all you need is static hosting, you may not need everything Vercel offers (or its usage-based pricing).",
            },
        ],
    },

    "devin-ai": {
        overviewHtml: `
            <p><strong>Devin</strong>, made by Cognition, is marketed as an autonomous AI software engineer — an agent you assign tasks to, which then plans, writes, tests, and iterates on code largely on its own, working asynchronously in its own environment rather than as an in-editor assistant. It represents the most ambitious end of AI coding: not autocomplete or a pair programmer, but a system meant to take a ticket and return a pull request.</p>

            <p>The most important 2026 news is price. With <strong>Devin 2.0</strong>, Cognition slashed the entry price from $500/mo to a <strong>Core plan starting at $20</strong>, with pay-as-you-go billing at $2.25 per ACU (Agentic Computing Unit — roughly 15 minutes of active autonomous work). The <strong>Team plan ($500/mo)</strong> includes 250 ACUs at a slightly better $2.00 rate with unlimited concurrent sessions (Core caps at 10). Enterprise is custom. This drop made Devin accessible to individual developers for the first time.</p>

            <p>Its strength is genuine autonomy on well-scoped tasks. For clearly defined, self-contained work — fixing a bug, implementing a small feature, writing tests, doing a migration — Devin can take the task and return working code with little supervision, running multiple sessions in parallel. For teams wanting to offload routine engineering chores, that asynchronous, fire-and-forget model is genuinely different from editor-based tools.</p>

            <p>The honest weaknesses: autonomy is also the risk — Devin can confidently go down wrong paths on ambiguous or complex tasks, and ACU-based billing means a task that spirals costs real money with less visibility than a flat subscription. It works best on well-scoped work and still needs human review. For interactive, in-editor development most engineers still prefer <a href="/tool/cursor">Cursor</a> or <a href="/tool/github-copilot">GitHub Copilot</a>, using Devin as a complement for delegatable tasks rather than a replacement.</p>

            <p>Who it is for: developers and teams who want to delegate well-scoped engineering tasks to an autonomous agent that works asynchronously. Who it is not for: those wanting interactive, in-editor assistance (use Cursor/Copilot), or anyone uncomfortable with usage-based costs on tasks that can occasionally run long.</p>
        `,
        useCases: [
            {
                title: "Delegating well-scoped tasks",
                body: "Devin's sweet spot: hand it a clearly defined, self-contained task — a bug fix, a small feature, a test suite, a migration — and it plans, codes, tests, and returns a pull request asynchronously, with little supervision. For routine, delegatable work it functions like an extra engineer.",
            },
            {
                title: "Parallel asynchronous work",
                body: "Because Devin works in its own environment rather than your editor, you can run multiple sessions at once (unlimited on Team), assigning several tasks in parallel. Teams use this to offload a batch of routine chores simultaneously rather than doing them one by one.",
            },
            {
                title: "Migrations and repetitive refactors",
                body: "Large, mechanical jobs — framework migrations, repetitive refactors across many files — suit Devin's autonomous model well, since the work is well-defined but tedious. It grinds through the repetition while engineers review the output.",
            },
        ],
        pricingDetail:
            "After the Devin 2.0 launch, pricing dropped dramatically: Core starts at $20 with pay-as-you-go billing at $2.25 per ACU (Agentic Computing Unit ≈ 15 minutes of active autonomous work), capped at 10 concurrent sessions; Team is $500/mo including 250 ACUs at a better $2.00 rate with unlimited concurrent sessions; Enterprise is custom. The shift from a flat $500 entry to a $20 usage-based Core made Devin accessible to individuals for the first time. The trap: ACU billing means a task that spirals or runs long costs real money with less predictability than a subscription — scope tasks well and watch ACU consumption.",
        faq: [
            {
                q: "How much does Devin cost now?",
                a: "With Devin 2.0, Cognition cut the entry price from $500/mo to a Core plan starting at $20, with pay-as-you-go billing at $2.25 per ACU. The Team plan is $500/mo with 250 ACUs at $2.00 each and unlimited concurrent sessions. This made Devin accessible to individual developers for the first time.",
            },
            {
                q: "What is an ACU?",
                a: "An ACU (Agentic Computing Unit) is Devin's normalized measure of resources used while actively working — VM time, model inference, and bandwidth. One ACU represents roughly 15 minutes of active autonomous work. You are billed per ACU consumed, so cost scales with how much actual work a task requires.",
            },
            {
                q: "Is Devin better than Cursor or GitHub Copilot?",
                a: "They are different categories. Devin is an autonomous agent you delegate whole tasks to, working asynchronously; Cursor and Copilot are interactive, in-editor assistants. Most engineers still prefer in-editor tools for day-to-day coding and use Devin to offload well-scoped, delegatable tasks. They complement rather than replace each other.",
            },
            {
                q: "Can Devin really work autonomously?",
                a: "On well-scoped, self-contained tasks, yes — it can plan, code, test, and return a pull request with little supervision. But autonomy is also its risk: on ambiguous or complex work it can confidently go down wrong paths, so human review remains essential. It is best treated as a capable junior engineer, not a hands-off replacement.",
            },
            {
                q: "What's the risk with Devin's pricing?",
                a: "ACU-based billing means costs scale with actual work, so a task that spirals or runs longer than expected consumes more ACUs and costs more — with less predictability than a flat subscription. Scope tasks clearly and monitor ACU consumption to avoid surprises, especially on the pay-as-you-go Core plan.",
            },
        ],
    },

    "microsoft-copilot": {
        overviewHtml: `
            <p><strong>Microsoft Copilot</strong> has a naming problem that costs real money, and clearing it up is the most useful thing this page can do.</p>

            <h3>Check which Copilot you are shopping for</h3>

            <p>Microsoft applies the Copilot name to several unrelated products. Two of them get confused constantly, and they are not variants of each other — they are different products, sold to different buyers, doing different jobs.</p>

            <p>This page is about the <strong>consumer assistant</strong>: the chat, web-answer and image-generation tool that appears in Windows, in Edge, on the web and on phones. You can use it without asking anyone's permission, it does not know anything about your employer's files, and there is a free tier.</p>

            <p><a href="/tool/microsoft-365-copilot">Microsoft 365 Copilot</a> is the other one: a licensed add-on that appears inside Word, Excel, PowerPoint, Outlook and Teams and works on your organisation's actual documents, mail and meetings. It is bought by an IT department, per seat, on top of an existing Microsoft 365 subscription. If what you want is something that can summarise the email thread you are looking at or build a deck from a file in your company's storage, this is not that, and no upgrade to the consumer tier will make it that.</p>

            <p>The tell is simple. If a person can buy it for themselves with a card, it is the consumer product. If a licence has to be assigned to them by an administrator, it is the work product. There is also a separately-branded coding assistant, <a href="/tool/github-copilot">GitHub Copilot</a>, which shares only the word.</p>

            <h3>The honest case for using it</h3>

            <p>The consumer assistant's argument is not capability, it is placement. It is in the operating system and the browser that a very large number of people already have open, which means the cost of asking it something is close to zero — no tab, no account decision, no subscription conversation with yourself. For questions that are quick, low-stakes and better answered with a look at the live web than from memory, that placement wins more often than a marginally better model in a different window does.</p>

            <p>That is a real benefit and a narrow one. It is the assistant you use because it is there, and being there is most of the value proposition. Judge it against the effort of opening something else rather than against a frontier assistant's ceiling, because the latter comparison is one it does not win.</p>

            <h3>When to use something else</h3>

            <p>Use a frontier assistant when the output matters. For long reasoning, substantial writing, code you intend to run, or analysis of a document you are going to act on, <a href="/tool/chatgpt">ChatGPT</a> and <a href="/tool/claude">Claude</a> are where people who do this work daily end up. Our <a href="/compare/chatgpt-vs-microsoft-copilot">ChatGPT vs Microsoft Copilot</a> comparison walks through where the gap shows up in practice.</p>

            <p>Use a research tool when you have to defend the answer. Web-grounded responses with links attached look like sourcing but are not the same as a product designed around citation; if the claim is going into something with your name on it, <a href="/tool/perplexity">Perplexity</a> is built for that job and this is not.</p>

            <p>And do not use the consumer assistant for anything confidential at work. A personal account is outside whatever data-handling arrangement your employer has negotiated, and pasting internal material into it is the exact behaviour organisations buy the licensed product to stop. If your company has not given you a sanctioned option, the answer is to ask for one, not to route around the question.</p>
        `,
        useCases: [
            {
                title: "The zero-effort question",
                body: "Quick, low-stakes lookups asked from the taskbar or the browser sidebar without opening anything. The entire benefit is that the cost of asking is near zero, which means it captures the questions that were never going to justify switching tools.",
            },
            {
                title: "Reading the page you are already on",
                body: "Summarising or interrogating the article or document open in the browser, where the context comes from the tab rather than from an upload. Convenient for triage; not a substitute for reading anything you intend to rely on.",
            },
        ],
        pricingDetail:
            "Microsoft Copilot (the consumer assistant) is freemium: the free tier includes conversational AI, web-grounded answers and image generation, built into Windows and Edge. Copilot Pro (around $20/mo) adds priority access to the newest models, better performance at peak times and enhanced image generation for heavier individual users. The important budgeting point is not the number but the product boundary: this consumer subscription is entirely separate from Microsoft 365 Copilot, the per-seat licence that works inside Word, Excel, Outlook and Teams on your organisation's content. Paying for Copilot Pro does not give you any of that, and the two are billed through different routes. Microsoft revises tier contents frequently, so confirm what each currently includes on its own pricing pages.",
        faq: [
            {
                q: "What is the difference between Microsoft Copilot and Microsoft 365 Copilot?",
                a: "They are different products that share a brand. Microsoft Copilot is the consumer assistant in Windows, Edge and the web: chat, web answers, image generation, free to start, bought by an individual. Microsoft 365 Copilot is a per-seat licence assigned by an administrator that works inside Word, Excel, PowerPoint, Outlook and Teams on your organisation's own documents, mail and meetings. Upgrading the consumer one never gets you the work one.",
            },
            {
                q: "Will it read my company's files or email?",
                a: "No. The consumer assistant has no connection to your organisation's storage, mailbox or meetings. That grounding is the defining capability of the licensed work product, and it is the single clearest line between the two.",
            },
            {
                q: "Is it as good as ChatGPT or Claude?",
                a: "For quick, low-stakes questions answered from the live web, the difference rarely matters and the convenience of it already being open often decides it. For extended reasoning, substantial writing, code, or work you will be held to, the frontier assistants are where people who do that work every day end up. Judge it on placement rather than on ceiling.",
            },
            {
                q: "Is Copilot Pro worth paying for?",
                a: "Only if you are a heavy individual user who is hitting the free tier's limits and specifically wants faster access to the newest models and better image generation. If you are considering it because you want it to work on your work documents, stop — that is a different product and this subscription will not get you there.",
            },
            {
                q: "Is it safe to paste work material into it?",
                a: "Treat a personal account as outside your employer's data-handling arrangements, because it is. Pasting internal material into a consumer assistant is precisely the behaviour that organisations license a work-grade product to prevent, and it is not something a setting toggle resolves. If there is no sanctioned option at your company, the right move is to ask for one.",
            },
        ],
    },

    "microsoft-365-copilot": {
        overviewHtml: `
            <p><strong>Microsoft 365 Copilot</strong> is a seat-based enterprise purchase, and enterprise purchases fail for reasons that have very little to do with how good the model is. Almost everything that determines whether this deployment is judged a success happens before anyone types a prompt: who gets a licence, how your files are permissioned, what you promised the finance committee it would do, and whether anyone can tell afterwards.</p>

            <p>So this page is about the buying decision. It assumes you already know it writes documents.</p>

            <h3>Two products share the name, and only one of them costs money</h3>

            <p>Clear this up first, because it is the most common source of confusion in this purchase. <a href="/tool/microsoft-copilot">Microsoft Copilot</a> is the free consumer assistant in Windows, Edge and the browser — chat, web answers, image generation, no connection to anything your company owns.</p>

            <p>Microsoft 365 Copilot is a licence an administrator assigns to a named person, on top of a qualifying Microsoft 365 subscription, that puts the assistant inside Word, Excel, PowerPoint, Outlook and Teams and connects it to your organisation's own content. The grounding in your own files is the entire product. Everything else about it is available for free somewhere else.</p>

            <h3>Copilot Chat is not the thing you are being sold</h3>

            <p>There is a chat experience available to eligible Microsoft 365 users at no additional licence cost, and it is the single biggest source of disappointed expectations here. It is a chat window with enterprise data protection on it. It is not the in-app assistant. It does not summarise the meeting you missed, it does not answer questions from your mailbox, and it does not analyse the spreadsheet you have open.</p>

            <p>The practical consequence is that a pilot run on the no-cost chat tier tells you nothing about whether the licensed product is worth buying, because the capability you are evaluating is absent from what you tested. Pilot the licensed version on a real team or do not pilot at all.</p>

            <h3>Grounding quality is a function of your permissions, not the model</h3>

            <p>This is the part that surprises organisations and it deserves to be understood before rollout rather than during it. Copilot answers from content the user already has access to. That sounds like a safety guarantee, and it is — but it is a guarantee about permissions, not about intent.</p>

            <p>Most large tenants have years of accumulated oversharing: sites shared with "everyone in the organisation" for convenience, files in a team space that half the company inherited access to, links generated for one recipient that became permanent. Nobody noticed, because finding those files required knowing they existed. A capable assistant over the same permissions is very good at finding things nobody knew they could reach. It has not leaked anything; it has surfaced an access model that was already wrong.</p>

            <p>Treat a permissions and oversharing review as a prerequisite of the deployment rather than a follow-up item. Organisations that skip it tend to discover the problem through an incident, and the incident gets attributed to the AI.</p>

            <h3>The per-app experience is uneven, and predictably so</h3>

            <p>Buyers evaluate this as one product and then use it as five, which is where the disappointment clusters. The pattern is consistent enough to plan around: the assistant does best where the input is a large amount of prose that needs compressing, and worst where correctness is binary and the source of truth is structured.</p>

            <p>Meeting recaps and long mail threads are the strongest cases; the work is summarisation and the reader can verify quickly. Drafting from an existing document is solid. Slide generation produces a serviceable starting structure and a deck nobody would present unedited. Spreadsheet work is the weakest link and the one most often demoed, because the failure mode is a confident formula that is subtly wrong, which is exactly the error type a non-expert reviewer cannot catch.</p>

            <p>Set expectations by app when you communicate the rollout. A user whose first three attempts were in Excel will conclude the product does not work, and they will not be entirely wrong about their case.</p>

            <h3>Buying seats for everyone is the common mistake</h3>

            <p>The distribution of value across an organisation is not uniform, and per-seat pricing punishes pretending otherwise. The people who gain most are the ones drowning in communication volume: managers in many meetings, roles that live in a mailbox, anyone who writes documents for a living. The people who gain least are those whose work is in a line-of-business application that Copilot does not touch, and they are frequently a majority of headcount.</p>

            <p>Deploy to the roles where the argument is obvious, instrument what happens, and expand on evidence. Watch for the pattern where licences are assigned broadly, enthusiasm carries the first month, and usage concentrates in a small group by the third — that is the shape of a renewal conversation that goes badly, and it is entirely avoidable by starting narrow.</p>

            <h3>When something else is the better purchase</h3>

            <p>If your organisation does not actually live in Office — if the documents are in another suite, the chat is elsewhere, the knowledge is in a wiki — the grounding advantage evaporates and you are paying a premium for an assistant that cannot see your work. <a href="/tool/notion-ai">Notion AI</a> makes the same argument for organisations whose content lives in Notion, and <a href="/compare/notion-ai-vs-microsoft-365-copilot">the comparison between them</a> is really a question about where your documents already are.</p>

            <p>If the need is individual rather than organisational — better writing, better reasoning, analysis of files a person uploads themselves — a frontier assistant like <a href="/tool/chatgpt">ChatGPT</a> or <a href="/tool/claude">Claude</a> typically delivers more capability per pound, with the trade-off that it knows nothing about your tenant.</p>

            <p>And if the goal is compliant coverage rather than capability, note that the no-cost chat tier already gives eligible users a protected place to work, which for some populations is the entire requirement. Buying licences for people whose real need was "somewhere sanctioned to paste things" is an expensive way to solve a cheap problem.</p>
        `,
        useCases: [
            {
                title: "Recapping meetings and the threads around them",
                body: "The strongest case by a distance: attendance is optional, decisions and actions are extracted, and the person who missed the call can verify the summary in seconds. This is also the capability that most reliably justifies a licence for a manager.",
            },
            {
                title: "Triaging a mailbox that has become the job",
                body: "Summarising long threads, surfacing what needs a response and drafting replies in context. Value scales with communication volume, which is why the licence pays for itself in some roles and sits unused in others.",
            },
            {
                title: "Drafting from documents you already own",
                body: "Producing a first version of a report, proposal or summary grounded in existing files rather than from a blank page. Reliable enough to change how the work starts, and still a draft that a subject-matter expert has to own.",
            },
            {
                title: "Turning a document into a presentable structure",
                body: "Generating a deck outline from source material, which saves the tedious part and produces something nobody should present unedited. Useful as scaffolding; misleading if demoed as a finished artefact.",
            },
            {
                title: "Answering questions from organisational content",
                body: "Locating the current version of a policy, a past proposal or a specification across the tenant. This is where an internal assistant beats any external one, and also where an untidy permissions model becomes visible.",
            },
            {
                title: "Giving staff a sanctioned place to work",
                body: "Moving the pasting that already happens in personal accounts onto infrastructure with enterprise data protection. Worth separating from the rest of the business case, because the no-cost chat tier may already cover this population.",
            },
        ],
        pricingDetail:
            "Microsoft 365 Copilot has a free-and-paid structure that is easy to misread. Copilot Chat is included at no additional licence cost for eligible Microsoft 365 users, but it does not connect to your Office apps — no reading mail, no meeting recaps, no analysis of your spreadsheets. The full in-app experience is a paid per-user add-on, quoted separately for business and enterprise customers, that sits on top of a qualifying Microsoft 365 subscription. Two things follow. The real cost is the sum of the underlying subscription and the add-on, so the add-on figure alone understates it for anyone not already licensed. And Microsoft has repeatedly revised both the per-seat rates and which plans qualify, so take current figures from Microsoft's own pricing page rather than from any summary, including this one.",
        faq: [
            {
                q: "Is Microsoft 365 Copilot free?",
                a: "Partly, and the free part is not the part people mean. Copilot Chat is included for eligible Microsoft 365 users, but it does not connect to your Office apps: it cannot read your mail, recap your meetings or analyse your spreadsheets. The in-app assistant that does those things is a paid per-user add-on on top of your existing subscription.",
            },
            {
                q: "Can we evaluate it on the free chat tier first?",
                a: "Not meaningfully. The capability you would be deciding on — grounding in your own documents, mail and meetings — is exactly what the no-cost tier lacks, so a pilot there measures a different product. Buy a small number of licences for a team whose work is communication-heavy and evaluate that instead.",
            },
            {
                q: "Can it see files a user should not have access to?",
                a: "It answers from content the user already has permission to open, so it does not bypass access controls. The practical risk is different: most large tenants have years of accidental oversharing that stayed harmless only because the files were hard to find. A capable assistant over the same permissions makes them easy to find. Run a permissions and oversharing review before rollout, not after.",
            },
            {
                q: "Which apps does it actually work well in?",
                a: "It is strongest where the job is compressing a lot of prose — meeting recaps, long mail threads, drafting from documents you already have. It is weakest in spreadsheets, where a confident but subtly wrong formula is the characteristic failure and the reviewer least able to catch it is the one most likely to have asked. Set expectations per app or users will generalise from their worst experience.",
            },
            {
                q: "Who should get a licence?",
                a: "Start with the roles whose day is communication volume: managers in many meetings, mailbox-centric functions, people who write documents for a living. Staff whose work happens in a line-of-business application outside the Office suite gain very little, and they are often the majority. Assigning licences broadly and hoping for uniform adoption is the pattern that produces a bad renewal conversation.",
            },
            {
                q: "How do we tell whether it worked?",
                a: "Decide before you buy, because retrofitting a measure to a renewal is not persuasive. Licence-level usage data will tell you who actually kept using it after the novelty passed, which is the most honest single signal available. Pair it with something concrete you expected to change — a meeting removed, a report no longer written by hand — rather than a self-reported time saving, which surveys inflate reliably.",
            },
            {
                q: "Should we buy this or a frontier assistant?",
                a: "They answer different questions. This is worth its premium only if the grounding in your own tenant is the point; if your documents, chat and knowledge live outside the Microsoft suite, you are paying for an advantage you cannot use. For individual capability — reasoning, writing, analysing files a person uploads — a frontier assistant generally gives more per seat, and plenty of organisations end up running both for different populations.",
            },
        ],
    },
};

/** Every slug that carries extended editorial content, across all batches. */
const ALL_TOOL_EXTENDED_CONTENT: Record<string, ToolExtendedContent> = {
    ...TOOL_EXTENDED_CONTENT,
    ...TOOL_EXTENDED_CONTENT_B2,
    ...TOOL_EXTENDED_CONTENT_B3,
    ...TOOL_EXTENDED_CONTENT_B4,
};

export function getExtendedContent(slug: string): ToolExtendedContent | null {
    return ALL_TOOL_EXTENDED_CONTENT[slug] ?? null;
}

/** True when the tool page renders an extended section, used for sitemap lastmod. */
export function hasExtendedContent(slug: string): boolean {
    return slug in ALL_TOOL_EXTENDED_CONTENT;
}
