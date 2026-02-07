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

// Check rate limit for a given identifier (IP, userId, etc.)
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const now = Date.now();

  // If Redis is not configured, allow all requests
  if (!redis) {
    return {
      allowed: true,
      remaining: config.maxRequests,
      resetTime: now + config.windowSize,
    };
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
    // Fail open in case of Redis error
    return {
      allowed: true,
      remaining: 0,
      resetTime: now + config.windowSize,
    };
  }
}

// Common rate limit configurations
export const rateLimitConfigs = {
  strict: { windowSize: 60 * 1000, maxRequests: 5 }, // 5 requests per minute
  standard: { windowSize: 60 * 1000, maxRequests: 30 }, // 30 requests per minute
  generous: { windowSize: 60 * 1000, maxRequests: 100 }, // 100 requests per minute
  newsletter: { windowSize: 60 * 60 * 1000, maxRequests: 3 }, // 3 requests per hour
};
