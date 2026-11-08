import { Check, Rocket, Terminal, Zap } from "lucide-react";
import { Section } from "@/components/primitives/Section";

const SERVICES = [
    {
        title: "Featured Spotlight",
        icon: Rocket,
        description: "Top-of-home placement with a Featured badge and priority visibility for new visitors.",
        features: ["Top of homepage placement", "\"Featured\" badge on listing", "Monthly performance report"],
    },
    {
        title: "Sidebar Ads",
        icon: Zap,
        description: "Category-targeted sidebar placement for high-intent visitors exploring tools.",
        features: ["Category page sidebar placement", "Monthly impressions estimate (initial range)", "Click and conversion summary"],
    },
    {
        title: "Newsletter Sponsor",
        icon: Terminal,
        description: "Exclusive sponsor slot in our monthly newsletter sent to our newsletter subscribers. Send date confirmed 5 days in advance.",
        features: [
            "One sponsor per monthly newsletter",
            "Featured in our weekly newsletter",
            "60-120 character ad copy (we review for clarity)",
            "Click and conversion tracking included",
        ],
    },
];

export function ServicesGrid() {
    return (
        <Section spacing="default" containerSize="default">
            <div className="mb-12">
                <h2 className="font-display text-balance text-[clamp(32px,4vw,56px)] uppercase leading-[0.9] tracking-[-0.005em] text-foreground">
                    Advertising Solutions
                </h2>
                <p className="mt-4 text-[18px] text-muted-foreground">High-impact placements to drive growth.</p>
            </div>

            <div className="grid gap-3 md:grid-cols-3 md:gap-6">
                {SERVICES.map((service) => {
                    const Icon = service.icon;
                    return (
                        <div key={service.title} className="bg-card p-8">
                            <Icon aria-hidden="true" className="mb-6 h-7 w-7 text-vibe-link" />
                            <h3 className="mb-3 text-[24px] font-semibold text-foreground">{service.title}</h3>
                            <p className="mb-6 text-[16px] leading-normal text-muted-foreground">{service.description}</p>
                            <ul className="space-y-3">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-start text-[15px] text-foreground">
                                        <Check aria-hidden="true" className="mr-3 mt-0.5 h-4 w-4 shrink-0 text-vibe-link" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
