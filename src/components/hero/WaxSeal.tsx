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
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.94 }}
      className="relative group cursor-pointer focus:outline-none select-none"
    >
      {/* Outer Molten Wax Boundary with realistic bevel and shadow */}
      <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-gradient-to-br from-[#8C1F28] via-[#63141B] to-[#3B0A0E] p-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.25)] flex items-center justify-center border border-red-950/60">
        
        {/* Organic molten wax contours around rim */}
        <span className="absolute -top-1 left-4 w-5 h-3.5 bg-[#751921] rounded-full opacity-90 blur-[0.3px]" />
        <span className="absolute -bottom-1.5 right-5 w-6 h-4 bg-[#540F15] rounded-full opacity-95 blur-[0.3px]" />
        <span className="absolute top-1/2 -left-2 w-4 h-6 bg-[#63141B] rounded-full opacity-80 blur-[0.3px]" />
        <span className="absolute top-4 -right-1.5 w-3.5 h-5 bg-[#751921] rounded-full opacity-85 blur-[0.3px]" />

        {/* Debossed Stamped Medallion */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#450C11] via-[#5C1118] to-[#36080C] border-2 border-amber-950/70 shadow-[inset_0_4px_10px_rgba(0,0,0,0.9),0_1px_2px_rgba(255,255,255,0.15)] flex flex-col items-center justify-center p-2 relative overflow-hidden">
          
          {/* Subtle gold metallic shimmer across relief */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold-antique/20 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity" />

          {/* Stamped Royal Monogram */}
          <span className="font-decorative text-gold-light text-lg sm:text-xl font-bold tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            R & A
          </span>

          {/* Perimeter Hashtag Stamp */}
          <span className="text-[7.5px] sm:text-[8px] font-sans font-bold text-amber-200/90 tracking-wider text-center uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] mt-0.5">
            {hashtag}
          </span>
        </div>

        {/* Pulsing golden halo prompting guest interaction */}
        {!isOpening && (
          <span className="absolute -inset-1 rounded-full border border-gold-antique/50 animate-ping pointer-events-none opacity-40" />
        )}
      </div>

      {/* Floating Prompt Tag */}
      {!isOpening && (
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-espresso-surface/95 border border-gold-antique/50 text-[11px] font-serif text-gold-light shadow-xl backdrop-blur-md flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-antique animate-pulse" />
          <span>Tap to Unveil Invite</span>
        </motion.div>
      )}
    </motion.button>
  );
};
