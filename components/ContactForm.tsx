'use client';

import { useState, type FormEvent } from 'react';
import { expertises } from '@/lib/site';
import { validateContact, type ContactErrors } from '@/lib/validation';

type Status = 'idle' | 'submitting' | 'error' | 'success';

interface Fields {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
  consent: boolean;
  website: string; // pot de miel (doit rester vide)
}

const empty: Fields = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  sujet: '',
  message: '',
  consent: false,
  website: '',
};

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState<string>('');

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setServerError('');

    const clientErrors = validateContact(fields);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      if (res.ok) {
        setStatus('success');
        setFields(empty);
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (data.errors) setErrors(data.errors as ContactErrors);
      setServerError(
        data.error ||
          "Une erreur est survenue lors de l'envoi. Merci de réessayer."
      );
      setStatus('error');
    } catch {
      setServerError(
        "Impossible d'envoyer votre demande pour le moment. Vérifiez votre connexion et réessayez."
      );
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-forest/15 bg-white p-6 text-center shadow-card sm:rounded-3xl sm:p-8 md:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 text-forest sm:h-16 sm:w-16">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-5 font-serif text-xl font-semibold text-forest sm:mt-6 sm:text-2xl">
          Votre message a bien été envoyé
        </h3>
        <p className="mt-3 text-sm text-ink/65 sm:text-base">
          Merci de votre confiance. Un conseiller vous recontacte sous 48 heures
          ouvrées pour convenir d'un premier rendez-vous.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="btn-outline mt-6 sm:mt-8"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  const busy = status === 'submitting';

  // `text-base` (16px) sur mobile empêche le zoom automatique d'iOS au focus ;
  // on revient à `text-sm` dès `sm`.
  const inputClass = (key: keyof Fields) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-base text-ink transition-colors placeholder:text-ink/35 focus:border-forest disabled:opacity-60 sm:text-sm ${
      errors[key as keyof ContactErrors] ? 'border-red-400' : 'border-ink/15'
    }`;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-ink/10 bg-white p-4 shadow-card sm:rounded-3xl sm:p-6 md:p-8 lg:p-10"
    >
      {/* Pot de miel anti-spam : masqué aux humains */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <div>
          <label htmlFor="prenom" className="mb-1.5 block text-sm font-medium text-forest">
            Prénom <span className="text-gold-dark">*</span>
          </label>
          <input
            id="prenom"
            type="text"
            value={fields.prenom}
            onChange={(e) => set('prenom', e.target.value)}
            className={inputClass('prenom')}
            placeholder="Jean"
            autoComplete="given-name"
            disabled={busy}
          />
          {errors.prenom && <p className="mt-1 text-xs text-red-500">{errors.prenom}</p>}
        </div>
        <div>
          <label htmlFor="nom" className="mb-1.5 block text-sm font-medium text-forest">
            Nom <span className="text-gold-dark">*</span>
          </label>
          <input
            id="nom"
            type="text"
            value={fields.nom}
            onChange={(e) => set('nom', e.target.value)}
            className={inputClass('nom')}
            placeholder="Dupont"
            autoComplete="family-name"
            disabled={busy}
          />
          {errors.nom && <p className="mt-1 text-xs text-red-500">{errors.nom}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-forest">
            E-mail <span className="text-gold-dark">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={fields.email}
            onChange={(e) => set('email', e.target.value)}
            className={inputClass('email')}
            placeholder="jean.dupont@email.fr"
            autoComplete="email"
            disabled={busy}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="telephone" className="mb-1.5 block text-sm font-medium text-forest">
            Téléphone
          </label>
          <input
            id="telephone"
            type="tel"
            value={fields.telephone}
            onChange={(e) => set('telephone', e.target.value)}
            className={inputClass('telephone')}
            placeholder="06 12 34 56 78"
            autoComplete="tel"
            disabled={busy}
          />
        </div>
      </div>

      <div className="mt-4 sm:mt-5">
        <label htmlFor="sujet" className="mb-1.5 block text-sm font-medium text-forest">
          Votre demande concerne
        </label>
        <div className="relative">
          <select
            id="sujet"
            value={fields.sujet}
            onChange={(e) => set('sujet', e.target.value)}
            className={`${inputClass('sujet')} appearance-none pr-11`}
            disabled={busy}
          >
            <option value="">Sélectionnez un sujet…</option>
            {expertises.map((e) => (
              <option key={e.slug} value={e.title}>
                {e.title}
              </option>
            ))}
            <option value="Prise de rendez-vous">Prise de rendez-vous</option>
            <option value="Autre">Autre demande</option>
          </select>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40"
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="mt-4 sm:mt-5">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-forest">
          Message <span className="text-gold-dark">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={fields.message}
          onChange={(e) => set('message', e.target.value)}
          className={`${inputClass('message')} resize-y`}
          placeholder="Décrivez votre situation et vos objectifs…"
          disabled={busy}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <div className="mt-4 flex items-start gap-3 sm:mt-5">
        <input
          id="consent"
          type="checkbox"
          checked={fields.consent}
          onChange={(e) => set('consent', e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-ink/30 text-forest accent-forest"
          disabled={busy}
        />
        <label htmlFor="consent" className="text-sm leading-relaxed text-ink/60">
          J'accepte que mes données soient utilisées pour traiter ma demande,
          conformément à la{' '}
          <a href="/politique-de-confidentialite" className="underline decoration-gold/50 underline-offset-2 hover:text-forest">
            politique de confidentialité
          </a>
          . <span className="text-gold-dark">*</span>
        </label>
      </div>
      {errors.consent && <p className="mt-1 text-xs text-red-500">{errors.consent}</p>}

      {status === 'error' && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverError || 'Merci de corriger les champs signalés avant l\'envoi.'}
        </p>
      )}

      <button type="submit" className="btn-primary mt-5 w-full sm:mt-7 sm:w-auto" disabled={busy}>
        {busy ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </button>
      <p className="mt-4 text-xs text-ink/45">
        Champs marqués d'un <span className="text-gold-dark">*</span> obligatoires.
        Réponse sous 48 heures ouvrées.
      </p>
    </form>
  );
}
