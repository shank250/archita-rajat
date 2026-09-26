import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingEvents } from '../../data/weddingData';
import { Sparkles, Flame, HeartHandshake, Music, UtensilsCrossed, Clock, MapPin, Calendar, Shirt, ExternalLink } from 'lucide-react';

export const ItinerarySection: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>(weddingEvents[3].id); // Default to Wedding Day (30 Nov)

  const renderIcon = (name: string, className = "w-4 h-4") => {
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

  const currentEvent = weddingEvents.find((e) => e.id === selectedEventId) || weddingEvents[0];

  return (
    <section id="itinerary" className="relative py-20 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-secondary font-bold">
          Celebration Itinerary
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-primary font-bold mt-1">
          Four Auspicious Celebrations
        </h2>
        <p className="text-xs sm:text-sm font-sans text-text-sub mt-1">
          Timings, venues &amp; ceremony schedule
        </p>
        <div className="w-12 h-0.5 bg-primary rounded-full mx-auto mt-3" />
      </div>

      {/* 4-Day Interactive Event Selector with Organic Borders */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {weddingEvents.map((evt) => {
          const isActive = evt.id === selectedEventId;
          return (
            <button
              key={evt.id}
              onClick={() => setSelectedEventId(evt.id)}
              className={`text-left p-3.5 sm:p-4 rounded-2xl hand-drawn-pill-soft border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-primary text-white border-primary-hover shadow-md scale-[1.02]'
                  : 'bg-card-surface text-text-body border-theme-border hover:border-primary/50 hover:bg-surface-subtle/60 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 hand-drawn-pill ${
                      isActive ? 'bg-white/20 text-white border-white/40' : 'bg-surface-subtle text-primary border-brand-blue/30'
                    }`}
                  >
                    {evt.shortDate}
                  </span>
                  <span className={`text-[10px] font-sans font-medium ${isActive ? 'text-white/90' : 'text-text-sub'}`}>
                    {evt.dayOfWeek}
                  </span>
                </div>

                <h4 className="font-serif text-sm sm:text-base font-bold leading-snug line-clamp-1">
                  {evt.title.split('&')[0].trim()}
                </h4>
              </div>

              <div className="mt-2 pt-2 border-t border-current/10 flex items-center gap-1 text-[11px] truncate">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{evt.venue.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Event Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEvent.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-card-surface p-6 sm:p-9 rounded-3xl border border-theme-border shadow-card-subtle text-text-body"
        >
          {/* Spiritual Header Accent for November 30 Wedding Day */}
          {currentEvent.id === 'wedding' && (
            <div className="w-full flex items-center justify-center gap-2.5 mb-3 select-none">
              <div className="h-[1px] w-8 bg-brand-blue/30" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-brand-blue">
                ॥ शुभ विवाह ॥
              </span>
              <div className="h-[1px] w-8 bg-brand-blue/30" />
            </div>
          )}

          {/* Header of Active Event */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-theme-border">
            <div className="flex-1">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-secondary font-bold">
                {currentEvent.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-primary font-bold mt-0.5">
                {currentEvent.title}
              </h3>
              <p className="font-serif text-xs sm:text-sm text-text-sub italic mt-1">
                "{currentEvent.tagline}"
              </p>
            </div>

            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 hand-drawn-pill bg-surface-subtle text-primary border-brand-blue/30 text-xs font-sans font-bold shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{currentEvent.fullDateText}</span>
              </span>
            </div>
          </div>

          {/* Key Event Badges Grid (Time, Venue, Dress Code) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
            {/* Time Card */}
            <div className="p-4 rounded-2xl bg-surface-subtle border border-theme-border">
              <div className="flex items-center gap-2 text-xs font-sans text-primary font-bold uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Timing</span>
              </div>
              <p className="font-sans text-sm font-bold text-text-body">
                {currentEvent.timeRange}
              </p>
            </div>

            {/* Venue Card */}
            <div className="p-4 rounded-2xl bg-surface-subtle border border-theme-border">
              <div className="flex items-center gap-2 text-xs font-sans text-primary font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Venue</span>
              </div>
              <p className="font-sans text-sm font-bold text-text-body truncate">
                {currentEvent.venue.name}
              </p>
              <p className="font-sans text-[11px] text-text-sub truncate mt-0.5">
                {currentEvent.venue.address}, {currentEvent.venue.city}
              </p>
            </div>

            {/* Dress Code Card */}
            <div className="p-4 rounded-2xl bg-surface-subtle border border-theme-border">
              <div className="flex items-center gap-2 text-xs font-sans text-primary font-bold uppercase tracking-wider mb-1">
                <Shirt className="w-3.5 h-3.5 text-primary" />
                <span>Dress Code</span>
              </div>
              <p className="font-sans text-sm font-bold text-text-body">
                {currentEvent.dressCode}
              </p>
            </div>
          </div>

          {/* Timeline of Milestones for this Event */}
          <div className="my-6">
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-primary mb-4">
              Schedule &amp; Highlights
            </h4>

            <div className="space-y-3">
              {currentEvent.milestones.map((ms, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-3.5 rounded-2xl bg-surface-subtle hover:bg-surface-highlight/40 border border-theme-border transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-surface border border-theme-border text-primary flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
                    {renderIcon(ms.iconName, "w-4 h-4 text-primary")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-xs font-bold text-secondary">
                        {ms.time} {ms.period}
                      </span>
                      <h5 className="font-serif text-sm sm:text-base font-bold text-primary truncate">
                        {ms.title}
                      </h5>
                    </div>
                    <p className="font-sans text-xs text-text-sub mt-0.5 leading-relaxed">
                      {ms.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs for this Event */}
          <div className="pt-5 border-t border-theme-border flex items-center justify-end">
            <a
              href={currentEvent.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 hand-drawn-pill bg-primary hover:bg-primary-hover text-white text-xs font-sans font-bold transition-all shadow-xs cursor-pointer border-brand-blue-hover"
            >
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>Directions to {currentEvent.venue.name}</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
