import { site } from './site';

/**
 * Envoie une soumission (contact, newsletter…) vers un webhook n8n.
 *
 * Configuration via variables d'environnement :
 *   N8N_WEBHOOK_URL     URL du webhook n8n (Production ou Test)
 *   N8N_WEBHOOK_TOKEN   secret optionnel (authentification d'en-tête)
 *   N8N_WEBHOOK_HEADER  nom de l'en-tête d'auth (défaut : Authorization)
 *
 * En l'absence d'URL, la charge utile est journalisée (mode développement)
 * et la fonction retourne `true` afin de ne pas bloquer l'expérience locale.
 */
export async function notifyWebhook(
  payload: Record<string, unknown>
): Promise<boolean> {
  const url = process.env.N8N_WEBHOOK_URL;
  const body = {
    ...payload,
    source: site.url,
    submittedAt: new Date().toISOString(),
  };

  if (!url) {
    console.info('[notify] N8N_WEBHOOK_URL absente — envoi simulé (dev).');
    console.info('[notify]', JSON.stringify(body));
    return true;
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = process.env.N8N_WEBHOOK_TOKEN;
  if (token) {
    const headerName = process.env.N8N_WEBHOOK_HEADER || 'Authorization';
    headers[headerName] =
      headerName.toLowerCase() === 'authorization' ? `Bearer ${token}` : token;
  }

  const payloadBody = JSON.stringify(body);

  // n8n peut renvoyer des 502/504 transitoires (redémarrage, proxy). Comme la
  // soumission d'un formulaire ne doit pas se perdre pour un aléa réseau, on
  // tente une seconde fois sur erreur réseau ou statut 5xx, après un court délai.
  const MAX_ATTEMPTS = 2;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    // Garde-fou : on n'attend pas indéfiniment la réponse du webhook.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: payloadBody,
        signal: controller.signal,
      });
      if (res.ok) return true;
      // 5xx = souci côté serveur, potentiellement transitoire → on réessaie.
      const retryable = res.status >= 500;
      console.error(
        `[notify] Échec du webhook (tentative ${attempt}/${MAX_ATTEMPTS}):`,
        res.status,
        await res.text().catch(() => '')
      );
      if (!retryable || attempt === MAX_ATTEMPTS) return false;
    } catch (err) {
      console.error(
        `[notify] Erreur réseau vers le webhook (tentative ${attempt}/${MAX_ATTEMPTS}):`,
        err
      );
      if (attempt === MAX_ATTEMPTS) return false;
    } finally {
      clearTimeout(timeout);
    }
    // Petit délai avant nouvelle tentative.
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}
