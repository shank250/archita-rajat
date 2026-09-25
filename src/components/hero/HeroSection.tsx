import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CoupleShowcase } from './CoupleShowcase';
import { WaxSeal } from './WaxSeal';
import { useGuest } from '../../context/GuestContext';
import { useAudio } from '../../context/AudioContext';
import { triggerGoldSparkles } from '../../utils/confetti';
import { coupleData, eventData } from '../../data/weddingData';
import { Sparkles, ChevronDown, Calendar, MapPin, Clock } from 'lucide-react';

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
    <section className="relative min-h-screen flex flex-col items-center justify-between pt-8 pb-12 px-4 text-center z-10">
      
      {/* 1. Auspicious Shloka & Royal Emblem Header */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center max-w-lg mx-auto"
      >
        {/* Lord Ganesha Medallion */}
        <div className="relative mb-3 group">
          <div className="absolute inset-0 bg-gold-antique/30 rounded-full blur-xl transform scale-125" />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 p-2.5 rounded-full bg-espresso-surface/80 border border-gold-antique/50 shadow-gold-glow backdrop-blur-md">
            <img src="/ganesha.svg" alt="Lord Ganesha" className="w-full h-full object-contain filter drop-shadow" />
          </div>
        </div>

        {/* Shloka Typography */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-gold-antique/60" />
          <p className="text-gold-antique font-serif text-sm sm:text-base tracking-[0.25em] font-semibold uppercase">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-gold-antique/60" />
        </div>

        <p className="text-[11px] sm:text-xs text-champagne-muted font-serif max-w-sm mt-1.5 italic leading-relaxed">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </p>
      </motion.div>

      {/* 2. Modern Frosted Glass Personalization Capsule */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="my-4 px-6 py-2 rounded-full glass-pill shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-2.5 border border-gold-antique/40 backdrop-blur-xl"
      >
        <Sparkles className="w-3.5 h-3.5 text-gold-light animate-pulse" />
        <p className="font-serif text-xs sm:text-sm text-gold-light tracking-wider">
          {isPersonalized ? (
            <>
              An Exclusive Invitation For <span className="font-bold text-champagne underline decoration-gold-antique/60 decoration-1 underline-offset-4">{guestName}</span>
            </>
          ) : (
            <>
              Cordially Welcoming <span className="font-bold text-champagne">Family & Friends</span>
            </>
          )}
        </p>
        <Sparkles className="w-3.5 h-3.5 text-gold-light animate-pulse" />
      </motion.div>

      {/* 3. Modern Romantic Couple Showcase */}
      <div className="my-2 w-full">
        <CoupleShowcase />
      </div>

      {/* 4. Luxury Bespoke Envelope & Wax Seal Unboxing */}
      <div className="relative w-full max-w-[380px] sm:max-w-[440px] mx-auto mt-4 mb-4 perspective-1000">
        
        {/* Envelope Outer Shell */}
        <div className="relative velvet-texture rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.2)] border-2 border-gold-antique/40 overflow-hidden">
          
          {/* Ornate Gold Border Line */}
          <div className="absolute inset-2 border border-gold-antique/30 rounded-xl pointer-events-none" />
          <div className="absolute inset-3 border border-gold-antique/15 rounded-lg pointer-events-none" />

          {/* 3D Flap Unfolding Animation */}
          <motion.div
            className="absolute top-0 inset-x-0 h-32 origin-top preserve-3d shadow-2xl z-30"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
            animate={{
              rotateX: isOpen ? -180 : 0,
              opacity: isOpen ? 0.25 : 1,
            }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Front of Flap: Rich Velvet */}
            <div className="w-full h-full velvet-texture border-b-2 border-gold-antique/50 shadow-md relative">
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-gold-light/40 text-xs">
                ✦
              </div>
            </div>

            {/* Back of Flap (Revealed on Open): Gold Foil Damask Pattern */}
            <div 
              className="absolute inset-0 damask-gold-pattern backface-hidden"
              style={{ transform: 'rotateY(180deg)' }}
            />
          </motion.div>

          {/* Front Content & Typography */}
          <div className="relative z-20 pt-4 pb-2 flex flex-col items-center">
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-light/80 mb-1 font-semibold">
              The Royal Engagement Invitation
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-gold-gradient font-bold tracking-wide">
              {coupleData.groom.firstName} & {coupleData.bride.firstName}
            </h1>
            <p className="text-xs sm:text-sm font-serif text-champagne/90 mt-1 italic">
              {eventData.displayDate}
            </p>

            {/* Event Key Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-black/40 border border-gold-antique/30 text-[10px] font-serif text-gold-light/90 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gold-antique" />
                <span>30 Nov 2026</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/40 border border-gold-antique/30 text-[10px] font-serif text-gold-light/90 flex items-center gap-1">
                <Clock className="w-3 h-3 text-gold-antique" />
                <span>6:30 PM Onwards</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/40 border border-gold-antique/30 text-[10px] font-serif text-gold-light/90 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gold-antique" />
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
              className="mt-6 p-4 rounded-xl parchment-texture border-2 border-gold-antique/50 shadow-parchment text-charcoal-bronze text-center"
            >
              <span className="text-[10px] font-sans uppercase tracking-widest text-amber-900 font-bold">
                Invitation Unveiled
              </span>
              <p className="font-serif text-base font-bold text-amber-950 mt-0.5">
                Welcome to Our Celebration Journey
              </p>
              <p className="text-xs font-serif text-charcoal-muted mt-1 italic">
                Scroll down to read the formal blessings, explore our story, scratch the calendar date, and RSVP.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Smooth Scroll Indicator */}
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
