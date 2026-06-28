import type { ExpertiseSlug } from '@/lib/site';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import EpargneSimulator from './EpargneSimulator';
import DefiscalisationSimulator from './DefiscalisationSimulator';
import PrevoyanceSimulator from './PrevoyanceSimulator';

interface SimConfig {
  eyebrow: string;
  title: string;
  intro: string;
  render: (sujet: string) => React.ReactNode;
}

/**
 * Simulateur propre à chaque expertise, terminé par une capture de lead.
 * `reseau-expert` est volontairement absent : ce service de coordination ne
 * se prête pas à une estimation chiffrée.
 */
const simulators: Partial<Record<ExpertiseSlug, SimConfig>> = {
  'gestion-de-patrimoine': {
    eyebrow: 'Simulateur',
    title: 'Projetez la croissance de votre épargne',
    intro:
      'Estimez le capital que vous pourriez constituer selon votre effort d\'épargne et votre horizon, puis recevez une stratégie sur mesure.',
    render: (sujet) => <EpargneSimulator sujet={sujet} />,
  },
  defiscalisation: {
    eyebrow: 'Simulateur',
    title: "Estimez votre économie d'impôt",
    intro:
      'Évaluez en quelques secondes la réduction d\'impôt possible via un versement sur un PER, puis faites valider vos plafonds réels.',
    render: (sujet) => <DefiscalisationSimulator sujet={sujet} />,
  },
  'assurance-protection': {
    eyebrow: 'Simulateur',
    title: 'Évaluez votre besoin de protection',
    intro:
      'Estimez le capital nécessaire pour préserver le niveau de vie de vos proches, puis faites auditer vos garanties actuelles.',
    render: (sujet) => <PrevoyanceSimulator sujet={sujet} />,
  },
};

export default function ExpertiseSimulator({
  slug,
  sujet,
}: {
  slug: ExpertiseSlug;
  /** Titre de l'expertise, transmis au lead. */
  sujet: string;
}) {
  const config = simulators[slug];
  if (!config) return null;

  return (
    <section id="simulateur" className="scroll-mt-24 bg-cream py-24 md:py-32">
      <div className="container-content">
        <SectionHeading
          eyebrow={config.eyebrow}
          title={config.title}
          intro={config.intro}
          align="center"
          className="mb-14"
        />
        <Reveal>{config.render(sujet)}</Reveal>
      </div>
    </section>
  );
}
