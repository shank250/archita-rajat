import React from 'react';

interface FloralDividerProps {
  className?: string;
  variant?: 'blue' | 'rose';
}

export const FloralDivider: React.FC<FloralDividerProps> = ({
  className = '',
  variant = 'blue',
}) => {
  const imgSrc = variant === 'rose'
    ? '/designs/floral-stem-rose.svg'
    : '/designs/Filipino Traditional Wedding Website PH in Beige Brown Modern Filipiniana Style(2).svg';

  return (
    <div className={`relative flex items-center justify-center my-8 max-w-md mx-auto px-6 pointer-events-none select-none z-0 ${className}`}>
      {/* Left Hairline Rule */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-brand-blue/30 to-brand-blue/60" />

      {/* Center Flower Stem Flourish */}
      <div className="mx-4 flex items-center gap-2">
        <span className="text-secondary text-xs opacity-75">✦</span>
        <div className="w-8 h-12 flex items-center justify-center rotate-90 transform">
          <img
            src={imgSrc}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain filter drop-shadow-xs"
            style={{ opacity: 0.85 }}
          />
        </div>
        <span className="text-secondary text-xs opacity-75">✦</span>
      </div>

      {/* Right Hairline Rule */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-brand-blue/30 to-brand-blue/60" />
    </div>
  );
};
