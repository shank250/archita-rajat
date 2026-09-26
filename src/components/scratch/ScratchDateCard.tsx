import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerSoftBlueAndGoldConfetti } from '../../utils/confetti';
import { Calendar, RotateCcw } from 'lucide-react';
import { activeTheme } from '../../config/theme';

export const ScratchDateCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawingRef = useRef(false);
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize canvas with Frosted Rose Pink (#F8B4C0)
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

    // 1. Frosted Rose Pink (#F8B4C0) Canvas Cover
    ctx.fillStyle = activeTheme.scratch.cover || '#F8B4C0';
    ctx.fillRect(0, 0, width, height);

    // 2. Procedural Soft Shimmer & Golden Flecks Texture
    const flecks = ['#3666A6', '#D4AF37', '#FFFFFF', '#FBDDE0', '#D81B60'];
    for (let i = 0; i < 240; i++) {
      const x = ((Math.sin(i * 997 + 1.5) * 0.5 + 0.5) * width);
      const y = ((Math.cos(i * 733 + 2.3) * 0.5 + 0.5) * height);
      const r = 0.8 + (Math.sin(i * 123) * 0.5 + 0.5) * 1.6;
      const alpha = 0.25 + (Math.cos(i * 321) * 0.5 + 0.5) * 0.45;
      const color = flecks[i % flecks.length];
      ctx.fillStyle = color.startsWith('#')
        ? `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
        : color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Handcrafted Hairline Inner Border in Brand Blue
    ctx.strokeStyle = 'rgba(54, 102, 166, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    const centerY = height / 2;

    // 4. Centered Scratch Prompt in Handcrafted Brand Blue (#3666A6)
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = activeTheme.scratch.promptColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', width / 2, centerY - 10);

    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = activeTheme.scratch.textColor;
    ctx.fillText('THE AUSPICIOUS CELEBRATION DATES', width / 2, centerY + 14);

    setIsRevealed(false);
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

      // Trigger soft blue & gold confetti burst upon scratching past 45% surface coverage
      if (percent >= 45 && !isRevealed) {
        setIsRevealed(true);
        triggerSoftBlueAndGoldConfetti();
      }
    } catch (e) {
      console.warn("Scratch check prevented:", e);
    }
  }, [isRevealed]);

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
    ctx.arc(x, y, 32, 0, Math.PI * 2);
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

  const handleMouseUp = () => {
    isDrawingRef.current = false;
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

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
  };

  return (
    <section id="scratch-date" className="relative py-16 px-4 max-w-xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-secondary font-bold">
          Save the Dates
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold mt-1">
          The Auspicious Dates
        </h2>
        <p className="text-xs sm:text-sm font-sans text-text-sub mt-1">
          Scratch to unveil our sacred milestone dates
        </p>
        <div className="w-12 h-0.5 bg-primary rounded-full mx-auto mt-3" />
      </div>

      {/* Interactive Scratch Card Container (Pure Crisp White Surface) */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[280px] sm:min-h-[295px] rounded-3xl overflow-hidden shadow-card-subtle border border-theme-border bg-card-surface"
      >
        {/* 
          Hidden Content Revealed Underneath:
          Crisp white surface (#FFFFFF) with milestone dates in bold --color-brand-blue (#3666A6)
          Uncluttered: No duplicate timings/venues (detailed in the Itinerary section below)
        */}
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 sm:p-7 text-center bg-card-surface text-text-body">
          {/* Top Pill Header */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 hand-drawn-pill bg-surface-subtle border-brand-blue/30 text-primary text-xs font-sans font-bold shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span className="tracking-wide">Official Celebration Dates</span>
          </div>

          {/* Prominent Milestone Dates Grid in bold --color-brand-blue */}
          <div className="w-full space-y-2.5 my-2">
            {/* Milestone Date 1: 23rd October 2026 */}
            <div className="p-3 rounded-2xl hand-drawn-pill-soft bg-surface-subtle border border-brand-blue/30 text-center transition-all hover:border-brand-blue/60">
              <span className="text-[10.5px] font-sans font-bold uppercase tracking-[0.16em] text-secondary block mb-0.5">
                Engagement &amp; Ring Ceremony
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-blue tracking-tight">
                23rd October 2026
              </h3>
            </div>

            {/* Milestone Date 2: 28th – 30th November 2026 */}
            <div className="p-3 rounded-2xl hand-drawn-pill-soft bg-surface-subtle border border-brand-blue/30 text-center transition-all hover:border-brand-blue/60">
              <span className="text-[10.5px] font-sans font-bold uppercase tracking-[0.16em] text-secondary block mb-0.5">
                Mehndi, Sangeet &amp; The Wedding Ceremony
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-blue tracking-tight">
                28th – 30th November 2026
              </h3>
            </div>
          </div>

          {/* Clean Prompt linking to Itinerary without duplicate information */}
          <p className="text-[11px] font-sans text-brand-blue/80 font-medium">
            ✦ See below for event timings, venues &amp; directions ✦
          </p>
        </div>

        {/* Scratchable Canvas Overlay (Frosted Rose Pink #F8B4C0) */}
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
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none z-20"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Optional Reset Action: Only Shown Once Revealed */}
      {isRevealed && (
        <div className="flex justify-center mt-3">
          <button
            onClick={initCanvas}
            className="flex items-center gap-1.5 px-3.5 py-1.5 hand-drawn-pill bg-card-surface border-theme-border text-xs font-sans font-bold text-text-sub hover:text-primary hover:border-brand-blue transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scratch Again</span>
          </button>
        </div>
      )}
    </section>
  );
};
