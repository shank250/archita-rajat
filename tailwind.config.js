/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern 21st-century Obsidian Palette
        obsidian: {
          DEFAULT: '#0A0A0E',
          dark: '#050507',
          light: '#131318',
          surface: '#181820',
          card: '#1F1F2A',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        // Alias espresso to modern obsidian for compatibility
        espresso: {
          DEFAULT: '#0A0A0E',
          dark: '#050507',
          light: '#131318',
          surface: '#181820',
          card: '#1F1F2A',
        },
        // Modern 21st-century Solid Porcelain
        porcelain: {
          DEFAULT: '#F8F8FA',
          cream: '#FCFCFD',
          card: '#FFFFFF',
          dark: '#EBEBEF',
        },
        // Alias parchment to solid crisp porcelain
        parchment: {
          DEFAULT: '#F8F8FA',
          cream: '#FFFFFF',
          dark: '#EBEBEF',
        },
        // Solid Metallic Champagne Gold
        gold: {
          antique: '#D4AF37',
          light: '#F3DB94',
          dark: '#A68214',
          dust: 'rgba(212, 175, 55, 0.25)',
          glow: 'rgba(212, 175, 55, 0.35)',
        },
        // Solid Carmine Crimson Wax
        crimson: {
          wax: '#8E1722',
          dark: '#5C0D15',
          light: '#B0202D',
          glow: 'rgba(142, 23, 34, 0.45)',
        },
        charcoal: {
          bronze: '#0F0F14',
          muted: '#525260',
        },
        champagne: {
          DEFAULT: '#F8F8FA',
          muted: '#9494A4',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        decorative: ['"Cinzel Decorative"', 'serif'],
        sans: ['"Montserrat"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.3)',
        'wax-seal': '0 12px 25px -4px rgba(142, 23, 34, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
        'modern-card': '0 20px 50px -12px rgba(0, 0, 0, 0.8), 0 0 1px rgba(255, 255, 255, 0.1)',
        'parchment': '0 20px 45px -10px rgba(0, 0, 0, 0.5), 0 0 1px rgba(212, 175, 55, 0.3)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFF0BE 0%, #D4AF37 50%, #A68214 100%)',
        'crimson-gradient': 'linear-gradient(145deg, #B0202D 0%, #8E1722 55%, #5C0D15 100%)',
        'obsidian-gradient': 'linear-gradient(180deg, #131318 0%, #0A0A0E 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
};
