import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaxSeal } from './WaxSeal';
import { useGuest } from '../../context/GuestContext';
import { useAudio } from '../../context/AudioContext';
import { triggerCelebrationFireworks } from '../../utils/confetti';
import { ChevronDown, Mail } from 'lucide-react';

interface HeroSectionProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isOpen, onOpen }) => {
  const { guestName, isPersonalized } = useGuest();
  const { playAudio } = useAudio();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSealClick = () => {
    if (isOpen || isAnimating) return;

    setIsAnimating(true);
    triggerCelebrationFireworks();
    playAudio();

    setTimeout(() => {
      onOpen();
      setIsAnimating(false);

      setTimeout(() => {
        const formalSection = document.getElementById('formal-invitation');
        if (formalSection) {
          formalSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 700);
    }, 450);
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center py-6 sm:py-8 px-4 text-center z-10 max-w-4xl mx-auto">
      
      {/* 1. Auspicious Lord Ganesha Artwork - Bigger, Majestic, Centerpiece */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        {/* Large, Crisp, Serene Ganesha Frame */}
        <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 mb-2 p-4 sm:p-5 rounded-full bg-white/95 border border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center justify-center transition-transform hover:scale-105">
          <img 
            src="/ganesha.svg" 
            alt="Lord Ganesha" 
            className="w-full h-full object-contain filter drop-shadow-sm" 
          />
        </div>

        {/* Sacred Sanskrit Greeting with Hairline Dividers */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-12 sm:w-20 bg-neutral-300" />
          <p className="text-neutral-600 font-sans text-xs sm:text-sm tracking-[0.28em] font-semibold uppercase">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <div className="h-[1px] w-12 sm:w-20 bg-neutral-300" />
        </div>
      </motion.div>

      {/* 2. Warm Welcoming Message */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="my-3 sm:my-4 flex flex-col items-center max-w-xl mx-auto"
      >
        {/* Warm Hospitality Welcoming Badge */}
        <div className="px-5 py-2 rounded-full bg-white/95 border border-neutral-200/90 shadow-xs flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#881337] animate-pulse" />
          <span className="text-xs sm:text-sm font-sans text-neutral-700 font-medium">
            {isPersonalized ? (
              <>
                Warmly Welcoming <strong className="font-bold text-neutral-950 font-serif text-sm sm:text-base">{guestName}</strong>
              </>
            ) : (
              <>
                Warmly Welcoming <strong className="font-bold text-neutral-950 font-serif text-sm sm:text-base">Our Cherished Family & Friends</strong>
              </>
            )}
          </span>
        </div>
        <p className="text-[11px] sm:text-xs font-sans text-neutral-400 font-medium mt-2 tracking-wide">
          Tap the wax seal below to unveil your wedding invitation
        </p>
      </motion.div>

      {/* 3. Realistic Luxury Post Mail Envelope Unboxing Experience */}
      <div className="relative w-full max-w-[380px] sm:max-w-[420px] h-[225px] sm:h-[245px] mx-auto mt-2 mb-2 perspective-1000">
        
        {/* Envelope Outer Shell: Solid Rich Wine Stationery */}
        <div className="relative w-full h-full bg-[#881337] rounded-3xl shadow-[0_16px_40px_rgba(136,19,55,0.25)] border border-[#70102E] overflow-hidden text-white flex flex-col justify-between p-5 sm:p-6">
          
          {/* Subtle Inner Stitching Border */}
          <div className="absolute inset-2.5 border border-white/20 rounded-2xl pointer-events-none" />

          {/* Postal Envelope Diagonal Fold Geometry (SVG Hairlines) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Bottom-left to center */}
            <line x1="0" y1="100" x2="50" y2="50" stroke="white" strokeWidth="0.75" />
            {/* Bottom-right to center */}
            <line x1="100" y1="100" x2="50" y2="50" stroke="white" strokeWidth="0.75" />
            {/* Bottom triangle background shading */}
            <polygon points="0,100 100,100 50,55" fill="rgba(0,0,0,0.06)" />
          </svg>

          {/* Top Row: Postal Stamp & Airmail Label */}
          <div className="relative z-20 flex items-start justify-between w-full">
            {/* Vintage Post Mail Mark */}
            <div className="text-left">
              <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-rose-200/90 font-bold block">
                SPECIAL DELIVERY
              </span>
              <span className="text-[11px] font-serif text-white/90 font-semibold tracking-wide">
                Wedding Invitation
              </span>
            </div>

            {/* Scalloped Postage Stamp */}
            <div className="w-10 h-12 rounded-sm border border-dashed border-rose-200/70 bg-[#9F1239] p-1 flex flex-col items-center justify-between shadow-sm">
              <span className="text-[6.5px] font-sans font-bold text-rose-200 tracking-wider">POST</span>
              <Mail className="w-4 h-4 text-rose-100" />
              <span className="text-[6.5px] font-sans font-bold text-rose-200">2026</span>
            </div>
          </div>

          {/* Bottom Row: Recipient Address Styling */}
          <div className="relative z-20 text-left">
            <span className="text-[8px] font-sans uppercase tracking-widest text-rose-200/70 font-semibold">
              Delivered To:
            </span>
            <p className="font-serif text-sm sm:text-base text-white font-bold truncate max-w-[260px]">
              {isPersonalized ? guestName : "Our Cherished Family & Friends"}
            </p>
          </div>

          {/* 3D Top Flap of Envelope */}
          <motion.div
            className="absolute top-0 inset-x-0 h-28 origin-top preserve-3d shadow-sm z-30 pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
            animate={{
              rotateX: isOpen ? -180 : 0,
              opacity: isOpen ? 0.15 : 1,
            }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Front of Flap: Solid Wine with Subtle Fold Crest */}
            <div className="w-full h-full bg-[#9F1239] border-b border-[#70102E] shadow-md relative">
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/30 text-xs">
                ✦
              </div>
            </div>

            {/* Back of Flap */}
            <div 
              className="absolute inset-0 bg-[#F5F5F7] backface-hidden border border-neutral-200"
              style={{ transform: 'rotateY(180deg)' }}
            />
          </motion.div>

          {/* Center Post Mail Wax Seal Stamp */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
            <WaxSeal
              onClick={handleSealClick}
              isOpening={isAnimating || isOpen}
            />
          </div>
        </div>

        {/* Sliding Invitation Card Preview (emerges smoothly when unboxed) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 25, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.2 }}
              className="mt-6 p-5 rounded-3xl bg-white text-neutral-900 border border-neutral-200 shadow-sm text-center"
            >
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#881337] font-bold">
                Invitation Unveiled
              </span>
              <p className="font-serif text-lg font-bold text-neutral-950 mt-0.5">
                Archita & Rajat's Wedding Celebrations
              </p>
              <p className="text-xs font-sans text-neutral-500 mt-1">
                Warmly invited by The Kayastha Family
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Clean Scroll Down Indicator */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-1 cursor-pointer pt-3 pb-1"
            onClick={() => {
              const el = document.getElementById('formal-invitation');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-xs font-sans font-semibold text-neutral-400 tracking-wider uppercase">
              Explore Invitation Below
            </span>
            <ChevronDown className="w-5 h-5 text-neutral-500 animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
