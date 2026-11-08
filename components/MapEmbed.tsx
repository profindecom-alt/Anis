'use client';

import { useState } from 'react';

/**
 * Carte Google Maps chargée au clic. L'iframe embarque près d'un mégaoctet de
 * JavaScript tiers et dépose des cookies Google : on ne la charge qu'à la
 * demande du visiteur, ce qui allège fortement la page Contact.
 */
export default function MapEmbed({
  src,
  title,
  className = '',
}: {
  src: string;
  title: string;
  className?: string;
}) {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <iframe
        title={title}
        src={src}
        className={className}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div
      className={`${className} flex flex-col items-center justify-center gap-4 bg-cream-200 p-6 text-center`}
      style={{
        backgroundImage:
          'linear-gradient(rgba(19,49,92,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(19,49,92,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <button type="button" onClick={() => setShow(true)} className="btn-primary">
        Afficher la carte interactive
      </button>
      <p className="max-w-xs text-xs text-ink/55">
        La carte est fournie par Google Maps, qui peut déposer des cookies.
      </p>
    </div>
  );
}
