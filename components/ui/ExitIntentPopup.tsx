"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Download, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface ExitIntentPopupProps {
  toolSlug?: string;
  toolName?: string;
}

export function ExitIntentPopup({ toolSlug, toolName }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const sessionShown = sessionStorage.getItem("exit_intent_shown");
    if (sessionShown) {
      setHasShown(true);
      return;
    }

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
    
    if (!email || !email.includes("@")) return;

    try {
      await fetch("/api/analytics/email-capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          source: "exit_intent",
          toolSlug: toolSlug || null,
          metadata: toolName ? JSON.stringify({ toolName }) : null
        })
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error capturing email:", error);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
          >
            <Card className="relative overflow-hidden border-indigo-500/20">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <CardContent className="p-8">
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                        <Gift className="w-8 h-8 text-indigo-500" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Wait! Don&apos;t Miss Out
                      </h3>
                      <p className="text-muted-foreground">
                        {toolName ? (
                          <>Get notified when <strong>{toolName}</strong> offers a discount</>
                        ) : (
                          <>Get our exclusive <strong>2026 AI Tools Buying Guide</strong> for free</>
                        )}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-12 rounded-full"
                        size="lg"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {toolName ? "Get Discount Alerts" : "Get Free Guide"}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        No spam, unsubscribe anytime. Join 15,000+ developers.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">You&apos;re In!</h3>
                    <p className="text-muted-foreground mb-4">
                      Check your inbox for the confirmation email.
                    </p>
                    <Button onClick={handleClose} variant="outline" className="rounded-full">
                      Continue Browsing
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}