
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const searchContainerVariants = cva("relative", {
    variants: {
        variant: {
            default: "",
            hero: "w-full",
            mobile: "w-full",
            compact: "",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

const searchInputVariants = cva("", {
    variants: {
        variant: {
            default:
                "h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            hero:
                "w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/40 border border-border text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm backdrop-blur-sm",
            mobile:
                "w-full pl-10 pr-4 py-5 rounded-xl bg-secondary/50 border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
            compact:
                "h-9 w-full rounded-md border border-input bg-background/50 pl-9 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

const searchIconVariants = cva(
    "absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",
    {
        variants: {
            variant: {
                default: "left-3 w-4 h-4",
                hero: "left-4 w-5 h-5",
                mobile: "left-3 w-4 h-4",
                compact: "left-2.5 w-4 h-4",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export type SearchInputVariantProps = VariantProps<typeof searchInputVariants>

export interface SearchInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    SearchInputVariantProps {
    iconClassName?: string
    containerClassName?: string
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps & { children?: React.ReactNode }>(
    ({ className, containerClassName, iconClassName, variant = "default", type, children, ...props }, ref) => {
        return (
            <div className={cn(searchContainerVariants({ variant }), containerClassName)}>
                <Search className={cn(searchIconVariants({ variant }), iconClassName)} />
                <input
                    type={type}
                    className={cn(searchInputVariants({ variant }), className)}
                    ref={ref}
                    {...props}
                />
                {children}
            </div>
        )
    }
)
SearchInput.displayName = "SearchInput"

export { SearchInput, searchInputVariants }
