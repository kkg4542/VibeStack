"use client";

import { motion } from "framer-motion";
import { designSystem } from "@/lib/design-system";

interface PageHeaderProps {
    title: string;
    description?: string;
    centered?: boolean;
}

export function PageHeader({ title, description, centered = true }: PageHeaderProps) {
    return (
        <div className={`mb-12 ${centered ? "text-center" : "text-left"}`}>
            <motion.h1
                initial={designSystem.animations.fadeInUp.initial}
                animate={designSystem.animations.fadeInUp.animate}
                transition={designSystem.animations.fadeInUp.transition}
                className="text-4xl font-bold tracking-tight mb-4 text-foreground sm:text-5xl"
            >
                {title}
            </motion.h1>
            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        ...designSystem.animations.fadeInUp.transition,
                        delay: 0.1
                    }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                >
                    {description}
                </motion.p>
            )}
        </div>
    );
}
