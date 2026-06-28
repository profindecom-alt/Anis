'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Gold gradient hairline drawn left-to-right on scroll entry.
 * Drop it between a dark section and a light one (or vice-versa)
 * to give the seam a deliberate, crafted feel.
 */
export default function SeamLine() {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="block h-px w-full origin-left transition-transform duration-[1100ms] ease-out"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, rgba(255,184,28,0.45) 25%, rgba(255,184,28,0.45) 75%, transparent 100%)',
        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
      }}
    />
  );
}
