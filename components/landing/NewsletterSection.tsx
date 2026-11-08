"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { trackNewsletterSubscribe } from "@/lib/analytics";
import { useCsrfFetch } from "@/hooks/useCsrfFetch";
import { Container } from "@/components/primitives/Container";

export function NewsletterSection() {
  const { csrfFetch } = useCsrfFetch();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await csrfFetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        trackNewsletterSubscribe(email);
        setIsSuccess(true);
        setEmail("");
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        setErrorMessage(data.error || "Failed to subscribe. Please try again.");
      }
    } catch {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-foreground font-sans text-background"
    >
      <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <h2
            id="newsletter-heading"
            className="font-display mb-6 text-[clamp(40px,5.5vw,84px)] font-extrabold uppercase leading-[0.88] tracking-[-0.005em]"
          >
            <span className="block">Weekly AI</span>
            <span className="block">tool updates</span>
          </h2>
          <p className="max-w-[44ch] text-[18px] leading-normal">
            New AI tools and stack recommendations, straight to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 w-full min-w-0 flex-1 bg-background px-4 text-[18px] text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="inline-flex h-14 shrink-0 items-center justify-center bg-vibe-electric px-6 text-[16px] font-semibold text-vibe-deep transition-transform duration-150 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background disabled:pointer-events-none motion-reduce:transition-none motion-reduce:active:translate-y-0"
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden="true" />
                  Subscribed!
                </>
              ) : isSubmitting ? (
                <>
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-vibe-deep border-t-transparent motion-reduce:animate-none"
                  />
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
          {errorMessage && (
            <p className="mt-3 text-[16px] font-semibold" role="alert">
              {errorMessage}
            </p>
          )}
          <p className="mt-3 text-[16px]">No spam, ever. Unsubscribe anytime.</p>
        </form>
      </Container>
    </section>
  );
}
