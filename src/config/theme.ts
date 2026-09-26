/**
 * ===================================================================
 * WEDDING INVITATION MASTER THEME CONFIGURATION
 * ===================================================================
 * 
 * Edit this SINGLE FILE to change the entire color palette & vibe
 * of the invitation website. All UI components, canvas scratch cards,
 * envelope stationery, and confetti particles read from here!
 */

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;

  // 1. Core Brand & Action
  primary: string;          // Main brand color: headings, active tabs, envelope, primary buttons
  primaryHover: string;     // Hover state for primary actions
  secondary: string;        // Wax seal, key milestone highlights, CTA accent
  secondaryHover: string;   // Hover state for secondary actions
  accent: string;           // Champagne gold, stars, dividers, filigree
  accentSoft: string;       // Subtle glow/tint

  // 2. Backgrounds & Surfaces
  canvas: string;           // Main page background (Light, modern, airy)
  surface: string;          // Card backgrounds, modals
  surfaceSubtle: string;    // Light tonal card backgrounds, inputs, badges
  surfaceHighlight: string; // Active item highlight tint

  // 3. Borders & Dividers
  border: string;           // Card & section borders (delicate modern hairline)
  borderSubtle: string;     // Hairline inner borders, card inner rules

  // 4. Typography
  textPrimary: string;      // Headings & high-contrast titles
  textBody: string;         // Main body text & copy (editorial, high readability)
  textMuted: string;        // Subtitles, secondary notes, dates
  textOnPrimary: string;    // Text on primary buttons/cards (usually white)

  // 5. Envelope Stationery
  envelope: {
    outer: string;          // Envelope outer shell (Dusty Slate Blue)
    outerBorder: string;    // Outer shell border
    flap: string;           // 3D folding flap
    flapBorder: string;     // Flap edge
    stitching: string;      // Inner border stitching
    stampBg: string;        // Postage stamp background
    stampText: string;      // Postage stamp text
    text: string;           // Envelope address text
  };

  // 6. Scratchcard Canvas Top Layer
  scratch: {
    cover: string;          // Scratchcard cover background (Muted Frost Silk)
    innerBorder: string;    // Inner hairline border
    flecks: string[];       // Glitter flecks colors (Champagne, Sage, Slate)
    titleColor: string;     // Invocation & names
    promptColor: string;    // Action prompt text
    textColor: string;      // Subtitle & milestone teaser
  };

  // 7. Confetti Particle Colors
  confettiColors: string[];
}

/**
 * CURATED MODERN THEME PRESETS (Zero loud/neon colors, editorial luxury aesthetic)
 */
