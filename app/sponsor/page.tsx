import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  Target,
  Link2,
  Mail,
  TrendingUp,
  Eye,
  Code2,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { SimpleAccordionItem } from "@/components/ui/simple-accordion";
import { SponsorshipModal } from "@/components/monetization/SponsorshipModal";

export const metadata: Metadata = {
  title: "Sponsor VibeStack — Reach AI Builders Actively Shopping for Tools",
  description:
    "Put your AI product in front of developers, designers, and founders who are actively choosing tools. Sidebar ads, homepage spotlight, and newsletter placements.",
  alternates: { canonical: "https://usevibestack.com/sponsor" },
};

const SPONSOR_EMAIL = "hello@usevibestack.com";

const audience = [
  {
    icon: Code2,
    title: "High-intent buyers",
    body: "Visitors arrive comparing tools and building stacks — they're in evaluation mode, not idle browsing.",
  },
  {
    icon: Target,
    title: "Developers & founders",
    body: "Engineers, indie hackers, designers, and technical founders picking the AI tools they'll actually pay for.",
  },
  {
    icon: TrendingUp,
    title: "Growing organic reach",
    body: "SEO-optimized tool pages, comparisons, and a content engine compounding search traffic over time.",
  },
];

const placements = [
  {
    name: "Sidebar Ad",
    price: "$99",
    period: "/mo",
    highlight: false,
    blurb: "Great for indie hackers & early-stage startups.",
    features: [
      "Featured in the 'All Tools' list",
      "Do-follow backlink (SEO juice)",
      "Persistent placement while active",
      "Logo + one-line pitch",
    ],
  },
  {
    name: "Homepage Spotlight",
    price: "$299",
    period: "/mo",
    highlight: true,
    blurb: "Maximum visibility for serious brands.",
    features: [
      "Homepage 'Featured Tool' spotlight",
      "Everything in Sidebar Ad",
      "Newsletter mention",
      "Social media shoutout",
      "Priority support",
    ],
  },
  {
    name: "Newsletter",
    price: "Custom",
    period: "",
    highlight: false,
    blurb: "Dedicated placement in our subscriber drops.",
    features: [
      "Featured slot in a newsletter issue",
      "Direct link to your product",
      "Audience of opted-in AI builders",
      "Email us for the current rate card",
    ],
  },
];

const whySponsor = [
  {
    icon: Target,
    title: "Targeted, not sprayed",
    body: "Every visitor is here for one reason: to find AI tools. No wasted impressions on the wrong crowd.",
  },
  {
    icon: Link2,
    title: "Real SEO value",
    body: "Sponsors get a do-follow backlink from a topically-relevant domain — not a nofollow throwaway link.",
  },
  {
    icon: Eye,
    title: "Always-on placement",
    body: "Your spot stays live for the full sponsorship period. No rotation, no fighting for attention in a feed.",
  },
];

