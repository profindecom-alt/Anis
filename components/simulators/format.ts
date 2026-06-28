/**
 * Helpers de formatage partagés par les simulateurs des pages expertise.
 */

const euro0 = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const number0 = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });

/** Montant en euros, sans décimales (ex. « 12 345 € »). */
export function euros(value: number): string {
  return euro0.format(Math.round(value));
}

/** Nombre simple, séparateur de milliers français (ex. « 12 345 »). */
export function frNumber(value: number): string {
  return number0.format(Math.round(value));
}
