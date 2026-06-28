'use client';

import Link from 'next/link';
import { useEffect } from 'react';

/**
 * Frontière d'erreur au niveau des routes (conserve header/footer du layout).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Journalisation côté client (à brancher sur un service de suivi si besoin).
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center bg-forest pt-20 text-cream">
      <div className="container-content py-24 text-center">
        <span className="eyebrow eyebrow-light mx-auto mb-6 justify-center">
          Erreur
        </span>
        <h1 className="text-balance font-serif text-3xl font-semibold md:text-4xl">
          Une erreur inattendue est survenue
        </h1>
        <p className="mx-auto mt-4 max-w-md text-cream/70">
          Nous sommes désolés pour la gêne occasionnée. Vous pouvez réessayer ou
          revenir à l'accueil.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <button type="button" onClick={reset} className="btn-gold">
            Réessayer
          </button>
          <Link href="/" className="btn-outline-light">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
