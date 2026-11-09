"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { Button } from "@/components/ui/button";
import { Menu, X, History, TrendingUp, ChevronRight } from "lucide-react";
import { SearchInput } from "@/components/ui/search-input";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/components/icons/tool-icons";
import { ToolData } from "@/lib/tool-types";

/** Display order for the category shortcuts; counts come from the live tool list. */
const CATEGORY_ORDER: ToolData["category"][] = [
    "Coding",
    "Design",
    "Productivity",
    "Management",
    "Assistance",
    "Other",
];

/** Shown (without counts) until the tool list has loaded. */
const FALLBACK_CATEGORIES = CATEGORY_ORDER.slice(0, 4);

// Same destinations as the desktop nav (Navbar) plus Home / Favorites, which
// only exist as icons or the logo on desktop.
const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/build", label: "Find Stack" },
    { href: "/tools", label: "AI Tools" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" },
    { href: "/favorites", label: "Favorites" },
];

const RECENT_KEY = "vibestack-recent-tools";

function readRecentSlugs(): string[] {
    try {
        const parsed = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
        return Array.isArray(parsed)
            ? parsed.filter((s): s is string => typeof s === "string")
            : [];
    } catch {
        return [];
    }
}

const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring";

/**
 * Mobile navigation as a right-hand side sheet on Radix Dialog: role=dialog,
 * aria-modal, focus trap, Escape to close, scroll lock, and focus returns to
 * the hamburger (the Dialog.Trigger) when it closes. The component owns its
 * trigger so Radix can wire aria-expanded / aria-controls / focus restore.
 */
