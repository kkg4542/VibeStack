import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "small" | "default" | "large" | "none";
  container?: boolean;
  // width order: xs < prose < small < md < default < large < full
  containerSize?: "xs" | "prose" | "small" | "md" | "default" | "large" | "full";
  id?: string;
}

const spacingClasses = {
  none: "",
  small: "py-12 md:py-16",
  default: "py-16 md:py-24",
  large: "py-24 md:py-32",
};

// width order: xs < prose < small < md < default < large < full
const containerSizeClasses = {
  xs: "max-w-2xl",
  prose: "max-w-3xl",
  small: "max-w-4xl",
  md: "max-w-5xl",
  default: "max-w-6xl",
  large: "max-w-7xl",
  full: "max-w-full",
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
        containerSizeClasses[containerSize]
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
