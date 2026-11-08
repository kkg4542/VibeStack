import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "vibe" | "neon" | "cyan" | "purple" | "sunset" | "custom";
  customColors?: string;
  animate?: boolean;
}

// Direction B has no gradient text. The name, props and variants are kept so
// call sites compile, but every variant renders solid accent-as-text
// (--color-vibe-link: #ff4a1f on dark, #b93a16 on light). `animate` is
// accepted and ignored; `customColors` is still appended for callers that
// pass a text colour class.
const textVariants = {
  vibe: "text-vibe-link",
  neon: "text-vibe-link",
  cyan: "text-vibe-link",
  purple: "text-vibe-link",
  sunset: "text-vibe-link",
  custom: "",
};

export function GradientText({
  children,
  className,
  variant = "vibe",
  customColors,
}: GradientTextProps) {
  return (
    <span className={cn(textVariants[variant], customColors, className)}>
      {children}
    </span>
  );
}
