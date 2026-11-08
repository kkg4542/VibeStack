import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Megaphone, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { Section } from "@/components/primitives/Section";

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
      "Get persistent placement in front of our audience: sidebar ads or homepage spotlight.",
    plans: [
      {
        name: "Standard Sponsor",
        price: "Custom",
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
        price: "Custom",
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

const H2 = "font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground";

export default function PricingPage() {
  return (
    <PageBackground {...BackgroundPresets.content}>
      <Section spacing="default" containerSize="default">
        {/* Header */}
        <div className="mb-20">
          <p className="mb-5 text-[16px] font-semibold text-vibe-link">Pricing</p>
          <h1 className="mb-6 max-w-[14ch] font-display text-balance text-[clamp(40px,6vw,96px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">
            Three ways to work with us
          </h1>
          <p className="max-w-[60ch] text-[18px] leading-normal text-muted-foreground">
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
                <div className="mb-10">
                  <p className="mb-3 flex items-center gap-2 text-[16px] font-semibold text-muted-foreground">
                    <Icon aria-hidden="true" className="h-5 w-5 text-vibe-link" />
                    {track.badge}
                  </p>
                  <h2 className={`${H2} mb-3`}>
                    {track.title}
                  </h2>
                  <p className="max-w-[60ch] text-[17px] leading-normal text-muted-foreground">
                    {track.subtitle}
                  </p>
                </div>

                {/* Plans */}
                <div
                  className={`grid gap-3 md:gap-6 ${
                    track.plans.length === 1
                      ? "max-w-md"
                      : track.plans.length === 2
                      ? "max-w-4xl md:grid-cols-2"
                      : "md:grid-cols-3"
                  }`}
                >
                  {track.plans.map((plan) => (
                    <div
                      key={plan.name}
                      className={`relative flex flex-col p-6 sm:p-8 ${
                        plan.highlight
                          ? "bg-foreground text-background"
                          : "bg-card text-foreground"
                      }`}
                    >
                      <div className="mb-6">
                        <div className={`mb-3 text-[16px] font-semibold ${plan.highlight ? "text-background/75" : "text-muted-foreground"}`}>
                          {plan.name}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-[56px] uppercase leading-none">
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span className={`text-[15px] ${plan.highlight ? "text-background/75" : "text-muted-foreground"}`}>
                              {plan.period}
                            </span>
                          )}
                        </div>
                        <p className={`mt-3 min-h-[40px] text-[16px] ${plan.highlight ? "text-background/80" : "text-muted-foreground"}`}>
                          {plan.description}
                        </p>
                      </div>

                      <ul className="mb-8 flex-1 space-y-2.5">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-[16px]">
                            <Check aria-hidden="true" className={`mt-1 h-4 w-4 shrink-0 ${plan.highlight ? "text-vibe-electric" : "text-vibe-link"}`} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        asChild
                        variant={plan.highlight ? "default" : "secondary"}
                        className={`h-11 w-full rounded-none text-[16px] font-semibold ${plan.highlight ? "" : "bg-background hover:bg-accent"}`}
                      >
                        <Link href={plan.cta.href}>
                          {plan.cta.label}
                          <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer CTA: the accent field */}
        <div className="mt-24 bg-vibe-electric p-8 text-vibe-deep sm:p-12">
          <h2 className="mb-3 font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em]">
            Not sure which fits?
          </h2>
          <p className="mb-8 max-w-[60ch] text-[18px] leading-normal">
            Drop us a line. We&apos;ll point you to the right one (or build
            something custom).
          </p>
          <Link
            href="mailto:hello@usevibestack.com"
            className="group inline-flex h-12 items-center gap-2 bg-vibe-deep px-7 text-[16px] font-semibold text-[#eff0f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-deep"
          >
            hello@usevibestack.com
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
          </Link>
        </div>
      </Section>
    </PageBackground>
  );
}
