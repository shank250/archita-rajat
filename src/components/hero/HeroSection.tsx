import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaxSeal } from './WaxSeal';
import { useGuest } from '../../context/GuestContext';
import { useAudio } from '../../context/AudioContext';
import { triggerCelebrationFireworks } from '../../utils/confetti';
import { ChevronDown, Mail } from 'lucide-react';
import { activeTheme } from '../../config/theme';

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
      
      {/* 1. Auspicious Lord Ganesha Artwork - Centerpiece */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        {/* Crisp Ganesha Frame with Theme Accents */}
        <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 mb-2 p-4 sm:p-5 rounded-full bg-surface border border-theme-border shadow-card-subtle flex items-center justify-center transition-transform hover:scale-105">
          <img 
            src="/ganesha.svg" 
            alt="Lord Ganesha" 
            className="w-full h-full object-contain filter drop-shadow-sm" 
          />
        </div>

        {/* Sacred Sanskrit Greeting with Hairline Dividers */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-12 sm:w-20 bg-primary/25" />
          <p className="text-primary font-sans text-xs sm:text-sm tracking-[0.28em] font-bold uppercase">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <div className="h-[1px] w-12 sm:w-20 bg-primary/25" />
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
        <div className="px-5 py-2 rounded-full bg-surface border border-theme-border shadow-xs flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-xs sm:text-sm font-sans text-text-body font-medium">
            {isPersonalized ? (
              <>
                Warmly Welcoming <strong className="font-bold text-primary font-serif text-sm sm:text-base">{guestName}</strong>
              </>
            ) : (
              <>
                Warmly Welcoming <strong className="font-bold text-primary font-serif text-sm sm:text-base">Our Cherished Family &amp; Friends</strong>
              </>
            )}
          </span>
        </div>
      </motion.div>

      {/* 3. Realistic Luxury Post Mail Envelope Unboxing Experience */}
      <div className="relative w-full max-w-[380px] sm:max-w-[420px] h-[225px] sm:h-[245px] mx-auto mt-2 mb-2 perspective-1000">
        
        {/* Envelope Outer Shell */}
        <div 
          className="relative w-full h-full rounded-3xl shadow-[0_16px_40px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col justify-between p-5 sm:p-6"
          style={{
            backgroundColor: activeTheme.envelope.outer,
            borderColor: activeTheme.envelope.outerBorder,
            color: activeTheme.envelope.text,
            borderWidth: 1,
          }}
        >
          {/* Subtle Clean Inner Border */}
          <div 
            className="absolute inset-2.5 rounded-2xl pointer-events-none border border-white/20"
          />

          {/* Clean Subtle Postal Diagonal Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" preserveAspectRatio="none" viewBox="0 0 100 100">
            <line x1="0" y1="100" x2="50" y2="50" stroke="white" strokeWidth="0.6" />
            <line x1="100" y1="100" x2="50" y2="50" stroke="white" strokeWidth="0.6" />
          </svg>

          {/* Top Row: Postal Stamp & Airmail Label */}
          <div className="relative z-20 flex items-start justify-between w-full">
            <div className="text-left">
              <span className="text-[9px] font-sans uppercase tracking-[0.25em] font-bold block opacity-85">
                SPECIAL DELIVERY
              </span>
              <span className="text-[11px] font-serif font-semibold tracking-wide opacity-95">
                Wedding Invitation
              </span>
            </div>

            {/* Scalloped Postage Stamp */}
            <div 
              className="w-10 h-12 rounded-sm border border-dashed p-1 flex flex-col items-center justify-between shadow-xs"
              style={{
                backgroundColor: activeTheme.envelope.stampBg,
                borderColor: activeTheme.envelope.stitching,
                color: activeTheme.envelope.stampText,
              }}
            >
              <span className="text-[6.5px] font-sans font-bold tracking-wider">POST</span>
              <Mail className="w-4 h-4" />
              <span className="text-[6.5px] font-sans font-bold">2026</span>
            </div>
          </div>

          {/* Bottom Row: Recipient Address Styling */}
          <div className="relative z-20 text-left">
            <span className="text-[8px] font-sans uppercase tracking-widest font-semibold opacity-75">
              Delivered To:
            </span>
            <p className="font-serif text-sm sm:text-base font-bold truncate max-w-[260px]">
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
            {/* Front of Flap */}
            <div 
              className="w-full h-full shadow-md relative"
              style={{
                backgroundColor: activeTheme.envelope.flap,
                borderBottomColor: activeTheme.envelope.flapBorder,
                borderBottomWidth: 1,
              }}
            />

            {/* Back of Flap */}
            <div 
              className="absolute inset-0 bg-surface-subtle backface-hidden border border-theme-border"
              style={{ transform: 'rotateY(180deg)' }}
            />
          </motion.div>

          {/* LOCATION 1: Center Post Mail Wax Seal Stamp on digital envelope closure flap */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
            <WaxSeal
              onClick={handleSealClick}
              isOpening={isAnimating || isOpen}
            />
          </div>
        </div>
      </div>

      {/* 4. Clean Scroll Down Indicator */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-1 cursor-pointer pt-4 pb-1"
            onClick={() => {
              const el = document.getElementById('formal-invitation');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-xs font-sans font-semibold text-primary tracking-wider uppercase">
              Explore Invitation
            </span>
            <ChevronDown className="w-5 h-5 text-primary animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
