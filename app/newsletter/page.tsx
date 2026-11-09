"use client";

import { 
    Calendar, 
    ArrowRight, 
    Sparkles,
    Zap,
    CheckCircle2,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useCsrfFetch } from "@/hooks/useCsrfFetch";

// Newsletter archive: populated with real issues once we start sending.
// (No fabricated back-issues.)
interface NewsletterIssue {
    id: string;
    title: string;
    date: string;
    readTime: string;
    description: string;
    highlights: string[];
    featured: boolean;
}
const newsletterArchive: NewsletterIssue[] = [];

const stats = [
    { label: "Cadence", value: "Weekly", icon: Calendar },
    { label: "Cost", value: "Free", icon: Sparkles },
    { label: "Spam", value: "Zero", icon: CheckCircle2 },
    { label: "Unsubscribe", value: "1-click", icon: Zap }
];

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link";

function NewsletterCard({ issue }: { issue: typeof newsletterArchive[0]; index: number }) {
    return (
        <div className={`h-full p-6 ${issue.featured ? "bg-foreground text-background" : "bg-card text-foreground"}`}>
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <p className={`mb-1 text-[14px] ${issue.featured ? "text-background/75" : "text-muted-foreground"}`}>{issue.date}</p>
                    <h3 className="mb-2 text-[20px] font-semibold leading-snug">
                        {issue.title}
                    </h3>
                </div>
                {issue.featured && (
                    <span className="shrink-0 bg-vibe-electric px-2.5 py-1 text-[14px] font-semibold text-vibe-deep">
                        Latest
                    </span>
                )}
            </div>

            <p className={`mb-4 line-clamp-2 text-[16px] ${issue.featured ? "text-background/80" : "text-muted-foreground"}`}>
                {issue.description}
            </p>

            <p className={`mb-5 text-[14px] ${issue.featured ? "text-background/75" : "text-muted-foreground"}`}>
                {issue.highlights.join(", ")}
            </p>

            <div className="flex items-center justify-between text-[15px]">
                <span className={`flex items-center gap-1.5 ${issue.featured ? "text-background/75" : "text-muted-foreground"}`}>
                    <Clock aria-hidden="true" className="h-4 w-4" />
                    {issue.readTime}
                </span>
                <Link
                    href={`/newsletter/${issue.id}`}
                    className={`flex items-center gap-1 font-semibold underline-offset-4 hover:underline ${issue.featured ? "text-vibe-electric" : "text-vibe-link"} ${FOCUS}`}
                >
                    Read <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}

export default function NewsletterPage() {
    const { csrfFetch } = useCsrfFetch();
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        
        try {
            const response = await csrfFetch('/api/newsletter', {
                method: 'POST',
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.json().catch(() => null);
                toast.success(
                    typeof data?.message === "string" && data.message ? data.message : "Successfully subscribed!"
                );
                setEmail("");
            } else if (response.status === 429) {
                toast.error("Too many attempts, try again later.");
            } else {
                const data = await response.json().catch(() => null);
                toast.error(
                    typeof data?.error === "string" && data.error ? data.error : "Failed to subscribe. Please try again."
                );
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
                {/* Hero: plain SSR markup, no entrance animation, visible without JS */}
                <header className="mb-24">
                    <p className="mb-5 text-[16px] font-semibold text-vibe-link">Weekly Newsletter</p>

                    <h1 className="mb-6 max-w-[14ch] font-display text-balance text-[clamp(40px,6vw,96px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">
                        The VibeStack Newsletter
                    </h1>

                    <p className="mb-10 max-w-[60ch] text-[19px] leading-normal text-muted-foreground">
                        Get the latest AI tools, reviews, and productivity tips delivered to your inbox every Monday. 
                        No spam, just value.
                    </p>

                    {/* Subscribe form */}
                    <div className="mb-16 max-w-xl">
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                aria-label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 flex-1 border-0 bg-card"
                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                size="xl"
                                variant="gradient"
                                className="h-12 rounded-none px-8 text-[16px]"
                            >
                                {isSubmitting ? "Subscribing..." : "Subscribe"}
                            </Button>
                        </form>
                        <p className="mt-3 text-[14px] text-muted-foreground">
                            No spam. Unsubscribe anytime.
                        </p>
                    </div>

                    {/* Stats */}
                    <dl className="grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.label} className="bg-card p-5">
                                    <Icon aria-hidden="true" className="mb-3 h-5 w-5 text-vibe-link" />
                                    <dd className="font-display text-[36px] uppercase leading-none text-foreground">{stat.value}</dd>
                                    <dt className="mt-1 text-[14px] text-muted-foreground">{stat.label}</dt>
                                </div>
                            );
                        })}
                    </dl>
                </header>

                {/* What to expect */}
                <section className="mb-20">
                    <div className="mb-10">
                        <h2 className="mb-3 font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground">What to Expect</h2>
                        <p className="text-[18px] text-muted-foreground">Every issue includes</p>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 md:gap-6">
                        {[
                            {
                                icon: Sparkles,
                                title: "Tool Spotlights",
                                description: "In-depth reviews of the latest and most impactful AI tools"
                            },
                            {
                                icon: Zap,
                                title: "Productivity Tips",
                                description: "Actionable workflows and techniques to boost your output"
                            },
                            {
                                icon: CheckCircle2,
                                title: "Curated Picks",
                                description: "Hand-selected tools that actually deliver on their promises"
                            }
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="h-full bg-card p-6 sm:p-8">
                                    <Icon aria-hidden="true" className="mb-5 h-7 w-7 text-vibe-link" />
                                    <h3 className="mb-2 text-[20px] font-semibold">{item.title}</h3>
                                    <p className="text-[16px] leading-normal text-muted-foreground">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Archive: shown once we have real issues to display */}
                {newsletterArchive.length > 0 && (
                    <section>
                        <div className="mb-10">
                            <h2 className="mb-3 font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground">Newsletter Archive</h2>
                            <p className="text-[18px] text-muted-foreground">Browse previous issues</p>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                            {newsletterArchive.map((issue, index) => (
                                <NewsletterCard key={issue.id} issue={issue} index={index} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </PageBackground>
    );
}
