import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventData } from '../../data/weddingData';
import { triggerCelebrationFireworks } from '../../utils/confetti';
import { Sparkles, Calendar, CheckCircle2, RotateCcw } from 'lucide-react';

export const ScratchDateCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const isDrawingRef = useRef(false);

  // Initialize canvas with clean, solid celebratory marigold/terracotta matte finish (NO glossy chrome!)
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    ctx.globalCompositeOperation = 'source-over';

    // Solid Festive Marigold Matte Surface
    ctx.fillStyle = '#D97706';
    ctx.fillRect(0, 0, width, height);

    // Decorative inner border
    ctx.strokeStyle = '#B45309';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Playful colorful confetti dots on top
    const dotColors = ['#EA4335', '#34A853', '#4285F4', '#FBBC05', '#FFFFFF'];
    for (let i = 0; i < 24; i++) {
      ctx.fillStyle = dotColors[i % dotColors.length];
      const rx = (i * 37 + 15) % (width - 40) + 20;
      const ry = (i * 43 + 12) % (height - 40) + 20;
      ctx.beginPath();
      ctx.arc(rx, ry, (i % 3) + 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Callout text on surface
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH TO REVEAL DATE ✨', width / 2, height / 2 - 8);

    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FEF3D6';
    ctx.fillText('Swipe or drag your finger here 👆', width / 2, height / 2 + 16);

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

      if (percent >= 45 && !isRevealed) {
        setIsRevealed(true);
        triggerCelebrationFireworks();
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
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    calculateScratchedArea();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawingRef.current = true;
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

  const instantReveal = () => {
    setIsRevealed(true);
    setScratchedPercent(100);
    triggerCelebrationFireworks();
  };

  return (
    <section id="scratch-date" className="relative py-16 px-4 max-w-xl mx-auto z-10">
      {/* Section Subtitle */}
      <div className="text-center mb-8">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#C5221F] font-bold">
          Save the Date
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#202124] font-bold mt-1">
          The Auspicious Date
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[#5F6368] mt-1">
          Scratch the marigold seal below to reveal when the celebrations begin!
        </p>
      </div>

      {/* Modern Card Wrapper */}
      <div
        ref={containerRef}
        className="relative w-full h-52 sm:h-56 rounded-3xl overflow-hidden shadow-google-card border border-[#EBE6DC] bg-white"
      >
        {/* Hidden Content Revealed Underneath: Pure Crisp White Surface */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white text-[#202124]">
          <div className="w-10 h-10 rounded-2xl bg-[#FCE8E6] text-[#C5221F] flex items-center justify-center mb-2 shadow-sm">
            <Calendar className="w-5 h-5" />
          </div>

          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#5F6368] font-bold">
            The Wedding Date
          </span>

          <h3 className="font-serif text-3xl sm:text-4xl text-[#202124] font-bold tracking-tight my-1">
            {eventData.revealDateText}
          </h3>

          <p className="font-sans text-sm sm:text-base text-[#3C4043] font-semibold">
            {eventData.displayDate}
          </p>

          <p className="text-xs font-sans text-[#5F6368] mt-1">
            At {eventData.venue.name} • 6:30 PM Onwards
          </p>

          {isRevealed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-2.5 flex items-center gap-1.5 text-[#137333] text-xs font-sans font-bold bg-[#E6F4EA] border border-[#CEEAD6] px-4 py-1 rounded-full shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#137333]" />
              <span>Date Unveiled! See you there! 🎉</span>
            </motion.div>
          )}
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
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none z-20"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Progress & Quick Actions */}
      <div className="flex items-center justify-between mt-3.5 px-2">
        <span className="text-xs font-sans text-[#5F6368] font-medium">
          {isRevealed ? "100% Cleared" : `${scratchedPercent}% Uncovered (Scratch 50% to unveil)`}
        </span>

        {!isRevealed ? (
          <button
            onClick={instantReveal}
            className="flex items-center gap-1 text-xs font-sans font-semibold text-[#C5221F] hover:text-[#8C2127] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Reveal</span>
          </button>
        ) : (
          <button
            onClick={initCanvas}
            className="flex items-center gap-1 text-xs font-sans font-semibold text-[#D97706] hover:text-[#B45309] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scratch Again</span>
          </button>
        )}
      </div>
    </section>
  );
};
