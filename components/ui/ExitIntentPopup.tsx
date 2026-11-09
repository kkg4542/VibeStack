"use client";

import { useState, useEffect } from "react";
import { Mail, Newspaper, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCsrfFetch } from "@/hooks/useCsrfFetch";

interface ExitIntentPopupProps {
  toolSlug?: string;
  toolName?: string;
}

export function ExitIntentPopup({ toolSlug, toolName }: ExitIntentPopupProps) {
  const { csrfFetch } = useCsrfFetch();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Use lazy initialization to check sessionStorage without useEffect setState
  const [hasShown, setHasShown] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem("exit_intent_shown") === "true";
    }
    return false;
  });

  useEffect(() => {
    // Skip if already shown
    if (hasShown) return;

    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      // If mouse leaves from top of viewport and hasn't been shown
      if (mouseY < 100 && !hasShown && !isVisible) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exit_intent_shown", "true");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown, isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
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
          source: "exit_intent",
          toolSlug: toolSlug || null,
          metadata: toolName ? JSON.stringify({ toolName }) : null
        })
      }).catch(() => null);

      const res = await csrfFetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email })
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
      setSuccessMessage(
        typeof data?.message === "string" && data.message ? data.message : "You're subscribed!"
      );
      setIsSubmitted(true);
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Radix Dialog supplies role="dialog", aria-modal, the focus trap, Escape to
  // close, and focus restoration to whatever was focused before it opened.
  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent
        showCloseButton
        className="gap-0 overflow-hidden bg-popover p-8 sm:max-w-md"
      >
        {/* Signature orange bar */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-vibe-electric" aria-hidden="true" />

        {!isSubmitted ? (
          <>
            <div className="mb-6 text-center">
              <Newspaper className="mx-auto mb-4 h-8 w-8 text-vibe-link" aria-hidden="true" />
              <DialogTitle className="mb-3 font-display text-4xl uppercase leading-[0.88] tracking-[-0.005em]">
                Before You Go
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Get the weekly VibeStack newsletter with new AI tools.
              </DialogDescription>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="h-12 pl-10"
                  required
                />
              </div>
              <Button
                type="submit"
                className="h-12 w-full rounded-none"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
              <div aria-live="assertive">
                {errorMessage && (
                  <p className="text-center text-[14px] font-semibold text-destructive">{errorMessage}</p>
                )}
              </div>
              <p className="text-center text-[13px] text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <Check className="mx-auto mb-4 h-8 w-8 text-vibe-link" aria-hidden="true" />
            <DialogTitle className="mb-3 font-display text-4xl uppercase leading-[0.88] tracking-[-0.005em]">
              {successMessage}
            </DialogTitle>
            <DialogDescription className="mb-4 text-base text-muted-foreground">
              You&apos;ll get the weekly VibeStack newsletter.
            </DialogDescription>
            <Button onClick={() => setIsVisible(false)} variant="outline" className="rounded-none">
              Continue Browsing
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
