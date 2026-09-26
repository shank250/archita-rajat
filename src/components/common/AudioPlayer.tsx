import React from 'react';
import { VolumeX } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const AudioPlayer: React.FC = () => {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute music" : "Play celebratory music"}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-theme-border text-text-body shadow-md transition-all duration-300 hover:scale-105 hover:border-primary active:scale-95 cursor-pointer"
      >
        {/* Pulsing ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-primary/35 animate-ping" />
        )}

        {/* Dynamic sound equalizer bars */}
        {isPlaying ? (
          <div className="flex items-end justify-center gap-0.5 h-4 w-4">
            <span className="w-1 bg-primary rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
            <span className="w-1 bg-secondary rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.2s] h-4" />
            <span className="w-1 bg-accent rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.4s] h-2.5" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-text-sub transition-transform group-hover:scale-110" />
        )}

        {/* Tooltip hint */}
        <span className="absolute right-14 whitespace-nowrap px-3 py-1.5 text-xs font-sans font-semibold rounded-full bg-primary text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
          {isPlaying ? "Mute Music" : "Play Music 🎵"}
        </span>
      </button>
    </div>
  );
};
