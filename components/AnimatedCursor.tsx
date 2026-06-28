'use client';

import { useEffect, useRef, useState } from 'react';

const TRAIL = 8; // nombre de particules de la traîne

/**
 * Curseur animé « comète » réservé au bureau (pointeur fin) : un point doré
 * qui suit le pointeur, prolongé d'une traîne de particules qui s'estompent —
 * façon comète / coulée d'encre. Sur les éléments interactifs (liens, boutons),
 * la tête grossit légèrement.
 *
 * Désactivé sur tactile / pointeur grossier et si l'utilisateur préfère les
 * animations réduites — dans ce cas le curseur système reste inchangé.
 */
export default function AnimatedCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reduced.matches) return;

    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    // Chaîne de points : chacun rattrape le précédent → effet de traîne.
    const pts = Array.from({ length: TRAIL }, () => ({ ...target }));
    let hovering = false;
    let visible = false;
    let raf = 0;

    const isInteractive = (el: Element | null) =>
      !!el?.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]');

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        document.body.classList.add('cursor-active');
      }
      hovering = isInteractive(e.target as Element);
    };
    const onLeave = () => {
      visible = false;
      document.body.classList.remove('cursor-active');
    };
    const onEnter = () => {
      visible = true;
      document.body.classList.add('cursor-active');
    };

    const render = () => {
      pts[0].x += (target.x - pts[0].x) * 0.35;
      pts[0].y += (target.y - pts[0].y) * 0.35;
      for (let i = 1; i < TRAIL; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.35;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.35;
      }
      pts.forEach((pt, i) => {
        const d = dotsRef.current[i];
        if (!d) return;
        // La tête (i=0) est la plus grande ; la traîne rétrécit et s'estompe.
        const falloff = 1 - i / TRAIL;
        const headScale = i === 0 && hovering ? 1.6 : 1;
        d.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0) translate(-50%, -50%) scale(${falloff * headScale})`;
        d.style.opacity = visible ? `${falloff}` : '0';
      });
      raf = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      document.body.classList.remove('cursor-active');
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el;
          }}
          className="fixed left-0 top-0 h-2.5 w-2.5 rounded-full bg-gold opacity-0 will-change-transform"
        />
      ))}
    </div>
  );
}
