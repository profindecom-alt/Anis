import { NextResponse } from 'next/server';
import { rateLimit, sweepRateLimit } from '@/lib/rate-limit';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

/**
 * Extrait la réponse textuelle du webhook n8n, quelle que soit sa forme :
 * chaîne brute, ou objet/array contenant reply / output / text / message…
 */
// Accusé de réception générique renvoyé par n8n quand le Webhook répond
// « immédiatement » : ce n'est PAS une réponse de l'assistant, on l'ignore.
const N8N_ACK_RE = /^workflow (was )?(started|executed|run|finished)/i;

function isUsableReply(s: string): boolean {
  const t = s.trim();
  return t.length > 0 && !N8N_ACK_RE.test(t);
}

function extractReply(data: unknown, depth = 0): string | null {
  if (data == null || depth > 4) return null;
  if (typeof data === 'string') return isUsableReply(data) ? data.trim() : null;
  if (Array.isArray(data)) {
    for (const item of data) {
      const r = extractReply(item, depth + 1);
      if (r) return r;
    }
    return null;
  }
  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    for (const key of ['reply', 'output', 'text', 'message', 'answer', 'response']) {
      const v = obj[key];
      if (typeof v === 'string' && isUsableReply(v)) return v.trim();
    }
    for (const key of ['data', 'json', 'result', 'body']) {
      if (obj[key]) {
        const r = extractReply(obj[key], depth + 1);
        if (r) return r;
      }
    }
  }
  return null;
}

/**
 * Extrait des choix cliquables proposés par n8n (créneaux de rendez-vous,
 * réponses rapides…). Accepte options / slots / choices / quickReplies, en
 * tableau de chaînes ou d'objets { label | value | text }.
 */
function extractOptions(data: unknown, depth = 0): string[] | undefined {
  if (data == null || depth > 4) return undefined;
  if (Array.isArray(data)) {
    for (const item of data) {
      const o = extractOptions(item, depth + 1);
      if (o) return o;
    }
    return undefined;
  }
  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    for (const key of ['options', 'slots', 'choices', 'quickReplies', 'suggestions']) {
      const v = obj[key];
      if (Array.isArray(v) && v.length) {
        const arr = v
          .map((x) =>
            typeof x === 'string'
              ? x
              : x && typeof x === 'object'
                ? String(
                    (x as Record<string, unknown>).label ??
                      (x as Record<string, unknown>).value ??
                      (x as Record<string, unknown>).text ??
                      ''
                  )
                : ''
          )
          .map((s) => s.trim())
          .filter(Boolean);
        if (arr.length) return arr.slice(0, 6);
      }
    }
    for (const key of ['data', 'json', 'result', 'body']) {
      if (obj[key]) {
        const o = extractOptions(obj[key], depth + 1);
        if (o) return o;
      }
    }
  }
  return undefined;
}

/** Détecte la confirmation d'un rendez-vous renvoyée par n8n. */
function extractBooked(data: unknown, depth = 0): boolean {
  if (data == null || depth > 4) return false;
  if (Array.isArray(data)) return data.some((i) => extractBooked(i, depth + 1));
  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    if (obj.booked === true || obj.done === true) return true;
    if (typeof obj.action === 'string' && /book|confirm|rdv|rendez/i.test(obj.action))
      return true;
    for (const key of ['data', 'json', 'result', 'body']) {
      if (obj[key] && extractBooked(obj[key], depth + 1)) return true;
    }
  }
  return false;
}

const FALLBACK =
  "Je rencontre un souci technique pour le moment. Vous pouvez nous écrire via le formulaire de contact ou par téléphone, et un conseiller vous répondra rapidement.";

// 200 reçu mais le scénario n8n n'a pas renvoyé de réponse (Webhook en mode
// « Respond Immediately »). Message neutre côté visiteur ; côté config, il
// faut ajouter un nœud « Respond to Webhook » qui renvoie { reply: "..." }.
const ASYNC_NOTICE =
  "Merci, votre demande a bien été transmise. Un conseiller vous répondra rapidement. Vous pouvez aussi préciser votre message ci-dessous.";

/* ----------------------------------------------------------------------- */
/* Simulation de prise de rendez-vous (mode démonstration, sans n8n)       */
/* ----------------------------------------------------------------------- */

const DEMO_SLOTS = ['Demain 10h00', 'Demain 14h30', 'Jeudi 11h00', 'Vendredi 16h00'];
const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const TIME_RE = /\b\d{1,2}\s?h\d{0,2}\b/i;
const INTENT_RE = /rendez|rdv|rencontr|dispo|cr[ée]neau|réserv|reserv/i;

