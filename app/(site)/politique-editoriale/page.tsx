import { buildMetadata } from '@/lib/seo';
import { getSiteInfo } from '@/lib/siteInfo';
import LegalLayout from '@/components/LegalLayout';

export const metadata = buildMetadata({
  title: 'Politique éditoriale',
  description:
    "Découvrez les principes de rédaction, de sourçage, de mise à jour et de correction des contenus publiés par Élan Patrimoine.",
  path: '/politique-editoriale',
});

export default async function PolitiqueEditorialePage() {
  const info = await getSiteInfo();

  return (
    <LegalLayout
      title="Politique éditoriale"
      intro="Nos principes de rédaction, de sourçage et de mise à jour des contenus patrimoniaux."
      breadcrumbLabel="Politique éditoriale"
      updated="26 octobre 2026"
      ctaBgClassName="bg-cream"
    >
      <h2>Objectif des publications</h2>
      <p>
        Les articles publiés par {info.legalName} ont une vocation pédagogique.
        Ils présentent des notions patrimoniales, fiscales, financières et
        assurantielles dans un langage accessible. Ils ne constituent ni un
        conseil personnalisé, ni une recommandation d&apos;investissement, ni une
        offre de souscription.
      </p>

      <h2>Auteurs et responsabilité éditoriale</h2>
      <p>
        Chaque article affiche son auteur, sa date de publication et, lorsqu&apos;une
        modification substantielle intervient, sa date de mise à jour. La
        responsabilité éditoriale du site appartient à {info.legalName}.
      </p>

      <h2>Sources privilégiées</h2>
      <p>
        Nous privilégions les sources primaires et institutionnelles : textes
        publiés au Journal officiel, Légifrance, administration fiscale,
        Service-Public.fr, Autorité des marchés financiers, ACPR et organismes
        publics compétents. Les liens utiles sont indiqués dans les articles
        lorsqu&apos;ils permettent au lecteur de vérifier ou d&apos;approfondir un point.
      </p>

      <h2>Actualisation des informations</h2>
      <p>
        La fiscalité, la réglementation et les conditions de marché peuvent
        évoluer rapidement. Les contenus sont datés afin que le lecteur puisse
        apprécier leur contexte. Avant toute décision, les règles applicables
        doivent être vérifiées auprès des sources officielles et au regard de la
        situation individuelle concernée.
      </p>

      <h2>Corrections</h2>
      <p>
        Vous pouvez signaler une erreur factuelle, un lien obsolète ou une
        information à actualiser à{' '}
        <a href={`mailto:${info.email}`}>{info.email}</a>. Après vérification,
        les corrections significatives donnent lieu à une mise à jour de la
        date de modification de l&apos;article.
      </p>

      <h2>Limites</h2>
      <p>
        Un contenu général ne peut tenir compte de l&apos;ensemble des objectifs,
        contraintes, connaissances et risques propres à chaque personne. Une
        analyse personnalisée est nécessaire avant la mise en œuvre de toute
        stratégie patrimoniale.
      </p>
    </LegalLayout>
  );
}