export const themePresets: Record<string, ThemeConfig> = {
  // Preset 1: Modern Krishna (French Denim Blue & Soft Pastel Blush Pink + Vibrant Berry Magenta)
  modernKrishna: {
    id: 'modernKrishna',
    name: 'Modern Krishna (French Denim Blue & Pastel Blush)',
    description: 'Chic hand-drawn pastel aesthetic: French denim royal blue, soft pastel blush pink, pure crisp white, deep slate blue, and vibrant berry magenta',
    primary: '#3666A6',          // Handcrafted French/Denim Royal Blue (--color-brand-blue)
    primaryHover: '#2E5B99',     // Deeper Denim Royal Blue
    secondary: '#D81B60',        // Vibrant Berry Magenta (--color-accent-magenta)
    secondaryHover: '#B7154F',   // Deep Berry Magenta
    accent: '#3666A6',           // Royal Blue accent
    accentSoft: 'rgba(216, 27, 96, 0.12)', // Subtle berry glow

    canvas: '#FCE8E9',           // Soft Pastel Blush Pink (--color-canvas-bg)
    surface: '#FFFFFF',          // Pure Crisp White (--color-card-surface)
    surfaceSubtle: '#FFF3F5',    // Delicate pastel blush silk
    surfaceHighlight: '#FDE8EC', // Soft blush highlight

    border: '#F3C4CC',           // Soft Hand-Drawn Blush Border
    borderSubtle: '#F8D9DF',     // Subtle Hairline

    textPrimary: '#3666A6',      // Handcrafted French/Denim Royal Blue
    textBody: '#2A4B7C',         // Deep Slate Blue (--color-text-body)
    textMuted: '#5375A6',        // Muted Slate Blue
    textOnPrimary: '#FFFFFF',

    envelope: {
      outer: '#3666A6',          // French/Denim Royal Blue outer shell
      outerBorder: '#2E5B99',
      flap: '#FBDDE0',           // Soft Pastel Blush Pink flap for chic contrast
      flapBorder: '#F3C4CC',
      stitching: 'rgba(54, 102, 166, 0.35)', // Denim embroidery
      stampBg: '#FFFFFF',        // Pure Crisp White Postage Stamp
      stampText: '#D81B60',      // Berry Magenta Stamp Monogram
      text: '#FFFFFF',
    },

    scratch: {
      cover: '#F8B4C0',          // Frosted Rose Pink (--color-scratch-cover)
      innerBorder: 'rgba(54, 102, 166, 0.35)', // Royal Blue sketched hairline
      flecks: ['#3666A6', '#D4AF37', '#FBDDE0', '#FFFFFF', '#D81B60'], // Blue, gold, blush
      titleColor: '#3666A6',     // Brand blue title
      promptColor: '#3666A6',    // Brand blue prompt
      textColor: '#2A4B7C',      // Deep slate blue text
    },

    // Soft blue and gold celebration confetti burst
    confettiColors: ['#3666A6', '#2E5B99', '#5A82B8', '#D4AF37', '#F3E5AB', '#F59E0B', '#E5C07B', '#FFFFFF'],
  },

  // Preset 2: Eucalyptus Sage & French Blue (Earthy, Organic, Modern Luxury)
  modernSage: {
    id: 'modernSage',
    name: 'Eucalyptus Sage & French Blue',
    description: 'Earthy luxury sage green with subtle french blue and warm linen',
    primary: '#4A6B5D',          // Earthy Eucalyptus Sage
    primaryHover: '#395348',
    secondary: '#486581',        // Dusty French Blue
    secondaryHover: '#334E68',
    accent: '#C5A880',           // Champagne Gold
    accentSoft: 'rgba(74, 107, 93, 0.1)',

    canvas: '#F8FAF9',           // Linen White
    surface: '#FFFFFF',
    surfaceSubtle: '#EFF4F1',
    surfaceHighlight: '#F3F6F8',

    border: '#D5DFDA',
    borderSubtle: '#E5ECE8',

    textPrimary: '#2D443B',
    textBody: '#2C3E35',
    textMuted: '#5C746A',
    textOnPrimary: '#FFFFFF',

    envelope: {
      outer: '#4A6B5D',
      outerBorder: '#395348',
      flap: '#577C6D',
      flapBorder: '#395348',
      stitching: 'rgba(197, 168, 128, 0.45)',
      stampBg: '#486581',
      stampText: '#FFFFFF',
      text: '#FFFFFF',
    },

    scratch: {
      cover: '#D5DFDA',
      innerBorder: 'rgba(197, 168, 128, 0.5)',
      flecks: ['#C5A880', '#4A6B5D', '#486581', '#E5ECE8'],
      titleColor: '#2D443B',
      promptColor: '#486581',
      textColor: '#2C3E35',
    },

    confettiColors: ['#4A6B5D', '#486581', '#C5A880', '#829E91', '#FFFFFF'],
  },

  // Preset 3: Minimalist Champagne & Charcoal Slate (Monochromatic Editorial)
  minimalChampagne: {
    id: 'minimalChampagne',
    name: 'Minimalist Champagne & Slate',
    description: 'Warm champagne gold with charcoal slate and pure ivory',
    primary: '#2B3A4A',
    primaryHover: '#1D2834',
    secondary: '#B38F58',        // Warm Champagne Ochre
    secondaryHover: '#967442',
    accent: '#C5A880',
    accentSoft: 'rgba(179, 143, 88, 0.12)',

    canvas: '#FAF9F6',
    surface: '#FFFFFF',
    surfaceSubtle: '#F4F2EC',
    surfaceHighlight: '#FEFBF5',

    border: '#E5E1D8',
    borderSubtle: '#F0ECE4',

    textPrimary: '#1E293B',
    textBody: '#334155',
    textMuted: '#64748B',
    textOnPrimary: '#FFFFFF',

    envelope: {
      outer: '#2B3A4A',
      outerBorder: '#1D2834',
      flap: '#3B4D60',
      flapBorder: '#1D2834',
      stitching: 'rgba(197, 168, 128, 0.45)',
      stampBg: '#B38F58',
      stampText: '#FFFFFF',
      text: '#FFFFFF',
    },

    scratch: {
      cover: '#E5E1D8',
      innerBorder: 'rgba(179, 143, 88, 0.5)',
      flecks: ['#B38F58', '#2B3A4A', '#C5A880', '#F0ECE4'],
      titleColor: '#1E293B',
      promptColor: '#B38F58',
      textColor: '#334155',
    },

    confettiColors: ['#2B3A4A', '#B38F58', '#C5A880', '#64748B', '#FFFFFF'],
  },
};

/**
 * ===================================================================
 * ACTIVE THEME SELECTION:
 * Modern Krishna (Muted Dusty Slate Blue + Soft Sage Green + Champagne Gold)
 * ===================================================================
 */
export const activeTheme: ThemeConfig = themePresets.modernKrishna;

/**
 * Helper to generate CSS variables map for DOM injection
 */
export const getThemeCssVariables = (theme: ThemeConfig = activeTheme): Record<string, string> => ({
  // Direct palette variables from prompt
  '--color-canvas-bg': theme.canvas,
  '--color-card-surface': theme.surface,
  '--color-brand-blue': theme.primary,
  '--color-brand-blue-hover': theme.primaryHover,
  '--color-text-body': theme.textBody,
  '--color-text-muted': theme.textMuted,
  '--color-accent-magenta': theme.secondary,
  '--color-accent-magenta-hover': theme.secondaryHover,
  '--color-scratch-cover': theme.scratch.cover,

  // Semantic variables
  '--color-primary': theme.primary,
  '--color-primary-hover': theme.primaryHover,
  '--color-secondary': theme.secondary,
  '--color-secondary-hover': theme.secondaryHover,
  '--color-accent': theme.accent,
  '--color-accent-soft': theme.accentSoft,
  '--color-canvas': theme.canvas,
  '--color-surface': theme.surface,
  '--color-surface-subtle': theme.surfaceSubtle,
  '--color-surface-highlight': theme.surfaceHighlight,
  '--color-border': theme.border,
  '--color-border-subtle': theme.borderSubtle,
  '--color-text-primary': theme.textPrimary,
  '--color-text-on-primary': theme.textOnPrimary,
});
