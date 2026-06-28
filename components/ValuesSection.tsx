'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { imageUrl } from '@/lib/images';
import { values } from '@/lib/site';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import Parallax from './Parallax';

/**
 * Section « Nos valeurs » — spread éditorial asymétrique.
 * Colonne gauche : en-tête + visuel feutré du cabinet avec citation incrustée
 * (filets dorés d'angle). Colonne droite : grille 2×2 de cartes premium, une
 * icône au trait par valeur, grand numéro elzévirien en filigrane, filet doré
 * qui se trace au survol et légère élévation. Registre crème/or de la marque.
 */

/* Icônes au trait (24×24, stroke = currentColor) associées à chaque valeur.
   Clé = titre de la valeur (lib/site.ts) ; repli neutre si non trouvé. */
const VALUE_ICONS: Record<string, ReactNode> = {
  // Indépendance — boussole (sa propre direction)
  Indépendance: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z" />
    </>
  ),
  // Expertise — cible (précision, maîtrise)
  Expertise: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  // Discrétion — bouclier + serrure (confidentialité)
  Discrétion: (
    <>
      <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />
      <circle cx="12" cy="10.5" r="1.5" />
      <path d="M12 12v2.2" />
    </>
  ),
  // Durabilité — jeune pousse (long terme, générations)
  Durabilité: (
    <>
      <path d="M12 22V11" />
      <path d="M12 11c0-3.3 2.4-6 6.5-6 0 3.3-2.4 6-6.5 6Z" />
      <path d="M12 14c0-2.8-2.1-5-5.6-5 0 2.8 2.1 5 5.6 5Z" />
    </>
  ),
};

const fallbackIcon = (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12l2.5 2.5L16 9" />
  </>
);

export default function ValuesSection() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameVisible, setFrameVisible] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setFrameVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFrameVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream-gold py-24 md:py-32">
      {/* Lueur dorée discrète (profondeur, derrière les cartes) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[150px]"
      />

      <div className="container-content relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Colonne gauche : en-tête + visuel feutré */}
        <div className="flex flex-col lg:col-span-5">
          <SectionHeading
            eyebrow="Nos valeurs"
            title="Ce qui guide chacune de nos décisions"
            intro="Quatre principes intangibles fondent la relation que nous nouons avec nos clients."
          />
          <Reveal delay={150} className="mt-10 hidden flex-1 lg:block">
            <div ref={frameRef} className="group relative h-full min-h-[20rem] overflow-hidden shadow-elevated">
              <Parallax className="absolute inset-0" speed={0.1}>
                <Image
                  src={imageUrl('imagevlt1', 800, 78)}
                  alt="Intérieur élégant et feutré évoquant la discrétion du cabinet"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </Parallax>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/75 via-forest/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="font-serif text-lg italic leading-snug text-cream">
                  « Une relation de confiance, pensée pour durer. »
                </span>
                <span className="mt-3 block h-px w-16 bg-gold" />
              </div>
              {/* Corner brackets — draw in from 0×0 when image enters view */}
              <span
                className="pointer-events-none absolute left-5 top-5 border-l-2 border-t-2 border-gold/70 transition-all duration-700 ease-out"
                style={{
                  width: frameVisible ? '2rem' : 0,
                  height: frameVisible ? '2rem' : 0,
                  transitionDelay: frameVisible ? '280ms' : '0ms',
                }}
              />
              <span
                className="pointer-events-none absolute right-5 top-5 border-r-2 border-t-2 border-gold/70 transition-all duration-700 ease-out"
                style={{
                  width: frameVisible ? '2rem' : 0,
                  height: frameVisible ? '2rem' : 0,
                  transitionDelay: frameVisible ? '400ms' : '0ms',
                }}
              />
            </div>
          </Reveal>
        </div>

        {/* Colonne droite : grille 2×2 de cartes premium */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[3px] border border-forest/10 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elevated">
                {/* Filet doré supérieur qui se trace au survol */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-light transition-transform duration-500 group-hover:scale-x-100"
                />
                {/* Grand numéro elzévirien en filigrane */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-4 select-none font-serif text-[5.5rem] font-semibold leading-none text-gold/[0.08] transition-colors duration-500 group-hover:text-gold/[0.14]"
                >
                  0{i + 1}
                </span>

                {/* Icône de la valeur */}
                <span className="relative flex h-12 w-12 items-center justify-center rounded-[3px] bg-gold/10 text-gold-dark ring-1 ring-gold/20 transition-all duration-500 group-hover:bg-gold group-hover:text-forest-dark group-hover:ring-gold">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {VALUE_ICONS[v.title] ?? fallbackIcon}
                  </svg>
                </span>

                <h3 className="relative mt-6 font-serif text-xl font-semibold text-forest">
                  {v.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-ink/65">
                  {v.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
