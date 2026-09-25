import React, { useMemo } from 'react';

export const BackgroundFX: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.2 + 3) % 96}%`,
      top: `${(i * 7.1 + 8) % 96}%`,
      size: `${(i % 3) * 1.2 + 1.8}px`,
      duration: `${6 + (i % 5) * 1.5}s`,
      delay: `${(i % 7) * 0.5}s`,
      opacity: 0.15 + (i % 4) * 0.12,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Modern Top Ambient Light Dome */}
      <div 
        className="absolute -top-48 left-1/2 -translate-x-1/2 w-[750px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, #8E1722 40%, transparent 75%)',
        }}
      />

      {/* Floating crisp gold micro-stardust */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gold-light pointer-events-none animate-float-slow"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
            boxShadow: '0 0 8px rgba(212, 175, 55, 0.7)',
          }}
        />
      ))}
    </div>
  );
};
