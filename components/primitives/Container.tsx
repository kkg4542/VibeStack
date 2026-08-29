import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  // width order: xs < prose < small < md < default < large < full
  size?: "xs" | "prose" | "small" | "md" | "default" | "large" | "full";
}

const sizeClasses = {
  xs: "max-w-2xl",
  prose: "max-w-3xl",
  small: "max-w-4xl",
  md: "max-w-5xl",
  default: "max-w-6xl",
  large: "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
