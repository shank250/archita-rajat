import confetti from 'canvas-confetti';

export const triggerGoldSparkles = (origin?: { x: number; y: number }) => {
  const count = 60;
  const defaults = {
    origin: origin || { x: 0.5, y: 0.5 },
    colors: ['#D4AF37', '#F3E5AB', '#AA820A', '#85222B', '#FAF1E4'],
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
    particleCount: 22,
    spread: 45,
    origin: origin || { x: 0.5, y: 0.5 },
    colors: ['#D4AF37', '#881337', '#F3E5AB'],
    scalar: 0.9,
    ticks: 100,
    gravity: 1.1,
  });
};

export const triggerCelebrationFireworks = () => {
  confetti({
    particleCount: 35,
    spread: 60,
    origin: { x: 0.5, y: 0.6 },
    colors: ['#D4AF37', '#881337', '#F3E5AB', '#FAF1E4'],
    scalar: 1.0,
    ticks: 120,
    gravity: 1.0,
  });
};

export const triggerHeartBurst = (origin?: { x: number; y: number }) => {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: origin || { x: 0.5, y: 0.6 },
    colors: ['#E74C3C', '#C0392B', '#D4AF37', '#F39C12'],
    shapes: ['circle'],
    scalar: 1.2,
  });
};
