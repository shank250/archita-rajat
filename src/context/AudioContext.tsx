import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
  hasInteracted: boolean;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  toggleAudio: () => {},
  playAudio: () => {},
  pauseAudio: () => {},
  hasInteracted: false,
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const webAudioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize an ambient meditative Indian Raag Yaman scale (Sa Re Ga Ma Dha Ni) for a luxury royal atmosphere
  const startAmbientSynth = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!webAudioCtxRef.current) {
        webAudioCtxRef.current = new AudioCtx();
      }

      const ctx = webAudioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Peaceful Indian raag notes (frequencies in Hz around C#4)
      const notes = [277.18, 311.13, 349.23, 392.00, 415.30, 466.16, 554.37];
      let step = 0;

      const playChime = () => {
        if (!webAudioCtxRef.current || webAudioCtxRef.current.state !== 'running') return;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        const freq = notes[step % notes.length];
        step = (step + Math.floor(Math.random() * 2) + 1) % notes.length;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 3.3);
      };

      playChime();
      synthIntervalRef.current = window.setInterval(playChime, 2200);
    } catch (e) {
      console.warn("Ambient synth initialization prevented:", e);
    }
  }, []);

  const stopAmbientSynth = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (webAudioCtxRef.current && webAudioCtxRef.current.state === 'running') {
      webAudioCtxRef.current.suspend();
    }
  }, []);

  // Initialize audio tag if custom MP3 exists
  useEffect(() => {
    const audio = new Audio('/audio/celebration.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      stopAmbientSynth();
    };
  }, [stopAmbientSynth]);

  const playAudio = useCallback(() => {
    setHasInteracted(true);
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If mp3 file does not exist or blocked, fallback to ambient gentle royal synth chime
            startAmbientSynth();
            setIsPlaying(true);
          });
      }
    } else {
      startAmbientSynth();
      setIsPlaying(true);
    }
  }, [startAmbientSynth]);

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopAmbientSynth();
    setIsPlaying(false);
  }, [stopAmbientSynth]);

  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, playAudio, pauseAudio]);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, playAudio, pauseAudio, hasInteracted }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
