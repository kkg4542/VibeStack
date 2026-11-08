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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { SimpleAccordionItem } from "@/components/ui/simple-accordion";
import { SponsorshipModal } from "@/components/monetization/SponsorshipModal";
import { Section } from "@/components/primitives/Section";

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
    body: "Visitors arrive comparing tools and building stacks; they're in evaluation mode, not idle browsing.",
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
    price: "Custom",
    period: "",
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
    price: "Custom",
    period: "",
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
    body: "Sponsors get a do-follow backlink from a topically-relevant domain, not a nofollow throwaway link.",
  },
  {
    icon: Eye,
    title: "Always-on placement",
    body: "Your spot stays live for the full sponsorship period. No rotation, no fighting for attention in a feed.",
  },
];

const H2 = "font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground";
const BTN = "h-12 rounded-none px-8 text-[16px] font-semibold";

export default function SponsorPage() {
  return (
    <PageBackground {...BackgroundPresets.content}>
      <Section spacing="default" containerSize="default">
        {/* Hero */}
        <section className="mb-24">
          <p className="mb-5 text-[16px] font-semibold text-vibe-link">Sponsor VibeStack</p>
          <h1 className="mb-6 font-display text-balance text-[clamp(32px,6vw,96px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">
            Reach AI builders while they&apos;re choosing tools
          </h1>
          <p className="mb-10 max-w-[60ch] text-[18px] leading-normal text-muted-foreground">
            VibeStack is where developers, designers, and founders come to find
            and compare AI tools. Put your product in front of them at the exact
            moment they&apos;re deciding what to use.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SponsorshipModal
              trigger={
                <Button size="lg" className={BTN}>
                  Get featured
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Button>
              }
            />
            <Button asChild size="lg" variant="secondary" className={`${BTN} hover:bg-accent`}>
              <Link href={`mailto:${SPONSOR_EMAIL}?subject=VibeStack%20Media%20Kit%20Request`}>
                <Mail aria-hidden="true" className="mr-2 h-4 w-4" />
                Request media kit
              </Link>
            </Button>
          </div>
        </section>

        {/* Audience */}
        <section className="mb-24">
          <h2 className={`${H2} mb-4`}>
            Who you&apos;ll reach
          </h2>
          <p className="mb-10 max-w-[60ch] text-[18px] text-muted-foreground">
            A focused audience beats a big one. Here&apos;s who shows up.
          </p>
          <div className="grid gap-3 md:grid-cols-3 md:gap-6">
            {audience.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className="bg-card p-6 sm:p-8">
                  <Icon aria-hidden="true" className="mb-5 h-7 w-7 text-vibe-link" />
                  <h3 className="mb-2 text-[20px] font-semibold">{a.title}</h3>
                  <p className="text-[16px] leading-normal text-muted-foreground">{a.body}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-[15px] text-muted-foreground">
            Want current traffic numbers, demographics, and referrer breakdown?{" "}
            <Link
              href={`mailto:${SPONSOR_EMAIL}?subject=VibeStack%20Media%20Kit%20Request`}
              className="font-semibold text-vibe-link underline-offset-4 hover:underline"
            >
              Request the media kit
            </Link>{" "}
            and we&apos;ll send the latest dashboard.
          </p>
        </section>

        {/* Placements / pricing */}
        <section className="mb-24">
          <h2 className={`${H2} mb-4`}>
            Placement options
          </h2>
          <p className="mb-10 max-w-[60ch] text-[18px] text-muted-foreground">
            Pick a placement, or email us to build a custom package.
          </p>
          <div className="grid gap-3 md:grid-cols-3 md:gap-6">
            {placements.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col p-6 sm:p-8 ${
                  p.highlight
                    ? "bg-foreground text-background"
                    : "bg-card text-foreground"
                }`}
              >
                {p.highlight && (
                  <div className="absolute right-0 top-0 bg-vibe-electric px-3 py-1.5 text-[14px] font-semibold text-vibe-deep">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <div className={`mb-3 text-[16px] font-semibold ${p.highlight ? "text-background/75" : "text-muted-foreground"}`}>
                    {p.name}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[56px] uppercase leading-none">{p.price}</span>
                    {p.period && (
                      <span className={`text-[15px] ${p.highlight ? "text-background/75" : "text-muted-foreground"}`}>
                        {p.period}
                      </span>
                    )}
                  </div>
                  <p className={`mt-3 min-h-[40px] text-[16px] ${p.highlight ? "text-background/80" : "text-muted-foreground"}`}>
                    {p.blurb}
                  </p>
                </div>
                <ul className="mb-8 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[16px]">
                      <Check aria-hidden="true" className={`mt-1 h-4 w-4 shrink-0 ${p.highlight ? "text-vibe-electric" : "text-vibe-link"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {p.price === "Custom" ? (
                  <Button
                    asChild
                    variant={p.highlight ? "default" : "secondary"}
                    className={`h-11 w-full rounded-none text-[16px] font-semibold ${p.highlight ? "" : "bg-background hover:bg-accent"}`}
                  >
                    <Link href={`mailto:${SPONSOR_EMAIL}?subject=VibeStack%20Newsletter%20Sponsorship`}>
                      Email us
                      <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <SponsorshipModal
                    trigger={
                      <Button
                        variant={p.highlight ? "default" : "secondary"}
                        className={`h-11 w-full rounded-none text-[16px] font-semibold ${p.highlight ? "" : "bg-background hover:bg-accent"}`}
                      >
                        Choose {p.name}
                        <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
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
          <h2 className={`${H2} mb-10`}>
            Why sponsors stick around
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {whySponsor.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title}>
                  <Icon aria-hidden="true" className="mb-4 h-7 w-7 text-vibe-link" />
                  <h3 className="mb-2 text-[20px] font-semibold">{w.title}</h3>
                  <p className="text-[16px] leading-normal text-muted-foreground">{w.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-24 max-w-3xl">
          <h2 className={`${H2} mb-10`}>
            Sponsor FAQ
          </h2>
          <div className="space-y-3">
            <SimpleAccordionItem title="What traffic / audience numbers can you share?">
              We send a current media kit on request, including monthly
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
              Yes. Sponsored listings include a do-follow link to your site:
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
              promoting. We review for fit and your placement goes live,
              usually within 1–2 business days.
            </SimpleAccordionItem>
          </div>
        </section>

        {/* Final CTA: the accent field */}
        <section className="bg-vibe-electric p-8 text-vibe-deep sm:p-12 md:p-16">
          <h2 className="mb-4 max-w-[18ch] font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em]">
            Put your tool in front of the right people
          </h2>
          <p className="mb-8 max-w-[60ch] text-[18px] leading-normal">
            Start a sponsorship in minutes, or grab the media kit first. Either
            way, we&apos;re quick to respond.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SponsorshipModal
              trigger={
                <Button size="lg" className={`${BTN} bg-vibe-deep text-[#eff0f1] hover:bg-vibe-deep/90`}>
                  Get featured
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Button>
              }
            />
            <Link
              href={`mailto:${SPONSOR_EMAIL}?subject=VibeStack%20Media%20Kit%20Request`}
              className="inline-flex h-12 items-center px-2 text-[16px] font-semibold text-vibe-deep underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-deep"
            >
              <Mail aria-hidden="true" className="mr-2 h-4 w-4" />
              {SPONSOR_EMAIL}
            </Link>
          </div>
        </section>
      </Section>
    </PageBackground>
  );
}
