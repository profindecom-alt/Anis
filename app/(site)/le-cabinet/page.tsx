import Image from 'next/image';
import Link from 'next/link';
import { imageUrl, img } from '@/lib/images';
import { getSiteInfo } from '@/lib/siteInfo';
import { buildMetadata } from '@/lib/seo';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import Parallax from '@/components/Parallax';
import DrawIcon from '@/components/DrawIcon';
import FrameDraw from '@/components/FrameDraw';
import ChiffresSection from '@/components/ChiffresSection';
import ConvictionSection from '@/components/ConvictionSection';
import ValuesGrid from '@/components/ValuesGrid';

export const metadata = buildMetadata({
  title: 'Le Cabinet',
  description:
    "Découvrez Élan Patrimoine : notre histoire, nos valeurs et nos agréments ORIAS et ACPR. Un cabinet de gestion de patrimoine indépendant au service de ses clients.",
  path: '/le-cabinet',
});

/* Agréments & garanties — label + icône de chaque entrée du registre. */
const agrements = [
  {
    label: 'Immatriculation ORIAS',
    icon: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4" />
        <path d="M10 13h6M10 17h5" />
      </>
    ),
  },
  {
    label: 'Contrôle ACPR',
    icon: (
      <>
        <path d="M4 9l8-5 8 5" />
        <path d="M6 9v9M10 9v9M14 9v9M18 9v9" />
        <path d="M3 21h18" />
      </>
    ),
  },
  {
    label: 'Responsabilité civile',
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V6z" />
        <path d="M9 12l2 2 4-4.5" />
      </>
    ),
  },
];

