import React, { useState, useEffect, useRef } from 'react';
import { archiveData } from '../config/archiveData';

export const FirstMeetSection: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setRevealed(true), 400);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { firstMeet } = archiveData;

  return (
    <section
      ref={sectionRef}
      id="first-meet"
      className="min-h-screen py-28 px-6 max-w-4xl mx-auto flex flex-col justify-center items-center relative select-none"
    >
      {/* Golden Butterfly in Top Right */}
      <div className="absolute top-12 right-6 sm:right-12 opacity-60">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" className="flutter-gentle">
          <path
            d="M24 16C26 10 34 8 38 13C41 18 38 25 30 25C36 28 38 36 33 39C28 42 25 35 24 30C23 35 20 42 15 39C10 36 12 28 18 25C10 25 7 18 10 13C14 8 22 10 24 16Z"
            fill="#A88A62"
          />
        </svg>
      </div>

      <div className="w-full text-center space-y-8 max-w-2xl">
        
        {/* Header: Monospace Tag + Style 2 Strong Classic Serif */}
        <div className="space-y-2">
          <span className="font-archive text-xs tracking-archive text-[#A88A62] uppercase font-semibold">
            {firstMeet.tag}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#F3EBDD] tracking-heading uppercase font-bold">
            {firstMeet.title}
          </h2>
        </div>

        {/* Physical Photograph Card (Photo 01) with Washi Tape */}
        <div
          className={`transition-all duration-1000 ease-out transform ${
            revealed
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          } max-w-xl mx-auto pt-2`}
        >
          <div className="physical-photo-card -rotate-1">
            <div className="washi-tape-tl" />
            <div className="washi-tape-tr" />

            <div className="overflow-hidden aspect-[4/3] bg-[#12100F] relative">
              <img
                src={firstMeet.photo}
                alt="The First Meeting"
                className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            <div className="mt-2.5 text-center">
              <span className="font-archive text-[9px] tracking-archive text-[#8A7463] uppercase font-semibold">
                PHOTO 01 // ORIGIN POINT
              </span>
            </div>
          </div>
        </div>

        {/* Emotional Statements */}
        {revealed && (
          <div className="space-y-3 pt-3 animate-fade-up">
            {/* Style 4: Bold Italic Serif */}
            <p className="font-display-italic text-2xl sm:text-3xl text-[#F3EBDD]/90">
              “{firstMeet.quote1}”
            </p>

            {/* Style 3 Handwritten Script + Style 1 Decorative Calligraphy Accent */}
            <p className="text-3xl sm:text-4xl text-[#C4A77D]">
              <span className="font-handwritten tracking-script">“This was </span>
              <span className="font-decorative text-4xl sm:text-5xl text-[#C4A77D] tracking-decorative px-1 inline-block">
                ours
              </span>
              <span className="font-handwritten tracking-script">.”</span>
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
