import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventDetails, CoupleProfile } from '../../types/wedding';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import { X, Calendar, Download, ExternalLink, Bell } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDetails;
  couple: CoupleProfile;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  event,
  couple,
}) => {
  const googleCalendarUrl = generateGoogleCalendarUrl(event, couple);

  const handleIcsDownload = () => {
    downloadIcsFile(event, couple);
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative w-full max-w-lg bg-parchment-cream rounded-t-3xl sm:rounded-2xl border-t-2 sm:border-2 border-gold-antique shadow-2xl p-6 text-charcoal-bronze z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close calendar modal"
              className="absolute top-4 right-4 p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-charcoal-bronze transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-crimson-wax text-gold-light flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-amber-950 font-bold">
                  Save to Your Calendar
                </h3>
                <p className="text-xs font-serif text-charcoal-muted">
                  Never miss a moment of the celebration
                </p>
              </div>
            </div>

            {/* Event Summary Box */}
            <div className="my-4 rounded-xl border border-gold-antique/30 bg-amber-50 p-4">
              <p className="font-serif text-base font-bold text-amber-950">
                {couple.ceremonyTitle}
              </p>
              <p className="text-xs font-sans text-amber-800 font-semibold mt-0.5">
                📅 {event.displayDate}
              </p>
              <p className="text-xs font-serif text-charcoal-bronze mt-1">
                ⏰ 6:30 PM IST onwards
              </p>
              <p className="text-xs font-serif text-charcoal-muted mt-0.5">
                📍 {event.venue.name}, {event.venue.city}
              </p>
            </div>

            {/* Calendar Options */}
            <div className="space-y-3 mt-5">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-5 py-3 rounded-xl bg-gradient-to-r from-amber-800 to-amber-950 text-gold-light font-serif text-sm font-semibold shadow-md hover:from-amber-900 hover:to-black transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-gold-antique" />
                  <span>Add to Google Calendar</span>
                </div>
                <Bell className="w-4 h-4 text-gold-light/80" />
              </a>

              <button
                onClick={handleIcsDownload}
                className="flex items-center justify-between w-full px-5 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 border border-gold-antique/40 text-charcoal-bronze font-serif text-sm font-semibold transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-amber-900" />
                  <span>Download .ICS File (Apple & Outlook)</span>
                </div>
                <span className="text-[10px] font-sans uppercase text-charcoal-muted font-bold">
                  .ics
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
