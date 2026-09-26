import React from 'react';

export const BackgroundFX: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle modern geometric dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(var(--color-primary) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Ambient radial glow at top center */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, var(--color-accent-soft) 0%, transparent 70%)',
        }}
      />

      {/* Gentle glow at bottom right */}
      <div
        className="absolute -bottom-24 right-1/4 w-[600px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, var(--color-accent-soft) 0%, transparent 65%)',
        }}
      />

    </div>
  );
};
