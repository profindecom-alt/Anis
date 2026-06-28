import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from './site';

// Mot-symbole blanc embarqué en base64 pour la génération de la carte.
const lockupWhite = `data:image/png;base64,${readFileSync(
  join(process.cwd(), 'public/logos/lockup-white.png')
).toString('base64')}`;

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';
export const ogAlt = `${site.name} · ${site.baseline}`;

const NAVY = '#0f2d52';
const NAVY_DARK = '#091d38';
const CREAM = '#F5F0E8';
const GOLD = '#FFB81C';

/**
 * Carte de partage (Open Graph / Twitter) générée à la volée, aux couleurs
 * de la marque. Utilisée par défaut sur les pages éditoriales sans photo.
 */
export function renderOgImage(title: string = site.baseline, eyebrow?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: NAVY,
          backgroundImage: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DARK} 100%)`,
          color: CREAM,
          padding: 72,
          justifyContent: 'space-between',
          fontFamily: 'serif',
        }}
      >
        {/* Cadre or */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: `1px solid rgba(255,184,28,0.45)`,
            borderRadius: 18,
          }}
        />

        {/* En-tête : logo */}
        <div style={{ display: 'flex' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lockupWhite} width={440} height={66} alt="" />
        </div>

        {/* Corps : surtitre + titre */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {eyebrow ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                color: GOLD,
                fontSize: 20,
                letterSpacing: 4,
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
              }}
            >
              <div style={{ width: 48, height: 2, backgroundColor: GOLD }} />
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.08,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
        </div>

        {/* Pied : url + ORIAS */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'sans-serif',
            fontSize: 20,
            color: 'rgba(245,240,232,0.65)',
          }}
        >
          <span>{new URL(site.url).hostname}</span>
          <span>Cabinet indépendant · ORIAS {site.orias}</span>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
