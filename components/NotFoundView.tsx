import Link from 'next/link';

/**
 * Contenu de la page 404, partagé entre le 404 du site (avec habillage) et le
 * 404 racine pour les URL ne correspondant à aucune route.
 */
export default function NotFoundView() {
  return (
    <section className="flex min-h-[70vh] items-center bg-forest pt-20 text-cream">
      <div className="container-content py-24 text-center">
        <span className="eyebrow mx-auto mb-6 justify-center">Erreur 404</span>
        <p className="font-serif text-7xl font-semibold text-gold md:text-9xl">404</p>
        <h1 className="mt-6 text-balance font-serif text-3xl font-semibold md:text-4xl">
          Cette page semble introuvable
        </h1>
        <p className="mx-auto mt-4 max-w-md text-cream/70">
          Le lien est peut-être obsolète ou la page a été déplacée. Revenons sur
          un terrain plus sûr.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-gold">
            Retour à l'accueil
          </Link>
          <Link href="/contact" className="btn-outline-light">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
