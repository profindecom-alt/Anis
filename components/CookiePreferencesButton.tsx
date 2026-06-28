'use client';

/**
 * Lien « Gérer les cookies ».
 * Rouvre le bandeau de consentement pour permettre de modifier ou de retirer
 * son choix à tout moment (exigence CNIL : le retrait du consentement doit
 * être aussi simple que son recueil). Communique avec ConsentManager via un
 * évènement applicatif, sans état partagé.
 */
export default function CookiePreferencesButton({
  className = '',
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('elan:open-consent'))}
      className={className}
    >
      Gérer les cookies
    </button>
  );
}
