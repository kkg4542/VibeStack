import { Redis } from "@upstash/redis";

// Initialize Redis client with environment variable checks
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Only initialize Redis if both URL and token are provided
export const redis = redisUrl && redisToken 
  ? new Redis({
      url: redisUrl,
      token: redisToken,
    })
  : null;

// Rate limiting configuration
export interface RateLimitConfig {
  windowSize: number; // in milliseconds
  maxRequests: number;
}

/**
 * Best-effort in-process limiter used when Upstash is unreachable or simply
 * not configured. It is per-instance, so on serverless it only sees the share
 * of traffic that lands on one warm lambda — it will NOT hold a distributed
 * limit. That is deliberate: the alternative here used to be allowing every
 * request through, which left the public POST endpoints (newsletter,
 * submissions, reviews) with no limit at all whenever the env vars were
 * missing. A partial limit beats none; configure Redis for the real one.
 */
const memoryHits = new Map<string, number[]>();
const MEMORY_KEY_CAP = 10_000;
let warnedMissingRedis = false;

function pruneMemoryStore(now: number) {
  if (memoryHits.size <= MEMORY_KEY_CAP) return;
  // Drop keys whose newest hit is the oldest overall. Cheap and good enough —
  // this only runs when an instance has seen 10k distinct identifiers.
  const entries = [...memoryHits.entries()].sort(
    (a, b) => (a[1][a[1].length - 1] ?? 0) - (b[1][b[1].length - 1] ?? 0)
  );
  for (const [key] of entries.slice(0, entries.length - MEMORY_KEY_CAP)) {
    memoryHits.delete(key);
  }
  void now;
}

function checkRateLimitInMemory(
  identifier: string,
  config: RateLimitConfig,
  now: number
): { allowed: boolean; remaining: number; resetTime: number } {
  const windowStart = now - config.windowSize;
  const hits = (memoryHits.get(identifier) ?? []).filter((t) => t > windowStart);

  if (hits.length >= config.maxRequests) {
    memoryHits.set(identifier, hits);
    return {
      allowed: false,
      remaining: 0,
      resetTime: (hits[0] ?? now) + config.windowSize,
    };
  }

  hits.push(now);
  memoryHits.set(identifier, hits);
  pruneMemoryStore(now);

  return {
    allowed: true,
    remaining: config.maxRequests - hits.length,
    resetTime: now + config.windowSize,
  };
}

// Check rate limit for a given identifier (IP, userId, etc.)
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const now = Date.now();

  // Upstash not configured: fall back to the in-process limiter rather than
  // waving every request through. Warn once so a missing env var is visible in
  // the logs instead of silently disabling protection.
  if (!redis) {
    if (!warnedMissingRedis) {
      warnedMissingRedis = true;
      console.warn(
        "[rate-limit] UPSTASH_REDIS_REST_URL/TOKEN not set — falling back to a " +
          "per-instance in-memory limiter. This does not hold across serverless " +
          "instances; set the Upstash env vars for a real distributed limit."
      );
    }
    return checkRateLimitInMemory(identifier, config, now);
  }

  const key = `rate_limit:${identifier}`;
  const windowStart = now - config.windowSize;

  try {
    // Remove old entries outside the window
    await redis.zremrangebyscore(key, 0, windowStart);

    // Count requests in current window
    const currentCount = await redis.zcard(key);

    if (currentCount >= config.maxRequests) {
      // Get the oldest request time to calculate reset time
      const oldestRequest = await redis.zrange(key, 0, 0, { withScores: true });
      let resetTime = now + config.windowSize;
      if (Array.isArray(oldestRequest) && oldestRequest.length > 0 && typeof oldestRequest[0] === 'object' && oldestRequest[0] !== null) {
        const score = (oldestRequest[0] as { score?: string | number }).score;
        if (score !== undefined) {
          resetTime = parseInt(String(score)) + config.windowSize;
        }
      }

      return {
        allowed: false,
        remaining: 0,
        resetTime,
      };
    }

    // Add current request
    await redis.zadd(key, { score: now, member: `${now}-${Math.random()}` });
    
    // Set expiration on the key
    await redis.expire(key, Math.ceil(config.windowSize / 1000));

    return {
      allowed: true,
      remaining: config.maxRequests - currentCount - 1,
      resetTime: now + config.windowSize,
    };
  } catch (error) {
    console.error("Rate limiting error:", error);
    // Redis is reachable-but-broken. Degrade to the in-process limiter instead
    // of failing fully open, so an Upstash outage doesn't also remove every
    // limit on the public write endpoints.
    return checkRateLimitInMemory(identifier, config, now);
  }
}

// Common rate limit configurations
export const rateLimitConfigs = {
  strict: { windowSize: 60 * 1000, maxRequests: 5 }, // 5 requests per minute
  standard: { windowSize: 60 * 1000, maxRequests: 30 }, // 30 requests per minute
  generous: { windowSize: 60 * 1000, maxRequests: 100 }, // 100 requests per minute
  newsletter: { windowSize: 60 * 60 * 1000, maxRequests: 3 }, // 3 requests per hour
};
