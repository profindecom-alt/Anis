import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { faqJsonLd } from '@/lib/seo';

export type FaqItem = { q: string; a: string };

/** Questions fréquentes de la page d'accueil (orientées prise de contact). */
const DEFAULT_FAQ: FaqItem[] = [
  {
    q: 'Qu’est-ce qu’un conseiller en gestion de patrimoine indépendant ?',
    a: 'C’est un professionnel qui vous accompagne sur l’ensemble de votre patrimoine sans appartenir à un groupe bancaire ou assureur. Cette indépendance lui permet de sélectionner les solutions dans votre seul intérêt, en toute objectivité.',
  },
  {
    q: 'Faut-il disposer d’un patrimoine important pour vous solliciter ?',
    a: 'Non. Notre accompagnement s’adapte à chaque situation, que vous souhaitiez structurer un premier projet, préparer votre retraite ou organiser une transmission. Ce qui compte, c’est votre objectif, pas un montant minimum.',
  },
  {
    q: 'Comment êtes-vous rémunérés ?',
    a: 'Nous privilégions une rémunération claire, expliquée dès le départ : honoraires de conseil et rémunération sur les solutions mises en place. Tout est détaillé avant la moindre décision, sans surprise.',
  },
  {
    q: 'Le premier rendez-vous est-il payant ?',
    a: 'Le premier échange est gratuit et sans engagement. Il sert à faire connaissance, comprendre votre situation et vérifier ensemble que nous sommes les mieux placés pour vous aider.',
  },
  {
    q: 'Comment se déroule l’accompagnement ?',
    a: 'Nous commençons par un bilan complet de votre situation et de vos objectifs. Nous vous proposons ensuite une stratégie sur mesure, que nous mettons en œuvre puis suivons dans la durée, en l’ajustant au fil de votre vie.',
  },
  {
    q: 'Mes informations restent-elles confidentielles ?',
    a: 'Absolument. La confidentialité est au cœur de notre métier. Vos données sont traitées avec la plus grande discrétion et notre activité est encadrée par des agréments et garanties réglementaires.',
  },
];

/**
 * Section « Questions fréquentes » : accordéon natif (`<details>`), centré sur
 * fond crème clair. Chaque question apparaît en fondu échelonné à l'entrée dans
 * le viewport ; à l'ouverture, l'icône « plus » pivote en croix dorée et la
 * réponse se révèle en fondu (voir `.faq-answer` dans globals.css). Émet aussi
 * le balisage FAQPage (JSON-LD) pour le SEO.
 */
export default function FaqSection({
  items = DEFAULT_FAQ,
}: {
  items?: FaqItem[];
}) {
  return (
    <section className="bg-transparent pt-20 pb-6 md:pt-28 md:pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }}
      />
      <div className="container-content">
        <SectionHeading
          eyebrow="Questions fréquentes"
          align="center"
          title="Vos questions, nos réponses"
          intro="L’essentiel à savoir avant de nous confier votre patrimoine."
          className="mb-10 md:mb-14"
        />

        <div className="mx-auto max-w-3xl border-t border-gold/15">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 80}>
              <details className="faq-item group border-b border-gold/15">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-4">
                    <span className="mt-1.5 font-sans text-xs font-semibold tracking-widest text-gold-dark/60 transition-colors group-open:text-gold-dark">
                      0{i + 1}
                    </span>
                    <span className="font-serif text-lg font-semibold leading-snug text-forest transition-colors group-hover:text-gold-dark md:text-xl">
                      {item.q}
                    </span>
                  </span>
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold-dark transition-all duration-300 group-hover:border-gold/60 group-open:rotate-45 group-open:border-gold group-open:bg-gold group-open:text-forest-dark">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="faq-answer overflow-hidden">
                  <p className="pb-6 pl-9 pr-4 text-[15px] leading-relaxed text-ink/70 md:pr-10">
                    {item.a}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
