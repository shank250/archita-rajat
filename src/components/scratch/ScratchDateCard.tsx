import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventData } from '../../data/weddingData';
import { triggerCelebrationFireworks } from '../../utils/confetti';
import { Sparkles, Calendar, RotateCcw } from 'lucide-react';
import { activeTheme } from '../../config/theme';

export const ScratchDateCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const isDrawingRef = useRef(false);
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize canvas with colors directly from activeTheme.scratch
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

    // 1. Base Layer from activeTheme.scratch.cover
    ctx.fillStyle = activeTheme.scratch.cover;
    ctx.fillRect(0, 0, width, height);

    // 2. Procedural Soft Golden / Glitter Flecks Texture from theme flecks
    const flecks = activeTheme.scratch.flecks;
    for (let i = 0; i < 220; i++) {
      const x = ((Math.sin(i * 997 + 1.5) * 0.5 + 0.5) * width);
      const y = ((Math.cos(i * 733 + 2.3) * 0.5 + 0.5) * height);
      const r = 0.8 + (Math.sin(i * 123) * 0.5 + 0.5) * 1.5;
      const alpha = 0.25 + (Math.cos(i * 321) * 0.5 + 0.5) * 0.45;
      const color = flecks[i % flecks.length];
      ctx.fillStyle = color.startsWith('#')
        ? `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
        : color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Subtle Hairline Inner Border
    ctx.strokeStyle = activeTheme.scratch.innerBorder;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    const centerY = height / 2;

    // 4. Clean Centered Scratch Prompt
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = activeTheme.scratch.promptColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', width / 2, centerY);

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

      // Trigger confetti animation upon >= 35% surface clear
      if (percent >= 35 && !isRevealed) {
        setIsRevealed(true);
        triggerCelebrationFireworks();
      }
    } catch (e) {
      console.warn("Scratch check prevented:", e);
    }
  }, [isRevealed]);

  const instantReveal = () => {
    setIsRevealed(true);
    setScratchedPercent(100);
    triggerCelebrationFireworks();
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

  const handleMouseUp = (e: React.MouseEvent) => {
    isDrawingRef.current = false;
    const dist = Math.hypot(e.clientX - touchStartPos.current.x, e.clientY - touchStartPos.current.y);
    if (dist < 15 && !isRevealed) {
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
      if (dist < 20) {
        instantReveal();
      }
    }
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
          Our celebration schedule
        </p>
        <div className="w-12 h-0.5 bg-primary rounded-full mx-auto mt-3" />
      </div>

      {/* Small Interactive Scratch Card Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[260px] sm:h-[280px] rounded-3xl overflow-hidden shadow-card-subtle border border-theme-border bg-surface"
      >
        {/* Hidden Content Revealed Underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center bg-surface text-text-body">
          <div className="w-10 h-10 rounded-2xl bg-surface-subtle border border-theme-border flex items-center justify-center mb-2 shadow-xs">
            <Calendar className="w-5 h-5 text-primary" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary tracking-tight mt-0.5 mb-0.5">
            {eventData.revealDateText}
          </h3>

          <p className="text-xs sm:text-sm font-sans font-bold text-text-body">
            {eventData.displayDate} • 8:00 PM Onwards
          </p>

          <p className="text-[11px] font-sans text-text-sub mt-0.5">
            Krishna Lawn (Krishna Farms), Gwalior
          </p>

          {/* Key Milestones Teaser Row */}
          <div className="mt-3 pt-2.5 border-t border-theme-border flex flex-wrap items-center justify-center gap-2 text-[11px] font-sans text-text-body font-medium">
            <span className="px-2.5 py-0.5 rounded-full bg-surface-subtle border border-theme-border">
              Ring Ceremony: <strong>23 Oct 2026</strong>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-subtle border border-theme-border">
              Mehndi &amp; Sangeet: <strong>28–29 Nov 2026</strong>
            </span>
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
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none z-20"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Progress & Quick Action Bar Below Card */}
      <div className="flex items-center justify-between mt-3 px-2">
        <span className="text-xs font-sans text-text-sub font-medium">
          {isRevealed ? "100% Cleared" : `${scratchedPercent}% Cleared`}
        </span>

        {!isRevealed ? (
          <button
            onClick={instantReveal}
            className="flex items-center gap-1 text-xs font-sans font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Instant Reveal</span>
          </button>
        ) : (
          <button
            onClick={initCanvas}
            className="flex items-center gap-1 text-xs font-sans font-bold text-text-sub hover:text-primary transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scratch Again</span>
          </button>
        )}
      </div>
    </section>
  );
};
