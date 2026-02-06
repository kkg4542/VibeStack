"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

type Category = "All" | "Coding" | "Design" | "Management" | "Productivity" | "Assistance";

const categories: Category[] = ["All", "Coding", "Design", "Management", "Productivity", "Assistance"];

interface CategoryFilterProps {
    onCategoryChange?: (category: Category) => void;
}

export function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
    const [selected, setSelected] = useState<Category>("All");

    const handleCategoryClick = (category: Category) => {
        setSelected(category);
        onCategoryChange?.(category);
    };

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category, index) => (
                <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <Badge
                        variant={selected === category ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 text-sm transition-all ${selected === category
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                : "hover:bg-accent"
                            }`}
                        onClick={() => handleCategoryClick(category)}
                        role="button"
                        aria-label={`Filter by ${category} category`}
                        aria-pressed={selected === category}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleCategoryClick(category);
                            }
                        }}
                    >
                        {category}
                    </Badge>
                </motion.div>
            ))}
        </div>
    );
}
