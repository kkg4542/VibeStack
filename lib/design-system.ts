export const designSystem = {

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
    },

    // VibeStack Signature Animations
    vibeAnimations: {
        // Text reveal with scramble effect
        textReveal: {
            initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
            animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        },

        // 3D Card tilt entrance
        card3D: {
            initial: { opacity: 0, rotateX: 15, y: 50 },
            animate: { opacity: 1, rotateX: 0, y: 0 },
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },

        // Glow pulse animation
        glowPulse: {
            animate: {
                boxShadow: [
                    '0 0 20px rgba(0, 217, 255, 0.3)',
                    '0 0 40px rgba(0, 217, 255, 0.5)',
                    '0 0 20px rgba(0, 217, 255, 0.3)'
                ],
                transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
        },

        // Float animation
        float: {
            animate: {
                y: [0, -20, 0],
                transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
            }
        },

        // Scale up with bounce
        scaleBounce: {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { type: 'spring', stiffness: 400, damping: 17 }
        },

        // Slide in from various directions
        slideIn: {
            left: {
                initial: { x: -50, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            },
            right: {
                initial: { x: 50, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            },
            up: {
                initial: { y: 50, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }
        }
    },

    // VibeStack Micro-interactions
    interactions: {
        // Button interactions
        button: {
            rest: { scale: 1 },
            hover: { scale: 1.02 },
            tap: { scale: 0.98 },
            transition: { type: 'spring', stiffness: 400, damping: 17 }
        },

        // Card interactions
        card: {
            rest: { 
                y: 0, 
                boxShadow: '0 0 0 rgba(0, 217, 255, 0)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
            },
            hover: { 
                y: -4, 
                boxShadow: '0 20px 40px rgba(0, 217, 255, 0.15)',
                borderColor: 'rgba(0, 217, 255, 0.3)'
            },
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
        },

        // Link hover
        link: {
            rest: { opacity: 0.7 },
            hover: { opacity: 1 },
            transition: { duration: 0.2 }
        },

        // Icon interactions
        icon: {
            rotate: {
                rest: { rotate: 0 },
                hover: { rotate: 180 },
                transition: { duration: 0.5 }
            },
            bounce: {
                hover: { y: [0, -4, 0] },
                transition: { duration: 0.3 }
            },
            pulse: {
                animate: { scale: [1, 1.1, 1] },
                transition: { duration: 0.2 }
            }
        }
    },

    // VibeStack Brand Colors
    colors: {
        electric: '#00d9ff',
        neon: '#ff00ff',
        deep: '#0a0a1a',
        cyan: '#00f0ff',
        purple: '#b829dd',
        pink: '#ff006e',
        glow: 'rgba(0, 217, 255, 0.15)'
    },

    // VibeStack Easing Functions
    easings: {
        vibe: [0.16, 1, 0.3, 1] as [number, number, number, number],
        bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
        smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
        snappy: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
    },

    // VibeStack Durations
    durations: {
        micro: 0.15,
        fast: 0.2,
        normal: 0.3,
        smooth: 0.4,
        slow: 0.6,
        dramatic: 0.8
    }
};

// Re-export common motion props for quick usage
export const motionProps = {
    fadeInUp: designSystem.animations.fadeInUp,
    stagger: designSystem.animations.staggerContainer,
    vibeCard: designSystem.interactions.card,
    vibeButton: designSystem.interactions.button,
    textReveal: designSystem.vibeAnimations.textReveal,
};

// Helper function to get staggered transition delays
export const getStaggerDelay = (index: number, baseDelay: number = 0.1) => ({
    transition: { delay: index * baseDelay }
});

// Helper function to create 3D tilt transform
export const createTiltTransform = (x: number, y: number, strength: number = 10) => ({
    rotateX: -y * strength,
    rotateY: x * strength,
});

// Helper function for glow animation config
export const glowAnimation = {
    animate: {
        boxShadow: [
            '0 0 20px rgba(0, 217, 255, 0.3)',
            '0 0 40px rgba(0, 217, 255, 0.5)',
            '0 0 20px rgba(0, 217, 255, 0.3)'
        ]
    },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
};
