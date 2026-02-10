import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "vibe" | "neon" | "cyan" | "purple" | "sunset" | "custom";
  customColors?: string;
  animate?: boolean;
}

const gradientVariants = {
  vibe: "from-vibe-electric via-vibe-cyan to-vibe-neon",
  neon: "from-vibe-neon to-vibe-purple",
  cyan: "from-cyan-400 to-blue-600",
  purple: "from-vibe-purple to-indigo-600",
  sunset: "from-orange-400 via-pink-500 to-purple-600",
  custom: "",
};

export function GradientText({
  children,
  className,
  variant = "vibe",
  customColors,
  animate = false,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-linear-to-r",
        gradientVariants[variant],
        customColors,
        animate && "bg-[length:300%_100%] animate-gradient-shift",
        className
      )}
    >
      {children}
    </span>
  );
}
