/**
 * The previous full-screen preloader waited for `window.load`, which included
 * decorative video downloads and delayed both content access and LCP. Keep a
 * neutral component for layout compatibility; the page now paints immediately.
 */
export default function Preloader() {
  return null;
}
