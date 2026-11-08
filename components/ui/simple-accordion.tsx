"use client";

import * as React from "react";
import { m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
    children: React.ReactNode;
    className?: string;
    defaultOpen?: boolean;
}

export function Accordion({ children, className }: AccordionProps) {
    return <div className={cn("space-y-2", className)}>{children}</div>;
}

interface AccordionItemProps {
    children: React.ReactNode;
    value: string;
    className?: string;
}

export function AccordionItem({ children, className }: AccordionItemProps) {
    return (
        <div className={cn("rounded-none bg-card overflow-hidden", className)}>
            {children}
        </div>
    );
}

interface AccordionTriggerProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    isOpen?: boolean;
}

// Note: This is a simplified Accordion for our specific use case. 
// For full accessibility, we'd want to manage state in the parent or use Context.
// Since we are using this for "Mobile Only" sections that are open on desktop (different layout), 
// we will control state locally or let the user toggle.

export function SimpleAccordionItem({ title, children, defaultOpen = false, icon }: { title: string, children: React.ReactNode, defaultOpen?: boolean, icon?: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
        <div className="rounded-none bg-card overflow-hidden mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-4 text-left font-medium transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="text-vibe-link">
                            {icon}
                        </div>
                    )}
                    <span className="text-lg font-semibold">{title}</span>
                </div>
                <ChevronDown
                    className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </button>
            <m.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className="p-4 pt-0 text-muted-foreground">
                    {children}
                </div>
            </m.div>
        </div>
    );
}
