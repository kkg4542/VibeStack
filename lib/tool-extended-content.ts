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
            <p><strong>Grammarly</strong> is the most widely used AI writing assistant, and its defining advantage is ubiquity: it works almost everywhere you type — browser, desktop apps, email, docs — checking grammar, spelling, tone, and clarity in real time. In 2026 it has grown from a corrector into a generative writing tool, with AI drafting, full-sentence rewrites, and tone adjustment now standard across every tier, including Free.</p>

            <p>The plan structure simplified in 2026 to <strong>Free, Pro, and Enterprise</strong>. <strong>Free</strong> covers the fundamentals — real-time grammar, spelling, punctuation, conciseness — plus 100 AI prompts per month, so you can use generative features without paying. <strong>Pro ($12/user/mo billed annually, $30 monthly)</strong> raises that to 2,000 AI prompts and adds plagiarism detection, full rewrites, and team features like style guides and brand tones, covering 1–149 seats. <strong>Enterprise</strong> (custom) adds unlimited AI, security controls, and governance for 150+ users.</p>

            <p>Its strength is being everywhere, frictionlessly. Because Grammarly runs as a browser extension and system-wide assistant, it improves your writing in the tools you already use without you having to go to a separate app. For professionals who write constantly across email, documents, and the web, that ambient, always-on correction is genuinely valuable and hard to replicate.</p>

            <p>The honest weaknesses: its suggestions can be over-eager, pushing changes that flatten voice or miss context, and its generative writing is competent but not as strong as a frontier model like <a href="/tool/chatgpt">ChatGPT</a> for substantial drafting. The free AI prompt cap (100/mo) is easy to exhaust, and privacy-conscious users are uneasy about a tool that reads everything they type. For heavy generative work, a dedicated assistant is better; Grammarly's edge is correction-in-place, not creation.</p>

            <p>Who it is for: professionals, students, and teams who write across many apps and want always-on grammar, clarity, and tone help. Who it is not for: users who mainly want long-form generative drafting (a general assistant is stronger), or anyone uncomfortable with a tool monitoring everything they type.</p>
        `,
        useCases: [
            {
                title: "Always-on writing correction",
                body: "Grammarly's core value: real-time grammar, spelling, clarity, and tone checks everywhere you type — email, docs, browser, chat. Because it is ambient and system-wide, it improves writing without requiring you to switch to a dedicated app.",
            },
            {
                title: "Tone and professionalism tuning",
                body: "Professionals use Grammarly's tone detection and rewrite suggestions to make sure an email or message lands the way they intend — more formal, more confident, more friendly. It catches tone problems that grammar checks miss.",
            },
            {
                title: "Team style and brand consistency",
                body: "On Pro and Enterprise, teams configure style guides and brand tones so everyone's writing stays consistent with company voice. Combined with plagiarism detection, it becomes a writing-governance layer for organizations.",
            },
        ],
        pricingDetail:
            "Grammarly simplified to three tiers in 2026: Free ($0, real-time grammar/spelling/clarity plus 100 AI prompts per month), Pro ($12/user/mo billed annually, or $30/mo monthly — 2,000 AI prompts, plagiarism detection, full-sentence rewrites, and team style guides, supporting 1–149 seats), and Enterprise (custom, with unlimited AI, security controls, and governance for 150+ users). AI features are now standard on every tier; the real difference is the prompt allowance — 100/mo Free, 2,000/mo Pro, unlimited Enterprise. The trap: the free 100-prompt cap is easy to hit if you lean on generative rewrites, and monthly Pro billing ($30) is more than double the annual rate ($12).",
        faq: [
            {
                q: "Does the free Grammarly plan include AI features?",
                a: "Yes. As of 2026 generative AI is standard on every tier, including Free, which gets 100 AI prompts per month alongside unlimited real-time grammar, spelling, and clarity checks. Pro raises the allowance to 2,000 prompts and Enterprise to unlimited.",
            },
            {
                q: "Is Grammarly Pro worth it over Free?",
                a: "If you use generative rewrites heavily or need plagiarism detection, full-sentence rewrites, and team style guides, yes — the jump from 100 to 2,000 monthly AI prompts is the main reason. If you mostly want basic grammar and spelling correction, the free tier is genuinely sufficient.",
            },
            {
                q: "Can Grammarly replace ChatGPT for writing?",
                a: "Not really — they do different jobs. Grammarly excels at correcting and polishing what you write, everywhere you write it. ChatGPT is stronger for generating substantial drafts from scratch. Many writers use Grammarly for ambient correction and a general assistant for heavy drafting.",
            },
            {
                q: "How much does Grammarly Pro actually cost?",
                a: "Pro is $12 per user per month when billed annually, but $30 per month if you pay month-to-month — so the annual commitment is more than half off. It supports 1 to 149 seats and now covers everything the old Business plan handled.",
            },
            {
                q: "Is Grammarly a privacy concern?",
                a: "It is a reasonable consideration. Grammarly works by reading what you type across apps and the web, which some privacy-conscious users and organizations are uncomfortable with. Grammarly offers security controls on Enterprise, but if you handle highly sensitive text, review its data handling before deploying it widely.",
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
            <p><strong>Jira</strong>, made by Atlassian, is the dominant issue tracker and project management tool for software teams. For agile development — sprints, backlogs, scrum and kanban boards, and detailed issue workflows — it is the industry default, deeply entrenched in how most engineering organizations plan and track work. In 2026 it folds in <strong>Atlassian Intelligence</strong>, AI that helps draft issues, summarize work, surface dependencies via natural language, and assist with editing.</p>

            <p>The plan structure: <strong>Free</strong> covers up to 10 users with scrum/kanban boards, agile reporting, and custom workflows — genuinely usable for small teams. <strong>Standard (~$7.91/user/mo)</strong> adds scale and permissions, while <strong>Premium (~$14.54/user/mo)</strong> is where the AI lives — Atlassian Intelligence is included at no extra charge, along with advanced roadmaps, automation, and a 99.9% SLA. <strong>Enterprise</strong> (custom) adds centralized security and unlimited sites.</p>

            <p>Its strengths are depth and ecosystem. Nothing matches Jira's configurability for complex software workflows, its reporting, or its integration ecosystem — and it ties tightly into the rest of Atlassian (Confluence, Bitbucket). For large engineering teams with intricate processes, that depth is exactly why it remains the standard.</p>

            <p>The honest weaknesses: that same depth makes Jira heavy and complex — it can feel like overkill and slow down small teams who do not need its machinery, and the AI features only arrive at the Premium tier. Teams wanting a lighter, faster experience often prefer <a href="/tool/linear">Linear</a>, and those wanting an all-in-one flexible workspace look at <a href="/tool/clickup">ClickUp</a> or <a href="/tool/asana">Asana</a>. See our <a href="/tool/linear">Linear</a> review for the full comparison.</p>

            <p>Who it is for: software teams — especially larger ones — that need deep agile workflows, configurability, and the Atlassian ecosystem. Who it is not for: small teams who want speed and simplicity, or anyone who finds Jira's complexity outweighs its power for their scale.</p>
        `,
        useCases: [
            {
                title: "Agile software development",
                body: "Jira's core: managing sprints, backlogs, and scrum/kanban boards with detailed issue workflows. For engineering teams running agile, it is the default tool, with the reporting and configurability to support complex development processes at scale.",
            },
            {
                title: "Cross-project roadmaps and dependencies",
                body: "On Premium, advanced roadmaps map cross-project dependencies, and Atlassian Intelligence helps surface related issues via natural language. Large organizations use this to coordinate work spanning many teams and projects.",
            },
            {
                title: "Atlassian ecosystem integration",
                body: "Teams already using Confluence and Bitbucket use Jira as the connective tissue of their workflow — issues link to docs and code, creating an integrated planning-to-shipping pipeline that standalone trackers cannot replicate.",
            },
        ],
        pricingDetail:
            "Jira has four tiers: Free (up to 10 users, scrum/kanban boards, agile reporting, custom workflows, 2GB storage), Standard (~$7.91/user/mo, more scale and permissions), Premium (~$14.54/user/mo, up to 300 users), and Enterprise (custom). The key thing for AI buyers: Atlassian Intelligence is included at no extra charge but only from the Premium tier — Free and Standard users do not get the AI features. Annual billing saves up to 20%. For very large self-hosted deployments, Jira Data Center starts at around $51,000/year, a different league entirely.",
        faq: [
            {
                q: "Which Jira plan includes AI?",
                a: "Atlassian Intelligence is included at no extra cost starting with the Premium tier (~$14.54/user/mo). Free and Standard plans do not include the AI features, so if AI-assisted issue drafting, summarizing, and dependency surfacing matter to you, you need Premium or Enterprise.",
            },
            {
                q: "Is Jira's free plan actually usable?",
                a: "Yes, for small teams. The free tier supports up to 10 users with scrum and kanban boards, agile reporting, and custom workflows — enough to run real agile development. The main limits are 2GB storage and the lack of AI and advanced roadmap features.",
            },
            {
                q: "Jira or Linear — which should we use?",
                a: "Jira is deeper, more configurable, and the standard for large or complex engineering organizations, especially within the Atlassian ecosystem. Linear is faster, simpler, and favored by teams who value speed and a clean experience over configurability. Choose based on whether you need depth or lightness. See our Jira vs Linear comparison.",
            },
            {
                q: "Is Jira too complex for a small team?",
                a: "It can be. Jira's power comes from depth and configurability, which is overkill for small teams with simple needs and can slow them down. If your team wants to move fast without heavy setup, a lighter tool like Linear is often a better fit than Jira's full machinery.",
            },
            {
                q: "Does Jira work well with other Atlassian tools?",
                a: "Yes — that is one of its biggest advantages. Jira integrates tightly with Confluence (docs) and Bitbucket (code), letting issues link to documentation and source. For teams already in the Atlassian ecosystem, this connected workflow is a major reason to choose it.",
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
            <p><strong>Asana</strong> is a work management platform for coordinating tasks, projects, and goals across teams. Where some tools target engineers specifically, Asana aims broadly at cross-functional work — marketing, operations, product, and beyond — with a clean interface and strong reporting. In 2026 it adds <strong>AI Studio</strong>, which lets teams build AI-powered workflows and automate routine work, included at a basic level starting from the Starter tier.</p>

            <p>The plan structure: the <strong>Personal</strong> plan is free for small groups (up to 10 users with basic features but no timelines, goals, or automations). <strong>Starter ($10.99/user/mo)</strong> adds timeline and Gantt views, unlimited automations, dashboards, forms, and AI Studio Basic with 50,000 monthly credits. <strong>Advanced ($24.99/user/mo)</strong> brings goals, portfolios, workload tracking, and deeper integrations. <strong>Enterprise</strong> (custom) adds governance and scale.</p>

            <p>Its strengths are clarity and cross-team coordination. Asana is easier to onboard than heavier tools, its reporting and goal-tracking are strong, and it works well for organizations coordinating many types of work rather than just software. The inclusion of AI Studio Basic from the Starter tier means AI is available without jumping to the top plan.</p>

            <p>The honest weaknesses: the free Personal tier is limited (no timelines, goals, or automations), so real use generally requires a paid plan, and per-seat costs add up for larger teams. For pure software development, engineering teams often prefer <a href="/tool/jira">Jira</a> or <a href="/tool/linear">Linear</a>; for maximum flexibility and feature density, <a href="/tool/clickup">ClickUp</a> packs more per dollar. Asana's sweet spot is clean cross-functional coordination rather than deep specialization. See our <a href="/tool/monday">Monday.com</a> review for the full comparison.</p>

            <p>Who it is for: cross-functional teams who want a clean, well-organized work management tool with strong reporting and approachable onboarding. Who it is not for: engineering teams needing deep agile tooling (Jira/Linear), or very small teams who can't justify paying past the limited free tier.</p>
        `,
        useCases: [
            {
                title: "Cross-functional project coordination",
                body: "Asana's strength: coordinating projects across marketing, operations, product, and other teams in one clean system. Its approachable interface and strong reporting make it well-suited to organizations managing many types of work, not just software.",
            },
            {
                title: "Goals and portfolio tracking",
                body: "On Advanced and above, teams track individual, team, and org-wide goals and manage portfolios of projects with workload views. Leadership uses this to connect day-to-day work to higher-level objectives across the organization.",
            },
            {
                title: "AI-powered workflow automation",
                body: "AI Studio lets teams build AI workflows that take on routine, manual work — included at a basic level (50,000 monthly credits) from the Starter tier. Teams automate intake, triage, and status updates without needing the top plan.",
            },
        ],
        pricingDetail:
            "Asana offers Personal (free, up to 10 users with basic features but no timelines, goals, or automations), Starter ($10.99/user/mo annually — timeline/Gantt, unlimited automations, dashboards, forms, plus AI Studio Basic with 50,000 monthly credits), Advanced ($24.99/user/mo annually — goals, portfolios, workload, advanced integrations), and Enterprise/Enterprise+ (custom). AI Studio comes in Basic (included, rate-limited), Plus (paid), and Pro (paid, annual) options. The thing to note: the free tier is genuinely limited — no timelines, goals, or automations — so most teams that need real project management will be on Starter or above, where per-seat costs add up at scale.",
        faq: [
            {
                q: "Does Asana include AI?",
                a: "Yes — AI Studio is available from the Starter tier, with AI Studio Basic included (50,000 monthly credits, rate-limited) and paid Plus and Pro options for heavier use. Unlike some competitors where AI is a separate add-on, Asana includes entry-level AI capabilities starting at Starter.",
            },
            {
                q: "Is Asana's free plan enough?",
                a: "Only for very basic use. The free Personal plan supports up to 10 users but lacks timelines, goals, and automations — the features most teams actually need for real project management. Serious use generally requires Starter ($10.99/user/mo) or above.",
            },
            {
                q: "Asana or Monday.com — which is better?",
                a: "Both are strong cross-functional work management tools. Asana is known for clean organization, strong goal-tracking, and approachable reporting; Monday.com is more visual and highly customizable. The choice often comes down to whether your team prefers Asana's structured clarity or Monday's colorful flexibility. See our Asana vs Monday.com comparison.",
            },
            {
                q: "Is Asana good for software teams?",
                a: "It can work, but dedicated engineering teams often prefer Jira or Linear for deep agile workflows. Asana's strength is cross-functional coordination across marketing, ops, and product rather than specialized software development. If your work spans many functions, Asana fits; if it is pure engineering, consider a dev-focused tool.",
            },
            {
                q: "What is AI Studio?",
                a: "AI Studio is Asana's framework for building AI-powered workflows that automate routine, manual work — intake, triage, status updates, and more. It comes in Basic (included from Starter, with limits), Plus, and Pro tiers, letting teams add AI automation without moving to the top plan.",
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
            <p><strong>Linear</strong> is a project and issue tracker built for software teams who value speed and focus. Where <a href="/tool/jira">Jira</a> optimizes for depth and configurability, Linear optimizes for the opposite: a fast, keyboard-driven, opinionated experience that gets out of the way. It has become the tool of choice for many startups and product teams who found heavier trackers slowing them down, and in 2026 it has layered in AI agents and AI-assisted workflows without compromising that speed-first identity.</p>

            <p>The plan structure is simple. <strong>Free</strong> supports unlimited members with a cap on issues and is genuinely enough for small teams to run real work. <strong>Basic (around $8/user/mo)</strong> raises limits, and <strong>Business (around $14/user/mo)</strong> adds advanced features, more integrations, and AI capabilities. Enterprise (custom) brings SSO, advanced security, and scale. Pricing is per active user, billed monthly or annually.</p>

            <p>Its strengths are speed, design, and opinion. Linear is fast, every interaction is keyboard-accessible, and its strong defaults mean teams spend time shipping rather than configuring. The product's cycles, projects, and roadmap features encode a particular, effective way of working — which is exactly why teams who align with that philosophy love it.</p>

            <p>The honest weaknesses: that same opinionatedness means Linear is less configurable than Jira, so teams with complex, non-standard processes can hit its guardrails. It is built primarily for software development, so cross-functional, non-engineering teams may find <a href="/tool/asana">Asana</a> or <a href="/tool/clickup">ClickUp</a> a better fit. And as it adds features, some worry it could drift from its lean roots. See our <a href="/tool/jira">Jira</a> review for the full comparison.</p>

            <p>Who it is for: startups and product/engineering teams who want a fast, focused, well-designed tracker with strong defaults. Who it is not for: organizations needing deep configurability for complex workflows (Jira), or cross-functional teams whose work spans far beyond software.</p>
        `,
        useCases: [
            {
                title: "Fast issue tracking for product teams",
                body: "Linear's core: a fast, keyboard-driven tracker where creating, triaging, and updating issues feels instant. Product and engineering teams adopt it specifically to escape the friction of heavier tools and keep momentum on shipping.",
            },
            {
                title: "Cycle-based planning",
                body: "Linear's cycles (its take on sprints) and projects encode an effective, opinionated workflow. Teams use them to plan in short iterations with clear scope, leaning on Linear's strong defaults instead of configuring everything from scratch.",
            },
            {
                title: "AI-assisted triage and workflows",
                body: "With its 2026 AI agents and AI-assisted features, Linear helps draft issues, summarize, and automate routine triage — adding intelligence without slowing down the fast core experience the tool is known for.",
            },
        ],
        pricingDetail:
            "Linear keeps pricing simple: Free (unlimited members with an issue cap, enough for small teams), Basic (around $8/user/mo), Business (around $14/user/mo, adding advanced features, more integrations, and AI), and Enterprise (custom, with SSO and advanced security). Billing is per active user, monthly or annual, with the usual annual discount. Because exact figures shift, confirm current numbers on Linear's site before quoting them to a team. The main thing to weigh is not the price — which is reasonable — but whether Linear's opinionated, software-focused workflow matches how your team actually works.",
        faq: [
            {
                q: "Linear or Jira — which should we use?",
                a: "Linear is faster, cleaner, and opinionated — ideal for startups and product teams who value speed over configurability. Jira is deeper and more customizable — better for large or complex engineering organizations, especially in the Atlassian ecosystem. Choose based on whether you want lightness or depth. See our Jira vs Linear comparison.",
            },
            {
                q: "Is Linear's free plan enough?",
                a: "For small teams, often yes. The free plan supports unlimited members with a cap on issues, which covers real work for early-stage teams. You move to a paid tier when you hit the issue limit or need advanced features, integrations, and AI capabilities.",
            },
            {
                q: "Is Linear only for software teams?",
                a: "It is built primarily for software development — its cycles, projects, and workflows reflect how engineering teams ship. Some cross-functional teams use it, but if your work spans marketing, ops, and other non-engineering functions heavily, a broader tool like Asana or ClickUp usually fits better.",
            },
            {
                q: "Does Linear have AI features?",
                a: "Yes. In 2026 Linear added AI agents and AI-assisted workflows — helping draft issues, summarize, and automate triage — on its higher tiers. The notable thing is that it added these without compromising the fast, focused experience that defines the product.",
            },
            {
                q: "Why do teams switch to Linear?",
                a: "Almost always for speed and focus. Teams frustrated by slow, over-configurable trackers move to Linear for its fast, keyboard-driven interface and strong opinionated defaults, which let them spend time shipping rather than configuring. The trade-off is less flexibility for unusual workflows.",
            },
        ],
    },

    monday: {
        overviewHtml: `
            <p><strong>Monday.com</strong> is a highly visual "Work OS" — a flexible platform for managing projects, CRM, operations, and more through colorful, customizable boards. Its appeal is approachability: teams can shape it to almost any workflow without technical skill, and the bright, visual interface makes status obvious at a glance. In 2026 it bundles AI features (monday AI) for automations, content generation, and surfacing insights across boards.</p>

            <p>The plan structure spans several tiers. <strong>Free</strong> is limited to a small number of seats and basic boards. <strong>Basic (around $9/seat/mo)</strong> and <strong>Standard (around $12/seat/mo)</strong> add timeline views, automations, and integrations, with Standard being the common starting point for real teams. <strong>Pro (around $19/seat/mo)</strong> brings advanced automations, time tracking, and more AI, and Enterprise (custom) adds governance and scale. Pricing is per seat and scales quickly with team size.</p>

            <p>Its strengths are flexibility and visual clarity. Monday adapts to project management, sales pipelines, marketing calendars, and operations workflows equally well, and non-technical teams onboard quickly because the interface is intuitive and satisfying to use. For organizations that want one adaptable system across many departments, it is a strong fit.</p>

            <p>The honest weaknesses: per-seat pricing climbs fast for larger teams, and seats are often sold in tiers (e.g. 3, 5) that force you to pay for unused seats. The flexibility can also become clutter without discipline, and heavy users sometimes find the AI features shallower than the marketing suggests. Teams comparing options also look at <a href="/tool/asana">Asana</a> (cleaner, goal-focused) and <a href="/tool/clickup">ClickUp</a> (more features per dollar). See our full <a href="/tool/asana">Asana</a> review for more.</p>

            <p>Who it is for: cross-functional teams who want a flexible, visual platform that adapts across departments without technical setup. Who it is not for: cost-sensitive teams wary of per-seat pricing, or teams who want depth in one domain rather than broad adaptability.</p>
        `,
        useCases: [
            {
                title: "Visual project and operations management",
                body: "Monday's signature use: colorful, customizable boards that make project and operations status obvious at a glance. Teams shape boards to their workflow — tasks, pipelines, calendars — and the visual interface keeps everyone aligned without digging.",
            },
            {
                title: "Cross-department Work OS",
                body: "Because monday adapts to project management, CRM, marketing, and operations alike, organizations use it as a single platform across departments. One tool covering many functions reduces tool sprawl for teams that value consistency.",
            },
            {
                title: "AI-assisted automation",
                body: "monday AI adds automations, content generation, and insight-surfacing across boards — automating status updates, drafting content, and flagging risks. It layers intelligence onto the visual workflow without requiring technical setup.",
            },
        ],
        pricingDetail:
            "Monday.com offers Free (limited seats and basic boards), Basic (around $9/seat/mo), Standard (around $12/seat/mo, the common real-team starting point with timeline views and automations), Pro (around $19/seat/mo, advanced automations, time tracking, more AI), and Enterprise (custom). The pricing traps to know: it is per seat and climbs quickly with team size, and seats are often sold in fixed tiers (3, 5, etc.), so you can end up paying for unused seats. Confirm current per-seat numbers on monday's site, as they adjust periodically.",
        faq: [
            {
                q: "Asana or Monday.com — which is better?",
                a: "Both are strong cross-functional work tools. Monday is more visual, colorful, and broadly adaptable across departments; Asana is cleaner with stronger goal-tracking and reporting. The choice usually comes down to whether your team prefers Monday's flexible, visual style or Asana's structured clarity. See our Asana vs Monday.com comparison.",
            },
            {
                q: "How does Monday.com's seat pricing work?",
                a: "Pricing is per seat and often sold in fixed tiers (such as 3 or 5 seats), so you may pay for seats you don't fully use, and costs climb quickly as the team grows. Budget by total seats across the tiers rather than the headline per-seat number.",
            },
            {
                q: "Is the free Monday.com plan usable?",
                a: "Only for very small teams or trials — the free tier is limited in seats and features. Most real teams start on Standard (around $12/seat/mo) for timeline views, automations, and integrations. Factor the per-seat cost into your decision early.",
            },
            {
                q: "What can monday AI do?",
                a: "monday AI adds automations, content generation, and insight-surfacing across your boards — drafting updates, automating routine steps, and flagging risks. It is genuinely useful for cutting manual work, though some heavy users find it shallower than the marketing implies.",
            },
            {
                q: "Is Monday.com good for software teams?",
                a: "It can work, but it is a general Work OS rather than a developer-specific tool. Engineering teams who want deep agile workflows usually prefer Jira or Linear, while monday shines for cross-functional and operations work where visual flexibility matters more than dev-specific features.",
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
            <p><strong>Microsoft Copilot</strong> is Microsoft's consumer AI assistant — a chat, search, and image-generation tool integrated across Windows, Edge, and Bing. It is positioned as the everyday AI companion for the Microsoft ecosystem: built into the operating system and browser most people already use, with web-grounded answers and image generation, free to start. It is distinct from <a href="/tool/microsoft-365-copilot">Microsoft 365 Copilot</a>, which is the paid, Office-integrated version for work documents.</p>

            <p>The pricing is straightforward freemium. <strong>Free</strong> gives conversational AI, web-grounded answers, and image generation, built into Windows and Edge. <strong>Copilot Pro (around $20/mo)</strong> adds priority access to the latest models, faster performance during peak times, and enhanced image generation. For most consumers the free tier covers everyday needs, with Pro aimed at heavier individual users.</p>

            <p>Its strengths are accessibility and integration. Because Copilot is built into Windows and Edge, it is the AI that is simply <em>there</em> for hundreds of millions of users — no install, no separate app, free to use. For quick questions, web-grounded answers with citations, and casual image generation within the Microsoft environment, it is convenient and capable.</p>

            <p>The honest weaknesses: on hard reasoning, coding, or specialized tasks it generally trails the frontier offerings of <a href="/tool/chatgpt">ChatGPT</a> and <a href="/tool/claude">Claude</a>, and the experience can feel inconsistent across its many surfaces (Windows, Edge, web, mobile). It is a strong default for Microsoft users but rarely the most capable choice for demanding work. Note also that the consumer Copilot is separate from the work-focused Microsoft 365 Copilot, which is a different product and price.</p>

            <p>Who it is for: Windows and Edge users who want a free, built-in AI assistant for everyday questions, web answers, and casual image generation. Who it is not for: users with demanding reasoning, coding, or specialized needs (a frontier assistant serves better), or those seeking deep Office-document integration (that is Microsoft 365 Copilot).</p>
        `,
        useCases: [
            {
                title: "Built-in everyday assistant",
                body: "Copilot's main role: the AI that is simply present in Windows and Edge for everyday questions, quick help, and web-grounded answers. For hundreds of millions of Microsoft users, it is the zero-setup, free assistant always within reach.",
            },
            {
                title: "Web-grounded search and answers",
                body: "Built on Bing, Copilot provides conversational answers grounded in live web results with citations — useful for quick research and fact-checking directly in the browser without switching to a separate tool.",
            },
            {
                title: "Casual image generation",
                body: "Copilot includes image generation, letting users create visuals from prompts for free within the Microsoft environment. For casual, occasional image needs it is convenient, though dedicated tools produce higher-quality results.",
            },
        ],
        pricingDetail:
            "Microsoft Copilot (the consumer assistant) is freemium: Free includes conversational AI, web-grounded answers, and image generation, built into Windows and Edge. Copilot Pro (around $20/mo) adds priority access to the latest models, faster performance during peak times, and enhanced image generation for heavier individual users. Important distinction: this consumer Copilot is separate from Microsoft 365 Copilot, the paid Office-integrated product (Business ~$18–21/user/mo) that works inside Word, Excel, and Teams. Don't confuse the two — they are different products at different prices for different needs.",
        faq: [
            {
                q: "What's the difference between Microsoft Copilot and Microsoft 365 Copilot?",
                a: "Microsoft Copilot is the free consumer assistant built into Windows, Edge, and Bing for chat, web answers, and image generation. Microsoft 365 Copilot is the paid, work-focused product (~$18–21/user/mo) that integrates into Word, Excel, PowerPoint, Outlook, and Teams to work on your documents. Same brand, different products and prices.",
            },
            {
                q: "Is Microsoft Copilot free?",
                a: "Yes — the consumer Copilot is free, with conversational AI, web-grounded answers, and image generation built into Windows and Edge. Copilot Pro (around $20/mo) adds priority model access, faster peak performance, and enhanced image generation for users who want more.",
            },
            {
                q: "Is Microsoft Copilot as good as ChatGPT?",
                a: "For everyday questions and web-grounded answers, it is convenient and capable, especially given it's free and built into Windows. But on hard reasoning, coding, and specialized tasks it generally trails frontier assistants like ChatGPT and Claude. It is a strong default rather than the most powerful option.",
            },
            {
                q: "Where can I use Microsoft Copilot?",
                a: "It is integrated across Windows (built into the OS), Edge (in the browser), Bing (search), and available on the web and mobile apps. This ubiquity within the Microsoft ecosystem is its main advantage — though the experience can feel somewhat inconsistent across these different surfaces.",
            },
            {
                q: "Is Copilot Pro worth $20/month?",
                a: "For most casual users, the free tier is enough. Copilot Pro makes sense if you use it heavily and want priority access to the latest models, faster responses during peak times, and better image generation. If you mainly need occasional answers, the free version covers it.",
            },
        ],
    },

    "microsoft-365-copilot": {
        overviewHtml: `
            <p><strong>Microsoft 365 Copilot</strong> is the AI assistant woven directly into the Microsoft Office apps — Word, Excel, PowerPoint, Outlook, and Teams. Unlike a standalone chatbot, its whole value is that it works on <em>your</em> content: drafting documents, analyzing spreadsheets, building presentations, summarizing email threads, and recapping Teams meetings, all grounded in your organization's files and data via Microsoft Graph. For enterprises already standardized on Office, it brings AI to where work already happens.</p>

            <p>The pricing has a free-and-paid structure that is easy to misread. <strong>Microsoft 365 Copilot Chat</strong> is available at no additional cost for eligible Microsoft 365 users, but it does <em>not</em> connect to your Office apps — it can't read your emails, summarize your meetings, or analyze your Excel data. The full in-app experience requires a paid add-on: <strong>Business (around $18–21/user/mo)</strong> on top of a qualifying Microsoft 365 plan, or <strong>Enterprise (around $30/user/mo)</strong>. The promotional $18 Business rate runs through mid-2026 before rising.</p>

            <p>Its strengths are deep integration and enterprise grounding. Because it operates inside the Office apps on your real documents and data, it can do things no external assistant can — summarize the specific email thread, build a deck from your existing files, analyze your actual spreadsheet — all within Microsoft's enterprise security and compliance boundary. For large organizations, that combination is uniquely valuable.</p>

            <p>The honest weaknesses: the cost is significant — a paid add-on per user <em>on top of</em> an existing Microsoft 365 subscription — and output quality varies by app, with some integrations stronger than others. The free Copilot Chat tier's lack of document connection confuses buyers who expect the full experience. For individuals or teams not deep in Office, a general assistant or <a href="/tool/notion-ai">Notion AI</a> may deliver more value per dollar. It is also distinct from the free consumer <a href="/tool/microsoft-copilot">Microsoft Copilot</a>.</p>

            <p>Who it is for: enterprises and teams standardized on Microsoft Office who want AI grounded in their real documents, email, and meetings within Microsoft's security boundary. Who it is not for: individuals or small teams not heavily invested in Office, or anyone unwilling to pay an add-on on top of their existing Microsoft 365 subscription.</p>
        `,
        useCases: [
            {
                title: "AI across Word, Excel, and PowerPoint",
                body: "Microsoft 365 Copilot's core: drafting documents in Word, analyzing and formulating in Excel, and building presentations in PowerPoint — all working on your actual files. It brings AI assistance into the apps where the work already happens rather than a separate window.",
            },
            {
                title: "Email and meeting intelligence",
                body: "In Outlook and Teams, Copilot summarizes long email threads, drafts replies, and recaps meetings — including what you missed and the action items. For information-heavy roles, this recall and summarization across communications is a major time saver.",
            },
            {
                title: "Enterprise-grounded answers",
                body: "Through Microsoft Graph, Copilot answers grounded in your organization's documents and data within Microsoft's security and compliance boundary. It can pull from your real files to answer work questions, something external assistants can't do safely.",
            },
        ],
        pricingDetail:
            "Microsoft 365 Copilot has a free-and-paid structure that's easy to misread. Copilot Chat is included at no additional cost for eligible Microsoft 365 users — but it does NOT connect to your Office apps (no reading email, summarizing meetings, or analyzing Excel). The full in-app experience requires a paid add-on: Business (around $18–21/user/mo, with the $18 promotional annual rate running through June 30, 2026 before rising to $21) on top of a qualifying Microsoft 365 plan, or Enterprise (around $30/user/mo). The key trap: the meaningful AI requires both an existing Microsoft 365 subscription and the Copilot add-on, so the real cost is the sum of both.",
        faq: [
            {
                q: "Is Microsoft 365 Copilot free?",
                a: "Partly. Microsoft 365 Copilot Chat is included at no extra cost for eligible Microsoft 365 users, but it does not connect to your Office apps — it can't read your email, summarize meetings, or analyze your spreadsheets. The full in-app experience requires a paid add-on (Business ~$18–21/user/mo or Enterprise ~$30) on top of your Microsoft 365 plan.",
            },
            {
                q: "What does Microsoft 365 Copilot actually cost?",
                a: "The meaningful version requires two things: a qualifying Microsoft 365 subscription plus the Copilot add-on (around $18–21/user/mo for Business, with $18 promotional through June 2026, or ~$30 for Enterprise). The real cost is the sum of both — the add-on price alone understates it if you're not already on Microsoft 365.",
            },
            {
                q: "How is this different from the free Microsoft Copilot?",
                a: "Microsoft Copilot is the free consumer assistant in Windows, Edge, and Bing for chat and web answers. Microsoft 365 Copilot is the paid, work-focused product that integrates into Word, Excel, PowerPoint, Outlook, and Teams to work on your actual documents and data. Same brand, very different products.",
            },
            {
                q: "Is Microsoft 365 Copilot worth it?",
                a: "For enterprises deeply standardized on Office, yes — its ability to work on your real documents, email, and meetings within Microsoft's security boundary is something no external assistant can match. For individuals or teams not heavily invested in Office, a general assistant or Notion AI often delivers more value per dollar.",
            },
            {
                q: "What can Microsoft 365 Copilot do that ChatGPT can't?",
                a: "It operates inside your Office apps on your actual content — summarizing the specific email thread, building a deck from your existing files, analyzing your real spreadsheet, recapping your Teams meeting — all grounded in your organization's data via Microsoft Graph and within enterprise compliance. A general assistant like ChatGPT has no access to that internal context.",
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
