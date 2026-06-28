import Reveal from './Reveal';

/**
 * Surtitre + titre + intro réutilisés en tête de section.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  light = false,
  className = '',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start';
  return (
    <Reveal
      className={`flex max-w-2xl flex-col ${alignment} ${className}`}
    >
      {eyebrow && (
        <span className={`eyebrow mb-5 ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</span>
      )}
      <h2
        className={`text-balance text-3xl font-semibold leading-[1.1] md:text-[2.6rem] ${
          light ? 'text-cream' : 'text-forest'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-base leading-relaxed md:text-lg ${
            light ? 'text-cream/70' : 'text-ink/70'
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
