/**
 * IP client réelle derrière le reverse proxy Traefik de Coolify.
 *
 * Le site tourne derrière UN proxy de confiance (Traefik). Un client peut
 * falsifier les en-têtes `X-Forwarded-For` / `X-Real-IP` qu'il envoie : on ne
 * fait donc PAS confiance aux valeurs de gauche de `X-Forwarded-For`. Traefik
 * ajoute la vraie IP (le pair TCP qu'il observe) EN DERNIÈRE position ; c'est
 * elle qui fait foi.
 *
 * `TRUSTED_PROXY_HOPS` (défaut : 1) = nombre de proxys de confiance devant
 * l'application. Passer à 2 si un CDN (ex. Cloudflare) est ajouté DEVANT
 * Traefik : la vraie IP client sera alors l'avant-dernière valeur.
 */
const TRUSTED_HOPS = Math.max(1, Number(process.env.TRUSTED_PROXY_HOPS) || 1);

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) {
    const parts = fwd
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length) {
      // Valeur ajoutée par notre proxy le plus interne : à TRUSTED_HOPS
      // positions depuis la droite (les valeurs plus à gauche sont
      // potentiellement falsifiées par le client).
      const idx = parts.length - TRUSTED_HOPS;
      return parts[idx >= 0 ? idx : 0];
    }
  }
  // Repli : X-Real-IP posé par Traefik (absent seulement hors production).
  return req.headers.get('x-real-ip')?.trim() || 'unknown';
}
