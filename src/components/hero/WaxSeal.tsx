import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface WaxSealProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isOpening?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  onClick,
  isOpening = false,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Open wedding invitation"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="relative group cursor-pointer focus:outline-none select-none"
    >
      {/* 
        Modern Luxury Wax Seal in Vibrant Berry Magenta (#D81B60)
        Clean embossed royal couple monogram "A & R" with delicate fine jewelry bezel
      */}
      <div 
        className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1.5 shadow-[0_10px_28px_rgba(216,27,96,0.42)] flex items-center justify-center border-2 border-[#B7154F] transition-all group-hover:shadow-[0_14px_34px_rgba(216,27,96,0.58)]"
        style={{ backgroundColor: '#D81B60' }}
      >
        {/* Organic seal rim highlight */}
        <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />

        {/* Debossed Stamped Medallion Container */}
        <div 
          className="w-full h-full rounded-full border border-white/25 flex flex-col items-center justify-center relative overflow-hidden shadow-inner p-1"
          style={{ backgroundColor: '#B7154F' }}
        >
          {/* Concentric Subtle Hairline Ring */}
          <div className="absolute inset-1.5 rounded-full border border-white/20 pointer-events-none" />

          {/* Clean Embossed Monogram "A & R" */}
          <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-widest drop-shadow-sm select-none leading-none mt-0.5">
            A &amp; R
          </span>

          {/* Stamped Seal Text */}
          <span className="text-[8px] sm:text-[8.5px] font-sans font-bold text-white/90 tracking-[0.25em] uppercase mt-1 drop-shadow-xs">
            OPEN
          </span>
        </div>
      </div>

      {/* Floating Prompt Tag with Hand-Drawn Pill Border */}
      {!isOpening && (
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 bg-card-surface hand-drawn-pill border-brand-blue/40 text-xs font-sans font-bold text-brand-blue shadow-md flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-magenta" />
          <span className="tracking-wide">Tap to Unveil</span>
        </motion.div>
      )}
    </motion.button>
  );
};
