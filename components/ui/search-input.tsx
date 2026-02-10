
import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SearchInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "default" | "hero" | "mobile" | "compact"
    iconClassName?: string
    containerClassName?: string
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps & { children?: React.ReactNode }>(
    ({ className, containerClassName, iconClassName, variant = "default", type, children, ...props }, ref) => {

        // Variant styles
        const variants = {
            default: {
                container: "",
                input: "h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                icon: "left-3 w-4 h-4"
            },
            hero: {
                container: "w-full",
                input: "w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-border text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm",
                icon: "left-4 w-5 h-5"
            },
            mobile: {
                container: "w-full",
                input: "w-full pl-10 pr-4 py-5 rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                icon: "left-3 w-4 h-4"
            },
            compact: {
                container: "",
                input: "h-9 w-full rounded-md border border-input bg-background/50 pl-9 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                icon: "left-2.5 w-4 h-4"
            }
        }

        const currentVariant = variants[variant]

        return (
            <div className={cn("relative", containerClassName, currentVariant.container)}>
                <Search
                    className={cn(
                        "absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",
                        currentVariant.icon,
                        iconClassName
                    )}
                />
                <input
                    type={type}
                    className={cn(
                        currentVariant.input,
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {children}
            </div>
        )
    }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
