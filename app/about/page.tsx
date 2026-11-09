import { Button } from "@/components/ui/button";
import {
    Zap,
    Heart,
    Rocket,
    Mail,
    Lightbulb,
    Code2,
    Palette,
    ShieldCheck,
    RefreshCw,
    Layers
} from "lucide-react";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { Container } from "@/components/primitives/Container";

const team = [
    {
        name: "David Kim",
        role: "Founder & Developer",
        bio: "Full-stack developer passionate about AI tools and productivity.",
        avatar: "DK"
    }
];

const timeline = [
    {
        year: "2024",
        title: "The Beginning",
        description: "VibeStack started as a simple list of AI tools that actually worked.",
        icon: Lightbulb
    },
    {
        year: "2025",
        title: "AI Stack Finder",
        description: "Launched the interactive quiz to help developers find their perfect stack.",
        icon: Code2
    },
    {
        year: "2026",
        title: "The Future",
        description: "Expanding into a comprehensive AI productivity platform.",
        icon: Rocket
    }
];

const values = [
    {
        title: "Design First",
        description: "Tools should be beautiful and intuitive. We believe great design is not just about looks, it's about how it works.",
        icon: Palette
    },
    {
        title: "Developer Centric",
        description: "We focus on tools that output code or help manage code. Everything we recommend is tested by real developers.",
        icon: Code2
    },
    {
        title: "Speed & Efficiency",
        description: "If it slows you down, it's not a productivity tool. We prioritize tools that enhance your workflow.",
        icon: Zap
    },
    {
        title: "Community Driven",
        description: "Built by developers, for developers. Our recommendations come from real-world usage and community feedback.",
        icon: Heart
    }
];

