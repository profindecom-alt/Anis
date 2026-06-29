import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Classes garanties dans le CSS de production, quelle que soit l'analyse du
  // contenu côté hébergeur (cache de build agressif). Elles pilotent
  // l'affichage des 2ᵉ/3ᵉ colonnes du mur de témoignages (voir
  // {@link components/TestimonialsColumns}) : sans elles, le mur retombe à une
  // seule colonne sur desktop.
  safelist: ['md:block', 'lg:block'],
  theme: {
    extend: {
      colors: {
        // Identité visuelle Élan Patrimoine
        cream: {
          DEFAULT: '#F5F0E8', // Ivoire crème
          50: '#FBF9F5',
          100: '#F5F0E8',
          200: '#EBE3D4',
        },
        forest: {
          DEFAULT: '#13315C', // Bleu nuit (couleur primaire) — « Refined royal »
          light: '#284f80',
          dark: '#0c2140',
          50: '#E8ECF3',
        },
        gold: {
          DEFAULT: '#FFB81C', // Or — Pantone 1235C (couleur secondaire)
          light: '#FFC94D',
          dark: '#D99400',
        },
        ink: '#1C1B18',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'Dancing Script', 'cursive'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      boxShadow: {
        card: '0 1px 2px rgba(28,27,24,0.04), 0 12px 32px -16px rgba(28,27,24,0.16)',
        elevated: '0 24px 60px -24px rgba(18,55,37,0.30)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scroll-y': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-28px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.9s ease both',
        'scroll-y': 'scroll-y 20s linear infinite',
        'float': 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
