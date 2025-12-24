interface Bucket {
  tokens: number
  lastRefill: number
}

const buckets = new Map<string, Bucket>()

export function rateLimit(key: string, capacity = 20, refillPerSecond = 10): boolean {
  const now = Date.now() / 1000
  const bucket = buckets.get(key) ?? { tokens: capacity, lastRefill: now }

  // Calculate tokens to add based on time elapsed
  const tokensToAdd = (now - bucket.lastRefill) * refillPerSecond
  bucket.tokens = Math.min(capacity, bucket.tokens + tokensToAdd)
  bucket.lastRefill = now

  // Check if we have tokens available
  if (bucket.tokens < 1) {
    buckets.set(key, bucket)
    return false
  }

  // Consume a token
  bucket.tokens -= 1
  buckets.set(key, bucket)
  return true
}

export function getRateLimitInfo(
  key: string,
  capacity = 20,
): {
  remaining: number
  resetTime: number
} {
  const bucket = buckets.get(key)
  if (!bucket) {
    return { remaining: capacity, resetTime: Date.now() + 1000 }
  }

  return {
    remaining: Math.floor(bucket.tokens),
    resetTime: Date.now() + (capacity - bucket.tokens) * 1000,
  }
}
