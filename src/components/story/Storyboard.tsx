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
    <section id="our-story" className="relative py-20 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-antique font-semibold">
          Chapter by Chapter
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal mt-1">
          Our Journey Together
        </h2>
        <div className="w-12 h-0.5 bg-gold-antique/60 mx-auto mt-3" />
      </div>

      {/* Story Carousel Frame: Modern Solid Obsidian Surface */}
      <div className="relative bg-[#121218] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        
        {/* Top Badges & Chapter Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-white/10">
          <span className="px-3.5 py-1 rounded-full bg-[#8E1722] text-white text-[11px] font-sans tracking-wider font-semibold shadow-sm">
            {currentStory.chapterBadge}
          </span>
          <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase">
            {currentIndex + 1} of {storyData.length}
          </span>
        </div>

        {/* Carousel Content Animated with AnimatePresence */}
        <div className="min-h-[460px] sm:min-h-[480px] flex flex-col justify-between py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              {/* Story Title & Subtitle */}
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl sm:text-4xl text-white font-semibold">
                  {currentStory.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-neutral-400 mt-1">
                  {currentStory.subtitle}
                </p>
              </div>

              {/* Photos Grid (Modern Solid Porcelain Frames) */}
              <div className="flex flex-wrap items-center justify-center gap-6 my-4 w-full">
                {currentStory.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03, rotate: 0 }}
                    style={{ transform: `rotate(${img.rotation || 0}deg)` }}
                    className="relative bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-neutral-200 max-w-[260px] sm:max-w-[280px] w-full transition-transform duration-300"
                  >
                    {/* Modern Clean Image Viewport */}
                    <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-neutral-900 shadow-inner">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-95 hover:brightness-100 transition-all duration-300"
                      />
                    </div>

                    {/* Clean Modern Caption */}
                    <p className="mt-3 font-sans text-center text-xs text-neutral-700 italic leading-snug px-1">
                      "{img.caption}"
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Narration Text */}
              <div className="max-w-xl text-center mt-6 px-4">
                <p className="font-serif text-sm sm:text-base text-neutral-300 leading-relaxed italic">
                  "{currentStory.narration}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Bar */}
        <div className="flex items-center justify-between pt-5 border-t border-white/10">
          <button
            onClick={prevSlide}
            aria-label="Previous story chapter"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#181822] border border-white/15 text-neutral-200 text-xs font-sans hover:border-gold-antique hover:text-white transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 text-gold-antique" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Modern Dots Indicator */}
          <div className="flex items-center gap-2">
            {storyData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Jump to story chapter ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? 'w-6 h-2 bg-gold-antique'
                    : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next story chapter"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#181822] border border-white/15 text-neutral-200 text-xs font-sans hover:border-gold-antique hover:text-white transition-all shadow-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 text-gold-antique" />
          </button>
        </div>
      </div>
    </section>
  );
};
