import React, { useMemo } from 'react';

export const BackgroundFX: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.1 + 4) % 96}%`,
      top: `${(i * 6.7 + 5) % 96}%`,
      size: `${(i % 3) * 1.5 + 2}px`,
      duration: `${5 + (i % 6) * 1.5}s`,
      delay: `${(i % 8) * 0.6}s`,
      opacity: 0.2 + (i % 4) * 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Center Luxury Warm Amber & Gold Halo */}
      <div 
        className="absolute -top-48 left-1/2 -translate-x-1/2 w-[850px] h-[600px] rounded-full blur-[160px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, #B8860B 35%, #6B1D24 70%, transparent 90%)',
        }}
      />

      {/* Subtle Mid-page Ambient Wine Warmth */}
      <div 
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #85222B 0%, #4A1217 60%, transparent 80%)',
        }}
      />

      <div 
        className="absolute top-2/3 -left-32 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
        }}
      />

      {/* Floating Golden Stardust Particles */}
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
            boxShadow: '0 0 10px rgba(229, 195, 120, 0.9)',
          }}
        />
      ))}
    </div>
  );
};
