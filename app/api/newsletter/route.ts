import { NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/validation';
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

  const ip = clientIp(req);
  const rl = rateLimit(`newsletter:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'Trop de tentatives. Merci de réessayer plus tard.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    );
  }

  let body: { email?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 });
  }

  // Pot de miel : bot piégé
  if (body.website && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email || '').trim();
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: 'Adresse e-mail invalide.' },
      { status: 422 }
    );
  }

  // Transmission vers le webhook n8n (qui gère l'ajout à la liste de diffusion).
  const sent = await notifyWebhook({ type: 'newsletter', email });

  if (!sent) {
    return NextResponse.json(
      { ok: false, error: "L'inscription a échoué. Merci de réessayer." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
