"use client";

import { m } from "framer-motion";
import { ReactNode } from "react";
import { designSystem } from "@/lib/design-system";

interface PageHeroProps {
  badge?: {
    text: string;
    icon?: ReactNode;
  };
  title: string;
  highlightText?: string;
  subtitle?: string;
  children?: ReactNode;
  centered?: boolean;
}

export function PageHero({
  badge,
  title,
  highlightText,
  subtitle,
  children,
  centered = true,
}: PageHeroProps) {
  const fadeInUp = designSystem.animations.fadeInUp;

  return (
    <m.div
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={fadeInUp.transition}
      className={`${centered ? 'text-center' : ''} mb-16`}
    >
      {badge && (
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${designSystem.badges.primary} text-sm font-medium mb-6 backdrop-blur-sm`}
        >
          {badge.icon}
          <span>{badge.text}</span>
        </m.div>
      )}

      <h1 className={`${designSystem.typography.hero} mb-6 ${centered ? 'max-w-4xl mx-auto' : ''}`}>
        {title}{" "}
        {highlightText && (
          <span className={`bg-clip-text text-transparent bg-linear-to-r ${designSystem.gradients.text}`}>
            {highlightText}
          </span>
        )}
      </h1>

      {subtitle && (
        <m.p
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className={`${designSystem.typography.subtitle} ${centered ? 'max-w-3xl mx-auto' : ''} mb-8`}
        >
          {subtitle}
        </m.p>
      )}

      {children}
    </m.div>
  );
}

// Standardized CTA Button component
interface CTAButtonProps {
  size?: 'large' | 'medium' | 'small';
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
  className?: string;
}

export function CTAButton({ 
  size = 'medium', 
  variant = 'primary', 
  children,
  className = '' 
}: CTAButtonProps) {
  const sizeClass = designSystem.buttons[size];
  
  const variantClasses = {
    primary: 'bg-linear-to-r from-vibe-electric to-vibe-cyan hover:shadow-lg hover:shadow-vibe-electric/30 text-white',
    secondary: 'bg-secondary hover:bg-secondary/80',
    outline: 'border border-border/50 hover:border-vibe-electric/50 hover:bg-vibe-electric/5',
  };

  return (
    <button
      className={`${sizeClass} ${variantClasses[variant]} font-semibold transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

// Standardized Section Header
interface SectionHeaderProps {
  badge?: {
    text: string;
    icon?: ReactNode;
  };
  title: string;
  highlightText?: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  badge,
  title,
  highlightText,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} max-w-3xl ${centered ? 'mx-auto' : ''} mb-12`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${designSystem.badges.primary} text-sm font-medium mb-4`}>
          {badge.icon}
          <span>{badge.text}</span>
        </div>
      )}
      
      <h2 className={`${designSystem.typography.section} mb-4`}>
        {title}{" "}
        {highlightText && (
          <span className={`text-transparent bg-clip-text bg-linear-to-r ${designSystem.gradients.text}`}>
            {highlightText}
          </span>
        )}
      </h2>
      
      {subtitle && (
        <p className={designSystem.typography.subtitle}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
