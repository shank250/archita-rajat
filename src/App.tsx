import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundFX } from './components/common/BackgroundFX';
import { AudioPlayer } from './components/common/AudioPlayer';
import { HeroSection } from './components/hero/HeroSection';
import { FormalCard } from './components/invitation/FormalCard';
import { Storyboard } from './components/story/Storyboard';
import { ScratchDateCard } from './components/scratch/ScratchDateCard';
import { ItinerarySection } from './components/itinerary/ItinerarySection';
import { GuestbookSection } from './components/guestbook/GuestbookSection';
import { coupleData } from './data/weddingData';

export const App: React.FC = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#202124] overflow-x-hidden antialiased font-sans">
      {/* Background Micro-Confetti & Soft Sunbeam Glow */}
      <BackgroundFX />

      {/* Floating Audio Controls */}
      <AudioPlayer />

      {/* Section 1: Hero & Animated Envelope Unveiling */}
      <HeroSection
        isOpen={isEnvelopeOpen}
        onOpen={() => setIsEnvelopeOpen(true)}
      />

      {/* Sequential Invitation Sections Revealed when envelope is opened */}
      <AnimatePresence>
        {isEnvelopeOpen && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Section 2: Formal Invitation Card */}
            <FormalCard />

            {/* Section 3: Interactive Visual Storyboard */}
            <Storyboard />

            {/* Section 4: Scratch-to-Reveal Event Date */}
            <ScratchDateCard />

            {/* Section 5: Dynamic Itinerary & Timeline */}
            <ItinerarySection />

            {/* Section 6: Interactive Guestbook & RSVP */}
            <GuestbookSection />

            {/* Modern Minimalist Celebratory Footer */}
            <footer className="relative py-16 px-4 text-center border-t border-neutral-200 bg-white">
              <div className="w-10 h-10 mx-auto mb-3 p-1.5 rounded-2xl bg-[#FAFAFA] border border-neutral-200 shadow-sm">
                <img src="/ganesha.svg" alt="Lord Ganesha" className="w-full h-full object-contain" />
              </div>

              <h4 className="font-serif text-[#881337] text-2xl font-bold tracking-wider">
                {coupleData.monogram}
              </h4>

              <p className="font-sans text-xs tracking-wider text-neutral-500 font-semibold mt-1 uppercase">
                {coupleData.hashtag}
              </p>

              <div className="flex items-center justify-center gap-1.5 text-xs font-sans text-neutral-600 mt-4 font-medium">
                <span>With Love & Warm Regards from</span>
                <span className="font-bold text-neutral-900">The Kayastha Family</span>
              </div>

              <p className="text-[11px] font-sans text-neutral-400 mt-5">
                Created with love for {coupleData.bride.firstName} & {coupleData.groom.firstName} • 2026
              </p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
