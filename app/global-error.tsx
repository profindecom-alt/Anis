'use client';

import './globals.css';

/**
 * Frontière d'erreur racine : remplace le layout si l'erreur survient dans
 * celui-ci. Doit rendre ses propres balises <html> et <body>.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen items-center justify-center bg-cream text-ink">
        <div className="container-content py-24 text-center">
          <p className="font-serif text-6xl font-semibold text-gold-dark">Oups</p>
          <h1 className="mt-4 font-serif text-2xl font-semibold text-forest">
            Le site a rencontré un problème
          </h1>
          <p className="mx-auto mt-3 max-w-md text-ink/60">
            Une erreur est survenue lors du chargement de la page. Merci de
            recharger.
          </p>
          <button type="button" onClick={reset} className="btn-primary mt-8">
            Recharger la page
          </button>
        </div>
      </body>
    </html>
  );
}
