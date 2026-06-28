'use client';

import { useState, type FormEvent } from 'react';
import { EMAIL_RE } from '@/lib/validation';

interface Props {
  /** Sujet transmis au conseiller (titre de l'expertise). */
  sujet: string;
  /** Récapitulatif chiffré de la simulation, injecté dans le message. */
  summary: string;
  /** Titre du bloc de capture. */
  title?: string;
  /** Texte d'introduction sous le titre. */
  text?: string;
}

type Status = 'idle' | 'submitting' | 'error' | 'success';

interface Fields {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  note: string;
  consent: boolean;
  website: string; // pot de miel (doit rester vide)
}

const empty: Fields = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  note: '',
  consent: false,
  website: '',
};

type FieldErrors = Partial<Record<'prenom' | 'nom' | 'email' | 'consent', string>>;

/**
 * Formulaire de capture de lead qui clôt chaque simulateur d'expertise.
 * Réutilise l'API `/api/contact` (webhook n8n) : le récapitulatif chiffré de
 * la simulation est transmis tel quel au conseiller dans le champ message.
 */
export default function SimulatorLeadForm({
  sujet,
  summary,
  title = 'Recevez votre étude personnalisée',
  text = 'Un conseiller analyse votre simulation et vous recontacte sous 48 h ouvrées, sans engagement.',
}: Props) {
  const [fields, setFields] = useState<Fields>(empty);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!fields.prenom.trim()) e.prenom = 'Votre prénom est requis.';
    if (!fields.nom.trim()) e.nom = 'Votre nom est requis.';
    if (!EMAIL_RE.test(fields.email.trim())) e.email = 'Adresse e-mail invalide.';
    if (!fields.consent)
      e.consent = 'Votre consentement est nécessaire pour vous recontacter.';
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setServerError('');

    const clientErrors = validate();
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      setStatus('error');
      return;
    }

    const message = [
      'Demande issue du simulateur en ligne.',
      '',
      summary,
      fields.note.trim() ? `\nPrécisions du contact : ${fields.note.trim()}` : '',
    ]
      .join('\n')
      .trim();

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prenom: fields.prenom,
          nom: fields.nom,
          email: fields.email,
          telephone: fields.telephone,
          sujet: `${sujet} — Simulation`,
          message,
          consent: fields.consent,
          website: fields.website,
        }),
      });

      if (res.ok) {
        setStatus('success');
        return;
      }

      const data = await res.json().catch(() => ({}));
      setServerError(
        data.error || "Une erreur est survenue lors de l'envoi. Merci de réessayer."
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
      <div className="rounded-2xl border border-forest/15 bg-cream-50 p-6 text-center sm:p-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 text-forest">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h4 className="mt-5 font-serif text-xl font-semibold text-forest">
          Votre demande a bien été envoyée
        </h4>
        <p className="mt-3 text-sm text-ink/65">
          Merci. Un conseiller vous recontacte sous 48 heures ouvrées avec une
          étude adaptée à votre situation.
        </p>
      </div>
    );
  }

  const busy = status === 'submitting';

  const inputClass = (key?: keyof FieldErrors) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-base text-ink transition-colors placeholder:text-ink/35 focus:border-forest disabled:opacity-60 sm:text-sm ${
      key && errors[key] ? 'border-red-400' : 'border-ink/15'
    }`;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex h-full flex-col rounded-2xl border border-forest/15 border-t-2 border-t-gold/40 bg-cream-50 p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold">
          Étape finale
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-gold/40" />
      </div>
      <h4 className="mt-4 font-serif text-2xl font-semibold text-forest">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">{text}</p>

      {/* Pot de miel anti-spam : masqué aux humains */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor={`sim-website-${sujet}`}>Ne pas remplir</label>
        <input
          id={`sim-website-${sujet}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-forest">
            Prénom <span className="text-gold-dark">*</span>
          </label>
          <input
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
          <label className="mb-1.5 block text-sm font-medium text-forest">
            Nom <span className="text-gold-dark">*</span>
          </label>
          <input
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
          <label className="mb-1.5 block text-sm font-medium text-forest">
            E-mail <span className="text-gold-dark">*</span>
          </label>
          <input
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
          <label className="mb-1.5 block text-sm font-medium text-forest">Téléphone</label>
          <input
            type="tel"
            value={fields.telephone}
            onChange={(e) => set('telephone', e.target.value)}
            className={inputClass()}
            placeholder="06 12 34 56 78"
            autoComplete="tel"
            disabled={busy}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-forest">
          Précisions (facultatif)
        </label>
        <textarea
          rows={3}
          value={fields.note}
          onChange={(e) => set('note', e.target.value)}
          className={`${inputClass()} resize-y`}
          placeholder="Un élément de contexte à transmettre au conseiller…"
          disabled={busy}
        />
      </div>

      <div className="mt-4 flex items-start gap-3">
        <input
          type="checkbox"
          checked={fields.consent}
          onChange={(e) => set('consent', e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-ink/30 text-forest accent-forest"
          disabled={busy}
        />
        <label className="text-sm leading-relaxed text-ink/60">
          J'accepte que mes données soient utilisées pour traiter ma demande,
          conformément à la{' '}
          <a
            href="/politique-de-confidentialite"
            className="underline decoration-gold/50 underline-offset-2 hover:text-forest"
          >
            politique de confidentialité
          </a>
          . <span className="text-gold-dark">*</span>
        </label>
      </div>
      {errors.consent && <p className="mt-1 text-xs text-red-500">{errors.consent}</p>}

      {status === 'error' && serverError && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverError}
        </p>
      )}

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto" disabled={busy}>
        {busy ? 'Envoi en cours…' : 'Recevoir mon étude personnalisée'}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-ink/45">
        Estimation indicative et non contractuelle, fournie à titre informatif.
        Seule une étude personnalisée engage le cabinet.
      </p>
    </form>
  );
}
