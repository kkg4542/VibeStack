"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

/**
 * Save / Saved toggle for a tool. Works signed out (localStorage) and signed in
 * (/api/favorites) through useFavorites. Saved state: filled heart, orange
 * field with dark text, aria-pressed. A polite sr-only status announces each
 * change; failures also surface as a visible toast.
 */
export function SaveToolButton({ slug, title }: { slug: string; title: string }) {
  const { isFavorite, toggleFavorite, isLoading } = useFavorites();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  const saved = isFavorite(slug, "tool");

  const onClick = async () => {
    if (pending) return;
    setPending(true);
    const result = await toggleFavorite(slug, "tool");
    setPending(false);

    if (!result.ok) {
      const failure = "Could not update your saved tools. Please try again.";
      setMessage(failure);
      toast.error(failure);
      return;
    }
    setMessage(result.saved ? `${title} saved to your favorites.` : `${title} removed from your favorites.`);
  };

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        onClick={onClick}
        aria-pressed={saved}
        disabled={isLoading || pending}
        className={cn(
          "h-12 rounded-none px-6 text-[16px]",
          saved
            ? "bg-vibe-electric text-vibe-deep hover:bg-vibe-electric/90"
            : "bg-background text-foreground hover:bg-accent"
        )}
      >
        <Heart aria-hidden="true" className={cn("mr-2 h-4 w-4", saved && "fill-current")} />
        {saved ? "Saved" : "Save"}
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {message}
      </span>
    </>
  );
}
