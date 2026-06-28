import { getSiteInfo } from '@/lib/siteInfo';
import { buildMetadata } from '@/lib/seo';
import LegalLayout from '@/components/LegalLayout';

export const metadata = buildMetadata({
  title: 'Mentions légales',
  description:
    "Mentions légales du cabinet Élan Patrimoine : éditeur, hébergement, immatriculation ORIAS, autorité de contrôle ACPR et propriété intellectuelle.",
  path: '/mentions-legales',
});

export default async function MentionsLegalesPage() {
  const info = await getSiteInfo();
  return (
    <LegalLayout
      title="Mentions légales"
      intro="Informations relatives à l'éditeur du site et au cabinet Élan Patrimoine."
      breadcrumbLabel="Mentions légales"
      updated="12 juin 2026"
      ctaBgClassName="bg-cream"
    >
      <h2>Éditeur du site</h2>
      <p>
        Le présent site est édité par <strong>{info.legalName}</strong>, société
        par actions simplifiée au capital de {info.capital}, immatriculée au{' '}
        {info.rcs}, dont le siège social est situé {info.address.street},{' '}
        {info.address.zip} {info.address.city}, France.
      </p>
      <ul>
        <li>Adresse e-mail : {info.email}</li>
        <li>Téléphone : {info.phoneDisplay}</li>
        <li>Directeur de la publication : le représentant légal de {info.legalName}</li>
      </ul>

      <h2>Immatriculation et activité réglementée</h2>
      <p>
        {info.legalName} est immatriculée à l'ORIAS (Organisme pour le Registre
        unique des Intermédiaires en Assurance, banque et finance) sous le numéro{' '}
        <strong>{info.orias}</strong>, vérifiable sur{' '}
        <a href={info.oriasUrl} target="_blank" rel="noopener noreferrer">
          www.orias.fr
        </a>
        , en qualité de Conseiller en Investissements Financiers (CIF), Courtier
        en assurance et Intermédiaire en opérations de banque.
      </p>
      <p>
        L'activité de conseil en investissements financiers est soumise au
        contrôle de l'Autorité de Contrôle Prudentiel et de Résolution (ACPR),{' '}
        {info.acpr}, et de l'Autorité des Marchés Financiers (AMF). Le cabinet
        adhère à une association professionnelle agréée par l'AMF.
      </p>

      <h2>Assurance de responsabilité civile professionnelle</h2>
      <p>
        Conformément aux articles L.541-3 du Code monétaire et financier et
        L.512-6 et L.512-7 du Code des assurances, le cabinet dispose d'une
        assurance de responsabilité civile professionnelle et d'une garantie
        financière couvrant son activité.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par un prestataire technique assurant la disponibilité
        et la sécurité des données conformément à la réglementation en vigueur.
        Les coordonnées de l'hébergeur peuvent être obtenues sur simple demande à
        l'adresse {info.email}.
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
