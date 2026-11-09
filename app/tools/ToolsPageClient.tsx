"use client";

import { ToolsList } from "./ToolsList";
import { ShieldCheck, RefreshCw, Layers, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
const PageBackground = dynamic(() => import("@/components/effects/PageBackground").then(mod => mod.PageBackground), { ssr: false });
import { BackgroundPresets } from "@/components/effects/PageBackground";
import { useTools } from "@/hooks/use-tools";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import { SearchInput } from "@/components/ui/search-input";
import { Container } from "@/components/primitives/Container";

// Note: Metadata moved to page.tsx (Server Component) for SEO

const SORT_OPTIONS = ["default", "newest"] as const;

interface ToolsPageClientProps {
    /** Category names present in the data, server-derived (includes "Other"). */
    categories: string[];
    /** Pricing models present in the data, server-derived. */
    pricingOptions: string[];
    /** Counts computed from the same server read as the page header. */
    stats: {
        totalTools: number;
        categoriesCount: number;
        freeToolsCount: number;
    };
}

/** Case-insensitive match of a URL value against the canonical option names. */
function matchOption(value: string | null, options: string[]): string {
    if (!value) return "All";
    const lower = value.toLowerCase();
    return options.find((o) => o.toLowerCase() === lower) ?? "All";
}

function parseFilters(sp: { get(name: string): string | null }, categories: string[], pricingOptions: string[]) {
    const sort = sp.get("sort");
    return {
        q: sp.get("q") ?? "",
        category: matchOption(sp.get("category"), categories),
        pricing: matchOption(sp.get("pricing"), pricingOptions),
        sortBy: (SORT_OPTIONS as readonly string[]).includes(sort ?? "") ? (sort as string) : "default",
    };
}

export default function ToolsPage({ categories, pricingOptions, stats }: ToolsPageClientProps) {
    const searchParams = useSearchParams();
    const spString = searchParams.toString();
    const initial = parseFilters(searchParams, categories, pricingOptions);

    const [searchQuery, setSearchQuery] = useState(initial.q);
    const [category, setCategory] = useState(initial.category);
    const [pricing, setPricing] = useState(initial.pricing);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState(initial.sortBy);

    const debouncedSearch = useDebounce(searchQuery, 300);

    // Adopt URL changes made from outside this component (the mobile drawer
    // links to /tools?category=coding while /tools may already be mounted).
    // Our own history.replaceState writes below produce a URL that already
    // matches state, so they are no-ops here. Compared against the debounced
    // search so a half-typed query is never clobbered by our own lagging write.
    const [prevSp, setPrevSp] = useState(spString);
    if (spString !== prevSp) {
        setPrevSp(spString);
        const next = parseFilters(searchParams, categories, pricingOptions);
        if (
            next.q !== debouncedSearch ||
            next.category !== category ||
            next.pricing !== pricing ||
            next.sortBy !== sortBy
        ) {
            setSearchQuery(next.q);
            setCategory(next.category);
            setPricing(next.pricing);
            setSortBy(next.sortBy);
            setPage(1);
        }
    }

    // Keep the address bar in sync with the filters. history.replaceState (not
    // router.replace) so no RSC request fires; Next feeds it into useSearchParams.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const write = (key: string, value: string | undefined) => {
            if (value) params.set(key, value);
            else params.delete(key);
        };
        write("q", debouncedSearch.trim() ? debouncedSearch : undefined);
        write("category", category === "All" ? undefined : category.toLowerCase());
        write("pricing", pricing === "All" ? undefined : pricing.toLowerCase());
        write("sort", sortBy === "default" ? undefined : sortBy);
        const next = params.toString();
        if (next === new URLSearchParams(window.location.search).toString()) return;
        window.history.replaceState(
            window.history.state,
            "",
            `${window.location.pathname}${next ? `?${next}` : ""}${window.location.hash}`
        );
    }, [debouncedSearch, category, pricing, sortBy]);

    const { tools, pagination, isLoading } = useTools({
        q: debouncedSearch || undefined,
        // Send the canonical names ("Design", "Free"); the API also matches
        // case-insensitively so old lower-case links keep working.
        category: category === "All" ? undefined : category,
        pricing: pricing === "All" ? undefined : pricing,
        sort: sortBy === "default" ? undefined : sortBy,
        page,
        limit: 20
    });

    // Header stats come from the server read in app/tools/page.tsx, so they
    // are real counts and do not move when a filter is applied.
    const { totalTools, categoriesCount, freeToolsCount } = stats;
    // Shape of /api/stacks/featured, which resolves every card out of
    // lib/stacks.ts — so `id` is always a stack page that exists.
    const [featuredStacks, setFeaturedStacks] = useState<Array<{
        id: string;
        name: string;
        description: string;
        tools: { name: string; slug: string }[];
    }>>([]);

    useEffect(() => {
        let isMounted = true;
        fetch("/api/stacks/featured?limit=4")
            .then((res) => res.json())
            .then((data) => {
                if (!isMounted) return;
                if (Array.isArray(data?.stacks) && data.stacks.length > 0) {
                    setFeaturedStacks(data.stacks);
                }
            })
            .catch(() => {
                // No invented fallback: the section simply does not render.
            });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        // The page header (badge, H1, intro) is server-rendered in
        // app/tools/page.tsx and sits directly above this block, so it owns the
        // offset under the fixed nav. Keep this padding small or the two halves
        // of the hero drift apart.
        <PageBackground {...BackgroundPresets.content} className="pt-8">
            <Container size="default">
                <div className="mb-16">
                    {/* The badge, H1 and lead paragraph live in
                        app/tools/page.tsx. They are static copy, and keeping
                        them here left the hub with no heading and no intro in
                        the prerendered HTML. */}
                    {/* Quick Stats */}
                    <dl className="mb-12 grid grid-cols-3 gap-1">
                        <div className="flex flex-col-reverse bg-card px-4 py-4 sm:px-6">
                            <dt className="mt-2 text-[14px] text-muted-foreground sm:text-[16px]">Tools listed</dt>
                            <dd className="font-display text-[clamp(32px,4vw,56px)] tabular-nums text-foreground">{totalTools}</dd>
                        </div>
                        <div className="flex flex-col-reverse bg-card px-4 py-4 sm:px-6">
                            <dt className="mt-2 text-[14px] text-muted-foreground sm:text-[16px]">Categories</dt>
                            <dd className="font-display text-[clamp(32px,4vw,56px)] tabular-nums text-foreground">{categoriesCount}</dd>
                        </div>
                        <div className="flex flex-col-reverse bg-card px-4 py-4 sm:px-6">
                            <dt className="mt-2 text-[14px] text-muted-foreground sm:text-[16px]">Free tools</dt>
                            <dd className="font-display text-[clamp(32px,4vw,56px)] tabular-nums text-foreground">{freeToolsCount}</dd>
                        </div>
                    </dl>

                    {/* Trust Signals */}
                    <div className="mb-12 grid gap-1 md:grid-cols-3">
                        <div className="bg-secondary p-6">
                            <div className="mb-3 flex items-center gap-2 text-[16px] font-semibold text-foreground">
                                <ShieldCheck aria-hidden="true" className="h-5 w-5" />
                                Real-use validation
                            </div>
                            <p className="text-[16px] leading-normal text-muted-foreground">
                                We prioritize tools with clear workflows, stable UX, and measurable time-savings.
                            </p>
                        </div>
                        <div className="bg-secondary p-6">
                            <div className="mb-3 flex items-center gap-2 text-[16px] font-semibold text-foreground">
                                <RefreshCw aria-hidden="true" className="h-5 w-5" />
                                Monthly rechecks
                            </div>
                            <p className="text-[16px] leading-normal text-muted-foreground">
                                Pricing, policies, and features are reviewed on a monthly cadence.
                            </p>
                        </div>
                        <div className="bg-secondary p-6">
                            <div className="mb-3 flex items-center gap-2 text-[16px] font-semibold text-foreground">
                                <Layers aria-hidden="true" className="h-5 w-5" />
                                Stack compatibility
                            </div>
                            <p className="text-[16px] leading-normal text-muted-foreground">
                                We evaluate how tools work together, not just in isolation.
                            </p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl">
                        <div className="relative">
                            <SearchInput
                                variant="hero"
                                placeholder="Search by name, category, or feature..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setPage(1); // Reset to first page on search
                                }}
                                aria-label="Search AI tools"
                                className="h-14 rounded-none border-0 bg-card py-0 text-[18px] focus:ring-0 focus:border-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                            />
                        </div>
                        <p className="mt-3 text-[14px] text-muted-foreground">
                            Try searching &quot;coding&quot;, &quot;free&quot;, or &quot;design&quot;
                        </p>
                    </div>
                </div>

                {/* Starter Stacks */}
                {featuredStacks.length > 0 && (
                <section className="mb-16">
                    <div className="mb-8">
                        <h2 className="font-display text-[clamp(32px,4vw,56px)] text-foreground">Starter stacks</h2>
                        <p className="mt-3 text-[16px] text-muted-foreground">
                            Proven combinations you can adopt immediately.
                        </p>
                    </div>
                    <div className="grid gap-1 md:grid-cols-2">
                        {featuredStacks.map((stack) => (
                            <div key={stack.name}>
                                <Link
                                    href={`/stack/${stack.id}`}
                                    className="group block h-full bg-card text-foreground transition-colors duration-150 hover:bg-vibe-electric hover:text-vibe-deep focus-visible:bg-vibe-electric focus-visible:text-vibe-deep focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-vibe-deep motion-reduce:transition-none"
                                >
                                    <div className="flex h-full flex-col p-6">
                                        <div className="mb-6">
                                            <h3 className="mb-1 text-[20px] font-semibold">
                                                {stack.name}
                                            </h3>
                                            <p className="line-clamp-2 text-[16px] leading-normal text-muted-foreground group-hover:text-vibe-deep group-focus-visible:text-vibe-deep">
                                                {stack.description}
                                            </p>
                                        </div>

                                        <div className="mt-auto">
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-1">
                                                    {stack.tools.slice(0, 4).map((tool, i) => {
                                                        const name = tool.name;
                                                        return (
                                                            <div
                                                                key={i}
                                                                className="flex h-8 w-8 items-center justify-center bg-secondary text-[13px] font-semibold text-foreground"
                                                                title={name}
                                                            >
                                                                {name.charAt(0)}
                                                            </div>
                                                        );
                                                    })}
                                                    {stack.tools.length > 4 && (
                                                        <div className="flex h-8 w-8 items-center justify-center bg-secondary text-[13px] font-semibold text-foreground">
                                                            +{stack.tools.length - 4}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 text-[16px] font-semibold text-vibe-link group-hover:text-vibe-deep group-focus-visible:text-vibe-deep">
                                                    View Stack
                                                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
                )}

                {/* Tools List Component */}
                <ToolsList
                    tools={tools}
                    pagination={pagination}
                    isLoading={isLoading}
                    categories={categories}
                    pricingOptions={pricingOptions}
                    filters={{ category, pricing, page, sortBy }}
                    setFilters={{
                        setCategory: (c: string) => { setCategory(c); setPage(1); },
                        setPricing: (p: string) => { setPricing(p); setPage(1); },
                        setPage,
                        setSortBy: (s: string) => { setSortBy(s); setPage(1); },
                        clearAll: () => {
                            setSearchQuery("");
                            setCategory("All");
                            setPricing("All");
                            setPage(1);
                        }
                    }}
                />
            </Container>
        </PageBackground>
    );
}
