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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group cursor-pointer focus:outline-none select-none"
    >
      {/* Solid Rich Wine Circular Seal */}
      <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#881337] p-1.5 shadow-[0_8px_20px_rgba(136,19,55,0.35)] flex items-center justify-center border border-[#70102E] transition-transform">
        
        {/* Debossed Stamped Medallion */}
        <div className="w-full h-full rounded-full bg-[#70102E] border border-[#500720] flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-inner">
          
          {/* Stamped Monogram */}
          <span className="font-serif text-white text-lg sm:text-xl font-bold tracking-wider">
            R & A
          </span>

          {/* Hashtag Ring */}
          <span className="text-[7.5px] font-sans font-bold text-rose-200 tracking-wider text-center uppercase mt-0.5">
            {hashtag}
          </span>
        </div>
      </div>

      {/* Clean Floating Prompt Tag */}
      {!isOpening && (
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-sans font-semibold text-neutral-800 shadow-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#881337]" />
          <span>Tap to Open</span>
        </div>
      )}
    </motion.button>
  );
};
