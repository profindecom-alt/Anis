import { getSiteInfo } from '@/lib/siteInfo';
import { buildMetadata } from '@/lib/seo';
import LegalLayout from '@/components/LegalLayout';
import ReclamationForm from '@/components/ReclamationForm';

export const metadata = buildMetadata({
  title: 'Réclamation',
  description:
    "Procédure de réclamation d'Élan Patrimoine : comment formuler une réclamation, délais de traitement et recours aux médiateurs compétents.",
  path: '/reclamation',
});

const mediateurs = [
  {
    title: 'Produits financiers',
    body: "Médiateur de l'Autorité des Marchés Financiers (AMF), 17 place de la Bourse, 75082 Paris Cedex 02.",
    linkLabel: 'www.amf-france.org',
    href: 'https://www.amf-france.org',
  },
  {
    title: "Produits d'assurance",
    body: "La Médiation de l'Assurance, TSA 50110, 75441 Paris Cedex 09.",
    linkLabel: 'www.mediation-assurance.org',
    href: 'https://www.mediation-assurance.org',
  },
  {
    title: 'Plateforme européenne',
    body: 'Plateforme de règlement en ligne des litiges de la Commission européenne, ouverte à tous les consommateurs.',
    linkLabel: 'ec.europa.eu/consumers/odr',
    href: 'https://ec.europa.eu/consumers/odr',
  },
];

export default async function ReclamationPage() {
  const info = await getSiteInfo();
  return (
    <LegalLayout
      title="Procédure de réclamation"
      intro="Votre satisfaction est notre priorité. Découvrez comment nous adresser une réclamation et les délais dans lesquels nous nous engageons à y répondre."
      breadcrumbLabel="Réclamation"
      updated="12 juin 2026"
      ctaBgClassName="bg-cream"
      contentPbClassName="pb-6 md:pb-8"
    >
      <h2>Qu'est-ce qu'une réclamation ?</h2>
      <p>
        Une réclamation est une déclaration par laquelle vous exprimez votre
        mécontentement à l'égard du cabinet {info.legalName}. Une demande
        d'information, d'avis, de clarification ou de prestation ne constitue pas
        une réclamation.
      </p>

      <h2>Comment nous adresser votre réclamation</h2>
      <p>
        Vous pouvez nous transmettre votre réclamation gratuitement, par l'un des
        moyens suivants :
      </p>
      <ul>
        <li>
          Par e-mail : <a href={`mailto:${info.email}`}>{info.email}</a>
        </li>
        <li>
          Par courrier : {info.legalName}, Service Réclamations,{' '}
          {info.address.street}, {info.address.zip} {info.address.city}
        </li>
        <li>
          Par téléphone : {info.phoneDisplay}
        </li>
      </ul>
      <p>
        Afin de traiter votre demande au mieux, merci d'indiquer vos coordonnées
        complètes, l'objet précis de votre réclamation et, le cas échéant, les
        références de votre dossier.
      </p>

      <h2>Formuler votre réclamation en ligne</h2>
      <p>
        Vous pouvez également utiliser le formulaire ci-dessous. Vos informations
        sont transmises de manière sécurisée à notre Service Réclamations.
      </p>
      <div className="not-prose mt-8">
        <ReclamationForm />
      </div>

      <h2>Délais de traitement</h2>
      <p>
        Conformément aux recommandations de l'ACPR et de l'AMF, nous nous
        engageons à respecter les délais suivants :
      </p>
      <ul>
        <li>
          <strong>Accusé de réception</strong> sous dix (10) jours ouvrables à
          compter de la réception de votre réclamation ;
        </li>
        <li>
          <strong>Réponse sur le fond</strong> sous deux (2) mois maximum à
          compter de l'envoi de la réclamation, sauf survenance de circonstances
          particulières dûment justifiées.
        </li>
      </ul>

      <h2>Recours aux médiateurs</h2>
      <p>
        Si la réponse apportée ne vous satisfait pas, ou en l'absence de réponse
        dans les délais indiqués, vous pouvez saisir gratuitement le médiateur
        compétent selon la nature de votre réclamation :
      </p>

      <div className="not-prose mt-8 space-y-4">
        {mediateurs.map((m) => (
          <div
            key={m.title}
            className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:flex-row sm:items-center sm:gap-8 sm:p-7"
          >
            <div className="sm:w-56 sm:shrink-0">
              <h3 className="font-serif text-lg font-semibold leading-snug text-forest">
                {m.title}
              </h3>
              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-2 text-sm"
              >
                {m.linkLabel}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                  <path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-ink/65">
              {m.body}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8">
        La saisine du médiateur ne pourra intervenir qu'après avoir épuisé les
        voies de recours internes décrites ci-dessus.
      </p>
    </LegalLayout>
  );
}
