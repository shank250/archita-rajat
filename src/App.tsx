import React, { useState, useEffect } from 'react';
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
import { activeTheme, getThemeCssVariables } from './config/theme';

export const App: React.FC = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Apply theme variables dynamically from src/config/theme.ts
  useEffect(() => {
    const vars = getThemeCssVariables(activeTheme);
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-canvas text-text-body overflow-x-hidden antialiased font-sans">
      {/* Background Micro-Confetti & Ambient Glow */}
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

            {/* Elegant Celebratory Footer */}
            <footer className="relative py-16 px-4 text-center border-t border-theme-border bg-surface overflow-hidden">
              <div className="w-12 h-12 mx-auto mb-3 p-2 rounded-2xl bg-surface-subtle border border-theme-border shadow-xs flex items-center justify-center">
                <img src="/ganesha.svg" alt="Lord Ganesha" className="w-full h-full object-contain" />
              </div>

              <h4 className="font-serif text-primary text-3xl font-bold tracking-wider">
                {coupleData.monogram}
              </h4>

              <p className="font-sans text-xs tracking-wider text-secondary font-bold mt-1">
                {coupleData.hashtag}
              </p>

              {/* Minimalist Divider */}
              <div className="flex items-center justify-center gap-2 my-4">
                <div className="h-[1px] w-12 bg-primary/20" />
                <span className="text-secondary text-xs">✦</span>
                <div className="h-[1px] w-12 bg-primary/20" />
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs font-sans text-text-sub font-medium">
                <span>With Love &amp; Warm Regards from</span>
                <strong className="font-bold text-text-body">The Kayastha Family</strong>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
