import Link from "next/link";
import { Sparkles, Twitter, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-zinc-950 pt-16 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-500/20 text-indigo-400">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-semibold tracking-tight text-white">VibeStack</span>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                            The AI Productivity Lab. We curate the best AI tools to help developers build faster and better.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://twitter.com/vibestack" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://github.com/vibestack" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="mailto:hello@vibestack.com" className="text-zinc-500 hover:text-white transition-colors">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white">Platform</h4>
                        <ul className="space-y-3 text-sm text-zinc-400">
                            <li><Link href="/tools" className="hover:text-indigo-400 transition-colors">AI Tools</Link></li>
                            <li><Link href="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link></li>
                            <li><Link href="/about" className="hover:text-indigo-400 transition-colors">About</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Get Featured</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white">Stay Updated</h4>
                        <p className="text-xs text-zinc-500">
                            Get the latest AI tools delivered to your inbox weekly. No spam.
                        </p>
                        <form className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500/50"
                            />
                            <Button className="w-full bg-white text-black hover:bg-zinc-200">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-zinc-600">
                        © {new Date().getFullYear()} VibeStack. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-zinc-600">
                        <Link href="#" className="hover:text-zinc-400">Privacy Policy</Link>
                        <Link href="#" className="hover:text-zinc-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
