import React from 'react';
import { motion } from 'framer-motion';

export const CoupleSwing: React.FC = () => {
  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[360px] h-[220px] sm:h-[250px] mx-auto flex items-center justify-center overflow-visible">
      {/* Top Floral Garland / Vine Beam */}
      <div className="absolute top-2 inset-x-4 h-3 rounded-full bg-gradient-to-r from-transparent via-amber-800/60 to-transparent flex items-center justify-center">
        {/* Decorative Golden Floral Leaves */}
        <div className="flex gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="inline-block text-gold-antique text-xs opacity-75 transform hover:scale-125 transition-transform"
            >
              🌸
            </span>
          ))}
        </div>
      </div>

      {/* Swinging Vine & Platter Rig */}
      <motion.div
        className="relative origin-top flex flex-col items-center"
        animate={{
          rotate: [-3.5, 3.5, -3.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 4.8,
          ease: "easeInOut",
        }}
      >
        {/* Golden ropes / vines hanging down */}
        <div className="flex justify-between w-48 sm:w-56 h-28 sm:h-32 px-4 pointer-events-none">
          {/* Left Rope */}
          <div className="w-1 h-full bg-gradient-to-b from-amber-700 via-gold-antique to-amber-900 rounded-full shadow-sm flex flex-col justify-around items-center">
            <span className="text-[10px] text-emerald-400">🌿</span>
            <span className="text-[10px] text-gold-light">✨</span>
          </div>
          {/* Right Rope */}
          <div className="w-1 h-full bg-gradient-to-b from-amber-700 via-gold-antique to-amber-900 rounded-full shadow-sm flex flex-col justify-around items-center">
            <span className="text-[10px] text-gold-light">✨</span>
            <span className="text-[10px] text-emerald-400">🌿</span>
          </div>
        </div>

        {/* The Wooden/Floral Swing Plank */}
        <div className="w-56 sm:w-64 h-5 -mt-1 rounded-full bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 border-t border-gold-antique/60 shadow-lg relative flex items-center justify-center">
          {/* Flower bunch under the swing */}
          <div className="absolute -bottom-2 flex gap-1">
            <span className="text-xs">🌺</span>
            <span className="text-xs">🌼</span>
            <span className="text-xs">🌸</span>
            <span className="text-xs">🌺</span>
          </div>
        </div>

        {/* Couple Caricatures sitting together */}
        <div className="absolute top-6 flex items-end justify-center gap-1 z-10">
          {/* Groom (Rajat) caricature */}
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
          >
            {/* Groom Head */}
            <div className="relative w-14 h-14 rounded-full border-2 border-gold-antique/60 overflow-hidden shadow-md bg-parchment-cream">
              <img
                src="/images/rajat-childhood.jpg"
                alt="Groom avatar"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Traditional Kurta / Sherwani Body */}
            <div className="w-12 h-14 bg-gradient-to-b from-amber-900 to-espresso-light rounded-t-lg border-t-2 border-gold-antique shadow-md flex items-center justify-center">
              <span className="text-[10px] font-serif text-gold-light font-bold">R</span>
            </div>
          </motion.div>

          {/* Bride (Archita) caricature */}
          <motion.div
            className="flex flex-col items-center -ml-2"
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.1 }}
          >
            {/* Bride Head */}
            <div className="relative w-14 h-14 rounded-full border-2 border-crimson-wax overflow-hidden shadow-md bg-parchment-cream">
              <img
                src="/images/archita-childhood.jpg"
                alt="Bride avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Royal Lehenga / Dupatta Body */}
            <div className="w-12 h-14 bg-gradient-to-b from-crimson-wax to-crimson-dark rounded-t-lg border-t-2 border-gold-light shadow-md flex items-center justify-center">
              <span className="text-[10px] font-serif text-gold-light font-bold">A</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
