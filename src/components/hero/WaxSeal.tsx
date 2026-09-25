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
      aria-label="Unveil royal invitation"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="relative group cursor-pointer focus:outline-none select-none"
    >
      {/* Outer Molten Solid Carmine Wax Ring */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#9E1B26] via-[#7D121C] to-[#4F0A11] p-1 shadow-[0_12px_28px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)] flex items-center justify-center border border-red-950/60">
        
        {/* Subtle Organic Wax Contours */}
        <span className="absolute -top-1 left-4 w-4 h-3 bg-[#8C1620] rounded-full opacity-90" />
        <span className="absolute -bottom-1 right-4 w-5 h-3.5 bg-[#660C14] rounded-full opacity-90" />

        {/* Debossed Stamped Medallion */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#590C13] via-[#75111B] to-[#43080E] border border-amber-950/80 shadow-[inset_0_3px_8px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center p-2 relative overflow-hidden">
          
          {/* Subtle gold metallic sheen inside relief */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold-antique/15 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity" />

          {/* Stamped Monogram */}
          <span className="font-decorative text-gold-light text-base sm:text-lg font-bold tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            R & A
          </span>

          {/* Perimeter Hashtag Stamp */}
          <span className="text-[7.5px] font-sans font-bold text-amber-200/90 tracking-wider text-center uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] mt-0.5">
            {hashtag}
          </span>
        </div>

        {/* Pulsing subtle halo */}
        {!isOpening && (
          <span className="absolute -inset-1 rounded-full border border-gold-antique/40 animate-ping pointer-events-none opacity-30" />
        )}
      </div>

      {/* Modern 21st-century Floating Prompt Tag */}
      {!isOpening && (
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-black/80 border border-gold-antique/40 text-[10.5px] font-sans font-medium text-gold-light shadow-xl backdrop-blur-md flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-antique animate-pulse" />
          <span>Tap to Unveil Invite</span>
        </motion.div>
      )}
    </motion.button>
  );
};
