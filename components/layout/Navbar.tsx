"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles, X, Search, Wand2, Heart, FileText, Info, Zap, User, LogOut } from "lucide-react";

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
import { useSession, signOut } from "next-auth/react";
import { AuthDialog } from "@/components/auth/AuthDialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";

const navItems = [
    { href: "/", label: "Home", icon: Sparkles },
    { href: "/build", label: "Find Stack", icon: Wand2 },
    { href: "/tools", label: "Tools", icon: Search },
    { href: "/blog", label: "Blog", icon: FileText },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    // Auth helpers
    const user = session?.user;
    const handleSignOut = () => signOut();
    const handleSignIn = () => setIsAuthOpen(true);

    return (
        <LazyMotionProvider>
            <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
                <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
                    {/* Logo area */}
                    <div className="flex items-center gap-2">
                        <Link id="navbar-logo" href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
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

                        {/* Auth Status */}
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-2">
                                        <Avatar className="h-8 w-8">
                                            {/* Use user image if available, fallback to first letter */}
                                            {user.image ? (
                                                <AvatarImage src={user.image} alt={user.name || "User"} />
                                            ) : null}
                                            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <AuthDialog
                                open={isAuthOpen}
                                onOpenChange={setIsAuthOpen}
                                trigger={
                                    <Button size="sm" variant="ghost" className="ml-2 font-medium">
                                        Sign In
                                    </Button>
                                }
                            />
                        )}

                        {/* Mobile Menu */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(true)}
                            className="md:hidden text-muted-foreground"
                            aria-label="Open menu"
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
