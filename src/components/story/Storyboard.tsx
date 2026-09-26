import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../../data/weddingData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
    },
  }),
};

export const Storyboard: React.FC = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const paginate = (newDirection: number) => {
    let nextIndex = page + newDirection;
    if (nextIndex < 0) nextIndex = storyData.length - 1;
    if (nextIndex >= storyData.length) nextIndex = 0;
    setPage([nextIndex, newDirection]);
  };

  const jumpToPage = (index: number) => {
    const newDir = index > page ? 1 : -1;
    setPage([index, newDir]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (diff > 50) {
        paginate(1); // Swipe left -> Next
      } else if (diff < -50) {
        paginate(-1); // Swipe right -> Previous
      }
    }
  };

  const currentStory = storyData[page];

  return (
    <section id="our-story" className="relative py-20 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-secondary font-bold">
          Chapter by Chapter
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-primary font-bold mt-1">
          Our Journey Together
        </h2>
        <p className="text-xs sm:text-sm font-sans text-text-sub mt-1">
          The chapters of our love story
        </p>
        <div className="w-12 h-0.5 bg-primary rounded-full mx-auto mt-3" />
      </div>

      {/* Story Carousel Frame: Clean Solid Card with Touch Swipe Support */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative bg-surface border border-theme-border rounded-3xl p-5 sm:p-8 shadow-card-subtle overflow-hidden"
      >
        {/* Top Badges & Chapter Indicator */}
        <div className="flex items-center justify-between pb-4 border-b border-theme-border">
          <span className="px-4 py-1.5 rounded-full bg-surface-subtle text-primary border border-theme-border text-xs font-sans font-bold shadow-xs">
            {currentStory.chapterBadge}
          </span>
          <span className="text-xs font-sans text-text-sub font-semibold tracking-wider uppercase">
            {page + 1} of {storyData.length}
          </span>
        </div>

        {/* Carousel Content: Fixed Height */}
        <div className="h-[440px] sm:h-[490px] flex flex-col justify-between py-2 overflow-hidden relative">
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
              {/* Story Title & Subtitle: Uniform Header Box */}
              <div className="text-center h-14 flex flex-col justify-center w-full">
                <h3 className="font-serif text-2xl sm:text-3xl text-primary font-bold truncate">
                  {currentStory.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-text-sub font-medium truncate mt-0.5">
                  {currentStory.subtitle}
                </p>
              </div>

              {/* Photo Viewport: Dual Photos (Chapter 1) or Single Photo (Chapter 2 & 3) */}
              {currentStory.images.length === 2 ? (
                /* Dual Childhood Photos Side-by-Side on the Same Frame */
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-[540px] w-full mx-auto my-auto">
                  {currentStory.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative bg-surface-subtle p-2 sm:p-3 rounded-3xl shadow-xs border border-theme-border w-full"
                    >
                      <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-surface relative flex items-center justify-center p-2">
                        {/* 100% visible portrait */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          draggable={false}
                          className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain object-center rounded-xl shadow-xs pointer-events-none"
                        />
                      </div>
                      {img.caption && (
                        <p className="mt-2 font-sans text-center text-xs sm:text-sm text-primary font-bold tracking-wide leading-tight truncate px-1">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Single Couple Photo Centered */
                <div className="relative bg-surface-subtle p-2.5 sm:p-3.5 rounded-3xl shadow-xs border border-theme-border max-w-[270px] sm:max-w-[310px] w-full mx-auto my-auto">
                  <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-surface relative flex items-center justify-center p-2">
                    {/* 100% visible portrait */}
                    <img
                      src={currentStory.images[0].src}
                      alt={currentStory.images[0].alt}
                      draggable={false}
                      className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain object-center rounded-xl shadow-xs pointer-events-none"
                    />
                  </div>
                  <p className="mt-2.5 font-sans text-center text-xs text-text-body font-medium leading-tight truncate px-1">
                    "{currentStory.images[0].caption}"
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-theme-border">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous story photo"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface hover:bg-surface-subtle border border-theme-border text-primary text-xs font-sans font-semibold transition-all shadow-xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-primary" />
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
                      ? 'w-6 h-2 bg-primary'
                      : 'w-2 h-2 bg-theme-border hover:bg-primary/40'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => paginate(1)}
            aria-label="Next story photo"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface hover:bg-surface-subtle border border-theme-border text-primary text-xs font-sans font-semibold transition-all shadow-xs cursor-pointer"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};
