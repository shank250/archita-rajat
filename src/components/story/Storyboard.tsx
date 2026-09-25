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
      <div className="text-center mb-10">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#881337] font-bold">
          Chapter by Chapter
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-neutral-900 font-bold mt-1">
          Our Journey Together
        </h2>
        <div className="w-12 h-0.5 bg-[#881337] rounded-full mx-auto mt-3" />
      </div>

      {/* Story Carousel Frame: Clean Solid White Card */}
      <div className="relative bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        
        {/* Top Badges & Chapter Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-neutral-100">
          <span className="px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-sans font-bold shadow-sm">
            {currentStory.chapterBadge}
          </span>
          <span className="text-xs font-sans text-neutral-400 font-semibold tracking-wider uppercase">
            {currentIndex + 1} of {storyData.length}
          </span>
        </div>

        {/* Carousel Content Animated with AnimatePresence */}
        <div className="min-h-[580px] sm:min-h-[640px] flex flex-col justify-between py-6">
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
                <h3 className="font-serif text-2xl sm:text-4xl text-neutral-900 font-bold">
                  {currentStory.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-1 font-medium">
                  {currentStory.subtitle}
                </p>
              </div>

              {/* Photos Grid (Material Rounded Polaroid Cards) */}
              <div className="flex flex-wrap items-center justify-center gap-6 my-4 w-full">
                {currentStory.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02, rotate: 0 }}
                    style={{ transform: `rotate(${img.rotation || 0}deg)` }}
                    className="relative bg-[#FAFAFA] p-3.5 sm:p-4 rounded-3xl shadow-sm border border-neutral-200/80 max-w-[270px] sm:max-w-[310px] w-full transition-transform duration-300"
                  >
                    {/* Clean Image Viewport accommodating tall vertical portraits fully */}
                    <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-neutral-100/90 relative flex items-center justify-center p-2">
                      {/* Ambient background blur for gallery depth */}
                      <img
                        src={img.src}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-20 scale-110 pointer-events-none"
                      />
                      {/* Full uncapped photo - 100% visible */}
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain object-center rounded-xl shadow-xs filter contrast-[1.02] brightness-98 hover:brightness-100 transition-all duration-300"
                      />
                    </div>

                    {/* Friendly Caption */}
                    <p className="mt-3 font-sans text-center text-xs text-neutral-700 font-medium leading-snug px-1">
                      "{img.caption}"
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Narration Text */}
              <div className="max-w-xl text-center mt-6 px-4">
                <p className="font-serif text-sm sm:text-base text-neutral-700 leading-relaxed italic">
                  "{currentStory.narration}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Bar */}
        <div className="flex items-center justify-between pt-5 border-t border-neutral-100">
          <button
            onClick={prevSlide}
            aria-label="Previous story chapter"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-sans font-semibold transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-600" />
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
                    ? 'w-6 h-2 bg-neutral-900'
                    : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next story chapter"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-sans font-semibold transition-all shadow-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          </button>
        </div>
      </div>
    </section>
  );
};
