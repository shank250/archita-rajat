import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundFX } from './components/common/BackgroundFX';
import { AudioPlayer } from './components/common/AudioPlayer';
import { HeroSection } from './components/hero/HeroSection';
import { FormalCard } from './components/invitation/FormalCard';
import { Storyboard } from './components/story/Storyboard';
import { ScratchDateCard } from './components/scratch/ScratchDateCard';
import { ItinerarySection } from './components/itinerary/ItinerarySection';
import { ActionHub } from './components/actions/ActionHub';
import { GuestbookSection } from './components/guestbook/GuestbookSection';
import { coupleData } from './data/weddingData';

export const App: React.FC = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-espresso text-champagne overflow-x-hidden">
      {/* Background Stardust Particles & Ambient Glow */}
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
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            {/* Section 2: Formal Invitation Parchment Card */}
            <FormalCard />

            {/* Section 3: Interactive Visual Storyboard */}
            <Storyboard />

            {/* Section 4: Scratch-to-Reveal Event Date */}
            <ScratchDateCard />

            {/* Section 5: Dynamic Itinerary & Timeline */}
            <ItinerarySection />

            {/* Section 6: Action Hub (Save Date, WhatsApp, Venue) */}
            <ActionHub />

            {/* Section 7: Interactive Guestbook & RSVP */}
            <GuestbookSection />

            {/* Royal Footer */}
            <footer className="relative py-12 px-4 text-center border-t border-gold-antique/20 bg-espresso-surface/90 backdrop-blur-md">
              <div className="w-12 h-12 mx-auto mb-3 opacity-90 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                <img src="/ganesha.svg" alt="Lord Ganesha" className="w-full h-full object-contain" />
              </div>

              <h4 className="font-decorative text-gold-gradient text-xl font-bold tracking-widest">
                {coupleData.monogram}
              </h4>

              <p className="font-serif text-sm text-gold-light mt-1">
                {coupleData.hashtag}
              </p>

              <div className="flex items-center justify-center gap-1.5 text-xs font-serif text-champagne-muted mt-3">
                <span>With Love & Warm Regards from</span>
                <span className="font-bold text-champagne">Sharma & Verma Families</span>
              </div>

              <p className="text-[11px] font-sans text-champagne-muted/60 mt-4">
                Created with love for {coupleData.groom.firstName} & {coupleData.bride.firstName} • 2026
              </p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
