'use client';

import { useState, type FormEvent } from 'react';
import { isValidEmail } from '@/lib/validation';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Inscription à la newsletter (footer). Capture de prospect légère,
 * avec pot de miel anti-spam et appel à /api/newsletter.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setMessage('');

    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Merci de saisir une adresse e-mail valide.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });
      if (res.ok) {
        setStatus('success');
        setMessage('Merci ! Votre inscription est bien enregistrée.');
        setEmail('');
        return;
      }
      const data = await res.json().catch(() => ({}));
      setStatus('error');
      setMessage(data.error || "L'inscription a échoué. Merci de réessayer.");
    } catch {
      setStatus('error');
      setMessage('Connexion impossible. Merci de réessayer.');
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-5">
      {/* Pot de miel */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="nl-website">Ne pas remplir</label>
        <input
          id="nl-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <label htmlFor="nl-email" className="sr-only">
          Votre adresse e-mail
        </label>
        <input
          id="nl-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre e-mail"
          autoComplete="email"
          disabled={status === 'submitting'}
          className="min-w-0 flex-1 rounded-full border border-cream/20 bg-cream/5 px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-gold shrink-0 px-5 py-2.5 text-sm"
        >
          {status === 'submitting' ? '…' : "S'inscrire"}
        </button>
      </div>

      {message && (
        <p
          className={`mt-2 text-xs ${
            status === 'success' ? 'text-gold' : 'text-red-300'
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
