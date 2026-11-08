import { Heart, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerifiedTestimonial } from "@/lib/data/stacks";
import { Section } from "@/components/primitives/Section";

interface TestimonialsProps {
  testimonials: VerifiedTestimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  // Never render an empty shell: only verified testimonials are shown.
  if (testimonials.length === 0) return null;

  return (
    <Section spacing="large">
      <div className="mb-12 max-w-3xl md:mb-16">
        <h2 className="font-display mb-4 text-[clamp(40px,5vw,72px)] font-extrabold uppercase leading-[0.88] tracking-[-0.005em]">
          What builders say
        </h2>
        <p className="text-[18px] text-foreground">
          Verified stories from people building with AI.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.id} className="flex h-full flex-col bg-card p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between gap-3 text-[14px] text-muted-foreground">
              <span>Rated {testimonial.rating} out of 5</span>
              {testimonial.user.verified && (
                <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                  Verified
                </span>
              )}
            </div>

            <blockquote className="mb-6 grow text-[20px] leading-snug text-foreground md:text-[22px]">
              &quot;{testimonial.content}&quot;
            </blockquote>

            {testimonial.metrics && (
              <dl className="mb-6 grid grid-cols-3 gap-4">
                {testimonial.metrics.productivityGain && (
                  <div>
                    <dt className="text-[14px] text-muted-foreground">Productivity</dt>
                    <dd className="text-[18px] font-semibold text-foreground">
                      {testimonial.metrics.productivityGain}
                    </dd>
                  </div>
                )}
                {testimonial.metrics.timeSaved && (
                  <div>
                    <dt className="text-[14px] text-muted-foreground">Time saved</dt>
                    <dd className="text-[18px] font-semibold text-foreground">
                      {testimonial.metrics.timeSaved}
                    </dd>
                  </div>
                )}
                {testimonial.metrics.roi && (
                  <div>
                    <dt className="text-[14px] text-muted-foreground">ROI</dt>
                    <dd className="text-[18px] font-semibold text-foreground">
                      {testimonial.metrics.roi}
                    </dd>
                  </div>
                )}
              </dl>
            )}

            <figcaption className="flex items-center gap-3">
              <Avatar className="h-12 w-12 rounded-none">
                <AvatarImage src={testimonial.user.avatar || undefined} alt="" />
                <AvatarFallback className="rounded-none bg-vibe-electric font-semibold text-vibe-deep">
                  {testimonial.user.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold text-foreground">
                  {testimonial.user.name}
                </div>
                <div className="truncate text-[14px] text-muted-foreground">
                  {testimonial.user.role} at {testimonial.user.company}
                </div>
                <div className="text-[14px] text-muted-foreground">{testimonial.user.handle}</div>
              </div>
            </figcaption>

            {testimonial.stackName && (
              <p className="mt-4 text-[14px] text-foreground">Using: {testimonial.stackName}</p>
            )}

            {testimonial.socialProof && (
              <div className="mt-4 flex items-center gap-4 text-[14px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4" aria-hidden="true" />
                  {testimonial.socialProof.likes}
                </span>
                <span className="flex items-center gap-1.5">
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                  {testimonial.socialProof.retweets}
                </span>
              </div>
            )}
          </figure>
        ))}
      </div>

      <div className="mt-10">
        <a
          href="/testimonials"
          className="text-base font-semibold text-foreground underline underline-offset-4 outline-none hover:text-vibe-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
        >
          View all testimonials
        </a>
      </div>
    </Section>
  );
}

// Server component wrapper
import { getVerifiedTestimonials } from "@/lib/data/stacks";

export async function TestimonialsServer() {
  const testimonials = await getVerifiedTestimonials(6);
  return <Testimonials testimonials={testimonials} />;
}
