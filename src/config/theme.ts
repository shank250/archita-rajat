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
  // Preset 1: Modern Krishna (Cloud Slate Blue & Blush Lotus Pink + Champagne Gold)
  modernKrishna: {
    id: 'modernKrishna',
    name: 'Modern Krishna (Cloud Slate & Blush Lotus)',
    description: 'Understated editorial luxury: serene cloud slate blue, soft blush lotus pink, champagne antique gold, and alabaster silk',
    primary: '#386180',          // Modern Krishna Cloud Slate (Refined, calm, not electric or loud)
    primaryHover: '#284A63',     // Deep Slate
    secondary: '#C46882',        // Blush Lotus Pink (Romantic, modern luxury accent)
    secondaryHover: '#AD526B',   // Deep Lotus Rose
    accent: '#C5A880',           // Warm Champagne Antique Gold
    accentSoft: 'rgba(196, 104, 130, 0.12)', // Subtle lotus glow

    canvas: '#FAF6F8',           // Soft Blush Alabaster Silk (Clean, light, airy, modern)
    surface: '#FFFFFF',          // Pure Crisp Snow White
    surfaceSubtle: '#F7F0F4',    // Delicate lotus petal silk
    surfaceHighlight: '#FDF2F6', // Soft lotus blush highlight

    border: '#E8D7DF',           // Delicate Rose-Slate Hairline Border
    borderSubtle: '#F2E8ED',     // Soft Hairline

    textPrimary: '#243B53',      // Deep Slate Cerulean (Editorial, high-contrast, effortless to read)
    textBody: '#334E68',         // Slate Charcoal for body text (Passes WCAG AAA)
    textMuted: '#6C7D8F',        // Sophisticated Muted Slate for dates & subtitles
    textOnPrimary: '#FFFFFF',

    envelope: {
      outer: '#386180',          // Cloud Slate Outer Shell (Tailored luxury)
      outerBorder: '#284A63',
      flap: '#C46882',          // Blush Lotus Flap (Distinctive luxury contrast against slate body)
      flapBorder: '#AD526B',
      stitching: 'rgba(197, 168, 128, 0.5)', // Champagne Gold embroidery
      stampBg: '#F7F0F4',        // Soft Lotus Silk Postage Stamp
      stampText: '#C46882',      // Blush Lotus Stamp Monogram
      text: '#FFFFFF',
    },

    scratch: {
      cover: '#F0DEE7',          // Delicate Rose Quartz / Soft Baby Pink Silk
      innerBorder: 'rgba(197, 168, 128, 0.55)', // Champagne gold hairline
      flecks: ['#C5A880', '#C46882', '#386180', '#FADCE7', '#FFFFFF'], // Champagne, lotus pink, slate
      titleColor: '#243B53',     // High contrast slate title
      promptColor: '#C46882',    // Blush lotus pink prompt
      textColor: '#334E68',      // High contrast slate charcoal text
    },

    confettiColors: ['#386180', '#C46882', '#C5A880', '#FADCE7', '#FFFFFF'],
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
  '--color-text-body': theme.textBody,
  '--color-text-muted': theme.textMuted,
  '--color-text-on-primary': theme.textOnPrimary,
});
