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
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#C5221F] font-bold">
          Chapter by Chapter
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#202124] font-bold mt-1">
          Our Journey Together
        </h2>
        <div className="w-12 h-1 bg-[#C5221F] rounded-full mx-auto mt-3" />
      </div>

      {/* Story Carousel Frame: Clean White Google Material Card */}
      <div className="relative bg-white border border-[#EBE6DC] rounded-3xl p-6 sm:p-10 shadow-google-card">
        
        {/* Top Badges & Chapter Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-[#F0EBE1]">
          <span className="px-4 py-1.5 rounded-full bg-[#FEF3D6] text-[#B45309] border border-[#FDE68A] text-xs font-sans font-bold shadow-sm">
            {currentStory.chapterBadge}
          </span>
          <span className="text-xs font-sans text-[#5F6368] font-semibold tracking-wider uppercase">
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
                <h3 className="font-serif text-2xl sm:text-4xl text-[#202124] font-bold">
                  {currentStory.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#5F6368] mt-1 font-medium">
                  {currentStory.subtitle}
                </p>
              </div>

              {/* Photos Grid (Material Rounded Polaroid Cards) */}
              <div className="flex flex-wrap items-center justify-center gap-6 my-4 w-full">
                {currentStory.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03, rotate: 0 }}
                    style={{ transform: `rotate(${img.rotation || 0}deg)` }}
                    className="relative bg-[#FDFBF7] p-3.5 sm:p-4 rounded-3xl shadow-md border border-[#E8E2D5] max-w-[260px] sm:max-w-[280px] w-full transition-transform duration-300"
                  >
                    {/* Clean Image Viewport */}
                    <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-neutral-100 shadow-inner">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-98 hover:brightness-100 transition-all duration-300"
                      />
                    </div>

                    {/* Friendly Caption */}
                    <p className="mt-3 font-sans text-center text-xs text-[#3C4043] font-medium leading-snug px-1">
                      "{img.caption}"
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Narration Text */}
              <div className="max-w-xl text-center mt-6 px-4">
                <p className="font-serif text-sm sm:text-base text-[#3C4043] leading-relaxed italic">
                  "{currentStory.narration}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Bar */}
        <div className="flex items-center justify-between pt-5 border-t border-[#F0EBE1]">
          <button
            onClick={prevSlide}
            aria-label="Previous story chapter"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F8F9FA] hover:bg-[#F1F3F4] border border-[#E8E2D5] text-[#3C4043] text-xs font-sans font-semibold transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 text-[#C5221F]" />
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
                    ? 'w-6 h-2 bg-[#C5221F]'
                    : 'w-2 h-2 bg-[#DDD8CE] hover:bg-[#BDB7AB]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next story chapter"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F8F9FA] hover:bg-[#F1F3F4] border border-[#E8E2D5] text-[#3C4043] text-xs font-sans font-semibold transition-all shadow-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 text-[#C5221F]" />
          </button>
        </div>
      </div>
    </section>
  );
};
