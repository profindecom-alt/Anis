'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { mainNav, expertises } from '@/lib/site';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expertisesOpen, setExpertisesOpen] = useState(false);
  const [desktopExpertises, setDesktopExpertises] = useState(false);

  // Ombre + fond opaque dès que l'on défile
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de page
  useEffect(() => {
    setMobileOpen(false);
    setExpertisesOpen(false);
    setDesktopExpertises(false);
  }, [pathname]);

  // Empêche le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // En haut de page, l'en-tête est transparent et survole le hero sombre :
  // contenu clair (logo blanc, liens crème). Au défilement (ou menu mobile
  // ouvert), il devient une barre crème opaque à contenu sombre.
  const light = !scrolled && !mobileOpen;

  // Soulignement doré qui croît depuis le centre (survol + page active)
  const navBase =
    "relative py-2 text-sm font-medium transition-colors duration-200 " +
    "after:pointer-events-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full " +
    "after:origin-center after:scale-x-0 after:rounded-full after:bg-gold " +
    "after:transition-transform after:duration-300 after:ease-out after:content-['']";

  const linkColor = (active: boolean) =>
    active
      ? `after:scale-x-100 ${light ? 'text-white' : 'text-forest'}`
      : light
        ? 'text-cream/85 hover:text-white hover:after:scale-x-100'
        : 'text-ink/70 hover:text-forest hover:after:scale-x-100';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        light
          ? 'border-b border-transparent bg-transparent'
          : mobileOpen
            ? // Menu ouvert : fond crème opaque SANS backdrop-filter, sinon
              // l'overlay plein écran (position: fixed) serait contenu dans
              // l'en-tête au lieu du viewport.
              'border-b border-ink/10 bg-cream'
            : 'border-b border-ink/10 bg-cream/90 shadow-[0_8px_30px_-24px_rgba(28,27,24,0.5)] backdrop-blur-md'
      }`}
    >
      {/* Voile sombre dégradé : garantit la lisibilité du contenu clair
          par-dessus les zones claires de l'image du hero. */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-forest-dark/35 to-transparent transition-opacity duration-300 ${
          light ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Filet doré décoratif quand la barre est opaque */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-opacity duration-300 ${
          light ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <div
        className={`container-content flex items-center justify-between transition-[height] duration-300 ${
          scrolled && !mobileOpen ? 'h-16' : 'h-20'
        }`}
      >
        <Logo priority variant={light ? 'light' : 'dark'} />

        {/* Navigation bureau */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setDesktopExpertises(true)}
                onMouseLeave={() => setDesktopExpertises(false)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setDesktopExpertises(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setDesktopExpertises(false);
                }}
              >
                <span className="flex items-center">
                  <Link
                    href={item.href}
                    className={`${navBase} ${linkColor(
                      isActive(item.href) || desktopExpertises
                    )}`}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDesktopExpertises((v) => !v)}
                    aria-expanded={desktopExpertises}
                    aria-haspopup="true"
                    aria-controls="menu-expertises"
                    aria-label="Afficher le menu des expertises"
                    className={`ml-1 flex h-8 w-6 items-center justify-center transition-colors ${
                      desktopExpertises
                        ? light
                          ? 'text-white'
                          : 'text-forest'
                        : light
                          ? 'text-cream/70 hover:text-white'
                          : 'text-ink/60 hover:text-forest'
                    }`}
                  >
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      className={`transition-transform duration-300 ${
                        desktopExpertises ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </span>
                {/* Dropdown Nos Expertises */}
                <div
                  id="menu-expertises"
                  className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 transition-all duration-300 ease-out ${
                    desktopExpertises
                      ? 'visible translate-y-0 opacity-100'
                      : 'invisible -translate-y-1 opacity-0'
                  }`}
                >
                  {/* Caret pointant vers l'élément de menu */}
                  <div className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm border-l border-t border-ink/10 bg-white" />
                  <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white p-2 shadow-elevated">
                    {expertises.map((e) => (
                      <Link
                        key={e.slug}
                        href={`/nos-expertises/${e.slug}`}
                        onClick={() => setDesktopExpertises(false)}
                        className="group/item flex items-start gap-3.5 rounded-xl px-4 py-3 transition-colors hover:bg-cream"
                      >
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cream font-serif text-sm font-semibold text-gold-dark transition-colors group-hover/item:bg-gold/15">
                          {e.pillar}
                        </span>
                        <span className="flex flex-col">
                          <span className="text-sm font-medium text-forest">
                            {e.title}
                          </span>
                          <span className="mt-0.5 line-clamp-1 text-xs text-ink/50">
                            {e.excerpt}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`${navBase} ${linkColor(isActive(item.href))}`}
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className={`ml-1 rounded-none text-sm ${light ? 'btn-cream' : 'btn-primary'}`}
          >
            Nous contacter
          </Link>
        </nav>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
            light
              ? 'border-cream/30 text-cream hover:border-cream/60 hover:bg-cream/10'
              : 'border-ink/15 text-forest hover:border-forest/40 hover:bg-forest/5'
          }`}
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 rounded-full bg-current transition-all duration-300 ease-out ${
                mobileOpen ? 'top-1.5 w-5 rotate-45' : 'w-5'
              }`}
            />
            <span
              className={`absolute right-0 top-1.5 h-0.5 rounded-full bg-current transition-all duration-300 ease-out ${
                mobileOpen ? 'w-0 opacity-0' : 'w-3.5'
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 rounded-full bg-current transition-all duration-300 ease-out ${
                mobileOpen ? 'top-1.5 w-5 -rotate-45' : 'w-5'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Menu mobile plein écran */}
      <div
        inert={!mobileOpen}
        className={`fixed inset-x-0 bottom-0 top-20 z-40 bg-cream lg:hidden ${
          mobileOpen
            ? 'visible opacity-100'
            : 'pointer-events-none invisible opacity-0'
        } transition-opacity duration-300`}
      >
        <nav
          className="container-content flex h-full flex-col overflow-y-auto py-8"
          aria-label="Navigation mobile"
        >
          {mainNav.map((item, i) => {
            // Apparition décalée des entrées à l'ouverture
            const reveal = `transition-all duration-500 ease-out ${
              mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`;
            const delay = mobileOpen ? `${i * 60 + 80}ms` : '0ms';

            return item.children ? (
              <div
                key={item.href}
                className={`border-b border-ink/10 ${reveal}`}
                style={{ transitionDelay: delay }}
              >
                <button
                  type="button"
                  onClick={() => setExpertisesOpen((v) => !v)}
                  className="flex w-full items-center justify-between py-4 text-left text-xl font-medium text-forest"
                  aria-expanded={expertisesOpen}
                >
                  {item.label}
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-forest transition-transform duration-300 ${
                      expertisesOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 10 6"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ${
                    expertisesOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <Link
                    href={item.href}
                    className="block py-2.5 pl-1 text-sm font-medium uppercase tracking-wide text-gold-dark"
                  >
                    Toutes nos expertises
                  </Link>
                  {expertises.map((e) => (
                    <Link
                      key={e.slug}
                      href={`/nos-expertises/${e.slug}`}
                      className="flex items-center gap-3 py-3 text-base text-ink/75 transition-colors hover:text-forest"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cream-200/70 font-serif text-sm font-semibold text-gold-dark">
                        {e.pillar}
                      </span>
                      {e.title}
                    </Link>
                  ))}
                  <div className="h-2" />
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b border-ink/10 py-4 text-xl font-medium text-forest ${reveal}`}
                style={{ transitionDelay: delay }}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className={`btn-primary mt-8 w-full transition-all duration-500 ease-out ${
              mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
            style={{ transitionDelay: mobileOpen ? `${mainNav.length * 60 + 120}ms` : '0ms' }}
          >
            Nous contacter
          </Link>
        </nav>
      </div>
    </header>
  );
}
