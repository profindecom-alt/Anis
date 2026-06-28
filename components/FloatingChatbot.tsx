'use client';

import { useState } from 'react';
import Chatbot from '@/components/Chatbot';

/**
 * Lanceur de chatbot flottant (bas de page, à droite), positionné juste
 * au-dessus du bouton WhatsApp. Au clic, ouvre l'assistant Élan Patrimoine
 * dans une fenêtre flottante. Reste sous le bandeau de consentement
 * (z-40 < z-60) tant que celui-ci est affiché.
 */
export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fenêtre de l'assistant */}
      {open && (
        <div className="fixed inset-x-4 bottom-40 z-40 sm:inset-x-auto sm:right-6 sm:bottom-44 sm:w-[24rem]">
          <Chatbot
            context="global"
            intro="Bonjour, je suis l'assistant d'Élan Patrimoine. Posez votre question ou prenez rendez-vous directement, je m'occupe du reste."
          />
        </div>
      )}

      {/* Bouton lanceur, juste au-dessus du bouton WhatsApp */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer l'assistant" : "Discuter avec l'assistant"}
        aria-expanded={open}
        className="group fixed bottom-24 right-6 z-40 flex items-center gap-3"
      >
        {/* Pastille texte (apparaît au survol, masquée sur mobile) */}
        <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-forest opacity-0 shadow-card transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
          Discutons avec l&apos;assistant
        </span>

        <span className="relative flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
          <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#13315C] text-[#FFB81C] shadow-elevated transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
            style={{ border: '1px solid rgba(255,184,28,0.35)' }}>
            {open ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-6 w-6 sm:h-7 sm:w-7"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-6 w-6 sm:h-7 sm:w-7"
              >
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </span>
      </button>
    </>
  );
}
