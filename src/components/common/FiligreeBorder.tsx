import React from 'react';

interface FiligreeBorderProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gold' | 'parchment';
}

export const FiligreeBorder: React.FC<FiligreeBorderProps> = ({
  children,
  className = '',
  variant = 'parchment',
}) => {
  const isParchment = variant === 'parchment';

  return (
    <div
      className={`relative p-6 sm:p-10 rounded-2xl sm:rounded-3xl ${
        isParchment 
          ? 'bg-white text-charcoal-bronze shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-neutral-200/80' 
          : 'bg-obsidian-surface text-champagne shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10'
      } ${className}`}
    >
      {/* Outer hairline border */}
      <div className="absolute inset-2.5 sm:inset-3.5 border border-gold-antique/35 rounded-xl sm:rounded-2xl pointer-events-none" />
      
      {/* Inner subtle border */}
      <div className="absolute inset-4 sm:inset-5 border border-gold-antique/20 rounded-lg sm:rounded-xl pointer-events-none" />

      {/* Modern 21st Century Geometric Corner Notches */}
      {/* Top Left */}
      <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 w-3 h-3 border-t-2 border-l-2 border-gold-antique pointer-events-none" />
      {/* Top Right */}
      <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 w-3 h-3 border-t-2 border-r-2 border-gold-antique pointer-events-none" />
      {/* Bottom Left */}
      <div className="absolute bottom-2.5 left-2.5 sm:bottom-3.5 sm:left-3.5 w-3 h-3 border-b-2 border-l-2 border-gold-antique pointer-events-none" />
      {/* Bottom Right */}
      <div className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 w-3 h-3 border-b-2 border-r-2 border-gold-antique pointer-events-none" />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
