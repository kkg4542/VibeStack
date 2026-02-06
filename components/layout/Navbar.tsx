"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles, X, Search, Wand2, Heart, FileText, Info, Zap, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
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
// import { useAuth } from "@/context/auth-context"; // Removed local auth
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

const navItems = [
    { href: "/", label: "Home", icon: Sparkles },
    { href: "/tools", label: "AI Tools", icon: Search },
    { href: "/build", label: "Find Stack", icon: Wand2 },
    { href: "/consulting", label: "Advertise", icon: Zap },
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
        <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
                {/* Logo area */}
                <div className="flex items-center gap-2">
                    <Link id="navbar-logo" href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                        <img
                            src="/logo-icon.png"
                            alt="VibeStack Icon"
                            className="h-10 w-auto object-contain"
                        />
                        <span className="text-xl font-bold tracking-tight text-white">
                            VibeStack
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-6 md:flex ml-8">
                        <Link
                            id="nav-link-tools"
                            href="/tools"
                            className={`text-sm font-medium transition-colors hover:text-foreground ${pathname === '/tools' ? 'text-foreground' : 'text-muted-foreground'
                                }`}
                        >
                            Tools
                        </Link>
                        <Link
                            id="nav-link-build"
                            href="/build"
                            className={`text-sm font-medium transition-colors hover:text-foreground ${pathname === '/build' ? 'text-foreground' : 'text-muted-foreground'
                                }`}
                        >
                            stack
                        </Link>
                        <Link
                            id="nav-link-consulting"
                            href="/consulting"
                            className={`text-sm font-medium transition-colors hover:text-foreground ${pathname === '/consulting' ? 'text-foreground' : 'text-muted-foreground'
                                }`}
                        >
                            Advertise
                        </Link>
                        <Link
                            id="nav-link-blog"
                            href="/blog"
                            className={`text-sm font-medium transition-colors hover:text-foreground ${pathname?.startsWith('/blog') ? 'text-foreground' : 'text-muted-foreground'
                                }`}
                        >
                            Blog
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
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden text-muted-foreground"
                                aria-label="Open menu"
                                aria-expanded={isOpen}
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl">
                            <SheetHeader>
                                <SheetTitle className="flex items-center gap-3 text-left">
                                    <img
                                        src="/logo-icon.png"
                                        alt="VibeStack Icon"
                                        className="h-8 w-auto object-contain"
                                    />
                                    <span className="text-lg font-semibold">VibeStack</span>
                                </SheetTitle>
                            </SheetHeader>

                            <nav className="mt-8 flex flex-col gap-2">
                                {/* Mobile Auth */}
                                <div className="mb-4 px-2">
                                    {user ? (
                                        <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                                            <Avatar className="h-10 w-10">
                                                {user.image ? (
                                                    <AvatarImage src={user.image} />
                                                ) : null}
                                                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-sm font-medium truncate">{user.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={handleSignOut} className="h-8 w-8 text-muted-foreground">
                                                <LogOut className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button className="w-full" onClick={() => { setIsOpen(false); setIsAuthOpen(true); }}>
                                            Sign In
                                        </Button>
                                    )}
                                </div>

                                <div className="border-t border-border mb-4" />

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
