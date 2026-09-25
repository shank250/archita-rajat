import React from 'react';
import { motion } from 'framer-motion';
import { FiligreeBorder } from '../common/FiligreeBorder';
import { useGuest } from '../../context/GuestContext';
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
        <FiligreeBorder className="text-center">
          {/* Header Icon */}
          <div className="flex justify-center mb-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-neutral-400 font-bold mb-2">
            Auspicious Invitation
          </p>

          {/* Dynamic Personalized Salutation */}
          <div className="my-4 pb-4 border-b border-neutral-100">
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-bold">
              {isPersonalized ? `Respected ${guestName},` : `Respected Family & Friends,`}
            </h2>
            <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-1">
              Together with our families, we seek your esteemed presence and blessings.
            </p>
          </div>

          {/* Formal Host Copy from Bride's Family */}
          <div className="space-y-4 my-6 font-serif text-sm sm:text-base text-neutral-800 leading-relaxed px-2 sm:px-6">
            <p>
              With the celestial blessings of the Almighty and our elders,
              <br />
              <strong className="text-neutral-950 font-bold text-base sm:text-lg">
                Pramendra Kumar Srivastava & Prem Lata Srivastava
              </strong>
            </p>

            <p className="text-xs text-neutral-400 uppercase tracking-widest font-sans font-semibold">
              along with
            </p>

            <p>
              <strong className="text-neutral-950 font-bold text-base sm:text-lg">The Srivastava & Kayastha Family</strong>
              <br />
              <span className="text-xs font-sans text-neutral-500">
                seek your gracious presence and heartfelt blessings
              </span>
            </p>

            <p className="pt-2 text-xs font-sans text-neutral-500">
              at the auspicious wedding celebrations of their beloved daughter
            </p>
          </div>

          {/* Couple Names Lineage Presentation: Bride First */}
          <div className="my-6 py-6 px-4 rounded-3xl bg-[#FAFAFA] border border-neutral-200/90 shadow-sm">
            <div className="flex flex-col items-center">
              {/* Bride: Archita Srivastava */}
              <h3 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-bold tracking-tight">
                Archita Srivastava
              </h3>
              <p className="text-xs sm:text-sm font-sans text-neutral-600 mt-1 tracking-wide font-medium">
                D/O Pramendra Kumar Srivastava & Prem Lata Srivastava
              </p>

              <div className="flex items-center gap-3 my-3.5">
                <div className="h-[1px] w-12 bg-neutral-200" />
                <span className="w-8 h-8 rounded-full bg-[#881337] text-white flex items-center justify-center font-serif text-sm font-bold shadow-sm">
                  &
                </span>
                <div className="h-[1px] w-12 bg-neutral-200" />
              </div>

              {/* Groom: Rajat Ranjan */}
              <h3 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-bold tracking-tight">
                Rajat Ranjan
              </h3>
              <p className="text-xs sm:text-sm font-sans text-neutral-600 mt-1 tracking-wide font-medium">
                S/O Ritu Ranjan Sinha & Madhu Sinha
              </p>
            </div>
          </div>

          {/* Downward Prompt */}
          <div className="mt-8 pt-4 flex flex-col items-center gap-1 opacity-70">
            <span className="text-[10px] font-sans tracking-widest uppercase text-neutral-400 font-bold">
              Scroll Down for Our Story & Auspicious Dates
            </span>
            <ChevronDown className="w-4 h-4 text-neutral-400 animate-bounce" />
          </div>
        </FiligreeBorder>
      </motion.div>
    </section>
  );
};
