export const designSystem = {
    colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted-foreground)",
    },
    animations: {
        // Standard fade-in-up for entering elements
        fadeInUp: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        },
        // Stagger children
        staggerContainer: {
            animate: {
                transition: {
                    staggerChildren: 0.1
                }
            }
        },
        // Hover effect for cards
        cardHover: {
            hover: {
                y: -4,
                scale: 1.01,
                transition: { duration: 0.2, ease: "easeOut" }
            }
        },
        // The fancy ease curve from Hero
        elegantEase: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
};

// Re-export common motion props for quick usage
export const motionProps = {
    fadeInUp: designSystem.animations.fadeInUp,
    stagger: designSystem.animations.staggerContainer,
};
