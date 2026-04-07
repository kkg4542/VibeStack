"use client";

import { useReducedMotion } from "framer-motion";

/**
 * A subtle SVG-based noise/grain overlay for adding texture to the UI.
 * This helps break the "flat digital" look and adds a premium material feel.
 */
export function GrainOverlay() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-1 overflow-hidden opacity-[0.035] dark:opacity-[0.05] bg-noise"
      aria-hidden="true"
      style={{
        mixBlendMode: "overlay",
        // Disable animation if user prefers reduced motion
        animation: shouldReduceMotion ? "none" : "noise 0.2s steps(2) infinite",
      }}
    >
      <style jsx>{`
        @keyframes noise {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
          100% { transform: translate(5%, 0); }
        }
      `}</style>
    </div>
  );
}
