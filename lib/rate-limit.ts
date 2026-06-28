/**
 * Limiteur de débit en mémoire (fenêtre glissante).
 * Suffisant pour une protection basique contre les abus / le spam sur un
 * déploiement à instance unique. Pour un déploiement multi-instances,
 * remplacer le Map par un store partagé (Redis, Upstash…).
 */

type Hit = { count: number; resetAt: number };
const buckets = new Map<string, Hit>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): { ok: boolean; remaining: number; retryAfter: number } {
  const now = Date.now();
  const hit = buckets.get(key);

  if (!hit || hit.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  hit.count += 1;
  if (hit.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfter: Math.ceil((hit.resetAt - now) / 1000),
    };
  }
  return { ok: true, remaining: limit - hit.count, retryAfter: 0 };
}

/** Nettoyage opportuniste des entrées expirées (évite la fuite mémoire). */
export function sweepRateLimit() {
  const now = Date.now();
  for (const [k, v] of buckets) if (v.resetAt < now) buckets.delete(k);
}
