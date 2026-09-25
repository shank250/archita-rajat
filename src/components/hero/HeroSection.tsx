import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalMonogram } from './RoyalMonogram';
import { WaxSeal } from './WaxSeal';
import { useGuest } from '../../context/GuestContext';
import { useAudio } from '../../context/AudioContext';
import { triggerGoldSparkles } from '../../utils/confetti';
import { coupleData } from '../../data/weddingData';
import { Sparkles, ChevronDown, Calendar, MapPin } from 'lucide-react';

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

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    triggerGoldSparkles({ x, y });
    playAudio();

    setTimeout(() => {
      onOpen();
      setIsAnimating(false);

      setTimeout(() => {
        const formalSection = document.getElementById('formal-invitation');
        if (formalSection) {
          formalSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 750);
    }, 450);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between pt-12 pb-14 px-4 text-center z-10 max-w-4xl mx-auto">
      
      {/* 1. Auspicious Shloka & Subtle Ganesha Motif */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        className="flex flex-col items-center"
      >
        {/* Minimalist Golden Ganesha Silhouette */}
        <div className="w-12 h-12 mb-3 opacity-90 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
          <img src="/ganesha.svg" alt="Lord Ganesha" className="w-full h-full object-contain" />
        </div>

        {/* Sacred Shloka in Whisper Gold */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-gold-antique/50" />
          <p className="text-gold-antique font-serif text-xs sm:text-sm tracking-[0.3em] font-medium uppercase">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-gold-antique/50" />
        </div>
      </motion.div>

      {/* 2. Main Editorial Typography & Couple Announcement */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2 }}
        className="my-4 flex flex-col items-center"
      >
        <span className="text-[10.5px] sm:text-xs font-sans tracking-[0.35em] uppercase text-gold-light/70 font-semibold mb-2">
          The Celebration of Love
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-gold-bright font-normal tracking-tight leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          {coupleData.groom.firstName} <span className="font-serif italic text-gold-antique font-light">&</span> {coupleData.bride.firstName}
        </h1>

        <div className="flex items-center gap-3 mt-3 text-xs sm:text-sm font-serif tracking-[0.2em] text-champagne/80 uppercase">
          <span>Monday, 30 November 2026</span>
          <span className="text-gold-antique">✦</span>
          <span>Moradabad</span>
        </div>
      </motion.div>

      {/* 3. Bespoke Royal Monogram Crest */}
      <RoyalMonogram />

      {/* 4. Minimalist Personalized Guest Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="my-4 px-6 py-2 rounded-full glass-pill border border-gold-antique/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex items-center gap-2.5 backdrop-blur-xl"
      >
        <Sparkles className="w-3.5 h-3.5 text-gold-light animate-pulse" />
        <p className="font-serif text-xs sm:text-sm text-gold-light tracking-wider">
          {isPersonalized ? (
            <>
              An Exclusive Invitation For <span className="font-bold text-champagne underline decoration-gold-antique/50 decoration-1 underline-offset-4">{guestName}</span>
            </>
          ) : (
            <>
              Cordially Welcoming <span className="font-bold text-champagne">Family & Friends</span>
            </>
          )}
        </p>
        <Sparkles className="w-3.5 h-3.5 text-gold-light animate-pulse" />
      </motion.div>

      {/* 5. Minimalist Luxury Envelope & Wax Seal Unboxing Suite */}
      <div className="relative w-full max-w-[360px] sm:max-w-[420px] mx-auto mt-2 mb-4 perspective-1000">
        
        {/* Envelope Body */}
        <div className="relative bg-gradient-to-b from-[#1C1512] via-[#15100D] to-[#0D0A08] rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.15)] border border-gold-antique/40 overflow-hidden">
          
          {/* Thin Gold Foil Framing */}
          <div className="absolute inset-2 border border-gold-antique/25 rounded-xl pointer-events-none" />

          {/* 3D Envelope Flap */}
          <motion.div
            className="absolute top-0 inset-x-0 h-32 origin-top preserve-3d shadow-2xl z-30"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
            animate={{
              rotateX: isOpen ? -180 : 0,
              opacity: isOpen ? 0.2 : 1,
            }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Front of Flap: Matte Obsidian */}
            <div className="w-full h-full bg-gradient-to-b from-[#251C17] to-[#17120E] border-b border-gold-antique/40 shadow-md relative">
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-gold-light/40 text-xs">
                ✦
              </div>
            </div>

            {/* Back of Flap (Revealed on Open): Gold Foil Pattern */}
            <div 
              className="absolute inset-0 damask-gold-pattern backface-hidden"
              style={{ transform: 'rotateY(180deg)' }}
            />
          </motion.div>

          {/* Front Content Inside Envelope */}
          <div className="relative z-20 pt-4 pb-2 flex flex-col items-center">
            <span className="text-[9.5px] font-sans tracking-[0.3em] uppercase text-gold-light/75 mb-1 font-semibold">
              Royal Invitation
            </span>
            
            <h2 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-bold tracking-wide">
              {coupleData.ceremonyTitle}
            </h2>

            {/* Event Key Badges */}
            <div className="flex items-center gap-3 mt-3 mb-2 text-xs font-serif text-champagne/80">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold-antique" />
                <span>30.11.2026</span>
              </span>
              <span className="text-gold-antique/60">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold-antique" />
                <span>Moradabad</span>
              </span>
            </div>

            {/* 3D Wax Seal Button */}
            <div className="mt-5 mb-1 z-40">
              <WaxSeal
                onClick={handleSealClick}
                hashtag={coupleData.hashtag}
                isOpening={isAnimating || isOpen}
              />
            </div>
          </div>
        </div>

        {/* Sliding Invitation Card Preview (emerges when unboxed) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 p-4 rounded-xl parchment-texture border border-gold-antique/40 shadow-parchment text-charcoal-bronze text-center"
            >
              <span className="text-[10px] font-sans uppercase tracking-widest text-amber-900 font-bold">
                Invitation Unveiled
              </span>
              <p className="font-serif text-base font-bold text-amber-950 mt-0.5">
                With the Blessings of Our Families
              </p>
              <p className="text-xs font-serif text-charcoal-muted mt-1 italic">
                Scroll down to read the formal invitation and celebrate our journey.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. Smooth Scroll Indicator */}
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
            <span className="text-xs font-serif text-gold-light tracking-widest uppercase font-medium">
              Explore Royal Invitation Below
            </span>
            <ChevronDown className="w-5 h-5 text-gold-antique animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
