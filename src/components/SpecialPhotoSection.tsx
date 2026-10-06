import React, { useState, useEffect } from 'react';
import { archiveData } from '../config/archiveData';

interface SpecialPhotoSectionProps {
  onSecondYes: () => void;
}

export const SpecialPhotoSection: React.FC<SpecialPhotoSectionProps> = ({ onSecondYes }) => {
  // phase:
  // 0: Black screen fade-in
  // 1: Show "ONE LAST MEMORY"
  // 2: Reveal Photo 08 (no other UI)
  // 3: Reveal recreate question + buttons
  // 4: Second YES clicked -> "Then it's a promise." + 🤙
  const [phase, setPhase] = useState<number>(0);

  const [noCount, setNoCount] = useState<number>(0);
  const [noMessage, setNoMessage] = useState<string | null>(null);
  const [noOffset, setNoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Show ONE LAST MEMORY
    const t1 = setTimeout(() => setPhase(1), 500);
    // 2. Reveal Photo 08 alone with slow cinematic scale
    const t2 = setTimeout(() => setPhase(2), 1700);
    // 3. Reveal question & buttons
    const t3 = setTimeout(() => setPhase(3), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const next = noCount + 1;
    setNoCount(next);

    if (next === 1) {
      setNoMessage("Recreate pannama epdi? 🥺");
      setNoOffset({ x: 30, y: -18 });
    } else if (next === 2) {
      setNoMessage("Just imagine it once again... ✨");
      setNoOffset({ x: -40, y: 22 });
    } else if (next === 3) {
      setNoMessage("Indha button kuda yes solla soludhu 🥹");
      setNoOffset({ x: 55, y: -26 });
    } else {
      const msgs = [
        "Namma sernthu recreate panrom! 🤎",
        "Say yes na 🫶",
        "It's going to be even more special!",
      ];
      setNoMessage(msgs[(next - 4) % msgs.length]);
      const rx = (Math.random() - 0.5) * 160;
      const ry = (Math.random() - 0.5) * 75;
      setNoOffset({ x: rx, y: ry });
    }
  };

  const handleNoMouseEnter = (e: React.MouseEvent) => {
    if (noCount >= 2) {
      handleNoClick(e);
    }
  };

  const handleYes = () => {
    setPhase(4);
    // Show "Then it's a promise." + golden nano threads, then transition to Screen 08
    setTimeout(() => {
      onSecondYes();
    }, 5200);
  };

  const { specialPhoto, promiseConfirmation } = archiveData;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0908] flex flex-col items-center justify-center p-6 overflow-y-auto select-none transition-colors duration-1000">
      
      {/* Phases 1 to 3: The Special Photo Reveal */}
      {phase < 4 && (
        <div className="max-w-xl w-full flex flex-col items-center text-center my-auto py-8">
          
          {/* ONE LAST MEMORY (Level 5 Archive Monospace) */}
          {phase >= 1 && (
            <div className="mb-6 animate-fade-up">
              <span className="font-archive text-xs tracking-archive text-[#A88A62] uppercase font-semibold">
                {specialPhoto.badge}
              </span>
            </div>
          )}

          {/* PHOTO 08: Most cinematic photograph reveal */}
          {phase >= 2 && (
            <div className="w-full max-w-sm sm:max-w-md mx-auto transition-all duration-1000 ease-out transform scale-100 opacity-100 animate-fade-up">
              <div className="physical-photo-card rotate-1 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#A88A62]/30 ring-1 ring-[#A88A62]/20">
                <div className="washi-tape-tl" />
                <div className="washi-tape-tr" />

                <div className="aspect-[2/3] max-h-[58vh] bg-[#12100F] overflow-hidden relative mx-auto">
                  <img
                    src={specialPhoto.photo}
                    alt="One Last Memory - Special Moment"
                    className="w-full h-full object-contain filter contrast-[1.04] brightness-95 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                </div>

                <div className="mt-3 text-center">
                  <span className="font-archive text-[9px] tracking-archive text-[#A88A62] uppercase font-semibold">
                    PHOTO 08 // THE SECRET TREASURE
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Recreate question & buttons - appears strictly AFTER photo has been revealed */}
          {phase >= 3 && (
            <div className="mt-8 space-y-6 w-full animate-fade-up">
              <p className="font-display-italic text-2xl sm:text-3xl text-[#F3EBDD] max-w-md mx-auto leading-relaxed">
                “{specialPhoto.recreateQuestion}”
              </p>

              {noMessage && (
                <div className="text-xs font-archive text-[#A88A62] bg-[#191513] px-4 py-1.5 rounded-full border border-[#A88A62]/30 animate-fade-up shadow-lg">
                  {noMessage}
                </div>
              )}

              <div className="flex items-center justify-center gap-6 relative min-h-[56px] w-full pt-1">
                <button
                  type="button"
                  id="btn-recreate-yes"
                  onClick={handleYes}
                  className="btn-storyboard-pill text-sm px-8 py-2.5 font-sans"
                >
                  <span>{specialPhoto.yesText}</span>
                </button>

                <button
                  type="button"
                  id="btn-recreate-no"
                  onClick={handleNoClick}
                  onMouseEnter={handleNoMouseEnter}
                  onTouchStart={handleNoClick}
                  style={{
                    transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                    transition: 'transform 0.35s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                  }}
                  className="btn-storyboard-secondary text-sm px-7 py-2.5 font-sans"
                >
                  {specialPhoto.noText}
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Phase 4: Second YES Transition — Intimate "Then it's a promise." + Nano Golden Threads Pinky Promise */}
      {phase === 4 && (
        <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6 animate-fade-up">
          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl text-[#F3EBDD] font-bold tracking-heading uppercase">
              “{promiseConfirmation.statement}”
            </h2>
            <p className="font-handwritten text-3xl sm:text-4xl text-[#C4A77D] tracking-script">
              Preserved forever in our archive.
            </p>
          </div>

          {/* Two golden glow threads making a pinky promise in nano */}
          <div className="relative group max-w-sm sm:max-w-md w-full mx-auto my-2">
            {/* Ambient golden glow behind the threads */}
            <div className="absolute -inset-1 bg-[#A88A62]/30 rounded-2xl blur-xl animate-pulse-glow pointer-events-none" />

            <div className="relative overflow-hidden rounded-2xl border border-[#A88A62]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] ring-1 ring-[#F3EBDD]/15">
              <img
                src="/images/nano-pinky-promise.jpg"
                alt="Two golden glow nano threads interlocking in a pinky promise"
                className="w-full aspect-[16/9] object-cover filter contrast-[1.08] brightness-[1.02] transform transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-2.5 left-0 right-0 text-center">
                <span className="font-archive text-[9px] tracking-archive text-[#F3EBDD]/90 uppercase font-semibold">
                  NANO SCALE // BOUND BY LIGHT
                </span>
              </div>
            </div>
          </div>

          <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#A88A62]/70 to-transparent mx-auto pt-2" />
        </div>
      )}

    </div>
  );
};
