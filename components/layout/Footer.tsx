"use client";

import Link from "next/link";
import { ArrowRight, Github, Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { trackNewsletterSubscribe } from "@/lib/analytics";
import { useCsrfFetch } from "@/hooks/useCsrfFetch";
import { Container } from "@/components/primitives/Container";

/*
 * "Invitation over a cropped name": one inverse field (bg-foreground /
 * text-background, so it flips with the theme). Upper area: a two-line
 * display invitation with the one filled button (cols 1-7 at lg) and the link
 * groups (cols 9-12). Bottom: the legal row, then the wordmark in orange,
 * one line, pushed down 18% so the footer's overflow-hidden crops it.
 *
 * Colours that sit ON the field are the opposite theme's values:
 *   light theme -> field #18191b: muted #9c9ea3, accent text #ff4a1f
 *   dark theme  -> field #eff0f1: muted #5b5d62, accent text #b93a16
 */
const MUTED = "text-[#9c9ea3] dark:text-[#5b5d62]";
const LINK =
    "inline-block py-1 transition-colors duration-150 hover:text-vibe-electric dark:hover:text-[#b93a16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current motion-reduce:transition-none";
const GROUP_TITLE = "text-[14px] font-semibold leading-normal";
const LIST =
    "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[15px] leading-normal md:mt-3 md:block md:space-y-1 md:text-[16px]";

export function Footer() {
    const { csrfFetch } = useCsrfFetch();
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
            const response = await csrfFetch("/api/newsletter", {
                method: "POST",
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
        <footer className="relative overflow-hidden bg-foreground font-sans text-background">
            <Container size="default" className="pt-20 md:pt-28">
                <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-8">
                    {/* Invitation, columns 1-7 */}
                    <div className="lg:col-span-7">
                        <p className="font-display text-[11vw] md:text-[length:clamp(40px,5vw,84px)]">
                            Find the stack
                            <br />
                            for your goal
                        </p>
                        <Link
                            href="/build"
                            className="group mt-8 flex h-12 w-full items-center justify-center gap-2 bg-vibe-electric px-6 text-[16px] font-semibold text-vibe-deep transition-transform duration-150 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current motion-reduce:transition-none motion-reduce:active:translate-y-0 md:inline-flex md:w-auto"
                        >
                            Find my stack
                            <ArrowRight
                                aria-hidden="true"
                                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                            />
                        </Link>
                        <p className={`mt-8 max-w-[44ch] text-[16px] leading-normal ${MUTED}`}>
                            The AI Productivity Lab. We curate the best AI tools to help developers build faster and better.
                        </p>
                        <div className="mt-5 flex gap-5">
                            <a href="https://x.com/vibestack" target="_blank" rel="noopener noreferrer" className={`inline-flex p-2 -m-2 ${LINK}`} aria-label="Follow VibeStack on X">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="https://github.com/vibestack" target="_blank" rel="noopener noreferrer" aria-label="VibeStack on GitHub" className={`inline-flex p-2 -m-2 ${LINK}`}>
                                <Github className="h-5 w-5" aria-hidden="true" />
                            </a>
                            <a href="mailto:hello@usevibestack.com" aria-label="Email VibeStack" className={`inline-flex p-2 -m-2 ${LINK}`}>
                                <Mail className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </div>
                    </div>

                    {/* Link groups, columns 9-12 */}
                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-4 md:gap-x-8 lg:col-span-4 lg:col-start-9 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-10">
                        <div>
                            <h2 className={GROUP_TITLE}>Platform</h2>
                            <ul className={LIST}>
                                <li><Link href="/tools" className={LINK}>AI Tools</Link></li>
                                <li><Link href="/build" className={LINK}>Find Stack</Link></li>
                                <li><Link href="/compare" className={LINK}>Compare</Link></li>
                                <li><Link href="/favorites" className={LINK}>Favorites</Link></li>
                                <li><Link href="/blog" className={LINK}>Blog</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h2 className={GROUP_TITLE}>Best of 2026</h2>
                            <ul className={LIST}>
                                <li><Link href="/best/coding" className={LINK}>AI Coding Tools</Link></li>
                                <li><Link href="/best/design" className={LINK}>AI Design Tools</Link></li>
                                <li><Link href="/best/assistance" className={LINK}>AI Assistants</Link></li>
                                <li><Link href="/best/productivity" className={LINK}>AI Productivity Tools</Link></li>
                                <li><Link href="/best/management" className={LINK}>AI Project Management</Link></li>
                                <li><Link href="/best/other" className={LINK}>More AI Tools</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h2 className={GROUP_TITLE}>Resources</h2>
                            <ul className={LIST}>
                                <li><Link href="/faq" className={LINK}>FAQ</Link></li>
                                <li><Link href="/roadmap" className={LINK}>Roadmap</Link></li>
                                <li><Link href="/newsletter" className={LINK}>Newsletter</Link></li>
                                <li><Link href="/submit-tool" className={LINK}>Submit Tool</Link></li>
                                <li><Link href="/pricing" className={LINK}>Pricing</Link></li>
                                <li><Link href="/sponsor" className={LINK}>Sponsor / Advertise</Link></li>
                                <li><Link href="/about" className={LINK}>About</Link></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h2 className={GROUP_TITLE}>Stay updated</h2>
                            <p className={`mt-2 text-[15px] leading-normal md:mt-3 md:text-[16px] ${MUTED}`}>
                                Get the latest AI tools delivered to your inbox weekly. No spam.
                            </p>
                            <form onSubmit={handleSubmit} className="mt-4 space-y-2">
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
                                    className="h-12 rounded-none border-2 border-[#9c9ea3] bg-transparent text-[16px] text-background shadow-none placeholder:text-[#9c9ea3] focus-visible:border-current focus-visible:ring-0 dark:border-[#5b5d62] dark:placeholder:text-[#5b5d62]"
                                    aria-label="Email address for newsletter"
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="inline-flex h-12 w-full items-center justify-center bg-background px-4 text-[16px] font-semibold text-foreground transition-transform duration-150 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none motion-reduce:active:translate-y-0"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                                            Subscribing...
                                        </>
                                    ) : (
                                        "Subscribe"
                                    )}
                                </button>
                            </form>

                            {/* Status Message */}
                            <div aria-live="polite">
                                {status === "success" && (
                                    <p className="mt-3 flex items-center gap-2 text-[14px] leading-normal">
                                        <CheckCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                                        {message}
                                    </p>
                                )}
                                {status === "error" && (
                                    <p className="mt-3 flex items-center gap-2 text-[14px] leading-normal">
                                        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                                        {message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Credits and legal, directly above the wordmark */}
                <div className={`mt-20 flex flex-col gap-2 text-[13px] leading-normal md:mt-28 md:flex-row md:items-center md:justify-between ${MUTED}`}>
                    <p>
                        © {new Date().getFullYear()}{" "}
                        <Link href="/" className={LINK}>VibeStack</Link>. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className={LINK}>Privacy Policy</Link>
                        <Link href="/terms" className={LINK}>Terms of Service</Link>
                    </div>
                </div>

                {/*
                  The wordmark: decorative (aria-hidden; the home link is in the
                  row above). Measured: Big Shoulders 800 sets VIBESTACK 3.97em
                  wide, so 23vw (about 91% of the viewport) fills the container's
                  content width (100vw minus 32-64px of padding) from phones up
                  to lg, and the cap stops it at the container's width on wide
                  screens. Only the bottom is meant to be cropped (translate-y +
                  the footer's overflow-hidden), never the sides.
                */}
                <p
                    aria-hidden="true"
                    className="mt-3 -ml-[0.03em] translate-y-[18%] select-none whitespace-nowrap font-display text-[23vw] text-vibe-electric dark:text-[#fb4519] md:text-[length:min(23vw,270px)]"
                >
                    VIBESTACK
                </p>
            </Container>
        </footer>
    );
}