function demoReply(
  message: string,
  history: ChatMessage[]
): { reply: string; options?: string[]; booked?: boolean } {
  const text = message.toLowerCase();
  const priorAssistantOfferedSlots = history.some(
    (h) => h.role === 'assistant' && /créneau|cr[ée]neau|disponibles/i.test(h.content)
  );
  const inBookingFlow = priorAssistantOfferedSlots || INTENT_RE.test(text);

  // Créneau déjà choisi dans la conversation
  const chosenSlot = [...history]
    .reverse()
    .find(
      (h) =>
        h.role === 'user' &&
        (TIME_RE.test(h.content) || DEMO_SLOTS.some((s) => h.content.includes(s)))
    )?.content;

  // 1) L'utilisateur fournit un e-mail alors qu'un créneau est retenu : confirmation
  const email = message.match(EMAIL_RE)?.[0];
  if (email && (chosenSlot || TIME_RE.test(message))) {
    const slot = chosenSlot || 'le créneau choisi';
    return {
      reply: `C'est noté. Votre rendez-vous (${slot}) est pré-réservé ; une confirmation sera envoyée à ${email}. (Démonstration : connectez n8n et un agenda pour une réservation réelle.)`,
      booked: true,
    };
  }

  // 2) L'utilisateur choisit un créneau : on demande l'e-mail
  if ((DEMO_SLOTS.some((s) => message.includes(s)) || TIME_RE.test(text)) && inBookingFlow) {
    return {
      reply: `Parfait pour « ${message} ». À quelle adresse e-mail puis-je vous envoyer la confirmation ?`,
    };
  }

  // 3) Intention de rendez-vous : on propose des créneaux cliquables
  if (INTENT_RE.test(text)) {
    return {
      reply: 'Avec plaisir. Voici quelques créneaux disponibles, lequel vous convient ?',
      options: DEMO_SLOTS,
    };
  }

  // 4) Message générique
  return {
    reply: `Merci pour votre message. (Mode démonstration : aucun webhook n8n connecté.) Pour fixer un rendez-vous, écrivez « Prendre rendez-vous ». Un conseiller d'${site.name} reste également disponible via la page Contact.`,
  };
}

/* ----------------------------------------------------------------------- */

export async function POST(req: Request) {
  sweepRateLimit();

  const ip = clientIp(req);
  const rl = rateLimit(`chat:${ip}`, { limit: 20, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      {
        reply:
          'Vous envoyez des messages un peu trop vite. Merci de patienter quelques instants.',
      },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    );
  }

  let body: {
    message?: string;
    history?: ChatMessage[];
    sessionId?: string;
    context?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ reply: 'Requête invalide.' }, { status: 400 });
  }

  const message = (body.message || '').trim();
  if (!message) {
    return NextResponse.json(
      { reply: 'Pouvez-vous préciser votre question ?' },
      { status: 422 }
    );
  }
  if (message.length > 2000) {
    return NextResponse.json(
      { reply: 'Votre message est un peu long, pouvez-vous le résumer ?' },
      { status: 422 }
    );
  }

  const history = Array.isArray(body.history) ? body.history.slice(-12) : [];
  const url = process.env.N8N_CHAT_WEBHOOK_URL;

  // Mode développement : aucun webhook configuré (avec simulation de RDV).
  if (!url) {
    return NextResponse.json({ ...demoReply(message, history), demo: true });
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = process.env.N8N_CHAT_WEBHOOK_TOKEN || process.env.N8N_WEBHOOK_TOKEN;
  if (token) {
    const headerName =
      process.env.N8N_CHAT_WEBHOOK_HEADER ||
      process.env.N8N_WEBHOOK_HEADER ||
      'Authorization';
    headers[headerName] =
      headerName.toLowerCase() === 'authorization' ? `Bearer ${token}` : token;
  }

  // Les réponses (LLM / agenda) peuvent être lentes : on laisse jusqu'à 25 s.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: 'chat',
        sessionId: body.sessionId || '',
        message,
        history,
        context: body.context || 'site',
        // Indique au flux n8n que la prise de rendez-vous est attendue.
        capabilities: ['answer', 'booking'],
        source: site.url,
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error('[chat] webhook a répondu', res.status);
      return NextResponse.json({ reply: FALLBACK });
    }

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json().catch(() => null);
      const reply = extractReply(data);
      // 200 sans réponse exploitable = accusé n8n (Respond Immediately).
      return NextResponse.json({
        reply: reply || ASYNC_NOTICE,
        options: extractOptions(data),
        booked: extractBooked(data),
      });
    }
    const text = await res.text();
    return NextResponse.json({
      reply: isUsableReply(text) ? text.trim() : ASYNC_NOTICE,
    });
  } catch (err) {
    console.error('[chat] erreur vers le webhook:', err);
    return NextResponse.json({ reply: FALLBACK });
  } finally {
    clearTimeout(timeout);
  }
}
