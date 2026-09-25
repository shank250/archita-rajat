import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalMonogram } from './RoyalMonogram';
import { WaxSeal } from './WaxSeal';
import { useGuest } from '../../context/GuestContext';
import { useAudio } from '../../context/AudioContext';
import { triggerCelebrationFireworks } from '../../utils/confetti';
import { coupleData, eventData } from '../../data/weddingData';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';

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
    <section className="relative min-h-screen flex flex-col items-center justify-between pt-12 pb-14 px-4 text-center z-10 max-w-4xl mx-auto">
      
      {/* 1. Auspicious Shloka & Clean Ganesha Icon */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        {/* Clean White Ganesha Badge */}
        <div className="w-11 h-11 mb-2.5 p-2 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center">
          <img src="/ganesha.svg" alt="Lord Ganesha" className="w-full h-full object-contain" />
        </div>

        {/* Sacred Sanskrit Greeting with Hairline Dividers */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 sm:w-12 bg-neutral-300" />
          <p className="text-neutral-500 font-sans text-xs tracking-[0.25em] font-semibold uppercase">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <div className="h-[1px] w-8 sm:w-12 bg-neutral-300" />
        </div>
      </motion.div>

      {/* 2. Modern Clean Typography & Couple Announcement */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="my-3 flex flex-col items-center"
      >
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-neutral-400 font-semibold mb-2">
          The Wedding Celebration of
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-neutral-900 font-bold tracking-tight leading-tight">
          {coupleData.groom.firstName} <span className="text-[#881337] font-normal">&</span> {coupleData.bride.firstName}
        </h1>

        {/* Clean Date Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5">
          <span className="px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm text-xs font-sans font-semibold text-neutral-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-500" />
            <span>Monday, 30 November 2026</span>
          </span>
          <span className="px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm text-xs font-sans font-semibold text-neutral-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-neutral-500" />
            <span>{eventData.venue.city}</span>
          </span>
        </div>
      </motion.div>

      {/* 3. Bespoke Clean Monogram Crest */}
      <RoyalMonogram />

      {/* 4. Minimalist Modern Guest Personalization Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="my-3 px-6 py-2 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-800 text-xs sm:text-sm font-medium"
      >
        {isPersonalized ? (
          <>
            Invitation For <span className="font-bold text-neutral-950 underline decoration-neutral-300 decoration-1 underline-offset-4">{guestName}</span>
          </>
        ) : (
          <>
            Cordially Inviting <span className="font-bold text-neutral-950">Family & Friends</span>
          </>
        )}
      </motion.div>

      {/* 5. Solid Deep Wine Envelope & Wax Stamp Unboxing */}
      <div className="relative w-full max-w-[360px] sm:max-w-[420px] mx-auto mt-2 mb-4 perspective-1000">
        
        {/* Envelope Outer Shell: Solid Rich Wine */}
        <div className="relative bg-[#881337] rounded-3xl p-6 sm:p-8 shadow-[0_12px_35px_rgba(136,19,55,0.25)] border border-[#70102E] overflow-hidden text-white">
          
          {/* Subtle Clean Inner Border */}
          <div className="absolute inset-2.5 border border-white/20 rounded-2xl pointer-events-none" />

          {/* 3D Envelope Flap */}
          <motion.div
            className="absolute top-0 inset-x-0 h-32 origin-top preserve-3d shadow-sm z-30"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
            animate={{
              rotateX: isOpen ? -180 : 0,
              opacity: isOpen ? 0.2 : 1,
            }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Front of Flap: Solid Wine */}
            <div className="w-full h-full bg-[#9F1239] border-b border-[#70102E] shadow-sm relative">
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/40 text-xs">
                ✦
              </div>
            </div>

            {/* Back of Flap */}
            <div 
              className="absolute inset-0 bg-[#F5F5F7] backface-hidden flex items-center justify-center border border-neutral-200"
              style={{ transform: 'rotateY(180deg)' }}
            />
          </motion.div>

          {/* Front Content Inside Envelope */}
          <div className="relative z-20 pt-4 pb-2 flex flex-col items-center">
            <span className="text-[9.5px] font-sans tracking-widest uppercase text-rose-200 font-semibold mb-1">
              Official Invitation
            </span>
            
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-wide">
              {coupleData.ceremonyTitle}
            </h2>

            {/* Event Key Badges */}
            <div className="flex items-center gap-2 mt-3 mb-2 text-xs font-sans text-rose-100 font-medium">
              <span>Nov 30, 2026</span>
              <span>•</span>
              <span>6:30 PM Onwards</span>
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
              initial={{ y: 25, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.2 }}
              className="mt-6 p-5 rounded-3xl bg-white text-neutral-900 border border-neutral-200 shadow-sm text-center"
            >
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#881337] font-bold">
                Invitation Unveiled
              </span>
              <p className="font-serif text-lg font-bold text-neutral-950 mt-0.5">
                Welcome to Our Wedding Celebration
              </p>
              <p className="text-xs font-sans text-neutral-500 mt-1">
                Scroll down to read our story, scratch the wedding date, and RSVP.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. Clean Scroll Down Indicator */}
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
