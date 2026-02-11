"use client";

import { TestimonialCard } from "./TestimonialCard";

// Define the interface locally or import from where it's defined (we will ensure it's exported from stacks.ts or similar)
// For now, let's look at what getVerifiedTestimonials returns.
// The prisma query returns Testimonial & { tool: ..., stack: ..., user: ... }
// We need to map this to what TestimonialCard expects.
// TestimonialCard expects:
// interface TestimonialWithRelations {
//     id: string;
//     content: string;
//     rating: number;
//     userName: string | null;
//     ...
// }

// We will rely on the mapped data passed from the parent page.

export interface TestimonialWithRelations {
    id: string;
    content: string;
    rating: number;
    userName: string | null;
    userHandle: string | null;
    userRole: string | null;
    userCompany: string | null;
    userAvatar: string | null;
    metrics: any;
    socialProof: any;
    tool?: { title: string; slug: string } | null;
    stack?: { name: string; idField: string } | null;
    verified: boolean;
}

interface TestimonialsGridProps {
    testimonials: any[]; // We'll accept the raw Prisma return and map it here or assume it's already mapped?
    // Let's assume the parent component maps it to the shape TestimonialCard needs, 
    // OR we change TestimonialCard to accept the Prisma shape.
    // Making the parent (page.tsx) do the mapping is cleanest.
}

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
    if (!testimonials || testimonials.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-muted-foreground">No testimonials found yet.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {testimonials.map((testimonial, index) => {
                // Map Prisma result to TestimonialCard props if needed
                // Assuming the passing data structure matches closely enough or is mapped in page.tsx
                // Let's adjust usages in TestimonialsPage
                return (
                    <TestimonialCard
                        key={testimonial.id}
                        testimonial={testimonial}
                        index={index}
                    />
                );
            })}
        </div>
    );
}
