"use client";

import { useCallback, useState, useEffect, RefObject } from "react";
import { useReducedMotion } from "framer-motion";

// VibeStack Micro-interaction Hook
interface UseVibeInteractionsOptions {
  enableTilt?: boolean;
  enableGlow?: boolean;
  enableMagnetic?: boolean;
  tiltStrength?: number;
  magneticStrength?: number;
}

export function useVibeInteractions(
  ref: RefObject<HTMLElement>,
  options: UseVibeInteractionsOptions = {}
) {
  const {
    enableTilt = true,
    enableGlow = true,
    enableMagnetic = false,
    tiltStrength = 10,
    magneticStrength = 0.3,
  } = options;

  const [transform, setTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || shouldReduceMotion) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate normalized position (-0.5 to 0.5)
      const normalizedX = (e.clientX - centerX) / rect.width;
      const normalizedY = (e.clientY - centerY) / rect.height;

      if (enableTilt) {
        setTransform({
          x: enableMagnetic ? normalizedX * magneticStrength * 20 : 0,
          y: enableMagnetic ? normalizedY * magneticStrength * 20 : 0,
          rotateX: -normalizedY * tiltStrength,
          rotateY: normalizedX * tiltStrength,
        });
      }

      if (enableGlow) {
        setGlowPosition({
          x: (normalizedX + 0.5) * 100,
          y: (normalizedY + 0.5) * 100,
        });
      }
    },
    [ref, enableTilt, enableGlow, enableMagnetic, tiltStrength, magneticStrength, shouldReduceMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
    setGlowPosition({ x: 50, y: 50 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return {
    transform,
    glowPosition,
    isHovered,
  };
}

// Hook for text scramble effect
interface UseTextScrambleOptions {
  duration?: number;
  speed?: number;
  chars?: string;
}

export function useTextScramble(
  targetText: string,
  options: UseTextScrambleOptions = {}
) {
  const { duration = 1000, speed = 30, chars = "!@#$%^&*()_+-=[]{}|;:,.<>?" } = options;
  const [displayText, setDisplayText] = useState(targetText);
  const [isScrambling, setIsScrambling] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const scramble = useCallback(() => {
    if (shouldReduceMotion) {
      setDisplayText(targetText);
      return;
    }

    setIsScrambling(true);
    const startTime = Date.now();
    const maxIterations = targetText.length * 5;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealIndex = Math.floor(progress * targetText.length);

      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < revealIndex) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (progress >= 1) {
        clearInterval(interval);
        setDisplayText(targetText);
        setIsScrambling(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, duration, speed, chars, shouldReduceMotion]);

  return { displayText, isScrambling, scramble };
}

// Hook for spotlight effect
interface UseSpotlightOptions {
  enabled?: boolean;
}

export function useSpotlight(
  ref: RefObject<HTMLElement>,
  options: UseSpotlightOptions = {}
) {
  const { enabled = true } = options;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, enabled]);

  return { position, isVisible };
}

// Hook for animated counter
interface UseAnimatedCounterOptions {
  duration?: number;
  delay?: number;
}

export function useAnimatedCounter(
  targetValue: number,
  options: UseAnimatedCounterOptions = {}
) {
  const { duration = 2000, delay = 0 } = options;
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(targetValue);
      setIsComplete(true);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime - delay;

      if (elapsed < 0) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOut * targetValue);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
        setIsComplete(true);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetValue, duration, delay, shouldReduceMotion]);

  return { count, isComplete };
}

// Hook for scroll progress
interface UseScrollProgressOptions {
  threshold?: number;
}

export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const { threshold = 0 } = options;
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollTop / docHeight, 1);
      setProgress(scrollProgress);
      setIsInView(scrollProgress > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { progress, isInView };
}

// Hook for staggered children animation
interface UseStaggerOptions {
  staggerDelay?: number;
  baseDelay?: number;
}

export function useStagger(
  itemCount: number,
  options: UseStaggerOptions = {}
) {
  const { staggerDelay = 0.1, baseDelay = 0 } = options;

  const getStaggerProps = useCallback(
    (index: number) => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        delay: baseDelay + index * staggerDelay,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    [baseDelay, staggerDelay]
  );

  return { getStaggerProps };
}

// Pre-defined motion variants for common patterns
export const vibeMotionVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  cardHover: {
    rest: { y: 0, boxShadow: "0 0 0 rgba(0, 217, 255, 0)" },
    hover: { 
      y: -4, 
      boxShadow: "0 20px 40px rgba(0, 217, 255, 0.15)",
    },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  buttonTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
  glow: {
    animate: {
      boxShadow: [
        "0 0 20px rgba(0, 217, 255, 0.3)",
        "0 0 40px rgba(0, 217, 255, 0.5)",
        "0 0 20px rgba(0, 217, 255, 0.3)",
      ],
    },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

// Utility function to combine multiple motion props
export function combineMotionProps(...props: any[]) {
  return props.reduce((acc, prop) => ({
    initial: { ...acc.initial, ...prop.initial },
    animate: { ...acc.animate, ...prop.animate },
    transition: { ...acc.transition, ...prop.transition },
  }), { initial: {}, animate: {}, transition: {} });
}
