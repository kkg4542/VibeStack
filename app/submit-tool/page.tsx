"use client";

import { useEffect, useState } from "react";
import {
    CheckCircle2,
    XCircle,
    AlertCircle,
    Sparkles,
    ArrowRight,
    Mail,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCsrfFetch } from "@/hooks/useCsrfFetch";
import { Section } from "@/components/primitives/Section";

import { pricingPlans, criteria } from "./data";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link";
const H2 = "font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground";
const SELECT = `h-11 w-full rounded-none border border-input bg-background px-3 text-[16px] ${FOCUS}`;

// Turns the checkout route's error body into one readable line. Validation
// failures arrive as { error: "Validation failed", details: ZodIssue[] }.
function describeSubmitError(status: number, data: unknown): string {
    const body = (data ?? {}) as { error?: unknown; details?: unknown };
    if (status === 429) {
        return "Too many attempts, try again later.";
    }
    if (Array.isArray(body.details)) {
        const messages = body.details
            .map((d) => (d && typeof d === "object" && "message" in d ? String((d as { message: unknown }).message) : ""))
            .filter(Boolean);
        if (messages.length > 0) {
            return `${typeof body.error === "string" ? body.error : "Validation failed"}: ${messages.join("; ")}.`;
        }
    }
    if (typeof body.error === "string" && body.error) {
        return body.error;
    }
    return "Something went wrong while submitting your tool. Please try again.";
}

