'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Renders nothing. Observes every .eyebrow element on the page and adds
 * .eyebrow--visible when it enters the viewport, triggering the CSS
 * scaleX(0 → 1) draw-in on the gold ::before line.
 */
export default function EyebrowAnimator() {
  // Ce composant vit dans le layout (site) qui persiste pendant la navigation
  // client de l'App Router : sans dépendance, l'effet ne s'exécuterait qu'une
  // seule fois et les surtitres des pages suivantes ne seraient jamais observés
  // (le filet restait en scaleX(0)). On réexécute donc à chaque changement
  // de route.
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const eyebrows = Array.from(document.querySelectorAll<HTMLElement>('.eyebrow'));

    const reveal = (el: Element) => el.classList.add('eyebrow--visible');

    if (reduce || !('IntersectionObserver' in window)) {
      eyebrows.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      // Seuil bas + marge : le filet se dessine dès que le surtitre est
      // réellement à l'écran, au lieu d'exiger 80 % de visibilité — qu'un
      // surtitre au-dessus de la ligne de flottaison peut rater si les polices
      // ou images provoquent un reflow au chargement.
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
    );

    eyebrows.forEach((el) => io.observe(el));

    // Filet de sécurité : tout surtitre déjà visible au chargement (héros,
    // première section) est révélé immédiatement, sans dépendre du premier
    // rappel asynchrone de l'observer, qui peut manquer le seuil pendant un
    // reflow tardif (le surtitre ne revient jamais dans le viewport ensuite).
    const revealIfInView = () => {
      eyebrows.forEach((el) => {
        if (el.classList.contains('eyebrow--visible')) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          reveal(el);
          io.unobserve(el);
        }
      });
    };

    const raf = requestAnimationFrame(revealIfInView);
    // Le chargement complet (polices/images) peut décaler la mise en page.
    window.addEventListener('load', revealIfInView);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('load', revealIfInView);
    };
  }, [pathname]);

  return null;
}
