"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { FavoriteWithTool } from "@/lib/schemas";

type FavoriteItem = {
    id: string;
    type: 'tool' | 'stack';
    addedAt: number;
};

export function useFavorites() {
    const { data: session, status } = useSession();
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load favorites on mount
    useEffect(() => {
        const loadFavorites = async () => {
            setIsLoading(true);
            
            if (session?.user?.id) {
                // User is logged in - fetch from DB
                try {
                    const response = await fetch('/api/favorites');
                    if (response.ok) {
                        const dbFavorites: FavoriteWithTool[] = await response.json();
                        // Convert DB format to local format
                        const formatted = dbFavorites.map((f) => ({
                            id: f.toolId,
                            type: 'tool' as const,
                            addedAt: new Date(f.createdAt).getTime(),
                        }));
                        setFavorites(formatted);
                    }
                } catch (error) {
                    console.error('Failed to load favorites from DB:', error);
                }
            } else {
                // User is not logged in - use localStorage
                const saved = localStorage.getItem("vibestack-favorites");
                if (saved) {
                    setFavorites(JSON.parse(saved));
                }
            }
            
            setIsLoading(false);
        };

        loadFavorites();
    }, [session]);

    // Sync localStorage to DB on login
    useEffect(() => {
        const syncToDB = async () => {
            if (session?.user?.id && status === 'authenticated') {
                const localFavs = localStorage.getItem("vibestack-favorites");
                if (localFavs) {
                    const parsed = JSON.parse(localFavs);
                    // Sync each local favorite to DB
                    for (const item of parsed) {
                        if (item.type === 'tool') {
                            try {
                                await fetch('/api/favorites', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ toolId: item.id }),
                                });
                            } catch (error) {
                                console.error('Failed to sync favorite:', error);
                            }
                        }
                    }
                    // Clear localStorage after sync
                    localStorage.removeItem("vibestack-favorites");
                    // Reload favorites from DB
                    const response = await fetch('/api/favorites');
                    if (response.ok) {
                        const dbFavorites: FavoriteWithTool[] = await response.json();
                        const formatted = dbFavorites.map((f) => ({
                            id: f.toolId,
                            type: 'tool' as const,
                            addedAt: new Date(f.createdAt).getTime(),
                        }));
                        setFavorites(formatted);
                    }
                }
            }
        };

        syncToDB();
    }, [session, status]);

    const addFavorite = useCallback(async (id: string, type: 'tool' | 'stack' = 'tool') => {
        const newItem: FavoriteItem = { id, type, addedAt: Date.now() };
        
        if (session?.user?.id && type === 'tool') {
            // Save to DB for tools
            try {
                const response = await fetch('/api/favorites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ toolId: id }),
                });
                if (response.ok) {
                    setFavorites(prev => [...prev, newItem]);
                }
            } catch (error) {
                console.error('Failed to add favorite:', error);
            }
        } else {
            // Save to localStorage
            const updated = [...favorites, newItem];
            setFavorites(updated);
            localStorage.setItem("vibestack-favorites", JSON.stringify(updated));
        }
    }, [favorites, session]);

    const removeFavorite = useCallback(async (id: string) => {
        if (session?.user?.id) {
            // Remove from DB
            try {
                const response = await fetch('/api/favorites', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ toolId: id }),
                });
                if (response.ok) {
                    setFavorites(prev => prev.filter(f => f.id !== id));
                }
            } catch (error) {
                console.error('Failed to remove favorite:', error);
            }
        } else {
            // Remove from localStorage
            const updated = favorites.filter(f => f.id !== id);
            setFavorites(updated);
            localStorage.setItem("vibestack-favorites", JSON.stringify(updated));
        }
    }, [favorites, session]);

    const isFavorite = useCallback((id: string) => {
        return favorites.some(f => f.id === id);
    }, [favorites]);

    const clearAll = useCallback(async () => {
        if (session?.user?.id) {
            // Clear all from DB (would need a batch delete endpoint)
            for (const fav of favorites) {
                if (fav.type === 'tool') {
                    await fetch('/api/favorites', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ toolId: fav.id }),
                    });
                }
            }
        }
        setFavorites([]);
        localStorage.removeItem("vibestack-favorites");
    }, [favorites, session]);

    return {
        favorites,
        isLoading,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearAll,
    };
}
