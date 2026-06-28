import Image from 'next/image';
import Reveal from './Reveal';
import type { ClientLogo } from '@/lib/clientLogos';

/**
 * Bloc « confiance » : un simple bandeau de logos partenaires
 * (« Ils nous font confiance ») défilant en boucle. Pensé pour être intégré
 * en clôture de la section chiffres (cf. ChiffresSection), avec laquelle il
 * partage le fond. Piloté Sanity (lib/clientLogos) — masqué si aucun logo
 * n'est renseigné.
 */

/** Logo partenaire ; repli en serif si pas d'image. */
function Logo({ logo, dup }: { logo: ClientLogo; dup: boolean }) {
  const media = logo.src ? (
    <Image
      src={logo.src}
      alt={dup ? '' : logo.name}
      width={170}
      height={44}
      className="h-8 w-auto max-w-[150px] object-contain opacity-60 !grayscale transition duration-300 hover:opacity-100 hover:!grayscale-0 md:h-9"
    />
  ) : (
    <span className="whitespace-nowrap font-serif text-xl text-ink/35 md:text-2xl">
      {logo.name}
    </span>
  );

  return logo.url && !dup ? (
    <a
      href={logo.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={logo.name}
      className="flex items-center"
    >
      {media}
    </a>
  ) : (
    media
  );
}

/** Bandeau unique de logos partenaires, défilant en boucle. */
function PartnerBandeau({ logos }: { logos: ClientLogo[] }) {
  // Dupliqué pour un défilement sans couture.
  const loop = [...logos, ...logos];
  return (
    <Reveal className="marquee mt-8 py-2 sm:mt-9">
      <div className="marquee-track" style={{ animationDuration: '34s' }}>
        {loop.map((l, j) => (
          <span key={j} className="flex items-center px-6 sm:px-8">
            <Logo logo={l} dup={j >= logos.length} />
          </span>
        ))}
      </div>
    </Reveal>
  );
}

export default function ClientLogosSection({
  eyebrow = 'Ils nous font confiance',
  logos,
}: {
  eyebrow?: string;
  logos: ClientLogo[];
}) {
  // Sans logo partenaire, rien à afficher.
  if (logos.length === 0) return null;

  return (
    <div className="overflow-x-clip">
      <Reveal>
        <span className="eyebrow mx-auto justify-center">{eyebrow}</span>
      </Reveal>
      <PartnerBandeau logos={logos} />
    </div>
  );
}
