"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { trackNewsletterSubscribe } from "@/lib/analytics";
import { useCsrfFetch } from "@/hooks/useCsrfFetch";

interface QuizLeadCaptureProps {
  stackName: string;
  stackPrice: string;
  toolSlugs: string[];
}

/**
 * Lead capture shown at the top of the quiz result page.
 * - Sends to /api/newsletter (Mailchimp) for the audience list
 * - Sends to /api/analytics/email-capture with source="quiz" so we can
 *   attribute which stack the lead came from
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await Promise.all([
        csrfFetch("/api/newsletter", {
          method: "POST",
          body: JSON.stringify({ email }),
        }),
        csrfFetch("/api/analytics/email-capture", {
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
        }),
      ]);

      trackNewsletterSubscribe(email);
      setIsSuccess(true);
      setEmail("");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="mb-8 border-emerald-500/30 bg-emerald-500/5">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Check your inbox 🚀</h3>
            <p className="text-sm text-muted-foreground">
              We sent <span className="font-medium">{stackName}</span> to your
              email — plus you&apos;ll get our weekly AI tool drops.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 border-vibe-electric/30 bg-linear-to-br from-vibe-electric/5 via-transparent to-vibe-purple/5">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-vibe-electric/10 border border-vibe-electric/20">
            <Sparkles className="h-7 w-7 text-vibe-electric" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold mb-1">
              Save your stack + get the setup guide
            </h3>
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              We&apos;ll email you <span className="font-medium">{stackName}</span>
              {" "}with setup links, pricing tips, and weekly new-tool drops. No spam.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full md:w-auto md:min-w-[360px] flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                className="pl-9 h-11"
                aria-label="Email address"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-6 bg-linear-to-r from-vibe-electric to-vibe-cyan"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending
                </>
              ) : (
                <>
                  Send it
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>

        {errorMessage && (
          <p className="text-xs text-red-500 mt-3" role="alert">
            {errorMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
