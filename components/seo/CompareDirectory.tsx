import Link from "next/link";
import { getTools } from "@/lib/tools-db";
import { comparePairs } from "@/lib/compare-content";

/**
 * Server-rendered index of every published comparison page.
 *
 * The /compare hub is an interactive client component that reads its state
 * from the URL and localStorage, so the initial HTML contained no links to
 * /compare/[slug] at all — Googlebot only ever saw those URLs in the sitemap.
 * This component renders real <a> links to each one so the 50 comparison
 * pages have a crawlable parent.
 */
export async function CompareDirectory() {
    const tools = await getTools();
    const comparisons = comparePairs(tools);

    if (comparisons.length === 0) return null;

    return (
        <nav
            aria-label="All tool comparisons"
            className="mt-24 border-t border-border/60 pt-12"
        >
            <div className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground">All Tool Comparisons</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Head-to-head breakdowns of every tool pairing on VibeStack — features, pricing, and a verdict.
                </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {comparisons.map((c) => (
                    <li key={c.slug}>
                        <Link href={`/compare/${c.slug}`} className="hover:text-primary transition-colors">
                            {c.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
