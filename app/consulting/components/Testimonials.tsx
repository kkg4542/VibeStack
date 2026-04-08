import { Award } from "lucide-react";
import * as motion from "framer-motion/client";
import { designSystem } from "@/lib/design-system";

export function Testimonials() {
  return (
                <section className="container mx-auto px-4 py-24">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-4">What Our Partners Say</h2>
                        <p className="text-muted-foreground">Trusted by leading AI companies and developer tools.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                        <motion.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={designSystem.animations.fadeInUp.transition}
                            className="rounded-2xl border border-border/50 bg-white p-6 backdrop-blur-sm"
                        >
                            <div className="mb-4 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Award key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                                ))}
                            </div>
                            <p className="text-sm text-foreground/90 mb-4">
                                &quot;VibeStack drove 500+ quality signups in our first month. The developer audience is exactly who we needed to reach.&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-vibe-purple/20" />
                                <div>
                                    <div className="font-semibold text-sm text-foreground">Sarah Chen</div>
                                    <div className="text-xs text-muted-foreground">VP Marketing, DevTools Inc</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.1 }}
                            className="rounded-2xl border border-border/50 bg-white p-6 backdrop-blur-sm"
                        >
                            <div className="mb-4 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Award key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                                ))}
                            </div>
                            <p className="text-sm text-foreground/90 mb-4">
                                &quot;Best ROI we&apos;ve seen from any developer marketing channel. The team is responsive and the analytics are detailed.&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-purple-500/20" />
                                <div>
                                    <div className="font-semibold text-sm text-foreground">Marcus Rodriguez</div>
                                    <div className="text-xs text-muted-foreground">Growth Lead, AI Startup</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={designSystem.animations.fadeInUp.initial}
                            whileInView={designSystem.animations.fadeInUp.animate}
                            viewport={{ once: true }}
                            transition={{ ...designSystem.animations.fadeInUp.transition, delay: 0.2 }}
                            className="rounded-2xl border border-border/50 bg-white p-6 backdrop-blur-sm"
                        >
                            <div className="mb-4 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Award key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                                ))}
                            </div>
                            <p className="text-sm text-foreground/90 mb-4">
                                &quot;The newsletter sponsorship was a game-changer. High-quality clicks and actual conversions, not just vanity metrics.&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-pink-500/20" />
                                <div>
                                    <div className="font-semibold text-sm text-foreground">Jessica Park</div>
                                    <div className="text-xs text-muted-foreground">Founder, CodeFlow</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
  );
}
