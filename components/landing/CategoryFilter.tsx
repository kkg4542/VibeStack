"use client";

import { useState } from "react";

type Category = "All" | "Coding" | "Design" | "Management" | "Productivity" | "Assistance";

const categories: Category[] = ["All", "Coding", "Design", "Management", "Productivity", "Assistance"];

interface CategoryFilterProps {
    onCategoryChange?: (category: Category) => void;
}

/**
 * Direction B filter chips: square, flat. The selected chip is an orange
 * field with dark text; the rest sit on `bg-card`. No entrance animation, so
 * the chips are visible in the server HTML.
 */
export function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
    const [selected, setSelected] = useState<Category>("All");

    const handleCategoryClick = (category: Category) => {
        setSelected(category);
        onCategoryChange?.(category);
    };

    return (
        <div className="mb-8 flex flex-wrap justify-center gap-1">
            {categories.map((category) => (
                <button
                    key={category}
                    type="button"
                    className={`cursor-pointer rounded-none px-4 py-2.5 text-[16px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link motion-reduce:transition-none ${selected === category
                            ? "bg-vibe-electric text-vibe-deep"
                            : "bg-card text-foreground hover:bg-secondary"
                        }`}
                    onClick={() => handleCategoryClick(category)}
                    aria-label={`Filter by ${category} category`}
                    aria-pressed={selected === category}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
