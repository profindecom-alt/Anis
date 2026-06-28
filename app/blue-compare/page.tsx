/**
 * PAGE TEMPORAIRE — comparaison des bleus primaires candidats.
 * À supprimer une fois le choix fait (supprimer le dossier app/blue-compare).
 * Tout est en styles inline / hex codés en dur : ne touche pas la config globale.
 */

const CREAM = '#F5F0E8';
const INK = '#1C1B18';
const GOLD = '#FFB81C';
const GOLD_LIGHT = '#FFC94D';

type Candidate = {
  id: string;
  name: string;
  hex: string;
  dark: string; // version foncée pour les survols / dégradés
  note: string;
  current?: boolean;
};

// version foncée approximée (~ -40% luminosité) pour boutons hover / dégradés
const candidates: Candidate[] = [
  {
    id: 'current',
    name: 'Actuel',
    hex: '#0f2d52',
    dark: '#091d38',
    note: 'Navy gris-bleu, un peu terne',
    current: true,
  },
  {
    id: 'ink',
    name: 'Deep ink navy',
    hex: '#0A2540',
    dark: '#06182c',
    note: 'Plus foncé, premium, autoritaire',
  },
  {
    id: 'royal',
    name: 'Refined royal',
    hex: '#13315C',
    dark: '#0c2140',
    note: 'Plus vif et plus bleu, moderne',
  },
  {
    id: 'classic',
    name: 'Classic navy',
    hex: '#102A43',
    dark: '#0a1c2e',
    note: 'Équilibré, intemporel',
  },
  {
    id: 'sapphire',
    name: 'Sapphire',
    hex: '#0d3b66',
    dark: '#092a49',
    note: 'Saturé, ton joaillier, vivant',
  },
];

function Mockup({ c }: { c: Candidate }) {
  return (
    <div
      style={{
        border: '1px solid rgba(28,27,24,0.10)',
        borderRadius: 16,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 12px 32px -16px rgba(28,27,24,0.20)',
      }}
    >
      {/* En-tête swatch */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 12,
          padding: '16px 20px',
          background: CREAM,
          borderBottom: '1px solid rgba(28,27,24,0.08)',
        }}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: INK }}>
            {c.name}
            {c.current && (
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#D99400',
                }}
              >
                · actuel
              </span>
            )}
          </div>
          <div style={{ fontSize: 12.5, color: 'rgba(28,27,24,0.55)', marginTop: 2 }}>
            {c.note}
          </div>
        </div>
        <code
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: c.hex,
            background: '#fff',
            padding: '3px 8px',
            borderRadius: 6,
            border: '1px solid rgba(28,27,24,0.08)',
          }}
        >
          {c.hex}
        </code>
      </div>

      {/* Hero navy + or */}
      <div
        style={{
          position: 'relative',
          padding: '36px 28px 40px',
          color: '#f3f1ea',
          background: `radial-gradient(120% 120% at 100% 0%, ${c.hex} 0%, ${c.dark} 70%)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: GOLD,
            marginBottom: 18,
          }}
        >
          <span style={{ width: 36, height: 1.5, background: GOLD, display: 'block' }} />
          Gestion de patrimoine
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 34,
            lineHeight: 1.05,
            fontWeight: 500,
            margin: '0 0 14px',
          }}
        >
          Construire et transmettre,
          <br />
          avec exigence.
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: '#b9c2d4', maxWidth: '46ch', margin: '0 0 22px' }}>
          Un accompagnement indépendant et sur mesure pour faire fructifier
          et protéger votre patrimoine.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {/* Bouton or */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 999,
              padding: '11px 24px',
              fontSize: 13,
              fontWeight: 600,
              background: GOLD,
              color: c.dark,
            }}
          >
            Prendre rendez-vous
          </span>
          {/* Bouton outline clair */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 999,
              padding: '11px 24px',
              fontSize: 13,
              fontWeight: 600,
              border: '1px solid rgba(245,240,232,0.4)',
              color: '#f3f1ea',
            }}
          >
            Nos expertises
          </span>
        </div>
      </div>

      {/* Bandeau clair : bouton plein, lien, puce */}
      <div style={{ padding: '22px 28px', background: CREAM, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: 999,
            padding: '10px 22px',
            fontSize: 13,
            fontWeight: 600,
            background: c.hex,
            color: CREAM,
          }}
        >
          Bouton primaire
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: c.hex,
            borderBottom: `2px solid ${GOLD}`,
            paddingBottom: 2,
          }}
        >
          Lien souligné
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: INK }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: GOLD, display: 'inline-block' }} />
          Titre de section
        </span>
      </div>

      {/* Carte + grande stat sur le bleu */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ padding: '24px 28px', background: '#fff', borderTop: `2px solid ${GOLD}40` }}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 20,
              fontWeight: 600,
              color: c.hex,
              marginBottom: 8,
            }}
          >
            Ingénierie patrimoniale
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(28,27,24,0.7)', margin: 0 }}>
            Structurer, optimiser et sécuriser dans la durée.
          </p>
        </div>
        <div
          style={{
            padding: '24px 28px',
            background: c.hex,
            color: '#f3f1ea',
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 48,
              lineHeight: 0.85,
              fontWeight: 500,
              color: GOLD,
            }}
          >
            +15<span style={{ fontSize: '0.45em', color: GOLD_LIGHT }}>ans</span>
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: '#b9c2d4',
              marginTop: 12,
            }}
          >
            d&apos;expérience
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlueComparePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#efeae1', color: INK, padding: '48px 24px 80px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <header style={{ marginBottom: 36, maxWidth: '70ch' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#D99400',
              marginBottom: 12,
            }}
          >
            Page temporaire · comparaison
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 40, fontWeight: 500, margin: '0 0 12px' }}>
            Choix du bleu primaire
          </h1>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'rgba(28,27,24,0.7)', margin: 0 }}>
            Chaque maquette utilise l&apos;or ({GOLD}) et la crème ({CREAM}) du cabinet, avec le
            bleu candidat appliqué partout où il sert aujourd&apos;hui : hero, boutons, liens,
            cartes et chiffres. Dis-moi lequel tu préfères et je l&apos;applique à la config globale.
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
            gap: 28,
            alignItems: 'start',
          }}
        >
          {candidates.map((c) => (
            <Mockup key={c.id} c={c} />
          ))}
        </div>

        <footer style={{ marginTop: 40, fontSize: 13, color: 'rgba(28,27,24,0.5)' }}>
          Accessible sur <code>/blue-compare</code>. À supprimer après le choix
          (dossier <code>app/blue-compare</code>).
        </footer>
      </div>
    </main>
  );
}
