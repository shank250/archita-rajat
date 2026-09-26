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
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="relative group cursor-pointer focus:outline-none select-none"
    >
      {/* Modern Minimalist Luxury Wax Seal */}
      <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-secondary p-1.5 shadow-[0_8px_24px_rgba(196,104,130,0.38)] flex items-center justify-center border-2 border-secondary-hover transition-all group-hover:shadow-[0_10px_28px_rgba(196,104,130,0.5)]">
        
        {/* Debossed Stamped Medallion */}
        <div className="w-full h-full rounded-full bg-secondary-hover border border-white/20 flex flex-col items-center justify-center relative overflow-hidden shadow-inner p-1">
          
          {/* Concentric Subtle Hairline Ring */}
          <div className="absolute inset-1.5 rounded-full border border-white/25 pointer-events-none" />

          {/* Clean Couple Monogram A & R */}
          <span className="font-serif text-base sm:text-lg font-bold text-white tracking-widest drop-shadow-sm leading-tight select-none">
            A &amp; R
          </span>

          {/* Stamped Seal Text */}
          <span className="text-[7.5px] sm:text-[8px] font-sans font-bold text-white/90 tracking-[0.25em] uppercase mt-0.5 drop-shadow-xs">
            OPEN
          </span>
        </div>
      </div>

      {/* Floating Prompt Tag */}
      {!isOpening && (
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-surface border border-theme-border text-xs font-sans font-bold text-primary shadow-md flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          <span>Tap to Unveil</span>
        </motion.div>
      )}
    </motion.button>
  );
};
