"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { FavoriteWithTool } from "@/lib/schemas";
import { useCsrfFetch } from "@/hooks/useCsrfFetch";
import {
    type FavoriteType,
    type StoredFavorite,
    addLocalFavorite,
    clearLocalFavorites,
    readLocalFavorites,
    removeLocalFavorite,
    subscribeLocalFavorites,
    writeLocalFavorites,
} from "@/lib/favorites-storage";

/**
 * One list, two homes:
 *   - tools, signed in  -> database (/api/favorites), keyed client-side by tool SLUG
 *   - everything else   -> localStorage via lib/favorites-storage
 * Stacks have no database table, so they always live in localStorage, signed in
 * or not. `id` is the tool slug for tools and the stack id for stacks.
 *
 * On sign-in, any tools saved locally are pushed to the account (the POST is
 * idempotent) and removed from localStorage; stacks stay where they are.
 */

export type FavoriteItem = StoredFavorite;

const LOAD_ERROR = "Could not load your saved items. Please try again.";
const SAVE_ERROR = "Could not save that change. Please try again.";

async function fetchDbTools(): Promise<FavoriteItem[] | null> {
    try {
        const response = await fetch("/api/favorites", { credentials: "include" });
        if (!response.ok) return null;
        const rows: unknown = await response.json();
        if (!Array.isArray(rows)) return null;
        return (rows as FavoriteWithTool[])
            .filter((f) => f?.tool?.slug)
            .map((f) => ({
                id: f.tool.slug,
                type: "tool" as const,
                addedAt: new Date(f.createdAt).getTime(),
            }));
    } catch (error) {
        console.error("Failed to load favorites from DB:", error);
        return null;
    }
}

export function useFavorites() {
    const { data: session, status } = useSession();
    const { csrfFetch } = useCsrfFetch();
    const userId = session?.user?.id;
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // csrfFetch is re-created every render; keep the latest in a ref so the
    // load effect only re-runs when the signed-in user actually changes.
    const csrfRef = useRef(csrfFetch);
    useEffect(() => {
        csrfRef.current = csrfFetch;
    });

    // Load (and, when signed in, sync local tools up first).
    useEffect(() => {
        if (status === "loading") return;
        let cancelled = false;

        const load = async () => {
            if (!userId) {
                setFavorites(readLocalFavorites());
                setError(null);
                setIsLoading(false);
                return;
            }

            const localTools = readLocalFavorites().filter((f) => f.type === "tool");
            if (localTools.length > 0) {
                const synced = new Set<string>();
                for (const item of localTools) {
                    try {
                        const res = await csrfRef.current("/api/favorites", {
                            method: "POST",
                            body: JSON.stringify({ toolSlug: item.id }),
                        });
                        // 404 = the slug no longer exists; retrying never helps.
                        if (res.ok || res.status === 404) synced.add(item.id);
                    } catch (err) {
                        console.error("Failed to sync favorite:", err);
                    }
                }
                if (synced.size > 0) {
                    writeLocalFavorites(
                        readLocalFavorites().filter((f) => !(f.type === "tool" && synced.has(f.id)))
                    );
                }
            }

            const dbTools = await fetchDbTools();
            if (cancelled) return;

            if (dbTools === null) {
                // Do not pretend the account list is empty.
                setError(LOAD_ERROR);
                setFavorites(readLocalFavorites());
            } else {
                setError(null);
                setFavorites([
                    ...dbTools,
                    ...readLocalFavorites().filter((f) => f.type === "stack"),
                ]);
            }
            setIsLoading(false);
        };

        void load();
        return () => {
            cancelled = true;
        };
    }, [userId, status]);

    // Keep local-backed entries in step with other components / tabs.
    useEffect(() => {
        return subscribeLocalFavorites(() => {
            setFavorites((prev) =>
                userId
                    ? [
                          ...prev.filter((f) => f.type === "tool"),
                          ...readLocalFavorites().filter((f) => f.type === "stack"),
                      ]
                    : readLocalFavorites()
            );
        });
    }, [userId]);

    const addFavorite = useCallback(
        async (id: string, type: FavoriteType = "tool"): Promise<boolean> => {
            if (userId && type === "tool") {
                try {
                    const response = await csrfRef.current("/api/favorites", {
                        method: "POST",
                        body: JSON.stringify({ toolSlug: id }),
                    });
                    if (!response.ok) {
                        setError(SAVE_ERROR);
                        return false;
                    }
                    setError(null);
                    setFavorites((prev) =>
                        prev.some((f) => f.id === id && f.type === type)
                            ? prev
                            : [...prev, { id, type, addedAt: Date.now() }]
                    );
                    return true;
                } catch (err) {
                    console.error("Failed to add favorite:", err);
                    setError(SAVE_ERROR);
                    return false;
                }
            }

            if (addLocalFavorite(id, type) === null) {
                setError(SAVE_ERROR);
                return false;
            }
            setError(null);
            return true;
        },
        [userId]
    );

    const removeFavorite = useCallback(
        async (id: string, type: FavoriteType = "tool"): Promise<boolean> => {
            if (userId && type === "tool") {
                try {
                    const response = await csrfRef.current("/api/favorites", {
                        method: "DELETE",
                        body: JSON.stringify({ toolSlug: id }),
                    });
                    // 404: tool gone, so the favorite is gone with it.
                    if (!response.ok && response.status !== 404) {
                        setError(SAVE_ERROR);
                        return false;
                    }
                    setError(null);
                    setFavorites((prev) => prev.filter((f) => !(f.id === id && f.type === type)));
                    return true;
                } catch (err) {
                    console.error("Failed to remove favorite:", err);
                    setError(SAVE_ERROR);
                    return false;
                }
            }

            if (removeLocalFavorite(id, type) === null) {
                setError(SAVE_ERROR);
                return false;
            }
            setError(null);
            return true;
        },
        [userId]
    );

    const isFavorite = useCallback(
        (id: string, type: FavoriteType = "tool") =>
            favorites.some((f) => f.id === id && f.type === type),
        [favorites]
    );

    /** Flip the saved state. `saved` is the resulting state; `ok` is false if it failed. */
    const toggleFavorite = useCallback(
        async (id: string, type: FavoriteType = "tool"): Promise<{ saved: boolean; ok: boolean }> => {
            const wasSaved = favorites.some((f) => f.id === id && f.type === type);
            const ok = wasSaved ? await removeFavorite(id, type) : await addFavorite(id, type);
            return { saved: ok ? !wasSaved : wasSaved, ok };
        },
        [favorites, addFavorite, removeFavorite]
    );

    const clearAll = useCallback(async (): Promise<boolean> => {
        let failed = false;
        if (userId) {
            for (const fav of favorites) {
                if (fav.type !== "tool") continue;
                try {
                    const res = await csrfRef.current("/api/favorites", {
                        method: "DELETE",
                        body: JSON.stringify({ toolSlug: fav.id }),
                    });
                    if (!res.ok && res.status !== 404) failed = true;
                } catch (err) {
                    console.error("Failed to clear favorite:", err);
                    failed = true;
                }
            }
        }
        // Local entries (all of them signed out; stacks signed in) always clear.
        clearLocalFavorites();

        if (failed) {
            // Show what the server still has rather than an optimistic empty list.
            const dbTools = await fetchDbTools();
            setFavorites(dbTools ?? []);
            setError(SAVE_ERROR);
            return false;
        }
        setFavorites([]);
        setError(null);
        return true;
    }, [favorites, userId]);

    return {
        favorites,
        isLoading,
        error,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        clearAll,
    };
}
