import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";

interface PricingSectionProps {
    handleCheckout: (placement: string) => Promise<void>;
    loading: boolean;
}

export function PricingSection({ handleCheckout, loading }: PricingSectionProps) {
  return (
                <section className="container mx-auto px-4 py-24">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Transparent Pricing</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Simple, straightforward rates with no hidden fees. All packages include detailed analytics and performance tracking.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                        {/* Starter */}
                        <motion.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-white p-8 transition-all hover:-translate-y-1 hover:border-vibe-electric/30 hover:shadow-2xl hover:shadow-vibe-electric/10"
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Sidebar Ads</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-foreground">$99</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                                    <span>Category page sidebar placement</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                                    <span>Estimated 3–8k monthly impressions</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                                    <span>Click and conversion summary</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                                    <span>One copy or image update included</span>
                                </li>
                            </ul>
                            <Button
                                variant="outline"
                                className="w-full rounded-full"
                                onClick={() => handleCheckout('sidebarAd')}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Get Started
                            </Button>
                        </motion.div>

                        {/* Professional - Highlighted */}
                        <motion.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.1 }}
                            className="group relative overflow-hidden rounded-3xl border-2 border-vibe-electric/50 bg-linear-to-b from-vibe-electric/10 to-card/50 p-8 shadow-xl shadow-vibe-electric/20 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-vibe-electric/30"
                        >
                            <div className="absolute top-4 right-4">
                                <Badge className="bg-vibe-electric text-white border-vibe-electric">Most Popular</Badge>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Featured Spotlight</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-foreground">$199</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                                    <span>Home hero placement</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                                    <span>Priority visibility for new visitors</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                                    <span>&quot;Featured&quot; badge on listing</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                                    <span>Monthly performance report</span>
                                </li>
                            </ul>
                            <Button
                                className="w-full rounded-full shadow-lg"
                                onClick={() => handleCheckout('featuredSpotlight')}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Get Started
                            </Button>
                        </motion.div>

                        {/* Enterprise */}
                        <motion.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.2 }}
                            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-white p-8 transition-all hover:-translate-y-1 hover:border-vibe-electric/30 hover:shadow-2xl hover:shadow-vibe-electric/10"
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Newsletter Sponsor</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-foreground">$149</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                                    <span>Sent to 15,000+ developer subscribers</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                                    <span>One exclusive slot per month (first week preferred)</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                                    <span>Copy approval 3 days before send</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-foreground/80">
                                    <Check className="h-4 w-4 text-vibe-electric mt-0.5 shrink-0" />
                                    <span>Full click analytics within 48 hours</span>
                                </li>
                            </ul>
                            <Button
                                variant="outline"
                                className="w-full rounded-full"
                                onClick={() => handleCheckout('newsletter')}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Get Started
                            </Button>
                        </motion.div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground mt-8">
                        All prices in USD. Custom packages available for annual commitments.
                    </p>
                </section>
  );
}
