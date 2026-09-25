import React from 'react';
import { motion } from 'framer-motion';

export const RoyalMonogram: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 15, stiffness: 180, delay: 0.1 }}
      className="relative flex flex-col items-center justify-center my-5"
    >
      {/* Outer Clean Circular Badge */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white border-2 border-[#E8E2D5] shadow-google-card flex items-center justify-center p-1.5 transition-transform hover:scale-105">
        
        {/* Inner Solid Tonal Circle */}
        <div className="w-full h-full rounded-full bg-[#FFF9F0] border border-[#F3E8D2] flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Cute Top Floral Shloka Accent */}
          <div className="text-[#D97706] text-[10px] font-semibold tracking-widest mb-0.5">
            ✨ ॐ ✨
          </div>

          {/* Clean Friendly Intertwined Initials */}
          <div className="flex items-center justify-center gap-1 font-serif text-2xl sm:text-3xl font-bold text-[#8C2127]">
            <span>R</span>
            <span className="text-xs text-[#D97706] font-sans font-normal">&</span>
            <span>A</span>
          </div>

          {/* Micro subtitle */}
          <div className="text-[8px] font-sans uppercase tracking-[0.25em] text-[#A16207] font-bold mt-0.5">
            FOREVER
          </div>
        </div>

        {/* Cute Festive Dots at 4 Cardinal Points */}
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#EA4335]" />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F9AB00]" />
        <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#34A853]" />
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#4285F4]" />
      </div>
    </motion.div>
  );
};
