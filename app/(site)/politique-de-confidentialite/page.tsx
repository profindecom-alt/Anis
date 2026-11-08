import { getSiteInfo } from '@/lib/siteInfo';
import { buildMetadata } from '@/lib/seo';
import LegalLayout from '@/components/LegalLayout';
import CookiePreferencesButton from '@/components/CookiePreferencesButton';

export const metadata = buildMetadata({
  title: 'Politique de confidentialité',
  description:
    "Politique de confidentialité d'Élan Patrimoine : traitement des données personnelles, finalités, durées de conservation et exercice de vos droits RGPD.",
  path: '/politique-de-confidentialite',
});

export default async function ConfidentialitePage() {
  const info = await getSiteInfo();
  return (
    <LegalLayout
      title="Politique de confidentialité"
      intro="Comment nous collectons, utilisons et protégeons vos données personnelles, dans le respect du RGPD."
      breadcrumbLabel="Politique de confidentialité"
      updated="26 octobre 2026"
      ctaBgClassName="bg-cream"
    >
      <h2>Préambule</h2>
      <p>
        {info.legalName} accorde une importance primordiale à la protection de la
        vie privée et des données personnelles de ses clients et visiteurs. La
        présente politique décrit nos pratiques au regard du Règlement Général sur
        la Protection des Données (RGPD) et de la loi Informatique et Libertés.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est {info.legalName},{' '}
        {info.legalForm}, SIREN {info.siren}, {info.address.street},{' '}
        {info.address.zip} {info.address.city}. Pour toute question relative à vos
        données, vous pouvez nous écrire à l'adresse{' '}
        <a href={`mailto:${info.email}`}>{info.email}</a>.
      </p>

      <h2>Données collectées</h2>
      <p>Nous collectons les données que vous nous communiquez directement :</p>
      <ul>
        <li>Données d'identification : prénom, nom, civilité</li>
        <li>Coordonnées : adresse e-mail, numéro de téléphone, adresse postale</li>
        <li>Données relatives à votre demande : objet et contenu de votre message</li>
        <li>
          Dans le cadre d'une mission de conseil : informations patrimoniales,
          fiscales et familiales nécessaires à l'accomplissement de notre devoir de
          conseil
        </li>
      </ul>

      <h2>Finalités du traitement</h2>
      <p>Vos données sont traitées pour les finalités suivantes :</p>
      <ul>
        <li>Répondre à vos demandes de contact et de rendez-vous</li>
        <li>Établir un conseil patrimonial personnalisé et l'exécuter</li>
        <li>Respecter nos obligations légales et réglementaires (lutte contre le blanchiment, devoir de conseil)</li>
        <li>Vous informer, avec votre accord, de nos actualités</li>
        <li>
          Mesurer l&apos;audience et, lorsque les outils correspondants sont
          configurés, mesurer ou personnaliser nos communications publicitaires,
          uniquement après votre consentement
        </li>
      </ul>

      <h2>Bases légales</h2>
      <p>
        Les traitements reposent, selon les cas, sur votre consentement,
        l'exécution d'un contrat ou de mesures précontractuelles, le respect
        d'une obligation légale, ou l'intérêt légitime du cabinet.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Vos données sont conservées pour la durée nécessaire aux finalités
        poursuivies, puis archivées conformément aux durées légales applicables au
        secteur (notamment cinq ans après la fin de la relation pour les
        obligations de lutte contre le blanchiment).
      </p>

      <h2>Destinataires</h2>
      <p>
        Vos données sont destinées aux seuls collaborateurs habilités du cabinet
        et, le cas échéant, à nos partenaires (sociétés de gestion, compagnies
        d'assurance, experts du réseau) strictement dans le cadre de la mission
        confiée. Elles ne sont jamais cédées ni louées à des tiers à des fins
        commerciales.
      </p>

      <h2>Sous-traitants techniques</h2>
      <p>
        Les messages envoyés via le formulaire de contact, l'inscription à la
        newsletter et l'assistant conversationnel (chatbot) sont acheminés par un
        outil d'automatisation des flux agissant en qualité de
        sous-traitant, ainsi que par notre hébergeur. Après votre consentement,
        des prestataires de mesure d&apos;audience ou des plateformes publicitaires
        peuvent également recevoir des données techniques de navigation selon
        l&apos;outil effectivement configuré. Leurs propres politiques de
        confidentialité précisent leur rôle et leurs traitements.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
        d'effacement, de limitation, d'opposition et de portabilité de vos
        données, ainsi que du droit de définir des directives relatives à leur
        sort après votre décès. Vous pouvez exercer ces droits en écrivant à{' '}
        <a href={`mailto:${info.email}`}>{info.email}</a>. Un justificatif
        d'identité ne sera demandé qu'en cas de doute raisonnable sur l'identité
        de la personne exerçant ses droits.
      </p>
      <p>
        Vous disposez également du droit d'introduire une réclamation auprès de la
        Commission Nationale de l'Informatique et des Libertés (CNIL),{' '}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          www.cnil.fr
        </a>
        .
      </p>

      <h2>Cookies</h2>
      <p>
        Le site utilise les stockages strictement nécessaires à son bon
        fonctionnement et à la mémorisation de votre choix. Les outils optionnels
        de mesure d&apos;audience, d&apos;analyse de parcours ou de suivi publicitaire
        ne sont chargés qu&apos;après votre consentement préalable, lorsqu&apos;ils sont
        configurés. Refuser ces outils n&apos;empêche pas l&apos;accès au site.
      </p>
      <p>
        Vous pouvez à tout moment modifier ou retirer votre consentement :{' '}
        <CookiePreferencesButton className="font-medium text-forest underline decoration-gold/40 underline-offset-2 transition-colors hover:text-gold" />
        .
      </p>

      <h2>Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles
        appropriées afin de protéger vos données contre toute perte, altération
        ou accès non autorisé.
      </p>
    </LegalLayout>
  );
}
