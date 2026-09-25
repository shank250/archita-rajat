/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Google Material Clean Palette
        canvas: {
          DEFAULT: '#FDFBF7',
          pure: '#FFFFFF',
          tonal: '#F5F1EB',
          subtle: '#EFEBE4',
          dark: '#202124',
        },
        ink: {
          DEFAULT: '#202124',
          sub: '#5F6368',
          muted: '#80868B',
          light: '#F8F9FA',
        },
        festive: {
          red: '#C5221F',
          redSoft: '#FCE8E6',
          amber: '#D97706',
          amberSoft: '#FEF3D6',
          green: '#137333',
          greenSoft: '#E6F4EA',
          blue: '#1A73E8',
          blueSoft: '#E8F0FE',
          terracotta: '#8C2127',
          terracottaDark: '#2C1518',
        },
        // Backward-compatible aliases
        espresso: {
          DEFAULT: '#FDFBF7',
          dark: '#202124',
          light: '#F5F1EB',
          surface: '#FFFFFF',
          card: '#FFFFFF',
        },
        parchment: {
          DEFAULT: '#FFFFFF',
          cream: '#FFFFFF',
          dark: '#F5F1EB',
        },
        gold: {
          antique: '#D97706',
          light: '#F59E0B',
          dark: '#B45309',
          dust: 'rgba(217, 119, 6, 0.2)',
          glow: 'rgba(217, 119, 6, 0.25)',
        },
        crimson: {
          wax: '#C5221F',
          dark: '#8C2127',
          light: '#E03D3A',
          glow: 'rgba(197, 34, 31, 0.25)',
        },
        charcoal: {
          bronze: '#202124',
          muted: '#5F6368',
        },
        champagne: {
          DEFAULT: '#202124',
          muted: '#5F6368',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        decorative: ['"Cinzel Decorative"', 'serif'],
      },
      boxShadow: {
        'google-card': '0 1px 3px 0 rgba(60,64,67,0.1), 0 4px 14px 0 rgba(60,64,67,0.06)',
        'google-elevated': '0 4px 12px 0 rgba(60,64,67,0.12), 0 12px 28px 0 rgba(60,64,67,0.08)',
        'google-fab': '0 3px 5px -1px rgba(0,0,0,0.15), 0 6px 10px 0 rgba(0,0,0,0.1), 0 1px 18px 0 rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
        'wiggle': 'wiggle 2.5s ease-in-out infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
};
