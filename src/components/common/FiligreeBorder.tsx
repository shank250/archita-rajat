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
      className={`relative p-5 sm:p-8 rounded-2xl shadow-parchment ${
        isParchment ? 'parchment-texture text-charcoal-bronze' : 'bg-espresso-surface text-champagne'
      } ${className}`}
    >
      {/* Outer border */}
      <div className="absolute inset-2 sm:inset-3 border border-gold-antique/40 rounded-xl pointer-events-none" />
      
      {/* Inner thin border */}
      <div className="absolute inset-3 sm:inset-4 border border-gold-antique/20 rounded-lg pointer-events-none" />

      {/* Four ornate corner flourishes */}
      {/* Top Left */}
      <svg
        className="absolute top-2 left-2 sm:top-3 sm:left-3 w-6 h-6 text-gold-antique pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 14 V2 H14" />
        <circle cx="5" cy="5" r="1.5" fill="currentColor" />
        <path d="M2 8 C6 8 8 6 8 2" />
      </svg>

      {/* Top Right */}
      <svg
        className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 text-gold-antique pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 14 V2 H10" />
        <circle cx="19" cy="5" r="1.5" fill="currentColor" />
        <path d="M22 8 C18 8 16 6 16 2" />
      </svg>

      {/* Bottom Left */}
      <svg
        className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-6 h-6 text-gold-antique pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 10 V22 H14" />
        <circle cx="5" cy="19" r="1.5" fill="currentColor" />
        <path d="M2 16 C6 16 8 18 8 22" />
      </svg>

      {/* Bottom Right */}
      <svg
        className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-6 h-6 text-gold-antique pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 10 V22 H10" />
        <circle cx="19" cy="19" r="1.5" fill="currentColor" />
        <path d="M22 16 C18 16 16 18 16 22" />
      </svg>

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
