import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';

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
      aria-label="Open post mail invitation"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="relative group cursor-pointer focus:outline-none select-none"
    >
      {/* 3D Wax Seal with organic sculpted stamp edge */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#881337] p-1 shadow-[0_6px_20px_rgba(136,19,55,0.4)] flex items-center justify-center border-2 border-[#70102E] transition-all group-hover:shadow-[0_8px_25px_rgba(136,19,55,0.5)]">
        
        {/* Debossed Stamped Medallion */}
        <div className="w-full h-full rounded-full bg-[#70102E] border border-[#500720] flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
          
          {/* Subtle Stamped Mail Icon */}
          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-rose-100/90 drop-shadow-sm transition-transform group-hover:scale-110" />

          {/* Stamped Seal Text */}
          <span className="text-[7.5px] sm:text-[8px] font-sans font-bold text-rose-200/90 tracking-widest uppercase mt-0.5">
            OPEN
          </span>
        </div>
      </div>

      {/* Floating Prompt Tag */}
      {!isOpening && (
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-white border border-neutral-200 text-xs font-sans font-semibold text-neutral-800 shadow-md flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3 text-[#881337]" />
          <span>Tap to Unveil</span>
        </motion.div>
      )}
    </motion.button>
  );
};
