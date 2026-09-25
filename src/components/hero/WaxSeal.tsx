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
      aria-label="Break wax seal and open invitation"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="relative group cursor-pointer focus:outline-none"
    >
      {/* Outer Wax Irregular Edge (Organic molten wax appearance) */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-crimson-gradient p-1.5 shadow-wax-seal flex items-center justify-center border border-red-950/40">
        {/* Molten wax organic drips / blobs */}
        <span className="absolute -top-1 left-3 w-4 h-3 bg-crimson-dark rounded-full opacity-80" />
        <span className="absolute -bottom-1.5 right-4 w-5 h-4 bg-crimson-wax rounded-full opacity-90" />
        <span className="absolute top-1/2 -left-2 w-3 h-5 bg-crimson-dark rounded-full opacity-70" />
        <span className="absolute top-3 -right-1 w-3 h-4 bg-crimson-wax rounded-full opacity-85" />

        {/* Inner Stamped Depression */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-crimson-dark via-crimson-wax to-crimson-dark border-2 border-amber-900/50 flex flex-col items-center justify-center p-1 shadow-inner relative overflow-hidden">
          {/* Subtle gold metallic sheen inside stamp */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold-antique/15 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity" />

          {/* Stamped Monogram */}
          <span className="font-decorative text-gold-light text-base sm:text-lg font-bold tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            R & A
          </span>

          {/* Stamped Hashtag Ring */}
          <span className="text-[7.5px] sm:text-[8.5px] font-sans font-semibold text-gold-light/90 tracking-tight text-center uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] mt-0.5">
            {hashtag}
          </span>
        </div>

        {/* Pulsing golden halo prompting click */}
        {!isOpening && (
          <span className="absolute inset-0 rounded-full border-2 border-gold-antique/60 animate-ping pointer-events-none opacity-40" />
        )}
      </div>

      {/* Tap to open badge */}
      {!isOpening && (
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-0.5 rounded-full bg-espresso-surface/90 border border-gold-antique/40 text-[11px] font-serif text-gold-light shadow-md"
        >
          Tap to Open
        </motion.div>
      )}
    </motion.button>
  );
};
