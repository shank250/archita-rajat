import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { storyData } from '../../data/weddingData';

export const Storyboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress through this entire section (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth buttery spring interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  // Stage 1: Childhood Photos (Active from 0% -> ~45%)
  const childhoodOpacity = useTransform(smoothProgress, [0, 0.08, 0.38, 0.48], [0.2, 1, 1, 0]);
  const childhoodScale = useTransform(smoothProgress, [0, 0.12, 0.38, 0.48], [0.92, 1, 1, 0.88]);
  const childhoodY = useTransform(smoothProgress, [0, 0.12, 0.38, 0.48], [30, 0, 0, -40]);

  // Individual parallax float for Archita & Rajat
  const architaX = useTransform(smoothProgress, [0, 0.15, 0.38, 0.48], [-40, 0, 0, -25]);
  const architaRotate = useTransform(smoothProgress, [0, 0.15, 0.38, 0.48], [-4, -1, -1, 0]);

  const rajatX = useTransform(smoothProgress, [0, 0.15, 0.38, 0.48], [40, 0, 0, 25]);
  const rajatRotate = useTransform(smoothProgress, [0, 0.15, 0.38, 0.48], [4, 1, 1, 0]);

  // Stage 1.5: Destiny Connector / Convergence Bloom (Active around 40% -> 58%)
  const connectorOpacity = useTransform(smoothProgress, [0.36, 0.46, 0.52, 0.60], [0, 1, 1, 0]);
  const connectorScale = useTransform(smoothProgress, [0.36, 0.48, 0.60], [0.6, 1.15, 0.85]);

  // Stage 2: Couple Portrait (Emerges from 48% -> 100%)
  const coupleOpacity = useTransform(smoothProgress, [0.46, 0.58, 0.95, 1], [0, 1, 1, 1]);
  const coupleScale = useTransform(smoothProgress, [0.46, 0.62, 0.95, 1], [0.84, 1, 1, 1]);
  const coupleY = useTransform(smoothProgress, [0.46, 0.62, 0.95, 1], [60, 0, 0, 0]);
  const coupleRotate = useTransform(smoothProgress, [0.46, 0.62], [2.5, 0]);

  // Dynamic Scroll Indicator prompt
  const hintOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  // Progress Track Dots (Step 1 vs Step 2)
  const stepOneHighlight = useTransform(smoothProgress, [0, 0.46], [1, 0.3]);
  const stepTwoHighlight = useTransform(smoothProgress, [0.46, 0.65], [0.3, 1]);

  const childhoodStory = storyData[0];
  const coupleStory = storyData[1];

  return (
    <section
      id="our-story"
      ref={containerRef}
      className="relative h-[250vh] w-full z-10"
    >
      {/* Pinned / Sticky Theater Viewport */}
      <div className="sticky top-8 sm:top-12 h-[88vh] sm:h-[90vh] max-h-[820px] w-full flex flex-col justify-between items-center py-3 sm:py-5 px-3 sm:px-6 max-w-4xl mx-auto overflow-hidden">
        
        {/* Fixed Top Header & Chapter Progress Tracker */}
        <div className="text-center w-full z-20 flex flex-col items-center flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 hand-drawn-pill bg-surface-subtle border-brand-blue/30 text-primary text-[11px] sm:text-xs font-sans font-bold shadow-xs mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span className="tracking-widest uppercase">Our Journey Together</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl text-primary font-bold">
            The Chapters of Our Love Story
          </h2>

          {/* Dynamic Chapter Step Indicators */}
          <div className="flex items-center gap-3 mt-2">
            <motion.div
              style={{ opacity: stepOneHighlight }}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-sans font-bold text-primary uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>01 • Childhood Days</span>
            </motion.div>

            <span className="text-brand-blue/30 text-xs">✦</span>

            <motion.div
              style={{ opacity: stepTwoHighlight }}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-sans font-bold text-secondary uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span>02 • Together Forever</span>
            </motion.div>
          </div>
        </div>

        {/* Center Stage: Smooth Scroll-Driven Transition Canvas */}
        <div className="relative w-full flex-1 flex items-center justify-center my-auto overflow-hidden">
          
          {/* ========================================================
              STAGE 1: BOTH CHILDHOOD PHOTOS (ARCHITA & RAJAT)
             ======================================================== */}
          <motion.div
            style={{
              opacity: childhoodOpacity,
              scale: childhoodScale,
              y: childhoodY,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center w-full my-auto pointer-events-auto"
          >
            {/* Stage 1 Subtitle */}
            <p className="text-center font-sans text-xs sm:text-sm text-text-sub max-w-md mx-auto mb-3 sm:mb-4 px-2 leading-snug">
              Miles apart, two innocent souls grew up with cheerful smiles and big dreams — unaware of the destiny awaiting them.
            </p>

            {/* Side-by-Side Dual Frames */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-[560px] w-full mx-auto px-1 sm:px-2">
              
              {/* Archita's Childhood Frame */}
              <motion.div
                style={{
                  x: architaX,
                  rotate: architaRotate,
                }}
                className="group relative bg-card-surface border-2 border-brand-blue/25 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-card-subtle hover:border-brand-blue/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Delicate Inner Hairline */}
                <div className="absolute inset-2 sm:inset-2.5 border border-brand-blue/15 rounded-xl pointer-events-none" />

                {/* Photo Mount with Blush Silk Matting */}
                <div className="w-full h-48 sm:h-72 rounded-xl sm:rounded-2xl overflow-hidden bg-surface-subtle border border-brand-blue/15 relative flex items-center justify-center p-2 shadow-inner">
                  <img
                    src={childhoodStory.images[0].src}
                    alt={childhoodStory.images[0].alt}
                    draggable={false}
                    className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-xs transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  />
                </div>

                {/* Name & Caption Placard */}
                <div className="mt-2.5 sm:mt-3 text-center z-10">
                  <span className="inline-block px-3 py-0.5 hand-drawn-pill bg-surface-subtle border border-brand-blue/30 text-[11px] sm:text-xs font-sans font-bold text-primary shadow-xs">
                    {childhoodStory.images[0].caption}
                  </span>
                  <p className="font-serif italic text-[10px] sm:text-xs text-text-sub mt-1 leading-tight line-clamp-2">
                    Laughter, innocence &amp; sweet dreams
                  </p>
                </div>
              </motion.div>

              {/* Rajat's Childhood Frame */}
              <motion.div
                style={{
                  x: rajatX,
                  rotate: rajatRotate,
                }}
                className="group relative bg-card-surface border-2 border-brand-blue/25 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-card-subtle hover:border-brand-blue/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Delicate Inner Hairline */}
                <div className="absolute inset-2 sm:inset-2.5 border border-brand-blue/15 rounded-xl pointer-events-none" />

                {/* Photo Mount with Blush Silk Matting */}
                <div className="w-full h-48 sm:h-72 rounded-xl sm:rounded-2xl overflow-hidden bg-surface-subtle border border-brand-blue/15 relative flex items-center justify-center p-2 shadow-inner">
                  <img
                    src={childhoodStory.images[1].src}
                    alt={childhoodStory.images[1].alt}
                    draggable={false}
                    className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-xs transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  />
                </div>

                {/* Name & Caption Placard */}
                <div className="mt-2.5 sm:mt-3 text-center z-10">
                  <span className="inline-block px-3 py-0.5 hand-drawn-pill bg-surface-subtle border border-brand-blue/30 text-[11px] sm:text-xs font-sans font-bold text-primary shadow-xs">
                    {childhoodStory.images[1].caption}
                  </span>
                  <p className="font-serif italic text-[10px] sm:text-xs text-text-sub mt-1 leading-tight line-clamp-2">
                    Curious adventurer &amp; dreaming big
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================
              STAGE 1.5: DESTINY CONNECTOR / BLOOM MEDALLION
             ======================================================== */}
          <motion.div
            style={{
              opacity: connectorOpacity,
              scale: connectorScale,
            }}
            className="absolute z-20 pointer-events-none flex flex-col items-center justify-center text-center px-4"
          >
            <div className="p-4 sm:p-5 rounded-full bg-card-surface border-2 border-brand-blue/30 shadow-[0_15px_35px_rgba(54,102,166,0.2)] flex flex-col items-center justify-center">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-secondary fill-secondary/20 animate-pulse" />
            </div>
            <div className="mt-2 px-4 py-1.5 rounded-full bg-card-surface/90 border border-brand-blue/20 backdrop-blur-xs shadow-xs">
              <span className="text-xs sm:text-sm font-sans font-bold text-brand-blue tracking-wide uppercase">
                ✦ Where Destinies Intertwined ✦
              </span>
            </div>
          </motion.div>

          {/* ========================================================
              STAGE 2: COUPLE PORTRAIT (COUPLE-SELFIE.PNG)
             ======================================================== */}
          <motion.div
            style={{
              opacity: coupleOpacity,
              scale: coupleScale,
              y: coupleY,
              rotate: coupleRotate,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center w-full my-auto pointer-events-auto"
          >
            {/* Showstopper Regal Centerpiece Frame */}
            <div className="relative w-full max-w-[310px] sm:max-w-[420px] bg-card-surface rounded-2xl sm:rounded-3xl border-2 border-brand-blue/30 shadow-[0_20px_50px_rgba(54,102,166,0.18)] p-3 sm:p-5 flex flex-col items-center justify-between group hover:shadow-[0_25px_60px_rgba(54,102,166,0.22)] transition-all">
              
              {/* Delicate Inner Hairline */}
              <div className="absolute inset-2 sm:inset-3 border border-brand-blue/15 rounded-xl pointer-events-none" />

              {/* Watermark Corner Flourish */}
              <div className="absolute -top-6 -right-6 w-24 h-24 opacity-15 pointer-events-none">
                <img src="/designs/floral-stem.svg" alt="" className="w-full h-full object-contain rotate-45" />
              </div>

              {/* Photo Viewport */}
              <div className="w-full h-56 sm:h-80 rounded-xl overflow-hidden bg-surface-subtle border border-brand-blue/20 relative flex items-center justify-center p-2.5 shadow-inner">
                <img
                  src={coupleStory.images[0].src}
                  alt={coupleStory.images[0].alt}
                  draggable={false}
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-md transition-transform duration-700 group-hover:scale-[1.03] pointer-events-none"
                />
              </div>

              {/* Couple Placard */}
              <div className="mt-3 text-center z-10 flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 hand-drawn-pill bg-surface-subtle border border-brand-blue/30 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] font-sans font-bold text-secondary uppercase tracking-widest">
                    Soulmates for Life
                  </span>
                </div>

                <h4 className="font-script text-3xl sm:text-5xl text-brand-blue font-bold tracking-wide my-1 select-none flex flex-col items-center leading-none">
                  <span>Archita</span>
                  <span className="text-2xl sm:text-3xl text-secondary my-0.5 font-bold">&amp;</span>
                  <span>Rajat</span>
                </h4>

                <p className="font-serif italic text-[11px] sm:text-xs text-text-sub max-w-xs mx-auto leading-relaxed">
                  "In you, I've found my love, my best friend, and our forever home."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Interactive Scroll Hint (Fades out once user begins scrolling) */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="flex items-center justify-center gap-1 text-[11px] font-sans text-brand-blue/80 font-bold uppercase tracking-wider py-1 flex-shrink-0 select-none"
        >
          <span>Scroll down to unfold our story</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-brand-blue" />
        </motion.div>

      </div>
    </section>
  );
};
