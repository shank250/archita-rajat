import React from 'react';
import { motion } from 'framer-motion';
import { FiligreeBorder } from '../common/FiligreeBorder';
import { useGuest } from '../../context/GuestContext';
import { coupleData, eventData } from '../../data/weddingData';
import { ChevronDown, Sparkles } from 'lucide-react';

export const FormalCard: React.FC = () => {
  const { guestName, isPersonalized } = useGuest();

  return (
    <section id="formal-invitation" className="relative py-16 px-4 max-w-xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <FiligreeBorder variant="parchment" className="text-center">
          {/* Header Auspicious Emblem */}
          <div className="flex justify-center mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-gold-antique/50 flex items-center justify-center text-gold-antique shadow-sm">
              <Sparkles className="w-5 h-5 text-gold-antique" />
            </div>
          </div>

          <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-neutral-500 font-semibold mb-2">
            Auspicious Invitation
          </p>

          {/* Dynamic Personalized Salutation */}
          <div className="my-4 pb-4 border-b border-neutral-200">
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-semibold">
              {isPersonalized ? `Respected ${guestName},` : `Respected Family & Friends,`}
            </h2>
            <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-1">
              Together with our families, we seek your esteemed presence and heartfelt blessings.
            </p>
          </div>

          {/* Formal Host Copy */}
          <div className="space-y-4 my-6 font-serif text-sm sm:text-base text-neutral-800 leading-relaxed px-2 sm:px-6">
            <p>
              With the celestial blessings of the Almighty and our respected elders,
              <br />
              <strong className="text-neutral-950 font-bold text-base sm:text-lg">{coupleData.groom.parents}</strong>
              <br />
              <span className="text-xs font-sans text-neutral-500">
                (Grandson of {coupleData.groom.grandparents})
              </span>
            </p>

            <p className="text-xs text-neutral-400 uppercase tracking-widest font-sans font-medium">
              along with
            </p>

            <p>
              <strong className="text-neutral-950 font-bold text-base sm:text-lg">{coupleData.bride.parents}</strong>
              <br />
              <span className="text-xs font-sans text-neutral-500">
                (Granddaughter of {coupleData.bride.grandparents})
              </span>
            </p>

            <p className="pt-2 text-neutral-600 font-sans text-xs">
              cordially invite you to celebrate the joyous
            </p>

            <div className="py-2">
              <span className="inline-block px-5 py-1.5 rounded-full bg-amber-50 border border-gold-antique/50 text-amber-900 font-serif text-base tracking-wide font-semibold shadow-sm">
                {coupleData.ceremonyTitle}
              </span>
            </div>

            <p className="text-xs text-neutral-500 font-sans">of their beloved children</p>
          </div>

          {/* Couple Names Lineage Presentation */}
          <div className="my-6 py-6 px-4 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-sm">
            <div className="flex flex-col items-center">
              <h3 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-bold tracking-wide">
                {coupleData.groom.fullName}
              </h3>
              <p className="text-[11px] font-sans text-neutral-500 mt-0.5 tracking-wider">
                Son of {coupleData.groom.parents}
              </p>

              <div className="flex items-center gap-3 my-3">
                <div className="h-[1px] w-12 bg-neutral-300" />
                <span className="w-8 h-8 rounded-full bg-[#8E1722] text-white flex items-center justify-center font-decorative text-sm shadow-md">
                  &
                </span>
                <div className="h-[1px] w-12 bg-neutral-300" />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-bold tracking-wide">
                {coupleData.bride.fullName}
              </h3>
              <p className="text-[11px] font-sans text-neutral-500 mt-0.5 tracking-wider">
                Daughter of {coupleData.bride.parents}
              </p>
            </div>
          </div>

          {/* Date & Time Highlights */}
          <div className="mt-5 pt-4 border-t border-neutral-200 text-neutral-900">
            <p className="font-serif text-lg sm:text-xl font-bold text-neutral-950">
              {eventData.displayDate}
            </p>
            <p className="text-xs sm:text-sm font-sans text-neutral-600 mt-0.5">
              Celebrations commence at 6:30 PM onwards
            </p>
            <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-1">
              Venue: <span className="font-semibold text-neutral-800">{eventData.venue.name}</span>, {eventData.venue.city}
            </p>
          </div>

          {/* Downward Prompt */}
          <div className="mt-8 pt-4 flex flex-col items-center gap-1 opacity-70">
            <span className="text-[10px] font-sans tracking-widest uppercase text-neutral-500">
              Keep Scrolling for Our Story
            </span>
            <ChevronDown className="w-4 h-4 text-gold-antique animate-bounce" />
          </div>
        </FiligreeBorder>
      </motion.div>
    </section>
  );
};
