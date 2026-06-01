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

export const TOOL_EXTENDED_CONTENT: Record<string, ToolExtendedContent> = {
    lovable: {
        overviewHtml: `
            <p><strong>Lovable</strong> is one of the breakout products of the 2025–2026 "AI app builder" wave. The premise is direct: you describe an application in plain language, and Lovable generates a working full-stack project — frontend, backend, database, authentication, deployment — without you opening a code editor. It is positioned somewhere between <a href="/tool/v0-by-vercel">v0 by Vercel</a> (UI-first, developer-targeted) and <a href="/tool/bolt-new">Bolt.new</a> (full-stack, developer-targeted) — Lovable is full-stack but firmly targeted at founders, designers, and operators who don't write code professionally.</p>

            <p>Under the hood Lovable generates a standard React + Vite frontend, a Supabase-backed backend, and a deployed preview environment within a minute or two of the initial prompt. From there the user can iterate by chatting with the AI ("make the header sticky", "add a Stripe checkout for this plan"), by clicking into elements directly, or — and this is where Lovable differs from many competitors — by editing the generated source code in a built-in IDE if the user happens to know how. The full code is downloadable and the project can be ejected to GitHub at any point, which removes the usual "trapped in a no-code tool" objection.</p>

            <p>The product's biggest strength is the guided flow from idea to deployed app. You don't have to know what an API route is, what a database schema is, or how authentication works — Lovable creates sensible defaults for all of it. The biggest weakness, predictably, is the same one every AI app builder has: when the project grows past about ten screens or includes complex business logic, the model starts making changes that conflict with each other, and a non-developer has no good way to recover. Lovable's response — letting you connect the project to a real GitHub repo and inviting a developer in — is pragmatic, but it does reveal the ceiling for non-technical solo use.</p>

            <p>For its intended user — a founder who wants a usable MVP without paying a development team or learning React — it is one of the most capable tools on the market in mid-2026. For experienced developers it can still be worth a look as a starter scaffold, although tools like <a href="/tool/cursor">Cursor</a> are likely a better fit for sustained engineering work.</p>
        `,
        useCases: [
            {
                title: "Founder MVPs",
                body: "Solo founders use Lovable to ship the first version of a SaaS, marketplace, or internal tool in a weekend. Auth, database, and deployment are handled by the generated stack, leaving the founder to focus on the unique product surface area.",
            },
            {
                title: "Internal tools for non-technical teams",
                body: "Operations, marketing, and customer success teams use Lovable to build small internal dashboards and forms that would otherwise sit in a JIRA backlog for months. Because the generated stack uses Supabase as the database, hooking the new tool into existing data is straightforward.",
            },
            {
                title: "Rapid prototyping for designers",
                body: "Designers use Lovable to turn a Figma concept into a clickable, deployable prototype with real interactivity, real data, and a real URL — which validates ideas with users in a way that static mockups cannot.",
            },
            {
                title: "Pre-seed pitch demos",
                body: "Founders preparing for fundraising use Lovable to put a real, working product in front of investors rather than slides. The combination of speed, quality of output, and ejectability makes the resulting demo defensible if the deal moves to diligence.",
            },
        ],
        pricingDetail:
            "Lovable's free tier allows a generous number of daily messages and unlimited projects, which is enough to evaluate the product and build a small MVP. Paid plans (currently Starter, Pro, and Teams) unlock higher message volume, private projects, custom domains, and team collaboration. Pricing is monthly with annual discounts; specific dollar amounts shift frequently, so check the official site before quoting numbers to a team.",
        faq: [
            {
                q: "Is Lovable better than v0 or Bolt.new?",
                a: "It depends entirely on who you are. v0 is best when you want polished UI components for a developer-led project. Bolt.new is best for developers who want a fast end-to-end scaffold they will then take over. Lovable is best when the person building the app is not a developer and wants the AI to handle as much of the stack as possible.",
            },
            {
                q: "Do I own the code Lovable generates?",
                a: "Yes. Projects can be exported, pushed to your own GitHub, and run independently of Lovable. This is one of the more important differentiators from closed no-code tools.",
            },
            {
                q: "What stack does Lovable use under the hood?",
                a: "React with Vite for the frontend, Tailwind for styling, Supabase (Postgres + Auth + Storage) for the backend, and an integrated deploy pipeline that produces a live preview URL automatically.",
            },
            {
                q: "Can a developer pick up a Lovable project mid-flight?",
                a: "Yes — connect the project to GitHub and a developer can clone it and continue in any editor. The code is conventional and readable, which is uncommon among AI-generated codebases.",
            },
            {
                q: "What is the biggest limitation?",
                a: "Complexity. Once a project crosses roughly ten screens or starts having intricate cross-cutting business logic, the AI's edits begin to conflict with previous work. At that point bringing in a developer is the realistic next step rather than continuing solo.",
            },
        ],
    },
};

export function getExtendedContent(slug: string): ToolExtendedContent | null {
    return TOOL_EXTENDED_CONTENT[slug] ?? null;
}
