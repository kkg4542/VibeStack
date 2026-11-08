"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    X,
    History,
    TrendingUp,
    ChevronRight,
} from "lucide-react";
import { SearchInput } from "@/components/ui/search-input";
import { m, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/components/icons/tool-icons";
import { ToolData } from "@/lib/tool-types";

interface MobileNavDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const categories = [
    { id: "coding", label: "Coding", count: 12 },
    { id: "design", label: "Design", count: 8 },
    { id: "productivity", label: "Productivity", count: 15 },
    { id: "management", label: "Management", count: 6 },
];

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/build", label: "Find Stack" },
    { href: "/tools", label: "AI Tools" },
    { href: "/blog", label: "Blog" },
    { href: "/favorites", label: "Favorites" },
];

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { tools } = useAllTools();
    const [searchQuery, setSearchQuery] = useState("");
    const [recentTools, setRecentTools] = useState<string[]>([]);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    // Load recent tools from localStorage
    useEffect(() => {
        const recent = localStorage.getItem('vibestack-recent-tools');
        if (recent) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRecentTools(JSON.parse(recent).slice(0, 4));
        }
    }, []);

    // Handle swipe to close
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStart === null) return;

        const touchEnd = e.touches[0].clientX;
        const diff = touchStart - touchEnd;

        // Swipe left to close
        if (diff > 100) {
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
        if (href.startsWith('/tool/')) {
            const toolSlug = href.replace('/tool/', '');
            const recent = localStorage.getItem('vibestack-recent-tools');
            const recentList = recent ? JSON.parse(recent) : [];
            const updated = [toolSlug, ...recentList.filter((s: string) => s !== toolSlug)].slice(0, 10);
            localStorage.setItem('vibestack-recent-tools', JSON.stringify(updated));
        }
        onClose();
    };

    const recentToolDetails = recentTools
        .map(slug => tools.find((t: ToolData) => t.slug === slug))
        .filter(Boolean);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <m.div
                        initial={false}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 z-50"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <m.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background text-foreground z-50 overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    >
                        {/* Signature orange bar */}
                        <div className="h-1.5 bg-vibe-electric" aria-hidden="true" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-background sticky top-0 z-10">
                            <span className="font-display text-2xl uppercase leading-none tracking-[-0.005em]">
                                VibeStack
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="rounded-none"
                                aria-label="Close navigation menu"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto h-full pb-24">
                            {/* Search */}
                            <div className="px-4 pb-4">
                                <form onSubmit={handleSearch}>
                                    <SearchInput
                                        variant="mobile"
                                        placeholder="Search tools, stacks..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </form>
                            </div>

                            {/* Quick Links */}
                            <nav aria-label="Quick links" className="mb-8">
                                <ul>
                                    {quickLinks.map((link) => {
                                        const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(`${link.href}/`));
                                        return (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    onClick={() => handleLinkClick(link.href)}
                                                    aria-current={isActive ? "page" : undefined}
                                                    className={`flex items-center justify-between px-4 py-2 font-display text-5xl uppercase leading-[0.88] tracking-[-0.005em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring ${isActive
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

                            {/* Categories */}
                            <div className="px-4 mb-8">
                                <h3 className="text-base font-semibold text-muted-foreground mb-3">
                                    Browse by category
                                </h3>
                                <div className="space-y-1">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={`/tools?category=${category.id}`}
                                            onClick={() => handleLinkClick(`/tools?category=${category.id}`)}
                                            className="flex items-center justify-between bg-card px-3 py-3 text-base font-semibold transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
                                        >
                                            <span>{category.label}</span>
                                            <span className="flex items-center gap-2 text-muted-foreground">
                                                <span className="text-[13px] tabular-nums">{category.count}</span>
                                                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Tools */}
                            {recentToolDetails.length > 0 && (
                                <div className="px-4 mb-8">
                                    <div className="flex items-center gap-2 mb-3">
                                        <History className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                        <h3 className="text-base font-semibold text-muted-foreground">
                                            Recently viewed
                                        </h3>
                                    </div>
                                    <div className="space-y-1">
                                        {recentToolDetails.map((toolItem) => {
                                            const Icon = getToolIcon(toolItem!.slug);
                                            return (
                                                <Link
                                                    key={toolItem!.slug}
                                                    href={`/tool/${toolItem!.slug}`}
                                                    onClick={() => handleLinkClick(`/tool/${toolItem!.slug}`)}
                                                    className="flex items-center gap-3 bg-card p-3 transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
                                                >
                                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-secondary text-foreground">
                                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                                    </span>
                                                    <span className="flex-1 min-w-0">
                                                        <span className="block font-semibold truncate">{toolItem!.title}</span>
                                                        <span className="block text-[13px] text-muted-foreground">{toolItem!.category}</span>
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Trending */}
                            <div className="px-4">
                                <div className="flex items-center gap-2 mb-3">
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
                                            className="bg-secondary px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-vibe-electric hover:text-vibe-deep focus-visible:outline-2 focus-visible:outline-ring"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </m.div>
                </>
            )}
        </AnimatePresence>
    );
}
