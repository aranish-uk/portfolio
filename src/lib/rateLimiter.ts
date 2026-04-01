// lib/rateLimiter.ts
//
// NOTE: This is an in-memory rate limiter. On Vercel serverless, each function
// instance has its own memory, so this is best-effort — not airtight. It still
// prevents casual abuse within a single warm instance. For production-grade
// rate limiting, migrate to Upstash Redis (@upstash/ratelimit).

const store = new Map<string, number[]>()
const MAX_REQUESTS = 5
const WINDOW_MS = 60_000 // 1 minute
const MAX_KEYS = 10_000 // prevent unbounded memory growth

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (store.get(ip) ?? []).filter((ts) => now - ts < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS) {
    store.set(ip, timestamps)
    return true
  }

  timestamps.push(now)
  store.set(ip, timestamps)

  // Evict stale entries to cap memory usage
  if (store.size > MAX_KEYS) {
    for (const [key, ts] of store) {
      if (ts.every((t) => now - t >= WINDOW_MS)) store.delete(key)
    }
  }

  return false
}
