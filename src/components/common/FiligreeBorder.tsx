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
      className={`relative p-6 sm:p-10 rounded-3xl bg-white text-[#202124] border border-[#EBE6DC] shadow-google-card ${className}`}
    >
      {/* Clean hairline inner border */}
      <div className="absolute inset-3 sm:inset-4 border border-[#F0EBE1] rounded-2xl pointer-events-none" />

      {/* Cute Colorful Corner Dots (Google celebratory theme) */}
      <span className="absolute top-3 left-3 sm:top-4 sm:left-4 w-2 h-2 rounded-full bg-[#EA4335] pointer-events-none" />
      <span className="absolute top-3 right-3 sm:top-4 sm:right-4 w-2 h-2 rounded-full bg-[#FBBC05] pointer-events-none" />
      <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-2 h-2 rounded-full bg-[#34A853] pointer-events-none" />
      <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-2 h-2 rounded-full bg-[#4285F4] pointer-events-none" />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
