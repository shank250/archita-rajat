import React from 'react';
import { motion } from 'framer-motion';
import { FiligreeBorder } from '../common/FiligreeBorder';
import { useGuest } from '../../context/GuestContext';
import { coupleData, eventData } from '../../data/weddingData';
import { ChevronDown } from 'lucide-react';

export const FormalCard: React.FC = () => {
  const { guestName, isPersonalized } = useGuest();

  return (
    <section id="formal-invitation" className="relative py-12 px-4 max-w-xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <FiligreeBorder variant="parchment" className="text-center">
          {/* Header Kalash / Auspicious Motif */}
          <div className="flex justify-center mb-3">
            <span className="text-2xl filter drop-shadow">🪔</span>
          </div>

          <p className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.25em] text-charcoal-muted mb-2">
            Auspicious Invitation
          </p>

          {/* Dynamic Personalized Salutation */}
          <div className="my-4 pb-3 border-b border-gold-antique/20">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-bronze font-semibold">
              {isPersonalized ? `Respected ${guestName},` : `Respected Family & Friends,`}
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-charcoal-muted mt-1">
              Together with our families, we seek your esteemed presence and heartfelt blessings.
            </p>
          </div>

          {/* Formal Host Copy */}
          <div className="space-y-4 my-6 font-serif text-xs sm:text-sm text-charcoal-bronze leading-relaxed px-2 sm:px-6">
            <p>
              With the celestial blessings of the Almighty and our respected elders,
              <br />
              <strong className="text-amber-950 font-semibold">{coupleData.groom.parents}</strong>
              <br />
              <span className="text-xs text-charcoal-muted">
                (Grandson of {coupleData.groom.grandparents})
              </span>
            </p>

            <p className="text-xs text-charcoal-muted uppercase tracking-widest font-sans font-medium">
              along with
            </p>

            <p>
              <strong className="text-amber-950 font-semibold">{coupleData.bride.parents}</strong>
              <br />
              <span className="text-xs text-charcoal-muted">
                (Granddaughter of {coupleData.bride.grandparents})
              </span>
            </p>

            <p className="pt-2 text-charcoal-muted">
              cordially invite you to celebrate the joyous
            </p>

            <div className="py-2">
              <span className="inline-block px-4 py-1 rounded-full bg-amber-100/70 border border-gold-antique/40 text-amber-900 font-serif text-sm tracking-wider font-semibold">
                {coupleData.ceremonyTitle}
              </span>
            </div>

            <p className="text-xs text-charcoal-muted">of their beloved children</p>
          </div>

          {/* Couple Names Lineage Presentation */}
          <div className="my-8 py-6 px-4 rounded-xl bg-gradient-to-b from-amber-50/60 to-orange-50/40 border border-gold-antique/30">
            <div className="flex flex-col items-center">
              <h3 className="font-serif text-3xl sm:text-4xl text-amber-900 font-bold tracking-wide">
                {coupleData.groom.fullName}
              </h3>
              <p className="text-[11px] font-sans text-charcoal-muted mt-0.5 tracking-wider">
                Son of {coupleData.groom.parents}
              </p>

              <div className="flex items-center gap-3 my-3">
                <div className="h-[1px] w-12 bg-gold-antique/40" />
                <span className="w-8 h-8 rounded-full bg-crimson-wax text-gold-light flex items-center justify-center font-decorative text-sm shadow-md">
                  &
                </span>
                <div className="h-[1px] w-12 bg-gold-antique/40" />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-amber-900 font-bold tracking-wide">
                {coupleData.bride.fullName}
              </h3>
              <p className="text-[11px] font-sans text-charcoal-muted mt-0.5 tracking-wider">
                Daughter of {coupleData.bride.parents}
              </p>
            </div>
          </div>

          {/* Date & Time Highlights */}
          <div className="mt-4 pt-4 border-t border-gold-antique/30 text-charcoal-bronze">
            <p className="font-serif text-base sm:text-lg font-bold text-amber-900">
              {eventData.displayDate}
            </p>
            <p className="text-xs sm:text-sm font-serif text-charcoal-muted mt-0.5">
              Celebrations commence at 6:30 PM onwards
            </p>
            <p className="text-xs font-serif text-charcoal-muted mt-1">
              Venue: <span className="font-semibold text-charcoal-bronze">{eventData.venue.name}</span>, {eventData.venue.city}
            </p>
          </div>

          {/* Downward Prompt */}
          <div className="mt-8 pt-4 flex flex-col items-center gap-1 opacity-70">
            <span className="text-[10px] font-sans tracking-widest uppercase text-charcoal-muted">
              Keep Scrolling for Our Story
            </span>
            <ChevronDown className="w-4 h-4 text-gold-antique animate-bounce" />
          </div>
        </FiligreeBorder>
      </motion.div>
    </section>
  );
};
