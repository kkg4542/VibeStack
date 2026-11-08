"use client";

import { useState } from "react";
import { ArrowRight, Rocket, Shield, Terminal, Zap, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServicesGrid } from "./components/ServicesGrid";
import { PricingSection } from "./components/PricingSection";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";

export default function ConsultingPage() {
    const [loading] = useState(false);

    // Sponsorship checkout lives on the dedicated /sponsor funnel (which has the
    // tool picker + CSRF-protected Stripe flow). These buttons route there
    // instead of calling a parallel, mismatched checkout.
    async function handleCheckout(_placement: string) {
        window.location.href = "/sponsor";
    }
    // (Testimonials section removed: no fabricated client quotes.)
    const services = [
        {
            title: "AI Workflow Audit",
            description: "We analyze your current development process and identify bottlenecks where AI agents can accelerate output by 10x.",
            icon: <Terminal className="h-6 w-6 text-vibe-link" />,
            features: ["Codebase Analysis", "Agent Integration Plan", "ROI Estmation"],
        },
        {
            title: "Custom Agent Build",
            description: "Need a specialized agent for your internal data? We build secure, private RAG pipelines tailored to your business logic.",
            icon: <Zap className="h-6 w-6 text-vibe-link" />,
            features: ["Private LLM Setup", "Custom vector DB", "Slack/Discord Integration"],
        },
        {
            title: "Vibe Coding Training",
            description: "Train your engineering team to move from 'writing code' to 'orchestrating agents'. The shift requires a new mindset.",
            icon: <Rocket className="h-6 w-6 text-vibe-link" />,
            features: ["Prompt Architecture", "Cursor Mastery", "Review Workflows"],
        },
    ];

    const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link";

    return (
        <div className="relative min-h-svh bg-background pt-24 pb-20">
            {/* Hero */}
            <Section spacing="none" containerSize="default" className="pt-16 pb-24">
                <p className="mb-6 text-[16px] font-semibold text-vibe-link">
                    Now Accepting Partners for Q1 2026
                </p>

                <h1 className="font-display text-balance text-[clamp(32px,6vw,96px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">
                    Promote Your AI Tool to Thousands of Developers
                </h1>

                <p className="mt-8 max-w-[60ch] text-[19px] leading-normal text-muted-foreground">
                    VibeStack is the fastest-growing community for AI productivity.
                    Showcase your product where the builders are.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                    <Button
                        size="lg"
                        className="h-12 rounded-none px-8 text-[16px] font-semibold"
                        onClick={() => handleCheckout('featuredSpotlight')}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Book a Sponsorship
                        <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="lg" className="h-12 rounded-none px-8 text-[16px] font-semibold hover:bg-accent" asChild>
                        <Link href="/tools">
                            View Our Reach
                        </Link>
                    </Button>
                    <p className="text-[15px] text-muted-foreground">
                        Or <a href="mailto:hello@usevibestack.com" className={`font-semibold text-vibe-link underline underline-offset-4 ${focus}`}>contact us</a> for custom packages
                    </p>
                </div>
            </Section>

            <ServicesGrid />

            {/* Why advertise: the inverse field */}
            <Section spacing="large" container={false} className="bg-foreground text-background">
                <Container size="default">
                    <h2 className="mb-12 font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em]">
                        Why Advertise with Us?
                    </h2>
                    <div className="grid gap-10 md:grid-cols-3">
                        <div>
                            <Shield aria-hidden="true" className="mb-4 h-7 w-7 text-vibe-electric" />
                            <h3 className="text-[22px] font-semibold">High Intent</h3>
                            <p className="mt-2 text-[16px] leading-normal text-background/80">Our users are actively looking for tools to adopt, not just browsing.</p>
                        </div>
                        <div>
                            <Rocket aria-hidden="true" className="mb-4 h-7 w-7 text-vibe-electric" />
                            <h3 className="text-[22px] font-semibold">Developer Focused</h3>
                            <p className="mt-2 text-[16px] leading-normal text-background/80">Reach software engineers, founders, and CTOs making purchasing decisions.</p>
                        </div>
                        <div>
                            <Terminal aria-hidden="true" className="mb-4 h-7 w-7 text-vibe-electric" />
                            <h3 className="text-[22px] font-semibold">Native Feel</h3>
                            <p className="mt-2 text-[16px] leading-normal text-background/80">Ads are integrated directly into the UI, maintaining our premium aesthetic.</p>
                        </div>
                    </div>
                </Container>
            </Section>

            <PricingSection handleCheckout={handleCheckout} loading={loading} />

            {/* Sponsor copy guidelines */}
            <Section spacing="none" containerSize="default" className="pb-16">
                <div className="max-w-3xl bg-card p-8">
                    <h3 className="mb-3 text-[22px] font-semibold text-foreground">Sponsor Copy Guidelines</h3>
                    <p className="mb-4 text-[16px] text-muted-foreground">Keep it clear and honest. We review copy to maintain user trust.</p>
                    <ul className="list-disc space-y-2 pl-5 text-[16px] text-foreground">
                        <li>Length: 60–120 characters (one-line summary)</li>
                        <li>Required: product name + one-sentence value</li>
                        <li>Avoid: exaggerated claims and guarantees</li>
                    </ul>
                </div>
            </Section>

            {/* Final CTA: the accent field */}
            <Section spacing="default" containerSize="default">
                <div className="bg-vibe-electric p-8 text-vibe-deep sm:p-12 lg:p-16">
                    <div className="max-w-3xl">
                        <h2 className="mb-4 font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em]">
                            Ready to Get Started?
                        </h2>
                        <p className="mb-8 text-[18px] leading-normal">
                            Let&apos;s discuss how we can help you reach thousands of developers actively searching for tools like yours.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="h-12 rounded-none bg-vibe-deep px-8 text-[16px] font-semibold text-[#eff0f1] hover:bg-vibe-deep/90 focus-visible:outline-vibe-deep"
                                onClick={() => handleCheckout('featuredSpotlight')}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Get Started Now
                                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                            </Button>
                            <Link
                                href="mailto:hello@usevibestack.com?subject=Partnership%20Inquiry"
                                className="inline-flex h-12 items-center justify-center px-8 text-[16px] font-semibold text-vibe-deep underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-deep"
                            >
                                Or Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
