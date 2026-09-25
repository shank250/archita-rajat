import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventDetails } from '../../types/wedding';
import { X, MapPin, Navigation, ExternalLink } from 'lucide-react';

interface VenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDetails;
}

export const VenueModal: React.FC<VenueModalProps> = ({ isOpen, onClose, event }) => {
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

          {/* Drawer / Modal Container: Solid Pure White */}
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border border-neutral-200 shadow-2xl p-7 text-neutral-900 z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close venue modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#9B6E16] text-white flex items-center justify-center shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-neutral-950 font-bold">
                  Venue & Directions
                </h3>
                <p className="text-xs font-sans text-neutral-500">
                  Navigate seamlessly to the celebration
                </p>
              </div>
            </div>

            {/* Venue Card Visual Preview */}
            <div className="my-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <h4 className="font-serif text-xl font-bold text-neutral-950">
                {event.venue.name}
              </h4>
              <p className="text-xs font-sans text-neutral-600 font-medium">
                {event.venue.tagline}
              </p>
              <p className="text-xs sm:text-sm font-sans text-neutral-700 mt-2.5 leading-relaxed">
                📍 {event.venue.address}, {event.venue.landmark ? `${event.venue.landmark}, ` : ''}{event.venue.city}
              </p>
              <p className="text-xs font-sans text-neutral-500 mt-2">
                Ample valet parking & hospitality team available on arrival.
              </p>
            </div>

            {/* Direct Map Action Buttons */}
            <div className="space-y-3 mt-6">
              <a
                href={event.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-[#111116] hover:bg-black text-white font-sans text-sm font-semibold shadow-md transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-gold-antique" />
                  <span>Open in Google Maps</span>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400" />
              </a>

              <a
                href={event.venue.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 font-sans text-sm font-semibold transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-neutral-700" />
                  <span>Open in Apple Maps</span>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
