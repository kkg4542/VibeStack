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
import { Container } from "@/components/primitives/Container";
const navItems = [
    { href: "/", label: "Home", icon: Sparkles },
    { href: "/build", label: "Find Stack", icon: Wand2 },
    { href: "/tools", label: "Tools", icon: Search },
    { href: "/blog", label: "Blog", icon: FileText },
    { href: "/pricing", label: "Pricing", icon: Sparkles },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <LazyMotionProvider>
            <header className="fixed top-0 z-50 w-full bg-card">
                <Container className="flex h-16 items-center justify-between">
                    {/* Logo area */}
                    <div className="flex min-w-0 items-center gap-2">
                        <Link id="navbar-logo" href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80" aria-label="VibeStack Home">
                            <span className="font-display text-3xl text-foreground">
                                VibeStack
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden items-center gap-4 md:flex ml-6 lg:ml-8 lg:gap-6">
                            <Link
                                id="nav-link-build"
                                href="/build"
                                aria-current={pathname === '/build' ? 'page' : undefined}
                                className="inline-flex h-8 items-center rounded-md bg-vibe-electric px-3 text-sm font-semibold text-vibe-deep transition-colors hover:bg-vibe-electric/90 motion-reduce:transition-none"
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
                                id="nav-link-pricing"
                                href="/pricing"
                                aria-current={pathname === '/pricing' ? 'page' : undefined}
                                className={`text-sm font-medium transition-colors hover:text-foreground ${pathname === '/pricing' ? 'text-foreground' : 'text-muted-foreground'
                                    }`}
                            >
                                Pricing
                            </Link>
                            <Link
                                id="nav-link-faq"
                                href="/faq"
                                aria-current={pathname === '/faq' ? 'page' : undefined}
                                className={`hidden lg:inline text-sm font-medium transition-colors hover:text-foreground ${pathname === '/faq' ? 'text-foreground' : 'text-muted-foreground'
                                    }`}
                            >
                                FAQ
                            </Link>
                        </nav>
                    </div>

                    {/* Right Actions — shrink-0 so it never gets pushed past the
                        container padding; at md (768–1023px) FAQ and the
                        favorites icon move out (both stay in the footer) and
                        gaps tighten so Sign In keeps the full 24px edge inset. */}
                    <div className="flex shrink-0 items-center gap-1 lg:gap-2">
                        <CommandMenu />

                        <ThemeToggle />

                        <div className="hidden lg:block">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-foreground"
                                            aria-label="Your favorites"
                                            asChild
                                        >
                                            <Link href="/favorites">
                                                <Heart className="h-5 w-5" />
                                            </Link>
                                        </Button>
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
                </Container>
            </header>
        </LazyMotionProvider>
    );
}
