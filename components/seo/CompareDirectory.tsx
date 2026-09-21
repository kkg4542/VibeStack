import Link from "next/link";
import { getTools } from "@/lib/tools-db";
import { comparePairs, type ComparePair } from "@/lib/compare-content";

/**
 * Server-rendered index of every published comparison page.
 *
 * The /compare hub is an interactive client component that reads its state
 * from the URL and localStorage, so the initial HTML contained no links to
 * /compare/[slug] at all — Googlebot only ever saw those URLs in the sitemap.
 * This component renders real <a> links to each one so the comparison pages
 * have a crawlable parent.
 *
 * The links are grouped by category because `comparePairs()` only ever pairs
 * tools inside one category — the grouping is a property of the data, not a
 * presentational choice, and it makes the list scannable without changing how
 * many links it emits (one per published comparison, always).
 */
export async function CompareDirectory() {
    const tools = await getTools();
    const comparisons = comparePairs(tools);

    if (comparisons.length === 0) return null;

    // Pairs are same-category by construction, so t1 describes the whole pair.
    const groups = new Map<string, ComparePair[]>();
    for (const comparison of comparisons) {
        const existing = groups.get(comparison.t1.category);
        if (existing) existing.push(comparison);
        else groups.set(comparison.t1.category, [comparison]);
    }
    const grouped = [...groups.entries()].sort(
        (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0])
    );

    return (
        <nav
            aria-label="All tool comparisons"
            className="mt-24 border-t border-border/60 pt-12"
        >
            <div className="mb-10">
                <h2 className="text-2xl font-semibold text-foreground">All Tool Comparisons</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    All {comparisons.length} head-to-head breakdowns on VibeStack — features,
                    pricing, and a verdict — grouped by the category the two tools share.
                </p>
            </div>

            <div className="space-y-10">
                {grouped.map(([category, pairs]) => (
                    <section key={category}>
                        <h3 className="text-sm font-semibold text-foreground mb-4">
                            {category} comparisons{" "}
                            <span className="font-normal text-muted-foreground">({pairs.length})</span>
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                            {pairs.map((c) => (
                                <li key={c.slug}>
                                    <Link href={`/compare/${c.slug}`} className="hover:text-primary transition-colors">
                                        {c.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </nav>
    );
}
