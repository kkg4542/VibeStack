import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export type CacheKey = 
  | `tool:${string}`
  | `tools:list:${string}`
  | `stack:${string}`
  | `stacks:list`
  | `reviews:${string}`
  | `search:${string}`;

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  tags?: string[];
}

const DEFAULT_TTL = 3600; // 1 hour

export async function getCache<T>(key: CacheKey): Promise<T | null> {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return null;
  }

  try {
    const data = await redis.get<T>(key);
    return data;
  } catch (error) {
    console.error(`Cache get error for key ${key}:`, error);
    return null;
  }
}

export async function setCache<T>(
  key: CacheKey,
  data: T,
  options: CacheOptions = {}
): Promise<void> {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return;
  }

  try {
    const { ttl = DEFAULT_TTL } = options;
    await redis.set(key, data, { ex: ttl });
  } catch (error) {
    console.error(`Cache set error for key ${key}:`, error);
  }
}

export async function deleteCache(key: CacheKey): Promise<void> {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return;
  }

  try {
    await redis.del(key);
  } catch (error) {
    console.error(`Cache delete error for key ${key}:`, error);
  }
}

export async function invalidateCachePattern(pattern: string): Promise<void> {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return;
  }

  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error(`Cache invalidate error for pattern ${pattern}:`, error);
  }
}

// Helper functions for common cache operations
export async function getCachedTool(slug: string) {
  return getCache(`tool:${slug}`);
}

export async function setCachedTool<T>(slug: string, data: T, ttl?: number) {
  return setCache(`tool:${slug}`, data, { ttl });
}

export async function getCachedToolsList(query: string) {
  return getCache(`tools:list:${query}`);
}

export async function setCachedToolsList<T>(query: string, data: T, ttl?: number) {
  return setCache(`tools:list:${query}`, data, { ttl });
}

export async function getCachedStack(id: string) {
  return getCache(`stack:${id}`);
}

export async function setCachedStack<T>(id: string, data: T, ttl?: number) {
  return setCache(`stack:${id}`, data, { ttl });
}

export async function getCachedReviews(toolId: string) {
  return getCache(`reviews:${toolId}`);
}

export async function setCachedReviews<T>(toolId: string, data: T, ttl?: number) {
  return setCache(`reviews:${toolId}`, data, { ttl });
}
