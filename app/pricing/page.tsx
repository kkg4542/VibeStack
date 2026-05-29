import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Megaphone, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";

export const metadata: Metadata = {
  title: "Pricing — Submit, Sponsor, or Hire Us",
  description:
    "All VibeStack pricing in one place: submit your AI tool, sponsor the directory, or hire us to build your AI workflow.",
  alternates: { canonical: "https://usevibestack.com/pricing" },
};

type Plan = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
};

type Track = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  title: string;
  subtitle: string;
  plans: Plan[];
};

const TRACKS: Track[] = [
  {
    id: "submit",
    icon: Rocket,
    badge: "For Tool Builders",
    title: "Submit your AI tool",
    subtitle:
      "Get listed in front of developers, designers, and operators actively shopping for AI tools.",
    plans: [
      {
        name: "Free Submission",
        price: "$0",
        description: "Standard listing with normal review time.",
        features: [
          "Standard listing on VibeStack",
          "1–2 week review process",
          "Basic tool information",
          "Community reviews enabled",
        ],
        cta: { label: "Submit for free", href: "/submit-tool" },
        highlight: true,
      },
    ],
  },
  {
    id: "sponsor",
    icon: Megaphone,
    badge: "For Sponsors",
    title: "Sponsor VibeStack",
    subtitle:
      "Get persistent placement in front of our audience — sidebar ads or homepage spotlight.",
    plans: [
      {
        name: "Standard Sponsor",
        price: "$99",
        period: "/mo",
        description: "Great for indie hackers and bootstrapped startups.",
        features: [
          "Featured in 'All Tools' list",
          "Do-follow backlink (SEO)",
          "Permanent listing while active",
        ],
        cta: { label: "Contact us", href: "/sponsor" },
      },
      {
        name: "Premium Sponsor",
        price: "$299",
        period: "/mo",
        description: "Maximum visibility for serious brands.",
        features: [
          "Homepage 'Essential Tools' spot",
          "Newsletter mention",
          "Social media shoutout",
          "Priority support",
        ],
        cta: { label: "Contact us", href: "/sponsor" },
        highlight: true,
      },
    ],
  },
];

export default function PricingPage() {
  return (
    <PageBackground {...BackgroundPresets.content}>
      <div className="container max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-vibe-electric/30 bg-vibe-electric/10 text-vibe-electric"
          >
            Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Three ways to{" "}
            <span className="bg-linear-to-r from-vibe-electric via-vibe-purple to-vibe-pink bg-clip-text text-transparent">
              work with us
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Submit your tool, sponsor the directory, or hire us to build your AI
            workflow. Same team, different commitments.
          </p>
        </div>

        {/* Tracks */}
        <div className="space-y-24">
          {TRACKS.map((track) => {
            const Icon = track.icon;
            return (
              <section key={track.id} id={track.id}>
                {/* Track header */}
                <div className="flex flex-col items-center text-center mb-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-vibe-electric/10 border border-vibe-electric/20 mb-4">
                    <Icon className="h-7 w-7 text-vibe-electric" />
                  </div>
                  <Badge variant="secondary" className="mb-3">
                    {track.badge}
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    {track.title}
                  </h2>
                  <p className="text-muted-foreground max-w-xl">
                    {track.subtitle}
                  </p>
                </div>

                {/* Plans */}
                <div
                  className={`grid gap-6 ${
                    track.plans.length === 2
                      ? "md:grid-cols-2 max-w-4xl mx-auto"
                      : "md:grid-cols-3"
                  }`}
                >
                  {track.plans.map((plan) => (
                    <div
                      key={plan.name}
                      className={`relative flex flex-col rounded-2xl border p-6 ${
                        plan.highlight
                          ? "border-vibe-electric/50 bg-vibe-electric/5 ring-1 ring-vibe-electric/30"
                          : "border-border bg-card"
                      }`}
                    >
                      {plan.highlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-vibe-electric px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
                          Most Popular
                        </div>
                      )}

                      <div className="mb-4">
                        <div className="text-sm font-semibold text-muted-foreground mb-2">
                          {plan.name}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold">
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span className="text-sm text-muted-foreground">
                              {plan.period}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-3 min-h-[40px]">
                          {plan.description}
                        </p>
                      </div>

                      <ul className="flex-1 space-y-2.5 mb-6">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        asChild
                        variant={plan.highlight ? "default" : "outline"}
                        className="w-full"
                      >
                        <Link href={plan.cta.href}>
                          {plan.cta.label}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Not sure which fits?
          </h2>
          <p className="text-muted-foreground mb-6">
            Drop us a line — we&apos;ll point you to the right one (or build
            something custom).
          </p>
          <Button asChild size="lg">
            <Link href="mailto:hello@usevibestack.com">
              hello@usevibestack.com
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </PageBackground>
  );
}
