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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer / Modal Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative w-full max-w-lg bg-parchment-cream rounded-t-3xl sm:rounded-2xl border-t-2 sm:border-2 border-gold-antique shadow-2xl p-6 text-charcoal-bronze z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close venue modal"
              className="absolute top-4 right-4 p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-charcoal-bronze transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-crimson-wax text-gold-light flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-amber-950 font-bold">
                  Venue & Directions
                </h3>
                <p className="text-xs font-serif text-charcoal-muted">
                  Navigate seamlessly to the celebration
                </p>
              </div>
            </div>

            {/* Venue Card Visual Preview */}
            <div className="my-4 rounded-xl overflow-hidden border border-gold-antique/30 bg-amber-100/50 p-4">
              <h4 className="font-serif text-lg font-bold text-amber-900">
                {event.venue.name}
              </h4>
              <p className="text-xs font-sans text-amber-800 font-medium">
                {event.venue.tagline}
              </p>
              <p className="text-xs sm:text-sm font-serif text-charcoal-bronze mt-2 leading-relaxed">
                📍 {event.venue.address}, {event.venue.landmark ? `${event.venue.landmark}, ` : ''}{event.venue.city}
              </p>
              <p className="text-xs font-serif text-charcoal-muted mt-2 italic">
                Ample valet parking & dedicated hospitality team available on arrival.
              </p>
            </div>

            {/* Direct Map Action Buttons */}
            <div className="space-y-3 mt-6">
              <a
                href={event.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-5 py-3 rounded-xl bg-gradient-to-r from-amber-800 to-amber-950 text-gold-light font-serif text-sm font-semibold shadow-md hover:from-amber-900 hover:to-black transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-gold-antique" />
                  <span>Open in Google Maps</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gold-light/70" />
              </a>

              <a
                href={event.venue.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-5 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 border border-gold-antique/40 text-charcoal-bronze font-serif text-sm font-semibold transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-900" />
                  <span>Open in Apple Maps</span>
                </div>
                <ExternalLink className="w-4 h-4 text-charcoal-muted" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
