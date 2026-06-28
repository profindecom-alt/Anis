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

  // Garde-fou : on n'attend pas indéfiniment la réponse du webhook.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error('[notify] Échec du webhook:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('[notify] Erreur réseau vers le webhook:', err);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
