import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalMonogram } from './RoyalMonogram';
import { WaxSeal } from './WaxSeal';
import { useGuest } from '../../context/GuestContext';
import { useAudio } from '../../context/AudioContext';
import { triggerCelebrationFireworks } from '../../utils/confetti';
import { coupleData, eventData } from '../../data/weddingData';
import { Sparkles, ChevronDown, Calendar, MapPin, Heart } from 'lucide-react';

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
      
      {/* 1. Auspicious Shloka & Cute Flat Ganesha Icon */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        {/* Flat Friendly Ganesha Icon */}
        <div className="w-12 h-12 mb-2 p-1.5 rounded-2xl bg-white border border-[#EBE6DC] shadow-google-card">
          <img src="/ganesha.svg" alt="Lord Ganesha" className="w-full h-full object-contain" />
        </div>

        {/* Sacred Sanskrit Greeting */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
          <p className="text-[#C5221F] font-sans text-xs tracking-widest font-bold uppercase">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
        </div>
      </motion.div>

      {/* 2. Google-Style Main Typography & Couple Announcement */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="my-3 flex flex-col items-center"
      >
        <span className="text-xs font-sans tracking-widest uppercase text-[#5F6368] font-bold mb-1.5 flex items-center gap-1.5">
          <span>The Wedding Celebration of</span>
          <Heart className="w-3.5 h-3.5 text-[#EA4335] fill-current" />
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#202124] font-bold tracking-tight leading-tight">
          {coupleData.groom.firstName} <span className="text-[#C5221F] font-normal">&</span> {coupleData.bride.firstName}
        </h1>

        {/* Friendly Material Date Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
          <span className="px-3.5 py-1 rounded-full bg-white border border-[#E8E2D5] shadow-sm text-xs font-sans font-semibold text-[#3C4043] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#EA4335]" />
            <span>Monday, 30 November 2026</span>
          </span>
          <span className="px-3.5 py-1 rounded-full bg-white border border-[#E8E2D5] shadow-sm text-xs font-sans font-semibold text-[#3C4043] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#34A853]" />
            <span>{eventData.venue.city}</span>
          </span>
        </div>
      </motion.div>

      {/* 3. Cute Celebratory Badge */}
      <RoyalMonogram />

      {/* 4. Google Material Style Guest Personalization Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="my-3 px-6 py-2.5 rounded-full bg-[#FEF7E0] border border-[#FEEFC3] shadow-sm flex items-center gap-2 text-[#7A4B04]"
      >
        <Sparkles className="w-4 h-4 text-[#F9AB00] animate-spin" style={{ animationDuration: '8s' }} />
        <p className="font-sans text-xs sm:text-sm font-medium">
          {isPersonalized ? (
            <>
              Special Invitation For <span className="font-bold text-[#202124]">{guestName}</span>
            </>
          ) : (
            <>
              Cordially Inviting <span className="font-bold text-[#202124]">Family & Friends</span>
            </>
          )}
        </p>
        <Sparkles className="w-4 h-4 text-[#F9AB00] animate-spin" style={{ animationDuration: '8s' }} />
      </motion.div>

      {/* 5. Solid Celebratory Envelope & Wax Stamp Unboxing */}
      <div className="relative w-full max-w-[360px] sm:max-w-[420px] mx-auto mt-2 mb-4 perspective-1000">
        
        {/* Envelope Outer Shell: Solid Festive Terracotta Cardstock */}
        <div className="relative bg-[#8C2127] rounded-3xl p-6 sm:p-8 shadow-google-elevated border-2 border-[#73181D] overflow-hidden text-white">
          
          {/* Subtle Clean Inner Border */}
          <div className="absolute inset-2.5 border border-white/25 rounded-2xl pointer-events-none" />

          {/* 3D Envelope Flap */}
          <motion.div
            className="absolute top-0 inset-x-0 h-32 origin-top preserve-3d shadow-md z-30"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
            animate={{
              rotateX: isOpen ? -180 : 0,
              opacity: isOpen ? 0.2 : 1,
            }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Front of Flap: Solid Terracotta */}
            <div className="w-full h-full bg-[#9E252D] border-b border-[#73181D] shadow-sm relative">
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/50 text-xs">
                ✦
              </div>
            </div>

            {/* Back of Flap (Revealed on Open): Clean Festive Tonal Cream Pattern */}
            <div 
              className="absolute inset-0 bg-[#F5EEDB] backface-hidden flex items-center justify-center"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <span className="text-amber-800/30 text-2xl font-serif">✨</span>
            </div>
          </motion.div>

          {/* Front Content Inside Envelope */}
          <div className="relative z-20 pt-4 pb-2 flex flex-col items-center">
            <span className="text-[9.5px] font-sans tracking-widest uppercase text-amber-200 font-bold mb-1">
              Official Wedding Invitation
            </span>
            
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-wide">
              {coupleData.ceremonyTitle}
            </h2>

            {/* Event Key Badges */}
            <div className="flex items-center gap-2 mt-3 mb-2 text-xs font-sans text-amber-100 font-medium">
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
              className="mt-6 p-5 rounded-3xl bg-white text-[#202124] border border-[#EBE6DC] shadow-google-card text-center"
            >
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#C5221F] font-bold">
                Invitation Unveiled 🎉
              </span>
              <p className="font-serif text-lg font-bold text-[#202124] mt-0.5">
                Welcome to Our Wedding Celebration!
              </p>
              <p className="text-xs font-sans text-[#5F6368] mt-1">
                Scroll down to read our story, scratch the wedding date, and RSVP.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. Cute Scroll Down Indicator */}
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
            <span className="text-xs font-sans font-semibold text-[#5F6368] tracking-wider uppercase">
              Explore Invitation Below
            </span>
            <ChevronDown className="w-5 h-5 text-[#C5221F] animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
