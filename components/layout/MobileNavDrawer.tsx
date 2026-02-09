"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    X,
    Search,
    History,
    TrendingUp,
    Sparkles,
    ChevronRight,
    Home,
    Wrench,
    Layers,
    Newspaper,
    Zap,
    Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAllTools } from "@/hooks/use-tools";
import { getToolIcon } from "@/lib/tool-icons";
import { ToolData } from "@/lib/tool-types";

interface MobileNavDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const categories = [
    { id: "coding", label: "Coding", icon: "💻", count: 12 },
    { id: "design", label: "Design", icon: "🎨", count: 8 },
    { id: "productivity", label: "Productivity", icon: "⚡", count: 15 },
    { id: "management", label: "Management", icon: "📊", count: 6 },
];

const quickLinks = [
    { href: "/", label: "Home", icon: Home, color: "from-blue-500 to-cyan-500" },
    { href: "/build", label: "Find Stack", icon: Layers, color: "from-violet-500 to-pink-500" },
    { href: "/tools", label: "AI Tools", icon: Wrench, color: "from-indigo-500 to-purple-500" },
    { href: "/blog", label: "Blog", icon: Newspaper, color: "from-emerald-500 to-teal-500" },
    { href: "/favorites", label: "Favorites", icon: Heart, color: "from-rose-500 to-pink-500" },
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/95 backdrop-blur-xl sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500">
                                    <Sparkles className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                    VibeStack
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="rounded-full"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto h-full pb-24">
                            {/* Search */}
                            <div className="p-4">
                                <form onSubmit={handleSearch}>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            type="text"
                                            placeholder="Search tools, stacks..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 pr-4 py-5 rounded-xl bg-secondary/50 border-0"
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Quick Links */}
                            <div className="px-4 mb-6">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                    Quick Links
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {quickLinks.map((link) => {
                                        const Icon = link.icon;
                                        const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => handleLinkClick(link.href)}
                                            >
                                                <Card className={`border-0 transition-all duration-200 ${isActive
                                                    ? 'bg-indigo-500/10 border-indigo-500/30'
                                                    : 'bg-secondary/30 hover:bg-secondary/50'
                                                    }`}>
                                                    <CardContent className="p-3 flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg bg-linear-to-br ${link.color}`}>
                                                            <Icon className="h-4 w-4 text-white" />
                                                        </div>
                                                        <span className={`text-sm font-medium ${isActive ? 'text-indigo-400' : ''}`}>
                                                            {link.label}
                                                        </span>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="px-4 mb-6">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                    Browse by Category
                                </h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={`/tools?category=${category.id}`}
                                            onClick={() => handleLinkClick(`/tools?category=${category.id}`)}
                                        >
                                            <Card className="border-0 bg-secondary/30 hover:bg-secondary/50 transition-colors">
                                                <CardContent className="p-3 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">{category.icon}</span>
                                                        <span className="font-medium">{category.label}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="secondary" className="text-xs">
                                                            {category.count}
                                                        </Badge>
                                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Tools */}
                            {recentToolDetails.length > 0 && (
                                <div className="px-4 mb-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <History className="h-4 w-4 text-muted-foreground" />
                                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            Recently Viewed
                                        </h3>
                                    </div>
                                    <div className="space-y-2">
                                        {recentToolDetails.map((toolItem) => {
                                            const Icon = getToolIcon(toolItem!.slug);
                                            return (
                                                <Link
                                                    key={toolItem!.slug}
                                                    href={`/tool/${toolItem!.slug}`}
                                                    onClick={() => handleLinkClick(`/tool/${toolItem!.slug}`)}
                                                >
                                                    <Card className="border-0 bg-secondary/30 hover:bg-secondary/50 transition-colors">
                                                        <CardContent className="p-3 flex items-center gap-3">
                                                            <div className={`p-2 rounded-lg bg-linear-to-br ${toolItem!.bgGradient || "from-slate-500/60 to-slate-800/60"}`}>
                                                                <Icon className="h-4 w-4 text-white" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium truncate">{toolItem!.title}</p>
                                                                <p className="text-xs text-muted-foreground">{toolItem!.category}</p>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Trending */}
                            <div className="px-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Trending Now
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {["AI Coding", "No-Code", "Productivity", "Design", "Free Tools"].map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/search?q=${encodeURIComponent(tag)}`}
                                            onClick={() => handleLinkClick(`/search?q=${encodeURIComponent(tag)}`)}
                                        >
                                            <Badge
                                                variant="secondary"
                                                className="cursor-pointer hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors"
                                            >
                                                {tag}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Swipe Indicator */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-border/50 to-transparent">
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-16 bg-indigo-500/30 rounded-full" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
