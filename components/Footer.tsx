import Link from 'next/link';
import Logo from './Logo';
import { expertises } from '@/lib/site';
import { getSiteInfo } from '@/lib/siteInfo';

const columns = [
  {
    title: 'Nos Services',
    links: expertises.map((e) => ({
      label: e.title,
      href: `/nos-expertises/${e.slug}`,
    })),
  },
  {
    title: 'Le Cabinet',
    links: [
      { label: 'Le Cabinet', href: '/le-cabinet' },
      { label: 'Notre Approche', href: '/notre-approche' },
      { label: 'Actualités', href: '/actualites' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default async function Footer() {
  const year = new Date().getFullYear();
  const info = await getSiteInfo();

  return (
    <footer
      className="text-cream/80"
      style={{
        // Variante « Dégradé navy » : grain fin superposé à un dégradé navy
        // qui s'assombrit vers le bas.
        background:
          'radial-gradient(rgba(245,240,232,0.05) 1px, transparent 1px) 0 0 / 5px 5px, ' +
          'linear-gradient(180deg, #13284f 0%, #0d1d3b 58%, #091d38 100%)',
      }}
    >
      {/* Ligne néon dorée de séparation */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" style={{ boxShadow: '0 0 16px 1px rgba(255,184,28,0.35)' }} />
      {/* Corps */}
      <div className="container-content py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-12 lg:gap-8">
          {/* Identité */}
          <div className="col-span-2 lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
              Cabinet indépendant de gestion de patrimoine. Nous conseillons et
              accompagnons une clientèle privée et professionnelle exigeante.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href={info.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8h4.5v15H.25V8zm7.5 0h4.31v2.05h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V23h-4.5V8z" />
                </svg>
              </a>
              <a
                href={info.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a
                href={info.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Colonnes de liens */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="-mx-2 inline-block rounded px-2 py-1.5 text-sm text-cream/65 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="col-span-2 lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">
              Contact
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a
                  href={`mailto:${info.email}`}
                  className="flex items-start gap-3 text-cream/70 transition-colors hover:text-cream"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-gold">
                    <path d="M3 7l9 6 9-6M3 7v10a1 1 0 001 1h16a1 1 0 001-1V7M3 7a1 1 0 011-1h16a1 1 0 011 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="min-w-0 break-words">{info.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${info.phone}`}
                  className="flex items-center gap-3 text-cream/70 transition-colors hover:text-cream"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-gold">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {info.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3 text-cream/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-gold">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="leading-relaxed">
                  {info.address.street}
                  <br />
                  {info.address.zip} {info.address.city}
                </span>
              </li>
            </ul>
            <Link
              href="/contact#assistant"
              className="btn-gold mt-7 w-full text-sm sm:w-auto"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>

        {/* Bandeau réglementaire */}
        <div className="mt-12 border-t border-cream/10 pt-8 md:mt-16">
          <p className="text-xs leading-relaxed text-cream/55">
            {info.legalName}. {info.rcs}. Cabinet de
            conseil en gestion de patrimoine immatriculé à l'ORIAS sous le numéro{' '}
            <span className="text-cream/75">{info.orias}</span> (
            <a
              href={info.oriasUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-cream/30 underline-offset-2 hover:text-cream"
            >
              www.orias.fr
            </a>
            ). Activité soumise au contrôle de l'ACPR, {info.acpr}.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-cream/50">
              © {year} {info.legalName}. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-cream/50">
              <Link href="/mentions-legales" className="py-1 transition-colors hover:text-cream">
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="py-1 transition-colors hover:text-cream">
                Confidentialité
              </Link>
              <Link href="/reclamation" className="py-1 transition-colors hover:text-cream">
                Réclamation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
