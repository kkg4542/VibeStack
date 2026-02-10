"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal, Play } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";
import { designSystem } from "@/lib/design-system";

const headlines = [
  { text: "Find Your Perfect", highlight: "AI Stack" },
  { text: "Build 10x Faster with", highlight: "Vibe Coding" },
  { text: "Curated Tools for", highlight: "Modern Builders" },
  { text: "Stop Searching.", highlight: "Start Building." },
];

const scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export function VibeHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(headlines[0].highlight);
  const [isScrambling, setIsScrambling] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const elegantEase = designSystem.animations.elegantEase;

  // Text scramble effect
  const scrambleText = useCallback((targetText: string) => {
    if (shouldReduceMotion) {
      setDisplayText(targetText);
      return;
    }

    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = targetText.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 3) {
              return targetText[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("")
      );

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(targetText);
        setIsScrambling(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Rotate headlines
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % headlines.length;
        scrambleText(headlines[nextIndex].highlight);
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [scrambleText]);

  const currentHeadline = headlines[currentIndex];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-20">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />

        {/* Animated gradient orbs */}
        <m.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, transparent 70%)",
          }}
          animate={shouldReduceMotion ? {} : {
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <m.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 0, 255, 0.1) 0%, transparent 70%)",
          }}
          animate={shouldReduceMotion ? {} : {
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <m.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(184, 41, 221, 0.08) 0%, transparent 70%)",
          }}
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center max-w-5xl mx-auto">
        {/* Animated Badge */}
        <m.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: elegantEase }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vibe-electric opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-vibe-electric" />
          </span>
          <span className="text-sm text-white/70 font-medium">Built with Vibe Coding</span>
        </m.div>

        {/* Rotating Headline with Scramble Effect */}
        <div className="space-y-2">
          <m.div
            key={`text-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: elegantEase }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground/80"
          >
            {currentHeadline.text}
          </m.div>

          <div className="h-24 md:h-32 flex items-center justify-center overflow-visible">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-vibe-electric via-vibe-cyan to-vibe-neon pb-4"
              aria-live="polite"
              aria-atomic="true"
            >
              {displayText}
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: elegantEase }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Stop searching for tools. Start using proven workflows.
          <br className="hidden md:block" />
          Curated AI stacks for developers, designers, and creators.
        </m.p>

        {/* Terminal-style Command Input */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: elegantEase }}
          className="w-full max-w-2xl mt-4"
        >
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-vibe-electric via-vibe-cyan to-vibe-neon rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />

            {/* Terminal window */}
            <div className="relative terminal-window">
              {/* Terminal header */}
              <div className="terminal-header">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
                <span className="ml-2 text-xs text-white/40 font-mono">vibestack — zsh</span>
              </div>

              {/* Terminal body */}
              <div className="terminal-body text-left">
                <div className="flex items-center gap-2">
                  <span className="text-vibe-electric">$</span>
                  <span className="text-white/50">vibestack</span>
                  <span className="text-white ml-1">init</span>
                  <span className="w-2 h-5 bg-vibe-electric/50 ml-1 cursor-blink" />
                </div>
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="mt-2 text-sm text-white/40"
                >
                  → Initializing your perfect AI stack...
                </m.div>
              </div>
            </div>
          </div>
        </m.div>

        {/* CTA Buttons */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: elegantEase }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <MagneticButton strength={0.15}>
            <Link
              id="hero-cta-build"
              href="/build"
              className={buttonVariants({ variant: "default", size: "lg" }) +
                " h-14 px-10 text-base font-semibold rounded-full " +
                "bg-linear-to-r from-vibe-electric to-vibe-cyan " +
                "hover:shadow-lg hover:shadow-vibe-electric/30 " +
                "transition-all duration-300 group"
              }
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Find My Stack
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.15}>
            <Link
              id="hero-cta-tools"
              href="/tools"
              className={buttonVariants({ variant: "outline", size: "lg" }) +
                " h-14 px-10 text-base font-semibold rounded-full " +
                "border-white/20 bg-white/5 backdrop-blur-md " +
                "hover:bg-white/10 hover:border-white/30 " +
                "transition-all duration-300"
              }
            >
              <Play className="mr-2 h-4 w-4" />
              Explore Tools
            </Link>
          </MagneticButton>
        </m.div>

        {/* Social Proof */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-4 mt-8 text-sm text-muted-foreground"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-vibe-electric/30 to-vibe-neon/30 border-2 border-background flex items-center justify-center text-xs font-medium"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span>Trusted by <strong className="text-foreground">2,000+</strong> developers</span>
        </m.div>
      </div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <m.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-white/40 rounded-full"
          />
        </m.div>
      </m.div>
    </section>
  );
}
