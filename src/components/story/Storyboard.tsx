import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../../data/weddingData';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 350, damping: 32 },
      opacity: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 350, damping: 32 },
      opacity: { duration: 0.25 },
    },
  }),
};

export const Storyboard: React.FC = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

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

  const currentStory = storyData[page];

  return (
    <section id="our-story" className="relative py-20 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl sm:text-5xl text-primary font-bold mt-1">
          Our Journey Together
        </h2>
        <p className="text-xs sm:text-sm font-sans text-text-sub mt-1">
          The chapters of our love story
        </p>
        <div className="w-12 h-0.5 bg-primary rounded-full mx-auto mt-3" />
      </div>

      {/* Story Carousel Frame: Clean Crisp White Card with Dynamic Touch Drag/Swipe */}
      <div className="relative bg-card-surface border border-theme-border rounded-3xl p-5 sm:p-7 shadow-card-subtle overflow-hidden">
        {/* Carousel Content: Fixed Height */}
        <div className="h-[430px] sm:h-[480px] flex flex-col justify-between py-2 overflow-hidden relative">
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
              dragElastic={0.2}
              onDragEnd={(_, { offset, velocity }) => {
                if (offset.x < -35 || velocity.x < -300) {
                  paginate(1);
                } else if (offset.x > 35 || velocity.x > 300) {
                  paginate(-1);
                }
              }}
              className="w-full h-full flex flex-col justify-between items-center cursor-grab active:cursor-grabbing select-none touch-pan-y"
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

        {/* Dynamic Indicator Dots (Centered & Slidable by Touch) */}
        <div className="flex flex-col items-center justify-center pt-4 border-t border-theme-border">
          <div className="flex items-center gap-2">
            {storyData.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpToPage(i)}
                aria-label={`Jump to photo ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === page
                    ? 'w-7 h-2 bg-primary'
                    : 'w-2 h-2 bg-theme-border hover:bg-primary/40'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-sans text-text-sub mt-2 font-medium tracking-wide">
            Swipe left or right to explore
          </span>
        </div>
      </div>
    </section>
  );
};