export default function SponsorPage() {
  return (
    <PageBackground {...BackgroundPresets.content}>
      <div className="container max-w-6xl mx-auto px-4 py-16">
        {/* Hero */}
        <section className="text-center mb-20">
          <Badge
            variant="outline"
            className="mb-4 border-vibe-electric/30 bg-vibe-electric/10 text-vibe-electric"
          >
            <Rocket className="mr-2 h-3 w-3" />
            Sponsor VibeStack
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
            Reach AI builders{" "}
            <span className="bg-linear-to-r from-vibe-electric via-vibe-purple to-vibe-pink bg-clip-text text-transparent">
              while they&apos;re choosing tools
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            VibeStack is where developers, designers, and founders come to find
            and compare AI tools. Put your product in front of them at the exact
            moment they&apos;re deciding what to use.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <SponsorshipModal
              trigger={
                <Button size="lg" className="h-12 px-8">
                  Get featured
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              }
            />
            <Button asChild size="lg" variant="outline" className="h-12 px-8">
              <Link href={`mailto:${SPONSOR_EMAIL}?subject=VibeStack%20Media%20Kit%20Request`}>
                <Mail className="mr-2 h-4 w-4" />
                Request media kit
              </Link>
            </Button>
          </div>
        </section>

        {/* Audience */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Who you&apos;ll reach
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
            A focused audience beats a big one. Here&apos;s who shows up.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {audience.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vibe-electric/10 border border-vibe-electric/20 mb-4">
                    <Icon className="h-6 w-6 text-vibe-electric" />
                  </div>
                  <h3 className="font-bold mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.body}</p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-6">
            Want current traffic numbers, demographics, and referrer breakdown?{" "}
            <Link
              href={`mailto:${SPONSOR_EMAIL}?subject=VibeStack%20Media%20Kit%20Request`}
              className="text-vibe-electric hover:underline"
            >
              Request the media kit
            </Link>{" "}
            — we&apos;ll send the latest dashboard.
          </p>
        </section>

        {/* Placements / pricing */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Placement options
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
            Pick a placement, or email us to build a custom package.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {placements.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  p.highlight
                    ? "border-vibe-electric/50 bg-vibe-electric/5 ring-1 ring-vibe-electric/30"
                    : "border-border bg-card"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-vibe-electric px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <div className="text-sm font-semibold text-muted-foreground mb-2">
                    {p.name}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{p.price}</span>
                    {p.period && (
                      <span className="text-sm text-muted-foreground">
                        {p.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 min-h-[40px]">
                    {p.blurb}
                  </p>
                </div>
                <ul className="flex-1 space-y-2.5 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {p.price === "Custom" ? (
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`mailto:${SPONSOR_EMAIL}?subject=VibeStack%20Newsletter%20Sponsorship`}>
                      Email us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <SponsorshipModal
                    trigger={
                      <Button
                        variant={p.highlight ? "default" : "outline"}
                        className="w-full"
                      >
                        Choose {p.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Why sponsor */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Why sponsors stick around
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {whySponsor.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="text-center px-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-vibe-electric/10 border border-vibe-electric/20 mb-4">
                    <Icon className="h-6 w-6 text-vibe-electric" />
                  </div>
                  <h3 className="font-bold mb-2">{w.title}</h3>
                  <p className="text-sm text-muted-foreground">{w.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Sponsor FAQ
          </h2>
          <div className="space-y-3">
            <SimpleAccordionItem title="What traffic / audience numbers can you share?">
              We send a current media kit on request — including monthly
              visitors, top referrers, and audience breakdown. Email{" "}
              {SPONSOR_EMAIL} and we&apos;ll reply with the latest dashboard so
              you can decide with real data.
            </SimpleAccordionItem>
            <SimpleAccordionItem title="How does billing work?">
              Sidebar and Homepage Spotlight placements are billed monthly via
              Stripe. You can cancel anytime; the placement stays live through
              the end of your paid period.
            </SimpleAccordionItem>
            <SimpleAccordionItem title="Do I get a do-follow backlink?">
              Yes. Sponsored listings include a do-follow link to your site —
              real SEO value from a topically-relevant domain, not a nofollow
              throwaway.
            </SimpleAccordionItem>
            <SimpleAccordionItem title="Can I sponsor a specific tool listing?">
              Yes. During checkout you provide the tool slug you want tied to
              the placement. If your tool isn&apos;t listed yet, submit it first
              (it&apos;s free) and we&apos;ll connect it.
            </SimpleAccordionItem>
            <SimpleAccordionItem title="What do you need from me to go live?">
              Company name, website URL, contact email, and the tool you&apos;re
              promoting. We review for fit and your placement goes live —
              usually within 1–2 business days.
            </SimpleAccordionItem>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center rounded-3xl border border-vibe-electric/20 bg-linear-to-br from-vibe-electric/10 via-transparent to-vibe-purple/10 p-10 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Put your tool in front of the right people
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Start a sponsorship in minutes, or grab the media kit first. Either
            way, we&apos;re quick to respond.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <SponsorshipModal
              trigger={
                <Button size="lg" className="h-12 px-8">
                  Get featured
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              }
            />
            <Button asChild size="lg" variant="outline" className="h-12 px-8">
              <Link href={`mailto:${SPONSOR_EMAIL}?subject=VibeStack%20Media%20Kit%20Request`}>
                <Mail className="mr-2 h-4 w-4" />
                {SPONSOR_EMAIL}
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageBackground>
  );
}
