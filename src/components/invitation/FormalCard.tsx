import React from 'react';
import { motion } from 'framer-motion';
import { FiligreeBorder } from '../common/FiligreeBorder';
import { useGuest } from '../../context/GuestContext';
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
        <FiligreeBorder className="text-center bg-card-surface shadow-card-subtle">
          {/* Auspicious Sacred Om Blessing Header */}
          <div className="flex flex-col items-center justify-center mb-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 p-2 rounded-full hand-drawn-pill bg-surface-subtle border border-brand-blue/25 shadow-xs flex items-center justify-center mb-2.5 hover:scale-105 transition-transform">
              <img 
                src="/designs/Beige and Pink Devotional Om Circle Sticker.svg" 
                alt="Sacred Om" 
                className="w-full h-full object-contain filter drop-shadow-xs" 
              />
            </div>
            <div className="flex items-center justify-center gap-2.5 text-brand-blue/80">
              <div className="h-[1px] w-8 sm:w-12 bg-brand-blue/25" />
              <span className="font-serif text-base sm:text-lg font-bold text-brand-blue select-none">
                ॥ ॐ ॥
              </span>
              <div className="h-[1px] w-8 sm:w-12 bg-brand-blue/25" />
            </div>
          </div>

          {/* Dynamic Personalized Salutation */}
          <div className="mb-4 pb-4 border-b border-theme-border/60">
            <h2 className="font-serif text-2xl sm:text-3xl text-primary font-bold">
              {isPersonalized ? `Respected ${guestName},` : `Respected Family & Friends,`}
            </h2>
            <p className="text-xs sm:text-sm font-sans text-text-sub mt-1">
              Together with our families, we seek your esteemed presence and heartfelt blessings.
            </p>
          </div>

          {/* Formal Host Copy from Bride's Family */}
          <div className="space-y-3.5 my-6 font-serif text-sm sm:text-base text-text-body leading-relaxed px-2 sm:px-6">
            <p>
              With the celestial blessings of the Almighty and our elders,
              <br />
              <strong className="text-text-body font-bold text-base sm:text-lg">
                Pramendra Kumar Srivastava &amp; Prem Lata Srivastava
              </strong>
            </p>

            <p className="subheading-tracked text-text-sub font-sans">
              along with
            </p>

            <p>
              <strong className="text-text-body font-bold text-base sm:text-lg">The Kayastha Family</strong>
            </p>

            {/* Clean Tracked Uppercase Sub-heading */}
            <div className="py-2.5">
              <span className="inline-block px-5 py-1.5 hand-drawn-pill bg-surface-subtle text-brand-blue border-brand-blue/35 subheading-tracked shadow-xs">
                INVITE YOU TO THEIR WEDDING
              </span>
            </div>

            <p className="text-xs font-sans text-text-sub">
              at the auspicious wedding celebrations of their beloved daughter
            </p>
          </div>

          {/* Minimalist Hairline Divider */}
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-[1px] w-16 bg-brand-blue/20" />
            <span className="text-secondary text-xs">✦</span>
            <div className="h-[1px] w-16 bg-brand-blue/20" />
          </div>

          {/* Couple Names Lineage Presentation: Styled in Caveat Script & Brand Blue */}
          <div className="my-6 py-6 px-4 rounded-3xl bg-surface-subtle border border-theme-border shadow-xs">
            <div className="flex flex-col items-center">
              {/* Bride: Archita Srivastava */}
              <h3 className="font-script text-4xl sm:text-5xl md:text-6xl text-brand-blue font-bold tracking-wide leading-none py-1">
                Archita Srivastava
              </h3>
              <p className="text-xs sm:text-sm font-sans text-text-sub mt-1 tracking-wide font-medium">
                D/O Pramendra Kumar Srivastava &amp; Prem Lata Srivastava
              </p>

              {/* Handcrafted Script Ampersand Accent */}
              <div className="flex items-center gap-3 my-2.5">
                <div className="h-[1px] w-12 bg-brand-blue/25" />
                <span className="w-8 h-8 hand-drawn-pill bg-primary text-white flex items-center justify-center font-script text-xl font-bold shadow-xs border-brand-blue-hover">
                  &amp;
                </span>
                <div className="h-[1px] w-12 bg-brand-blue/25" />
              </div>

              {/* Groom: Rajat Ranjan */}
              <h3 className="font-script text-4xl sm:text-5xl md:text-6xl text-brand-blue font-bold tracking-wide leading-none py-1">
                Rajat Ranjan
              </h3>
              <p className="text-xs sm:text-sm font-sans text-text-sub mt-1 tracking-wide font-medium">
                S/O Ritu Ranjan Sinha &amp; Madhu Sinha
              </p>
            </div>
          </div>

          {/* Downward Indicator */}
          <div className="mt-6 flex justify-center opacity-60">
            <ChevronDown className="w-4 h-4 text-brand-blue animate-bounce" />
          </div>
        </FiligreeBorder>
      </motion.div>
    </section>
  );
};
