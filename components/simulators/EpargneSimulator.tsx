'use client';

import { useMemo, useState } from 'react';
import { RangeField, ResultStat } from './SimControls';
import SimulatorLeadForm from './SimulatorLeadForm';
import { euros } from './format';

/**
 * Simulateur d'épargne / projection de capital — page « Gestion de Patrimoine ».
 * Projection à intérêts composés (capitalisation mensuelle) à partir d'un
 * capital de départ, de versements mensuels, d'un horizon et d'un rendement
 * annuel moyen estimé.
 */
export default function EpargneSimulator({ sujet }: { sujet: string }) {
  const [capital, setCapital] = useState(20000);
  const [mensuel, setMensuel] = useState(300);
  const [duree, setDuree] = useState(15);
  const [rendement, setRendement] = useState(4);

  const { projete, verse, plusValue } = useMemo(() => {
    const annual = rendement / 100;
    const monthlyRate = Math.pow(1 + annual, 1 / 12) - 1;
    const months = duree * 12;

    const fvCapital = capital * Math.pow(1 + annual, duree);
    const fvVersements =
      monthlyRate === 0
        ? mensuel * months
        : mensuel * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const projete = fvCapital + fvVersements;
    const verse = capital + mensuel * months;
    return { projete, verse, plusValue: projete - verse };
  }, [capital, mensuel, duree, rendement]);

  const summary = [
    'Scénario théorique — Projection d\'épargne',
    `• Capital de départ : ${euros(capital)}`,
    `• Versement mensuel : ${euros(mensuel)}`,
    `• Horizon : ${duree} ans`,
    `• Hypothèse de rendement annuel constant brut : ${rendement} %`,
    `→ Capital théorique : ${euros(projete)}`,
    `→ Total versé : ${euros(verse)}`,
    `→ Gain théorique : ${euros(plusValue)}`,
  ].join('\n');

  return (
    <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
      {/* Saisie + résultat */}
      <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <div className="space-y-7">
          <RangeField
            label="Capital de départ"
            value={capital}
            display={euros(capital)}
            min={0}
            max={500000}
            step={1000}
            onChange={setCapital}
          />
          <RangeField
            label="Versement mensuel"
            value={mensuel}
            display={euros(mensuel)}
            min={0}
            max={5000}
            step={50}
            onChange={setMensuel}
          />
          <RangeField
            label="Durée du placement"
            value={duree}
            display={`${duree} ans`}
            min={1}
            max={40}
            step={1}
            onChange={setDuree}
          />
          <RangeField
            label="Hypothèse de rendement annuel constant"
            value={rendement}
            display={`${rendement} %`}
            min={1}
            max={8}
            step={0.5}
            onChange={setRendement}
            hint="Hypothèse brute et non garantie, appliquée sans variation pendant toute la durée."
          />
        </div>

        <div className="mt-auto pt-8">
          <ResultStat
            label={`Capital théorique à ${duree} ans`}
            value={euros(projete)}
            sub={`Soit un gain théorique de ${euros(plusValue)} pour ${euros(verse)} versés.`}
          />
          <p className="mt-4 text-xs leading-relaxed text-ink/55">
            Scénario non contractuel, hors frais, fiscalité et inflation. Il ne
            modélise ni volatilité ni perte en capital. Les rendements ne sont pas
            garantis et peuvent être négatifs.
          </p>
        </div>
      </div>

      {/* Capture de lead */}
      <SimulatorLeadForm
        sujet={sujet}
        summary={summary}
        title="Faites analyser ce scénario"
        text="Un conseiller peut confronter cette hypothèse à votre horizon, votre tolérance au risque, les frais et la fiscalité."
      />
    </div>
  );
}
