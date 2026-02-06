"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Laptop, Moon, Sun, Search, Sparkles, FileText, Wand2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { tools } from "@/lib/tools"

export function CommandMenu({ ...props }: DialogProps) {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                className={cn(
                    "relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 text-muted-foreground hover:bg-white/5 hover:text-foreground md:flex",
                )}
                onClick={() => setOpen(true)}
                aria-label="Search tools (Cmd+K)"
                {...props}
            >
                <Search className="h-4 w-4 xl:mr-2" />
                <span className="hidden xl:inline-flex">Search tools...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="General">
                        <CommandItem
                            onSelect={() => {
                                runCommand(() => router.push("/"))
                            }}
                        >
                            <Laptop className="mr-2 h-4 w-4" />
                            <span>Go to Homepage</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => {
                                runCommand(() => router.push("/tools"))
                            }}
                        >
                            <Sparkles className="mr-2 h-4 w-4" />
                            <span>Browse all tools</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => {
                                runCommand(() => router.push("/blog"))
                            }}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Read Lab Blog</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => {
                                runCommand(() => router.push("/build"))
                            }}
                        >
                            <Wand2 className="mr-2 h-4 w-4" />
                            <span>Find Your Stack</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Tools">
                        {tools.map((tool) => (
                            <CommandItem
                                key={tool.slug}
                                value={tool.title}
                                onSelect={() => {
                                    runCommand(() => router.push(`/tool/${tool.slug}`))
                                }}
                            >
                                <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-white/10 bg-white/5">
                                    <tool.icon className="h-3 w-3" />
                                </div>
                                <span>{tool.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
