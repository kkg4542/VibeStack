"use client";

import Link from "next/link";
import { Sparkles, Github, Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { trackNewsletterSubscribe } from "@/lib/analytics";

export function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            setStatus("error");
            setMessage("Please enter a valid email address");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setMessage(data.message || "Successfully subscribed!");
                trackNewsletterSubscribe(email);
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Failed to subscribe. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <footer className="border-t border-border bg-background pt-16 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                VibeStack
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            The AI Productivity Lab. We curate the best AI tools to help developers build faster and better.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://x.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="https://github.com/vibestack" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="mailto:hello@usevibestack.com" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Platform</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/tools" className="hover:text-primary transition-colors">AI Tools</Link></li>
                            <li><Link href="/build" className="hover:text-primary transition-colors">Find Stack</Link></li>
                            <li><Link href="/compare" className="hover:text-primary transition-colors">Compare</Link></li>
                            <li><Link href="/favorites" className="hover:text-primary transition-colors">Favorites</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Resources</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link href="/roadmap" className="hover:text-primary transition-colors">Roadmap</Link></li>
                            <li><Link href="/newsletter" className="hover:text-primary transition-colors">Newsletter</Link></li>
                            <li><Link href="/submit-tool" className="hover:text-primary transition-colors">Submit Tool</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Stay Updated</h4>
                        <p className="text-xs text-muted-foreground">
                            Get the latest AI tools delivered to your inbox weekly. No spam.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-2">
                            <label htmlFor="newsletter-email" className="sr-only">
                                Email address
                            </label>
                            <Input
                                id="newsletter-email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === "loading"}
                                className="bg-secondary/50 border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
                                aria-label="Email address for newsletter"
                            />
                            <Button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Subscribing...
                                    </>
                                ) : (
                                    "Subscribe"
                                )}
                            </Button>
                        </form>

                        {/* Status Message */}
                        {status === "success" && (
                            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                                <CheckCircle className="h-4 w-4" />
                                {message}
                            </div>
                        )}
                        {status === "error" && (
                            <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
                                <AlertCircle className="h-4 w-4" />
                                {message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} VibeStack. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-muted-foreground">
                        <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