export default async function LeCabinetPage() {
  const info = await getSiteInfo();

  // Entrées du registre d'agréments (valeurs réglementaires réelles).
  const credentials = [
    {
      ...agrements[0],
      value: <>N° {info.orias}</>,
      desc: (
        <>
          Registre unique des intermédiaires en assurance, banque et finance.{' '}
          <a
            href={info.oriasUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-dark underline decoration-gold/40 underline-offset-2 transition-colors hover:text-gold"
          >
            orias.fr
          </a>
        </>
      ),
    },
    {
      ...agrements[1],
      value: 'Autorité de tutelle',
      desc: info.acpr,
    },
    {
      ...agrements[2],
      value: <>RCP &amp; Garantie</>,
      desc: 'Garantie financière et assurance RCP conformes aux exigences légales en vigueur.',
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Le Cabinet"
        title="Un cabinet indépendant, une exigence constante"
        intro="Depuis 2018, nous mettons l'indépendance, l'expertise et la discrétion au service d'une clientèle privée et professionnelle."
        breadcrumbs={[{ label: 'Le Cabinet' }]}
        imageId={img.cabinetTeam}
      />

      {/* Notre histoire — spread éditorial, image au cadre doré + millésime -- */}
      <section className="relative overflow-hidden bg-cream py-24 md:py-36">
        {/* Lettre géante en filigrane, purement décorative */}
        <span
          aria-hidden="true"
          className="numeral-ghost pointer-events-none absolute -left-6 top-10 select-none font-serif text-[14rem] font-bold text-forest/[0.03] md:text-[22rem]"
        >
          É
        </span>

        <div className="container-content relative grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="eyebrow mb-6">Notre histoire</span>

            {/* Citation d'ouverture, guillemet surdimensionné façon marque */}
            <div className="relative pl-7 md:pl-9">
              <span
                aria-hidden="true"
                className="absolute -left-1 -top-3 font-serif text-[5rem] italic leading-[0.6] text-gold/35 md:text-[6rem]"
              >
                &ldquo;
              </span>
              <blockquote className="m-0 text-balance font-serif text-2xl font-medium leading-snug text-forest md:text-[2rem]">
                Derrière chaque dossier se cache une situation humaine, des
                objectifs propres, des contraintes spécifiques.
              </blockquote>
            </div>

            <span className="mt-7 block h-px w-12 bg-gold/60" />

            <div className="mt-8 space-y-5 leading-relaxed text-ink/70">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-serif first-letter:text-[3.6rem] first-letter:font-semibold first-letter:leading-[0.66] first-letter:text-gold-dark">
                Élan Patrimoine est né d&apos;une conviction simple : chaque
                parcours patrimonial mérite un accompagnement sur-mesure, loin
                des solutions standardisées.
              </p>
              <p>
                Tout commence en 2018, lorsque notre fondateur développe une
                expertise concrète sur les enjeux qui concernent vraiment les
                chefs d&apos;entreprise, professionnels libéraux et travailleurs
                non-salariés : protection sociale, préparation de la retraite,
                optimisation de l&apos;épargne, immobilier et transmission.
              </p>
              <p>
                C&apos;est cette conviction qui donne naissance à Élan
                Patrimoine : un cabinet pensé pour offrir à chaque client un
                accompagnement de proximité, des explications claires et des
                solutions réellement adaptées, qu&apos;il s&apos;agisse de
                préparer sa retraite, de sécuriser son activité ou de faire
                fructifier son épargne.
              </p>
              <p>
                Aujourd&apos;hui, le cabinet accompagne indépendants, salariés
                et dirigeants avec une approche directe, transparente et un
                suivi dans la durée.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
              {/* Cadre au double filet doré (écho du sceau / des photos de
                  marque), tracé à l'entrée dans le viewport. */}
              <div className="relative p-2 sm:p-2.5">
                {/* Filet extérieur */}
                <FrameDraw className="absolute inset-0 z-10 border-[1.5px] border-gold/55" delay={150}>
                  <span />
                </FrameDraw>
                {/* Filet intérieur */}
                <FrameDraw className="absolute inset-[7px] z-10 border border-gold/30" delay={400}>
                  <span />
                </FrameDraw>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Parallax className="absolute inset-0" speed={0.1}>
                    <Image
                      src={imageUrl(img.cabinet, 800, 78)}
                      alt="Cabinet Élan Patrimoine, conseil personnalisé"
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </Parallax>
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/40 to-transparent"
                  />
                </div>
              </div>

              {/* Millésime de fondation, en chiffres elzéviriens */}
              <div className="absolute -bottom-5 left-4 z-20 flex items-stretch gap-4 bg-forest px-6 py-4 shadow-elevated sm:-left-6">
                <span
                  className="self-center font-serif text-[2.6rem] font-medium leading-none text-gold"
                  style={{ fontFeatureSettings: "'onum' 1" }}
                >
                  2018
                </span>
                <span aria-hidden="true" className="w-px self-stretch bg-cream/20" />
                <span className="self-center text-[0.65rem] uppercase leading-tight tracking-[0.2em] text-cream/60">
                  Année de
                  <br />
                  fondation
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Nos valeurs — grille « registre » navy, filets dorés + numéraux ---- */}
      <section
        className="relative overflow-hidden py-12 sm:py-24 md:py-32"
        style={{
          background:
            'radial-gradient(120% 130% at 0% 0%, #1d4577 0%, rgba(29,69,119,0) 55%), linear-gradient(150deg, #11254a 0%, #091d38 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-gold/[0.07] blur-[130px]"
        />

        <div className="container-content relative">
          <SectionHeading
            eyebrow="Nos valeurs"
            light
            title="Quatre principes intangibles"
            intro="Ils fondent chacune de nos recommandations et la confiance que nos clients nous accordent."
            className="mb-14 md:mb-16"
          />

          {/* gap-px sur fond doré = filets dorés entre les cellules */}
          <ValuesGrid />
        </div>

        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
        />
      </section>

      {/* Chiffres clés — fond or crème animé (voile crème) ---------- */}
      <ChiffresSection variant="cream" />

      {/* Citation de marque — propre à la page (évite de répéter la
          citation utilisée en accueil / notre approche) ----------------- */}
      <ConvictionSection
        variant="navy"
        eyebrow="L'esprit du cabinet"
        quote={
          <>
            <span className="quote-line">
              Indépendants par choix, nous ne devons de comptes qu&apos;à{' '}
            </span>
            <em className="quote-line font-medium italic text-gold">
              nos clients
            </em>
            <span className="quote-line">.</span>
          </>
        }
      />

      {/* Agréments & garanties + CTA : un seul fond continu ---------- */}
      <div className="bg-cream-gold">
        <section className="relative overflow-hidden pt-12 pb-6 md:pt-28 md:pb-8">
          <div className="container-content">
            <SectionHeading
              eyebrow="Agréments & garanties"
              title="Un cadre réglementaire qui vous protège"
              intro="Élan Patrimoine exerce dans le strict respect de la réglementation applicable au conseil en investissements financiers et à l'intermédiation en assurance."
              className="mb-14"
            />

            {/* Registre : trois entrées séparées par des filets dorés.
                Chaque carte apparaît en cascade ; son picto se trace. */}
            <div className="grid divide-y divide-gold/20 overflow-hidden rounded-3xl border border-gold/25 bg-white/55 shadow-card md:grid-cols-3 md:divide-x md:divide-y-0">
              {credentials.map((c, i) => (
                <Reveal
                  key={c.label}
                  delay={i * 120}
                  className="group relative p-8 transition-colors duration-300 hover:bg-white/80 md:p-9"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold-dark transition-colors duration-300 group-hover:border-gold/60">
                    <DrawIcon delay={i * 120 + 200}>{c.icon}</DrawIcon>
                  </span>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-gold-dark">
                    {c.label}
                  </p>
                  <p className="mt-3 font-serif text-3xl font-semibold text-forest">
                    {c.value}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    {c.desc}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={240} className="mt-10">
              <Link
                href="/mentions-legales"
                className="group inline-flex items-center gap-3 text-sm font-medium text-ink/60 underline decoration-gold/40 underline-offset-4 transition-colors hover:text-forest"
              >
                Consulter les mentions légales
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 16 12"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M1 6h13M9 1l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </Reveal>
          </div>
        </section>

        <CTASection bgClassName="bg-transparent" />
      </div>
    </>
  );
}
