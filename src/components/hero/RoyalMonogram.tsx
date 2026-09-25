import React from 'react';
import { motion } from 'framer-motion';

export const RoyalMonogram: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center justify-center my-6"
    >
      {/* Outer Clean Circular Badge */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white border border-neutral-200/90 shadow-[0_2px_16px_rgba(0,0,0,0.04)] flex items-center justify-center p-2 transition-transform hover:scale-105">
        
        {/* Inner Clean Ring */}
        <div className="w-full h-full rounded-full border border-neutral-100 bg-[#FAFAFA] flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Subtle Apex Symbol */}
          <div className="text-neutral-400 text-[10px] tracking-widest font-serif mb-0.5">
            ✦
          </div>

          {/* Clean Modern Intertwined Initials */}
          <div className="flex items-center justify-center gap-1 font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            <span>R</span>
            <span className="text-xs text-[#991B1B] font-sans font-normal">&</span>
            <span>A</span>
          </div>

          {/* Clean Subtitle */}
          <div className="text-[7.5px] font-sans uppercase tracking-[0.25em] text-neutral-400 font-bold mt-0.5">
            FOREVER
          </div>
        </div>
      </div>
    </motion.div>
  );
};
