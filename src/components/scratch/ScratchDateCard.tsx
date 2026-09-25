import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingEvents, venuesList } from '../../data/weddingData';
import { triggerSubtleRevealSparkle } from '../../utils/confetti';
import { Sparkles, Calendar, MapPin, ExternalLink, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';

export const ScratchDateCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const isDrawingRef = useRef(false);
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize canvas with clean deep wine matte finish and gold accents
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    if (width === 0 || height === 0) return;

    canvas.width = width;
    canvas.height = height;

    ctx.globalCompositeOperation = 'source-over';

    // Solid Deep Wine Matte Finish
    ctx.fillStyle = '#881337';
    ctx.fillRect(0, 0, width, height);

    // Clean subtle inner border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    // Auspicious Invocation
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const centerY = height / 2;
    ctx.fillText('॥ श्री गणेशाय नमः ॥', width / 2, centerY - 65);

    // Couple Names
    ctx.font = 'bold 22px "Cinzel", "Playfair Display", serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('ARCHITA & RAJAT', width / 2, centerY - 30);

    // Callout text on surface
    ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#F3E5AB';
    ctx.fillText('TAP OR SWIPE TO REVEAL DATES', width / 2, centerY + 8);

    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText('✦ 4 Auspicious Celebrations • Engagement to Vivah ✦', width / 2, centerY + 36);

    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('Tap anywhere on the card to reveal instantly', width / 2, centerY + 64);

    setIsRevealed(false);
    setScratchedPercent(0);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  const calculateScratchedArea = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentPixels = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentPixels += 4;
        }
      }

      const percent = Math.min(100, Math.round((transparentPixels / totalPixels) * 100));
      setScratchedPercent(percent);

      // Reveal once ~8% is cleared (e.g. 1 quick swipe) - effortless!
      if (percent >= 8 && !isRevealed) {
        setIsRevealed(true);
        triggerSubtleRevealSparkle();
      }
    } catch (e) {
      console.warn("Scratch check prevented:", e);
    }
  }, [isRevealed]);

  const instantReveal = () => {
    setIsRevealed(true);
    setScratchedPercent(100);
    triggerSubtleRevealSparkle();
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 65, 0, Math.PI * 2);
    ctx.fill();

    calculateScratchedArea();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawingRef.current = true;
    touchStartPos.current = { x: e.clientX, y: e.clientY };
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    isDrawingRef.current = false;
    const dist = Math.hypot(e.clientX - touchStartPos.current.x, e.clientY - touchStartPos.current.y);
    // If it was a tap/click (minimal movement), reveal immediately!
    if (dist < 20 && !isRevealed) {
      instantReveal();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawingRef.current = true;
    if (e.touches.length > 0) {
      touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawingRef.current) return;
    if (e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    isDrawingRef.current = false;
    const touch = e.changedTouches[0];
    if (touch && !isRevealed) {
      const dist = Math.hypot(touch.clientX - touchStartPos.current.x, touch.clientY - touchStartPos.current.y);
      // If it was a tap (finger lifted with minimal drag), reveal immediately!
      if (dist < 25) {
        instantReveal();
      }
    }
  };

  // Google Calendar URL for the Grand Wedding
  const grandWeddingCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Archita & Rajat's Wedding (Vivah Sanskar)")}&dates=20261130T183000/20261130T235900&details=${encodeURIComponent("The Grand Wedding of Archita Srivastava & Rajat Ranjan\nVenue: Krishna Lawn, Gwalior\nTime: 6:30 PM Onwards")}&location=${encodeURIComponent("Krishna Lawn, Gwalior, Madhya Pradesh")}`;

  return (
    <section id="scratch-date" className="relative py-20 px-4 max-w-4xl mx-auto z-10">
      {/* Section Subtitle */}
      <div className="text-center mb-8">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#881337] font-bold">
          Save the Dates
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-neutral-900 font-bold mt-1">
          The Auspicious Celebrations
        </h2>
        <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-1 max-w-lg mx-auto">
          Tap anywhere or swipe across the card to reveal all celebration dates & venues
        </p>
        <div className="w-12 h-0.5 bg-[#881337] rounded-full mx-auto mt-3" />
      </div>

      {/* Quick Action Bar Above Card */}
      <div className="flex items-center justify-between mb-3 px-2">
        <span className="text-xs font-sans text-neutral-500 font-medium">
          {isRevealed
            ? "✦ All Celebration Dates Unveiled ✦"
            : scratchedPercent > 0
              ? `${scratchedPercent}% Uncovered (or tap to reveal)`
              : "Tap anywhere on card or swipe to unveil"}
        </span>

        {!isRevealed ? (
          <button
            onClick={instantReveal}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#881337] text-white text-xs font-sans font-bold hover:bg-[#70102E] transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Reveal All</span>
          </button>
        ) : (
          <button
            onClick={initCanvas}
            className="flex items-center gap-1 text-xs font-sans font-semibold text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scratch Again</span>
          </button>
        )}
      </div>

      {/* The Big Reveal Panel Container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-neutral-200/90 bg-white"
      >
        {/* The Complete Revealed Celebration Schedule */}
        <div className="p-5 sm:p-8 text-neutral-900">
          {/* Header of Revealed Schedule */}
          <div className="text-center pb-6 border-b border-neutral-100">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-[#881337] text-[11px] font-sans font-bold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All Celebrations Unveiled</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-bold">
              Celebration Program & Auspicious Dates
            </h3>
            <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-1 max-w-lg mx-auto">
              With the blessings of Pramendra Kumar Srivastava & Prem Lata Srivastava, and The Kayastha Family
            </p>
          </div>

          {/* 1. Main Highlight: The Grand Wedding (Vivah Sanskar) */}
          <div className="my-6 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#881337] via-[#9F1239] to-[#70102E] text-white shadow-lg border border-[#70102E]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/15">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-rose-200 font-bold">
                ✦ THE SACRED WEDDING CEREMONY ✦
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-sans font-bold backdrop-blur-sm">
                <Calendar className="w-3.5 h-3.5" />
                <span>Monday, 30th November 2026</span>
              </span>
            </div>

            <div className="mt-4">
              <h4 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
                The Grand Wedding (Vivah Sanskar)
              </h4>
              <p className="font-serif text-rose-100/90 text-sm sm:text-base mt-1 italic">
                "{weddingEvents[3].tagline}"
              </p>
            </div>

            {/* Wedding Venue & Timing Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="flex items-center gap-2 text-[11px] font-sans font-semibold text-rose-200 uppercase tracking-wider mb-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Venue</span>
                </div>
                <p className="font-serif text-base font-bold text-white">
                  Krishna Lawn
                </p>
                <p className="text-xs font-sans text-rose-100/80">
                  Gwalior, Madhya Pradesh
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="flex items-center gap-2 text-[11px] font-sans font-semibold text-rose-200 uppercase tracking-wider mb-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Timing & Key Rituals</span>
                </div>
                <p className="font-serif text-base font-bold text-white">
                  6:30 PM Onwards
                </p>
                <p className="text-xs font-sans text-rose-100/80">
                  Baraat Swagat • Varmala • Sacred Vedic Pheras
                </p>
              </div>
            </div>

            {/* Wedding Action Buttons */}
            <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
              <a
                href={venuesList[0].googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#881337] hover:bg-rose-50 text-xs font-sans font-bold transition-all shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Directions to Krishna Lawn</span>
                <ExternalLink className="w-3 h-3 text-[#881337]/70" />
              </a>

              <a
                href={grandWeddingCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/25 text-xs font-sans font-semibold transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add 30 Nov to Calendar</span>
              </a>
            </div>
          </div>

          {/* 2. Pre-Wedding Festivities Section Heading */}
          <div className="mt-8 mb-4">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#881337] font-bold block">
              Pre-Wedding Festivities & Rasams
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-neutral-900 font-bold mt-0.5">
              Celebrations Leading to the Sacred Union
            </h4>
          </div>

          {/* 3-Card Grid for Pre-Wedding Events */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Event 1: Engagement */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAFA] border border-neutral-200/90 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#881337] text-white">
                    23 OCT 2026
                  </span>
                  <span className="text-[11px] font-sans text-neutral-400 font-medium">
                    Friday
                  </span>
                </div>

                <h5 className="font-serif text-base sm:text-lg font-bold text-neutral-950">
                  Engagement Ceremony
                </h5>

                <p className="text-xs font-serif italic text-neutral-600 mt-1">
                  Ring Exchange & Celebratory Toast
                </p>

                <div className="mt-3 pt-2.5 border-t border-neutral-200/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-sans text-neutral-700 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#881337] flex-shrink-0" />
                    <span className="truncate">Elegance Hotel</span>
                  </div>
                  <p className="text-[11px] font-sans text-neutral-500 pl-5">
                    7:00 PM Onwards
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100">
                <a
                  href={venuesList[1].googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-[#881337] hover:underline"
                >
                  <span>Directions to Elegance Hotel</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Event 2: Mehndi & Haldi Rasam */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAFA] border border-neutral-200/90 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#881337] text-white">
                    28 NOV 2026
                  </span>
                  <span className="text-[11px] font-sans text-neutral-400 font-medium">
                    Saturday
                  </span>
                </div>

                <h5 className="font-serif text-base sm:text-lg font-bold text-neutral-950">
                  Mehndi & Haldi Rasam
                </h5>

                <p className="text-xs font-serif italic text-neutral-600 mt-1">
                  Sacred Haldi, Bridal Henna & Dhol
                </p>

                <div className="mt-3 pt-2.5 border-t border-neutral-200/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-sans text-neutral-700 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#881337] flex-shrink-0" />
                    <span className="truncate">Shital Niwas (Our Home)</span>
                  </div>
                  <p className="text-[11px] font-sans text-neutral-500 pl-5">
                    3:00 PM Onwards
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100">
                <a
                  href={venuesList[2].googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-[#881337] hover:underline"
                >
                  <span>Directions to Shital Niwas</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Event 3: Ladies Sangeet & Musical Night */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAFA] border border-neutral-200/90 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#881337] text-white">
                    29 NOV 2026
                  </span>
                  <span className="text-[11px] font-sans text-neutral-400 font-medium">
                    Sunday
                  </span>
                </div>

                <h5 className="font-serif text-base sm:text-lg font-bold text-neutral-950">
                  Ladies Sangeet & Dance
                </h5>

                <p className="text-xs font-serif italic text-neutral-600 mt-1">
                  Family Dance Performances & DJ
                </p>

                <div className="mt-3 pt-2.5 border-t border-neutral-200/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-sans text-neutral-700 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#881337] flex-shrink-0" />
                    <span className="truncate">Shital Niwas (Our Home)</span>
                  </div>
                  <p className="text-[11px] font-sans text-neutral-500 pl-5">
                    7:00 PM Onwards
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100">
                <a
                  href={venuesList[2].googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-[#881337] hover:underline"
                >
                  <span>Directions to Shital Niwas</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Auspicious Note */}
          <div className="mt-8 pt-5 border-t border-neutral-100 text-center">
            <p className="text-xs font-sans text-neutral-600 font-medium flex items-center justify-center gap-2">
              <Heart className="w-3.5 h-3.5 text-[#881337] fill-[#881337]" />
              <span>We look forward to celebrating each of these moments with you and your family!</span>
            </p>
          </div>
        </div>

        {/* Scratchable Canvas Overlay */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none z-20"
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
