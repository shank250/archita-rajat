import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingEvents } from '../../data/weddingData';
import { Sparkles, Flame, HeartHandshake, Music, UtensilsCrossed, Clock, MapPin, Calendar, Shirt, ExternalLink } from 'lucide-react';

export const ItinerarySection: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>(weddingEvents[0].id);

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

  const getGoogleCalendarUrl = (event: typeof currentEvent) => {
    const title = encodeURIComponent(`${event.title} — Rajat & Archita`);
    const details = encodeURIComponent(`${event.tagline}\nDress Code: ${event.dressCode}\nVenue: ${event.venue.name}, ${event.venue.city}`);
    const location = encodeURIComponent(`${event.venue.name}, ${event.venue.address}, ${event.venue.city}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${event.calendarStartDate}/${event.calendarEndDate}&details=${details}&location=${location}`;
  };

  return (
    <section id="itinerary" className="relative py-20 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#881337] font-bold">
          Celebration Itinerary
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-neutral-900 font-bold mt-1">
          Four Auspicious Celebrations
        </h2>
        <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-1 max-w-lg mx-auto">
          From the sparkle of the ring ceremony to the sacred wedding pheras, join us on every step of our celebration
        </p>
        <div className="w-12 h-0.5 bg-[#881337] rounded-full mx-auto mt-3" />
      </div>

      {/* 4-Day Interactive Event Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {weddingEvents.map((evt) => {
          const isActive = evt.id === selectedEventId;
          return (
            <button
              key={evt.id}
              onClick={() => setSelectedEventId(evt.id)}
              className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-[#881337] text-white border-[#70102E] shadow-md scale-[1.02]'
                  : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/80 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {evt.shortDate}
                  </span>
                  <span className={`text-[10px] font-sans font-medium ${isActive ? 'text-rose-200' : 'text-neutral-400'}`}>
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
          className="bg-white p-6 sm:p-9 rounded-3xl border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-neutral-900"
        >
          {/* Header of Active Event */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-neutral-100">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#881337] font-bold">
                {currentEvent.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-neutral-950 font-bold mt-0.5">
                {currentEvent.title}
              </h3>
              <p className="font-serif text-xs sm:text-sm text-neutral-600 italic mt-1">
                "{currentEvent.tagline}"
              </p>
            </div>

            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-200 text-xs font-sans font-bold shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-[#881337]" />
                <span>{currentEvent.fullDateText}</span>
              </span>
            </div>
          </div>

          {/* Key Event Badges Grid (Time, Venue, Dress Code) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
            {/* Time Card */}
            <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-neutral-200/80">
              <div className="flex items-center gap-2 text-xs font-sans text-neutral-500 font-bold uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5 text-[#881337]" />
                <span>Timing</span>
              </div>
              <p className="font-sans text-sm font-bold text-neutral-900">
                {currentEvent.timeRange}
              </p>
            </div>

            {/* Venue Card */}
            <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-neutral-200/80">
              <div className="flex items-center gap-2 text-xs font-sans text-neutral-500 font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#881337]" />
                <span>Venue</span>
              </div>
              <p className="font-sans text-sm font-bold text-neutral-900 truncate">
                {currentEvent.venue.name}
              </p>
              <p className="font-sans text-[11px] text-neutral-500 truncate mt-0.5">
                {currentEvent.venue.address}, {currentEvent.venue.city}
              </p>
            </div>

            {/* Dress Code Card */}
            <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-neutral-200/80">
              <div className="flex items-center gap-2 text-xs font-sans text-neutral-500 font-bold uppercase tracking-wider mb-1">
                <Shirt className="w-3.5 h-3.5 text-[#881337]" />
                <span>Dress Code</span>
              </div>
              <p className="font-sans text-sm font-bold text-neutral-900">
                {currentEvent.dressCode}
              </p>
            </div>
          </div>

          {/* Timeline of Milestones for this Event */}
          <div className="my-6">
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-400 mb-4">
              Schedule & Highlights
            </h4>

            <div className="space-y-3">
              {currentEvent.milestones.map((ms, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#FAFAFA] hover:bg-neutral-50 border border-neutral-100 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 text-[#881337] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                    {renderIcon(ms.iconName, "w-4 h-4")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-xs font-bold text-[#881337]">
                        {ms.time} {ms.period}
                      </span>
                      <h5 className="font-serif text-sm sm:text-base font-bold text-neutral-950 truncate">
                        {ms.title}
                      </h5>
                    </div>
                    <p className="font-sans text-xs text-neutral-600 mt-0.5 leading-relaxed">
                      {ms.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs for this Event */}
          <div className="pt-5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
            <a
              href={getGoogleCalendarUrl(currentEvent)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-sans font-semibold transition-all shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Add {currentEvent.shortDate} to Google Calendar</span>
            </a>

            <a
              href={currentEvent.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 hover:bg-neutral-50 text-xs font-sans font-semibold text-neutral-700 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#881337]" />
              <span>Directions to {currentEvent.venue.name}</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
