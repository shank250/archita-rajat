import React from 'react';
import { motion } from 'framer-motion';
import { FiligreeBorder } from '../common/FiligreeBorder';
import { useGuest } from '../../context/GuestContext';
import { coupleData } from '../../data/weddingData';
import { ChevronDown } from 'lucide-react';

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
          {/* Auspicious Om Symbol with Theme Accents */}
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-2xl bg-surface-subtle border border-theme-border flex items-center justify-center text-primary shadow-xs">
              <span className="font-serif text-2xl font-bold leading-none select-none text-primary">
                ॐ
              </span>
            </div>
          </div>

          <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-secondary font-bold mb-2">
            Auspicious Invitation
          </p>

          {/* Dynamic Personalized Salutation */}
          <div className="my-4 pb-4 border-b border-theme-border/60">
            <h2 className="font-serif text-2xl sm:text-3xl text-primary font-bold">
              {isPersonalized ? `Respected ${guestName},` : `Respected Family & Friends,`}
            </h2>
            <p className="text-xs sm:text-sm font-sans text-text-sub mt-1">
              Together with our families, we seek your esteemed presence and blessings.
            </p>
          </div>

          {/* Formal Host Copy from Bride's Family */}
          <div className="space-y-4 my-6 font-serif text-sm sm:text-base text-text-body leading-relaxed px-2 sm:px-6">
            <p>
              With the celestial blessings of the Almighty and our elders,
              <br />
              <strong className="text-text-body font-bold text-base sm:text-lg">
                Pramendra Kumar Srivastava &amp; Prem Lata Srivastava
              </strong>
            </p>

            <p className="text-xs text-text-sub uppercase tracking-widest font-sans font-semibold">
              along with
            </p>

            <p>
              <strong className="text-text-body font-bold text-base sm:text-lg">The Kayastha Family</strong>
              <br />
              <span className="text-xs font-sans text-text-sub">
                seek your gracious presence and heartfelt blessings
              </span>
            </p>

            <p className="pt-2 text-xs font-sans text-text-sub">
              at the auspicious wedding celebrations of their beloved daughter
            </p>
          </div>

          {/* Minimalist Hairline Divider */}
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-[1px] w-16 bg-primary/20" />
            <span className="text-secondary text-xs">✦</span>
            <div className="h-[1px] w-16 bg-primary/20" />
          </div>

          {/* Couple Names Lineage Presentation: Bride First */}
          <div className="my-6 py-6 px-4 rounded-3xl bg-surface-subtle border border-theme-border shadow-xs">
            <div className="flex flex-col items-center">
              {/* Bride: Archita Srivastava */}
              <h3 className="font-serif text-3xl sm:text-4xl text-primary font-bold tracking-tight">
                Archita Srivastava
              </h3>
              <p className="text-xs sm:text-sm font-sans text-text-sub mt-1 tracking-wide font-medium">
                D/O Pramendra Kumar Srivastava &amp; Prem Lata Srivastava
              </p>

              <div className="flex items-center gap-3 my-3.5">
                <div className="h-[1px] w-12 bg-primary/25" />
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs">
                  &amp;
                </span>
                <div className="h-[1px] w-12 bg-primary/25" />
              </div>

              {/* Groom: Rajat Ranjan */}
              <h3 className="font-serif text-3xl sm:text-4xl text-primary font-bold tracking-tight">
                Rajat Ranjan
              </h3>
              <p className="text-xs sm:text-sm font-sans text-text-sub mt-1 tracking-wide font-medium">
                S/O Ritu Ranjan Sinha &amp; Madhu Sinha
              </p>

              {/* Celebration Hashtag Badge */}
              <div className="mt-4 inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-surface border border-theme-border text-xs font-sans font-bold text-secondary tracking-wider shadow-xs">
                <span>{coupleData.hashtag}</span>
              </div>
            </div>
          </div>

          {/* Downward Indicator */}
          <div className="mt-6 flex justify-center opacity-60">
            <ChevronDown className="w-4 h-4 text-primary animate-bounce" />
          </div>
        </FiligreeBorder>
      </motion.div>
    </section>
  );
};
