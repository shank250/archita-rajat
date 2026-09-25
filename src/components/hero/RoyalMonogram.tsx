import React from 'react';
import { motion } from 'framer-motion';

export const RoyalMonogram: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center justify-center my-6"
    >
      {/* Subtle Glow */}
      <div className="absolute w-40 h-40 rounded-full bg-gold-antique/10 blur-2xl pointer-events-none" />

      {/* Outer Geometric Frame */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-gold-antique/30 flex items-center justify-center p-1.5 shadow-[0_0_25px_rgba(212,175,55,0.12)]">
        
        {/* Inner Solid Card Body */}
        <div className="w-full h-full rounded-full border border-gold-antique/50 bg-[#121218] flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
          
          {/* Sacred Apex Motif */}
          <div className="text-gold-antique text-[9px] tracking-[0.3em] font-serif mb-0.5 opacity-90">
            ✦ ॐ ✦
          </div>

          {/* Intertwined Modern Serif Initials */}
          <div className="flex items-center justify-center gap-1.5 my-0.5">
            <span className="font-decorative text-2xl sm:text-3xl text-gold-gradient font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              R
            </span>
            <span className="text-xs text-gold-antique font-serif italic -mt-1 opacity-80">
              &
            </span>
            <span className="font-decorative text-2xl sm:text-3xl text-gold-gradient font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              A
            </span>
          </div>

          {/* Clean Subtitle */}
          <div className="text-[7px] font-sans uppercase tracking-[0.3em] text-champagne-muted font-semibold">
            FOREVER
          </div>
        </div>

        {/* Cardinal Diamond Markers */}
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[8px] text-gold-antique">◆</span>
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[8px] text-gold-antique">◆</span>
        <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 text-[8px] text-gold-antique">◆</span>
        <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 text-[8px] text-gold-antique">◆</span>
      </div>
    </motion.div>
  );
};
