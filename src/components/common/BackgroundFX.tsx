import React, { useMemo } from 'react';

export const BackgroundFX: React.FC = () => {
  // Joyful Google Doodle style celebratory micro-confetti particles
  const festiveDots = useMemo(() => {
    const colors = ['#F9AB00', '#EA4335', '#34A853', '#4285F4', '#E37400', '#FA7B17'];
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.8 + 2) % 96}%`,
      top: `${(i * 6.5 + 4) % 96}%`,
      size: `${(i % 3) * 2 + 4}px`,
      color: colors[i % colors.length],
      duration: `${5 + (i % 5) * 1.5}s`,
      delay: `${(i % 7) * 0.4}s`,
      shape: i % 4 === 0 ? 'star' : i % 3 === 0 ? 'rect' : 'circle',
      opacity: 0.25 + (i % 3) * 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft warm sunbeam dome at top */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full blur-[120px] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #FDE293 0%, #FCE8E6 50%, transparent 80%)',
        }}
      />

      {/* Playful Google celebratory floating micro-confetti */}
      {festiveDots.map((dot) => (
        <span
          key={dot.id}
          className={`absolute pointer-events-none animate-float-gentle ${
            dot.shape === 'circle' ? 'rounded-full' : dot.shape === 'rect' ? 'rounded-sm rotate-12' : ''
          }`}
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            opacity: dot.opacity,
            animationDuration: dot.duration,
            animationDelay: dot.delay,
          }}
        />
      ))}
    </div>
  );
};
