import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaxSeal } from './WaxSeal';
import { useGuest } from '../../context/GuestContext';
import { useAudio } from '../../context/AudioContext';
import { triggerCelebrationFireworks } from '../../utils/confetti';
import { coupleData } from '../../data/weddingData';
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
    <section className="relative min-h-screen flex flex-col items-center justify-between pt-10 pb-12 px-4 text-center z-10 max-w-4xl mx-auto">
      
      {/* 1. Auspicious Lord Ganesha Artwork in Large, Simple, Elegant Presentation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        {/* Large, Crisp, Serene Ganesha Frame */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 mb-3 p-3.5 rounded-full bg-white border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center justify-center transition-transform hover:scale-105">
          <img 
            src="/ganesha.svg" 
            alt="Lord Ganesha" 
            className="w-full h-full object-contain filter drop-shadow-sm" 
          />
        </div>

        {/* Sacred Sanskrit Greeting with Hairline Dividers */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-10 sm:w-16 bg-neutral-300" />
          <p className="text-neutral-500 font-sans text-xs tracking-[0.25em] font-semibold uppercase">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <div className="h-[1px] w-10 sm:w-16 bg-neutral-300" />
        </div>
      </motion.div>

      {/* 2. Modern Clean Typography & Couple Announcement (No R&A circular logo) */}
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
          {coupleData.bride.firstName} <span className="text-[#881337] font-normal">&</span> {coupleData.groom.firstName}
        </h1>
      </motion.div>

      {/* 3. Minimalist Modern Guest Personalization Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="my-2 px-6 py-2 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-800 text-xs sm:text-sm font-medium"
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

      {/* 4. Realistic Luxury Post Mail Envelope Unboxing Experience */}
      <div className="relative w-full max-w-[380px] sm:max-w-[430px] h-[230px] sm:h-[250px] mx-auto mt-3 mb-4 perspective-1000">
        
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
              {isPersonalized ? guestName : "Our Cherished Guests"}
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
                Warmly invited by The Srivastava & Kayastha Family
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
