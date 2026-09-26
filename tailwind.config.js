/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Theme Tokens (mapped to CSS variables from src/config/theme.ts)
        primary: {
          DEFAULT: 'var(--color-primary, #881337)',
          hover: 'var(--color-primary-hover, #70102E)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary, #D97706)',
          hover: 'var(--color-secondary-hover, #B45309)',
        },
        accent: {
          DEFAULT: 'var(--color-accent, #D4AF37)',
          soft: 'var(--color-accent-soft, rgba(212, 175, 55, 0.15))',
        },
        canvas: {
          DEFAULT: 'var(--color-canvas, #FDFBF7)',
        },
        surface: {
          DEFAULT: 'var(--color-surface, #FFFFFF)',
          subtle: 'var(--color-surface-subtle, #F9F6F0)',
          highlight: 'var(--color-surface-highlight, #FFF7ED)',
        },
        'theme-border': {
          DEFAULT: 'var(--color-border, #EADCC8)',
          subtle: 'var(--color-border-subtle, #F4ECE1)',
        },
        'text-main': 'var(--color-text-primary, #881337)',
        'text-body': 'var(--color-text-body, #2C1810)',
        'text-sub': 'var(--color-text-muted, #6B5E55)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        decorative: ['"Cinzel Decorative"', 'serif'],
      },
      boxShadow: {
        'card-subtle': '0 2px 10px 0 rgba(0, 0, 0, 0.04), 0 8px 30px 0 rgba(0, 0, 0, 0.03)',
        'card-elevated': '0 4px 14px 0 rgba(0, 0, 0, 0.06), 0 16px 36px 0 rgba(0, 0, 0, 0.05)',
        'seal': '0 8px 24px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
        'wiggle': 'wiggle 2.5s ease-in-out infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'sway': 'sway 6s ease-in-out infinite',
        'drift': 'drift 12s ease-in-out infinite',
        'drift-slow': 'drift 18s ease-in-out infinite',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1.5deg)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-6px) translateX(3px) rotate(1deg)' },
          '50%': { transform: 'translateY(-10px) translateX(-2px) rotate(-0.5deg)' },
          '75%': { transform: 'translateY(-4px) translateX(4px) rotate(0.5deg)' },
        },
      },
    },
  },
  plugins: [],
};
