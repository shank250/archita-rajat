import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../../data/weddingData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 160 : -160,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 32 },
      opacity: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -160 : 160,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 32 },
      opacity: { duration: 0.2 },
    },
  }),
};

export const Storyboard: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const paginate = (newDirection: number) => {
    setPage(([prevPage]) => {
      let nextPage = prevPage + newDirection;
      if (nextPage < 0) nextPage = storyData.length - 1;
      if (nextPage >= storyData.length) nextPage = 0;
      return [nextPage, newDirection];
    });
  };

  const jumpToPage = (index: number) => {
    setPage(([prevPage]) => [index, index > prevPage ? 1 : -1]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    // Trigger swipe only when horizontal gesture is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        paginate(1); // Swipe left -> Next
      } else {
        paginate(-1); // Swipe right -> Previous
      }
    }
  };

  const currentStory = storyData[page];
  const currentImage = currentStory.images[0];

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
        <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-1">
          Swipe left or right to explore each chapter of our journey
        </p>
        <div className="w-12 h-0.5 bg-[#881337] rounded-full mx-auto mt-3" />
      </div>

      {/* Story Carousel Frame: Clean Solid White Card with Touch Swipe Support */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative bg-white border border-neutral-200/90 rounded-3xl p-5 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden"
      >
        {/* Top Badges & Chapter Indicator */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <span className="px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-sans font-bold shadow-sm">
            {currentStory.chapterBadge}
          </span>
          <span className="text-xs font-sans text-neutral-400 font-semibold tracking-wider uppercase">
            {page + 1} of {storyData.length}
          </span>
        </div>

        {/* Carousel Content: Exactly Fixed Height (Zero Layout Shifts) */}
        <div className="h-[520px] sm:h-[580px] flex flex-col justify-between py-2 overflow-hidden relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, { offset, velocity }) => {
                if (offset.x < -35 || velocity.x < -350) {
                  paginate(1);
                } else if (offset.x > 35 || velocity.x > 350) {
                  paginate(-1);
                }
              }}
              className="w-full h-full flex flex-col justify-between items-center cursor-grab active:cursor-grabbing select-none"
            >
              {/* Story Title & Subtitle: Uniform 54px Header Box */}
              <div className="text-center h-14 flex flex-col justify-center w-full">
                <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-bold truncate">
                  {currentStory.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-neutral-500 font-medium truncate mt-0.5">
                  {currentStory.subtitle}
                </p>
              </div>

              {/* Photo Viewport: Uniform Fixed Height for All Photos */}
              <div className="relative bg-[#FAFAFA] p-3 sm:p-3.5 rounded-3xl shadow-sm border border-neutral-200/80 max-w-[270px] sm:max-w-[310px] w-full mx-auto my-auto transition-transform">
                <div className="w-full h-72 sm:h-88 rounded-2xl overflow-hidden bg-neutral-100/90 relative flex items-center justify-center p-2">
                  {/* Ambient background blur */}
                  <img
                    src={currentImage.src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-110 pointer-events-none"
                  />
                  {/* Full uncapped photo: 100% visible with object-contain */}
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    draggable={false}
                    className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain object-center rounded-xl shadow-xs filter contrast-[1.02] brightness-98 hover:brightness-100 transition-all duration-300 pointer-events-none"
                  />
                </div>

                {/* Single-line Friendly Caption */}
                <p className="mt-2.5 font-sans text-center text-xs text-neutral-700 font-medium leading-tight truncate px-1">
                  "{currentImage.caption}"
                </p>
              </div>

              {/* Narration Box: Uniform 40px Footer Box */}
              <div className="h-10 flex items-center justify-center max-w-lg text-center px-4 w-full">
                <p className="font-serif text-xs sm:text-sm text-neutral-700 leading-snug italic line-clamp-2">
                  "{currentStory.narration}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous story photo"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-sans font-semibold transition-all shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-600" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Dots Indicator & Swipe Hint */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              {storyData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => jumpToPage(i)}
                  aria-label={`Jump to photo ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === page
                      ? 'w-6 h-2 bg-[#881337]'
                      : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-sans text-neutral-400 font-medium hidden sm:inline">
              Swipe or drag to browse
            </span>
          </div>

          <button
            onClick={() => paginate(1)}
            aria-label="Next story photo"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-sans font-semibold transition-all shadow-sm cursor-pointer"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          </button>
        </div>
      </div>
    </section>
  );
};
