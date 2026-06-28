import React from 'react';
import Link from 'next/link';

const comparison = [
  { feature: 'Architecture de produits', us: 'Ouverte sur tout le marché', them: 'Limitée aux produits maison' },
  { feature: 'Intérêt servi', us: 'Le vôtre, avant tout', them: 'Les objectifs commerciaux' },
  { feature: 'Sélection des supports', us: 'Indépendante et argumentée', them: "Catalogue imposé d'avance" },
  { feature: 'Interlocuteur', us: 'Unique, du début à la fin', them: 'Variable, par rotation' },
  { feature: 'Transparence des frais', us: 'Complète et expliquée', them: 'Partielle' },
  { feature: 'Horizon du conseil', us: 'Votre projet de vie', them: 'Les campagnes du trimestre' },
];

function CheckIcon({ className = 'text-gold' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MinusIcon({ className = 'text-ink/30' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const SectionWrapper = ({ title, children, variant }: { title: string, children: React.ReactNode, variant: string }) => (
  <section className="relative py-24 md:py-32 mb-10 shadow-2xl rounded-[3rem] overflow-hidden" style={{
    color: '#f3f1ea',
    background: 'radial-gradient(120% 120% at 100% 0%, #1c3868 0%, rgba(28,56,104,0) 46%), linear-gradient(150deg, #11254a 0%, #0d1d3b 100%)',
  }}>
    <div className="container-content relative z-10">
      <div className="mb-16 pb-8 border-b border-cream/20 flex flex-col md:flex-row items-start md:items-center gap-6">
        <span className="flex items-center justify-center px-4 h-10 bg-gold/10 border border-gold/30 text-gold font-bold rounded-full text-sm shadow-[0_0_20px_rgba(255,184,28,0.2)]">Variante {variant}</span>
        <h2 className="text-3xl font-serif text-cream">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

export default function TestComparatifPage() {
  return (
    <main className="bg-cream min-h-screen pt-32 pb-20">
      <div className="container-content text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-forest mb-6">Évolution de l'Option 2</h1>
        <p className="text-ink/70 text-lg max-w-3xl mx-auto">
          Vous avez choisi la piste <strong>Cartes Bento (Glassmorphism)</strong>. <br/>
          Voici 5 nouvelles variantes où j'ai poussé l'architecture, la profondeur, et la lisibilité de ce concept.
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 md:px-8">
        
        {/* VARIANTE 2.A : Asymmetric Bento Grid */}
        <SectionWrapper variant="2.A" title="Bento Asymétrique (Architecture Dynamique)">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {comparison.map((row, i) => {
              // Calcul des tailles pour créer un vrai look "Bento"
              const isLarge = i === 0;
              const isWide = i === 3 || i === 4 || i === 5;
              
              let spanClass = 'md:col-span-1';
              if (i === 0) spanClass = 'md:col-span-2 md:row-span-2';
              if (i === 3) spanClass = 'md:col-span-2';
              if (i === 4) spanClass = 'md:col-span-2';
              if (i === 5) spanClass = 'md:col-span-2';

              return (
                <article key={row.feature} className={`group relative overflow-hidden rounded-[2rem] bg-cream/[0.03] backdrop-blur-md border border-cream/[0.08] p-8 flex flex-col justify-between hover:bg-cream/[0.06] transition-all duration-500 ${spanClass}`}>
                  <span className="absolute -right-4 -bottom-8 font-serif text-[10rem] font-bold text-cream/[0.02] pointer-events-none transition-transform group-hover:-translate-y-4">0{i + 1}</span>
                  
                  <div className="relative z-10 flex-1 flex flex-col h-full">
                    <h3 className="text-[0.65rem] uppercase tracking-[0.25em] text-gold font-bold mb-8 flex items-center gap-3">
                      <span className="w-6 h-[1px] bg-gold/50"></span>{row.feature}
                    </h3>
                    
                    <div className={`mb-8 opacity-40 mt-${isLarge ? 'auto' : '0'}`}>
                      <span className="text-[0.65rem] uppercase tracking-widest text-cream/70">Réseau bancaire</span>
                      <p className={`text-cream/80 line-through decoration-red-400/40 ${isLarge ? 'text-lg' : 'text-sm'}`}>{row.them}</p>
                    </div>
                    
                    <div className={`mt-auto pt-6 border-t border-cream/[0.08]`}>
                      <span className="text-[0.65rem] uppercase tracking-widest text-gold font-bold mb-2 flex items-center gap-2">
                        <CheckIcon className="w-3 h-3"/> Élan Patrimoine
                      </span>
                      <p className={`font-serif leading-[1.15] text-cream group-hover:text-white transition-colors ${isLarge ? 'text-4xl' : 'text-2xl'}`}>
                        {row.us}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </SectionWrapper>


        {/* VARIANTE 2.B : Floating Glass Cards */}
        <SectionWrapper variant="2.B" title="Verre Flottant (Profondeur et Lumière)">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comparison.map((row, i) => (
              <article key={row.feature} className="group relative rounded-3xl p-8 flex flex-col justify-between hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-cream/[0.08] to-transparent shadow-[0_15px_35px_0_rgba(0,0,0,0.6)] border-t border-l border-cream/20 border-b border-r border-cream/5 backdrop-blur-xl overflow-hidden">
                {/* Lueur interne (orb) */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-[50px] group-hover:bg-gold/40 transition-colors duration-700 pointer-events-none" />
                
                <span className="text-gold/40 font-serif text-3xl block mb-6">{String(i + 1).padStart(2, '0')}</span>
                
                <div className="relative z-10">
                  <h3 className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/90 font-bold mb-6 pb-4 border-b border-cream/10">
                    {row.feature}
                  </h3>
                  
                  <div className="mb-6">
                    <span className="text-[0.55rem] uppercase tracking-widest text-cream/50 mb-1 flex items-center gap-2"><MinusIcon className="w-3 h-3 text-cream/30"/> Standard</span>
                    <p className="text-cream/50 text-sm">{row.them}</p>
                  </div>
                  
                  <div>
                    <span className="text-[0.55rem] uppercase tracking-widest text-gold font-bold mb-1 flex items-center gap-2"><CheckIcon className="w-3 h-3 text-gold"/> Élan</span>
                    <p className="font-serif text-[1.6rem] leading-tight text-cream drop-shadow-md">{row.us}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SectionWrapper>


        {/* VARIANTE 2.C : Horizontal Glass Cards */}
        <SectionWrapper variant="2.C" title="Flux Horizontal (Lisibilité Optimale)">
          <div className="space-y-6">
            {comparison.map((row, i) => (
              <article key={row.feature} className="group relative overflow-hidden rounded-[2rem] bg-cream/[0.03] backdrop-blur-md border border-cream/[0.08] p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 hover:bg-cream/[0.05] hover:border-gold/30 transition-all duration-500 shadow-lg hover:shadow-2xl">
                
                <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-cream/10 pb-6 md:pb-0 md:pr-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-gold/40 font-serif text-2xl">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-[0.65rem] uppercase tracking-[0.25em] text-cream font-bold">{row.feature}</h3>
                  </div>
                  <div className="opacity-50">
                    <span className="text-[0.55rem] uppercase tracking-widest text-cream/70 block mb-1">Réseau bancaire</span>
                    <p className="text-sm line-through decoration-cream/40">{row.them}</p>
                  </div>
                </div>

                <div className="w-full md:w-2/3">
                  <span className="text-[0.65rem] uppercase tracking-widest text-gold font-bold mb-2 flex items-center gap-2">
                    <span className="w-6 h-[1px] bg-gold" /> Élan Patrimoine
                  </span>
                  <p className="font-serif text-3xl md:text-4xl leading-tight text-cream group-hover:text-white transition-colors">{row.us}</p>
                </div>

              </article>
            ))}
          </div>
        </SectionWrapper>


        {/* VARIANTE 2.D : The Spotlight (Interactive Borders) */}
        <SectionWrapper variant="2.D" title="Projecteur (Bordures Interactives)">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparison.map((row, i) => (
              <div key={row.feature} className="group relative p-[1px] rounded-[2rem] overflow-hidden">
                {/* Effet de balayage sur la bordure */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-500" style={{ transformOrigin: 'center' }} />
                
                {/* Fallback border */}
                <div className="absolute inset-0 border border-cream/[0.08] rounded-[2rem] group-hover:border-transparent transition-colors duration-500" />
                
                <article className="relative h-full bg-[#0a1429] rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                  <span className="absolute -right-4 -top-8 font-serif text-[8rem] font-bold text-cream/[0.03] pointer-events-none">0{i + 1}</span>

                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-[0.6rem] uppercase tracking-[0.2em] text-gold font-bold mb-8">
                      {row.feature}
                    </h3>
                    
                    <div className="mb-6 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                      <p className="text-sm line-through">{row.them}</p>
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-cream/[0.05]">
                      <p className="font-serif text-[1.8rem] leading-[1.15] text-cream">{row.us}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </SectionWrapper>


        {/* VARIANTE 2.E : Minimal Glass (Épuration Totale) */}
        <SectionWrapper variant="2.E" title="Verre Minimal (Focus sur l'Essentiel)">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comparison.map((row, i) => (
              <article key={row.feature} className="group relative rounded-[2rem] bg-white/[0.01] backdrop-blur-sm border border-white/[0.04] p-10 flex flex-col justify-center text-center hover:bg-white/[0.03] transition-colors duration-500">
                <span className="w-12 h-[1px] bg-gold/40 mx-auto mb-8 transition-all duration-500 group-hover:w-24 group-hover:bg-gold" />
                
                <h3 className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/50 font-bold mb-6">
                  {row.feature}
                </h3>
                
                <p className="font-serif text-3xl leading-tight text-cream mb-8">
                  {row.us}
                </p>

                {/* Bulle / Tooltip statique pour le réseau bancaire */}
                <div className="inline-block mx-auto px-4 py-2 rounded-full bg-black/40 border border-white/5 opacity-50 group-hover:opacity-80 transition-opacity">
                  <span className="text-[0.6rem] text-cream/70 flex items-center gap-2"><MinusIcon className="w-3 h-3 text-red-400/50" /> {row.them}</span>
                </div>
              </article>
            ))}
          </div>
        </SectionWrapper>

        {/* --- SECTION: SIMPLES ET MINIMALISTES --- */}
        <div className="mt-32 mb-16 text-center">
          <h2 className="text-4xl font-serif text-cream mb-4">Designs Simples & Minimalistes</h2>
          <p className="text-cream/50 max-w-2xl mx-auto text-lg">Une approche totalement épurée, sans artifice, où seule l'information compte.</p>
        </div>

        {/* Minimal M.1 */}
        <SectionWrapper variant="M.1" title="Lignes Pures (Wireframe)">
          <div className="max-w-4xl mx-auto border-t border-cream/20">
            {comparison.map((row, i) => (
              <div key={row.feature} className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-cream/10 hover:bg-cream/[0.02] transition-colors px-4 md:px-0">
                <div className="text-[0.65rem] uppercase tracking-[0.2em] text-gold/80 font-bold self-center">
                  {row.feature}
                </div>
                <div className="text-sm text-cream/40 self-center">
                  {row.them}
                </div>
                <div className="font-serif text-2xl text-cream self-center">
                  {row.us}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Minimal M.2 */}
        <SectionWrapper variant="M.2" title="Colonne Centrale (Éditorial Pur)">
          <div className="max-w-3xl mx-auto space-y-20 py-10">
            {comparison.map((row, i) => (
              <div key={row.feature} className="text-center group px-4">
                <span className="text-[0.55rem] uppercase tracking-[0.25em] text-cream/30 block mb-6">{row.feature}</span>
                <p className="font-serif text-3xl md:text-5xl text-cream mb-6 group-hover:text-gold transition-colors">{row.us}</p>
                <div className="inline-flex items-center gap-3 opacity-30">
                  <span className="w-6 h-[1px] bg-cream/50" />
                  <span className="text-xs text-cream/80">{row.them}</span>
                  <span className="w-6 h-[1px] bg-cream/50" />
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Minimal M.3 */}
        <SectionWrapper variant="M.3" title="Cartes Discrètes (Ultra-Light Bento)">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparison.map((row, i) => (
              <article key={row.feature} className="p-8 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:bg-white/[0.03] transition-colors">
                <h3 className="text-[0.65rem] uppercase tracking-[0.2em] text-gold/70 mb-8 pb-4 border-b border-cream/5">{row.feature}</h3>
                <div className="space-y-6">
                  <div className="opacity-40">
                    <p className="text-sm">{row.them}</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl text-cream">{row.us}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SectionWrapper>

        {/* Minimal M.4 */}
        <SectionWrapper variant="M.4" title="Phrases (Inline Comparison)">
          <div className="max-w-4xl mx-auto space-y-12 py-10 px-4">
            {comparison.map((row, i) => (
              <p key={row.feature} className="text-xl md:text-2xl font-light text-cream/60 leading-relaxed border-l-2 border-gold/30 pl-6">
                Pour l'<strong className="font-semibold text-cream/80">{row.feature.toLowerCase()}</strong>, au lieu d'une approche <span className="text-cream/30 line-through decoration-cream/20">{row.them.toLowerCase()}</span>, nous offrons une solution <span className="text-gold font-serif text-2xl md:text-3xl">{row.us.toLowerCase()}</span>.
              </p>
            ))}
          </div>
        </SectionWrapper>

        {/* Minimal M.5 */}
        <SectionWrapper variant="M.5" title="Liste Classique (Apple-Style)">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 py-10 px-4">
            {comparison.map((row, i) => (
              <div key={row.feature} className="flex items-start gap-5">
                <CheckIcon className="w-6 h-6 text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl text-cream font-medium mb-2">{row.us}</h3>
                  <p className="text-sm text-cream/40 leading-relaxed">
                    Une alternative claire au modèle bancaire classique souvent {row.them.toLowerCase()} en matière de {row.feature.toLowerCase()}.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

      </div>
    </main>
  );
}
