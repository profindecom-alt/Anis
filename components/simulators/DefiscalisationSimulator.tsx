'use client';

import { useMemo, useState } from 'react';
import { RangeField, ResultStat } from './SimControls';
import SimulatorLeadForm from './SimulatorLeadForm';
import { euros } from './format';

/**
 * Scénario pédagogique de déduction PER — page « Défiscalisation ».
 * Il compare l'impôt brut calculé par tranches avant/après déduction selon le
 * barème 2026 applicable aux revenus 2025. Il ne remplace pas le simulateur de
 * l'administration et n'intègre notamment ni décote, ni plafonnement du
 * quotient familial, ni réductions ou crédits d'impôt.
 */

const TAX_BRACKETS_2026 = [
  { upper: 11_600, rate: 0 },
  { upper: 29_579, rate: 0.11 },
  { upper: 84_577, rate: 0.3 },
  { upper: 181_917, rate: 0.41 },
  { upper: Number.POSITIVE_INFINITY, rate: 0.45 },
] as const;

/** Tranche marginale d'imposition d'après le quotient familial (barème 2026). */
function tmiFromQuotient(quotient: number): number {
  if (quotient <= 11_600) return 0;
  if (quotient <= 29_579) return 11;
  if (quotient <= 84_577) return 30;
  if (quotient <= 181_917) return 41;
  return 45;
}

function grossIncomeTax(income: number, parts: number) {
  const quotient = Math.max(0, income) / parts;
  let previousUpper = 0;
  let taxPerPart = 0;

  for (const bracket of TAX_BRACKETS_2026) {
    const taxable = Math.max(
      0,
      Math.min(quotient, bracket.upper) - previousUpper
    );
    taxPerPart += taxable * bracket.rate;
    if (quotient <= bracket.upper) break;
    previousUpper = bracket.upper;
  }

  return taxPerPart * parts;
}

export default function DefiscalisationSimulator({ sujet }: { sujet: string }) {
  const [revenu, setRevenu] = useState(60000);
  const [parts, setParts] = useState(2);
  const [versement, setVersement] = useState(5000);
  const [plafondDisponible, setPlafondDisponible] = useState(5000);

  const { tmi, verseRetenu, economie } = useMemo(() => {
    const quotient = revenu / parts;
    const tmi = tmiFromQuotient(quotient);
    const verseRetenu = Math.min(versement, plafondDisponible, revenu);
    const impotAvant = grossIncomeTax(revenu, parts);
    const impotApres = grossIncomeTax(revenu - verseRetenu, parts);
    const economie = Math.max(0, impotAvant - impotApres);
    return { tmi, verseRetenu, economie };
  }, [plafondDisponible, revenu, parts, versement]);

  const depasse = versement > plafondDisponible;

  const summary = [
    'Scénario indicatif — Déduction PER (barème 2026 sur revenus 2025)',
    `• Revenu net imposable du foyer : ${euros(revenu)}`,
    `• Nombre de parts fiscales : ${parts}`,
    `• Versement PER envisagé : ${euros(versement)}`,
    `• Plafond de déduction disponible saisi : ${euros(plafondDisponible)}`,
    `→ Tranche marginale d'imposition estimée : ${tmi} %`,
    `→ Versement déductible retenu : ${euros(verseRetenu)}`,
    `→ Écart d'impôt brut indicatif : ${euros(economie)}`,
  ].join('\n');

  const partsDisplay = Number.isInteger(parts) ? `${parts}` : parts.toFixed(1);

  return (
    <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <div className="space-y-7">
          <RangeField
            label="Revenu net imposable du foyer"
            value={revenu}
            display={euros(revenu)}
            min={15000}
            max={300000}
            step={1000}
            onChange={setRevenu}
          />
          <RangeField
            label="Nombre de parts fiscales"
            value={parts}
            display={partsDisplay}
            min={1}
            max={5}
            step={0.5}
            onChange={setParts}
            hint="1 part = célibataire · 2 parts = couple · +0,5 par enfant à charge."
          />
          <RangeField
            label="Versement PER envisagé"
            value={versement}
            display={euros(versement)}
            min={0}
            max={40000}
            step={500}
            onChange={setVersement}
            hint={
              depasse
                ? `La part dépassant le plafond disponible saisi (${euros(plafondDisponible)}) n'est pas retenue dans ce scénario.`
                : undefined
            }
          />
          <RangeField
            label="Plafond de déduction disponible"
            value={plafondDisponible}
            display={euros(plafondDisponible)}
            min={0}
            max={40000}
            step={500}
            onChange={setPlafondDisponible}
            hint="Reprenez le plafond personnel indiqué sur votre dernier avis d'impôt ; il peut inclure des reliquats et dépendre de votre situation."
          />
        </div>

        <div className="mt-auto pt-8">
          <ResultStat
            label="Écart d'impôt brut indicatif"
            value={euros(economie)}
            sub={`Calcul progressif simplifié, barème 2026 sur revenus 2025, TMI initiale ${tmi} % et déduction retenue de ${euros(verseRetenu)}.`}
          />
          <p className="mt-4 text-xs leading-relaxed text-ink/55">
            Scénario non contractuel hors décote, plafonnement du quotient
            familial, contributions exceptionnelles, réductions et crédits
            d&apos;impôt. Vérifiez votre situation avec le{' '}
            <a
              href="https://www.impots.gouv.fr/simulateur-de-limpot-sur-le-revenu"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-forest underline decoration-gold/50 underline-offset-2"
            >
              simulateur officiel de l&apos;administration fiscale
            </a>
            . Barème vérifié le 26 octobre 2026 dans le{' '}
            <a
              href="https://bofip.impots.gouv.fr/bofip/2491-PGP.html/identifiant=BOI-IR-LIQ-20-10-20260407"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-forest underline decoration-gold/50 underline-offset-2"
            >
              BOFiP
            </a>
            .
          </p>
        </div>
      </div>

      <SimulatorLeadForm
        sujet={sujet}
        summary={summary}
        title="Faites vérifier ce scénario"
        text="Un conseiller peut confronter cette estimation à votre plafond personnel, à votre fiscalité et aux règles applicables."
      />
    </div>
  );
}
