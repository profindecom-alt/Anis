'use client';

import type { ReactNode } from 'react';

/**
 * Curseur + valeur formatée, brique de saisie commune aux simulateurs.
 */
export function RangeField({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  /** Valeur affichée (déjà formatée : « 50 000 € », « 12 ans »…). */
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm font-medium text-forest">{label}</label>
        <span className="font-serif text-lg font-semibold text-forest">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="sim-range mt-3 w-full"
        aria-label={label}
      />
      {hint && <p className="mt-1.5 text-xs text-ink/45">{hint}</p>}
    </div>
  );
}

/**
 * Bloc de résultat mis en avant (grand chiffre doré sur fond crème).
 */
export function ResultStat({
  label,
  value,
  sub,
  children,
}: {
  label: string;
  value: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-cream-50 to-cream-200 p-6 text-center sm:p-8">
      <div className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold-dark">
        {label}
      </div>
      <div className="mt-3 font-serif text-4xl font-semibold leading-tight text-forest md:text-5xl">
        {value}
      </div>
      {sub && <div className="mt-3 text-sm leading-relaxed text-ink/60">{sub}</div>}
      {children}
    </div>
  );
}
