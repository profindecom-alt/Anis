'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type ComponentProps } from 'react';

type ChatbotProps = ComponentProps<typeof import('@/components/Chatbot').default>;

/** Encart de même taille que l'assistant, affiché pendant son chargement. */
function ChatbotPlaceholder({ onOpen }: { onOpen?: () => void }) {
  return (
    <div className="flex h-[32rem] flex-col items-center justify-center gap-4 rounded-2xl border border-white/15 bg-forest-dark/60 p-8 text-center sm:rounded-3xl lg:h-[35rem]">
      <p className="font-serif text-xl font-semibold text-cream">
        Assistant Élan Patrimoine
      </p>
      {onOpen ? (
        <button type="button" onClick={onOpen} className="btn-gold">
          Ouvrir l&apos;assistant
        </button>
      ) : (
        <p className="text-sm text-cream/70" role="status">
          Ouverture de l&apos;assistant…
        </p>
      )}
    </div>
  );
}

const Chatbot = dynamic(() => import('@/components/Chatbot'), {
  ssr: false,
  loading: () => <ChatbotPlaceholder />,
});

/**
 * Assistant chargé à la demande : son code n'est téléchargé que lorsque la
 * section approche de l'écran, à l'arrivée par le lien #assistant, ou au clic.
 * Cela allège le JavaScript initial des pages Contact et Nos expertises.
 */
export default function LazyChatbot(props: ChatbotProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (load) return;
    if (window.location.hash === '#assistant') {
      setLoad(true);
      return;
    }
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <div ref={ref}>
      {load ? <Chatbot {...props} /> : <ChatbotPlaceholder onOpen={() => setLoad(true)} />}
    </div>
  );
}
