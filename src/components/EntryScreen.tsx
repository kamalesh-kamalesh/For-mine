import React, { useState, useEffect, useRef } from 'react';
import { archiveData } from '../config/archiveData';

interface EntryScreenProps {
  onEnter: () => void;
}

export const EntryScreen: React.FC<EntryScreenProps> = ({ onEnter }) => {
  const [typedCode, setTypedCode] = useState('');
  const [showContent, setShowContent] = useState(false);

  const [noCount, setNoCount] = useState(0);
  const [noMessage, setNoMessage] = useState<string | null>(null);
  const [noOffset, setNoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const noBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const full = archiveData.entry.code; // "ARCHIVE // 001"
    let i = 0;
    const interval = setInterval(() => {
      if (i <= full.length) {
        setTypedCode(full.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowContent(true), 400);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const next = noCount + 1;
    setNoCount(next);

    if (next === 1) {
      setNoMessage("Are you sure? 👀");
      setNoOffset({ x: 35, y: -12 });
    } else if (next === 2) {
      setNoMessage("Hmm... nice try 😂");
      setNoOffset({ x: -45, y: 20 });
    } else if (next === 3) {
      setNoMessage("That button doesn't seem very confident...");
      setNoOffset({ x: 65, y: -28 });
    } else {
      const msgs = [
        "Still trying? 😂",
        "It really doesn't want to say no 🤎",
        "Come on, step inside 🦋",
        "That button is shy 👀",
      ];
      setNoMessage(msgs[(next - 4) % msgs.length]);
      const rx = (Math.random() - 0.5) * 160;
      const ry = (Math.random() - 0.5) * 80;
      setNoOffset({ x: rx, y: ry });
    }
  };

  const handleNoMouseEnter = (e: React.MouseEvent) => {
    if (noCount >= 2) {
      handleNoClick(e);
    }
  };

  const { entry } = archiveData;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 text-[#F3EBDD] overflow-hidden select-none">
      
      {/* Top Center Warm Light Source */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 light-source-glow animate-pulse-glow" />

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center space-y-6">
        
        {/* ARCHIVE // 001 (Level 5 Monospace) */}
        <div className="pt-2">
          <span className="font-archive text-xs tracking-archive text-[#A88A62] uppercase font-semibold">
            {typedCode}
            {!showContent && <span className="cursor-blink" />}
          </span>
        </div>

        {/* Content Reveal */}
        {showContent && (
          <div className="animate-fade-up space-y-5">
            {/* Title: Style 2 Strong Classic Serif */}
            <h1 className="font-display text-4xl sm:text-5xl tracking-heading text-[#F3EBDD] font-bold leading-tight">
              {entry.title}
            </h1>

            {/* Poetic Lines: Style 4 Bold Italic Serif / Refined Serif */}
            <div className="space-y-1.5 py-2">
              {entry.lead.map((line, idx) => (
                <p key={idx} className="font-serif italic text-lg sm:text-xl text-[#B9ADA0] font-light leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            {/* Question */}
            <div className="pt-2 pb-2">
              <p className="font-serif text-xl sm:text-2xl text-[#F3EBDD]/90 font-normal">
                {entry.question}
              </p>
            </div>

            {/* Playful speech bubble for NO */}
            {noMessage && (
              <div className="text-xs font-archive text-[#A88A62] bg-[#191513] px-4 py-1.5 rounded-full border border-[#A88A62]/30 animate-fade-up inline-block shadow-lg mx-auto">
                {noMessage}
              </div>
            )}

            {/* Buttons: Clean Sans */}
            <div className="pt-4 flex items-center justify-center gap-6 relative min-h-[56px] w-full">
              <button
                type="button"
                id="btn-entry-yes"
                onClick={onEnter}
                className="btn-storyboard-pill text-sm px-8 py-2.5 font-sans"
              >
                <span>{entry.yesText}</span>
              </button>

              <button
                ref={noBtnRef}
                type="button"
                id="btn-entry-no"
                onClick={handleNoClick}
                onMouseEnter={handleNoMouseEnter}
                onTouchStart={handleNoClick}
                style={{
                  transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                  transition: 'transform 0.35s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                }}
                className="btn-storyboard-secondary text-sm px-7 py-2.5 font-sans"
              >
                {entry.noText}
              </button>
            </div>

            {/* Delicate butterfly detail at bottom */}
            <div className="pt-10 opacity-40">
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" className="mx-auto flutter-gentle">
                <path
                  d="M24 16C26 10 34 8 38 13C41 18 38 25 30 25C36 28 38 36 33 39C28 42 25 35 24 30C23 35 20 42 15 39C10 36 12 28 18 25C10 25 7 18 10 13C14 8 22 10 24 16Z"
                  fill="#A88A62"
                />
              </svg>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
