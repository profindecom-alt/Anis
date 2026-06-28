const words = [
  'Indépendance',
  'Expertise',
  'Transmission',
  'Long terme',
  'Discrétion',
  'Cabinet indépendant',
  'Patrimoine',
  'Conseil sur mesure',
  'Indépendance',
  'Expertise',
  'Transmission',
  'Long terme',
  'Discrétion',
  'Cabinet indépendant',
  'Patrimoine',
  'Conseil sur mesure',
];

export default function MarqueeStrip() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-gold/[0.12] py-[14px]"
      style={{
        background:
          'radial-gradient(120% 120% at 100% 0%, #1c3868 0%, rgba(28,56,104,0) 46%), linear-gradient(150deg, #11254a 0%, #0d1d3b 100%)',
      }}
    >
      <div className="marquee select-none">
        <div className="marquee-track">
          {words.map((word, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-7">
              <span className="font-serif text-[15px] italic text-cream/45">{word}</span>
              <span className="inline-block h-[5px] w-[5px] rotate-45 bg-gold/35" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
