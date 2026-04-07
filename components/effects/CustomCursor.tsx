"use client";

import { useEffect, useState, useRef } from "react";
import { m, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

/**
 * A custom reactive cursor that follows the mouse with spring physics.
 * Adapts to hover states for links, buttons, and specific interactive elements.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Motion values for smooth cursor movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for "creamy" feel
  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const sprX = useSpring(mouseX, springConfig);
  const sprY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);

      // Check current hover target
      const target = e.target as HTMLElement;
      const isTargetPointer = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest("a") || 
        target.closest("button") ||
        target.hasAttribute("data-cursor-pointer");
        
      setIsPointer(!!isTargetPointer);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Outer Glow / Ring */}
      <m.div
        className="absolute w-10 h-10 rounded-full border border-vibe-electric/30 bg-vibe-electric/5 backdrop-blur-[2px]"
        style={{
          x: sprX,
          y: sprY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
          borderColor: isPointer ? "rgba(0, 217, 255, 0.6)" : "rgba(0, 217, 255, 0.3)",
        }}
      />
      
      {/* Inner Dot */}
      <m.div
        className="absolute w-1.5 h-1.5 rounded-full bg-vibe-electric shadow-[0_0_10px_rgba(0,217,255,0.8)]"
        style={{
          x: sprX,
          y: sprY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 1.2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  );
}
