import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "small" | "default" | "large" | "none";
  container?: boolean;
  containerSize?: "default" | "small" | "large" | "full";
  id?: string;
}

const spacingClasses = {
  none: "",
  small: "py-12 md:py-16",
  default: "py-16 md:py-24",
  large: "py-24 md:py-32",
};

export function Section({
  children,
  className,
  spacing = "default",
  container = true,
  containerSize = "default",
  id,
}: SectionProps) {
  const content = container ? (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerSize === "small" && "max-w-4xl",
        containerSize === "default" && "max-w-6xl",
        containerSize === "large" && "max-w-7xl",
        containerSize === "full" && "max-w-full"
      )}
    >
      {children}
    </div>
  ) : (
    children
  );

  return (
    <section id={id} className={cn(spacingClasses[spacing], className)}>
      {content}
    </section>
  );
}
