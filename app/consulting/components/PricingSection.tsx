import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/primitives/Section";

interface PricingSectionProps {
    handleCheckout: (placement: string) => Promise<void>;
    loading: boolean;
}

const PLANS = [
    {
        title: "Sidebar Ads",
        placement: "sidebarAd",
        highlighted: false,
        features: [
            "Category page sidebar placement",
            "Estimated 3–8k monthly impressions",
            "Click and conversion summary",
            "One copy or image update included",
        ],
    },
    {
        title: "Featured Spotlight",
        placement: "featuredSpotlight",
        highlighted: true,
        features: [
            "Home hero placement",
            "Priority visibility for new visitors",
            "\"Featured\" badge on listing",
            "Monthly performance report",
        ],
    },
    {
        title: "Newsletter Sponsor",
        placement: "newsletter",
        highlighted: false,
        features: [
            "Featured in our weekly newsletter",
            "One exclusive slot per month (first week preferred)",
            "Copy approval 3 days before send",
            "Full click analytics within 48 hours",
        ],
    },
];

/**
 * Direction B: three flat tone fields. The highlighted plan is the inverse
 * field (ink ground) with the one orange action; the others are surfaces.
 */
export function PricingSection({ handleCheckout, loading }: PricingSectionProps) {
    return (
        <Section spacing="large" containerSize="default">
            <div className="mb-12">
                <h2 className="mb-4 font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground">
                    Transparent Pricing
                </h2>
                <p className="max-w-[60ch] text-[18px] leading-normal text-muted-foreground">
                    Simple, straightforward rates with no hidden fees. All packages include detailed analytics and performance tracking.
                </p>
            </div>

            <div className="grid max-w-5xl gap-3 md:grid-cols-3 md:gap-6">
                {PLANS.map((plan) => (
                    <div
                        key={plan.title}
                        className={`relative flex flex-col p-8 ${plan.highlighted ? "bg-foreground text-background" : "bg-card text-foreground"}`}
                    >
                        {plan.highlighted && (
                            <span className="absolute right-0 top-0 bg-vibe-electric px-3 py-1.5 text-[14px] font-semibold text-vibe-deep">
                                Most Popular
                            </span>
                        )}
                        <div className="mb-6">
                            <h3 className="mb-3 text-[20px] font-semibold">{plan.title}</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="font-display text-[48px] uppercase leading-none">Custom</span>
                                <span className={plan.highlighted ? "text-background/75" : "text-muted-foreground"}>pricing</span>
                            </div>
                        </div>
                        <ul className="mb-8 space-y-3">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-[15px]">
                                    <Check
                                        aria-hidden="true"
                                        className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? "text-vibe-electric" : "text-vibe-link"}`}
                                    />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button
                            variant={plan.highlighted ? "default" : "secondary"}
                            className={`mt-auto h-11 w-full rounded-none text-[16px] font-semibold ${plan.highlighted ? "" : "bg-background hover:bg-accent"}`}
                            onClick={() => handleCheckout(plan.placement)}
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Get Started
                        </Button>
                    </div>
                ))}
            </div>

            <p className="mt-8 text-[15px] text-muted-foreground">
                All prices in USD. Custom packages available for annual commitments.
            </p>
        </Section>
    );
}
