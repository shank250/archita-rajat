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
    <section id="plan-evening" className="relative py-20 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-antique font-semibold">
          Guest Essentials
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal mt-1">
          Plan Your Evening
        </h2>
        <p className="text-xs sm:text-sm font-sans text-neutral-400 mt-1">
          Quick actions to ensure a seamless celebration journey
        </p>
        <div className="w-12 h-0.5 bg-gold-antique/60 mx-auto mt-3" />
      </div>

      {/* 3 Modern Solid Utility Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Save the Date */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsCalendarOpen(true)}
          className="group relative cursor-pointer bg-[#121218] border border-white/10 hover:border-gold-antique/60 rounded-3xl p-7 shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#8E1722] text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold group-hover:text-gold-light transition-colors">
              Save the Date
            </h3>
            <p className="font-sans text-xs text-neutral-400 mt-2 leading-relaxed">
              Sync event schedule with Google Calendar or download .ics for Apple/Outlook.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-gold-light group-hover:text-white">
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
          className="group relative cursor-pointer bg-[#121218] border border-white/10 hover:border-emerald-500/60 rounded-3xl p-7 shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#0D6E42] text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold group-hover:text-emerald-300 transition-colors">
              Join WhatsApp Group
            </h3>
            <p className="font-sans text-xs text-neutral-400 mt-2 leading-relaxed">
              Stay updated with live photos, coordination, and celebratory chatter.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-emerald-400 group-hover:text-emerald-300">
            <span className="font-semibold">Join Group</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.a>

        {/* Card 3: Venue & Directions */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsVenueOpen(true)}
          className="group relative cursor-pointer bg-[#121218] border border-white/10 hover:border-gold-antique/60 rounded-3xl p-7 shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#9B6E16] text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold group-hover:text-gold-light transition-colors">
              Venue & Maps
            </h3>
            <p className="font-sans text-xs text-neutral-400 mt-2 leading-relaxed">
              {eventData.venue.name}, {eventData.venue.city}. Direct navigation in one tap.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-gold-light group-hover:text-white">
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
