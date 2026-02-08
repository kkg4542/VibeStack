"use client";

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
    ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import Link from "next/link";

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

const processSteps = [
    {
        step: 1,
        title: "Submit Your Tool",
        description: "Fill out the submission form with accurate information about your tool.",
        duration: "5 minutes",
        icon: Upload
    },
    {
        step: 2,
        title: "Initial Review",
        description: "Our team checks that your submission meets basic criteria and has all required information.",
        duration: "1-2 days",
        icon: FileCheck
    },
    {
        step: 3,
        title: "Quality Assessment",
        description: "We test the tool ourselves and evaluate its quality, usability, and value proposition.",
        duration: "3-5 days",
        icon: Star
    },
    {
        step: 4,
        title: "Decision & Feedback",
        description: "You'll receive an email with our decision. If approved, your tool goes live within 24 hours.",
        duration: "1 week total",
        icon: CheckCircle2
    }
];

const tips = [
    "Be honest about your tool's capabilities - exaggeration hurts credibility",
    "Include screenshots or demo videos showing the AI features in action",
    "Explain what makes your tool different from competitors",
    "Provide clear pricing information upfront",
    "Have a professional landing page ready for reviewers",
    "Respond promptly if we have follow-up questions",
    "Make sure your tool works reliably during the review period"
];

export default function SubmitToolPage() {
    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-5xl mx-auto px-4">
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

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        Submit Your{" "}
                        <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                            AI Tool
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                        Get your AI tool discovered by thousands of developers. 
                        Read our guidelines to ensure a smooth submission process.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="rounded-full">
                            <Link href="/consulting" className="flex items-center gap-2">
                                Submit Your Tool
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" asChild size="lg" className="rounded-full">
                            <Link href="/faq">View FAQ</Link>
                        </Button>
                    </div>
                </motion.div>

                {/* Criteria Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
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
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                >
                                    <Card className="h-full border-border/50 hover:border-indigo-500/30 transition-colors">
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

                {/* Review Process */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-16"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">Review Process</h2>
                        <p className="text-muted-foreground">What happens after you submit</p>
                    </div>

                    <div className="space-y-6">
                        {processSteps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                >
                                    <Card className="border-border/50">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-lg">
                                                        {step.step}
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-secondary/50 md:hidden">
                                                        <Icon className="w-6 h-6 text-indigo-400" />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                                                    <p className="text-muted-foreground">{step.description}</p>
                                                </div>
                                                <div className="hidden md:block p-3 rounded-xl bg-secondary/50">
                                                    <Icon className="w-6 h-6 text-indigo-400" />
                                                </div>
                                                <Badge variant="outline" className="md:self-center">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {step.duration}
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Common Rejection Reasons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mb-16"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">Common Rejection Reasons</h2>
                        <p className="text-muted-foreground">Avoid these pitfalls to improve your chances</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {rejectionReasons.map((item, index) => (
                            <motion.div
                                key={item.reason}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                            >
                                <Card className="border-border/50 border-l-4 border-l-red-500/50">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-3">
                                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h3 className="font-bold mb-1">{item.reason}</h3>
                                                <p className="text-sm text-muted-foreground">{item.explanation}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Tips for Success */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mb-16"
                >
                    <Card className="border-indigo-500/20 bg-linear-to-br from-indigo-500/5 to-purple-500/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-400" />
                                Tips for a Successful Submission
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {tips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* FAQ Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mb-16"
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

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="text-center"
                >
                    <Card className="border-indigo-500/20 bg-linear-to-br from-indigo-500/5 to-purple-500/5">
                        <CardContent className="p-8">
                            <Upload className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Ready to submit your tool?</h3>
                            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                                Join hundreds of AI tools on VibeStack and reach thousands of developers looking for solutions like yours.
                            </p>
                            <Button asChild size="lg" className="rounded-full">
                                <Link href="/consulting" className="flex items-center gap-2">
                                    Submit Your Tool
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </PageBackground>
    );
}
