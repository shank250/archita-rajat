import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { itineraryData } from '../../data/weddingData';
import { Sparkles, Flame, HeartHandshake, Music, UtensilsCrossed, Clock } from 'lucide-react';

export const ItinerarySection: React.FC = () => {
  const [selectedId, setSelectedId] = useState(itineraryData[0].id);

  const renderIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'HeartHandshake':
        return <HeartHandshake className={className} />;
      case 'Music':
        return <Music className={className} />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className={className} />;
      default:
        return <Clock className={className} />;
    }
  };

  const selectedItem = itineraryData.find((item) => item.id === selectedId) || itineraryData[0];

  return (
    <section id="itinerary" className="relative py-20 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#881337] font-bold">
          Order of Celebrations
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-neutral-900 font-bold mt-1">
          The Evening Unfolds
        </h2>
        <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-1">
          Explore each milestone of the evening by tapping the schedule nodes below
        </p>
        <div className="w-12 h-0.5 bg-[#881337] rounded-full mx-auto mt-3" />
      </div>

      {/* Horizontal Time Scrubber Track */}
      <div className="relative py-4 px-2 mb-8 overflow-x-auto no-scrollbar">
        {/* Track Line */}
        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-neutral-200 pointer-events-none" />

        <div className="flex items-center justify-between min-w-[500px] sm:min-w-0 sm:justify-around px-4">
          {itineraryData.map((item) => {
            const isActive = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className="group relative flex flex-col items-center focus:outline-none transition-transform active:scale-95"
              >
                {/* Node Pill with Time */}
                <span
                  className={`text-xs font-sans font-bold mb-2 px-3.5 py-1 rounded-full border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#881337] text-white border-[#881337] shadow-sm scale-105'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {item.time} {item.period}
                </span>

                {/* Circular Node */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#881337] text-white shadow-sm scale-110'
                      : 'bg-white border-2 border-neutral-300 text-neutral-400 group-hover:border-[#881337]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current" />
                </div>

                {/* Milestone Short Title below */}
                <span
                  className={`text-xs font-sans mt-2.5 max-w-[85px] text-center truncate transition-colors font-medium ${
                    isActive ? 'text-neutral-900 font-bold' : 'text-neutral-400'
                  }`}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Event Showcase Card */}
      <div className="max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedItem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white p-7 sm:p-9 rounded-3xl border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-neutral-900 overflow-hidden"
          >
            {/* Event Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-800 flex items-center justify-center shadow-sm flex-shrink-0">
                {renderIcon(selectedItem.iconName, "w-6 h-6")}
              </div>
              <div>
                <span className="text-xs font-sans uppercase tracking-widest text-[#881337] font-bold">
                  {selectedItem.time} {selectedItem.period}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-bold leading-tight">
                  {selectedItem.title}
                </h3>
              </div>
            </div>

            {/* Subtitle */}
            <p className="font-sans text-xs sm:text-sm font-semibold text-neutral-500 mb-3">
              ✦ {selectedItem.subtitle}
            </p>

            {/* Detailed Description */}
            <p className="font-sans text-sm sm:text-base text-neutral-700 leading-relaxed">
              {selectedItem.description}
            </p>

            {/* Next Milestone preview button */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-sans text-neutral-500">
              <span>Program Segment</span>
              <button
                onClick={() => {
                  const currIdx = itineraryData.findIndex((i) => i.id === selectedItem.id);
                  const nextIdx = (currIdx + 1) % itineraryData.length;
                  setSelectedId(itineraryData[nextIdx].id);
                }}
                className="text-[#881337] hover:underline font-bold flex items-center gap-1"
              >
                <span>Next Milestone →</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
