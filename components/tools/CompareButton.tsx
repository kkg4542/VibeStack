"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Scale, Check } from "lucide-react";

interface CompareButtonProps {
    toolSlug: string;
    toolTitle: string;
}

export function CompareButton({ toolSlug, toolTitle }: CompareButtonProps) {
    const [isAdded, setIsAdded] = useState(false);
    // const { toast } = useToast(); // Assuming shadcn toast is available

    useEffect(() => {
        const compareList = JSON.parse(localStorage.getItem("compareTools") || "[]");
        setIsAdded(compareList.includes(toolSlug));
    }, [toolSlug]);

    const toggleCompare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        let compareList = JSON.parse(localStorage.getItem("compareTools") || "[]");

        if (isAdded) {
            compareList = compareList.filter((slug: string) => slug !== toolSlug);
            localStorage.setItem("compareTools", JSON.stringify(compareList));
            setIsAdded(false);
        } else {
            if (compareList.length >= 3) {
                alert("You can compare up to 3 tools at a time.");
                return;
            }
            compareList.push(toolSlug);
            localStorage.setItem("compareTools", JSON.stringify(compareList));
            setIsAdded(true);
        }

        // Dispatch custom event for real-time UI update in ToolsList
        window.dispatchEvent(new Event("compareUpdate"));
    };

    return (
        <Button
            variant={isAdded ? "secondary" : "outline"}
            size="sm"
            onClick={toggleCompare}
            className={`h-8 gap-2 rounded-lg transition-all ${isAdded ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : ''}`}
        >
            {isAdded ? (
                <>
                    <Check className="h-4 w-4" />
                    Added
                </>
            ) : (
                <>
                    <Scale className="h-4 w-4" />
                    Compare
                </>
            )}
        </Button>
    );
}
