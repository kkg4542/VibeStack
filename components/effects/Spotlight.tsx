"use client";

// Direction B (graphite + safety orange) paints no cursor-following glow.
// These wrappers keep their export names and props so callers compile, but
// they are layout-only now: no radial gradients, no indigo tint, no blur.

interface SpotlightProps {
    children: React.ReactNode;
    className?: string;
    /** Accepted for API compatibility; no longer painted. */
    size?: number;
    /** Accepted for API compatibility; no longer painted. */
    color?: string;
}

export function Spotlight({
    children,
    className = "",
}: SpotlightProps) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// Background spotlight: layout wrapper only
export function BackgroundSpotlight({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`relative ${className}`}>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// Card spotlight: a flat surface tone step (no glow layer)
export function CardSpotlight({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`relative overflow-hidden rounded-none bg-card ${className}`}>
            <div className="relative z-10 h-full">{children}</div>
        </div>
    );
}
