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
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container: Solid Pure White */}
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border border-neutral-200 shadow-2xl p-7 text-neutral-900 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close calendar modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#8E1722] text-white flex items-center justify-center shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-neutral-950 font-bold">
                  Save to Your Calendar
                </h3>
                <p className="text-xs font-sans text-neutral-500">
                  Never miss a moment of the celebration
                </p>
              </div>
            </div>

            {/* Event Summary Box */}
            <div className="my-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="font-serif text-lg font-bold text-neutral-950">
                {couple.ceremonyTitle}
              </p>
              <p className="text-xs font-sans text-[#8E1722] font-semibold mt-1">
                📅 {event.displayDate}
              </p>
              <p className="text-xs font-sans text-neutral-700 mt-1">
                ⏰ 6:30 PM IST onwards
              </p>
              <p className="text-xs font-sans text-neutral-500 mt-0.5">
                📍 {event.venue.name}, {event.venue.city}
              </p>
            </div>

            {/* Calendar Options */}
            <div className="space-y-3 mt-6">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-[#111116] hover:bg-black text-white font-sans text-sm font-semibold shadow-md transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-gold-antique" />
                  <span>Add to Google Calendar</span>
                </div>
                <Bell className="w-4 h-4 text-neutral-400" />
              </a>

              <button
                onClick={handleIcsDownload}
                className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 font-sans text-sm font-semibold transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-neutral-700" />
                  <span>Download .ICS File (Apple & Outlook)</span>
                </div>
                <span className="text-[10px] font-sans uppercase text-neutral-500 font-bold">
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
