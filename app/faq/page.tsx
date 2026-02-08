"use client";

import { useState } from "react";
import * as motion from "framer-motion/client";
import {
    HelpCircle,
    Search,
    ChevronDown,
    MessageCircle,
    Mail,
    Sparkles
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { designSystem } from "@/lib/design-system";
import Link from "next/link";

const faqCategories = [
    {
        title: "Getting Started",
        icon: Sparkles,
        questions: [
            {
                question: "What is VibeStack?",
                answer: "VibeStack is a curated platform that helps developers discover and compare the best AI productivity tools. We cut through the hype to find tools that actually deliver value, with real reviews and practical recommendations."
            },
            {
                question: "Is VibeStack free to use?",
                answer: "Yes! VibeStack is completely free for users. We earn through affiliate links when you discover tools through our platform, but this never affects our recommendations or rankings."
            },
            {
                question: "How do I save my favorite tools?",
                answer: "Click the heart icon on any tool card to add it to your favorites. You'll need to sign in to access your favorites list later. Your favorites are synced across all your devices."
            }
        ]
    },
    {
        title: "Stacks & Recommendations",
        icon: HelpCircle,
        questions: [
            {
                question: "What is a Stack?",
                answer: "A Stack is a curated collection of AI tools that work well together for a specific workflow or use case. For example, a 'Developer Stack' might include an AI code assistant, a documentation tool, and a testing assistant."
            },
            {
                question: "How does the Stack Finder work?",
                answer: "Our Stack Finder asks you a few questions about your needs and preferences, then recommends a personalized combination of tools. It's like having an expert guide you through the AI tool landscape."
            },
            {
                question: "Can I submit my own Stack?",
                answer: "Absolutely! We welcome community submissions. Use our Submit Stack page to share your favorite tool combinations. Our team reviews all submissions to ensure quality."
            },
            {
                question: "How often are tools updated?",
                answer: "We continuously monitor the AI tool ecosystem and update our database weekly. New tools are added, pricing is verified, and reviews are curated regularly."
            }
        ]
    },
    {
        title: "Reviews & Ratings",
        icon: MessageCircle,
        questions: [
            {
                question: "How are tools rated?",
                answer: "Tools are rated based on community reviews and our internal testing. We consider factors like ease of use, output quality, value for money, and real-world developer experience."
            },
            {
                question: "Can I leave a review?",
                answer: "Yes! Sign in and visit any tool page to leave your review. We value honest feedback from real users to help others make informed decisions."
            },
            {
                question: "Are reviews moderated?",
                answer: "Yes, all reviews go through moderation to ensure they're helpful and authentic. We remove spam, fake reviews, and anything that doesn't add value to the community."
            }
        ]
    },
    {
        title: "For Tool Creators",
        icon: Mail,
        questions: [
            {
                question: "How can I get my tool listed?",
                answer: "You can submit your tool through our Submit Tool page. We evaluate all submissions based on quality, uniqueness, and value to developers. Premium placement options are also available."
            },
            {
                question: "What are the advertising options?",
                answer: "We offer Featured Spotlight placements, sidebar advertisements, and newsletter sponsorships. Visit our Consulting page to learn more about partnership opportunities."
            },
            {
                question: "How do affiliate links work?",
                answer: "When users discover your tool through VibeStack and sign up using our link, we earn a commission. This helps us keep the platform free while supporting our curation efforts."
            }
        ]
    }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="border-border/50 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
            >
                <span className="font-semibold text-foreground pr-4">{question}</span>
                <ChevronDown
                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
            >
                <CardContent className="pt-0 pb-6 px-6">
                    <p className="text-muted-foreground leading-relaxed">{answer}</p>
                </CardContent>
            </motion.div>
        </Card>
    );
}

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCategories = faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(
            q =>
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-4xl mx-auto px-4">
                {/* Hero Section */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={designSystem.animations.fadeInUp.transition}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                        <HelpCircle className="w-4 h-4" />
                        <span>FAQ</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                        Frequently Asked{" "}
                        <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                        Everything you need to know about VibeStack. Can&apos;t find what you&apos;re looking for? Reach out to us directly.
                    </p>

                    {/* Search */}
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        />
                    </div>
                </motion.div>

                {/* FAQ Categories */}
                <div className="space-y-12">
                    {filteredCategories.map((category, categoryIndex) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.title}
                                initial={designSystem.animations.fadeInUp.initial}
                                animate={designSystem.animations.fadeInUp.animate}
                                transition={{ ...designSystem.animations.fadeInUp.transition, delay: categoryIndex * 0.1 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-indigo-500/10">
                                        <Icon className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <h2 className="text-xl font-bold">{category.title}</h2>
                                </div>

                                <div className="space-y-4">
                                    {category.questions.map((q, qIndex) => (
                                        <motion.div
                                            key={q.question}
                                            initial={designSystem.animations.fadeInUp.initial}
                                            animate={designSystem.animations.fadeInUp.animate}
                                            transition={{ ...designSystem.animations.fadeInUp.transition, delay: qIndex * 0.05 }}
                                        >
                                            <FAQItem question={q.question} answer={q.answer} />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {filteredCategories.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No questions found matching your search.</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => setSearchQuery("")}
                        >
                            Clear Search
                        </Button>
                    </motion.div>
                )}

                {/* Contact CTA */}
                <motion.div
                    initial={designSystem.animations.fadeInUp.initial}
                    animate={designSystem.animations.fadeInUp.animate}
                    transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <Card className="border-indigo-500/20 bg-linear-to-br from-indigo-500/5 to-purple-500/5">
                        <CardContent className="p-8">
                            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
                            <p className="text-muted-foreground mb-6">
                                Can&apos;t find the answer you&apos;re looking for? Please reach out to our team.
                            </p>
                            <Button asChild className="rounded-full">
                                <Link href="/about">Contact Us</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </PageBackground>
    );
}
