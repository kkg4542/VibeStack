export const designSystem = {

    animations: {
        // Standard rise-in for entering elements. Starts fully opaque so
        // content is visible in the SSR HTML and with JS off; only the
        // translate animates.
        fadeInUp: {
            initial: { opacity: 1, y: 20 },
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
        // Text reveal: translate only (no blur, never an opacity:0 start)
        textReveal: {
            initial: { opacity: 1, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        },

        // 3D Card tilt entrance
        card3D: {
            initial: { opacity: 1, rotateX: 15, y: 50 },
            animate: { opacity: 1, rotateX: 0, y: 0 },
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },

        // Glow pulse animation
        glowPulse: {
            animate: {
                // Direction B: no glow. A constant solid 1px orange ring.
                boxShadow: [
                    '0 0 0 1px #ff4a1f',
                    '0 0 0 1px #ff4a1f',
                    '0 0 0 1px #ff4a1f'
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
            initial: { scale: 0.96, opacity: 1 },
            animate: { scale: 1, opacity: 1 },
            transition: { type: 'spring', stiffness: 400, damping: 17 }
        },

        // Slide in from various directions
        slideIn: {
            left: {
                initial: { x: -50, opacity: 1 },
                animate: { x: 0, opacity: 1 },
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            },
            right: {
                initial: { x: 50, opacity: 1 },
                animate: { x: 0, opacity: 1 },
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            },
            up: {
                initial: { y: 50, opacity: 1 },
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
                boxShadow: 'none',
                borderColor: '#33353a'
            },
            hover: { 
                y: -4, 
                boxShadow: 'none',
                borderColor: '#ff4a1f'
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
    // Direction B: graphite + one safety-orange accent. Legacy keys are kept
    // and mapped onto the new palette so nothing renders neon.
    colors: {
        electric: '#ff4a1f', // the one accent
        neon: '#ff4a1f',
        deep: '#18191b', // ground / text on orange
        obsidian: '#222427', // surface
        cyan: '#ff4a1f',
        purple: '#ff7a4d',
        pink: '#ff4a1f',
        glow: 'rgba(255, 74, 31, 0.1)',
        slate: '#9c9ea3', // muted
    },

    // VibeStack Easing & Motion Physics
    motion: {
        spring: {
            stiff: { type: 'spring' as const, stiffness: 400, damping: 30 },
            snappy: { type: 'spring' as const, stiffness: 500, damping: 25 },
            gentle: { type: 'spring' as const, stiffness: 100, damping: 15 },
            loose: { type: 'spring' as const, stiffness: 50, damping: 20 },
        },
        physics: {
            hover: {
                y: -4,
                scale: 1.02,
                transition: { type: 'spring' as const, stiffness: 400, damping: 17 }
            },
            magical: {
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
            }
        }
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
    },

    // Standardized spacing patterns
    spacing: {
        section: 'mb-20',
        sectionLarge: 'mb-24',
        container: 'max-w-6xl',
        containerSmall: 'max-w-5xl',
        heroPadding: 'py-16 md:py-24',
        contentPadding: 'py-24 md:py-32',
    },

    // Standardized gradient classes
    // Direction B has no gradients. Keys kept; each is one flat class.
    gradients: {
        // Accent fill (pair with text-vibe-deep)
        primary: 'bg-vibe-electric',
        // Accent as text (#ff4a1f dark / #b93a16 light)
        text: 'text-vibe-link',
        // Section background
        background: 'bg-background',
        // Card surface
        card: 'bg-card',
    },

    // Typography hierarchy
    typography: {
        hero: 'text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-[-0.005em] leading-[0.9] text-balance',
        section: 'text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-[-0.005em] leading-[0.9] text-balance',
        cardTitle: 'text-xl font-extrabold tracking-[-0.02em] leading-tight',
        subtitle: 'text-lg text-muted-foreground leading-relaxed',
        body: 'text-base text-muted-foreground',
    },

    // Badge styles
    badges: {
        primary: 'bg-secondary text-vibe-link',
        secondary: 'bg-secondary text-foreground',
        accent: 'bg-vibe-electric text-vibe-deep',
    },

    // Card variants
    cards: {
        default: 'bg-card border-border transition-colors duration-200',
        highlighted: 'border-vibe-electric',
        interactive: 'bg-card border-border hover:bg-accent transition-colors duration-200',
    },

    // Background presets
    backgrounds: {
        grid: 'bg-background',
        gradientOrbs: 'bg-background',
        glass: 'bg-card',
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
        // Direction B: no glow. A constant solid 1px orange ring.
        boxShadow: [
            '0 0 0 1px #ff4a1f',
            '0 0 0 1px #ff4a1f',
            '0 0 0 1px #ff4a1f'
        ]
    },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
};
