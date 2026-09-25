import React from 'react';

interface FiligreeBorderProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gold' | 'parchment';
}

export const FiligreeBorder: React.FC<FiligreeBorderProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`relative p-6 sm:p-10 rounded-3xl bg-white text-slate-900 border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${className}`}
    >
      {/* Clean hairline inner border */}
      <div className="absolute inset-3 sm:inset-4 border border-neutral-100 rounded-2xl pointer-events-none" />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
