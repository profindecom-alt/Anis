import Link from 'next/link';
import Image from 'next/image';

/**
 * Logo horizontal d'Élan Patrimoine (écusson « élan » + mot-symbole).
 * `variant` choisit la déclinaison officielle :
 *   - dark  : version couleur (bleu nuit + or) pour les fonds clairs (header)
 *   - light : version blanche pour les fonds sombres (footer)
 * Les fichiers sont détourés (fond transparent) et rognés au plus juste.
 */
export default function Logo({
  variant = 'dark',
  className = '',
  priority = false,
}: {
  variant?: 'dark' | 'light';
  className?: string;
  priority?: boolean;
}) {
  const { src, width, height } =
    variant === 'light'
      ? { src: '/logos/lockup-white.png', width: 1746, height: 263 }
      : { src: '/logos/lockup-navy.png', width: 1876, height: 340 };

  return (
    <Link
      href="/"
      aria-label="Élan Patrimoine, accueil"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        priority={priority}
        sizes="260px"
        className="h-8 w-auto md:h-9"
      />
    </Link>
  );
}
