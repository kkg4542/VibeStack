"use client";

import {
    MapPin,
    CheckCircle2,
    Clock,
    ArrowRight
} from "lucide-react";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";

const roadmapItems = [
    {
        quarter: "Q1 2026",
        status: "completed",
        title: "Platform Foundation",
        description: "Core platform features",
        items: [
            { text: "Launched with a curated directory of AI tools", completed: true },
            { text: "Stack Finder quiz", completed: true },
            { text: "User authentication & favorites", completed: true },
            { text: "Tool comparison feature", completed: true },
            { text: "Review & rating system", completed: true }
        ]
    },
    {
        quarter: "Q2 2026",
        status: "completed",
        title: "Community & Content",
        description: "Building our community",
        items: [
            { text: "Blog with AI industry insights", completed: true },
            { text: "Stack submission system", completed: true },
            { text: "Newsletter launch", completed: true },
            { text: "Social sharing features", completed: true },
            { text: "Dark/light mode toggle", completed: true }
        ]
    },
    {
        quarter: "Q3 2026",
        status: "in-progress",
        title: "Enhanced Discovery",
        description: "Currently in development",
        items: [
            { text: "AI-powered tool recommendations", completed: false },
            { text: "Advanced filtering & search", completed: true },
            { text: "Category-specific landing pages", completed: true },
            { text: "User collections & lists", completed: false },
            { text: "Tool usage analytics", completed: false }
        ]
    },
    {
        quarter: "Q4 2026",
        status: "planned",
        title: "Pro Features",
        description: "Premium experiences",
        items: [
            { text: "VibeStack Pro subscription", completed: false },
            { text: "Exclusive deals & discounts", completed: false },
            { text: "API access for developers", completed: false },
            { text: "Integration guides & tutorials", completed: false },
            { text: "Team collaboration features", completed: false }
        ]
    },
    {
        quarter: "2027",
        status: "planned",
        title: "The Future",
        description: "Long-term vision",
        items: [
            { text: "Mobile app (iOS & Android)", completed: false },
            { text: "Browser extension", completed: false },
            { text: "Discord community", completed: false },
            { text: "AI chatbot assistant", completed: false },
            { text: "500+ tools in database", completed: false }
        ]
    }
];

const changelog = [
    {
        date: "February 2026",
        version: "v2.1.0",
        changes: [
            { type: "feature", text: "Added FAQ and Roadmap pages" },
            { type: "improvement", text: "Enhanced light mode visibility across all components" },
            { type: "fix", text: "Fixed TypeScript strict mode violations" },
            { type: "feature", text: "New category landing pages" }
        ]
    },
    {
        date: "January 2026",
        version: "v2.0.0",
        changes: [
            { type: "feature", text: "Redesigned UI with new design system" },
            { type: "feature", text: "Added Stack submission feature" },
            { type: "feature", text: "Launched consulting/advertising page" },
            { type: "improvement", text: "Improved tool card interactions with 3D effects" }
        ]
    },
    {
        date: "December 2025",
        version: "v1.5.0",
        changes: [
            { type: "feature", text: "Added blog section with 5+ articles" },
            { type: "feature", text: "Newsletter subscription system" },
            { type: "feature", text: "Tool comparison page" },
            { type: "improvement", text: "Performance optimizations" }
        ]
    },
    {
        date: "November 2025",
        version: "v1.0.0",
        changes: [
            { type: "feature", text: "Initial launch with a curated AI tool directory" },
            { type: "feature", text: "Stack Finder quiz" },
            { type: "feature", text: "User favorites system" },
            { type: "feature", text: "Review & rating system" }
        ]
    }
];

