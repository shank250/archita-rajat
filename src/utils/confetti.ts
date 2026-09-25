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

export const triggerCelebrationFireworks = () => {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#D4AF37', '#FFD700', '#F3E5AB', '#85222B', '#E5C378'];

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  frame();
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
