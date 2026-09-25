import React from 'react';
import { motion } from 'framer-motion';

export const CoupleShowcase: React.FC = () => {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] mx-auto py-2 flex flex-col items-center justify-center">
      {/* Decorative Top Golden Arch Corona */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col items-center"
      >
        {/* Subtle Ambient Backlight */}
        <div className="absolute inset-0 bg-gold-antique/20 rounded-full blur-2xl transform scale-110 pointer-events-none" />

        {/* The Regal Arch Frame */}
        <motion.div
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
          className="relative p-2 rounded-t-[120px] rounded-b-3xl bg-gradient-to-b from-amber-400/40 via-amber-700/20 to-transparent border-2 border-gold-antique/60 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          {/* Inner hairline border */}
          <div className="p-1 rounded-t-[115px] rounded-b-2xl border border-gold-antique/30">
            {/* The Couple Image Container */}
            <div className="relative w-64 sm:w-72 h-80 sm:h-88 rounded-t-[110px] rounded-b-2xl overflow-hidden bg-espresso-surface shadow-inner group">
              {/* Actual Couple Portrait */}
              <img
                src="/images/couple-nightout.jpg"
                alt="Rajat and Archita"
                className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.04] transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Cinematic Vignette & Warm Golden Lighting Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 via-transparent to-gold-antique/20 pointer-events-none" />

              {/* Romantic Bottom Monogram Plaque */}
              <div className="absolute bottom-3 inset-x-3 py-2 px-3 rounded-xl bg-espresso/80 border border-gold-antique/40 backdrop-blur-md text-center shadow-lg">
                <p className="font-decorative text-gold-gradient text-sm sm:text-base font-bold tracking-wider">
                  Rajat & Archita
                </p>
                <p className="text-[10px] font-sans text-gold-light/80 tracking-widest uppercase mt-0.5">
                  The Beginning of Forever
                </p>
              </div>
            </div>
          </div>

          {/* Golden Corner Accents & Lotus Motif at Top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-espresso border border-gold-antique flex items-center justify-center shadow-md">
            <span className="text-gold-antique text-xs">✦</span>
          </div>

          {/* Left Floral Vine Accent (SVG, delicate and elegant) */}
          <svg
            className="absolute -left-3 top-20 w-6 h-12 text-gold-antique/70 pointer-events-none"
            viewBox="0 0 24 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M18 2 C10 12 6 24 16 36 C8 40 4 46 2 48" />
            <circle cx="18" cy="12" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="14" cy="28" r="1.5" fill="currentColor" opacity="0.6" />
          </svg>

          {/* Right Floral Vine Accent */}
          <svg
            className="absolute -right-3 top-20 w-6 h-12 text-gold-antique/70 pointer-events-none transform -scale-x-100"
            viewBox="0 0 24 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M18 2 C10 12 6 24 16 36 C8 40 4 46 2 48" />
            <circle cx="18" cy="12" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="14" cy="28" r="1.5" fill="currentColor" opacity="0.6" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
