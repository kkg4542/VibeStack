"use client";

import { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
import {
    Upload,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Sparkles,
    ArrowRight,
    Clock,
    Star,
    Zap,
    Shield,
    FileCheck,
    MessageSquare,
    Mail,
    ExternalLink,
    Check,
    TrendingUp,
    Award
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCsrfFetch } from "@/hooks/useCsrfFetch";

const pricingPlans = [
    {
        id: "free",
        name: "Free Submission",
        price: "$0",
        description: "Basic listing with standard review time",
        features: [
            "Standard listing on VibeStack",
            "1-2 week review process",
            "Basic tool information",
            "Community reviews enabled"
        ],
        notIncluded: [
            "Priority review",
            "Featured placement",
            "Social media promotion"
        ],
        cta: "Submit for Free",
        popular: false
    },
    {
        id: "priority",
        name: "Priority Submission",
        price: "$49",
        description: "Fast-track review with social promotion",
        features: [
            "Everything in Free",
            "24-48 hour review process",
            "Twitter/X announcement",
            "LinkedIn post",
            "Priority support"
        ],
        notIncluded: [
            "Featured badge",
            "Homepage placement"
        ],
        cta: "Submit with Priority",
        popular: true
    },
    {
        id: "premium",
        name: "Premium Submission",
        price: "$149",
        description: "Maximum visibility and promotion",
        features: [
            "Everything in Priority",
            "Featured badge",
            "Homepage spotlight (48 hours)",
            "Newsletter feature",
            "Dedicated blog mention",
            "1-week featured sidebar ad"
        ],
        notIncluded: [],
        cta: "Submit Premium",
        popular: false
    }
];

const criteria = [
    {
        icon: Zap,
        title: "Genuine Value",
        description: "Your tool must solve a real problem and provide clear value to developers or creators.",
        required: true
    },
    {
        icon: Shield,
        title: "Quality Standards",
        description: "The tool should be well-built, reliable, and have a professional appearance.",
        required: true
    },
    {
        icon: Star,
        title: "AI Integration",
        description: "Must meaningfully integrate AI/ML capabilities - not just a basic wrapper around GPT.",
        required: true
    },
    {
        icon: Clock,
        title: "Active Development",
        description: "The tool should be actively maintained with regular updates and improvements.",
        required: true
    },
    {
        icon: ExternalLink,
        title: "Working Website",
        description: "Must have a functional website where users can learn more and try the tool.",
        required: true
    }
];

const rejectionReasons = [
    {
        reason: "Not AI-focused",
        explanation: "The tool doesn't meaningfully use AI or is just a thin wrapper around existing APIs without added value."
    },
    {
        reason: "Poor Quality",
        explanation: "The tool has significant bugs, poor UX, or doesn't work as advertised."
    },
    {
        reason: "Too Early",
        explanation: "The tool is in very early alpha with limited functionality or stability issues."
    },
    {
        reason: "Duplicate",
        explanation: "A very similar tool is already listed and yours doesn't offer significant differentiation."
    },
    {
        reason: "Spam or Scam",
        explanation: "The tool appears to be spam, misleading, or potentially harmful to users."
    }
];

export default function SubmitToolPage() {
    const searchParams = useSearchParams();
    const { csrfFetch } = useCsrfFetch();
    const [selectedPlan, setSelectedPlan] = useState<string>("priority");
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

    useEffect(() => {
        const success = searchParams.get("success");
        if (success === "1") {
            const storedEmail = localStorage.getItem("submission_email") || "";
            setSubmittedEmail(storedEmail);
            setSubmitted(true);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

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
                    window.location.href = data.checkoutUrl;
                    return;
                }
                setSubmittedEmail(formData.email);
                setSubmitted(true);
            }
        } catch (error) {
            // Error handled by form state
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <PageBackground {...BackgroundPresets.content}>
                <div className="container max-w-2xl mx-auto px-4 py-24">
                    <Card className="text-center">
                        <CardContent className="p-12">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Submission Received!</h2>
                            <p className="text-muted-foreground mb-8">
                                Thank you for submitting your tool. We&apos;ve sent a confirmation email{submittedEmail ? ` to ${submittedEmail}` : ""}.
                                {selectedPlan !== "free" && " Your payment has been received."}
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button asChild variant="outline">
                                    <Link href="/tools">Browse Tools</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/">Back to Home</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </PageBackground>
        );
    }

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-6xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6"
                    >
                        <Upload className="w-4 h-4" />
                        <span>For Tool Creators</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                        Submit Your{" "}
                        <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            AI Tool
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Get your AI tool discovered by thousands of developers. Choose the submission tier that fits your needs.
                    </p>
                </motion.div>

                {/* Pricing Plans */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">Choose Your Submission Tier</h2>
                        <p className="text-muted-foreground">Select the option that best fits your promotion needs</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                            >
                                <Card
                                    className={`h-full cursor-pointer transition-all ${selectedPlan === plan.id
                                        ? "border-indigo-500 ring-2 ring-indigo-500/20"
                                        : "border-border/50 hover:border-indigo-500/30"
                                        }`}
                                    onClick={() => setSelectedPlan(plan.id)}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <Badge className="bg-indigo-500 text-white">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                Most Popular
                                            </Badge>
                                        </div>
                                    )}
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold">{plan.price}</span>
                                            {plan.id !== "free" && <span className="text-muted-foreground">one-time</span>}
                                        </div>
                                        <CardDescription>{plan.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0 flex-1 flex flex-col">
                                        <ul className="space-y-3 mb-6 flex-1">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-start gap-2">
                                                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                    <span className="text-sm">{feature}</span>
                                                </li>
                                            ))}
                                            {plan.notIncluded.map((item) => (
                                                <li key={item} className="flex items-start gap-2 text-muted-foreground">
                                                    <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                                    <span className="text-sm line-through">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            className="w-full mt-auto"
                                            variant={selectedPlan === plan.id ? "default" : "outline"}
                                            onClick={() => setSelectedPlan(plan.id)}
                                        >
                                            {selectedPlan === plan.id ? (
                                                <>
                                                    <Check className="w-4 h-4 mr-2" />
                                                    Selected
                                                </>
                                            ) : (
                                                plan.cta
                                            )}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Submission Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-2xl mx-auto"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Tool Information</CardTitle>
                            <CardDescription>
                                Tell us about your AI tool. Selected tier: <strong className="text-indigo-400">
                                    {pricingPlans.find(p => p.id === selectedPlan)?.name}
                                </strong>
                            </CardDescription>
                            <div className="mt-4 p-3 bg-blue-500/10 rounded-md border border-blue-500/20 text-sm text-blue-400 flex items-start gap-2">
                                <Sparkles className="w-4 h-4 mt-0.5 shrink-0" />
                                <div>
                                    Want to get approved faster? Check our
                                    <Link href="/guidelines" target="_blank" className="font-semibold underline ml-1 hover:text-blue-300">
                                        Content Quality Guidelines
                                    </Link> before submitting.
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Tool Name *</label>
                                    <Input
                                        required
                                        placeholder="e.g., AI Code Assistant"
                                        value={formData.toolName}
                                        onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Official product name only. No slogans or SEO keywords.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description *</label>
                                    <Textarea
                                        required
                                        placeholder="Briefly describe what your tool does and how it helps developers..."
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Focus on features and value. Avoid subjective terms like &quot;best&quot;.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Website URL *</label>
                                    <Input
                                        required
                                        type="url"
                                        placeholder="https://yourtool.com"
                                        value={formData.websiteUrl}
                                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Direct link to the homepage. No tracking parameters.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Category *</label>
                                        <select
                                            required
                                            className="w-full h-10 px-3 rounded-md border border-input bg-background"
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
                                        <label className="text-sm font-medium">Pricing Model *</label>
                                        <select
                                            required
                                            className="w-full h-10 px-3 rounded-md border border-input bg-background"
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
                                    <label className="text-sm font-medium">Your Email *</label>
                                    <Input
                                        required
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        We&apos;ll send updates about your submission to this email.
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full rounded-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        "Submitting..."
                                    ) : (
                                        <>
                                            Submit Tool
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>

                                <p className="text-xs text-center text-muted-foreground">
                                    By submitting, you agree to our{" "}
                                    <Link href="/terms" className="underline">Terms</Link> and{" "}
                                    <Link href="/privacy" className="underline">Privacy Policy</Link>.
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Criteria Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 mb-16"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">Submission Criteria</h2>
                        <p className="text-muted-foreground">What we look for in every submission</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {criteria.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                >
                                    <Card className="h-full border-border/50">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-xl bg-indigo-500/10">
                                                    <Icon className="w-6 h-6 text-indigo-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-bold">{item.title}</h3>
                                                        {item.required && (
                                                            <Badge variant="secondary" className="text-xs">Required</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* FAQ Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <Card className="border-border/50">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-amber-500/10">
                                        <AlertCircle className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Have more questions?</h3>
                                        <p className="text-sm text-muted-foreground">Check our FAQ or contact us directly</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" asChild>
                                        <Link href="/faq">View FAQ</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href="/about" className="flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            Contact Us
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </PageBackground>
    );
}
