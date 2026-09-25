import React, { useMemo } from 'react';

export const BackgroundFX: React.FC = () => {
  // Generate stable random particle positions
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.7 + 7) % 96}%`,
      top: `${(i * 7.3 + 12) % 96}%`,
      size: `${(i % 3) * 1.5 + 2}px`,
      duration: `${4 + (i % 5) * 1.8}s`,
      delay: `${(i % 7) * 0.7}s`,
      opacity: 0.25 + (i % 4) * 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Radial ambient glow at the top center */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[550px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, #85222B 45%, transparent 75%)',
        }}
      />

      {/* Floating golden stardust particles */}
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
            boxShadow: '0 0 8px rgba(212, 175, 55, 0.8)',
          }}
        />
      ))}
    </div>
  );
};
