import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface ArchiveNavProps {
  currentSection: number;
  onJumpToSection: (section: number) => void;
}

export const ArchiveNav: React.FC<ArchiveNavProps> = ({
  currentSection,
  onJumpToSection,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Soft ambient chord synthesizer using Web Audio API (starts muted)
  useEffect(() => {
    if (!soundEnabled) {
      if (audioCtx) {
        audioCtx.close().catch(() => {});
        setAudioCtx(null);
      }
      return;
    }

    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      setAudioCtx(ctx);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.05, ctx.currentTime);
      masterGain.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, ctx.currentTime);
      filter.connect(masterGain);

      // Warm cinematic ambient chord (D minor 9th / F major 7th chord)
      const notes = [146.83, 220.0, 261.63, 329.63];
      const oscillators: OscillatorNode[] = [];

      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        noteGain.gain.setValueAtTime(0.012, ctx.currentTime);
        osc.connect(noteGain);
        noteGain.connect(filter);
        osc.start();
        oscillators.push(osc);
      });

      return () => {
        oscillators.forEach((o) => {
          try { o.stop(); } catch {}
        });
        if (ctx.state !== 'closed') {
          ctx.close().catch(() => {});
        }
      };
    } catch {}
  }, [soundEnabled]);

  const sections = [
    { num: 1, label: '01 / FIRST MEET', short: '01' },
    { num: 2, label: '02 / MEMORIES', short: '02' },
    { num: 3, label: '03 / HANDS', short: '03' },
    { num: 4, label: '04 / PROMISE', short: '04' },
    { num: 5, label: '05 / LETTER', short: '05' },
    { num: 6, label: '06 / FOREVER', short: '06' },
  ];

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 bg-[#0B0908]/85 backdrop-blur-md border-b border-[#A88A62]/15 select-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Left: Brand title */}
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A88A62] animate-pulse" />
            <span className="font-archive text-xs tracking-archive text-[#F3EBDD] font-semibold">
              for mine 🦋🤎
            </span>
          </div>

          {/* Mobile / Tablet Horizontal Dots */}
          <div className="flex lg:hidden items-center gap-1.5">
            {sections.map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => onJumpToSection(s.num)}
                className={`text-[10px] font-archive px-2 py-0.5 rounded transition-all ${
                  currentSection === s.num
                    ? 'text-[#A88A62] font-bold border border-[#A88A62]/40 bg-[#191513]'
                    : 'text-[#B9ADA0]/40'
                }`}
              >
                {s.short}
              </button>
            ))}
          </div>

          {/* Right: Ambient Sound toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="btn-sound-toggle"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1 rounded text-[#B9ADA0] hover:text-[#A88A62] transition-colors"
              title={soundEnabled ? 'Ambient sound enabled' : 'Ambient sound muted'}
              aria-label="Toggle ambient audio"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#A88A62]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#B9ADA0]/50" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Desktop Vertical Progress Indicator on Right Side */}
      <aside
        className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-4 text-xs font-archive select-none"
        aria-label="Story chapter navigation"
      >
        {sections.map((s) => {
          const isActive = currentSection === s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => onJumpToSection(s.num)}
              className={`flex items-center gap-2.5 group transition-all text-left ${
                isActive ? 'text-[#A88A62] font-bold' : 'text-[#B9ADA0]/40 hover:text-[#F3EBDD]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  isActive ? 'bg-[#A88A62] scale-125' : 'bg-[#B9ADA0]/25 group-hover:bg-[#A88A62]/60'
                }`}
              />
              <span className="tracking-archive text-[10px] uppercase">{s.label}</span>
            </button>
          );
        })}
      </aside>
    </>
  );
};
