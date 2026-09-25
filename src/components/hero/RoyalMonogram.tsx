import React from 'react';
import { motion } from 'framer-motion';

export const RoyalMonogram: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center justify-center my-6"
    >
      {/* Ambient Radial Golden Aura */}
      <div className="absolute w-44 h-44 rounded-full bg-gradient-to-b from-amber-400/15 via-gold-antique/5 to-transparent blur-2xl pointer-events-none" />

      {/* Outer Fine Concentric Rings */}
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-gold-antique/30 flex items-center justify-center p-2 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
        
        {/* Inner dotted hairline ring */}
        <div className="w-full h-full rounded-full border border-dashed border-gold-antique/40 flex items-center justify-center p-2">
          
          {/* Inner solid thin ring */}
          <div className="w-full h-full rounded-full border border-gold-antique/50 bg-gradient-to-b from-espresso-surface/80 to-espresso-dark/95 backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
            
            {/* Subtle light sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

            {/* Sacred Lotus / Crown Apex Motif */}
            <div className="text-gold-antique/80 text-[10px] tracking-widest font-serif mb-0.5">
              ✦ ॐ ✦
            </div>

            {/* Intertwined Initials */}
            <div className="flex items-center justify-center gap-1">
              <span className="font-decorative text-2xl sm:text-3xl text-gold-gradient font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                R
              </span>
              <span className="text-xs text-gold-antique font-serif italic -mt-1 opacity-80">
                &
              </span>
              <span className="font-decorative text-2xl sm:text-3xl text-gold-gradient font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                A
              </span>
            </div>

            {/* Micro subtitle */}
            <div className="text-[7.5px] font-sans uppercase tracking-[0.25em] text-gold-light/70 font-semibold mt-1">
              FOREVER
            </div>
          </div>
        </div>

        {/* 4 Cardinal Diamond Accents */}
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[9px] text-gold-antique">◆</span>
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[9px] text-gold-antique">◆</span>
        <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 text-[9px] text-gold-antique">◆</span>
        <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 text-[9px] text-gold-antique">◆</span>
      </div>
    </motion.div>
  );
};
