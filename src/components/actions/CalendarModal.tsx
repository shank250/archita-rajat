import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingEvents } from '../../data/weddingData';
import { X, Calendar, Download, ExternalLink, Bell } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedEventId, setSelectedEventId] = useState(weddingEvents[3].id); // default to wedding

  const currentSelectedEvent = weddingEvents.find(e => e.id === selectedEventId) || weddingEvents[3];

  const getGoogleCalUrl = (evt: typeof currentSelectedEvent) => {
    const title = encodeURIComponent(`${evt.title} — Archita & Rajat`);
    const details = encodeURIComponent(`${evt.tagline}\nVenue: ${evt.venue.name}, ${evt.venue.city}\nDress Code: ${evt.dressCode}`);
    const location = encodeURIComponent(`${evt.venue.name}, ${evt.venue.city}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${evt.calendarStartDate}/${evt.calendarEndDate}&details=${details}&location=${location}`;
  };

  const handleDownloadIcs = () => {
    // Generate tailored ICS content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Archita and Rajat Wedding//Event Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${currentSelectedEvent.id}-archita-rajat-2026@wedding.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${currentSelectedEvent.calendarStartDate}`,
      `DTEND:${currentSelectedEvent.calendarEndDate}`,
      `SUMMARY:${currentSelectedEvent.title} - Archita & Rajat`,
      `DESCRIPTION:${currentSelectedEvent.tagline} at ${currentSelectedEvent.venue.name}. Dress Code: ${currentSelectedEvent.dressCode}`,
      `LOCATION:${currentSelectedEvent.venue.name}\\, ${currentSelectedEvent.venue.city}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${currentSelectedEvent.id}-archita-rajat.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container: Clean White Dialog */}
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative w-full max-w-lg bg-card-surface rounded-t-3xl sm:rounded-3xl border border-theme-border shadow-xl p-6 sm:p-7 text-text-body z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close calendar modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-surface-subtle text-text-body flex items-center justify-center shadow-sm">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-primary font-bold">
                  Save to Your Calendar
                </h3>
                <p className="text-xs font-sans text-text-sub">
                  Select an event to add reminder to your calendar
                </p>
              </div>
            </div>

            {/* Event Selector Chips */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {weddingEvents.map((evt) => {
                const isSel = evt.id === selectedEventId;
                return (
                  <button
                    key={evt.id}
                    onClick={() => setSelectedEventId(evt.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSel
                        ? 'bg-primary text-white border-primary-hover shadow-sm'
                        : 'bg-surface text-text-body border-theme-border hover:bg-surface-subtle'
                    }`}
                  >
                    <span className={`text-[10px] font-sans font-bold uppercase block ${isSel ? 'text-accent' : 'text-primary'}`}>
                      {evt.shortDate}
                    </span>
                    <h5 className="font-serif text-xs font-bold leading-tight line-clamp-1 mt-0.5">
                      {evt.title.split('&')[0].trim()}
                    </h5>
                  </button>
                );
              })}
            </div>

            {/* Event Summary Box */}
            <div className="rounded-2xl border border-theme-border bg-surface-subtle p-5">
              <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-secondary">
                {currentSelectedEvent.category}
              </span>
              <p className="font-serif text-xl font-bold text-neutral-950 mt-0.5">
                {currentSelectedEvent.title}
              </p>
              <p className="text-xs font-sans text-neutral-700 font-semibold mt-1">
                📅 {currentSelectedEvent.fullDateText}
              </p>
              <p className="text-xs font-sans text-neutral-600 mt-1">
                ⏰ {currentSelectedEvent.timeRange}
              </p>
              <p className="text-xs font-sans text-neutral-500 mt-1">
                📍 {currentSelectedEvent.venue.name}, {currentSelectedEvent.venue.city}
              </p>
            </div>

            {/* Calendar Options */}
            <div className="space-y-3 mt-6">
              <a
                href={getGoogleCalUrl(currentSelectedEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-5 py-3 rounded-full bg-neutral-900 hover:bg-black text-white font-sans text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                  <span>Add to Google Calendar</span>
                </div>
                <Bell className="w-4 h-4 text-neutral-400" />
              </a>

              <button
                onClick={handleDownloadIcs}
                className="flex items-center justify-between w-full px-5 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 font-sans text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-neutral-600" />
                  <span>Download .ICS (Apple & Outlook)</span>
                </div>
                <span className="text-[10px] font-sans uppercase text-neutral-500 font-bold">
                  All Devices
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
