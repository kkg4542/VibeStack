import { Check, Rocket, Terminal, Zap } from "lucide-react";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";

export function ServicesGrid() {
  return (
                <section className="container mx-auto px-4 py-20">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-foreground">Advertising Solutions</h2>
                        <p className="mt-4 text-muted-foreground">High-impact placements to drive growth.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <motion.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all hover:-translate-y-1 hover:border-vibe-electric/30 hover:shadow-2xl hover:shadow-vibe-electric/10"
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/50 ring-1 ring-border group-hover:bg-vibe-electric/10 group-hover:ring-vibe-electric/30 transition-colors">
                                <Rocket className="h-6 w-6 text-vibe-pink" />
                            </div>
                            <h3 className="mb-3 text-2xl font-semibold text-foreground">Featured Spotlight</h3>
                            <p className="mb-6 text-muted-foreground">Top-of-home placement with a Featured badge and priority visibility for new visitors.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-vibe-electric" />
                                    Top of homepage placement
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-vibe-electric" />
                                    &quot;Featured&quot; badge on listing
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-vibe-electric" />
                                    Monthly performance report
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.1 }}
                            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all hover:-translate-y-1 hover:border-vibe-electric/30 hover:shadow-2xl hover:shadow-vibe-electric/10"
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/50 ring-1 ring-border group-hover:bg-vibe-electric/10 group-hover:ring-vibe-electric/30 transition-colors">
                                <Zap className="h-6 w-6 text-vibe-purple" />
                            </div>
                            <h3 className="mb-3 text-2xl font-semibold text-foreground">Sidebar Ads</h3>
                            <p className="mb-6 text-muted-foreground">Category-targeted sidebar placement for high-intent visitors exploring tools.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-vibe-electric" />
                                    Category page sidebar placement
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-vibe-electric" />
                                    Monthly impressions estimate (initial range)
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-vibe-electric" />
                                    Click and conversion summary
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.2 }}
                            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all hover:-translate-y-1 hover:border-vibe-electric/30 hover:shadow-2xl hover:shadow-vibe-electric/10"
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/50 ring-1 ring-border group-hover:bg-vibe-electric/10 group-hover:ring-vibe-electric/30 transition-colors">
                                <Terminal className="h-6 w-6 text-vibe-purple" />
                            </div>
                            <h3 className="mb-3 text-2xl font-semibold text-foreground">Newsletter Sponsor</h3>
                            <p className="mb-6 text-muted-foreground">Exclusive sponsor slot in our monthly newsletter sent to 15,000+ developers. Send date confirmed 5 days in advance.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-vibe-electric" />
                                    One sponsor per monthly newsletter
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-vibe-electric" />
                                    Sent to 15,000+ verified developer emails
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-vibe-electric" />
                                    60-120 character ad copy (we review for clarity)
                                </li>
                                <li className="flex items-center text-sm text-foreground/80">
                                    <Check className="mr-3 h-4 w-4 text-vibe-electric" />
                                    Click and conversion tracking included
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </section>
  );
}
