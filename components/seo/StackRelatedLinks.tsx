import Link from "next/link";
import { Stack, stacks } from "@/lib/stacks";
import { BEST_CATEGORIES } from "@/lib/best-categories";
import { ToolData } from "@/lib/tool-types";

interface StackRelatedLinksProps {
    stack: Stack;
    stackTools: ToolData[];
    allTools: ToolData[];
}

const linkClass = "hover:text-primary transition-colors";

/**
 * Server-rendered cross-links for a stack page.
 *
 * StackDetailClient is a client component whose links render fine, but the
 * page had no outbound links to the category hubs or sibling stacks. These
 * static links give crawlers a path from a stack to the rest of the site.
 */
export function StackRelatedLinks({ stack, stackTools, allTools }: StackRelatedLinksProps) {
    // Best-of guides for the categories this stack's tools belong to.
    const guides = BEST_CATEGORIES.filter((c) =>
        stackTools.some((t) => t.category === c.category)
    );

    // Other stacks sharing at least one tool with this one.
    const siblingStacks = stacks
        .filter((s) => s.id !== stack.id && s.tools.some((slug) => stack.tools.includes(slug)))
        .slice(0, 4);

    // Tools listed in `stack.tools` that aren't in the directory keep their
    // slug — nothing to link to, so fall back to the resolved list only.
    const toolLinks = stackTools.length > 0
        ? stackTools
        : allTools.filter((t) => stack.tools.includes(t.slug));

    if (toolLinks.length === 0 && guides.length === 0 && siblingStacks.length === 0) {
        return null;
    }

    return (
        <nav
            aria-label="Related pages"
            className="mt-16 border-t border-border/60 pt-12 grid gap-10 md:grid-cols-3"
        >
            {toolLinks.length > 0 && (
                <section>
                    <h2 className="text-sm font-semibold text-foreground mb-4">Tools in this stack</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {toolLinks.map((tool) => (
                            <li key={tool.slug}>
                                <Link href={`/tool/${tool.slug}`} className={linkClass}>
                                    {tool.title} review
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {guides.length > 0 && (
                <section>
                    <h2 className="text-sm font-semibold text-foreground mb-4">Related guides</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {guides.map((c) => (
                            <li key={c.slug}>
                                <Link href={`/best/${c.slug}`} className={linkClass}>
                                    {c.heading}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {siblingStacks.length > 0 && (
                <section>
                    <h2 className="text-sm font-semibold text-foreground mb-4">Other stacks</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {siblingStacks.map((s) => (
                            <li key={s.id}>
                                <Link href={`/stack/${s.id}`} className={linkClass}>
                                    {s.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </nav>
    );
}
