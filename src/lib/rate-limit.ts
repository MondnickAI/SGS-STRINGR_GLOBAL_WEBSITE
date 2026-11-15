/**
 * Small in-memory rate limiter for the inquiry endpoint.
 *
 * Limitation: memory is per server instance, so on serverless platforms this is
 * best-effort only. It still stops simple floods; pair it with the hosting
 * platform's own rate limiting or a WAF in production (docs/DECISIONS.md, ADR-005).
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_TRACKED_KEYS) {
    for (const [storedKey, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(storedKey);
    }
  }
  return false;
}
