'use client';

import { useMemo, useState } from 'react';
import { RangeField, ResultStat } from './SimControls';
import SimulatorLeadForm from './SimulatorLeadForm';
import { euros } from './format';

/**
 * Simulateur d'économie d'impôt via versement sur un PER — page « Défiscalisation ».
 * Estimation simplifiée : la TMI est déduite du revenu imposable par part
 * (barème 2024) et l'économie correspond au versement déductible × TMI, dans
 * la limite d'un plafond de déduction approché (10 % des revenus).
 */

/** Tranche marginale d'imposition d'après le quotient familial (barème 2024). */
function tmiFromQuotient(quotient: number): number {
  if (quotient <= 11294) return 0;
  if (quotient <= 28797) return 11;
  if (quotient <= 82341) return 30;
  if (quotient <= 177106) return 41;
  return 45;
}

const PLAFOND_MIN = 4637; // ≈ 10 % du PASS
const PLAFOND_MAX = 37094; // ≈ 10 % de 8 × PASS

export default function DefiscalisationSimulator({ sujet }: { sujet: string }) {
  const [revenu, setRevenu] = useState(60000);
  const [parts, setParts] = useState(2);
  const [versement, setVersement] = useState(5000);

  const { tmi, plafond, verseRetenu, economie } = useMemo(() => {
    const quotient = revenu / parts;
    const tmi = tmiFromQuotient(quotient);
    const plafond = Math.min(Math.max(revenu * 0.1, PLAFOND_MIN), PLAFOND_MAX);
    const verseRetenu = Math.min(versement, plafond);
    const economie = (verseRetenu * tmi) / 100;
    return { tmi, plafond, verseRetenu, economie };
  }, [revenu, parts, versement]);

  const depasse = versement > plafond;

  const summary = [
    'Simulation — Économie d\'impôt (PER)',
    `• Revenu net imposable du foyer : ${euros(revenu)}`,
    `• Nombre de parts fiscales : ${parts}`,
    `• Versement PER envisagé : ${euros(versement)}`,
    `→ Tranche marginale d'imposition estimée : ${tmi} %`,
    `→ Versement déductible retenu : ${euros(verseRetenu)} (plafond approché : ${euros(plafond)})`,
    `→ Économie d'impôt estimée : ${euros(economie)}`,
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
                ? `Au-delà du plafond approché (${euros(plafond)}), le surplus n'est pas déductible cette année.`
                : undefined
            }
          />
        </div>

        <div className="mt-auto pt-8">
          <ResultStat
            label="Économie d'impôt estimée"
            value={euros(economie)}
            sub={`Sur la base d'une tranche marginale à ${tmi} % et d'un versement déductible de ${euros(verseRetenu)}.`}
          />
        </div>
      </div>

      <SimulatorLeadForm
        sujet={sujet}
        summary={summary}
        title="Sécurisez cette économie d'impôt"
        text="Un conseiller vérifie vos plafonds réels et choisit le dispositif le plus adapté à votre situation."
      />
    </div>
  );
}
