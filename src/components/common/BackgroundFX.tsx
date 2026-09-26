import React from 'react';

export const BackgroundFX: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Subtle warm ambient radial glows for chic pastel depth */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(251, 221, 224, 0.9) 0%, rgba(252, 232, 233, 0.4) 60%, transparent 80%)',
        }}
      />
      <div
        className="absolute -bottom-36 right-0 w-[700px] h-[400px] rounded-full opacity-50"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(248, 180, 192, 0.45) 0%, rgba(252, 232, 233, 0.3) 65%, transparent 80%)',
        }}
      />

      {/* 2. Top-Left Floral Corner Cluster (Watermark opacity: 0.20) */}
      <div className="absolute -top-6 -left-6 sm:-top-12 sm:-left-12 md:-top-14 md:-left-14 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 pointer-events-none z-0">
        <img
          src="/designs/Filipino Traditional Wedding Website PH in Beige Brown Modern Filipiniana Style(1).svg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain filter drop-shadow-xs opacity-20 transform -rotate-12 transition-transform duration-1000"
          style={{ opacity: 0.35, filter: 'brightness(0.6)' }}
        />
      </div>

      {/* 3. Bottom-Right Floral Corner Cluster (Watermark opacity: 0.22) */}
      <div className="absolute -bottom-10 -right-8 sm:-bottom-16 sm:-right-14 md:-bottom-20 md:-right-16 w-52 h-52 sm:w-80 sm:h-80 md:w-96 md:h-96 pointer-events-none z-0">
        <img
          src="/designs/Filipino Traditional Wedding Website PH in Beige Brown Modern Filipiniana Style(3).svg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain filter drop-shadow-xs transform rotate-6 transition-transform duration-1000"
          style={{ opacity: 0.35, filter: 'brightness(0.6)' }}
        />
      </div>

      {/* 4. Left Flank Minimal Single-Flower Stem (Ambient floating element, opacity: 0.18) */}
      <div className="absolute top-1/3 -left-6 sm:-left-8 md:-left-10 w-24 sm:w-36 md:w-44 h-auto pointer-events-none z-0 hidden sm:block">
        <img
          src="/designs/Filipino Traditional Wedding Website PH in Beige Brown Modern Filipiniana Style(2).svg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-contain transform -rotate-12"
          style={{ opacity: 0.35, filter: 'brightness(0.6)' }}
        />
      </div>

      {/* 5. Right Flank Ambient Floating Stem (Soft Rose Variant, opacity: 0.18) */}
      <div className="absolute top-2/3 -right-6 sm:-right-8 md:-right-10 w-24 sm:w-36 md:w-44 h-auto pointer-events-none z-0 hidden sm:block">
        <img
          src="/designs/floral-stem-rose.svg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-contain transform rotate-12 scale-x-[-1]"
          style={{ opacity: 0.18 }}
        />
      </div>

      {/* 6. Subtle Micro Geometric Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(var(--color-brand-blue) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
