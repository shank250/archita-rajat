import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { itineraryData } from '../../data/weddingData';
import { Sparkles, Flame, HeartHandshake, Music, UtensilsCrossed, Clock } from 'lucide-react';

export const ItinerarySection: React.FC = () => {
  const [selectedId, setSelectedId] = useState(itineraryData[0].id);

  // Icon mapping helper
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
    <section id="itinerary" className="relative py-16 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-serif uppercase tracking-[0.3em] text-gold-antique">
          Order of Celebrations
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-champagne font-bold mt-1">
          The Evening Unfolds
        </h2>
        <p className="text-xs sm:text-sm font-serif italic text-champagne-muted mt-1">
          Explore each milestone of the evening by tapping the timeline nodes below
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-antique to-transparent mx-auto mt-3" />
      </div>

      {/* Horizontal Time Scrubber Track */}
      <div className="relative py-4 px-2 mb-8 overflow-x-auto no-scrollbar">
        {/* Continuous Golden Track Line */}
        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-gradient-to-r from-gold-antique/20 via-gold-antique/60 to-gold-antique/20 pointer-events-none" />

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
                  className={`text-[11px] font-sans font-semibold mb-2 px-2.5 py-0.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? 'bg-crimson-wax text-gold-light border-gold-antique shadow-gold-glow scale-105'
                      : 'bg-espresso-surface text-champagne-muted border-gold-antique/30 group-hover:border-gold-antique'
                  }`}
                >
                  {item.time} {item.period}
                </span>

                {/* Circular Golden Node */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-gold-antique text-espresso shadow-gold-glow scale-125'
                      : 'bg-espresso-light border-2 border-gold-antique/50 text-gold-antique group-hover:border-gold-antique'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current" />
                </div>

                {/* Milestone Short Title below */}
                <span
                  className={`text-[10px] font-serif mt-2 max-w-[80px] text-center truncate transition-colors ${
                    isActive ? 'text-gold-light font-bold' : 'text-champagne-muted'
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
            transition={{ duration: 0.35 }}
            className="relative bg-parchment-cream p-6 sm:p-8 rounded-2xl border-2 border-gold-antique/40 shadow-parchment text-charcoal-bronze overflow-hidden"
          >
            {/* Subtle background motif */}
            <div className="absolute top-2 right-4 text-amber-900/10 text-6xl font-serif pointer-events-none">
              {selectedItem.time}
            </div>

            {/* Event Header */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-xl bg-crimson-wax text-gold-light flex items-center justify-center shadow-md flex-shrink-0">
                {renderIcon(selectedItem.iconName, "w-6 h-6")}
              </div>
              <div>
                <span className="text-xs font-sans uppercase tracking-widest text-amber-800 font-semibold">
                  {selectedItem.time} {selectedItem.period}
                </span>
                <h3 className="font-serif text-2xl text-amber-950 font-bold leading-tight">
                  {selectedItem.title}
                </h3>
              </div>
            </div>

            {/* Subtitle / Theme */}
            <p className="font-serif text-sm italic text-amber-900 font-medium mb-3">
              ✨ {selectedItem.subtitle}
            </p>

            {/* Detailed Description */}
            <p className="font-serif text-sm sm:text-base text-charcoal-bronze leading-relaxed">
              {selectedItem.description}
            </p>

            {/* Next Milestone preview button if available */}
            <div className="mt-5 pt-4 border-t border-gold-antique/20 flex items-center justify-between text-xs font-serif text-charcoal-muted">
              <span>Selected Program Segment</span>
              <button
                onClick={() => {
                  const currIdx = itineraryData.findIndex((i) => i.id === selectedItem.id);
                  const nextIdx = (currIdx + 1) % itineraryData.length;
                  setSelectedId(itineraryData[nextIdx].id);
                }}
                className="text-amber-900 hover:text-amber-950 font-semibold underline flex items-center gap-1"
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
