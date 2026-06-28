import { getSiteInfo } from '@/lib/siteInfo';
import { img } from '@/lib/images';
import { buildMetadata } from '@/lib/seo';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import Chatbot from '@/components/Chatbot';
import Reveal from '@/components/Reveal';

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    "Contactez Élan Patrimoine pour un premier rendez-vous confidentiel et sans engagement. Échangeons sur vos objectifs patrimoniaux.",
  path: '/contact',
});

const reassurance = ['Sans engagement', 'Confidentiel', 'Réponse sous 48h'];

export default async function ContactPage() {
  const info = await getSiteInfo();
  const addressLine = `${info.address.street}, ${info.address.zip} ${info.address.city}`;
  const mapsHref =
    'https://maps.google.com/?q=' +
    encodeURIComponent(
      `${info.address.street} ${info.address.zip} ${info.address.city}`
    );

  const contactCards = [
    {
      label: 'Par e-mail',
      value: info.email,
      href: `mailto:${info.email}`,
      icon: (
        <path d="M3 7l9 6 9-6M3 7v10a1 1 0 001 1h16a1 1 0 001-1V7M3 7a1 1 0 011-1h16a1 1 0 011 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ),
    },
    {
      label: 'Par téléphone',
      value: info.phoneDisplay,
      href: `tel:${info.phone}`,
      icon: (
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ),
    },
    {
      label: 'Nos bureaux',
      value: addressLine,
      href: mapsHref,
      external: true,
      icon: (
        <>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        </>
      ),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de vos projets"
        intro="Un premier rendez-vous confidentiel et sans engagement pour comprendre votre situation et vos objectifs."
        breadcrumbs={[{ label: 'Contact' }]}
        imageId={img.contact}
      />

      <section className="bg-cream py-8 sm:py-14 md:py-20 lg:py-28">
        <div className="container-content">
          {/* Intro + réassurance ----------------------------------- */}
          <Reveal className="max-w-2xl">
            <span className="eyebrow mb-4">Nous joindre</span>
            <h2 className="text-balance text-2xl font-semibold text-forest sm:text-3xl md:text-4xl">
              À votre écoute
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 md:text-base md:mt-5">
              Que vous souhaitiez préparer votre retraite, optimiser votre
              fiscalité, protéger vos proches ou organiser votre transmission,
              nous prenons le temps de vous écouter avant de vous conseiller.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 md:mt-7 md:gap-x-6 md:gap-y-2.5">
              {reassurance.map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm font-medium text-forest">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gold" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 md:mt-10 lg:grid-cols-12 lg:gap-12">
            {/* Colonne formulaire (prioritaire sur mobile) --------- */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <Reveal delay={120}>
                <ContactForm />
              </Reveal>
            </div>

            {/* Colonne infos --------------------------------------- */}
            <div className="order-2 space-y-3 sm:space-y-4 lg:order-1 lg:col-span-5">
              {contactCards.map((c, i) => (
                <Reveal key={c.label} delay={i * 90}>
                  <a
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    className="group flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-3.5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-elevated sm:items-center sm:gap-4 sm:p-5"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest/5 text-forest transition-colors duration-300 group-hover:bg-gold/15 group-hover:text-gold-dark sm:mt-0 sm:h-12 sm:w-12">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        {c.icon}
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-wider text-ink/45">
                        {c.label}
                      </span>
                      <span className="block break-words font-medium text-forest">{c.value}</span>
                    </span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-ink/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold sm:mt-0" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </Reveal>
              ))}

              {/* Horaires */}
              <Reveal delay={200}>
                <div className="rounded-2xl bg-forest p-6 text-cream sm:p-7">
                  <h3 className="flex items-center gap-2.5 font-serif text-lg font-semibold">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gold" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Horaires d&apos;ouverture
                  </h3>
                  <dl className="mt-4 space-y-2 text-sm text-cream/75">
                    <div className="flex justify-between">
                      <dt>Lundi au vendredi</dt>
                      <dd>9h00 à 18h00</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Samedi et dimanche</dt>
                      <dd>Fermé</dd>
                    </div>
                  </dl>
                  <p className="mt-4 border-t border-cream/15 pt-4 text-xs text-cream/55">
                    Rendez-vous possibles en visioconférence partout en France.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Assistant ---------------------------------------------------- */}
      <section
        id="assistant"
        className="contact-assistant scroll-mt-28 py-12 md:py-28"
      >
        <div className="expertises__aurora" aria-hidden="true">
          <span className="expertises__blob expertises__blob--1" />
          <span className="expertises__blob expertises__blob--2" />
          <span className="expertises__blob expertises__blob--3" />
        </div>

        <div className="container-content relative z-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <span className="eyebrow eyebrow-light mb-4">Assistant en ligne</span>
            <h2 className="text-balance text-2xl font-semibold text-cream sm:text-3xl md:text-4xl">
              Une question ? Discutez avec notre assistant
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/65 md:mt-5 md:text-base">
              Obtenez une première réponse immédiate, à toute heure. Pour une
              étude personnalisée, un conseiller prend ensuite le relais.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2 md:mt-8 md:gap-3">
              {(['Disponible 24h/24', 'Réponse instantanée', 'Prise de RDV'] as const).map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-cream/80 backdrop-blur-sm md:gap-2.5 md:px-4 md:py-2 md:text-sm"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <Chatbot
              context="contact"
              intro="Bonjour, je suis l'assistant d'Élan Patrimoine. Posez votre question ou prenez rendez-vous directement, je m'occupe du reste."
            />
          </Reveal>
        </div>
      </section>

      {/* Carte ------------------------------------------------------- */}
      <section className="bg-cream py-10 md:py-16">
        <div className="container-content">
          <Reveal className="mb-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow mb-4">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="-mt-px inline-block" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Nous rencontrer
                </span>
                <h2 className="text-balance text-2xl font-semibold text-forest sm:text-3xl md:text-4xl">
                  Au cœur de{' '}
                  <span className="text-gold-dark">{info.address.city}</span>
                </h2>
                <p className="mt-3 text-sm text-ink/45">
                  {info.address.street} · {info.address.zip} {info.address.city}
                </p>
              </div>

              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2.5 self-start rounded-full border border-forest/20 px-5 py-2.5 text-sm font-medium text-forest transition-all duration-200 hover:border-gold/50 hover:bg-gold/10 sm:self-auto"
              >
                Voir l&apos;itinéraire
                <svg width="15" height="11" viewBox="0 0 16 12" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                  <path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Gold rule */}
            <div className="mt-6 h-px w-full bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />
          </Reveal>

          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-ink/10 shadow-card">
              <iframe
                title="Localisation d'Élan Patrimoine"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  addressLine
                )}&z=15&output=embed`}
                className="h-[340px] w-full grayscale-[0.15] md:h-[440px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Carte adresse en surimpression */}
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-cream/95 p-4 shadow-elevated backdrop-blur sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-xs sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest text-gold">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-serif text-base font-semibold text-forest">
                      Élan Patrimoine
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-ink/65">
                      {info.address.street}
                      <br />
                      {info.address.zip} {info.address.city}
                    </p>
                  </div>
                </div>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-4 text-sm"
                >
                  Voir l&apos;itinéraire
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                    <path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