function StatusBadge({ status }: { status: string }) {
    // Direction B: no traffic-light colours. In progress is the one orange
    // tag; completed is ink; planned is a quiet surface tag.
    const styles = {
        completed: "bg-foreground text-background",
        "in-progress": "bg-vibe-electric text-vibe-deep",
        planned: "bg-secondary text-muted-foreground"
    };

    const icons = {
        completed: CheckCircle2,
        "in-progress": Clock,
        planned: MapPin
    };

    const Icon = icons[status as keyof typeof icons];

    return (
        <span className={`inline-flex items-center px-2.5 py-1 text-[14px] font-semibold ${styles[status as keyof typeof styles]}`}>
            <Icon aria-hidden="true" className="mr-1.5 h-3.5 w-3.5" />
            {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

function ChangeTypeBadge({ type }: { type: string }) {
    const styles = {
        feature: "text-vibe-link",
        improvement: "text-foreground",
        fix: "text-muted-foreground"
    };

    return (
        <span className={`w-28 shrink-0 text-[14px] font-semibold ${styles[type as keyof typeof styles]}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
    );
}

const H2 = "font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground";

export default function RoadmapPage() {
    return (
        <PageBackground {...BackgroundPresets.content}>
            <Container size="md">
                {/* Hero */}
                <header className="mb-20 pt-8">
                    <p className="mb-5 text-[16px] font-semibold text-vibe-link">Roadmap &amp; Updates</p>

                    <h1 className="mb-6 max-w-[14ch] font-display text-balance text-[clamp(40px,6vw,96px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">
                        Our Journey &amp; Roadmap
                    </h1>

                    <p className="max-w-[60ch] text-[19px] leading-normal text-muted-foreground">
                        See what we&apos;ve built, what we&apos;re working on, and what&apos;s coming next.
                        We&apos;re building VibeStack in public.
                    </p>
                </header>

                {/* Roadmap */}
                <section className="mb-24">
                    <h2 className={`${H2} mb-10`}>Product Roadmap</h2>

                    <ol className="space-y-3">
                        {roadmapItems.map((item) => (
                            <li
                                key={item.quarter}
                                className={`grid gap-6 p-6 sm:p-8 md:grid-cols-[200px_1fr] ${item.status === "in-progress" ? "bg-foreground text-background" : "bg-card"}`}
                            >
                                <div>
                                    <p className="mb-3 font-display text-[44px] uppercase leading-none">{item.quarter}</p>
                                    <StatusBadge status={item.status} />
                                </div>
                                <div>
                                    <h3 className="mb-1 text-[22px] font-semibold">{item.title}</h3>
                                    <p className={`mb-5 text-[16px] ${item.status === "in-progress" ? "text-background/75" : "text-muted-foreground"}`}>{item.description}</p>

                                    <ul className="grid gap-2 sm:grid-cols-2">
                                        {item.items.map((listItem, i) => (
                                            <li key={i} className="flex items-start gap-2 text-[16px]">
                                                {listItem.completed ? (
                                                    <CheckCircle2 aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${item.status === "in-progress" ? "text-vibe-electric" : "text-vibe-link"}`} />
                                                ) : (
                                                    <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                                                )}
                                                <span className={listItem.completed ? "" : "opacity-75"}>
                                                    {listItem.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* Changelog */}
                <section className="mb-24">
                    <h2 className={`${H2} mb-10`}>Changelog</h2>

                    <div className="space-y-3">
                        {changelog.map((release, index) => (
                            <div key={release.version} className="bg-card p-6 sm:p-8">
                                <div className="mb-5 flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-[22px] font-semibold">{release.version}</h3>
                                        <p className="text-[15px] text-muted-foreground">{release.date}</p>
                                    </div>
                                    {index === 0 && (
                                        <span className="bg-vibe-electric px-2.5 py-1 text-[14px] font-semibold text-vibe-deep">
                                            Latest
                                        </span>
                                    )}
                                </div>

                                <ul className="space-y-3">
                                    {release.changes.map((change, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <ChangeTypeBadge type={change.type} />
                                            <span className="text-[16px] text-foreground">{change.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Feature request CTA: the accent field */}
                <div className="bg-vibe-electric p-8 text-vibe-deep sm:p-10">
                    <h3 className="mb-3 font-display text-[clamp(32px,4vw,48px)] uppercase leading-[0.9] tracking-[-0.005em]">Have a feature idea?</h3>
                    <p className="mb-6 max-w-[56ch] text-[17px] leading-normal">
                        We&apos;re building VibeStack for you. Share your ideas and help shape the future of the platform.
                    </p>
                    <Link
                        href="/about"
                        className="group inline-flex h-12 items-center gap-2 bg-vibe-deep px-7 text-[16px] font-semibold text-[#eff0f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-deep"
                    >
                        Submit Feedback
                        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                    </Link>
                </div>
            </Container>
        </PageBackground>
    );
}
