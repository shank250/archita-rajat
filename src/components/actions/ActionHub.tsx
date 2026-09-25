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
      <div className="text-center mb-10">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#C5221F] font-bold">
          Guest Essentials
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#202124] font-bold mt-1">
          Plan Your Evening
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[#5F6368] mt-1">
          Quick actions to ensure a seamless celebration journey
        </p>
        <div className="w-12 h-1 bg-[#C5221F] rounded-full mx-auto mt-3" />
      </div>

      {/* 3 Material 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Save the Date */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsCalendarOpen(true)}
          className="group relative cursor-pointer bg-white border border-[#EBE6DC] rounded-3xl p-7 shadow-google-card hover:shadow-google-elevated flex flex-col justify-between transition-all"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#FCE8E6] text-[#EA4335] flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#202124] font-bold group-hover:text-[#EA4335] transition-colors">
              Save the Date
            </h3>
            <p className="font-sans text-xs text-[#5F6368] mt-2 leading-relaxed">
              Add event directly to Google Calendar or download .ics for Apple/Outlook.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#F0EBE1] flex items-center justify-between text-xs font-sans text-[#EA4335] font-bold">
            <span>Add to Calendar</span>
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
          className="group relative cursor-pointer bg-white border border-[#EBE6DC] rounded-3xl p-7 shadow-google-card hover:shadow-google-elevated flex flex-col justify-between transition-all"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#E6F4EA] text-[#137333] flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#202124] font-bold group-hover:text-[#137333] transition-colors">
              WhatsApp Group
            </h3>
            <p className="font-sans text-xs text-[#5F6368] mt-2 leading-relaxed">
              Stay updated with live photos, coordination, and celebratory chatter.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#F0EBE1] flex items-center justify-between text-xs font-sans text-[#137333] font-bold">
            <span>Join Group</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.a>

        {/* Card 3: Venue & Directions */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsVenueOpen(true)}
          className="group relative cursor-pointer bg-white border border-[#EBE6DC] rounded-3xl p-7 shadow-google-card hover:shadow-google-elevated flex flex-col justify-between transition-all"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#202124] font-bold group-hover:text-[#1A73E8] transition-colors">
              Venue & Maps
            </h3>
            <p className="font-sans text-xs text-[#5F6368] mt-2 leading-relaxed">
              {eventData.venue.name}, {eventData.venue.city}. Direct navigation in one tap.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#F0EBE1] flex items-center justify-between text-xs font-sans text-[#1A73E8] font-bold">
            <span>View Location</span>
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
