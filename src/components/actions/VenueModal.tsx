import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { venuesList } from '../../data/weddingData';
import { X, MapPin, Navigation, ExternalLink, Building2, Home, Landmark } from 'lucide-react';

interface VenueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VenueModal: React.FC<VenueModalProps> = ({ isOpen, onClose }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const getVenueIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Landmark className="w-5 h-5 text-[#881337]" />;
      case 1:
        return <Building2 className="w-5 h-5 text-[#881337]" />;
      default:
        return <Home className="w-5 h-5 text-[#881337]" />;
    }
  };

  const currentVenue = venuesList[selectedIdx];

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
            className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border border-neutral-200 shadow-xl p-6 sm:p-7 text-neutral-900 z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close venue modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 text-neutral-800 flex items-center justify-center shadow-sm">
                <MapPin className="w-5 h-5 text-[#881337]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-neutral-950 font-bold">
                  Venues & Locations
                </h3>
                <p className="text-xs font-sans text-neutral-500">
                  Select a venue to get one-tap turn-by-turn directions
                </p>
              </div>
            </div>

            {/* Venue Selector Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 mb-5 no-scrollbar">
              {venuesList.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIdx(i)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedIdx === i
                      ? 'bg-[#881337] text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70'
                  }`}
                >
                  <span>{v.name.split('(')[0].trim()}</span>
                </button>
              ))}
            </div>

            {/* Active Venue Detail Card */}
            <div className="rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
                  {getVenueIcon(selectedIdx)}
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-neutral-950">
                    {currentVenue.name}
                  </h4>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#881337]">
                    {currentVenue.type}
                  </span>
                </div>
              </div>

              <p className="text-xs font-sans font-semibold text-neutral-700 mt-2">
                ✦ {currentVenue.tagline}
              </p>

              <p className="text-xs sm:text-sm font-sans text-neutral-600 mt-2 leading-relaxed">
                📍 {currentVenue.address}, {currentVenue.landmark ? `${currentVenue.landmark}, ` : ''}{currentVenue.city}
              </p>

              <p className="text-[11px] font-sans text-neutral-400 mt-3 pt-2.5 border-t border-neutral-200/70">
                Hospitality team & valet assistance available on arrival.
              </p>
            </div>

            {/* Direct Map Action Buttons for Selected Venue */}
            <div className="space-y-2.5 mt-5">
              <a
                href={currentVenue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-5 py-3 rounded-full bg-neutral-900 hover:bg-black text-white font-sans text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>Open {currentVenue.name.split('(')[0].trim()} in Google Maps</span>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400" />
              </a>

              <a
                href={currentVenue.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-5 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 font-sans text-xs sm:text-sm font-semibold transition-all"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-600" />
                  <span>Open in Apple Maps</span>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-500" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
