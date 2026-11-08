import { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";
import { getVerifiedTestimonials } from "@/lib/data/stacks";
import { TestimonialsGrid } from "@/components/testimonials/TestimonialsGrid";
import { Container } from "@/components/primitives/Container";

export const metadata: Metadata = {
    title: "Testimonials",
    description: "See what developers and product teams are saying about VibeStack.",
    alternates: { canonical: "https://usevibestack.com/testimonials" },
};

export default async function TestimonialsPage() {
    // Fetch all testimonials (passing a high limit to get all)
    const testimonials = await getVerifiedTestimonials(100);

    return (
        <div className="min-h-svh bg-background pt-24 pb-16">
            <Container size="default">
                {/* Header */}
                <div className="mb-20 max-w-3xl pt-8">
                    <p className="mb-5 text-[16px] font-semibold text-vibe-link">Community Love</p>
                    <h1 className="mb-6 font-display text-balance text-[clamp(40px,6vw,96px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground">
                        Loved by Developers
                    </h1>
                    <p className="max-w-[60ch] text-[19px] leading-normal text-muted-foreground">
                        See how developers use VibeStack to find tools and build their AI stack faster.
                    </p>
                </div>

                {/* Testimonials grid (or empty state) */}
                {testimonials.length > 0 ? (
                    <TestimonialsGrid testimonials={testimonials} />
                ) : (
                    <div className="max-w-xl bg-card p-8">
                        <p className="mb-6 text-[18px] leading-normal text-foreground">
                            We&apos;re collecting stories from real users. Used VibeStack to
                            build your stack? We&apos;d love to feature you.
                        </p>
                        <Link
                            href="mailto:hello@usevibestack.com?subject=My%20VibeStack%20story"
                            className="inline-flex h-12 items-center gap-2 bg-vibe-electric px-6 text-[16px] font-semibold text-vibe-deep transition-colors hover:bg-vibe-electric/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                        >
                            <Heart aria-hidden="true" className="h-4 w-4" />
                            Share your story
                        </Link>
                    </div>
                )}
            </Container>
        </div>
    );
}
