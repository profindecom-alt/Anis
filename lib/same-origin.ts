import { site } from './site';

/**
 * Garde « même origine » pour les routes API POST (contact, newsletter,
 * réclamation, chat).
 *
 * Objectif : empêcher qu'un AUTRE site web déclenche ces endpoints depuis le
 * navigateur d'un visiteur (envoi de spam via nos formulaires, consommation
 * des crédits n8n / LLM du chatbot). On compare l'en-tête `Origin` envoyé par
 * le navigateur à l'hôte réel de la requête (posé par Traefik via
 * `x-forwarded-host`), plus l'hôte canonique du site.
 *
 * Un navigateur envoie toujours `Origin` sur une requête POST cross-origin ;
 * une requête SANS `Origin` ne peut donc pas être une attaque cross-site
 * pilotée par un navigateur : on la laisse passer (clients serveur, outils en
 * ligne de commande…), la limitation de débit et le pot de miel restant actifs.
 */
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // pas de contexte navigateur cross-site → non concerné

  let originHost: string;
  try {
    originHost = new URL(origin).host.toLowerCase();
  } catch {
    return false; // en-tête Origin malformé
  }

  const allowed = new Set<string>();
  const fwdHost = req.headers.get('x-forwarded-host') || req.headers.get('host');
  if (fwdHost) allowed.add(fwdHost.toLowerCase());
  try {
    allowed.add(new URL(site.url).host.toLowerCase());
  } catch {
    /* URL du site invalide : ignorée */
  }

  return allowed.has(originHost);
}