export default function SubmitToolPage() {
    const searchParams = useSearchParams();
    const { csrfFetch } = useCsrfFetch();
    const [selectedPlan, setSelectedPlan] = useState<string>("free");
    const [formData, setFormData] = useState({
        toolName: "",
        description: "",
        websiteUrl: "",
        category: "",
        pricing: "",
        email: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState("");
    const [submittedPaid, setSubmittedPaid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [canceled, setCanceled] = useState(false);

    useEffect(() => {
        const success = searchParams.get("success");
        if (success === "1") {
            const storedEmail = localStorage.getItem("submission_email") || "";
            setSubmittedEmail(storedEmail);
            // Only the Stripe redirect lands here with ?success=1 (free tier never leaves the page).
            setSubmittedPaid(true);
            setSubmitted(true);
        }
        // Stripe sends the user back with ?canceled=1 when they leave checkout.
        setCanceled(searchParams.get("canceled") === "1");
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setErrorMessage("");
        setCanceled(false);
        let redirecting = false;

        try {
            const response = await csrfFetch("/api/submissions/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    tier: selectedPlan
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.checkoutUrl) {
                    localStorage.setItem("submission_email", formData.email);
                    redirecting = true; // keep the button disabled while the browser leaves for Stripe
                    window.location.href = data.checkoutUrl;
                    return;
                }
                setSubmittedEmail(formData.email);
                setSubmittedPaid(false);
                setSubmitted(true);
                return;
            }

            const data = await response.json().catch(() => null);
            setErrorMessage(describeSubmitError(response.status, data));
        } catch {
            setErrorMessage("Network error. Check your connection and try again. Your answers are still in the form.");
        } finally {
            if (!redirecting) setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <PageBackground {...BackgroundPresets.content}>
                <Section spacing="large" containerSize="xs">
                    <div className="bg-card p-8 sm:p-12">
                        <CheckCircle2 aria-hidden="true" className="mb-6 h-12 w-12 text-vibe-link" />
                        <h2 className={`${H2} mb-4`}>Submission Received!</h2>
                        <p className="mb-8 text-[17px] leading-normal text-muted-foreground">
                            {submittedPaid ? (
                                <>
                                    Thank you for submitting your tool. Your payment went through, and your listing is created once Stripe confirms it. We&apos;ll email{submittedEmail ? ` ${submittedEmail}` : " you"} when it&apos;s approved. It can take a little while to appear on the site.
                                </>
                            ) : (
                                <>
                                    Thank you for submitting your tool. It&apos;s in our review queue, and we&apos;ll email{submittedEmail ? ` ${submittedEmail}` : " you"} when it&apos;s approved.
                                </>
                            )}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button asChild variant="secondary" className="h-11 rounded-none bg-background px-6 text-[16px] font-semibold hover:bg-accent">
                                <Link href="/tools">Browse Tools</Link>
                            </Button>
                            <Button asChild className="h-11 rounded-none px-6 text-[16px] font-semibold">
                                <Link href="/">Back to Home</Link>
                            </Button>
                        </div>
                    </div>
                </Section>
            </PageBackground>
        );
    }

    return (
        <PageBackground {...BackgroundPresets.content}>
            <Section spacing="small" containerSize="default">
                {canceled && (
                    <div role="status" className="mb-10 bg-card p-5 text-[16px] font-semibold text-foreground">
                        Payment canceled, you were not charged. Your tool has not been published. You can submit again whenever you&apos;re ready.
                    </div>
                )}

                {/* Hero */}
                <header className="mb-20">
                    <p className="mb-5 text-[16px] font-semibold text-vibe-link">For Tool Creators</p>

                    <h1 className="mb-6 font-display text-balance text-[clamp(40px,6vw,96px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">
                        Submit Your AI Tool
                    </h1>

                    <p className="max-w-[60ch] text-[19px] leading-normal text-muted-foreground">
                        Get your AI tool discovered by thousands of developers. Choose the submission tier that fits your needs.
                    </p>
                </header>

                {/* Pricing plans */}
                <section className="mb-20">
                    <div className="mb-10">
                        <h2 className={`${H2} mb-3`}>Choose Your Submission Tier</h2>
                        <p className="text-[18px] text-muted-foreground">Select the option that best fits your promotion needs</p>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 md:gap-6">
                        {pricingPlans.map((plan) => {
                            const selected = selectedPlan === plan.id;
                            return (
                                <div
                                    key={plan.id}
                                    className={`relative flex h-full cursor-pointer flex-col p-6 transition-colors duration-150 sm:p-8 ${selected
                                        ? "bg-foreground text-background"
                                        : "bg-card text-foreground hover:bg-accent"
                                        }`}
                                    onClick={() => setSelectedPlan(plan.id)}
                                >
                                    {plan.popular && (
                                        <span className="absolute right-0 top-0 bg-vibe-electric px-3 py-1.5 text-[14px] font-semibold text-vibe-deep">
                                            Most Popular
                                        </span>
                                    )}
                                    <div className="mb-6">
                                        <h3 className="mb-3 text-[20px] font-semibold">{plan.name}</h3>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-display text-[56px] uppercase leading-none">{plan.price}</span>
                                            {plan.id !== "free" && <span className={selected ? "text-background/75" : "text-muted-foreground"}>one-time</span>}
                                        </div>
                                        <p className={`mt-3 text-[16px] ${selected ? "text-background/80" : "text-muted-foreground"}`}>{plan.description}</p>
                                    </div>
                                    <ul className="mb-8 flex-1 space-y-3">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2">
                                                <Check aria-hidden="true" className={`mt-1 h-4 w-4 shrink-0 ${selected ? "text-vibe-electric" : "text-vibe-link"}`} />
                                                <span className="text-[16px]">{feature}</span>
                                            </li>
                                        ))}
                                        {plan.notIncluded.map((item) => (
                                            <li key={item} className={`flex items-start gap-2 ${selected ? "text-background/60" : "text-muted-foreground"}`}>
                                                <XCircle aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
                                                <span className="text-[16px] line-through">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        className={`mt-auto h-11 w-full rounded-none text-[16px] font-semibold ${selected ? "" : "bg-background hover:bg-background/80"}`}
                                        variant={selected ? "default" : "secondary"}
                                        onClick={() => setSelectedPlan(plan.id)}
                                    >
                                        {selected ? (
                                            <>
                                                <Check aria-hidden="true" className="mr-2 h-4 w-4" />
                                                Selected
                                            </>
                                        ) : (
                                            plan.cta
                                        )}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Submission form */}
                <section className="max-w-2xl bg-card p-6 sm:p-10">
                    <h2 className="mb-2 text-[26px] font-semibold">Tool Information</h2>
                    <p className="text-[16px] text-muted-foreground">
                        Tell us about your AI tool. Selected tier: <strong className="text-vibe-link">
                            {pricingPlans.find(p => p.id === selectedPlan)?.name}
                        </strong>
                    </p>
                    <div className="mb-8 mt-5 flex items-start gap-2 bg-background p-4 text-[15px] text-foreground">
                        <Sparkles aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-vibe-link" />
                        <div>
                            Want to get approved faster? Check our
                            <Link href="/guidelines" target="_blank" rel="noopener noreferrer" className="ml-1 font-semibold text-vibe-link underline underline-offset-4">
                                Content Quality Guidelines
                            </Link> before submitting.
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6" aria-busy={isSubmitting}>
                        <div className="space-y-2">
                            <label htmlFor="tool-name" className="text-[15px] font-semibold">Tool Name *</label>
                            <Input
                                id="tool-name"
                                required
                                placeholder="e.g., AI Code Assistant"
                                value={formData.toolName}
                                onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
                                className="bg-background"
                            />
                            <p className="text-[14px] text-muted-foreground">
                                Official product name only. No slogans or SEO keywords.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="tool-description" className="text-[15px] font-semibold">Description *</label>
                            <Textarea
                                id="tool-description"
                                required
                                placeholder="Briefly describe what your tool does and how it helps developers..."
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <p className="text-[14px] text-muted-foreground">
                                Focus on features and value. Avoid subjective terms like &quot;best&quot;.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="tool-website-url" className="text-[15px] font-semibold">Website URL *</label>
                            <Input
                                id="tool-website-url"
                                required
                                type="url"
                                placeholder="https://yourtool.com"
                                value={formData.websiteUrl}
                                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                className="bg-background"
                            />
                            <p className="text-[14px] text-muted-foreground">
                                Direct link to the homepage. No tracking parameters.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="tool-category" className="text-[15px] font-semibold">Category *</label>
                                <select
                                    id="tool-category"
                                    required
                                    className={SELECT}
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">Select category</option>
                                    <option value="Coding">Coding</option>
                                    <option value="Design">Design</option>
                                    <option value="Productivity">Productivity</option>
                                    <option value="Management">Management</option>
                                    <option value="Assistance">Assistance</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="tool-pricing" className="text-[15px] font-semibold">Pricing Model *</label>
                                <select
                                    id="tool-pricing"
                                    required
                                    className={SELECT}
                                    value={formData.pricing}
                                    onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                                >
                                    <option value="">Select pricing</option>
                                    <option value="Free">Free</option>
                                    <option value="Freemium">Freemium</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Enterprise">Enterprise</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="tool-email" className="text-[15px] font-semibold">Your Email *</label>
                            <Input
                                id="tool-email"
                                required
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-background"
                            />
                            <p className="text-[14px] text-muted-foreground">
                                We&apos;ll use this email to tell you when your submission is approved.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="h-12 w-full rounded-none text-[16px] font-semibold"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                "Submitting..."
                            ) : (
                                <>
                                    Submit Tool
                                    <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>

                        <div aria-live="assertive">
                            {errorMessage && (
                                <p className="bg-background p-4 text-[15px] font-semibold text-destructive">{errorMessage}</p>
                            )}
                        </div>

                        <p className="text-[14px] text-muted-foreground">
                            By submitting, you agree to our{" "}
                            <Link href="/terms" className="underline underline-offset-4">Terms</Link> and{" "}
                            <Link href="/privacy" className="underline underline-offset-4">Privacy Policy</Link>.
                        </p>
                    </form>
                </section>

                {/* Criteria */}
                <section className="my-20">
                    <div className="mb-10">
                        <h2 className={`${H2} mb-3`}>Submission Criteria</h2>
                        <p className="text-[18px] text-muted-foreground">What we look for in every submission</p>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                        {criteria.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="h-full bg-card p-6">
                                    <Icon aria-hidden="true" className="mb-4 h-6 w-6 text-vibe-link" />
                                    <div className="mb-1 flex flex-wrap items-center gap-2">
                                        <h3 className="text-[18px] font-semibold">{item.title}</h3>
                                        {item.required && (
                                            <span className="bg-background px-2 py-0.5 text-[13px] font-semibold text-muted-foreground">Required</span>
                                        )}
                                    </div>
                                    <p className="text-[16px] leading-normal text-muted-foreground">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* FAQ link */}
                <div className="flex flex-col justify-between gap-6 bg-card p-6 sm:p-8 md:flex-row md:items-center">
                    <div className="flex items-start gap-4">
                        <AlertCircle aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-vibe-link" />
                        <div>
                            <h3 className="text-[20px] font-semibold">Have more questions?</h3>
                            <p className="text-[16px] text-muted-foreground">Check our FAQ or contact us directly</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button variant="secondary" asChild className="h-11 rounded-none bg-background px-6 text-[16px] font-semibold hover:bg-accent">
                            <Link href="/faq">View FAQ</Link>
                        </Button>
                        <Button asChild className="h-11 rounded-none px-6 text-[16px] font-semibold">
                            <Link href="/about" className="flex items-center gap-2">
                                <Mail aria-hidden="true" className="h-4 w-4" />
                                Contact Us
                            </Link>
                        </Button>
                    </div>
                </div>
            </Section>
        </PageBackground>
    );
}
