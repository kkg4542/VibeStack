"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles, Search, Wand2, Heart, FileText } from "lucide-react";

import { m } from "framer-motion";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";
import { CommandMenu } from "@/components/command-menu";
import { SubmitDialog } from "@/components/layout/SubmitDialog";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { useState } from "react";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";

import { UserNav } from "@/components/layout/UserNav";
const navItems = [
    { href: "/", label: "Home", icon: Sparkles },
    { href: "/build", label: "Find Stack", icon: Wand2 },
    { href: "/tools", label: "Tools", icon: Search },
    { href: "/blog", label: "Blog", icon: FileText },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <LazyMotionProvider>
            <header className="fixed top-0 z-50 w-full border-b border-border/50 backdrop-blur-obsidian bg-noise/[0.02] dark:bg-noise/[0.1]">
                <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    {/* Logo area */}
                    <div className="flex items-center gap-2">
                        <Link id="navbar-logo" href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80" aria-label="VibeStack Home">
                            <span className="text-2xl font-black tracking-tighter bg-linear-to-r from-vibe-electric via-vibe-purple to-vibe-pink bg-clip-text text-transparent italic">
                                VibeStack
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden items-center gap-6 md:flex ml-8">
                            <Link
                                id="nav-link-build"
                                href="/build"
                                aria-current={pathname === '/build' ? 'page' : undefined}
                                className={`text-sm font-medium transition-colors hover:text-foreground ${pathname === '/build' ? 'text-foreground' : 'text-muted-foreground'
                                    }`}
                            >
                                Find Stack
                            </Link>
                            <Link
                                id="nav-link-tools"
                                href="/tools"
                                aria-current={pathname === '/tools' ? 'page' : undefined}
                                className={`text-sm font-medium transition-colors hover:text-foreground ${pathname === '/tools' ? 'text-foreground' : 'text-muted-foreground'
                                    }`}
                            >
                                Tools
                            </Link>
                            <Link
                                id="nav-link-blog"
                                href="/blog"
                                aria-current={pathname?.startsWith('/blog') ? 'page' : undefined}
                                className={`text-sm font-medium transition-colors hover:text-foreground ${pathname?.startsWith('/blog') ? 'text-foreground' : 'text-muted-foreground'
                                    }`}
                            >
                                Blog
                            </Link>
                            <Link
                                id="nav-link-faq"
                                href="/faq"
                                aria-current={pathname === '/faq' ? 'page' : undefined}
                                className={`text-sm font-medium transition-colors hover:text-foreground ${pathname === '/faq' ? 'text-foreground' : 'text-muted-foreground'
                                    }`}
                            >
                                FAQ
                            </Link>
                        </nav>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <CommandMenu />

                        <div className="hidden h-4 w-px bg-white/10 md:block"></div>

                        <ThemeToggle />

                        <div className="hidden md:block">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link href="/favorites">
                                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                                <Heart className="h-5 w-5" />
                                            </Button>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Your Favorites</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="hidden md:block">
                            <SubmitDialog />
                        </div>

                        <UserNav />

                        {/* Mobile Menu */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(true)}
                            className="md:hidden text-muted-foreground"
                            aria-label="Open navigation menu"
                            aria-expanded={isOpen}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        {/* Enhanced Mobile Navigation Drawer */}
                        <MobileNavDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
                    </div>
                </div>
            </header>
        </LazyMotionProvider>
    );
}
