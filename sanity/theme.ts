import { buildLegacyTheme } from 'sanity';

/**
 * Thème du Studio aux couleurs Élan Patrimoine : barre de navigation bleu nuit,
 * accents or, boutons primaires bleu nuit. Reprend la palette de
 * tailwind.config.ts.
 */
const forest = '#0f2d52';
const forestDark = '#091d38';
const forestLight = '#1d4577';
const gold = '#FFB81C';
const ink = '#1C1B18';
const danger = '#b3493f';

export const elanTheme = buildLegacyTheme({
  '--black': forestDark,
  '--white': '#ffffff',
  '--gray': '#7b8794',
  '--gray-base': '#7b8794',
  '--component-bg': '#ffffff',
  '--component-text-color': ink,

  '--brand-primary': forest,

  '--default-button-color': forestLight,
  '--default-button-primary-color': forest,
  '--default-button-success-color': forestLight,
  '--default-button-warning-color': gold,
  '--default-button-danger-color': danger,

  '--state-info-color': forest,
  '--state-success-color': '#3a7d5d',
  '--state-warning-color': gold,
  '--state-danger-color': danger,

  '--main-navigation-color': forestDark,
  '--main-navigation-color--inverted': '#ffffff',

  '--focus-color': gold,
});
