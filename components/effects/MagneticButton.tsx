"use client";

import { useRef, useState } from "react";
import { m } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
}

// Magnetic button that pulls towards cursor
export function MagneticButton({
    children,
    className = "",
    strength = 0.3,
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - left - width / 2) * strength;
        const y = (clientY - top - height / 2) * strength;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <m.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
            className={className}
        >
            {children}
        </m.button>
    );
}

// Magnetic wrapper for any element
export function MagneticWrapper({
    children,
    className = "",
    strength = 0.3,
}: {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - left - width / 2) * strength;
        const y = (clientY - top - height / 2) * strength;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <m.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
            className={className}
        >
            {children}
        </m.div>
    );
}

// Magnetic link with underline animation
export function MagneticLink({
    children,
    href,
    className = "",
    strength = 0.2,
}: {
    children: React.ReactNode;
    href: string;
    className?: string;
    strength?: number;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - left - width / 2) * strength;
        const y = (clientY - top - height / 2) * strength;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <m.a
            ref={ref}
            href={href}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
            className={`relative inline-block ${className}`}
        >
            {children}
        </m.a>
    );
}

// Magnetic card with scale effect
export function MagneticCard({
    children,
    className = "",
    strength = 0.2,
}: {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - left - width / 2) * strength;
        const y = (clientY - top - height / 2) * strength;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <m.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            animate={{
                x: position.x,
                y: position.y,
                scale: isHovered ? 1.02 : 1,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
            className={className}
        >
            {children}
        </m.div>
    );
}

// Magnetic button with shine effect
export function MagneticShineButton({
    children,
    className = "",
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [shinePosition, setShinePosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - left - width / 2) * 0.2;
        const y = (clientY - top - height / 2) * 0.2;

        setPosition({ x, y });
        setShinePosition({
            x: ((clientX - left) / width) * 100,
            y: ((clientY - top) / height) * 100,
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <m.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
            className={`relative overflow-hidden ${className}`}
            style={{
                background: `radial-gradient(circle at ${shinePosition.x}% ${shinePosition.y}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            }}
        >
            <span className="relative z-10">{children}</span>
        </m.button>
    );
}
