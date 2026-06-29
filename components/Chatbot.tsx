'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
  options?: string[];
  booked?: boolean;
}

export default function Chatbot({
  context,
  intro = "Bonjour, je suis l'assistant d'Élan Patrimoine. Comment puis-je vous aider ?",
  suggestions = [],
  title = 'Assistant Élan Patrimoine',
}: {
  context: string;
  intro?: string;
  suggestions?: string[];
  title?: string;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: intro },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const sessionId = useRef<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionId.current =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: next.slice(-12).map(({ role, content }) => ({ role, content })),
          sessionId: sessionId.current,
          context,
        }),
      });
      const data = await res.json().catch(() => ({}));
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            data.reply ||
            "Désolé, je n'ai pas pu traiter votre demande. Merci de réessayer.",
          options: Array.isArray(data.options) ? data.options : undefined,
          booked: Boolean(data.booked),
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            'La connexion a échoué. Vérifiez votre réseau et réessayez, ou utilisez le formulaire de contact.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const showSuggestions = suggestions.length > 0 && messages.length <= 1 && !loading;

  return (
    <div className="flex h-[32rem] flex-col overflow-hidden rounded-2xl sm:rounded-3xl lg:h-[35rem]"
      style={{ boxShadow: '0 24px 64px -16px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,184,28,0.18)' }}>

      {/* Header */}
      <div className="relative flex items-center gap-3 bg-[#0c2140] px-4 py-3.5 sm:px-5 sm:py-4">
        {/* Hairline gold gradient across the top edge */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,184,28,0.7) 30%, rgba(255,184,28,0.7) 70%, transparent)' }}
        />

        {/* Brand icon avatar */}
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0a1d40]"
          style={{ border: '1px solid rgba(255,184,28,0.28)' }}>
          <Image
            src="/logos/icon-gold.svg"
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 scale-110"
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#25D366]"
            style={{ border: '2px solid #0c2140' }} />
        </span>

        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate font-serif text-sm font-semibold text-[#F5F0E8] sm:text-base">{title}</p>
          <p className="text-xs" style={{ color: 'rgba(255,184,28,0.65)' }}>
            En ligne · prend les rendez-vous
          </p>
        </div>

        {/* Losange stud — echoes the brand diamond motif */}
        <span className="h-2 w-2 shrink-0 rotate-45" style={{ background: 'rgba(255,184,28,0.35)' }} />
      </div>

      {/* Chat thread */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5"
        aria-live="polite"
        aria-label="Conversation avec l'assistant"
        style={{
          backgroundColor: '#F7F4EE',
          backgroundImage: 'radial-gradient(rgba(19,49,92,0.04) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        {messages.map((m, i) => {
          const isLast = i === messages.length - 1;
          return (
            <div key={i}>
              <div className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>

                {/* Mini brand medallion beside every assistant message */}
                {m.role === 'assistant' && (
                  <span
                    className="mb-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0c2140]"
                    style={{ border: '1px solid rgba(255,184,28,0.25)' }}
                  >
                    <Image src="/logos/icon-gold.svg" alt="" width={40} height={40} className="h-10 w-10 scale-110" />
                  </span>
                )}

                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm sm:max-w-[75%] sm:px-4 ${
                    m.role === 'user'
                      ? 'rounded-br-sm text-[#F5F0E8]'
                      : m.booked
                        ? 'rounded-bl-sm bg-[#FFFBF0] text-ink/80'
                        : 'rounded-bl-sm bg-white text-ink/80'
                  }`}
                  style={
                    m.role === 'user'
                      ? { background: 'linear-gradient(135deg, #13315C 0%, #0c2140 100%)' }
                      : m.booked
                        ? { border: '1px solid rgba(255,184,28,0.35)' }
                        : { border: '1px solid rgba(19,49,92,0.1)' }
                  }
                >
                  {m.booked && (
                    <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#D99400]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Rendez-vous pré-réservé
                    </span>
                  )}
                  {m.content}
                </div>
              </div>

              {/* Clickable options */}
              {m.role === 'assistant' && m.options && isLast && !loading && (
                <div className="ml-[3.25rem] mt-2.5 flex flex-wrap gap-2">
                  {m.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => send(opt)}
                      className="rounded-full px-3.5 py-1.5 text-xs font-medium text-[#D99400] transition-colors hover:text-[#0c2140]"
                      style={{ border: '1px solid rgba(255,184,28,0.5)', background: 'rgba(255,184,28,0.10)' }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = '#FFB81C';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = '#FFB81C';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,184,28,0.10)';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,184,28,0.5)';
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator with gold dots */}
        {loading && (
          <div className="flex items-end gap-2">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0c2140]"
              style={{ border: '1px solid rgba(255,184,28,0.25)' }}
            >
              <Image src="/logos/icon-gold.svg" alt="" width={28} height={28} className="h-7 w-7" />
            </span>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm"
              style={{ border: '1px solid rgba(19,49,92,0.1)' }}>
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#FFB81C] [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#FFB81C] [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#FFB81C]" />
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div className="flex flex-wrap gap-2 px-4 pb-2 pt-3 sm:px-5"
          style={{ borderTop: '1px solid rgba(19,49,92,0.1)', backgroundColor: '#EDE8DC' }}>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium text-[#13315C]/75 transition-all"
              style={{ border: '1px solid rgba(19,49,92,0.2)', background: 'rgba(255,255,255,0.7)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,184,28,0.15)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,184,28,0.6)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.7)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(19,49,92,0.2)';
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-end gap-2.5 bg-white px-3.5 py-3 sm:px-4 sm:py-3.5"
        style={{ borderTop: '1px solid rgba(19,49,92,0.1)' }}
      >
        <label htmlFor={`chat-${context}`} className="sr-only">
          Votre message
        </label>
        <textarea
          id={`chat-${context}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          placeholder="Écrivez votre message…"
          disabled={loading}
          className="max-h-28 flex-1 resize-none rounded-xl px-4 py-2.5 text-base text-ink placeholder:text-ink/40 focus:outline-none disabled:opacity-60 sm:text-sm"
          style={{
            border: '1px solid rgba(19,49,92,0.15)',
            backgroundColor: '#F7F4EE',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = '#FFB81C')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(19,49,92,0.15)')}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Envoyer"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#13315C] text-[#FFB81C] transition-all hover:bg-[#0c2140] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12 2-12 2z" fill="currentColor" />
          </svg>
        </button>
      </form>
    </div>
  );
}
