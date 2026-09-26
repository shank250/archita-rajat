import confetti from 'canvas-confetti';
import { activeTheme } from '../config/theme';

export const triggerGoldSparkles = (origin?: { x: number; y: number }) => {
  const count = 60;
  const defaults = {
    origin: origin || { x: 0.5, y: 0.5 },
    colors: activeTheme.confettiColors,
  };

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.7),
    spread: 70,
    startVelocity: 35,
    ticks: 200,
    gravity: 0.9,
    shapes: ['circle'],
    scalar: 1.1,
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.3),
    spread: 100,
    startVelocity: 45,
    ticks: 240,
    gravity: 0.8,
  });
};

export const triggerSubtleRevealSparkle = (origin?: { x: number; y: number }) => {
  confetti({
    particleCount: 28,
    spread: 50,
    origin: origin || { x: 0.5, y: 0.5 },
    colors: activeTheme.confettiColors,
    scalar: 1.0,
    ticks: 110,
    gravity: 1.0,
  });
};

export const triggerCelebrationFireworks = () => {
  confetti({
    particleCount: 45,
    spread: 70,
    origin: { x: 0.5, y: 0.55 },
    colors: activeTheme.confettiColors,
    scalar: 1.05,
    ticks: 140,
    gravity: 0.95,
  });
};

export const triggerHeartBurst = (origin?: { x: number; y: number }) => {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: origin || { x: 0.5, y: 0.6 },
    colors: activeTheme.confettiColors,
    shapes: ['circle'],
    scalar: 1.2,
  });
};

/**
 * Soft Blue and Gold Confetti Burst for Scratchcard reveal
 * French/Denim royal blues (#3666A6, #2E5B99) and warm antique golds (#D4AF37, #F3E5AB)
 */
export const triggerSoftBlueAndGoldConfetti = (origin?: { x: number; y: number }) => {
  const softBlueAndGold = ['#3666A6', '#2E5B99', '#5A82B8', '#D4AF37', '#F3E5AB', '#F59E0B', '#FFFFFF'];
  confetti({
    particleCount: 65,
    spread: 80,
    origin: origin || { x: 0.5, y: 0.55 },
    colors: softBlueAndGold,
    scalar: 1.1,
    ticks: 180,
    gravity: 0.9,
  });
};