export default function AboutPage() {
    const h2 = "font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground";
    const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link";

    return (
        <PageBackground {...BackgroundPresets.content}>
            <Container size="default">
                {/* Hero */}
                <header className="mb-24 pt-8">
                    <p className="mb-5 text-[16px] font-semibold text-vibe-link">About Us</p>

                    <h1 className="mb-8 font-display text-balance text-[clamp(32px,6vw,96px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">
                        Building the Future of AI Productivity
                    </h1>

                    <p className="max-w-[60ch] text-[19px] leading-normal text-muted-foreground">
                        We curate the best AI tools for developers, helping you navigate the rapidly evolving landscape
                        of AI-powered productivity software.
                    </p>
                </header>

                {/* Mission and vision */}
                <div className="mb-24 grid gap-3 md:grid-cols-2 md:gap-6">
                    <div className="bg-foreground p-8 text-background sm:p-10">
                        <h2 className="mb-4 font-display text-[clamp(32px,3.6vw,48px)] uppercase leading-[0.9] tracking-[-0.005em]">Our Mission</h2>
                        <p className="text-[18px] leading-normal">
                            To help developers discover and adopt AI tools that genuinely improve their workflow.
                            We cut through the hype to find tools that deliver real value.
                        </p>
                    </div>

                    <div className="bg-card p-8 sm:p-10">
                        <h2 className="mb-4 font-display text-[clamp(32px,3.6vw,48px)] uppercase leading-[0.9] tracking-[-0.005em]">Our Vision</h2>
                        <p className="text-[18px] leading-normal text-muted-foreground">
                            A world where every developer has access to the best AI tools, enabling them to build
                            better software faster and more efficiently than ever before.
                        </p>
                    </div>
                </div>

                {/* Core values */}
                <section className="mb-24">
                    <div className="mb-10">
                        <h2 className={`${h2} mb-4`}>Our Core Values</h2>
                        <p className="text-[18px] text-muted-foreground">The principles that guide everything we do</p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-6">
                        {values.map((value) => {
                            const Icon = value.icon;
                            return (
                                <div key={value.title} className="h-full bg-card p-6 sm:p-8">
                                    <Icon aria-hidden="true" className="mb-5 h-7 w-7 text-vibe-link" />
                                    <h3 className="mb-2 text-[20px] font-semibold">{value.title}</h3>
                                    <p className="text-[16px] leading-normal text-muted-foreground">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Verification process */}
                <section className="mb-24">
                    <div className="mb-10">
                        <h2 className={`${h2} mb-4`}>How We Vet Tools</h2>
                        <p className="text-[18px] text-muted-foreground">Our recommendations are backed by real-use validation and ongoing checks.</p>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 md:gap-6">
                        <div className="bg-card p-6">
                            <ShieldCheck aria-hidden="true" className="mb-5 h-7 w-7 text-vibe-link" />
                            <h3 className="mb-2 text-[20px] font-semibold">Real-use Validation</h3>
                            <p className="text-[16px] leading-normal text-muted-foreground">
                                We prioritize tools with clear workflows, stable UX, and measurable time savings.
                            </p>
                        </div>

                        <div className="bg-card p-6">
                            <RefreshCw aria-hidden="true" className="mb-5 h-7 w-7 text-vibe-link" />
                            <h3 className="mb-2 text-[20px] font-semibold">Monthly Rechecks</h3>
                            <p className="text-[16px] leading-normal text-muted-foreground">
                                Pricing, policies, and feature changes are reviewed on a monthly cadence.
                            </p>
                        </div>

                        <div className="bg-card p-6">
                            <Layers aria-hidden="true" className="mb-5 h-7 w-7 text-vibe-link" />
                            <h3 className="mb-2 text-[20px] font-semibold">Stack Compatibility</h3>
                            <p className="text-[16px] leading-normal text-muted-foreground">
                                We evaluate how tools work together, not just in isolation.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="mb-24">
                    <div className="mb-10">
                        <h2 className={`${h2} mb-4`}>Our Journey</h2>
                        <p className="text-[18px] text-muted-foreground">How VibeStack has evolved over time</p>
                    </div>

                    <ol className="grid gap-3 md:grid-cols-3 md:gap-6">
                        {timeline.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.title} className="flex flex-col bg-card p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <span className="font-display text-[56px] leading-none text-vibe-link">{item.year}</span>
                                        <Icon aria-hidden="true" className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <h3 className="mb-1 text-[20px] font-semibold">{item.title}</h3>
                                    <p className="text-[16px] leading-normal text-muted-foreground">{item.description}</p>
                                </li>
                            );
                        })}
                    </ol>
                </section>

                {/* Team */}
                <section className="mb-24">
                    <div className="mb-10">
                        <h2 className={`${h2} mb-4`}>Meet the Team</h2>
                        <p className="text-[18px] text-muted-foreground">The people behind VibeStack</p>
                    </div>

                    <div className="grid max-w-3xl gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        {team.map((member) => (
                            <div key={member.name} className="bg-card p-6">
                                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-vibe-electric text-[24px] font-semibold text-vibe-deep">
                                    {member.avatar}
                                </div>
                                <h3 className="mb-1 text-[20px] font-semibold">{member.name}</h3>
                                <p className="mb-3 text-[15px] font-semibold text-vibe-link">{member.role}</p>
                                <p className="text-[16px] leading-normal text-muted-foreground">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section>
                    <div className="max-w-2xl">
                        <div className="mb-10">
                            <h2 className={`${h2} mb-4`}>Get in Touch</h2>
                            <p className="text-[18px] text-muted-foreground">Have a question or suggestion? We&apos;d love to hear from you.</p>
                        </div>

                        <div className="bg-card p-6 sm:p-8">
                            <p className="mb-6 text-[17px] leading-normal text-muted-foreground">
                                Email is the best way to reach us. The button opens a new message in your mail app.
                            </p>
                            <Button asChild className="h-12 rounded-none px-8 text-[16px] font-semibold">
                                <a href="mailto:hello@usevibestack.com">
                                    <Mail aria-hidden="true" className="mr-2 h-4 w-4" />
                                    Email hello@usevibestack.com
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>
            </Container>
        </PageBackground>
    );
}
