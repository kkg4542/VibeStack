import { Metadata } from "next";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getVerifiedTestimonials } from "@/lib/data/stacks";
import { TestimonialsGrid } from "@/components/testimonials/TestimonialsGrid";

export const metadata: Metadata = {
    title: "Testimonials - VibeStack",
    description: "See what developers and product teams are saying about VibeStack.",
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
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-vibe-electric to-vibe-neon">
                                Developers
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            See how VibeStack is helping teams build better software, faster.
                            Join thousands of satisfied developers optimizing their workflow.
                        </p>
                    </div>
                </div>

                {/* Testimonials Grid */}
                <TestimonialsGrid testimonials={testimonials} />
            </div>
        </div>
    );
}
