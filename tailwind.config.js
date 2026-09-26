/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 1. Direct Color Palette Tokens (from Prompt Requirements)
        'canvas-bg': 'var(--color-canvas-bg, #FCE8E9)',
        'card-surface': 'var(--color-card-surface, #FFFFFF)',
        'brand-blue': {
          DEFAULT: 'var(--color-brand-blue, #3666A6)',
          hover: 'var(--color-brand-blue-hover, #2E5B99)',
        },
        'text-body': 'var(--color-text-body, #2A4B7C)',
        'accent-magenta': {
          DEFAULT: 'var(--color-accent-magenta, #D81B60)',
          hover: 'var(--color-accent-magenta-hover, #B7154F)',
        },
        'scratch-cover': 'var(--color-scratch-cover, #F8B4C0)',

        // 2. Semantic Theme Tokens (mapped to the palette)
        primary: {
          DEFAULT: 'var(--color-brand-blue, #3666A6)',
          hover: 'var(--color-brand-blue-hover, #2E5B99)',
        },
        secondary: {
          DEFAULT: 'var(--color-accent-magenta, #D81B60)',
          hover: 'var(--color-accent-magenta-hover, #B7154F)',
        },
        accent: {
          DEFAULT: 'var(--color-brand-blue, #3666A6)',
          soft: 'var(--color-accent-soft, rgba(216, 27, 96, 0.12))',
        },
        canvas: {
          DEFAULT: 'var(--color-canvas-bg, #FCE8E9)',
        },
        surface: {
          DEFAULT: 'var(--color-card-surface, #FFFFFF)',
          subtle: 'var(--color-surface-subtle, #FFF3F5)',
          highlight: 'var(--color-surface-highlight, #FDE8EC)',
        },
        'theme-border': {
          DEFAULT: 'var(--color-border, #F3C4CC)',
          subtle: 'var(--color-border-subtle, #F8D9DF)',
        },
        'text-main': 'var(--color-brand-blue, #3666A6)',
        'text-sub': 'var(--color-text-muted, #5375A6)',
      },
      fontFamily: {
        sans: ['"Comfortaa"', '"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        decorative: ['"Cinzel Decorative"', 'serif'],
        script: ['"Caveat"', 'cursive', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive', 'sans-serif'],
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
