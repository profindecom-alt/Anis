import { NextResponse } from 'next/server';
import { validateContact, type ContactPayload } from '@/lib/validation';
import { rateLimit, sweepRateLimit } from '@/lib/rate-limit';
import { notifyWebhook } from '@/lib/notify';

export const runtime = 'nodejs';

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: Request) {
  sweepRateLimit();

  // 1) Limitation de débit (anti-abus)
  const ip = clientIp(req);
  const rl = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'Trop de tentatives. Merci de réessayer dans un instant.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    );
  }

  // 2) Lecture du corps
  let data: Partial<ContactPayload>;
  try {
    data = (await req.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 });
  }

  // 3) Pot de miel : si rempli, on simule un succès (bot piégé)
  if (data.website && data.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  // 4) Validation serveur (mêmes règles que le client)
  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // 5) Transmission vers le webhook n8n (données structurées)
  const sent = await notifyWebhook({
    type: 'contact',
    prenom: data.prenom!.trim(),
    nom: data.nom!.trim(),
    email: data.email!.trim(),
    telephone: (data.telephone || '').trim(),
    sujet: (data.sujet || 'Non précisé').trim(),
    message: data.message!.trim(),
  });

  if (!sent) {
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Merci de réessayer ou de nous écrire directement." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
