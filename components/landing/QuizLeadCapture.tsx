"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { trackNewsletterSubscribe } from "@/lib/analytics";
import { useCsrfFetch } from "@/hooks/useCsrfFetch";

interface QuizLeadCaptureProps {
  stackName: string;
  stackPrice: string;
  toolSlugs: string[];
}

/**
 * Lead capture shown at the top of the quiz result page.
 * - Sends to /api/newsletter (Mailchimp) for the audience list. Only this
 *   call decides success or failure.
 * - Sends to /api/analytics/email-capture with source="quiz" so we can
 *   attribute which stack the lead came from. Best effort, never blocks.
 */
export function QuizLeadCapture({
  stackName,
  stackPrice,
  toolSlugs,
}: QuizLeadCaptureProps) {
  const { csrfFetch } = useCsrfFetch();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Attribution is best effort: a failure here must not decide the outcome.
      const attribution = csrfFetch("/api/analytics/email-capture", {
        method: "POST",
        body: JSON.stringify({
          email,
          source: "quiz",
          metadata: JSON.stringify({
            stackName,
            stackPrice,
            toolSlugs,
          }),
        }),
      }).catch(() => null);

      const res = await csrfFetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      await attribution;

      if (!res.ok) {
        if (res.status === 429) {
          setErrorMessage("Too many attempts, try again later.");
        } else if (res.status === 400) {
          const data = await res.json().catch(() => null);
          setErrorMessage(
            typeof data?.error === "string" && data.error
              ? data.error
              : "Please enter a valid email address."
          );
        } else {
          setErrorMessage("We couldn't sign you up right now. Please try again later.");
        }
        return;
      }

      const data = await res.json().catch(() => null);
      trackNewsletterSubscribe(email);
      setSuccessMessage(
        typeof data?.message === "string" && data.message ? data.message : "You're subscribed!"
      );
      setIsSuccess(true);
      setEmail("");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Direction B: an inverse field (ink ground, graphite text) inside the
  // result card, one orange submit with dark text, square input. No gradient,
  // no tinted icon tiles, no emoji. Form logic above is unchanged.
  if (isSuccess) {
    return (
      <div className="mb-8 flex items-start gap-4 bg-background p-6" role="status">
        <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-vibe-link" aria-hidden="true" />
        <div>
          <h3 className="mb-1 text-[18px] font-semibold text-foreground">{successMessage}</h3>
          <p className="text-[16px] text-muted-foreground">
            You&apos;ll get the weekly VibeStack newsletter with new AI tools. Your{" "}
            <span className="font-semibold text-foreground">{stackName}</span> result stays on this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 bg-foreground p-6 text-background md:p-8">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="flex-1">
          <h3 className="mb-1 text-[clamp(20px,2.4vw,24px)] font-semibold leading-tight">
            Get the weekly AI tool newsletter
          </h3>
          <p className="mb-4 text-[16px] opacity-80 md:mb-0">
            New AI tools in your inbox, once a week. No spam.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:min-w-[360px]"
        >
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              type="email"
              placeholder="you@company.com"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
              className="h-12 rounded-none border-0 bg-background pl-9 text-[16px] text-foreground focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-electric"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-vibe-electric px-6 text-[16px] font-semibold text-vibe-deep transition-colors hover:bg-[#e8401a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-electric disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-vibe-deep border-t-transparent motion-reduce:animate-none" aria-hidden="true" />
                Sending
              </>
            ) : (
              <>
                Subscribe
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      </div>

      <div aria-live="assertive">
        {errorMessage && (
          <p className="mt-3 text-[14px] font-semibold text-background">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
