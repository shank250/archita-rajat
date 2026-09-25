import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../../data/weddingData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Storyboard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? storyData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === storyData.length - 1 ? 0 : prev + 1));
  };

  const currentStory = storyData[currentIndex];

  return (
    <section id="our-story" className="relative py-16 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-serif uppercase tracking-[0.3em] text-gold-antique">
          Chapter by Chapter
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-champagne font-bold mt-1">
          Our Journey Together
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-antique to-transparent mx-auto mt-3" />
      </div>

      {/* Story Carousel Frame */}
      <div className="relative bg-espresso-surface/90 border border-gold-antique/30 rounded-2xl p-5 sm:p-8 backdrop-blur-md shadow-2xl">
        {/* Top Badges & Chapter Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gold-antique/20">
          <span className="px-3 py-1 rounded-full bg-crimson-wax/80 border border-gold-antique/40 text-[11px] sm:text-xs font-serif text-gold-light tracking-wider font-semibold">
            {currentStory.chapterBadge}
          </span>
          <span className="text-xs font-serif text-gold-light/70 tracking-widest">
            {currentIndex + 1} of {storyData.length}
          </span>
        </div>

        {/* Carousel Content Animated with AnimatePresence */}
        <div className="min-h-[460px] sm:min-h-[480px] flex flex-col justify-between py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Story Title & Subtitle */}
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-bold">
                  {currentStory.title}
                </h3>
                <p className="text-xs sm:text-sm font-serif italic text-gold-light/80 mt-1">
                  {currentStory.subtitle}
                </p>
              </div>

              {/* Photos Grid (Polaroid Style) */}
              <div className="flex flex-wrap items-center justify-center gap-6 my-4 w-full">
                {currentStory.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.04, rotate: 0 }}
                    style={{ transform: `rotate(${img.rotation || 0}deg)` }}
                    className="relative bg-parchment-cream p-3 sm:p-4 rounded shadow-xl border border-amber-900/20 max-w-[260px] sm:max-w-[280px] w-full transition-transform duration-300"
                  >
                    {/* Polaroid Tape / Pin Accent */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-amber-100/80 border border-amber-900/10 shadow-sm rotate-1" />

                    {/* Image */}
                    <div className="w-full h-56 sm:h-64 rounded overflow-hidden bg-espresso-light shadow-inner">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-95 hover:brightness-100 transition-all duration-300"
                      />
                    </div>

                    {/* Handwritten Style Caption */}
                    <p className="mt-3 font-serif text-center text-xs text-charcoal-bronze italic leading-snug px-1">
                      "{img.caption}"
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Narration Text */}
              <div className="max-w-xl text-center mt-6 px-4">
                <p className="font-serif text-sm sm:text-base text-champagne/90 leading-relaxed italic">
                  "{currentStory.narration}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gold-antique/20">
          <button
            onClick={prevSlide}
            aria-label="Previous story chapter"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-espresso border border-gold-antique/40 text-gold-light text-xs font-serif hover:border-gold-antique transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gold-antique" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {storyData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Jump to story chapter ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? 'w-6 h-2 bg-gold-antique'
                    : 'w-2 h-2 bg-gold-antique/30 hover:bg-gold-antique/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next story chapter"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-espresso border border-gold-antique/40 text-gold-light text-xs font-serif hover:border-gold-antique transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 text-gold-antique" />
          </button>
        </div>
      </div>
    </section>
  );
};
