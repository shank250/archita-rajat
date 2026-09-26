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
      className={`relative p-6 sm:p-10 rounded-3xl bg-card-surface text-text-body border border-theme-border shadow-card-subtle overflow-hidden ${className}`}
    >
      {/* Handcrafted hairline inner border */}
      <div className="absolute inset-3 sm:inset-4 border border-theme-border/60 rounded-2xl pointer-events-none" />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
