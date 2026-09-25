/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#15100D',
          dark: '#0E0B09',
          light: '#1C1512',
          surface: '#241C18',
        },
        parchment: {
          DEFAULT: '#FAF1E4',
          cream: '#FDF8F0',
          dark: '#F0E3CF',
        },
        gold: {
          antique: '#D4AF37',
          light: '#E5C378',
          dark: '#AA820A',
          dust: 'rgba(212, 175, 55, 0.25)',
          glow: 'rgba(212, 175, 55, 0.45)',
        },
        crimson: {
          wax: '#6B1D24',
          dark: '#4A1217',
          light: '#85222B',
          glow: 'rgba(107, 29, 36, 0.5)',
        },
        charcoal: {
          bronze: '#2B231D',
          muted: '#5A4C42',
        },
        champagne: {
          DEFAULT: '#F5EFEB',
          muted: '#C4B7AC',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        decorative: ['"Cinzel Decorative"', 'serif'],
        sans: ['"Montserrat"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'wax-seal': '0 10px 25px -5px rgba(107, 29, 36, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
        'parchment': '0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 15px rgba(212, 175, 55, 0.2)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #AA820A 100%)',
        'crimson-gradient': 'linear-gradient(145deg, #85222B 0%, #6B1D24 50%, #4A1217 100%)',
        'espresso-radial': 'radial-gradient(circle at 50% 20%, #241C18 0%, #15100D 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
