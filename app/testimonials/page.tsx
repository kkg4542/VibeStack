import { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getVerifiedTestimonials } from "@/lib/data/stacks";
import { TestimonialsGrid } from "@/components/testimonials/TestimonialsGrid";

export const metadata: Metadata = {
    title: "Testimonials",
    description: "See what developers and product teams are saying about VibeStack.",
    alternates: { canonical: "https://usevibestack.com/testimonials" },
};

export default async function TestimonialsPage() {
    // Fetch all testimonials (passing a high limit to get all)
    const testimonials = await getVerifiedTestimonials(100);

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-vibe-purple/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-vibe-electric/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <div>
                        <Badge
                            variant="outline"
                            className="mb-4 border-vibe-electric/30 bg-vibe-electric/5 text-vibe-electric"
                        >
                            <Heart className="mr-2 h-3 w-3" />
                            Community Love
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Loved by{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-vibe-electric via-purple-600 to-pink-600">
                                Developers
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            See how developers use VibeStack to find tools and build their AI stack faster.
                        </p>
                    </div>
                </div>

                {/* Testimonials Grid (or empty state) */}
                {testimonials.length > 0 ? (
                    <TestimonialsGrid testimonials={testimonials} />
                ) : (
                    <div className="text-center max-w-xl mx-auto py-12">
                        <p className="text-lg text-muted-foreground mb-6">
                            We&apos;re collecting stories from real users. Used VibeStack to
                            build your stack? We&apos;d love to feature you.
                        </p>
                        <Link
                            href="mailto:hello@usevibestack.com?subject=My%20VibeStack%20story"
                            className="inline-flex items-center gap-2 rounded-full border border-vibe-electric/30 bg-vibe-electric/5 px-5 py-2.5 text-sm font-medium text-vibe-electric hover:bg-vibe-electric/10 transition-colors"
                        >
                            <Heart className="h-4 w-4" />
                            Share your story
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
