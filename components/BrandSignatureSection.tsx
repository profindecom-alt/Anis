import { site } from '@/lib/site';
import Reveal from './Reveal';
import HandwritingWord from './HandwritingWord';

/**
 * Signature de marque manuscrite « écrite au stylo », en clôture de page
 * (juste après la FAQ, avant le CTA final). Le nom Élan Patrimoine se trace de
 * gauche à droite, un stylo suivant le point d'écriture (cf. HandwritingWord
 * + .handwriting dans globals.css). Fond transparent : se pose sur le dégradé
 * crème-or continu du bas de page. Respecte prefers-reduced-motion.
 */
export default function BrandSignatureSection() {
  return (
    <section className="bg-transparent pt-2 pb-10 md:pt-3 md:pb-8">
      <div className="container-content">
        <Reveal className="text-center leading-none text-forest">
          <HandwritingWord className="text-4xl sm:text-5xl md:text-6xl">
            {site.name}
          </HandwritingWord>
        </Reveal>
      </div>
    </section>
  );
}