export function MobileNavDrawer() {
    const [open, setOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    // Sign In closes the sheet first; the auth dialog opens once the sheet has
    // handed focus back, so the two focus traps never fight.
    const pendingAuth = useRef(false);

    return (
        <>
            <SheetPrimitive.Root open={open} onOpenChange={setOpen}>
                <SheetPrimitive.Trigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-11 rounded-none text-muted-foreground md:hidden"
                        aria-label="Open navigation menu"
                    >
                        <Menu aria-hidden="true" className="h-5 w-5" />
                    </Button>
                </SheetPrimitive.Trigger>
                <SheetPrimitive.Portal>
                    <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none md:hidden" />
                    <SheetPrimitive.Content
                        aria-modal="true"
                        aria-describedby={undefined}
                        onCloseAutoFocus={(event) => {
                            if (pendingAuth.current) {
                                pendingAuth.current = false;
                                event.preventDefault();
                                setAuthOpen(true);
                            }
                        }}
                        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-hidden bg-background text-foreground outline-none duration-300 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right motion-reduce:animate-none md:hidden" // taste-skill-ignore (real overlay)
                    >
                        <DrawerBody
                            onClose={() => setOpen(false)}
                            onSignIn={() => {
                                pendingAuth.current = true;
                                setOpen(false);
                            }}
                        />
                    </SheetPrimitive.Content>
                </SheetPrimitive.Portal>
            </SheetPrimitive.Root>
            <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
        </>
    );
}

function DrawerBody({
    onClose,
    onSignIn,
}: {
    onClose: () => void;
    onSignIn: () => void;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const { tools } = useAllTools();
    const [searchQuery, setSearchQuery] = useState("");
    // Mounted only while the sheet is open, so this reads fresh on every open.
    const [recentSlugs] = useState<string[]>(() => readRecentSlugs().slice(0, 4));
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const categories = useMemo(() => {
        if (tools.length === 0) {
            return FALLBACK_CATEGORIES.map((label) => ({ label, count: null as number | null }));
        }
        const counts = new Map<string, number>();
        for (const tool of tools as ToolData[]) {
            counts.set(tool.category, (counts.get(tool.category) ?? 0) + 1);
        }
        return CATEGORY_ORDER.filter((label) => (counts.get(label) ?? 0) > 0).map((label) => ({
            label,
            count: counts.get(label) ?? 0,
        }));
    }, [tools]);

    // Swipe toward the left to close (unchanged from the previous drawer).
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        if (touchStart - e.touches[0].clientX > 100) {
            setTouchStart(null);
            onClose();
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onClose();
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLinkClick = (href: string) => {
        // Save to recent tools if it's a tool page
        if (href.startsWith("/tool/")) {
            const toolSlug = href.replace("/tool/", "");
            const updated = [toolSlug, ...readRecentSlugs().filter((s) => s !== toolSlug)].slice(0, 10);
            try {
                localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
            } catch {
                // Storage unavailable: recents just won't persist.
            }
        }
        onClose();
    };

    const recentToolDetails = recentSlugs
        .map((slug) => (tools as ToolData[]).find((t) => t.slug === slug))
        .filter((t): t is ToolData => Boolean(t));

    return (
        <div
            className="flex min-h-0 flex-1 flex-col"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setTouchStart(null)}
        >
            {/* Signature orange bar */}
            <div className="h-1.5 shrink-0 bg-vibe-electric" aria-hidden="true" />

            {/* Header */}
            <div className="flex shrink-0 items-center justify-between bg-background px-4 py-2">
                <SheetPrimitive.Title className="font-display text-2xl uppercase leading-none tracking-[-0.005em]">
                    VibeStack
                    <span className="sr-only"> navigation menu</span>
                </SheetPrimitive.Title>
                <SheetPrimitive.Close asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-11 rounded-none"
                        aria-label="Close navigation menu"
                    >
                        <X aria-hidden="true" className="h-5 w-5" />
                    </Button>
                </SheetPrimitive.Close>
            </div>

            {/* Content */}
            <div className="min-h-0 flex-1 overflow-y-auto pb-12">
                {/* Search */}
                <div className="px-4 pb-4">
                    <form onSubmit={handleSearch} role="search">
                        <SearchInput
                            variant="mobile"
                            placeholder="Search tools, stacks..."
                            aria-label="Search tools and stacks"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>

                {/* Quick Links */}
                <nav aria-label="Quick links" className="mb-4">
                    <ul>
                        {quickLinks.map((link) => {
                            const isActive =
                                pathname === link.href ||
                                (link.href !== "/" && pathname?.startsWith(`${link.href}/`));
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => handleLinkClick(link.href)}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`flex items-center justify-between px-4 py-2 font-display text-5xl uppercase leading-[0.88] tracking-[-0.005em] transition-colors ${focusRing} ${isActive
                                            ? "bg-vibe-electric text-vibe-deep"
                                            : "text-foreground hover:bg-secondary"
                                            }`}
                                    >
                                        {link.label}
                                        <ChevronRight className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Sign In (same dialog the desktop header opens) */}
                {!session?.user && (
                    <div className="mb-8 px-4">
                        <button
                            type="button"
                            onClick={onSignIn}
                            className="inline-flex h-12 w-full items-center justify-center bg-vibe-electric px-6 text-base font-semibold text-vibe-deep transition-colors hover:bg-vibe-electric/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            Sign In
                        </button>
                    </div>
                )}

                {/* Categories */}
                <div className="mb-8 px-4">
                    <h3 className="mb-3 text-base font-semibold text-muted-foreground">
                        Browse by category
                    </h3>
                    <div className="space-y-1">
                        {categories.map((category) => {
                            const href = `/tools?category=${category.label.toLowerCase()}`;
                            return (
                                <Link
                                    key={category.label}
                                    href={href}
                                    onClick={() => handleLinkClick(href)}
                                    className={`flex min-h-12 items-center justify-between bg-card px-3 py-3 text-base font-semibold transition-colors hover:bg-accent ${focusRing}`}
                                >
                                    <span>{category.label}</span>
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        {category.count !== null && (
                                            <span className="text-[13px] tabular-nums">{category.count}</span>
                                        )}
                                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Tools */}
                {recentToolDetails.length > 0 && (
                    <div className="mb-8 px-4">
                        <div className="mb-3 flex items-center gap-2">
                            <History className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            <h3 className="text-base font-semibold text-muted-foreground">
                                Recently viewed
                            </h3>
                        </div>
                        <div className="space-y-1">
                            {recentToolDetails.map((toolItem) => {
                                const Icon = getToolIcon(toolItem.slug);
                                return (
                                    <Link
                                        key={toolItem.slug}
                                        href={`/tool/${toolItem.slug}`}
                                        onClick={() => handleLinkClick(`/tool/${toolItem.slug}`)}
                                        className={`flex items-center gap-3 bg-card p-3 transition-colors hover:bg-accent ${focusRing}`}
                                    >
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-secondary text-foreground">
                                            <Icon className="h-4 w-4" aria-hidden="true" />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate font-semibold">{toolItem.title}</span>
                                            <span className="block text-[13px] text-muted-foreground">{toolItem.category}</span>
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Trending */}
                <div className="px-4">
                    <div className="mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <h3 className="text-base font-semibold text-muted-foreground">
                            Trending now
                        </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["AI Coding", "No-Code", "Productivity", "Design", "Free Tools"].map((tag) => (
                            <Link
                                key={tag}
                                href={`/search?q=${encodeURIComponent(tag)}`}
                                onClick={() => handleLinkClick(`/search?q=${encodeURIComponent(tag)}`)}
                                className="inline-flex min-h-10 items-center bg-secondary px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-vibe-electric hover:text-vibe-deep focus-visible:outline-2 focus-visible:outline-ring"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
