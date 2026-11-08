import { getSiteInfo } from '@/lib/siteInfo';
import { buildMetadata } from '@/lib/seo';
import LegalLayout from '@/components/LegalLayout';

export const metadata = buildMetadata({
  title: 'Mentions légales',
  description:
    "Mentions légales d'Élan Patrimoine : identité de l'éditeur, SIREN, SIRET, inscription ORIAS, hébergement et propriété intellectuelle.",
  path: '/mentions-legales',
});

export default async function MentionsLegalesPage() {
  const info = await getSiteInfo();
  return (
    <LegalLayout
      title="Mentions légales"
      intro="Informations relatives à l'éditeur du site et au cabinet Élan Patrimoine."
      breadcrumbLabel="Mentions légales"
      updated="26 octobre 2026"
      ctaBgClassName="bg-cream"
    >
      <h2>Éditeur du site</h2>
      <p>
        Le présent site est édité par <strong>{info.legalName}</strong>,{' '}
        {info.legalForm}, au capital social de {info.capital}, immatriculée au{' '}
        {info.registration}, dont le siège social est situé {info.address.street},{' '}
        {info.address.zip} {info.address.city}, {info.address.country}.
      </p>
      <ul>
        <li>SIREN : {info.siren}</li>
        <li>SIRET du siège : {info.siret}</li>
        <li>Activité principale : {info.activity} (APE {info.ape})</li>
        <li>Adresse e-mail : {info.email}</li>
        <li>Téléphone : {info.phoneDisplay}</li>
        <li>Directeur de la publication : le représentant légal de {info.legalName}</li>
      </ul>
      <p>
        L'identité de l'entreprise peut être vérifiée sur{' '}
        <a
          href="https://annuaire-entreprises.data.gouv.fr/entreprise/106362254"
          target="_blank"
          rel="noopener noreferrer"
        >
          l'Annuaire des Entreprises
        </a>
        , service public de l'État.
      </p>

      <h2>Inscription ORIAS</h2>
      <p>
        {info.legalName} figure au registre unique des intermédiaires en
        assurance, banque et finance (ORIAS) sous le numéro{' '}
        <strong>{info.orias}</strong>, vérifiable sur{' '}
        <a href={info.oriasUrl} target="_blank" rel="noopener noreferrer">
          www.orias.fr
        </a>
        . Les catégories d'inscription, leur portée et leur validité sont celles
        indiquées sur la fiche ORIAS à la date de sa consultation ; cette fiche
        officielle fait foi.
      </p>

      <h2>Informations précontractuelles</h2>
      <p>
        Avant toute mission, le client reçoit les informations réglementaires
        applicables à la prestation envisagée, notamment l'identité de
        l'intervenant, le périmètre de son accompagnement et ses modalités de
        rémunération.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Hostinger International Limited, 61 Lordou
        Vironos Street, 6023 Larnaca, Chypre. Les informations contractuelles de
        l'hébergeur sont disponibles sur{' '}
        <a
          href="https://www.hostinger.com/fr/legal/termes-universels-de-contrat-de-service"
          target="_blank"
          rel="noopener noreferrer"
        >
          hostinger.com
        </a>
        .
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des éléments composant ce site (textes, graphismes, logo,
        photographies, structure) est protégé par le droit de la propriété
        intellectuelle. Toute reproduction, représentation ou diffusion, totale
        ou partielle, sans autorisation écrite préalable de {info.legalName}, est
        interdite et constitue une contrefaçon sanctionnée par le Code de la
        propriété intellectuelle.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Les informations diffusées sur ce site le sont à titre indicatif et ne
        constituent ni un conseil personnalisé, ni une offre de produit ou de
        service. {info.legalName} s'efforce d'assurer l'exactitude des
        informations publiées mais ne saurait être tenue responsable d'éventuelles
        erreurs ou omissions. Tout conseil personnalisé fait l'objet d'un document
        écrit dans le cadre d'une relation contractuelle.
      </p>

      <h2>Liens hypertextes</h2>
      <p>
        Ce site peut contenir des liens vers des sites tiers. {info.legalName}
        n'exerce aucun contrôle sur ces sites et décline toute responsabilité
        quant à leur contenu.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. Tout
        litige relatif à leur interprétation ou à leur exécution relève des
        tribunaux français compétents.
      </p>
    </LegalLayout>
  );
}
