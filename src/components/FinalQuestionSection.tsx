import React, { useState, useEffect, useRef } from 'react';
import { archiveData } from '../config/archiveData';

interface FinalQuestionSectionProps {
  onYesClicked: () => void;
}

export const FinalQuestionSection: React.FC<FinalQuestionSectionProps> = ({ onYesClicked }) => {
  const [lineReveal, setLineReveal] = useState<number>(0);
  const [noCount, setNoCount] = useState<number>(0);
  const [noMessage, setNoMessage] = useState<string | null>(null);
  const [noOffset, setNoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setLineReveal(1), 400);  // "So, Pattu…"
          setTimeout(() => setLineReveal(2), 1500); // "will you let me stay—"
          setTimeout(() => setLineReveal(3), 2600); // "through this chapter,"
          setTimeout(() => setLineReveal(4), 3700); // "the next one,"
          setTimeout(() => setLineReveal(5), 4800); // "and every chapter after?"
          setTimeout(() => setLineReveal(6), 5800); // Buttons: YES 🤎 / NO 👀
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const next = noCount + 1;
    setNoCount(next);

    if (next === 1) {
      setNoMessage("Think again 👀");
      setNoOffset({ x: 35, y: -15 });
    } else if (next === 2) {
      setNoMessage("Really?");
      setNoOffset({ x: -45, y: 22 });
    } else if (next === 3) {
      setNoMessage("One more thought?");
      setNoOffset({ x: 65, y: -28 });
    } else {
      const msgs = [
        "Think again 👀",
        "Really?",
        "One more thought? 🥹",
        "It really wants you to press YES 🤎",
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

  const { finalQuestion } = archiveData;

  return (
    <section
      ref={sectionRef}
      id="final-question"
      className="min-h-screen py-32 px-6 max-w-4xl mx-auto flex flex-col justify-center items-center relative text-center select-none"
    >
      <div className="w-full space-y-10 max-w-xl mx-auto">
        
        {/* "So, Pattu…" with Pattu in Decorative Calligraphy Flourish */}
        {lineReveal >= 1 && (
          <h2 className="text-4xl sm:text-6xl text-[#F3EBDD] tracking-wide animate-fade-up">
            <span className="font-display-italic font-normal">So, </span>
            <span className="font-decorative text-5xl sm:text-7xl text-[#C4A77D] tracking-decorative px-2 inline-block">
              Pattu
            </span>
            <span className="font-display-italic">…</span>
          </h2>
        )}

        {/* Style 4: Bold Italic Serif line-by-line reveal */}
        <div className="space-y-4 font-display-italic text-2xl sm:text-3xl text-[#F3EBDD]/90 leading-cinematic min-h-[190px] flex flex-col items-center justify-center">
          {lineReveal >= 2 && (
            <p className="animate-fade-up">
              {finalQuestion.lines[0]}
            </p>
          )}
          {lineReveal >= 3 && (
            <p className="animate-fade-up text-[#A88A62]">
              {finalQuestion.lines[1]}
            </p>
          )}
          {lineReveal >= 4 && (
            <p className="animate-fade-up text-[#A88A62]">
              {finalQuestion.lines[2]}
            </p>
          )}
          {lineReveal >= 5 && (
            <p className="animate-fade-up text-[#F3EBDD] font-display text-3xl sm:text-4xl not-italic tracking-heading pt-2 font-bold">
              {finalQuestion.lines[3]}
            </p>
          )}
        </div>

        {/* Buttons in clean tactile style */}
        {lineReveal >= 6 && (
          <div className="animate-fade-up pt-6 flex flex-col items-center space-y-6">
            
            {noMessage && (
              <div className="text-xs font-archive text-[#A88A62] bg-[#191513] px-4 py-1.5 rounded-full border border-[#A88A62]/30 animate-fade-up shadow-lg">
                {noMessage}
              </div>
            )}

            <div className="flex items-center justify-center gap-6 relative min-h-[56px] w-full">
              <button
                type="button"
                id="btn-final-yes"
                onClick={onYesClicked}
                className="btn-storyboard-pill text-sm px-8 py-2.5 font-sans"
              >
                <span>{finalQuestion.yesText}</span>
              </button>

              <button
                type="button"
                id="btn-final-no"
                onClick={handleNoClick}
                onMouseEnter={handleNoMouseEnter}
                onTouchStart={handleNoClick}
                style={{
                  transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                  transition: 'transform 0.35s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                }}
                className="btn-storyboard-secondary text-sm px-7 py-2.5 font-sans"
              >
                {finalQuestion.noText}
              </button>
            </div>

            {/* Subtle butterfly */}
            <div className="pt-8 opacity-40">
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
    </section>
  );
};
