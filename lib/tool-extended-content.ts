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
            "Claude offers Free ($0), Pro ($20/mo), Max 5x ($100/mo), Max 20x ($200/mo), Team (from $25/seat/mo), and Enterprise (custom). The critical thing to understand: the Max tiers are usage multipliers, not model upgrades — Max 5x and 20x give you the same models as Pro but with 5x and 20x the per-session capacity. Buy Max only if you are hitting Pro's session limits, not because you expect a smarter model. On the API side, the Opus 4.6 launch cut input/output costs by 67% (from $15/$75 to $5/$25 per million tokens), and the June 2026 launch of Sonnet 5 added a cheaper mid-tier option at an introductory $2/$10 per million tokens (rising to $3/$15 from September 2026). Anthropic keeps several model families in market at once and re-tiers and renames them often, so read the current lineup and per-token rates off Anthropic's own pricing page rather than planning around a version number quoted here.",
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

            <p>Against <a href="/tool/github-copilot">GitHub Copilot</a> the trade is editor depth versus institutional fit: Cursor's agent does more inside the editor, while Copilot sits closer to pull requests, organisation policy, and a purchasing path most companies have already walked — <a href="/compare/cursor-vs-github-copilot">Cursor vs GitHub Copilot</a> works through it. The rival AI-native editors Cursor is usually weighed against have a habit of being acquired and folded into something else, which is its own argument for the incumbent when you are committing a team's daily workflow for a year. Against generation-first tools like <a href="/tool/v0-by-vercel">v0</a> and <a href="/tool/bolt-new">Bolt.new</a> there is barely a comparison to make, because those start projects and Cursor maintains them. Plenty of developers use one of each.</p>

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

            <p>Evaluated by a developer alone, Copilot is a competent, broadly available assistant with inline completions, chat, and an agent mode that now reaches the JetBrains IDEs as well as VS Code — the latter mattering more than it sounds, because it brought agentic assistance to a large population of Java, Kotlin, and Python developers who were never going to switch editors. On raw editing power it is a reasonable tool that rarely wins a head-to-head against <a href="/tool/cursor">Cursor</a>.</p>

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

            <p>Use something else when the deliverable moves. Video is a different discipline with different tools — <a href="/compare/midjourney-vs-runway">Midjourney vs Runway</a> covers where the line falls, and our piece on <a href="/blog/sora-video-generation-revolution">where generative video has got to</a> is the wider view.</p>

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
            <p><strong>Canva</strong> is usually described as design software for people who are not designers, which is accurate and slightly misses the point. Its actual product is constraint. Templates, brand kits and locked elements let someone with no training produce something that looks deliberate, because most of the decisions that would go wrong have already been made by somebody else.</p>

            <p>That reframing changes how you evaluate it. The question is not whether Canva can make a poster. It is whether your organisation has a supply of design decisions that needs distributing to people who should not be making those decisions themselves.</p>

            <h3>The brand kit is the product</h3>

            <p>Individuals adopt Canva for the templates. Organisations keep it for the brand kit, and the two are different purchases.</p>

            <p>A brand kit holds the fonts, the colours, the logo variants and the approved assets, and it can be attached to templates that lock some elements and leave others editable. The consequence is structural rather than aesthetic: a regional team can produce a campaign asset without being able to move the logo, substitute a font or invent a colour. The output is consistent because the wrong option was removed, not because everyone was trained and remembered.</p>

            <p>This is why the value scales with the number of people producing things and with how far they sit from whoever owns the brand. A solo founder gets templates and a fast editor. A company with forty people in a dozen markets all making their own slides gets something closer to governance. If nobody outside a small trained group makes anything, you are buying the editor and not the mechanism, and the editor on its own is a much weaker argument.</p>

            <h3>Canva and Figma are not competing for the same job</h3>

            <p>The comparison is framed as an accessibility trade-off, as though Canva were a simpler <a href="/tool/figma">Figma</a>. It is more useful to ask two questions: who makes the artefact, and who maintains it afterwards.</p>

            <p>Figma's work is maintained. A component library, a token set and a set of specifications exist to be changed once and propagate, and to be read by engineers implementing them. The artefact is a source of truth with a long life and a named owner, and the tool is built around versioning, components and handoff because those are the problems of maintenance.</p>

            <p>Canva's work is mostly produced and consumed. A conference banner, a quarterly deck, a recruitment post and a campaign asset are made, used and superseded. They need to be on brand and they do not need to be maintainable, because nothing downstream depends on their internal structure. That is a genuinely different job, not a lesser one.</p>

            <p>The healthy arrangement in a company large enough to have both is that the design team defines the system in Figma and expresses a slice of it as Canva templates and a brand kit for everyone else. The unhealthy arrangement is a product interface being designed in Canva, or a marketing team waiting three weeks for a designer to resize a banner.</p>

            <h3>Where the template look becomes a liability</h3>

            <p>Canva's defaults are good, which is the problem at the far end. A template that is good is a template many people use, and the compositional habits are recognisable to anyone who looks at a lot of marketing: the same layout logic, the same illustration style, the same stock treatments.</p>

            <p>For most output this does not matter at all. Nobody chooses a vendor because its webinar banner was distinctive. It starts to matter in exactly two places. The first is anything that is the first impression of the brand itself — the site header, the pitch deck, the packaging, the launch asset — where looking like a competent template is worse than looking like nothing you have seen. The second is any market where your competitors are using the same templates, which you can check in an afternoon by looking at them.</p>

            <p>The fix is not to abandon the tool. It is to feed the brand kit with assets that are yours — commissioned illustration, real photography, a typeface nobody else has — so that the templates are assembling your material rather than the library's. That requires a designer, which is the point people resist and should not.</p>

            <h3>When not to use Canva</h3>

            <p>Do not design a product interface in it. Screens, states, components and anything an engineer has to implement belong where components, variants and specifications exist. A Canva file of app screens is a picture of an app, and the moment anyone needs to know what the disabled state does, the picture stops being useful.</p>

            <p>Do not use it as the source of truth for a design system. The organising unit is the document, not the component, so a change to the brand is a sweep through files rather than an edit that propagates. Small brand kits absorb this; a real system does not.</p>

            <p>Do not use it for production print work with exact requirements without checking. Colour profiles, bleed, spot colours and print-house specifications are where a template-first tool and a printer's preflight disagree, and the disagreement is discovered late and expensively.</p>

            <p>Do not use it where the design is the differentiator. If you are selling taste — an agency, a studio, a premium consumer brand — the tool that guarantees a competent result also caps it.</p>

            <p>And do not roll it out to a team without someone building the kit first. Canva given to fifty people with no templates and no brand kit is fifty people making their own decisions faster, which is the problem you were trying to solve, now at higher velocity.</p>
        `,
        useCases: [
            {
                title: "Campaign assets made by the people who own the campaign",
                body: "Social posts, ads, event graphics and landing-page imagery produced by marketers directly rather than queued with a designer. The win is removing a handoff for work whose deadline is shorter than the queue, and it only holds if a brand kit is doing the guarding.",
            },
            {
                title: "Presentations by people who are not going to learn a design tool",
                body: "Sales decks, internal updates and conference talks that need to be on brand without anyone opening a design file. This is where Canva quietly replaces the corporate template nobody could find and everybody modified.",
            },
            {
                title: "A design team publishing templates for everyone else",
                body: "The strongest organisational pattern: designers build locked templates with a brand kit attached, and the rest of the company fills them in. Design keeps control of the decisions that matter and stops being a resizing service.",
            },
            {
                title: "Localised and field collateral at volume",
                body: "Regional offices, franchisees, store managers and partner teams producing their own material within fixed bounds. The alternative is not better design, it is a folder of PowerPoint files with the logo stretched, and that is the comparison to judge it against.",
            },
        ],
        pricingDetail:
            "Canva runs a real freemium model: the free tier is a usable product rather than a trial, with the template library, the editor and collaboration included. Pro (around $15/month, cheaper billed annually) is where the Brand Kit, premium assets and the higher AI allowance live, and for organisations the Brand Kit is usually the line item that justifies the upgrade rather than the asset library. Teams is priced per seat with a three-seat minimum and adds shared brand controls and approval workflows; Enterprise is custom. Two structural things are worth knowing. First, Canva moved Teams from a flat rate covering a small group to per-seat pricing in 2024, which raised costs sharply for exactly the small teams that had adopted it under the old model, and it is still the change that surprises long-standing customers. Second, the AI features draw on a shared monthly credit pool rather than being unmetered, so heavy generative use runs out before the month does. The size of that allowance has been revised more than once, so check the current figure on Canva's own pricing page rather than relying on a number quoted elsewhere.",
        faq: [
            {
                q: "Is the free tier actually usable, or is it a trial?",
                a: "It is a real product. The editor, the bulk of the template library and collaboration are all there, and a great many individuals never pay. The paid line is drawn at brand control and premium content rather than at core functionality, which is why individuals often stay free and organisations almost always do not.",
            },
            {
                q: "Canva or Figma?",
                a: "Ask who makes the artefact and who maintains it. Figma is for work that is maintained and implemented: components, tokens, product screens, specifications an engineer reads. Canva is for work that is produced and consumed: a banner, a deck, a campaign asset that will be superseded. Most companies with both use Figma to define the system and Canva to distribute a slice of it to everyone else. If you are choosing one, the question is whether your problem is designing things or distributing the ability to make things.",
            },
            {
                q: "Do we still need a designer if we have Canva?",
                a: "Yes, and arguably more visibly. Somebody has to build the templates, assemble the brand kit, decide which elements are locked, and supply assets that are yours rather than the stock library's. Canva without that work is faster production of inconsistent material. What it removes is not the designer, it is the designer's queue of resize requests.",
            },
            {
                q: "Will our output look like everyone else's?",
                a: "It can, and the risk concentrates in specific places rather than spreading evenly. Ordinary operational material can look templated with no cost at all. First-impression assets — the site header, the pitch deck, the launch campaign, the packaging — are where a recognisable template reads as a lack of investment. Populate the brand kit with commissioned assets and a distinctive typeface and most of the problem goes away.",
            },
            {
                q: "What happens when we outgrow it?",
                a: "The usual trigger is a rebrand or a product team that needs real specifications. Neither transfers cleanly: Canva organises work by document rather than by component, so a brand change is a sweep through files, and exported screens are pictures rather than implementable definitions. Plan for the brand kit and templates to be rebuilt rather than migrated, and keep anything engineering depends on out of Canva from the start.",
            },
            {
                q: "Can it replace PowerPoint or Keynote as our presentation standard?",
                a: "For most teams, yes, with two caveats worth checking before you standardise. Confirm that exports survive contact with whatever your clients and conference organisers require, and confirm that presenting works the way your people need it to when the venue wifi is bad. Those are the practical failure points, not the design features.",
            },
            {
                q: "Do the AI features change the decision?",
                a: "Not really. Generated images and copy are convenient inside an editor people already use, and they are not the reason to choose Canva over anything else, because every tool in this space now has them at a similar level. They are also metered from a shared monthly credit pool, so treat them as a bonus on top of the brand-control argument rather than as the argument itself.",
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

    replit: {
        overviewHtml: `
            <p><strong>Replit</strong> is three things fused into one: a development environment that runs in a browser tab, hosting that the environment deploys to, and an AI agent that can write and ship code inside both. The fusion is the product. Every part of it exists separately and better somewhere else, and nowhere else are they the same thing.</p>

            <p>Which means the question worth asking is not whether Replit's editor beats a local editor. It does not, and it is not trying to. The question is what the absence of a local machine is worth to you.</p>

            <h3>What "nothing to install" is actually worth</h3>

            <p>Every developer has paid the setup tax and most have stopped noticing it: a language runtime, a version manager, dependencies that conflict with another project's, a database running locally, environment variables, and the particular half-day where someone's machine has a compiler and someone else's does not.</p>

            <p>For a working engineer with a configured machine, that cost was paid once and Replit refunds almost nothing. For everyone else it is the entire obstacle. A student on a school-managed laptop, a contributor on a borrowed machine, an analyst who writes scripts but has never been given admin rights, a candidate in an interview, a colleague you want to hand a running reproduction to — for all of them the gap between wanting to run code and running code is not a small inconvenience, it is the thing that stops it happening.</p>

            <p>So the honest framing is that Replit sells the removal of a barrier, and the barrier's height varies enormously by who you are. That is why the same product is described as indispensable by one group and pointless by another, and both are reporting accurately.</p>

            <h3>Building and deploying are the same act</h3>

            <p>The second structural feature is that what you build is already somewhere. There is no separate step where the working thing becomes a reachable URL, because it was reachable the whole time.</p>

            <p>This collapses a distinction most tooling maintains carefully, and the benefit is real: the feedback loop for anything that has to be seen by another person — a demo, a webhook endpoint, a form, a thing you want a client to click — goes from hours to none. Showing someone a URL is a fundamentally different act from asking them to clone a repository.</p>

            <p>It cuts the other way too. Things that would have stayed on a laptop become live services with an audience, and a live service accumulates obligations: secrets that are genuinely exposed rather than theoretically exposed, data someone now depends on, uptime somebody notices. Nothing about the environment forces you to take those seriously, and the ease of publishing means plenty of projects are published before anyone has thought about them. Treat the moment something acquires real users as the moment to ask whether it belongs where it is.</p>

            <h3>The bill is a subscription plus a meter</h3>

            <p>This is the most common complaint about Replit and it is a design consequence rather than a mistake. Because compute, storage and hosting are included in the product rather than provided by your own machine, they have to be paid for by somebody, and that somebody is metered.</p>

            <p>The plan fee gets you access and an allowance. On top of it, sustained compute, agent work and anything your deployed app does at runtime draw against usage. Agent-heavy work is the most variable, because the cost of a task depends on how long the agent runs rather than on what you asked for, and a task that goes badly can run a long time.</p>

            <p>The practical advice is boring and it works. Check what your allowance actually covers before you plan around it, watch the usage display during your first month rather than at the end of it, set whatever spending controls the platform offers, and treat a long-running agent session as something to supervise rather than start and walk away from. Teams that get surprised are almost always teams that assumed a subscription was a ceiling.</p>

            <h3>Classrooms are the strongest case</h3>

            <p>Education is where every property of Replit lines up at once, and it is worth stating why rather than just asserting it.</p>

            <p>Every student gets an identical environment, so the instructor is teaching the subject instead of debugging thirty different machines in the first two weeks. There is nothing to install on hardware the school controls and will not grant rights on. Work is inspectable and shareable by link, so reviewing a student's actual running program is trivial. And a student can pick it up on a phone, a library machine or a borrowed laptop, which matters most for exactly the students who have the least stable access to a computer.</p>

            <p>The same logic makes it strong for workshops, bootcamps, interview exercises and any situation where you need a group of people writing code within five minutes and you do not control their machines.</p>

            <h3>Where it stops being the right tool</h3>

            <p>Do not move a team with working local setups onto it for its own sake. If everyone already has a configured machine and a deployment pipeline, the barrier Replit removes is one you have already removed, and you would be trading a fast local editor and your existing tooling for a browser tab and a meter.</p>

            <p>Do not run production systems with real obligations on it by drift. Something that started as a prototype and now holds customer data or runs a business process deserves a deliberate decision about where it lives, what the backup story is and who is on call. The problem is not that the platform cannot host it; it is that nothing prompted anyone to ask.</p>

            <p>Do not use it where the work is heavy in ways a hosted environment resists: large local datasets, long compute jobs, GPU work, or a system of many services that has to run together. You will spend your time fighting the environment's shape.</p>

            <p>Do not use it where your organisation has rules about where code and data may live. This is a hosted environment by definition, and for regulated work that is a procurement conversation rather than a signup.</p>

            <p>And do not use it if unpredictable monthly costs are a genuine problem for you rather than an annoyance. A metered model is the wrong shape for a fixed budget, and no amount of care changes the shape.</p>

            <h3>Replit, Bolt and Cursor are three different bets</h3>

            <p><a href="/tool/cursor">Cursor</a> is an editor on your machine. It assumes you are a developer, that your project already exists, and that the AI's job is to make you faster inside it. Nothing about deployment is its problem. <a href="/compare/cursor-vs-replit">Cursor vs Replit</a> goes through that trade in detail, and the short version is that they are competing for different hours of your day.</p>

            <p><a href="/tool/bolt-new">Bolt.new</a> is a generator: describe an app, get a working one, with the emphasis on the first result. Replit's agent does that too, and Replit is the one still standing when the app becomes a project you maintain — because underneath the agent there is an actual environment with a shell, a package manager and files, rather than a generation surface.</p>

            <p>That is the cleanest way to hold all three. Cursor is for people who have an environment. Bolt is for people who want a result. Replit is for people who need the environment itself to be provided. Our piece on <a href="/blog/cloud-dev-environments-evolution">cloud development environments</a> covers where that category is heading more broadly.</p>
        `,
        useCases: [
            {
                title: "Teaching programming without an IT department",
                body: "Identical environments for every student, nothing to install on managed hardware, and work that is inspectable by link. The instructor spends the first week on the subject rather than on thirty broken setups, which is the single biggest reason it took hold in classrooms.",
            },
            {
                title: "Interview exercises and pairing with people outside your company",
                body: "A candidate or a contractor is coding within a minute, on their own machine, with no access request and no setup instructions to get wrong. You are also watching the same environment they are, which removes the usual argument about whether it works on their end.",
            },
            {
                title: "Hackathons and weekend prototypes",
                body: "Editor, runtime, database and a public URL in one place, which is the entire toolchain for a project whose lifespan is measured in days. The deploy step disappearing matters more here than anywhere else, because the demo is the deliverable.",
            },
            {
                title: "Internal tools that have to be live rather than local",
                body: "A form, a small dashboard, a webhook receiver, a script somebody else needs to trigger. These die on a laptop and survive when they have a URL, and the amount of infrastructure work required to give them one is otherwise wildly out of proportion to their size.",
            },
            {
                title: "Coding on a device you do not control",
                body: "School laptops, locked-down corporate machines, tablets, borrowed computers. This is the least glamorous use and the one that most changes who gets to participate, because the barrier it removes is access rather than convenience.",
            },
            {
                title: "Agent-built first versions of an idea",
                body: "Describing an application and getting something running, then continuing in a real environment with a shell and files rather than being stuck inside a generation interface. The value is less the first draft than the fact that the second draft is ordinary development.",
            },
            {
                title: "Shareable reproductions of a bug",
                body: "Handing someone a link to a running program that misbehaves, instead of a description of a program that misbehaves. Maintainers and support engineers save an entire round trip, and the reproduction cannot rot on someone's machine.",
            },
        ],
        pricingDetail:
            "Replit combines a plan fee with usage-based billing, and understanding the second half is what keeps the bill predictable. There is a free tier intended for learning and experimentation, a paid individual plan (around $20/month at the time of writing) that unlocks full agent access and more capacity, and a team plan with pooled usage and shared workspaces. On top of whichever plan you are on, sustained compute, agent work and whatever your deployed applications consume at runtime are metered, which means an intensive month can cost meaningfully more than the plan fee. Agent work is the most variable line, because what a task costs depends on how long the agent runs rather than on how large the request sounded, and a task that goes badly runs longer than one that goes well. Replit has restructured its plans and allowances more than once, so treat the tier names and included quotas quoted anywhere outside its own pricing page as indicative, check what your allowance actually covers before you budget, and set spending controls if a fixed monthly number matters to you.",
        faq: [
            {
                q: "Why is my bill higher than the plan price?",
                a: "Because the plan fee buys access and an allowance, not a ceiling. Replit is providing the compute your laptop would otherwise provide, plus hosting for whatever you deploy, and both are metered once you pass the included amount. Agent sessions are the usual cause of a surprise, since the cost tracks how long the agent works rather than how big the request seemed. Watch the usage display during your first month rather than reading the invoice at the end of it, set whatever spending controls are available, and supervise long agent runs instead of starting one and walking away.",
            },
            {
                q: "Is it good enough for professional engineering?",
                a: "For a team that already has configured machines and a deployment pipeline, it usually is not the right default, and not because the environment is weak. The barrier Replit removes is one you have already paid to remove, so you would be giving up a fast local editor and your existing tooling in exchange for a browser tab and a meter. The exceptions are real though: onboarding, working with people outside your organisation, anything that has to be running for someone else to look at, and situations where the machine in front of you is not yours.",
            },
            {
                q: "Replit, Bolt.new or Cursor?",
                a: "They answer different questions. Cursor assumes you have a machine and a project and makes you faster inside it. Bolt.new is optimised for producing a working application from a description, with the first result as the point. Replit is the one that provides the environment itself, which is why it holds up when the generated thing turns into something you maintain: underneath the agent there is a shell, a package manager and real files. Pick by whether your constraint is speed, a starting point, or the absence of a development machine.",
            },
        ],
    },

    "gemini-code-assist": {
        overviewHtml: `
            <p><strong>Gemini Code Assist</strong> is the hardest tool in this category to evaluate on its own terms, because it is not really sold as a standalone coding assistant. It is the developer-facing edge of Google Cloud. Judged as an editor plugin it is competent and unremarkable; judged as the AI layer of a platform your infrastructure already runs on, it does something its competitors structurally cannot.</p>

            <h3>What "Google Cloud native" actually buys you</h3>

            <p>An editor-only assistant knows your files. That is a real advantage and it is also the whole extent of its context. Gemini Code Assist's paid Cloud tiers can reason about the environment your code deploys into — the services in your project, the shape of your data warehouse, the identity and permission model you are working against. The difference shows up on a specific class of question: not "write this function" but "why does this service account not have access to that bucket", or "write the query against the table we actually have".</p>

            <p>This is why the tool's value is so uneven across teams. If your work involves Cloud Run, BigQuery, IAM policies, and Terraform aimed at GCP, the assistant is operating with information no other tool has. If you are writing a React frontend that talks to an API, it is just another model in a sidebar.</p>

            <h3>The free individual tier is gone</h3>

            <p>For a long time the free tier for individuals was the most generous offer in serious AI coding assistance — up to 6,000 code-related requests and 240 chat requests per day, more headroom than most developers could consume. It made a capable assistant available to students, hobbyists, and anyone who could not justify a subscription. It no longer exists, and that changes who this product is for.</p>

            <p>Google's own deprecation documentation is unambiguous: as of <strong>June 18, 2026</strong> the Gemini Code Assist IDE extensions stopped serving the "Gemini Code Assist for individuals", Google AI Pro, and Google AI Ultra tiers, and those users were directed to <strong>Antigravity</strong> instead. Google's overview documentation now describes Code Assist as available in two editions — Standard and Enterprise — and nothing else. The paid Standard and Enterprise tiers aimed at Google Cloud organisations were not affected by any of this.</p>

            <p>One warning, because it catches people out. Google's own marketing site for Code Assist is lagging its documentation badly: it still advertises the product "for individuals at no cost, no credit card needed", and it still describes the underlying model as Gemini 2.5. Neither claim survives contact with the deprecation notice or the current model lineup. When a vendor's landing page and its deprecation docs disagree, the deprecation docs are the ones written by the team that turned the service off.</p>

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

            <p>Skip it if you are not on Google Cloud. Almost the entire argument for the tool is the platform integration, and without that you are choosing a mid-pack assistant over more mature alternatives for no reason. Skip it if you want a state-of-the-art agentic editor that plans and executes multi-file changes with minimal supervision — that is where <a href="/tool/cursor">Cursor</a> has been iterating hardest. Skip it if your code lives in GitHub and your workflow is organised around pull requests, where Copilot's integration is simply closer to the work.</p>

            <p>And skip it if you are a solo developer who came here for the free tier. There is nothing left to adopt: the individual, Google AI Pro, and Google AI Ultra tiers stopped being served by the Code Assist extensions on June 18, 2026, and Antigravity is where Google sent those users. Standard and Enterprise are the only editions now, and both are priced and administered as Google Cloud purchases. Organisations already on the paid Cloud tiers are unaffected and in a considerably more stable position.</p>
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
            "Gemini Code Assist is now sold in two editions: Standard (~$19–22.8/user/mo) and Enterprise (~$45–54/user/mo), both with full Google Cloud integration, plus 17% off annually. The free tier for individuals is gone. Per Google's own deprecation documentation, the Gemini Code Assist IDE extensions stopped serving the individual, Google AI Pro, and Google AI Ultra tiers as of June 18, 2026, and those users were directed to Antigravity; Google's overview documentation now lists Standard and Enterprise as the only editions. The old individual allowance — up to 6,000 code requests and 240 chat requests per day — is historical and should not be budgeted around, whatever Google's marketing pages still say. Treat the per-seat figures above as indicative rather than quoted, and confirm current rates on Google's own pricing page before committing.",
        faq: [
            {
                q: "Is there still a free individual tier?",
                a: "No. Google's deprecation documentation states that the Gemini Code Assist IDE extensions stopped serving the individual, Google AI Pro, and Google AI Ultra tiers as of June 18, 2026, and directed those users to Antigravity. Google's overview documentation now describes Code Assist as available in two editions, Standard and Enterprise, both paid and both unaffected by the change. If you land on a page still advertising Code Assist for individuals at no cost with no credit card, that is stale vendor marketing rather than a plan you can sign up for.",
            },
            {
                q: "Does it really know about my Google Cloud project?",
                a: "On the paid Cloud tiers, yes — that awareness of your services, resources, and data is the product's central claim, and it is why questions about permissions, deployments, and queries against your own schema get better answers than a generic assistant can give. The Enterprise tier extends this further by grounding suggestions in your private repositories. This used to be the line separating the paid editions from the free individual tier; with that tier retired, Standard and Enterprise are the only editions, and both are Cloud-oriented by design.",
            },
            {
                q: "Is it worth using if we are not on Google Cloud?",
                a: "Rarely. Strip out the platform integration and what remains is a competent assistant competing against tools that have iterated harder on the editing experience. Teams outside the Google ecosystem are generally better served by Cursor for agentic editing or GitHub Copilot for tight integration with where their code already lives.",
            },
            {
                q: "What happens to our code — is it used for training?",
                a: "This differs by edition and is the wrong thing to take on trust from a review, particularly since the tier structure itself changed when the individual tier was retired. Read the current data-use documentation for the specific edition you intend to buy — Standard and Enterprise have different terms and different opt-out settings — and if you are in a regulated industry, get it confirmed by your account team in writing before rollout.",
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
            <p><strong>Gamma</strong> generates presentations, documents and simple web pages from a prompt, and it does the thing it claims: a rough idea becomes a laid-out, reasonably attractive deck in the time it would take to format two slides by hand. The question this page is interested in is what happens after that, because the gap between a generated deck and a deck you can present is where the time actually goes.</p>

            <h3>What it removes from the job, and what it leaves</h3>

            <p>Making a deck is several jobs that people treat as one. There is deciding what the argument is. There is finding the evidence. There is writing the words. There is laying it out, aligning things, choosing type sizes and fixing the slide where the text overflows. And there is the final pass where somebody senior reads it and it changes.</p>

            <p>Gamma is excellent at the fourth and competent at the third. It is not doing the first at all, and the thing it produces for the second is generic. That is not a criticism; it is what generation from a prompt can be. But it explains why the experience of using it is so often a fast, satisfying start followed by a slower middle than expected, because the parts it did not do were always the expensive parts, and now they are the only parts left.</p>

            <p>Structurally, the deck it produces is a plausible one: an introduction, a handful of sections proportional to the topic, a conclusion. Plausible structure is genuinely useful when you are staring at nothing. It is actively unhelpful when you had a specific argument to make, because the generated shape is persuasive enough that people edit inside it rather than replacing it, and a deck that follows a generic arc will land generically.</p>

            <h3>The three places a generated deck breaks</h3>

            <p>The first is data. Gamma fills slides with content that reads correctly, and a chart or a figure that appeared without you supplying it did not come from your systems. Anything numeric has to be either supplied by you or removed, and this needs to be a rule rather than an intention, because a well-formatted number on a slide is believed by everyone in the room. This is the single most dangerous failure mode of every generated-deck tool and it is also the easiest to police: no figure survives that you cannot trace to a source.</p>

            <p>The second is brand specification. There is a difference between a deck that looks tasteful and a deck that is correct — the right typeface at the right weight, the approved colour values, the logo with its required clear space, the legal line at the required size. Theme controls get you close and closeness is not compliance. If your organisation has a brand team that checks these things, expect a correction pass, and expect the fiddly parts of it to be slower than they would be in a tool built around precise control.</p>

            <p>The third is the executive finish. The last ten percent of a deck that goes to a board or a client is not design work at all. It is cutting three slides because the meeting is shorter than you thought, rewriting a headline because it makes a claim you cannot defend, reordering so the ask comes before the evidence, and anticipating the question the one sceptical person will ask. No generator does this, and it is most of what separates a deck that gets a decision from one that gets a follow-up meeting.</p>

            <h3>When to use something else, and when not to use Gamma at all</h3>

            <p>Use PowerPoint or Keynote when the file has to leave your control. A deck that gets emailed to a client, uploaded to a conference portal, edited by a third party or presented from a machine that is not yours is safer in the format everyone already handles. Exports exist and mostly work; layout that was generated for a web-native canvas does not always survive the trip, and finding that out in the room is a bad way to find out.</p>

            <p>Use PowerPoint when the deck is a living document. Anything revised weekly by several people, with a review history and comments that need to persist, sits better in the tool your organisation's process is already built around.</p>

            <p>Use <a href="/tool/canva">Canva</a> when the output is a designed artefact rather than an argument — a one-pager for print, a social carousel, an event banner, anything where the brand kit and the asset library matter more than the narrative. Canva is also the better answer if the presentation is one of many formats the same material has to appear in. And if the question is really about where your written work lives rather than how it looks, <a href="/compare/notion-ai-vs-gamma">Notion AI vs Gamma</a> is the comparison that maps onto that choice.</p>

            <p>Do not use Gamma for a deck where being unmistakably yours is the point. A fundraise, a rebrand, a keynote, a competitive final round: these are judged partly on the evident investment, and a recognisable generated aesthetic reads as the opposite of investment to an audience that sees a lot of decks.</p>

            <p>Do not use it for anything built on numbers you have not personally verified. Financial reviews, board reporting, anything with a compliance dimension. The efficiency gain is small on these decks because the data work dominates, and the risk of a fabricated-looking figure is highest.</p>

            <p>Do not use it where design precision is the deliverable, such as a template other people will be required to use, or material that must match a specification exactly.</p>

            <p>And do not use it as a substitute for knowing what you want to say. It will produce something anyway, and the something will be confidently structured, which is worse than a blank page because it feels like progress.</p>
        `,
        useCases: [
            {
                title: "Getting from an outline to something shareable in one sitting",
                body: "You know the argument and you do not want to spend the evening aligning boxes. This is the strongest case: you supply the thinking and the content, and the tool removes the formatting labour that never improved the argument anyway.",
            },
            {
                title: "Recurring internal material nobody grades on design",
                body: "Team updates, project reviews, all-hands sections, training decks. The audience wants the information, the deck is disposable, and the polish ceiling is irrelevant. Consistency and speed are the whole requirement here, and they are exactly what a generator provides.",
            },
            {
                title: "Web-native documents and one-pagers",
                body: "Pages meant to be read in a browser and sent as a link rather than projected in a room. Gamma's canvas suits scrolling content better than slide software does, and the format sidesteps the export question entirely, since nothing ever has to become a PowerPoint file.",
            },
        ],
        pricingDetail:
            "Gamma meters generation with credits rather than charging a flat fee for unlimited use, and the structure has a few sharp edges. The free tier grants a block of credits once rather than refreshing them monthly, so once it is spent, continuing means upgrading — this is the detail that catches people who assumed a monthly free allowance. Paid tiers (Plus at around $12/month and Pro at around $25/month billed monthly, with lower effective rates on annual billing, plus higher individual and per-seat team tiers) refresh credits each month, remove Gamma branding from your work, and unlock better generation models, larger outputs, custom fonts and analytics as you move up. Credits generally do not roll over, so an unused month is not banked. Gamma has revised its allowances and tier contents more than once, so check the current credit figures on Gamma's own pricing page rather than budgeting from a number quoted elsewhere, and be aware that iterating heavily on one deck consumes credits each time you regenerate rather than only on the first attempt.",
        faq: [
            {
                q: "How do the credits work?",
                a: "Generation is metered. Each time you generate or regenerate content, credits are consumed, which means iterating on a deck costs more than producing it once. The free tier's grant is one-time rather than monthly, paid tiers refresh each month, and unused credits generally do not carry over. The specific allowances have been revised, so read them on Gamma's own pricing page rather than trusting a figure from a review.",
            },
            {
                q: "Is the free tier enough?",
                a: "It is enough to find out whether you like the tool, and it is not a place to work from, because the credit grant does not refresh. Treat it as an evaluation rather than a plan, and evaluate the part that actually matters: how much editing the generated deck needs before you would present it, not how good the first screen looks.",
            },
            {
                q: "Can it use our real numbers?",
                a: "Only the ones you give it. Content it produces on its own is plausible rather than sourced, and a figure that appears on a slide without you supplying it should be treated as decoration and deleted. Make this a rule rather than a habit, because a cleanly formatted number on a slide is believed in the room, and tracing where it came from afterwards is much harder than removing it now.",
            },
            {
                q: "Will it match our brand guidelines?",
                a: "It will get close and close is not the same as correct. Theme settings, custom fonts on the higher tiers and your own colours will produce something that looks like your brand. Exact type weights, approved colour values, logo clear space and required legal text are the kind of precision a generation-first tool is not built around, so if a brand team reviews your material, plan for a correction pass and expect that pass to be slower than it would be in traditional slide software.",
            },
            {
                q: "Can I export to PowerPoint?",
                a: "Yes, and you should test it early rather than at the end. Gamma's canvas is web-native, and layouts that work there do not always survive conversion intact. If your deck is definitely going to be emailed as a file, edited by someone else, or presented from a machine you do not control, run a full export on day one and look at every slide before you commit to the workflow.",
            },
            {
                q: "Is Gamma better than PowerPoint?",
                a: "For getting to a decent-looking draft, easily. For control, compatibility and the last mile before a high-stakes meeting, no. The useful way to hold it is that Gamma is faster at the part that was never the hard part, so it wins outright for decks whose value is the information, and wins much less for decks whose value is the persuasion.",
            },
            {
                q: "Gamma or Canva for a deck?",
                a: "Gamma if the deck is an argument and you want structure and layout handled. Canva if the deck is one of several designed artefacts drawing on the same brand assets, or if a brand kit and an asset library matter more to you than getting a first draft out fast. If your company already runs its brand through Canva, that consistency usually outweighs the speed difference.",
            },
            {
                q: "Do Gamma decks look generic?",
                a: "At scale, yes, in the same way template-driven output always does. The defaults are good enough that lots of people accept them, which makes the result recognisable to anyone who sees many decks. For internal and informational material that costs you nothing. For a fundraise, a keynote or a competitive pitch, the appearance of effort is part of what is being judged, and a recognisable generated look works against you.",
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
            <p><strong>Airtable</strong> sits between a spreadsheet and a database, which is an accurate description that explains nothing about when to choose it. The more useful question is one of order: does your team's work start from data that several people need to see differently, or from a document that happens to contain some data?</p>

            <p>That question sorts this whole category more cleanly than any feature comparison, and it is the one this page is built around.</p>

            <h3>Data first or page first</h3>

            <p>Airtable's atom is the record. Everything else — the grid, the calendar, the board, the form, the interface someone else uses — is a way of looking at records that already exist. You define what a thing is once, with typed fields and relationships to other things, and the presentations follow from that definition.</p>

            <p><a href="/tool/coda">Coda</a> and <a href="/tool/notion-ai">Notion AI</a> invert the order. Their atom is the page, and tables live inside pages, surrounded by the prose that explains them. A Coda doc reads like a written argument that happens to contain a live tracker; an Airtable base does not read at all, because reading is not what it is for.</p>

            <p>The test is simple and reliable. If someone new to the team needs to read something to understand what is going on, you want a document tool. If they need to filter something to find their part of it, you want Airtable. Teams whose work is a process running continuously — every item the same shape, arriving and moving through stages — are in the second group. Teams whose work is a series of arguments, plans and write-ups that reference data are in the first.</p>

            <p>Getting this backwards is the common failure. A strategy document built in Airtable is a table of paragraphs nobody reads. A production pipeline built in a document tool is a table that slowly acquires filters and stops being part of the document at all.</p>

            <h3>One table, several audiences</h3>

            <p>The capability that actually justifies the price is less discussed than the AI features: several audiences reading the same data through different windows, without copies.</p>

            <p>The editorial team sees a grid with every field. The social team sees a calendar of published dates. The executive sees a chart of volume by channel. Legal sees a filtered list of the things awaiting approval and can edit only the approval field. An external contributor sees a form and nothing else. There is one set of records underneath all of it, so nothing can disagree with anything.</p>

            <p>Anyone who has maintained the alternative knows what is being bought here. The alternative is a master spreadsheet, three exports, a slide that was accurate on Tuesday, and a recurring argument about which version is current. The moment a piece of data has more than about two audiences with different needs, the copies start, and from then on somebody's job includes reconciling them.</p>

            <p>So a useful buying signal: count the audiences for your most important dataset. One audience means a spreadsheet is fine. Four audiences with genuinely different views means you are already paying for this problem somewhere, probably in someone's Thursday.</p>

            <h3>When a spreadsheet is still the right answer</h3>

            <p>Plenty of things that get rebuilt in Airtable were fine as spreadsheets, and the rebuild costs more than it returns.</p>

            <p>If the data is one flat list with no relationships, a spreadsheet is the better tool. If the work is calculation rather than organisation — models, scenarios, anything where the formulas are the point — a spreadsheet is far better, and Airtable's formula surface will frustrate you. If the dataset is read by one person who already knows how it works, structure buys nothing. If it is genuinely temporary, do not give it a schema.</p>

            <p>The honest signal to switch is not size, it is pain of a specific kind: people editing the same file at once and overwriting each other, the same entity typed slightly differently in three rows, a column containing four kinds of thing, a tab that exists only to be filtered differently, or a person whose job has quietly become keeping two files in agreement. Those are structural problems, and structure fixes them. A spreadsheet that is merely large is not a reason.</p>

            <h3>When it becomes an app platform, and what that commits you to</h3>

            <p>Past a certain point Airtable stops being a shared data store and becomes the system a business process runs on: forms feeding intake, automations firing on status changes, interfaces built for people who never see the underlying tables, and integrations pushing data to and from other systems.</p>

            <p>That transition is usually gradual and usually undeclared, and it is worth declaring, because a system a process depends on has obligations a shared table does not. Someone has to know what happens when an automation fails silently. Someone has to be able to answer whether a change to a field breaks an integration. There should be a test base rather than editing live automations on Friday afternoon. And the permissions need to be deliberate, because an interface designed for a wide audience often sits on a base where anyone with access can delete a table.</p>

            <p>None of this is an argument against using it as an app platform — it is genuinely good at it, and the alternative for most of these processes is an engineering project nobody will fund. It is an argument for noticing the moment it happened, because that is when it stops being free to ignore.</p>

            <h3>The record ceiling is a design signal, not just a paywall</h3>

            <p>Airtable caps records per base by plan, and the cap is usually read as pure monetisation. It is partly that and partly information.</p>

            <p>The datasets that blow through a record ceiling are usually not the ones the tool is for. Event logs, analytics rows, sensor readings, per-message or per-transaction records — these are machine-generated streams, and the fact that they can be put in rows does not make them the kind of data a team curates. Airtable is built for records a human cares about individually: a campaign, a candidate, an asset, a client, an order.</p>

            <p>So when you approach the ceiling, ask which kind you have before you upgrade. If it is curated records and the business genuinely has that many, upgrade. If it is machine-generated history, the right move is a real database or a warehouse with Airtable holding the curated layer on top, because the next ceiling will arrive the same way and performance will degrade before you get there.</p>

            <h3>When not to use Airtable</h3>

            <p>Do not use it as an application database. Software with users should not depend on a workspace where a well-meaning colleague can delete a field. The API is fine for integration, not for being your data layer.</p>

            <p>Do not use it for anything where getting the numbers slightly wrong is a regulated problem. Financial reporting, payroll and anything auditable want a system with real controls, and the flexibility that makes Airtable pleasant is the opposite of what those need.</p>

            <p>Do not use it for documents. Policies, proposals, specifications and knowledge belong in a document tool, and a base full of long-text fields is a document tool with the reading experience removed.</p>

            <p>Do not use it as your project tracker if your team is engineering. Purpose-built trackers understand branches, reviews and cycles; you would be rebuilding that badly and maintaining it forever.</p>

            <p>And do not adopt it per-team without a plan. Airtable spreads by enthusiasm, and the end state is eleven bases with overlapping data and no agreement about which one is true — which is precisely the problem it was brought in to solve, reconstructed one base at a time.</p>
        `,
        useCases: [
            {
                title: "Content and campaign operations",
                body: "The canonical case: one table of work in progress, read as a grid by the people producing it, a calendar by the people scheduling it, a filtered approval queue by the people signing it off, and a chart by whoever is asked how the quarter is going. One dataset, four audiences, no exports.",
            },
            {
                title: "Intake that has to arrive structured",
                body: "Requests, submissions and applications collected through forms that write directly into a typed table. The value is not the form, it is that the data arrives already shaped, which removes the step where someone retypes an email thread into a spreadsheet.",
            },
            {
                title: "A pipeline whose process is still changing",
                body: "Lightweight CRM, hiring, partnerships, grant tracking. Dedicated software encodes somebody else's process, and if yours is still being invented, the ability to add a stage on Tuesday is worth more than the features you are giving up. Revisit the decision once the process stops changing.",
            },
            {
                title: "Registries several teams read and few teams edit",
                body: "Assets, inventory, vendors, properties, equipment. Read access is wide, edit access is narrow, and the billing model fits that shape exactly, because you are charged for the people who change things rather than the people who look.",
            },
        ],
        pricingDetail:
            "Airtable prices per user per month, with a free tier, Team (around $20/user/month billed annually) and Business (around $45/user/month billed annually) above it, and a custom enterprise tier. The billing detail that matters most is who counts: you are charged for collaborators with edit permission, while read-only viewers, form submitters and people opening a shared link are not billed. That makes it unusually cheap to give a dataset a wide audience and comparatively expensive to give many people the ability to change it, which suits registries and reporting far better than it suits everyone-edits workflows — and it is worth designing your permissions around deliberately rather than discovering at renewal. The other structural limit is records per base, capped by tier, with the free tier's cap low enough that any real dataset reaches it quickly; treat that ceiling as a question about what kind of data you have rather than purely as a paywall, since machine-generated rows belong in a database rather than in a higher plan. Airtable's AI features are metered by a credit allowance separate from the plan fee, and both the allowance and what consumes it have been revised since launch, so check the current terms on Airtable's own pricing page before planning around them.",
        faq: [
            {
                q: "Airtable, Coda or Notion?",
                a: "Ask what your work starts from. Airtable starts from records: you define what a thing is, and grids, calendars, forms and interfaces are all views onto the same rows. Coda and Notion start from a page, with tables living inside prose that explains them. If a newcomer needs to read something to understand the work, you want a document tool. If they need to filter something to find their part of it, you want Airtable. Teams running a continuous process where every item has the same shape are almost always in the second group, and teams producing plans, proposals and write-ups are almost always in the first.",
            },
            {
                q: "When should this be a real database instead?",
                a: "When the data is machine-generated rather than curated — event logs, analytics, per-transaction records — because that is a stream rather than a set of records a person cares about individually, and the next record ceiling will arrive as fast as the last one. Also when software with real users depends on it, since an application data layer should not live somewhere a colleague can delete a field, and when the numbers are subject to audit or regulation and need controls that a flexible workspace deliberately does not impose. A common good answer is both: a database or warehouse underneath, with Airtable holding the curated layer humans actually work in.",
            },
            {
                q: "How does the per-user billing work?",
                a: "You pay for collaborators who can edit, not for everyone who can see. Read-only viewers, form submitters and people using a shared link do not consume a seat. That shape rewards a specific design — a small group maintaining the data, a wide group reading views of it — and it is worth structuring your permissions around on purpose. Where it fits badly is a workflow in which everyone genuinely needs to change things, since then every participant is a paid seat and the total can climb faster than the headline rate suggests.",
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

            <p>It is also the wrong purchase for occasional use. The credit model rewards people working on something continuously and punishes the user who wants one clip a month — that person is better served by a general-purpose tool they already pay for. And if the output you need is a still image rather than motion, <a href="/tool/midjourney">Midjourney</a> remains the stronger craft tool; see <a href="/compare/midjourney-vs-runway">Midjourney vs Runway</a> for where the line falls.</p>
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
                q: "Should I wait for a better model instead of subscribing?",
                a: "Waiting is a reasonable instinct and a bad plan, because the thing you are buying here is not the generator. Pure text-to-video models improve, get withdrawn, and get replaced on a timescale measured in months — OpenAI's Sora was launched, iterated on, and then discontinued inside the life of this page. What survives a model change is the production layer around it: rotoscoping, inpainting, retiming, extension, and a place to keep working on a shot that came back eighty percent right. Judge Runway on whether that layer earns the credits, not on whether its generator is currently the best one available.",
            },
        ],
    },

    elevenlabs: {
        overviewHtml: `
            <p><strong>ElevenLabs</strong> is a synthetic voice platform, and the interesting questions about it are almost never about whether the voice sounds real. It usually does. The questions that decide whether a project ships are about permission, consistency and performance: whose voice you are allowed to use, whether the voice holds together across six hours of audio rather than six seconds, and which parts of a read a machine still cannot do.</p>

            <p>This page is organised around those three, because they are what actually stops production.</p>

            <h3>Whose voice is it, and can you prove it</h3>

            <p>Voice cloning is the feature that sells the product and the feature that creates legal exposure. Two different permissions are involved and they get collapsed together constantly.</p>

            <p>The first is consent from the person whose voice it is. A recording you have the right to distribute is not the same as a recording you have the right to synthesise from. An audiobook narrator who was paid for a performance did not necessarily grant the right to generate new performances from it, and a contract signed before synthesis was practical almost certainly does not address it. If the voice belongs to an employee, a founder, a customer or a contractor, get consent in writing that names synthesis specifically, and name what it may be used for and for how long.</p>

            <p>The second is the platform's own verification. Higher-fidelity cloning typically requires the person to record a verification statement rather than letting you upload any audio you happen to have, which is a deliberate friction rather than an oversight. Treat any workflow that routes around that friction as a warning sign about the workflow, not about the platform.</p>

            <p>Beyond consent there is the question of commercial rights, which vary by plan tier and have been revised, and beyond that the law, which varies by jurisdiction. Several places now treat a recognisable voice as a protected attribute of a person in its own right. None of this is a reason to avoid the technology. It is a reason to decide who owns the voice before you build a production pipeline around it, because retrofitting consent onto a published catalogue is not a task anyone enjoys.</p>

            <h3>Short clips are easy, long-form is the real test</h3>

            <p>A demo is thirty seconds long and reveals almost nothing about production use. The problems in long-form work are cumulative.</p>

            <p>Pronunciation is the obvious one. Proper nouns, character names, technical vocabulary, acronyms and anything borrowed from another language will be guessed, and the guess is stable enough that a wrong guess is wrong every single time. Any serious long-form workflow needs a pronunciation pass and a per-project dictionary, and that pass is a real, recurring cost that the per-character price does not include.</p>

            <p>The subtler problem is drift. Generate a chapter in one session and the next chapter a week later, after a model update or with different generation settings, and the two can differ in pace, brightness or energy in a way that is hard to name but audible on a continuous listen. The defences are unglamorous: fix your settings and record them, generate in the largest coherent unit the tool allows rather than sentence by sentence so context carries, keep the source of truth in a script file rather than in pasted fragments, and regenerate whole sections rather than patching single lines.</p>

            <p>The third is that errors compound with length. A one-in-a-hundred oddity is invisible in a product video and appears dozens of times in an audiobook. Long-form work needs a listen-through by a human, which is the cost most budgets forget.</p>

            <h3>What a human read still wins</h3>

            <p>Synthetic voice has closed most of the gap on tone, clarity and naturalness, and it has not closed the gap on interpretation. The things it still does worse are specific rather than vague.</p>

            <p>Breath and silence are used deliberately by a good reader. A pause before a revelation, a breath that signals exhaustion, a held beat that lets a joke land — these are performance choices made from understanding the text, and a model generating plausible prosody is not making them. It can be steered towards them with markup and direction, but you are the one deciding where they go, line by line, which is slower than people expect.</p>

            <p>Sustained emotional arc is the other gap. A model can render a sentence as sad. Carrying a character through a scene where grief turns into anger, with the change audible in the voice before it is visible in the words, is a different task. Character work in dialogue compounds this: not just different voices, but the same character sounding different when speaking to different people.</p>

            <p>And there is the question of the listener's contract. For a personal essay, a memorial, an apology from a company, or anything where the point is that a person is speaking to you, synthesis does not fail technically — it fails at the premise. Disclosure helps, and it does not restore what was lost.</p>

            <h3>ElevenLabs or Descript</h3>

            <p>These get compared because both touch audio, and they sit on opposite sides of a clean line. ElevenLabs generates audio that was never recorded. <a href="/tool/descript">Descript</a> edits audio that was: it transcribes a recording and lets you change the audio by changing the transcript, including patching a few words in a recorded voice.</p>

            <p>The practical test is whether a recording exists. If a person sat down and read the thing and you need to cut, tighten or fix it, that is an editing job. If nothing was ever recorded and the script needs a voice — or if the volume of scripts means nobody is ever going to sit down and read them — that is a generation job. Podcast and interview workflows are editing. Documentation, e-learning catalogues and in-app voices are generation. Plenty of teams run both and route by that question. For a longer walk through the output quality, we have a separate <a href="/blog/elevenlabs-review">ElevenLabs review</a>.</p>

            <h3>When not to use synthetic voice</h3>

            <p>Do not use it for a voice you do not have documented, synthesis-specific permission to use. This is the one non-negotiable item on the list, and the awkward version of the mistake is internal: cloning a colleague's voice for a demo because it was funny is how an organisation discovers it has no policy.</p>

            <p>Do not use it where the value of the audio is that a specific person chose to speak. Leadership messages during a crisis, condolences, anything framed as personal — the efficiency gain is real and it is not what is being bought.</p>

            <p>Do not use it for a flagship performance without budgeting a human pass. Full-cast fiction, high-profile brand narration and anything where the read is the product will need a director's attention line by line, at which point you should compare the total cost honestly against hiring a narrator rather than against the per-character rate.</p>

            <p>Do not use it for high-stakes short-form under time pressure with no review step. Legal disclaimers, medical instructions, safety announcements and financial terms are exactly where a mispronounced word or a dropped negation does damage, and exactly where the volume is low enough that generation was never saving you much.</p>

            <p>And do not build an unguarded cloning feature into a consumer product. If users can upload arbitrary audio and get a usable clone, you have built an impersonation tool, and the fact that the underlying platform has verification requirements does not transfer that responsibility away from you.</p>
        `,
        useCases: [
            {
                title: "Narration at a volume nobody would book a studio for",
                body: "Internal training, product documentation, release notes read aloud, course modules that change every quarter. The economics here were never in favour of recording, which means synthetic voice is not replacing a narrator, it is replacing silence or an unread page.",
            },
            {
                title: "Pickups and corrections after the session",
                body: "A price changed, a feature got renamed, a line was wrong. Regenerating one segment in a matched voice avoids rebooking a session for thirty seconds of audio. This is also the case where consent paperwork matters most, because the voice being matched usually belongs to someone specific.",
            },
            {
                title: "Localisation into languages you cannot cast for",
                body: "Dubbing and multilingual narration for markets where hiring a native narrator for every update is not realistic. Budget for a native speaker to review the output rather than shipping unreviewed, since the failure mode is a confidently wrong pronunciation that no one on your team can hear.",
            },
            {
                title: "Placeholder dialogue during game and film production",
                body: "Temporary lines so a scene can be blocked, timed and playtested before casting. Even studios that intend to record every final line use synthesis for the draft, because waiting on a booking to find out a scene does not work is expensive.",
            },
            {
                title: "Voice interfaces, phone systems and in-product speech",
                body: "Assistants, IVR flows and accessibility readouts where the text is generated at runtime and no recording could exist. Latency and interruption handling matter more than raw naturalness here, and they are what you should actually test.",
            },
            {
                title: "Reading interfaces for long text",
                body: "Turning articles, reports and documentation into audio for people who prefer or need to listen. The bar is comprehension over hours rather than beauty over seconds, which makes pronunciation handling the thing to evaluate.",
            },
            {
                title: "Audiobooks whose economics do not support a narrator",
                body: "Backlist titles, technical manuals and niche non-fiction that would never earn back a studio recording. This works, and it works best when someone listens to the whole thing before release and the listing is honest about how it was produced.",
            },
        ],
        pricingDetail:
            "ElevenLabs bills text-to-speech through credits, where one credit corresponds to roughly one character of text on the standard models, and layers several tiers on top of that: a free tier, then Starter (around $5/mo), Creator (around $22/mo), Pro (around $99/mo), and higher volume and business tiers up to a custom Enterprise plan. The structure matters more than any individual figure. Because you are billed by characters rather than by minutes, cost scales with script length, and a long-form project is best budgeted by counting the characters in the manuscript before you start rather than by looking at the monthly price. Regeneration is not free either, so a workflow that iterates on a chapter ten times costs roughly ten chapters. Conversational voice agents are metered separately from the character allowance, on a per-minute basis. Two plan details decide more purchases than the headline rate: which tier carries commercial usage rights and what attribution is required on the free tier, and which tier unlocks higher-fidelity voice cloning. ElevenLabs has revised allowances, tier contents and usage terms more than once, so confirm the current terms on its own pricing page before committing a production budget.",
        faq: [
            {
                q: "Do I need permission to clone someone's voice?",
                a: "Yes, and more specifically than people assume. Owning a recording is not the same as holding the right to generate new speech from it, and consent given before synthesis was practical usually does not cover synthesis. Get written permission that names voice synthesis explicitly, states what the generated audio may be used for, and states for how long. Higher-fidelity cloning generally also requires the person to record a verification statement, which is a deliberate check rather than a hurdle to route around. Several jurisdictions now treat a recognisable voice as a protected attribute of a person, so if the use is commercial, this is a question for counsel rather than for a review page.",
            },
            {
                q: "Can I use the output commercially?",
                a: "That depends on the tier you are on, and the terms have been revised. Free usage has historically carried attribution requirements and narrower rights than paid usage. Rather than trusting any number or condition quoted second-hand, read the current usage terms for the specific plan you intend to buy before you publish, particularly if the audio will run in an advertisement or a paid product.",
            },
            {
                q: "Will listeners notice across a whole audiobook?",
                a: "More often than they notice in a clip, and for cumulative reasons. Proper nouns and technical terms get a fixed wrong pronunciation that recurs on every occurrence. Chapters generated weeks apart can drift in pace and energy. Rare artefacts that are invisible in a two-minute video appear repeatedly across six hours. All of this is manageable with a pronunciation dictionary, locked generation settings, generation in large coherent units and a human listen-through before release, but that listen-through is a real cost and it is the one most budgets leave out.",
            },
            {
                q: "ElevenLabs or Descript?",
                a: "Ask whether a recording exists. Descript is for audio somebody recorded: it transcribes the take and lets you edit the audio by editing the text, including patching a handful of words. ElevenLabs is for audio nobody recorded and nobody is going to. Podcasts and interviews are editing work. Documentation, e-learning and in-product speech are generation work. Teams that do both usually run both and route each job by that single question.",
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
            <p><strong>Vercel</strong> is listed in this directory alongside chat assistants and coding agents, and it does not belong to that category at all. It is deployment infrastructure: a place where web applications are built, hosted and served. It is here because a large number of the applications people build with the other tools on this site end up running on it, not because it is an AI product.</p>

            <p>Getting that straight is not pedantry. It changes what you should evaluate, what a good decision looks like, and what a bad one costs. Nobody has ever been locked into a chat assistant. A hosting platform is a different kind of commitment.</p>

            <h3>What you are actually buying</h3>

            <p>Strip away the branding and Vercel sells four things. It builds your application when you push code. It serves the result from a distributed network so that a user far from you is not waiting on a single machine. It runs your server-side code on demand, without you provisioning anything. And it gives every branch its own working URL.</p>

            <p>Notice what is absent from that list: nothing about intelligence, models or generation. What Vercel is competing on is the elimination of operational work — the build server you did not configure, the CDN you did not set up, the autoscaling you did not think about, the certificate that renewed itself. For a team without a platform engineer, that is a substantial amount of work not being done, and it is the entire argument.</p>

            <h3>The Next.js relationship, stated precisely</h3>

            <p>Vercel employs the people who build Next.js, which is a real advantage and a real thing to think about, and the internet tends to mangle both.</p>

            <p>The advantage is that the framework and the platform are designed against each other. Features that require infrastructure support — rendering strategies, caching behaviour, image handling, streaming — work on Vercel on the day they ship, without you assembling the supporting pieces. That is not marketing; it is what having one team on both sides produces.</p>

            <p>The thing to think about is the same fact from the other side. Next.js is open source and self-hostable, and a plain Next.js application runs on other platforms and on your own servers. But the closer you build to the framework's infrastructure-dependent edges, the more of Vercel's behaviour you are implicitly depending on, and the more a move elsewhere becomes an engineering project rather than a configuration change. This is not a trap and nobody is hiding it. It is simply worth knowing which of the framework's features are portable and which are effectively platform features, before you are attached to several of the latter. Our walkthrough of <a href="/blog/nextjs-14-server-actions">Next.js server actions</a> covers one of these framework capabilities in practical terms.</p>

            <h3>What preview deployments actually change</h3>

            <p>Every branch getting its own live URL sounds like a convenience feature. In practice it changes who is able to participate in review.</p>

            <p>Before: a designer, a product manager or a subject-matter expert reviews a change by reading a description of it, looking at a screenshot, or asking an engineer to demonstrate it. Each of those is a lossy channel, and each one puts an engineer in the loop for something that is not an engineering question.</p>

            <p>After: they open a link and use the thing. The feedback arrives before the merge instead of after the release, and it is about the actual behaviour rather than an interpretation of it. The engineering benefit is secondary — running the real build in the real environment catches the class of problem that only appears in production, which is the class that used to be discovered by users.</p>

            <p>This is the feature that most changes how a team works, and it is the one people underrate when comparing platforms, because it reads as a checkbox rather than as a change in process.</p>

            <h3>The cost model: a seat price plus a meter</h3>

            <p>Vercel's pricing has three parts and only the first is a fixed number. There is a free tier for personal and non-commercial projects, a per-seat paid tier for teams that includes an allowance of platform resources, and a custom enterprise tier. On top of whichever you are on, the platform meters what your application consumes.</p>

            <p>The metered dimensions are the ones any serverless-style platform has to charge for: how much data you serve, how many times your server-side functions are invoked and for how long they run, how much work the platform does transforming images, how much building you do, and how much of the various observability and edge features you use. Deliberately, no figures appear on this page: Vercel has restructured its pricing and renamed its billable units more than once, and a rate quoted in a review is a rate that will be wrong before the review is. Read the current pricing page.</p>

            <p>The structural point survives every restructuring, though. Your bill is a function of traffic and computation, not of your team size, which means it is not something you can know in advance from a plan comparison. That is fine if you understand it and unpleasant if you do not.</p>

            <h3>Where the meter surprises people</h3>

            <p>The surprises cluster, and they are worth knowing before rather than after.</p>

            <p>Success is the obvious one. A post that does well, a launch that lands, a link that circulates — traffic is the input to the bill, so the moment that feels best is the moment the meter runs fastest. This is the story that periodically appears online, and it is usually a small project without spending controls rather than a company with a finance team.</p>

            <p>Traffic you did not want is the less obvious one. Crawlers, scrapers, automated scanners and outright abuse consume the same metered resources as real users. A site with no visitors can still generate a bill, and the people generating it are not going to convert.</p>

            <p>Rendering choices are the one that catches engineers. Whether a page is served as a static file or computed per request is a decision made in your code, often casually, and it is the difference between a request that costs almost nothing and a request that runs a function. A single accidental data access can convert a whole section of a site from the first category into the second, and nothing will alert you.</p>

            <p>The mitigations are not exotic: set spending controls and alerts on day one, understand which of your routes are static and which are dynamic, put caching in front of anything expensive, and check your traffic composition occasionally to see how much of it is bots.</p>

            <h3>v0 is a different product from the same company</h3>

            <p>Because they share a company and get mentioned together, these are routinely conflated. <a href="/tool/v0-by-vercel">v0</a> is a generation tool: you describe an interface and it produces front-end code. Vercel is where code runs. You can use v0 and deploy somewhere else, and you can use Vercel having never touched v0, and most Vercel customers have. The connection is convenience rather than dependency. If you are weighing v0 against an editor-based approach, <a href="/compare/cursor-vs-v0-by-vercel">Cursor vs v0</a> is the relevant comparison, and it is a separate decision from where you host.</p>

            <h3>When not to use Vercel</h3>

            <p>Do not use it for a purely static site with no server-side rendering and no functions. Plain object storage behind a CDN does that job for a rounding error, and you would be paying a platform premium for machinery you never start.</p>

            <p>Do not use it as your general-purpose cloud. Long-running processes, background workers, scheduled jobs that run for a while, queues, stateful services and anything that wants a persistent connection all fit awkwardly on a platform built around request-scoped execution. Teams that try end up with an architecture bent around the hosting model.</p>

            <p>Do not use it if your application is not a JavaScript web application. Other runtimes are supported to varying degrees, and the whole advantage is the integration with the JavaScript ecosystem. Without that, you are choosing a specialist platform for a job it does not specialise in.</p>

            <p>Do not use it when a fixed, predictable monthly cost is a hard requirement — a fixed public-sector budget, a client contract with a set infrastructure line, a low-margin product where a traffic spike must not become an invoice. A fixed-capacity server is the correct shape for a fixed budget, even if it is worse in every other respect.</p>

            <p>Do not use it where data residency, sovereignty or specific compliance certifications are non-negotiable, without confirming the specifics with Vercel directly rather than assuming. This is a procurement question, and it has a real answer, and the answer should come from them.</p>

            <p>And do not use it because it is the default. It is a very good platform and a default is not a reason. If your team already runs infrastructure competently and has a deployment pipeline that works, the operational work Vercel removes is work you have already stopped doing, and you are paying for a refund you cannot collect.</p>
        `,
        useCases: [
            {
                title: "Next.js applications where the deploy path should be a non-decision",
                body: "The case Vercel is built for. Framework features that depend on infrastructure work on the day they ship, and nobody on your team has to learn why. If your application is Next.js and you do not have a platform engineer, this is the shortest path from repository to a fast global site.",
            },
            {
                title: "Review by people who do not run code",
                body: "Preview URLs per branch let designers, product managers and stakeholders use a change rather than read about it. This is the feature that most changes how a team works, because it removes an engineer from the loop on every question that was never an engineering question.",
            },
            {
                title: "Marketing sites and content-heavy front ends",
                body: "Sites with real traffic, real performance requirements and frequent content changes, where a global network and per-branch previews are worth more than the raw hosting. Watch which routes render per request rather than being served as static files, since that decision is what determines the bill.",
            },
            {
                title: "Hosting AI features built into a web app",
                body: "Streaming model responses to a browser is an awkward thing to host well, and Vercel's runtimes and SDK are built around it. Note the distinction that matters: the platform is hosting your AI feature, it is not providing intelligence. You are still buying model access from somebody else.",
            },
            {
                title: "Teams without a platform engineer",
                body: "Builds, certificates, the CDN, scaling and rollbacks all arrive configured. For a small team, the honest comparison is not against a cheaper host, it is against the salary and attention of the person who would otherwise own that work.",
            },
            {
                title: "Standardising a fleet of small sites",
                body: "Agencies and companies running many small front ends get one deployment model, one access model and one place to look when something breaks, rather than a different arrangement per client inherited from whoever built it.",
            },
        ],
        pricingDetail:
            "Vercel charges a per-seat subscription plus metered usage, with a free tier for personal and non-commercial projects, a paid team tier that includes an allowance of platform resources, and a custom enterprise tier. No rates appear here on purpose: Vercel has restructured its pricing and renamed its billable units more than once, so any figure quoted in a review will be out of date before the review is, and the structure is the durable part anyway. What you are metered on is data served, server-side function invocations and their execution time, image transformations, build activity, and the observability and edge features you enable. The consequence is that your bill tracks traffic and computation rather than headcount, so it cannot be predicted from a plan comparison alone. Three things keep it under control: set spending limits and alerts before you launch rather than after, know which of your routes are served as static files and which execute code on every request, and check occasionally how much of your traffic is crawlers and scanners, since automated traffic consumes exactly the same metered resources as customers do. Confirm current rates and included allowances on Vercel's own pricing page.",
        faq: [
            {
                q: "Is Vercel an AI tool?",
                a: "No. It is deployment and hosting infrastructure. It appears in AI tool directories because a lot of applications built with AI tools are deployed on it, and because the same company makes a separate generation product, but Vercel itself builds, hosts and serves web applications. Evaluate it against hosting platforms, not against assistants.",
            },
            {
                q: "Why does the bill exceed the seat price?",
                a: "Because the seat price buys access and an allowance, and the platform meters what your application consumes on top of that: data served, function invocations and their duration, image processing, builds. Your bill therefore tracks traffic and computation rather than team size. The three things that most often cause a surprise are a spike in real traffic, automated crawler traffic that consumes resources and converts nobody, and routes that quietly render per request instead of being served as static files. Spending limits and alerts set before launch solve most of this.",
            },
            {
                q: "Are we locked into Vercel if we use Next.js?",
                a: "Not in principle. Next.js is open source and a plain application runs elsewhere, including on your own servers. In practice, portability is a spectrum: the more you use framework features that depend on the platform's infrastructure, the more work a move becomes. The useful discipline is to know which capabilities you are relying on and which of those are effectively platform features, before you depend on several of them.",
            },
            {
                q: "What is the difference between Vercel and v0?",
                a: "They are separate products from the same company. v0 generates front-end code and interfaces from a description. Vercel runs applications. You can use one without the other in either direction, and most Vercel customers have never used v0. The integration between them is convenience, not a requirement.",
            },
            {
                q: "When should we host somewhere else?",
                a: "When the site is purely static, in which case object storage behind a CDN does the job far more cheaply. When the workload is long-running, scheduled, stateful or queue-shaped, which fits awkwardly on a platform built around request-scoped execution. When the application is not a JavaScript web application, since the ecosystem integration is the whole advantage. When a fixed monthly cost is a hard requirement rather than a preference, because a metered platform is the wrong shape for a fixed budget. And when data residency or specific certifications are non-negotiable, in which case ask Vercel directly rather than inferring the answer.",
            },
        ],
    },

    "devin-ai": {
        overviewHtml: `
            <p><strong>Devin</strong>, from Cognition, is an autonomous coding agent: you describe a task, it works in its own environment, and it comes back with a change for you to review. It is the most discussed product in a category that is still young, and the discussion is mostly about capability — what it can and cannot finish. That is a reasonable thing to argue about and it is not what decides whether it is worth buying.</p>

            <p>What decides it is arithmetic. An agent like this is only worth having if the total cost of getting a change through is lower than doing it yourself, and the total cost is not the invoice.</p>

            <h3>First: Devin the agent is not Devin Desktop the editor</h3>

            <p>Worth settling before anything else, because the names collide and a lot of people arrive here looking for the other product. This page is about <strong>Devin</strong>, the autonomous agent. Cognition also ships <strong>Devin Desktop</strong>, which is an IDE — specifically, it is the editor Codeium built and shipped as <strong>Windsurf</strong>. Cognition acquired Windsurf from Codeium in July 2025 and relaunched it under the Devin name on June 2, 2026, describing it as the next generation of Windsurf; at launch Cognition said it remained compatible with Windsurf and VS Code extensions, keybindings, and LSP integrations. Both codeium.com and windsurf.com now redirect to devin.ai/desktop.</p>

            <p>So if you came looking for Windsurf: the editor still exists, and it is Devin Desktop. It is a VS Code-derived IDE you sit in and drive, which is the opposite posture from the agent the rest of this page describes — one is a tool you use while you are present and steering, the other is a task you hand off and review later. Cognition selling both under one brand does not make them one product, and the evaluation questions are not the same. We have not verified Devin Desktop's pricing or feature set since the relaunch, and the old Windsurf tiers no longer apply, so read those off Cognition's own site. Our <a href="/blog/cursor-vs-windsurf">Cursor vs Windsurf</a> comparison describes the editor as it stood before the rebrand.</p>

            <h3>The invoice is the smaller half of the cost</h3>

            <p>Devin is billed by how much work the agent does, in units of agent compute, rather than by seat. That alone changes the economics compared with a subscription tool, because a task that goes badly costs more than one that goes well — an agent that thrashes for an hour bills for the hour. Cost tracks difficulty and ambiguity rather than value delivered.</p>

            <p>But the metered compute is the part you can see, and it is usually the cheaper part. The real cost of a delegated change is that number plus the engineer's time to specify the task well enough to be attempted, plus the engineer's time to review what comes back, plus — and this is the line nobody budgets — the time spent reviewing changes that turn out to be wrong and are discarded.</p>

            <p>That last item is what makes this arithmetic unintuitive. Reviewing a change you did not write is already slower than reviewing your own, because you have to reconstruct the intent before you can judge the execution. Reviewing a plausible-looking change that is subtly wrong is slower still, and reviewing several of them to find that none is usable is the worst outcome available: you have paid the compute and the review time and have nothing. A tool with a high proportion of near-misses can be more expensive than no tool, at any price per unit, and the price per unit will not tell you which regime you are in.</p>

            <p>Which means the only honest way to evaluate this category is to run it on your own repository and measure two things: what fraction of delegated tasks produce something you actually merge, and how long a review takes compared with writing the change yourself. Both are cheap to measure and both are specific to your codebase, your test coverage and your task mix. Neither is knowable from a vendor page or from anyone else's experience, including ours. There is a broader discussion of where this category came from in our piece on <a href="/blog/autonomous-agents-devin">agentic engineering</a>.</p>

            <p>One implication is worth stating plainly, because it inverts the usual intuition: the constraint on autonomous agents is generally review capacity, not agent capacity. Being able to run several sessions at once sounds like leverage and is only leverage if someone can absorb the output. A team that can run ten agent tasks and review two has bought a queue, not an engineer.</p>

            <h3>Where delegation holds, and where it does not</h3>

            <p>Delegation works when the person delegating can state what done means and something other than a human can check it. The strongest cases share those two properties: the change has a findable home in the code, and a test, a type checker or a script can distinguish success from failure without a person reading every line. When both hold, review is verification rather than reconstruction, and reconstruction is where your time goes.</p>

            <p>It follows that the limiting factor is often your codebase rather than the agent. A repository with good test coverage, clear boundaries and a working local setup gives an agent both a way in and a way to check itself. One without those gives it neither, and no amount of model capability substitutes.</p>

            <p>Now the other side, stated as conditions rather than as a verdict on the product.</p>

            <p>Do not delegate work where the difficulty is deciding rather than implementing. If a task requires choosing between two designs with different long-term consequences, you are the one who has to make that choice, and an agent will make it implicitly and confidently inside a change you then have to reverse-engineer.</p>

            <p>Do not delegate into code you do not understand yourself. You cannot review what you cannot read, and accepting a change you are not equipped to judge is how a codebase acquires sections nobody owns. This is the specific risk for small teams and solo developers, where there is no second reviewer to catch it.</p>

            <p>Do not delegate anything where a subtle error is expensive and hard to detect: security boundaries, authentication, permissions, payments, data migrations, anything touching personal data. The failure mode of this category is not code that does not work, it is code that works in the obvious cases, and those are precisely the areas where the obvious cases all pass.</p>

            <p>Do not adopt it as a replacement for hiring, on current evidence. The public claims in this category run well ahead of what teams report, and the honest position is that it changes what some engineers spend their time on rather than removing the need for them. Buying it on a headcount justification sets up a comparison it will lose.</p>

            <p>Do not buy it if your review capacity is already the bottleneck. Adding a source of pull requests to a team that cannot keep up with its own is a way of making the bottleneck worse while paying for the privilege.</p>

            <p>And do not buy it instead of an in-editor assistant. <a href="/tool/cursor">Cursor</a> and <a href="/tool/github-copilot">GitHub Copilot</a> are addressing a different hour of the day: you are present, you are steering, and correction is immediate. Devin's proposition is that you are not present. Most teams that use both use the editor tools daily and delegate selectively, which is a sensible arrangement and not the one the marketing in this category implies. <a href="/tool/cosine">Cosine</a> is a comparable agent-first product if you are evaluating the category rather than the vendor, and <a href="/compare/chatgpt-vs-devin-ai">ChatGPT vs Devin</a> covers the more basic question of when a chat assistant is enough.</p>
        `,
        useCases: [
            {
                title: "Mechanical changes with a machine-checkable finish line",
                body: "Renames across many files, a version bump with the fallout it causes, a lint rule applied everywhere, a repeated pattern replaced throughout a repository. The work is tedious rather than difficult, and a test suite or a compiler can confirm it landed, which is what makes review fast rather than forensic.",
            },
            {
                title: "Backlog chores that never get prioritised",
                body: "Dependency upgrades, deprecation warnings, missing test coverage on old code, small cleanups everyone agrees about and nobody schedules. These are ideal not because an agent is especially good at them but because the alternative is that they continue not happening.",
            },
            {
                title: "Parallel attempts at one problem",
                body: "Running several independent attempts at the same task and keeping whichever is best, or none. This is a genuinely different way of working that a human engineer cannot offer, and it only pays if you are honest about discarding attempts rather than salvaging the least bad one.",
            },
            {
                title: "First-pass investigation of a reported bug",
                body: "Reproducing a report, locating the relevant code, and coming back with a failing test and a hypothesis. Even when the proposed fix is wrong, a reproduction plus a starting point removes the slowest part of the job for whoever picks it up.",
            },
            {
                title: "Pattern-driven migrations",
                body: "Moving a codebase between frameworks, APIs or conventions where the transformation is the same shape a few hundred times. Do the first several yourself to establish the pattern, delegate the repetition, and keep the review focused on the cases that deviate.",
            },
        ],
        pricingDetail:
            "Devin is billed by agent work rather than by seat, in units of agent compute that Cognition calls ACUs. Cognition describes one ACU as roughly fifteen minutes of active agent work, and it bundles the underlying costs of a session — the virtual machine, the model inference and the data transfer — into a single normalised unit. Cognition originally sold Devin only at a high flat monthly commitment and later replaced that entry point with a low-commitment, pay-as-you-go plan, which is what opened it to individual developers; higher tiers bundle a block of compute at a better effective rate, and enterprise terms are custom. No current rates are quoted here, because the plan structure and the per-unit price have both been revised since launch — read them on Cognition's own pricing page. The structural consequence is the part that does not change: cost scales with how long the agent works, not with the value of the result, so an ambiguous task that thrashes costs more than a clear one that succeeds. And the larger cost is off the invoice entirely. Budget the engineer's time to specify each task and to review what comes back, including the reviews of changes you end up discarding, because that total is what determines whether this is cheaper than doing the work yourself.",
        faq: [
            {
                q: "I was looking for Windsurf — is this the right page?",
                a: "Half of it. Windsurf is now Devin Desktop: Cognition acquired it from Codeium in July 2025 and relaunched it under the Devin name on June 2, 2026, calling it the next generation of Windsurf and keeping compatibility with Windsurf and VS Code extensions, keybindings, and LSP integrations at launch. codeium.com and windsurf.com both redirect to devin.ai/desktop. But Devin Desktop is the IDE, and the rest of this page is about Devin the autonomous agent, which is a separate product you delegate work to rather than type in. For the editor's current plans and features go to Cognition's site — the old Windsurf tiers no longer apply.",
            },
            {
                q: "What does Devin actually cost?",
                a: "More than the invoice, and the invoice is the part that varies least. You pay for agent compute by the unit, so a task that goes badly costs more than a task that goes well. Then add the engineer time to specify the task, the time to review the result, and the time spent reviewing results you throw away. That last item is the one that decides the economics, and it is invisible in any pricing comparison.",
            },
            {
                q: "What is an ACU?",
                a: "Cognition's normalised unit of agent work, covering the virtual machine, model inference and data transfer consumed during a session, described by Cognition as roughly fifteen minutes of active work. The practical implication is that you are billed for effort rather than outcome: an agent that spends an hour going in circles bills for the hour, which is why clearly scoped tasks are cheaper as well as more likely to succeed.",
            },
            {
                q: "Can we stop reviewing its pull requests?",
                a: "No, and the reason is specific to how this class of tool fails. It does not usually produce code that obviously does not work — it produces code that works in the cases you thought of. That is exactly the failure that review exists to catch. Anything touching authentication, permissions, payments, migrations or personal data needs the same scrutiny you would give an unfamiliar contractor's first pull request, and probably more.",
            },
            {
                q: "Is it better than Cursor or GitHub Copilot?",
                a: "It is answering a different question. Editor-based assistants help while you are present and steering, with corrections happening in seconds. Devin's premise is that you are not present. Teams that use both tend to use the editor tools every day and delegate selectively, which is a reasonable arrangement rather than an admission of failure. If you can only have one, the editor tool is the safer purchase for most teams.",
            },
            {
                q: "Which tasks are worth delegating?",
                a: "Ones where you can say what done means in a sentence, there is a findable place in the code where the change belongs, and something other than a human can verify it — a test, a type checker, a script. When all three hold, reviewing the result is verification. When they do not, reviewing means reconstructing what the agent was thinking, which is usually slower than having written it yourself.",
            },
            {
                q: "How do we know if it is paying for itself?",
                a: "Measure two things on your own repository, not on a benchmark. First, what fraction of delegated tasks produce a change you actually merge. Second, how long reviewing one takes compared with writing it yourself. Those two numbers, multiplied through your task mix, give you the answer, and they depend on your test coverage and code structure far more than on the vendor. A month of honest measurement beats any amount of published comparison.",
            },
            {
                q: "Should we wait for the category to mature?",
                a: "There is a defensible case for waiting and a defensible case for a small, bounded trial, and almost no case for a large commitment right now. Capability claims in this category are moving quickly and independent evidence is thin, so anything you conclude today has a short shelf life. The argument for trialling now is that the work which makes an agent effective — test coverage, clear module boundaries, a setup that works from a clean checkout — is work that pays off regardless of whether you keep the agent.",
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
