import { site } from '@/lib/site';
import { getSiteInfo } from '@/lib/siteInfo';

/**
 * Bouton WhatsApp flottant (bas de page, à droite).
 * Ouvre une conversation pré-remplie via wa.me. Pastille au survol sur
 * grand écran, anneau de pulsation discret. Reste sous le bandeau de
 * consentement (z-40 < z-60) tant que celui-ci est affiché.
 */
export default async function WhatsAppButton() {
  const info = await getSiteInfo();
  const message = `Bonjour ${site.name}, je souhaite des informations sur votre accompagnement patrimonial.`;
  const href = `https://wa.me/${info.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter avec nous sur WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      {/* Pastille texte (apparaît au survol, masquée sur mobile) */}
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-forest opacity-0 shadow-card transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
        Discutons sur WhatsApp
      </span>

      <span className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center">
        {/* Anneau de pulsation */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
        {/* Bouton */}
        <span className="relative inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated transition-transform duration-300 group-hover:scale-105">
          <svg
            viewBox="0 0 32 32"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-6 sm:h-7 sm:w-7"
          >
            <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.255.59 4.46 1.71 6.405L3.2 28.8l6.555-1.72a12.74 12.74 0 0 0 6.246 1.62h.005c7.06 0 12.8-5.74 12.8-12.8a12.72 12.72 0 0 0-3.748-9.052A12.72 12.72 0 0 0 16.001 3.2zm0 23.36h-.004a10.6 10.6 0 0 1-5.402-1.48l-.388-.23-4.01 1.052 1.07-3.91-.252-.4a10.56 10.56 0 0 1-1.62-5.642c0-5.866 4.774-10.64 10.64-10.64a10.57 10.57 0 0 1 7.522 3.122 10.57 10.57 0 0 1 3.116 7.526c0 5.866-4.774 10.64-10.642 10.64zm5.836-7.968c-.32-.16-1.892-.934-2.184-1.04-.293-.107-.506-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.572-1.587-.95-.848-1.592-1.895-1.779-2.215-.186-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.093 1.306 3.307.16.213 2.256 3.443 5.466 4.827.764.33 1.36.527 1.825.674.767.244 1.464.21 2.016.127.615-.092 1.892-.773 2.158-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
          </svg>
        </span>
      </span>
    </a>
  );
}
