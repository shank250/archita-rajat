import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { eventData, coupleData } from '../../data/weddingData';
import { VenueModal } from './VenueModal';
import { CalendarModal } from './CalendarModal';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';

export const ActionHub: React.FC = () => {
  const [isVenueOpen, setIsVenueOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <section id="plan-evening" className="relative py-16 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-serif uppercase tracking-[0.3em] text-gold-antique">
          Guest Essentials
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-champagne font-bold mt-1">
          Plan Your Evening
        </h2>
        <p className="text-xs sm:text-sm font-serif italic text-champagne-muted mt-1">
          Quick actions to ensure a smooth celebration journey
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-antique to-transparent mx-auto mt-3" />
      </div>

      {/* 3 High-Affordance Utility Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Save the Date */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsCalendarOpen(true)}
          className="group relative cursor-pointer bg-espresso-surface/90 border border-gold-antique/30 hover:border-gold-antique rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between transition-all"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-crimson-wax text-gold-light flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-champagne font-bold group-hover:text-gold-light transition-colors">
              Save the Date
            </h3>
            <p className="font-serif text-xs text-champagne-muted mt-2 leading-relaxed">
              Sync event schedule with Google Calendar or download .ics for Apple/Outlook.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-gold-antique/20 flex items-center justify-between text-xs font-serif text-gold-antique group-hover:text-gold-light">
            <span className="font-semibold">Add to Calendar</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* Card 2: WhatsApp Community */}
        <motion.a
          href={eventData.whatsappGroupUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="group relative cursor-pointer bg-espresso-surface/90 border border-gold-antique/30 hover:border-gold-antique rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between transition-all"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-champagne font-bold group-hover:text-gold-light transition-colors">
              Join WhatsApp Group
            </h3>
            <p className="font-serif text-xs text-champagne-muted mt-2 leading-relaxed">
              Stay updated with live photos, coordination, and celebratory chatter.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-gold-antique/20 flex items-center justify-between text-xs font-serif text-gold-antique group-hover:text-gold-light">
            <span className="font-semibold">Join Group</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.a>

        {/* Card 3: Venue & Directions */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsVenueOpen(true)}
          className="group relative cursor-pointer bg-espresso-surface/90 border border-gold-antique/30 hover:border-gold-antique rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between transition-all"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-900/80 border border-gold-antique/40 text-gold-light flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-champagne font-bold group-hover:text-gold-light transition-colors">
              Venue & Maps
            </h3>
            <p className="font-serif text-xs text-champagne-muted mt-2 leading-relaxed">
              {eventData.venue.name}, {eventData.venue.city}. Direct navigation in one tap.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-gold-antique/20 flex items-center justify-between text-xs font-serif text-gold-antique group-hover:text-gold-light">
            <span className="font-semibold">View Location</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <VenueModal
        isOpen={isVenueOpen}
        onClose={() => setIsVenueOpen(false)}
        event={eventData}
      />

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        event={eventData}
        couple={coupleData}
      />
    </section>
  );
};
