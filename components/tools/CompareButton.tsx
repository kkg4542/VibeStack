"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Scale, Check } from "lucide-react";

interface CompareButtonProps {
    toolSlug: string;
    toolTitle: string;
}

const MAX_COMPARE = 3;

/** localStorage can be missing, blocked or hold junk; never let that throw. */
function readCompareList(): string[] {
    try {
        const parsed = JSON.parse(localStorage.getItem("compareTools") || "[]");
        return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
    } catch {
        return [];
    }
}

function writeCompareList(list: string[]) {
    try {
        localStorage.setItem("compareTools", JSON.stringify(list));
    } catch {
        // Storage unavailable (private mode / quota): the toggle just won't persist.
    }
}

export function CompareButton({ toolSlug, toolTitle }: CompareButtonProps) {
    const [isAdded, setIsAdded] = useState(false);
    const [limitMessage, setLimitMessage] = useState("");
    const messageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (messageTimer.current) clearTimeout(messageTimer.current);
        };
    }, []);

    useEffect(() => {
        const compareList = readCompareList();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsAdded(compareList.includes(toolSlug));
    }, [toolSlug]);

    const toggleCompare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        let compareList = readCompareList();

        if (isAdded) {
            compareList = compareList.filter((slug) => slug !== toolSlug);
            writeCompareList(compareList);
            setIsAdded(false);
        } else {
            if (compareList.length >= MAX_COMPARE) {
                setLimitMessage(`You can compare up to ${MAX_COMPARE} tools at a time.`);
                if (messageTimer.current) clearTimeout(messageTimer.current);
                messageTimer.current = setTimeout(() => setLimitMessage(""), 3000);
                return;
            }
            writeCompareList([...compareList, toolSlug]);
            setIsAdded(true);
        }

        // Dispatch custom event for real-time UI update in ToolsList
        window.dispatchEvent(new Event("compareUpdate"));
    };

    return (
        <div className="flex flex-col items-end gap-1">
            <Button
                variant={isAdded ? "secondary" : "outline"}
                size="sm"
                onClick={toggleCompare}
                aria-pressed={isAdded}
                aria-label={isAdded ? `Remove ${toolTitle} from comparison` : `Compare ${toolTitle}`}
                className={`h-8 gap-2 rounded-none border-0 text-[14px] transition-colors ${isAdded ? 'bg-vibe-electric text-vibe-deep hover:bg-vibe-electric/90' : 'bg-secondary text-foreground hover:bg-accent dark:bg-secondary dark:hover:bg-accent'}`}
            >
                {isAdded ? (
                    <>
                        <Check aria-hidden="true" className="h-4 w-4" />
                        Added
                    </>
                ) : (
                    <>
                        <Scale aria-hidden="true" className="h-4 w-4" />
                        Compare
                    </>
                )}
            </Button>
            {/* Always mounted so screen readers announce the text when it appears. */}
            <p role="status" aria-live="polite" className={limitMessage ? "text-[14px] text-foreground" : "sr-only"}>
                {limitMessage}
            </p>
        </div>
    );
}
