import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundFX } from './components/common/BackgroundFX';
import { FloralDivider } from './components/common/FloralDivider';
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
    <div className="relative min-h-screen bg-canvas-bg text-text-body overflow-x-hidden antialiased font-sans">
      {/* Background Floral SVGs & Ambient Pastel Glows */}
      <BackgroundFX />

      {/* Floating Audio Controls */}
      <AudioPlayer />

      {/* Section 1: Hero & Animated Envelope Unveiling with Wax Seal */}
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

            {/* Floral Transition Break */}
            <FloralDivider variant="blue" />

            {/* Section 3: Interactive Visual Storyboard */}
            <Storyboard />

            {/* Floral Transition Break */}
            <FloralDivider variant="rose" />

            {/* Section 4: Scratch-to-Reveal Event Date (Frosted Rose Pink Top Layer) */}
            <ScratchDateCard />

            {/* Floral Transition Break */}
            <FloralDivider variant="blue" />

            {/* Section 5: Dynamic Itinerary & Schedule */}
            <ItinerarySection />

            {/* Floral Transition Break */}
            <FloralDivider variant="rose" />

            {/* Section 6: Interactive Guestbook & RSVP */}
            <GuestbookSection />

            {/* Elegant Celebratory Footer */}
            <footer className="relative py-16 px-4 text-center border-t border-theme-border bg-card-surface overflow-hidden">
              <div className="w-14 h-18 sm:w-16 sm:h-20 mx-auto mb-3.5 p-2 rounded-2xl hand-drawn-pill-soft bg-surface-subtle border border-brand-blue/30 shadow-xs flex items-center justify-center hover:scale-105 transition-transform">
                <img src="/designs/Soft Pink Ganesh ji.svg" alt="Lord Ganesha" className="w-full h-full object-contain filter drop-shadow-xs" />
              </div>

              <h4 className="font-script text-brand-blue text-4xl sm:text-5xl font-bold tracking-wider">
                {coupleData.monogram}
              </h4>

              <div className="mt-2 inline-flex items-center px-4 py-1 hand-drawn-pill bg-surface-subtle border-theme-border text-xs font-sans font-bold text-secondary tracking-wider">
                <span>{coupleData.hashtag}</span>
              </div>

              {/* Minimalist Divider */}
              <div className="flex items-center justify-center gap-2 my-4">
                <div className="h-[1px] w-12 bg-brand-blue/20" />
                <span className="text-secondary text-xs">✦</span>
                <div className="h-[1px] w-12 bg-brand-blue/20" />
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
