'use client';

import { useMemo, useState } from 'react';
import { RangeField, ResultStat } from './SimControls';
import SimulatorLeadForm from './SimulatorLeadForm';
import { euros } from './format';

/**
 * Simulateur de besoin de prévoyance / capital décès — page « Assurance & Protection ».
 * Estime le capital nécessaire pour maintenir le niveau de vie du foyer
 * pendant une durée donnée, déduction faite de l'épargne déjà disponible et
 * augmenté des crédits restant à solder.
 */
export default function PrevoyanceSimulator({ sujet }: { sujet: string }) {
  const [revenu, setRevenu] = useState(45000);
  const [part, setPart] = useState(80);
  const [annees, setAnnees] = useState(12);
  const [credits, setCredits] = useState(150000);
  const [dispo, setDispo] = useState(50000);

  const { besoinRevenu, besoin } = useMemo(() => {
    const besoinRevenu = revenu * (part / 100) * annees;
    const besoin = Math.max(0, besoinRevenu + credits - dispo);
    return { besoinRevenu, besoin };
  }, [revenu, part, annees, credits, dispo]);

  const summary = [
    'Simulation — Besoin de prévoyance (capital décès)',
    `• Revenu net annuel du foyer : ${euros(revenu)}`,
    `• Part du revenu à maintenir : ${part} %`,
    `• Durée de couverture souhaitée : ${annees} ans`,
    `• Crédits restant à solder : ${euros(credits)}`,
    `• Épargne / capitaux déjà disponibles : ${euros(dispo)}`,
    `→ Besoin de maintien du niveau de vie : ${euros(besoinRevenu)}`,
    `→ Capital de prévoyance recommandé : ${euros(besoin)}`,
  ].join('\n');

  return (
    <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <div className="space-y-7">
          <RangeField
            label="Revenu net annuel du foyer"
            value={revenu}
            display={euros(revenu)}
            min={15000}
            max={250000}
            step={1000}
            onChange={setRevenu}
          />
          <RangeField
            label="Part du revenu à maintenir"
            value={part}
            display={`${part} %`}
            min={50}
            max={100}
            step={5}
            onChange={setPart}
            hint="Proportion des revenus à préserver pour vos proches."
          />
          <RangeField
            label="Durée de couverture souhaitée"
            value={annees}
            display={`${annees} ans`}
            min={5}
            max={25}
            step={1}
            onChange={setAnnees}
            hint="Par exemple jusqu'à l'autonomie financière des enfants."
          />
          <RangeField
            label="Crédits restant à solder"
            value={credits}
            display={euros(credits)}
            min={0}
            max={600000}
            step={5000}
            onChange={setCredits}
          />
          <RangeField
            label="Épargne et capitaux déjà disponibles"
            value={dispo}
            display={euros(dispo)}
            min={0}
            max={600000}
            step={5000}
            onChange={setDispo}
          />
        </div>

        <div className="mt-auto pt-8">
          <ResultStat
            label="Capital de prévoyance recommandé"
            value={euros(besoin)}
            sub="Capital décès estimé pour protéger durablement le niveau de vie de vos proches."
          />
        </div>
      </div>

      <SimulatorLeadForm
        sujet={sujet}
        summary={summary}
        title="Faites auditer votre protection"
        text="Un conseiller compare ce besoin à vos garanties actuelles et calibre la couverture au plus juste."
      />
    </div>
  );
}
