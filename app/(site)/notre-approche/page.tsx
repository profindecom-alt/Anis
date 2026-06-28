import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { img } from '@/lib/images';
import PageHero from '@/components/PageHero';
import MethodeMeridienne from '@/components/MethodeMeridienne';
import SignatureSection from '@/components/SignatureSection';
import CTASection from '@/components/CTASection';
import ComparatifCarousel from '@/components/ComparatifCarousel';
import Reveal from '@/components/Reveal';
import LineDraw from '@/components/LineDraw';

export const metadata = buildMetadata({
  title: 'Notre Approche',
  description:
    "Une ligne directrice tenue dans le temps : diagnostic, stratégie, mise en œuvre. Nos engagements et ce qui distingue un cabinet indépendant d'un réseau bancaire.",
  path: '/notre-approche',
});

const engagements = [
  {
    title: 'Indépendance totale',
    text: "Aucun produit maison, aucune appartenance à un groupe bancaire. Nos recommandations ne servent que votre intérêt.",
  },
  {
    title: 'Transparence des frais',
    text: 'Une rémunération claire et expliquée. Vous savez précisément ce que vous payez et pourquoi.',
  },
  {
    title: 'Suivi dans la durée',
    text: "Un point d'étape régulier pour adapter votre stratégie à votre vie et à la conjoncture.",
  },
  {
    title: 'Confidentialité absolue',
    text: 'Vos informations restent strictement protégées, dans le respect du secret professionnel.',
  },
];

export default function NotreApprochePage() {
  return (
    <>
      <PageHero
        eyebrow="Notre approche"
        title="Une ligne directrice, tenue dans le temps"
        intro="Du premier diagnostic à la mise en œuvre, votre patrimoine suit un fil conducteur unique : une méthode lisible, des arbitrages motivés, un cap qui ne dévie pas au gré des marchés."
        breadcrumbs={[{ label: 'Notre Approche' }]}
        imageId={img.approche}
      />

      {/* Engagements — registre clair, éditorial (change de rythme) ----- */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-content">
          <Reveal className="max-w-2xl">
            <span className="eyebrow mb-5">Nos engagements</span>
            <h2 className="text-balance text-3xl font-semibold leading-[1.1] text-forest md:text-[2.6rem]">
              Ce sur quoi vous pouvez compter
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/70 md:text-lg">
              Quatre engagements fermes qui structurent notre relation, du
              premier rendez-vous au suivi de long terme.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 md:mt-16">
            {engagements.map((e, i) => (
              <Reveal key={e.title} delay={i * 80}>
                <div className="group relative pt-6">
                  {/* Filet supérieur qui se trace à l'entrée, doré au survol */}
                  <LineDraw
                    delay={i * 80 + 150}
                    className="absolute left-0 right-0 top-0 h-px bg-ink/15 transition-colors duration-500 group-hover:bg-gold"
                  />
                  <div className="flex items-baseline gap-4">
                    <span className="numeral-ghost font-serif text-2xl font-medium text-gold-dark">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-forest md:text-2xl">
                      {e.title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink/70">
                    {e.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* La méthode — la méridienne (signature de la page) -------------- */}
      <MethodeMeridienne />

      {/* Signature de marque + repères de la maison (variante de page) -- */}
      <SignatureSection variant="approche" />

      {/* Comparatif — Minimal Premium */}
      <section
        className="relative pt-24 md:pt-32"
        style={{
          color: '#f3f1ea',
          background:
            'radial-gradient(120% 120% at 100% 0%, #1c3868 0%, rgba(28,56,104,0) 46%), linear-gradient(150deg, #11254a 0%, #0d1d3b 100%)',
        }}
      >
        <div className="container-content relative z-10">
          <Reveal className="mb-12 md:mb-24 border-t border-cream/10 pt-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
              <div className="max-w-2xl">
                <span className="text-[0.6rem] uppercase tracking-widest text-cream/40 block mb-4">
                  Le Modèle Indépendant
                </span>
                <h2 className="text-balance text-[1.75rem] leading-[1.15] font-serif text-cream sm:text-4xl sm:leading-[1.1] md:text-5xl">
                  Une <span className="text-gold">différence</span> qui se lit dans la durée.
                </h2>
              </div>
              <p className="text-[0.85rem] leading-relaxed text-cream/40 md:max-w-[280px] font-light md:pb-1">
                Six critères concrets qui distinguent notre accompagnement d&apos;une
                gestion bancaire classique.
              </p>
            </div>
          </Reveal>

          {/* Carrousel des critères de comparaison */}
          <Reveal>
            <ComparatifCarousel />
          </Reveal>
        </div>

        {/* Le CTA partage maintenant le même fond bleu dégradé que la section */}
        <CTASection variant="gold" bgClassName="bg-transparent" />
      </section>
    </>
  );
}


