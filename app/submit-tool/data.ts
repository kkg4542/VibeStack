import { Zap, Shield, Star, Clock, ExternalLink } from "lucide-react";

export const pricingPlans = [
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

export const criteria = [
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

export const rejectionReasons = [
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
