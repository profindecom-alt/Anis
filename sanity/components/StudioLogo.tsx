/**
 * Logo affiché dans la barre supérieure du Studio. La barre est en bleu nuit
 * (voir sanity/theme.ts), on utilise donc la déclinaison blanche du logo.
 */
export default function StudioLogo() {
  return (
    <img
      src="/logos/lockup-white.png"
      alt="Élan Patrimoine"
      style={{ height: 22, width: 'auto', display: 'block' }}
    />
  );
}
