"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles, X, Search, Wand2, Heart, FileText, Info } from "lucide-react";
import * as motion from "framer-motion/client";
import { CommandMenu } from "@/components/command-menu";
import { SubmitDialog } from "@/components/layout/SubmitDialog";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
    { href: "/", label: "Home", icon: Sparkles },
    { href: "/tools", label: "AI Tools", icon: Search },
    { href: "/build", label: "Find Stack", icon: Wand2 },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/blog", label: "Blog", icon: FileText },
    { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
                {/* Logo area */}
                <div className="flex items-center gap-2">
                    <Link id="navbar-logo" href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-500/20 text-indigo-400">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-semibold tracking-tight">VibeStack</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-6 md:flex ml-8">
                        <Link id="nav-link-tools" href="/tools" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            Tools
                        </Link>
                        <Link id="nav-link-build" href="/build" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            Find Stack
                        </Link>
                        <Link id="nav-link-blog" href="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            Blog
                        </Link>
                        <Link id="nav-link-about" href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            About
                        </Link>
                    </nav>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <CommandMenu />

                    <div className="hidden h-4 w-px bg-white/10 md:block"></div>

                    <ThemeToggle />

                    <div className="hidden md:block">
                        <SubmitDialog />
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden text-muted-foreground"
                                aria-label="Open menu"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl">
                            <SheetHeader>
                                <SheetTitle className="flex items-center gap-2 text-left">
                                    <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-500/20 text-indigo-400">
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-semibold">Menu</span>
                                </SheetTitle>
                            </SheetHeader>

                            <nav className="mt-8 flex flex-col gap-2">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
                                    >
                                        <SheetClose asChild>
                                            <Link
                                                id={`nav-link-${item.href.replace("/", "") || "home"}`}
                                                href={item.href}
                                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground rounded-lg hover:bg-accent hover:text-foreground transition-colors group"
                                            >
                                                <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                                                {item.label}
                                            </Link>
                                        </SheetClose>
                                    </motion.div>
                                ))}

                                <div className="my-4 border-t border-border" />

                                <div className="px-4">
                                    <SubmitDialog />
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
