/**
 * Validation partagée entre le formulaire client et l'API serveur,
 * afin d'appliquer exactement les mêmes règles des deux côtés.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactPayload {
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  sujet?: string;
  message: string;
  consent: boolean;
  /** Champ piège anti-spam : doit rester vide. */
  website?: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

// Plafonds de longueur (protection contre les charges utiles surdimensionnées
// transmises au webhook). Les champs courts restent raisonnablement larges.
const MAX_SHORT = 100; // prénom, nom, téléphone, sujet, référence
const MAX_MESSAGE = 4000;

export function validateContact(data: Partial<ContactPayload>): ContactErrors {
  const e: ContactErrors = {};
  if (!data.prenom || !data.prenom.trim()) e.prenom = 'Votre prénom est requis.';
  else if (data.prenom.length > MAX_SHORT) e.prenom = 'Votre prénom est trop long.';
  if (!data.nom || !data.nom.trim()) e.nom = 'Votre nom est requis.';
  else if (data.nom.length > MAX_SHORT) e.nom = 'Votre nom est trop long.';
  if (!data.email || !EMAIL_RE.test(data.email.trim()))
    e.email = 'Adresse e-mail invalide.';
  else if (data.email.length > 254) e.email = 'Adresse e-mail invalide.';
  if (data.telephone && data.telephone.length > MAX_SHORT)
    e.telephone = 'Numéro de téléphone invalide.';
  if (data.sujet && data.sujet.length > MAX_SHORT)
    e.sujet = 'Sujet invalide.';
  if (!data.message || data.message.trim().length < 10)
    e.message = 'Merci de détailler votre demande (10 caractères min.).';
  if (data.message && data.message.length > MAX_MESSAGE)
    e.message = 'Votre message est trop long.';
  if (!data.consent) e.consent = 'Votre consentement est nécessaire pour vous recontacter.';
  return e;
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}
