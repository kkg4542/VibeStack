import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Menu, Sparkles } from "lucide-react";
import { CommandMenu } from "@/components/command-menu";
import { SubmitDialog } from "@/components/layout/SubmitDialog";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
                {/* Logo area */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-500/20 text-indigo-400">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-semibold tracking-tight">VibeStack</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-6 md:flex ml-8">
                        <Link href="/tools" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            Tools
                        </Link>
                        <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            Blog
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            About
                        </Link>
                    </nav>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <CommandMenu />

                    <div className="hidden h-4 w-px bg-white/10 md:block"></div>

                    <ThemeToggle />

                    <SubmitDialog />

                    {/* Mobile Menu Toggle */}
                    <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
