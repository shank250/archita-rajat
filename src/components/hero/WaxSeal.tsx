import React from 'react';
import { motion } from 'framer-motion';

interface WaxSealProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hashtag?: string;
  isOpening?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  onClick,
  hashtag = "#RajatWedsArchita",
  isOpening = false,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Open wedding invitation"
      whileHover={{ scale: 1.08, rotate: [-1, 2, -1, 0] }}
      whileTap={{ scale: 0.92 }}
      className="relative group cursor-pointer focus:outline-none select-none"
    >
      {/* Solid Festive Vermilion Circular Seal */}
      <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#C5221F] p-1.5 shadow-google-elevated flex items-center justify-center border-2 border-[#A51A18] transition-transform">
        
        {/* Subtle decorative scalloped outline */}
        <div className="w-full h-full rounded-full bg-[#A51A18] border border-[#8C1413] flex flex-col items-center justify-center p-1 relative overflow-hidden">
          
          {/* Stamped Monogram */}
          <span className="font-serif text-white text-lg sm:text-xl font-bold tracking-wider">
            R & A
          </span>

          {/* Hashtag Ring */}
          <span className="text-[7.5px] font-sans font-bold text-amber-200 tracking-wider text-center uppercase mt-0.5">
            {hashtag}
          </span>
        </div>

        {/* Pulsing ring */}
        {!isOpening && (
          <span className="absolute -inset-1 rounded-full border-2 border-red-400 animate-ping pointer-events-none opacity-40" />
        )}
      </div>

      {/* Cute Floating Prompt Tag */}
      {!isOpening && (
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-white border border-[#E8E2D5] text-xs font-sans font-semibold text-[#8C2127] shadow-google-card flex items-center gap-1.5"
        >
          <span>Tap to Unveil</span>
          <span>💌</span>
        </motion.div>
      )}
    </motion.button>
  );
};
