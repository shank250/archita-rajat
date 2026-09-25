import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CoupleSwing } from './CoupleSwing';
import { WaxSeal } from './WaxSeal';
import { useGuest } from '../../context/GuestContext';
import { useAudio } from '../../context/AudioContext';
import { triggerGoldSparkles } from '../../utils/confetti';
import { coupleData, eventData } from '../../data/weddingData';
import { Sparkles, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isOpen, onOpen }) => {
  const { guestName, isPersonalized } = useGuest();
  const { playAudio } = useAudio();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSealClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen || isAnimating) return;

    setIsAnimating(true);

    // Get origin coordinates of click for confetti
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    triggerGoldSparkles({ x, y });
    playAudio();

    // Trigger state change after brief burst
    setTimeout(() => {
      onOpen();
      setIsAnimating(false);
      
      // Smooth scroll to formal card after envelope unfolds
      setTimeout(() => {
        const formalSection = document.getElementById('formal-invitation');
        if (formalSection) {
          formalSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 700);
    }, 450);
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-between py-8 px-4 text-center z-10">
      {/* Top Sacred Shloka & Ganesha Motif */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]">
          <img src="/ganesha.svg" alt="Lord Ganesha" className="w-full h-full object-contain" />
        </div>
        <p className="text-gold-antique font-serif text-sm sm:text-base tracking-widest font-medium">
          ॥ ॐ श्री गणेशाय नमः ॥
        </p>
        <p className="text-[11px] sm:text-xs text-champagne-muted font-serif max-w-sm mt-1 px-4 italic leading-relaxed">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </p>
      </motion.div>

      {/* Guest Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="my-3 px-6 py-2 rounded-full bg-espresso-surface/80 border border-gold-antique/30 shadow-gold-glow backdrop-blur-md"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-light animate-spin" style={{ animationDuration: '6s' }} />
          <p className="font-serif text-xs sm:text-sm text-gold-light tracking-wide">
            {isPersonalized ? (
              <>
                Warmest Welcome, <span className="font-bold text-champagne">{guestName}</span>
              </>
            ) : (
              <>
                Welcome, <span className="font-bold text-champagne">Family & Friends</span>
              </>
            )}
          </p>
          <Sparkles className="w-3.5 h-3.5 text-gold-light animate-spin" style={{ animationDuration: '6s' }} />
        </div>
      </motion.div>

      {/* Couple Swing Animation */}
      <div className="my-2 w-full">
        <CoupleSwing />
      </div>

      {/* Envelope Presentation */}
      <div className="relative w-full max-w-[360px] sm:max-w-[420px] mx-auto mt-2 mb-6 perspective-1000">
        <div className="relative bg-gradient-to-b from-[#7B1E26] to-[#450F14] rounded-xl p-6 sm:p-8 shadow-2xl border border-gold-antique/30 overflow-hidden">
          {/* Subtle gold foil border inside envelope */}
          <div className="absolute inset-2 border border-gold-antique/25 rounded-lg pointer-events-none" />

          {/* Envelope Flap 3D Simulation */}
          <motion.div
            className="absolute top-0 inset-x-0 h-28 origin-top bg-gradient-to-b from-[#8C242C] to-[#5C141B] border-b border-gold-antique/30 shadow-md preserve-3d"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
            animate={{
              rotateX: isOpen ? -180 : 0,
              opacity: isOpen ? 0.3 : 1,
            }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Invitation Teaser Front Content */}
          <div className="relative z-10 pt-4 pb-2 flex flex-col items-center">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-gold-light/80 mb-1">
              Royal Invitation
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-bold tracking-wide">
              {coupleData.groom.firstName} & {coupleData.bride.firstName}
            </h1>
            <p className="text-xs font-serif text-champagne/90 mt-1">
              {eventData.displayDate}
            </p>

            {/* Wax Seal CTA */}
            <div className="mt-6 mb-2">
              <WaxSeal
                onClick={handleSealClick}
                hashtag={coupleData.hashtag}
                isOpening={isAnimating || isOpen}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Keep scrolling hint when envelope is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-1 cursor-pointer pt-2"
            onClick={() => {
              const el = document.getElementById('formal-invitation');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-xs font-serif text-gold-light tracking-widest uppercase">
              Scroll to Explore Invitation
            </span>
            <ChevronDown className="w-5 h-5 text-gold-antique animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
