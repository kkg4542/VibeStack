/**
 * Signed-out favorites live in localStorage under one key, in one format:
 *
 *   StoredFavorite[] = { id: string; type: 'tool' | 'stack'; addedAt: number }[]
 *
 * `id` is the tool slug for tools and the stack id for stacks.
 *
 * Older builds wrote a plain string[] (e.g. ["magic-wand"]) from the stack
 * page. Those entries are migrated on read: the stack page was the only writer
 * of bare strings, so they become type 'stack'. The migrated list is written
 * back so `addedAt` stays stable. Every storage / JSON access is guarded:
 * private mode, disabled storage, quota errors and corrupt JSON all degrade to
 * an empty list instead of throwing.
 *
 * Client-only: never call at module scope or during render on the server.
 */

export const FAVORITES_STORAGE_KEY = "vibestack-favorites";
export const FAVORITES_CHANGED_EVENT = "vibestack-favorites-changed";

export type FavoriteType = "tool" | "stack";

export type StoredFavorite = {
    id: string;
    type: FavoriteType;
    addedAt: number;
};

function isType(value: unknown): value is FavoriteType {
    return value === "tool" || value === "stack";
}

/**
 * Normalise whatever was parsed from storage into StoredFavorite[].
 * `migrated` is true when anything had to be converted or dropped.
 */
function normalize(raw: unknown): { list: StoredFavorite[]; migrated: boolean } {
    if (!Array.isArray(raw)) return { list: [], migrated: raw !== null && raw !== undefined };

    const seen = new Set<string>();
    const list: StoredFavorite[] = [];
    let migrated = false;
    const now = Date.now();

    for (const entry of raw) {
        let item: StoredFavorite | null = null;

        if (typeof entry === "string") {
            // Legacy format: bare stack id.
            if (entry) item = { id: entry, type: "stack", addedAt: now };
            migrated = true;
        } else if (entry && typeof entry === "object") {
            const e = entry as Record<string, unknown>;
            if (typeof e.id === "string" && e.id) {
                const type: FavoriteType = isType(e.type) ? e.type : "tool";
                const addedAt =
                    typeof e.addedAt === "number" && Number.isFinite(e.addedAt) ? e.addedAt : now;
                if (!isType(e.type) || addedAt !== e.addedAt) migrated = true;
                item = { id: e.id, type, addedAt };
            } else {
                migrated = true;
            }
        } else {
            migrated = true;
        }

        if (!item) continue;
        const key = `${item.type}:${item.id}`;
        if (seen.has(key)) {
            migrated = true;
            continue;
        }
        seen.add(key);
        list.push(item);
    }

    return { list, migrated };
}

function notify() {
    try {
        window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
    } catch {
        // non-browser environment: nothing to notify
    }
}

/** Read the saved list (migrating legacy entries). Always returns an array. */
export function readLocalFavorites(): StoredFavorite[] {
    if (typeof window === "undefined") return [];
    let text: string | null;
    try {
        text = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    } catch {
        return [];
    }
    if (!text) return [];

    let parsed: unknown;
    try {
        parsed = JSON.parse(text);
    } catch {
        return [];
    }

    const { list, migrated } = normalize(parsed);
    if (migrated && list.length > 0) {
        try {
            window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(list));
        } catch {
            // Could not persist the migration; the in-memory list is still right.
        }
    }
    return list;
}

/** Replace the saved list. Returns false if storage is unavailable. */
export function writeLocalFavorites(list: StoredFavorite[]): boolean {
    if (typeof window === "undefined") return false;
    try {
        if (list.length === 0) {
            window.localStorage.removeItem(FAVORITES_STORAGE_KEY);
        } else {
            window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(list));
        }
    } catch {
        return false;
    }
    notify();
    return true;
}

export function clearLocalFavorites(): void {
    writeLocalFavorites([]);
}

export function isLocalFavorite(id: string, type: FavoriteType): boolean {
    return readLocalFavorites().some((f) => f.id === id && f.type === type);
}

/** Add (no-op if present). Returns the new list, or null if storage failed. */
export function addLocalFavorite(id: string, type: FavoriteType): StoredFavorite[] | null {
    const current = readLocalFavorites();
    if (current.some((f) => f.id === id && f.type === type)) return current;
    const next = [...current, { id, type, addedAt: Date.now() }];
    return writeLocalFavorites(next) ? next : null;
}

/** Remove (no-op if absent). Returns the new list, or null if storage failed. */
export function removeLocalFavorite(id: string, type: FavoriteType): StoredFavorite[] | null {
    const current = readLocalFavorites();
    const next = current.filter((f) => !(f.id === id && f.type === type));
    return writeLocalFavorites(next) ? next : null;
}

/** Subscribe to changes made in this tab (custom event) and other tabs (storage). */
export function subscribeLocalFavorites(callback: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    const onStorage = (e: StorageEvent) => {
        if (e.key === null || e.key === FAVORITES_STORAGE_KEY) callback();
    };
    window.addEventListener(FAVORITES_CHANGED_EVENT, callback);
    window.addEventListener("storage", onStorage);
    return () => {
        window.removeEventListener(FAVORITES_CHANGED_EVENT, callback);
        window.removeEventListener("storage", onStorage);
    };
}
