import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaxSeal } from './WaxSeal';
import { useGuest } from '../../context/GuestContext';
import { useAudio } from '../../context/AudioContext';
import { triggerCelebrationFireworks } from '../../utils/confetti';
import { ChevronDown } from 'lucide-react';

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
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-center z-10 max-w-3xl mx-auto">
      
      {/* 1. Auspicious Lord Ganesha Artwork - Centerpiece */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center mb-5 sm:mb-6"
      >
        {/* Crisp Ganesha Frame with Theme Accents */}
        <div className="w-28 h-36 sm:w-36 sm:h-44 mb-2 p-3 sm:p-4 rounded-3xl hand-drawn-pill-soft bg-card-surface border-2 border-brand-blue/20 shadow-card-subtle flex items-center justify-center transition-transform hover:scale-105">
          <img 
            src="/designs/Soft Pink Ganesh ji.svg" 
            alt="Lord Ganesha" 
            className="w-full h-full object-contain filter drop-shadow-sm" 
          />
        </div>

        {/* Sacred Sanskrit Greeting with Hairline Dividers */}
        <div className="flex items-center gap-3 mt-1">
          <div className="h-[1px] w-12 sm:w-20 bg-brand-blue/30" />
          <p className="text-primary font-sans text-xs sm:text-sm tracking-[0.28em] font-bold uppercase">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <div className="h-[1px] w-12 sm:w-20 bg-brand-blue/30" />
        </div>
      </motion.div>

      {/* 2. Modern Luxury Digital Invitation Card (Replaces outdated postcard mailbox) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative w-full max-w-[440px] sm:max-w-[480px] bg-card-surface rounded-3xl sm:rounded-[32px] border-2 border-brand-blue/20 shadow-[0_20px_50px_rgba(54,102,166,0.12)] p-6 sm:p-8 overflow-hidden transition-all text-text-body"
      >
        {/* Delicate Hairline Inner Rule */}
        <div className="absolute inset-3 sm:inset-3.5 border border-brand-blue/15 rounded-2xl pointer-events-none" />

        {/* Subtle Watermark Corner Flourish */}
        <div className="absolute -top-8 -right-8 w-32 h-32 opacity-15 pointer-events-none">
          <img src="/designs/floral-stem.svg" alt="" className="w-full h-full object-contain rotate-45" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Subheading: Tracked Uppercase Sans-Serif */}
          <span className="subheading-tracked text-brand-blue/80 block mt-1 mb-2">
            INVITE YOU TO CELEBRATE THE WEDDING OF
          </span>

          {/* Hero Couple Names in Textured Brush Script (Caveat) */}
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-brand-blue font-bold tracking-wide leading-tight my-1.5 drop-shadow-xs select-none">
            Archita &amp; Rajat
          </h1>

          {/* Personalized Guest Welcome Pill */}
          <div className="my-3 px-4 py-1.5 hand-drawn-pill bg-surface-subtle border-brand-blue/30 flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-sans text-text-body font-medium">
              {isPersonalized ? (
                <>
                  Warmly Inviting <strong className="font-bold text-primary font-serif">{guestName}</strong>
                </>
              ) : (
                <>
                  Warmly Inviting <strong className="font-bold text-primary font-serif">Our Cherished Family &amp; Friends</strong>
                </>
              )}
            </span>
          </div>

          {/* Modern Interactive Wax Seal Action */}
          <div className="relative mt-6 mb-3">
            <WaxSeal
              onClick={handleSealClick}
              isOpening={isAnimating || isOpen}
            />
          </div>

          {/* Status Message when Unveiled */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-xs font-sans font-bold text-brand-blue flex items-center gap-1.5 bg-surface-subtle px-3.5 py-1 rounded-full border border-brand-blue/20"
            >
              <span>✦ Invitation Unveiled</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* 3. Clean Scroll Down Indicator */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-1 cursor-pointer pt-6 pb-2 group"
            onClick={() => {
              const el = document.getElementById('formal-invitation');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-xs font-sans font-bold text-brand-blue tracking-wider uppercase group-hover:text-brand-blue-hover transition-colors">
              Explore Formal Invitation
            </span>
            <ChevronDown className="w-5 h-5 text-brand-blue animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
